/**
 * 식품안전나라 SQLite DB 기반 조인 검증 및 N차 체인 조인 탐색 통합 스크립트
 *
 * 기능:
 * - foodsafety_key_candidates.json의 후보 관계를 실제 SQLite JOIN으로 검증함
 * - 실제 매칭되는 직접 JOIN 결과를 join.sql로 생성함
 * - SQLite DB 전체 테이블을 기준으로 실제 매칭 가능한 조인 에지를 검증함
 * - 검증된 에지를 기반으로 3차~6차 체인 JOIN을 탐색함
 * - 최종 체인 JOIN 결과를 chain_joins.sql로 생성함
 */

// SQLite DB 접근을 위한 sqlite3 모듈 불러오기
const sqlite3 = require('sqlite3').verbose();

// 파일 읽기, 쓰기, 존재 여부 확인을 위한 fs 모듈 불러오기
const fs = require('fs');

// 파일 및 디렉터리 경로 처리를 위한 path 모듈 불러오기
const path = require('path');



// pipeline.js에서 공통키 식별 함수를 불러오는 대신 자체 함수를 사용
// const { identifyCommonKeys } = require('../crawler/pipeline');

// 자체 공통키 식별 함수 (3개 이상 데이터셋에서 등장한 필드 추출)
function identifyCommonKeys(datasets) {
    const fieldFreq = {};
    for (const ds of datasets) {
        for (const f of ds.fields || []) {
            const fieldName = (f.field || '').trim().toUpperCase();
            if (fieldName) fieldFreq[fieldName] = (fieldFreq[fieldName] || 0) + 1;
        }
    }
    return {
        common_keys: Object.keys(fieldFreq).filter(k => fieldFreq[k] >= 3)
    };
}

// 현재 스크립트 기준 DB 디렉터리 경로 설정
const DB_DIR = __dirname;

// SQLite DB 파일 경로
const DB_PATH = path.join(DB_DIR, 'foodsafety.db');

// FK/PK 후보 분석 결과 JSON 파일 경로
const CANDIDATES_PATH = path.join(DB_DIR, 'foodsafety_key_candidates.json');

// 크롤링 메타데이터 캐시 파일 경로
const CACHE_PATH = path.join(__dirname, '../crawler/crawl_cache.json');

// 직접 JOIN 검증 SQL 출력 파일 경로
const JOIN_SQL_PATH = path.join(DB_DIR, 'join.sql');

// N차 체인 JOIN 출력 파일 경로
const CHAIN_JOIN_SQL_PATH = path.join(DB_DIR, 'chain_joins.sql');

// 체인 조인 최소 길이
const MIN_CHAIN_LENGTH = 3;

// 체인 조인 최대 길이 (성능을 위해 4차 체인으로 제한)
const MAX_CHAIN_LENGTH = 4;

// SQL 별칭으로 사용할 문자 목록
const TABLE_ALIASES = 'ABCDEFGH'.split('');

// 실제 조인 후보로 인정할 주요 컬럼 목록 (main()에서 동적으로 설정됨)
let VALID_JOIN_KEYS = new Set();

