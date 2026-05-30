/**
 * =============================================================================
 *   식품안전나라 Open API PK/FK 후보 분석기
 *   파일명: analyze_pk_fk.js
 *
 *   [수행 역할]
 *   1. 각 데이터셋의 필드 구조를 분석해 PK/FK 후보를 선정한다.
 *   2. 코드/번호/일련번호/식별자 계열 필드 중 중복이 없는 필드를 PK 후보로 선정한다.
 *   3. 단일 PK가 애매하면 2개 필드 조합으로 복합 PK 후보를 찾는다.
 *   4. 다른 테이블의 PK 후보와 같은 필드를 가진 경우 FK 후보로 선정한다.
 *      - 명칭(_NM), 주소, 전화번호, 일자, 내용 계열은 FK 후보에서 제외한다.
 *      - 양쪽 테이블 모두에서 식별자 역할인 필드만 FK 후보로 인정한다.
 *      - 샘플 데이터가 있는 경우 FK 값 포함률을 계산해 신뢰도에 반영한다.
 *      - 값 포함률이 낮은 후보는 제외한다.
 *      - 샘플 부족으로 검증되지 않은 후보는 기본적으로 ERD 제약조건에서 제외한다.
 *      - LCNS_NO, PRDLST_REPORT_NO 등 공통키는 대표 마스터 테이블 중심으로 연결한다.
 *   5. 결과 파일 3개를 생성한다.
 *      - foodsafety_key_candidates.json
 *      - foodsafety_key_candidates.md
 *      - foodsafety_keys_erd.sql
 *
 *   [두 가지 실행 방식]
 *   A. 독립 CLI 실행 — 캐시 파일과 samples 폴더를 직접 읽어 처리
 *        node analyze_pk_fk.js
 *        node analyze_pk_fk.js --cache crawl_cache.json --samples ./samples
 *
 *   B. import_to_sqlite.js 연동 — 이미 로드된 datasets/recordsMap을 받아 처리
 *        const { analyze, writeReports } = require('./analyze_pk_fk');
 *        const analysis = analyze(datasets, recordsMap);   // 파일 재읽기 없음
 *        writeReports(analysis, { json, md, sql });        // 결과 파일 생성
 * =============================================================================
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// =============================================================================
// 섹션 0. 기본 설정
// =============================================================================

const DEFAULT_CACHE   = 'crawl_cache.json';
const DEFAULT_SAMPLES = 'samples';
const DEFAULT_JSON    = 'foodsafety_key_candidates.json';
const DEFAULT_MD      = 'foodsafety_key_candidates.md';
const DEFAULT_SQL     = 'foodsafety_keys_erd.sql';

const MAX_COMPOSITE_KEY_SIZE = 2;

// FK 후보 정제 기준
// ── 변경 1/2 ──────────────────────────────────────────────────────────────
// 샘플 데이터가 5~10건 수준이면 70% 기준에서 우연히 탈락하는 진짜 FK가 많음.
// 50% / 70% 로 완화해 확정 FK 후보가 충분히 확보되도록 조정.
const FK_MIN_INCLUSION_RATIO = 0.50;       // 50% 이상이면 확정 FK 후보
const FK_STRONG_INCLUSION_RATIO = 0.70;    // 70% 이상이면 HIGH 가산
// ─────────────────────────────────────────────────────────────────────────
const FK_ALLOW_UNCHECKED = true;           // 샘플 부족 미검증 FK도 추정 후보로 보존
const FK_MAX_PER_FROM_FIELD = 5;           // 동일 From Table.Field 기준 최대 후보 수

// 추정 FK 후보 기준
// - 샘플 5건 수준에서는 실제 관계가 있어도 값이 우연히 안 겹쳐 0%가 나올 수 있음
// - 따라서 확정 FK와 추정 FK를 분리한다.
const FK_SUGGESTED_MIN_SCORE = 65;         // 이 점수 이상이면 추정 후보로 보존
const FK_INCLUDE_SUGGESTED_IN_SQL = true;  // DBeaver ERD 표시용 FK 제약조건에 추정 후보도 포함

/**
 * 방향 B — 업무 명칭 기반 부모-자식 관계 규칙
 *
 * 목적:
 * - 샘플 5건 수준에서 값 포함률이 0%로 나와도, 데이터셋명으로 보아
 *   명백히 부모-자식 관계인 경우 CONFIRMED로 승격한다.
 * - 각 규칙은 { childKeywords, parentKeywords } 구조이며,
 *   from(자식) 테이블명에 childKeywords 중 하나가 포함되고
 *   to(부모) 테이블명에 parentKeywords 중 하나가 포함되면 매칭된다.
 * - 매칭된 경우 값 포함률이 낮아도(0% 포함) CONFIRMED로 승격하고
 *   점수에 DOMAIN_CONFIRMED_BONUS를 가산한다.
 */
const FK_DOMAIN_PARENT_CHILD_RULES = [
    // 폐업정보 → 영업(인허가) 마스터
    { childKeywords: ['폐업정보', '폐업'], parentKeywords: ['영업정보', '허가정보', '신고대장', '영업신고대장', '허가대장', '인허가대장', '인허가 업소', '식품접객업정보', '식품제조가공업정보', '위생용품영업정보', '가공업허가정보'] },
    // 인허가 변경 → 영업(인허가) 마스터
    { childKeywords: ['인허가 변경', '변경 정보', '변경정보'], parentKeywords: ['영업정보', '허가정보', '신고대장', '영업신고대장', '허가대장', '인허가대장', '인허가 업소', '식품접객업정보', '식품제조가공업정보'] },
    // 인허가 대장(개별업종) → 인허가 업소 정보(통합마스터)
    { childKeywords: ['인허가 대장', '인허가대장'], parentKeywords: ['인허가 업소 정보'] },
    // 품목제조보고(원재료) → 품목제조보고(마스터)
    { childKeywords: ['품목제조보고(원재료)', '품목제조신고(원재료)', '품목제조보고(원재료)', '축산물품목제조보고(원재료)'], parentKeywords: ['품목제조보고', '품목제조 신고사항', '품목제조정보'] },
    // 생산실적 → 품목제조보고 / 영업(인허가) 마스터
    { childKeywords: ['생산실적'], parentKeywords: ['품목제조보고', '품목제조정보', '영업정보', '허가정보'] },
    // HACCP 지정 → 영업(인허가) 마스터
    { childKeywords: ['HACCP 지정', 'HACCP 적용'], parentKeywords: ['영업정보', '허가정보', '인허가 업소'] },
    // GMP 지정 → 영업(인허가) 마스터
    { childKeywords: ['GMP 지정'], parentKeywords: ['영업정보', '허가정보', '인허가 업소'] },
    // 위생등급 → 영업(인허가) 마스터
    { childKeywords: ['위생등급', '위생관리등급'], parentKeywords: ['영업정보', '식품접객업정보'] },
    // 행정처분 → 영업(인허가) 마스터
    { childKeywords: ['행정처분결과'], parentKeywords: ['영업정보', '허가정보', '신고대장', '인허가 업소', '식품접객업정보', '식품제조가공업정보', '수입판매업정보'] },
    // 이력추적 등록 / 검사부적합 → 품목제조보고
    { childKeywords: ['이력추적관리 등록', '검사부적합', '수거검사'], parentKeywords: ['품목제조보고', '품목제조정보'] },
    // 회수·판매중지 → 품목제조보고 / 영업(인허가) 마스터
    { childKeywords: ['회수.판매중지', '회수·판매중지', '생산중단'], parentKeywords: ['품목제조보고', '품목제조정보', '영업정보', '허가정보'] },
    // 바코드연계 → 품목제조보고
    { childKeywords: ['바코드연계'], parentKeywords: ['품목제조보고', '품목제조정보'] },
    // 교육내역 / 등급평가 → 영업(인허가) 마스터
    { childKeywords: ['교육내역', '등급평가'], parentKeywords: ['영업정보', '식품접객업정보', '허가정보'] },
    // GIS 코드 → 영업(인허가) 마스터
    { childKeywords: ['GIS 코드', 'GIS코드'], parentKeywords: ['영업정보', '허가정보', '인허가 업소'] },
    // 기능성 원료인정 → 품목제조 신고(건강기능식품)
    { childKeywords: ['기능성 원료인정'], parentKeywords: ['품목제조 신고사항'] },
    // 개별기준규격 / 공통기준규격 → 시험항목코드 / 품목유형코드
    { childKeywords: ['기준규격', '기준종류', '기준제외'], parentKeywords: ['시험항목코드', '품목유형코드', '품목제조정보'] },
    // 부적합 → 영업(인허가) 마스터
    { childKeywords: ['부적합'], parentKeywords: ['영업정보', '허가정보', '신고대장', '인허가 업소'] },
    // 공전(기구/건강기능식품) → 시험항목코드
    { childKeywords: ['공전'], parentKeywords: ['시험항목코드'] },
    // 수입 신고대장 → 수입판매업정보
    { childKeywords: ['수입식품등영업신고대장', '위생용품수입업영업신고대장'], parentKeywords: ['수입판매업정보', '위생용품영업정보'] },
    // 우수수입업소 → 수입판매업정보
    { childKeywords: ['우수수입업소'], parentKeywords: ['수입판매업정보'] },
    // 어린이 기호식품 인증 → 품목제조보고 / 영업(인허가) 마스터
    { childKeywords: ['기호식품 품질인증'], parentKeywords: ['품목제조보고', '품목제조정보', '영업정보', '허가정보'] }
];

