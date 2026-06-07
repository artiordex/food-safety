const ExcelJS = require('exceljs');
const logger = require('../utils/logger');

// 기존 호출부와 호환되는 log 래퍼
const log = {
  info:  (msg) => logger.info(msg),
  warn:  (msg) => logger.warn(msg),
  error: (msg) => logger.error(msg),
};

// ═════════════════════════════════════════════════════════════
// 상수 정의
// ═════════════════════════════════════════════════════════════

const MAX_CROSS_KEYS = 35;   // 크로스맵에 표시할 최대 공통키 수
const DESC_MAX_LEN = 100;  // 설명 필드 최대 표시 길이
const FIELD_MAX_LEN = 80;   // 출력항목 설명 최대 길이
const SAMPLE_MAX_LEN = 30;   // 샘플값 최대 길이

const SHEET_NAMES = {
  COVER: '분석 개요',
  DATASETS: '데이터셋 목록',
  KEYS: '공통키 분석',
  CROSS: '키x데이터셋 맵',
  SCENARIOS: '결합 시나리오',
  ARQUERO: 'Arquero 상세 분석',
  CHAIN_SQL: 'SQLite 체인 조인 (SQL)',
  RAW: '출력항목 원본',
};

// 데이터셋 카테고리별 배경색
const CAT_COLOR = {
  '가공식품': 'C6EFCE',
  '건강기능식품': 'FFF2CC',
  '축산물': 'FCE4D6',
  '농·수산물': 'DDEBF7',
  '영양성분': 'E2EFDA',
  '음식점': 'D9EAD3',
  'HACCP': 'D9D2E9',
  '수출입': 'FFF3E2',
  '위해정보': 'F4CCCC',
  '행정처분': 'FADBD8',
  '유통': 'E9F7EF',
  '통계': 'D5DBDB',
  '특수식품': 'D6EAF8',
  '코드·표준': 'E8DAEF',
  '기타': 'F2F3F4',
};

// 테두리 스타일
const borderThinStyle = { style: 'thin', color: { argb: 'FFD3D3D3' } };
const borderMediumStyle = { style: 'medium', color: { argb: 'FF1F4E79' } };
const thinBorder = { top: borderThinStyle, left: borderThinStyle, bottom: borderThinStyle, right: borderThinStyle };
const medBorder = { top: borderMediumStyle, left: borderMediumStyle, bottom: borderMediumStyle, right: borderMediumStyle };

// 시트 탭 색상
const TAB_COLORS = {
  [SHEET_NAMES.COVER]: '1F4E79',
  [SHEET_NAMES.DATASETS]: '2F75B6',
  [SHEET_NAMES.KEYS]: '375623',
  [SHEET_NAMES.CROSS]: '2F5496',
  [SHEET_NAMES.SCENARIOS]: '7030A0',
  [SHEET_NAMES.ARQUERO]: 'A569BD',
  [SHEET_NAMES.CHAIN_SQL]: 'F39C12',
  [SHEET_NAMES.RAW]: 'C55A11',
};

// ═════════════════════════════════════════════════════════════
// 공통 유틸리티
// ═════════════════════════════════════════════════════════════

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function toObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function toSafeString(value, maxLen = null) {
  const str = value === undefined || value === null ? '' : String(value);
  return Number.isFinite(maxLen) && maxLen >= 0 ? str.substring(0, maxLen) : str;
}

function toSafeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function safeLocaleNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString() : '0';
}

function validateInputs(datasets, ka, scenarios, outputPath) {
  if (!Array.isArray(datasets)) {
    throw new Error('datasets는 배열이어야 합니다.');
  }

  if (!Array.isArray(scenarios)) {
    throw new Error('scenarios는 배열이어야 합니다.');
  }

  if (!outputPath || typeof outputPath !== 'string') {
    throw new Error('outputPath가 유효하지 않습니다.');
  }

  if (!ka || typeof ka !== 'object') {
    throw new Error('ka(공통키 분석 결과) 객체가 유효하지 않습니다.');
  }
}

function normalizeKeyAnalysis(ka) {
  return {
    field_freq: toObject(ka?.field_freq),
    field_meta: toObject(ka?.field_meta),
    common_keys: toArray(ka?.common_keys),
    key_ds_map: toObject(ka?.key_ds_map),
    ds_key_map: toObject(ka?.ds_key_map),
    threshold: toSafeNumber(ka?.threshold, 0),
    total_ds: toSafeNumber(ka?.total_ds, 0),
  };
}