// 자체 identifyCommonKeys 결과로 VALID_JOIN_KEYS를 동적 생성하는 함수
// 날짜·명칭·주소 등 약한 키 패턴은 조인 후보에서 제외함
function buildValidJoinKeys(datasets) {
    const ka = identifyCommonKeys(datasets);

    // 식별자(PK/FK) 성격의 접미사를 가진 컬럼만 허용
    const isIdentifier = (f) =>
        /_NO$/i.test(f) ||
        /_CD$/i.test(f) ||
        /_ID$/i.test(f) ||
        /_SEQ$/i.test(f) ||
        /_SN$/i.test(f);

    const isWeak = (f) =>
        /_NM$/i.test(f)      ||  // 명칭류
        /_NAME$/i.test(f)    ||
        /_CD_NM$/i.test(f)   ||
        /ADDR$/i.test(f)     ||  // 주소류
        /TEL/i.test(f)       ||  // 전화·팩스류
        /FAX/i.test(f)       ||
        /DT$/i.test(f)       ||  // 날짜류
        /DTM$/i.test(f)      ||
        /DATE$/i.test(f)     ||
        /YEAR$/i.test(f)     ||  // 연도
        /YR$/i.test(f)       ||
        /MM$/i.test(f)       ||  // 월
        /_CN$/i.test(f)      ||  // 내용류
        /_DESC$/i.test(f)    ||
        /_CONT$/i.test(f)    ||
        /_MEMO$/i.test(f)    ||
        /PRVNS$/i.test(f)    ||  // 사유, 조항
        /VAL$/i.test(f)      ||  // 수치, 값
        /QY$/i.test(f)       ||  // 수량
        /^LV_NO$/i.test(f)   ||  // 단순 레벨 번호
        /^PRODUCTION$/i.test(f)||// 생산여부 플래그
        /GUBUN$/i.test(f)    ||  // 구분
        /_YN$/i.test(f)      ||  // 여부류
        /YN$/i.test(f);

    let keys = ka.common_keys.filter(k => isIdentifier(k) && !isWeak(k));

    // 강제로 보장할 필수 조인 키 (사용자 요청)
    const MUST_HAVE_KEYS = [
        'LCNS_NO',
        'PRDLST_REPORT_NO',
        'TESTITM_CD',
        'CMMN_SPEC_CD',
        'PRDLST_CD',
        'HF_FNCLTY_MTRAL_RCOGN_NO',
        'BAR_CD',
        'DSPS_STDR_CD',
        'ITEM_REPORT_NO'
    ];
    
    MUST_HAVE_KEYS.forEach(k => {
        if (!keys.includes(k)) {
            keys.push(k);
        }
    });

    logger.info({
        totalCommonKeys: ka.common_keys.length,
        validJoinKeys: keys.length,
        keys
    }, 'pipeline.js 분석 결과로 조인 후보 키를 동적 생성했습니다.');

    return new Set(keys);
}

// pino logger 설정 제거 및 공통 logger 모듈 사용
const logger = require('../utils/logger');

// SQLite DB 파일 존재 여부 확인
if (!fs.existsSync(DB_PATH)) {
    logger.fatal({ dbPath: DB_PATH }, 'foodsafety.db 파일을 찾을 수 없습니다.');
    process.exit(1);
}

// SQLite DB 연결 생성
const db = new sqlite3.Database(DB_PATH, err => {
    if (err) {
        logger.fatal({ err, dbPath: DB_PATH }, 'SQLite DB 연결 중 오류가 발생했습니다.');
        process.exit(1);
    }

    logger.info({ dbPath: DB_PATH }, 'SQLite DB 연결이 완료되었습니다.');
});

// SQLite all 쿼리를 Promise 방식으로 실행하는 함수
function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
}

// SQLite get 쿼리를 Promise 방식으로 실행하는 함수
function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

// SQLite DB 연결을 Promise 방식으로 종료하는 함수
function closeDb() {
    return new Promise(resolve => {
        db.close(err => {
            if (err) {
                logger.error({ err }, 'SQLite DB 연결 종료 중 오류가 발생했습니다.');
            } else {
                logger.info('SQLite DB 연결을 정상적으로 종료했습니다.');
            }

            resolve();
        });
    });
}

// SQLite 식별자에 큰따옴표가 들어가는 경우를 대비해 이스케이프 처리하는 함수
function quoteIdent(identifier) {
    return `"${String(identifier).replace(/"/g, '""')}"`;
}

// 값이 비어 있지 않은지 확인하는 SQL 조건을 생성하는 함수
function buildNotEmptyCondition(alias, field) {
    return `${alias}.${quoteIdent(field)} IS NOT NULL AND ${alias}.${quoteIdent(field)} != ''`;
}

// 파일이 있으면 JSON으로 읽고, 없거나 파싱 실패 시 기본값을 반환하는 함수
function readJsonFileSafe(filePath, fallbackValue) {
    if (!fs.existsSync(filePath)) {
        logger.warn({ filePath }, 'JSON 파일을 찾을 수 없어 기본값으로 처리합니다.');
        return fallbackValue;
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        logger.warn({ err, filePath }, 'JSON 파일 파싱에 실패하여 기본값으로 처리합니다.');
        return fallbackValue;
    }
}

