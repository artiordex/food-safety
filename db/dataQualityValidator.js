/**
 * 데이터맵 구축용 데이터 품질 점검기
 *
 * 실행: node db/dataQualityValidator.js [db 경로]
 * 결과: db/data_quality_report.json
 *
 * 점검 항목
 * - 컬럼명 앞뒤/중복 공백, 표기 정규화 후 중복, 유사 표기
 * - NULL, 빈 문자열, 앞뒤 공백, 날짜/숫자 컬럼의 형식 불일치
 * - 코드 컬럼의 과도한 값 종류(확인 필요 항목)
 */
/**
 * 식품안전나라 데이터 품질 점검기
 * 파일명: dataQualityValidator.js
 *
 * [수행 역할]
 * 1. SQLite DB 또는 JSON 샘플을 대상으로 값 누락, 형식, 범위, 표기 통일성을 점검
 * 2. PK/FK 후보 분석 결과를 참조하여 실제 키 후보 컬럼에 한해서만 NULL을 경고
 * 3. 날짜·코드·여부값 등 컬럼명 기반 규칙과 데이터 값 규칙을 함께 적용
 * 4. 결과를 JSON 및 한글 Excel 보고서로 출력하고, 각 이슈에 재확인용 SQLite SQL을 제공
 *
 * [기본 실행]
 * node db/dataQualityValidator.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const ExcelJS = require('exceljs');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const Hangul = require('hangul-js');
const { compareTwoStrings } = require('string-similarity');

dayjs.extend(customParseFormat);

// =============================================================================
// 1. 기본 경로 및 출력 정책
// =============================================================================
const DEFAULT_DB = path.join(__dirname, 'foodsafety.db');
const DEFAULT_JSON_SOURCE = path.join(__dirname, '..', 'samples', 'json');
const DEFAULT_OUTPUT = path.join(__dirname, 'data_quality_report.json');
const DEFAULT_XLSX_OUTPUT = path.join(__dirname, '..', '\uC2DD\uD488\uC548\uC804\uB098\uB77C_\uB370\uC774\uD130_\uD488\uC9C8\uC810\uAC80.xlsx');
const DEFAULT_KEY_CANDIDATES = path.join(__dirname, 'foodsafety_key_candidates.json');
const MAX_SAMPLE_VALUES = 10;
// API metadata tables are maintained separately and are not source-data quality targets.
const EXCLUDED_TABLES = new Set(['api_columns', 'api_tables']);

// SQLite 식별자를 안전하게 인용해 서비스 번호·컬럼명을 SQL에 사용할 수 있게 함
function quoteIdentifier(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

// analyze_pk_fk.js가 생성한 후보 보고서에서 테이블별 최상위 PK 후보 컬럼을 읽음
// HIGH/MEDIUM 신뢰도이면서 샘플 기준 중복·빈값이 없는 후보만 선택해 NULL 점검의 대상을 제한
function loadPrimaryKeyCandidateFields(filePath = DEFAULT_KEY_CANDIDATES) {
  const fieldsByTable = new Map();
  if (!fs.existsSync(filePath)) return fieldsByTable;
  const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const table of report.tables || []) {
    const candidates = (table.pk_candidates || [])
      .filter((candidate) => ['HIGH', 'MEDIUM'].includes(candidate.confidence))
      .filter((candidate) => candidate.unique_check?.is_unique && !candidate.unique_check?.has_empty)
      .sort((first, second) => second.score - first.score || first.fields.length - second.fields.length);
    if (candidates.length) fieldsByTable.set(String(table.svc_no), new Set(candidates[0].fields));
  }
  return fieldsByTable;
}

// 서비스 번호(svc_no)와 서비스명(svc_nm)의 대응표를 반환
function loadLogicalTableNames(filePath = DEFAULT_KEY_CANDIDATES) {
  if (!fs.existsSync(filePath)) return new Map();
  const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return new Map((report.tables || []).map((table) => [String(table.svc_no), table.svc_nm || String(table.svc_no)]));
}

// 서비스별 물리 컬럼명(field)과 한글 논리 컬럼명(kor_nm)의 대응표를 반환
function loadLogicalColumnNames(filePath = DEFAULT_KEY_CANDIDATES) {
  if (!fs.existsSync(filePath)) return new Map();
  const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return new Map((report.tables || []).map((table) => [
    String(table.svc_no),
    new Map((table.fields || []).map((field) => [field.field, field.kor_nm || field.field]))
  ]));
}

// 다중 서비스 이슈를 포함해 서비스 번호를 사람이 읽는 서비스명으로 변환
function logicalTableName(tableName, logicalNames) {
  return String(tableName).split(', ').map((name) => logicalNames.get(name) || name).join(', ');
}

// 다중 컬럼 이슈를 포함해 물리 컬럼명을 kor_nm 논리명으로 변환
function logicalColumnName(tableName, columnName, logicalNames) {
  const tables = String(tableName).split(', ');
  const columns = String(columnName).split(' / ');
  return columns.map((column, index) => logicalNames.get(tables[index] || tables[0])?.get(column) || column).join(' / ');
}

// 보고서의 점검 SQL 열에 넣을 SQLite 조회문을 생성
// NULL·빈 문자열·앞뒤 공백은 위반 행만 바로 조회하고, JS 판단이 필요한 규칙은 후보값 조회문과 안내 주석을 제공
function issueSqlQuery(issue) {
  const table = String(issue.table || '');
  const column = String(issue.column || '');
  if (!table || table.includes(', ') || !column || column.includes(' / ')) {
    return '-- \uD14C\uC774\uBE14 \uAC04 \uD45C\uAE30 \uD1B5\uC77C \uC774\uC288\uB85C \uB2E8\uC77C \uC11C\uBE44\uC2A4 \uC870\uD68C SQL\uC744 \uC81C\uACF5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.';
  }
  const qTable = quoteIdentifier(table);
  const qColumn = quoteIdentifier(column);
  const qLogicalColumn = quoteIdentifier(issue.logicalColumn || column);
  const select = `SELECT rowid, ${qColumn} AS ${qLogicalColumn}\nFROM ${qTable}`;
  const rule = String(issue.rule || '');
  if (rule.includes('NULL')) return `${select}\nWHERE ${qColumn} IS NULL\nORDER BY rowid;`;
  if (rule.includes('\uBE48 \uBB38\uC790\uC5F4')) return `${select}\nWHERE ${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) = ''\nORDER BY rowid;`;
  if (rule.includes('\uC55E\uB4A4 \uACF5\uBC31')) return `${select}\nWHERE ${qColumn} IS NOT NULL\n  AND CAST(${qColumn} AS TEXT) <> TRIM(CAST(${qColumn} AS TEXT))\nORDER BY rowid;`;
  return `${select}\nWHERE ${qColumn} IS NOT NULL\n  AND TRIM(CAST(${qColumn} AS TEXT)) <> ''\nORDER BY rowid;\n-- \uC774 \uADDC\uCE59\uC740 \uAC80\uC99D\uAE30\uC758 \uC138\uBD80 \uD310\uC815 \uB85C\uC9C1\uC744 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694.`;
}

// SQLite PK 선언 또는 PK 후보 분석 결과에 포함된 컬럼인지 판정
function isPrimaryKeyCandidate(column, candidateFields) {
  return column.pk > 0 || candidateFields?.has(column.name);
}

// 공백·밑줄·하이픈·대소문자 차이를 무시한 컬럼명 비교용 키를 만듦
function normaliseColumnName(name) {
  return String(name)
    .trim()
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .toLowerCase();
}

const COLUMN_SUFFIXES = ['CD', 'NM', 'DT', 'YN', 'NO'];
const PRESERVED_COLUMN_NAMES = new Set(['BRCD_NO', 'TELNO', 'PRDT_NM', 'SITE_ADDR']);
const PREFERRED_STANDARD_COLUMN_NAMES = ['BRCD_NO', 'TELNO', 'PRDT_NM'];

// CD, NM, DT, YN, NO 접미사를 오른쪽부터 분리해 권고 물리 컬럼명 표기를 만듦
// 예: PRDLST_CDNM -> PRDLST_CD_NM
function separateKnownColumnSuffixes(name) {
  let base = String(name).trim().replace(/[\s-]+/g, '_').replace(/_+/g, '_');
  if (PRESERVED_COLUMN_NAMES.has(base.toUpperCase())) return base;
  const suffixes = [];
  let canSplitUnseparatedSuffix = true;
  while (base) {
    const suffix = COLUMN_SUFFIXES.find((item) => {
      const separated = new RegExp(`_${item}$`, 'i').test(base);
      const unseparated = canSplitUnseparatedSuffix && new RegExp(`${item}$`, 'i').test(base);
      return separated || unseparated;
    });
    if (!suffix) break;
    const next = base.replace(new RegExp(`_?${suffix}$`, 'i'), '');
    if (!next) break;
    suffixes.unshift(suffix);
    base = next;
    canSplitUnseparatedSuffix = false;
  }
  return suffixes.length ? `${base}_${suffixes.join('_')}` : base;
}

// 동일 표기 그룹의 권고 표준명을 선정
// 사용 빈도보다 접미사 분리 규칙을 우선 적용하고, 이후 사용 횟수·구분자 수·이름순으로 안정적으로 결정
function recommendedColumnName(matches) {
  const occurrences = new Map();
  for (const { column } of matches) {
    const canonical = separateKnownColumnSuffixes(column);
    occurrences.set(canonical, (occurrences.get(canonical) || 0) + 1);
  }
  const preferredName = PREFERRED_STANDARD_COLUMN_NAMES.find((name) => occurrences.has(name));
  if (preferredName) return preferredName;
  return [...occurrences.keys()].sort((first, second) => {
    const countDifference = occurrences.get(second) - occurrences.get(first);
    if (countDifference) return countDifference;
    const separatorDifference = (second.match(/[_-]/g) || []).length - (first.match(/[_-]/g) || []).length;
    if (separatorDifference) return separatorDifference;
    return first.localeCompare(second);
  })[0];
}

// 권고 표준명 외에도 업무 약어로 굳어진 표기를 같은 그룹 안의 허용 표준명으로 보존
function acceptedStandardNames(matches, standardName) {
  const accepted = [standardName];
  const existingNames = new Set(matches.map((item) => String(item.column).trim().toUpperCase()));
  for (const preservedName of PRESERVED_COLUMN_NAMES) {
    if (existingNames.has(preservedName) && !accepted.includes(preservedName)) accepted.push(preservedName);
  }
  return accepted;
}

// 컬럼명·선언 타입의 키워드로 날짜, 코드, 숫자, 텍스트의 점검 유형을 추론
function columnKind(name, declaredType = '') {
  const source = `${name} ${declaredType}`.toLowerCase();
  // Unicode escapes keep these rules portable even when this file is opened in
  // a legacy Windows code page. Include the declared type for generic names.
  if (/(^|_|\b)(date|datetime|timestamp|dt|ymd)(?=$|[_ \s]|\b)|\uB0A0\uC9DC|\uC77C\uC790|\uC77C\uC2DC|\uC2DC\uAC04/.test(source)) return 'date';
  if (/(^|_|\b)(code|cd|yn)(?=$|[_ \s]|\b)|\uCF54\uB4DC|\uAD6C\uBD84|\uC5EC\uBD80/.test(source)) return 'code';
  if (/(^|_|\b)(qty|quantity|cnt|count|amount|price|rate|score|num|number)(?=$|[_ \s]|\b)|\uC218\uB7C9|\uAC74\uC218|\uAE08\uC561|\uD310\uB9E4\uB7C9|\uC810\uC218/.test(source)) return 'number';
  return 'text';
}

// YYYY.MM.DD, YYYY-MM-DD, YYYY/MM/DD, YYYYMMDD 및 시간 포함 날짜값의 달력상 유효성을 검사
// dayjs의 strict parsing을 사용해 2월 30일처럼 형식은 맞지만 존재하지 않는 날짜를 제외
function isValidDateValue(value) {
  const text = String(value).trim();
  // Validate the calendar day explicitly: SQLite's date() accepts some
  // impossible days such as 2024-02-30.
  const match = text.match(/^(\d{4})(?:[-./](\d{1,2})[-./](\d{1,2})|(\d{2})(\d{2}))(?:[ T](\d{1,2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2] || match[4]);
  const day = Number(match[3] || match[5]);
  if (!dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true).isValid()) return false;
  if (match[6] && (Number(match[6]) > 23 || Number(match[7]) > 59 || (match[8] && Number(match[8]) > 59))) return false;
  return true;
}

// 유효 날짜를 비교와 표기 혼재 탐지에 사용할 YYYY-MM-DD 내부 표준값으로 변환
function canonicalDate(value) {
  const text = String(value).trim();
  const match = text.match(/^(\d{4})(?:[-./](\d{1,2})[-./](\d{1,2})|(\d{2})(\d{2}))/);
  if (!match || !isValidDateValue(text)) return null;
  const year = match[1];
  const month = String(match[2] || match[4]).padStart(2, '0');
  const day = String(match[3] || match[5]).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 날짜값의 구분자·월일 자리수를 식별해 YYYY.MM.DD 같은 표기 형식 서명을 반환
function dateFormatSignature(value) {
  const text = String(value).trim();
  const match = text.match(/^(\d{4})([-./]?)(\d{1,2})\2(\d{1,2})/);
  if (!match || !canonicalDate(text)) return null;
  const separator = match[2];
  const padded = match[3].length === 2 && match[4].length === 2;
  if (!separator) return 'YYYYMMDD';
  return `YYYY${separator}${padded ? 'MM' : 'M'}${separator}${padded ? 'DD' : 'D'}`;
}

// 한글 자모 분해를 적용해 오탈자 유사도 비교에 사용할 컬럼명 문자열을 만듦
function comparableColumnName(name) {
  return Hangul.disassemble(normaliseColumnName(name)).join('');
}

// 두 문자열 사이의 최소 삽입·삭제·치환 횟수를 구해 한글 자모 단위의 오탈자 여부를 좁혀 판단한다.
function levenshteinDistance(first, second) {
  const previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    const current = [firstIndex];
    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      current[secondIndex] = Math.min(
        current[secondIndex - 1] + 1,
        previous[secondIndex] + 1,
        previous[secondIndex - 1] + (first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1)
      );
    }
    for (let index = 0; index < previous.length; index += 1) previous[index] = current[index];
  }
  return previous[second.length];
}

// 서로 완전히 같지는 않지만 자모 기준 유사도가 높은 컬럼명 쌍을 검토 후보로 찾음
// 숫자 순번만 다른 반복 필드는 제외하며, 이 결과는 자동 이름 변경이 아닌 검토용 정보 이슈로만 활용해야 함
function findColumnTypoCandidates(columnsByNormalisedName) {
  const columns = [...columnsByNormalisedName.values()].flat();
  const candidates = [];
  const seen = new Set();
  for (let index = 0; index < columns.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < columns.length; otherIndex += 1) {
      const first = columns[index];
      const second = columns[otherIndex];
      if (!/[A-Za-z]/.test(first.column) || !/[A-Za-z]/.test(second.column)) continue;
      // Similar physical names may still be different concepts (for example CD vs CD_NM).
      // Treat them as typo candidates only when their logical names also identify the same meaning.
      if (normaliseColumnName(first.logicalColumn || first.column) !== normaliseColumnName(second.logicalColumn || second.column)) continue;
      const firstNormalised = normaliseColumnName(first.column);
      const secondNormalised = normaliseColumnName(second.column);
      if (firstNormalised === secondNormalised || firstNormalised.length < 3 || secondNormalised.length < 3) continue;
      // Numbered fields such as AMT_NUM1 / AMT_NUM2 are usually intentional
      // repetitions, not typos. Do not flood the report with those pairs.
      if (firstNormalised.replace(/\d+/g, '') === secondNormalised.replace(/\d+/g, '')) continue;
      const score = compareTwoStrings(comparableColumnName(first.column), comparableColumnName(second.column));
      // A high threshold deliberately reports only review candidates. Similar labels
      // can still denote different business concepts and must never be auto-renamed.
      if (score < 0.9) continue;
      const key = [firstNormalised, secondNormalised].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      const relatedColumns = columns.filter((column) => {
        const normalised = normaliseColumnName(column.column);
        return normalised === firstNormalised || normalised === secondNormalised;
      });
      candidates.push({ first, second, score, relatedColumns });
    }
  }
  return candidates;
}

// kor_nm이 한글인 컬럼만 대상으로 자모 유사도가 높은 논리형 컬럼명 오탈자 후보를 찾는다.
// 동일 이름은 별도 표준화 그룹에서 처리하므로, 여기서는 정규화해도 다른 이름만 검토 후보로 남긴다.
function findLogicalColumnTypoCandidates(columnsByLogicalName) {
  const columnsByName = new Map();
  for (const columns of columnsByLogicalName.values()) {
    for (const column of columns) {
      if (!column.hasLogicalColumnName || !/[\uAC00-\uD7A3]/.test(column.logicalColumn)) continue;
      const normalised = normaliseColumnName(column.logicalColumn);
      if (!columnsByName.has(normalised)) columnsByName.set(normalised, []);
      columnsByName.get(normalised).push(column);
    }
  }
  const names = [...columnsByName.keys()];
  const candidates = [];
  for (let index = 0; index < names.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < names.length; otherIndex += 1) {
      const firstName = names[index];
      const secondName = names[otherIndex];
      // Abbreviation/wording differences such as "일"/"일자" are handled by
      // logical-name standardisation, not as typos. A typo must keep the syllable count.
      if (firstName.length !== secondName.length) continue;
      if (firstName.replace(/\d+/g, '') === secondName.replace(/\d+/g, '')) continue;
      const first = columnsByName.get(firstName)[0];
      const second = columnsByName.get(secondName)[0];
      // Different physical fields can legitimately have near-identical Korean labels.
      // A Korean typo candidate is reliable only when the same physical field has conflicting kor_nm labels.
      if (normaliseColumnName(first.column) !== normaliseColumnName(second.column)) continue;
      if (columnKind(first.column, first.type) !== columnKind(second.column, second.type)) continue;
      const firstComparable = comparableColumnName(first.logicalColumn);
      const secondComparable = comparableColumnName(second.logicalColumn);
      const score = compareTwoStrings(firstComparable, secondComparable);
      if (score < 0.8) continue;
      if (levenshteinDistance(firstComparable, secondComparable) > 1) continue;
      candidates.push({
        first, second, score,
        relatedColumns: [...columnsByName.get(firstName), ...columnsByName.get(secondName)]
      });
    }
  }
  return candidates;
}

// 한 날짜 컬럼 안에 두 가지 이상 유효 날짜 표기 형식이 있는지 집계
function findDateFormatInconsistency(db, table, column) {
  const qColumn = quoteIdentifier(column);
  const formats = new Map();
  for (const row of db.prepare(`
    SELECT rowid AS rowId, ${qColumn} AS value
    FROM ${quoteIdentifier(table)}
    WHERE ${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) <> ''
  `).iterate()) {
    const signature = dateFormatSignature(row.value);
    if (!signature) continue;
    if (!formats.has(signature)) formats.set(signature, { count: 0, samples: [] });
    const item = formats.get(signature);
    item.count += 1;
    if (item.samples.length < MAX_SAMPLE_VALUES) item.samples.push(`rowid=${row.rowId}: ${row.value}`);
  }
  if (formats.size < 2) return null;
  return {
    severity: 'info', table, column, category: '\uD45C\uAE30 \uD1B5\uC77C', rule: '\uB0A0\uC9DC \uD45C\uAE30 \uD615\uC2DD \uD63C\uC7AC',
    message: `\uB3D9\uC77C \uB0A0\uC9DC \uCEE8\uB7FC\uC5D0 \uD45C\uAE30 \uD615\uC2DD\uC774 \uD63C\uC7AC\uB429\uB2C8\uB2E4: ${[...formats.keys()].join(', ')}`,
    count: [...formats.values()].reduce((sum, item) => sum + item.count, 0),
    samples: [...formats.values()].flatMap((item) => item.samples).slice(0, MAX_SAMPLE_VALUES),
    recommendation: 'YYYY.MM.DD \uD615\uC2DD\uC73C\uB85C \uD45C\uC900\uD654\uD558\uC138\uC694.'
  };
}

// 쉼표·소수·지수 표기를 포함한 숫자값의 전체 문자열 유효성을 검사
function isValidNumberValue(value) {
  if (typeof value === 'number') return Number.isFinite(value);
  const text = String(value).trim();
  // Do not accept partial numeric strings such as "12kg" or "1,2".
  return /^[-+]?(?:(?:\d{1,3}(?:,\d{3})+)|\d+)(?:\.\d+)?(?:[eE][-+]?\d+)?$/.test(text);
}

// 날짜 또는 숫자 성격 컬럼에서 실제 값이 해당 타입으로 파싱되지 않는 행을 수집
function findTypeMismatches(db, table, column, kind) {
  const qColumn = quoteIdentifier(column);
  const rows = db.prepare(`
    SELECT rowid AS rowId, ${qColumn} AS value
    FROM ${quoteIdentifier(table)}
    WHERE ${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) <> ''
  `).iterate();
  const isValid = kind === 'date' ? isValidDateValue : isValidNumberValue;
  let count = 0;
  const samples = [];
  for (const row of rows) {
    if (!isValid(row.value)) {
      count += 1;
      if (samples.length < MAX_SAMPLE_VALUES) samples.push(`rowid=${row.rowId}: ${String(row.value)}`);
    }
  }
  return { count, samples };
}

// 컬럼명과 선언 타입으로 여부·사업자번호·연락처·비율 등 의미 규칙 목록을 만듦
function columnMonitoringRules(name, declaredType = '') {
  const source = `${name} ${declaredType}`.toLowerCase();
  const rules = [];
  if (/(^|_)(yn|use_?yn|del_?yn|active_?yn|enabled_?yn)(?=$|[_\s])|\uC5EC\uBD80|\uC0AC\uC6A9\uC5EC\uBD80/.test(source)) rules.push('boolean');
  if (/(brno|bizno|business.*no|\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638)/.test(source)) rules.push('businessNumber');
  if (/(phone|tel|mobile|fax|\uC804\uD654|\uC5F0\uB77D\uCC98|\uD734\uB300\uD3F0)/.test(source)) rules.push('phone');
  if (/(email|e_mail|\uC774\uBA54\uC77C)/.test(source)) rules.push('email');
  if (/(url|uri|homepage|home_page|\uD648\uD398\uC774\uC9C0)/.test(source)) rules.push('url');
  if (/(rate|ratio|percent|pct|\uBE44\uC728|\uD37C\uC13C\uD2B8)/.test(source)) rules.push('percentage');
  if (/(qty|quantity|cnt|count|\uC218\uB7C9|\uAC74\uC218)/.test(source)) rules.push('nonNegative');
  if (/(latitude|lat|\uC704\uB3C4)/.test(source)) rules.push('latitude');
  if (/(longitude|lng|lon|\uACBD\uB3C4)/.test(source)) rules.push('longitude');
  if (/(code|cd|\uCF54\uB4DC)/.test(source)) rules.push('code');
  if (/(^|_)(id|no|number|qty|cnt|count|amount|date|ymd)(?=$|[_\s])|\uBC88\uD638|\uCF54\uB4DC|\uC218\uB7C9|\uAC74\uC218|\uAE08\uC561|\uB0A0\uC9DC|\uC77C\uC790/.test(source)) rules.push('singleValue');
  const lengthMatch = String(declaredType).match(/(?:var)?char\s*\(\s*(\d+)\s*\)/i);
  if (lengthMatch) rules.push(`maxLength:${lengthMatch[1]}`);
  return rules;
}

// 숫자 검증을 통과한 값을 쉼표 제거 후 Number로 변환하고, 실패하면 null을 반환
function numericValue(value) {
  const text = String(value).trim().replace(/,/g, '');
  return isValidNumberValue(text) ? Number(text) : null;
}

// 컬럼 의미 규칙에 따라 값 형식·범위·표기 혼재를 점검
// 규칙별 위반 건수와 최대 10개의 샘플을 모아 보고서 이슈 객체 배열로 반환
function findSemanticIssues(db, table, column, rules) {
  if (!rules.length) return [];
  const qColumn = quoteIdentifier(column);
  const violations = new Map();
  const variants = new Set();
  const codePatterns = new Set();
  const numericCodeLengths = new Set();
  const numericCodeSamples = [];
  const maxLengthRule = rules.find((rule) => rule.startsWith('maxLength:'));
  const maxLength = maxLengthRule ? Number(maxLengthRule.slice('maxLength:'.length)) : null;
  const addViolation = (rule, rowId, value) => {
    if (!violations.has(rule)) violations.set(rule, { count: 0, samples: [] });
    const item = violations.get(rule);
    item.count += 1;
    if (item.samples.length < MAX_SAMPLE_VALUES) item.samples.push(`rowid=${rowId}: ${value}`);
  };

  for (const row of db.prepare(`SELECT rowid AS rowId, ${qColumn} AS value FROM ${quoteIdentifier(table)} WHERE ${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) <> ''`).iterate()) {
    const value = String(row.value).trim();
    if (rules.includes('boolean')) {
      const canonical = value.toUpperCase();
      if (!['Y', 'N', 'YES', 'NO', '1', '0', 'O', 'X', '\uC608', '\uC544\uB2C8\uC624'].includes(canonical)) addViolation('booleanInvalid', row.rowId, value);
      else variants.add(canonical);
    }
    if (rules.includes('businessNumber') && !/^\d{3}-?\d{2}-?\d{5}$/.test(value)) addViolation('businessNumber', row.rowId, value);
    if (rules.includes('phone') && !/^(?:\+82[- ]?)?0\d{1,2}[- ]?\d{3,4}[- ]?\d{4}$/.test(value.replace(/\s+/g, ''))) addViolation('phone', row.rowId, value);
    if (rules.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) addViolation('email', row.rowId, value);
    if (rules.includes('url') && !/^https?:\/\/[^\s/$.?#][^\s]*$/i.test(value)) addViolation('url', row.rowId, value);
    if (rules.includes('percentage')) {
      const number = numericValue(value);
      if (number === null || number < 0 || number > 100) addViolation('percentage', row.rowId, value);
    }
    if (rules.includes('nonNegative')) {
      const number = numericValue(value);
      if (number !== null && number < 0) addViolation('nonNegative', row.rowId, value);
    }
    if (rules.includes('latitude')) {
      const number = numericValue(value);
      if (number === null || number < -90 || number > 90) addViolation('latitude', row.rowId, value);
    }
    if (rules.includes('longitude')) {
      const number = numericValue(value);
      if (number === null || number < -180 || number > 180) addViolation('longitude', row.rowId, value);
    }
    if (rules.includes('code')) {
      if (/^\d+$/.test(value)) {
        codePatterns.add('numeric');
        numericCodeLengths.add(value.length);
        if (numericCodeSamples.length < MAX_SAMPLE_VALUES) numericCodeSamples.push(`rowid=${row.rowId}: ${value}`);
      }
      else if (/^[A-Za-z]+$/.test(value)) codePatterns.add('alphabetic');
      else if (/^[A-Za-z0-9]+$/.test(value)) codePatterns.add('alphanumeric');
      else codePatterns.add('other');
    }
    if (rules.includes('singleValue') && /[,;\n\r]/.test(value)) addViolation('multipleValues', row.rowId, value);
    if (maxLength && value.length > maxLength) addViolation('maxLength', row.rowId, value);
    if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)) addViolation('controlCharacter', row.rowId, value);
  }

  const issues = [];
  const ruleInfo = {
    booleanInvalid: ['\uC5EC\uBD80\uAC12 \uD615\uC2DD', '\uC5EC\uBD80 \uCEEC\uB7FC\uC5D0 \uD5C8\uC6A9\uB418\uC9C0 \uC54A\uB294 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', 'Y/N \uB610\uB294 1/0 \uB4F1 \uD558\uB098\uC758 \uD45C\uC900\uC73C\uB85C \uD1B5\uC77C\uD558\uC138\uC694.'],
    businessNumber: ['\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638 \uD615\uC2DD', '\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638\uAC00 10\uC790\uB9AC \uD615\uC2DD\uC5D0 \uB9DE\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.', '123-45-67890 \uD615\uC2DD\uC73C\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    phone: ['\uC804\uD654\uBC88\uD638 \uD615\uC2DD', '\uC804\uD654\uBC88\uD638\uB85C \uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '\uAD6D\uB0B4 \uC804\uD654\uBC88\uD638 \uD615\uC2DD\uC73C\uB85C \uD1B5\uC77C\uD558\uC138\uC694.'],
    email: ['\uC774\uBA54\uC77C \uD615\uC2DD', '\uC774\uBA54\uC77C \uD615\uC2DD\uC5D0 \uB9DE\uC9C0 \uC54A\uB294 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', 'name@example.com \uD615\uC2DD\uC73C\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    url: ['URL \uD615\uC2DD', 'HTTP/HTTPS URL\uB85C \uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', 'https://\uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB85C \uD1B5\uC77C\uD558\uC138\uC694.'],
    percentage: ['\uBE44\uC728 \uBC94\uC704', '\uBE44\uC728 \uCEEC\uB7FC\uC5D0 0~100 \uBC94\uC704 \uBC16\uC758 \uAC12 \uB610\uB294 \uC22B\uC790\uAC00 \uC544\uB2CC \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '0~100 \uC0AC\uC774\uC758 \uC22B\uC790\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    nonNegative: ['\uC218\uB7C9\u00B7\uAC74\uC218 \uC74C\uC218\uAC12', '\uC218\uB7C9 \uB610\uB294 \uAC74\uC218 \uCEEC\uB7FC\uC5D0 \uC74C\uC218\uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '\uCDE8\uC18C\u00B7\uBC18\uD488 \uB370\uC774\uD130\uC778\uC9C0 \uD655\uC778\uD558\uACE0, \uC544\uB2C8\uBA74 0 \uC774\uC0C1\uC73C\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    latitude: ['\uC704\uB3C4 \uBC94\uC704', '\uC704\uB3C4 \uCEEC\uB7FC\uC5D0 -90~90 \uBC94\uC704 \uBC16\uC758 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '\uC704\uB3C4\uB294 -90~90 \uBC94\uC704\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    longitude: ['\uACBD\uB3C4 \uBC94\uC704', '\uACBD\uB3C4 \uCEEC\uB7FC\uC5D0 -180~180 \uBC94\uC704 \uBC16\uC758 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '\uACBD\uB3C4\uB294 -180~180 \uBC94\uC704\uB85C \uC815\uC81C\uD558\uC138\uC694.'],
    multipleValues: ['\uB2E4\uC911\uAC12 \uD63C\uC785', '\uB2E8\uC77C\uAC12 \uC131\uACA9\uC758 \uCEEC\uB7FC\uC5D0 \uC5EC\uB7EC \uAC12\uC774 \uB4E4\uC5B4\uC788\uC2B5\uB2C8\uB2E4.', '\uBCF5\uC218 \uAC12\uC740 \uBCC4\uB3C4 \uC5F0\uAD00 \uD14C\uC774\uBE14\uB85C \uBD84\uB9AC\uD558\uC138\uC694.'],
    controlCharacter: ['\uC81C\uC5B4\uBB38\uC790', '\uD14D\uC2A4\uD2B8 \uAC12\uC5D0 \uC81C\uC5B4\uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.', '\uC81C\uC5B4\uBB38\uC790\uB97C \uC81C\uAC70\uD558\uC138\uC694.']
    , maxLength: ['\uD14D\uC2A4\uD2B8 \uAE38\uC774 \uCD08\uACFC', '\uC2A4\uD0A4\uB9C8\uC5D0 \uC815\uC758\uB41C \uCD5C\uB300 \uAE38\uC774\uB97C \uCD08\uACFC\uD55C \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.', '\uCEEC\uB7FC \uAE38\uC774 \uC815\uC758\uC640 \uC2E4\uC81C \uB370\uC774\uD130\uB97C \uD655\uC778\uD558\uC138\uC694.']
  };
  for (const [rule, result] of violations) {
    const [label, message, recommendation] = ruleInfo[rule];
    issues.push({ table, column, category: '\uD615\uC2DD \uBC0F \uBC94\uC704', rule: label, message: `${message} (${result.count}\uAC74)`, count: result.count, samples: result.samples, recommendation });
  }
  if (rules.includes('boolean') && variants.size > 1) issues.push({ severity: 'info', table, column, category: '\uD45C\uAE30 \uD1B5\uC77C', rule: '\uC5EC\uBD80\uAC12 \uD45C\uAE30 \uD63C\uC7AC', message: `\uC5EC\uBD80\uAC12 \uD45C\uAE30\uAC00 \uD63C\uC7AC\uB429\uB2C8\uB2E4: ${[...variants].join(', ')}`, count: variants.size, recommendation: 'Y/N \uD45C\uAE30\uB85C \uD1B5\uC77C\uD558\uC138\uC694.' });
  if (rules.includes('code') && codePatterns.size > 1) issues.push({ severity: 'info', table, column, category: '\uCF54\uB4DC \uD45C\uAE30', rule: '\uCF54\uB4DC \uD615\uC2DD \uD63C\uC7AC', message: `\uCF54\uB4DC \uD615\uC2DD\uC774 \uD63C\uC7AC\uB429\uB2C8\uB2E4: ${[...codePatterns].join(', ')}`, count: codePatterns.size, recommendation: '\uCF54\uB4DC \uCCB4\uACC4\uC640 \uC790\uB9AC\uC218\uB97C \uD45C\uC900\uD654\uD558\uC138\uC694.' });
  if (rules.includes('code') && numericCodeLengths.size > 1) issues.push({ severity: 'info', table, column, category: '\uCF54\uB4DC \uD45C\uAE30', rule: '\uCF54\uB4DC \uC790\uB9AC\uC218 \uD63C\uC7AC', message: `\uC22B\uC790 \uCF54\uB4DC\uC758 \uC790\uB9AC\uC218\uAC00 \uD63C\uC7AC\uB429\uB2C8\uB2E4: ${[...numericCodeLengths].sort((a, b) => a - b).join(', ')}\uC790\uB9AC`, count: numericCodeLengths.size, samples: numericCodeSamples, recommendation: '\uC55E\uC790\uB9AC 0 \uB204\uB77D \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uACE0 \uACE0\uC815 \uC790\uB9AC\uC218\uB85C \uD45C\uC900\uD654\uD558\uC138\uC694.' });
  return issues;
}

// 유효 날짜를 선후 관계 비교용 숫자 YYYYMMDD로 변환
function dateSortValue(value) {
  const text = String(value).trim();
  const match = text.match(/^(\d{4})(?:[-./](\d{1,2})[-./](\d{1,2})|(\d{2})(\d{2}))/);
  if (!match || !isValidDateValue(value)) return null;
  return Number(`${match[1]}${String(match[2] || match[4]).padStart(2, '0')}${String(match[3] || match[5]).padStart(2, '0')}`);
}

// 시작일/종료일, 제조일/유통기한처럼 선후 관계가 있는 날짜 컬럼 쌍의 역전을 탐지
function findDateOrderIssues(db, table, columns) {
  const dates = columns.filter((column) => columnKind(column.name, column.type) === 'date');
  const find = (pattern) => dates.find((column) => pattern.test(column.name.toLowerCase()));
  const pairs = [
    [find(/start|begin|from|strt|\uC2DC\uC791|\uAC1C\uC2DC/), find(/end|finish|to|\uC885\uB8CC/), '\uC2DC\uC791\uC77C \uC885\uB8CC\uC77C \uC5ED\uC804'],
    [find(/mfg|manufactur|\uC81C\uC870/), find(/expir|expiry|expdt|\uC720\uD1B5\uAE30\uD55C/), '\uC81C\uC870\uC77C \uC720\uD1B5\uAE30\uD55C \uC5ED\uC804']
  ].filter(([first, second]) => first && second && first.name !== second.name);
  return pairs.map(([first, second, rule]) => {
    const qFirst = quoteIdentifier(first.name);
    const qSecond = quoteIdentifier(second.name);
    let count = 0;
    const samples = [];
    for (const row of db.prepare(`SELECT rowid AS rowId, ${qFirst} AS firstValue, ${qSecond} AS secondValue FROM ${quoteIdentifier(table)} WHERE ${qFirst} IS NOT NULL AND ${qSecond} IS NOT NULL`).iterate()) {
      const firstValue = dateSortValue(row.firstValue);
      const secondValue = dateSortValue(row.secondValue);
      if (firstValue !== null && secondValue !== null && firstValue > secondValue) {
        count += 1;
        if (samples.length < MAX_SAMPLE_VALUES) samples.push(`rowid=${row.rowId}: ${row.firstValue} > ${row.secondValue}`);
      }
    }
    return count ? {
      table, column: `${first.name} / ${second.name}`, category: '\uB0A0\uC9DC \uB17C\uB9AC', rule,
      message: `\uC120\uD6C4 \uAD00\uACC4\uAC00 \uB9DE\uC9C0 \uC54A\uB294 \uB0A0\uC9DC \uC30D\uC774 ${count}\uAC74 \uC788\uC2B5\uB2C8\uB2E4.`, count, samples,
      recommendation: '\uC2DC\uC791\uC77C\uB9C8\uB2E4 \uC885\uB8CC\uC77C, \uC81C\uC870\uC77C\uBCF4\uB2E4 \uC720\uD1B5\uAE30\uD55C\uC774 \uB290\uB9B0\uC9C0 \uD655\uC778\uD558\uC138\uC694.'
    } : null;
  }).filter(Boolean);
}

// 기본 심각도와 샘플 배열을 보완한 뒤 이슈 목록에 추가
function addIssue(issues, issue) {
  issues.push({ severity: 'warning', samples: [], ...issue });
}

// SQLite 시스템 테이블과 사용자 관리 메타 테이블을 제외한 점검 대상 서비스 목록을 반환
function listTables(db) {
  return db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_columns')
    ORDER BY name
  `).all().map((row) => row.name).filter((name) => !EXCLUDED_TABLES.has(name));
}

// 보고서에 노출할 DISTINCT 값 샘플을 최대 MAX_SAMPLE_VALUES개 조회
function sampleValues(db, table, column, whereClause) {
  return db.prepare(`
    SELECT DISTINCT TRIM(CAST(${quoteIdentifier(column)} AS TEXT)) AS value
    FROM ${quoteIdentifier(table)}
    WHERE ${whereClause}
    LIMIT ${MAX_SAMPLE_VALUES}
  `).all().map((row) => row.value);
}

// 민감할 수 있는 전체 레코드 대신 재확인 가능한 rowid 샘플을 최대 개수만큼 반환
function sampleRowIds(db, table, whereClause) {
  return db.prepare(`
    SELECT rowid AS rowId FROM ${quoteIdentifier(table)}
    WHERE ${whereClause}
    LIMIT ${MAX_SAMPLE_VALUES}
  `).all().map((row) => `rowid=${row.rowId}`);
}

// 단일 JSON 파일 또는 디렉터리 하위의 JSON 파일 목록을 만듦
function listJsonFiles(sourcePath) {
  const stat = fs.statSync(sourcePath);
  if (stat.isFile()) return /\.json$/i.test(sourcePath) ? [sourcePath] : [];
  return fs.readdirSync(sourcePath, { recursive: true })
    .map((entry) => path.join(sourcePath, entry))
    .filter((entry) => /\.json$/i.test(entry) && fs.statSync(entry).isFile());
}

// API 응답의 rows/items/data 등 다양한 중첩 구조에서 가장 적합한 레코드 배열을 추출
function extractJsonRecords(value) {
  if (Array.isArray(value) && value.some((item) => item && typeof item === 'object' && !Array.isArray(item))) return value;
  if (!value || typeof value !== 'object') return [];
  const preferredKeys = ['rows', 'row', 'items', 'item', 'data', 'results', 'result', 'body'];
  for (const key of preferredKeys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const records = extractJsonRecords(value[key]);
      if (records.length) return records;
    }
  }
  let largest = [];
  for (const child of Object.values(value)) {
    const records = extractJsonRecords(child);
    if (records.length > largest.length) largest = records;
  }
  return largest;
}

// JSON 셀 값을 SQLite TEXT 삽입용 값으로 변환하고, 객체·배열은 JSON 문자열로 보존
function jsonCellValue(value) {
  if (value === null || value === undefined) return null;
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

// JSON 파일들을 메모리 SQLite 테이블로 적재한 뒤 DB 점검 로직을 그대로 재사용
function validateJsonSource(sourcePath) {
  const files = listJsonFiles(sourcePath);
  if (!files.length) throw new Error(`No JSON files found: ${sourcePath}`);
  const db = new Database(':memory:');
  try {
    let tableNumber = 0;
    for (const file of files) {
      let payload;
      try {
        payload = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch (error) {
        throw new Error(`Invalid JSON file (${file}): ${error.message}`);
      }
      const records = extractJsonRecords(payload).filter((item) => item && typeof item === 'object' && !Array.isArray(item));
      if (!records.length) continue;
      const columns = [...new Set(records.flatMap((record) => Object.keys(record)))];
      if (!columns.length) continue;
      const baseName = path.basename(file, path.extname(file)).replace(/[^A-Za-z0-9_\uAC00-\uD7A3]/g, '_') || 'json';
      const table = `${baseName}_${++tableNumber}`;
      db.exec(`CREATE TABLE ${quoteIdentifier(table)} (${columns.map((column) => `${quoteIdentifier(column)} TEXT`).join(', ')})`);
      const insert = db.prepare(`INSERT INTO ${quoteIdentifier(table)} (${columns.map(quoteIdentifier).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`);
      const insertMany = db.transaction((items) => items.forEach((record) => insert.run(...columns.map((column) => jsonCellValue(record[column])))));
      insertMany(records);
    }
    return validateDatabase(sourcePath, { db, source: `JSON: ${path.resolve(sourcePath)}` });
  } finally {
    db.close();
  }
}

// 데이터 품질 점검의 메인 함수
// 테이블·컬럼별 기본 품질, 타입, 의미 규칙, 날짜 논리, 표기 통일을 종합해 JSON 보고서 객체를 반환
// options.db가 전달되면 외부 연결을 재사용하고, 그렇지 않으면 지정 DB를 읽기 전용으로 열음
function validateDatabase(dbPath = DEFAULT_DB, options = {}) {
  const ownsDatabase = !options.db;
  const db = options.db || new Database(dbPath, { readonly: true });
  const issues = [];
  const columnsByNormalisedName = new Map();
  const columnsByLogicalName = new Map();
  const columnsByTable = new Map();
  const primaryKeyCandidateFields = options.primaryKeyCandidateFields
    || loadPrimaryKeyCandidateFields(options.keyCandidatesPath || DEFAULT_KEY_CANDIDATES);
  const logicalTableNames = options.logicalTableNames
    || loadLogicalTableNames(options.keyCandidatesPath || DEFAULT_KEY_CANDIDATES);
  const logicalColumnNames = options.logicalColumnNames
    || loadLogicalColumnNames(options.keyCandidatesPath || DEFAULT_KEY_CANDIDATES);

  try {
    for (const table of listTables(db)) {
      const rowCount = db.prepare(`SELECT COUNT(*) AS count FROM ${quoteIdentifier(table)}`).get().count;
      const columns = db.prepare(`PRAGMA table_info(${quoteIdentifier(table)})`).all();
      columnsByTable.set(table, columns);

      for (const column of columns) {
        const name = column.name;
        const qColumn = quoteIdentifier(name);
        const kind = columnKind(name, column.type);
        const normalised = normaliseColumnName(name);
        const configuredLogicalName = logicalColumnNames.get(table)?.get(name);
        const logicalColumn = configuredLogicalName || name;
        const reference = {
          table, column: name, type: column.type || '', rowCount, logicalColumn,
          hasLogicalColumnName: Boolean(configuredLogicalName && configuredLogicalName !== name)
        };
        const primaryKeyCandidate = isPrimaryKeyCandidate(column, primaryKeyCandidateFields.get(table));
        if (!columnsByNormalisedName.has(normalised)) columnsByNormalisedName.set(normalised, []);
        columnsByNormalisedName.get(normalised).push(reference);
        const logicalNormalised = normaliseColumnName(logicalColumn);
        if (!columnsByLogicalName.has(logicalNormalised)) columnsByLogicalName.set(logicalNormalised, []);
        columnsByLogicalName.get(logicalNormalised).push(reference);

        if (name !== name.trim() || /\s{2,}/.test(name)) {
          addIssue(issues, { table, column: name, category: '컬럼명 표기', rule: '공백 표준화',
            message: `컬럼명 '${name}'에 앞뒤 또는 중복 공백이 있습니다.`, recommendation: name.trim().replace(/\s+/g, ' ') });
        }

        const stats = db.prepare(`
          SELECT
            SUM(CASE WHEN ${qColumn} IS NULL THEN 1 ELSE 0 END) AS nullCount,
            SUM(CASE WHEN ${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) = '' THEN 1 ELSE 0 END) AS blankCount,
            SUM(CASE WHEN ${qColumn} IS NOT NULL AND CAST(${qColumn} AS TEXT) <> TRIM(CAST(${qColumn} AS TEXT)) THEN 1 ELSE 0 END) AS paddedCount,
            COUNT(DISTINCT ${qColumn}) AS distinctCount
          FROM ${quoteIdentifier(table)}
        `).get();

        if (primaryKeyCandidate && stats.nullCount > 0) addIssue(issues, { table, column: name, category: '키 후보 품질', rule: 'PK 후보 NULL 값',
          message: `NULL 값 ${stats.nullCount}건`, count: stats.nullCount, samples: sampleRowIds(db, table, `${qColumn} IS NULL`),
          recommendation: 'PK 후보 컬럼은 NULL을 허용하지 않도록 데이터와 키 정의를 확인하세요.' });
        if (stats.blankCount > 0) addIssue(issues, { table, column: name, category: '값 품질', rule: '빈 문자열',
          message: `빈 문자열 ${stats.blankCount}건`, count: stats.blankCount, samples: sampleRowIds(db, table, `${qColumn} IS NOT NULL AND TRIM(CAST(${qColumn} AS TEXT)) = ''`),
          recommendation: 'NULL 또는 유효값 중 하나로 표준화하세요.' });
        if (stats.paddedCount > 0) addIssue(issues, { table, column: name, category: '값 품질', rule: '값 앞뒤 공백',
          message: `앞뒤 공백 값 ${stats.paddedCount}건`, count: stats.paddedCount,
          samples: sampleValues(db, table, name, `${qColumn} IS NOT NULL AND CAST(${qColumn} AS TEXT) <> TRIM(CAST(${qColumn} AS TEXT))`), recommendation: '저장 전 trim 처리 후 기존 데이터를 정제하세요.' });
        /* if (kind === 'date') {
          const invalid = db.prepare(`SELECT COUNT(*) AS count FROM ${quoteIdentifier(table)} WHERE ${nonBlank} AND date(REPLACE(TRIM(CAST(${qColumn} AS TEXT)), '.', '-')) IS NULL`).get().count;
          if (invalid) addIssue(issues, { table, column: name, category: '값 형식', rule: '날짜 형식', message: `해석 불가 날짜 ${invalid}건`, count: invalid,
            samples: sampleValues(db, table, name, `${nonBlank} AND date(REPLACE(TRIM(CAST(${qColumn} AS TEXT)), '.', '-')) IS NULL`), recommendation: 'YYYY-MM-DD 형식으로 통일하세요.' });
        }
        if (kind === 'number') {
          const invalid = db.prepare(`SELECT COUNT(*) AS count FROM ${quoteIdentifier(table)} WHERE ${nonBlank} AND TRIM(CAST(${qColumn} AS TEXT)) NOT GLOB '-[0-9]*' AND TRIM(CAST(${qColumn} AS TEXT)) NOT GLOB '[0-9]*'`).get().count;
          if (invalid) addIssue(issues, { table, column: name, category: '값 형식', rule: '숫자 형식', message: `숫자가 아닌 값 ${invalid}건`, count: invalid,
            samples: sampleValues(db, table, name, `${nonBlank} AND TRIM(CAST(${qColumn} AS TEXT)) NOT GLOB '-[0-9]*' AND TRIM(CAST(${qColumn} AS TEXT)) NOT GLOB '[0-9]*'`), recommendation: '숫자형 컬럼으로 변환하거나 예외값을 정제하세요.' });
        }
        } */
        if (kind === 'date' || kind === 'number') {
          const mismatch = findTypeMismatches(db, table, name, kind);
          if (mismatch.count) {
            const isDate = kind === 'date';
            addIssue(issues, {
              table, column: name, category: '\uB370\uC774\uD130 \uD0C0\uC785',
              rule: isDate ? '\uB0A0\uC9DC \uD0C0\uC785 \uBD88\uC77C\uCE58' : '\uC22B\uC790 \uD0C0\uC785 \uBD88\uC77C\uCE58',
              message: isDate
                ? `\uB0A0\uC9DC \uCEEC\uB7FC\uC5D0 \uD30C\uC2F1\uD560 \uC218 \uC5C6\uB294 \uAC12\uC774 ${mismatch.count}\uAC74 \uC788\uC2B5\uB2C8\uB2E4.`
                : `\uC22B\uC790 \uCEEC\uB7FC\uC5D0 \uC22B\uC790\uB85C \uC778\uC2DD\uB418\uC9C0 \uC54A\uB294 \uAC12\uC774 ${mismatch.count}\uAC74 \uC788\uC2B5\uB2C8\uB2E4.`,
              count: mismatch.count, samples: mismatch.samples,
              recommendation: isDate
                ? 'YYYY.MM.DD \uD615\uC2DD\uC758 \uC2E4\uC81C \uB0A0\uC9DC\uB85C \uC815\uC81C\uD558\uC138\uC694.'
                : '\uC22B\uC790\uB85C \uBCC0\uD658\uD558\uAC70\uB098 \uB2E8\uC704\u00B7\uBB38\uC790 \uB4F1 \uC608\uC678 \uAC12\uC744 \uBD84\uB9AC\uD558\uC138\uC694.'
            });
          }
        }
        if (kind === 'date') {
          const formatIssue = findDateFormatInconsistency(db, table, name);
          if (formatIssue) addIssue(issues, formatIssue);
        }
        for (const semanticIssue of findSemanticIssues(db, table, name, columnMonitoringRules(name, column.type))) {
          addIssue(issues, semanticIssue);
        }
        if (kind === 'code' && rowCount >= 20 && stats.distinctCount > Math.max(20, rowCount * 0.8)) {
          addIssue(issues, { severity: 'info', table, column: name, category: '코드값 점검', rule: '코드값 다양성',
            message: `코드성 컬럼의 고유값이 ${stats.distinctCount}개입니다.`, count: stats.distinctCount, recommendation: '실제 코드 컬럼인지, 코드 마스터가 있는지 확인하세요.' });
        }
      }
    }

    for (const [table, columns] of columnsByTable) {
      for (const issue of findDateOrderIssues(db, table, columns)) addIssue(issues, issue);
    }

    for (const matches of columnsByNormalisedName.values()) {
      const distinctNames = [...new Set(matches.map((item) => item.column))];
      if (distinctNames.length > 1) {
        const standardName = recommendedColumnName(matches);
        addIssue(issues, { severity: 'info', table: matches.map((item) => item.table).join(', '), column: distinctNames.join(' / '),
          category: '컬럼명 표준화', rule: '동일 정규화명', message: `공백·밑줄·대소문자를 제거하면 같은 컬럼명입니다: ${distinctNames.join(', ')}`,
          recommendation: `표준 컬럼명 후보: ${standardName}`, relatedColumns: matches,
          standardisation: true,
          standardName, acceptedStandardNames: acceptedStandardNames(matches, standardName),
          standardisationReason: '물리 컬럼명에서 공백·밑줄·대소문자를 제거하면 동일합니다. CD, NM, DT, YN, NO 접미사는 밑줄로 분리하는 규칙을 우선 적용하되, TELNO·BRCD_NO·PRDT_NM·SITE_ADDR처럼 업무 약어로 굳어진 표기는 유지했습니다.' });
      }
    }

    for (const matches of columnsByLogicalName.values()) {
      const distinctNames = [...new Set(matches.map((item) => item.column))];
      const distinctLogicalNames = [...new Set(matches.map((item) => item.logicalColumn))];
      if (distinctNames.length > 1 && matches.some((item) => item.hasLogicalColumnName)) {
        const standardName = recommendedColumnName(matches);
        addIssue(issues, {
          severity: 'info', table: matches.map((item) => item.table).join(', '), column: distinctNames.join(' / '),
          category: '컬럼명 설명 표준화', rule: '동일 논리형 컬럼명',
          message: `논리형 컬럼명에서 공백·밑줄·대소문자를 제거하면 같은 이름입니다: ${distinctLogicalNames.join(', ')}`,
          recommendation: `표준 컬럼명 후보: ${standardName}`, relatedColumns: matches,
          standardisation: true, standardName, acceptedStandardNames: acceptedStandardNames(matches, standardName),
          logicalColumn: distinctLogicalNames.join(' / '),
          standardisationReason: '논리형 컬럼명(kor_nm)에서 공백·밑줄·대소문자를 제거하면 동일합니다. 물리 컬럼명은 CD, NM, DT, YN, NO 접미사 분리 규칙을 우선하되, TELNO·BRCD_NO·PRDT_NM·SITE_ADDR처럼 업무 약어로 굳어진 표기는 유지했습니다.'
        });
      }
    }

    for (const { first, second, score, relatedColumns } of findColumnTypoCandidates(columnsByNormalisedName)) {
      addIssue(issues, {
        severity: 'info', table: `${first.table}, ${second.table}`, column: `${first.column} / ${second.column}`,
        category: '\uCEEC\uB7FC\uBA85 \uC124\uBA85 \uD45C\uC900\uD654', rule: '\uC601\uBB38 \uBB3C\uB9AC \uCEEC\uB7FC\uBA85 \uC624\uD0C8\uC790 \uD6C4\uBCF4',
        message: `\uC601\uBB38 \uBB3C\uB9AC \uCEEC\uB7FC\uBA85\uC758 \uC720\uC0AC\uB3C4\uAC00 ${(score * 100).toFixed(1)}%\uC785\uB2C8\uB2E4. \uB3D9\uC77C \uC5C5\uBB34 \uC758\uBBF8\uC778\uC9C0 \uD655\uC778\uD558\uC138\uC694.`,
        recommendation: '\uB3C4\uBA54\uC778 \uC758\uBBF8\uB97C \uD655\uC778\uD55C \uD6C4 \uD45C\uC900 \uCEEC\uB7FC\uBA85\uC744 \uC815\uD558\uC138\uC694.',
        relatedColumns, standardisation: true, standardName: '\uAC80\uD1A0 \uD6C4 \uACB0\uC815',
        standardisationReason: '\uC601\uBB38 \uBB3C\uB9AC \uCEEC\uB7FC\uBA85\uC758 \uC720\uC0AC\uB3C4\uAC00 \uB192\uC740 \uC624\uD0C8\uC790 \uD6C4\uBCF4\uC785\uB2C8\uB2E4. \uC5C5\uBB34 \uC758\uBBF8\uAC00 \uAC19\uC740\uC9C0 \uD655\uC778\uD55C \uD6C4 \uD45C\uC900\uBA85\uC744 \uC815\uD558\uC138\uC694.'
      });
    }

    for (const { first, second, score, relatedColumns } of findLogicalColumnTypoCandidates(columnsByLogicalName)) {
      addIssue(issues, {
        severity: 'info', table: `${first.table}, ${second.table}`,
        column: `${first.column} / ${second.column}`,
        logicalColumn: `${first.logicalColumn} / ${second.logicalColumn}`,
        category: '\uCEEC\uB7FC\uBA85 \uC124\uBA85 \uD45C\uC900\uD654', rule: '\uD55C\uAE00 \uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85 \uC624\uD0C8\uC790 \uD6C4\uBCF4',
        message: `\uD55C\uAE00 \uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85\uC758 \uC790\uBAA8 \uAE30\uC900 \uC720\uC0AC\uB3C4\uAC00 ${(score * 100).toFixed(1)}%\uC785\uB2C8\uB2E4. \uB3D9\uC77C \uC5C5\uBB34 \uC758\uBBF8\uC778\uC9C0 \uD655\uC778\uD558\uC138\uC694.`,
        recommendation: '\uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85 \uC0AC\uC804\uC744 \uD655\uC778\uD55C \uD6C4 \uD45C\uC900\uBA85\uC744 \uC815\uD558\uC138\uC694.',
        relatedColumns, standardisation: true, standardName: '\uAC80\uD1A0 \uD6C4 \uACB0\uC815',
        standardisationReason: '\uD55C\uAE00 \uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85(kor_nm)\uC758 \uC790\uBAA8 \uAE30\uC900 \uC720\uC0AC\uB3C4\uAC00 \uB192\uC740 \uC624\uD0C8\uC790 \uD6C4\uBCF4\uC785\uB2C8\uB2E4. \uC5C5\uBB34 \uC758\uBBF8\uAC00 \uAC19\uC740\uC9C0 \uD655\uC778\uD55C \uD6C4 \uD45C\uC900\uBA85\uC744 \uC815\uD558\uC138\uC694.'
      });
    }
  } finally {
    if (ownsDatabase) db.close();
  }

  issues.forEach((issue) => {
    issue.logicalTable = logicalTableName(issue.table, logicalTableNames);
    issue.logicalColumn = issue.logicalColumn || logicalColumnName(issue.table, issue.column, logicalColumnNames);
    issue.sqlQuery = issueSqlQuery(issue);
  });
  return { generatedAt: new Date().toISOString(), source: options.source || path.resolve(dbPath), summary: { issueCount: issues.length }, issues };
}

