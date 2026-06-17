/**
 * 식품안전나라 API 메타데이터 분석 파이프라인
 *
 * [주요 기능]
 * 1. db/analyze_pk_fk.js의 강력한 통계적(Entropy, Inclusion Ratio, String-Similarity) 분석 결과를 활용
 * 2. analyze_pk_fk.js 결과를 excel_reporter.js 가 요구하는 형식으로 어댑팅(Adapting)
 * 3. 최종 분석 결과를 엑셀 보고서로 생성
 */

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');
const SAMPLES_DIR = path.join(__dirname, 'samples');
const OUTPUT_XLSX = path.join(__dirname, '../식품안전나라_API_분석결과.xlsx');

const {
  analyze,
  buildEntropyMap,
  parseSampleJson,
} = require('../db/analyze_pk_fk.js');

const { buildExcel } = require('./excel_reporter.js');

// JSON 샘플을 로드하여 recordsMap 생성
function loadSamples(datasets, samplesDir) {
  const recordsMap = new Map();
  for (const ds of datasets) {
    const svcNo = String(ds.svc_no || '').trim();
    if (!svcNo) continue;
    const samplePath = path.join(samplesDir, `${svcNo}.json`);

    if (fs.existsSync(samplePath)) {
      // parseSampleJson은 파일 경로를 받아 내부에서 readFileSync를 수행한다
      const records = parseSampleJson(samplePath, svcNo);
      recordsMap.set(svcNo, records || []);
    } else {
      recordsMap.set(svcNo, []);
    }
  }
  return recordsMap;
}

// SQL 힌트 템플릿
function getSqlHint(serviceNoA, datasetNameA, serviceNoB, datasetNameB, sharedKeys, joinType) {
  const onClause = sharedKeys.slice(0, 3).map(key => `A.${key} = B.${key}`).join(' AND ');
  const selectKeys = sharedKeys.slice(0, 3).map(key => `A.${key}`).join(', ');

  let sqlJoin = 'LEFT JOIN';
  if (joinType.includes('1:1')) sqlJoin = 'INNER JOIN';
  if (joinType.includes('M:1')) sqlJoin = 'LEFT JOIN';

  return `SELECT ${selectKeys}, A.*, B.*\nFROM   [${serviceNoA}] A  -- ${datasetNameA}\n${sqlJoin} [${serviceNoB}] B  -- ${datasetNameB}\n  ON   ${onClause};`;
}