const FK_DOMAIN_CONFIRMED_BONUS = 25; // 업무 명칭 규칙 매칭 시 CONFIRMED 승격 점수 가산

/**
 * 데이터셋명(from)이 자식 키워드를 포함하고,
 * 데이터셋명(to)이 부모 키워드를 포함하면 true를 반환한다.
 */
function matchesDomainParentChildRule(fromSvcNm, toSvcNm) {
    for (const rule of FK_DOMAIN_PARENT_CHILD_RULES) {
        const childMatch  = rule.childKeywords.some(kw  => fromSvcNm.includes(kw));
        const parentMatch = rule.parentKeywords.some(kw => toSvcNm.includes(kw));
        if (childMatch && parentMatch) return true;
    }
    return false;
}

/**
 * 공통키별 대표 마스터 테이블 후보.
 *
 * 목적:
 * - LCNS_NO, PRDLST_REPORT_NO처럼 여러 테이블에 반복되는 공통키가
 *   모든 테이블끼리 N:N으로 연결되는 문제를 줄인다.
 * - 아래 목록에 존재하는 테이블이 있으면 해당 테이블을 우선 부모 후보로 본다.
 * - 실제 데이터 확인 후 프로젝트 기준에 맞게 조정 가능하다.
 */
const MASTER_TABLE_BY_KEY = {
    LCNS_NO: [
        'I2500', // 인허가 업소 정보
        'I1200', // 식품접객업정보
        'I1220', // 식품제조가공업정보
        'I1260', // 식품등수입판매업정보
        'I1300', // 축산물 가공업허가정보
        'I2713'  // 위생용품영업정보
    ],
    BSSH_NO: [
        'I2500'
    ],
    PRDLST_REPORT_NO: [
        'I1250', // 식품(첨가물)품목제조보고
        'I0030', // 건강기능식품 품목제조 신고사항 현황
        'I1310', // 축산물 품목제조정보
        'I2711'  // 위생용품품목제조보고
    ],
    PRDLST_CD: [
        'I2510', // 품목유형코드
        'I0950'  // 식품첨가물공전
    ],
    TESTITM_CD: [
        'I2530'  // 시험항목코드
    ],
    RAWMTRL_CD: [
        'I2520'  // 식품원재료코드
    ],
    FOOD_LAWORD_CD: [
        'I2540'  // 법령코드
    ],
    DSPS_STDR_CD: [
        'I2550'  // 처분기준코드
    ],
    BRCD_NO: [
        'I2570'  // 유통바코드
    ],
    BARCODE_NO: [
        'I2570'
    ],
    BRCDNO: [
        'I2570'
    ]
};

function log(level, msg) {
    const ts = new Date().toTimeString().slice(0, 8);
    const prefix = { INFO: '[INFO] ', WARN: '[WARN] ', ERR: '[ERR ] ', STEP: '\n[STEP]' };
    console.log(`${prefix[level] || '[LOG] '} ${ts}  ${msg}`);
}

function parseArgs(argv) {
    const args = {
        cache:  DEFAULT_CACHE,
        samples: DEFAULT_SAMPLES,
        json:   DEFAULT_JSON,
        md:     DEFAULT_MD,
        sql:    DEFAULT_SQL,
        noSql:  false,
        noMd:   false,
        noJson: false
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if      (arg === '--cache'   && argv[i+1]) args.cache   = argv[++i];
        else if (arg === '--samples' && argv[i+1]) args.samples = argv[++i];
        else if (arg === '--json'    && argv[i+1]) args.json    = argv[++i];
        else if (arg === '--md'      && argv[i+1]) args.md      = argv[++i];
        else if (arg === '--sql'     && argv[i+1]) args.sql     = argv[++i];
        else if (arg === '--no-json') args.noJson = true;
        else if (arg === '--no-md')   args.noMd   = true;
        else if (arg === '--no-sql')  args.noSql  = true;
        else if (arg === '-h' || arg === '--help') { printHelp(); process.exit(0); }
        else log('WARN', `알 수 없는 인자 무시: ${arg}`);
    }
    return args;
}

function printHelp() {
    console.log(`
식품안전나라 PK/FK 후보 분석기

Usage:
  node analyze_pk_fk.js [options]

Options:
  --cache <path>      crawl_cache.json 경로             기본값: ${DEFAULT_CACHE}
  --samples <path>    samples 폴더 경로                 기본값: ${DEFAULT_SAMPLES}
  --json <path>       JSON 결과 파일 경로               기본값: ${DEFAULT_JSON}
  --md <path>         Markdown 결과 파일 경로           기본값: ${DEFAULT_MD}
  --sql <path>        ERD SQL 결과 파일 경로            기본값: ${DEFAULT_SQL}
  --no-json           JSON 결과 생성 생략
  --no-md             Markdown 결과 생성 생략
  --no-sql            ERD SQL 생성 생략
  -h, --help          도움말 출력

Examples:
  node analyze_pk_fk.js
  node analyze_pk_fk.js --cache crawl_cache_149_169.json
  node analyze_pk_fk.js --samples ./samples --sql foodsafety_keys_erd.sql
`);
}

// =============================================================================
// 섹션 1. 공통 유틸
// =============================================================================

function quoteIdent(identifier) {
    return `"${String(identifier).replace(/"/g, '""')}"`;
}

function sanitizeSqlComment(text) {
    return String(text || '').replace(/\r?\n/g, ' ').replace(/--/g, '－').trim();
}

function normalizeValue(value) {
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value).trim();
}

function safeFileWrite(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    log('INFO', `파일 생성 완료: ${filePath}`);
}

function normalizeSvcNo(value) {
    return String(value || '').trim().toUpperCase();
}

function getMasterTablesForKey(fieldName, existingSvcNoSet = null) {
    const key = String(fieldName || '').trim().toUpperCase();
    const masters = MASTER_TABLE_BY_KEY[key] || [];
    if (!existingSvcNoSet) return masters;
    return masters.filter(svcNo => existingSvcNoSet.has(normalizeSvcNo(svcNo)));
}

function isMasterTableForKey(svcNo, fieldName, existingSvcNoSet = null) {
    const masters = getMasterTablesForKey(fieldName, existingSvcNoSet).map(normalizeSvcNo);
    return masters.includes(normalizeSvcNo(svcNo));
}

function hasMasterRule(fieldName) {
    return Object.prototype.hasOwnProperty.call(MASTER_TABLE_BY_KEY, String(fieldName || '').trim().toUpperCase());
}

