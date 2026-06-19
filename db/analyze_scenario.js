/**
 * 데이터셋 사용 시나리오 분석기
 * 파일명: analyze_scenario.js
 *
 * [수행 역할]
 * 1. crawler/samples/*.json 실제 샘플 데이터를 Arquero DataFrame으로 로드함
 * 2. 동일 키(exact match) + 유사 키(synonym) 기준으로 컬럼 간 값 겹침을 측정함
 * 3. 겹침 비율·건수를 기반으로 JOIN 유형(INNER/LEFT)과 카디널리티를 판단함
 * 4. 관련 데이터셋들을 묶어 비즈니스 시나리오 단위로 도출함
 * 5. 결과를 foodsafety_scenarios.json + foodsafety_scenarios.md로 저장함
 *
 * [주요 외부 라이브러리 및 역할]
 * - Arquero (aq) : JSON 샘플 데이터를 컬럼형 데이터프레임(DataFrame) 구조로 변환하여,
 *                  빠른 필터링(filter), 중복 제거(dedupe), 교집합 연산(Set intersection) 등
 *                  두 테이블 간 데이터 값 겹침(Overlap) 분석을 고속으로 수행함.
 *
 * [실행 방법]
 * node db/analyze_scenario.js
 * node db/analyze_scenario.js --samples ./crawler/samples --cache ./crawler/crawl_cache.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const aq = require('arquero');
const { UndirectedGraph } = require('graphology');
const louvain = require('graphology-communities-louvain');
const TfIdf = require('natural/lib/natural/tfidf/tfidf');
const Hangul = require('hangul-js');
const stringSimilarity = require('string-similarity');
const logger = require('../utils/logger');

const DEFAULT_SAMPLES = path.join(__dirname, '../crawler/samples');
const DEFAULT_CACHE   = path.join(__dirname, '../crawler/crawl_cache.json');
const DEFAULT_JSON    = path.join(__dirname, 'foodsafety_scenarios.json');
const DEFAULT_MD      = path.join(__dirname, 'foodsafety_scenarios.md');
const DEFAULT_XLSX    = path.join(__dirname, '../식품안전나라_API_분석결과.xlsx');
const DEFAULT_PKFK    = path.join(__dirname, 'foodsafety_key_candidates.json');

// =============================================================================
// 1. 유틸 및 상수
// =============================================================================
const CONFIG = {
    // 두 컬럼의 고유값이 최소 이 비율 이상 겹칠 때 관계 후보로 봄
    MIN_OVERLAP_RATIO: 0.05,
    // 하나의 시나리오로 묶기 위해 필요한 최소 데이터셋 수
    MIN_DATASETS_PER_SCENARIO: 2,
    // 생성 SQL 예시에 포함할 최대 테이블 수
    MAX_SQL_TABLES: 5,
    // 최종 출력할 상위 시나리오 개수
    TOP_SCENARIOS: 50,
    // 관계 후보 목록에서 유지할 상위 관계 개수
    TOP_RELATIONS: 100,
    // 동일한 테이블 쌍에서 유지할 최대 관계 후보 수
    MAX_CANDIDATES_PER_PAIR: 3,
    // 컬럼명이 이 유사도 이상이면 같은 의미의 키 후보로 봄
    SIMILAR_KEY_THRESHOLD: 0.84,
    COMPOSITE_JOIN_RULES: [
        {
            keys: ['PRDLST_CD', 'TESTITM_CD'],
            minMatched: 3,
            minOverlapRatio: 0.05
        }
    ],
    // PK 판별 시 요구되는 고유도 및 최소 데이터 건수
    // 완전 유일성 대신 노이즈를 일부 허용해 시나리오 탐색용 후보를 넓게 잡음
    PK_DISTINCT_RATE: 0.90,
    PK_MIN_ROW_COUNT: 10,
    // 테마 키워드 추출에서 제외할 범용/식별자/주소성 키워드
    // 너무 흔하거나 조인 키에 가까운 단어가 시나리오 주제를 오염시키는 것을 막기 위해 제거함
    THEME_KEYWORD_STOPWORDS: new Set([
        'addr', 'address', 'telno', 'tel_no', 'phone', 'fax', 'zipno', 'kg', 'lv', 'yn',
        'dt', 'ymd', 'date', 'gubun', 'production', 'dispos', 'prsdnt_nm', 'bssh_nm',
        'lcns_no', 'prms_dt', 'prdlst_report_no', 'prdlst_cd', 'work_scope', 'workscope'
    ])
};

// 명칭·주소·날짜·연락처 계열 — JOIN 키로 의미 없는 설명성 필드
// 특히 _DCNM(품목유형명)은 카테고리성 데이터로, 조인 시 엄청난 카테시안 곱을 유발하므로 조인 키에서 영구 배제함
const WEAK_PATTERNS = {
    // 1. 단계/출처/일반 설명성 컬럼
    GENERAL: ['^STEP$', '^OPERTN_CITYPOINT$', 'ADDR$', 'ADDRESS$', '_DESC$', '_MEMO$', '_PRVNS$', '_MTHD$', '_CONT$', '_CONTENT$', '^SORC$', '^SOURCE$', 'USAGE$', 'DISPOS$', 'AREA$', '^YEAR$'],
    // 2. 명칭(이름) 계열
    NAME: ['_NM$', 'NM$', '_DCNM$', 'DCNM$', '_NAME$', 'NAME$', '_CD_NM$', '_KOR$', 'KOR$', '_ENG$', 'ENG$'],
    // 3. 날짜/시간 기한 계열
    DATE: ['DT$', '_YMD$', 'DTM$', 'DATE$', '_LMT$', 'LMT$', '_MM$', '_YEAR$', '_YR$', '_DAYCNT$'],
    // 4. 수치/단위/통계 계열
    MEASURE: ['FRMLCUNIT$', 'FRMLC_UNIT$', '_SUMUP$', 'SPECVALSUMUP$', '_QY$', '_VAL$', 'PRODUCTION$', '_CNT$', '_COUNT$', '_AMT$', '_AMOUNT$', '_QTY$', '_WGHT$', '_RATE$', '_RATIO$', '_PCT$', '_TOT$', '_SUM$', '_AVG$', '_MAX$', '_MIN$', '_MANLI$', 'MANLI$', '_OPNO$', 'OPNO$', 'ORDNO$', '_ORDNO$'],
    // 5. 연락처 계열
    CONTACT: ['TELNO$', 'TEL_NO$', '_TELNO$', 'PHONE$', 'MOBILE$', 'FAX$'],
    // 6. 상태/결과/여부 계열 (Enum 성격)
    STATUS: ['_YN$', '_RSLT$', 'RSLT$', '_FIT$', 'FIT$', '_IMPROPT$', 'IMPROPT$', '^LV$', 'LV_NO$'],
    // 7. 카테고리 Enum 코드 계열
    ENUM_CD: ['_DVS_CD$', '^DVS_CD$', '^DVSCD$', '_DVS$', '_FOM_CD$', '^FOM_CD$', '^FOMCD$', '_FOM$', '_UNIT_CD$', '^UNIT_CD$', '^UNITCD$', '^UNIT$', '^WORK_SCOPE$', '^WORKSCOPE$', '_STTUS_CD$', '^STTUSCD$', '_STAT_CD$', '^STATCD$', '_SE_CD$', '^SECD$', '_KND_CD$', '^KNDCD$', '_TY_CD$', '^TYCD$'],
    // 8. 수질 및 특정 오염 지표
    WATER_METRICS: ['^BOD$', '^COD$', '^SS$', '^PH$', '^TN$', '^TP$', '^DOC$', '^EC$', '^TOC$', '^TEMOD$', '^EEC_QTY$', '^ORGNICPH$', '^PCE$', '^PHNL$'],
    // 9. 행정처분 등 특정 업무 필드
    ADMIN: ['^DSPSCN$', '^VILTCN$', '^VILTDTLS$', '_DTLS$', '_CN$', '_FNCLTY$', '_STND$', '_MTRQLT$']
};

const WEAK_KEY_PATTERN = new RegExp(
    Object.values(WEAK_PATTERNS).flat().join('|'), 'i'
);

const KEY_SYNONYM_GROUPS = [
    ['LCNS_NO', 'BSSH_NO', 'BSN_LCNS_NO', 'LICENSE_NO', 'LICENCE_NO', 'PERM_NO'],
    ['PRDLST_REPORT_NO', 'PRDLST_RPT_NO', 'ITEM_REPORT_NO', 'PRMS_REPORT_NO', 'MNF_REPORT_NO'],
    ['PRDLST_CD', 'PRDLST_CODE', 'ITEM_CD', 'ITEM_CODE', 'FOOD_CD', 'FOOD_CODE'],
    ['TESTITM_CD', 'TEST_ITEM_CD', 'EXAM_ITEM_CD', 'ITM_CD'],
    ['RAWMTRL_CD', 'RAW_MTRL_CD', 'MATERIAL_CD', 'INGR_CD'],
    ['BRCD_NO', 'BARCODE_NO', 'BRCDNO', 'BAR_CD', 'PDT_BARCD', 'GTIN'],
    ['ENTRPS_NO', 'BIZ_NO', 'COMPANY_NO', 'CORP_NO'],
    ['INDUTY_CD', 'BIZ_TYPE_CD', 'UPSO_KIND_CD']
];

// 비즈니스적으로 조인하면 안 되는 테이블 블랙리스트 (도메인 분리)
const FORBIDDEN_JOIN_PAIRS = [
    // 농약 기준(I1040)과 동물의약품 기준(I1080)은 서로 조인하지 않음 (카테시안 곱 방지)
    ['I1040', 'I1080']
];

// 조인 키 후보로서 의미 있는 컬럼명 패턴
const KEYLIKE_PATTERN = /(NO|CD|CODE|ID|KEY|SEQ|SN|NUM|NUMBER|REPORT|LCNS|BSSH|PRDLST|BRCD|BARCODE|TEST|ITEM|RAW|MTRL)/i;

function formatKstTimestamp(date = new Date()) {
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kst.toISOString().replace('Z', '+09:00');
}

// 커맨드라인 인수에서 --key value 형태의 옵션을 파싱하는 함수
function parseArgs() {
    const args = process.argv.slice(2);
    const opts = {
        samples: DEFAULT_SAMPLES,
        cache:   DEFAULT_CACHE,
        json:    DEFAULT_JSON,
        md:      DEFAULT_MD,
        xlsx:    DEFAULT_XLSX,
        pkfk:    DEFAULT_PKFK,
        noJson:  false,
        noMd:    false,
        noXlsx:  false,
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if ((arg === '-h' || arg === '--help')) {
            printHelp();
            process.exit(0);
        } else if (arg === '--no-json') {
            opts.noJson = true;
        } else if (arg === '--no-md') {
            opts.noMd = true;
        } else if (arg === '--no-xlsx') {
            opts.noXlsx = true;
        } else if (arg.startsWith('--') && args[i + 1]) {
            const key = arg.slice(2);
            if (!(key in opts)) {
                logger.warn({ arg }, '알 수 없는 인자 무시');
            } else {
                opts[key] = args[++i];
            }
        }
    }

    return opts;
}

// 도움말 출력 함수
function printHelp() {
    logger.info(`
데이터셋 사용 시나리오 분석기

Usage:
  node db/analyze_scenario.js [options]

Options:
  --samples <path>    샘플 JSON 폴더 경로     기본값: ${DEFAULT_SAMPLES}
  --cache   <path>    crawl_cache.json 경로   기본값: ${DEFAULT_CACHE}
  --json    <path>    JSON 결과 파일 경로     기본값: ${DEFAULT_JSON}
  --md      <path>    Markdown 결과 파일 경로 기본값: ${DEFAULT_MD}
  --pkfk    <path>    PK/FK 분석 JSON 경로     기본값: ${DEFAULT_PKFK}
  --no-json           JSON 결과 생성 생략
  --no-md             Markdown 결과 생성 생략
  --no-xlsx           Excel 시트 갱신 생략
  --xlsx    <path>    갱신할 xlsx 경로          기본값: ${DEFAULT_XLSX}
  -h, --help          도움말 출력

Examples:
  node db/analyze_scenario.js
  node db/analyze_scenario.js --samples ./crawler/samples --cache ./crawler/crawl_cache.json
  node db/analyze_scenario.js --no-md
`);
}

// 값 비교 전에 null, 공백, 하이픈, 문자열 null/undefined를 제거하기 위한 정규화 함수
function normalizeValue(value) {
    if (value == null) {
        return '';
    }

    const normalized = String(value).trim();

    if (!normalized) {
        return '';
    }

    if (normalized === '-') {
        return '';
    }

    if (normalized.toLowerCase() === 'null') {
        return '';
    }

    if (normalized.toLowerCase() === 'undefined') {
        return '';
    }

    return normalized;
}

// JSON 구조 안에서 실제 데이터 row 배열을 최대한 찾아내는 함수
// depth 인자로 재귀 깊이를 제한해 순환 참조나 과도한 중첩에 의한 스택 오버플로우를 방지한다.
function extractRowsFromSampleJson(json, depth = 0) {
    // 최상위가 배열이면 그대로 row 목록으로 사용
    if (Array.isArray(json)) {
        return json;
    }

    // 객체가 아니면 row로 사용할 수 없음
    if (!json || typeof json !== 'object') {
        return [];
    }

    // 식품안전나라, 공공데이터포털, XML 변환 JSON에서 자주 등장하는 구조 후보
    const candidates = [
        json?.response?.body?.items,
        json?.response?.body?.items?.item,
        json?.body?.items,
        json?.body?.items?.item,
        json?.items,
        json?.items?.item,
        json?.item,
        json?.row,
        json?.data,
        json?.list,
        json?.result
    ];

    // 후보 중 배열이 있으면 row 목록으로 사용 (배열만 허용, 단순 객체는 건너뜀)
    for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
            return candidate;
        }
    }

    // 재귀 깊이 초과 시 탐색 중단
    if (depth >= 5) {
        return [];
    }

    // 내부 깊은 곳에 배열이 숨어 있는 경우 재귀적으로 탐색
    for (const value of Object.values(json)) {
        const rows = extractRowsFromSampleJson(value, depth + 1);

        if (rows.length > 0) {
            return rows;
        }
    }

    return [];
}

// 언더스코어를 제거하고 대문자로 정규화한다.
// 이를 통해 언더스코어 위치 차이로 인한 유사 필드명 변형을 흡수한다.
function normalizeColName(col) {
    return String(col || '').replace(/_/g, '').toUpperCase();
}

function isWeakJoinColumn(col) {
    const raw = String(col || '');
    return WEAK_KEY_PATTERN.test(raw) || WEAK_KEY_PATTERN.test(normalizeColName(raw));
}

// KEY_SYNONYM_GROUPS의 정규화 결과를 미리 계산해 areSynonyms 호출마다 재생성하지 않는다.
const NORMALIZED_SYNONYM_GROUPS = KEY_SYNONYM_GROUPS.map(group => group.map(normalizeColName));

// 두 컬럼명이 같은 동의어 그룹에 속하는지 확인하는 함수
function areSynonyms(colA, colB) {
    if (isWeakJoinColumn(colA) || isWeakJoinColumn(colB)) {
        return false;
    }

    const normA = normalizeColName(colA);
    const normB = normalizeColName(colB);

    if (normA === normB) {
        return true;
    }

    for (const normGroup of NORMALIZED_SYNONYM_GROUPS) {
        if (normGroup.includes(normA) && normGroup.includes(normB)) {
            return true;
        }
    }

    if (isSimilarJoinKey(colA, colB)) {
        return true;
    }

    return false;
}

// 식별자 성격의 유사 컬럼명 매칭
function isSimilarJoinKey(colA, colB) {
    if (isWeakJoinColumn(colA) || isWeakJoinColumn(colB)) {
        return false;
    }

    if (!KEYLIKE_PATTERN.test(colA) || !KEYLIKE_PATTERN.test(colB)) {
        return false;
    }

    const normA = normalizeColName(colA);
    const normB = normalizeColName(colB);
    if (normA.length < 4 || normB.length < 4) {
        return false;
    }

    // 구조적 매칭 (접미사 제외 본문 비교)
    // 접미사를 잘라낸 기본 어간(body)이 일치하는지 확인
    const suffixRegex = /(NO|CD|CODE|ID|KEY|SEQ|SN|NUM)$/i;
    const bodyA = normA.replace(suffixRegex, '');
    const bodyB = normB.replace(suffixRegex, '');
    
    if (bodyA && bodyB && bodyA === bodyB) {
        return true;
    }

    const similarity = stringSimilarity.compareTwoStrings(normA, normB);
    return similarity >= CONFIG.SIMILAR_KEY_THRESHOLD;
}

// 두 컬럼명의 대표 키를 반환하는 함수
// 동의어 그룹에 속하면 그룹의 첫 번째 원소를 대표 키로 사용함
function canonicalKey(col) {
    const normCol = normalizeColName(col);

    for (let i = 0; i < NORMALIZED_SYNONYM_GROUPS.length; i++) {
        if (NORMALIZED_SYNONYM_GROUPS[i].includes(normCol)) {
            return KEY_SYNONYM_GROUPS[i][0];
        }
    }

    return normalizeColName(col);
}

function buildCompositeProfile(profiles, columns) {
    const columnProfiles = columns.map(col => profiles[col]);
    if (columnProfiles.some(profile => !profile || !Array.isArray(profile.values))) {
        return null;
    }

    const rowCount = Math.min(...columnProfiles.map(profile => profile.values.length));
    const valueSet = new Set();
    let nonEmptyCount = 0;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const values = columnProfiles.map(profile => profile.values[rowIndex]);
        if (values.some(value => !value)) {
            continue;
        }

        nonEmptyCount++;
        valueSet.add(values.join('\u001f'));
    }

    return {
        valueSet,
        distinctRate: nonEmptyCount > 0 ? valueSet.size / nonEmptyCount : 0,
        nonEmptyRate: rowCount > 0 ? nonEmptyCount / rowCount : 0,
        rowCount,
        nonEmptyCount,
        distinctCount: valueSet.size
    };
}

function getSampleMatches(setA, setB, limit = 3) {
    const sampleMatches = [];

    for (const value of setA) {
        if (setB.has(value)) {
            sampleMatches.push(value.replace(/\u001f/g, ' + '));

            if (sampleMatches.length >= limit) {
                break;
            }
        }
    }

    return sampleMatches;
}

function buildCompositeJoinCandidates(candidates, profilesA, profilesB) {
    const candidatesByKey = new Map();

    for (const candidate of candidates) {
        if (!candidatesByKey.has(candidate.canonicalKey)) {
            candidatesByKey.set(candidate.canonicalKey, candidate);
        }
    }

    const compositeCandidates = [];

    for (const rule of CONFIG.COMPOSITE_JOIN_RULES) {
        const parts = rule.keys.map(key => candidatesByKey.get(key));
        if (parts.some(part => !part)) {
            continue;
        }

        const colsA = parts.map(part => part.colA);
        const colsB = parts.map(part => part.colB);
        if (new Set(colsA).size !== colsA.length || new Set(colsB).size !== colsB.length) {
            continue;
        }

        const profileA = buildCompositeProfile(profilesA, colsA);
        const profileB = buildCompositeProfile(profilesB, colsB);
        if (!profileA || !profileB) {
            continue;
        }

        const overlap = computeOverlap(profileA.valueSet, profileB.valueSet);
        if (!overlap) {
            continue;
        }

        const minMatched = rule.minMatched ?? 1;
        const minOverlapRatio = rule.minOverlapRatio ?? CONFIG.MIN_OVERLAP_RATIO;
        if (
            overlap.matched < minMatched ||
            (overlap.ratioA < minOverlapRatio && overlap.ratioB < minOverlapRatio)
        ) {
            continue;
        }

        const { joinType, cardinality, score, confidence } = classifyJoin(overlap, profileA, profileB);
        const columnPairs = parts.map(part => ({ colA: part.colA, colB: part.colB }));

        compositeCandidates.push({
            colA: colsA.join('+'),
            colB: colsB.join('+'),
            canonicalKey: rule.keys.join('+'),
            matched: overlap.matched,
            ratioA: +overlap.ratioA.toFixed(3),
            ratioB: +overlap.ratioB.toFixed(3),
            joinType,
            cardinality,
            score,
            confidence,
            sampleMatches: getSampleMatches(profileA.valueSet, profileB.valueSet),
            isComposite: true,
            compositeParts: rule.keys,
            columnPairs,
            replacedKeys: rule.keys
        });
    }

    return compositeCandidates;
}

function applyCompositeJoinRules(candidates, profilesA, profilesB) {
    const compositeCandidates = buildCompositeJoinCandidates(candidates, profilesA, profilesB);
    if (compositeCandidates.length === 0) {
        return candidates;
    }

    const replacedKeys = new Set(compositeCandidates.flatMap(candidate => candidate.replacedKeys || []));
    return [
        ...candidates.filter(candidate => !replacedKeys.has(candidate.canonicalKey)),
        ...compositeCandidates
    ];
}

function combineJoinKeyLabels(joinKeys) {
    const parts = [];

    for (const joinKey of joinKeys) {
        for (const part of String(joinKey || '').split('+')) {
            if (part && !parts.includes(part)) {
                parts.push(part);
            }
        }
    }

    return parts.join('+');
}

// Markdown 테이블 깨짐 방지를 위해 문자열을 이스케이프하는 함수
function escapeMarkdownCell(value) {
    return String(value ?? '')
        .replace(/\|/g, '\\|')
        .replace(/\n/g, ' ')
        .trim();
}

// SQL 식별자에 큰따옴표가 포함될 경우 이스케이프하는 함수
function quoteIdent(identifier) {
    return `"${String(identifier).replace(/"/g, '""')}"`;
}

// 테이블 alias와 메타데이터로 전체 컬럼 SELECT 절 항목을 생성하는 함수
// fieldList가 없으면 alias.* 단일 항목으로 폴백한다.
function expandTableColumns(tableAlias, svcNo, meta) {
    const fieldList = meta?.[svcNo]?.fieldList;
    if (!fieldList || fieldList.length === 0) {
        return [`${tableAlias}.*`];
    }
    return fieldList.map(({ field, korNm }) => {
        const col = `${tableAlias}.${quoteIdent(field)}`;
        return korNm ? `${col} AS "${tableAlias}_${korNm}"` : col;
    });
}

function getRelationColumnPairs(relation) {
    if (Array.isArray(relation.columnPairs) && relation.columnPairs.length > 0) {
        return relation.columnPairs;
    }

    return [{ colA: relation.colA, colB: relation.colB }];
}

function getRelationColumnsForSide(relation, side) {
    const key = side === 'A' ? 'colA' : 'colB';
    return getRelationColumnPairs(relation)
        .map(pair => pair[key])
        .filter(Boolean);
}

function buildOnClause(leftAlias, rightAlias, relation, leftSide) {
    const pairs = getRelationColumnPairs(relation);
    return pairs.map((pair, index) => {
        const leftCol = leftSide === 'A' ? pair.colA : pair.colB;
        const rightCol = leftSide === 'A' ? pair.colB : pair.colA;
        const prefix = index === 0 ? '  ON' : ' AND';
        return `${prefix} ${leftAlias}.${quoteIdent(leftCol)} = ${rightAlias}.${quoteIdent(rightCol)}`;
    }).join('\n');
}

function buildNonEmptyWhereClause(alias, columns) {
    const uniqueColumns = [...new Set(columns.filter(Boolean))];
    if (uniqueColumns.length === 0) {
        return '';
    }

    return uniqueColumns.map((column, index) => {
        const prefix = index === 0 ? 'WHERE' : '  AND';
        const quoted = `${alias}.${quoteIdent(column)}`;
        return `${prefix} ${quoted} IS NOT NULL AND ${quoted} != ''`;
    }).join('\n');
}

function formatColumnDisplay(svcNo, column, meta) {
    const korNm = ((meta[svcNo] || {}).fields || {})[column];
    return korNm ? `${korNm}(${column})` : column;
}

function formatRelationColumnDisplay(relation, side, meta) {
    const svcNo = side === 'A' ? relation.svcA : relation.svcB;
    return getRelationColumnsForSide(relation, side)
        .map(column => formatColumnDisplay(svcNo, column, meta))
        .join(' + ');
}

// JOIN 유형 문자열을 SQL JOIN 키워드로 정리하는 함수
function normalizeSqlJoinType(joinType) {
    return joinType.includes('INNER')
        ? 'INNER JOIN'
        : 'LEFT JOIN';
}

// =============================================================================
// 2. 샘플 데이터 로딩
// =============================================================================

// samples 폴더의 JSON 파일을 Arquero DataFrame으로 로드하는 함수
function loadSampleTables(samplesDir) {
    const tables = {};

    // samples 디렉터리 존재 여부 확인
    if (!fs.existsSync(samplesDir)) {
        logger.error({ samplesDir }, 'samples 디렉터리를 찾을 수 없습니다.');
        return tables;
    }

    // JSON 파일만 분석 대상으로 사용
    const files = fs
        .readdirSync(samplesDir)
        .filter(file => file.endsWith('.json'));

    for (const file of files) {
        const svcNo = path.basename(file, '.json');
        const filePath = path.join(samplesDir, file);

        try {
            const raw = fs.readFileSync(filePath, 'utf-8').trim();

            if (!raw) {
                continue;
            }

            const json = JSON.parse(raw);

            // 배열형 JSON뿐 아니라 response.body.items.item 같은 구조도 지원함
            const rows = extractRowsFromSampleJson(json);

            if (!Array.isArray(rows) || rows.length === 0) {
                continue;
            }

            // 객체 형태의 row만 유효 데이터로 사용
            const validRows = rows.filter(row => row && typeof row === 'object');

            if (validRows.length === 0) {
                continue;
            }

            tables[svcNo] = aq.from(validRows);
        } catch (err) {
            logger.warn({
                file,
                errorMessage: err.message
            }, '샘플 JSON 로딩 중 오류가 발생하여 해당 파일을 건너뜁니다.');
        }
    }

    logger.info({
        fileCount: files.length,
        tableCount: Object.keys(tables).length
    }, '샘플 DataFrame 로딩 완료');

    return tables;
}

// crawl_cache.json에서 서비스명·카테고리 메타데이터를 로드하는 함수
function loadMetadata(cachePath) {
    try {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        const meta = {};

        for (const dataset of cache) {
            const fieldNames = {};
            const fieldList = [];
            if (Array.isArray(dataset.fields)) {
                for (const f of dataset.fields) {
                    if (!f.field) continue;
                    const korNm = (f.kor_nm && f.kor_nm !== f.field) ? f.kor_nm : null;
                    if (korNm) fieldNames[f.field] = korNm;
                    fieldList.push({ field: f.field, korNm });
                }
            }
            meta[dataset.svc_no] = {
                svc_nm: dataset.svc_nm,
                cat: dataset.cat || '기타',
                fields: fieldNames,
                fieldList
            };
        }

        logger.info({
            datasetCount: Object.keys(meta).length
        }, '메타데이터 로딩 완료');

        return meta;
    } catch (err) {
        logger.warn({
            cachePath,
            errorMessage: err.message
        }, '메타데이터 로딩 실패. 빈 객체로 처리합니다.');

        return {};
    }
}

// analyze_pk_fk.js 결과 로드
function loadPkFkAnalysis(pkfkPath) {
    if (!pkfkPath || !fs.existsSync(pkfkPath)) {
        logger.warn({ pkfkPath }, 'PK/FK 분석 JSON 없음 — 테마/연결경로 통합 생략');
        return null;
    }

    try {
        const analysis = JSON.parse(fs.readFileSync(pkfkPath, 'utf-8'));
        logger.info({
            themeCandidates: analysis.theme_candidates?.length || 0,
            connectionPaths: analysis.connection_paths?.length || 0
        }, 'PK/FK 분석 결과 로딩 완료');
        return analysis;
    } catch (err) {
        logger.warn({ pkfkPath, errorMessage: err.message }, 'PK/FK 분석 JSON 로딩 실패');
        return null;
    }
}

// PK/FK 분석 결과 중 시나리오 보고서에 필요한 부분만 추출
function buildPkFkContext(pkfkAnalysis) {
    if (!pkfkAnalysis) {
        return {
            summary: null,
            themeCandidates: [],
            connectionPaths: []
        };
    }

    return {
        summary: pkfkAnalysis.summary || null,
        themeCandidates: pkfkAnalysis.theme_candidates || pkfkAnalysis.graph_analysis?.theme_candidates || [],
        connectionPaths: pkfkAnalysis.connection_paths || pkfkAnalysis.graph_analysis?.connection_paths || []
    };
}

// 한글 검색/유사도용 정규화
function normalizeKoreanSearchText(value) {
    const compact = String(value || '')
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[\s\-_()[\]{}·.,/\\|:;'"`~!?]+/g, '');
    return Hangul.disassembleToString(compact);
}

function getFieldTerms(fields) {
    if (Array.isArray(fields)) return fields.filter(Boolean);
    return Object.entries(fields || {})
        .flatMap(([field, korNm]) => [field, korNm])
        .filter(Boolean);
}

// TF-IDF 대표 키워드용 문서 생성
function buildDatasetDocument(svcNo, meta) {
    const m = meta[svcNo] || {};
    const fieldTerms = getFieldTerms(m.fields);
    return [
        m.svc_nm || svcNo,
        m.cat || '',
        ...fieldTerms
    ].join(' ');
}

// natural TF-IDF 기반 군집 대표 키워드 추출
function extractCommunityKeywords(tables, meta, limit = 6) {
    const tfidf = new TfIdf();
    const docs = tables.map(svcNo => buildDatasetDocument(svcNo, meta));
    docs.forEach(doc => tfidf.addDocument(doc));

    const scores = new Map();
    const addScore = (token, score) => {
        const normalizedToken = String(token || '').trim().toLowerCase();
        if (normalizedToken.length < 2 || /^\d+$/.test(normalizedToken)) return;
        if (CONFIG.THEME_KEYWORD_STOPWORDS.has(normalizedToken)) return;
        if (/^(addr|tel|phone|fax|zip|dt|ymd|date|kg|lv)$/i.test(normalizedToken)) return;
        scores.set(normalizedToken, (scores.get(normalizedToken) || 0) + score);
    };

    for (let i = 0; i < docs.length; i++) {
        for (const term of tfidf.listTerms(i).slice(0, 20)) {
            addScore(term.term, term.tfidf);
        }
    }

    for (const svcNo of tables) {
        const m = meta[svcNo] || {};
        for (const token of String(`${m.cat || ''} ${m.svc_nm || ''}`).split(/[\s/·,()_-]+/)) {
            addScore(token, 1.5);
        }
    }

    return Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([term, score]) => ({ term, score: Number(score.toFixed(3)) }));
}

function buildThemeSourceText(tables, rels, meta, categories, keywords) {
    return [
        ...tables.flatMap(svcNo => [meta[svcNo]?.svc_nm, meta[svcNo]?.cat]),
        ...Array.from(categories.keys()),
        ...rels.flatMap(rel => [rel.joinKey, rel.colA, rel.colB, rel.nmA, rel.nmB, rel.catA, rel.catB]),
        ...keywords.map(k => k.term)
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
}

function hasThemeWord(text, words) {
    return words.some(word => text.includes(String(word).toLowerCase()));
}

function buildReadableThemeName(tables, rels, meta, categories, keywords, idx) {
    const text = buildThemeSourceText(tables, rels, meta, categories, keywords);
    const topCategories = Array.from(categories.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([cat]) => cat)
        .filter(Boolean);

    if (hasThemeWord(text, ['haccp', '해썹']) && hasThemeWord(text, ['업체인허가', '인허가', 'lcns', 'bssh', 'prms', '영업', '축산물'])) {
        return 'HACCP 및 업체 인허가 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['gmp']) && hasThemeWord(text, ['건강기능식품'])) {
        return '건강기능식품 GMP 품목 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['식품위해관리', '위해', '행정처분', 'dsps', 'vilt'])) {
        return '식품위해 행정처분 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['기준규격정보', '기준규격', 'testitm', 'spec', '시험', '검사'])) {
        return '시험검사 기준규격 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['이력추적관리', '이력추적', 'hist_trace', 'histtrace'])) {
        return '이력추적관리 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['수질환경정보', '수질', 'bod', 'cod', 'phnl', 'orgnicph'])) {
        return '수질환경 정보 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['검사기관정보', '검사기관'])) {
        return '검사기관 정보 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['위생용품'])) {
        return '위생용품 인허가 연계 데이터 세트';
    }
    if (hasThemeWord(text, ['수입식품'])) {
        return '수입식품 업체 연계 데이터 세트';
    }

    if (topCategories.length >= 2) {
        return `${topCategories[0]} 및 ${topCategories[1]} 연계 데이터 세트`;
    }
    if (topCategories.length === 1 && topCategories[0] !== '기타') {
        return `${topCategories[0]} 연계 데이터 세트`;
    }
    return `연계 데이터 세트 ${idx + 1}`;
}

// 관계 그래프를 Louvain 커뮤니티 탐지용 그래프로 변환
function buildRelationGraph(relations, meta) {
    const graph = new UndirectedGraph({ multi: false, allowSelfLoops: false });

    for (const svcNo of Object.keys(meta)) {
        graph.mergeNode(svcNo, {
            svc_nm: meta[svcNo]?.svc_nm || svcNo,
            cat: meta[svcNo]?.cat || '기타'
        });
    }

    for (const rel of relations) {
        if (!rel.svcA || !rel.svcB || rel.svcA === rel.svcB) continue;

        graph.mergeNode(rel.svcA, { svc_nm: rel.nmA, cat: rel.catA });
        graph.mergeNode(rel.svcB, { svc_nm: rel.nmB, cat: rel.catB });

        const weight = Math.max(0.1, (rel.score || 0) / 100) + Math.min(1, (rel.matched || 0) / 1000);
        if (graph.hasEdge(rel.svcA, rel.svcB)) {
            const edge = graph.edge(rel.svcA, rel.svcB);
            const prev = graph.getEdgeAttribute(edge, 'weight') || 0;
            graph.setEdgeAttribute(edge, 'weight', Math.max(prev, weight));
        } else {
            graph.addEdge(rel.svcA, rel.svcB, {
                weight,
                joinKey: rel.joinKey,
                score: rel.score
            });
        }
    }

    return graph;
}

// Louvain + TF-IDF 기반 테마별 데이터 세트 후보 생성
function buildDatasetSets(relations, meta) {
    const graph = buildRelationGraph(relations, meta);
    if (graph.order === 0 || graph.size === 0) {
        return {
            method: 'louvain+tfidf+hangul-normalization',
            modularity: 0,
            communityCount: 0,
            sets: []
        };
    }

    let details;
    try {
        details = louvain.detailed(graph, {
            getEdgeWeight: 'weight',
            randomWalk: false
        });
    } catch (err) {
        logger.warn({ errorMessage: err.message }, 'Louvain 커뮤니티 탐지 실패');
        return {
            method: 'louvain+tfidf+hangul-normalization',
            modularity: 0,
            communityCount: 0,
            sets: []
        };
    }

    const communityMap = new Map();
    for (const [svcNo, community] of Object.entries(details.communities || {})) {
        if (!communityMap.has(community)) communityMap.set(community, []);
        communityMap.get(community).push(svcNo);
    }

    const relationGroups = new Map();
    for (const rel of relations) {
        const community = details.communities?.[rel.svcA];
        if (community == null || community !== details.communities?.[rel.svcB]) continue;
        if (!relationGroups.has(community)) relationGroups.set(community, []);
        relationGroups.get(community).push(rel);
    }

    const sets = Array.from(communityMap.entries())
        .filter(([, tables]) => tables.length >= 2)
        .map(([community, tables], idx) => {
            const rels = relationGroups.get(community) || [];
            const keywords = extractCommunityKeywords(tables, meta);
            const joinKeys = new Map();
            const categories = new Map();

            for (const rel of rels) {
                joinKeys.set(rel.joinKey, (joinKeys.get(rel.joinKey) || 0) + 1);
            }
            for (const svcNo of tables) {
                const cat = meta[svcNo]?.cat || '기타';
                categories.set(cat, (categories.get(cat) || 0) + 1);
            }

            const themeName = buildReadableThemeName(tables, rels, meta, categories, keywords, idx);

            return {
                setId: `LOUVAIN_${String(idx + 1).padStart(2, '0')}`,
                community,
                themeName,
                datasetCount: tables.length,
                relationCount: rels.length,
                keywords,
                categories: Array.from(categories.entries()).sort((a, b) => b[1] - a[1]).map(([cat, count]) => ({ cat, count })),
                joinKeys: Array.from(joinKeys.entries()).sort((a, b) => b[1] - a[1]).map(([joinKey, count]) => ({ joinKey, count })).slice(0, 8),
                datasets: tables.map(svcNo => ({
                    svcNo,
                    svcNm: meta[svcNo]?.svc_nm || svcNo,
                    cat: meta[svcNo]?.cat || '기타',
                    normalizedName: normalizeKoreanSearchText(meta[svcNo]?.svc_nm || svcNo)
                }))
            };
        })
        .sort((a, b) => b.relationCount - a.relationCount || b.datasetCount - a.datasetCount);

    return {
        method: 'louvain+tfidf+hangul-normalization',
        modularity: Number((details.modularity || 0).toFixed(4)),
        communityCount: sets.length,
        sets
    };
}

// =============================================================================
// 3. 컬럼 프로파일링
// =============================================================================

// 하나의 DataFrame에서 각 컬럼의 유일성·비공백률을 분석하는 함수
function profileTable(svcNo, table) {
    const colNames = table.columnNames();
    const rowCount = table.numRows();
    const profiles = {};

    for (const col of colNames) {
        // 명칭, 주소, 전화번호, 날짜 등 약한 키는 조인 후보에서 제외
        if (isWeakJoinColumn(col)) {
            continue;
        }

        const values = table.array(col);
        const normalizedValues = values.map(normalizeValue);
        const nonEmptyValues = normalizedValues.filter(Boolean);
        const valueSet = new Set(nonEmptyValues);

        // 전체 row 중 실제 값이 채워진 비율
        const nonEmptyRate = rowCount > 0
            ? nonEmptyValues.length / rowCount
            : 0;

        // 비어 있지 않은 값 중 고유값 비율
        // 식별자 성격이 강할수록 이 값이 높아지는 경향이 있음
        const distinctRate = nonEmptyValues.length > 0
            ? valueSet.size / nonEmptyValues.length
            : 0;

        profiles[col] = {
            values: normalizedValues,
            valueSet,
            distinctRate,
            nonEmptyRate,
            rowCount,
            nonEmptyCount: nonEmptyValues.length,
            distinctCount: valueSet.size
        };
    }

    return profiles;
}

// 전체 테이블에 대해 컬럼 프로파일을 일괄 계산하는 함수
function profileAllTables(tables) {
    const allProfiles = {};

    for (const [svcNo, table] of Object.entries(tables)) {
        allProfiles[svcNo] = profileTable(svcNo, table);
    }

    logger.info({
        tableCount: Object.keys(allProfiles).length
    }, '컬럼 프로파일링 완료');

    return allProfiles;
}

// =============================================================================
// 4. 값 겹침 분석
// =============================================================================

/**
 * [데이터 겹침(Overlap) 통계 계산]
 * 
 * 두 컬럼의 실제 데이터 값(ValueSet)을 비교하여 얼마나 겹치는지(교집합) 계산
 * 이 비율(ratio)은 나중에 두 테이블 간의 JOIN 성격(INNER vs LEFT)을 판별하는 근거로 사용됨
 * 
 * @param {Set} setA - A 테이블 특정 컬럼의 고유 데이터 셋
 * @param {Set} setB - B 테이블 특정 컬럼의 고유 데이터 셋
 * @returns {object|null} 겹침 건수(matched), 각 테이블 대비 겹침 비율(ratioA, ratioB), 전체 크기를 반환
 */
