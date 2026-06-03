const { chromium } = require('playwright');
const { XMLParser } = require('fast-xml-parser'); // [FIX] 루프 안 반복 require 제거 → 상단에서 1회 선언
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { buildExcel } = require('./excel_reporter');
const { identifyCommonKeys, deriveScenarios } = require('./analyzer');

// ─────────────────────────────────────────────
// 설정 상수
// ─────────────────────────────────────────────
const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');              // 크롤링 결과를 저장할 캐시 파일 경로
const OUTPUT_XLSX = "식품안전나라_API_분석결과.xlsx"; // 최종 엑셀 보고서 파일명

// ─────────────────────────────────────────────
// 로그 유틸리티
// ─────────────────────────────────────────────
const log = {
  info: (msg) => console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toLocaleTimeString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${msg}`),
};

// ─────────────────────────────────────────────
// 터미널 입력 프롬프트 헬퍼
// ─────────────────────────────────────────────
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // 사용자 입력을 받아 Promise로 반환하고 readline 인터페이스를 닫음
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

// 메인 실행 함수 (STEP 1~5 통합 파이프라인)
// ═════════════════════════════════════════════════════════════
async function run() {
  console.log('[START] 식품안전나라 통합 파이프라인 시작 (crawler.js)');

  const args = process.argv.slice(2);
  const hasForce = args.includes('--force') || args.includes('-f'); // 강제 재크롤링 플래그

  console.log(`\n[실행 설정 요약]`);
  console.log(`   - 크롤링 방식     : 유형별 전체 카테고리 순회`);
  console.log(`   - 중복 건너뛰기   : ${hasForce ? '비활성화 (강제 재크롤링)' : '활성화'}`);
  console.log(`   - 캐시 파일       : ${CACHE_FILE}`);
  console.log(`   - 엑셀 출력 경로  : ${OUTPUT_XLSX}\n`);

  // ── 2. 샘플 디렉토리 준비 ──
  const samplesDir = path.join(__dirname, 'samples');
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
  }

  // ── 3. 기존 캐시 로드 ──
  let cacheList = [];
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cacheList = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      log.info(`기존 캐시에서 ${cacheList.length}건 로드 완료 (${CACHE_FILE})`);
    } catch (err) {
      log.warn(`캐시 파일 파싱 실패, 새로 시작합니다: ${err.message}`);
    }
  }

  const cacheMap = cacheList.reduce((acc, item) => {
    acc[item.svc_no] = item;
    return acc;
  }, {});

  // ── 4. Playwright 브라우저 실행 ──
  const browser = await chromium.launch({
    headless: true,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    const mainUrl = 'https://www.foodsafetykorea.go.kr/apiMain.do';
    console.log(`[NAV] 메인 페이지 진입: ${mainUrl}`);
    await page.goto(mainUrl, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(2000);

    // 메인 팝업 닫기
    const closeBtn = page.locator('a[href*="popclose"], a:has-text("닫기")').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }

    // ── 데이터공개 클릭 ──
    console.log('[NAV] "데이터공개" 메뉴 클릭');
    const dataOpenBtn = page.locator('a[href="javascript:fn_skip();"]:has(span:has-text("데이터공개"))').first();
    if (await dataOpenBtn.isVisible()) {
      await dataOpenBtn.click();
      await page.waitForTimeout(1000);
    }

    // ── 유형별 클릭 ──
    console.log('[NAV] "유형별" 메뉴 클릭');
    const typeBtn = page.locator('a[href*="svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31"], a:has-text("유형별")').first();
    if (await typeBtn.isVisible()) {
      await typeBtn.click();
      await page.waitForTimeout(2000);
    } else {
      await page.goto(
        'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31',
        { waitUntil: 'domcontentloaded', timeout: 90000 }
      );
      await page.waitForTimeout(2000);
    }

    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }

    // ── 카테고리 추출 ──
    const selectLocator = page.locator('#search_clCdCode');
    const optionsCount = await selectLocator.locator('option').count();
    const categories = [];
    for (let i = 0; i < optionsCount; i++) {
      const val = await selectLocator.locator('option').nth(i).getAttribute('value');
      const text = await selectLocator.locator('option').nth(i).innerText();
      if (val && val !== '') categories.push({ val, text });
    }
    console.log(`[INFO] 총 ${categories.length}개의 분류 카테고리를 순차적으로 수집합니다.`);

    const limitMatch = args.find(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-'));
    const maxItems = limitMatch ? parseInt(limitMatch, 10) : 999999;
    let globalItemCount = 0;

    // ── 카테고리별 루프 ──
    for (const cat of categories) {
      if (globalItemCount >= maxItems) {
        console.log(`\n[STOP] 전역 한도(${maxItems}개) 도달. 크롤링을 조기 종료합니다.`);
        break;
      }

      console.log(`\n======================================================`);
      console.log(`[CATEGORY] ${cat.text} (${cat.val}) 탐색 시작`);
      console.log(`======================================================`);

      await page.selectOption('#search_clCdCode', cat.val);
      await page.waitForTimeout(500);

      const searchBtn = page.locator('a[href="javascript:setDefault();"], a.btn-default_new:has-text("검색")').first();
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
        await page.waitForTimeout(2000);
      }

      let pageNum = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        if (globalItemCount >= maxItems) break;

        console.log(`\n  [PAGE ${pageNum}] ${cat.text} 크롤링 진행 중`);
        await page.locator('#listFrame').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const rowCount = await page.locator('#listFrame tr').count();
        if (rowCount === 0) {
          console.log(`   항목이 없습니다.`);
          break;
        }

        // ── 행(Row) 단위 크롤링 루프 ──
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          if (globalItemCount >= maxItems) break;

          // 목록 복귀 후 DOM이 로드될 때까지 대기
          await page.waitForSelector('#listFrame tr', { state: 'visible', timeout: 10000 }).catch(() => { });

          const rowLocator = page.locator('#listFrame tr').nth(rowIndex);

          const numCell = rowLocator.locator('td.num').first();
          let itemNum = 0;
          if (await numCell.isVisible()) {
            const parsed = parseInt((await numCell.innerText()).trim(), 10);
            if (!isNaN(parsed)) itemNum = parsed;
          }

          // 데이터셋명과 서비스 번호 추출
          const linkLocator = rowLocator.locator('td.tl a').first();

          // 링크가 없는 헤더/빈 행/안내 행은 건너뜀
          if (!(await linkLocator.isVisible().catch(() => false))) {
            continue;
          }

          globalItemCount++;

          await linkLocator.scrollIntoViewIfNeeded();
          const datasetName = await linkLocator.innerText();

          let svcNo = "dataset";
          const hrefAttr = await linkLocator.getAttribute('href') || "";
          const svcNoMatch = hrefAttr.match(/'([^']+)'/);
          if (svcNoMatch && svcNoMatch[1]) svcNo = svcNoMatch[1];

          // 현재 선택된 카테고리 정보 적용
          let list_cat = cat.text;
          let list_cat_code = cat.val;

          // ── 스마트 중복 건너뛰기 ──
          // 샘플 JSON 파일과 캐시 메타데이터가 모두 있으면 재크롤링 생략
          const jsonFilePath = path.join(samplesDir, `${svcNo}.json`);
          const hasMetadata = cacheMap[svcNo] && cacheMap[svcNo].fields && cacheMap[svcNo].fields.length > 0;

          if (fs.existsSync(jsonFilePath) && hasMetadata && !hasForce) {
            console.log(`   [SKIP] 항목 ${itemNum || 'N/A'} "${datasetName.trim()}" (${svcNo}) - 샘플 및 메타데이터 존재`);
            continue;
          }

          let sampleUrl = `http://openapi.foodsafetykorea.go.kr/api/sample/${svcNo}/xml/1/5`;
          let sampleDataLength = 0;

          console.log(`[CRAWL] 항목 ${itemNum || 'N/A'} "${datasetName.trim()}" (${svcNo}) 상세 크롤링 시작...`);

          // 상세 페이지로 이동
          await page.waitForTimeout(500);
          await linkLocator.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(1000);

          // 데이터셋 설명 추출
          let desc = "";
          const descTag = page.locator('.cont-desc, .api-desc, .summary, p.desc').first();
          if (await descTag.isVisible()) {
            desc = (await descTag.innerText()).replace(/\s+/g, ' ').trim().substring(0, 300);
          }

          // OPEN-API 탭 클릭하여 출력항목 테이블 접근
          const openApiTab = page.locator('a#tabs3, a[href="#tab3"], a:has-text("OPEN-API")').first();
          const fields = [];

          if (await openApiTab.isVisible()) {
            await openApiTab.click();
            await page.waitForTimeout(1000);

            // ── 출력항목 테이블 파싱 (STEP 2 핵심) ──
            const tbl = page.locator('#view-item table, .tab-pane#view-item table').first();
            if (await tbl.isVisible()) {
              const rows = tbl.locator('tr');
              const rowCount = await rows.count();

              for (let r = 1; r < rowCount; r++) {
                const cols = rows.nth(r).locator('td, th');
                const colCount = await cols.count();
                const colTexts = [];

                for (let c = 0; c < colCount; c++) {
                  colTexts.push((await cols.nth(c).innerText()).replace(/\s+/g, ' ').trim());
                }

                if (colTexts.length >= 2) {
                  let field = "", kor_nm = "", type = "", length = "", desc = "", sample = "";

                  if (/^[A-Z][A-Z0-9_]{1,}$/.test(colTexts[0])) {
                    // 첫 번째 열이 영문 필드명인 경우 (일반 형식)
                    [field, kor_nm, type, length, desc, sample] = colTexts;
                  } else if (/^[A-Z][A-Z0-9_]{1,}$/.test(colTexts[1])) {
                    // 두 번째 열이 영문 필드명인 경우 (번호 열이 앞에 있는 형식)
                    [, field, kor_nm, type, length, desc, sample] = colTexts;
                  }

                  if (field) {
                    fields.push({ field, kor_nm, type, length, desc, sample });
                  }
                }
              }
            }

            // ── 샘플 데이터 다운로드 및 JSON 변환 ──
            const sampleLinkLocator = page.locator(
              'tr:has(th:has-text("샘플")) td a, tr:has(th.taR:has-text("샘플")) td a, a[href*="openapi.foodsafetykorea.go.kr/api"]'
            ).first();

            if (await sampleLinkLocator.isVisible()) {
              let foundUrl = await sampleLinkLocator.getAttribute('href') || "";
              if (foundUrl.startsWith('http')) {
                // 인증키 포함 URL은 sample 엔드포인트로 교체
                if (foundUrl.includes('/keyId/')) {
                  foundUrl = foundUrl.replace('/keyId/', '/sample/');
                }
                sampleUrl = foundUrl;

              let success = false;
              for (let retry = 1; retry <= 3; retry++) {
                let popup;
                try {
                  console.log(`   [SAMPLE] ${sampleUrl} (시도 ${retry}/3)`);
                  const [newPopup] = await Promise.all([
                    context.waitForEvent('page', { timeout: 10000 }),
                    page.evaluate((url) => window.open(url), sampleUrl)
                  ]);
                  popup = newPopup;

                  // 30초 대기 추가
                  await popup.waitForLoadState('networkidle', { timeout: 30000 });
                  await popup.waitForTimeout(1500);

                  const rawContent = await popup.locator('body').innerText({ timeout: 10000 });
                  if (rawContent && rawContent.trim().length > 0) {
                    sampleDataLength = rawContent.trim().length;
                    const ext = sampleUrl.includes('/json') ? 'json' : 'xml';
                    const filePath = path.join(samplesDir, `${svcNo}.${ext}`);

                    // 원본 샘플(XML 또는 JSON) 저장
                    fs.writeFileSync(filePath, rawContent.trim(), 'utf-8');
                    console.log(`      [OK] 저장 완료: samples/${svcNo}.${ext}`);

                    // XML인 경우 JSON으로 변환하여 추가 저장
                    if (ext === 'xml') {
                      const xmlParser = new XMLParser({
                        ignoreAttributes: true,
                        parseTagValue: false,
                        isArray: (name) => name === 'row'
                      });
                      const jsonObj = xmlParser.parse(rawContent.trim());
                      if (jsonObj && typeof jsonObj === 'object') {
                        delete jsonObj['?xml'];
                        delete jsonObj['xml'];
                      }
                      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2), 'utf-8');
                      console.log(`      [OK] JSON 변환 완료: samples/${svcNo}.json`);
                    }
                    success = true;
                  }
                  await popup.close();
                  if (success) break; // 성공 시 루프 탈출
                } catch (err) {
                  if (popup && !popup.isClosed()) {
                    await popup.close().catch(() => {});
                  }
                  console.log(`      [ERROR] 시도 ${retry} 실패: ${err.message.split('\\n')[0]}`);
                  if (retry < 3) await page.waitForTimeout(2000); // 다음 시도 전 2초 대기
                }
              }

              if (!success) {
                console.log(`      [FAIL] 샘플 추출 최종 실패 (${sampleUrl})`);
              }
              }
            }
          }

          // ── 메타데이터 캐시 저장 ──
          cacheMap[svcNo] = {
            svc_no: svcNo,
            svc_nm: datasetName.trim(),
            cat: list_cat,
            cat_code: list_cat_code,
            detail_url: `https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?svc_no=${svcNo}`,
            type_cd: "API_TYPE06",
            fields: fields,
            desc: desc,
            error: "",
            sample_url: sampleUrl,
            // 샘플 파일이 이미 있으면 파일 크기로 대체
            sample_data_length: sampleDataLength || (fs.existsSync(jsonFilePath) ? fs.readFileSync(jsonFilePath, 'utf-8').length : 0),
          };

          // 캐시 파일에 전체 데이터 즉시 저장 (중단 시 데이터 유실 방지)
          fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.values(cacheMap), null, 2), 'utf-8');
          console.log(`   [완료] ${datasetName.trim()} (${svcNo}) 크롤링 완료`);

          // ── 목록 페이지로 복귀 ──
          const listBtn = page.locator('a[href*="fn_moveToDataList"], a:has-text("목록")').first();
          await listBtn.waitFor({ state: 'visible', timeout: 10000 });
          await listBtn.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(1000);
        }

        // ── 다음 페이지로 이동 ──
        const nextPage = pageNum + 1;
        console.log(`\n[NAV] ${pageNum} 페이지 완료. ${nextPage} 페이지 탐색 중...`);

        const paginationContainer = page.locator('.pagination, .page-link').first();
        if (!(await paginationContainer.isVisible())) {
          hasNextPage = false;
          break;
        }

        const nextPageBtn = page.locator(`.pagination a[onclick*="linkPage(${nextPage})"], .pagination a:has-text("${nextPage}")`).first();

        if (await nextPageBtn.isVisible()) {
          await nextPageBtn.click();
          await page.waitForTimeout(2000);
          pageNum++;
        } else {
          // 10페이지 단위 블록 넘어가는지 확인
          const nextBlockBtn = page.locator('.pagination a.next, .pagination a:has-text(">")').first();
          if (await nextBlockBtn.isVisible()) {
            await nextBlockBtn.click();
            await page.waitForTimeout(2000);
            // 다음 번호가 보이는지 다시 확인
            const nextPageBtnAfterBlock = page.locator(`.pagination a[onclick*="linkPage(${nextPage})"], .pagination a:has-text("${nextPage}")`).first();
            if (await nextPageBtnAfterBlock.isVisible()) {
              await nextPageBtnAfterBlock.click();
              await page.waitForTimeout(2000);
              pageNum++;
            } else {
              hasNextPage = false; // 진짜 끝
            }
          } else {
            hasNextPage = false; // 더 이상 다음 블록 없음
          }
        }
      } // end while(hasNextPage)
    } // end for(categories)

  } catch (error) {
    console.error('[ERROR] 크롤링 실행 중 오류 발생:', error);
  } finally {
    await browser.close();
    console.log('[END] 브라우저 종료 완료.');
  }

  // ═════════════════════════════════════════════════════════════
  // STEP 3, 4, 5: 메타데이터 분석 및 엑셀 보고서 생성
  // ═════════════════════════════════════════════════════════════
  console.log('\n[START] 메타데이터 분석 파이프라인 시작...');

  // 브라우저 종료 후 캐시 파일을 다시 읽어 최신 데이터 사용
  let finalDatasets = [];
  if (fs.existsSync(CACHE_FILE)) {
    try {
      finalDatasets = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch (err) {
      console.error(`[ERROR] 파이프라인 종료 시 캐시 파일 읽기 실패: ${err.message}`);
      process.exit(1);
    }
  }

  if (finalDatasets.length === 0) {
    console.log('[ERROR] 분석 가능한 데이터셋이 없습니다.');
    process.exit(1);
  }

  // STEP 3: 공통키 식별
  const ka = identifyCommonKeys(finalDatasets);

  // STEP 4: 결합 시나리오 도출
  const scenarios = deriveScenarios(finalDatasets, ka, 80);

  // STEP 5: 엑셀 보고서 생성
  await buildExcel(finalDatasets, ka, scenarios, OUTPUT_XLSX);

  // ── 터미널 최종 요약 출력 ──
  console.log("\n" + "=".repeat(62));
  console.log("  [완료] 통합 파이프라인 실행 완료");
  console.log("=".repeat(62));
  console.log(`  크롤링 데이터셋 (캐시)  : ${finalDatasets.length.toLocaleString().padStart(5)} 건`);
  console.log(`  전체 고유 필드 수        : ${Object.keys(ka.field_freq).length.toLocaleString().padStart(5)} 개`);
  console.log(`  식별된 공통키 수         : ${ka.common_keys.length.toLocaleString().padStart(5)} 개`);
  console.log(`  도출된 결합 시나리오 수  : ${scenarios.length.toLocaleString().padStart(5)} 건`);
  console.log(`  생성된 엑셀 보고서       : ${OUTPUT_XLSX}`);
  console.log("-".repeat(62));
  console.log("  공통키 출현 빈도 TOP 15:");

  const top15 = Object.entries(ka.field_freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  // [FIX] total_ds가 0인 경우 NaN 방지 (이 시점에서 finalDatasets.length > 0 보장되지만 이중 방어)
  const safeTotal = ka.total_ds > 0 ? ka.total_ds : 1;
  top15.forEach(([field, cnt]) => {
    const m = ka.field_meta[field] || {};
    const pct = cnt / safeTotal * 100;
    const bar = "#".repeat(Math.min(Math.floor(pct / 5), 14)); // 이모지 제거 -> ASCII 바 차트
    console.log(
      `    ${field.padEnd(26)}${bar.padEnd(14)} ${cnt.toString().padStart(4)}건 (${pct.toFixed(1)}%)` +
      (m.kor_nm ? ` [${m.kor_nm}]` : "")
    );
  });

  console.log("-".repeat(62));
  console.log("  결합 시나리오 TOP 5:");
  scenarios.slice(0, 5).forEach(sc => {
    console.log(`    [${sc.score.toFixed(1)}점 / ${sc.join_type}]`);
    console.log(`      ${sc.nm_a} <-> ${sc.nm_b}`);
    console.log(`      키: ${sc.shared_keys.slice(0, 4).join(', ')}`);
    console.log(`      -> ${sc.use_case.substring(0, 60)}`);
  });
  console.log("=".repeat(62));
}

if (require.main === module) {
  run();
}

module.exports = {
  identifyCommonKeys,
  deriveScenarios
};