function normalizeScenario(sc) {
  const sharedKeys = toArray(sc?.shared_keys);
  return {
    ds_a: toSafeString(sc?.ds_a),
    nm_a: toSafeString(sc?.nm_a),
    cat_a: toSafeString(sc?.cat_a),
    ds_b: toSafeString(sc?.ds_b),
    nm_b: toSafeString(sc?.nm_b),
    cat_b: toSafeString(sc?.cat_b),
    shared_keys: sharedKeys,
    key_count: toSafeNumber(sc?.key_count, sharedKeys.length),
    score: toSafeNumber(sc?.score, 0),
    join_type: toSafeString(sc?.join_type || sc?.joinType || '검토필요'),
    confidence: toSafeString(sc?.confidence),
    use_case: toSafeString(sc?.use_case),
    sql_hint: toSafeString(sc?.sql_hint),
  };
}

function normalizeScenarios(scenarios) {
  return toArray(scenarios).map(normalizeScenario);
}

/**
 * 공통 셀 포맷터
 */
function formatCell(cell, {
  val = undefined,
  bg = 'FFFFFF',
  fg = '000000',
  bold = false,
  sz = 9,
  ha = 'left',
  wrap = true,
  border = true,
  italic = false,
} = {}) {
  if (val !== undefined) cell.value = val;

  cell.font = {
    name: 'Arial',
    size: sz,
    bold,
    italic,
    color: { argb: `FF${fg}` },
  };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: `FF${bg}` },
  };
  cell.alignment = {
    horizontal: ha === 'right' ? 'right' : ha === 'center' ? 'center' : 'left',
    vertical: 'middle',
    wrapText: wrap,
  };
  if (border) cell.border = thinBorder;
}

function writeRow(ws, rowNo, cols, defaultStyle = {}) {
  cols.forEach((col, idx) => {
    const cell = ws.getCell(rowNo, idx + 1);
    formatCell(cell, {
      val: col.v,
      bg: col.bgOv || col.bg || defaultStyle.bg || 'FFFFFF',
      fg: col.fgOv || col.fg || defaultStyle.fg || '000000',
      ha: col.ha || defaultStyle.ha || 'left',
      bold: col.bold || false,
      sz: col.sz || defaultStyle.sz || 9,
      italic: col.italic || false,
      wrap: col.wrap ?? defaultStyle.wrap ?? true,
      border: col.border ?? defaultStyle.border ?? true,
    });
  });
}

/** 카테고리에 맞는 배경색 반환 */
function catBg(cat, idx) {
  return CAT_COLOR[cat] || (idx % 2 ? 'F9F9F9' : 'FFFFFF');
}

/** 점수(0~100)에 따른 배경색 반환 */
function scoreBg(score) {
  const safeScore = toSafeNumber(score, 0);
  if (safeScore >= 70) return 'C6EFCE';
  if (safeScore >= 40) return 'FFF2CC';
  if (safeScore >= 20) return 'FCE4D6';
  return 'F2F3F4';
}

/** 사용 비율(%)에 따른 히트맵 배경/글자색 반환 */
function heatmap(pct) {
  const safePct = toSafeNumber(pct, 0);
  if (safePct >= 70) return { bg: 'C00000', fg: 'FFFFFF' };
  if (safePct >= 40) return { bg: 'FF6600', fg: 'FFFFFF' };
  if (safePct >= 20) return { bg: 'FFC000', fg: '000000' };
  return { bg: 'FFFFFF', fg: '000000' };
}

/** 열 너비 배열을 한 번에 설정 */
function setColWidths(ws, widths) {
  widths.forEach((w, i) => {
    ws.getColumn(i + 1).width = w;
  });
}

/** 헤더 행을 한 번에 렌더링 */
function renderHeader(ws, row, headers, bg = '1F4E79', fg = 'FFFFFF') {
  ws.getRow(row).height = 30;
  headers.forEach((h, i) => {
    const cell = ws.getCell(row, i + 1);
    formatCell(cell, { val: h, bg, fg, bold: true, ha: 'center' });
  });
}

function renderEmptyNotice(ws, message, range = 'A1:D1') {
  ws.mergeCells(range);
  formatCell(ws.getCell(range.split(':')[0]), {
    val: message,
    bg: 'FCE4D6',
    fg: '9C0006',
    bold: true,
    ha: 'center',
  });
}

function setWorksheetCommon(ws, sheetName, views = [{ showGridLines: false }]) {
  ws.views = views;
  ws.properties.tabColor = { argb: `FF${TAB_COLORS[sheetName] || '1F4E79'}` };
}

