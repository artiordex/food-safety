/**
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
 *   [주요 외부 라이브러리 및 역할]
 *   - Arquero (aq)           : 데이터프레임 형식으로 각 컬럼의 결측치, 고유도 등 데이터 분포를 고속 프로파일링
 *   - Graphology             : 수백 개의 테이블을 노드(Node)로, FK를 엣지(Edge)로 삼아 '방향성 그래프' 구축
 *                              (중심도(Centrality) 분석, 위상정렬, 순환참조(Cycle) 탐지, 테마 그룹핑에 활용)
 *   - Fuse.js                : 한글 테이블명, 업무 도메인 명칭 등의 오타 및 유사어 퍼지(Fuzzy) 검색
 *   - string-similarity      : 다이스 계수(Dice's coefficient)를 이용해 영문 컬럼명의 문자열 유사도 측정
 *   - Zod (z)                : 외부에서 입력받은 메타데이터(Dataset Schema)의 타입 및 구조 검증
 *   - simple-statistics (ss) : 정보 엔트로피(Entropy) 등 수학적/통계적 수치 계산
 *   - sqlite3                : 분석된 데이터를 로컬 SQLite DB에 기록하거나 조회할 때 사용
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
 */

'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const Fuse = require('fuse.js');
const aq = require('arquero');
const ss = require('simple-statistics');
const strSim = require('string-similarity');
const { z } = require('zod');
const { DirectedGraph } = require('graphology');
const { connectedComponents } = require('graphology-components');
const { topologicalSort, hasCycle } = require('graphology-dag');
const pagerank = require('graphology-metrics/centrality/pagerank');
const betweenness = require('graphology-metrics/centrality/betweenness');
const closeness = require('graphology-metrics/centrality/closeness');
const { bidirectional, undirectedSingleSourceLength } = require('graphology-shortest-path/unweighted');

// 로그 레벨(INFO/WARN/ERR/STEP)에 따라 logger 메서드를 호출하는 래퍼
function log(level, msg) {
    if (level === 'ERR') return logger.error(msg);
    if (level === 'WARN') return logger.warn(msg);
    if (level === 'STEP') return logger.info(`\n▶ ${msg}`);
    return logger.info(msg);
}


// =============================================================================
// 0. 기본 설정
// =============================================================================

const DEFAULT_CACHE = path.join(__dirname, '../crawler/crawl_cache.json');
const DEFAULT_SAMPLES = path.join(__dirname, '../crawler/samples');
const DEFAULT_JSON = path.join(__dirname, 'foodsafety_key_candidates.json');
const DEFAULT_MD = path.join(__dirname, 'foodsafety_key_candidates.md');
const DEFAULT_SQL = path.join(__dirname, 'foodsafety_keys_erd.sql');

function formatKstTimestamp(date = new Date()) {
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kst.toISOString().replace('Z', '+09:00');
}

// 복합 PK/FK 후보 탐색 최대 필드 수
const MAX_COMPOSITE_KEY_SIZE = Number(process.env.MAX_COMPOSITE_KEY_SIZE || 3);

// FK 후보 정제 기준
const FK_MIN_INCLUSION_RATIO = 0.03;       // 확정 FK 후보 최소 포함률
const FK_MIN_MATCHED_COUNT = 3;            // 확정 FK 후보 최소 실제 매칭 고유값 수
const FK_STRONG_INCLUSION_RATIO = 0.50;    // 50% 이상이면 HIGH 가산
const FK_ALLOW_UNCHECKED = true;           // 샘플 부족 미검증 FK도 논리적 구조 기반으로 유지
const FK_MAX_PER_FROM_FIELD = 2;           // 한 컬럼당 찾을 수 있는 'FK 연결 후보(부모 테이블)'의 최대 개수 제한

// 추정 FK 후보 기준
const FK_SUGGESTED_MIN_SCORE = 60;         // 이 점수 이상이면 추정 후보로 보존
const FK_INCLUDE_SUGGESTED_IN_SQL = false; // 불확실한 추정 후보는 SQL ERD에서 제외

// 필드명 유사도 (string-similarity Dice's coefficient)
const FIELD_SIMILARITY_THRESHOLD = 0.72;  // 정규화 후 Dice 유사도 기준
const FIELD_SIMILARITY_PENALTY = 15;    // 유사 매칭 시 스코어 감점 최대값

/**
 * [도메인 지식 기반 부모-자식(FK) 매칭 사전]
 * 
 * 데이터 포함률(Inclusion Rate) 검사만으로는 FK 관계를 찾기 힘든 예외 케이스를 구제
 * 하위(Child) 테이블(예: 폐업, 행정처분)은 상위(Parent) 마스터 테이블의 극히 일부 데이터만 가지고 있어 포함률이 0%에 가깝게 나오더라도, 실제로는 부모-자식 관계인 경우가 잇음
 * 
 * - 동작 방식: From 테이블명이 `childKeywords`를, To 테이블명이 `parentKeywords`를 포함하면 규칙 성립
 * - 적용 효과: 포함률이 미달하더라도 해당 관계를 강제로 'CONFIRMED(확정)' 상태로 승격시키고,
 *             가산점(FK_DOMAIN_CONFIRMED_BONUS)을 부여하여 최종 FK 후보 우선순위를 높임
 */
const FK_DOMAIN_PARENT_CHILD_RULES = [
    // 폐업정보 → 영업(인허가) 마스터
    { childKeywords: ['폐업정보', '폐업'], parentKeywords: ['영업정보', '허가정보', '신고대장', '영업신고대장', '허가대장', '인허가대장', '인허가 업소', '식품접객업정보', '식품제조가공업정보', '위생용품영업정보', '가공업허가정보'] },
    // 인허가 변경 → 영업(인허가) 마스터
    { childKeywords: ['인허가 변경', '변경 정보', '변경정보'], parentKeywords: ['영업정보', '허가정보', '신고대장', '영업신고대장', '허가대장', '인허가대장', '인허가 업소', '식품접객업정보', '식품제조가공업정보'] },
    // 인허가 대장(개별업종) → 인허가 업소 정보(통합마스터)
    { childKeywords: ['인허가 대장', '인허가대장'], parentKeywords: ['인허가 업소 정보'] },
    // 품목제조보고(원재료) → 품목제조보고(마스터)
    { childKeywords: ['품목제조보고(원재료)', '품목제조신고(원재료)', '축산물품목제조보고(원재료)'], parentKeywords: ['품목제조보고', '품목제조 신고사항', '품목제조정보'] },
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
 * [공통 핵심 키(Hub Key)별 지정 마스터 테이블(Parent) 목록]
 * 
 * 범용적으로 사용되는 공통 식별키(예: LCNS_NO, PRDLST_REPORT_NO 등)에 대해, 해당 키의 '진짜 원본(마스터) 데이터'를 소유한 부모 테이블을 명시적으로 정의
 * 탐색된 부모(To) 테이블 후보가 이 목록에 정의된 테이블일 경우, 가장 강력한 가산점을 부여하거나 최우선 부모 테이블로 확정(CONFIRMED)
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
        'I2510'  // 품목유형코드
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


// CLI 인자 배열을 파싱해 옵션 객체를 반환함
function parseArgs(argv) {
    const args = {
        cache: DEFAULT_CACHE,
        samples: DEFAULT_SAMPLES,
        json: DEFAULT_JSON,
        md: DEFAULT_MD,
        sql: DEFAULT_SQL,
        noSql: false,
        noMd: false,
        noJson: false,
        noXlsx: false
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--cache' && argv[i + 1]) args.cache = argv[++i];
        else if (arg === '--samples' && argv[i + 1]) args.samples = argv[++i];
        else if (arg === '--json' && argv[i + 1]) args.json = argv[++i];
        else if (arg === '--md' && argv[i + 1]) args.md = argv[++i];
        else if (arg === '--sql' && argv[i + 1]) args.sql = argv[++i];
        else if (arg === '--no-json') args.noJson = true;
        else if (arg === '--no-md') args.noMd = true;
        else if (arg === '--no-sql') args.noSql = true;
        else if (arg === '--no-xlsx') args.noXlsx = true;
        else if (arg === '-h' || arg === '--help') { printHelp(); process.exit(0); }
        else log('WARN', `알 수 없는 인자 무시: ${arg}`);
    }
    return args;
}

// 사용법 및 옵션 도움말을 출력함
function printHelp() {
    logger.info(`
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
  --no-xlsx           엑셀 시트 갱신 생략
  -h, --help          도움말 출력

Examples:
  node analyze_pk_fk.js
  node analyze_pk_fk.js --cache crawl_cache_149_169.json
  node analyze_pk_fk.js --samples ./samples --sql foodsafety_keys_erd.sql
`);
}


// =============================================================================
// 1. 공통 유틸
// =============================================================================
// SQLite 식별자(테이블명/컬럼명)를 큰따옴표로 안전하게 감쌈
function quoteIdent(identifier) {
    return `"${String(identifier).replace(/"/g, '""')}"`;
}

// SQL 주석에 들어갈 텍스트를 한 줄로 정리하고 주석 기호를 치환함
function sanitizeSqlComment(text) {
    return String(text || '').replace(/\r?\n/g, ' ').replace(/--/g, '－').trim();
}

// 비교용 값을 문자열로 정규화함
function normalizeValue(value) {
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value).trim();
}

// 파일을 저장하고 생성 완료 로그를 남김 (원자적 쓰기 - Atomic Write)
function safeFileWrite(filePath, content) {
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, content, 'utf-8');
    fs.renameSync(tmpPath, filePath);
    log('INFO', `파일 생성 완료: ${filePath}`);
}

// 서비스 번호를 비교 가능한 형태로 정규화함
function normalizeSvcNo(value) {
    return String(value || '').trim().toUpperCase();
}

// 특정 키에 매핑된 기준 테이블 목록을 반환함
function getMasterTablesForKey(fieldName, existingSvcNoSet = null) {
    const key = String(fieldName || '').trim().toUpperCase();
    const masters = MASTER_TABLE_BY_KEY[key] || [];

    // 실제 존재하는 서비스 번호만 필터링
    if (!existingSvcNoSet) return masters;
    return masters.filter(svcNo => existingSvcNoSet.has(normalizeSvcNo(svcNo)));
}

// 특정 서비스 번호가 해당 키의 기준 테이블인지 확인함
function isMasterTableForKey(svcNo, fieldName, existingSvcNoSet = null) {
    const masters = getMasterTablesForKey(fieldName, existingSvcNoSet).map(normalizeSvcNo);
    return masters.includes(normalizeSvcNo(svcNo));
}

// 특정 필드에 기준 테이블 규칙이 있는지 확인함
function hasMasterRule(fieldName) {
    return Object.prototype.hasOwnProperty.call(
        MASTER_TABLE_BY_KEY,
        String(fieldName || '').trim().toUpperCase()
    );
}

// 테이블명에 지정한 키워드가 포함되어 있는지 확인함
function tableNameHasAny(tableName, keywords) {
    const text = String(tableName || '');
    const normText = normalizeForDomainMatch(text);

    return keywords.some(keyword =>
        text.includes(keyword) ||
        normText.includes(normalizeForDomainMatch(keyword))
    );
}

/**
 * 동일 공통키 안에서 도메인이 완전히 다른 테이블끼리 무분별하게 붙는 것을 줄인다.
 * 예: 건강기능식품 ↔ 축산물 ↔ 위생용품 ↔ 수입식품 등은 같은 LCNS_NO라도 같은 도메인끼리 연결하는 것이 타당
 */
function getDomainScore(fromTableName, toTableName) {
    // 1. 서로 절대 섞이면 안 되는 대분류 (Root Domains)
    const rootDomains = [
        ['건강기능식품', '건기식'],
        ['축산물'],
        ['수입식품', '수입식품등', '수입업', '수입판매업'],
        ['위생용품'],
        ['식품접객', '음식점', '모범음식점', '푸드트럭', '집단급식소'],
        ['식품제조', '식품첨가물', '즉석판매제조'],
        ['기구', '용기', '포장']
    ];

    // 2. 도메인에 관계없이 붙을 수 있는 행위/상태 키워드 (Action Keywords)
    const actionKeywords = [
        ['품목제조'],
        ['HACCP'],
        ['행정처분'],
        ['폐업'],
        ['변경']
    ];

    let score = 0;

    const fromRoots = [];
    const toRoots = [];

    rootDomains.forEach((group, idx) => {
        if (tableNameHasAny(fromTableName, group)) fromRoots.push(idx);
        if (tableNameHasAny(toTableName, group)) toRoots.push(idx);
    });

    // 1. 이기종 도메인 교차 연결 방지 (Cross-Domain Penalty)
    if (fromRoots.length > 0 && toRoots.length > 0) {
        const hasIntersection = fromRoots.some(r => toRoots.includes(r));
        if (!hasIntersection) {
            // 소속된 대분류가 명확히 다른 경우 강력한 페널티
            return -100;
        } else {
            // 루트 도메인이 정확히 일치함
            score += 20;
        }
    }

    // 2. Action Keyword 매칭 (같은 루트 도메인이거나, 한쪽이 범용인 경우에만 적용)
    for (const group of actionKeywords) {
        if (tableNameHasAny(fromTableName, group) && tableNameHasAny(toTableName, group)) {
            score += 10;
        }
    }

    return score;
}


/**
 * 공백을 제거하고 소문자로 정규화
 * "영업 신고 대장" → "영업신고대장" 처럼 공백 차이를 흡수
 */
function normalizeForDomainMatch(text) {
    return String(text || '').replace(/\s+/g, '').toLowerCase();
}

/**
 * 전체 데이터셋 이름을 Fuse.js 인덱스로 구성
 * 도메인 키워드 fuzzy 검색에 재사용
 *
 * @param {object[]} datasets
 * @returns {Fuse} Fuse 인덱스
 */
function buildDatasetFuseIndex(datasets) {
    const items = datasets.map(ds => ({
        svc_no: String(ds.svc_no || '').trim(),
        svc_nm: String(ds.svc_nm || '').trim()
    }));

    return new Fuse(items, {
        keys: ['svc_nm'],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2
    });
}

/**
 * 키워드가 텍스트 내에 포함되는지 3단계로 확인
 * 1. exact includes        — 가장 엄격, 빠름
 * 2. 공백 제거 후 includes  — 한국어 띄어쓰기 변형 흡수
 * 3. Fuse.js fuzzy match   — 짧은 오기/유사 표현 흡수 (길이 3+ 키워드만)
 */
function keywordMatchesText(keyword, text, fuseIndex) {
    if (text.includes(keyword)) return true;
    if (normalizeForDomainMatch(text).includes(normalizeForDomainMatch(keyword))) return true;
    if (keyword.length >= 3 && fuseIndex) {
        const results = fuseIndex.search(keyword);
        return results.some(r => r.item.svc_nm === text && (r.score ?? 1) < 0.35);
    }
    return false;
}

