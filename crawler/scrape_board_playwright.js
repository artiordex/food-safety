/**
 * 식품안전나라 데이터 활용 사례 게시판 크롤링 스크립트
 *
 * 기능:
 * - 식품안전나라 데이터 활용 사례 게시판 목록을 페이지별로 탐색함
 * - 상세 게시글의 본문 영역에서 서비스명, 서비스 내용, 활용 데이터 등을 추출함
 * - 추출 결과를 Excel 파일로 저장함
 * - console 대신 pino logger를 사용하여 실행 로그를 관리함
 */

// Playwright Chromium 브라우저 제어 모듈 불러오기
const { chromium } = require('playwright');

// HTML 문자열 파싱 및 텍스트 추출을 위한 cheerio 모듈 불러오기
const cheerio = require('cheerio');

// Excel 파일 생성을 위한 ExcelJS 모듈 불러오기
const ExcelJS = require('exceljs');

// 파일 경로 조작을 위한 path 모듈 불러오기
const path = require('path');

// console 대신 사용할 pino logger 불러오기
const logger = require('../utils/logger');

// 지정한 시간만큼 대기하는 함수
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 알려진 필드 레이블 목록 (줄 경계 판단용)
const KNOWN_FIELD_LABELS = [
    '서비스 명', '서비스명', '서비스 유형', '서비스 내용', '서비스내용', '주요 내용',
    '서비스 상세',
    '활용 데이터', '활용데이터',
    '데이터 활용 내용', '데이터 활용내용',
    '개발사 및 홈페이지', '개발 및 운영', '개발사', '관리기관', '홈페이지',
    '출시일', '서비스 게시일', '서비스개시일', '서비스 신청일', '서비스 활용현황',
    '비고',
];

// 줄이 알려진 레이블로 시작하는지 여부 확인
function startsWithKnownLabel(line) {
    return KNOWN_FIELD_LABELS.some(label => {
        if (!line.startsWith(label)) return false;
        const rest = line.substring(label.length);
        return rest === '' || /^[\s:：]/.test(rest);
    });
}

// 문자열에서 HTML 태그를 제거하고 일반 텍스트로 변환하는 함수
function htmlToCleanText(html) {
    const normalizedHtml = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        // 블록 태그 앞뒤로 줄바꿈을 추가하여 텍스트가 붙는 현상 방지
        .replace(/<\/?(p|div|li|tr|th|td|h[1-6]|ul|ol|table|tbody|thead|tfoot)[^>]*>/gi, '\n');

    const text = cheerio.load(normalizedHtml).text();

    return text
        .replace(/·/g, '')
        // 연속된 여러 줄바꿈을 하나 또는 두 개로 줄임
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

// 본문 텍스트를 줄 단위 배열로 변환하는 함수
function splitTextLines(text) {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
}

// 특정 레이블에 해당하는 값을 줄 목록에서 추출하는 함수 (다중 줄 지원)
function extractField(lines, keyLabels) {
    let result = '';
    let inBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!inBlock) {
            for (const key of keyLabels) {
                if (!line.includes(key)) continue;
                inBlock = true;
                let value = line.substring(line.indexOf(key) + key.length)
                    .replace(/^[\s:：-]+/, '').trim();
                if (value) {
                    result += value + '\n';
                }
                break;
            }
        } else {
            if (startsWithKnownLabel(line)) {
                break;
            }
            if (line.trim()) {
                result += line.trim() + '\n';
            }
        }
    }
    return result.trim();
}

