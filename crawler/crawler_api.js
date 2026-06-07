/**
 * 식품안전나라 API 통합 크롤링 및 분석 파이프라인
 *
 * 기능:
 * - 식품안전나라 API 데이터셋 목록을 유형별 카테고리 기준으로 수집함
 * - 데이터셋별 상세 메타데이터, 출력항목, 샘플 XML/JSON 데이터를 저장함
 * - 수집 결과를 crawl_cache.json 및 samples 디렉터리에 저장함
 * - 공통키 식별, 결합 시나리오 도출 후 엑셀 분석 보고서를 생성함
 */

// Playwright의 Chromium 브라우저 객체를 불러옴
const { chromium } = require('playwright');

// XML 샘플 데이터를 JSON으로 변환하기 위한 XMLParser 불러오기
const { XMLParser } = require('fast-xml-parser');

// 파일 읽기, 쓰기, 존재 여부 확인을 위한 fs 모듈 불러오기
const fs = require('fs');

// 파일 및 디렉터리 경로 처리를 위한 path 모듈 불러오기
const path = require('path');

// 터미널 입력을 처리하기 위한 readline 모듈 불러오기
const readline = require('readline');

// console 대신 사용할 pino logger 불러오기
const pino = require('pino');

// 통합 분석 파이프라인 불러오기 (공통키 식별 → 시나리오 도출 → 엑셀 생성)
const { runAnalysis } = require('./pipeline');

// 크롤링 결과 메타데이터를 저장할 캐시 파일 경로
const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');

// 최종 생성할 엑셀 보고서 파일명
const OUTPUT_XLSX = '식품안전나라_API_분석결과.xlsx';