// ═════════════════════════════════════════════════════════════
// 시트 1: 분석 개요
// ═════════════════════════════════════════════════════════════
function shCover(ws, datasets, ka, scenarios) {
  setWorksheetCommon(ws, SHEET_NAMES.COVER);
  setColWidths(ws, [3, 26, 52, 18]);
  ws.getRow(1).height = 8;

  ws.mergeCells('B2:D2');
  formatCell(ws.getCell('B2'), {
    val: '식품안전나라 Open API  데이터 관계 분석 보고서',
    bg: 'FFFFFF',
    fg: '1F4E79',
    bold: true,
    sz: 17,
    ha: 'center',
    border: false,
  });
  ws.getRow(2).height = 44;

  ws.mergeCells('B3:D3');
  formatCell(ws.getCell('B3'), {
    val: `www.foodsafetykorea.go.kr/api  ·  실제 크롤링 기반 자동 분석  ·  생성일시: ${new Date().toLocaleString('ko-KR')}`,
    fg: '888888',
    sz: 10,
    ha: 'center',
    italic: true,
    border: false,
  });
  ws.getRow(3).height = 20;
  ws.getRow(4).height = 10;

  const emptySamples = datasets.filter(ds => !ds.sample_count).length;

  const kpis = [
    { label: '크롤링 데이터셋', val: datasets.length, color: '2F75B6', r: 5, c: 2 },
    { label: '발견 전체 필드', val: Object.keys(ka.field_freq).length, color: '375623', r: 5, c: 3 },
    { label: '공통키 식별', val: ka.common_keys.length, color: 'C55A11', r: 7, c: 2 },
    { label: '결합 시나리오', val: scenarios.length, color: '7030A0', r: 7, c: 3 },
    { label: '데이터 없음 (Empty)', val: emptySamples, color: 'C00000', r: 9, c: 2 },
  ];

  [5, 6, 7, 8, 9, 10].forEach(r => { ws.getRow(r).height = (r % 2 === 0) ? 4 : 56; });

  kpis.forEach(({ label, val, color, r, c }) => {
    ws.mergeCells(r, c, r + 1, c);
    const cell = ws.getCell(r, c);
    formatCell(cell, {
      val: `${safeLocaleNumber(val)}\n${label}`,
      bg: color,
      fg: 'FFFFFF',
      bold: true,
      sz: 17,
      ha: 'center',
      border: false,
    });
    cell.border = medBorder;
  });

  ws.getRow(11).height = 10;

  ws.mergeCells('B12:D12');
  formatCell(ws.getCell('B12'), {
    val: '자동화 분석 파이프라인',
    fg: '1F4E79',
    bold: true,
    sz: 12,
    border: false,
  });
  ws.getRow(12).height = 24;

  const steps = [
    ['STEP 1', '목록 크롤링', 'searchDatasetList.do AJAX POST → 전체 Open API 및 FILE 데이터셋 목록 수집'],
    ['STEP 2', '상세 크롤링', '각 데이터셋 상세 페이지 → 출력항목 탭(#view-item) table 및 4단 구성 전략 파싱'],
    ['STEP 3', '공통키 식별', `전체 필드 출현 빈도 집계 → 임계값(${ka.threshold || '5% or 3건'}) 이상 필드를 공통키로 자동 분류`],
    ['STEP 4', '결합 시나리오', '데이터셋 쌍별 공유 공통키 분석 → 키 신뢰도 가중치 기반 점수 산출 → 상위 시나리오 도출'],
    ['STEP 5', '엑셀 보고서', '6개 시트 자동 생성: 개요·데이터셋목록·공통키분석·크로스맵·결합시나리오·출력항목원본'],
  ];

  steps.forEach(([step, title, desc], idx) => {
    const r = 13 + idx;
    ws.getRow(r).height = 28;
    writeRow(ws, r, [
      { v: step, bg: '1F4E79', fg: 'FFFFFF', bold: true, ha: 'center' },
      { v: title, bg: 'D6E4F0', bold: true },
      { v: desc, bg: 'F5F5F5', sz: 8 },
    ], { bg: 'FFFFFF' });
    // B~D에 쓰기 위해 실제 시작 컬럼 보정
    for (let c = 4; c >= 2; c--) {
      ws.getCell(r, c).value = ws.getCell(r, c - 1).value;
      ws.getCell(r, c).style = { ...ws.getCell(r, c - 1).style };
    }
    ws.getCell(r, 1).value = null;
    ws.getCell(r, 1).style = {};
  });

  ws.getRow(18).height = 10;

  ws.mergeCells('B19:D19');
  formatCell(ws.getCell('B19'), {
    val: '시트 구성',
    fg: '1F4E79',
    bold: true,
    sz: 12,
    border: false,
  });
  ws.getRow(19).height = 24;

  const sheetInfo = [
    [SHEET_NAMES.COVER, '파이프라인 흐름 및 KPI 요약 + 생성 일시'],
    [SHEET_NAMES.DATASETS, '전체 데이터셋 + 샘플건수 + 데이터없음(Empty) 탐지'],
    [SHEET_NAMES.KEYS, '공통키 빈도·점유율·메타·카테고리 분포 (히트맵 색상)'],
    [SHEET_NAMES.CROSS, `공통키 × 데이터셋 크로스 매핑 (표시값: Y, 상위 ${MAX_CROSS_KEYS}개)`],
    [SHEET_NAMES.SCENARIOS, '점수순 결합 시나리오 + JOIN 유형 + SQL 힌트'],
    [SHEET_NAMES.ARQUERO, 'Arquero 기반 값 겹침(Overlap) 통계 기반 시나리오 상세 분석'],
    [SHEET_NAMES.CHAIN_SQL, '실데이터 기반 N차 체인 조인 (SQLite 검증 완료)'],
    [SHEET_NAMES.RAW, '데이터셋별 크롤링된 출력항목 RAW 데이터 전체'],
  ];

  sheetInfo.forEach(([name, desc], idx) => {
    const r = 20 + idx;
    ws.getRow(r).height = 22;
    formatCell(ws.getCell(r, 2), { val: name, bg: 'EBF3FB', bold: true, ha: 'center' });
    ws.mergeCells(r, 3, r, 4);
    formatCell(ws.getCell(r, 3), { val: desc, bg: 'FAFAFA', sz: 9 });
  });
}

