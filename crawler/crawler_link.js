/**
 * 식품영양성분 DB정보 API 수집 스크립트
 *
 * 주요 기능:
 * 1. 공공데이터포털 식품영양성분 API 호출
 * 2. 수집한 데이터의 메타데이터를 crawl_cache.json에 저장
 * 3. 샘플 데이터를 crawler/samples/1471000.json에 저장
 */
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const CACHE_PATH = path.join(__dirname, 'crawl_cache.json');
const SAMPLE_DIR = path.join(__dirname, 'samples');
const API_URL = 'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=edacbf8d03ba77b54a1e5c7d9f1149b47582fc23fc9b1e038776fc5b896e143d&pageNo=1&numOfRows=500&type=json';

async function main() {
  logger.info('식품영양성분 API 데이터 수집을 시작합니다.');

  // 1. API 호출
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API 응답 오류: HTTP ${res.status}`);
  const data = await res.json();

  const items = data?.body?.items;
  if (!items || items.length === 0) {
    logger.warn('API 응답에서 수집할 데이터가 없습니다.');
    return;
  }
  logger.info({ count: items.length }, 'API 데이터 수집 완료');

  // 2. crawl_cache.json 갱신
  let cache = [];
  if (fs.existsSync(CACHE_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
    } catch (err) {
      logger.warn({ err }, '캐시 파일 파싱 실패 — 빈 캐시로 처리합니다.');
    }
  }

  const fields = Object.keys(items[0]).map(col => ({
    field: col, kor_nm: col,
    type: typeof items[0][col] === 'number' ? 'NUMBER' : 'STRING',
    length: '', desc: col, sample: String(items[0][col] || '')
  }));

  const metaData = {
    svc_no: '1471000', svc_nm: '식품영양성분 DB정보',
    cat: '식품영양정보', cat_code: 'API_SRT03',
    provd_instt_nm: '식품의약품안전처', data_type_nm: 'LINK',
    detail_url: 'https://www.data.go.kr/data/15100070/openapi.do',
    type_cd: 'API_TYPE06', fields,
    desc: '일반 식품(농축수산물, 음식)부터 시판 식품(가공식품, 프랜차이즈 조리식품)에 대한 영양성분 정보를 제공합니다.',
    error: '', sample_url: API_URL, sample_data_length: JSON.stringify(items).length
  };

  const idx = cache.findIndex(d => d.svc_no === '1471000');
  if (idx >= 0) { cache[idx] = metaData; logger.info('기존 메타데이터 갱신'); }
  else { cache.push(metaData); logger.info('신규 메타데이터 추가'); }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
  logger.info('crawl_cache.json 저장 완료');

  // 3. 샘플 데이터 저장
  if (!fs.existsSync(SAMPLE_DIR)) fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(SAMPLE_DIR, '1471000.json'),
    JSON.stringify(items.slice(0, 5), null, 2), 'utf-8'
  );
  logger.info('샘플 데이터 저장 완료 (1471000.json)');

}

main().catch(err => {
  logger.fatal({ err }, 'crawler_link.js 실행 중 심각한 오류가 발생했습니다.');
  process.exit(1);
});
