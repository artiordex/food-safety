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
 * node db/analyze_scenario.js
 * node db/analyze_scenario.js --samples ./crawler/samples --cache ./crawler/crawl_cache.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const aq = require('arquero');
const logger = require('../utils/logger');

const DEFAULT_SAMPLES = path.join(__dirname, '../crawler/samples');
const DEFAULT_CACHE   = path.join(__dirname, '../crawler/crawl_cache.json');
const DEFAULT_JSON    = path.join(__dirname, 'foodsafety_scenarios.json');
const DEFAULT_MD      = path.join(__dirname, 'foodsafety_scenarios.md');
const DEFAULT_XLSX    = path.join(__dirname, '../식품안전나라_API_분석결과.xlsx');

// =============================================================================
// 1. 유틸 및 상수
// =============================================================================

// 명칭·주소·날짜·연락처 계열 — JOIN 키로 의미 없는 설명성 필드
const WEAK_KEY_PATTERN = /_NM$|_NAME$|_CD_NM$|ADDR$|ADDRESS$|_DT$|_YMD$|DTM$|DATE$|_MM$|_YEAR$|_YR$|_CN$|_CONT$|_CONTENT$|_DESC$|_MEMO$|_PRVNS$|_MTHD$|TELNO$|TEL_NO$|_TELNO$|PHONE$|MOBILE$|FAX$|_QY$|_VAL$|LV_NO$|PRODUCTION$|_CNT$|_COUNT$|_AMT$|_AMOUNT$|_QTY$|_WGHT$|_RATE$|_RATIO$|_PCT$|_TOT$|_SUM$|_AVG$|_MAX$|_MIN$|YEAR$|AREA$|_FNCLTY$|_STND$|DISPOS$|USAGE$|_MTRQLT$|_DAYCNT$|_YN$/i;

const KEY_SYNONYM_GROUPS = [
    ['LCNS_NO', 'BSSH_NO'],
    ['BRCD_NO', 'BARCODE_NO', 'BRCDNO', 'BAR_CD', 'PDT_BARCD']
];

const MIN_OVERLAP_RATIO = 0.05;
const MIN_DATASETS_PER_SCENARIO = 3;
const MAX_SQL_TABLES = 5;
const TOP_SCENARIOS = 50;
const TOP_RELATIONS = 100;

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

// KEY_SYNONYM_GROUPS의 정규화 결과를 미리 계산해 areSynonyms 호출마다 재생성하지 않는다.
const NORMALIZED_SYNONYM_GROUPS = KEY_SYNONYM_GROUPS.map(group => group.map(normalizeColName));

