const { chromium } = require('playwright');
const { XMLParser } = require('fast-xml-parser'); // [FIX] 루프 안 반복 require 제거 → 상단에서 1회 선언
const fs       = require('fs');
const path     = require('path');
const readline = require('readline');
const { buildExcel } = require('./excel_reporter');

// ─────────────────────────────────────────────
// 설정 상수
// ─────────────────────────────────────────────
const CACHE_FILE  = "crawl_cache.json";              // 크롤링 결과를 저장할 캐시 파일 경로
const OUTPUT_XLSX = "식품안전나라_API_분석결과.xlsx"; // 최종 엑셀 보고서 파일명

// ─────────────────────────────────────────────
// 로그 유틸리티
// ─────────────────────────────────────────────
const log = {
  info:  (msg) => console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${msg}`),
  warn:  (msg) => console.warn(`[WARN] ${new Date().toLocaleTimeString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${msg}`),
};

// ─────────────────────────────────────────────
// 터미널 입력 프롬프트 헬퍼
// ─────────────────────────────────────────────
function askQuestion(query) {
  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
  });
  // 사용자 입력을 받아 Promise로 반환하고 readline 인터페이스를 닫음
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

// ═════════════════════════════════════════════════════════════
// STEP 3: 공통키 식별
// ═════════════════════════════════════════════════════════════

/**
 * 전체 데이터셋을 순회하여 필드 출현 빈도를 집계하고,
 * 설정한 임계값 이상 등장한 필드를 공통키로 분류한다.
 *
 * @param {Array} datasets - 크롤링된 데이터셋 목록
 * @returns {Object} 공통키 분석 결과 객체
 */
function identifyCommonKeys(datasets) {
  log.info("STEP 3: 공통키 식별");

  const fieldFreq = {};  // 필드별 출현 횟수 (전체 데이터셋 기준)
  const fieldMeta = {};  // 필드별 메타 정보 (한글명, 타입, 설명 등)
  const dsKeyMap  = {};  // 데이터셋별 보유 필드 목록 { svc_no: [field, ...] }
  const keyDsMap  = {};  // 필드별 사용 데이터셋 목록 { field: [svc_no, ...] }

  for (const ds of datasets) {
    const svc_no = ds.svc_no;

    // 해당 데이터셋의 영문 필드명 목록 추출
    const fList = (ds.fields || []).map(f => f.field).filter(Boolean);
    dsKeyMap[svc_no] = fList;

    for (const fdict of (ds.fields || [])) {
      const field = (fdict.field || '').trim();

      // 영문 대문자로 시작하고 2자 이상인 필드만 집계 (예: LCNS_NO, PRDLST_CD)
      if (!/^[A-Z][A-Z0-9_]{1,}$/.test(field)) continue;

      fieldFreq[field] = (fieldFreq[field] || 0) + 1;

      if (!keyDsMap[field]) keyDsMap[field] = [];
      keyDsMap[field].push(svc_no);

      // 메타 정보는 처음 등장한 값을 기본으로 저장하고,
      // 이후 데이터셋에서 빠진 항목이 있으면 보완한다.
      if (!fieldMeta[field]) {
        fieldMeta[field] = {
          kor_nm: fdict.kor_nm || "",
          type:   fdict.type   || "",
          length: fdict.length || "",
          desc:   fdict.desc   || "",
          sample: fdict.sample || "",
        };
      } else {
        for (const k of ["kor_nm", "type", "length", "desc", "sample"]) {
          if (!fieldMeta[field][k] && fdict[k]) {
            fieldMeta[field][k] = fdict[k];
          }
        }
      }
    }
  }

  // 전체 데이터셋 수의 5% 또는 최소 3건 중 큰 값을 공통키 임계값으로 사용
  const total     = Math.max(datasets.length, 1);
  const threshold = Math.max(3, Math.floor(total * 0.05));

  // 임계값 이상 등장한 필드를 빈도 내림차순으로 정렬
  const commonKeys = Object.entries(fieldFreq)
    .filter(([_, cnt]) => cnt >= threshold)
    .sort((a, b) => b[1] - a[1])
    .map(([f]) => f);

  log.info(`  고유 필드 수: ${Object.keys(fieldFreq).length}`);
  log.info(`  공통키 (임계=${threshold}건): ${commonKeys.length}개`);

  return {
    field_freq:  fieldFreq,
    field_meta:  fieldMeta,
    common_keys: commonKeys,
    ds_key_map:  dsKeyMap,
    key_ds_map:  keyDsMap,
    threshold,
    total_ds:    total,
  };
}

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 보조 데이터
// ─────────────────────────────────────────────

// 공통키별 신뢰도 가중치 (높을수록 결합 시 신뢰성 높음)
const KEY_WEIGHT = {
  "LCNS_NO":          10,  // 허가번호
  "BSSH_NO":          10,  // 업소번호
  "BARCODE_NO":        9,  // 바코드
  "PRDLST_REPORT_NO":  9,  // 품목제조보고번호
  "HACCP_NO":          9,  // HACCP 번호
  "HCCP_NO":           9,  // HACCP 번호 오타 필드 방어용
  "CRTFC_NO":          9,  // 인증번호
  "PRDLST_CD":         7,  // 품목유형코드
  "PRDT_SHH_DVS_CD":   7,  // 제품 세부 구분 코드
  "FOOD_CD":           7,  // 식품 코드
  "PRDT_NM":           5,  // 제품명 — 단독 조인키로는 제외됨
  "BSSH_NM":           5,  // 업소명 — 단독 조인키로는 제외됨
  "MNFTR_NM":          4,  // 제조사명 — 단독 조인키로는 제외됨
  "DISPOS":            3,  // 처분 결과
  "INSP_RSLT":         3,  // 검사 결과
  "LAST_UPDT_DTM":     2,  // 최종 수정 일시
};
const DEFAULT_W = 4; // 가중치 테이블에 없는 키의 기본 가중치

// 특정 키를 포함하는 시나리오에 자동 적용할 JOIN 유형 규칙
const JOIN_TYPE_RULE = {
  "LCNS_NO":          "INNER JOIN",
  "BSSH_NO":          "INNER JOIN",
  "BARCODE_NO":       "INNER JOIN",
  "PRDLST_REPORT_NO": "INNER JOIN",
  "HACCP_NO":         "INNER JOIN",
  "HCCP_NO":          "INNER JOIN",
};

// 공통키별 활용 시나리오 템플릿
// {k}: 공통키, [{A}]: 데이터셋 A명, [{B}]: 데이터셋 B명
const USE_CASE_TMPL = {
  "LCNS_NO":          "허가번호({k})로 [{A}]의 인허가 현황과 [{B}] 연계 -> 허가-실적 통합 분석",
  "BARCODE_NO":       "바코드({k})로 [{A}] 제품정보와 [{B}] 이력·성분 결합 -> 제품 추적 대시보드",
  "BSSH_NO":          "업소번호({k})로 [{A}] 업소현황과 [{B}] 처분·위생 이력 통합 -> 업소 리스크 분석",
  "PRDLST_REPORT_NO": "품목제조보고번호({k})로 [{A}]와 [{B}] 연계 -> 제조-영양-회수 통합 추적",
  "HACCP_NO":         "HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석",
  "HCCP_NO":          "HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석",
  "PRDLST_CD":        "품목유형코드({k})로 [{A}]와 [{B}] 분류 기반 집계 -> 품목별 현황 비교",
  "PRDT_NM":          "제품명({k}) 매칭으로 [{A}]와 [{B}] 연계 -> 제품 정보 통합 조회",
  "BSSH_NM":          "업체명({k}) 매칭으로 [{A}]와 [{B}] 연계 -> 업체별 종합 현황",
};

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 헬퍼 함수
// ─────────────────────────────────────────────

/**
 * 명칭/주소/전화/일자/내용 계열은 단독 조인키로 쓰기 위험하므로 제외한다.
 */
function isWeakJoinKey(k) {
  return /_NM$/i.test(k) ||
         /_NAME$/i.test(k) ||
         /_CD_NM$/i.test(k) ||
         /ADDR$/i.test(k) ||
         /_ADDR$/i.test(k) ||
         /TEL/i.test(k) ||
         /FAX/i.test(k) ||
         /_DT$/i.test(k) ||
         /DTM$/i.test(k) ||
         /DATE$/i.test(k) ||
         /_CN$/i.test(k) ||
         /_DESC$/i.test(k) ||
         /_CONT$/i.test(k) ||
         /_CONTENT$/i.test(k) ||
         /_MEMO$/i.test(k);
}

/**
 * 공유 키 목록을 기반으로 결합 점수(0~100)를 산출한다.
 * 가중치 합산 후 공유 키 수에 따른 보너스 배율을 적용한다.
 */
function scorePair(shared) {
  const raw = shared.reduce((acc, k) => acc + (KEY_WEIGHT[k] || DEFAULT_W), 0);
  // 공유 키가 많을수록 보너스 배율 증가 (3개 이상: 1.3배, 2개: 1.15배, 1개: 배율 없음)
  const bonus = shared.length >= 3 ? 1.3 : (shared.length === 2 ? 1.15 : 1.0);
  return Math.min(parseFloat((raw * bonus).toFixed(1)), 100.0);
}

/**
 * 공유 키 중 JOIN_TYPE_RULE에 해당하는 키가 있으면 해당 JOIN 유형을 반환하고,
 * 없으면 기본값 LEFT JOIN을 반환한다.
 */
function getJoinType(shared) {
  for (const k of shared) {
    if (JOIN_TYPE_RULE[k]) return JOIN_TYPE_RULE[k];
  }
  return "LEFT JOIN";
}

/**
 * 공유 키에 맞는 활용 시나리오 문자열을 반환한다.
 * USE_CASE_TMPL에 없는 키면 범용 설명 문장을 생성한다.
 */
function getUseCase(nm_a, nm_b, shared) {
  for (const k of shared) {
    if (USE_CASE_TMPL[k]) {
      return USE_CASE_TMPL[k]
        .replace("{k}", k)
        .replace("[{A}]", `[${nm_a.substring(0, 16)}]`)
        .replace("[{B}]", `[${nm_b.substring(0, 16)}]`);
    }
  }
  // 템플릿 미매칭 시 공통키 앞 2개를 이용한 범용 설명 반환
  return `공통키(${shared.slice(0, 2).join(', ')})로 [${nm_a.substring(0, 16)}]와 [${nm_b.substring(0, 16)}] 결합 분석`;
}

/**
 * 두 데이터셋 결합을 위한 SQL 힌트 문자열을 생성한다.
 * 공유 키 최대 3개를 ON 조건으로 사용한다.
 */
function getSqlHint(svc_a, nm_a, svc_b, nm_b, shared, jtype) {
  const on     = shared.slice(0, 3).map(k => `A.${k} = B.${k}`).join(" AND ");
  const cols_a = shared.slice(0, 3).map(k => `A.${k}`).join(", ");
  return `SELECT ${cols_a}, A.*, B.* \nFROM   [${svc_a}] A  -- ${nm_a}\n${jtype} [${svc_b}] B  -- ${nm_b}\n  ON   ${on};`;
}

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 메인 함수
// ─────────────────────────────────────────────

/**
 * 공통키를 보유한 데이터셋 쌍을 모두 탐색하여 결합 시나리오를 도출하고,
 * 점수 내림차순으로 정렬 후 상위 topN건을 반환한다.
 *
 * @param {Array}  datasets    - 전체 데이터셋 목록
 * @param {Object} keyAnalysis - identifyCommonKeys() 반환값
 * @param {number} topN        - 최대 반환 시나리오 수 (기본 80)
 * @returns {Array} 결합 시나리오 목록
 */
function deriveScenarios(datasets, keyAnalysis, topN = 80) {
  log.info("STEP 4: 결합 시나리오 도출");

  const ck    = new Set(keyAnalysis.common_keys); // 공통키 Set (O(1) 조회용)
  const dkmap = keyAnalysis.ds_key_map;

  // 데이터셋 정보를 svc_no 기준으로 빠르게 접근하기 위한 맵
  const dsinfo = datasets.reduce((acc, d) => {
    acc[d.svc_no] = d;
    return acc;
  }, {});

  // 필드가 하나라도 있는 데이터셋만 대상으로 함
  const svc_nos = datasets.map(d => d.svc_no).filter(sn => dkmap[sn] && dkmap[sn].length > 0);
  const results = [];

  // 모든 데이터셋 쌍(i, j)을 탐색하여 공유 공통키가 있으면 시나리오 생성
  for (let i = 0; i < svc_nos.length; i++) {
    for (let j = i + 1; j < svc_nos.length; j++) {
      const a    = svc_nos[i];
      const b    = svc_nos[j];
      const setA = new Set(dkmap[a]);
      const setB = new Set(dkmap[b]);

      // 두 데이터셋이 공유하면서 공통키 목록에도 포함된 필드 추출
      const shared = Array.from(setA).filter(k => setB.has(k) && ck.has(k));
      if (shared.length === 0) continue;

      // 명칭/주소/일자 등 약한 키만 공유하는 경우 결합 시나리오에서 제외한다.
      const strongShared = shared.filter(k => !isWeakJoinKey(k));
      if (strongShared.length === 0) continue;

      const sc = scorePair(strongShared);
      if (sc < 5) continue; // 최소 점수 미달 시나리오 제외

      const nm_a = dsinfo[a].svc_nm || a;
      const nm_b = dsinfo[b].svc_nm || b;
      const jt   = getJoinType(strongShared);

      results.push({
        ds_a:        a,
        nm_a,
        cat_a:       dsinfo[a].cat || "",
        ds_b:        b,
        nm_b,
        cat_b:       dsinfo[b].cat || "",
        shared_keys: strongShared,
        key_count:   strongShared.length,
        score:       sc,
        join_type:   jt,
        use_case:    getUseCase(nm_a, nm_b, strongShared),
        sql_hint:    getSqlHint(a, nm_a, b, nm_b, strongShared, jt),
      });
    }
  }

  // 점수 내림차순 정렬 후 상위 topN건만 반환
  results.sort((a, b) => b.score - a.score);
  const out = results.slice(0, topN);
  log.info(`STEP 4 완료: 후보 ${results.length}건 -> 상위 ${out.length}건`);
  return out;
}

// ═════════════════════════════════════════════════════════════
// 메인 실행 함수 (STEP 1~5 통합 파이프라인)
// ═════════════════════════════════════════════════════════════
async function run() {
  console.log('[START] 식품안전나라 통합 파이프라인 시작 (crawler.js)');

  // ── 1. 크롤링 범위 파싱 (CLI 인수 또는 대화형 입력) ──
  let startNumStr = '';
  let endNumStr   = '';

  const args     = process.argv.slice(2);
  const hasForce = args.includes('--force') || args.includes('-f'); // 강제 재크롤링 플래그
  const numArgs  = args.filter(a => !isNaN(parseInt(a, 10)) && !a.startsWith('-'));

  if (numArgs.length >= 2) {
    // CLI 인수로 범위가 전달된 경우
    startNumStr = numArgs[0];
    endNumStr   = numArgs[1];
    console.log(`   CLI 인수 감지: 시작 = ${startNumStr}, 종료 = ${endNumStr}`);
  } else {
    // 대화형 모드: 사용자로부터 직접 입력 받음
    console.log('\n[대화형 모드] 크롤링할 항목 범위를 지정하세요.');
    startNumStr = await askQuestion('>> 시작 항목 번호 (예: 149): ');
    endNumStr   = await askQuestion('>> 종료 항목 번호 (예: 169): ');
  }

  const startNum = parseInt(startNumStr, 10);
  const endNum   = parseInt(endNumStr,   10);

  if (isNaN(startNum) || isNaN(endNum) || startNum < 1 || endNum < startNum) {
    console.error('[ERROR] 유효하지 않은 범위입니다.');
    process.exit(1);
  }

  // 항목 번호를 페이지 번호로 변환 (10개 단위 페이지 기준)
  const startPage = Math.floor((startNum - 1) / 10) + 1;
  const endPage   = Math.floor((endNum   - 1) / 10) + 1;

  console.log(`\n[실행 설정 요약]`);
  console.log(`   - 항목 범위       : #${startNum} ~ #${endNum}`);
  console.log(`   - 페이지 범위     : ${startPage} ~ ${endPage} 페이지`);
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

  // svc_no를 키로 하는 캐시 맵 생성 (빠른 중복 조회용)
  const cacheMap = cacheList.reduce((acc, item) => {
    acc[item.svc_no] = item;
    return acc;
  }, {});

  // ── 4. Playwright 브라우저 실행 ──
  const browser = await chromium.launch({
    headless: false,            // 브라우저를 화면에 표시 (디버깅 편의)
    args: ['--start-maximized'] // 최대화 상태로 시작
  });

  const context = await browser.newContext({ viewport: null });
  const page    = await context.newPage();

  try {
    // 식품안전나라 메인 페이지 진입
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

    // 데이터셋 목록 페이지로 이동
    const datasetListLink = page.locator('a[href*="datasetList.do"], a:has-text("데이터셋")').first();
    if (await datasetListLink.isVisible()) {
      console.log('   UI 클릭을 통해 데이터셋 목록으로 이동...');
      await datasetListLink.click();
      await page.waitForTimeout(2000);
    } else {
      // 링크를 찾지 못한 경우 URL 직접 이동
      console.log('   데이터셋 목록 URL로 직접 이동...');
      await page.goto(
        'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31',
        { waitUntil: 'domcontentloaded', timeout: 90000 }
      );
      await page.waitForTimeout(2000);
    }

    // 목록 페이지 팝업 닫기
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }

    // ── 5. 시작 페이지로 이동 (1페이지가 아닌 경우) ──
    if (startPage > 1) {
      console.log(`\n[NAV] ${startPage} 페이지로 순차 이동 중...`);
      const paginationContainer = page.locator('.pagination, .page-link, a:has-text("2")').first();
      await paginationContainer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      let activePage = 1;
      while (activePage < startPage) {
        // 현재 활성 페이지 번호 읽기
        const currentSpan = page.locator(
          '.pagination li.active span.current, .pagination li.active a, .pagination li.active span'
        ).first();
        if (await currentSpan.isVisible()) {
          const pageVal = parseInt((await currentSpan.innerText()).trim(), 10);
          if (!isNaN(pageVal)) activePage = pageVal;
        }

        if (activePage >= startPage) break;

        console.log(`   현재 ${activePage} 페이지. 다음 페이지 버튼 클릭...`);
        const nextBtn = page.locator('a.page-link.next, a:has-text("다음페이지")').first();
        await nextBtn.scrollIntoViewIfNeeded();
        await nextBtn.click();
        await page.waitForTimeout(1500);
      }
      console.log(`[OK] ${startPage} 페이지 로드 완료`);
      await page.waitForTimeout(1500);
    }

    let highestNumSeen = 0; // 지금까지 확인한 항목 번호 중 최대값 (종료 조건 판단용)

    // ═══════════════════════════════════════
    // STEP 1~2: 페이지별 크롤링 루프
    // ═══════════════════════════════════════
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      console.log(`\n==============================================================`);
      console.log(`  [PAGE ${pageNum} / ${endPage}] 크롤링 진행 중`);
      console.log(`  ==============================================================`);

      await page.locator('#listFrame').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      const rowCount      = await page.locator('#listFrame tr').count();
      let   initialRowIndex = 0; // 첫 페이지에서 시작 항목 행 인덱스

      // 첫 페이지에서 지정한 시작 항목 번호의 행을 탐색
      if (pageNum === startPage) {
        console.log(`   시작 항목 #${startNum} 위치 탐색 중...`);
        let foundStart = false;
        for (let i = 0; i < rowCount; i++) {
          const numCell = page.locator('#listFrame tr').nth(i).locator('td.num').first();
          if (await numCell.isVisible()) {
            if (parseInt((await numCell.innerText()).trim(), 10) === startNum) {
              initialRowIndex = i;
              foundStart = true;
              console.log(`   시작 행 인덱스 ${i} 확인`);
              break;
            }
          }
        }
        if (!foundStart) console.log(`   시작 항목을 찾지 못해 첫 번째 행부터 시작합니다.`);
      }

      // ── 행(Row) 단위 크롤링 루프 ──
      for (let rowIndex = initialRowIndex; rowIndex < rowCount; rowIndex++) {
        const rowLocator = page.locator('#listFrame tr').nth(rowIndex);

        // 현재 행의 항목 번호 읽기
        const numCell = rowLocator.locator('td.num').first();
        let itemNum = 0;
        if (await numCell.isVisible()) {
          const parsed = parseInt((await numCell.innerText()).trim(), 10);
          if (!isNaN(parsed)) itemNum = parsed;
        }

        if (itemNum > 0) {
          highestNumSeen = Math.max(highestNumSeen, itemNum);
        }

        // 종료 조건 1: 이미 목표 항목을 지나친 뒤 번호 없는 행이 오는 경우 루프 종료
        if (highestNumSeen >= endNum && itemNum === 0) {
          console.log(`\n[STOP] 목표 범위 #${endNum} 도달. 크롤링 중단.`);
          pageNum = endPage + 1;
          break;
        }

        // 종료 조건 2: 현재 항목 번호가 종료 번호를 초과한 경우
        if (itemNum > endNum || highestNumSeen > endNum) {
          console.log(`\n[STOP] 목표 범위 #${endNum} 도달. 크롤링 중단.`);
          pageNum = endPage + 1;
          break;
        }

        // 데이터셋명과 서비스 번호 추출
        const linkLocator = rowLocator.locator('td.tl a').first();

        // 링크가 없는 헤더/빈 행/안내 행은 건너뜀
        if (!(await linkLocator.isVisible().catch(() => false))) {
          continue;
        }

        await linkLocator.scrollIntoViewIfNeeded();
        const datasetName = await linkLocator.innerText();

        let svcNo = "dataset";
        const hrefAttr   = await linkLocator.getAttribute('href') || "";
        const svcNoMatch = hrefAttr.match(/'([^']+)'/);
        if (svcNoMatch && svcNoMatch[1]) svcNo = svcNoMatch[1];

        // 목록에서 카테고리 추출 (4번째 td)
        const catCell = rowLocator.locator('td').nth(3);
        let cat = "";
        if (await catCell.isVisible()) cat = (await catCell.innerText()).trim();

        // ── 스마트 중복 건너뛰기 ──
        // 샘플 JSON 파일과 캐시 메타데이터가 모두 있으면 재크롤링 생략
        const jsonFilePath = path.join(samplesDir, `${svcNo}.json`);
        const hasMetadata  = cacheMap[svcNo] && cacheMap[svcNo].fields && cacheMap[svcNo].fields.length > 0;

        if (fs.existsSync(jsonFilePath) && hasMetadata && !hasForce) {
          console.log(`   [SKIP] 항목 ${itemNum || 'N/A'} "${datasetName.trim()}" (${svcNo}) - 샘플 및 메타데이터 존재`);
          continue;
        }

        let sampleUrl        = `http://openapi.foodsafetykorea.go.kr/api/sample/${svcNo}/xml/1/5`;
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
            const rows     = tbl.locator('tr');
            const rowCount = await rows.count();

            for (let r = 1; r < rowCount; r++) {
              const cols     = rows.nth(r).locator('td, th');
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

              console.log(`   [SAMPLE] ${sampleUrl}`);
              try {
                // 팝업 창에서 샘플 데이터를 가져옴
                const [popup] = await Promise.all([
                  context.waitForEvent('page'),
                  page.evaluate((url) => window.open(url), sampleUrl)
                ]);

                await popup.waitForLoadState('networkidle');
                await popup.waitForTimeout(1500);

                const rawContent = await popup.locator('body').innerText();
                if (rawContent && rawContent.trim().length > 0) {
                  sampleDataLength  = rawContent.trim().length;
                  const ext      = sampleUrl.includes('/json') ? 'json' : 'xml';
                  const filePath = path.join(samplesDir, `${svcNo}.${ext}`);

                  // 원본 샘플(XML 또는 JSON) 저장
                  fs.writeFileSync(filePath, rawContent.trim(), 'utf-8');
                  console.log(`      [OK] 저장 완료: samples/${svcNo}.${ext}`);

                  // XML인 경우 JSON으로 변환하여 추가 저장
                  if (ext === 'xml') {
                    // [FIX] XMLParser는 파일 상단에서 1회 require하므로 여기서 재선언 불필요
                    const xmlParser = new XMLParser({
                      ignoreAttributes: true,
                      parseTagValue:    false,
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
                }
                await popup.close();
              } catch (err) {
                console.log(`      [ERROR] 샘플 추출 오류: ${err.message}`);
              }
            }
          }
        }

        // ── 메타데이터 캐시 저장 ──
        cacheMap[svcNo] = {
          svc_no:             svcNo,
          svc_nm:             datasetName.trim(),
          cat:                cat,
          detail_url:         `https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?svc_no=${svcNo}`,
          type_cd:            "API_TYPE06",
          fields:             fields,
          desc:               desc,
          error:              "",
          sample_url:         sampleUrl,
          // 샘플 파일이 이미 있으면 파일 크기로 대체
          sample_data_length: sampleDataLength || (fs.existsSync(jsonFilePath) ? fs.readFileSync(jsonFilePath, 'utf-8').length : 0),
        };

        // 캐시 파일에 전체 데이터 즉시 저장 (중단 시 데이터 유실 방지)
        fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.values(cacheMap), null, 2), 'utf-8');
        console.log(`   [SAVE] 캐시 저장 완료: (${svcNo}) 필드 ${fields.length}개 (길이=${cacheMap[svcNo].sample_data_length})`);

        // ── 목록 페이지로 복귀 ──
        const listBtn = page.locator('a[href*="fn_moveToDataList"], a:has-text("목록")').first();
        await listBtn.waitFor({ state: 'visible', timeout: 10000 });
        await listBtn.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
      }

      // ── 다음 페이지로 이동 ──
      if (pageNum < endPage) {
        const nextPage = pageNum + 1;
        console.log(`\n[NAV] ${pageNum} 페이지 완료. ${nextPage} 페이지로 이동 중...`);

        const paginationContainer = page.locator('.pagination, .page-link, a:has-text("2")').first();
        await paginationContainer.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const nextPageBtn = page.locator(
          `.pagination a:has-text("${nextPage}"), a.page-link:has-text("${nextPage}"), a[onclick*="linkPage(${nextPage})"], a[href*="page-${nextPage}"], a:has-text("${nextPage}")`
        ).first();

        // 10페이지 블록을 넘어가는 경우 다음 블록 버튼 클릭
        if (!(await nextPageBtn.isVisible()) && nextPage > 10) {
          const nextBlockBtn = page.locator('.pagination a.next, .pagination a:has-text(">")').first();
          await nextBlockBtn.click();
          await page.waitForTimeout(2000);
        }

        await nextPageBtn.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await nextPageBtn.click();
        await page.waitForTimeout(2000);
        console.log(`[OK] ${nextPage} 페이지 로드 완료`);
        await page.waitForTimeout(1500);
      }
    }

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
    const m   = ka.field_meta[field] || {};
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

run();
