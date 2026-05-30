/**
 * =============================================================================
 *   식품안전나라 Open API SQLite 마이그레이션 파이프라인 (Node.js 버전)
 *   파일명: import_to_sqlite.js
 *
 *   [수행 역할]
 *   1. crawl_cache.json의 데이터셋 메타데이터를 읽어 foodsafety.db를 생성한다.
 *   2. 메타 테이블 2개를 자동 생성한다.
 *        - api_tables  : 데이터셋 목록
 *        - api_columns : 데이터셋별 출력항목
 *   3. 데이터셋마다 개별 테이블을 생성한다. 예: I0600, I0580 ...
 *   4. samples/{svc_no}.json 파일이 있으면 파싱해 해당 테이블에 INSERT한다.
 *      메타데이터에 없지만 실제 JSON에 나타난 필드는 자동 타입 추론 후 추가한다.
 *   5. 각 테이블마다 한글 컬럼 별칭을 가진 뷰를 자동 생성한다.
 *   6. ERD용 SQL 파일을 생성한다.
 *      - 물리 컬럼명: FIELD
 *      - 논리 컬럼명: kor_nm
 *      - 예: "BSSH_NM" VARCHAR(200), -- BSSH_NM / 교육훈련기관명
 *   7. DB 생성 완료 후 analyze_pk_fk.js의 writeReports()를 호출해
 *      PK/FK 후보 분석 결과 파일 3개를 생성한다.
 *      (analyze_pk_fk.js와 parseSampleJson, PK/FK 분석을 공유하므로 중복 없음)
 *
 *   [주의]
 *   - PK/FK는 기본적으로 후보 분석 결과 파일과 ERD에만 반영한다.
 *   - 실제 SQLite 테이블에 PRIMARY KEY / FOREIGN KEY 제약을 적용하려면
 *     --apply-constraints 옵션을 명시해야 한다.
 *   - --apply-constraints 사용 시에도 HIGH 신뢰도 후보만 실제 제약조건으로 적용한다.
 *
 *   [설치]
 *     npm install sqlite3
 *
 *   [실행]
 *     node import_to_sqlite.js
 *     node import_to_sqlite.js --db custom.db
 *     node import_to_sqlite.js --cache crawl_cache_149_169.json
 *     node import_to_sqlite.js --samples ./samples
 *     node import_to_sqlite.js --no-views
 *     node import_to_sqlite.js --erd foodsafety_erd.sql
 *     node import_to_sqlite.js --no-erd
 *     node import_to_sqlite.js --no-pk-fk
 *     node import_to_sqlite.js --apply-constraints
 * =============================================================================
 */

'use strict';

const fs      = require('fs');
const path    = require('path');
const sqlite3 = require('sqlite3').verbose();

// analyze_pk_fk.js에서 공유 함수를 가져온다.
// parseSampleJson : 샘플 JSON 파싱 — 이 파일에서 중복 구현하지 않는다.
// analyze         : datasets + recordsMap → analysis 객체 (파일 I/O 없음)
// writeReports    : analysis 객체 → json/md/sql 파일 생성
const {
    parseSampleJson,
    analyze     : analyzePkFk,
    writeReports: writePkFkReports
} = require('./analyze_pk_fk');

// =============================================================================
// 섹션 0. 기본 설정
// =============================================================================

const DEFAULT_CACHE   = 'crawl_cache.json';
const DEFAULT_DB      = 'foodsafety.db';
const DEFAULT_SAMPLES = 'samples';
const DEFAULT_ERD     = 'foodsafety_erd.sql';

// 샘플 JSON에 섞일 수 있는 API 응답 메타 필드 제외
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

const RELATION_INDEX_FIELDS = [
    'LCNS_NO',
    'BSSH_NO',
    'BARCODE_NO',
    'PRDLST_REPORT_NO',
    'PRDLST_CD',
    'HACCP_NO',
    'CRTFC_NO',
    'TESTITM_CD',
    'UNIT_CD',
    'INDUTY_CD'
];

const SEARCH_INDEX_FIELDS = [
    'PRDT_NM',
    'BSSH_NM'
];

function log(level, msg) {
    const ts = new Date().toTimeString().slice(0, 8);
    const prefix = { INFO: '[INFO] ', WARN: '[WARN] ', ERR: '[ERR ] ', STEP: '\n[STEP]' };
    console.log(`${prefix[level] || '[LOG] '} ${ts}  ${msg}`);
}

function parseArgs(argv) {
    const args = {
        cache:            DEFAULT_CACHE,
        db:               DEFAULT_DB,
        samples:          DEFAULT_SAMPLES,
        noViews:          false,
        erd:              DEFAULT_ERD,
        noPkFk:           false,
        applyConstraints: false
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if      (arg === '--cache'   && argv[i+1]) args.cache   = argv[++i];
        else if (arg === '--db'      && argv[i+1]) args.db      = argv[++i];
        else if (arg === '--samples' && argv[i+1]) args.samples = argv[++i];
        else if (arg === '--erd'     && argv[i+1]) args.erd     = argv[++i];
        else if (arg === '--no-erd')             args.erd = '';
        else if (arg === '--no-views')           args.noViews = true;
        else if (arg === '--no-pk-fk')           args.noPkFk = true;
        else if (arg === '--apply-constraints')  args.applyConstraints = true;
        else if (arg === '-h' || arg === '--help') { printHelp(); process.exit(0); }
        else log('WARN', `알 수 없는 인자 무시: ${arg}`);
    }
    return args;
}