function computeOverlap(setA, setB) {
    if (setA.size === 0 || setB.size === 0) {
        return null;
    }

    let matched = 0;

    for (const value of setA) {
        if (setB.has(value)) {
            matched++;
        }
    }

    // A의 값 중 B에 있는 비율
    const ratioA = matched / setA.size;

    // B의 값 중 A에 있는 비율
    const ratioB = matched / setB.size;

    return {
        matched,
        ratioA,
        ratioB,
        sizeA: setA.size,
        sizeB: setB.size
    };
}

/**
 * [JOIN 유형 및 카디널리티 판별]
 * 
 * 겹침(Overlap) 통계와 각 컬럼의 고유도(distinctRate)를 바탕으로, 두 테이블을 JOIN 할 때 어떤 방식이 가장 적합할지 수학적으로 추론
 * 
 * - INNER JOIN: 양쪽 모두 데이터가 상당 부분 겹칠 때 (필수 관계)
 * - LEFT JOIN : 한쪽의 데이터만 다른 쪽에 쏙 들어갈 때 (선택적/부분 관계)
 * - 카디널리티 (1:1, 1:N, N:M): 고유도가 90% 이상이면 PK(1)로 간주하고, 아니면 FK(N)로 간주하여 판별
 * 
 * @param {object} overlap - computeOverlap()에서 반환된 겹침 통계 객체
 * @param {object} profileA - A 테이블 컬럼의 프로파일링 정보 (고유도 등)
 * @param {object} profileB - B 테이블 컬럼의 프로파일링 정보
 * @returns {object} 조인 유형, 카디널리티, 신뢰도 점수 및 등급
 */
