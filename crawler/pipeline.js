/**
 * 식품안전나라 API 메타데이터 분석 파이프라인
 *
 * 기능:
 * - crawl_cache.json의 데이터셋 메타데이터를 읽어 필드 출현 빈도를 분석함
 * - samples/*.json 실제 샘플 데이터를 Arquero로 분석하여 필드별 동적 가중치를 산정함
 * - 공통키 후보를 자동 식별하고, 데이터셋 간 결합 시나리오를 도출함
 * - 분석 결과를 excel_reporter.js를 통해 엑셀 보고서로 생성함
 */

// 파일 읽기, 쓰기, 존재 여부 확인을 위한 fs 모듈 불러오기
const fs = require('fs');

// 파일 및 디렉터리 경로 처리를 위한 path 모듈 불러오기
const path = require('path');

// Arquero 데이터프레임 라이브러리 불러오기
const aq = require('arquero');

// console 대신 사용할 pino logger 불러오기
const pino = require('pino');

// 현재 파일 기준 캐시 파일 경로
const CACHE_FILE = path.join(__dirname, 'crawl_cache.json');

// 현재 파일 기준 samples 디렉터리 경로
const SAMPLES_DIR = path.join(__dirname, 'samples');

// 최종 생성할 엑셀 보고서 파일명
const OUTPUT_XLSX = '식품안전나라_API_분석결과.xlsx';

// 로그에 출력할 동적 가중치 기반 공통키 TOP 개수
const TOP_KEY_LIMIT = 30;

// 공통키로 보기 위한 최소 기본 가중치
const DEFAULT_W = 4;

// 동적 분석 결과가 부족할 때 보조적으로 사용할 도메인 기반 기본 가중치
const BASE_KEY_WEIGHT = {
  LCNS_NO: 10,
  BSSH_NO: 10,
  BAR_CD: 10,
  BARCODE_NO: 10,
  PRDLST_REPORT_NO: 10,
  ITEM_REPORT_NO: 9,
  TESTITM_CD: 8,
  CMMN_SPEC_CD: 8,
  PRDLST_CD: 7,
  FOOD_CD: 7,
  HF_FNCLTY_MTRAL_RCOGN_NO: 8,
  DSPS_STDR_CD: 7,
  HACCP_NO: 8,
  HCCP_NO: 8,
  CRTFC_NO: 8
};

// 특정 키를 포함하는 시나리오에 자동 적용할 JOIN 유형 규칙
const JOIN_TYPE_RULE = {
  LCNS_NO: 'INNER JOIN',
  BSSH_NO: 'INNER JOIN',
  BAR_CD: 'INNER JOIN',
  BARCODE_NO: 'INNER JOIN',
  PRDLST_REPORT_NO: 'INNER JOIN',
  ITEM_REPORT_NO: 'INNER JOIN',
  HACCP_NO: 'INNER JOIN',
  HCCP_NO: 'INNER JOIN'
};

// 공통키별 활용 시나리오 템플릿
const USE_CASE_TMPL = {
  LCNS_NO: '허가번호({k})로 [{A}]의 인허가 현황과 [{B}] 연계 -> 허가-실적 통합 분석',
  BSSH_NO: '업소번호({k})로 [{A}] 업소현황과 [{B}] 처분·위생 이력 통합 -> 업소 리스크 분석',
  BAR_CD: '바코드({k})로 [{A}] 제품정보와 [{B}] 이력·성분 결합 -> 제품 추적 대시보드',
  BARCODE_NO: '바코드({k})로 [{A}] 제품정보와 [{B}] 이력·성분 결합 -> 제품 추적 대시보드',
  PRDLST_REPORT_NO: '품목제조보고번호({k})로 [{A}]와 [{B}] 연계 -> 제조-영양-회수 통합 추적',
  ITEM_REPORT_NO: '품목보고번호({k})로 [{A}]와 [{B}] 연계 -> 품목 단위 통합 분석',
  HACCP_NO: 'HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석',
  HCCP_NO: 'HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석',
  PRDLST_CD: '품목유형코드({k})로 [{A}]와 [{B}] 분류 기반 집계 -> 품목별 현황 비교',
  FOOD_CD: '식품코드({k})로 [{A}]와 [{B}] 연계 -> 식품 기준 통합 조회',
  TESTITM_CD: '검사항목코드({k})로 [{A}]와 [{B}] 연계 -> 검사항목 기준 분석',
  CMMN_SPEC_CD: '공통규격코드({k})로 [{A}]와 [{B}] 연계 -> 기준·규격 비교 분석'
};

