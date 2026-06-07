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
const pino = require('pino');

// 식품안전나라 데이터 활용 사례 게시판 목록 URL
const LIST_URL = 'https://www.foodsafetykorea.go.kr/api/board/board.do?menu_grp=MENU_GRP35&menu_no=3899';

// 상세 게시글 URL 생성에 사용할 고정 파라미터
const DETAIL_BASE_URL = 'https://www.foodsafetykorea.go.kr/api/board/boardDetail.do?menu_grp=MENU_GRP35&menu_no=3899&bbs_no=bbs082';

// 최종 Excel 파일 저장 경로
const OUTPUT_PATH = path.join(__dirname, '..', '데이터_활용사례_Playwright.xlsx');

// 페이지 로딩 후 대기 시간
const DEFAULT_WAIT_MS = 1500;

// 목록 페이지 이동 후 대기 시간
const LIST_WAIT_MS = 3000;

// 페이지 이동 제한 시간
const PAGE_TIMEOUT_MS = 60000;

// 상세 페이지 이동 제한 시간
const DETAIL_TIMEOUT_MS = 30000;

// pino logger 설정
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname'
        }
    }
});

// 지정한 시간만큼 대기하는 함수
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 문자열에서 HTML 태그를 제거하고 일반 텍스트로 변환하는 함수
function htmlToCleanText(html) {
    // 줄바꿈 의미가 있는 태그를 먼저 텍스트 줄바꿈으로 변환
    const normalizedHtml = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/<p.*?>/gi, '\n');

    // cheerio를 사용하여 HTML 태그 제거
    const text = cheerio.load(normalizedHtml).text();

    // 불필요한 특수 기호와 앞뒤 공백 제거
    return text
        .replace(/·/g, '')
        .trim();
}

// 본문 텍스트를 줄 단위 배열로 변환하는 함수
function splitTextLines(text) {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
}

// 특정 라벨 목록에 해당하는 값을 본문 줄 목록에서 추출하는 함수
function extractField(lines, keyLabels) {
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];

        for (const key of keyLabels) {
            if (line.includes(key)) {
                // 현재 줄에서 라벨 뒤쪽 값을 추출
                let value = line
                    .substring(line.indexOf(key) + key.length)
                    .replace(/^[\s:：]+/, '')
                    .trim();

                // 현재 줄에 값이 없으면 다음 줄을 값으로 사용
                if (!value && index + 1 < lines.length) {
                    value = lines[index + 1];
                }

                return value;
            }
        }
    }

    return '';
}

// 활용 데이터 영역을 여러 줄 텍스트로 추출하는 함수
function extractUsedData(lines) {
    let usedData = '';
    let inUsedDataBlock = false;

    for (const line of lines) {
        // 데이터 활용 내용 라벨이 나오면 활용 데이터 영역 종료
        if (line.includes('데이터 활용 내용') || line.includes('데이터 활용내용')) {
            inUsedDataBlock = false;
        }

        // 활용 데이터 영역 내부의 줄을 누적
        if (inUsedDataBlock && line.trim()) {
            usedData += `${line.trim()}\n`;
        }

        // 활용 데이터 라벨이 나오면 다음 줄부터 활용 데이터 영역으로 판단
        if (line.includes('활용 데이터') || line.includes('활용데이터')) {
            inUsedDataBlock = true;
        }
    }

    return usedData.trim();
}

// 게시글 본문 텍스트에서 필요한 항목을 구조화하는 함수
function parsePostText(text) {
    const lines = splitTextLines(text);

    // 서비스명 추출
    const serviceName = extractField(lines, ['서비스 명', '서비스명']);

    // 서비스 내용 추출
    const serviceDesc = extractField(lines, ['서비스 내용', '서비스내용']);

    // 활용 데이터 추출
    const usedData = extractUsedData(lines);

    // 데이터 활용 내용 추출
    const dataUsage = extractField(lines, ['데이터 활용 내용', '데이터 활용내용', '데이터 활용']);

    // 개발사 및 홈페이지 추출
    const homepage = extractField(lines, ['개발사 및 홈페이지', '홈페이지', '개발사']);

    // 비고 추출
    const note = extractField(lines, ['비고']);

    return {
        '서비스 명': serviceName,
        '서비스 내용': serviceDesc,
        '활용 데이터': usedData,
        '데이터 활용 내용': dataUsage,
        '개발사 및 홈페이지': homepage,
        '비고': note,
        '원문 텍스트': text.substring(0, 500)
    };
}

