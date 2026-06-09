/**
 * 식품안전나라 API 통합 크롤링 파이프라인
 *
 * Phase 1: 목록 페이지만 순회하여 svc_no 수집 (빠름)
 * Phase 2: 상세 페이지 병렬 스크래핑 + HTTP로 샘플 데이터 직접 수집 (팝업 불필요)
 */

const { chromium }  = require('playwright');
const { XMLParser } = require('fast-xml-parser');
const http          = require('http');
const fs            = require('fs');
const path          = require('path');
const logger        = require('../utils/logger');

const CACHE_FILE   = path.join(__dirname, 'crawl_cache.json');
const SAMPLES_DIR  = path.join(__dirname, 'samples');
const CONCURRENCY  = 4;
const LIST_URL     = 'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31';
const DETAIL_BASE  = 'https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?svc_no=';
const SAMPLE_BASE  = 'http://openapi.foodsafetykorea.go.kr/api/sample';

// HTTP GET 요청 (브라우저 팝업 없이 샘플 데이터 수집)
function fetchHttp(url, timeoutMs = 15000) {
    return new Promise(resolve => {
        const req = http.get(url, { timeout: timeoutMs }, res => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        });
        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
    });
}

// 샘플 XML 수집 → JSON 변환 저장
async function saveSample(svcNo) {
    const url = `${SAMPLE_BASE}/${svcNo}/xml/1/5`;
    let dataLength = 0;

    for (let retry = 1; retry <= 3; retry++) {
        const raw = await fetchHttp(url);
        if (!raw || !raw.trim()) {
            if (retry < 3) await new Promise(r => setTimeout(r, 2000));
            continue;
        }

        dataLength = raw.trim().length;
        fs.writeFileSync(path.join(SAMPLES_DIR, `${svcNo}.xml`), raw.trim(), 'utf-8');

        try {
            const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, isArray: n => n === 'row' });
            const obj = parser.parse(raw.trim());
            delete obj?.['?xml'];
            delete obj?.['xml'];
            fs.writeFileSync(path.join(SAMPLES_DIR, `${svcNo}.json`), JSON.stringify(obj, null, 2), 'utf-8');
            logger.info({ svcNo }, '샘플 저장 완료');
        } catch (_) {
            logger.warn({ svcNo }, 'XML→JSON 변환 실패');
        }
        break;
    }

    return { url, dataLength };
}

// Phase 1: 목록 페이지만 순회하여 svc_no 수집
async function collectListItems(page, categories, maxItems, hasForce, cacheMap) {
    const items = [];

    for (const cat of categories) {
        if (items.length >= maxItems) break;
        logger.info({ cat: cat.text }, '카테고리 목록 수집 중');

        // 셀렉트박스가 없으면 목록 페이지로 복귀
        if (!(await page.locator('#search_clCdCode').isVisible({ timeout: 3000 }).catch(() => false))) {
            await page.goto(LIST_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(1000);
        }

        await page.selectOption('#search_clCdCode', cat.val);

        const searchBtn = page.locator('a[href="javascript:setDefault();"], a.btn-default_new:has-text("검색")').first();
        if (await searchBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await searchBtn.click();
            await page.waitForTimeout(1500);
        }

        let pageNum = 1;
        let hasNext = true;

        while (hasNext && items.length < maxItems) {
            // 목록 행 전체를 한 번에 추출
            const rows = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#listFrame tr')).map(tr => {
                    const link = tr.querySelector('td.tl a');
                    if (!link) return null;
                    const href = link.getAttribute('href') || '';
                    const m = href.match(/'([^']+)'/);
                    const tcEls = tr.querySelectorAll('td.tc');
                    const provd = tcEls.length > 1
                        ? tcEls[1].innerText.trim()
                        : (tcEls[0]?.innerText.trim() || '식품의약품안전처');
                    return { svc_no: m?.[1] || null, svc_nm: link.innerText.trim(), provd_instt_nm: provd };
                }).filter(r => r?.svc_no);
            });

            for (const row of rows) {
                if (items.length >= maxItems) break;
                const jsonPath = path.join(SAMPLES_DIR, `${row.svc_no}.json`);
                const cached = cacheMap[row.svc_no];
                if (!hasForce && cached?.fields?.length > 0 && fs.existsSync(jsonPath)) {
                    logger.info({ svcNo: row.svc_no , svc_nm: row.svc_nm }, '캐시 있음, 건너뜀');
                    continue;
                }
                items.push({ ...row, cat: cat.text, cat_code: cat.val });
            }

            // 다음 페이지
            const nextBtn = page.locator('.pagination a.next, .pagination a.page-link.next').first();
            let hasNextBtn = false;
            try { await nextBtn.waitFor({ state: 'visible', timeout: 2000 }); hasNextBtn = true; } catch (_) {}

            if (hasNextBtn) {
                await nextBtn.click();
                await page.waitForTimeout(1000);
                pageNum++;
            } else {
                hasNext = false;
            }
        }
    }

    logger.info({ total: items.length }, 'Phase 1 목록 수집 완료');
    return items;
}

