/**
 * =============================================================================
 *   데이터셋 사용 시나리오 분석기
 *   파일명: analyze_scenario.js
 *
 *   [수행 역할]
 *   1. crawler/samples/*.json 실제 샘플 데이터를 Arquero DataFrame으로 로드함
 *   2. 동일 키(exact match) + 유사 키(synonym) 기준으로 컬럼 간 값 겹침을 측정함
 *   3. 겹침 비율·건수를 기반으로 JOIN 유형(INNER/LEFT)과 카디널리티를 판단함
 *   4. 관련 데이터셋들을 묶어 비즈니스 시나리오 단위로 도출함
 *   5. 결과를 db/scenario_analysis.json + db/scenario_analysis.md로 저장함
 *
 *   [사용법]
 *     node db/analyze_scenario.js
 *     node db/analyze_scenario.js --samples ./crawler/samples --cache ./crawler/crawl_cache.json
 * =============================================================================
 */

'use strict';

const fs = require('fs');
const path = require('path');
const aq = require('arquero');
const logger = require('../utils/logger');

// =============================================================================
// 섹션 1. 유틸
// =============================================================================

// 커맨드라인 인수에서 --key value 형태의 옵션을 파싱하는 함수
function parseArgs() {
    const args = process.argv.slice(2);
    const opts = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--') && args[i + 1]) {
            opts[args[i].slice(2)] = args[i + 1];
            i++;
        }
    }

    return opts;
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

// 값 배열에서 비어 있는 값을 제거하고 Set으로 반환하는 함수
function toValueSet(values) {
    return new Set(
        values
            .map(normalizeValue)
            .filter(Boolean)
    );
}