// 레이블 없이 따옴표 또는 태그라인으로 표시된 서비스명 추출
function extractQuotedServiceName(lines) {
    for (let i = 0; i < Math.min(lines.length, 3); i++) {
        const line = lines[i];
        if (startsWithKnownLabel(line)) continue;

        // "" 서비스명 '' 또는 '' 서비스명 '' 형태 (유니코드 따옴표)
        const m1 = line.match(/["“‘„]{1,2}\s*([^"'”’“‘]{1,40}?)\s*['’”"]{1,2}/);
        if (m1 && m1[1].trim()) return m1[1].trim();

        // 'SERVICENAME' ASCII 단따옴표 형태
        const m2 = line.match(/'([A-Za-z가-힣()\s\d]{1,40})'/);
        if (m2 && m2[1].trim()) return m2[1].trim();

        // "태그라인 - 서비스명" 형태 (예: "초고속배달 앱 - 큐마켓")
        const m3 = line.match(/[-–—]\s+([가-힣A-Za-z\d()\s]{1,30})\s*["'\s]*$/);
        if (m3 && m3[1].trim()) return m3[1].trim();
    }
    return '';
}

// 개발사명과 홈페이지 URL 분리 추출
function extractDeveloperAndUrl(lines) {
    const devLabels = ['개발사 및 홈페이지', '개발 및 운영', '개발사', '관리기관'];
    let company = '';
    let url = '';

    for (const line of lines) {
        // 홈페이지 전용 레이블
        if (/^홈페이지\s*[:：]/.test(line)) {
            if (!url) url = line.replace(/^홈페이지\s*[:：]\s*/, '').trim();
            continue;
        }
        // 서비스 상세 URL
        if (/^서비스\s*상세\s*[:：]/.test(line)) {
            const m = line.match(/https?:\/\/\S+/);
            if (m && !url) url = m[0];
            continue;
        }
        // 개발사 / 개발 및 운영 / 관리기관
        for (const label of devLabels) {
            if (line.includes(label) && !company) {
                let val = line.substring(line.indexOf(label) + label.length)
                    .replace(/^[\s:：]+/, '').trim();
                const urlMatch = val.match(/https?:\/\/[^\s)]+/);
                if (urlMatch && !url) url = urlMatch[0];
                val = val.replace(/\s*\([^)]*https?:\/\/[^)]*\)/g, '');
                val = val.replace(/https?:\/\/\S+/g, '').trim();
                company = val;
                break;
            }
        }
    }
    return { company, url };
}

// 게시글 본문 텍스트에서 구조화된 레코드 추출
// meta: 목록 페이지에서 수집한 { title, cat, date } - 본문 파싱 실패 시 fallback으로 사용
function parsePostText(text, meta = {}) {
    const lines = splitTextLines(text);

    // 서비스 명: 레이블 우선 → 따옴표/태그라인 → 목록 제목 fallback
    let serviceName = extractField(lines, ['서비스 명', '서비스명']);
    if (!serviceName) serviceName = extractQuotedServiceName(lines);
    if (!serviceName && meta.title) serviceName = meta.title;

    // 서비스 유형: 레이블 우선 → 목록 카테고리 fallback
    let serviceType = extractField(lines, ['서비스 유형']);
    if (!serviceType && meta.cat) serviceType = meta.cat;

    // 서비스 내용 (주요 내용도 동일 컬럼으로 처리)
    const serviceDesc = extractField(lines, ['서비스 내용', '서비스내용', '주요 내용']);

    // 활용 데이터 (단일/다중 줄 모두 지원)
    const usedData = extractField(lines, ['활용 데이터', '활용데이터']);

    // 데이터 활용 내용 (활용 데이터 레이블과 혼동 방지)
    const dataUsage = extractField(lines, ['데이터 활용 내용', '데이터 활용내용']);

    // 개발사 및 홈페이지 분리
    const { company, url } = extractDeveloperAndUrl(lines);

    // 출시일: 레이블 우선 → 목록 날짜 fallback
    let launchDate = extractField(lines, [
        '출시일', '서비스 게시일', '서비스개시일', '서비스 신청일', '서비스 활용현황',
    ]);
    if (!launchDate && meta.date) launchDate = meta.date;

    // 비고
    const note = extractField(lines, ['비고']);

    return {
        '서비스 명':       serviceName,
        '서비스 유형':     serviceType,
        '서비스 내용':     serviceDesc,
        '활용 데이터':     usedData,
        '데이터 활용 내용': dataUsage,
        '개발사':          company,
        '홈페이지':        url,
        '출시일':          launchDate,
        '비고':            note,
        '원문 텍스트':     text.substring(0, 500),
    };
}

// Excel 워크시트 스타일을 적용하는 함수
function applyWorksheetStyle(worksheet) {
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.eachRow(row => {
        row.alignment = { vertical: 'middle', wrapText: true };
    });
}

// 수집 결과를 Excel 파일로 저장하는 함수
async function saveRecordsToExcel(records, outputPath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('데이터 활용 사례');

    worksheet.columns = [
        { header: '서비스 명',        key: '서비스 명',        width: 22 },
        { header: '서비스 유형',      key: '서비스 유형',      width: 16 },
        { header: '서비스 내용',      key: '서비스 내용',      width: 42 },
        { header: '활용 데이터',      key: '활용 데이터',      width: 36 },
        { header: '데이터 활용 내용', key: '데이터 활용 내용', width: 46 },
        { header: '개발사',           key: '개발사',           width: 22 },
        { header: '홈페이지',         key: '홈페이지',         width: 36 },
        { header: '출시일',           key: '출시일',           width: 14 },
        { header: '비고',             key: '비고',             width: 26 },
        { header: '원문 텍스트',      key: '원문 텍스트',      width: 50 },
    ];

    records.forEach(record => worksheet.addRow(record));
    applyWorksheetStyle(worksheet);
    await workbook.xlsx.writeFile(outputPath);
}


// 크롤링 대상 URL 및 타임아웃 설정
const LIST_URL        = 'https://www.foodsafetykorea.go.kr/apiMain.do';
const GALLERY_URL     = 'https://www.foodsafetykorea.go.kr/api/board/board.do?menu_grp=MENU_GRP35&menu_no=3899';
const DETAIL_BASE_URL = 'https://www.foodsafetykorea.go.kr/api/board/board.do?menu_grp=MENU_GRP35&menu_no=3899';
const OUTPUT_PATH     = path.join(__dirname, '../데이터활용갤러리.xlsx');
const PAGE_TIMEOUT_MS   = 30000;
const DETAIL_TIMEOUT_MS = 30000;
const LIST_WAIT_MS      = 4000;
const DEFAULT_WAIT_MS   = 1500;

// 목록 페이지 HTML에서 상세 게시글 식별자를 추출하는 함수
function extractDetailIdsFromHtml(html, detailParams) {
    const linksRegex = /viewDetail2?\(['"]?(\d+)['"]?/g;
    const hrefRegex  = /ntctxt_no=(\d+)/g;
    let match;
    while ((match = linksRegex.exec(html)) !== null) {
        detailParams.set(match[1], { isId: true, value: match[1] });
    }
    while ((match = hrefRegex.exec(html)) !== null) {
        detailParams.set(match[1], { isId: true, value: match[1] });
    }
}

// 목록 페이지 DOM에서 클릭 가능한 상세 링크 정보를 추출하는 함수
async function extractClickableItems(page, detailParams) {
    // 갤러리 카드 a 태그에서 ID와 메타데이터 한 번에 추출
    const galleryItems = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href*="viewDetail"]')).map(el => {
            const href = el.getAttribute('href') || '';
            const m = href.match(/viewDetail\((\d+)\)/);
            return {
                id:    m?.[1] || null,
                title: el.querySelector('li.title')?.innerText?.trim() || '',
                cat:   el.querySelector('li.class')?.innerText?.replace(/[\d][\d.,]*/g, '').trim() || '',
                date:  el.querySelector('li.date')?.innerText?.trim() || '',
            };
        }).filter(r => r.id)
    );

    logger.info({ found: galleryItems.length }, '갤러리 카드 감지');

    for (const gi of galleryItems) {
        if (!detailParams.has(gi.id)) {
            detailParams.set(gi.id, { isId: true, value: gi.id, title: gi.title, cat: gi.cat, date: gi.date });
        }
    }

    // 갤러리 카드가 없으면 a[onclick] 등 일반 링크도 추가 탐색
    if (galleryItems.length === 0) {
        const fallbackItems = await page.$$eval('a, [onclick]', els =>
            els.map(el => ({
                href:    el.getAttribute('href')    || '',
                onclick: el.getAttribute('onclick') || '',
            })).filter(it =>
                it.href.includes('viewDetail') || it.onclick.includes('viewDetail') ||
                it.href.includes('ntctxt_no')  || it.onclick.includes('ntctxt_no')
            )
        );
        logger.warn({ found: fallbackItems.length }, '갤러리 카드 없음, fallback 링크 탐색');
        for (const item of fallbackItems) {
            const combined = item.href + '::' + item.onclick;
            const idMatch = combined.match(/ntctxt_no=(\d+)|viewDetail2?\(['"']?(\d+)/);
            if (idMatch) {
                const id = idMatch[1] || idMatch[2];
                if (!detailParams.has(id)) {
                    detailParams.set(id, { isId: true, value: id, title: '', cat: '', date: '' });
                }
            }
        }
    }
}

    // 감지된 링크가 없으면 페이지의 모든 a 태그 샘플 출력 (디버그용)
    if (items.length === 0) {
        const sample = await page.$$eval('a', els =>
            els.slice(0, 10).map(el => ({
                href: el.getAttribute('href') || '',
                onclick: el.getAttribute('onclick') || '',
                text: el.innerText?.trim().substring(0, 40) || '',
            }))
        );
        logger.warn({ sample }, '페이지 링크 샘플 (디버그)');
    }
}