function tableNameHasAny(tableName, keywords) {
    const text = String(tableName || '');
    return keywords.some(keyword => text.includes(keyword));
}

/**
 * 동일 공통키 안에서 도메인이 완전히 다른 테이블끼리 무분별하게 붙는 것을 줄인다.
 * 예: 건강기능식품 ↔ 축산물 ↔ 위생용품 ↔ 수입식품 등은 같은 LCNS_NO라도
 *     우선 같은 도메인끼리 연결하는 것이 더 타당하다.
 */
function getDomainScore(fromTableName, toTableName) {
    const domainGroups = [
        ['건강기능식품', '건기식'],
        ['축산물'],
        ['수입식품', '수입식품등'],
        ['위생용품'],
        ['식품접객', '음식점', '모범음식점', '푸드트럭'],
        ['식품제조', '식품첨가물', '품목제조', '즉석판매제조'],
        ['집단급식소'],
        ['기구', '용기', '포장'],
        ['HACCP'],
        ['행정처분'],
        ['폐업'],
        ['변경']
    ];

    let score = 0;
    for (const group of domainGroups) {
        if (tableNameHasAny(fromTableName, group) && tableNameHasAny(toTableName, group)) {
            score += 10;
        }
    }
    return score;
}

// =============================================================================
// 섹션 2. 샘플 JSON 파싱
// =============================================================================

function parseSampleJson(jsonPath, svcNo) {
    let obj;
    try {
        const raw = fs.readFileSync(jsonPath, 'utf-8');
        obj = JSON.parse(raw);
    } catch (err) {
        log('WARN', `JSON 파일 읽기 실패: ${jsonPath} → ${err.message}`);
        return [];
    }

    const isRecordArray = arr =>
        Array.isArray(arr) && arr.every(r => r && typeof r === 'object' && !Array.isArray(r));

    if (obj && typeof obj === 'object' && !Array.isArray(obj) &&
        Object.prototype.hasOwnProperty.call(obj, svcNo)) {
        const inner = obj[svcNo];
        if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
            if (isRecordArray(inner.row))                   return inner.row;
            if (inner.row && typeof inner.row === 'object') return [inner.row];
        }
        if (isRecordArray(inner)) return inner;
    }

    if (obj && typeof obj === 'object' && !Array.isArray(obj) &&
        Object.prototype.hasOwnProperty.call(obj, 'row')) {
        if (isRecordArray(obj.row))                 return obj.row;
        if (obj.row && typeof obj.row === 'object') return [obj.row];
    }

    if (isRecordArray(obj)) return obj;

    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        for (const val of Object.values(obj)) {
            if (isRecordArray(val) && val.length > 0) return val;
        }
    }

    return [];
}

// =============================================================================
// 섹션 3. 필드 성격 판단 패턴
// =============================================================================

const STRONG_PK_FIELD_PATTERNS = [/_SEQ$/i, /SEQ$/i, /_SN$/i, /_ID$/i, /_IDX$/i, /_NO$/i, /NO$/i];

const STRONG_PK_KOR_PATTERNS = [
    /일련번호$/, /순번$/, /고유번호$/, /관리번호$/, /지정번호$/,
    /승인번호$/, /인정번호$/, /접수번호$/, /문서번호$/,
    /기준규격일련번호$/, /회수폐기일련번호$/
];

const CODE_FIELD_PATTERNS = [/_CD$/i, /_CODE$/i, /_CLCD$/i, /_DVS_CD$/i, /_TYPE_CD$/i, /_INSTTCD$/i];

const CODE_KOR_PATTERNS = [/코드$/, /분류코드$/, /구분코드$/, /유형코드$/, /기관코드$/, /시험항목코드$/, /품목코드$/, /단위코드$/];

const BAD_PK_FIELD_PATTERNS = [
    /_NM$/i, /_NAME$/i, /ADDR$/i, /_ADDR$/i, /ADDRESS$/i,
    /_CN$/i, /_CONT$/i, /_CONTENT$/i, /_DESC$/i, /_MEMO$/i,
    /_PRVNS$/i, /_MTHD$/i, /_TELNO$/i, /TELNO$/i, /PHONE$/i,
    /FAX$/i, /_DT$/i, /_YMD$/i, /DTM$/i, /DATE$/i
];

const BAD_PK_KOR_PATTERNS = [
    /명$/, /이름$/, /업소명$/, /기관명$/, /제품명$/, /품목명$/,
    /대표자$/, /대표자명$/, /주소$/, /소재지$/, /내용$/, /사유$/,
    /비고$/, /메모$/, /방법$/, /전화번호$/, /연락처$/, /팩스$/,
    /일자$/, /날짜$/, /년월일$/
];

const KNOWN_RELATION_KEYS = [
    'LCNS_NO',
    'BSSH_NO',
    'PRDLST_REPORT_NO',
    'PRDLST_CD',
    'BARCODE_NO',
    'BRCD_NO',
    'BRCDNO',
    'RAWMTRL_CD',
    'FOOD_LAWORD_CD',
    'DSPS_STDR_CD',
    'HACCP_NO',
    'CRTFC_NO',
    'TESTITM_CD',
    'UNIT_CD',
    'INDUTY_CD'
];

const EXCLUDED_FK_FIELD_PATTERNS = [
    /_NM$/i,
    /_NAME$/i,
    /_CD_NM$/i,
    /ADDR$/i,
    /_ADDR$/i,
    /ADDRESS$/i,
    /TELNO$/i,
    /TEL_NO$/i,
    /PHONE$/i,
    /MOBILE$/i,
    /FAX$/i,
    /_DT$/i,
    /_YMD$/i,
    /DTM$/i,
    /DATE$/i,
    /_CN$/i,
    /_CONT$/i,
    /_CONTENT$/i,
    /_DESC$/i,
    /_MEMO$/i,
    /_MTHD$/i,
    /_PRVNS$/i
];

const SYSTEM_SAMPLE_FIELDS = new Set([
    'ROW_NUM',
    'ROWNUM',
    'RNUM',
    'RESULT',
    'RESULT_CODE',
    'RESULT_MSG',
    'MSG',
    'CODE',
    'TOTAL_COUNT',
    'TOTALCOUNT',
    'PAGE_NO',
    'PAGENO',
    'NUM_OF_ROWS',
    'NUMOFROWS'
]);

// =============================================================================
// 섹션 4. 필드 성격 판단 함수
// =============================================================================

function matchesAny(value, patterns) { return patterns.some(p => p.test(value)); }

function getFieldName(field) { return String(field.field || '').trim(); }
function getKorName(field)   { return String(field.kor_nm || '').trim(); }

function isBadPkField(field) {
    return matchesAny(getFieldName(field), BAD_PK_FIELD_PATTERNS) ||
           matchesAny(getKorName(field),   BAD_PK_KOR_PATTERNS);
}

function isStrongIdentifierField(field) {
    return matchesAny(getFieldName(field), STRONG_PK_FIELD_PATTERNS) ||
           matchesAny(getKorName(field),   STRONG_PK_KOR_PATTERNS);
}

function isCodeField(field) {
    return matchesAny(getFieldName(field), CODE_FIELD_PATTERNS) ||
           matchesAny(getKorName(field),   CODE_KOR_PATTERNS);
}

function isKnownRelationKey(fieldName) {
    return KNOWN_RELATION_KEYS.includes(String(fieldName || '').trim().toUpperCase());
}

function isExcludedFkField(fieldName) {
    return matchesAny(String(fieldName || ''), EXCLUDED_FK_FIELD_PATTERNS);
}

function isNameField(fieldName) {
    return isExcludedFkField(fieldName);
}

// =============================================================================
// 섹션 5. 유일성/포함률 통계
// =============================================================================