// JSON 구조 안에서 실제 데이터 row 배열을 최대한 찾아내는 함수
function extractRowsFromSampleJson(json) {
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

    // 후보 중 배열이 있으면 row 목록으로 사용
    for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
            return candidate;
        }

        if (candidate && typeof candidate === 'object') {
            return [candidate];
        }
    }

    // 내부 깊은 곳에 배열이 숨어 있는 경우 재귀적으로 탐색
    for (const value of Object.values(json)) {
        const rows = extractRowsFromSampleJson(value);

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

// 두 컬럼명이 같은 동의어 그룹에 속하는지 확인하는 함수
function areSynonyms(colA, colB) {
    const normA = normalizeColName(colA);
    const normB = normalizeColName(colB);

    if (normA === normB) {
        return true;
    }

    for (const group of KEY_SYNONYM_GROUPS) {
        const normGroup = group.map(normalizeColName);
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

    for (const group of KEY_SYNONYM_GROUPS) {
        const normGroup = group.map(normalizeColName);
        if (normGroup.includes(normCol)) {
            return group[0];
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

// JOIN 유형 문자열을 SQL JOIN 키워드로 정리하는 함수
function normalizeSqlJoinType(joinType) {
    return joinType.includes('INNER')
        ? 'INNER JOIN'
        : 'LEFT JOIN';
}

// =============================================================================
// 섹션 2. 샘플 데이터 로딩
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
            meta[dataset.svc_no] = {
                svc_nm: dataset.svc_nm,
                cat: dataset.cat || '기타'
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
// 섹션 3. 컬럼 프로파일링
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
// 섹션 4. 값 겹침 분석
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
// 섹션 5. 쌍별 관계 구축
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
// 섹션 6. 시나리오 도출
// =============================================================================

// 관계 그래프를 기반으로 연결된 데이터셋 클러스터를 탐색하는 함수
function clusterByJoinKey(relations) {
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

        // 평균 점수 계산
        const avgScore = Math.round(
            rels.reduce((sum, relation) => sum + relation.score, 0) / rels.length
        );

        // 시나리오 내 최고 신뢰도 산정
        const maxConfidence = rels.some(relation => relation.confidence === 'HIGH')
            ? 'HIGH'
            : rels.some(relation => relation.confidence === 'MEDIUM')
                ? 'MEDIUM'
                : 'LOW';

        // SQL 힌트 생성용으로 점수 높은 관계를 우선 사용
        const sortedRels = [...rels]
            .sort((a, b) => b.score - a.score || b.matched - a.matched)
            .slice(0, 3);

        const sqlHint = buildSqlHint(joinKey, sortedRels);

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
function buildSqlHint(joinKey, rels) {
    if (rels.length === 0) {
        return '';
    }

    const aliases = 'ABCDEFGH'.split('');
    const lines = [];

    // 관계에 등장하는 모든 테이블을 수집함
    // 기존 방식은 svcB만 추가하여 svcA 쪽에만 등장하는 테이블이 누락될 수 있었음
    const tables = [];

    for (const relation of rels) {
        if (!tables.includes(relation.svcA)) {
            tables.push(relation.svcA);
        }

        if (!tables.includes(relation.svcB)) {
            tables.push(relation.svcB);
        }
    }

    const limitedTables = tables.slice(0, MAX_SQL_TABLES);

    const selects = limitedTables
        .slice(0, 3)
        .map((table, index) => `${aliases[index]}.${quoteIdent(joinKey)}`);

    lines.push(`SELECT ${selects.join(', ')}, A.*, B.*`);
    lines.push(`FROM ${quoteIdent(limitedTables[0])} A`);

    for (let index = 1; index < limitedTables.length; index++) {
        const prevTable = limitedTables[index - 1];
        const currentTable = limitedTables[index];

        const relation = rels.find(item =>
            (item.svcA === prevTable && item.svcB === currentTable) ||
            (item.svcB === prevTable && item.svcA === currentTable)
        ) || rels[index - 1];

        const prevAlias = aliases[index - 1];
        const currentAlias = aliases[index];

        // 현재 관계의 방향에 따라 이전 테이블 컬럼과 현재 테이블 컬럼을 맞춤
        let leftCol;
        let rightCol;

        if (relation.svcA === prevTable && relation.svcB === currentTable) {
            leftCol = relation.colA;
            rightCol = relation.colB;
        } else if (relation.svcB === prevTable && relation.svcA === currentTable) {
            leftCol = relation.colB;
            rightCol = relation.colA;
        } else {
            leftCol = relation.colA;
            rightCol = relation.colB;
        }

        const sqlJoinType = normalizeSqlJoinType(relation.joinType);

        lines.push(`${sqlJoinType} ${quoteIdent(currentTable)} ${currentAlias}`);
        lines.push(`  ON ${prevAlias}.${quoteIdent(leftCol)} = ${currentAlias}.${quoteIdent(rightCol)}`);
    }

    lines.push(`WHERE A.${quoteIdent(joinKey)} IS NOT NULL AND A.${quoteIdent(joinKey)} != ''`);
    lines.push('LIMIT 100;');

    return lines.join('\n');
}

// =============================================================================
// 섹션 7. 결과 파일 생성
// =============================================================================

// JSON 결과 파일을 저장하는 함수
function writeJson(scenarios, relations, outputPath) {
    const result = {
        generatedAt: new Date().toISOString(),
        summary: {
            totalScenarios: scenarios.length,
            totalRelations: relations.length,
            highConfidence: scenarios.filter(scenario => scenario.confidence === 'HIGH').length,
        },
        scenarios: scenarios.slice(0, TOP_SCENARIOS),
        relations: relations.slice(0, TOP_RELATIONS)
    };

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

    logger.info({
        outputPath
    }, 'JSON 결과 파일 저장 완료');
}

// Markdown 결과 파일을 저장하는 함수
function writeMd(scenarios, relations, outputPath) {
    const lines = [];

    lines.push('# 데이터셋 사용 시나리오 분석 결과');
    lines.push(`> 생성일시: ${new Date().toLocaleString('ko-KR')}`);
    lines.push('');
    lines.push(`- 전체 시나리오: **${scenarios.length}개**`);
    lines.push(`- 전체 관계: **${relations.length}개**`);
    lines.push(`- HIGH 신뢰도 시나리오: **${scenarios.filter(scenario => scenario.confidence === 'HIGH').length}개**`);
    lines.push('');
    lines.push('---');
    lines.push('');

    for (const scenario of scenarios.slice(0, TOP_SCENARIOS)) {
        lines.push(`## ${scenario.id} — \`${scenario.joinKey}\` 기반 (${scenario.confidence}, ${scenario.score}점)`);
        lines.push('');
        lines.push(`**참여 데이터셋** (${scenario.datasetCount}개): ${scenario.datasets.join(', ')}`);
        lines.push('');
        lines.push('| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |');
        lines.push('|---|---|---|---|---|---|---|---|---|');

        for (const relation of scenario.relations) {
            const samples = relation.sampleMatches
                .slice(0, 2)
                .map(escapeMarkdownCell)
                .join(', ');

            lines.push(
                `| ${escapeMarkdownCell(relation.fromNm || relation.from)} ` +
                `| ${escapeMarkdownCell(relation.toNm || relation.to)} ` +
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
        lines.push('```sql');
        lines.push(scenario.sql);
        lines.push('```');
        lines.push('');
    }

    fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');

    logger.info({
        outputPath
    }, 'Markdown 결과 파일 저장 완료');
}

// =============================================================================
// 섹션 8. 메인 실행
// =============================================================================

// 메인 실행 함수
async function main() {
    const opts = parseArgs();

    const samplesDir = opts.samples || DEFAULT_SAMPLES;
    const cachePath = opts.cache || DEFAULT_CACHE;
    const jsonOut = opts.json || DEFAULT_JSON;
    const mdOut = opts.md || DEFAULT_MD;

    logger.info({
        samplesDir,
        cachePath,
        jsonOut,
        mdOut
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

    // 4. 시나리오 클러스터링
    logger.info('JOIN 키 기반 시나리오 클러스터링을 시작합니다.');
    const scenarios = clusterByJoinKey(relations);

    // 5. 결과 출력
    logger.info({
        totalScenarios: scenarios.length,
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

    // 6. 결과 파일 저장
    writeJson(scenarios, relations, jsonOut);
    writeMd(scenarios, relations, mdOut);

    logger.info({
        jsonOut,
        mdOut
    }, '전체 분석이 완료되었습니다.');
}

// 스크립트 실행 및 최상위 오류 처리
main().catch(err => {
    logger.fatal({
        err
    }, '분석 중 심각한 오류가 발생했습니다.');

    process.exit(1);
});