// 다음 페이지로 이동하는 함수
async function moveToNextPage(page, currentPage) {
    const nextPage = currentPage + 1;
    const btn = page.locator(`a.page-link:not(.next):has-text("${nextPage}")`).first();
    if (await btn.isVisible().catch(() => false)) {
        logger.info({ nextPage }, '다음 페이지 번호 버튼을 클릭합니다.');
        await btn.click();
        await page.waitForTimeout(2000);
        return { moved: true, nextPage };
    }
    const arrow = page.locator('a.page-link.next').first();
    if (await arrow.isVisible().catch(() => false)) {
        const href = await arrow.getAttribute('href');
        if (href && !href.includes('javascript:void(0)')) {
            logger.info('다음 페이지 블록 버튼을 클릭합니다.');
            await arrow.click();
            await page.waitForTimeout(2000);
            return { moved: true, nextPage };
        }
    }
    return { moved: false, nextPage: currentPage };
}

// 전체 페이지를 순회하며 모든 상세 게시글 링크 수집 (스크래핑 없음)
async function collectAllItems(page) {
    const detailParams = new Map();
    let currentPage = 1;

    while (true) {
        logger.info({ currentPage }, '목록 페이지에서 링크 수집 중...');
        extractDetailIdsFromHtml(await page.content(), detailParams);
        await extractClickableItems(page, detailParams);

        const result = await moveToNextPage(page, currentPage);
        if (!result.moved) break;
        currentPage = result.nextPage;
        await page.waitForTimeout(1000);
    }

    logger.info({ total: detailParams.size }, '전체 링크 수집 완료');
    return Array.from(detailParams.values());
}