function classifyJoin(overlap, profileA, profileB) {
    const { ratioA, ratioB } = overlap;

    // JOIN 유형 판단
    // 양쪽 겹침이 모두 높으면 INNER JOIN, 한쪽 겹침이 높으면 LEFT JOIN으로 판단
    const joinType = (ratioA >= 0.5 && ratioB >= 0.5)
        ? 'INNER JOIN'
        : (ratioA >= ratioB)
            ? 'LEFT JOIN (A→B)'
            : 'LEFT JOIN (B→A)';

    // 카디널리티 판단
    // distinctRate가 높으면서 일정 데이터 건수(PK_MIN_ROW_COUNT)를 만족하면 PK로 간주함
    const cardinalityA = (profileA.distinctRate >= CONFIG.PK_DISTINCT_RATE && profileA.nonEmptyCount >= CONFIG.PK_MIN_ROW_COUNT) ? 'PK' : 'FK';
    const cardinalityB = (profileB.distinctRate >= CONFIG.PK_DISTINCT_RATE && profileB.nonEmptyCount >= CONFIG.PK_MIN_ROW_COUNT) ? 'PK' : 'FK';

    const cardinality = cardinalityA === 'PK' && cardinalityB === 'PK'
        ? '1:1'
        : cardinalityA === 'PK' || cardinalityB === 'PK'
            ? '1:N'
            : 'N:M';

    // 신뢰도 점수 산정
    const score = Math.min(100, Math.round((ratioA + ratioB) * 50));

    const confidence = score >= 70
        ? 'HIGH'
        : score >= 40
            ? 'MEDIUM'
            : 'LOW';

    return {
        joinType,
        cardinality,
        score,
        confidence
    };
}