// 분석 파이프라인 실행
async function runAnalysis(cacheFile = CACHE_FILE, outputXlsx = OUTPUT_XLSX, options = {}) {
  logger.info('메타데이터 분석 파이프라인을 시작합니다. (analyze_pk_fk.js 엔진 사용)');

  if (!fs.existsSync(cacheFile)) {
    throw new Error(`캐시 파일을 찾을 수 없습니다: ${cacheFile}`);
  }

  const datasets = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  if (datasets.length === 0) throw new Error('분석 가능한 데이터셋이 없습니다.');

  const samplesDir = options.samplesDir || SAMPLES_DIR;

  logger.info('STEP 1: 샘플 데이터 로딩 중...');
  const recordsMap = loadSamples(datasets, samplesDir);

  // 데이터셋 객체에 sample_count 주입
  for (const ds of datasets) {
    const records = recordsMap.get(ds.svc_no);
    ds.sample_count = records ? records.length : 0;
  }

  logger.info('STEP 2: 엔트로피 맵 생성 중...');
  const entropyMap = buildEntropyMap(recordsMap);

  logger.info('STEP 3: PK/FK 후보 통계 분석 중...');
  const analysisResult = analyze(datasets, recordsMap, entropyMap);

  logger.info('STEP 4: 엑셀 리포터 데이터 구조 매핑 중...');

  // =============================================================================
  // 1. ka (keyAnalysis) 객체 구성
  // =============================================================================
  const fieldFreq = {};
  const fieldMeta = {};
  const datasetKeyMap = {};
  const keyDatasetMap = {};
  const commonKeysSet = new Set();

  // 데이터셋 카테고리 빠른 매핑
  const catMap = {};
  for (const ds of datasets) {
    catMap[ds.svc_no] = ds.cat || '';
    datasetKeyMap[ds.svc_no] = [];

    for (const f of ds.fields || []) {
      const fieldName = (f.field || '').trim().toUpperCase();
      if (!fieldName) continue;

      fieldFreq[fieldName] = (fieldFreq[fieldName] || 0) + 1;
      datasetKeyMap[ds.svc_no].push(fieldName);

      if (!keyDatasetMap[fieldName]) keyDatasetMap[fieldName] = [];
      keyDatasetMap[fieldName].push(ds.svc_no);

      if (!fieldMeta[fieldName] || (f.kor_nm && !fieldMeta[fieldName].kor_nm)) {
        fieldMeta[fieldName] = {
          kor_nm: f.kor_nm || '',
          type: f.type || '',
          length: f.length || '',
          desc: f.desc || '',
          sample: f.sample || ''
        };
      }
    }
  }

  // =============================================================================
  // 2. 시나리오 매핑
  // =============================================================================
  const excelScenarios = [];

  for (const sc of analysisResult.relationships) {

    // 이 시나리오에 사용된 타겟 필드를 공통키 풀에 등록
    commonKeysSet.add(sc.to_field);

    excelScenarios.push({
      ds_a: sc.from_table,
      nm_a: sc.from_table_name,
      cat_a: catMap[sc.from_table] || '',
      ds_b: sc.to_table,
      nm_b: sc.to_table_name,
      cat_b: catMap[sc.to_table] || '',
      shared_keys: [sc.from_field], // 실제 매핑 필드
      key_count: 1,
      score: sc.score,
      join_type: sc.relation_type,
      confidence: sc.confidence,
      use_case: sc.reason || `[${sc.from_table_name}]의 ${sc.from_kor_nm} 필드를 이용하여 [${sc.to_table_name}]과 연결`,
      sql_hint: getSqlHint(sc.from_table, sc.from_table_name, sc.to_table, sc.to_table_name, [sc.from_field], sc.relation_type)
    });
  }

  // PK로 식별된 필드들도 공통키 풀에 등록
  for (const t of analysisResult.tables) {
    for (const pk of t.pk_candidates) {
      if (pk.score > 40) {
        commonKeysSet.add(pk.fields[0]);
      }
    }
  }

  // 공통키 배열 생성 및 점유율/가중치 정렬
  const commonKeys = Array.from(commonKeysSet).sort((a, b) => {
    return (fieldFreq[b] || 0) - (fieldFreq[a] || 0);
  });

  const ka = {
    field_freq: fieldFreq,
    field_meta: fieldMeta,
    common_keys: commonKeys,
    ds_key_map: datasetKeyMap,
    key_ds_map: keyDatasetMap,
    threshold: 3,
    total_ds: datasets.length
  };

  logger.info(`총 ${datasets.length}개 데이터셋, ${commonKeys.length}개 공통키 식별, ${excelScenarios.length}개 시나리오 생성됨`);

  logger.info('STEP 5: 추가 분석 결과 로딩 (Arquero / SQLite Chain Joins)...');
  let extraData = {};

  try {
    const scenarioJsonPath = path.join(__dirname, '../db/scenario_analysis.json');
    if (fs.existsSync(scenarioJsonPath)) {
      extraData.arqueroScenarios = JSON.parse(fs.readFileSync(scenarioJsonPath, 'utf8'));
    }
  } catch (err) {
    logger.warn('db/scenario_analysis.json 로딩 실패');
  }

  try {
    const chainJoinsPath = path.join(__dirname, '../db/chain_joins.sql');
    if (fs.existsSync(chainJoinsPath)) {
      extraData.chainJoinsText = fs.readFileSync(chainJoinsPath, 'utf8');
    }
  } catch (err) {
    logger.warn('db/chain_joins.sql 로딩 실패');
  }

  try {
    const joinSqlPath = path.join(__dirname, '../db/join.sql');
    if (fs.existsSync(joinSqlPath)) {
      extraData.joinSqlText = fs.readFileSync(joinSqlPath, 'utf8');
    }
  } catch (err) {
    logger.warn('db/join.sql 로딩 실패');
  }

  logger.info('STEP 6: 엑셀 파일 생성 중...');
  await buildExcel(datasets, ka, excelScenarios, outputXlsx, extraData);

  logger.info(`통합 파이프라인 실행 완료! 결과 파일: ${outputXlsx}`);

  return { datasets, keyAnalysis: ka, scenarios: excelScenarios };
}

// 직접 실행 지원
if (require.main === module) {
  runAnalysis().catch(err => {
    logger.fatal({ err }, '파이프라인 실행 중 심각한 오류 발생');
    process.exit(1);
  });
}

module.exports = { runAnalysis };