function printHelp() {
    console.log(`
식품안전나라 Open API SQLite 마이그레이션

Usage:
  node import_to_sqlite.js [options]

Options:
  --cache <path>          캐시 파일 경로              기본값: ${DEFAULT_CACHE}
  --db <path>             출력 DB 경로                기본값: ${DEFAULT_DB}
  --samples <path>        샘플 폴더 경로              기본값: ${DEFAULT_SAMPLES}
  --erd <path>            ERD용 SQL 출력 경로         기본값: ${DEFAULT_ERD}
  --no-erd                ERD용 SQL 생성 생략
  --no-views              한글 뷰 생성 생략
  --no-pk-fk              PK/FK 후보 분석 연동 생략
  --apply-constraints     HIGH 신뢰도 PK/FK를 실제 SQLite 제약조건으로 적용
  -h, --help              도움말 출력

Examples:
  node import_to_sqlite.js
  node import_to_sqlite.js --cache crawl_cache_149_169.json --db foodsafety_149_169.db
  node import_to_sqlite.js --samples ./samples --no-views
  node import_to_sqlite.js --no-erd
  node import_to_sqlite.js --apply-constraints
`);
}

// =============================================================================
// 섹션 1. SQLite 비동기 헬퍼
// =============================================================================

function openDb(dbPath) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, err => err ? reject(err) : resolve(db));
    });
}

function runSql(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function onRun(err) { err ? reject(err) : resolve(this); });
    });
}

function execSql(db, sql) {
    return new Promise((resolve, reject) => {
        db.exec(sql, err => err ? reject(err) : resolve());
    });
}

function allSql(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
    });
}

function closeDb(db) {
    return new Promise((resolve, reject) => {
        db.close(err => err ? reject(err) : resolve());
    });
}

// =============================================================================
// 섹션 2. 필드명/한글명/샘플값 기반 SQL 타입 + 길이 자동 추론
// ※ inferColumnSpec 은 이 파일에서만 정의한다.
//    analyze_pk_fk.js의 generateKeysErdSql은 field.sqlType을 그대로 사용하므로
//    두 ERD 파일 간 타입이 항상 일치한다.
// =============================================================================

const NUMERIC_SUFFIXES  = /(_CNT|_QTY|_AMT|_PRICE|_SEQ|_SZ|_RATE|_PCT|_NUM|_QT|_MG|_KG|_ML|_QNTT|_SCNT|_MCNT|_DCNT|_TOT|_AMT_SUM|_VAL)$/;
const DATE_SUFFIXES     = /(_DT|_YMD|_DE|_DAT|DATE|DTM|ENDDT|BGNDT)$/;
const CODE_SUFFIXES     = /(_CD|_CODE|_DVS_CD|_CLCD|_INSTTCD)$/;
const NAME_SUFFIXES     = /(_NM|_NAME|_KOR_NM|_ENG_NM)$/;
const ADDRESS_SUFFIXES  = /(_ADDR|ADDR|ADDRESS)$/;
const CONTENT_SUFFIXES  = /(_CN|_CONT|_CONTENT|_DESC|_MATR|_PRVNS|_MEMO)$/;
const YESNO_SUFFIXES    = /(_YN)$/;
const TEL_SUFFIXES      = /(TELNO|TEL_NO|PHONE|MOBILE|FAX)$/;
const NO_SUFFIXES       = /(_NO|NO)$/;

const TYPE_MAP = [
    ['varchar', 'VARCHAR'], ['char', 'VARCHAR'], ['string', 'VARCHAR'],
    ['text', 'TEXT'], ['number', 'NUMERIC'], ['numeric', 'NUMERIC'],
    ['integer', 'INTEGER'], ['int', 'INTEGER'],
    ['float', 'REAL'], ['double', 'REAL'], ['real', 'REAL'],
    ['date', 'DATE'], ['datetime', 'TEXT'], ['timestamp', 'TEXT'],
    ['clob', 'TEXT'], ['blob', 'BLOB']
];

function isEmptyValue(value) {
    return value === undefined || value === null || String(value).trim() === '';
}

function getSampleValues(records, fieldName) {
    if (!Array.isArray(records)) return [];
    return records
        .map(rec => (rec ? rec[fieldName] : undefined))
        .filter(v => !isEmptyValue(v))
        .map(v => String(v).trim());
}

function getMaxSampleLength(values) {
    if (!values || values.length === 0) return 0;
    return Math.max(...values.map(v => String(v).length));
}

function allValuesMatch(values, regex) {
    return values && values.length > 0 && values.every(v => regex.test(String(v).trim()));
}

function allNumericLike(values) {
    return values && values.length > 0 &&
        values.every(v => /^-?\d+(\.\d+)?$/.test(String(v).trim().replace(/,/g, '')));
}

function allIntegerLike(values) {
    return values && values.length > 0 &&
        values.every(v => /^-?\d+$/.test(String(v).trim().replace(/,/g, '')));
}

function allDateLike(values) {
    return values && values.length > 0 &&
        values.every(v => {
            const s = String(v).trim();
            return /^\d{8}$/.test(s) || /^\d{4}-\d{2}-\d{2}$/.test(s) ||
                   /^\d{4}\.\d{2}\.\d{2}$/.test(s) || /^\d{4}\/\d{2}\/\d{2}$/.test(s);
        });
}

function roundVarcharLength(maxLen, minimum = 50) {
    const base = Math.max(maxLen, minimum);
    if (base <= 10)   return 10;
    if (base <= 20)   return 20;
    if (base <= 30)   return 30;
    if (base <= 50)   return 50;
    if (base <= 100)  return 100;
    if (base <= 200)  return 200;
    if (base <= 300)  return 300;
    if (base <= 500)  return 500;
    if (base <= 1000) return 1000;
    return 2000;
}

/**
 * 필드 메타데이터 + 샘플값을 기반으로 SQLite 컬럼 스펙을 추론한다.
 * 반환값의 sqlType은 analyze_pk_fk.js의 generateKeysErdSql에서도 그대로 사용한다.
 */