// Excel 보고서의 공통 헤더 서식(색상·굵기·정렬·줄바꿈)을 적용
function styleHeader(row) {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
  row.alignment = { vertical: 'center', horizontal: 'center', wrapText: true };
}

// JSON 점검 결과를 요약, 점검 상세, 컬럼명 표준화 시트가 포함된 한글 Excel 보고서로 작성
// 상세 시트에는 서비스명·논리 컬럼명·재확인 SQL을, 표준화 시트에는 비표준 행 강조 표시를 포함
async function exportExcelReport(report, outputPath = DEFAULT_XLSX_OUTPUT) {
  const workbook = new ExcelJS.Workbook();
  const logicalColumnNames = loadLogicalColumnNames();
  workbook.creator = 'Food Safety Data Quality Validator';
  workbook.created = new Date();

  const summary = workbook.addWorksheet('요약');
  summary.columns = [{ width: 24 }, { width: 18 }, { width: 70 }];
  summary.addRow(['데이터품질점검']);
  summary.getCell('A1').font = { bold: true, size: 16, color: { argb: 'FF1F4E78' } };
  summary.mergeCells('A1:C1');
  summary.addRow(['생성 일시', report.generatedAt]);
  summary.addRow(['대상 DB', report.source]);
  summary.addRow(['전체 점검 이슈', report.summary.issueCount]);
  summary.addRow([]);
  summary.addRow(['점검 규칙', '이슈 수', '설명']);
  styleHeader(summary.getRow(6));
  const descriptions = {
    'PK 후보 NULL 값': 'analyze_pk_fk 결과의 최상위 PK 후보에서 NULL이 발견된 경우', '빈 문자열': 'NULL이 아닌 빈 값이 있는 컬럼',
    '값 앞뒤 공백': '값 앞 또는 뒤에 공백이 포함된 컬럼', '날짜 형식': '날짜로 해석할 수 없는 값',
    '숫자 형식': '숫자 컬럼으로 추정되나 문자 등이 포함된 값', '코드값 다양성': '코드성 컬럼의 값 종류가 과도하게 많은 경우',
    '동일 정규화명': '공백·밑줄·대소문자를 제외하면 같은 컬럼명', '공백 표준화': '컬럼명 내 불필요한 공백'
  };
  descriptions['\uB0A0\uC9DC \uD0C0\uC785 \uBD88\uC77C\uCE58'] = '\uB0A0\uC9DC \uC131\uACA9\uC758 \uCEEC\uB7FC\uC5D0 \uD30C\uC2F1\uD560 \uC218 \uC5C6\uB294 \uAC12\uC774 \uC788\uB294 \uACBD\uC6B0';
  descriptions['\uB0A0\uC9DC \uD45C\uAE30 \uD615\uC2DD \uD63C\uC7AC'] = '\uC720\uD6A8\uD55C \uB0A0\uC9DC\uC9C0\uB9CC \uAD6C\uBD84\uC790 \uB610\uB294 \uC790\uB9AC\uC218 \uD45C\uAE30\uAC00 \uC11E\uC5EC \uC788\uB294 \uACBD\uC6B0';
  descriptions['\uC22B\uC790 \uD0C0\uC785 \uBD88\uC77C\uCE58'] = '\uC22B\uC790 \uC131\uACA9\uC758 \uCEEC\uB7FC\uC5D0 \uC22B\uC790\uB85C \uC778\uC2DD\uB418\uC9C0 \uC54A\uB294 \uAC12\uC774 \uC788\uB294 \uACBD\uC6B0';
  const counts = report.issues.reduce((acc, issue) => { acc[issue.rule] = (acc[issue.rule] || 0) + 1; return acc; }, {});
  for (const [rule, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) summary.addRow([rule, count, descriptions[rule] || '점검 결과']);
  summary.views = [{ state: 'frozen', ySplit: 6 }];

  const details = workbook.addWorksheet('점검 상세');
  details.columns = [
    { header: 'No.', key: 'no', width: 8 }, { header: '심각도', key: 'severity', width: 12 },
    { header: '분류', key: 'category', width: 16 }, { header: '점검 규칙', key: 'rule', width: 18 },
    { header: '테이블명', key: 'table', width: 28 }, { header: '컬럼명', key: 'column', width: 28 },
    { header: '발견 건수', key: 'count', width: 13 }, { header: '발견 내용', key: 'message', width: 35 },
    { header: '샘플 데이터 (최대 10건)', key: 'samples', width: 42 }, { header: '권고 조치', key: 'recommendation', width: 42 }
  ];
  const detailColumns = details.columns.map(({ header, key, width }) => ({ header, key, width }));
  detailColumns[4].header = '\uC11C\uBE44\uC2A4 \uBC88\uD638';
  detailColumns.splice(5, 0, { header: '\uC11C\uBE44\uC2A4\uBA85', key: 'logicalTable', width: 30 });
  detailColumns.splice(7, 0, { header: '\uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85', key: 'logicalColumn', width: 30 });
  detailColumns.splice(11, 0, { header: '\uC810\uAC80 SQL', key: 'sqlQuery', width: 80 });
  details.columns = detailColumns;
  styleHeader(details.getRow(1));
  report.issues.forEach((issue, index) => details.addRow({
    no: index + 1, severity: issue.severity === 'warning' ? '확인 필요' : '참고', category: issue.category, rule: issue.rule,
    table: issue.table, logicalTable: issue.logicalTable, column: issue.column, logicalColumn: issue.logicalColumn, count: issue.count ?? '', message: issue.message,
    samples: issue.samples?.join('\n') || '-', sqlQuery: issue.sqlQuery, recommendation: issue.recommendation
  }));
  details.autoFilter = 'A1:M1';
  details.views = [{ state: 'frozen', ySplit: 1 }];
  details.eachRow((row, index) => {
    row.alignment = { vertical: 'top', wrapText: true };
    if (index > 1 && row.getCell('B').value === '확인 필요') row.getCell('B').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };
  });

  const standardisation = workbook.addWorksheet('컬럼명 설명 표준화');
  standardisation.columns = [
    { header: '그룹 No.', key: 'groupNo', width: 11 }, { header: '테이블명', key: 'table', width: 18 },
    { header: '현재 컬럼명', key: 'column', width: 25 }, { header: '동일 의미 표기 전체', key: 'variants', width: 38 },
    { header: '권고 표준명', key: 'recommendation', width: 24 }, { header: '판단 근거', key: 'message', width: 55 }
  ];
  const standardisationColumns = standardisation.columns.map(({ header, key, width }) => ({ header, key, width }));
  standardisationColumns[1].header = '\uC11C\uBE44\uC2A4 \uBC88\uD638';
  standardisationColumns.splice(2, 0, { header: '\uC11C\uBE44\uC2A4\uBA85', key: 'logicalTable', width: 26 });
  standardisationColumns.splice(4, 0, { header: '\uB17C\uB9AC\uD615 \uCEEC\uB7FC\uBA85', key: 'logicalColumn', width: 26 });
  standardisation.columns = standardisationColumns;
  styleHeader(standardisation.getRow(1));
  const standardisationReasonRefs = new Map();
  const reasonReference = (reason) => {
    const reasonText = String(reason || '').trim();
    if (!reasonText) return '';
    if (!standardisationReasonRefs.has(reasonText)) {
      standardisationReasonRefs.set(reasonText, `참고 ${standardisationReasonRefs.size + 1}`);
    }
    return standardisationReasonRefs.get(reasonText);
  };
  report.issues.filter((issue) => issue.standardisation).forEach((issue, groupIndex) => {
    const variants = issue.column;
    const standardName = issue.standardName || issue.recommendation.replace('표준 컬럼명 후보: ', '');
    const acceptedNames = issue.acceptedStandardNames?.length ? issue.acceptedStandardNames : [standardName];
    const reasonRef = reasonReference(issue.standardisationReason);
    (issue.relatedColumns || []).forEach((item) => {
      const row = standardisation.addRow({
        groupNo: groupIndex + 1, table: item.table, logicalTable: logicalTableName(item.table, loadLogicalTableNames()), column: item.column, logicalColumn: logicalColumnName(item.table, item.column, logicalColumnNames), variants,
        recommendation: acceptedNames.join(' / '), message: reasonRef
      });
      if (!acceptedNames.includes(item.column)) {
        for (let column = 1; column <= 8; column += 1) {
          row.getCell(column).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE699' } };
        }
        row.getCell(4).font = { bold: true, color: { argb: 'FF9C5700' } };
      }
    });
  });
  const standardisationTableLastRow = standardisation.rowCount;
  standardisation.autoFilter = `A1:H${standardisationTableLastRow}`;
  if (standardisationReasonRefs.size) {
    const noteTitleRowNumber = standardisationTableLastRow + 2;
    standardisation.mergeCells(`A${noteTitleRowNumber}:H${noteTitleRowNumber}`);
    const noteTitleRow = standardisation.getRow(noteTitleRowNumber);
    noteTitleRow.getCell(1).value = '판단 근거 참고';
    noteTitleRow.getCell(1).font = { bold: true, color: { argb: 'FF1F4E78' } };
    noteTitleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9EAF7' } };

    const noteHeaderRow = standardisation.getRow(noteTitleRowNumber + 1);
    noteHeaderRow.getCell(1).value = '참조';
    noteHeaderRow.getCell(2).value = '설명';
    styleHeader(noteHeaderRow);

    let noteRowNumber = noteTitleRowNumber + 2;
    for (const [reasonText, ref] of standardisationReasonRefs.entries()) {
      standardisation.mergeCells(`B${noteRowNumber}:H${noteRowNumber}`);
      const noteRow = standardisation.getRow(noteRowNumber);
      noteRow.getCell(1).value = ref;
      noteRow.getCell(2).value = reasonText;
      noteRow.getCell(1).alignment = { vertical: 'top', horizontal: 'center' };
      noteRow.getCell(2).alignment = { vertical: 'top', wrapText: true };
      noteRowNumber += 1;
    }
  }
  standardisation.views = [{ state: 'frozen', ySplit: 1 }];
  standardisation.eachRow((row, index) => {
    row.alignment = { vertical: 'top', wrapText: true };
  });

  await workbook.xlsx.writeFile(outputPath);
}