// 병렬 스크래핑 (concurrency 개수만큼 동시 탭 실행)
async function scrapeParallel(context, items, concurrency = 4) {
    const results = [];
    const queue = [...items];
    let completed = 0;
    const total = items.length;

    async function worker() {
        while (queue.length > 0) {
            const item = queue.shift();
            if (!item) break;
            const idx = completed++;
            try {
                const record = await scrapeDetailItem(context, item, idx, total);
                if (record) results.push(record);
            } catch (err) {
                logger.error({ current: idx + 1, errorMessage: err.message }, '상세 게시글 처리 오류');
            }
            await sleep(200);
        }
    }

    await Promise.all(Array.from({ length: concurrency }, worker));
    return results;
}

// 상세 페이지에서 본문 HTML을 추출하는 함수 (body fallback 제거로 auth 코드 오인 방지)
async function extractPostContentFromPage(page) {
    return page.evaluate(() => {
        const selectors = [
            '.board-view-content',
            '.board_view_cont',
            '#hwpEditorBoardContent',
            '.bbs-view-wrap',
            '.view-content',
            '#viewContent',
            '.post',
            '#_post',
            'article',
            '.content-wrap',
        ];
        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el?.innerText?.trim().length > 30) return el.innerHTML;
        }
        return null;
    });
}

// 상세 게시글 URL을 직접 생성하여 이동하는 함수
async function openDetailById(page, item) {
    await page.goto(`${DETAIL_BASE_URL}&ntctxt_no=${item.value}`, {
        waitUntil: 'domcontentloaded',
        timeout: DETAIL_TIMEOUT_MS,
    });
}

// onclick 또는 href 정보를 기반으로 상세 페이지로 이동하는 함수
async function openDetailByLink(page, item) {
    const script = item.onclick || item.href.replace('javascript:', '');
    if (script && script.includes('viewDetail')) {
        await page.goto(GALLERY_URL, { waitUntil: 'domcontentloaded', timeout: DETAIL_TIMEOUT_MS });
        await page.waitForTimeout(1000);
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: DETAIL_TIMEOUT_MS }).catch(() => {}),
            page.evaluate(s => { eval(s); }, script),
        ]);
        return;
    }
    if (item.href && item.href.startsWith('http')) {
        await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: DETAIL_TIMEOUT_MS });
        return;
    }
    throw new Error(`상세 페이지 이동 방식을 판단할 수 없습니다: ${JSON.stringify(item)}`);
}

