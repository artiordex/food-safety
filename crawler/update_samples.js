const { request } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const API_KEY = '77183c01c07d44798948';
const START_IDX = 1;
const END_IDX = 1000;
const SAMPLES_DIR = path.join(__dirname, 'samples');

async function main() {
  // ── CLI 인수로 특정 serviceId만 지정 가능 ──
  // 예) node api_test.js I2780 C003 I2819   → 지정한 것만 실행
  //     node api_test.js                    → samples 전체 실행
  const cliIds = process.argv.slice(2).filter(a => !a.startsWith('-'));

  console.log('Playwright API Request 컨텍스트를 시작합니다...');

  const context = await request.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  let ids;

  if (cliIds.length > 0) {
    // ── 지정 모드: CLI 인수로 받은 serviceId만 처리 ──
    ids = cliIds;
    console.log(`\n[지정 모드] ${ids.length}개 serviceId만 업데이트합니다: ${ids.join(', ')}\n`);
  } else {
    // ── 전체 모드: samples 폴더에서 serviceId 전부 수집 ──
    const files = fs.readdirSync(SAMPLES_DIR);
    const serviceIds = new Set();
    for (const file of files) {
      if (file.endsWith('.xml') || file.endsWith('.json')) {
        serviceIds.add(path.parse(file).name);
      }
    }
    ids = Array.from(serviceIds).sort();
    console.log(`\n[전체 모드] 총 ${ids.length}개의 serviceId를 업데이트합니다.\n`);
  }

  for (let i = 0; i < ids.length; i++) {
    const serviceId = ids[i];
    
    // 1471000은 외부 API(공공데이터포털)이므로 FoodSafetyKorea 크롤러에서는 건너뜁니다.
    if (serviceId === '1471000') {
      console.log(`[${i + 1}/${ids.length}] 스킵: ${serviceId} (외부 API)`);
      continue;
    }
    
    console.log(`[${i + 1}/${ids.length}] 크롤링 진행 중: ${serviceId}`);

    for (const dataType of ['xml', 'json']) {
      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${serviceId}/${dataType}/${START_IDX}/${END_IDX}`;

      try {
        const response = await context.get(url, { timeout: 60000 });

        if (response.ok()) {
          const content = await response.text();
          const outPath = path.join(SAMPLES_DIR, `${serviceId}.${dataType}`);

          if (dataType === 'json') {
            try {
              const jsonObj = JSON.parse(content);
              fs.writeFileSync(outPath, JSON.stringify(jsonObj, null, 2), 'utf8');
              console.log(`  └─ [성공] json 업데이트 완료 (구조화됨, ${(content.length / 1024).toFixed(2)} KB)`);
            } catch (e) {
              fs.writeFileSync(outPath, content, 'utf8');
              console.log(`  └─ [성공] json 업데이트 완료 (파싱실패-원본저장, ${(content.length / 1024).toFixed(2)} KB)`);
            }
          } else {
            fs.writeFileSync(outPath, content, 'utf8');
            console.log(`  └─ [성공] xml 업데이트 완료 (${(content.length / 1024).toFixed(2)} KB)`);
          }
        } else {
          console.error(`  └─ [실패] ${dataType} HTTP 에러: ${response.status()} ${response.statusText()}`);
        }
      } catch (err) {
        console.error(`  └─ [실패] ${dataType} 크롤링 중 예외 발생: ${err.message}`);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  await context.dispose();
  console.log('\n모든 샘플 데이터 크롤링 및 업데이트가 완료되었습니다!');

  console.log('\n=============================================');
  console.log('excel_reporter.js(을)를 실행하여 엑셀 보고서를 최신화합니다...');
  console.log('=============================================\n');

  try {
    const reporterPath = path.join(__dirname, 'excel_reporter.js');
    execSync(`node "${reporterPath}"`, { stdio: 'inherit' });
    console.log('\n[완료] 엑셀 보고서 생성이 성공적으로 완료되었습니다.');
  } catch (err) {
    console.error('\n[실패] excel_reporter.js 실행 중 오류가 발생했습니다.', err.message);
  }
}

main().catch(err => {
  console.error('실행 중 심각한 에러 발생:', err);
});