// pino logger 설정
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

// 명칭, 주소, 전화번호, 일자, 설명 계열은 단독 조인키로 쓰기 위험하므로 제외하는 함수
function isWeakJoinKey(key) {
  return /_NM$/i.test(key) ||
    /_NAME$/i.test(key) ||
    /_CD_NM$/i.test(key) ||
    /ADDR$/i.test(key) ||
    /_ADDR$/i.test(key) ||
    /TEL/i.test(key) ||
    /FAX/i.test(key) ||
    /_DT$/i.test(key) ||
    /DTM$/i.test(key) ||
    /DATE$/i.test(key) ||
    /_CN$/i.test(key) ||
    /_DESC$/i.test(key) ||
    /_CONT$/i.test(key) ||
    /_CONTENT$/i.test(key) ||
    /_MEMO$/i.test(key);
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

// 필드명이 조인키로 적합한 형태인지 패턴 기반으로 점수화하는 함수
function getFieldPatternScore(field) {
  let score = 0;

  // 번호 계열은 식별자일 가능성이 높으므로 가점
  if (/_NO$/i.test(field)) score += 3;

  // 코드 계열은 분류·참조키 가능성이 있으므로 가점
  if (/_CD$/i.test(field)) score += 2.5;

  // ID, KEY 계열은 식별자 가능성이 있으므로 가점
  if (/ID$/i.test(field)) score += 2;
  if (/KEY$/i.test(field)) score += 2;

  // 식품안전나라 데이터에서 자주 쓰이는 주요 식별자 패턴 가점
  if (/BAR/i.test(field)) score += 2;
  if (/REPORT/i.test(field)) score += 2;
  if (/LCNS/i.test(field)) score += 2;
  if (/BSSH/i.test(field)) score += 2;
  if (/PRDLST/i.test(field)) score += 1.5;
  if (/ITEM/i.test(field)) score += 1.5;
  if (/HACCP/i.test(field) || /HCCP/i.test(field)) score += 1.5;

  // 약한 조인키 패턴이면 감점
  if (isWeakJoinKey(field)) score -= 4;

  return score;
}

// samples 폴더의 JSON 파일 전체를 Arquero 분석용 long-table 형태로 변환하는 함수
function buildSampleLongRows(samplesDir) {
  const rowsForAnalysis = [];

  // samples 디렉터리가 없으면 빈 배열 반환
  if (!fs.existsSync(samplesDir)) {
    logger.warn({ samplesDir }, 'samples 디렉터리가 없습니다.');
    return rowsForAnalysis;
  }

  // JSON 파일만 분석 대상으로 사용
  const files = fs
    .readdirSync(samplesDir)
    .filter(file => file.endsWith('.json'));

  // 각 JSON 파일을 순회하면서 필드 단위 long-table 행 생성
  for (const file of files) {
    const svcNo = path.parse(file).name;
    const filePath = path.join(samplesDir, file);

    let json;

    try {
      json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      logger.warn({
        file,
        errorMessage: err.message
      }, 'samples JSON 파싱에 실패하여 해당 파일을 건너뜁니다.');

      continue;
    }

    // 다양한 JSON 구조에서 실제 row 배열 추출
    const sampleRows = extractRowsFromSampleJson(json);

    // row가 없으면 건너뜀
    if (sampleRows.length === 0) {
      continue;
    }

    // row 단위로 필드와 값을 펼쳐 long-table 구조로 변환
    for (const row of sampleRows) {
      if (!row || typeof row !== 'object') {
        continue;
      }

      for (const [field, value] of Object.entries(row)) {
        const cleanField = String(field).trim();

        // 영문 대문자 필드명만 분석 대상으로 사용
        if (!/^[A-Z][A-Z0-9_]{1,}$/.test(cleanField)) {
          continue;
        }

        const normalizedValue = value === null || value === undefined
          ? ''
          : String(value).trim();

        rowsForAnalysis.push({
          svcNo,
          field: cleanField,
          value: normalizedValue,
          isNonEmpty: normalizedValue !== ''
        });
      }
    }
  }

  logger.info({
    fileCount: files.length,
    rowCount: rowsForAnalysis.length
  }, 'samples JSON을 Arquero 분석용 long-table 형태로 변환했습니다.');

  return rowsForAnalysis;
}

// Arquero를 사용하여 samples JSON의 필드별 실제 데이터 특성을 분석하는 함수
function analyzeSampleJsonFilesWithArquero(samplesDir) {
  const rowsForAnalysis = buildSampleLongRows(samplesDir);

  // 분석할 데이터가 없으면 빈 profile 반환
  if (rowsForAnalysis.length === 0) {
    logger.warn('samples 분석 대상 데이터가 없어 빈 프로파일을 반환합니다.');
    return {};
  }

  // Arquero 테이블 생성
  const table = aq.from(rowsForAnalysis);

  // field 기준으로 데이터셋 수, row 수, 비어 있지 않은 값 수, 고유값 수 집계
  const grouped = table
    .groupby('field')
    .rollup({
      datasetCount: aq.op.distinct('svcNo'),
      rowCount: aq.op.count(),
      nonEmptyCount: aq.op.sum('isNonEmpty'),
      distinctCount: aq.op.distinct('value')
    })
    .derive({
      nonEmptyRate: aq.escape(row => row.rowCount > 0 ? row.nonEmptyCount / row.rowCount : 0),
      distinctRate: aq.escape(row => row.nonEmptyCount > 0 ? row.distinctCount / row.nonEmptyCount : 0)
    })
    .objects();

  // 샘플 값 추출을 위한 필드별 대표값 맵
  const sampleValueMap = {};

  // 필드별 대표 샘플 값 최대 5개 수집
  for (const row of rowsForAnalysis) {
    if (!row.isNonEmpty) {
      continue;
    }

    if (!sampleValueMap[row.field]) {
      sampleValueMap[row.field] = [];
    }

    if (sampleValueMap[row.field].length < 5) {
      sampleValueMap[row.field].push(row.value);
    }
  }

  // 기존 코드에서 쓰기 쉬운 객체 형태로 변환
  const profile = {};

  for (const row of grouped) {
    profile[row.field] = {
      datasetCount: row.datasetCount,
      rowCount: row.rowCount,
      nonEmptyCount: row.nonEmptyCount,
      distinctCount: row.distinctCount,
      nonEmptyRate: row.nonEmptyRate,
      distinctRate: row.distinctRate,
      sampleValues: sampleValueMap[row.field] || []
    };
  }

  logger.info({
    fieldCount: Object.keys(profile).length
  }, 'Arquero 기반 samples 분석이 완료되었습니다.');

  return profile;
}

// samples 분석 결과와 필드 출현 빈도를 기반으로 필드별 동적 가중치를 계산하는 함수
function buildDynamicKeyWeights(fieldFreq, sampleProfile, totalDatasetCount) {
  const weights = {};

  for (const [field, freq] of Object.entries(fieldFreq)) {
    const sample = sampleProfile[field] || {};

    // 전체 데이터셋 중 해당 필드가 등장한 비율
    const datasetRate = totalDatasetCount > 0
      ? freq / totalDatasetCount
      : 0;

    // 샘플 데이터에서 비어 있지 않은 값의 비율
    const nonEmptyRate = sample.nonEmptyRate || 0;

    // 비어 있지 않은 값 중 고유값 비율
    const distinctRate = sample.distinctRate || 0;

    // 필드명 패턴 기반 점수
    const patternScore = getFieldPatternScore(field);

    // 도메인 기반 보조 가중치
    const baseWeight = BASE_KEY_WEIGHT[field] || DEFAULT_W;

    let score = 0;

    // 여러 데이터셋에 등장할수록 공통 연결 후보로 가점
    score += Math.min(datasetRate * 10, 4);

    // 실제 샘플에서 값이 비어 있지 않을수록 가점
    score += nonEmptyRate * 2.5;

    // 고유값 비율이 높을수록 식별자 성격이 강하므로 가점
    if (distinctRate >= 0.7) {
      score += 2.5;
    } else if (distinctRate >= 0.3) {
      score += 1.5;
    } else if (distinctRate >= 0.05) {
      score += 0.5;
    }

    // 필드명 패턴 점수 반영
    score += patternScore;

    // 도메인 기반 보조 가중치는 일부만 반영
    score += baseWeight * 0.35;

    // 약한 키는 최종 감점
    if (isWeakJoinKey(field)) {
      score -= 5;
    }

    // 최종 가중치는 1~10 사이로 보정
    weights[field] = Math.max(1, Math.min(10, parseFloat(score.toFixed(1))));
  }

  return weights;
}

// 전체 데이터셋을 순회하여 공통키를 식별하는 함수
function identifyCommonKeys(datasets, options = {}) {
  logger.info('STEP 3: 공통키 식별을 시작합니다.');

  // samples 디렉터리 경로 설정
  const samplesDir = options.samplesDir || SAMPLES_DIR;

  // 필드별 출현 횟수
  const fieldFreq = {};

  // 필드별 메타정보
  const fieldMeta = {};

  // 데이터셋별 보유 필드 목록
  const datasetKeyMap = {};

  // 필드별 사용 데이터셋 목록
  const keyDatasetMap = {};

  // 데이터셋별 필드 메타정보를 순회하며 필드 출현 빈도 집계
  for (const dataset of datasets) {
    const serviceNo = dataset.svc_no;

    // 데이터셋별 필드 목록 추출
    const fieldList = (dataset.fields || [])
      .map(fieldInfo => fieldInfo.field)
      .filter(Boolean);

    datasetKeyMap[serviceNo] = fieldList;

    for (const fieldInfo of (dataset.fields || [])) {
      const field = (fieldInfo.field || '').trim();

      // 영문 대문자로 시작하고 2자 이상인 필드만 집계
      if (!/^[A-Z][A-Z0-9_]{1,}$/.test(field)) {
        continue;
      }

      // 필드 출현 빈도 증가
      fieldFreq[field] = (fieldFreq[field] || 0) + 1;

      // 필드별 사용 데이터셋 목록 구성
      if (!keyDatasetMap[field]) {
        keyDatasetMap[field] = [];
      }

      keyDatasetMap[field].push(serviceNo);

      // 필드 메타정보 저장
      if (!fieldMeta[field]) {
        fieldMeta[field] = {
          kor_nm: fieldInfo.kor_nm || '',
          type: fieldInfo.type || '',
          length: fieldInfo.length || '',
          desc: fieldInfo.desc || '',
          sample: fieldInfo.sample || ''
        };
      } else {
        // 이후 데이터셋에서 더 풍부한 메타정보가 있으면 보완
        for (const metaKey of ['kor_nm', 'type', 'length', 'desc', 'sample']) {
          if (!fieldMeta[field][metaKey] && fieldInfo[metaKey]) {
            fieldMeta[field][metaKey] = fieldInfo[metaKey];
          }
        }
      }
    }
  }

  // 전체 데이터셋 수
  const totalDatasetCount = Math.max(datasets.length, 1);

  // Arquero 기반 samples JSON 전체 분석
  const sampleProfile = analyzeSampleJsonFilesWithArquero(samplesDir);

  // samples 분석 결과 기반 동적 가중치 계산
  const dynamicKeyWeight = buildDynamicKeyWeights(fieldFreq, sampleProfile, totalDatasetCount);

  // 공통키 출현 임계값
  const threshold = Math.max(3, Math.floor(totalDatasetCount * 0.03));

  // 임계값과 동적 가중치를 함께 적용하여 공통키 선정
  const commonKeys = Object.entries(fieldFreq)
    .filter(([field, count]) => {
      const weight = dynamicKeyWeight[field] || DEFAULT_W;

      // 너무 적게 등장한 필드는 제외
      if (count < threshold) {
        return false;
      }

      // 동적 가중치가 너무 낮은 필드는 제외
      if (weight < 4) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const weightDiff = (dynamicKeyWeight[b[0]] || 0) - (dynamicKeyWeight[a[0]] || 0);

      if (weightDiff !== 0) {
        return weightDiff;
      }

      return b[1] - a[1];
    })
    .map(([field]) => field);

  logger.info({
    uniqueFieldCount: Object.keys(fieldFreq).length,
    threshold,
    commonKeyCount: commonKeys.length
  }, '공통키 식별이 완료되었습니다.');

  return {
    field_freq: fieldFreq,
    field_meta: fieldMeta,
    common_keys: commonKeys,
    ds_key_map: datasetKeyMap,
    key_ds_map: keyDatasetMap,
    threshold,
    total_ds: totalDatasetCount,
    sample_profile: sampleProfile,
    dynamic_key_weight: dynamicKeyWeight
  };
}

// 공유 키 목록을 기반으로 결합 점수를 산출하는 함수
function scorePair(sharedKeys, dynamicKeyWeight = {}) {
  // 공유 키별 동적 가중치를 합산
  const raw = sharedKeys.reduce((acc, key) => {
    return acc + (dynamicKeyWeight[key] || BASE_KEY_WEIGHT[key] || DEFAULT_W);
  }, 0);

  // 공유 키가 많을수록 보너스 적용
  const bonus = sharedKeys.length >= 3
    ? 1.3
    : sharedKeys.length === 2
      ? 1.15
      : 1.0;

  // 최대 100점으로 제한
  return Math.min(parseFloat((raw * bonus).toFixed(1)), 100.0);
}

// 공유 키 목록을 기반으로 JOIN 유형을 결정하는 함수
function getJoinType(sharedKeys) {
  for (const key of sharedKeys) {
    if (JOIN_TYPE_RULE[key]) {
      return JOIN_TYPE_RULE[key];
    }
  }

  return 'LEFT JOIN';
}

// 공유 키에 맞는 활용 시나리오 문자열을 생성하는 함수
function getUseCase(datasetNameA, datasetNameB, sharedKeys) {
  for (const key of sharedKeys) {
    if (USE_CASE_TMPL[key]) {
      return USE_CASE_TMPL[key]
        .replace('{k}', key)
        .replace('[{A}]', `[${datasetNameA.substring(0, 16)}]`)
        .replace('[{B}]', `[${datasetNameB.substring(0, 16)}]`);
    }
  }

  return `공통키(${sharedKeys.slice(0, 2).join(', ')})로 [${datasetNameA.substring(0, 16)}]와 [${datasetNameB.substring(0, 16)}] 결합 분석`;
}

// 데이터셋 결합을 위한 SQL 힌트 문자열을 생성하는 함수
function getSqlHint(serviceNoA, datasetNameA, serviceNoB, datasetNameB, sharedKeys, joinType) {
  const onClause = sharedKeys
    .slice(0, 3)
    .map(key => `A.${key} = B.${key}`)
    .join(' AND ');

  const selectKeys = sharedKeys
    .slice(0, 3)
    .map(key => `A.${key}`)
    .join(', ');

  return `SELECT ${selectKeys}, A.*, B.* \nFROM   [${serviceNoA}] A  -- ${datasetNameA}\n${joinType} [${serviceNoB}] B  -- ${datasetNameB}\n  ON   ${onClause};`;
}

// 공통키를 보유한 데이터셋 쌍을 탐색하여 결합 시나리오를 도출하는 함수
function deriveScenarios(datasets, keyAnalysis, topN = 80) {
  logger.info('STEP 4: 결합 시나리오 도출을 시작합니다.');

  // 공통키 목록을 Set으로 변환하여 빠르게 조회
  const commonKeySet = new Set(keyAnalysis.common_keys);

  // 데이터셋별 필드 목록
  const datasetKeyMap = keyAnalysis.ds_key_map;

  // 동적 가중치 정보
  const dynamicKeyWeight = keyAnalysis.dynamic_key_weight || {};

  // 데이터셋 정보를 svc_no 기준으로 빠르게 접근하기 위한 맵
  const datasetInfoMap = datasets.reduce((acc, dataset) => {
    acc[dataset.svc_no] = dataset;
    return acc;
  }, {});

  // 필드가 하나라도 있는 데이터셋만 분석 대상으로 사용
  const serviceNos = datasets
    .map(dataset => dataset.svc_no)
    .filter(serviceNo => datasetKeyMap[serviceNo] && datasetKeyMap[serviceNo].length > 0);

  const results = [];

  // 모든 데이터셋 쌍을 비교하여 공유 공통키가 있는 경우 시나리오 생성
  for (let i = 0; i < serviceNos.length; i++) {
    for (let j = i + 1; j < serviceNos.length; j++) {
      const serviceNoA = serviceNos[i];
      const serviceNoB = serviceNos[j];

      const setA = new Set(datasetKeyMap[serviceNoA]);
      const setB = new Set(datasetKeyMap[serviceNoB]);

      // 두 데이터셋이 공유하면서 공통키 목록에도 포함된 필드 추출
      const sharedKeys = Array.from(setA).filter(key =>
        setB.has(key) && commonKeySet.has(key)
      );

      if (sharedKeys.length === 0) {
        continue;
      }

      // 명칭, 주소, 일자 등 약한 키만 공유하는 경우 제외
      const strongSharedKeys = sharedKeys.filter(key => !isWeakJoinKey(key));

      if (strongSharedKeys.length === 0) {
        continue;
      }

      // 동적 가중치 기반 결합 점수 산출
      const score = scorePair(strongSharedKeys, dynamicKeyWeight);

      // 최소 점수 미달 시나리오 제외
      if (score < 5) {
        continue;
      }

      const datasetNameA = datasetInfoMap[serviceNoA].svc_nm || serviceNoA;
      const datasetNameB = datasetInfoMap[serviceNoB].svc_nm || serviceNoB;
      const joinType = getJoinType(strongSharedKeys);

      results.push({
        ds_a: serviceNoA,
        nm_a: datasetNameA,
        cat_a: datasetInfoMap[serviceNoA].cat || '',
        ds_b: serviceNoB,
        nm_b: datasetNameB,
        cat_b: datasetInfoMap[serviceNoB].cat || '',
        shared_keys: strongSharedKeys,
        key_count: strongSharedKeys.length,
        score,
        join_type: joinType,
        use_case: getUseCase(datasetNameA, datasetNameB, strongSharedKeys),
        sql_hint: getSqlHint(serviceNoA, datasetNameA, serviceNoB, datasetNameB, strongSharedKeys, joinType)
      });
    }
  }

  // 점수 내림차순 정렬 후 상위 topN건 반환
  results.sort((a, b) => b.score - a.score);

  const output = results.slice(0, topN);

  logger.info({
    totalScenarioCount: results.length,
    outputScenarioCount: output.length
  }, '결합 시나리오 도출이 완료되었습니다.');

  return output;
}

// 캐시 파일을 읽어 공통키 식별, 시나리오 도출, 엑셀 생성까지 실행하는 함수
async function runAnalysis(cacheFile = CACHE_FILE, outputXlsx = OUTPUT_XLSX, options = {}) {
  const { buildExcel } = require('./excel_reporter');

  logger.info('메타데이터 분석 파이프라인을 시작합니다.');

  let datasets = [];

  // crawl_cache.json 읽기
  if (fs.existsSync(cacheFile)) {
    try {
      datasets = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    } catch (err) {
      logger.error({
        cacheFile,
        errorMessage: err.message
      }, '캐시 파일 읽기에 실패했습니다.');

      throw err;
    }
  } else {
    throw new Error(`캐시 파일을 찾을 수 없습니다: ${cacheFile}`);
  }

  // 분석 가능한 데이터셋이 없으면 중단
  if (datasets.length === 0) {
    throw new Error('분석 가능한 데이터셋이 없습니다.');
  }

  // samples 디렉터리 경로 설정
  const samplesDir = options.samplesDir || SAMPLES_DIR;

  // 공통키 식별 및 동적 가중치 계산
  const keyAnalysis = identifyCommonKeys(datasets, {
    samplesDir
  });

  // 결합 시나리오 도출
  const scenarios = deriveScenarios(datasets, keyAnalysis, 80);

  // 엑셀 보고서 생성
  await buildExcel(datasets, keyAnalysis, scenarios, outputXlsx);

  // 동적 가중치 기반 공통키 TOP 목록 산출
  const topKeys = Object.entries(keyAnalysis.field_freq)
    .sort((a, b) => {
      const weightDiff = (keyAnalysis.dynamic_key_weight[b[0]] || 0) - (keyAnalysis.dynamic_key_weight[a[0]] || 0);

      if (weightDiff !== 0) {
        return weightDiff;
      }

      return b[1] - a[1];
    })
    .slice(0, TOP_KEY_LIMIT);

  const safeTotal = keyAnalysis.total_ds > 0
    ? keyAnalysis.total_ds
    : 1;

  logger.info({
    datasetCount: datasets.length,
    uniqueFieldCount: Object.keys(keyAnalysis.field_freq).length,
    commonKeyCount: keyAnalysis.common_keys.length,
    scenarioCount: scenarios.length,
    outputXlsx
  }, '통합 파이프라인 실행이 완료되었습니다.');

  // 공통키 TOP 목록 로그 출력
  logger.info(`동적 가중치 기반 공통키 TOP ${TOP_KEY_LIMIT}을 출력합니다.`);

  topKeys.forEach(([field, count]) => {
    const meta = keyAnalysis.field_meta[field] || {};
    const sample = keyAnalysis.sample_profile[field] || {};
    const weight = keyAnalysis.dynamic_key_weight[field] || DEFAULT_W;
    const percent = count / safeTotal * 100;
    const bar = '#'.repeat(Math.min(Math.floor(weight), 10));

    logger.info({
      field,
      korName: meta.kor_nm || '',
      weight,
      frequency: count,
      frequencyRate: `${percent.toFixed(1)}%`,
      nonEmptyRate: `${((sample.nonEmptyRate || 0) * 100).toFixed(1)}%`,
      distinctRate: `${((sample.distinctRate || 0) * 100).toFixed(1)}%`,
      bar
    }, `공통키 TOP ${TOP_KEY_LIMIT} 항목`);
  });

  // 결합 시나리오 TOP 5 로그 출력
  logger.info('결합 시나리오 TOP 5를 출력합니다.');

  scenarios.slice(0, 5).forEach(scenario => {
    logger.info({
      score: scenario.score,
      joinType: scenario.join_type,
      datasetA: scenario.nm_a,
      datasetB: scenario.nm_b,
      sharedKeys: scenario.shared_keys.slice(0, 4).join(', '),
      useCase: scenario.use_case.substring(0, 60)
    }, '결합 시나리오 TOP 5 항목');
  });

  return {
    datasets,
    keyAnalysis,
    scenarios
  };
}

// 현재 파일을 직접 실행한 경우 파이프라인 실행
if (require.main === module) {
  runAnalysis()
    .catch(err => {
      logger.fatal({
        err
      }, '메타데이터 분석 파이프라인 실행 중 심각한 오류가 발생했습니다.');

      process.exit(1);
    });
}

// 외부 파일에서 사용할 수 있도록 함수 내보내기
module.exports = {
  identifyCommonKeys,
  deriveScenarios,
  runAnalysis,
  analyzeSampleJsonFilesWithArquero,
  buildDynamicKeyWeights,
  scorePair
};