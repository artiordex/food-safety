const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[Browser ${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`[Page Error] ${err.message}`);
  });

  await page.goto('http://localhost:8000');
  await page.waitForTimeout(1000);
  
  // Click on datamap tab
  const tabs = await page.$$('[data-tab="datamap"]');
  if(tabs.length > 0) {
    await tabs[0].click();
    await page.waitForTimeout(2000);
  } else {
    console.log("Could not find datamap tab");
  }
  
  await browser.close();
})();