// ═════════════════════════════════════════════════════════════
// 시트 2: 데이터셋 목록
// ═════════════════════════════════════════════════════════════
function shList(ws, datasets, ka) {
  setWorksheetCommon(ws, SHEET_NAMES.DATASETS, [{ showGridLines: false, state: 'frozen', ySplit: 1 }]);
  setColWidths(ws, [5, 14, 40, 14, 10, 10, 10, 12, 45]);

  renderHeader(ws, 1, ['#', '서비스번호', '데이터셋명', '카테고리', '출력항목수', '공통키수', '샘플건수', '상태', '설명']);

  const ckSet = new Set(ka.common_keys);
  const dkm = ka.ds_key_map;

  if (datasets.length === 0) {
    ws.autoFilter = 'A1:I1';
    return;
  }

  datasets.forEach((ds, idx) => {
    const r = idx + 2;
    const cat = toSafeString(ds.cat);
    const bg = catBg(cat, idx);
    const fields = toArray(ds.fields);
    const dsKeys = toArray(dkm[ds.svc_no]);
    const ckCnt = dsKeys.filter(f => ckSet.has(f)).length;
    const hasErr = Boolean(ds.error);
    const sampleCount = ds.sample_count || 0;
    
    let status = '';
    let statusBg = null;
    let statusFg = null;
    
    if (hasErr) {
      status = '크롤링 오류';
      statusBg = 'FCE4D6';
      statusFg = 'C00000';
    } else if (sampleCount === 0) {
      status = '데이터 없음';
      statusBg = 'FFC7CE';
      statusFg = '9C0006';
    } else {
      status = '정상';
    }

    ws.getRow(r).height = 20;

    writeRow(ws, r, [
      { v: idx + 1, ha: 'center' },
      { v: ds.svc_no, ha: 'center', bold: true },
      { v: ds.svc_nm || '', ha: 'left' },
      { v: cat, ha: 'center' },
      { v: fields.length, ha: 'center' },
      { v: ckCnt, ha: 'center', bold: ckCnt >= 3, bgOv: ckCnt >= 3 ? 'C6EFCE' : null },
      { v: sampleCount, ha: 'center', bold: sampleCount > 0, bgOv: sampleCount === 0 ? 'FFC7CE' : null, fgOv: sampleCount === 0 ? '9C0006' : null },
      { v: status, ha: 'center', bold: status !== '정상', bgOv: statusBg, fgOv: statusFg },
      { v: toSafeString(ds.desc, DESC_MAX_LEN), ha: 'left', sz: 8 },
    ], { bg });
  });

  ws.autoFilter = `A1:I${datasets.length + 1}`;
}

