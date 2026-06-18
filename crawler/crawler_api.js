/**
 * 식품안전나라 API 통합 크롤링 파이프라인
 *
 * 공개 데이터 목록 화면에서 API 서비스 번호(svc_no)를 모은 뒤, 각 상세 화면의 메타데이터와 샘플 응답을 로컬 캐시에 저장한다.
 * 브라우저는 목록/상세 페이지처럼 DOM 접근이 필요한 곳에만 쓰고, 샘플 XML은 HTTP 엔드포인트를 직접 호출해 팝업/다운로드 UI 의존성을 줄인다.
 *
 * [실행 순서]
 * Phase 1: 목록 페이지만 순회하여 svc_no 수집 (빠름)
 * Phase 2: 상세 페이지 병렬 스크래핑 + HTTP로 샘플 데이터 직접 수집 (팝업 불필요)
 *
 * [결과물]
 * - crawler/crawl_cache.json: 서비스별 메타데이터, 필드 목록, 샘플 URL/크기
 * - crawler/samples/{svc_no}.xml: 원본 샘플 XML
 * - crawler/samples/{svc_no}.json: XML을 파싱한 JSON 미리보기
 */

const { chromium } = require('playwright');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// cache는 재실행 시 중복 수집을 건너뛰는 기준으로도 사용
const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');
const SAMPLES_DIR = path.join(__dirname, 'samples');
const CONCURRENCY = 4;

