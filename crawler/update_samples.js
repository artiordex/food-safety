/**
 * 식품안전나라 Open API 샘플 데이터 최적화 업데이트 스크립트
 * 파일명: update_samples.js
 *
 * [주요 기능]
 * 1. samples 폴더 혹은 CLI 인수를 기준으로 serviceId 목록을 수집함
 * 2. 원자적 파일 쓰기(Atomic Write)를 통해 크롤링 중 기존 샘플 파손을 방지함
 * 3. 비동기 작업 풀(Pool)을 이용해 동시성(Concurrency)을 제어하며 고속 수집함
 * 4. 개별 태스크 실패가 전체 파이프라인 마비로 이어지지 않도록 철저히 격리함
 */

'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { request } = require('playwright');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const SAMPLES_DIR = path.join(__dirname, 'samples');
const API_KEY = process.env.FOOD_API_KEY;
const START_IDX = 1;
const END_IDX = 1000;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const CONCURRENCY_LIMIT = 3; // API 서버 차단 방지 및 자원 최적화를 위한 동시 요청 수 제한

// 밀리초 단위 대기 함수
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 바이트 길이를 KB 단위 문자열로 변환하는 함수
function toKbText(byteLength) {
  return `${(byteLength / 1024).toFixed(2)} KB`;
}

/**
 * 원자적 파일 쓰기 (Atomic Write)
 * 임시 파일(.tmp)에 먼저 데이터를 쓴 후 rename하여 파일 쓰기 도중 발생하는 파일 손상을 원천 차단합니다.
 */
function safeWriteFileSync(targetPath, content) {
  const tmpPath = `${targetPath}.tmp`;
  fs.writeFileSync(tmpPath, content, 'utf8');
  fs.renameSync(tmpPath, targetPath);
}

/**
 * 단일 요청 처리 함수 (내부 재시도 및 예외 격리 포함)
 */
async function fetchWithRetry(context, url, serviceId, dataType) {
  for (let retry = 1; retry <= MAX_RETRIES; retry++) {
    try {
      // API 요청 실행 (데이터 양이 많으므로 90초 타임아웃 지정)
      const response = await context.get(url, { timeout: 90000 });

      if (!response.ok()) {
        throw new Error(`HTTP 응답 오류: ${response.status()} ${response.statusText()}`);
      }

      const content = await response.text();
      const trimmed = content.trim();

      // Wi-Fi 캡티브 포털 등에서 비정상적인 HTML을 반환하는 경우 방지
      if (trimmed.toLowerCase().startsWith('<html') || trimmed.toLowerCase().includes('captive portal')) {
        throw new Error('비정상 응답(HTML/Captive Portal 등) 감지됨');
      }

      const outPath = path.join(SAMPLES_DIR, `${serviceId}.${dataType}`);

      // 데이터 타입에 따른 원자적 저장
      if (dataType === 'json') {
        const jsonObj = JSON.parse(trimmed);
        safeWriteFileSync(outPath, JSON.stringify(jsonObj, null, 2));
      } else {
        safeWriteFileSync(outPath, content);
      }

      logger.info({
        serviceId,
        dataType,
        size: toKbText(content.length),
        retry: retry > 1 ? `${retry}차` : '성공'
      }, `[${dataType.toUpperCase()}] 샘플 데이터 업데이트 완료`);

      return true; // 성공 시 true 반환
    } catch (err) {
      logger.warn({
        serviceId,
        dataType,
        retry,
        errorMessage: err.message
      }, 'API 요청 중 예외 발생, 재시도합니다.');

      if (retry === MAX_RETRIES) {
        logger.error({
          serviceId,
          dataType,
          errorMessage: err.message
        }, '최대 재시도 횟수를 초과하여 샘플 업데이트를 건너뜁니다.');
        return false; // 최종 실패 시 false 반환 (에러를 던지지 않고 격리)
      }

      // 서버 부담 완화를 위해 대기 후 재시도
      await sleep(RETRY_DELAY_MS);
    }
  }
  return false;
}

/**
 * 비동기 태스크 병렬 제어기 (Promise.race 기반 Concurrency 제한 풀)
 */
async function processInParallel(tasks, concurrency) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);

    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

// 메인 실행 함수
async function main() {
  // CLI 인수에서 옵션이 아닌 값만 serviceId로 추출
  const cliIds = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

  // 디렉터리가 없으면 자동 생성
  if (!fs.existsSync(SAMPLES_DIR)) {
    fs.mkdirSync(SAMPLES_DIR, { recursive: true });
  }

  logger.info('Playwright API Request 컨텍스트를 시작합니다.');

  // HTTP 요청 전용 컨텍스트 생성
  const context = await request.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  // 업데이트 대상 serviceId 목록 수집
  let ids;

  if (cliIds.length > 0) {
    ids = cliIds;
    logger.info({
      mode: '지정 모드',
      count: ids.length,
      serviceIds: ids.join(', ')
    }, 'CLI 인수로 지정된 serviceId만 업데이트합니다.');
  } else {
    const files = fs.readdirSync(SAMPLES_DIR);
    const serviceIds = new Set();

    for (const file of files) {
      if (file.endsWith('.xml') || file.endsWith('.json')) {
        serviceIds.add(path.parse(file).name);
      }
    }

    ids = Array.from(serviceIds).sort();
    logger.info({
      mode: '전체 모드',
      count: ids.length
    }, 'samples 폴더 기준으로 전체 serviceId를 업데이트합니다.');
  }

  // 지연 평가(Lazy Evaluation)를 위해 실행할 태스크들을 클로저 배열로 구축
  const tasks = [];

  for (const serviceId of ids) {
    // 1471000은 공공데이터포털 외부 API이므로 식품안전나라 API 갱신 대상에서 제외
    if (serviceId === '1471000') {
      logger.info({ serviceId, reason: '외부 API' }, '해당 serviceId는 업데이트 대상에서 제외합니다.');
      continue;
    }

    for (const dataType of ['xml', 'json']) {
      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${serviceId}/${dataType}/${START_IDX}/${END_IDX}`;

      // 태스크 큐 풀에 삽입
      tasks.push(async () => {
        const success = await fetchWithRetry(context, url, serviceId, dataType);
        // 단일 스레드별 최소 대기 시간을 주어 서버 가부하를 방지합니다.
        await sleep(300);
        return { serviceId, dataType, success };
      });
    }
  }

  // 병렬 작업 풀 제어기 가동
  logger.info({ totalTasks: tasks.length, concurrency: CONCURRENCY_LIMIT }, '파이프라인 크롤링 풀을 가동합니다.');
  const executionSummary = await processInParallel(tasks, CONCURRENCY_LIMIT);

  // Playwright 컨텍스트 안전하게 해제
  await context.dispose();

  // 최종 결과 통계 산출
  const failedTasks = executionSummary.filter(t => !t.success);
  logger.info({
    total: executionSummary.length,
    success: executionSummary.length - failedTasks.length,
    failed: failedTasks.length
  }, '모든 샘플 데이터 크롤링 및 업데이트 프로세스가 종료되었습니다.');
}

// 스크립트 직접 실행 시 진입점
if (require.main === module) {
  main().catch(err => {
    logger.fatal({ err }, '스크립트 실행 중 치명적인 오류가 발생했습니다.');
    process.exit(1);
  });
}

// pipeline 단계 연동을 위해 모듈 공개
module.exports = { run: main };