// 목록 페이지 HTML에서 상세 게시글 식별자를 추출하는 함수
function extractDetailIdsFromHtml(html, detailParams) {
    // viewDetail 또는 viewDetail2 함수 호출에서 게시글 번호 추출
    const linksRegex = /viewDetail2?\(['"]?(\d+)['"]?/g;

    // href 파라미터의 ntctxt_no 값 추출
    const hrefRegex = /ntctxt_no=(\d+)/g;

    let match;

    // JavaScript 함수 호출 형태에서 게시글 번호 추출
    while ((match = linksRegex.exec(html)) !== null) {
        const id = match[1];
        detailParams.set(id, {
            isId: true,
            value: id
        });
    }

    // URL 파라미터 형태에서 게시글 번호 추출
    while ((match = hrefRegex.exec(html)) !== null) {
        const id = match[1];
        detailParams.set(id, {
            isId: true,
            value: id
        });
    }
}

// 목록 페이지 DOM에서 클릭 가능한 상세 링크 정보를 추출하는 함수
async function extractClickableItems(page, detailParams) {
    const items = await page.$$eval(
        '.board-list ul, ul:has(.title), .gallery-list ul, a > ul, a',
        elements => {
            return elements
                .map(element => {
                    let clickable = element;

                    // ul이 a 태그 안에 있으면 부모 a 태그를 실제 클릭 대상으로 사용
                    if (
                        element.tagName.toLowerCase() === 'ul' &&
                        element.parentElement &&
                        element.parentElement.tagName.toLowerCase() === 'a'
                    ) {
                        clickable = element.parentElement;
                    }

                    return {
                        href: clickable.getAttribute('href') || '',
                        onclick: clickable.getAttribute('onclick') || ''
                    };
                })
                .filter(item =>
                    item.href.includes('viewDetail') ||
                    item.onclick.includes('viewDetail') ||
                    item.href.includes('ntctxt_no')
                );
        }
    );

    // href와 onclick 조합을 기준으로 중복 제거
    for (const item of items) {
        const identifier = `${item.href}::${item.onclick}`;

        detailParams.set(identifier, {
            isId: false,
            href: item.href,
            onclick: item.onclick
        });
    }
}

// 다음 페이지로 이동하는 함수
async function moveToNextPage(page, currentPage) {
    const nextPage = currentPage + 1;

    // Playwright 전용 :has-text 선택자를 사용하여 다음 페이지 번호 버튼 탐색
    const nextPageButton = page.locator(`a.page-link:not(.next):has-text("${nextPage}")`).first();

    if (await nextPageButton.isVisible().catch(() => false)) {
        logger.info({
            nextPage
        }, '다음 페이지 번호 버튼을 클릭합니다.');

        await nextPageButton.click();
        await page.waitForTimeout(2000);

        return {
            moved: true,
            nextPage
        };
    }

    // 페이지 번호 버튼이 없으면 다음 블록 화살표 버튼 탐색
    const nextArrow = page.locator('a.page-link.next').first();

    if (await nextArrow.isVisible().catch(() => false)) {
        const href = await nextArrow.getAttribute('href');

        if (href && !href.includes('javascript:void(0)')) {
            logger.info('다음 페이지 블록 버튼을 클릭합니다.');

            await nextArrow.click();
            await page.waitForTimeout(2000);

            return {
                moved: true,
                nextPage
            };
        }
    }

    return {
        moved: false,
        nextPage: currentPage
    };
}

// 목록 페이지 전체를 순회하여 상세 게시글 접근 정보를 수집하는 함수
async function collectDetailParams(page) {
    const detailParams = new Map();

    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
        logger.info({
            currentPage
        }, '목록 페이지에서 게시글 정보를 추출합니다.');

        // 현재 페이지 HTML 전체 추출
        const html = await page.content();

        // HTML 문자열에서 상세 게시글 번호 추출
        extractDetailIdsFromHtml(html, detailParams);

        // DOM 요소에서 클릭 가능한 상세 링크 정보 추출
        await extractClickableItems(page, detailParams);

        // 다음 페이지로 이동
        const moveResult = await moveToNextPage(page, currentPage);

        if (moveResult.moved) {
            currentPage = moveResult.nextPage;
        } else {
            hasNextPage = false;
        }
    }

    return Array.from(detailParams.values());
}

// 상세 페이지에서 본문 HTML을 추출하는 함수
async function extractPostContentFromPage(page) {
    return page.evaluate(() => {
        // 사용자가 지정한 상세 본문 영역 우선 탐색
        const post = document.querySelector('.post, #_post');

        if (post) {
            return post.innerHTML;
        }

        // 본문 영역을 찾지 못할 경우 사용 가능한 대체 영역 탐색
        const fallback = document.querySelector(
            '#hwpEditorBoardContent, .board-view-content, .board_view_cont'
        );

        if (fallback) {
            return fallback.innerHTML;
        }

        // 그래도 없으면 전체 body를 마지막 대체값으로 사용
        return document.body ? document.body.innerHTML : '';
    });
}

// 상세 게시글 URL을 직접 생성하여 이동하는 함수
async function openDetailById(page, item) {
    const detailUrl = `${DETAIL_BASE_URL}&ntctxt_no=${item.value}`;

    await page.goto(detailUrl, {
        waitUntil: 'domcontentloaded',
        timeout: DETAIL_TIMEOUT_MS
    });
}

// onclick 또는 href 정보를 기반으로 상세 페이지로 이동하는 함수
async function openDetailByLink(page, item) {
    const scriptToRun = item.onclick || item.href.replace('javascript:', '');

    // viewDetail 계열 JavaScript 함수가 있는 경우 목록 페이지에서 스크립트를 실행
    if (scriptToRun && scriptToRun.includes('viewDetail')) {
        await page.goto(LIST_URL, {
            waitUntil: 'domcontentloaded',
            timeout: DETAIL_TIMEOUT_MS
        });

        await page.waitForTimeout(1000);

        await Promise.all([
            page.waitForNavigation({
                waitUntil: 'domcontentloaded',
                timeout: DETAIL_TIMEOUT_MS
            }).catch(() => { }),
            page.evaluate(script => {
                // 기존 사이트의 상세 이동 JavaScript를 실행함
                // 외부 입력이 아닌 게시판에서 추출한 onclick/href만 대상으로 함
                eval(script);
            }, scriptToRun)
        ]);

        return;
    }

    // href가 절대 URL이면 해당 URL로 직접 이동
    if (item.href && item.href.startsWith('http')) {
        await page.goto(item.href, {
            waitUntil: 'domcontentloaded',
            timeout: DETAIL_TIMEOUT_MS
        });

        return;
    }

    // 처리할 수 없는 링크 형태인 경우 오류 발생
    throw new Error(`상세 페이지 이동 방식을 판단할 수 없습니다: ${JSON.stringify(item)}`);
}

// 상세 게시글 하나를 열고 구조화된 레코드를 반환하는 함수
async function scrapeDetailItem(context, item, index, totalCount) {
    logger.info({
        current: index + 1,
        total: totalCount
    }, '상세 게시글을 처리합니다.');

    const detailPage = await context.newPage();

    try {
        // 게시글 번호가 있으면 직접 상세 URL로 이동
        if (item.isId) {
            await openDetailById(detailPage, item);
        } else {
            // 게시글 번호가 없으면 href 또는 onclick 기반으로 이동
            await openDetailByLink(detailPage, item);
        }

        // 상세 페이지 렌더링 대기
        await detailPage.waitForTimeout(DEFAULT_WAIT_MS);

        // 상세 본문 HTML 추출
        const postContent = await extractPostContentFromPage(detailPage);

        // 본문을 찾지 못한 경우 null 반환
        if (!postContent) {
            logger.warn({
                current: index + 1
            }, '상세 게시글 본문을 찾지 못했습니다.');

            return null;
        }

        // HTML 본문을 일반 텍스트로 변환
        const text = htmlToCleanText(postContent);

        // 본문 텍스트를 구조화된 레코드로 변환
        return parsePostText(text);
    } finally {
        // 상세 페이지 닫기
        await detailPage.close();
    }
}

// Excel 워크시트 스타일을 적용하는 함수
function applyWorksheetStyle(worksheet) {
    // 헤더 행 글꼴 및 정렬 설정
    worksheet.getRow(1).font = {
        bold: true
    };

    worksheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center'
    };

    // 전체 행 줄바꿈 및 세로 가운데 정렬
    worksheet.eachRow(row => {
        row.alignment = {
            vertical: 'middle',
            wrapText: true
        };
    });
}