// 식품안전나라 API_TYPE06(XML/JSON) 목록과 상세/샘플 호출에 필요한 고정 URL.
const LIST_URL = 'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31';
const DETAIL_BASE = 'https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?svc_no=';
const SAMPLE_BASE = 'http://openapi.foodsafetykorea.go.kr/api/sample';

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
// 공개 샘플 API는 /{svcNo}/xml/1/5 형식으로 처음 5건을 내려줌
async function saveSample(svcNo) {
    const url = `${SAMPLE_BASE}/${svcNo}/xml/1/5`;
    let dataLength = 0;
    // 샘플 수집 실패 시 최대3회 재시도
    for (let retry = 1; retry <= 3; retry++) {
        const raw = await fetchHttp(url);
        if (!raw || !raw.trim()) {
            if (retry < 3) await new Promise(r => setTimeout(r, 2000));
            continue;
        }

        // 원본 XML은 추후 파서 변경/검증에 다시 사용할 수 있도록 그대로 저장
        dataLength = raw.trim().length;
        fs.writeFileSync(path.join(SAMPLES_DIR, `${svcNo}.xml`), raw.trim(), 'utf-8');

        try {
            // row는 여러 건이거나 한 건이어도 배열 형태로 유지
            // 이렇게 해 두면 후속 처리에서 단건/복수건 분기 없이 순회
            const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, isArray: n => n === 'row' });
            const obj = parser.parse(raw.trim());

            // XML declaration이 파서 결과에 섞여 들어오는 경우가 있어 캐시에서는 제거
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

// =============================================================================
// Phase 1: 목록 페이지만 순회하여 svc_no 수집
// =============================================================================
async function collectListItems(page, categories, maxItems, hasForce, cacheMap) {
    const items = [];

    for (const cat of categories) {
        if (items.length >= maxItems) break;
        logger.info({ cat: cat.text }, '카테고리 목록 수집 중');

        // 셀렉트박스가 없으면 목록 페이지로 복귀
        // 목록 화면은 페이지 이동/검색 후 DOM 상태가 바뀔 수 있으므로 카테고리마다 기준 화면을 확인해 다음 selectOption 실패를 방지
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
            // Playwright locator를 행마다 왕복 호출하면 매우 느려지므로, evaluate 안에서 DOM을 직접 순회해 svc_no/서비스명/제공기관을 묶어서 가져옴
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

                // 기본 모드는 이미 필드 정보와 샘플 JSON이 있는 서비스를 건너뛴다.
                // --force/-f를 주면 기존 캐시가 있어도 다시 상세/샘플을 갱신한다.
                if (!hasForce && cached?.fields?.length > 0 && fs.existsSync(jsonPath)) {
                    logger.info({ svcNo: row.svc_no, svc_nm: row.svc_nm }, '캐시 있음, 건너뜀');
                    continue;
                }
                items.push({ ...row, cat: cat.text, cat_code: cat.val });
            }

            // 다음 페이지 페이지네이션 마크업 클릭
            const nextBtn = page.locator('.pagination a.next, .pagination a.page-link.next').first();
            let hasNextBtn = false;
            try { await nextBtn.waitFor({ state: 'visible', timeout: 2000 }); hasNextBtn = true; } catch (_) { }

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
// 반환값은 processItem에서 목록 기본값과 병합되어 cache에 저장
async function scrapeDetail(page, svcNo) {
    await page.goto(`${DETAIL_BASE}${svcNo}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 설명
    // 설명은 화면 문구가 길 수 있어 검색/미리보기 용도로 300자까지만 보관
    let desc = '';
    const descEl = page.locator('tr:has(th:has-text("데이터 설명")) td').first();
    if (await descEl.isVisible({ timeout: 2000 }).catch(() => false)) {
        desc = (await descEl.innerText()).replace(/\s+/g, ' ').trim().substring(0, 300);
    }

    // 제공기관
    // 상세 화면의 헤더 문구가 "주관기관", "제공기관" 등으로 달라지는 경우를 모두 고려
    let provdInsttNm = '';
    for (const sel of ['tr:has(th:has-text("주관기관")) td', 'tr:has(th:has-text("제공기관")) td']) {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
            const txt = (await el.innerText()).trim();
            if (txt && txt.length < 50) { provdInsttNm = txt; break; }
        }
    }

    // 출력항목 (OPEN-API 탭)
    // 필드 정의는 탭을 열어야 DOM에 보이는 구조라 클릭 후 테이블을 읽는다.
    // 컬럼 순서가 일부 서비스에서 다르게 나타날 수 있어 영문 필드명 패턴으로 위치를 판별
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
            // field가 확인된 행만 저장한다. 머리글/빈 행/설명 행은 자연스럽게 제외된다.
            if (field) fields.push({ field, kor_nm, type, length, desc: fieldDesc, sample });
        }
    }

    return { desc, provdInsttNm, fields };
}

// =============================================================================
// Phase 2: 단일 아이템 처리 (상세 스크래핑 + HTTP 샘플)
// =============================================================================
async function processItem(context, item, cacheMap) {
    const { svc_no: svcNo, svc_nm, cat, cat_code } = item;

    // 서비스마다 별도 페이지를 열어 병렬 처리 간 네비게이션 상태가 섞이지 않게 함
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
    // 상세 스크래핑이 실패해도 샘플 수집은 독립적으로 시도
    const { url: sampleUrl, dataLength } = await saveSample(svcNo);

    // 캐시 업데이트
    // 상세 화면에서 제공기관을 못 찾으면 목록 화면의 제공기관 값을 fallback으로 사용
    // sample_data_length는 새로 받은 XML 길이를 우선하고, 실패 시 기존 JSON 크기를 보조값으로 남김
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
    // 모든 아이템이 끝날 때까지 기다리지 않고 매 건 저장해, 프로세스가 중간에 종료되어도 다음 실행에서 이어가기 쉽도록 함
    fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.values(cacheMap), null, 2), 'utf-8');
    logger.info({ svcNo, svc_nm }, '처리 완료');
}

// Phase 2: 병렬 처리 워커 풀
// 단순 공유 배열(queue)을 여러 worker가 shift하며 소비
// Node.js 이벤트 루프에서는 이 구간이 단일 스레드로 실행되므로 별도 lock은 필요 없음
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
                // 한 서비스 처리 실패가 전체 배치 중단으로 번지지 않도록 worker 안에서 흡수한다.
                logger.error({ svc_no: item.svc_no, err: err.message }, '아이템 처리 실패');
            }
            done++;
            logger.info({ done, total }, '진행률');
        }
    }

    await Promise.all(Array.from({ length: concurrency }, worker));
}

// 메인 함수
// 사용 예:
//   node crawler/crawler_api.js        # 기본 최대 170건, 캐시된 항목 skip
//   node crawler/crawler_api.js 30     # 최대 30건만 처리
//   node crawler/crawler_api.js -f     # 캐시가 있어도 강제 재수집
async function run() {
    logger.info('식품안전나라 통합 파이프라인을 시작합니다.');

    const args = process.argv.slice(2);
    const hasForce = args.includes('--force') || args.includes('-f');
    const limitMatch = args.find(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-'));
    const maxItems = limitMatch ? parseInt(limitMatch, 10) : 170;

    logger.info({ skipDuplicate: hasForce ? '비활성화' : '활성화', maxItems }, '크롤링 시작');

    if (!fs.existsSync(SAMPLES_DIR)) fs.mkdirSync(SAMPLES_DIR, { recursive: true });

    // 캐시 로드
    // 파일이 없거나 JSON 파싱에 실패하면 빈 캐시로 시작
    let cacheList = [];
    if (fs.existsSync(CACHE_FILE)) {
        try { cacheList = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')); } catch (_) { }
    }
    const cacheMap = Object.fromEntries(cacheList.map(item => [item.svc_no, item]));

    const browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null });

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

        // 카테고리 한 번에 추출 이후 Phase 1에서는 이 option 목록을 순회하며 카테고리별 검색을 수행
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
            // 정상적으로 모두 캐시되어 skip된 경우에도 items는 0일 수 있다.
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
        // 성공/실패 여부와 관계없이 브라우저 프로세스를 정리한다.
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