// =============================================================================
// 5. CLI 실행: JSON 보고서와 Excel 보고서를 함께 생성
// =============================================================================
if (require.main === module) {
  const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_DB;
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_OUTPUT;
  if (!process.argv[2] && !fs.existsSync(sourcePath)) {
    throw new Error(`Default DB file does not exist: ${sourcePath}`);
  }
  const report = fs.existsSync(sourcePath) && (fs.statSync(sourcePath).isDirectory() || /\.json$/i.test(sourcePath))
    ? validateJsonSource(sourcePath)
    : validateDatabase(sourcePath);
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  const xlsxPath = process.argv[3] ? outputPath.replace(/\.json$/i, '.xlsx') : DEFAULT_XLSX_OUTPUT;
  exportExcelReport(report, xlsxPath)
    .then(() => console.log(`데이터 품질 점검 완료: ${report.summary.issueCount}건 → ${xlsxPath}`))
    .catch((error) => { console.error(error); process.exitCode = 1; });
}

// 다른 분석기·테스트에서 재사용할 수 있는 공개 함수 목록
module.exports = {
  validateDatabase,
  validateJsonSource,
  exportExcelReport,
  normaliseColumnName,
  loadPrimaryKeyCandidateFields,
  loadLogicalTableNames,
  logicalTableName,
  isPrimaryKeyCandidate,
  columnKind,
  columnMonitoringRules,
  isValidDateValue,
  canonicalDate,
  dateFormatSignature,
  findColumnTypoCandidates,
  findLogicalColumnTypoCandidates,
  levenshteinDistance,
  isValidNumberValue,
  findDateOrderIssues
};