/**
 * [두 테이블 간의 유효한 JOIN 후보 탐색]
 * 
 * A 테이블과 B 테이블의 모든 컬럼을 서로 교차 비교(Cross Join)하여, 실제로 데이터를 JOIN 할 수 있는 유효한 컬럼 쌍(후보)을 찾아냄
 * 
 * - 필터링 1: 이름이 똑같거나 동의어(Synonym)인 컬럼만 1차로 추림
 * - 필터링 2: 실제 데이터 겹침(Overlap) 비율이 최소 기준(CONFIG.MIN_OVERLAP_RATIO)을 넘는지 확인
 * - 최적화  : 완전히 동일한 의미의 키(canonicalKey)에 대해서는 가장 점수가 높은 하나만 남김
 * 
 * @param {string} svcA - A 테이블 고유번호
 * @param {object} profilesA - A 테이블의 컬럼 프로파일 맵
 * @param {string} svcB - B 테이블 고유번호
 * @param {object} profilesB - B 테이블의 컬럼 프로파일 맵
 * @returns {object[]} 점수 내림차순으로 정렬된 유효 JOIN 후보 목록
 */
function findJoinCandidates(svcA, profilesA, svcB, profilesB) {
    const rawCandidates = [];

    for (const [colA, profileA] of Object.entries(profilesA)) {
        for (const [colB, profileB] of Object.entries(profilesB)) {
            // 동일 키 또는 동의어 키만 비교
            if (!areSynonyms(colA, colB)) {
                continue;
            }

            const overlap = computeOverlap(profileA.valueSet, profileB.valueSet);

            if (!overlap) {
                continue;
            }

            // 두 방향 모두 최소 겹침 비율 미만이면 제외
            if (overlap.ratioA < CONFIG.MIN_OVERLAP_RATIO && overlap.ratioB < CONFIG.MIN_OVERLAP_RATIO) {
                continue;
            }

            const { joinType, cardinality, score, confidence } = classifyJoin(overlap, profileA, profileB);

            // 샘플 매칭 값 최대 3개 추출
            const sampleMatches = [];

            for (const value of profileA.valueSet) {
                if (profileB.valueSet.has(value)) {
                    sampleMatches.push(value);

                    if (sampleMatches.length >= 3) {
                        break;
                    }
                }
            }

            rawCandidates.push({
                colA,
                colB,
                canonicalKey: canonicalKey(colA),
                matched: overlap.matched,
                ratioA: +overlap.ratioA.toFixed(3),
                ratioB: +overlap.ratioB.toFixed(3),
                joinType,
                cardinality,
                score,
                confidence,
                sampleMatches
            });
        }
    }

    // 같은 canonicalKey 안에서 가장 좋은 후보만 남김
    // 기존 seen 방식은 첫 번째 후보만 보고 더 좋은 후보를 누락할 수 있어 개선함
    const bestByCanonicalKey = new Map();

    for (const candidate of rawCandidates) {
        const key = candidate.canonicalKey;
        const prev = bestByCanonicalKey.get(key);

        if (
            !prev ||
            candidate.score > prev.score ||
            (candidate.score === prev.score && candidate.matched > prev.matched)
        ) {
            bestByCanonicalKey.set(key, candidate);
        }
    }

    const candidates = applyCompositeJoinRules(
        Array.from(bestByCanonicalKey.values()),
        profilesA,
        profilesB
    );

    // 점수 내림차순, 매칭 건수 내림차순 정렬
    candidates.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return b.matched - a.matched;
    });

    return candidates;
}

