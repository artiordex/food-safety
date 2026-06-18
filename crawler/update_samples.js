/**
 * 식품안전나라 Open API 샘플 데이터 최적화 업데이트 스크립트
 * 파일명: update_samples.js
 *
 * crawler/samples 디렉터리에 이미 존재하는 서비스 ID를 기준으로 식품안전나라 Open API의 최신 XML/JSON 샘플을 다시 내려받아 교체한다.
 * CLI 인수로 serviceId를 넘기면 해당 ID만 부분 갱신할 수 있음
 *
 * [주요 기능]
 * 1. samples 폴더 혹은 CLI 인수를 기준으로 serviceId 목록을 수집함
 * 2. 원자적 파일 쓰기(Atomic Write)를 통해 크롤링 중 기존 샘플 파손을 방지함
 * 3. 비동기 작업 풀(Pool)을 이용해 동시성(Concurrency)을 제어하며 고속 수집함
 * 4. 개별 태스크 실패가 전체 파이프라인 마비로 이어지지 않도록 철저히 격리함
 *
 * [실행 예시]
 * - node crawler/update_samples.js              전체 samples 기준 갱신
 * - node crawler/update_samples.js I2790 C003   지정한 serviceId만 갱신
 */

'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { request } = require('playwright');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// crawler_api.js, crawler_link.js가 생성한 샘플 파일을 갱신 대상으로 삼는다.
const SAMPLES_DIR = path.join(__dirname, 'samples');
const API_KEY = process.env.FOOD_API_KEY;

// 서비스별 전체 데이터 수와 무관하게 Open API 페이징 파라미터에 그대로 사용된다.
const START_IDX = 1;
const END_IDX = 1000;

// 일시적인 네트워크 오류, API 서버 지연, JSON 파싱 실패에 대비한 재시도 정책
// 실패를 바로 throw하지 않고 false로 반환해 다른 서비스 갱신이 계속 진행
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const CONCURRENCY_LIMIT = 3; // API 서버 차단 방지 및 자원 최적화를 위한 동시 요청 수 제한

// 밀리초 단위 대기 함수
// 재시도 간격과 태스크 간 짧은 완충 시간에 공통으로 사용한다.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 바이트 길이를 KB 단위 문자열로 변환하는 함수
// 로그에서 응답 크기를 사람이 읽기 쉽게 보여주기 위한 표시용 헬퍼다.
function toKbText(byteLength) {
  return `${(byteLength / 1024).toFixed(2)} KB`;
}

/**
 * 원자적 파일 쓰기 (Atomic Write)
 * 임시 파일(.tmp)에 먼저 데이터를 쓴 후 rename하여 파일 쓰기 도중 발생하는 파일 손상을 원천 차단합니다.
 *
 * 일반 writeFileSync는 프로세스 중단/디스크 오류가 쓰기 중간에 발생하면 기존 파일을 0바이트 또는 반쯤 기록된 상태로 남길 수 있음
 * 이 함수는 같은 디렉터리에 임시 파일을 완성한 뒤 rename으로 교체해 읽는 쪽에서는 "이전 정상 파일" 또는 "새 정상 파일" 둘 중 하나만 보게 만듦
 */
function safeWriteFileSync(targetPath, content) {
  const tmpPath = `${targetPath}.tmp`;
  fs.writeFileSync(tmpPath, content, 'utf8');
  fs.renameSync(tmpPath, targetPath);
}

/**
 * 단일 요청 처리 함수 (내부 재시도 및 예외 격리 포함)
 * serviceId/dataType 조합 하나를 처리하며, 실패 시 false를 반환하고 로그만 남긴다.
 */