// 상세 페이지에서 desc, 제공기관, 출력항목 스크래핑
async function scrapeDetail(page, svcNo) {
    await page.goto(`${DETAIL_BASE}${svcNo}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 설명
    let desc = '';
    const descEl = page.locator('tr:has(th:has-text("데이터 설명")) td').first();
    if (await descEl.isVisible({ timeout: 2000 }).catch(() => false)) {
        desc = (await descEl.innerText()).replace(/\s+/g, ' ').trim().substring(0, 300);
    }

    // 제공기관
    let provdInsttNm = '';
    for (const sel of ['tr:has(th:has-text("주관기관")) td', 'tr:has(th:has-text("제공기관")) td']) {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
            const txt = (await el.innerText()).trim();
            if (txt && txt.length < 50) { provdInsttNm = txt; break; }
        }
    }

    // 출력항목 (OPEN-API 탭)
    let fields = [];
    const tab = page.locator('a#tabs3, a[href="#tab3"], a:has-text("OPEN-API")').first();
    if (await tab.isVisible({ timeout: 1000 }).catch(() => false)) {
        await tab.click();
        await page.waitForTimeout(400);

        const rawRows = await page.evaluate(() => {
            const tbl = document.querySelector('#view-item table, .tab-pane#view-item table');
            if (!tbl) return [];
            return Array.from(tbl.querySelectorAll('tr')).slice(1).map(tr =>
                Array.from(tr.querySelectorAll('td, th')).map(c => c.innerText.replace(/\s+/g, ' ').trim())
            );
        });

        for (const cols of rawRows) {
            if (cols.length < 2) continue;
            let field = '', kor_nm = '', type = '', length = '', fieldDesc = '', sample = '';
            if (/^[A-Z][A-Z0-9_]{1,}$/.test(cols[0])) {
                [field, kor_nm, type, length, fieldDesc, sample] = cols;
            } else if (/^[A-Z][A-Z0-9_]{1,}$/.test(cols[1])) {
                [, field, kor_nm, type, length, fieldDesc, sample] = cols;
            }
            if (field) fields.push({ field, kor_nm, type, length, desc: fieldDesc, sample });
        }
    }

    return { desc, provdInsttNm, fields };
}

// Phase 2: 단일 아이템 처리 (상세 스크래핑 + HTTP 샘플)
async function processItem(context, item, cacheMap) {
    const { svc_no: svcNo, svc_nm, cat, cat_code } = item;
    const detailPage = await context.newPage();

    let detail = { desc: '', provdInsttNm: item.provd_instt_nm, fields: [] };
    try {
        detail = await scrapeDetail(detailPage, svcNo);
    } catch (err) {
        logger.warn({ svcNo, err: err.message }, '상세 스크래핑 실패');
    } finally {
        await detailPage.close();
    }

    // HTTP로 샘플 수집 (브라우저 팝업 없음)
    const { url: sampleUrl, dataLength } = await saveSample(svcNo);

    // 캐시 업데이트
    cacheMap[svcNo] = {
        svc_no: svcNo,
        svc_nm,
        cat,
        cat_code,
        provd_instt_nm: detail.provdInsttNm || item.provd_instt_nm,
        data_type_nm: 'XML/JSON',
        detail_url: `${DETAIL_BASE}${svcNo}`,
        type_cd: 'API_TYPE06',
        fields: detail.fields,
        desc: detail.desc,
        error: '',
        sample_url: sampleUrl,
        sample_data_length: dataLength || (
            fs.existsSync(path.join(SAMPLES_DIR, `${svcNo}.json`))
                ? fs.readFileSync(path.join(SAMPLES_DIR, `${svcNo}.json`)).length : 0
        ),
    };

    // 중간 저장 (중단 시 유실 방지)
    fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.values(cacheMap), null, 2), 'utf-8');
    logger.info({ svcNo, svc_nm }, '처리 완료');
}

// Phase 2: 병렬 처리 워커 풀
async function runParallel(context, items, cacheMap, concurrency) {
    const queue = [...items];
    let done = 0;
    const total = items.length;

    async function worker() {
        while (queue.length > 0) {
            const item = queue.shift();
            if (!item) break;
            try {
                await processItem(context, item, cacheMap);
            } catch (err) {
                logger.error({ svc_no: item.svc_no, err: err.message }, '아이템 처리 실패');
            }
            done++;
            logger.info({ done, total }, '진행률');
        }
    }

    await Promise.all(Array.from({ length: concurrency }, worker));
}

// 메인 함수
async function run() {
    logger.info('식품안전나라 통합 파이프라인을 시작합니다.');

    const args = process.argv.slice(2);
    const hasForce   = args.includes('--force') || args.includes('-f');
    const limitMatch = args.find(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-'));
    const maxItems   = limitMatch ? parseInt(limitMatch, 10) : 170;

    logger.info({ skipDuplicate: hasForce ? '비활성화' : '활성화', maxItems }, '크롤링 시작');

    if (!fs.existsSync(SAMPLES_DIR)) fs.mkdirSync(SAMPLES_DIR, { recursive: true });

    // 캐시 로드
    let cacheList = [];
    if (fs.existsSync(CACHE_FILE)) {
        try { cacheList = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')); } catch (_) {}
    }
    const cacheMap = Object.fromEntries(cacheList.map(item => [item.svc_no, item]));

    const browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
    const context  = await browser.newContext({ viewport: null });

    try {
        const listPage = await context.newPage();

        // 메인 → 데이터공개 → 유형별 이동
        logger.info('목록 페이지로 이동합니다.');
        await listPage.goto('https://www.foodsafetykorea.go.kr/apiMain.do', { waitUntil: 'domcontentloaded', timeout: 90000 });

        const closeBtn = listPage.locator('a[href*="popclose"], a:has-text("닫기")').first();
        if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) await closeBtn.click();

        const dataOpenBtn = listPage.locator('a[href="javascript:fn_skip();"]:has(span:has-text("데이터공개"))').first();
        if (await dataOpenBtn.isVisible({ timeout: 3000 }).catch(() => false)) await dataOpenBtn.click();

        const typeBtn = listPage.locator('a[href*="svc_type_cd=API_TYPE06"]').first();
        if (await typeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await typeBtn.click();
            await listPage.waitForLoadState('domcontentloaded');
        } else {
            await listPage.goto(LIST_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
        }
        await listPage.waitForTimeout(1500);

        // 카테고리 한 번에 추출
        const categories = await listPage.evaluate(() =>
            Array.from(document.querySelectorAll('#search_clCdCode option'))
                .filter(o => o.value)
                .map(o => ({ val: o.value, text: o.innerText.trim() }))
        );
        logger.info({ count: categories.length }, '카테고리 추출 완료');

        // Phase 1: 목록 수집
        const items = await collectListItems(listPage, categories, maxItems, hasForce, cacheMap);
        await listPage.close();

        if (items.length === 0) {
            logger.warn('수집할 신규 항목이 없습니다.');
            return;
        }

        // Phase 2: 병렬 상세 스크래핑 + HTTP 샘플
        logger.info({ total: items.length, concurrency: CONCURRENCY }, 'Phase 2 병렬 처리 시작');
        await runParallel(context, items, cacheMap, CONCURRENCY);

        logger.info({ total: Object.keys(cacheMap).length }, '파이프라인 완료');
    } catch (err) {
        logger.error({ err }, '파이프라인 오류');
    } finally {
        await browser.close();
        logger.info('브라우저 종료');
        if (fs.existsSync(SAMPLES_DIR)) {
            const n = fs.readdirSync(SAMPLES_DIR).filter(f => f.endsWith('.json')).length;
            logger.info({ jsonCount: n }, `총 JSON 파일: ${n}개`);
        }
    }
}

if (require.main === module) run();
module.exports = { run };