// 두 컬럼명이 같은 동의어 그룹에 속하는지 확인하는 함수
function areSynonyms(colA, colB) {
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

    return false;
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

    return col;
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
        if (WEAK_KEY_PATTERN.test(col)) {
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

// 두 컬럼 valueSet 간의 겹침 통계를 계산하는 함수
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

// JOIN 유형과 카디널리티를 판단하는 함수
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
    // distinctRate가 높으면 PK 성격이 강하다고 간주함
    const cardinalityA = profileA.distinctRate >= 0.9 ? 'PK' : 'FK';
    const cardinalityB = profileB.distinctRate >= 0.9 ? 'PK' : 'FK';

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

// 두 테이블 간 유효한 JOIN 후보 컬럼 쌍을 모두 찾는 함수
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
            if (overlap.ratioA < MIN_OVERLAP_RATIO && overlap.ratioB < MIN_OVERLAP_RATIO) {
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

    const candidates = Array.from(bestByCanonicalKey.values());

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
// 5. 쌍별 관계 구축
// =============================================================================

// 전체 테이블 쌍에 대해 JOIN 후보를 탐색하고 관계 목록을 반환하는 함수
function buildPairRelations(allProfiles, meta) {
    const svcNos = Object.keys(allProfiles);
    const relations = [];
    let checkedPairs = 0;

    for (let i = 0; i < svcNos.length; i++) {
        for (let j = i + 1; j < svcNos.length; j++) {
            const svcA = svcNos[i];
            const svcB = svcNos[j];

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

            const best = candidates[0];

            relations.push({
                svcA,
                svcB,
                nmA: (meta[svcA] || {}).svc_nm || svcA,
                nmB: (meta[svcB] || {}).svc_nm || svcB,
                catA: (meta[svcA] || {}).cat || '기타',
                catB: (meta[svcB] || {}).cat || '기타',
                joinKey: best.canonicalKey,
                colA: best.colA,
                colB: best.colB,
                korA: ((meta[svcA] || {}).fields || {})[best.colA],
                korB: ((meta[svcB] || {}).fields || {})[best.colB],
                joinType: best.joinType,
                cardinality: best.cardinality,
                score: best.score,
                confidence: best.confidence,
                matched: best.matched,
                ratioA: best.ratioA,
                ratioB: best.ratioB,
                sampleMatches: best.sampleMatches,
                allCandidates: candidates
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

// 관계 그래프를 기반으로 연결된 데이터셋 클러스터를 탐색하는 함수
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
        if (rels.length < MIN_DATASETS_PER_SCENARIO - 1) {
            continue;
        }

        // 연결된 데이터셋 집합 수집
        const datasets = new Set();

        for (const relation of rels) {
            datasets.add(relation.svcA);
            datasets.add(relation.svcB);
        }

        // 최소 데이터셋 수 미달 시 제외
        if (datasets.size < MIN_DATASETS_PER_SCENARIO) {
            continue;
        }

        // 점수 내림차순으로 정렬 (평균 점수·SQL 생성·relations 출력에 일관되게 사용)
        const sortedRels = [...rels]
            .sort((a, b) => b.score - a.score || b.matched - a.matched);

        // 평균 점수 계산 (전체 관계 기준)
        const avgScore = Math.round(
            sortedRels.reduce((sum, relation) => sum + relation.score, 0) / sortedRels.length
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
        const sqlHint = buildSqlHint(joinKey, sortedRels.slice(0, MAX_SQL_TABLES - 1), meta);

        scenarios.push({
            id: `SCN_${String(scenarioId++).padStart(3, '0')}`,
            joinKey,
            datasets: [...datasets],
            datasetCount: datasets.size,
            relations: sortedRels.map(relation => ({
                from: relation.svcA,
                fromNm: relation.nmA,
                to: relation.svcB,
                toNm: relation.nmB,
                colFrom: relation.colA,
                colTo: relation.colB,
                colFromDisplay: relation.korA ? `${relation.korA}(${relation.colA})` : relation.colA,
                colToDisplay: relation.korB ? `${relation.korB}(${relation.colB})` : relation.colB,
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
    // 각 테이블이 실제로 사용하는 컬럼명을 별도로 추적한다.
    // 동의어 키 쌍(LCNS_NO ↔ BSSH_NO)처럼 테이블마다 실제 컬럼명이 다를 수 있기 때문이다.
    const joinedCols = [];
    const joins = [];

    // 시작 테이블 (가장 첫 번째 관계의 svcA)
    const firstRel = rels[0];
    joinedTables.push(firstRel.svcA);
    joinedCols.push(firstRel.colA);

    for (const relation of rels) {
        if (joinedTables.length >= MAX_SQL_TABLES) break;

        if (joinedTables.includes(relation.svcA) && !joinedTables.includes(relation.svcB)) {
            const existingAlias = aliases[joinedTables.indexOf(relation.svcA)];
            const newAlias = aliases[joinedTables.length];
            joinedTables.push(relation.svcB);
            joinedCols.push(relation.colB);

            joins.push(`${normalizeSqlJoinType(relation.joinType)} ${quoteIdent(relation.svcB)} ${newAlias}\n  ON ${existingAlias}.${quoteIdent(relation.colA)} = ${newAlias}.${quoteIdent(relation.colB)}`);
        } else if (joinedTables.includes(relation.svcB) && !joinedTables.includes(relation.svcA)) {
            const existingAlias = aliases[joinedTables.indexOf(relation.svcB)];
            const newAlias = aliases[joinedTables.length];
            joinedTables.push(relation.svcA);
            joinedCols.push(relation.colA);

            joins.push(`${normalizeSqlJoinType(relation.joinType)} ${quoteIdent(relation.svcA)} ${newAlias}\n  ON ${existingAlias}.${quoteIdent(relation.colB)} = ${newAlias}.${quoteIdent(relation.colA)}`);
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
    const firstCol = quoteIdent(joinedCols[0]);
    lines.push(`WHERE A.${firstCol} IS NOT NULL AND A.${firstCol} != ''`);
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
        lines.push(`  ON ${fromAlias}.${quoteIdent(step.fromCol)} = ${toAlias}.${quoteIdent(step.toCol)}`);
    }

    const firstCol = quoteIdent(joinPath[0].fromCol);
    lines.push(`WHERE A.${firstCol} IS NOT NULL AND A.${firstCol} != ''`);
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

        // 점수 내림차순 정렬 후 MAX_SQL_TABLES - 1개까지
        stepsPerKey.sort((a, b) => b.score - a.score);

        const joinPath = [];
        const usedTables = new Set([bridgeTable]);
        const coveredKeys = new Set();

        for (const step of stepsPerKey) {
            if (joinPath.length >= MAX_SQL_TABLES - 1) break;
            if (usedTables.has(step.neighbor)) continue;

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
        const joinKeyLabel = `CHAIN:${[...coveredKeys].join('+')}`;

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
                colFromDisplay: p.rel.korA ? `${p.rel.korA}(${p.rel.colA})` : p.rel.colA,
                colToDisplay:   p.rel.korB ? `${p.rel.korB}(${p.rel.colB})` : p.rel.colB,
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
function writeJson(scenarios, relations, outputPath) {
    const result = {
        generatedAt: formatKstTimestamp(),
        summary: {
            totalScenarios: scenarios.length,
            starScenarios: scenarios.filter(s => !s.isChain).length,
            chainScenarios: scenarios.filter(s => s.isChain).length,
            totalRelations: relations.length,
            highConfidence: scenarios.filter(scenario => scenario.confidence === 'HIGH').length,
        },
        scenarios: scenarios.slice(0, TOP_SCENARIOS),
        relations: relations.slice(0, TOP_RELATIONS)
    };

    try {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    } catch (err) {
        logger.error({ outputPath, errorMessage: err.message }, 'JSON 결과 파일 저장 실패');
        return;
    }

    logger.info({
        outputPath
    }, 'JSON 결과 파일 저장 완료');
}

// Markdown 결과 파일을 저장하는 함수
function writeMd(scenarios, relations, outputPath) {
    const lines = [];

    lines.push('# 데이터셋 사용 시나리오 분석 결과');
    lines.push(`> 생성일시: ${formatKstTimestamp()}`);
    lines.push('');
    lines.push(`- 전체 시나리오: **${scenarios.length}개** (Star: ${scenarios.filter(s => !s.isChain).length}개, Chain: ${scenarios.filter(s => s.isChain).length}개)`);
    lines.push(`- 전체 관계: **${relations.length}개**`);
    lines.push(`- HIGH 신뢰도 시나리오: **${scenarios.filter(scenario => scenario.confidence === 'HIGH').length}개**`);
    lines.push('');
    lines.push('---');
    lines.push('');

    for (const scenario of scenarios.slice(0, TOP_SCENARIOS)) {
        const chainTag = scenario.isChain ? ` 🔗 브릿지: \`${scenario.bridgeTable}\`` : '';
        const emptyTag = scenario.isEmpty ? ' ⚠️ (건수 0건)' : '';
        lines.push(`## ${scenario.id} — \`${scenario.joinKey}\` 기반 (${scenario.confidence}, ${scenario.score}점)${chainTag}${emptyTag}`);
        lines.push('');
        lines.push(`**참여 데이터셋** (${scenario.datasetCount}개): ${scenario.datasets.join(', ')}`);
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
        fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
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
    const noJson     = opts.noJson;
    const noMd       = opts.noMd;
    const noXlsx     = opts.noXlsx;

    logger.info({
        samplesDir,
        cachePath,
        jsonOut: noJson ? '(생략)' : jsonOut,
        mdOut:   noMd   ? '(생략)' : mdOut,
        xlsxPath: noXlsx ? '(생략)' : xlsxPath,
    }, '데이터셋 사용 시나리오 분석을 시작합니다.');

    // 1. 데이터 로딩
    const tables = loadSampleTables(samplesDir);
    const meta = loadMetadata(cachePath);

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
            for (const scenario of scenarios) {
                if (!scenario.sql) continue;
                try {
                    const rows = db.prepare(scenario.sql).all();
                    scenario.isEmpty = rows.length === 0;
                    if (scenario.isEmpty) emptyCount++;
                } catch {
                    scenario.isEmpty = false;
                }
            }
            db.close();
            logger.info({ emptyCount }, 'DB 검증 완료 — 0건 시나리오 표시 예정');
        } catch (err) {
            logger.warn({ errorMessage: err.message }, 'DB 검증 생략 (better-sqlite3 로드 실패)');
        }
    }

    // 7. 결과 파일 저장
    if (!noJson) writeJson(scenarios, relations, jsonOut);
    if (!noMd)   writeMd(scenarios, relations, mdOut);

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
    writeJson,
    writeMd,
    // 유틸
    normalizeValue,
    normalizeColName,
    areSynonyms,
    canonicalKey,
    computeOverlap,
    classifyJoin,
    findJoinCandidates
};
