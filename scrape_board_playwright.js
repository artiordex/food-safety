const { chromium } = require('playwright');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');
const fs = require('fs');

async function scrapeBoard() {
    console.log('Starting Playwright browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();
    
    const listUrl = 'https://www.foodsafetykorea.go.kr/api/board/board.do?menu_grp=MENU_GRP35&menu_no=3899';
    console.log(`Navigating to list: ${listUrl}`);
    
    await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000); 

    const detailParams = new Map(); // Use Map to store unique items by ID or signature
    
    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
        console.log(`Extracting items from Page ${currentPage}...`);
        
        const content = await page.content();
        const linksRegex = /viewDetail2?\(['"]?(\d+)['"]?/g;
        const hrefRegex = /ntctxt_no=(\d+)/g;
        
        let match;
        while ((match = linksRegex.exec(content)) !== null) {
            const id = match[1];
            detailParams.set(id, { isId: true, value: id });
        }
        while ((match = hrefRegex.exec(content)) !== null) {
            const id = match[1];
            detailParams.set(id, { isId: true, value: id });
        }

        const items = await page.$$eval('.board-list ul, ul:has(.title), .gallery-list ul, a > ul, a', elements => {
            return elements.map(el => {
                let clickable = el;
                if (el.tagName.toLowerCase() === 'ul' && el.parentElement && el.parentElement.tagName.toLowerCase() === 'a') {
                    clickable = el.parentElement;
                }
                return {
                    href: clickable.getAttribute('href') || '',
                    onclick: clickable.getAttribute('onclick') || ''
                };
            }).filter(item => item.href.includes('viewDetail') || item.onclick.includes('viewDetail') || item.href.includes('ntctxt_no'));
        });

        for (const link of items) {
            const identifier = link.href + link.onclick;
            detailParams.set(identifier, { isId: false, href: link.href, onclick: link.onclick });
        }

        // Check if there is a next page
        const nextTarget = currentPage + 1;
        const nextButton = await page.$(`a.page-link:not(.next):text("${nextTarget}")`);
        
        if (nextButton) {
            console.log(`Moving to Page ${nextTarget}...`);
            await nextButton.click();
            await page.waitForTimeout(2000); // Wait for AJAX page load
            currentPage++;
        } else {
            // Check if there's a "next" arrow button if numbers are truncated
            const nextArrow = await page.$('a.page-link.next');
            if (nextArrow) {
                const href = await nextArrow.getAttribute('href');
                if (href && !href.includes('javascript:void(0)')) {
                     console.log(`Clicking next arrow to advance pagination...`);
                     await nextArrow.click();
                     await page.waitForTimeout(2000);
                     currentPage++;
                } else {
                     hasNextPage = false;
                }
            } else {
                hasNextPage = false;
            }
        }
    }

    const uniqueLinks = Array.from(detailParams.values());
    console.log(`Finished crawling pagination. Found ${uniqueLinks.length} total unique items to click.`);
    if (uniqueLinks.length === 0) {
        console.log("No items found to click.");
        await browser.close();
        return;
    }

    const records = [];

    // Loop through them
    for (let i = 0; i < uniqueLinks.length; i++) {
        const item = uniqueLinks[i];
        console.log(`[${i+1}/${uniqueLinks.length}] Loading item...`);
        
        try {
            const newPage = await context.newPage();
            
            if (item.isId) {
                const detailUrl = `https://www.foodsafetykorea.go.kr/api/board/boardDetail.do?menu_grp=MENU_GRP35&menu_no=3899&bbs_no=bbs082&ntctxt_no=${item.value}`;
                await newPage.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            } else {
                let scriptToRun = item.onclick || item.href.replace('javascript:', '');
                if (scriptToRun && scriptToRun.includes('viewDetail')) {
                    await newPage.goto(listUrl, { waitUntil: 'domcontentloaded' });
                    await newPage.waitForTimeout(1000);
                    await Promise.all([
                        newPage.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {}),
                        newPage.evaluate((s) => { eval(s); }, scriptToRun)
                    ]);
                } else if (item.href && item.href.startsWith('http')) {
                    await newPage.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 30000 });
                } else {
                    console.log(`Don't know how to navigate:`, item);
                    await newPage.close();
                    continue;
                }
            }

            await newPage.waitForTimeout(1500); 

            // The user explicitly requested to look at `<div class="post" id="_post">`
            // Let's get that specific element's text.
            const postContent = await newPage.evaluate(() => {
                const post = document.querySelector('.post, #_post');
                if (post) {
                    return post.innerHTML;
                }
                // fallback
                const fallback = document.querySelector('#hwpEditorBoardContent, .board-view-content, .board_view_cont');
                return fallback ? fallback.innerHTML : document.body.innerHTML;
            });
            
            await newPage.close();

            if (postContent) {
                let divContent = postContent.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ').replace(/<p.*?>/gi, '\n');
                let text = cheerio.load(divContent).text();
                text = text.replace(/·/g, '').trim(); 
                
                const lines = text.split('\n').map(l => l.trim()).filter(l => l);

                const extractField = (keyLabels) => {
                    for (let j = 0; j < lines.length; j++) {
                        const line = lines[j];
                        for (const key of keyLabels) {
                            if (line.includes(key)) {
                                let val = line.substring(line.indexOf(key) + key.length).replace(/^[\s:：]+/, '').trim();
                                if (!val && j + 1 < lines.length) {
                                    val = lines[j+1]; 
                                }
                                return val;
                            }
                        }
                    }
                    return '';
                };

                const serviceName = extractField(['서비스 명', '서비스명']);
                const serviceDesc = extractField(['서비스 내용', '서비스내용']);
                
                let usedData = '';
                let inUsedData = false;
                for (const line of lines) {
                    if (line.includes('데이터 활용 내용') || line.includes('데이터 활용내용')) {
                        inUsedData = false;
                    }
                    if (inUsedData && line.trim()) {
                        usedData += line.trim() + '\n';
                    }
                    if (line.includes('활용 데이터') || line.includes('활용데이터')) {
                        inUsedData = true;
                    }
                }

                const dataUsage = extractField(['데이터 활용 내용', '데이터 활용내용', '데이터 활용']);
                const homepage = extractField(['개발사 및 홈페이지', '홈페이지', '개발사']);
                const note = extractField(['비고']);

                records.push({
                    '서비스 명': serviceName,
                    '서비스 내용': serviceDesc,
                    '활용 데이터': usedData.trim(),
                    '데이터 활용 내용': dataUsage,
                    '개발사 및 홈페이지': homepage,
                    '비고': note,
                    '원문 텍스트': text.substring(0, 500)
                });
            } else {
                 console.log(`[!] Could not find #_post on item ${i+1}`);
            }
        } catch(e) {
            console.error(`Error on item ${i+1}:`, e.message);
        }
    }

    console.log(`Scraped ${records.length} records. Saving to Excel...`);
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('데이터 활용 사례');

    worksheet.columns = [
        { header: '서비스 명', key: '서비스 명', width: 25 },
        { header: '서비스 내용', key: '서비스 내용', width: 40 },
        { header: '활용 데이터', key: '활용 데이터', width: 30 },
        { header: '데이터 활용 내용', key: '데이터 활용 내용', width: 50 },
        { header: '개발사 및 홈페이지', key: '개발사 및 홈페이지', width: 35 },
        { header: '비고', key: '비고', width: 20 },
        { header: '원문 텍스트', key: '원문 텍스트', width: 50 }
    ];

    records.forEach(r => worksheet.addRow(r));
    
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.eachRow((row) => {
        row.alignment = { vertical: 'middle', wrapText: true };
    });

    const outputPath = 'C:\\식약처\\food-safety\\데이터_활용사례_Playwright.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Excel saved to ${outputPath}`);

    await browser.close();
}

scrapeBoard().catch(console.error);
