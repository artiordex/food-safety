const { chromium } = require('playwright');
const fs = require('fs');

async function dump() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const url = 'https://www.foodsafetykorea.go.kr/api/board/boardDetail.do?menu_grp=MENU_GRP35&menu_no=3899&bbs_no=bbs082&ntctxt_no=1064782';
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    const html = await page.content();
    fs.writeFileSync('scratch_detail.html', html);
    await browser.close();
}
dump();