// =============================================================================
// 5. 쌍별 관계(데이터셋 2개씩 짝지어서 서로 JOIN 가능한 관계) 구축 
// =============================================================================

/**
 * [전체 테이블 쌍(Pair) 관계망 구축]
 * 
 * 데이터베이스에 존재하는 '모든 테이블의 조합(N * (N-1) / 2)'에 대해 findJoinCandidates를 호출하여 전체적인 조인 관계망(Relation Graph)을 만듦
 * 
 * @param {object} allProfiles - 모든 테이블의 컬럼 프로파일 맵
 * @param {object} meta - 테이블의 메타데이터 (이름, 한글명 등)
 * @returns {object[]} 전체 테이블 간의 1:1 조인 관계 목록 (점수 내림차순 정렬)
 */
function buildPairRelations(allProfiles, meta) {
    const svcNos = Object.keys(allProfiles);
    const relations = [];
    let checkedPairs = 0;

    for (let i = 0; i < svcNos.length; i++) {
        for (let j = i + 1; j < svcNos.length; j++) {
            const svcA = svcNos[i];
            const svcB = svcNos[j];

            // 도메인 규칙: 블랙리스트에 등록된 테이블 쌍은 조인 후보 탐색에서 아예 제외
            const isForbidden = FORBIDDEN_JOIN_PAIRS.some(pair => 
                (pair[0] === svcA && pair[1] === svcB) || 
                (pair[0] === svcB && pair[1] === svcA)
            );
            if (isForbidden) continue;

            const candidates = findJoinCandidates(
                svcA,
                allProfiles[svcA],
                svcB,
                allProfiles[svcB]
            );

            checkedPairs++;

            if (checkedPairs % 500 === 0) {
                logger.info({
                    checkedPairs,
                    validRelations: relations.length
                }, '쌍별 분석 진행 중...');
            }

            if (candidates.length === 0) {
                continue;
            }

            candidates.slice(0, CONFIG.MAX_CANDIDATES_PER_PAIR).forEach((candidate, candidateRank) => {
                relations.push({
                    svcA,
                    svcB,
                    nmA: (meta[svcA] || {}).svc_nm || svcA,
                    nmB: (meta[svcB] || {}).svc_nm || svcB,
                    catA: (meta[svcA] || {}).cat || '기타',
                    catB: (meta[svcB] || {}).cat || '기타',
                    joinKey: candidate.canonicalKey,
                    colA: candidate.colA,
                    colB: candidate.colB,
                    korA: ((meta[svcA] || {}).fields || {})[candidate.colA],
                    korB: ((meta[svcB] || {}).fields || {})[candidate.colB],
                    joinType: candidate.joinType,
                    cardinality: candidate.cardinality,
                    score: candidate.score,
                    confidence: candidate.confidence,
                    matched: candidate.matched,
                    ratioA: candidate.ratioA,
                    ratioB: candidate.ratioB,
                    sampleMatches: candidate.sampleMatches,
                    candidateRank: candidateRank + 1,
                    isComposite: Boolean(candidate.isComposite),
                    columnPairs: candidate.columnPairs || null,
                    compositeParts: candidate.compositeParts || null,
                    allCandidates: candidates
                });
            });
        }
    }

    relations.sort((a, b) => b.score - a.score);

    logger.info({
        checkedPairs,
        validRelations: relations.length
    }, '쌍별 관계 분석 완료');

    return relations;
}