function inferColumnSpec(field, records = []) {
    const rawType    = String(field.type   || '').trim().toLowerCase();
    const rawLength  = String(field.length || '').trim();
    const fieldNm    = String(field.field  || '').trim();
    const upperField = fieldNm.toUpperCase();
    const korNm      = String(field.kor_nm || '').trim();

    const sampleValues = getSampleValues(records, fieldNm);
    const maxSampleLen = getMaxSampleLength(sampleValues);

    // 1. 원본 type 값이 있으면 우선 사용
    if (rawType) {
        for (const [key, mappedType] of TYPE_MAP) {
            if (!rawType.includes(key)) continue;
            if (mappedType === 'VARCHAR') {
                const length = parseInt(rawLength, 10);
                const finalLen = Number.isFinite(length) && length > 0
                    ? length : roundVarcharLength(maxSampleLen, 100);
                return { sqlType: `VARCHAR(${finalLen})`, dataType: 'VARCHAR', length: String(finalLen), reason: '원본 type 기반 VARCHAR' };
            }
            if (mappedType === 'NUMERIC')  return { sqlType: 'NUMERIC(18,4)', dataType: 'NUMERIC', length: '18,4', reason: '원본 type 기반 NUMERIC' };
            if (mappedType === 'INTEGER')  return { sqlType: 'INTEGER',        dataType: 'INTEGER', length: '',    reason: '원본 type 기반 INTEGER' };
            if (mappedType === 'REAL')     return { sqlType: 'REAL',           dataType: 'REAL',    length: '',    reason: '원본 type 기반 REAL' };
            if (mappedType === 'DATE')     return { sqlType: 'DATE',           dataType: 'DATE',    length: '8',   reason: '원본 type 기반 DATE' };
            return { sqlType: mappedType, dataType: mappedType, length: rawLength, reason: '원본 type 기반' };
        }
    }

    // 2. 날짜형
    if (DATE_SUFFIXES.test(upperField) ||
        /일자$|년월일$|날짜$|등록일$|수정일$|시작일자$|종료일자$|허가일자$|지정일자$|취소일자$|폐업일자$/.test(korNm) ||
        allDateLike(sampleValues)) {
        return { sqlType: 'DATE', dataType: 'DATE', length: '8', reason: '필드명/한글명/샘플값 날짜 패턴' };
    }

    // 3. Y/N 여부값
    if (YESNO_SUFFIXES.test(upperField) || /여부$/.test(korNm) || allValuesMatch(sampleValues, /^[YN]$/i)) {
        return { sqlType: 'VARCHAR(1)', dataType: 'VARCHAR', length: '1', reason: '여부값 Y/N' };
    }

    // 4. 전화번호/팩스 — 선행 0/하이픈 보존
    if (TEL_SUFFIXES.test(upperField) || /전화번호|팩스|연락처|휴대폰/.test(korNm)) {
        const len = roundVarcharLength(maxSampleLen, 30);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '전화번호 계열은 VARCHAR' };
    }

    // 5. 코드값 — 숫자처럼 보여도 문자로 저장
    if (CODE_SUFFIXES.test(upperField) || /코드$|분류$|구분$|유형$|상태$/.test(korNm)) {
        const len = roundVarcharLength(maxSampleLen, 30);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '코드/분류 계열은 VARCHAR' };
    }

    // 6. 번호값
    if (NO_SUFFIXES.test(upperField) || /지정번호|일련번호|순번|번호$/.test(korNm) || NUMERIC_SUFFIXES.test(upperField)) {
        const keepAsText =
            /바코드|전화|팩스|우편|인허가번호|품목제조보고번호|사업자|등록번호/.test(korNm) ||
            /BARCODE|BRCD|TEL|FAX|ZIP|LCNS_NO|PRDLST_REPORT_NO|BIZRNO/.test(upperField);
        if (!keepAsText) {
            if (sampleValues.length === 0 || allIntegerLike(sampleValues))
                return { sqlType: 'NUMERIC(18,0)', dataType: 'NUMERIC', length: '18,0', reason: '번호/일련번호 계열 NUMERIC' };
            if (allNumericLike(sampleValues))
                return { sqlType: 'NUMERIC(18,4)', dataType: 'NUMERIC', length: '18,4', reason: '숫자 샘플 기반 NUMERIC' };
        }
        const len = roundVarcharLength(maxSampleLen, 50);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '식별번호 계열이지만 문자 보존 필요' };
    }

    // 7. 금액/수량/비율
    if (NUMERIC_SUFFIXES.test(upperField) ||
        /수량|건수|금액|가격|비율|점수|등급점|최대값|최소값|상한|하한|생산량|능력|일수|자리$/.test(korNm)) {
        if (sampleValues.length === 0 || allNumericLike(sampleValues))
            return { sqlType: 'NUMERIC(18,4)', dataType: 'NUMERIC', length: '18,4', reason: '수량/금액/값 계열 NUMERIC' };
    }

    // 8. 이름/명칭
    if (NAME_SUFFIXES.test(upperField) ||
        /명$|이름$|기관명$|업소명$|제품명$|품목명$|대표자$|대표자명$|시험항목명$/.test(korNm)) {
        const len = roundVarcharLength(maxSampleLen, 200);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '명칭/이름 계열 VARCHAR' };
    }

    // 9. 주소
    if (ADDRESS_SUFFIXES.test(upperField) || /주소$|소재지$/.test(korNm)) {
        const len = roundVarcharLength(maxSampleLen, 500);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '주소 계열 VARCHAR' };
    }

    // 10. 내용/메모
    if (CONTENT_SUFFIXES.test(upperField) ||
        /내용$|주의사항$|기준규격$|사유$|메모$|방법$|성상$|기능성$|원재료$|출처$/.test(korNm)) {
        const len = roundVarcharLength(maxSampleLen, 1000);
        return {
            sqlType:  len >= 2000 ? 'TEXT' : `VARCHAR(${len})`,
            dataType: len >= 2000 ? 'TEXT' : 'VARCHAR',
            length:   len >= 2000 ? '' : String(len),
            reason:   '긴 설명/내용 계열'
        };
    }

    // 11. 샘플값으로 최종 판단
    if (sampleValues.length > 0) {
        if (allIntegerLike(sampleValues))
            return { sqlType: 'NUMERIC(18,0)', dataType: 'NUMERIC', length: '18,0', reason: '샘플값 정수 패턴' };
        if (allNumericLike(sampleValues))
            return { sqlType: 'NUMERIC(18,4)', dataType: 'NUMERIC', length: '18,4', reason: '샘플값 숫자 패턴' };
        const len = roundVarcharLength(maxSampleLen, 100);
        return { sqlType: `VARCHAR(${len})`, dataType: 'VARCHAR', length: String(len), reason: '샘플 문자열 길이 기반 VARCHAR' };
    }

    // 12. 기본값
    return { sqlType: 'VARCHAR(500)', dataType: 'VARCHAR', length: '500', reason: '기본값 VARCHAR(500)' };
}