// ═════════════════════════════════════════════════════════════
// 시트 3: 공통키 분석
// ═════════════════════════════════════════════════════════════
function shKeys(ws, ka, datasets) {
  setWorksheetCommon(ws, SHEET_NAMES.KEYS, [{ showGridLines: false, state: 'frozen', ySplit: 1 }]);
  setColWidths(ws, [5, 26, 16, 14, 12, 12, 8, 45, 38]);

  renderHeader(ws, 1, ['#', '필드명(영문)', '한글명', '데이터타입', '사용DS수', '점유율(%)', '샘플', '설명', '연계 카테고리']);

  const freq = ka.field_freq;
  const meta = ka.field_meta;
  const ck = ka.common_keys;
  const kdmap = ka.key_ds_map;
  const total = ka.total_ds;

  if (ck.length === 0) {
    ws.autoFilter = 'A1:I1';
    renderEmptyNotice(ws, '공통키 분석 결과가 없습니다.', 'A2:I2');
    return;
  }

  const dsCatMap = Object.fromEntries(datasets.map(d => [d.svc_no, d.cat || '']));
  const safePct = (cnt) => total > 0 ? parseFloat((cnt / total * 100).toFixed(1)) : 0;

  ck.forEach((field, i) => {
    const r = i + 2;
    const m = meta[field] || {};
    const cnt = freq[field] || 0;
    const pct = safePct(cnt);
    const heat = heatmap(pct);
    const cats = Array.from(new Set(toArray(kdmap[field]).map(sn => dsCatMap[sn]).filter(Boolean))).sort();
    const bg = i % 2 ? 'F9F9F9' : 'FFFFFF';

    ws.getRow(r).height = 22;

    writeRow(ws, r, [
      { v: i + 1, ha: 'center' },
      { v: field, ha: 'left', bold: true },
      { v: m.kor_nm || '', ha: 'center' },
      { v: m.type || '', ha: 'center', sz: 8 },
      { v: cnt, ha: 'center', bold: true },
      { v: pct, ha: 'center', bold: true, bgOv: heat.bg, fgOv: heat.fg },
      { v: toSafeString(m.sample, 20), ha: 'left', sz: 7, italic: true },
      { v: m.desc || '', ha: 'left', sz: 8 },
      { v: cats.join(' / ').substring(0, 60), ha: 'left', sz: 8 },
    ], { bg });
  });

  ws.autoFilter = `A1:I${ck.length + 1}`;
}

// ═════════════════════════════════════════════════════════════
// 시트 4: 키×데이터셋 크로스맵
// ═════════════════════════════════════════════════════════════
function shCross(ws, datasets, ka) {
  setWorksheetCommon(ws, SHEET_NAMES.CROSS, [{ showGridLines: false, state: 'frozen', xSplit: 3, ySplit: 2 }]);

  const ck = ka.common_keys.slice(0, MAX_CROSS_KEYS);
  const meta = ka.field_meta;
  const freq = ka.field_freq;
  const n = datasets.length;

  if (ck.length === 0) {
    setColWidths(ws, [5, 36, 13]);
    renderEmptyNotice(ws, '공통키 분석 결과가 없어 크로스맵을 생성할 수 없습니다.', 'A1:C1');
    return;
  }

  setColWidths(ws, [5, 36, 13, ...ck.map(() => 11)]);
  ws.getRow(1).height = 18;
  ws.getRow(2).height = 48;

  ck.forEach((k, idx) => {
    const ci = idx + 4;
    const m = meta[k] || {};
    formatCell(ws.getCell(1, ci), { val: m.kor_nm || '', bg: '2F5496', fg: 'FFFFFF', bold: true, sz: 7, ha: 'center' });
    formatCell(ws.getCell(2, ci), { val: k, bg: '1F4E79', fg: 'FFFFFF', bold: true, sz: 8, ha: 'center' });
  });

  ['#', '데이터셋명', '카테고리'].forEach((name, ci) => {
    const col = ci + 1;
    formatCell(ws.getCell(1, col), { val: name, bg: '1F4E79', fg: 'FFFFFF', bold: true, ha: 'center' });
    ws.mergeCells(1, col, 2, col);
  });

  const dsFieldSets = new Map(
    datasets.map(ds => [ds.svc_no, new Set(toArray(ka.ds_key_map[ds.svc_no]))])
  );

  datasets.forEach((ds, idx) => {
    const r = idx + 3;
    const cat = toSafeString(ds.cat);
    const bg = catBg(cat, idx);

    ws.getRow(r).height = 18;
    formatCell(ws.getCell(r, 1), { val: idx + 1, bg, ha: 'center' });
    formatCell(ws.getCell(r, 2), { val: ds.svc_nm || '', bg, sz: 8 });
    formatCell(ws.getCell(r, 3), { val: cat, bg, ha: 'center', sz: 8 });

    const dsFields = dsFieldSets.get(ds.svc_no) || new Set();
    ck.forEach((k, ciIdx) => {
      const ci = ciIdx + 4;
      const cell = ws.getCell(r, ci);
      if (dsFields.has(k)) {
        formatCell(cell, { val: 'Y', bg: 'C6EFCE', fg: '1F4E79', bold: true, sz: 12, ha: 'center' });
      } else {
        formatCell(cell, { val: '', bg, ha: 'center' });
      }
    });
  });

  const tr = datasets.length + 3;
  ws.getRow(tr).height = 22;
  ws.mergeCells(tr, 1, tr, 3);
  formatCell(ws.getCell(tr, 1), { val: '키별 사용 데이터셋 수', bg: '1F4E79', fg: 'FFFFFF', bold: true, ha: 'center' });

  ck.forEach((k, ciIdx) => {
    const ci = ciIdx + 4;
    const cnt = freq[k] || 0;
    const hbg = n > 0 && cnt >= n * 0.7 ? 'C00000' : (n > 0 && cnt >= n * 0.4 ? 'FF6600' : '2F5496');
    formatCell(ws.getCell(tr, ci), { val: cnt, bg: hbg, fg: 'FFFFFF', bold: true, ha: 'center' });
  });
}

