/**
 * 식품안전나라 Open API 샘플 데이터 업데이트 스크립트
 *
 * 기능:
 * - samples 폴더 기준으로 serviceId 목록을 수집함
 * - CLI 인수로 특정 serviceId만 지정하여 업데이트할 수 있음
 * - XML/JSON 샘플 데이터를 각각 최신 API 응답으로 갱신함
 * - 샘플 업데이트 완료 후 crawler_and_report.js의 pipeline 단계에서 엑셀 보고서가 생성됨
 */

// Playwright의 API request 기능을 불러옴
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { request } = require('playwright');

// 파일 읽기, 쓰기, 목록 조회를 위한 fs 모듈 불러오기
const fs = require('fs');

// 파일 및 디렉터리 경로 처리를 위한 path 모듈 불러오기
const path = require('path');


// console 대신 사용할 pino logger 불러오기
const logger = require('../utils/logger');

const SAMPLES_DIR = path.join(__dirname, 'samples');
const API_KEY = process.env.FOOD_API_KEY;
const START_IDX = 1;
const END_IDX = 1000;

// 밀리초 단위 대기 함수
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 바이트 길이를 KB 단위 문자열로 변환하는 함수
function toKbText(byteLength) {
  return `${(byteLength / 1024).toFixed(2)} KB`;
}

// 메인 실행 함수
async function main() {
  // CLI 인수에서 옵션이 아닌 값만 serviceId로 추출
  const cliIds = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

  // Playwright API Request 컨텍스트 시작 로그 출력
  logger.info('Playwright API Request 컨텍스트를 시작합니다.');

  // HTTP 요청 전용 컨텍스트 생성
  const context = await request.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  // 업데이트 대상 serviceId 목록
  let ids;

  // CLI 인수로 serviceId가 들어온 경우 지정 모드로 실행
  if (cliIds.length > 0) {
    ids = cliIds;

    logger.info({
      mode: '지정 모드',
      count: ids.length,
      serviceIds: ids.join(', ')
    }, 'CLI 인수로 지정된 serviceId만 업데이트합니다.');
  } else {
    // CLI 인수가 없으면 samples 폴더의 XML/JSON 파일명에서 serviceId 전체 수집
    const files = fs.readdirSync(SAMPLES_DIR);

    // 중복 serviceId 제거를 위한 Set 생성
    const serviceIds = new Set();

    // samples 폴더 내 xml/json 파일만 serviceId 후보로 사용
    for (const file of files) {
      if (file.endsWith('.xml') || file.endsWith('.json')) {
        serviceIds.add(path.parse(file).name);
      }
    }

    // serviceId 목록 정렬
    ids = Array.from(serviceIds).sort();

    logger.info({
      mode: '전체 모드',
      count: ids.length
    }, 'samples 폴더 기준으로 전체 serviceId를 업데이트합니다.');
  }

  // serviceId별 샘플 데이터 업데이트 반복
  for (let i = 0; i < ids.length; i++) {
    const serviceId = ids[i];

    // 1471000은 공공데이터포털 외부 API이므로 식품안전나라 API 갱신 대상에서 제외
    if (serviceId === '1471000') {
      logger.info({
        current: i + 1,
        total: ids.length,
        serviceId,
        reason: '외부 API'
      }, '해당 serviceId는 업데이트 대상에서 제외합니다.');

      continue;
    }

    // 현재 serviceId 처리 시작 로그 출력
    logger.info({
      current: i + 1,
      total: ids.length,
      serviceId
    }, '샘플 데이터 크롤링을 진행합니다.');

    // XML, JSON 형식 모두 업데이트
    for (const dataType of ['xml', 'json']) {
      // 식품안전나라 Open API 요청 URL 생성
      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${serviceId}/${dataType}/${START_IDX}/${END_IDX}`;

      let maxRetries = 3;
      for (let retry = 1; retry <= maxRetries; retry++) {
        try {
          // API 요청 실행 (데이터 양이 많으므로 90초 타임아웃 지정)
          const response = await context.get(url, { timeout: 90000 });

          // HTTP 응답이 정상인 경우
          if (response.ok()) {
            const content = await response.text();
            
            // Wi-Fi 캡티브 포털 등에서 HTML을 반환하는 경우 방지
            if (content.trim().toLowerCase().startsWith('<html') || content.toLowerCase().includes('captive portal')) {
              throw new Error('비정상 응답(HTML/Captive Portal 등) 감지됨');
            }

            // 저장 경로 설정
            const outPath = path.join(SAMPLES_DIR, `${serviceId}.${dataType}`);

            // JSON 응답은 파싱 후 정렬된 형태로 저장 시도
            if (dataType === 'json') {
              try {
                // JSON 파싱
                const jsonObj = JSON.parse(content);

                // 보기 좋은 JSON 형식으로 저장
                fs.writeFileSync(outPath, JSON.stringify(jsonObj, null, 2), 'utf8');

                // JSON 저장 성공 로그 출력
                logger.info({
                  serviceId,
                  dataType,
                  filePath: outPath,
                  size: toKbText(content.length),
                  formatted: true
                }, 'JSON 샘플 데이터 업데이트가 완료되었습니다.');
                
                // 성공 시 재시도 루프 탈출
                break;
              } catch (err) {
                // 파싱 실패 시 재시도하도록 에러 발생
                throw new Error(`JSON 파싱 실패: ${err.message}`);
              }
            } else {
              // XML 응답은 원본 그대로 저장
              fs.writeFileSync(outPath, content, 'utf8');

              // XML 저장 성공 로그 출력
              logger.info({
                serviceId,
                dataType,
                filePath: outPath,
                size: toKbText(content.length)
              }, 'XML 샘플 데이터 업데이트가 완료되었습니다.');
              
              // 성공 시 재시도 루프 탈출
              break;
            }
          } else {
            throw new Error(`HTTP 응답 오류: ${response.status()} ${response.statusText()}`);
          }
        } catch (err) {
          logger.warn({
            serviceId,
            dataType,
            retry,
            errorMessage: err.message
          }, 'API 요청 중 예외 발생, 재시도합니다.');
          
          if (retry === maxRetries) {
            logger.error({
              serviceId,
              dataType,
              errorMessage: err.message
            }, '최대 재시도 횟수를 초과하여 샘플 업데이트를 건너뜁니다.');
          } else {
            // 서버 부담 완화를 위해 2초 대기 후 재시도
            await sleep(2000);
          }
        }
      }
    }

    // API 서버 부담 완화를 위해 serviceId별 처리 후 잠시 대기
    await sleep(300);
  }

  // Playwright API Request 컨텍스트 종료
  await context.dispose();

  // 샘플 데이터 업데이트 완료 로그 출력
  logger.info('모든 샘플 데이터 크롤링 및 업데이트가 완료되었습니다.');

  // 엑셀 보고서는 crawler_and_report.js의 pipeline.js 단계에서 통합 생성됩니다.
}

// 메인 함수 실행 및 최상위 오류 처리
main().catch(err => {
  logger.fatal({
    err
  }, '스크립트 실행 중 심각한 오류가 발생했습니다.');

  process.exit(1);
});