/**
 * Fuse.js 및 공백 정규화를 활용한 도메인 부모-자식 규칙 매칭.
 * exact includes 및 공백 정규화보다 넓은 범위를 커버
 */
function matchesDomainParentChildRuleFuzzy(fromSvcNm, toSvcNm, fuseIndex) {
    for (const rule of FK_DOMAIN_PARENT_CHILD_RULES) {
        const childMatch = rule.childKeywords.some(kw => keywordMatchesText(kw, fromSvcNm, fuseIndex));
        if (!childMatch) continue;
        const parentMatch = rule.parentKeywords.some(kw => keywordMatchesText(kw, toSvcNm, fuseIndex));
        if (parentMatch) return true;
    }
    return false;
}

/**
 * 언더스코어를 제거하고 대문자로 정규화(언더스코어 위치 차이로 인한 유사 필드명 변형을 흡수）)
 * LCNS_NO → LCNSNO, APLC_DT → APLCDT 
 */
function normalizeFieldForSim(fieldName) {
    return String(fieldName || '').replace(/_/g, '').toUpperCase();
}

/**
 * pkFieldIndex 안에서 upperField 와 유사한 PK 필드를 찾아 반환
 * 1. exact match 우선（정확히 일치하면 바로 반환）
 * 2. 정규화(언더스코어 제거) 후 Dice's coefficient >= FIELD_SIMILARITY_THRESHOLD 인 후보
 *
 * @returns {Array<{ key: string, similarity: number, exact: boolean }>}
 */
function findSimilarPkFields(upperField, pkFieldIndex) {
    // 정확히 일치하면 바로 반환
    if (pkFieldIndex.has(upperField)) {
        return [{ key: upperField, similarity: 1.0, exact: true }];
    }

    const normInput = normalizeFieldForSim(upperField);
    const results = [];

    for (const pkField of pkFieldIndex.keys()) {
        const normPk = normalizeFieldForSim(pkField);
        const sim = strSim.compareTwoStrings(normInput, normPk);
        if (sim >= FIELD_SIMILARITY_THRESHOLD) {
            results.push({ key: pkField, similarity: sim, exact: false });
        }
    }

    // 유사도 내림차순, 상위 3개만
    return results.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
}


// =============================================================================
// 2. 샘플 JSON 파싱
// =============================================================================

/**
 * 샘플 JSON 파일을 읽어 데이터 레코드 배열로 파싱 및 추출합니다.
 *
 * @param {string} jsonPath - 샘플 JSON 파일 경로
 * @param {string} svcNo - 데이터셋 서비스 번호
 * @returns {object[]} 파싱된 레코드 객체 배열
 */
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
            if (isRecordArray(inner.row)) return inner.row;
            if (inner.row && typeof inner.row === 'object') return [inner.row];
        }
        if (isRecordArray(inner)) return inner;
    }

    if (obj && typeof obj === 'object' && !Array.isArray(obj) &&
        Object.prototype.hasOwnProperty.call(obj, 'row')) {
        if (isRecordArray(obj.row)) return obj.row;
        if (obj.row && typeof obj.row === 'object') return [obj.row];
    }

    if (isRecordArray(obj)) return obj;

    // 최상위 값 중 레코드 배열이 정확히 하나만 있으면 그것을 사용한다.
    // 여러 개면 어느 것이 맞는지 알 수 없으므로 빈 배열을 반환한다.
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        const found = Object.values(obj).filter(val => isRecordArray(val) && val.length > 0);
        if (found.length === 1) return found[0];
    }

    return [];
}


// =============================================================================
// 3. 필드 성격 판단 패턴
// =============================================================================

const STRONG_PK_FIELD_PATTERNS = [/SEQ$/i, /_SN$/i, /_ID$/i, /_IDX$/i, /NO$/i];

const STRONG_PK_KOR_PATTERNS = [
    /일련번호$/, /순번$/, /고유번호$/, /관리번호$/, /지정번호$/,
    /승인번호$/, /인정번호$/, /접수번호$/, /문서번호$/,
    /기준규격일련번호$/, /회수폐기일련번호$/
];

const CODE_FIELD_PATTERNS = [/_CD$/i, /_CODE$/i, /_CLCD$/i, /_DVS_CD$/i, /_TYPE_CD$/i, /_INSTTCD$/i];

const CODE_KOR_PATTERNS = [/코드$/, /분류코드$/, /구분코드$/, /유형코드$/, /기관코드$/, /시험항목코드$/, /품목코드$/, /단위코드$/];

/**
 * 명칭/주소/날짜/연락처 성격의 필드를 걸러내는 공통 약한 필드 패턴.
 * BAD_PK_FIELD_PATTERNS와 EXCLUDED_FK_FIELD_PATTERNS가 모두 이 목록을 참조하므로
 * 한 곳만 수정하면 양쪽에 동시 반영된다.
 */
const WEAK_FIELD_PATTERNS = [
    /_NM$/i, /_NAME$/i, /_CD_NM$/i,
    /ADDR$/i, /ADDRESS$/i,
    /_DT$/i, /_YMD$/i, /DTM$/i, /DATE$/i,
    /_CN$/i, /_CONT$/i, /_CONTENT$/i, /_DESC$/i, /_MEMO$/i,
    /_PRVNS$/i, /_MTHD$/i, /_FNCLTY$/i, /_STND$/i, /DISPOS$/i, /USAGE$/i, /_MTRQLT$/i, /_DAYCNT$/i, /_YN$/i,
    /TELNO$/i, /TEL_NO$/i, /_TELNO$/i, /PHONE$/i, /MOBILE$/i, /FAX$/i
];

// 집계/통계/측정값 성격의 필드 -- 고유 식별자가 될 수 없으므로 PK 후보에서 제외한다.
const AGGREGATE_FIELD_PATTERNS = [
    /_CNT$/i, /_COUNT$/i,           // 건수 (PATNT_CNT, OCCRNC_CNT ...)
    /_AMT$/i, /_AMOUNT$/i,          // 금액
    /YEAR$/i, /_YEAR$/i,            // 연도 (ANALS_YEAR ...)
    /AREA$/i,                        // 면적 (OCCRNC_AREA ...)
    /^BOD$/i, /^COD$/i,             // 수질: 생물화학적/화학적 산소요구량
    /^SS$/i, /^DO$/i,               // 수질: 부유물질, 용존산소
    /^TN$/i, /^TP$/i,               // 수질: 총질소, 총인
    /^ANALS_/i,                      // 분석값 접두어 (ANALS_RSLT ...)
    /_RATE$/i, /_RATIO$/i, /_PCT$/i,// 비율
    /_TOT$/i, /_SUM$/i,             // 합계
    /_AVG$/i, /_MAX$/i, /_MIN$/i,   // 통계
    /_QTY$/i, /_WGHT$/i             // 수량, 중량
];

const BAD_PK_FIELD_PATTERNS = [...WEAK_FIELD_PATTERNS, ...AGGREGATE_FIELD_PATTERNS];
const EXCLUDED_FK_FIELD_PATTERNS = WEAK_FIELD_PATTERNS;

const BAD_PK_KOR_PATTERNS = [
    /명$/, /이름$/, /업소명$/, /기관명$/, /제품명$/, /품목명$/,
    /대표자$/, /대표자명$/, /주소$/, /소재지$/, /내용$/, /사유$/,
    /비고$/, /메모$/, /방법$/, /전화번호$/, /연락처$/, /팩스$/,
    /일자$/, /날짜$/, /년월일$/, /기능성$/, /규격$/, /성상$/, /용도$/, /재질$/, /기한$/, /일수$/, /여부$/, /해당$/,
    // 집계/통계 한글명
    /건수$/, /면적$/, /연도$/, /년도$/, /금액$/, /비율$/, /율$/,
    /합계$/, /총계$/, /평균$/, /수량$/, /중량$/, /농도$/
];

/**
 * 도메인 지식 기반 알려진 관계 키 목록.
 * Set을 사용해 O(1) 조회를 보장한다.
 */
const KNOWN_RELATION_KEYS = new Set([
    'LCNS_NO', 'BSSH_NO', 'PRDLST_REPORT_NO', 'PRDLST_CD',
    'BARCODE_NO', 'BRCD_NO', 'BRCDNO', 'RAWMTRL_CD',
    'FOOD_LAWORD_CD', 'DSPS_STDR_CD', 'HACCP_NO', 'CRTFC_NO',
    'TESTITM_CD', 'UNIT_CD', 'INDUTY_CD', 'CMMN_SPEC_CD',
    'HF_FNCLTY_MTRAL_RCOGN_NO', 'BAR_CD', 'ITEM_REPORT_NO'
]);

const SYSTEM_SAMPLE_FIELDS = new Set([
    'ROW_NUM',
    'ROWNUM',
    'RNUM',
    'RESULT',
    'RESULT_CODE',
    'RESULT_CD',
    'RESULT_MSG',
    'ERR_MSG',
    'ERRMSG',
    'MSG',
    'CODE',
    'DATA_TYPE',
    'DATATYPE',
    'TOTAL_COUNT',
    'TOTALCOUNT',
    'PAGE_NO',
    'PAGENO',
    'NUM_OF_ROWS',
    'NUMOFROWS'
]);

// analyze() 입력값(datasets) 형식을 빠르게 실패시키기 위한 zod 스키마.
// import_to_sqlite.js 등 외부 호출자가 잘못된 형식을 넘기는 경우 원인을 즉시 드러낸다.
const DatasetSchema = z.object({
    svc_no: z.union([z.string(), z.number()]).optional(),
    svc_nm: z.union([z.string(), z.number()]).optional(),
    cat: z.union([z.string(), z.number()]).optional(),
    fields: z.array(z.any()).optional()
}).passthrough();

const DatasetsArraySchema = z.array(DatasetSchema);


// =============================================================================
// 4. 필드 성격 판단 함수
// =============================================================================

// 값이 패턴 배열 중 하나라도 일치하는지 확인함
function matchesAny(value, patterns) { return patterns.some(p => p.test(value)); }

// field 객체에서 영문 필드명을 추출함
function getFieldName(field) { return String(field.field || '').trim(); }
// field 객체에서 한글명(kor_nm)을 추출함
function getKorName(field) { return String(field.kor_nm || '').trim(); }

// 명칭·주소·날짜·집계 성격의 필드인지 확인함 (PK 부적합 여부)
function isBadPkField(field) {
    return matchesAny(getFieldName(field), BAD_PK_FIELD_PATTERNS) ||
        matchesAny(getKorName(field), BAD_PK_KOR_PATTERNS);
}

// SEQ/일련번호/식별자 계열 강한 PK 패턴에 해당하는지 확인함
function isStrongIdentifierField(field) {
    return matchesAny(getFieldName(field), STRONG_PK_FIELD_PATTERNS) ||
        matchesAny(getKorName(field), STRONG_PK_KOR_PATTERNS);
}

// _CD/_CODE 등 코드 계열 필드인지 확인함
function isCodeField(field) {
    return matchesAny(getFieldName(field), CODE_FIELD_PATTERNS) ||
        matchesAny(getKorName(field), CODE_KOR_PATTERNS);
}

// 식품안전나라 공통 관계키(LCNS_NO 등) 여부를 확인함
function isKnownRelationKey(fieldName) {
    return KNOWN_RELATION_KEYS.has(String(fieldName || '').trim().toUpperCase());
}

// 명칭·날짜·주소 성격의 필드라 FK 후보에서 제외해야 하는지 확인함
function isExcludedFkField(fieldName) {
    return matchesAny(String(fieldName || ''), EXCLUDED_FK_FIELD_PATTERNS);
}

// records 인자를 안전하게 레코드 객체 배열로 변환함
function toRecordArray(records) {
    if (Array.isArray(records)) return records.filter(rec => rec && typeof rec === 'object' && !Array.isArray(rec));
    if (!records || typeof records !== 'object') return [];

    if (Array.isArray(records.rows)) return toRecordArray(records.rows);
    if (Array.isArray(records.data)) return toRecordArray(records.data);
    if (Array.isArray(records.list)) return toRecordArray(records.list);
    if (Array.isArray(records.items)) return toRecordArray(records.items);

    return [];
}


// =============================================================================
// 4-1. 엔트로피 기반 통계 (simple-statistics)
// =============================================================================

/**
 * 필드값의 Shannon 엔트로피를 0~1로 정규화하여 반환
 * 값이 모두 다르면(식별자성) 1.0, 모두 같으면(상수) 0.0 에 가깝게 됨
 */
function computeFieldEntropy(records, fieldName) {
    const rows = toRecordArray(records);
    const vals = rows
        .map(r => normalizeValue(r ? r[fieldName] : ''))
        .filter(v => v !== '');

    if (vals.length <= 1) return vals.length === 0 ? 0 : 1;

    const freq = new Map();
    for (const v of vals) freq.set(v, (freq.get(v) || 0) + 1);

    const n = vals.length;
    const rawEntropy = -[...freq.values()]
        .reduce((sum, c) => { const p = c / n; return sum + (p > 0 ? p * Math.log2(p) : 0); }, 0);
    const maxEntropy = Math.log2(n);

    return maxEntropy > 0 ? rawEntropy / maxEntropy : 0;
}

/**
 * 실제 포함률(inclusion ratio) 분포에서 임계값을 데이터 기반으로 도출
 * 하드코딩된 FK_MIN_INCLUSION_RATIO, FK_STRONG_INCLUSION_RATIO를 대체
 *
 * @param {number[]} ratios - 0 이상의 포함률 목록
 * @returns {{ min: number, strong: number }}
 */
function deriveInclusionThresholds(ratios) {
    const nonZero = ratios.filter(r => r > 0).sort((a, b) => a - b);
    if (nonZero.length < 3) {
        return { min: FK_MIN_INCLUSION_RATIO, strong: FK_STRONG_INCLUSION_RATIO };
    }
    const minThreshold = ss.quantile(nonZero, 0.10);
    const strongThreshold = ss.quantile(nonZero, 0.70);
    return {
        min: Math.max(minThreshold, FK_MIN_INCLUSION_RATIO),
        strong: Math.max(strongThreshold, 0.10)
    };
}

/**
 * 전체 데이터셋 샘플에서 모든 필드의 엔트로피를 미리 계산해 반환
 * analyze() 전에 호출하면 스코어링에 활용
 *
 * @param {Map<string, object[]>} recordsMap - svcNo → 레코드 배열
 * @returns {Map<string, Map<string, number>>} svcNo → (fieldName → entropy)
 */