// =============================================================================
// 6. 시나리오 도출
// =============================================================================

/**
 * [조인 키(Join Key) 기반 비즈니스 시나리오 클러스터링]
 * 
 * 1:1로 흩어져 있는 조인 관계들을 모아서, 동일한 '조인 키(예: 바코드, 인허가번호)'를 공유하는 테이블들을 하나의 거대한 '비즈니스 시나리오 그룹(클러스터)'으로 묶어줌
 * 
 * - 예시: A-B(바코드 조인), B-C(바코드 조인) 관계가 있다면 A, B, C를 묶어서 "바코드 기반 상품 모니터링" 이라는 하나의 시나리오를 도출
 * - 필터링: 최소 N개(CONFIG.MIN_DATASETS_PER_SCENARIO) 이상의 테이블이 묶여야만 유의미한 시나리오로 인정하고 SQL 힌트를 자동 생성
 * 
 * @param {object[]} relations - buildPairRelations에서 구한 1:1 관계 목록
 * @param {object} meta - 테이블 메타데이터
 * @returns {object[]} 도출된 비즈니스 시나리오(클러스터) 목록
 */
function clusterByJoinKey(relations, meta) {
    const keyGroups = {};

    // joinKey별로 관계를 묶음
    for (const relation of relations) {
        const joinKey = relation.joinKey;

        if (!keyGroups[joinKey]) {
            keyGroups[joinKey] = [];
        }

        keyGroups[joinKey].push(relation);
    }

    const scenarios = [];
    let scenarioId = 1;

    for (const [joinKey, rels] of Object.entries(keyGroups)) {
        // 최소 관계 수 미달 시 제외
        if (rels.length < CONFIG.MIN_DATASETS_PER_SCENARIO - 1) {
            continue;
        }

        // 점수 내림차순으로 정렬 (평균 점수·SQL 생성·relations 출력에 일관되게 사용)
        const sortedRels = [...rels]
            .sort((a, b) => b.score - a.score || b.matched - a.matched);

        // 연결된 데이터셋 집합 수집 (블랙리스트 필터링 적용)
        const datasets = new Set();
        const acceptedRels = [];

        for (const relation of sortedRels) {
            const tempSets = new Set(datasets);
            tempSets.add(relation.svcA);
            tempSets.add(relation.svcB);

            // 도메인 규칙: 클러스터 내에 블랙리스트 쌍이 동시에 포함되는 것을 방지
            const hasForbidden = FORBIDDEN_JOIN_PAIRS.some(pair => 
                tempSets.has(pair[0]) && tempSets.has(pair[1])
            );

            if (!hasForbidden) {
                datasets.add(relation.svcA);
                datasets.add(relation.svcB);
                acceptedRels.push(relation);
            }
        }

        // 최소 데이터셋 수 미달 시 제외
        if (datasets.size < CONFIG.MIN_DATASETS_PER_SCENARIO) {
            continue;
        }

        // 평균 점수 계산 (전체 관계 기준)
        const avgScore = Math.round(
            acceptedRels.reduce((sum, relation) => sum + relation.score, 0) / acceptedRels.length
        );

        // 시나리오 신뢰도 산정 (단일 관계가 아닌 평균 점수 기준)
        const maxConfidence = avgScore >= 70
            ? 'HIGH'
            : avgScore >= 40
                ? 'MEDIUM'
                : 'LOW';

        // datasets은 전체 관계에서 수집하고, SQL 힌트는 상위 관계만 사용한다.
        // 이전에는 sortedRels.slice(0, 3) 기준으로 datasets을 수집해
        // datasetCount와 실제 datasets 목록이 불일치하는 문제가 있었다.
        const sqlHint = buildSqlHint(joinKey, acceptedRels.slice(0, CONFIG.MAX_SQL_TABLES - 1), meta);

        scenarios.push({
            id: `SCN_${String(scenarioId++).padStart(3, '0')}`,
            joinKey,
            datasets: [...datasets],
            datasetCount: datasets.size,
            relations: acceptedRels.map(relation => ({
                from: relation.svcA,
                fromNm: relation.nmA,
                to: relation.svcB,
                toNm: relation.nmB,
                colFrom: relation.colA,
                colTo: relation.colB,
                colFromDisplay: formatRelationColumnDisplay(relation, 'A', meta),
                colToDisplay: formatRelationColumnDisplay(relation, 'B', meta),
                columnPairs: relation.columnPairs,
                joinType: relation.joinType,
                cardinality: relation.cardinality,
                score: relation.score,
                confidence: relation.confidence,
                matched: relation.matched,
                ratioA: relation.ratioA,
                ratioB: relation.ratioB,
                sampleMatches: relation.sampleMatches
            })),
            score: avgScore,
            confidence: maxConfidence,
            sql: sqlHint
        });
    }

    scenarios.sort((a, b) => b.score - a.score || b.datasetCount - a.datasetCount);

    return scenarios;
}

// 시나리오의 SQL 힌트를 생성하는 함수
function buildSqlHint(joinKey, rels, meta) {
    if (rels.length === 0) {
        return '';
    }

    const aliases = 'ABCDEFGH'.split('');
    const lines = [];

    const joinedTables = [];
    // 각 테이블이 실제로 사용하는 컬럼명을 별도로 추적
    let firstWhereCols = [];
    const joins = [];

    // 시작 테이블 (가장 첫 번째 관계의 svcA)
    const firstRel = rels[0];
    joinedTables.push(firstRel.svcA);
    firstWhereCols = getRelationColumnsForSide(firstRel, 'A');

    for (const relation of rels) {
        if (joinedTables.length >= CONFIG.MAX_SQL_TABLES) break;

        if (joinedTables.includes(relation.svcA) && !joinedTables.includes(relation.svcB)) {
            const existingAlias = aliases[joinedTables.indexOf(relation.svcA)];
            const newAlias = aliases[joinedTables.length];
            joinedTables.push(relation.svcB);

            joins.push(`${normalizeSqlJoinType(relation.joinType)} ${quoteIdent(relation.svcB)} ${newAlias}\n${buildOnClause(existingAlias, newAlias, relation, 'A')}`);
        } else if (joinedTables.includes(relation.svcB) && !joinedTables.includes(relation.svcA)) {
            const existingAlias = aliases[joinedTables.indexOf(relation.svcB)];
            const newAlias = aliases[joinedTables.length];
            joinedTables.push(relation.svcA);

            joins.push(`${normalizeSqlJoinType(relation.joinType)} ${quoteIdent(relation.svcA)} ${newAlias}\n${buildOnClause(existingAlias, newAlias, relation, 'B')}`);
        }
    }

    // 연결된 테이블이 시작 테이블 하나뿐이면 SQL 힌트를 생성하지 않는다.
    if (joins.length === 0) return '';

    // 각 테이블의 전체 컬럼을 한글 alias와 함께 전개한다.
    const allSelectCols = [];
    for (let i = 0; i < joinedTables.length; i++) {
        allSelectCols.push(...expandTableColumns(aliases[i], joinedTables[i], meta));
    }
    lines.push(`SELECT\n  ${allSelectCols.join(',\n  ')}`);
    lines.push(`FROM ${quoteIdent(joinedTables[0])} A`);

    for (const joinLine of joins) {
        lines.push(joinLine);
    }

    // WHERE 절도 시작 테이블(A)의 실제 컬럼명을 사용한다.
    lines.push(buildNonEmptyWhereClause('A', firstWhereCols));
    lines.push('LIMIT 100;');

    return lines.join('\n');
}

// BFS 스패닝 트리 경로로 다중 키 체인 JOIN SQL을 생성하는 함수
function buildSqlHintFromPath(rootTable, joinPath, meta) {
    if (joinPath.length === 0) return '';

    const aliases = 'ABCDEFGH'.split('');
    const tableAliasMap = new Map([[rootTable, aliases[0]]]);
    joinPath.forEach((step, i) => tableAliasMap.set(step.toTable, aliases[i + 1]));

    const lines = [];

    // 각 테이블의 전체 컬럼을 한글 alias와 함께 전개한다.
    const allTables = [rootTable, ...joinPath.map(s => s.toTable)];
    const allSelectCols = [];
    for (let i = 0; i < allTables.length; i++) {
        allSelectCols.push(...expandTableColumns(aliases[i], allTables[i], meta));
    }
    lines.push(`SELECT\n  ${allSelectCols.join(',\n  ')}`);
    lines.push(`FROM ${quoteIdent(rootTable)} A`);

    for (const step of joinPath) {
        const fromAlias = tableAliasMap.get(step.fromTable);
        const toAlias = tableAliasMap.get(step.toTable);
        lines.push(`${normalizeSqlJoinType(step.rel.joinType)} ${quoteIdent(step.toTable)} ${toAlias}`);
        const fromSide = step.rel.svcA === step.fromTable ? 'A' : 'B';
        lines.push(buildOnClause(fromAlias, toAlias, step.rel, fromSide));
    }

    const firstSide = joinPath[0].rel.svcA === joinPath[0].fromTable ? 'A' : 'B';
    lines.push(buildNonEmptyWhereClause('A', getRelationColumnsForSide(joinPath[0].rel, firstSide)));
    lines.push('LIMIT 100;');

    return lines.join('\n');
}