// 수집 결과를 Excel 파일로 저장하는 함수
async function saveRecordsToExcel(records, outputPath) {
    // Excel 워크북 생성
    const workbook = new ExcelJS.Workbook();

    // 워크시트 생성
    const worksheet = workbook.addWorksheet('데이터 활용 사례');

    // 컬럼 정의
    worksheet.columns = [
        { header: '서비스 명', key: '서비스 명', width: 25 },
        { header: '서비스 내용', key: '서비스 내용', width: 40 },
        { header: '활용 데이터', key: '활용 데이터', width: 30 },
        { header: '데이터 활용 내용', key: '데이터 활용 내용', width: 50 },
        { header: '개발사 및 홈페이지', key: '개발사 및 홈페이지', width: 35 },
        { header: '비고', key: '비고', width: 20 },
        { header: '원문 텍스트', key: '원문 텍스트', width: 50 }
    ];

    // 레코드 추가
    records.forEach(record => {
        worksheet.addRow(record);
    });

    // 스타일 적용
    applyWorksheetStyle(worksheet);

    // Excel 파일 저장
    await workbook.xlsx.writeFile(outputPath);
}

// 메인 크롤링 함수
async function scrapeBoard() {
    logger.info('Playwright Chromium 브라우저를 시작합니다.');

    // Chromium 브라우저 실행
    const browser = await chromium.launch({
        headless: true
    });

    try {
        // 브라우저 컨텍스트 생성
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ignoreHTTPSErrors: true
        });

        // 목록 페이지 생성
        const page = await context.newPage();

        logger.info({
            listUrl: LIST_URL
        }, '데이터 활용 사례 게시판 목록 페이지로 이동합니다.');

        // 목록 페이지 접속
        await page.goto(LIST_URL, {
            waitUntil: 'domcontentloaded',
            timeout: PAGE_TIMEOUT_MS
        });

        // 초기 페이지 렌더링 대기
        await page.waitForTimeout(LIST_WAIT_MS);

        // 목록 페이지 전체를 순회하여 상세 게시글 접근 정보 수집
        const detailItems = await collectDetailParams(page);

        logger.info({
            totalCount: detailItems.length
        }, '페이지네이션 크롤링이 완료되었습니다.');

        // 수집할 상세 게시글이 없으면 종료
        if (detailItems.length === 0) {
            logger.warn('클릭 또는 접근 가능한 게시글 항목을 찾지 못했습니다.');
            return;
        }

        const records = [];

        // 상세 게시글을 순차적으로 열어 데이터 추출
        for (let index = 0; index < detailItems.length; index++) {
            try {
                const record = await scrapeDetailItem(
                    context,
                    detailItems[index],
                    index,
                    detailItems.length
                );

                if (record) {
                    records.push(record);
                }
            } catch (err) {
                logger.error({
                    current: index + 1,
                    errorMessage: err.message
                }, '상세 게시글 처리 중 오류가 발생했습니다.');
            }

            // 서버 부담 완화를 위한 짧은 대기
            await sleep(300);
        }

        logger.info({
            recordCount: records.length
        }, '게시글 상세 데이터 수집이 완료되었습니다.');

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