// crawl_cache.json을 기준으로 테이블별 필드 메타데이터를 생성하는 함수
function loadTableFieldMetadata() {
    const cache = readJsonFileSafe(CACHE_PATH, []);
    const tableFieldMap = {};

    cache.forEach(dataset => {
        tableFieldMap[dataset.svc_no] = dataset.fields || [];
    });

    logger.info({
        cachePath: CACHE_PATH,
        tableCount: Object.keys(tableFieldMap).length
    }, '크롤링 메타데이터 캐시를 불러왔습니다.');

    return tableFieldMap;
}

// SQLite 테이블 목록을 조회하는 함수
async function getTableNames() {
    const tables = await dbAll(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE 'v_%'
      AND name != 'api_tables'
    ORDER BY name
  `);

    return tables.map(table => table.name);
}

// 특정 테이블의 컬럼 목록을 조회하는 함수
async function getTableColumns(tableName) {
    const columns = await dbAll(`PRAGMA table_info(${quoteIdent(tableName)})`);
    return columns.map(column => column.name);
}

// 전체 테이블의 컬럼 정보를 조회하는 함수
async function getAllTableColumns(tableNames) {
    const tableColumns = {};

    for (const tableName of tableNames) {
        tableColumns[tableName] = await getTableColumns(tableName);
    }

    return tableColumns;
}

// 직접 JOIN 후보 관계 JSON 파일을 불러오는 함수
function loadCandidateRelationships() {
    const candidates = readJsonFileSafe(CANDIDATES_PATH, { relationships: [] });

    if (!Array.isArray(candidates.relationships)) {
        logger.warn({ candidatesPath: CANDIDATES_PATH }, 'relationships 배열이 없어 직접 JOIN 검증을 건너뜁니다.');
        return [];
    }

    logger.info({
        candidatesPath: CANDIDATES_PATH,
        relationshipCount: candidates.relationships.length
    }, '조인 후보 관계 파일을 불러왔습니다.');

    return candidates.relationships;
}

// 후보 관계 하나에 대해 실제 JOIN 매칭 통계를 조회하는 함수
async function verifyDirectJoinRelationship(relationship) {
    const {
        from_table,
        from_field,
        to_table,
        to_field,
        confidence
    } = relationship;

    const countSql = `
    SELECT
      (
        SELECT COUNT(DISTINCT ${quoteIdent(from_field)})
        FROM ${quoteIdent(from_table)}
        WHERE ${quoteIdent(from_field)} IS NOT NULL
          AND ${quoteIdent(from_field)} != ''
      ) AS total_unique,
      (
        SELECT COUNT(DISTINCT A.${quoteIdent(from_field)})
        FROM ${quoteIdent(from_table)} A
        INNER JOIN ${quoteIdent(to_table)} B
          ON A.${quoteIdent(from_field)} = B.${quoteIdent(to_field)}
        WHERE ${buildNotEmptyCondition('A', from_field)}
      ) AS matched_unique,
      (
        SELECT COUNT(*)
        FROM ${quoteIdent(from_table)} A
        INNER JOIN ${quoteIdent(to_table)} B
          ON A.${quoteIdent(from_field)} = B.${quoteIdent(to_field)}
      ) AS actual_join_count
  `;

    const stats = await dbGet(countSql);

    const totalUnique = stats?.total_unique || 0;
    const matchedUnique = stats?.matched_unique || 0;
    const actualJoinCount = stats?.actual_join_count || 0;

    let samples = [];
    let ratio = '0.0';

    if (actualJoinCount > 0) {
        const sampleSql = `
      SELECT DISTINCT A.${quoteIdent(from_field)} AS sample_val
      FROM ${quoteIdent(from_table)} A
      INNER JOIN ${quoteIdent(to_table)} B
        ON A.${quoteIdent(from_field)} = B.${quoteIdent(to_field)}
      WHERE ${buildNotEmptyCondition('A', from_field)}
      LIMIT 3
    `;

        const sampleRows = await dbAll(sampleSql);

        samples = sampleRows
            .map(row => row.sample_val)
            .filter(Boolean);

        ratio = totalUnique > 0
            ? ((matchedUnique / totalUnique) * 100).toFixed(1)
            : '0.0';
    }

    return {
        fromTable: from_table,
        fromField: from_field,
        toTable: to_table,
        toField: to_field,
        ratio,
        matchedCount: matchedUnique,
        fromTotal: totalUnique,
        actualJoinCount,
        samples,
        confidence
    };
}

// 후보 관계 목록 전체를 실제 SQLite JOIN 기준으로 검증하는 함수
async function verifyDirectJoins(relationships) {
    const verified = [];

    logger.info({
        relationshipCount: relationships.length
    }, '직접 JOIN 후보 관계 검증을 시작합니다.');

    for (let i = 0; i < relationships.length; i++) {
        const relationship = relationships[i];

        if (i > 0 && i % 50 === 0) {
            logger.info({
                processed: i,
                total: relationships.length
            }, '직접 JOIN 후보 관계 검증을 진행 중입니다.');
        }

        try {
            const result = await verifyDirectJoinRelationship(relationship);
            verified.push(result);
        } catch (err) {
            logger.warn({
                fromTable: relationship.from_table,
                fromField: relationship.from_field,
                toTable: relationship.to_table,
                toField: relationship.to_field,
                errorMessage: err.message
            }, '직접 JOIN 후보 검증 중 오류가 발생하여 해당 관계를 건너뜁니다.');
        }
    }

    verified.sort((a, b) => b.actualJoinCount - a.actualJoinCount);

    const activeVerified = verified.filter(item => item.actualJoinCount > 0);

    logger.info({
        totalVerifiedCount: verified.length,
        activeVerifiedCount: activeVerified.length
    }, '직접 JOIN 후보 관계 검증이 완료되었습니다.');

    return activeVerified;
}

// 직접 JOIN SQL의 SELECT 컬럼 목록을 생성하는 함수
function buildDirectJoinSelectColumns(verifiedJoin, tableFieldMap) {
    const selectColumns = [];

    const columnsA = tableFieldMap[verifiedJoin.fromTable] || [];
    const columnsB = tableFieldMap[verifiedJoin.toTable] || [];

    columnsA.forEach(column => {
        const fieldName = column.field;
        const korName = column.kor_nm || column.field;
        selectColumns.push(`A.${quoteIdent(fieldName)} AS ${quoteIdent(`A_${korName}`)}`);
    });

    columnsB.forEach(column => {
        const fieldName = column.field;
        const korName = column.kor_nm || column.field;
        selectColumns.push(`B.${quoteIdent(fieldName)} AS ${quoteIdent(`B_${korName}`)}`);
    });

    return selectColumns;
}

// 직접 JOIN 검증 결과를 join.sql 파일 내용으로 생성하는 함수
function buildDirectJoinSqlContent(activeVerified, tableFieldMap) {
    let sqlContent = '';

    sqlContent += '-- =============================================================================\n';
    sqlContent += '--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록\n';
    sqlContent += `--   총 검증된 조인 성공 관계: ${activeVerified.length}개\n`;
    sqlContent += `--   생성일시: ${new Date().toISOString()}\n`;
    sqlContent += '-- =============================================================================\n\n';

    activeVerified.forEach((verifiedJoin, index) => {
        const selectColumns = buildDirectJoinSelectColumns(verifiedJoin, tableFieldMap);

        sqlContent += '-- -----------------------------------------------------------------------------\n';
        sqlContent += `-- ${index + 1}. [${verifiedJoin.confidence}] ${verifiedJoin.fromTable}.${verifiedJoin.fromField} <-> ${verifiedJoin.toTable}.${verifiedJoin.toField}\n`;
        sqlContent += `--   - 값 일치율: ${verifiedJoin.ratio}% (${verifiedJoin.matchedCount}개 / Unique ${verifiedJoin.fromTotal}개)\n`;
        sqlContent += `--   - 실제 JOIN 레코드 수: ${verifiedJoin.actualJoinCount.toLocaleString()}건\n`;
        sqlContent += `--   - 매칭된 샘플 데이터: ${JSON.stringify(verifiedJoin.samples)}\n`;
        sqlContent += '-- -----------------------------------------------------------------------------\n';

        if (selectColumns.length === 0) {
            sqlContent += 'SELECT A.*, B.*\n';
        } else {
            sqlContent += `SELECT\n    ${selectColumns.join(',\n    ')}\n`;
        }

        sqlContent += `FROM ${quoteIdent(verifiedJoin.fromTable)} A\n`;
        sqlContent += `INNER JOIN ${quoteIdent(verifiedJoin.toTable)} B\n`;
        sqlContent += `  ON A.${quoteIdent(verifiedJoin.fromField)} = B.${quoteIdent(verifiedJoin.toField)}\n`;
        sqlContent += `WHERE ${buildNotEmptyCondition('A', verifiedJoin.fromField)}\n`;
        sqlContent += 'LIMIT 10;\n\n';
    });

    return sqlContent;
}

// 직접 JOIN 검증 결과를 로그로 요약 출력하는 함수
function logDirectJoinSummary(activeVerified) {
    logger.info({
        activeVerifiedCount: activeVerified.length
    }, '실제 SQLite 데이터 기준 직접 JOIN 성공 관계 요약');

    activeVerified.forEach((item, index) => {
        logger.info({
            rank: index + 1,
            confidence: item.confidence,
            relation: `${item.fromTable}.${item.fromField} <-> ${item.toTable}.${item.toField}`,
            ratio: `${item.ratio}%`,
            matchedCount: item.matchedCount,
            fromTotal: item.fromTotal,
            actualJoinCount: item.actualJoinCount,
            samples: item.samples
        }, '직접 JOIN 성공 관계');
    });
}

// 직접 JOIN 검증 파이프라인을 실행하는 함수
async function runDirectJoinVerification(tableFieldMap) {
    const relationships = loadCandidateRelationships();

    if (relationships.length === 0) {
        logger.warn('직접 JOIN 후보 관계가 없어 join.sql 생성을 건너뜁니다.');
        return [];
    }

    const activeVerified = await verifyDirectJoins(relationships);
    const sqlContent = buildDirectJoinSqlContent(activeVerified, tableFieldMap);

    fs.writeFileSync(JOIN_SQL_PATH, sqlContent, 'utf8');

    logger.info({
        outputPath: JOIN_SQL_PATH,
        activeVerifiedCount: activeVerified.length
    }, '직접 JOIN 검증 SQL 파일 저장이 완료되었습니다.');

    logDirectJoinSummary(activeVerified);

    return activeVerified;
}

// 두 테이블 사이에서 실제 데이터 매칭이 존재하는 조인키를 검증하는 함수
async function findMatchedJoinKeys(tableA, tableB, commonKeys) {
    const matchedKeys = [];

    for (const key of commonKeys) {
        const sql = `
      SELECT COUNT(*) AS cnt
      FROM ${quoteIdent(tableA)} A
      INNER JOIN ${quoteIdent(tableB)} B
        ON A.${quoteIdent(key)} = B.${quoteIdent(key)}
      WHERE ${buildNotEmptyCondition('A', key)}
        AND ${buildNotEmptyCondition('B', key)}
    `;

        try {
            const row = await dbGet(sql);

            if (row && row.cnt > 0) {
                matchedKeys.push({
                    key,
                    count: row.cnt
                });
            }
        } catch (err) {
            logger.warn({
                tableA,
                tableB,
                key,
                errorMessage: err.message
            }, '테이블 간 조인키 검증 중 오류가 발생하여 해당 키를 건너뜁니다.');
        }
    }

    return matchedKeys;
}

// 검증된 에지 그래프에 양방향 관계를 추가하는 함수
function addVerifiedEdge(graph, tableA, tableB, key, count) {
    if (!graph.has(tableA)) {
        graph.set(tableA, new Map());
    }

    if (!graph.has(tableB)) {
        graph.set(tableB, new Map());
    }

    graph.get(tableA).set(tableB, { key, count });
    graph.get(tableB).set(tableA, { key, count });
}

// 실제 매칭이 존재하는 테이블 간 에지 그래프를 생성하는 함수
async function buildVerifiedEdgeGraph(tableNames, tableColumns) {
    const verifiedEdges = new Map();

    let checkedPairCount = 0;
    let matchedPairCount = 0;

    for (let i = 0; i < tableNames.length; i++) {
        for (let j = i + 1; j < tableNames.length; j++) {
            const tableA = tableNames[i];
            const tableB = tableNames[j];

            const columnsA = new Set(tableColumns[tableA]);

            const commonKeys = tableColumns[tableB].filter(column =>
                columnsA.has(column) && VALID_JOIN_KEYS.has(column)
            );

            if (commonKeys.length === 0) {
                continue;
            }

            checkedPairCount++;

            const matchedKeys = await findMatchedJoinKeys(tableA, tableB, commonKeys);

            if (matchedKeys.length === 0) {
                continue;
            }

            matchedPairCount++;

            matchedKeys.sort((a, b) => b.count - a.count);

            const bestMatch = matchedKeys[0];

            addVerifiedEdge(
                verifiedEdges,
                tableA,
                tableB,
                bestMatch.key,
                bestMatch.count
            );
        }
    }

    const verifiedEdgeCount = [...verifiedEdges.values()]
        .reduce((sum, edgeMap) => sum + edgeMap.size, 0) / 2;

    logger.info({
        checkedPairCount,
        matchedPairCount,
        verifiedEdgeCount
    }, '테이블 간 실제 매칭 에지 검증이 완료되었습니다.');

    return verifiedEdges;
}

// 체인 경로 중복 제거용 키를 생성하는 함수
function getChainUniqueKey(chain) {
    const forwardPath = chain.path.join('|');
    const reversePath = [...chain.path].reverse().join('|');

    const forwardKeys = chain.keys.join('|');
    const reverseKeys = [...chain.keys].reverse().join('|');

    const forward = `${forwardPath}::${forwardKeys}`;
    const reverse = `${reversePath}::${reverseKeys}`;

    return forward < reverse ? forward : reverse;
}

// 검증된 에지 그래프를 기반으로 체인 조인 후보를 탐색하는 함수
function findChainCandidates(tableNames, verifiedEdges) {
    const chains = [];

    for (const startTable of tableNames) {
        if (!verifiedEdges.has(startTable)) {
            continue;
        }

        const queue = [
            {
                current: startTable,
                path: [startTable],
                keys: []
            }
        ];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            const { current, path: currentPath, keys: currentKeys } = currentNode;

            if (currentPath.length >= MIN_CHAIN_LENGTH) {
                chains.push({
                    path: [...currentPath],
                    keys: [...currentKeys]
                });
            }

            if (currentPath.length >= MAX_CHAIN_LENGTH) {
                continue;
            }

            const neighbors = verifiedEdges.get(current);

            if (!neighbors) {
                continue;
            }

            for (const [nextTable, edgeInfo] of neighbors) {
                if (currentPath.includes(nextTable)) {
                    continue;
                }

                queue.push({
                    current: nextTable,
                    path: [...currentPath, nextTable],
                    keys: [...currentKeys, edgeInfo.key]
                });
            }
        }
    }

    const uniqueChains = [];
    const seen = new Set();

    for (const chain of chains) {
        const uniqueKey = getChainUniqueKey(chain);

        if (seen.has(uniqueKey)) {
            continue;
        }

        seen.add(uniqueKey);
        uniqueChains.push(chain);
    }

    logger.info({
        totalCandidateCount: chains.length,
        uniqueCandidateCount: uniqueChains.length
    }, '체인 조인 후보 탐색이 완료되었습니다.');

    return uniqueChains;
}

// 체인 경로 전체에 대해 실제 최종 매칭 건수를 검증하는 함수
async function verifyChainMatchCount(chain) {
    const aliases = TABLE_ALIASES;

    const fromClause = `${quoteIdent(chain.path[0])} ${aliases[0]}`;
    const joinClauses = [];

    for (let i = 1; i < chain.path.length; i++) {
        const prevAlias = aliases[i - 1];
        const currentAlias = aliases[i];
        const joinKey = chain.keys[i - 1];

        joinClauses.push(
            `INNER JOIN ${quoteIdent(chain.path[i])} ${currentAlias}
       ON ${prevAlias}.${quoteIdent(joinKey)} = ${currentAlias}.${quoteIdent(joinKey)}`
        );
    }

    const firstJoinKey = chain.keys[0];

    const countSql = `
    SELECT COUNT(*) AS cnt
    FROM ${fromClause}
    ${joinClauses.join('\n')}
    WHERE ${buildNotEmptyCondition(aliases[0], firstJoinKey)}
  `;

    const row = await dbGet(countSql);

    return row && row.cnt ? row.cnt : 0;
}

// 체인 후보 전체를 실제 매칭 여부 기준으로 최종 검증하는 함수
async function verifyChains(uniqueChains) {
    const verifiedChains = [];

    for (let i = 0; i < uniqueChains.length; i++) {
        const chain = uniqueChains[i];
        const checkedCount = i + 1;

        if (checkedCount % 100 === 0 || checkedCount === uniqueChains.length) {
            logger.info({
                checkedCount,
                totalCount: uniqueChains.length
            }, '체인 경로 최종 검증을 진행 중입니다.');
        }

        try {
            const matchCount = await verifyChainMatchCount(chain);

            if (matchCount > 0) {
                verifiedChains.push({
                    ...chain,
                    count: matchCount
                });
            }
        } catch (err) {
            logger.warn({
                path: chain.path.join(' -> '),
                keys: chain.keys.join(', '),
                errorMessage: err.message
            }, '체인 경로 검증 중 오류가 발생하여 해당 경로를 건너뜁니다.');
        }
    }

    verifiedChains.sort((a, b) => {
        if (b.path.length !== a.path.length) {
            return b.path.length - a.path.length;
        }

        return b.count - a.count;
    });

    logger.info({
        verifiedChainCount: verifiedChains.length
    }, '최종 매칭되는 체인 조인 검증이 완료되었습니다.');

    return verifiedChains;
}

// 체인 JOIN SELECT 절에 포함할 대표 컬럼 목록을 생성하는 함수
function buildChainSelectColumns(chain, tableColumns) {
    const selectColumns = [];

    for (let i = 0; i < chain.path.length; i++) {
        const tableName = chain.path[i];
        const alias = TABLE_ALIASES[i];
        const columns = tableColumns[tableName] || [];

        const meaningfulColumns = columns
            .filter(column => !['NUM', 'ROW_NUM', 'LAST_UPDT_DTM'].includes(column))
            .slice(0, 2);

        meaningfulColumns.forEach(column => {
            selectColumns.push(
                `${alias}.${quoteIdent(column)} AS ${quoteIdent(`${alias}_${column}`)}`
            );
        });
    }

    return selectColumns;
}

// 체인 JOIN 결과를 SQL 파일 내용으로 생성하는 함수
function buildChainJoinSqlContent(verifiedChains, tableColumns) {
    let sqlContent = '';

    sqlContent += '-- =============================================================================\n';
    sqlContent += '--   N차 체인 조인 자동 탐색 결과\n';
    sqlContent += '--   기준: 실제 매칭 레코드가 존재하는 체인 조인만 포함\n';
    sqlContent += `--   총 검증된 체인 조인: ${verifiedChains.length}개\n`;
    sqlContent += `--   생성일시: ${new Date().toISOString()}\n`;
    sqlContent += '-- =============================================================================\n\n';

    verifiedChains.forEach((chain, index) => {
        const depth = chain.path.length;
        const selectColumns = buildChainSelectColumns(chain, tableColumns);

        sqlContent += '-- -----------------------------------------------------------------------------\n';
        sqlContent += `-- ${index + 1}. [${depth}차 체인 JOIN] ${chain.path.join(' <-> ')}\n`;
        sqlContent += `--   조인 관계: ${chain.path.map((tableName, i) => {
            if (i === 0) {
                return tableName;
            }

            return `--(${chain.keys[i - 1]})-->${tableName}`;
        }).join(' ')}\n`;
        sqlContent += `--   실제 매칭 레코드: ${chain.count.toLocaleString()}건\n`;
        sqlContent += '-- -----------------------------------------------------------------------------\n';

        if (selectColumns.length > 0) {
            sqlContent += `SELECT\n    ${selectColumns.join(',\n    ')}\n`;
        } else {
            sqlContent += 'SELECT\n    *\n';
        }

        sqlContent += `FROM ${quoteIdent(chain.path[0])} ${TABLE_ALIASES[0]}\n`;

        for (let i = 1; i < chain.path.length; i++) {
            const prevAlias = TABLE_ALIASES[i - 1];
            const currentAlias = TABLE_ALIASES[i];
            const joinKey = chain.keys[i - 1];

            sqlContent += `INNER JOIN ${quoteIdent(chain.path[i])} ${currentAlias}\n`;
            sqlContent += `  ON ${prevAlias}.${quoteIdent(joinKey)} = ${currentAlias}.${quoteIdent(joinKey)}\n`;
        }

        sqlContent += `WHERE ${buildNotEmptyCondition(TABLE_ALIASES[0], chain.keys[0])}\n`;
        sqlContent += 'LIMIT 10;\n\n';
    });

    return sqlContent;
}

// 체인 JOIN 탐색 파이프라인을 실행하는 함수
async function runChainJoinFinder(tableNames, tableColumns) {
    logger.info('테이블 간 공통 조인키를 검증합니다.');

    const verifiedEdges = await buildVerifiedEdgeGraph(tableNames, tableColumns);

    logger.info({
        minChainLength: MIN_CHAIN_LENGTH,
        maxChainLength: MAX_CHAIN_LENGTH
    }, '검증된 에지 기반으로 체인 조인 후보를 탐색합니다.');

    let uniqueChains = findChainCandidates(tableNames, verifiedEdges);
    
    // 성능을 위해 무작위성을 유지하되(앞부분이 항상 같은 테이블에서 시작하지 않도록) 
    // 혹은 의미있는(상대적으로 짧은) 체인 위주로 최대 2000개까지만 검증
    if (uniqueChains.length > 2000) {
        logger.info({
            originalCount: uniqueChains.length,
            limitCount: 2000
        }, '체인 경로가 너무 많아 성능을 위해 2000개로 제한합니다.');
        uniqueChains = uniqueChains.slice(0, 2000);
    }

    logger.info('전체 체인 경로의 실제 매칭 여부를 최종 검증합니다.');

    const verifiedChains = await verifyChains(uniqueChains);

    const sqlContent = buildChainJoinSqlContent(verifiedChains, tableColumns);

    fs.writeFileSync(CHAIN_JOIN_SQL_PATH, sqlContent, 'utf-8');

    logger.info({
        outputPath: CHAIN_JOIN_SQL_PATH,
        verifiedChainCount: verifiedChains.length
    }, '체인 조인 결과 SQL 파일 저장이 완료되었습니다.');

    return verifiedChains;
}

// 메인 실행 함수
async function main() {
    logger.info('식품안전나라 조인 검증 통합 파이프라인을 시작합니다.');

    const tableFieldMap = loadTableFieldMetadata();

    // pipeline.js 분석 결과로 VALID_JOIN_KEYS 동적 초기화
    const datasets = readJsonFileSafe(CACHE_PATH, []);
    VALID_JOIN_KEYS = buildValidJoinKeys(datasets);

    logger.info('SQLite 테이블 목록을 조회합니다.');
    const tableNames = await getTableNames();

    logger.info({
        tableCount: tableNames.length
    }, 'SQLite 테이블 목록 조회가 완료되었습니다.');

    logger.info('SQLite 테이블별 컬럼 정보를 조회합니다.');
    const tableColumns = await getAllTableColumns(tableNames);

    logger.info('직접 JOIN 후보 검증 파이프라인을 실행합니다.');
    await runDirectJoinVerification(tableFieldMap);

    logger.info('N차 체인 JOIN 탐색 파이프라인을 실행합니다.');
    await runChainJoinFinder(tableNames, tableColumns);

    logger.info({
        joinSqlPath: JOIN_SQL_PATH,
        chainJoinSqlPath: CHAIN_JOIN_SQL_PATH
    }, '식품안전나라 조인 검증 통합 파이프라인이 완료되었습니다.');
}

// 스크립트 실행 및 최상위 오류 처리
main()
    .catch(err => {
        logger.fatal({ err }, '조인 검증 통합 파이프라인 실행 중 심각한 오류가 발생했습니다.');
        process.exitCode = 1;
    })
    .finally(async () => {
        await closeDb();
    });