const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`BROWSER CONSOLE: [${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
    console.log(`BROWSER ERROR: ${error.message}`);
  });
  
  page.on('requestfailed', request => {
    console.log(`BROWSER REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
  });

  console.log("Navigating to http://localhost:8000/index.html ...");
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  
  const content = await page.evaluate(() => {
    return {
      bodyLength: document.body.innerHTML.length,
      tabContentLength: document.getElementById('tab-content') ? document.getElementById('tab-content').innerHTML.length : 0,
      activeTab: document.querySelector('.tab-pill.bg-gov-600') ? document.querySelector('.tab-pill.bg-gov-600').innerText : 'none'
    };
  });
  
  console.log("Page evaluation result:", content);
  await browser.close();
})();