// pino logger 설정
const logger = pino({
  // 로그 레벨 설정
  level: process.env.LOG_LEVEL || 'info',

  // 로그를 보기 좋게 출력하기 위한 pino-pretty 설정
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

// 터미널에서 사용자 입력을 받는 함수
function askQuestion(query) {
  // readline 인터페이스 생성
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 입력값을 Promise로 반환한 뒤 readline 인터페이스 종료
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

// 식품안전나라 API 크롤링, 메타데이터 분석, 엑셀 보고서 생성을 수행하는 메인 함수
async function run() {
  // 통합 파이프라인 시작 로그 출력
  logger.info('식품안전나라 통합 파이프라인을 시작합니다.');

  // 명령행 인자 추출
  const args = process.argv.slice(2);

  // 강제 재크롤링 옵션 여부 확인
  // 사용자가 강제로 재크롤링하도록 수정한 부분 (무조건 덮어쓰기)
  const hasForce = true; // args.includes('--force') || args.includes('-f');

  // 크롤링 시작 로그 출력
  logger.info({
    skipDuplicate: hasForce ? '비활성화, 강제 재크롤링' : '활성화',
    maxItemsArg: args.find(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-')) || '제한 없음 (기본값 170)'
  }, '식품안전나라 API 크롤링을 시작합니다.');

  // 샘플 데이터 저장 디렉터리 경로 설정
  const samplesDir = path.join(__dirname, 'samples');

  // 샘플 디렉터리가 없으면 새로 생성
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
    logger.info({ samplesDir }, '샘플 저장 디렉터리를 생성했습니다.');
  }

  // 기존 캐시 데이터를 저장할 배열 초기화
  let cacheList = [];

  // 기존 캐시 파일이 있으면 로드
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cacheList = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      logger.info({ count: cacheList.length, cacheFile: CACHE_FILE }, '기존 캐시 파일을 불러왔습니다.');
    } catch (err) {
      logger.warn({ err }, '캐시 파일 파싱에 실패하여 새로 시작합니다.');
    }
  } else {
    logger.info('기존 캐시 파일이 없어 신규 수집을 시작합니다.');
  }

  // 서비스 번호 기준으로 캐시 데이터를 빠르게 조회할 수 있도록 객체로 변환
  const cacheMap = cacheList.reduce((acc, item) => {
    acc[item.svc_no] = item;
    return acc;
  }, {});

  // Chromium 브라우저 실행
  const browser = await chromium.launch({
    headless: true,
    args: ['--start-maximized']
  });

  // 브라우저 컨텍스트 생성
  const context = await browser.newContext({ viewport: null });

  // 새 페이지 생성
  const page = await context.newPage();

  try {
    // 식품안전나라 API 메인 페이지 URL
    const mainUrl = 'https://www.foodsafetykorea.go.kr/apiMain.do';

    // 메인 페이지 접속 로그 출력
    logger.info({ url: mainUrl }, '식품안전나라 API 메인 페이지에 접속합니다.');

    // 메인 페이지로 이동
    await page.goto(mainUrl, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(2000);

    // 메인 팝업 닫기 버튼 탐색
    const closeBtn = page.locator('a[href*="popclose"], a:has-text("닫기")').first();

    // 팝업 닫기 버튼이 보이면 클릭
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
      logger.info('메인 팝업을 닫았습니다.');
    }

    // 데이터공개 메뉴 클릭 로그 출력
    logger.info('데이터공개 메뉴를 클릭합니다.');

    // 데이터공개 메뉴 버튼 탐색
    const dataOpenBtn = page.locator('a[href="javascript:fn_skip();"]:has(span:has-text("데이터공개"))').first();

    // 데이터공개 메뉴 버튼이 보이면 클릭
    if (await dataOpenBtn.isVisible()) {
      await dataOpenBtn.click();
      await page.waitForTimeout(1000);
    }

    // 유형별 메뉴 클릭 로그 출력
    logger.info('유형별 메뉴를 클릭합니다.');

    // 유형별 메뉴 버튼 탐색
    const typeBtn = page.locator('a[href*="svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31"], a:has-text("유형별")').first();

    // 유형별 메뉴 버튼이 보이면 클릭하고, 없으면 목록 페이지로 직접 이동
    if (await typeBtn.isVisible()) {
      await typeBtn.click();
      await page.waitForTimeout(2000);
    } else {
      logger.warn('유형별 메뉴 버튼을 찾지 못해 목록 페이지로 직접 이동합니다.');

      await page.goto(
        'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31',
        { waitUntil: 'domcontentloaded', timeout: 90000 }
      );

      await page.waitForTimeout(2000);
    }

    // 추가 팝업이 보이면 다시 닫기
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }

    // 분류 선택 박스 탐색
    const selectLocator = page.locator('#search_clCdCode');

    // 분류 선택 박스의 option 개수 확인
    const optionsCount = await selectLocator.locator('option').count();

    // 카테고리 목록 배열 초기화
    const categories = [];

    // option 목록에서 카테고리 코드와 이름 추출
    for (let i = 0; i < optionsCount; i++) {
      const val = await selectLocator.locator('option').nth(i).getAttribute('value');
      const text = await selectLocator.locator('option').nth(i).innerText();

      if (val && val !== '') {
        categories.push({ val, text });
      }
    }

    // 카테고리 추출 결과 로그 출력
    logger.info({ count: categories.length }, '분류 카테고리 목록을 추출했습니다.');

    // 숫자형 명령행 인자가 있으면 최대 수집 건수로 사용
    const limitMatch = args.find(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-'));

    // 최대 수집 건수 설정 (기본값 170)
    const maxItems = limitMatch ? parseInt(limitMatch, 10) : 170;

    // 전체 수집 항목 수 초기화
    let globalItemCount = 0;

    // 카테고리별 크롤링 반복
    for (const cat of categories) {
      // 전체 수집 한도에 도달하면 조기 종료
      if (globalItemCount >= maxItems) {
        logger.warn({ maxItems }, '전역 수집 한도에 도달하여 크롤링을 조기 종료합니다.');
        break;
      }

      // 현재 카테고리 탐색 시작 로그 출력
      logger.info({ categoryName: cat.text, categoryCode: cat.val }, '카테고리 탐색을 시작합니다.');

      // 현재 카테고리 선택
      await page.selectOption('#search_clCdCode', cat.val);
      await page.waitForTimeout(500);

      // 검색 버튼 탐색
      const searchBtn = page.locator('a[href="javascript:setDefault();"], a.btn-default_new:has-text("검색")').first();

      // 검색 버튼이 보이면 클릭
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
        await page.waitForTimeout(2000);
      }

      // 현재 페이지 번호 초기화
      let pageNum = 1;

      // 다음 페이지 존재 여부 초기화
      let hasNextPage = true;

      // 현재 카테고리의 페이지를 순차적으로 크롤링
      while (hasNextPage) {
        // 전체 수집 한도에 도달하면 반복 종료
        if (globalItemCount >= maxItems) {
          break;
        }

        // 현재 목록 페이지 크롤링 시작 로그 출력
        logger.info({ categoryName: cat.text, pageNum }, '목록 페이지 크롤링을 진행합니다.');

        // 목록 영역으로 스크롤 이동
        await page.locator('#listFrame').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // 목록 행 개수 확인
        const rowCount = await page.locator('#listFrame tr').count();

        // 행이 없으면 현재 페이지 종료
        if (rowCount === 0) {
          logger.warn({ categoryName: cat.text, pageNum }, '현재 페이지에 수집할 항목이 없습니다.');
          break;
        }

        // 목록 행 단위로 데이터셋 크롤링
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          // 전체 수집 한도에 도달하면 반복 종료
          if (globalItemCount >= maxItems) {
            break;
          }

          try {
            // 목록 행이 보일 때까지 대기
            await page.waitForSelector('#listFrame tr', { state: 'visible', timeout: 10000 }).catch(() => { });

            // 현재 행 선택
            const rowLocator = page.locator('#listFrame tr').nth(rowIndex);

            // 번호 셀 선택
            const numCell = rowLocator.locator('td.num').first();

            // 항목 번호 초기화
            let itemNum = 0;

            // 번호 셀이 있으면 항목 번호 추출
            if (await numCell.isVisible()) {
              const parsed = parseInt((await numCell.innerText()).trim(), 10);

              if (!isNaN(parsed)) {
                itemNum = parsed;
              }
            }

            // 데이터셋 상세 링크 선택
            const linkLocator = rowLocator.locator('td.tl a').first();

            // 상세 링크가 없는 행은 건너뜀
            if (!(await linkLocator.isVisible().catch(() => false))) {
              continue;
            }

            // 전체 수집 항목 수 증가
            globalItemCount++;

            // 상세 링크가 보이도록 스크롤 이동
            await linkLocator.scrollIntoViewIfNeeded();

            // 데이터셋명 추출
            const datasetName = await linkLocator.innerText();

            // 서비스 번호 기본값 설정
            let svcNo = 'dataset';

            // 상세 링크 href 속성 추출
            const hrefAttr = await linkLocator.getAttribute('href') || '';

            // href에서 서비스 번호 추출
            const svcNoMatch = hrefAttr.match(/'([^']+)'/);

            // 서비스 번호가 있으면 적용
            if (svcNoMatch && svcNoMatch[1]) {
              svcNo = svcNoMatch[1];
            }

            // 제공기관 기본값 설정
            let provdInsttNm = '식품의약품안전처';

            // 제공기관 후보 셀 조회
            const tcCells = rowLocator.locator('td.tc');

            // 제공기관 후보 셀 개수 확인
            const tcCount = await tcCells.count();

            // td.tc 기준으로 제공기관 추출
            if (tcCount > 0) {
              const provdCell = tcCount > 1 ? tcCells.nth(1) : tcCells.nth(0);
              const tcText = await provdCell.innerText().catch(() => '');

              if (tcText.trim()) {
                provdInsttNm = tcText.trim();
              }
            } else {
              // td.tc가 없으면 일반 td 기준으로 제공기관 추출 시도
              const tdCells = rowLocator.locator('td');
              const tdCount = await tdCells.count();

              if (tdCount >= 4) {
                const provdText = await tdCells.nth(3).innerText().catch(() => '');

                if (provdText.trim() && !provdText.includes('label')) {
                  provdInsttNm = provdText.trim();
                }
              }
            }

            // 현재 선택된 카테고리명 저장
            const list_cat = cat.text;

            // 현재 선택된 카테고리 코드 저장
            const list_cat_code = cat.val;

            // 샘플 JSON 파일 경로 설정
            const jsonFilePath = path.join(samplesDir, `${svcNo}.json`);

            // 캐시 메타데이터 보유 여부 확인
            const hasMetadata = cacheMap[svcNo] && cacheMap[svcNo].fields && cacheMap[svcNo].fields.length > 0;

            // 샘플 파일과 메타데이터가 이미 있으면 중복 수집 생략
            if (fs.existsSync(jsonFilePath) && hasMetadata && !hasForce) {
              logger.info({
                itemNum: itemNum || 'N/A',
                datasetName: datasetName.trim(),
                svcNo
              }, '샘플 파일과 메타데이터가 이미 있어 해당 항목을 건너뜁니다.');

              continue;
            }

            // 기본 샘플 API URL 설정
            let sampleUrl = `http://openapi.foodsafetykorea.go.kr/api/sample/${svcNo}/xml/1/5`;

            // 샘플 데이터 길이 초기화
            let sampleDataLength = 0;

            // 데이터셋 상세 크롤링 시작 로그 출력
            logger.info({
              itemNum: itemNum || 'N/A',
              datasetName: datasetName.trim(),
              svcNo
            }, '데이터셋 상세 크롤링을 시작합니다.');

            // 상세 페이지로 이동
            await page.waitForTimeout(500);
            await linkLocator.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            // 데이터셋 설명 기본값 설정
            let desc = '';

            // 설명 영역 탐색
            const descTag = page.locator('.cont-desc, .api-desc, .summary, p.desc').first();

            // 설명 영역이 있으면 텍스트 추출
            if (await descTag.isVisible()) {
              desc = (await descTag.innerText()).replace(/\s+/g, ' ').trim().substring(0, 300);
            }

            // ── 상세 페이지에서 주관기관 추출 (목록 값보다 우선) ──
            const provdSelectors = [
              'tr:has(th:has-text("주관기관")) td',
              'tr:has(th:has-text("제공기관")) td',
              'tr:has(td:has-text("주관기관")) td:nth-child(2)',
              '.info-list tr:has(th:has-text("기관")) td',
              'table.api-info tr:has(th:has-text("기관")) td',
            ];
            for (const sel of provdSelectors) {
              try {
                const el = page.locator(sel).first();
                if (await el.isVisible({ timeout: 1500 })) {
                  const txt = (await el.innerText()).trim();
                  if (txt && txt.length < 50) {
                    provdInsttNm = txt;
                    break;
                  }
                }
              } catch (_) { }
            }

            // OPEN-API 탭 탐색
            const openApiTab = page.locator('a#tabs3, a[href="#tab3"], a:has-text("OPEN-API")').first();

            // 출력항목 필드 목록 초기화
            const fields = [];

            // OPEN-API 탭이 있으면 클릭 후 출력항목 테이블 파싱
            if (await openApiTab.isVisible()) {
              await openApiTab.click();
              await page.waitForTimeout(1000);

              // 출력항목 테이블 탐색
              const tbl = page.locator('#view-item table, .tab-pane#view-item table').first();

              // 출력항목 테이블이 있으면 필드 정보 추출
              if (await tbl.isVisible()) {
                const rows = tbl.locator('tr');
                const fieldRowCount = await rows.count();

                // 첫 번째 행은 헤더로 보고 두 번째 행부터 파싱
                for (let r = 1; r < fieldRowCount; r++) {
                  const cols = rows.nth(r).locator('td, th');
                  const colCount = await cols.count();
                  const colTexts = [];

                  // 현재 행의 모든 셀 텍스트 추출
                  for (let c = 0; c < colCount; c++) {
                    colTexts.push((await cols.nth(c).innerText()).replace(/\s+/g, ' ').trim());
                  }

                  // 필드명, 한글명, 타입, 길이, 설명, 샘플값 추출
                  if (colTexts.length >= 2) {
                    let field = '';
                    let kor_nm = '';
                    let type = '';
                    let length = '';
                    let fieldDesc = '';
                    let sample = '';

                    // 첫 번째 열이 영문 필드명인 경우
                    if (/^[A-Z][A-Z0-9_]{1,}$/.test(colTexts[0])) {
                      [field, kor_nm, type, length, fieldDesc, sample] = colTexts;
                    } else if (/^[A-Z][A-Z0-9_]{1,}$/.test(colTexts[1])) {
                      // 두 번째 열이 영문 필드명인 경우
                      [, field, kor_nm, type, length, fieldDesc, sample] = colTexts;
                    }

                    // 필드명이 있으면 필드 목록에 추가
                    if (field) {
                      fields.push({ field, kor_nm, type, length, desc: fieldDesc, sample });
                    }
                  }
                }
              }

              // 샘플 API 링크 탐색
              const sampleLinkLocator = page.locator(
                'tr:has(th:has-text("샘플")) td a, tr:has(th.taR:has-text("샘플")) td a, a[href*="openapi.foodsafetykorea.go.kr/api"]'
              ).first();

              // 샘플 링크가 있으면 샘플 데이터 수집
              if (await sampleLinkLocator.isVisible()) {
                let foundUrl = await sampleLinkLocator.getAttribute('href') || '';

                if (foundUrl.startsWith('http')) {
                  // 인증키 포함 URL이면 sample 엔드포인트로 교체
                  if (foundUrl.includes('/keyId/')) {
                    foundUrl = foundUrl.replace('/keyId/', '/sample/');
                  }

                  // 실제 사용할 샘플 URL 설정
                  sampleUrl = foundUrl;

                  // 샘플 데이터 수집 성공 여부
                  let success = false;

                  // 샘플 데이터 수집은 최대 10회 재시도
                  for (let retry = 1; retry <= 10; retry++) {
                    let popup;

                    try {
                      // 샘플 데이터 수집 시도 로그 출력
                      logger.info({ sampleUrl, retry, maxRetry: 10 }, '샘플 데이터 수집을 시도합니다.');

                      // 새 팝업 창으로 샘플 URL 열기
                      const [newPopup] = await Promise.all([
                        context.waitForEvent('page', { timeout: 10000 }),
                        page.evaluate((url) => window.open(url), sampleUrl)
                      ]);

                      // 팝업 페이지 참조 저장
                      popup = newPopup;

                      // 팝업 페이지 로딩 대기
                      await popup.waitForLoadState('networkidle', { timeout: 30000 });
                      await popup.waitForTimeout(1500);

                      // 팝업 body 텍스트 추출
                      const rawContent = await popup.locator('body').innerText({ timeout: 10000 });

                      // 샘플 데이터가 있으면 파일로 저장
                      if (rawContent && rawContent.trim().length > 0) {
                        sampleDataLength = rawContent.trim().length;

                        // 샘플 URL 기준으로 파일 확장자 결정
                        const ext = sampleUrl.includes('/json') ? 'json' : 'xml';

                        // 원본 샘플 파일 경로 설정
                        const filePath = path.join(samplesDir, `${svcNo}.${ext}`);

                        // 원본 샘플 파일 저장
                        fs.writeFileSync(filePath, rawContent.trim(), 'utf-8');

                        // 원본 샘플 파일 저장 완료 로그 출력
                        logger.info({ filePath: `samples/${svcNo}.${ext}` }, '원본 샘플 파일 저장이 완료되었습니다.');

                        // XML 샘플인 경우 JSON으로 변환하여 추가 저장
                        if (ext === 'xml') {
                          const xmlParser = new XMLParser({
                            ignoreAttributes: true,
                            parseTagValue: false,
                            isArray: (name) => name === 'row'
                          });

                          // XML 문자열을 JSON 객체로 변환
                          const jsonObj = xmlParser.parse(rawContent.trim());

                          // 불필요한 XML 선언 객체 제거
                          if (jsonObj && typeof jsonObj === 'object') {
                            delete jsonObj['?xml'];
                            delete jsonObj['xml'];
                          }

                          // 변환된 JSON 샘플 파일 저장
                          fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2), 'utf-8');

                          // JSON 변환 저장 완료 로그 출력
                          logger.info({ filePath: `samples/${svcNo}.json` }, 'XML 샘플 데이터를 JSON으로 변환하여 저장했습니다.');
                        }

                        // 샘플 수집 성공 처리
                        success = true;
                      }

                      // 팝업 닫기
                      await popup.close();

                      // 성공 시 재시도 반복 종료
                      if (success) {
                        break;
                      }
                    } catch (err) {
                      // 오류 발생 시 팝업이 열려 있으면 닫기
                      if (popup && !popup.isClosed()) {
                        await popup.close().catch(() => { });
                      }

                      // 샘플 수집 실패 로그 출력
                      logger.warn({
                        retry,
                        maxRetry: 10,
                        errorMessage: err.message.split('\n')[0]
                      }, '샘플 데이터 수집 시도가 실패했습니다.');

                      // 마지막 시도가 아니면 잠시 대기 후 재시도
                      if (retry < 10) {
                        await page.waitForTimeout(2000);
                      }
                    }
                  }

                  // 모든 재시도가 실패한 경우 오류 로그 출력
                  if (!success) {
                    logger.error({ sampleUrl }, '샘플 데이터 추출이 최종 실패했습니다.');
                  }
                }
              }
            }

            // 현재 데이터셋의 메타데이터를 캐시에 반영
            cacheMap[svcNo] = {
              svc_no: svcNo,
              svc_nm: datasetName.trim(),
              cat: list_cat,
              cat_code: list_cat_code,
              provd_instt_nm: provdInsttNm,
              data_type_nm: 'XML/JSON',
              detail_url: `https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?svc_no=${svcNo}`,
              type_cd: 'API_TYPE06',
              fields,
              desc,
              error: '',
              sample_url: sampleUrl,
              sample_data_length: sampleDataLength || (
                fs.existsSync(jsonFilePath)
                  ? fs.readFileSync(jsonFilePath, 'utf-8').length
                  : 0
              ),
            };

            // 중간 중단 시 데이터 유실을 방지하기 위해 캐시 파일 즉시 저장
            fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.values(cacheMap), null, 2), 'utf-8');

            // 데이터셋 크롤링 완료 로그 출력
            logger.info({
              datasetName: datasetName.trim(),
              svcNo
            }, '데이터셋 크롤링이 완료되었습니다.');

            // 목록 버튼 탐색
            const listBtn = page.locator('a[href*="fn_moveToDataList"], a:has-text("목록")').first();

            // 목록 버튼 클릭 후 목록 페이지로 복귀
            await listBtn.waitFor({ state: 'visible', timeout: 10000 });
            await listBtn.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);
          } catch (itemErr) {
            logger.error({ err: itemErr, rowIndex }, '항목 크롤링 중 오류가 발생하여 건너뜁니다.');
            try {
              const recoveryListBtn = page.locator('a[href*="fn_moveToDataList"], a:has-text("목록")').first();
              if (await recoveryListBtn.isVisible({ timeout: 3000 })) {
                await recoveryListBtn.click();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(1000);
              } else {
                await page.goBack().catch(() => { });
                await page.waitForTimeout(2000);
              }
            } catch (recoveryErr) {
              logger.warn('오류 복구(목록으로 돌아가기) 중 추가 예외가 발생하여 무시합니다.');
            }
          }
        }

        // 다음 페이지 번호 계산
        const nextPage = pageNum + 1;

        // 다음 페이지 확인 로그 출력
        logger.info({ currentPage: pageNum, nextPage }, '다음 페이지 존재 여부를 확인합니다.');

        // 페이지네이션 영역 탐색
        const paginationContainer = page.locator('.pagination, .page-link').first();

        // 페이지네이션이 없으면 현재 카테고리 종료
        if (!(await paginationContainer.isVisible())) {
          hasNextPage = false;
          break;
        }

        // 다음 페이지 버튼 탐색
        const nextPageBtn = page.locator(`.pagination a[onclick*="linkPage(${nextPage})"], .pagination a:has-text("${nextPage}")`).first();

        // 다음 페이지 버튼이 보이면 클릭
        if (await nextPageBtn.isVisible()) {
          await nextPageBtn.click();
          await page.waitForTimeout(2000);
          pageNum++;
        } else {
          // 10페이지 단위 다음 블록 버튼 탐색
          const nextBlockBtn = page.locator('.pagination a.next, .pagination a:has-text(">")').first();

          // 다음 블록 버튼이 있으면 클릭
          if (await nextBlockBtn.isVisible()) {
            await nextBlockBtn.click();
            await page.waitForTimeout(2000);

            // 다음 블록 이동 후 다음 페이지 버튼 재탐색
            const nextPageBtnAfterBlock = page.locator(`.pagination a[onclick*="linkPage(${nextPage})"], .pagination a:has-text("${nextPage}")`).first();

            // 다음 페이지 버튼이 보이면 클릭
            if (await nextPageBtnAfterBlock.isVisible()) {
              await nextPageBtnAfterBlock.click();
              await page.waitForTimeout(2000);
              pageNum++;
            } else {
              // 다음 페이지가 없으면 현재 카테고리 종료
              hasNextPage = false;
            }
          } else {
            // 다음 블록 버튼이 없으면 현재 카테고리 종료
            hasNextPage = false;
          }
        }
      }
    }
  } catch (error) {
    // 크롤링 실행 중 오류 로그 출력
    logger.error({ err: error }, '크롤링 실행 중 오류가 발생했습니다.');
  } finally {
    // 브라우저 종료
    await browser.close();

    // 브라우저 종료 완료 로그 출력
    logger.info('브라우저를 정상적으로 종료했습니다.');

    // JSON 파일 갯수 확인 및 출력
    if (fs.existsSync(samplesDir)) {
      const files = fs.readdirSync(samplesDir);
      const jsonCount = files.filter(f => f.endsWith('.json')).length;
      logger.info({ jsonCount }, `총 처리된 JSON 파일 갯수는 ${jsonCount}개입니다.`);
    }
  }

  // 분석 파이프라인 실행 (공통키 식별 → 시나리오 도출 → 엑셀 생성)
  await runAnalysis(CACHE_FILE, OUTPUT_XLSX);
}

// 현재 파일을 직접 실행한 경우에만 run 함수 실행
if (require.main === module) {
  run();
}

// 외부 모듈에서 사용할 수 있도록 run 함수 내보내기
module.exports = { run };