// 브릿지 테이블을 통해 서로 다른 joinKey 그룹을 연결하는 체인 시나리오를 생성하는 함수
function buildChainScenarios(starScenarios, relations, meta) {
    // 테이블 → 참여 joinKey Set
    const tableKeyMap = new Map();
    for (const scenario of starScenarios) {
        for (const dataset of scenario.datasets) {
            if (!tableKeyMap.has(dataset)) tableKeyMap.set(dataset, new Set());
            tableKeyMap.get(dataset).add(scenario.joinKey);
        }
    }

    // 브릿지 테이블: 2개 이상의 joinKey 그룹에 속한 테이블
    const bridges = [...tableKeyMap.entries()]
        .filter(([, keys]) => keys.size >= 2)
        .sort((a, b) => b[1].size - a[1].size);

    if (bridges.length === 0) return [];

    // joinKey별 관계 목록 인덱스
    const relsByKey = new Map();
    for (const rel of relations) {
        if (!relsByKey.has(rel.joinKey)) relsByKey.set(rel.joinKey, []);
        relsByKey.get(rel.joinKey).push(rel);
    }

    const chainScenarios = [];
    let chainId = 1;

    for (const [bridgeTable, bridgeKeys] of bridges) {
        // 각 joinKey에서 브릿지 테이블과 직접 연결된 최고 점수 관계 수집
        const stepsPerKey = [];
        for (const joinKey of bridgeKeys) {
            const keyRels = (relsByKey.get(joinKey) || [])
                .filter(rel => rel.svcA === bridgeTable || rel.svcB === bridgeTable)
                .sort((a, b) => b.score - a.score);

            if (keyRels.length === 0) continue;

            const best = keyRels[0];
            const neighbor = best.svcA === bridgeTable ? best.svcB : best.svcA;
            const fromCol = best.svcA === bridgeTable ? best.colA : best.colB;
            const toCol   = best.svcA === bridgeTable ? best.colB : best.colA;

            stepsPerKey.push({ joinKey, neighbor, fromCol, toCol, rel: best, score: best.score });
        }

        // 점수 내림차순 정렬 후 CONFIG.MAX_SQL_TABLES - 1개까지
        stepsPerKey.sort((a, b) => b.score - a.score);

        const joinPath = [];
        const usedTables = new Set([bridgeTable]);
        const coveredKeys = new Set();

        for (const step of stepsPerKey) {
            if (joinPath.length >= CONFIG.MAX_SQL_TABLES - 1) break;
            if (usedTables.has(step.neighbor)) continue;

            // 도메인 규칙: 체인(N-way) 내에 블랙리스트 쌍이 포함되는 것을 방지
            const hasForbidden = FORBIDDEN_JOIN_PAIRS.some(pair => 
                (usedTables.has(pair[0]) && step.neighbor === pair[1]) ||
                (usedTables.has(pair[1]) && step.neighbor === pair[0])
            );
            if (hasForbidden) continue;

            usedTables.add(step.neighbor);
            coveredKeys.add(step.joinKey);
            joinPath.push({
                fromTable: bridgeTable,
                fromCol:   step.fromCol,
                toTable:   step.neighbor,
                toCol:     step.toCol,
                rel:       step.rel
            });
        }

        // 단일 키만 쓰이면 star 시나리오와 중복 → 제외
        if (joinPath.length < 2 || coveredKeys.size < 2) continue;

        const avgScore = Math.round(
            joinPath.reduce((s, p) => s + p.rel.score, 0) / joinPath.length
        );
        const confidence = avgScore >= 70 ? 'HIGH' : avgScore >= 40 ? 'MEDIUM' : 'LOW';

        const datasets = new Set([bridgeTable, ...joinPath.map(p => p.toTable)]);
        const joinKeyLabel = `CHAIN:${combineJoinKeyLabels([...coveredKeys])}`;

        chainScenarios.push({
            id: `SCN_CHAIN_${String(chainId++).padStart(3, '0')}`,
            joinKey: joinKeyLabel,
            datasets: [...datasets],
            datasetCount: datasets.size,
            bridgeTable,
            relations: joinPath.map(p => ({
                from:           p.rel.svcA,
                fromNm:         p.rel.nmA,
                to:             p.rel.svcB,
                toNm:           p.rel.nmB,
                colFrom:        p.rel.colA,
                colTo:          p.rel.colB,
                colFromDisplay: formatRelationColumnDisplay(p.rel, 'A', meta),
                colToDisplay:   formatRelationColumnDisplay(p.rel, 'B', meta),
                columnPairs:    p.rel.columnPairs,
                joinType:       p.rel.joinType,
                cardinality:    p.rel.cardinality,
                score:          p.rel.score,
                confidence:     p.rel.confidence,
                matched:        p.rel.matched,
                ratioA:         p.rel.ratioA,
                ratioB:         p.rel.ratioB,
                sampleMatches:  p.rel.sampleMatches
            })),
            score: avgScore,
            confidence,
            sql: buildSqlHintFromPath(bridgeTable, joinPath, meta),
            isChain: true
        });
    }

    return chainScenarios;
}

// =============================================================================
// 7. 결과 파일 생성
// =============================================================================

// JSON 결과 파일을 저장하는 함수
function writeJson(scenarios, relations, outputPath, pkfkContext = {}, datasetSetAnalysis = null) {
    const result = {
        generatedAt: formatKstTimestamp(),
        summary: {
            totalScenarios: scenarios.length,
            starScenarios: scenarios.filter(s => !s.isChain).length,
            chainScenarios: scenarios.filter(s => s.isChain).length,
            totalRelations: relations.length,
            highConfidence: scenarios.filter(scenario => scenario.confidence === 'HIGH').length,
            sqlErrorScenarios: scenarios.filter(scenario => scenario.sqlError).length,
            integratedThemeCandidates: pkfkContext.themeCandidates?.length || 0,
            integratedConnectionPaths: pkfkContext.connectionPaths?.length || 0,
            louvainDatasetSets: datasetSetAnalysis?.sets?.length || 0,
            louvainModularity: datasetSetAnalysis?.modularity || 0,
        },
        pkfkSummary: pkfkContext.summary || null,
        themeCandidates: (pkfkContext.themeCandidates || []).slice(0, CONFIG.TOP_SCENARIOS),
        connectionPaths: (pkfkContext.connectionPaths || []).slice(0, CONFIG.TOP_RELATIONS),
        datasetSetAnalysis,
        scenarios: scenarios.slice(0, CONFIG.TOP_SCENARIOS),
        relations: relations.slice(0, CONFIG.TOP_RELATIONS)
    };

    try {
        const tmpPath = outputPath + '.tmp';
        fs.writeFileSync(tmpPath, JSON.stringify(result, null, 2), 'utf-8');
        fs.renameSync(tmpPath, outputPath);
    } catch (err) {
        logger.error({ outputPath, errorMessage: err.message }, 'JSON 결과 파일 저장 실패');
        return;
    }

    logger.info({
        outputPath
    }, 'JSON 결과 파일 저장 완료');
}