function getUniquenessStats(records, fields) {
    if (!Array.isArray(records) || records.length === 0) {
        return {
            record_count: 0,
            non_empty_count: 0,
            unique_count: 0,
            duplicate_count: 0,
            uniqueness_ratio: 0,
            has_empty: false,
            is_unique: false
        };
    }

    const values = records.map(rec =>
        fields.map(f => normalizeValue(rec ? rec[f] : '')).join('||')
    );

    const nonEmpty = values.filter(v =>
        v.split('||').every(part => String(part || '').trim() !== '')
    );

    const unique = new Set(nonEmpty);

    return {
        record_count:     records.length,
        non_empty_count:  nonEmpty.length,
        unique_count:     unique.size,
        duplicate_count:  nonEmpty.length - unique.size,
        uniqueness_ratio: nonEmpty.length > 0 ? unique.size / nonEmpty.length : 0,
        has_empty:        nonEmpty.length < records.length,
        is_unique:        nonEmpty.length === records.length && unique.size === records.length
    };
}

function getInclusionStats(fromRecords, toRecords, fromField, toField) {
    const fromValues = new Set(
        (fromRecords || [])
            .map(r => normalizeValue(r ? r[fromField] : ''))
            .filter(v => v !== '')
    );

    const toValues = new Set(
        (toRecords || [])
            .map(r => normalizeValue(r ? r[toField] : ''))
            .filter(v => v !== '')
    );

    if (fromValues.size === 0 || toValues.size === 0) {
        return {
            from_unique_count: fromValues.size,
            to_unique_count:   toValues.size,
            matched_count:     0,
            inclusion_ratio:   0,
            checked:           false
        };
    }

    let matched = 0;
    for (const value of fromValues) {
        if (toValues.has(value)) matched++;
    }

    return {
        from_unique_count: fromValues.size,
        to_unique_count:   toValues.size,
        matched_count:     matched,
        inclusion_ratio:   matched / fromValues.size,
        checked:           true
    };
}

// =============================================================================
// 섹션 6. PK 후보 점수 계산
// =============================================================================

function calculateIdentifierScore(field, records) {
    const fname = getFieldName(field);
    const upper = fname.toUpperCase();
    const kor   = getKorName(field);
    let score   = 0;
    const reasons = [];

    if (isBadPkField(field)) {
        score -= 70;
        reasons.push('명칭/주소/내용/일자 등 설명성 필드로 PK 부적합');
    }

    const strongIdMatch = isStrongIdentifierField(field);
    if (strongIdMatch) { score += 50; reasons.push('번호/일련번호/식별자 계열 필드'); }

    if (isCodeField(field))        { score += 35; reasons.push('코드 계열 필드'); }
    if (isKnownRelationKey(upper)) { score += 25; reasons.push('식품안전나라 공통 관계키 후보'); }

    if (/^ID$/i.test(fname) || /_ID$/i.test(fname)) {
        score += 35; reasons.push('ID 계열 필드');
    }

    if (!strongIdMatch && /SEQ|_SN|_NO|NO$/i.test(fname)) {
        score += 25; reasons.push('SEQ/NO/SN 패턴');
    }

    if (/지정번호|승인번호|인정번호|일련번호|순번|고유번호|관리번호/.test(kor)) {
        score += 35; reasons.push('한글명이 고유 식별번호 성격');
    }

    const stats = getUniquenessStats(records, [fname]);

    if (records.length > 0) {
        if (stats.is_unique) {
            score += 60;
            reasons.push(`샘플 ${records.length}건 기준 중복 없음`);
        } else {
            score -= 60;
            reasons.push(`샘플 기준 중복 또는 빈값 존재: unique ${stats.unique_count}/${stats.record_count}`);
        }
        if (stats.has_empty) { score -= 20; reasons.push('샘플에 빈값 존재'); }
    } else {
        score -= 5;
        reasons.push('샘플 데이터 없음: 필드명/한글명 기준 추론');
    }

    return { field: fname, kor_nm: kor, score, reasons, stats };
}

function getConfidence(score) {
    if (score >= 85) return 'HIGH';
    if (score >= 65) return 'MEDIUM';
    return 'LOW';
}

function makeCombinations(arr, size) {
    const result = [];
    function helper(start, combo) {
        if (combo.length === size) { result.push([...combo]); return; }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]); helper(i + 1, combo); combo.pop();
        }
    }
    helper(0, []);
    return result;
}

// =============================================================================
// 섹션 7. PK 후보 분석
// =============================================================================

