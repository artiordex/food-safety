/**
 * 식품안전나라 전체 파이프라인 실행 스크립트
 *
 * 실행 순서:
 * 1. crawler_api.js          — 식품안전나라 사이트 크롤링 및 crawl_cache.json 생성
 * 2. crawler_link.js         — 공공데이터포털 식품영양성분 API 수집 및 캐시 병합
 * 3. update_samples.js       — 샘플 데이터 최신화
 * 4. pipeline.js             — 공통키 식별 및 결합 시나리오 도출
 * 5. excel_reporter.js       — 엑셀 분석 보고서 생성
 * 6. scrape_board_playwright.js — 게시판 데이터 수집
 *
 * 사용법:
 *   node crawler/crawler_and_report.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const pino = require('pino');

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

const DIR = __dirname;
const CACHE_FILE = path.join(DIR, 'crawl_cache.json');
const OUTPUT_XLSX = '식품안전나라_API_분석결과.xlsx';

function run(label, file) {
  logger.info(`[${label}] 시작 — ${file}`);
  execSync(`node "${path.join(DIR, file)}"`, { stdio: 'inherit' });
  logger.info(`[${label}] 완료`);
}

async function main() {
  // 단독 실행하기
  // STEP 1: 식품안전나라 크롤링
  // try {
  //   run('1/6 crawler_api', 'crawler_api.js');
  // } catch (err) {
  //   logger.error({ err }, 'crawler_api.js 실패 — 파이프라인을 중단합니다.');
  //   process.exit(1);
  // }

  // STEP 2: 식품영양성분 API 수집
  try {
    run('2/6 crawler_link', 'crawler_link.js');
  } catch (err) {
    logger.warn({ err }, 'crawler_link.js 실패 — 다음 단계를 계속 진행합니다.');
  }

  // STEP 3: 샘플 데이터 최신화
  try {
    run('3/6 update_samples', 'update_samples.js');
  } catch (err) {
    logger.warn({ err }, 'update_samples.js 실패 — 다음 단계를 계속 진행합니다.');
  }

  // STEP 4: 공통키 식별 및 결합 시나리오 도출 (pipeline.js)
  logger.info('[4/6 pipeline] 시작 — pipeline.js');
  let datasets, ka, scenarios;
  try {
    const { identifyCommonKeys, deriveScenarios } = require('./pipeline');
    datasets = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    if (!datasets.length) throw new Error('crawl_cache.json이 비어 있습니다.');
    ka = identifyCommonKeys(datasets);
    scenarios = deriveScenarios(datasets, ka, 80);
    logger.info('[4/6 pipeline] 완료');
  } catch (err) {
    logger.error({ err }, 'pipeline.js 실패 — 파이프라인을 중단합니다.');
    process.exit(1);
  }

  // STEP 5: 엑셀 보고서 생성 (excel_reporter.js)
  logger.info('[5/6 excel_reporter] 시작 — excel_reporter.js');
  try {
    const { buildExcel } = require('./excel_reporter');
    await buildExcel(datasets, ka, scenarios, OUTPUT_XLSX);
    logger.info(`[5/6 excel_reporter] 완료 — ${OUTPUT_XLSX}`);
  } catch (err) {
    logger.error({ err }, 'excel_reporter.js 실패 — 파이프라인을 중단합니다.');
    process.exit(1);
  }

  // STEP 6: 게시판 데이터 수집
  try {
    run('6/6 scrape_board', 'scrape_board_playwright.js');
  } catch (err) {
    logger.warn({ err }, 'scrape_board_playwright.js 실패 — 파이프라인은 완료되었습니다.');
  }

  logger.info(`전체 파이프라인이 완료되었습니다. 결과 파일: ${OUTPUT_XLSX}`);
}

main();