// 상세 게시글 하나를 열고 구조화된 레코드를 반환하는 함수
// viewDetail(ID) → fancybox #fancybox-frame iframe에서 본문 추출
async function scrapeDetailItem(context, item, index, totalCount) {
    logger.info({ current: index + 1, total: totalCount, id: item.value }, '상세 게시글을 처리합니다.');
    const page = await context.newPage();
    try {
        // 갤러리 목록 페이지 로드 (viewDetail 함수가 여기에 정의돼 있음)
        await page.goto(GALLERY_URL, { waitUntil: 'domcontentloaded', timeout: DETAIL_TIMEOUT_MS });
        await page.waitForTimeout(800);

        // viewDetail(ID) 호출 → fancybox iframe 열기
        await page.evaluate(id => {
            if (typeof viewDetail === 'function') viewDetail(id);
        }, parseInt(item.value, 10));

        // fancybox iframe(#fancybox-frame) 대기 후 내용 추출
        let postContent = null;
        try {
            await page.waitForSelector('#fancybox-frame', { timeout: 8000 });
            const frameHandle = await page.$('#fancybox-frame');
            const frame = frameHandle ? await frameHandle.contentFrame() : null;
            if (frame) {
                await frame.waitForLoadState('domcontentloaded', { timeout: 10000 });
                postContent = await extractPostContentFromPage(frame);
            }
        } catch (_) {
            // fancybox가 아닌 일반 페이지 이동인 경우 페이지 자체에서 시도
            postContent = await extractPostContentFromPage(page);
        }

        if (!postContent) {
            logger.warn({ current: index + 1, id: item.value }, '본문을 찾지 못했습니다.');
            return null;
        }
        const meta = { title: item.title || '', cat: item.cat || '', date: item.date || '' };
        return parsePostText(htmlToCleanText(postContent), meta);
    } finally {
        await page.close();
    }
}

// 메인 크롤링 함수
async function scrapeBoard() {
    logger.info('Playwright Chromium 브라우저를 시작합니다.');

    // Chromium 브라우저 실행
    const browser = await chromium.launch({
        headless: true,
    });

    try {
        // 브라우저 컨텍스트 생성
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ignoreHTTPSErrors: true
        });

        // 목록 페이지 생성
        const page = await context.newPage();

        logger.info({ listUrl: LIST_URL }, 'API 포털 메인 페이지로 이동합니다.');

        // 메인 페이지 접속
        await page.goto(LIST_URL, {
            waitUntil: 'networkidle',
            timeout: PAGE_TIMEOUT_MS,
        });
        await page.waitForTimeout(LIST_WAIT_MS);

        // 정보공유 메뉴에 마우스 오버하여 서브메뉴 표시
        logger.info('정보공유 메뉴를 열어 데이터활용 갤러리로 이동합니다.');
        await page.hover('a:has(span:text("정보공유"))');
        await page.waitForTimeout(800);

        // 데이터활용 갤러리 링크 클릭
        await page.click('a[href*="menu_no=3899"]');
        await page.waitForLoadState('networkidle', { timeout: PAGE_TIMEOUT_MS });
        await page.waitForTimeout(LIST_WAIT_MS);

        logger.info({ url: page.url() }, '데이터활용 갤러리 진입 완료');

        // STEP 1: 전체 페이지 링크 빠르게 수집
        const allItems = await collectAllItems(page);

        if (allItems.length === 0) {
            logger.warn('수집된 게시글 링크가 없습니다. 선택자를 확인하세요.');
            return;
        }

        // STEP 2: 병렬로 상세 페이지 스크래핑 (4개 탭 동시)
        logger.info({ total: allItems.length }, '병렬 스크래핑 시작 (동시 4탭)');
        const records = await scrapeParallel(context, allItems, 4);

        logger.info({ recordCount: records.length }, '전체 스크래핑 완료');

        // 수집 결과를 Excel 파일로 저장
        await saveRecordsToExcel(records, OUTPUT_PATH);

        logger.info({
            outputPath: OUTPUT_PATH
        }, 'Excel 파일 저장이 완료되었습니다.');
    } finally {
        // 브라우저 종료
        await browser.close();

        logger.info('Playwright Chromium 브라우저를 종료했습니다.');
    }
}

// 스크립트 실행 및 최상위 오류 처리
scrapeBoard().catch(err => {
    logger.fatal({
        err
    }, '데이터 활용 사례 게시판 크롤링 중 심각한 오류가 발생했습니다.');

    process.exit(1);
});