function inferSqlType(field, records = []) {
    return inferColumnSpec(field, records).sqlType;
}

// =============================================================================
// 섹션 3. 이름/식별자 정규화 및 데이터 준비 유틸
// =============================================================================

function safeViewName(svcNo, svcNm) {
    let clean = String(svcNm || '').replace(/[^\w가-힣]/g, '_');
    clean = clean.replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    return clean ? `v_${svcNo}_${clean}` : `v_${svcNo}`;
}

function quoteIdent(identifier) {
    return `"${String(identifier).replace(/"/g, '""')}"`;
}

function normalizeValue(value) {
    if (value === undefined || value === null) return null;
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
}

function fileSizeIfExists(filePath) {
    try { return fs.statSync(filePath).size; } catch { return 0; }
}

function sanitizeSqlComment(text) {
    return String(text || '').replace(/\r?\n/g, ' ').replace(/--/g, '－').trim();
}

function isSystemSampleField(fieldName) {
    return SYSTEM_SAMPLE_FIELDS.has(String(fieldName || '').trim().toUpperCase());
}

function loadDatasets(cachePath) {
    if (!fs.existsSync(cachePath)) {
        log('ERR', `캐시 파일 없음: ${cachePath} → 먼저 크롤러를 실행하세요.`);
        process.exit(1);
    }

    const datasets = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    if (!Array.isArray(datasets)) {
        throw new Error('캐시 파일 형식이 배열이 아닙니다. crawl_cache.json 형식을 확인하세요.');
    }

    return datasets;
}

function loadRecordsMap(datasets, samplesDir) {
    const recordsMap = new Map();

    for (const ds of datasets) {
        const svcNo = String(ds.svc_no || '').trim();
        if (!svcNo) continue;

        const sampleJsonPath = path.join(samplesDir, `${svcNo}.json`);
        recordsMap.set(svcNo,
            fs.existsSync(sampleJsonPath)
                ? parseSampleJson(sampleJsonPath, svcNo)
                : []
        );
    }

    return recordsMap;
}

function enrichDatasetsWithSqlTypes(datasets, recordsMap) {
    return datasets.map(ds => {
        const svcNo   = String(ds.svc_no || '').trim();
        const records = recordsMap.get(svcNo) || [];
        const fields  = (Array.isArray(ds.fields) ? ds.fields : [])
            .filter(f => !isSystemSampleField(f.field || f.field_id || ''))
            .map(f => ({
                ...f,
                sqlType: inferColumnSpec(f, records).sqlType
            }));
        return { ...ds, fields };
    });
}

function getHighConfidencePkForTable(pkFkAnalysis, svcNo, colMeta) {
    if (!pkFkAnalysis) return null;
    const tableAnalysis = pkFkAnalysis.tables.find(t => t.svc_no === svcNo);
    const bestPk = tableAnalysis?.pk_candidates[0];

    if (!bestPk || bestPk.confidence !== 'HIGH') return null;
    if (!bestPk.fields.every(f => colMeta.has(f))) return null;

    return bestPk;
}

function buildHighConfidenceFksMap(pkFkAnalysis) {
    const allFksMap = new Map();
    if (!pkFkAnalysis) return allFksMap;

    // 각 필드별로 모든 HIGH 후보 수집
    const candidateMap = new Map();

    for (const rel of pkFkAnalysis.relationships) {
        if (rel.confidence !== 'HIGH') continue;
        
        const key = `${rel.from_table}.${rel.from_field}`;
        if (!candidateMap.has(key)) candidateMap.set(key, []);
        candidateMap.get(key).push(rel);
    }

    // 모호성 제거: 동일한 1위 점수가 여러 개면 다형성(Polymorphic) 키로 간주하여 FK 제외
    for (const [key, candidates] of candidateMap.entries()) {
        candidates.sort((a, b) => b.score - a.score);
        
        // 1위 후보
        const best = candidates[0];
        
        // 후보가 1개뿐이거나, 1위 점수가 2위 점수보다 확실히 높은 경우에만 FK로 승인
        if (candidates.length === 1 || best.score > candidates[1].score) {
            if (!allFksMap.has(best.from_table)) allFksMap.set(best.from_table, new Map());
            allFksMap.get(best.from_table).set(best.from_field, best);
        } else {
            // 점수가 동점인 부모가 여러 개면 엉뚱한 부모에 연결될 위험이 큼 (예: LCNS_NO)
            // 따라서 해당 컬럼은 FK 제약을 걸지 않음
            console.log(`[WARN] ${key} FK 후보 동점 다수 존재로 자동 연결 보류 (${best.score}점)`);
        }
    }

    return allFksMap;
}

function buildColMeta(fields, records, svcNo) {
    const colMeta = new Map();
    const apiColumnRows = [];

    // A. 메타데이터 필드 등록
    for (const f of fields) {
        const fname = String(f.field || '').trim();
        if (!fname || isSystemSampleField(fname)) continue;

        const spec = inferColumnSpec(f, records);

        apiColumnRows.push({
            svcNo,
            field: fname,
            korNm: String(f.kor_nm || '').trim(),
            spec,
            origType: String(f.type || '').trim(),
            origLength: String(f.length || '').trim(),
            desc: String(f.desc || '').trim(),
            sample: String(f.sample || '').trim()
        });

        if (!colMeta.has(fname)) {
            colMeta.set(fname, {
                sqlType:  spec.sqlType,
                dataType: spec.dataType,
                length:   spec.length,
                reason:   spec.reason,
                korNm:    String(f.kor_nm || '').trim()
            });
        }
    }

    // B. 샘플에만 있는 누락 필드 자동 추가
    const extraColumns = [];
    for (const rec of records) {
        for (const key of Object.keys(rec)) {
            if (!key || isSystemSampleField(key) || colMeta.has(key)) continue;
            const spec = inferColumnSpec({ field: key, kor_nm: key }, records);
            colMeta.set(key, {
                sqlType:  spec.sqlType,
                dataType: spec.dataType,
                length:   spec.length,
                reason:   spec.reason,
                korNm:    key
            });
            extraColumns.push({ key, spec });
        }
    }

    return { colMeta, apiColumnRows, extraColumns };
}

