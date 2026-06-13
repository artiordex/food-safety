/**
 * 식품안전나라 전체 파이프라인 실행 스크립트
 *
 * 실행 순서:
 * 1. crawler_api.js             — 식품안전나라 사이트 크롤링 및 crawl_cache.json 생성
 * 2. crawler_link.js            — 공공데이터포털 식품영양성분 API 수집 및 캐시 병합
 * 3. update_samples.js          — 전체 샘플 데이터 최대 1000건 최신화
 * 4. import_to_sqlite.js        — 크롤링 결과를 SQLite DB로 변환 (최신화된 샘플 기반)
 * 5. analyze_pk_fk.js           — PK/FK 후보 분석
 * 6. analyze_scenario.js        — 데이터 결합 시나리오 탐색
 * 7. verify_joins.js            — 실데이터 조인 검증
 * 8. pipeline.js                — 공통키 식별, 결합 시나리오 도출, 엑셀 보고서 생성
 * 9. scrape_board_playwright.js — 게시판 데이터 수집
 *
 * 사용법:
 *   node crawler/crawler_and_report.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const DIR = __dirname;
const DB_DIR = path.join(__dirname, '../db');
const CACHE_FILE = path.join(DIR, 'crawl_cache.json');
const OUTPUT_XLSX = '식품안전나라_API_분석결과.xlsx';

function run(label, scriptPath, args = '') {
  logger.info(`[${label}] 시작 — ${scriptPath} ${args}`);
  execSync(`node "${scriptPath}" ${args}`, { stdio: 'inherit' });
  logger.info(`[${label}] 완료`);
}

async function main() {
  // STEP 1: 식품안전나라 크롤링
  // try {
  //   run('1/9 crawler_api', path.join(DIR, 'crawler_api.js'));
  // } catch (err) {
  //   logger.error({ err }, 'crawler_api.js 실패 — 파이프라인을 중단합니다.');
  //   process.exit(1);
  // }

  // // STEP 2: 공공데이터포털 식품영양성분 API 수집 (crawler_link.js)
  // try {
  //   run('2/9 crawler_link', path.join(DIR, 'crawler_link.js'));
  // } catch (err) {
  //   logger.warn({ err }, 'crawler_link.js 실패 — 다음 단계를 계속 진행합니다.');
  // }

  // // STEP 3: 샘플 데이터 최신화 (충분한 데이터 확보 후 DB를 생성해야 하므로 DB 변환 전 실행)
  // try {
  //   run('3/9 update_samples', path.join(DIR, 'update_samples.js'));
  // } catch (err) {
  //   logger.warn({ err }, 'update_samples.js 실패 — 다음 단계를 계속 진행합니다.');
  // }

  // // STEP 4: SQLite 변환 (import_to_sqlite.js)
  // try {
  //   run('4/9 import_to_sqlite', path.join(DB_DIR, 'import_to_sqlite.js'), '--apply-constraints');
  // } catch (err) {
  //   logger.warn({ err }, 'import_to_sqlite.js 실패 — 다음 단계를 계속 진행합니다.');
  // }

  // STEP 5: PK/FK 분석 (analyze_pk_fk.js)
  try {
    run('5/9 analyze_pk_fk', path.join(DB_DIR, 'analyze_pk_fk.js'));
  } catch (err) {
    logger.warn({ err }, 'analyze_pk_fk.js 실패 — 다음 단계를 계속 진행합니다.');
  }

  // STEP 6: 시나리오 탐색 (analyze_scenario.js)
  try {
    run('6/9 analyze_scenario', path.join(DB_DIR, 'analyze_scenario.js'));
  } catch (err) {
    logger.warn({ err }, 'analyze_scenario.js 실패 — 다음 단계를 계속 진행합니다.');
  }

  // STEP 7: 실데이터 조인 검증 (verify_joins.js)
  try {
    run('7/9 verify_joins', path.join(DB_DIR, 'verify_joins.js'));
  } catch (err) {
    logger.warn({ err }, 'verify_joins.js 실패 — 다음 단계를 계속 진행합니다.');
  }

  // STEP 8: 통합 파이프라인 및 엑셀 보고서 생성 (pipeline.js)
  try {
    run('8/9 pipeline_excel', path.join(DIR, 'pipeline.js'));
  } catch (err) {
    logger.error({ err }, 'pipeline.js 실패 — 파이프라인을 중단합니다.');
    process.exit(1);
  }

  // STEP 9: 게시판 데이터 수집
  try {
    run('9/9 scrape_board', path.join(DIR, 'scrape_board_playwright.js'));
  } catch (err) {
    logger.warn({ err }, 'scrape_board_playwright.js 실패 — 파이프라인은 완료되었습니다.');
  }

  logger.info(`전체 통합 파이프라인이 완료되었습니다! 엑셀 보고서: ${OUTPUT_XLSX}`);
}

main();