function analyzePkCandidatesForTable(ds, records) {
    const fields      = Array.isArray(ds.fields) ? ds.fields : [];
    const validFields = fields.filter(f => getFieldName(f));
    const singleCandidates = [];

    for (const field of validFields) {
        const scoreResult = calculateIdentifierScore(field, records);
        if (scoreResult.score >= 50) {
            singleCandidates.push({
                fields:    [getFieldName(field)],
                kor_names: [getKorName(field)],
                score:     Math.min(scoreResult.score, 100),
                type:      'single',
                confidence: getConfidence(scoreResult.score),
                unique_check: scoreResult.stats,
                reason:    scoreResult.reasons.join(' / ')
            });
        }
    }
    singleCandidates.sort((a, b) => b.score - a.score);

    const compositeBase = validFields.filter(f =>
        !isBadPkField(f) && (
            isStrongIdentifierField(f) ||
            isCodeField(f) ||
            isKnownRelationKey(getFieldName(f).toUpperCase())
        )
    ).map(getFieldName);

    const compositeCandidates = [];

    if (records.length > 0 && compositeBase.length >= 2) {
        for (let size = 2; size <= MAX_COMPOSITE_KEY_SIZE; size++) {
            for (const combo of makeCombinations(compositeBase, size)) {
                const stats = getUniquenessStats(records, combo);
                if (!stats.is_unique) continue;

                const korNames = combo.map(fname => {
                    const f = validFields.find(f => getFieldName(f) === fname);
                    return f ? getKorName(f) : fname;
                });

                let score = 75;
                if (combo.some(f => isKnownRelationKey(f.toUpperCase()))) score += 10;
                if (combo.some(f => /SEQ|_NO|NO$/i.test(f)))              score += 10;

                compositeCandidates.push({
                    fields: combo,
                    kor_names: korNames,
                    score: Math.min(score, 95),
                    type: 'composite',
                    confidence: getConfidence(score),
                    unique_check: stats,
                    reason: `복합키 ${combo.join(' + ')} 샘플 기준 중복 없음`
                });
            }
        }
        compositeCandidates.sort((a, b) => b.score - a.score);
    }

    return [...singleCandidates, ...compositeCandidates]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

// =============================================================================
// 섹션 8. FK 후보 분석 — 정제 반영 버전
// =============================================================================

function createTableLookup(tableAnalyses) {
    const map = new Map();
    for (const table of tableAnalyses) {
        map.set(normalizeSvcNo(table.svc_no), table);
    }
    return map;
}

function buildPkFieldIndex(tableAnalyses) {
    const pkFieldIndex = new Map();

    for (const table of tableAnalyses) {
        const bestPk = table.pk_candidates[0];
        if (!bestPk) continue;

        // 복합 PK는 단일 필드 FK 추론에서 제외한다.
        if (bestPk.fields.length !== 1) continue;

        // ── 변경 2/3 ──────────────────────────────────────────────────────────
        // 기존: PK 신뢰도 LOW인 테이블은 부모 후보에서 완전 제외
        // 변경: MEDIUM 이상 허용 → LOW만 제외, MEDIUM/HIGH는 모두 부모 후보에 포함
        // 이유: LOW 제외로 인해 실제 관계가 있는 테이블이 부모 후보 풀에서 빠지는 문제 완화
        if (bestPk.confidence === 'LOW') continue;
        // ─────────────────────────────────────────────────────────────────────

        const pkField = bestPk.fields[0].toUpperCase();
        if (!pkFieldIndex.has(pkField)) pkFieldIndex.set(pkField, []);
        pkFieldIndex.get(pkField).push({
            svc_no: table.svc_no,
            svc_nm: table.svc_nm,
            pk: bestPk
        });
    }

    return pkFieldIndex;
}

function pickTargetTablesByMasterRule(fieldName, targets, existingSvcNoSet) {
    const upperField = String(fieldName || '').trim().toUpperCase();
    if (!hasMasterRule(upperField)) return targets;

    const masters = getMasterTablesForKey(upperField, existingSvcNoSet).map(normalizeSvcNo);
    if (masters.length === 0) return targets;

    const masterTargets = targets.filter(t => masters.includes(normalizeSvcNo(t.svc_no)));

    // 대표 마스터 테이블이 실제 분석 대상에 있으면 그 테이블만 부모 후보로 사용한다.
    // 없으면 기존 targets를 유지한다.
    return masterTargets.length > 0 ? masterTargets : targets;
}

function shouldSkipByMasterRule(fromSvcNo, fieldName, existingSvcNoSet) {
    const upperField = String(fieldName || '').trim().toUpperCase();
    if (!hasMasterRule(upperField)) return false;

    // 대표 마스터 테이블은 부모 역할로 보는 것이 자연스럽다.
    // 따라서 자기 자신이 해당 키의 대표 마스터면 다른 마스터/주변 테이블을 참조하는 FK 생성을 막는다.
    return isMasterTableForKey(fromSvcNo, upperField, existingSvcNoSet);
}

function scoreFkCandidate({ field, target, fromSvcNm, fromRecords, toRecords, fieldName }) {
    let score = 45;
    const reasons = [];

    score += target.pk.score * 0.25;
    reasons.push(`대상 테이블 ${target.svc_no}의 PK 후보(${target.pk.confidence})와 동일 필드`);

    const upperField = fieldName.toUpperCase();
    if (isKnownRelationKey(upperField)) { score += 18; reasons.push('공통 관계키 목록에 포함'); }
    if (isCodeField(field))             { score += 10; reasons.push('코드 계열 필드'); }

    if (hasMasterRule(upperField)) {
        score += 15;
        reasons.push('대표 마스터 테이블 규칙 적용');
    }

    const domainScore = getDomainScore(fromSvcNm, target.svc_nm);
    if (domainScore > 0) {
        score += domainScore;
        reasons.push(`데이터셋명 도메인 유사성 +${domainScore}`);
    }

    const inclusion = getInclusionStats(fromRecords, toRecords, fieldName, target.pk.fields[0]);
    let relationType = 'SUGGESTED';

    // ── 방향 B: 업무 명칭 기반 부모-자식 관계 규칙 ──────────────────────────
    // 데이터셋명으로 보아 명백히 부모-자식 관계인 경우,
    // 값 포함률이 낮거나(0% 포함) 미검증이어도 CONFIRMED로 승격한다.
    // 샘플 5건으로는 실제 FK가 있어도 포함률 0%가 나오는 것이 정상이기 때문이다.
    const domainConfirmed = matchesDomainParentChildRule(fromSvcNm, target.svc_nm);
    if (domainConfirmed) {
        score += FK_DOMAIN_CONFIRMED_BONUS;
        relationType = 'CONFIRMED';
        reasons.push(`업무 명칭 규칙: "${fromSvcNm}" → "${target.svc_nm}" 부모-자식 관계 확인`);
    }
    // ─────────────────────────────────────────────────────────────────────────

    if (inclusion.checked) {
        const pct = (inclusion.inclusion_ratio * 100).toFixed(1);

        if (inclusion.inclusion_ratio >= FK_STRONG_INCLUSION_RATIO) {
            score += 30;
            relationType = 'CONFIRMED';
            reasons.push(`값 포함률 ${pct}%`);
        } else if (inclusion.inclusion_ratio >= FK_MIN_INCLUSION_RATIO) {
            score += 15;
            relationType = 'CONFIRMED';
            reasons.push(`값 포함률 ${pct}%`);
        } else {
            // 샘플 수가 적을 경우 0%라도 업무상 관계일 수 있으므로 즉시 제외하지 않고 처리한다.
            // 단, 업무 명칭 규칙으로 이미 CONFIRMED 승격된 경우에는 강등하지 않는다.
            if (!domainConfirmed) {
                score -= 20;
                relationType = 'SUGGESTED';
                reasons.push(`값 포함률 낮음 ${pct}% — 추정 후보로 분류`);
            } else {
                reasons.push(`값 포함률 낮음 ${pct}% (업무 명칭 규칙으로 CONFIRMED 유지)`);
            }
        }
    } else {
        if (!FK_ALLOW_UNCHECKED && !domainConfirmed) {
            return {
                skip: true,
                skip_reason: '샘플 부족으로 값 포함률 미검증',
                inclusion,
                score,
                reasons
            };
        }

        if (!domainConfirmed) {
            score -= 10;
            relationType = 'SUGGESTED';
            reasons.push('샘플 부족으로 값 포함률 미검증 — 추정 후보로 분류');
        } else {
            reasons.push('샘플 부족으로 값 포함률 미검증 (업무 명칭 규칙으로 CONFIRMED 유지)');
        }
    }

    const finalScore = Math.min(Math.max(Math.round(score), 0), 100);

    if (relationType === 'SUGGESTED' && finalScore < FK_SUGGESTED_MIN_SCORE) {
        return {
            skip: true,
            skip_reason: `추정 후보 점수 ${finalScore}점으로 기준 미달`,
            inclusion,
            score: finalScore,
            reasons
        };
    }

    return {
        skip: false,
        score: finalScore,
        confidence: relationType === 'CONFIRMED' ? getConfidence(finalScore) : 'SUGGESTED',
        relation_type: relationType,
        inclusion,
        reasons
    };
}

function analyzeFkCandidates(datasets, tableAnalyses, recordsMap = new Map()) {
    const tableLookup = createTableLookup(tableAnalyses);
    const existingSvcNoSet = new Set(tableAnalyses.map(t => normalizeSvcNo(t.svc_no)));
    const pkFieldIndex = buildPkFieldIndex(tableAnalyses);

    const relationships = [];
    const rejectedRelationships = [];

    for (const ds of datasets) {
        const fromSvcNo = String(ds.svc_no || '').trim();
        const fromSvcNm = String(ds.svc_nm || '').trim();
        if (!fromSvcNo) continue;

        const fromRecords = recordsMap.get(fromSvcNo) || [];
        const colMap = buildColMap(ds, fromRecords);
        const fields = [...colMap.values()];

        for (const field of fields) {
            const fieldName  = getFieldName(field);
            const upperField = fieldName.toUpperCase();
            if (!fieldName) continue;

            if (isExcludedFkField(fieldName)) continue;
            if (!isKnownRelationKey(upperField) && !isCodeField(field)) continue;

            // 마스터 테이블은 부모로 사용하고, 자식 FK 생성 대상에서는 제외한다.
            if (shouldSkipByMasterRule(fromSvcNo, upperField, existingSvcNoSet)) continue;

            let targets = pkFieldIndex.get(upperField) || [];
            targets = pickTargetTablesByMasterRule(upperField, targets, existingSvcNoSet);

            const candidatesForField = [];

            for (const target of targets) {
                if (target.svc_no === fromSvcNo) continue;

                // 순환 참조 방지
                if (relationships.some(r =>
                    r.from_table === target.svc_no &&
                    r.to_table === fromSvcNo &&
                    r.from_field === target.pk.fields[0] &&
                    r.to_field === fieldName
                )) continue;

                const toRecords = recordsMap.get(target.svc_no) || [];
                const scored = scoreFkCandidate({
                    field,
                    target,
                    fromSvcNm,
                    fromRecords,
                    toRecords,
                    fieldName
                });

                if (scored.skip) {
                    rejectedRelationships.push({
                        from_table: fromSvcNo,
                        from_table_name: fromSvcNm,
                        from_field: fieldName,
                        from_kor_nm: getKorName(field),
                        to_table: target.svc_no,
                        to_table_name: target.svc_nm,
                        to_field: target.pk.fields[0],
                        to_kor_nm: target.pk.kor_names[0],
                        inclusion_check: scored.inclusion,
                        reject_reason: scored.skip_reason,
                        reason: scored.reasons.join(' / ')
                    });
                    continue;
                }

                candidatesForField.push({
                    from_table: fromSvcNo,
                    from_table_name: fromSvcNm,
                    from_field: fieldName,
                    from_kor_nm: getKorName(field),
                    to_table: target.svc_no,
                    to_table_name: target.svc_nm,
                    to_field: target.pk.fields[0],
                    to_kor_nm: target.pk.kor_names[0],
                    score: scored.score,
                    confidence: scored.confidence,
                    relation_type: scored.relation_type,
                    inclusion_check: scored.inclusion,
                    reason: scored.reasons.join(' / ')
                });
            }

            // 같은 From Table.Field에서 부모 후보가 너무 많이 붙는 것을 제한한다.
            candidatesForField
                .sort((a, b) => b.score - a.score)
                .slice(0, FK_MAX_PER_FROM_FIELD)
                .forEach(rel => relationships.push(rel));
        }
    }

    return {
        relationships: removeDuplicateRelationships(relationships).sort((a, b) => b.score - a.score),
        rejected_relationships: removeDuplicateRejectedRelationships(rejectedRelationships)
    };
}

function removeDuplicateRelationships(relationships) {
    const seen = new Set();
    return relationships.filter(rel => {
        const key = [rel.from_table, rel.from_field, rel.to_table, rel.to_field].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function removeDuplicateRejectedRelationships(relationships) {
    const seen = new Set();
    return relationships.filter(rel => {
        const key = [rel.from_table, rel.from_field, rel.to_table, rel.to_field, rel.reject_reason].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// =============================================================================
// 섹션 9. 컬럼 Map 구성
// =============================================================================

function buildColMap(ds, records) {
    const colMap = new Map();

    if (Array.isArray(ds.fields)) {
        for (const f of ds.fields) {
            const fname = String(f.field || f.field_id || '').trim();
            if (!fname) continue;

            const upper = fname.toUpperCase();
            if (SYSTEM_SAMPLE_FIELDS.has(upper)) continue;
            if (colMap.has(upper)) continue;

            colMap.set(upper, {
                field:  fname,
                kor_nm: String(f.kor_nm || '').trim(),
                sqlType: f.sqlType || undefined,
                type:   String(f.type   || ''),
                length: String(f.length || ''),
                desc:   String(f.desc   || ''),
                sample: String(f.sample || '')
            });
        }
    }

    for (const rec of (records || [])) {
        for (const key of Object.keys(rec)) {
            const upper = key.toUpperCase();
            if (SYSTEM_SAMPLE_FIELDS.has(upper)) continue;
            if (colMap.has(upper)) continue;
            colMap.set(upper, {
                field: key,
                kor_nm: key,
                sqlType: undefined,
                type: '',
                length: '',
                desc: '샘플 데이터 기반 자동 추가 필드',
                sample: ''
            });
        }
    }

    if (colMap.size === 0) {
        colMap.set('_NO_FIELD', {
            field: '_no_field',
            kor_nm: '필드 정보 없음',
            sqlType: 'TEXT',
            type: 'TEXT',
            length: '',
            desc: '',
            sample: ''
        });
    }

    return colMap;
}

// =============================================================================
// 섹션 10. 핵심 분석 함수 — analyze()
// =============================================================================

function analyze(datasets, recordsMap = new Map()) {
    const tableAnalyses = datasets.map(ds => {
        const svcNo  = String(ds.svc_no || '').trim();
        const records = recordsMap.get(svcNo) || [];
        const colMap  = buildColMap(ds, records);
        const fields  = [...colMap.values()];

        const pkCandidates = analyzePkCandidatesForTable({ ...ds, fields }, records);

        return {
            svc_no:              svcNo,
            svc_nm:              String(ds.svc_nm || '').trim(),
            cat:                 String(ds.cat    || '').trim(),
            field_count:         fields.length,
            sample_record_count: records.length,
            fields,
            pk_candidates:       pkCandidates
        };
    });

    const fkResult = analyzeFkCandidates(datasets, tableAnalyses, recordsMap);
    const relationships = fkResult.relationships;
    const rejectedRelationships = fkResult.rejected_relationships;

    return {
        generated_at: new Date().toISOString(),
        config: {
            fk_min_inclusion_ratio: FK_MIN_INCLUSION_RATIO,
            fk_strong_inclusion_ratio: FK_STRONG_INCLUSION_RATIO,
            fk_allow_unchecked: FK_ALLOW_UNCHECKED,
            fk_max_per_from_field: FK_MAX_PER_FROM_FIELD,
            fk_suggested_min_score: FK_SUGGESTED_MIN_SCORE,
            fk_include_suggested_in_sql: FK_INCLUDE_SUGGESTED_IN_SQL,
            fk_domain_confirmed_bonus: FK_DOMAIN_CONFIRMED_BONUS,
            fk_domain_parent_child_rule_count: FK_DOMAIN_PARENT_CHILD_RULES.length,
            master_table_by_key: MASTER_TABLE_BY_KEY
        },
        summary: {
            total_tables:              tableAnalyses.length,
            tables_with_pk_candidates: tableAnalyses.filter(t => t.pk_candidates.length > 0).length,
            relationship_count:        relationships.length,
            confirmed_relationship_count: relationships.filter(r => r.relation_type === 'CONFIRMED').length,
            suggested_relationship_count: relationships.filter(r => r.relation_type === 'SUGGESTED').length,
            rejected_relationship_count: rejectedRelationships.length
        },
        tables:        tableAnalyses,
        relationships,
        rejected_relationships: rejectedRelationships
    };
}

// =============================================================================
// 섹션 11. 결과 파일 생성 — writeReports()
// =============================================================================

function writeReports(analysis, opts = {}) {
    const {
        json = DEFAULT_JSON,
        md = DEFAULT_MD,
        sql = DEFAULT_SQL,
        noJson = false,
        noMd = false,
        noSql = false
    } = opts;

    if (!noJson) generateJsonReport(analysis, json);
    if (!noMd)   generateMarkdownReport(analysis, md);
    if (!noSql)  generateKeysErdSql(analysis, sql);
}

function generateJsonReport(analysis, outputPath) {
    safeFileWrite(outputPath, JSON.stringify(analysis, null, 2));
}

function escapeMd(text) {
    return String(text || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function formatInclusionForMd(inclusion) {
    if (!inclusion || !inclusion.checked) return '미검증';
    return `${(inclusion.inclusion_ratio * 100).toFixed(1)}% (${inclusion.matched_count}/${inclusion.from_unique_count})`;
}

function generateMarkdownReport(analysis, outputPath) {
    const lines = [];

    lines.push('# 식품안전나라 PK/FK 후보 분석 결과');
    lines.push('');
    lines.push(`- 분석 데이터셋 수: ${analysis.summary.total_tables}`);
    lines.push(`- PK 후보 보유 테이블 수: ${analysis.summary.tables_with_pk_candidates}`);
    lines.push(`- FK 후보 수: ${analysis.summary.relationship_count}`);
    lines.push(`  - 확정 FK 후보 수: ${analysis.summary.confirmed_relationship_count || 0}`);
    lines.push(`  - 추정 FK 후보 수: ${analysis.summary.suggested_relationship_count || 0}`);
    lines.push(`- 제외된 FK 후보 수: ${analysis.summary.rejected_relationship_count || 0}`);
    lines.push(`- 생성일시: ${analysis.generated_at}`);
    lines.push('');
    lines.push('## 0. FK 정제 기준');
    lines.push('');
    lines.push(`- 최소 값 포함률 기준: ${(analysis.config.fk_min_inclusion_ratio * 100).toFixed(0)}%`);
    lines.push(`- 강한 값 포함률 기준: ${(analysis.config.fk_strong_inclusion_ratio * 100).toFixed(0)}%`);
    lines.push(`- 미검증 FK 허용 여부: ${analysis.config.fk_allow_unchecked ? '추정 후보로 허용' : '제외'}`);
    lines.push(`- 동일 From Table.Field 기준 최대 후보 수: ${analysis.config.fk_max_per_from_field}`);
    lines.push(`- 추정 FK 최소 점수: ${analysis.config.fk_suggested_min_score}`);
    lines.push(`- DBeaver ERD용 추정 FK SQL 포함 여부: ${analysis.config.fk_include_suggested_in_sql ? '포함' : '제외'}`);
    lines.push(`- 업무 명칭 CONFIRMED 승격 규칙 수: ${analysis.config.fk_domain_parent_child_rule_count}`);
    lines.push(`- 업무 명칭 규칙 매칭 시 점수 가산: +${analysis.config.fk_domain_confirmed_bonus}`);
    lines.push('');

    lines.push('## 1. PK 후보 요약');
    lines.push('');
    lines.push('| 서비스번호 | 데이터셋명 | PK 후보 | 신뢰도 | 점수 | 사유 |');
    lines.push('|---|---|---|---|---:|---|');

    for (const table of analysis.tables) {
        const best = table.pk_candidates[0];
        if (!best) {
            lines.push(`| ${table.svc_no} | ${escapeMd(table.svc_nm)} | - | - | - | 후보 없음 |`);
            continue;
        }
        lines.push(`| ${table.svc_no} | ${escapeMd(table.svc_nm)} | ${best.fields.join(' + ')} | ${best.confidence} | ${best.score} | ${escapeMd(best.reason)} |`);
    }

    lines.push('');
    lines.push('## 2. FK 후보 요약');
    lines.push('');
    lines.push('| From | Field | To | Field | 신뢰도 | 점수 | 값 포함률 | 사유 |');
    lines.push('|---|---|---|---|---|---:|---|---|');

    for (const rel of analysis.relationships) {
        lines.push(`| ${rel.from_table} ${escapeMd(rel.from_table_name)} | ${rel.from_field} ${escapeMd(rel.from_kor_nm)} | ${rel.to_table} ${escapeMd(rel.to_table_name)} | ${rel.to_field} ${escapeMd(rel.to_kor_nm)} | ${rel.confidence} | ${rel.score} | ${formatInclusionForMd(rel.inclusion_check)} | ${escapeMd(rel.reason)} |`);
    }

    lines.push('');
    lines.push('## 3. 제외된 FK 후보 요약');
    lines.push('');
    lines.push('| From | Field | To | Field | 값 포함률 | 제외 사유 |');
    lines.push('|---|---|---|---|---|---|');

    const rejectedPreview = (analysis.rejected_relationships || []).slice(0, 300);
    for (const rel of rejectedPreview) {
        lines.push(`| ${rel.from_table} ${escapeMd(rel.from_table_name)} | ${rel.from_field} ${escapeMd(rel.from_kor_nm)} | ${rel.to_table} ${escapeMd(rel.to_table_name)} | ${rel.to_field} ${escapeMd(rel.to_kor_nm)} | ${formatInclusionForMd(rel.inclusion_check)} | ${escapeMd(rel.reject_reason)} |`);
    }
    if ((analysis.rejected_relationships || []).length > rejectedPreview.length) {
        lines.push(`| ... | ... | ... | ... | ... | 총 ${analysis.rejected_relationships.length}건 중 ${rejectedPreview.length}건만 표시 |`);
    }

    lines.push('');
    lines.push('## 4. 테이블별 상세');
    lines.push('');

    for (const table of analysis.tables) {
        lines.push(`### ${table.svc_no} - ${escapeMd(table.svc_nm)}`);
        lines.push('');
        lines.push(`- 카테고리: ${escapeMd(table.cat)}`);
        lines.push(`- 필드 수: ${table.field_count}`);
        lines.push(`- 샘플 레코드 수: ${table.sample_record_count}`);
        lines.push('');
        lines.push('#### PK 후보');
        lines.push('');
        lines.push('| 후보 필드 | 논리명 | 유형 | 신뢰도 | 점수 | 중복검사 | 사유 |');
        lines.push('|---|---|---|---|---:|---|---|');

        if (table.pk_candidates.length === 0) {
            lines.push('| - | - | - | - | - | - | 후보 없음 |');
        } else {
            for (const pk of table.pk_candidates) {
                const stats = pk.unique_check;
                const check = stats.record_count > 0
                    ? `unique ${stats.unique_count}/${stats.record_count}, duplicate ${stats.duplicate_count}`
                    : '샘플 없음';
                lines.push(`| ${pk.fields.join(' + ')} | ${pk.kor_names.map(escapeMd).join(' + ')} | ${pk.type} | ${pk.confidence} | ${pk.score} | ${check} | ${escapeMd(pk.reason)} |`);
            }
        }
        lines.push('');
    }

    safeFileWrite(outputPath, lines.join('\n'));
}

function generateKeysErdSql(analysis, outputPath) {
    const lines = [];

    lines.push('-- =============================================================================');
    lines.push('-- 식품안전나라 Open API PK/FK 후보 ERD DDL');
    lines.push('-- 목적: PK/FK 후보를 ERD에서 확인하기 위한 SQL');
    lines.push('-- 주의: 실제 DB 제약조건 적용 전 검증 필요');
    lines.push('-- 정책: 실제 DDL 제약조건에는 HIGH 신뢰도 및 값 포함률 기준을 통과한 후보만 반영');
    lines.push('-- =============================================================================');
    lines.push('');
    lines.push('PRAGMA foreign_keys = ON;');
    lines.push('');

    const fksByTable = new Map();
    for (const rel of analysis.relationships) {
        // ── 변경 3/3 ──────────────────────────────────────────────────────────
        // 기존: CONFIRMED 후보에 대해 confidence 체크 + checked 체크 + inclusion_ratio 재검사를 중복 수행
        //       → scoreFkCandidate에서 이미 FK_MIN_INCLUSION_RATIO 기준으로 CONFIRMED 판정을 완료했음에도
        //          여기서 동일 기준으로 한 번 더 걸러내어 확정 FK 후보가 누락되는 문제 발생.
        // 변경: CONFIRMED 판정 자체를 신뢰하고 중복 필터 제거.
        //       (inclusion_ratio 재검사 3줄 삭제)
        if (rel.relation_type === 'CONFIRMED') {
            if (rel.confidence !== 'HIGH' && rel.confidence !== 'MEDIUM') continue;
            // 삭제: if (!rel.inclusion_check || !rel.inclusion_check.checked) continue;
            // 삭제: if (rel.inclusion_check.inclusion_ratio < FK_MIN_INCLUSION_RATIO) continue;
        } else if (rel.relation_type === 'SUGGESTED') {
            if (!FK_INCLUDE_SUGGESTED_IN_SQL) continue;
            if (rel.score < FK_SUGGESTED_MIN_SCORE) continue;
        } else {
            continue;
        }
        // ─────────────────────────────────────────────────────────────────────

        if (!fksByTable.has(rel.from_table)) fksByTable.set(rel.from_table, new Map());
        const tbl = fksByTable.get(rel.from_table);
        const ex  = tbl.get(rel.from_field);
        if (!ex || rel.score > ex.score) tbl.set(rel.from_field, rel);
    }

    for (const table of analysis.tables) {
        const bestPk     = table.pk_candidates[0];
        const hasPk      = bestPk && bestPk.confidence === 'HIGH';
        const tableFks   = fksByTable.get(table.svc_no);
        const fksList    = tableFks ? [...tableFks.values()] : [];
        const hasFks     = fksList.length > 0;

        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`-- ${table.svc_no} / ${sanitizeSqlComment(table.svc_nm)}`);
        if (table.cat) lines.push(`-- 카테고리: ${sanitizeSqlComment(table.cat)}`);
        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`CREATE TABLE IF NOT EXISTS ${quoteIdent(table.svc_no)} (`);

        const fieldLines = [];

        table.fields.forEach((field, idx) => {
            const fname   = field.field;
            const kor     = sanitizeSqlComment(field.kor_nm);
            const sqlType = field.sqlType || 'VARCHAR(500)';

            const pkComment = (bestPk && bestPk.fields.includes(fname))
                ? ` / PK 후보(${bestPk.confidence})`
                : '';
            const fkTarget  = tableFks && tableFks.get(fname);
            const fkComment = fkTarget
                ? ` / FK 후보(${fkTarget.confidence}, ${(fkTarget.inclusion_check?.inclusion_ratio * 100 || 0).toFixed(1)}%) -> ${fkTarget.to_table}.${fkTarget.to_field}`
                : '';
            const hasNext   = idx < table.fields.length - 1 || hasPk || hasFks;

            fieldLines.push(
                `  ${quoteIdent(fname)} ${sqlType}${hasNext ? ',' : ''} -- ${fname}${kor ? ` / ${kor}` : ''}${pkComment}${fkComment}`
            );
        });

        if (hasPk) {
            fieldLines.push(`  PRIMARY KEY (${bestPk.fields.map(quoteIdent).join(', ')})${hasFks ? ',' : ''}`);
        }
        fksList.forEach((fk, idx) => {
            fieldLines.push(
                `  FOREIGN KEY (${quoteIdent(fk.from_field)}) REFERENCES ${quoteIdent(fk.to_table)} (${quoteIdent(fk.to_field)})${idx < fksList.length - 1 ? ',' : ''}`
            );
        });

        lines.push(fieldLines.join('\n'));
        lines.push(');');
        lines.push('');
    }

    lines.push('-- =============================================================================');
    lines.push('-- FK 후보 전체 목록 (검토용 주석)');
    lines.push('-- =============================================================================');
    lines.push('');

    for (const rel of analysis.relationships) {
        lines.push(`-- FK 후보 [${rel.confidence}/${rel.score}] ${quoteIdent(rel.from_table)}.${quoteIdent(rel.from_field)} -> ${quoteIdent(rel.to_table)}.${quoteIdent(rel.to_field)}`);
        lines.push(`-- 값 포함률: ${formatInclusionForMd(rel.inclusion_check)}`);
        lines.push(`-- 사유: ${sanitizeSqlComment(rel.reason)}`);
        if (rel.relation_type === 'CONFIRMED' || rel.relation_type === 'SUGGESTED') {
            lines.push(`-- FOREIGN KEY (${quoteIdent(rel.from_field)}) REFERENCES ${quoteIdent(rel.to_table)} (${quoteIdent(rel.to_field)})`);
        }
        lines.push('');
    }

    lines.push('-- =============================================================================');
    lines.push('-- 제외된 FK 후보 목록 (검토용 주석)');
    lines.push('-- =============================================================================');
    lines.push('');

    for (const rel of (analysis.rejected_relationships || [])) {
        lines.push(`-- 제외 FK 후보 ${quoteIdent(rel.from_table)}.${quoteIdent(rel.from_field)} -> ${quoteIdent(rel.to_table)}.${quoteIdent(rel.to_field)}`);
        lines.push(`-- 값 포함률: ${formatInclusionForMd(rel.inclusion_check)}`);
        lines.push(`-- 제외 사유: ${sanitizeSqlComment(rel.reject_reason)}`);
        lines.push('');
    }

    safeFileWrite(outputPath, lines.join('\n'));
}

// =============================================================================
// 섹션 12. CLI 독립 실행용 run()
// =============================================================================

async function run(options) {
    const { cache, samples, json, md, sql, noJson, noMd, noSql } = options;

    log('STEP', 'crawl_cache.json 로드');
    if (!fs.existsSync(cache)) { log('ERR', `캐시 파일 없음: ${cache}`); process.exit(1); }

    const datasets = JSON.parse(fs.readFileSync(cache, 'utf-8'));
    if (!Array.isArray(datasets)) { log('ERR', '캐시 파일 형식이 배열이 아닙니다.'); process.exit(1); }
    log('INFO', `데이터셋 수: ${datasets.length}`);

    log('STEP', '샘플 및 SQLite 적재 데이터 로드');
    const recordsMap = new Map();
    
    // SQLite 데이터베이스가 존재하면 우선적으로 연결
    const dbPath = path.join(process.cwd(), 'foodsafety.db');
    let db = null;
    if (fs.existsSync(dbPath)) {
        try {
            const sqlite3 = require('sqlite3').verbose();
            db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
            log('INFO', `SQLite 데이터베이스 실시간 적재 데이터 연동 성공: ${dbPath}`);
        } catch (e) {
            log('WARN', `SQLite 연결 실패, JSON 샘플 모드로 대체합니다: ${e.message}`);
            db = null;
        }
    }

    function loadFromJsonFallback(svcNo, resolve) {
        const samplePath = path.join(samples, `${svcNo}.json`);
        if (fs.existsSync(samplePath)) {
            try {
                const rows = parseSampleJson(samplePath, svcNo);
                recordsMap.set(svcNo, rows);
            } catch (err) {
                recordsMap.set(svcNo, []);
            }
        } else {
            recordsMap.set(svcNo, []);
        }
        resolve();
    }

    const loadPromises = datasets.map(ds => {
        const svcNo = String(ds.svc_no || '').trim();
        if (!svcNo) return Promise.resolve();

        return new Promise((resolve) => {
            if (db) {
                // SQLite 적재된 실제 데이터가 있는지 조회 (최대 5000개 로드하여 정확도 극대화)
                db.all(`SELECT * FROM "${svcNo}" LIMIT 5000;`, [], (err, rows) => {
                    if (!err && rows && rows.length > 0) {
                        recordsMap.set(svcNo, rows);
                        resolve();
                    } else {
                        // DB에 테이블이 없거나 데이터가 없으면 로컬 JSON 샘플로 폴백
                        loadFromJsonFallback(svcNo, resolve);
                    }
                });
            } else {
                loadFromJsonFallback(svcNo, resolve);
            }
        });
    });

    await Promise.all(loadPromises);

    if (db) {
        db.close();
        log('INFO', `SQLite 연결 정상 해제 및 ${recordsMap.size}개 테이블 데이터 분석 준비 완료`);
    }

    log('STEP', 'PK/FK 후보 분석');
    const analysis = analyze(datasets, recordsMap);

    log('STEP', '결과 파일 생성');
    writeReports(analysis, { json, md, sql, noJson, noMd, noSql });

    const sep = '='.repeat(62);
    console.log(`\n${sep}`);
    console.log('  PK/FK 후보 분석 완료');
    console.log(sep);
    console.log(`  분석 테이블 수          : ${analysis.summary.total_tables}`);
    console.log(`  PK 후보 보유 테이블 수  : ${analysis.summary.tables_with_pk_candidates}`);
    console.log(`  FK 후보 수              : ${analysis.summary.relationship_count}`);
    console.log(`    - 확정 FK 후보 수     : ${analysis.summary.confirmed_relationship_count}`);
    console.log(`    - 추정 FK 후보 수     : ${analysis.summary.suggested_relationship_count}`);
    console.log(`  제외된 FK 후보 수       : ${analysis.summary.rejected_relationship_count}`);
    if (!noJson) console.log(`  JSON 결과               : ${json}`);
    if (!noMd)   console.log(`  Markdown 결과           : ${md}`);
    if (!noSql)  console.log(`  ERD SQL 결과            : ${sql}`);
    console.log(sep);
}

// =============================================================================
// 섹션 13. CLI 진입점
// =============================================================================

if (require.main === module) {
    const args = parseArgs(process.argv.slice(2));
    (async () => {
        try {
            await run(args);
        } catch (err) {
            log('ERR', err.stack || err.message);
            process.exit(1);
        }
    })();
}

// =============================================================================
// exports
// =============================================================================

module.exports = {
    analyze,
    writeReports,
    parseSampleJson,

    analyzePkCandidatesForTable,
    analyzeFkCandidates,
    getUniquenessStats,
    getInclusionStats,
    buildColMap,

    isKnownRelationKey,
    isExcludedFkField,
    isNameField,

    getMasterTablesForKey,
    isMasterTableForKey,
    hasMasterRule,

    run
};