async function insertApiColumns(db, apiColumnRows) {
    for (const row of apiColumnRows) {
        await runSql(db,
            `INSERT OR REPLACE INTO api_columns
                (svc_no, field, kor_nm, sql_type, data_type, length,
                 orig_type, orig_length, description, sample, infer_reason)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [row.svcNo, row.field, row.korNm,
             row.spec.sqlType, row.spec.dataType, row.spec.length,
             row.origType, row.origLength, row.desc, row.sample,
             row.spec.reason]
        );
    }
}

async function insertExtraApiColumns(db, svcNo, extraColumns) {
    for (const { key, spec } of extraColumns) {
        console.log(`        누락 필드 자동 추가: ${key} (${spec.sqlType})`);
        await runSql(db,
            `INSERT OR IGNORE INTO api_columns
                (svc_no, field, kor_nm, sql_type, data_type, length,
                 orig_type, orig_length, description, sample, infer_reason)
             VALUES (?, ?, ?, ?, ?, ?, '', '', '', '', ?)`,
            [svcNo, key, key, spec.sqlType, spec.dataType, spec.length, spec.reason]
        );
    }
}

// =============================================================================
// 섹션 4. ERD용 SQL DDL 생성
// =============================================================================

/**
 * @param {Array}  datasets
 * @param {string} outputPath
 * @param {Map}    recordsMap     — Map<svcNo, records[]>
 * @param {Object} pkFkAnalysis   — analyze_pk_fk.js의 analyze() 반환값 (없으면 FK 표시 생략)
 */
function generateErdSqlFile(datasets, outputPath, recordsMap = new Map(), pkFkAnalysis = null) {
    if (!outputPath) return;

    // ERD DDL에는 HIGH 신뢰도 후보만 실제 PK/FK 제약으로 출력한다.
    const fksByTable = buildHighConfidenceFksMap(pkFkAnalysis);

    const pkByTable = new Map();
    if (pkFkAnalysis) {
        for (const table of pkFkAnalysis.tables) {
            const best = table.pk_candidates[0];
            if (best && best.confidence === 'HIGH') pkByTable.set(table.svc_no, best);
        }
    }

    const lines = [];
    lines.push('-- =============================================================================');
    lines.push('-- 식품안전나라 Open API ERD용 DDL');
    lines.push('-- 기준 파일: crawl_cache.json');
    lines.push('-- 목적: 물리 컬럼명(field)과 논리 컬럼명(kor_nm)을 함께 표시');
    lines.push('-- 형식: "FIELD_NAME" SQL_TYPE -- FIELD_NAME / 한글명');
    lines.push('-- 정책: HIGH 신뢰도 PK/FK 후보만 실제 제약조건으로 출력');
    lines.push('-- =============================================================================');
    lines.push('');
    lines.push('PRAGMA foreign_keys = ON;');
    lines.push('');

    for (const ds of datasets) {
        const svcNo  = String(ds.svc_no || '').trim();
        const svcNm  = String(ds.svc_nm || '').trim();
        const cat    = String(ds.cat    || '').trim();
        const fields = Array.isArray(ds.fields) ? ds.fields : [];
        if (!svcNo) continue;

        const records     = recordsMap.get(svcNo) || [];
        const bestPk      = pkByTable.get(svcNo);
        const hasPk       = !!bestPk;
        const tableFks    = fksByTable.get(svcNo);
        const fksList     = tableFks ? [...tableFks.values()] : [];
        const hasFks      = fksList.length > 0;
        const validFields = fields.filter(f => String(f.field || '').trim() && !isSystemSampleField(f.field));

        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`-- ${svcNo} / ${sanitizeSqlComment(svcNm)}`);
        if (cat) lines.push(`-- 카테고리: ${sanitizeSqlComment(cat)}`);
        lines.push('-- -----------------------------------------------------------------------------');
        lines.push(`CREATE TABLE ${quoteIdent(svcNo)} (`);

        if (validFields.length === 0) {
            lines.push(`  ${quoteIdent('_no_field')} TEXT -- 필드 정보 없음`);
        } else {
            const fieldLines = [];
            validFields.forEach((f, idx) => {
                const fname    = String(f.field || '').trim();
                const spec     = inferColumnSpec(f, records);
                const korNm    = sanitizeSqlComment(f.kor_nm || '');
                const fkTarget = tableFks && tableFks.get(fname);
                const fkPct    = fkTarget?.inclusion_check?.checked
                    ? `, 포함률 ${(fkTarget.inclusion_check.inclusion_ratio * 100).toFixed(1)}%`
                    : '';
                const fkComment = fkTarget ? ` / FK 후보(${fkTarget.confidence}${fkPct}) -> ${fkTarget.to_table}.${fkTarget.to_field}` : '';
                const pkComment = bestPk && bestPk.fields.includes(fname) ? ` / PK 후보(${bestPk.confidence})` : '';
                const hasNext   = idx < validFields.length - 1 || hasPk || hasFks;

                fieldLines.push(
                    `  ${quoteIdent(fname)} ${spec.sqlType}${hasNext ? ',' : ''} -- ${fname}${korNm ? ` / ${korNm}` : ''}${pkComment}${fkComment}`
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
        }

        lines.push(');');
        lines.push('');

        // 논리명 확인용 뷰
        if (validFields.length > 0) {
            const viewName = `v_${svcNo}_LOGICAL`;
            lines.push(`CREATE VIEW ${quoteIdent(viewName)} AS`);
            lines.push('SELECT');
            const selectParts = validFields.map((f, idx, arr) => {
                const fname = String(f.field || '').trim();
                const korNm = sanitizeSqlComment(f.kor_nm || '');
                const alias = korNm ? `${fname} -- ${korNm}` : fname;
                return `  ${quoteIdent(fname)} AS ${quoteIdent(alias)}${idx < arr.length - 1 ? ',' : ''}`;
            });
            lines.push(selectParts.join('\n'));
            lines.push(`FROM ${quoteIdent(svcNo)};`);
            lines.push('');
        }
    }

    fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
    log('INFO', `ERD용 SQL 생성 완료: ${outputPath}`);
}

// =============================================================================
// 섹션 5. DB 생성 세부 로직
// =============================================================================

async function createMetaTables(db) {
    await execSql(db, `
        CREATE TABLE IF NOT EXISTS api_tables (
            svc_no             TEXT PRIMARY KEY,
            svc_nm             TEXT,
            cat                TEXT,
            detail_url         TEXT,
            type_cd            TEXT,
            description        TEXT,
            sample_url         TEXT,
            sample_data_length INTEGER,
            field_count        INTEGER,
            view_name          TEXT
        );
        CREATE TABLE IF NOT EXISTS api_columns (
            svc_no        TEXT NOT NULL,
            field         TEXT NOT NULL,
            kor_nm        TEXT,
            sql_type      TEXT,
            data_type     TEXT,
            length        TEXT,
            orig_type     TEXT,
            orig_length   TEXT,
            description   TEXT,
            sample        TEXT,
            infer_reason  TEXT,
            PRIMARY KEY (svc_no, field)
        );
    `);
}

async function insertApiTableRow(db, ds, sampleDataLength, fieldCount) {
    await runSql(db,
        `INSERT OR REPLACE INTO api_tables
            (svc_no, svc_nm, cat, detail_url, type_cd, description,
             sample_url, sample_data_length, field_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [String(ds.svc_no || '').trim(),
         String(ds.svc_nm || '').trim(),
         String(ds.cat || '').trim(),
         ds.detail_url || '',
         ds.type_cd || 'API_TYPE06',
         ds.desc || '',
         ds.sample_url || '',
         sampleDataLength,
         fieldCount]
    );
}

function buildPkConstraint(pkFkAnalysis, svcNo, colMeta, applyConstraints) {
    if (!applyConstraints) return '';

    const bestPk = getHighConfidencePkForTable(pkFkAnalysis, svcNo, colMeta);
    if (!bestPk) return '';

    console.log(`        PK 자동 적용: ${bestPk.fields.join(', ')} (${bestPk.confidence})`);
    return `,\n  PRIMARY KEY (${bestPk.fields.map(quoteIdent).join(', ')})`;
}

function buildFkConstraint(allFksMap, svcNo, colMeta, applyConstraints) {
    if (!applyConstraints) return '';

    const tableFks = allFksMap.get(svcNo);
    if (!tableFks) return '';

    const fkParts = [];
    for (const fk of tableFks.values()) {
        if (!colMeta.has(fk.from_field)) continue;
        fkParts.push(`  FOREIGN KEY (${quoteIdent(fk.from_field)}) REFERENCES ${quoteIdent(fk.to_table)} (${quoteIdent(fk.to_field)})`);
        const pct = fk.inclusion_check?.checked ? `, 포함률 ${(fk.inclusion_check.inclusion_ratio * 100).toFixed(1)}%` : '';
        console.log(`        FK 자동 적용: ${fk.from_field} -> ${fk.to_table}.${fk.to_field} (Score: ${fk.score}${pct})`);
    }

    return fkParts.length > 0 ? ',\n' + fkParts.join(',\n') : '';
}

async function createDatasetTable(db, svcNo, colMeta, pkDef, fkDef) {
    await runSql(db, `DROP TABLE IF EXISTS ${quoteIdent(svcNo)}`);

    if (colMeta.size > 0) {
        const colDefs = [...colMeta.entries()].map(([fname, meta]) =>
            `  ${quoteIdent(fname)} ${meta.sqlType}`
        );
        await execSql(db, `CREATE TABLE ${quoteIdent(svcNo)} (\n${colDefs.join(',\n')}${pkDef}${fkDef}\n);`);
    } else {
        await execSql(db, `CREATE TABLE ${quoteIdent(svcNo)} (${quoteIdent('_no_field')} TEXT);`);
    }
}

async function insertRecords(db, svcNo, records, colMeta) {
    if (records.length === 0 || colMeta.size === 0) return 0;

    const colNames   = [...colMeta.keys()];
    const insertSql  = `INSERT INTO ${quoteIdent(svcNo)} (${colNames.map(quoteIdent).join(', ')}) VALUES (${colNames.map(() => '?').join(', ')})`;

    await runSql(db, 'BEGIN TRANSACTION');
    try {
        for (const rec of records) {
            await runSql(db, insertSql, colNames.map(c => normalizeValue(rec[c])));
        }
        await runSql(db, 'COMMIT');
        console.log(`        데이터 INSERT: ${records.length}행`);
        return records.length;
    } catch (err) {
        await runSql(db, 'ROLLBACK').catch(() => {});
        log('WARN', `INSERT 실패 (${svcNo}): ${err.message}`);
        return 0;
    }
}

async function createLogicalView(db, svcNo, svcNm, colMeta) {
    if (colMeta.size === 0) return null;

    const viewName = safeViewName(svcNo, svcNm);
    const selectParts = [...colMeta.entries()].map(([fname, meta]) => {
        const kor = meta.korNm || '';
        return (kor && kor !== fname)
            ? `${quoteIdent(fname)} AS ${quoteIdent(kor)}`
            : quoteIdent(fname);
    });

    try {
        await runSql(db, `DROP VIEW IF EXISTS ${quoteIdent(viewName)}`);
        await execSql(db, `CREATE VIEW ${quoteIdent(viewName)} AS\n  SELECT ${selectParts.join(', ')}\n  FROM ${quoteIdent(svcNo)};`);
        await runSql(db, 'UPDATE api_tables SET view_name = ? WHERE svc_no = ?', [viewName, svcNo]);
        console.log(`        한글 뷰 생성: ${viewName}`);
        return viewName;
    } catch (err) {
        log('WARN', `뷰 생성 실패 (${svcNo}): ${err.message}`);
        return null;
    }
}

async function migrateDataset(db, ds, idx, totalCount, recordsMap, pkFkAnalysis, allFksMap, options) {
    const svcNo = String(ds.svc_no || '').trim();
    const svcNm = String(ds.svc_nm || '').trim();
    const fields = Array.isArray(ds.fields) ? ds.fields : [];

    if (!svcNo) {
        log('WARN', `[${idx + 1}] svc_no 없음 → 건너뜀`);
        return { skipped: true, insertedRows: 0 };
    }

    console.log(`\n  [${String(idx + 1).padStart(3, ' ')}/${totalCount}] ${svcNo}  ${svcNm}`);

    const sampleJsonPath = path.join(options.samplesDir, `${svcNo}.json`);
    const sampleDataLength = fs.existsSync(sampleJsonPath)
        ? fileSizeIfExists(sampleJsonPath)
        : Number(ds.sample_data_length || 0);

    const records = recordsMap.get(svcNo) || [];

    await insertApiTableRow(db, ds, sampleDataLength, fields.length);

    console.log(records.length > 0
        ? `        샘플 데이터 ${records.length}건 로드`
        : '        샘플 없음 → 스키마만 생성'
    );

    const { colMeta, apiColumnRows, extraColumns } = buildColMeta(fields, records, svcNo);

    await insertApiColumns(db, apiColumnRows);
    await insertExtraApiColumns(db, svcNo, extraColumns);

    const pkDef = buildPkConstraint(pkFkAnalysis, svcNo, colMeta, options.applyConstraints);
    const fkDef = buildFkConstraint(allFksMap, svcNo, colMeta, options.applyConstraints);

    await createDatasetTable(db, svcNo, colMeta, pkDef, fkDef);

    const preview = [...colMeta.entries()].slice(0, 4)
        .map(([fn, m]) => `${fn}:${m.sqlType}`).join('  ');
    console.log(`        테이블 생성: ${colMeta.size}개 컬럼  ${preview}${colMeta.size > 4 ? ' ...' : ''}`);

    const insertedRows = await insertRecords(db, svcNo, records, colMeta);

    if (options.createViews) {
        await createLogicalView(db, svcNo, svcNm, colMeta);
    }

    return { skipped: false, insertedRows };
}

async function createIndexesForFields(db, datasets, fields, label) {
    log('STEP', `${label} 인덱스 생성`);

    let indexCount = 0;
    for (const ds of datasets) {
        const svcNo = String(ds.svc_no || '').trim();
        if (!svcNo) continue;

        const existing = new Set(
            (Array.isArray(ds.fields) ? ds.fields : [])
                .map(f => String(f.field || ''))
                .filter(Boolean)
        );

        for (const fname of fields) {
            if (!existing.has(fname)) continue;
            try {
                await runSql(db, `CREATE INDEX IF NOT EXISTS ${quoteIdent(`idx_${svcNo}_${fname}`)} ON ${quoteIdent(svcNo)} (${quoteIdent(fname)})`);
                indexCount++;
            } catch (err) {
                log('WARN', `인덱스 생성 실패 (${svcNo}.${fname}): ${err.message}`);
            }
        }
    }

    log('INFO', `${label} 인덱스 생성 완료: ${indexCount}개`);
    return indexCount;
}

async function validateForeignKeysIfNeeded(db, applyConstraints) {
    if (!applyConstraints) return { checked: false, errorCount: 0 };

    await execSql(db, 'PRAGMA foreign_keys = ON;');
    const fkErrors = await allSql(db, 'PRAGMA foreign_key_check;');

    if (fkErrors.length > 0) {
        log('WARN', `FK 검증 오류 ${fkErrors.length}건 발견`);
        fkErrors.slice(0, 10).forEach((err, idx) => {
            log('WARN', `  [${idx + 1}] table=${err.table}, rowid=${err.rowid}, parent=${err.parent}, fkid=${err.fkid}`);
        });
        if (fkErrors.length > 10) log('WARN', `  ... 외 ${fkErrors.length - 10}건`);
    } else {
        log('INFO', 'FK 검증 통과');
    }

    return { checked: true, errorCount: fkErrors.length };
}

function printSummary(summary) {
    const sep = '='.repeat(62);
    console.log(`\n${sep}`);
    console.log('  SQLite 마이그레이션 완료');
    console.log(sep);
    console.log(`  생성된 DB 파일       : ${summary.dbPath}`);
    console.log(`  처리 데이터셋        : ${summary.successCount} / ${summary.totalDatasets} 개`);
    console.log(`  건너뜀               : ${summary.skipCount} 개`);
    console.log(`  총 INSERT 행         : ${summary.totalRows.toLocaleString()} 행`);
    console.log(`  관계키 인덱스 생성   : ${summary.relationIndexCount} 개`);
    console.log(`  검색용 인덱스 생성   : ${summary.searchIndexCount} 개`);
    console.log(`  한글 뷰 생성         : ${summary.createViews ? '예' : '아니오'}`);
    console.log(`  ERD SQL 생성         : ${summary.erdPath || '아니오'}`);
    console.log(`  PK/FK 분석 연동      : ${summary.runPkFk ? '예' : '아니오'}`);
    console.log(`  실제 PK/FK 제약 적용 : ${summary.applyConstraints ? '예' : '아니오'}`);
    console.log(`  FK 검증              : ${summary.fkCheck.checked ? `${summary.fkCheck.errorCount}건 오류` : '미수행'}`);
    console.log(sep);
    console.log('\n  [사용 예시]');
    console.log(`    sqlite3 ${summary.dbPath}`);
    console.log('    > SELECT * FROM api_tables LIMIT 10;');
    console.log("    > SELECT * FROM api_columns WHERE svc_no = 'I0600';");
    console.log('    > SELECT * FROM I0600 LIMIT 5;');
    if (summary.erdPath) console.log(`    ERD용 SQL 파일 : ${summary.erdPath}`);
    if (summary.runPkFk) console.log(`    PK/FK 후보 SQL : ${summary.pkFkSqlPath}`);
    console.log(sep);
}

// =============================================================================
// 섹션 6. 메인 마이그레이션 로직
// =============================================================================

async function run({
    cachePath,
    dbPath,
    samplesDir,
    createViews,
    erdPath,
    runPkFk          = true,
    applyConstraints = false,
    pkFkJsonPath     = 'foodsafety_key_candidates.json',
    pkFkMdPath       = 'foodsafety_key_candidates.md',
    pkFkSqlPath      = 'foodsafety_keys_erd.sql'
}) {
    log('STEP', '캐시 파일 로드');
    const rawDatasets = loadDatasets(cachePath);
    log('INFO', `데이터셋 수: ${rawDatasets.length}개`);

    log('STEP', '샘플 데이터 로드');
    const recordsMap = loadRecordsMap(rawDatasets, samplesDir);

    // sqlType을 채운 workingDatasets를 이후 전체 단계에서 일관되게 사용한다.
    const workingDatasets = enrichDatasetsWithSqlTypes(rawDatasets, recordsMap);

    let pkFkAnalysis = null;
    if (runPkFk) {
        log('STEP', 'PK/FK 후보 분석 (1회 실행 → DB·ERD·결과 파일 공유)');
        try {
            pkFkAnalysis = analyzePkFk(workingDatasets, recordsMap);
            log('INFO', `PK/FK 분석 완료 — PK 보유 테이블: ${pkFkAnalysis.summary.tables_with_pk_candidates}, FK 후보: ${pkFkAnalysis.summary.relationship_count}`);
        } catch (err) {
            log('WARN', `PK/FK 분석 실패: ${err.message}`);
        }
    }

    const allFksMap = buildHighConfidenceFksMap(pkFkAnalysis);

    log('STEP', `SQLite DB 생성: ${dbPath}`);
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        log('INFO', '기존 DB 파일 삭제 후 재생성');
    }

    const db = await openDb(dbPath);

    try {
        await execSql(db, `
            PRAGMA journal_mode = WAL;
            PRAGMA synchronous = NORMAL;
            PRAGMA foreign_keys = OFF;
        `);

        log('STEP', '메타데이터 시스템 테이블 생성');
        await createMetaTables(db);
        log('INFO', 'api_tables, api_columns 테이블 생성 완료');

        if (applyConstraints) {
            log('WARN', '실제 PK/FK 제약 적용 모드입니다. HIGH 신뢰도 후보만 적용합니다.');
        } else {
            log('INFO', '기본 모드: PK/FK 후보는 결과 파일과 ERD에만 반영하고, 실제 DB 제약은 적용하지 않습니다.');
        }

        log('STEP', `데이터셋 테이블 생성 및 데이터 이식 시작 (총 ${workingDatasets.length}개)`);

        let totalRows = 0;
        let successCount = 0;
        let skipCount = 0;

        for (let idx = 0; idx < workingDatasets.length; idx++) {
            const result = await migrateDataset(
                db,
                workingDatasets[idx],
                idx,
                workingDatasets.length,
                recordsMap,
                pkFkAnalysis,
                allFksMap,
                { samplesDir, createViews, applyConstraints }
            );

            if (result.skipped) skipCount++;
            else successCount++;
            totalRows += result.insertedRows;
        }

        const relationIndexCount = await createIndexesForFields(db, workingDatasets, RELATION_INDEX_FIELDS, '관계키');
        const searchIndexCount   = await createIndexesForFields(db, workingDatasets, SEARCH_INDEX_FIELDS, '검색용 명칭');

        const fkCheck = await validateForeignKeysIfNeeded(db, applyConstraints);

        if (erdPath) {
            log('STEP', 'ERD용 SQL 파일 생성');
            generateErdSqlFile(workingDatasets, erdPath, recordsMap, pkFkAnalysis);
        }

        if (runPkFk && pkFkAnalysis) {
            log('STEP', 'PK/FK 후보 결과 파일 생성');
            try {
                writePkFkReports(pkFkAnalysis, {
                    json: pkFkJsonPath,
                    md:   pkFkMdPath,
                    sql:  pkFkSqlPath
                });
            } catch (err) {
                log('WARN', `PK/FK 결과 파일 생성 실패: ${err.message}`);
            }
        }

        printSummary({
            dbPath,
            totalDatasets: workingDatasets.length,
            successCount,
            skipCount,
            totalRows,
            relationIndexCount,
            searchIndexCount,
            createViews,
            erdPath,
            runPkFk,
            applyConstraints,
            fkCheck,
            pkFkSqlPath
        });

    } finally {
        await closeDb(db);
    }
}

// =============================================================================
// 섹션 7. CLI 진입점
// =============================================================================

if (require.main === module) {
    const args = parseArgs(process.argv.slice(2));
    run({
        cachePath:        args.cache,
        dbPath:           args.db,
        samplesDir:       args.samples,
        createViews:      !args.noViews,
        erdPath:          args.erd,
        runPkFk:          !args.noPkFk,
        applyConstraints: args.applyConstraints
    }).catch(err => {
        log('ERR', err.stack || err.message);
        process.exit(1);
    });
}

module.exports = {
    inferSqlType,
    inferColumnSpec,
    safeViewName,
    generateErdSqlFile,
    loadDatasets,
    loadRecordsMap,
    enrichDatasetsWithSqlTypes,
    buildColMeta,
    createIndexesForFields,
    validateForeignKeysIfNeeded,
    run
};