// ═════════════════════════════════════════════════════════════
// 시트 5: 결합 시나리오
// ═════════════════════════════════════════════════════════════
function shScenarios(ws, scenarios) {
  setWorksheetCommon(ws, SHEET_NAMES.SCENARIOS, [{ showGridLines: false, state: 'frozen', ySplit: 1 }]);
  setColWidths(ws, [5, 13, 32, 12, 13, 32, 12, 8, 30, 9, 12, 8, 48, 58]);

  renderHeader(ws, 1, [
    '#', 'DS-A', 'A 데이터셋명', '카테고리A',
    'DS-B', 'B 데이터셋명', '카테고리B',
    '키수', '공통키 목록', '점수', 'JOIN 유형', '신뢰도',
    '활용 시나리오', 'SQL 힌트',
  ]);

  if (scenarios.length === 0) {
    ws.autoFilter = 'A1:N1';
    renderEmptyNotice(ws, '결합 시나리오 결과가 없습니다.', 'A2:N2');
    return;
  }

  scenarios.forEach((rawSc, idx) => {
    const sc = normalizeScenario(rawSc);
    const r = idx + 2;
    const score = sc.score;
    const sbg = scoreBg(score);
    const bg = idx % 2 ? 'FAFAFA' : 'FFFFFF';

    ws.getRow(r).height = 52;

    writeRow(ws, r, [
      { v: idx + 1, ha: 'center' },
      { v: sc.ds_a, ha: 'center', bold: true },
      { v: sc.nm_a, ha: 'left', sz: 8 },
      { v: sc.cat_a, ha: 'center', sz: 8 },
      { v: sc.ds_b, ha: 'center', bold: true },
      { v: sc.nm_b, ha: 'left', sz: 8 },
      { v: sc.cat_b, ha: 'center', sz: 8 },
      { v: sc.key_count, ha: 'center', bold: true },
      { v: sc.shared_keys.join(', '), ha: 'left', sz: 8 },
      { v: score, ha: 'center', bold: true, sz: 10, bgOv: sbg },
      { v: sc.join_type, ha: 'center', sz: 8, bold: true },
      { v: sc.confidence, ha: 'center', sz: 8 },
      { v: sc.use_case, ha: 'left', sz: 8 },
      { v: sc.sql_hint, ha: 'left', sz: 7, italic: true, bgOv: 'F0F0F0' },
    ], { bg });
  });

  ws.autoFilter = `A1:N${scenarios.length + 1}`;
}

