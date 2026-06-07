/**
 * Playwright 기반 화면 점검 스크립트
 *
 * 목적:
 * - 로컬 서버(http://localhost:8000)에 접속함
 * - 브라우저 콘솔 오류 및 페이지 오류를 확인함
 * - 데이터맵(datamap) 탭 클릭 시 정상 동작 여부를 점검함
 */

// Playwright의 chromium 브라우저 객체를 불러옴
const { chromium } = require('playwright');

(async () => {
  // Chromium 브라우저 실행
  const browser = await chromium.launch();

  // 새 브라우저 페이지 생성
  const page = await browser.newPage();

  // 브라우저 콘솔 로그 중 error 또는 warning만 Node.js 콘솔에 출력
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[Browser ${msg.type()}] ${msg.text()}`);
    }
  });

  // 페이지 실행 중 발생하는 JavaScript 오류를 감지하여 출력
  page.on('pageerror', err => {
    console.log(`[Page Error] ${err.message}`);
  });

  // 로컬 서버로 접속
  await page.goto('http://localhost:8000');

  // 페이지 로딩 및 초기 스크립트 실행 대기
  await page.waitForTimeout(1000);

  // 데이터맵 탭 요소 조회
  const tabs = await page.$$('[data-tab="datamap"]');

  // 데이터맵 탭이 있으면 클릭 후 오류 발생 여부 확인
  if (tabs.length > 0) {
    await tabs[0].click();
    await page.waitForTimeout(2000);
  } else {
    console.log('Could not find datamap tab');
  }

  // 테스트 종료 후 브라우저 닫기
  await browser.close();
})();