function buildEntropyMap(recordsMap) {
    const entropyMap = new Map();
    for (const [svcNo, records] of recordsMap) {
        const rows = toRecordArray(records);
        if (rows.length === 0) continue;
        const fieldMap = new Map();
        const fields = Object.keys(rows[0]);
        for (const field of fields) {
            fieldMap.set(field.toUpperCase(), computeFieldEntropy(rows, field));
        }
        entropyMap.set(svcNo, fieldMap);
    }
    return entropyMap;
}


// =============================================================================
// 5. 유일성/포함률 통계
// =============================================================================

/**
 * 샘플 레코드에서 지정된 필드(또는 필드 조합)의 고유성(Uniqueness) 통계를 반환
 * (총 건수, 고유 건수, 중복 건수, 빈값 포함 여부 등)
 */
function getUniquenessStats(records, fields) {
    const rows = toRecordArray(records);
    if (rows.length === 0) {
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

    const values = rows.map(rec =>
        fields.map(f => normalizeValue(rec ? rec[f] : '')).join('||')
    );

    const nonEmpty = values.filter(v =>
        v.split('||').every(part => String(part || '').trim() !== '')
    );

    const unique = new Set(nonEmpty);

    return {
        record_count: rows.length,
        non_empty_count: nonEmpty.length,
        unique_count: unique.size,
        duplicate_count: nonEmpty.length - unique.size,
        uniqueness_ratio: nonEmpty.length > 0 ? unique.size / nonEmpty.length : 0,
        has_empty: nonEmpty.length < rows.length,
        is_unique: nonEmpty.length === rows.length && unique.size === rows.length
    };
}

/**
 * 자식 테이블(fromRecords)의 값이 부모 테이블(toRecords)에 얼마나 포함되는지(포함률)를 계산
 * valuesCache를 활용해 Set 객체 생성을 최소화(Memoization)
 */
function getInclusionStats(fromSvcNo, toSvcNo, fromRecords, toRecords, fromField, toField, valuesCache = new Map()) {
    const fromRows = toRecordArray(fromRecords);
    const toRows = toRecordArray(toRecords);
    const getCached = (svcNo, records, field) => {
        const key = `${svcNo}|${field}`;
        let set = valuesCache.get(key);
        if (!set) {
            const rows = toRecordArray(records);
            set = new Set(
                rows
                    .map(r => normalizeValue(r ? r[field] : ''))
                    .filter(v => v !== '')
            );
            valuesCache.set(key, set);
        }
        return set;
    };

    const fromValues = getCached(fromSvcNo, fromRows, fromField);
    const toValues = getCached(toSvcNo, toRows, toField);

    if (fromValues.size === 0 || toValues.size === 0) {
        return {
            from_record_count: fromRows.length,
            to_record_count: toRows.length,
            from_unique_count: fromValues.size,
            to_unique_count: toValues.size,
            matched_count: 0,
            matched_row_count: 0,
            inclusion_ratio: 0,
            checked: false,
            source: 'records'
        };
    }

    let matched = 0;
    const matchedValues = new Set();
    for (const value of fromValues) {
        if (toValues.has(value)) {
            matched++;
            matchedValues.add(value);
        }
    }

    let matchedRowCount = 0;
    for (const row of fromRows) {
        const value = normalizeValue(row ? row[fromField] : '');
        if (value && matchedValues.has(value)) matchedRowCount++;
    }

    return {
        from_record_count: fromRows.length,
        to_record_count: toRows.length,
        from_unique_count: fromValues.size,
        to_unique_count: toValues.size,
        matched_count: matched,
        matched_row_count: matchedRowCount,
        inclusion_ratio: matched / fromValues.size,
        row_inclusion_ratio: fromRows.length > 0 ? matchedRowCount / fromRows.length : 0,
        checked: true,
        source: 'records'
    };
}


// =============================================================================
// 6. PK 후보 점수 계산
// =============================================================================

/**
 * 특정 필드가 기본키(PK) 식별자로 사용되기에 얼마나 적합한지 종합 점수(Score)를 계산
 * (필드명 패턴, 한글명, 엔트로피, 샘플 고유성 등을 반영)
 */
function calculateIdentifierScore(field, records, precomputedEntropy = null) {
    const fname = getFieldName(field);
    const upper = fname.toUpperCase();
    const kor = getKorName(field);
    let score = 0;
    const reasons = [];

    if (isBadPkField(field)) {
        score -= 70;
        reasons.push('명칭/주소/내용/일자 등 설명성 필드로 PK 부적합');
    }

    const strongIdMatch = isStrongIdentifierField(field);
    if (strongIdMatch) { score += 50; reasons.push('번호/일련번호/식별자 계열 필드'); }

    if (isCodeField(field)) { score += 35; reasons.push('코드 계열 필드'); }
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

    // 샘플이 적을수록 통계 신뢰도가 낮으므로 기여도를 비례 축소한다.
    // 20건 미만이면 선형으로 줄어들며, 5건이면 25% 신뢰도만 반영한다.
    const RELIABLE_SAMPLE_MIN = 20;
    const sampleConfidence = Math.min(records.length / RELIABLE_SAMPLE_MIN, 1.0);

    if (records.length > 0) {
        // buildEntropyMap()에서 미리 계산된 값이 있으면 재사용해 중복 계산을 피한다.
        const entropy = precomputedEntropy !== null ? precomputedEntropy : computeFieldEntropy(records, fname);
        // 엔트로피 0~1 → 스코어 기여 -30~+60, 샘플 신뢰도 비례 축소
        const rawEntropyContrib = entropy * 90 - 30;
        const entropyContrib = Math.round(rawEntropyContrib * sampleConfidence);
        score += entropyContrib;

        const confPct = Math.round(sampleConfidence * 100);
        if (entropy >= 0.90) {
            reasons.push(`엔트로피 높음 ${(entropy * 100).toFixed(0)}% (샘플신뢰도 ${confPct}% → 기여 ${entropyContrib > 0 ? '+' : ''}${entropyContrib})`);
        } else if (entropy >= 0.55) {
            reasons.push(`엔트로피 중간 ${(entropy * 100).toFixed(0)}% (샘플신뢰도 ${confPct}% → 기여 ${entropyContrib > 0 ? '+' : ''}${entropyContrib})`);
        } else {
            reasons.push(`엔트로피 낮음 ${(entropy * 100).toFixed(0)}% — 반복값 많음, PK 부적합`);
        }

        // uniqueness 보너스/패널티도 신뢰도 비례 축소
        if (stats.is_unique) {
            const bonus = Math.round(20 * sampleConfidence);
            score += bonus;
            reasons.push(`샘플 ${records.length}건 전체 unique (신뢰도 ${confPct}% → +${bonus})`);
        } else if (stats.uniqueness_ratio < 0.5) {
            const penalty = Math.round(20 * sampleConfidence);
            score -= penalty;
            reasons.push(`unique 비율 낮음 ${stats.unique_count}/${stats.record_count} (-${penalty})`);
        }
        if (stats.has_empty) { score -= 20; reasons.push('샘플에 빈값 존재'); }
    } else {
        score -= 5;
        reasons.push('샘플 데이터 없음: 필드명/한글명 기준 추론');
    }

    return { field: fname, kor_nm: kor, score, reasons, stats };
}

// 점수를 HIGH/MEDIUM/LOW 신뢰도 문자열로 변환함
function getConfidence(score) {
    if (score >= 85) return 'HIGH';
    if (score >= 65) return 'MEDIUM';
    return 'LOW';
}

// 배열의 k-원소 조합을 반환
function makeCombinations(arr, size) {
    const result = [];

    function visit(start, combo) {
        if (combo.length === size) {
            result.push(combo.slice());
            return;
        }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            visit(i + 1, combo);
            combo.pop();
        }
    }

    visit(0, []);
    return result;
}

// 복합 PK/FK 후보 조합 생성
function makeCompositeKeyCombos(arr, maxSize = MAX_COMPOSITE_KEY_SIZE) {
    const result = [];
    const safeMax = Math.min(Math.max(Number(maxSize) || 2, 2), 3);
    for (let size = 2; size <= safeMax; size++) {
        result.push(...makeCombinations(arr, size));
    }
    return result;
}


// =============================================================================
// 7. PK 후보 분석
// =============================================================================

/**
 * 단일 데이터셋(테이블)의 필드 목록과 샘플 레코드를 바탕으로, 단일/복합 기본키(PK) 후보를 추출
 */