// Markdown 결과 파일을 저장하는 함수
function writeMd(scenarios, relations, outputPath, pkfkContext = {}, datasetSetAnalysis = null) {
    const lines = [];

    lines.push('# 데이터셋 사용 시나리오 분석 결과');
    lines.push(`> 생성일시: ${formatKstTimestamp()}`);
    lines.push('');
    lines.push(`- 전체 시나리오: **${scenarios.length}개** (Star: ${scenarios.filter(s => !s.isChain).length}개, Chain: ${scenarios.filter(s => s.isChain).length}개)`);
    lines.push(`- 전체 관계: **${relations.length}개**`);
    lines.push(`- HIGH 신뢰도 시나리오: **${scenarios.filter(scenario => scenario.confidence === 'HIGH').length}개**`);
    lines.push(`- SQL 검증 오류 시나리오: **${scenarios.filter(scenario => scenario.sqlError).length}개**`);
    lines.push(`- 통합 테마 후보: **${pkfkContext.themeCandidates?.length || 0}개**`);
    lines.push(`- 통합 연결 경로: **${pkfkContext.connectionPaths?.length || 0}개**`);
    lines.push(`- Louvain 데이터 세트 후보: **${datasetSetAnalysis?.sets?.length || 0}개** (modularity ${datasetSetAnalysis?.modularity || 0})`);
    lines.push('');
    lines.push('---');
    lines.push('');

    if ((datasetSetAnalysis?.sets || []).length > 0) {
        lines.push('## Louvain 기반 테마별 데이터 세트 후보');
        lines.push('');
        lines.push('| 세트ID | 테마명 | 데이터셋 수 | 관계 수 | 대표 키워드 | 주요 조인키 | 주요 카테고리 |');
        lines.push('|---|---|---:|---:|---|---|---|');
        datasetSetAnalysis.sets.slice(0, 20).forEach(set => {
            const keywords = (set.keywords || []).map(k => k.term).join(', ');
            const joinKeys = (set.joinKeys || []).map(k => `${k.joinKey}(${k.count})`).join(', ');
            const cats = (set.categories || []).map(c => `${c.cat}(${c.count})`).join(', ');
            lines.push(`| ${escapeMarkdownCell(set.setId)} | ${escapeMarkdownCell(set.themeName)} | ${set.datasetCount} | ${set.relationCount} | ${escapeMarkdownCell(keywords)} | ${escapeMarkdownCell(joinKeys)} | ${escapeMarkdownCell(cats)} |`);
        });
        lines.push('');
    }

    if ((pkfkContext.themeCandidates || []).length > 0) {
        lines.push('## PK/FK 그래프 기반 테마 데이터 세트 후보');
        lines.push('');
        lines.push('| 테마ID | 테마명 | 테이블 수 | 관계 수 | 허브 테이블 | 대표 조인키 |');
        lines.push('|---|---|---:|---:|---|---|');
        pkfkContext.themeCandidates.slice(0, 15).forEach(theme => {
            const hubs = (theme.hub_tables || []).map(t => `${t.svc_no} ${t.svc_nm}`).slice(0, 2).join(' / ');
            const keys = (theme.join_keys || []).map(k => `${k.field}(${k.count})`).join(', ');
            lines.push(`| ${escapeMarkdownCell(theme.theme_id)} | ${escapeMarkdownCell(theme.theme_name)} | ${theme.size} | ${theme.relation_count} | ${escapeMarkdownCell(hubs)} | ${escapeMarkdownCell(keys)} |`);
        });
        lines.push('');
    }

    if ((pkfkContext.connectionPaths || []).length > 0) {
        lines.push('## PK/FK 그래프 기반 대표 연결 경로');
        lines.push('');
        lines.push('| From | To | 홉 수 | 경로 |');
        lines.push('|---|---|---:|---|');
        pkfkContext.connectionPaths.slice(0, 20).forEach(p => {
            lines.push(`| ${escapeMarkdownCell(`${p.from} ${p.from_name}`)} | ${escapeMarkdownCell(`${p.to} ${p.to_name}`)} | ${p.hop_count} | ${escapeMarkdownCell((p.path || []).join(' -> '))} |`);
        });
        lines.push('');
    }

    for (const scenario of scenarios.slice(0, CONFIG.TOP_SCENARIOS)) {
        const chainTag = scenario.isChain ? ` 🔗 브릿지: \`${scenario.bridgeTable}\`` : '';
        const emptyTag = scenario.isEmpty ? ' ⚠️ (건수 0건)' : '';
        const errorTag = scenario.sqlError ? ' ❌ SQL 오류' : '';
        lines.push(`## ${scenario.id} — \`${scenario.joinKey}\` 기반 (${scenario.confidence}, ${scenario.score}점)${chainTag}${emptyTag}${errorTag}`);
        lines.push('');
        lines.push(`**참여 데이터셋** (${scenario.datasetCount}개): ${scenario.datasets.join(', ')}`);
        if (scenario.sqlError) {
            lines.push('');
            lines.push(`> SQL 검증 오류: ${escapeMarkdownCell(scenario.sqlError)}`);
        }
        lines.push('');
        lines.push('| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |');
        lines.push('|---|---|---|---|---|---|---|---|---|---|---|');

        for (const relation of scenario.relations) {
            const samples = relation.sampleMatches
                .slice(0, 2)
                .map(escapeMarkdownCell)
                .join(', ');

            lines.push(
                `| ${escapeMarkdownCell(relation.fromNm || relation.from)} ` +
                `| ${escapeMarkdownCell(relation.colFromDisplay)} ` +
                `| ${escapeMarkdownCell(relation.toNm || relation.to)} ` +
                `| ${escapeMarkdownCell(relation.colToDisplay)} ` +
                `| ${escapeMarkdownCell(relation.joinType)} ` +
                `| ${escapeMarkdownCell(relation.cardinality)} ` +
                `| ${relation.matched} ` +
                `| ${(relation.ratioA * 100).toFixed(0)}% ` +
                `| ${(relation.ratioB * 100).toFixed(0)}% ` +
                `| ${escapeMarkdownCell(relation.confidence)} ` +
                `| \`${samples}\` |`
            );
        }

        lines.push('');
        if (scenario.sql) {
            lines.push('```sql');
            lines.push(scenario.sql);
            lines.push('```');
        }
        lines.push('');
    }

    try {
        const tmpPath = outputPath + '.tmp';
        fs.writeFileSync(tmpPath, lines.join('\n'), 'utf-8');
        fs.renameSync(tmpPath, outputPath);
    } catch (err) {
        logger.error({ outputPath, errorMessage: err.message }, 'Markdown 결과 파일 저장 실패');
        return;
    }

    logger.info({
        outputPath
    }, 'Markdown 결과 파일 저장 완료');
}

// =============================================================================
// 8. 메인 실행
// =============================================================================

// 메인 실행 함수
async function main() {
    const opts = parseArgs();

    const samplesDir = opts.samples;
    const cachePath  = opts.cache;
    const jsonOut    = opts.json;
    const mdOut      = opts.md;
    const xlsxPath   = opts.xlsx;
    const pkfkPath   = opts.pkfk;
    const noJson     = opts.noJson;
    const noMd       = opts.noMd;
    const noXlsx     = opts.noXlsx;

    logger.info({
        samplesDir,
        cachePath,
        jsonOut: noJson ? '(생략)' : jsonOut,
        mdOut:   noMd   ? '(생략)' : mdOut,
        xlsxPath: noXlsx ? '(생략)' : xlsxPath,
        pkfkPath
    }, '데이터셋 사용 시나리오 분석을 시작합니다.');

    // 1. 데이터 로딩
    const tables = loadSampleTables(samplesDir);
    const meta = loadMetadata(cachePath);
    const pkfkContext = buildPkFkContext(loadPkFkAnalysis(pkfkPath));

    if (Object.keys(tables).length === 0) {
        logger.error({
            samplesDir
        }, '유효한 샘플 파일이 없습니다. 분석을 중단합니다.');

        process.exit(1);
    }

    // 2. Arquero 기반 컬럼 프로파일링
    logger.info('Arquero 기반 컬럼 프로파일링을 시작합니다.');
    const allProfiles = profileAllTables(tables);

    // 3. 쌍별 값 겹침 분석
    logger.info('데이터셋 쌍별 값 겹침 분석을 시작합니다.');
    const relations = buildPairRelations(allProfiles, meta);

    logger.info('Louvain 기반 테마별 데이터 세트 군집화를 시작합니다.');
    const datasetSetAnalysis = buildDatasetSets(relations, meta);
    logger.info({
        datasetSets: datasetSetAnalysis.sets.length,
        modularity: datasetSetAnalysis.modularity
    }, '테마별 데이터 세트 군집화 완료');

    // valueSet은 buildPairRelations 에서만 사용하므로 이후 GC 수거를 위해 참조를 끊는다.
    for (const colProfiles of Object.values(allProfiles)) {
        for (const p of Object.values(colProfiles)) delete p.valueSet;
    }

    // 4. 시나리오 클러스터링
    logger.info('JOIN 키 기반 시나리오 클러스터링을 시작합니다.');
    const starScenarios = clusterByJoinKey(relations, meta);

    logger.info('브릿지 테이블 기반 체인 시나리오 도출을 시작합니다.');
    const chainScenarios = buildChainScenarios(starScenarios, relations, meta);

    const scenarios = [...starScenarios, ...chainScenarios]
        .sort((a, b) => b.score - a.score || b.datasetCount - a.datasetCount);

    // 5. 결과 출력
    logger.info({
        totalScenarios: scenarios.length,
        starScenarios: starScenarios.length,
        chainScenarios: chainScenarios.length,
        highConfidence: scenarios.filter(scenario => scenario.confidence === 'HIGH').length,
        totalRelations: relations.length
    }, '분석 완료. 상위 시나리오 요약');

    scenarios.slice(0, 10).forEach((scenario, index) => {
        logger.info({
            rank: index + 1,
            id: scenario.id,
            joinKey: scenario.joinKey,
            datasetCount: scenario.datasetCount,
            score: scenario.score,
            confidence: scenario.confidence
        }, '시나리오');
    });

    // 6. DB 검증 — SQL 결과 0건인 시나리오에 isEmpty 플래그 부착
    const dbPath = path.join(__dirname, 'foodsafety.db');
    if (fs.existsSync(dbPath)) {
        try {
            const Database = require('better-sqlite3');
            const db = new Database(dbPath, { readonly: true });
            let emptyCount = 0;
            let sqlErrorCount = 0;
            for (const scenario of scenarios) {
                if (!scenario.sql) continue;
                try {
                    const rows = db.prepare(scenario.sql).all();
                    scenario.isEmpty = rows.length === 0;
                    scenario.sqlError = '';
                    if (scenario.isEmpty) emptyCount++;
                } catch (err) {
                    scenario.isEmpty = null;
                    scenario.sqlError = err.message;
                    sqlErrorCount++;
                }
            }
            db.close();
            logger.info({ emptyCount, sqlErrorCount }, 'DB 검증 완료 — 0건/SQL 오류 시나리오 표시 예정');
        } catch (err) {
            logger.warn({ errorMessage: err.message }, 'DB 검증 생략 (better-sqlite3 로드 실패)');
        }
    }

    // 7. 결과 파일 저장
    if (!noJson) writeJson(scenarios, relations, jsonOut, pkfkContext, datasetSetAnalysis);
    if (!noMd)   writeMd(scenarios, relations, mdOut, pkfkContext, datasetSetAnalysis);

    if (!noXlsx) {
        if (!fs.existsSync(xlsxPath)) {
            logger.warn({ xlsxPath }, 'xlsx 파일 없음 — Arquero 시트 갱신 생략');
        } else {
            try {
                const { updateArqueroSheet } = require('../crawler/excel_reporter');
                await updateArqueroSheet(scenarios, xlsxPath);
            } catch (err) {
                logger.warn({ errorMessage: err.message }, 'Arquero 시트 갱신 실패 (분석 결과는 정상 저장됨)');
            }
        }
    }

    logger.info({
        jsonOut: noJson ? '(생략)' : jsonOut,
        mdOut:   noMd   ? '(생략)' : mdOut,
        xlsxPath: noXlsx ? '(생략)' : xlsxPath,
    }, '전체 분석이 완료되었습니다.');
}

// 스크립트 실행 및 최상위 오류 처리
if (require.main === module) {
    main().catch(err => {
        logger.fatal({
            err
        }, '분석 중 심각한 오류가 발생했습니다.');

        process.exit(1);
    });
}

// =============================================================================
// exports
// =============================================================================

module.exports = {
    loadSampleTables,
    loadMetadata,
    profileTable,
    profileAllTables,
    buildPairRelations,
    clusterByJoinKey,
    buildChainScenarios,
    buildSqlHint,
    buildSqlHintFromPath,
    loadPkFkAnalysis,
    buildPkFkContext,
    normalizeKoreanSearchText,
    extractCommunityKeywords,
    buildRelationGraph,
    buildDatasetSets,
    writeJson,
    writeMd,
    // 유틸
    normalizeValue,
    normalizeColName,
    areSynonyms,
    isSimilarJoinKey,
    canonicalKey,
    computeOverlap,
    classifyJoin,
    findJoinCandidates
};