// ═════════════════════════════════════════════════════════════
// 시트 6: 출력항목 원본
// ═════════════════════════════════════════════════════════════
function shRaw(ws, datasets) {
  setWorksheetCommon(ws, SHEET_NAMES.RAW, [{ showGridLines: false, state: 'frozen', ySplit: 1 }]);
  setColWidths(ws, [5, 13, 30, 12, 26, 14, 12, 10, 30, 24]);

  renderHeader(ws, 1, ['#', '서비스번호', '데이터셋명', '카테고리', '필드명(영문)', '한글명', '타입', '길이', '설명', '샘플값']);

  let r = 2;
  let seq = 1;

  for (const ds of datasets) {
    const cat = toSafeString(ds.cat);
    const fields = toArray(ds.fields);

    for (const f of fields) {
      ws.getRow(r).height = 18;
      const bg = catBg(cat, seq);

      writeRow(ws, r, [
        { v: seq, ha: 'center' },
        { v: ds.svc_no, ha: 'center', bold: true },
        { v: ds.svc_nm || '', ha: 'left', sz: 8 },
        { v: cat, ha: 'center', sz: 8 },
        { v: f.field || '', ha: 'left', bold: true },
        { v: f.kor_nm || '', ha: 'left', sz: 8 },
        { v: f.type || f.sqlType || '', ha: 'center', sz: 8 },
        { v: f.length || '', ha: 'center', sz: 8 },
        { v: toSafeString(f.desc, FIELD_MAX_LEN), ha: 'left', sz: 8 },
        { v: toSafeString(f.sample, SAMPLE_MAX_LEN), ha: 'left', sz: 7, italic: true },
      ], { bg });

      r++;
      seq++;
    }
  }

  if (seq === 1) {
    renderEmptyNotice(ws, '출력항목 원본 데이터가 없습니다.', 'A2:J2');
  }

  ws.autoFilter = `A1:J${Math.max(r - 1, 1)}`;
}

// ═════════════════════════════════════════════════════════════
// 시트 7: Arquero 상세 분석 (추가 데이터)
// ═════════════════════════════════════════════════════════════
function shArquero(ws, arqueroScenarios) {
  setWorksheetCommon(ws, SHEET_NAMES.ARQUERO, [{ showGridLines: false, state: 'frozen', ySplit: 1 }]);
  setColWidths(ws, [5, 12, 18, 30, 10, 10, 10, 30, 48]);

  renderHeader(ws, 1, ['#', '시나리오 ID', '공통키', '참여 데이터셋', '참여수', '점수', '신뢰도', '관계(에지)', 'SQL 힌트 요약'], 'A569BD');

  if (!arqueroScenarios || !arqueroScenarios.scenarios || arqueroScenarios.scenarios.length === 0) {
    ws.autoFilter = 'A1:I1';
    renderEmptyNotice(ws, 'Arquero 시나리오 분석 결과가 없습니다.', 'A2:I2');
    return;
  }

  arqueroScenarios.scenarios.forEach((sc, idx) => {
    const r = idx + 2;
    ws.getRow(r).height = 45;
    
    const relationsStr = (sc.relations || []).map(rel => `${rel.from} <-> ${rel.to} (${rel.joinType})`).join('\n');
    const datasetsStr = (sc.datasets || []).join(', ');

    writeRow(ws, r, [
      { v: idx + 1, ha: 'center' },
      { v: sc.id || '', ha: 'center', bold: true },
      { v: sc.joinKey || '', ha: 'center', bold: true },
      { v: datasetsStr, ha: 'left', sz: 8 },
      { v: sc.datasetCount || 0, ha: 'center', bold: true },
      { v: sc.score || 0, ha: 'center', bgOv: scoreBg(sc.score) },
      { v: sc.confidence || '', ha: 'center', sz: 8 },
      { v: relationsStr, ha: 'left', sz: 8 },
      { v: sc.sql || '', ha: 'left', sz: 7, italic: true, bgOv: 'F9F9F9' },
    ], { bg: idx % 2 ? 'FAFAFA' : 'FFFFFF' });
  });

  ws.autoFilter = `A1:I${arqueroScenarios.scenarios.length + 1}`;
}

// ═════════════════════════════════════════════════════════════
// 시트 8: SQLite 체인 조인 쿼리 (추가 데이터)
// ═════════════════════════════════════════════════════════════
function shChainJoins(ws, chainJoinsText) {
  setWorksheetCommon(ws, SHEET_NAMES.CHAIN_SQL, [{ showGridLines: false }]);
  setColWidths(ws, [100]);

  renderHeader(ws, 1, ['체인 조인 SQL 원문 (N차 연결 결과)'], 'F39C12');

  if (!chainJoinsText) {
    renderEmptyNotice(ws, '체인 조인 SQL 파일 데이터가 없습니다.', 'A2:A2');
    return;
  }

  // 텍스트를 줄바꿈 기준으로 적절히 넣거나, 셀 1개에 통째로 넣기
  ws.getRow(2).height = 600;
  writeRow(ws, 2, [
    { v: chainJoinsText, ha: 'left', wrap: true, sz: 8, bgOv: 'F2F3F4' }
  ]);
}