function analyzePkCandidatesForTable(ds, records, fieldEntropyMap = null) {
    const fields = Array.isArray(ds.fields) ? ds.fields : [];
    const validFields = fields.filter(f => getFieldName(f));

    // 모든 필드가 집계/통계 성격이면 이 테이블은 PK 없는 집계 테이블로 분류
    // 단, 필드가 전혀 없는 경우(데이터 수집 실패)는 집계 판정하지 않음
    if (validFields.length > 0 && validFields.every(f => isBadPkField(f))) {
        return [{
            fields: [],
            kor_names: [],
            score: 0,
            type: 'aggregate_table',
            confidence: 'NONE',
            unique_check: { record_count: records.length },
            reason: `모든 필드(${validFields.map(getFieldName).join(', ')})가 집계/통계/설명 성격 — PK 없는 집계 테이블`
        }];
    }

    const singleCandidates = [];

    for (const field of validFields) {
        const upperFieldName = getFieldName(field).toUpperCase();
        const precomputedEntropy = fieldEntropyMap ? fieldEntropyMap.get(upperFieldName) ?? null : null;
        const scoreResult = calculateIdentifierScore(field, records, precomputedEntropy);
        if (scoreResult.score >= 50) {
            singleCandidates.push({
                fields: [getFieldName(field)],
                kor_names: [getKorName(field)],
                score: Math.min(scoreResult.score, 100),
                type: 'single',
                confidence: getConfidence(scoreResult.score),
                unique_check: scoreResult.stats,
                reason: scoreResult.reasons.join(' / ')
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
        // arquero 기반 컬럼 프로파일 — 복합키 후보 필드의 null 비율을 근거 문구에 반영
        const arqueroProfile = profileColumnsWithArquero(records, compositeBase);

        for (const combo of makeCompositeKeyCombos(compositeBase)) {
            const stats = getUniquenessStats(records, combo);
            if (!stats.is_unique) continue;

            const korNames = combo.map(fname => {
                const f = validFields.find(f => getFieldName(f) === fname);
                return f ? getKorName(f) : fname;
            });

            let score = combo.length === 2 ? 75 : 68;
            if (combo.some(f => isKnownRelationKey(f.toUpperCase()))) score += 10;
            if (combo.some(f => /SEQ|_NO|NO$/i.test(f))) score += 10;
            if (combo.length >= 3) score -= 5;

            const nullNotes = combo
                .map(fname => {
                    const profile = arqueroProfile.get(fname.toUpperCase());
                    return profile && profile.null_rate > 0
                        ? `${fname} 결측률 ${(profile.null_rate * 100).toFixed(0)}%`
                        : null;
                })
                .filter(Boolean);

            const reason = nullNotes.length > 0
                ? `복합키 ${combo.join(' + ')} 샘플 기준 중복 없음 (${nullNotes.join(', ')})`
                : `복합키 ${combo.join(' + ')} 샘플 기준 중복 없음`;

            compositeCandidates.push({
                fields: combo,
                kor_names: korNames,
                score: Math.min(score, 95),
                type: 'composite',
                key_size: combo.length,
                confidence: getConfidence(score),
                unique_check: stats,
                reason
            });
        }
        compositeCandidates.sort((a, b) => b.score - a.score);
    }

    return [...singleCandidates, ...compositeCandidates]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}


// =============================================================================
// 7-1. arquero 기반 복합 FK 탐지
// =============================================================================

/**
 * [Arquero 기반 컬럼 프로파일링 함수]
 * 
 * 주어진 레코드(JSON 배열)를 Arquero 데이터 테이블로 변환한 뒤, 각 컬럼(필드)별 데이터 분포, 결측률(Null Rate), 고유도(Uniqueness) 등의 통계 지표를 계산
 * 이 통계는 해당 컬럼이 기본키(PK)나 외래키(FK)로 사용되기에 적합한지 판단하는 핵심 지표로 활용
 * 
 * @param {object[]} records - 분석할 실제 데이터 레코드 배열 (예: [{ id: 1, name: 'A' }, ...])
 * @param {string[]} fieldNames - 통계를 추출하고자 하는 대상 컬럼명 배열
 * 
 * @returns {Map<string, object>} 분석 결과 Map 반환
 *          - Key: 대문자로 변환된 필드명 (정규화 목적)
 *          - Value: 아래 지표를 포함하는 통계 객체
 *              * total        : 전체 행 개수
 *              * non_empty    : null, undefined, 빈 문자열('')이 아닌 유효한 값을 가진 행 개수
 *              * unique       : 유효한 값들 중 중복을 제거한 고유(Unique) 값의 개수
 *              * null_rate    : 전체 행 중 결측치가 차지하는 비율 (0.0 ~ 1.0)
 *              * unique_ratio : 유효한 값 중 고유값이 차지하는 비율 (1.0에 가까울수록 PK에 적합)
 *              * is_unique    : 빈 값이 전혀 없고, 모든 값이 고유한지 여부 (완벽한 PK 후보 여부)
 */
function profileColumnsWithArquero(records, fieldNames) {
    // 분석할 데이터가 아예 없는 경우, 불필요한 연산을 막기 위해 빈 Map 반환
    if (!records || records.length === 0) return new Map();

    // 일반 JSON 배열을 Arquero 라이브러리가 다룰 수 있는 'Table' 객체로 변환
    const table = aq.from(records);
    
    // 현재 테이블에 실제로 존재하는 컬럼명들만 추출 (빠른 검사를 위해 Set 자료구조 사용)
    const avail = new Set(table.columnNames());
    
    // 최종 통계 결과를 담을 Map 객체 초기화
    const result = new Map();

    for (const field of fieldNames) {
        // 테이블에 존재하지 않는 컬럼을 분석하려고 하면 오류가 나므로 건너뜀(Skip)
        if (!avail.has(field)) continue;

        // 다른 컬럼의 간섭 없이 해당 컬럼 딱 하나만 잘라내서(Select) 분석 속도 최적화
        const col = table.select([field]);
        
        // 전체 행(Row) 개수
        const total = col.numRows();
        
        // null, undefined, 빈 문자열('') 같은 의미 없는 데이터를 제외한 '유효한 데이터'의 개수
        const nonEmpty = col.filter(aq.escape(d => 
            d[field] !== null && 
            d[field] !== undefined && 
            String(d[field]).trim() !== ''
        )).numRows();
        
        // 유효한 데이터 중에서 중복을 제거(dedupe)했을 때 남는 '고유값'의 개수
        const uniqueCount = nonEmpty === 0 ? 0 : col
            .filter(aq.escape(d => 
                d[field] !== null && 
                d[field] !== undefined && 
                String(d[field]).trim() !== ''
            ))
            .dedupe([field]) // 중복 제거 함수
            .numRows();

        // 계산된 지표들을 대문자 필드명을 Key로 하여 Map에 저장
        result.set(field.toUpperCase(), {
            total,                          // 전체 행 수
            non_empty: nonEmpty,            // 유효 데이터 수
            unique: uniqueCount,            // 고유값 개수
            
            // 결측률: (전체 개수 - 유효한 개수) / 전체 개수
            null_rate: total > 0 ? (total - nonEmpty) / total : 0,
            
            // 고유도 비율: 고유값 개수 / 유효한 개수 (1에 가까울수록 식별자로 좋음)
            unique_ratio: nonEmpty > 0 ? uniqueCount / nonEmpty : 0,
            
            // 완벽한 PK 조건: 유효 데이터가 100% 고유하고, 빈 값(Null)도 하나도 없는 경우
            is_unique: uniqueCount === nonEmpty && nonEmpty === total
        });
    }

    return result;
}

/**
 * [복합키(Composite Key) 포함률 계산 함수]
 * 
 * 여러 필드(예: 업소번호 + 제품번호)를 조합하여 만든 복합키가 대상(To) 테이블에 얼마나 포함되어 있는지(Inclusion Rate)를 계산
 *
 * @param {string} fromSvcNo - From 테이블의 고유 번호(캐시 키 생성용)
 * @param {string} toSvcNo - To 테이블의 고유 번호(캐시 키 생성용)
 * @param {object[]} fromRecords - 분석할 From 테이블의 데이터 배열
 * @param {object[]} toRecords - 분석할 To 테이블의 데이터 배열
 * @param {string[]} fields - 복합키를 구성할 컬럼명 배열 (예: ['LCNS_NO', 'BSSH_NO'])
 * @param {Map} valuesCache - 이전 계산 결과를 저장해둔 전역/상위 스코프의 캐시 Map
 */
function getCompositeInclusionStats(fromSvcNo, toSvcNo, fromRecords, toRecords, fields, valuesCache = new Map()) {
    // 입력받은 데이터를 처리하기 쉬운 순수 배열 형태로 변환
    const fromRows = toRecordArray(fromRecords);
    const toRows = toRecordArray(toRecords);
    
    // 어느 한쪽이라도 데이터가 아예 없다면 비교할 필요 없이 바로 0 반환
    if (!fromRows.length || !toRows.length) {
        return {
            from_record_count: fromRows.length,
            to_record_count: toRows.length,
            from_count: 0,
            to_count: 0,
            matched: 0,
            matched_row_count: 0,
            inclusion_ratio: 0,
            checked: false,
            source: 'records'
        };
    }
    // 복합키 문자열 생성용 구분자 (Null 문자 '\x00')
    const SEP = '\x00';
    
    // 값이 비어있는지(null, undefined, 빈 문자열) 확인하는 헬퍼 함수
    const isEmpty = (v) => v === null || v === undefined || String(v).trim() === '';
    
    // 여러 필드의 값을 뽑아 구분자(SEP)로 이어붙인 하나의 '복합키 문자열' 생성
    // 예: { id: 1, type: 'A' } -> "1\x00A"
    const makeKey = (rec) => fields.map(f => String(rec[f] ?? '')).join(SEP);
    
    // 생성된 복합키 문자열이 유효한지 검사
    // 복합키를 구성하는 N개의 필드 중 단 하나라도 값이 비어있다면, 그 키는 무효(버림) 처리
    const isValidKey = (k) => !k.split(SEP).some(isEmpty);
    // 캐시(Cache)를 활용하여 데이터를 Set으로 변환하는 내부 함수
    const getCached = (svcNo, records) => {
        // 캐시 관리를 위한 고유 식별 키 생성 (예: "I1200|COMPOSITE|LCNS_NO,BSSH_NO")
        const key = `${svcNo}|COMPOSITE|${fields.join(',')}`;
        let set = valuesCache.get(key);
        
        if (!set) {
            // 캐시에 없다면 새로 계산: 레코드를 순회하며 키를 만들고 유효한 것만 추려서 Set(중복 제거) 생성
            set = new Set(toRecordArray(records).map(makeKey).filter(isValidKey));
            valuesCache.set(key, set); // 다음 번 검사를 위해 저장
        }
        return set;
    };
    // 양쪽 테이블의 데이터를 각각 고유한 복합키 Set으로 추출 (캐시 활용)
    const fromValues = getCached(fromSvcNo, fromRows);
    const toValues = getCached(toSvcNo, toRows);
    // 순수하게 중복과 NULL이 제거된 최종 고유 키의 개수
    const fromCount = fromValues.size;
    const toCount = toValues.size;
    // 추출된 유효한 키가 하나도 없다면 바로 종료
    if (fromCount === 0 || toCount === 0) {
        return {
            from_record_count: fromRows.length,
            to_record_count: toRows.length,
            from_count: fromCount,
            to_count: toCount,
            matched: 0,
            matched_row_count: 0,
            inclusion_ratio: 0,
            checked: false,
            source: 'records'
        };
    }
    // 교집합 계산 (From의 키가 To의 키 Set 안에 존재하는지 카운트)
    let matched = 0;
    const matchedValues = new Set();
    for (const val of fromValues) {
        if (toValues.has(val)) {
            matched++;
            matchedValues.add(val);
        }
    }
    let matchedRowCount = 0;
    for (const row of fromRows) {
        const key = makeKey(row);
        if (isValidKey(key) && matchedValues.has(key)) matchedRowCount++;
    }
    // 최종 포함률(Inclusion Ratio) 및 통계 결과 반환
    return {
        from_record_count: fromRows.length,
        to_record_count: toRows.length,
        from_count: fromCount,           // From 테이블의 유효 고유 복합키 개수
        to_count: toCount,               // To 테이블의 유효 고유 복합키 개수
        matched,                         // 양쪽에 공통으로 존재하는(매칭된) 키의 개수
        matched_row_count: matchedRowCount,
        inclusion_ratio: matched / fromCount, // 포함률: (매칭 수 / From 전체 수) - 1.0에 가까울수록 강력한 FK
        row_inclusion_ratio: fromRows.length > 0 ? matchedRowCount / fromRows.length : 0,
        checked: true,                   // 정상적으로 검사가 수행되었음을 마킹
        source: 'records'
    };
}

/**
 * [복합 외래키(Composite FK) 후보 탐지 함수]
 * 
 * 복합 PK 후보를 가진 부모(Target) 테이블을 기준으로 삼고, 나머지 다른 테이블들(From)이 해당 복합 필드들을 똑같이 가지고 있으면서 FK 역할을 하는지를 탐지
 *
 * @param {object[]}           datasets - 전체 데이터셋(테이블) 기본 정보 목록
 * @param {object[]}           tableAnalyses - 개별 테이블별로 미리 분석해둔 PK/FK 후보 분석 결과
 * @param {Map<string,object[]>} recordsMap - 메모리에 로드된 전체 테이블의 실제 데이터(레코드) Map
 * @param {Map}                valuesCache - 성능 최적화를 위해 이전 단계에서부터 공유되는 Set 캐시
 * @returns {object[]} 최종적으로 탐지된 복합 FK 후보 목록
 */
function detectCompositeFkCandidates(datasets, tableAnalyses, recordsMap, valuesCache = new Map()) {
    const results = [];
    // 똑같은 (From 테이블 + 필드 조합 + To 테이블) 관계를 두 번 검사하지 않기 위한 중복 방지용 Set
    const seenKeys = new Set();
    const reverseSeenKeys = new Set();

    // 모든 테이블을 순회하며 '부모(To/Target) 테이블' 역할을 할 수 있는지 검사
    for (const targetTable of tableAnalyses) {
        
        // 부모 테이블이 되려면 먼저 쓸만한 '복합 기본키(Composite PK)'를 가지고 있어야 함
        // 신뢰도가 너무 낮은(LOW) 후보는 오탐지의 원인이 되므로 제외
        const compositePks = targetTable.pk_candidates.filter(
            pk => pk.type === 'composite' && pk.confidence !== 'LOW'
        );
        if (compositePks.length === 0) continue; // 복합 PK가 없으면 부모 테이블 자격 미달로 패스

        // 부모 테이블의 실제 데이터를 꺼내오고、 데이터가 없으면 포함률 검사를 할 수 없으니 패스
        const toRecords = recordsMap.get(targetTable.svc_no) || [];
        if (toRecords.length === 0) continue;

        // 모든 다른 테이블을 순회하며, 부모 테이블의 복합 PK 후보와 맞는 FK 후보가 있는지 검사
        for (const ds of datasets) {
            const fromSvcNo = String(ds.svc_no || '').trim();
            
            // 자기 자신(부모=자식)을 참조하는 경우는 일반적이지 않으므로 건너뜀
            if (fromSvcNo === targetTable.svc_no) continue;

            // 자식 테이블의 실제 데이터를 꺼내옴
            const fromRecords = recordsMap.get(fromSvcNo) || [];
            if (fromRecords.length === 0) continue;

            // 자식 테이블이 어떤 컬럼들을 가지고 있는지 빠르게 확인하기 위해 컬럼명 Set을 만듦
            const fromFieldSet = new Set(Object.keys(fromRecords[0]).map(k => k.toUpperCase()));

            // 부모 테이블이 가진 복합 PK 후보들을 하나씩 꺼내어 자식 테이블과 맞춰봅니다.
            // 성능 폭발을 막기 위해 가장 가능성이 높은 상위 2개의 복합 PK 후보만 검사
            for (const pk of compositePks.slice(0, 2)) {
                const pkFields = pk.fields;

                // 자식 테이블이 부모의 복합키 필드(예: A, B 컬럼)를 전부 가지고 있지 않다면 아예 검사할 필요가 없음
                if (!pkFields.every(f => fromFieldSet.has(f.toUpperCase()))) continue;

                // 복합키에 '이름(_NM)', '주소' 같은 설명성 텍스트 필드가 껴있다면 FK일 확률이 없으므로 버림
                if (pkFields.some(f => isExcludedFkField(f))) continue;

                // "자식테이블 | 필드조합 | 부모테이블" 형태의 키를 만들어, 이미 검사한 이력이 있는지 확인합니다.
                const dedupeKey = [fromSvcNo, pkFields.join('+'), targetTable.svc_no].join('|');
                if (seenKeys.has(dedupeKey)) continue;
                const reverseKey = [targetTable.svc_no, pkFields.join('+'), fromSvcNo].join('|');
                if (reverseSeenKeys.has(reverseKey)) continue;
                seenKeys.add(dedupeKey);

                // '포함률(Inclusion Rate)' 계산 로직 호출
                const stats = getCompositeInclusionStats(fromSvcNo, targetTable.svc_no, fromRecords, toRecords, pkFields, valuesCache);
                
                // 검증 불가 또는 매칭이 전혀 없으면 복합 FK 후보에서 제외
                if (!stats.checked || stats.inclusion_ratio <= 0 || stats.matched < FK_MIN_MATCHED_COUNT) continue;

                // 5. 포함률을 기반으로 최종 FK 신뢰도 점수를 매김
                // 기본점수 55점 + (포함률 최대 35점) + (부모 PK가 매우 확실할 경우 가산점 10점) = 최대 100점
                const confirmedByData = stats.inclusion_ratio >= FK_MIN_INCLUSION_RATIO && stats.matched >= FK_MIN_MATCHED_COUNT;
                const score = Math.min(
                    Math.round(55 + stats.inclusion_ratio * 35 + (pk.confidence === 'HIGH' ? 10 : 0) - (pk.fields.length >= 3 ? 5 : 0)),
                    95 // 점수가 너무 넘치지 않게 95점으로 상한선(Cap)을 둠
                );
                
                // 점수 구간에 따라 등급(HIGH, MEDIUM, LOW)을 부여
                const confidence = confirmedByData
                    ? (score >= 80 ? 'HIGH' : score >= 65 ? 'MEDIUM' : 'LOW')
                    : 'SUGGESTED';

                // 6. 훌륭한 복합 FK 후보를 찾았으므로 최종 결과 배열에 담음
                results.push({
                    from_table: fromSvcNo,                      // 자식 테이블 ID
                    from_table_name: String(ds.svc_nm || '').trim(), // 자식 테이블 이름
                    from_fields: pkFields,                      // 외래키로 쓰인 컬럼들
                    to_table: targetTable.svc_no,               // 참조하는 부모 테이블 ID
                    to_table_name: targetTable.svc_nm,          // 참조하는 부모 테이블 이름
                    to_fields: pkFields,                        // 참조되는 부모의 기본키 컬럼들
                    pk_confidence: pk.confidence,               // 부모 PK의 신뢰도 수준
                    inclusion_check: stats,                     // 포함률 통계 결과 원본
                    score,                                      // 최종 산정된 FK 퀄리티 점수
                    confidence,                                 // 최종 FK 신뢰도 등급
                    relation_type: confirmedByData ? 'COMPOSITE_FK' : 'SUGGESTED_COMPOSITE_FK',
                    reason: `복합키 ${pkFields.join(' + ')} 포함률 ${(stats.inclusion_ratio * 100).toFixed(1)}%, 매칭 고유값 ${stats.matched}개, 매칭 row ${stats.matched_row_count}건`,
                    review_evidence: {
                        pk_confidence: pk.confidence,
                        pk_score: pk.score,
                        key_size: pkFields.length,
                        inclusion_ratio: stats.inclusion_ratio,
                        matched_count: stats.matched,
                        matched_row_count: stats.matched_row_count,
                        from_unique_count: stats.from_count,
                        to_unique_count: stats.to_count,
                        threshold: {
                            min_inclusion_ratio: FK_MIN_INCLUSION_RATIO,
                            min_matched_count: FK_MIN_MATCHED_COUNT
                        },
                        decision: confirmedByData ? 'COMPOSITE_FK' : 'SUGGESTED_COMPOSITE_FK',
                        reasons: [
                            `부모 복합 PK 신뢰도 ${pk.confidence}`,
                            `포함률 ${(stats.inclusion_ratio * 100).toFixed(1)}%`,
                            `매칭 고유값 ${stats.matched}개`,
                            `매칭 row ${stats.matched_row_count}건`
                        ]
                    }
                });
                reverseSeenKeys.add(dedupeKey);
            }
        }
    }

    // 찾아낸 모든 복합 FK 후보들을 점수가 가장 높은 순서(내림차순)로 정렬하여 반환
    return results.sort((a, b) => b.score - a.score);
}


// =============================================================================
// 8. FK 후보 분석 — 정제 반영 버전
// =============================================================================

// tableAnalyses 배열을 svcNo → 분석 결과 Map으로 변환
function createTableLookup(tableAnalyses) {
    const map = new Map();
    for (const table of tableAnalyses) {
        map.set(normalizeSvcNo(table.svc_no), table);
    }
    return map;
}

// 모든 테이블의 PK 후보를 필드명 기준으로 역인덱싱해 FK 탐색 속도를 높임
function buildPkFieldIndex(tableAnalyses) {
    const pkFieldIndex = new Map();

    for (const table of tableAnalyses) {
        const bestSinglePk = table.pk_candidates.find(pk => pk.type === 'single');
        if (!bestSinglePk) continue;

        // 집계 테이블(aggregate_table)은 부모 FK 후보에서 제외한다.
        // 이런 테이블의 "PK"는 실제 식별자가 아니므로 FK 부모로 사용하면 안 된다.
        if (bestSinglePk.type === 'aggregate_table') continue;

        // MEDIUM 이상만 부모 후보로 허용 (LOW 신뢰도는 제외)
        if (bestSinglePk.confidence === 'LOW') continue;

        const pkField = bestSinglePk.fields[0].toUpperCase();
        if (!pkFieldIndex.has(pkField)) pkFieldIndex.set(pkField, []);
        pkFieldIndex.get(pkField).push({
            svc_no: table.svc_no,
            svc_nm: table.svc_nm,
            pk: bestSinglePk
        });
    }

    return pkFieldIndex;
}

// 공통키에 대표 마스터 규칙이 있으면 해당 마스터 테이블만 부모 후보로 좁힘
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

// 이 테이블이 해당 키의 대표 마스터이면 자식 FK 생성 대상에서 제외함
function shouldSkipByMasterRule(fromSvcNo, fieldName, existingSvcNoSet) {
    const upperField = String(fieldName || '').trim().toUpperCase();
    if (!hasMasterRule(upperField)) return false;

    // 대표 마스터 테이블은 부모 역할로 보는 것이 자연스럽다.
    // 따라서 자기 자신이 해당 키의 대표 마스터면 다른 마스터/주변 테이블을 참조하는 FK 생성을 막는다.
    return isMasterTableForKey(fromSvcNo, upperField, existingSvcNoSet);
}

// FK 후보 하나에 대해 포함률·도메인 규칙·유사도를 종합해 점수와 관계 유형을 결정함
function scoreFkCandidate({ field, target, fromSvcNo, fromSvcNm, fromRecords, toRecords, fieldName, fuseIndex = null, thresholds = null, valuesCache = new Map() }) {
    const fieldSimilarity = target.fieldSimilarity ?? 1.0;
    const exactFieldMatch = target.exactFieldMatch ?? true;
    const minRatio = thresholds?.min ?? FK_MIN_INCLUSION_RATIO;
    const strongRatio = thresholds?.strong ?? FK_STRONG_INCLUSION_RATIO;
    let score = 45;
    const reasons = [];

    // 필드명 유사 매칭 패널티 (정확히 일치하지 않으면 감점)
    if (!exactFieldMatch) {
        const penalty = Math.round((1 - fieldSimilarity) * FIELD_SIMILARITY_PENALTY);
        score -= penalty;
        reasons.push(`필드명 유사 매칭 유사도 ${(fieldSimilarity * 100).toFixed(0)}% (정규화 기준, -${penalty}점)`);
    }

    score += target.pk.score * 0.25;
    reasons.push(`대상 테이블 ${target.svc_no}의 PK 후보(${target.pk.confidence})와 동일 필드`);

    const upperField = fieldName.toUpperCase();
    if (isKnownRelationKey(upperField)) { score += 18; reasons.push('공통 관계키 목록에 포함'); }
    if (isCodeField(field)) { score += 10; reasons.push('코드 계열 필드'); }

    if (hasMasterRule(upperField)) {
        score += 15;
        reasons.push('대표 마스터 테이블 규칙 적용');
    }

    const domainScore = getDomainScore(fromSvcNm, target.svc_nm);
    if (domainScore < 0) {
        return {
            skip: true,
            skip_reason: '이기종 도메인 교차 연결 제한 (Root Domain 불일치)',
            inclusion: { checked: false, inclusion_ratio: 0 },
            score: 0,
            reasons: ['다른 대분류 도메인과의 조인 방지']
        };
    } else if (domainScore > 0) {
        score += domainScore;
        reasons.push(`데이터셋명 도메인 유사성 가산점 +${domainScore}`);
    }

    const inclusion = getInclusionStats(fromSvcNo, target.svc_no, fromRecords, toRecords, fieldName, target.pk.fields[0], valuesCache);
    const hasEnoughMatch = inclusion.checked &&
        inclusion.inclusion_ratio >= minRatio &&
        inclusion.matched_count >= FK_MIN_MATCHED_COUNT;
    const hasAnyMatch = inclusion.checked && inclusion.matched_count > 0;

    // ==== 데이터 샘플 크기 한계로 인해 교집합이 없어도 
    // FK_ALLOW_UNCHECKED가 true라면 강제 스킵하지 않고 이후 점수로 평가하도록 변경 ====
    if ((!inclusion.checked || inclusion.inclusion_ratio <= 0) && !FK_ALLOW_UNCHECKED) {
        return {
            skip: true,
            skip_reason: '데이터가 없거나 조인(교집합)되는 값이 없음',
            inclusion,
            score: 0,
            reasons: []
        };
    }

    let relationType = 'UNVERIFIED';

    // 방향 B: 업무 명칭 기반 부모-자식 관계 규칙
    // 데이터셋명으로 보아 명백히 부모-자식 관계인 경우, 값 포함률이 낮거나(0% 포함) 미검증이어도 CONFIRMED로 승격
    const domainConfirmed = matchesDomainParentChildRuleFuzzy(fromSvcNm, target.svc_nm, fuseIndex);
    if (domainConfirmed) {
        score += FK_DOMAIN_CONFIRMED_BONUS;
        reasons.push(`업무 명칭 규칙: "${fromSvcNm}" → "${target.svc_nm}" 부모-자식 관계 확인`);
    }
    // =============================================================================───────────────────────

    if (inclusion.checked) {
        const pct = (inclusion.inclusion_ratio * 100).toFixed(1);

        if (inclusion.inclusion_ratio >= strongRatio && inclusion.matched_count >= FK_MIN_MATCHED_COUNT) {
            score += 30;
            relationType = 'CONFIRMED';
            reasons.push(`값 포함률 ${pct}%, 매칭 고유값 ${inclusion.matched_count}개, 매칭 row ${inclusion.matched_row_count}건`);
        } else if (hasEnoughMatch) {
            score += 15;
            relationType = 'CONFIRMED';
            reasons.push(`값 포함률 ${pct}%, 매칭 고유값 ${inclusion.matched_count}개, 매칭 row ${inclusion.matched_row_count}건`);
        } else if (hasAnyMatch) {
            score += 5;
            relationType = domainConfirmed ? 'SUGGESTED' : 'UNVERIFIED';
            reasons.push(`값 포함률 ${pct}%, 매칭 고유값 ${inclusion.matched_count}개 — 확정 기준(${(minRatio * 100).toFixed(1)}%, ${FK_MIN_MATCHED_COUNT}개) 미달`);
        } else {
            score -= 20;
            relationType = domainConfirmed ? 'UNVERIFIED' : 'UNVERIFIED';
            reasons.push(`값 포함률 낮음 ${pct}% — UNVERIFIED 분류`);
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
            relationType = 'UNVERIFIED';
            reasons.push('샘플 부족으로 값 포함률 미검증 — UNVERIFIED 분류');
        } else {
            relationType = 'SUGGESTED';
            reasons.push('샘플 부족으로 값 포함률 미검증 — 업무 명칭 규칙 기반 SUGGESTED 분류');
        }
    }

    if (relationType === 'UNVERIFIED' && domainConfirmed && hasAnyMatch) {
        relationType = 'SUGGESTED';
        reasons.push('업무 명칭 규칙과 일부 값 매칭으로 SUGGESTED 승격');
    }

    // 확정은 값 포함률과 매칭 수 기준을 모두 충족해야 유지
    if (relationType === 'CONFIRMED') {
        if (!hasEnoughMatch) {
            relationType = 'SUGGESTED';
            score -= 15;
            reasons.push('확정 기준 미달 → SUGGESTED 강등 (-15)');
        }
    }
    const finalScore = Math.min(Math.max(Math.round(score), 0), 100);

    if ((relationType === 'SUGGESTED' || relationType === 'UNVERIFIED') && finalScore < FK_SUGGESTED_MIN_SCORE) {
        return {
            skip: true,
            skip_reason: `${relationType} 후보 점수 ${finalScore}점으로 기준 미달`,
            inclusion,
            score: finalScore,
            reasons
        };
    }

    return {
        skip: false,
        score: finalScore,
        confidence: relationType === 'CONFIRMED' ? getConfidence(finalScore) : relationType,
        relation_type: relationType,
        inclusion,
        reasons
    };
}

/**
 * 대상 데이터셋의 단일 필드들이 다른 테이블의 단일키(PK)를 참조하는 외래키(FK)인지 분석하고 점수를 매김
 */
function analyzeFkCandidates(datasets, tableAnalyses, recordsMap = new Map(), fuseIndex = null, thresholds = null, valuesCache = new Map()) {
    const tableLookup = createTableLookup(tableAnalyses);
    const existingSvcNoSet = new Set(tableAnalyses.map(t => normalizeSvcNo(t.svc_no)));
    const pkFieldIndex = buildPkFieldIndex(tableAnalyses);

    const relationships = [];
    const rejectedRelationships = [];
    // 순환 참조 탐지용 Set: "toTable|toField|fromTable|fromField" 형태로 기존 관계를 기록
    const reverseRelSet = new Set();

    for (const ds of datasets) {
        const fromSvcNo = String(ds.svc_no || '').trim();
        const fromSvcNm = String(ds.svc_nm || '').trim();
        if (!fromSvcNo) continue;

        const fromRecords = recordsMap.get(fromSvcNo) || [];
        const colMap = buildColMap(ds, fromRecords);
        const fields = [...colMap.values()];

        for (const field of fields) {
            const fieldName = getFieldName(field);
            const upperField = fieldName.toUpperCase();
            if (!fieldName) continue;

            if (isExcludedFkField(fieldName)) continue;
            if (!isKnownRelationKey(upperField) && !isCodeField(field) && !isStrongIdentifierField(field)) continue;

            // 마스터 테이블은 부모로 사용하고, 자식 FK 생성 대상에서는 제외한다.
            if (shouldSkipByMasterRule(fromSvcNo, upperField, existingSvcNoSet)) continue;

            const similarPkFields = findSimilarPkFields(upperField, pkFieldIndex);
            if (similarPkFields.length === 0) continue;

            // 유사 필드별 타겟 테이블 취합 (중복 제거)
            const seenTargetSvcNo = new Set();
            let targets = [];
            for (const match of similarPkFields) {
                const matchTargets = (pkFieldIndex.get(match.key) || []).map(t => ({
                    ...t,
                    matchedPkField: match.key,
                    fieldSimilarity: match.similarity,
                    exactFieldMatch: match.exact
                }));
                for (const t of matchTargets) {
                    const dedupeKey = `${t.svc_no}|${match.key}`;
                    if (!seenTargetSvcNo.has(dedupeKey)) {
                        seenTargetSvcNo.add(dedupeKey);
                        targets.push(t);
                    }
                }
            }
            targets = pickTargetTablesByMasterRule(upperField, targets, existingSvcNoSet);

            const candidatesForField = [];

            for (const target of targets) {
                if (target.svc_no === fromSvcNo) continue;

                // 순환 참조 방지 (O(1) Set 조회)
                if (reverseRelSet.has(`${target.svc_no}|${target.pk.fields[0]}|${fromSvcNo}|${fieldName}`)) continue;

                const toRecords = recordsMap.get(target.svc_no) || [];
                const scored = scoreFkCandidate({
                    field,
                    target,
                    fromSvcNo,
                    fromSvcNm,
                    fromRecords,
                    toRecords,
                    fieldName,
                    fuseIndex,
                    thresholds,
                    valuesCache
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
                    to_field: target.matchedPkField || target.pk.fields[0],
                    to_kor_nm: target.pk.kor_names[0],
                    field_similarity: target.fieldSimilarity ?? 1.0,
                    exact_field_match: target.exactFieldMatch ?? true,
                    score: scored.score,
                    confidence: scored.confidence,
                    relation_type: scored.relation_type,
                    inclusion_check: scored.inclusion,
                    reason: scored.reasons.join(' / '),
                    review_evidence: {
                        pk_confidence: target.pk.confidence,
                        pk_score: target.pk.score,
                        exact_field_match: target.exactFieldMatch ?? true,
                        field_similarity: target.fieldSimilarity ?? 1.0,
                        inclusion_ratio: scored.inclusion?.inclusion_ratio ?? 0,
                        matched_count: scored.inclusion?.matched_count ?? 0,
                        matched_row_count: scored.inclusion?.matched_row_count ?? 0,
                        from_unique_count: scored.inclusion?.from_unique_count ?? 0,
                        to_unique_count: scored.inclusion?.to_unique_count ?? 0,
                        threshold: {
                            min_inclusion_ratio: thresholds?.min ?? FK_MIN_INCLUSION_RATIO,
                            min_matched_count: FK_MIN_MATCHED_COUNT,
                            strong_inclusion_ratio: thresholds?.strong ?? FK_STRONG_INCLUSION_RATIO
                        },
                        decision: scored.relation_type,
                        reasons: scored.reasons
                    }
                });
            }

            // 같은 From Table.Field에서 부모 후보가 너무 많이 붙는 것을 제한한다.
            candidatesForField
                .sort((a, b) => b.score - a.score)
                .slice(0, FK_MAX_PER_FROM_FIELD)
                .forEach(rel => {
                    relationships.push(rel);
                    reverseRelSet.add(`${rel.from_table}|${rel.from_field}|${rel.to_table}|${rel.to_field}`);
                });
        }
    }

    return {
        relationships: removeDuplicateRelationships(relationships).sort((a, b) => b.score - a.score),
        rejected_relationships: removeDuplicateRejectedRelationships(rejectedRelationships)
    };
}

// from/to 테이블+필드 조합이 동일한 중복 FK 관계를 제거함
function removeDuplicateRelationships(relationships) {
    const seen = new Set();
    return relationships.filter(rel => {
        const key = [rel.from_table, rel.from_field, rel.to_table, rel.to_field].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// 제외 사유까지 포함해 완전히 동일한 중복 제외 관계를 제거함
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
// 9. 컬럼 Map 구성
// =============================================================================

/**
 * API 데이터셋 메타정보(ds.fields)와 실제 샘플 데이터의 키를 취합하여,
 * 중복 없는 전체 컬럼 맵(Map)을 생성합니다.
 */
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
                field: fname,
                kor_nm: String(f.kor_nm || '').trim(),
                sqlType: f.sqlType || undefined,
                type: String(f.type || ''),
                length: String(f.length || ''),
                desc: String(f.desc || ''),
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
// 9-1. FK 그래프 분석 (graphology)
// =============================================================================

/**
 * FK 관계(단일+복합)로 방향 그래프를 구성
 * from → to 방향: 자식(참조하는 쪽) → 부모(마스터)
 */
function buildFkGraph(tableAnalyses, relationships, compositeFks) {
    const graph = new DirectedGraph({ multi: false, allowSelfLoops: false });

    for (const t of tableAnalyses) {
        graph.mergeNode(t.svc_no, { svc_nm: t.svc_nm, cat: t.cat });
    }

    for (const rel of relationships) {
        if (rel.relation_type === 'UNVERIFIED') continue;
        graph.mergeNode(rel.from_table);
        graph.mergeNode(rel.to_table);
        if (!graph.hasEdge(rel.from_table, rel.to_table)) {
            graph.addEdge(rel.from_table, rel.to_table, {
                field: rel.from_field,
                score: rel.score,
                relation_type: rel.relation_type
            });
        }
    }

    for (const fk of (compositeFks || [])) {
        if (fk.relation_type !== 'COMPOSITE_FK') continue;
        graph.mergeNode(fk.from_table);
        graph.mergeNode(fk.to_table);
        if (!graph.hasEdge(fk.from_table, fk.to_table)) {
            graph.addEdge(fk.from_table, fk.to_table, {
                field: fk.from_fields.join('+'),
                score: fk.score,
                relation_type: 'COMPOSITE_FK'
            });
        }
    }

    return graph;
}

/**
 * in-degree 기준으로 테이블을 순위화
 * in-degree >= 2 이고 out-degree 가 작은 테이블 = 마스터 테이블 후보
 * graphology-metrics의 in-degree centrality를 함께 계산해 그래프 크기에 따라
 * 정규화된 중심성 지표도 제공한다 (마스터 테이블 판단의 보조 근거)
 */
function computeInDegreeRanking(graph, tableAnalyses) {
    const tableMap = new Map(tableAnalyses.map(t => [t.svc_no, t]));

    return graph.nodes()
        .map(node => {
            const inDeg = graph.inDegree(node);
            return {
                svc_no: node,
                svc_nm: tableMap.get(node)?.svc_nm || node,
                in_degree: inDeg,
                out_degree: graph.outDegree(node),
                in_degree_centrality: graph.order > 1 ? inDeg / (graph.order - 1) : 0,
                is_derived_master: inDeg >= 2
            };
        })
        .sort((a, b) => b.in_degree - a.in_degree || a.out_degree - b.out_degree);
}

/**
 * 사이클을 가장 작은(사전순) 노드가 맨 앞에 오도록 회전시켜 정규화
 * 서로 다른 시작점에서 탐지된 동일한 사이클(A→B→C→A 를 A, B, C 각각에서 발견)을 같은 표현으로 만들어 중복 제거에 사용
 */
function normalizeCycle(cycle) {
    if (cycle.length === 0) return cycle;
    let minIdx = 0;
    for (let i = 1; i < cycle.length; i++) {
        if (cycle[i] < cycle[minIdx]) minIdx = i;
    }
    return [...cycle.slice(minIdx), ...cycle.slice(0, minIdx)];
}

/**
 * DFS로 순환 FK 참조를 탐지
 *
 * @returns {string[][]} 각 사이클에 포함된 테이블 목록 (중복 제거됨)
 */
function detectFkCycles(graph) {
    const visited = new Set();
    const cycles = [];

    for (const start of graph.nodes()) {
        if (visited.has(start)) continue;

        // 반복 DFS: [node, path, neighborIndex] 스택
        const recStack = new Set();
        const stack = [[start, [start], 0]];

        while (stack.length > 0) {
            const frame = stack[stack.length - 1];
            const [node, path, nIdx] = frame;

            if (nIdx === 0) {
                visited.add(node);
                recStack.add(node);
            }

            const neighbors = graph.outNeighbors(node);

            if (nIdx >= neighbors.length) {
                recStack.delete(node);
                stack.pop();
                continue;
            }

            frame[2]++;
            const nb = neighbors[nIdx];

            if (!visited.has(nb)) {
                stack.push([nb, [...path, nb], 0]);
            } else if (recStack.has(nb)) {
                const idx = path.indexOf(nb);
                cycles.push(idx >= 0 ? path.slice(idx) : [node, nb]);
            }
        }
    }

    // 회전 정규화 후 중복 사이클 제거
    const seen = new Set();
    const deduped = [];
    for (const cycle of cycles) {
        const normalized = normalizeCycle(cycle);
        const key = normalized.join('->');
        if (seen.has(key)) continue;
        seen.add(key);
        deduped.push(normalized);
    }
    return deduped;
}

/**
 * 위상 정렬을 수행 결과 순서대로 CREATE TABLE을 실행하면 FK 제약조건 위반 없이 DDL 실행 가능
 * graphology-dag의 검증된 구현을 사용하며, 사이클이 있는 그래프(DAG 아님)에서는 Kahn 알고리즘 기반 부분 순서로 대체해 사이클이 있어도 최대한 유용한 순서를 제공
 *
 * @returns {{ order: string[], is_dag: boolean }}
 */
function computeTopologicalOrder(graph) {
    if (!hasCycle(graph)) {
        return { order: topologicalSort(graph), is_dag: true };
    }

    // 사이클이 있는 그래프: graphology-dag의 topologicalSort는 DAG가 아니면 예외를 던지므로
    // 검토용 부분 순서(Kahn)를 직접 계산해 is_dag: false로 반환한다.
    const inDeg = new Map(graph.nodes().map(n => [n, graph.inDegree(n)]));
    const queue = graph.nodes().filter(n => inDeg.get(n) === 0);
    const order = [];
    let head = 0;

    while (head < queue.length) {
        const node = queue[head++];
        order.push(node);
        for (const nb of graph.outNeighbors(node)) {
            const d = inDeg.get(nb) - 1;
            inDeg.set(nb, d);
            if (d === 0) queue.push(nb);
        }
    }

    return { order, is_dag: false };
}

/**
 * 무방향 BFS로 연결 컴포넌트(도메인 클러스터)를 찾는다.
 * FK로 연결된 테이블 묶음 = 자연스러운 업무 도메인 단위.
 */
function computeConnectedComponents(graph) {
    const visited = new Set();
    const components = [];

    for (const start of graph.nodes()) {
        if (visited.has(start)) continue;
        const comp = [];
        const queue = [start];
        let head = 0;

        while (head < queue.length) {
            const node = queue[head++];
            if (visited.has(node)) continue;
            visited.add(node);
            comp.push(node);
            const neighbors = [...new Set([...graph.inNeighbors(node), ...graph.outNeighbors(node)])];
            for (const nb of neighbors) {
                if (!visited.has(nb)) queue.push(nb);
            }
        }
        components.push(comp);
    }

    return components.sort((a, b) => b.length - a.length);
}

// graphology-metrics 기반 중심성 계산
function computeCentralityRanking(graph, tableAnalyses) {
    const tableMap = new Map(tableAnalyses.map(t => [t.svc_no, t]));
    let pageRankScores = {};
    let betweennessScores = {};
    let closenessScores = {};

    try { pageRankScores = pagerank(graph); } catch (_) { pageRankScores = {}; }
    try { betweennessScores = betweenness(graph); } catch (_) { betweennessScores = {}; }
    try { closenessScores = closeness(graph); } catch (_) { closenessScores = {}; }

    return graph.nodes()
        .map(node => {
            const inDeg = graph.inDegree(node);
            const outDeg = graph.outDegree(node);
            const pr = Number(pageRankScores[node] || 0);
            const btw = Number(betweennessScores[node] || 0);
            const cls = Number(closenessScores[node] || 0);
            const degreeScore = graph.order > 1 ? (inDeg + outDeg) / (graph.order - 1) : 0;

            return {
                svc_no: node,
                svc_nm: tableMap.get(node)?.svc_nm || node,
                cat: tableMap.get(node)?.cat || '',
                in_degree: inDeg,
                out_degree: outDeg,
                pagerank: Number(pr.toFixed(6)),
                betweenness: Number(btw.toFixed(6)),
                closeness: Number(cls.toFixed(6)),
                centrality_score: Number((pr * 100 + degreeScore * 30 + cls * 10 + btw).toFixed(3))
            };
        })
        .sort((a, b) => b.centrality_score - a.centrality_score);
}

// 컴포넌트별 테마 후보 생성
function buildThemeCandidates(components, tableAnalyses, relationships, centralityRanking) {
    const tableMap = new Map(tableAnalyses.map(t => [t.svc_no, t]));
    const centralityMap = new Map(centralityRanking.map(t => [t.svc_no, t]));
    const stopWords = new Set(['정보', '현황', '조회', '목록', '데이터', '식품', '안전나라', 'Open', 'API']);

    function collectNameTokens(tables) {
        const counts = new Map();
        for (const svcNo of tables) {
            const name = tableMap.get(svcNo)?.svc_nm || '';
            const tokens = name.split(/[\s/()·,.]+/).map(t => t.trim()).filter(t => t.length >= 2 && !stopWords.has(t));
            for (const token of tokens) counts.set(token, (counts.get(token) || 0) + 1);
        }
        return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([token]) => token);
    }

    return components
        .filter(comp => comp.length >= 2)
        .map((comp, idx) => {
            const compSet = new Set(comp);
            const categories = new Map();
            const joinKeys = new Map();
            let relationCount = 0;

            for (const svcNo of comp) {
                const cat = tableMap.get(svcNo)?.cat || '기타';
                categories.set(cat, (categories.get(cat) || 0) + 1);
            }

            for (const rel of relationships) {
                if (!compSet.has(rel.from_table) || !compSet.has(rel.to_table)) continue;
                relationCount++;
                const key = String(rel.to_field || rel.from_field || '').toUpperCase();
                if (key) joinKeys.set(key, (joinKeys.get(key) || 0) + 1);
            }

            const topCategories = Array.from(categories.entries()).sort((a, b) => b[1] - a[1]);
            const topTokens = collectNameTokens(comp).slice(0, 2);
            const hubTables = comp
                .map(svcNo => centralityMap.get(svcNo) || {
                    svc_no: svcNo,
                    svc_nm: tableMap.get(svcNo)?.svc_nm || svcNo,
                    centrality_score: 0,
                    in_degree: 0,
                    out_degree: 0
                })
                .sort((a, b) => b.centrality_score - a.centrality_score)
                .slice(0, 3);
            const themeName = topTokens.length > 0
                ? `${topTokens.join('·')} 데이터 세트`
                : `${topCategories[0]?.[0] || '연계'} 데이터 세트`;

            return {
                theme_id: `THEME_${String(idx + 1).padStart(2, '0')}`,
                theme_name: themeName,
                size: comp.length,
                relation_count: relationCount,
                main_categories: topCategories.slice(0, 3).map(([cat, count]) => ({ cat, count })),
                hub_tables: hubTables.map(t => ({
                    svc_no: t.svc_no,
                    svc_nm: t.svc_nm,
                    in_degree: t.in_degree,
                    out_degree: t.out_degree,
                    centrality_score: t.centrality_score
                })),
                join_keys: Array.from(joinKeys.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([field, count]) => ({ field, count })),
                tables: comp.map(svcNo => ({
                    svc_no: svcNo,
                    svc_nm: tableMap.get(svcNo)?.svc_nm || svcNo,
                    cat: tableMap.get(svcNo)?.cat || ''
                }))
            };
        })
        .sort((a, b) => b.relation_count - a.relation_count || b.size - a.size);
}

// 대표 연결 경로 산출
function buildConnectionPaths(graph, centralityRanking, relationships, maxPaths = 30) {
    const relationMap = new Map();
    for (const rel of relationships) {
        relationMap.set(`${rel.from_table}->${rel.to_table}`, rel);
    }

    const sources = centralityRanking
        .filter(t => t.out_degree > 0)
        .sort((a, b) => b.out_degree - a.out_degree || b.centrality_score - a.centrality_score)
        .slice(0, 20);
    const targets = centralityRanking
        .filter(t => t.in_degree > 0)
        .sort((a, b) => b.in_degree - a.in_degree || b.centrality_score - a.centrality_score)
        .slice(0, 20);

    const paths = [];
    const seen = new Set();

    for (const source of sources) {
        if (paths.length >= maxPaths) break;
        const reachability = undirectedSingleSourceLength(graph, source.svc_no);

        for (const target of targets) {
            if (paths.length >= maxPaths) break;
            if (source.svc_no === target.svc_no) continue;
            if (!Object.prototype.hasOwnProperty.call(reachability, target.svc_no)) continue;

            const nodePath = bidirectional(graph, source.svc_no, target.svc_no);
            if (!nodePath || nodePath.length < 2) continue;

            const key = nodePath.join('->');
            if (seen.has(key)) continue;
            seen.add(key);

            const edges = [];
            for (let i = 0; i < nodePath.length - 1; i++) {
                const from = nodePath[i];
                const to = nodePath[i + 1];
                const rel = relationMap.get(`${from}->${to}`);
                edges.push({
                    from,
                    to,
                    field: rel?.from_field || '',
                    to_field: rel?.to_field || '',
                    relation_type: rel?.relation_type || '',
                    score: rel?.score || 0
                });
            }

            paths.push({
                from: source.svc_no,
                from_name: source.svc_nm,
                to: target.svc_no,
                to_name: target.svc_nm,
                hop_count: nodePath.length - 1,
                path: nodePath,
                edges
            });
        }
    }

    return paths.sort((a, b) => a.hop_count - b.hop_count || a.from.localeCompare(b.from)).slice(0, maxPaths);
}

/**
 * PK/FK 관계로 방향 그래프를 구성하고 in-degree 기반 마스터 테이블 추출, 순환 참조 감지, 위상 정렬, 도메인 클러스터링을 수행
 */
function analyzeGraphStructure(tableAnalyses, relationships, compositeFks) {
    const graph = buildFkGraph(tableAnalyses, relationships, compositeFks);
    const inDegRanking = computeInDegreeRanking(graph, tableAnalyses);
    const centralityRanking = computeCentralityRanking(graph, tableAnalyses);
    const cycles = detectFkCycles(graph);
    const topoResult = computeTopologicalOrder(graph);
    const components = computeConnectedComponents(graph);
    const themeCandidates = buildThemeCandidates(components, tableAnalyses, relationships, centralityRanking);
    const connectionPaths = buildConnectionPaths(graph, centralityRanking, relationships);

    const derivedMasters = inDegRanking
        .filter(t => t.is_derived_master)
        .map(t => ({ svc_no: t.svc_no, svc_nm: t.svc_nm, in_degree: t.in_degree }));

    return {
        node_count: graph.order,
        edge_count: graph.size,
        in_degree_ranking: inDegRanking,
        centrality_ranking: centralityRanking,
        derived_master_tables: derivedMasters,
        cycles,
        has_cycles: cycles.length > 0,
        topological_order: topoResult.order,
        is_dag: topoResult.is_dag,
        domain_clusters: components.map((comp, i) => ({
            cluster_id: i + 1,
            size: comp.length,
            tables: comp
        })),
        dataset_clusters: themeCandidates,
        theme_candidates: themeCandidates,
        connection_paths: connectionPaths
    };
}


// =============================================================================
// 10. 핵심 분석 함수 — analyze()
// =============================================================================

/**
 * 전체 데이터셋과 샘플 레코드를 받아 PK/FK 후보 분석 결과를 반환
 *
 * @param {object[]} datasets - crawl_cache.json의 데이터셋 메타 배열
 * @param {Map<string, object[]>} recordsMap - svcNo → 레코드 배열
 * @param {{ min: number, strong: number }|null} thresholds - FK 포함률 임계값 (null이면 상수 기본값 사용)
 * @returns {object} 분석 결과 (tables, relationships, composite_fks, graph_analysis 포함)
 */
function analyze(datasets, recordsMap = new Map(), thresholds = null) {
    const parsedDatasets = DatasetsArraySchema.safeParse(datasets);
    if (!parsedDatasets.success) {
        const issue = parsedDatasets.error.issues[0];
        throw new Error(`analyze(): datasets 입력 형식이 올바르지 않습니다 — ${issue?.path?.join('.')}: ${issue?.message}`);
    }

    for (const [svcNo, records] of recordsMap) {
        recordsMap.set(svcNo, toRecordArray(records));
    }

    // FK 분석과 복합 FK 탐지가 공유하는 값 Set 캐시 (Memoization).
    // 과거에는 recordsMap에 임의 프로퍼티(_valuesCache)를 붙여 전달했으나, 타입 안전성이 없는 방식이라 일반 변수로 명시적으로 전달
    const valuesCache = new Map();

    // 필드 엔트로피를 한 번만 계산해 PK 점수 산정 시 재사용한다 (중복 계산 제거)
    const entropyMap = buildEntropyMap(recordsMap);

    const tableAnalyses = datasets.map(ds => {
        const svcNo = String(ds.svc_no || '').trim();
        const records = toRecordArray(recordsMap.get(svcNo));
        const colMap = buildColMap(ds, records);
        const fields = [...colMap.values()];

        const pkCandidates = analyzePkCandidatesForTable({ ...ds, fields }, records, entropyMap.get(svcNo) || null);

        return {
            svc_no: svcNo,
            svc_nm: String(ds.svc_nm || '').trim(),
            cat: String(ds.cat || '').trim(),
            field_count: fields.length,
            sample_record_count: records.length,
            fields,
            pk_candidates: pkCandidates
        };
    });

    const fuseIndex = buildDatasetFuseIndex(datasets);
    log('INFO', `Fuse.js 인덱스 구성: ${datasets.length}개 데이터셋`);
    const fkResult = analyzeFkCandidates(datasets, tableAnalyses, recordsMap, fuseIndex, thresholds, valuesCache);
    const relationships = fkResult.relationships;
    const rejectedRelationships = fkResult.rejected_relationships;

    const compositeFks = detectCompositeFkCandidates(datasets, tableAnalyses, recordsMap, valuesCache);
    log('INFO', `복합 FK 후보 탐지: ${compositeFks.length}개`);

    const graphAnalysis = analyzeGraphStructure(tableAnalyses, relationships, compositeFks);
    log('INFO', `그래프 분석: 노드 ${graphAnalysis.node_count}개, 엣지 ${graphAnalysis.edge_count}개`);
    log('INFO', `마스터 테이블 자동 감지: ${graphAnalysis.derived_master_tables.length}개 (in-degree ≥ 2)`);
    if (graphAnalysis.has_cycles) {
        log('WARN', `순환 FK 탐지: ${graphAnalysis.cycles.length}개 사이클 — ERD 검토 필요`);
    }
    log('INFO', `도메인 클러스터: ${graphAnalysis.domain_clusters.length}개, 위상 정렬: ${graphAnalysis.is_dag ? 'DAG 성공' : '사이클 존재'}`);

    return {
        generated_at: formatKstTimestamp(),
        config: {
            fk_min_inclusion_ratio: FK_MIN_INCLUSION_RATIO,
            fk_min_matched_count: FK_MIN_MATCHED_COUNT,
            fk_strong_inclusion_ratio: FK_STRONG_INCLUSION_RATIO,
            fk_allow_unchecked: FK_ALLOW_UNCHECKED,
            fk_max_per_from_field: FK_MAX_PER_FROM_FIELD,
            max_composite_key_size: MAX_COMPOSITE_KEY_SIZE,
            fk_suggested_min_score: FK_SUGGESTED_MIN_SCORE,
            fk_include_suggested_in_sql: FK_INCLUDE_SUGGESTED_IN_SQL,
            fk_domain_confirmed_bonus: FK_DOMAIN_CONFIRMED_BONUS,
            fk_domain_parent_child_rule_count: FK_DOMAIN_PARENT_CHILD_RULES.length,
            master_table_by_key: MASTER_TABLE_BY_KEY
        },
        summary: {
            total_tables: tableAnalyses.length,
            tables_with_pk_candidates: tableAnalyses.filter(t =>
                t.pk_candidates.some(pk => pk.fields && pk.fields.length > 0)
            ).length,
            relationship_count: relationships.length,
            confirmed_relationship_count: relationships.filter(r => r.relation_type === 'CONFIRMED').length,
            suggested_relationship_count: relationships.filter(r => r.relation_type === 'SUGGESTED').length,
            unverified_relationship_count: relationships.filter(r => r.relation_type === 'UNVERIFIED').length,
            composite_fk_count: compositeFks.length,
            confirmed_composite_fk_count: compositeFks.filter(r => r.relation_type === 'COMPOSITE_FK').length,
            suggested_composite_fk_count: compositeFks.filter(r => r.relation_type === 'SUGGESTED_COMPOSITE_FK').length,
            graph_master_table_count: graphAnalysis.derived_master_tables.length,
            graph_domain_cluster_count: graphAnalysis.domain_clusters.length,
            graph_theme_candidate_count: graphAnalysis.theme_candidates.length,
            graph_connection_path_count: graphAnalysis.connection_paths.length,
            graph_has_cycles: graphAnalysis.has_cycles,
            rejected_relationship_count: rejectedRelationships.length
        },
        tables: tableAnalyses,
        relationships,
        composite_fks: compositeFks,
        graph_analysis: graphAnalysis,
        dataset_clusters: graphAnalysis.dataset_clusters,
        theme_candidates: graphAnalysis.theme_candidates,
        connection_paths: graphAnalysis.connection_paths,
        rejected_relationships: rejectedRelationships
    };
}


// =============================================================================
// 11. 결과 파일 생성 — writeReports()
// =============================================================================

const DEFAULT_XLSX = path.join(__dirname, '../식품안전나라_API_분석결과.xlsx');

// 분석 결과를 JSON/Markdown/SQL/Excel 파일로 저장함 (import 연동용)
async function writeReports(analysis, opts = {}) {
    const {
        json = DEFAULT_JSON,
        md = DEFAULT_MD,
        sql = DEFAULT_SQL,
        xlsx = DEFAULT_XLSX,
        noJson = false,
        noMd = false,
        noSql = false,
        noXlsx = false
    } = opts;

    if (!noJson) generateJsonReport(analysis, json);
    if (!noMd) generateMarkdownReport(analysis, md);
    if (!noSql) generateKeysErdSql(analysis, sql);
    if (!noXlsx) await generateExcelReport(analysis, xlsx);
}

// Excel 파일이 있으면 PK/FK 분석 결과로 해당 시트를 갱신함
async function generateExcelReport(analysis, xlsxPath) {
    if (!fs.existsSync(xlsxPath)) {
        log('WARN', `엑셀 파일 없음 (생략): ${xlsxPath}`);
        return;
    }
    try {
        const { updatePkFkSheets } = require('../crawler/excel_reporter');
        await updatePkFkSheets(analysis, xlsxPath);
    } catch (err) {
        log('WARN', `엑셀 생성 실패 (분석 결과는 정상 저장됨): ${err.message}`);
    }
}

// 분석 결과 전체를 JSON 파일로 저장함
function generateJsonReport(analysis, outputPath) {
    safeFileWrite(outputPath, JSON.stringify(analysis, null, 2));
}

// Markdown 테이블 셀 내 파이프/개행 문자를 이스케이프함
function escapeMd(text) {
    return String(text || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

// 포함률 통계 객체를 Markdown 표시용 문자열로 변환함
function formatInclusionForMd(inclusion) {
    if (!inclusion || !inclusion.checked) return '미검증';
    const matched = inclusion.matched_count ?? inclusion.matched ?? 0;
    const fromCount = inclusion.from_unique_count ?? inclusion.from_count ?? 0;
    const rowCount = inclusion.matched_row_count != null ? `, row ${inclusion.matched_row_count}` : '';
    return `${(inclusion.inclusion_ratio * 100).toFixed(1)}% (${matched}/${fromCount}${rowCount})`;
}

// PK/FK 후보 분석 결과를 Markdown 테이블로 변환해 파일로 저장함
function generateMarkdownReport(analysis, outputPath) {
    const lines = [];

    lines.push('# 식품안전나라 PK/FK 후보 분석 결과');
    lines.push('');
    lines.push(`- 분석 데이터셋 수: ${analysis.summary.total_tables}`);
    lines.push(`- PK 후보 보유 테이블 수: ${analysis.summary.tables_with_pk_candidates}`);
    lines.push(`- FK 후보 수: ${analysis.summary.relationship_count}`);
    lines.push(`  - 확정 FK 후보 수: ${analysis.summary.confirmed_relationship_count || 0}`);
    lines.push(`  - 추정 FK 후보 수: ${analysis.summary.suggested_relationship_count || 0}`);
    lines.push(`  - 미검증 FK 후보 수: ${analysis.summary.unverified_relationship_count || 0}`);
    lines.push(`  - 확정 복합 FK 후보 수: ${analysis.summary.confirmed_composite_fk_count || 0}`);
    lines.push(`  - 추정 복합 FK 후보 수: ${analysis.summary.suggested_composite_fk_count || 0}`);
    lines.push(`- 제외된 FK 후보 수: ${analysis.summary.rejected_relationship_count || 0}`);
    lines.push(`- 생성일시: ${analysis.generated_at}`);
    lines.push('');
    lines.push('## 0. FK 정제 기준');
    lines.push('');
    lines.push(`- 최소 값 포함률 기준: ${(analysis.config.fk_min_inclusion_ratio * 100).toFixed(0)}%`);
    lines.push(`- 최소 매칭 고유값 수 기준: ${analysis.config.fk_min_matched_count}개`);
    lines.push(`- 강한 값 포함률 기준: ${(analysis.config.fk_strong_inclusion_ratio * 100).toFixed(0)}%`);
    lines.push(`- 복합키 탐색 최대 필드 수: ${analysis.config.max_composite_key_size}개`);
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
    lines.push('## 4. 네트워크(관계) 지표 분석');
    lines.push('');

    const inDegRanking = analysis.graph_analysis?.in_degree_ranking || [];
    const centralityRanking = analysis.graph_analysis?.centrality_ranking || [];
    
    const sortedByConnections = [...inDegRanking].sort((a, b) => {
        const connA = a.in_degree + a.out_degree;
        const connB = b.in_degree + b.out_degree;
        return connB - connA;
    });

    const centralityMap = new Map(centralityRanking.map(t => [t.svc_no, t]));
    const top10Central = (centralityRanking.length > 0 ? centralityRanking : sortedByConnections)
        .slice(0, 10)
        .filter(t => (t.in_degree + t.out_degree) > 0);
    const isolatedTables = sortedByConnections.filter(t => (t.in_degree + t.out_degree) === 0);

    lines.push('### 4.1. 중심 테이블 Top 10 (중심성 점수순)');
    lines.push('');
    lines.push('| 순위 | 서비스번호 | 데이터셋명 | 중심성 점수 | PageRank | 연결 수(In+Out) | In-Degree | Out-Degree |');
    lines.push('|---|---|---|---:|---:|---:|---:|---:|');
    if (top10Central.length === 0) {
        lines.push('| - | - | - | - | - | - | - | - |');
    } else {
        top10Central.forEach((t, i) => {
            const c = centralityMap.get(t.svc_no) || t;
            lines.push(`| ${i + 1} | ${t.svc_no} | ${escapeMd(t.svc_nm)} | ${c.centrality_score ?? '-'} | ${c.pagerank ?? '-'} | ${t.in_degree + t.out_degree} | ${t.in_degree} | ${t.out_degree} |`);
        });
    }
    lines.push('');

    lines.push('### 4.2. 고립 테이블 목록 (연결이 없는 테이블)');
    lines.push('');
    lines.push('| 서비스번호 | 데이터셋명 |');
    lines.push('|---|---|');
    if (isolatedTables.length === 0) {
        lines.push('| - | 고립된 테이블 없음 |');
    } else {
        isolatedTables.forEach(t => {
            lines.push(`| ${t.svc_no} | ${escapeMd(t.svc_nm)} |`);
        });
    }
    lines.push('');

    lines.push('### 4.3. 순환 참조(Cycle) 후보');
    lines.push('');
    const cycles = analysis.graph_analysis?.cycles || [];
    if (cycles.length === 0) {
        lines.push('- 발견된 순환 참조 사이클이 없습니다.');
    } else {
        lines.push('| 사이클 순번 | 순환 경로 (-> 방향으로 참조) |');
        lines.push('|---|---|');
        cycles.forEach((cycle, i) => {
            lines.push(`| Cycle ${i + 1} | ${cycle.join(' -> ')} -> ${cycle[0]} |`);
        });
    }
    lines.push('');

    const keyGroups = new Map();
    for (const rel of analysis.relationships) {
        const key = rel.to_field.toUpperCase();
        if (!keyGroups.has(key)) {
            keyGroups.set(key, { relations: 0, tables: new Set(), masters: new Set() });
        }
        const g = keyGroups.get(key);
        g.relations++;
        g.tables.add(rel.from_table);
        g.tables.add(rel.to_table);
        g.masters.add(rel.to_table_name || rel.to_table);
    }
    const sortedKeyGroups = Array.from(keyGroups.entries())
        .map(([key, data]) => ({ key, relations: data.relations, tableCount: data.tables.size, masters: Array.from(data.masters).slice(0, 3).join(', ') }))
        .sort((a, b) => b.relations - a.relations);

    lines.push('### 4.4. 공통키별 관계 그룹 (가장 많이 연결된 키 Top 10)');
    lines.push('');
    lines.push('| 공통키(필드명) | 관계 수 | 연결된 테이블 수 | 주요 참조 대상(Master 등) |');
    lines.push('|---|---:|---:|---|');
    if (sortedKeyGroups.length === 0) {
        lines.push('| - | - | - | - |');
    } else {
        sortedKeyGroups.slice(0, 10).forEach(g => {
            lines.push(`| ${g.key} | ${g.relations} | ${g.tableCount} | ${escapeMd(g.masters)} 등 |`);
        });
    }
    lines.push('');

    lines.push('### 4.5. 테마별 데이터 세트 후보');
    lines.push('');
    const themeCandidates = analysis.theme_candidates || analysis.graph_analysis?.theme_candidates || [];
    lines.push('| 테마ID | 테마명 | 테이블 수 | 관계 수 | 주요 카테고리 | 허브 테이블 | 대표 조인키 |');
    lines.push('|---|---|---:|---:|---|---|---|');
    if (themeCandidates.length === 0) {
        lines.push('| - | 후보 없음 | - | - | - | - | - |');
    } else {
        themeCandidates.slice(0, 15).forEach(theme => {
            const cats = (theme.main_categories || []).map(c => `${c.cat}(${c.count})`).join(', ');
            const hubs = (theme.hub_tables || []).map(t => `${t.svc_no} ${t.svc_nm}`).slice(0, 2).join(' / ');
            const keys = (theme.join_keys || []).map(k => `${k.field}(${k.count})`).join(', ');
            lines.push(`| ${theme.theme_id} | ${escapeMd(theme.theme_name)} | ${theme.size} | ${theme.relation_count} | ${escapeMd(cats)} | ${escapeMd(hubs)} | ${escapeMd(keys)} |`);
        });
    }
    lines.push('');

    lines.push('### 4.6. 대표 연결 경로');
    lines.push('');
    const connectionPaths = analysis.connection_paths || analysis.graph_analysis?.connection_paths || [];
    lines.push('| From | To | 홉 수 | 경로 | 조인 필드 |');
    lines.push('|---|---|---:|---|---|');
    if (connectionPaths.length === 0) {
        lines.push('| - | - | - | 연결 경로 없음 | - |');
    } else {
        connectionPaths.slice(0, 20).forEach(p => {
            const edgeFields = (p.edges || [])
                .map(e => e.field && e.to_field ? `${e.field}->${e.to_field}` : e.field || e.to_field || '')
                .filter(Boolean)
                .join(', ');
            lines.push(`| ${p.from} ${escapeMd(p.from_name)} | ${p.to} ${escapeMd(p.to_name)} | ${p.hop_count} | ${p.path.join(' -> ')} | ${escapeMd(edgeFields)} |`);
        });
    }
    lines.push('');

    lines.push('## 5. 테이블별 상세');
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

// PK/FK 후보를 CREATE TABLE + FOREIGN KEY DDL로 변환해 SQLite ERD 파일로 저장함
function generateKeysErdSql(analysis, outputPath) {
    const lines = [];

    lines.push('-- =============================================================================');
    lines.push('-- 식품안전나라 Open API PK/FK 후보 ERD DDL (전체 후보 무제한 연결 버전)');
    lines.push('-- 목적: CONFIRMED 및 SUGGESTED를 포함한 모든 PK/FK 후보를 무제한 실선 연결');
    lines.push('-- 정책: 모든 PK 후보를 PRIMARY KEY로 지정, 모든 FK 후보를 FOREIGN KEY 제약조건으로 주석 없이 실선 연결');
    lines.push('-- =============================================================================');
    lines.push('');
    lines.push('PRAGMA foreign_keys = ON;');
    lines.push('');

    const fksByTable = new Map();
    for (const rel of analysis.relationships) {
        if (!FK_INCLUDE_SUGGESTED_IN_SQL && rel.relation_type === 'SUGGESTED') continue;
        if (rel.relation_type === 'UNVERIFIED') continue;
        if (!fksByTable.has(rel.from_table)) fksByTable.set(rel.from_table, []);
        fksByTable.get(rel.from_table).push(rel);
    }
    // 복합 FK 병합 (단일 FK와 동일 테이블 목록에 추가)
    for (const fk of (analysis.composite_fks || [])) {
        if (fk.relation_type !== 'COMPOSITE_FK') continue;
        if (!fksByTable.has(fk.from_table)) fksByTable.set(fk.from_table, []);
        fksByTable.get(fk.from_table).push({
            from_table: fk.from_table,
            from_field: null,
            from_fields: fk.from_fields,
            to_table: fk.to_table,
            to_field: null,
            to_fields: fk.to_fields,
            relation_type: 'COMPOSITE_FK',
            score: fk.score,
            confidence: fk.confidence,
            inclusion_check: fk.inclusion_check
        });
    }

    // 위상 정렬 순서가 있으면 해당 순서대로 DDL 생성 (FK 제약 위반 방지)
    // 그래프 방향이 자식→부모이므로 위상 정렬 결과를 역순으로 해야 부모 테이블 CREATE TABLE이 먼저 실행되어 FK 제약 위반을 방지
    const topoOrder = (analysis.graph_analysis?.topological_order || []).slice().reverse();
    const tableMap = new Map(analysis.tables.map(t => [t.svc_no, t]));
    const orderedTables = topoOrder.length > 0
        ? [...topoOrder.map(id => tableMap.get(id)).filter(Boolean),
           ...analysis.tables.filter(t => !topoOrder.includes(t.svc_no))]
        : analysis.tables;

    for (const table of orderedTables) {
        const bestPk = table.pk_candidates.find(
            pk => pk.fields && pk.fields.length > 0 && pk.confidence !== 'NONE'
        );
        const hasPk = !!bestPk;
        const fksList = fksByTable.get(table.svc_no) || [];
        const hasFks = fksList.length > 0;

        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`-- ${table.svc_no} / ${sanitizeSqlComment(table.svc_nm)}`);
        if (table.cat) lines.push(`-- 카테고리: ${sanitizeSqlComment(table.cat)}`);
        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`CREATE TABLE IF NOT EXISTS ${quoteIdent(table.svc_no)} (`);

        const fieldLines = [];

        table.fields.forEach((field, idx) => {
            const fname = field.field;
            const kor = sanitizeSqlComment(field.kor_nm);
            const sqlType = field.sqlType || 'VARCHAR(500)';

            const pkComment = (bestPk && bestPk.fields.includes(fname))
                ? ` / PK 후보(${bestPk.confidence})`
                : '';
            const columnFks = fksList.filter(fk =>
                fk.from_field === fname ||
                (fk.from_fields && fk.from_fields.includes(fname))
            );
            const fkComment = columnFks.length > 0
                ? ` / FK 후보: ${columnFks.map(fk => `${fk.to_table}.${fk.to_field}(${fk.confidence}, ${(fk.inclusion_check?.inclusion_ratio * 100 || 0).toFixed(1)}%)`).join(', ')}`
                : '';
            const hasNext = idx < table.fields.length - 1 || hasPk || hasFks;

            fieldLines.push(
                `  ${quoteIdent(fname)} ${sqlType}${hasNext ? ',' : ''} -- ${fname}${kor ? ` / ${kor}` : ''}${pkComment}${fkComment}`
            );
        });

        if (hasPk) {
            fieldLines.push(`  PRIMARY KEY (${bestPk.fields.map(quoteIdent).join(', ')})${hasFks ? ',' : ''}`);
        }
        fksList.forEach((fk, idx) => {
            const comma = idx < fksList.length - 1 ? ',' : '';
            if (fk.relation_type === 'COMPOSITE_FK') {
                fieldLines.push(
                    `  FOREIGN KEY (${fk.from_fields.map(quoteIdent).join(', ')}) REFERENCES ${quoteIdent(fk.to_table)} (${fk.to_fields.map(quoteIdent).join(', ')})${comma}`
                );
            } else {
                fieldLines.push(
                    `  FOREIGN KEY (${quoteIdent(fk.from_field)}) REFERENCES ${quoteIdent(fk.to_table)} (${quoteIdent(fk.to_field)})${comma}`
                );
            }
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
// 12. CLI 독립 실행용 run()
// =============================================================================

/**
 * CLI 독립 실행 진입점. 캐시 파일과 샘플을 읽어 분석하고 결과 파일을 생성
 *
 * @param {object} options - parseArgs()가 반환한 옵션 객체
 */
async function run(options) {
    const { cache, samples, json, md, sql, noJson, noMd, noSql, noXlsx } = options;

    log('STEP', 'crawl_cache.json 로드');
    if (!fs.existsSync(cache)) { log('ERR', `캐시 파일 없음: ${cache}`); process.exit(1); }

    const datasets = JSON.parse(fs.readFileSync(cache, 'utf-8'));
    if (!Array.isArray(datasets)) { log('ERR', '캐시 파일 형식이 배열이 아닙니다.'); process.exit(1); }
    log('INFO', `데이터셋 수: ${datasets.length}`);

    log('STEP', '샘플 및 SQLite 적재 데이터 로드');
    const recordsMap = new Map();

    // SQLite 데이터베이스가 존재하면 우선적으로 연결
    const dbPath = path.join(__dirname, 'foodsafety.db'); // db/ 폴더 내 실제 DB
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
                // SQLite 적재된 전체 데이터 기준으로 검증
                db.all(`SELECT * FROM ${quoteIdent(svcNo)};`, [], (err, rows) => {
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
        db.close(err => {
            if (err) log('WARN', `SQLite 연결 해제 실패: ${err.message}`);
        });
        log('INFO', `SQLite 연결 정상 해제 및 ${recordsMap.size}개 테이블 데이터 분석 준비 완료`);
    }

    log('STEP', 'PK/FK 후보 분석');

    // 포함률 임계값을 실제 데이터 분포에서 도출 (사전 패스)
    const allInclusionRatios = [];
    for (const [svcNoA, recA] of recordsMap) {
        const rowsA = toRecordArray(recA);
        for (const [svcNoB, recB] of recordsMap) {
            const rowsB = toRecordArray(recB);
            if (svcNoA === svcNoB || rowsA.length === 0 || rowsB.length === 0) continue;
            const fieldsA = rowsA.length > 0 ? Object.keys(rowsA[0]) : [];
            const fieldsB = new Set(rowsB.length > 0 ? Object.keys(rowsB[0]) : []);
            for (const f of fieldsA) {
                if (fieldsB.has(f)) {
                    const stats = getInclusionStats(svcNoA, svcNoB, rowsA, rowsB, f, f);
                    if (stats.checked) allInclusionRatios.push(stats.inclusion_ratio);
                }
            }
        }
    }
    const derivedThresholds = deriveInclusionThresholds(allInclusionRatios);
    log('INFO', `포함률 임계값 자동 도출 적용 — min: ${derivedThresholds.min.toFixed(4)}, strong: ${derivedThresholds.strong.toFixed(4)} (샘플 ${allInclusionRatios.length}쌍)`);

    const analysis = analyze(datasets, recordsMap, derivedThresholds);

    log('STEP', '결과 파일 생성');
    await writeReports(analysis, { json, md, sql, noJson, noMd, noSql, noXlsx });

    const sep = '='.repeat(62);
    log('INFO', `\n${sep}`);
    log('INFO', '  PK/FK 후보 분석 완료');
    log('INFO', sep);
    log('INFO', `  분석 테이블 수          : ${analysis.summary.total_tables}`);
    log('INFO', `  PK 후보 보유 테이블 수  : ${analysis.summary.tables_with_pk_candidates}`);
    log('INFO', `  FK 후보 수              : ${analysis.summary.relationship_count}`);
    log('INFO', `    확정 FK 후보 수       : ${analysis.summary.confirmed_relationship_count}`);
    log('INFO', `    추정 FK 후보 수       : ${analysis.summary.suggested_relationship_count}`);
    log('INFO', `    미검증 FK 후보 수     : ${analysis.summary.unverified_relationship_count}`);
    log('INFO', `  복합 FK 후보 수         : ${analysis.summary.composite_fk_count}`);
    log('INFO', `    확정 복합 FK 후보 수  : ${analysis.summary.confirmed_composite_fk_count}`);
    log('INFO', `    추정 복합 FK 후보 수  : ${analysis.summary.suggested_composite_fk_count}`);
    log('INFO', `  마스터 테이블 감지       : ${analysis.summary.graph_master_table_count}개`);
    log('INFO', `  도메인 클러스터          : ${analysis.summary.graph_domain_cluster_count}개`);
    log('INFO', `  테마 데이터 세트 후보    : ${analysis.summary.graph_theme_candidate_count}개`);
    log('INFO', `  대표 연결 경로           : ${analysis.summary.graph_connection_path_count}개`);
    log('INFO', `  순환 FK 존재             : ${analysis.summary.graph_has_cycles ? '경고 있음' : '없음'}`);
    log('INFO', `  제외된 FK 후보 수       : ${analysis.summary.rejected_relationship_count}`);
    if (!noJson) log('INFO', `  JSON 결과               : ${json}`);
    if (!noMd) log('INFO', `  Markdown 결과           : ${md}`);
    if (!noSql) log('INFO', `  ERD SQL 결과            : ${sql}`);
    log('INFO', sep);
}


// =============================================================================
// 13. CLI 진입점
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


// exports


module.exports = {
    analyze,
    writeReports,
    buildEntropyMap,
    computeFieldEntropy,
    deriveInclusionThresholds,
    profileColumnsWithArquero,
    getCompositeInclusionStats,
    detectCompositeFkCandidates,
    buildFkGraph,
    analyzeGraphStructure,
    computeCentralityRanking,
    buildThemeCandidates,
    buildConnectionPaths,
    buildDatasetFuseIndex,
    keywordMatchesText,
    matchesDomainParentChildRuleFuzzy,
    parseSampleJson,

    analyzePkCandidatesForTable,
    analyzeFkCandidates,
    getUniquenessStats,
    getInclusionStats,
    buildColMap,

    isBadPkField,
    isStrongIdentifierField,
    calculateIdentifierScore,
    isKnownRelationKey,
    isExcludedFkField,

    getMasterTablesForKey,
    isMasterTableForKey,
    hasMasterRule,

    run
};
