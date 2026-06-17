/**
 * 식품영양성분 DB정보 API 수집 스크립트
 *
 * [주요 기능]
 * 1. 공공데이터포털 식품영양성분 API 호출
 * 2. 수집한 데이터의 메타데이터를 crawl_cache.json에 저장
 * 3. 샘플 데이터를 crawler/samples/1471000.json에 저장
 */

const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

// 메타데이터 캐시 파일 경로
// 기존 수집 정보가 있으면 갱신하고, 없으면 신규로 추가함
const CACHE_PATH = path.join(__dirname, 'crawl_cache.json');

// API 샘플 데이터를 저장할 디렉토리
const SAMPLE_DIR = path.join(__dirname, 'samples');

// 식품영양성분 DB정보 API 호출 URL
// pageNo=1, numOfRows=500 기준으로 샘플 데이터를 수집함
const API_URL =
  'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=edacbf8d03ba77b54a1e5c7d9f1149b47582fc23fc9b1e038776fc5b896e143d&pageNo=1&numOfRows=500&type=json';

async function main() {
  logger.info('식품영양성분 API 데이터 수집을 시작합니다.');

  // =============================================================================
  // 1. API 호출 및 응답 데이터 확인
  // =============================================================================

  const res = await fetch(API_URL);

  // HTTP 응답 상태가 정상 범위가 아니면 즉시 오류 처리
  if (!res.ok) throw new Error(`API 응답 오류: HTTP ${res.status}`);

  const data = await res.json();

  // 공공데이터포털 API 응답 구조 기준으로 실제 데이터 목록 추출
  const items = data?.body?.items;

  // 수집 대상 데이터가 없는 경우 이후 저장 로직을 수행하지 않음
  if (!items || items.length === 0) {
    logger.warn('API 응답에서 수집할 데이터가 없습니다.');
    return;
  }

  logger.info({ count: items.length }, 'API 데이터 수집 완료');

  // =============================================================================
  // 2. 기존 crawl_cache.json 로드
  // =============================================================================

  let cache = [];

  // 기존 캐시 파일이 있으면 읽어서 기존 메타데이터와 병합/갱신함
  if (fs.existsSync(CACHE_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
    } catch (err) {
      // 캐시 파일이 손상되었거나 JSON 형식이 잘못된 경우 빈 배열로 재시작
      logger.warn({ err }, '캐시 파일 파싱 실패 — 빈 캐시로 처리합니다.');
    }
  }

  // =============================================================================
  // 3. API 응답 첫 번째 row 기준으로 필드 메타데이터 생성
  // =============================================================================

  const fields = Object.keys(items[0]).map(col => ({
    field: col,

    // 현재는 한글 컬럼명이 별도로 없으므로 원본 컬럼명을 임시 한글명으로 사용
    kor_nm: col,

    // 값의 JavaScript 타입을 기준으로 단순 NUMBER / STRING 구분
    type: typeof items[0][col] === 'number' ? 'NUMBER' : 'STRING',

    // 길이 정보는 API 응답만으로 정확히 알기 어려워 공란 처리
    length: '',

    // 컬럼 설명도 우선 컬럼명과 동일하게 저장
    desc: col,

    // 대표 샘플값 저장
    sample: String(items[0][col] || '')
  }));

  // =============================================================================
  // 4. 데이터셋 메타데이터 구성
  // =============================================================================

  const metaData = {
    svc_no: '1471000',
    svc_nm: '식품영양성분 DB정보',
    cat: '식품영양정보',
    cat_code: 'API_SRT03',
    provd_instt_nm: '식품의약품안전처',
    data_type_nm: 'LINK',
    detail_url: 'https://www.data.go.kr/data/15100070/openapi.do',
    type_cd: 'API_TYPE06',
    fields,
    desc: '일반 식품(농축수산물, 음식)부터 시판 식품(가공식품, 프랜차이즈 조리식품)에 대한 영양성분 정보를 제공합니다.',
    error: '',

    // 실제 수집에 사용한 API URL을 기록하여 추후 재현 가능하게 함
    sample_url: API_URL,

    // 샘플 데이터 전체 JSON 문자열 길이
    // 대략적인 응답 데이터 크기 확인용
    sample_data_length: JSON.stringify(items).length
  };

  // =============================================================================
  // 5. 기존 메타데이터 갱신 또는 신규 추가
  // =============================================================================

  const idx = cache.findIndex(d => d.svc_no === '1471000');

  if (idx >= 0) {
    cache[idx] = metaData;
    logger.info('기존 메타데이터 갱신');
  } else {
    cache.push(metaData);
    logger.info('신규 메타데이터 추가');
  }

  // 갱신된 메타데이터 캐시 저장
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
  logger.info('crawl_cache.json 저장 완료');

  // =============================================================================
  // 6. 샘플 데이터 저장
  // =============================================================================

  // samples 디렉토리가 없으면 생성
  if (!fs.existsSync(SAMPLE_DIR)) {
    fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  }

  // 전체 응답 중 앞 5건만 샘플 파일로 저장
  // 데이터 구조 확인 및 테스트 용도로 사용
  fs.writeFileSync(
    path.join(SAMPLE_DIR, '1471000.json'),
    JSON.stringify(items.slice(0, 5), null, 2),
    'utf-8'
  );

  logger.info('샘플 데이터 저장 완료 (1471000.json)');
}

main().catch(err => {
  logger.fatal({ err }, 'crawler_link.js 실행 중 심각한 오류가 발생했습니다.');
  process.exit(1);
});