async function fetchWithRetry(context, url, serviceId, dataType) {
  for (let retry = 1; retry <= MAX_RETRIES; retry++) {
    try {
      // API 요청 실행 (데이터 양이 많으므로 90초 타임아웃 지정)
      // Playwright request context를 쓰면 브라우저를 띄우지 않고도 안정적인 HTTP 호출이 가능하다.
      const response = await context.get(url, { timeout: 90000 });

      if (!response.ok()) {
        throw new Error(`HTTP 응답 오류: ${response.status()} ${response.statusText()}`);
      }

      const content = await response.text();
      const trimmed = content.trim();

      // API 응답이 XML/JSON이 아니라 로그인/차단/와이파이 인증 페이지인 경우 그대로 저장하면 샘플 파일이 오염되므로 저장 전에 차단
      if (trimmed.toLowerCase().startsWith('<html') || trimmed.toLowerCase().includes('captive portal')) {
        throw new Error('비정상 응답(HTML/Captive Portal 등) 감지됨');
      }

      const outPath = path.join(SAMPLES_DIR, `${serviceId}.${dataType}`);

      // 데이터 타입에 따른 원자적 저장
      if (dataType === 'json') {
        // JSON은 저장 전에 파싱해 유효성을 검증하고, 보기 좋은 들여쓰기 형식으로 다시 기록
        const jsonObj = JSON.parse(trimmed);
        safeWriteFileSync(outPath, JSON.stringify(jsonObj, null, 2));
      } else {
        // XML은 구조를 별도로 변환하지 않고 API 원문을 유지
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
      // HTTP 오류, 타임아웃, JSON 파싱 실패, 파일 쓰기 실패
      // 마지막 시도가 아니면 로그만 남기고 재시도
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
 * tasks: 실행할 비동기 함수 배열 (각 함수는 Promise를 반환)
 * concurrency: 동시에 실행할 최대 태스크 수
 * executing Set: 현재 실행 중인 Promise를 추적
 * 루프에서 하나씩 실행하고 executing Set에 등록한 뒤, 동시 실행 수가 concurrency에 도달하면 가장 먼저 끝나는 작업을 Promise.race로 기다려, 다음 태스크를 투입한다.
 */
async function processInParallel(tasks, concurrency) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    // task()에서 throw가 발생해도 p 자체가 reject 상태로 results에 들어간다.
    // 현재 task들은 내부에서 실패를 false로 반환하도록 설계되어 있어 보통 reject되지 않는다.
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);

    // 성공/실패와 관계없이 완료된 Promise는 실행 중 목록에서 제거한다.
    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= concurrency) {
      // 실행 중인 작업 중 하나가 끝날 때까지 기다린 뒤 다음 task를 투입한다.
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

// 메인 실행 함수
async function main() {
  // CLI 인수에서 옵션이 아닌 값만 serviceId로 추출
  // 현재 스크립트는 별도 옵션을 해석하지 않지만, 향후 --dry-run 같은 옵션이 추가되어도
  // serviceId 목록에 섞이지 않도록 '-'로 시작하는 인수는 제외한다.
  const cliIds = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

  // 디렉터리가 없으면 자동 생성
  // 전체 모드에서는 이 디렉터리의 기존 파일명으로 대상 ID를 찾음
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
    // 지정 모드: 사용자가 넘긴 ID만 갱신
    // 특정 서비스 샘플만 빠르게 확인하거나 실패한 항목만 재시도할 때 사용
    ids = cliIds;
    logger.info({
      mode: '지정 모드',
      count: ids.length,
      serviceIds: ids.join(', ')
    }, 'CLI 인수로 지정된 serviceId만 업데이트합니다.');
  } else {
    // 전체 모드: samples 폴더의 기존 .xml/.json 파일명을 기준으로 serviceId를 수집
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
      // 식품안전나라 Open API 표준 호출 형식:
      // /api/{인증키}/{서비스ID}/{데이터타입}/{시작인덱스}/{종료인덱스}
      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${serviceId}/${dataType}/${START_IDX}/${END_IDX}`;

      // 태스크 큐 풀에 삽입
      tasks.push(async () => {
        const success = await fetchWithRetry(context, url, serviceId, dataType);
        await sleep(300);
        return { serviceId, dataType, success };
      });
    }
  }

  // 병렬 작업 풀 제어기 가동
  // 결과 배열에는 각 serviceId/dataType별 성공 여부가 모두 들어간다.
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