// ═════════════════════════════════════════════════════════════
// 워크북 설정
// ═════════════════════════════════════════════════════════════
function setupWorkbookMetadata(workbook) {
  workbook.creator = '식품안전나라 API 분석기';
  workbook.lastModifiedBy = '식품안전나라 API 분석기';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.properties = {
    title: '식품안전나라 Open API 데이터 관계 분석 보고서',
    subject: '데이터셋 분석, 공통키 분석, 결합 시나리오',
    keywords: '식품안전나라, Open API, 공공데이터, 공통키, 결합 시나리오',
    category: 'Data Analysis Report',
  };
}

function addSheets(workbook, datasets, ka, scenarios, extraData = {}) {
  shCover(workbook.addWorksheet(SHEET_NAMES.COVER), datasets, ka, scenarios);
  shList(workbook.addWorksheet(SHEET_NAMES.DATASETS), datasets, ka);
  shKeys(workbook.addWorksheet(SHEET_NAMES.KEYS), ka, datasets);
  shCross(workbook.addWorksheet(SHEET_NAMES.CROSS), datasets, ka);
  shScenarios(workbook.addWorksheet(SHEET_NAMES.SCENARIOS), scenarios);
  
  if (extraData.arqueroScenarios) {
    shArquero(workbook.addWorksheet(SHEET_NAMES.ARQUERO), extraData.arqueroScenarios);
  }
  if (extraData.chainJoinsText) {
    shChainJoins(workbook.addWorksheet(SHEET_NAMES.CHAIN_SQL), extraData.chainJoinsText);
  }
  
  shRaw(workbook.addWorksheet(SHEET_NAMES.RAW), datasets);
}

// ═════════════════════════════════════════════════════════════
// 진입 함수: buildExcel
// ═════════════════════════════════════════════════════════════
/**
 * 전체 엑셀 보고서를 생성하는 진입 함수
 * @param {Array}  datasets   - 크롤링된 데이터셋 목록
 * @param {Object} ka         - 공통키 분석 결과
 * @param {Array}  scenarios  - 데이터셋 결합 시나리오 목록
 * @param {string} outputPath - 생성할 엑셀 파일 경로
 */
async function buildExcel(datasets, ka, scenarios, outputPath, extraData = {}) {
  log.info('STEP 5: 엑셀 보고서 생성 시작');

  validateInputs(datasets, ka, scenarios, outputPath);

  const safeDatasets = toArray(datasets);
  const safeKa = normalizeKeyAnalysis(ka);
  const safeScenarios = normalizeScenarios(scenarios);

  if (safeDatasets.length === 0) {
    log.warn('datasets가 비어 있습니다. 보고서가 빈 상태로 생성됩니다.');
  }

  const workbook = new ExcelJS.Workbook();
  setupWorkbookMetadata(workbook);
  addSheets(workbook, safeDatasets, safeKa, safeScenarios, extraData);

  await workbook.xlsx.writeFile(outputPath);
  log.info(`STEP 5 완료: ${outputPath}`);
}

module.exports = {
  buildExcel,

  // 테스트 및 외부 재사용용
  normalizeKeyAnalysis,
  normalizeScenarios,
  validateInputs,
  formatCell,
  writeRow,
  scoreBg,
  heatmap,
};

// ═════════════════════════════════════════════════════════════
// 단독 실행 (Standalone) 모드
// ═════════════════════════════════════════════════════════════
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const { identifyCommonKeys, deriveScenarios } = require('./crawler_api.js');

  const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');
  const EXCEL_FILE = path.join(__dirname, '../식품안전나라_API_분석결과.xlsx');

  if (!fs.existsSync(CACHE_FILE)) {
    log.error(`캐시 파일을 찾을 수 없습니다: ${CACHE_FILE}`);
    process.exit(1);
  }

  try {
    const datasets = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    if (!Array.isArray(datasets) || datasets.length === 0) {
      log.warn('캐시 데이터가 비어 있습니다.');
      process.exit(0);
    }
    log.info(`캐시 데이터 ${datasets.length}건 로드 완료`);

    const commonKeys = identifyCommonKeys(datasets);
    const scenarios = deriveScenarios(datasets, commonKeys);

    buildExcel(datasets, commonKeys, scenarios, EXCEL_FILE)
      .then(() => {
        log.info('엑셀 보고서 독립 생성이 완료되었습니다.');
      })
      .catch(err => {
        log.error(`엑셀 생성 중 에러 발생: ${err.message}`);
      });
  } catch (e) {
    log.error(`캐시 파싱 오류: ${e.message}`);
  }
}
