const { chromium } = require('playwright');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');
const fs = require('fs');

async function scrapeBoard() {
    console.log('Starting browser...');
    const browser = await chromium.launch({ headless: true });
    // Use proper User-Agent to bypass WAF
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();
    
    const listUrl = 'https://www.foodsafetykorea.go.kr/api/board/board.do?menu_grp=MENU_GRP35&menu_no=3899';
    console.log(`Navigating to ${listUrl}`);
    
    // retry logic
    try {
        await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(3000);
    } catch(e) {
        console.error("List page failed:", e.message);
        await browser.close();
        return;
    }

    const content = await page.content();
    
    const linksRegex = /viewDetail2?\(['"]?(\d+)['"]?/g;
    const hrefRegex = /ntctxt_no=(\d+)/g;
    
    let match;
    const detailParams = new Set();
    
    while ((match = linksRegex.exec(content)) !== null) {
        detailParams.add(match[1]);
    }
    while ((match = hrefRegex.exec(content)) !== null) {
        detailParams.add(match[1]);
    }

    const finalItems = Array.from(detailParams);
    
    console.log(`Unique items to scrape: ${finalItems.length}`);
    if (finalItems.length === 0) {
        console.log("No items found. Writing html");
        fs.writeFileSync('scratch_list.html', content);
        await browser.close();
        return;
    }

    const records = [];

    for (let i = 0; i < finalItems.length; i++) {
        const ntctxt_no = finalItems[i];
        const detailUrl = `https://www.foodsafetykorea.go.kr/api/board/boardDetail.do?menu_grp=MENU_GRP35&menu_no=3899&bbs_no=bbs082&ntctxt_no=${ntctxt_no}`;
        console.log(`[${i+1}/${finalItems.length}] Scraping ${detailUrl}`);
        
        try {
            await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await page.waitForTimeout(1500); 
            
            const detailHtml = await page.content();
            const $ = cheerio.load(detailHtml);
            
            // The user explicitly showed: id="&quot;hwpEditorBoardContent&quot;" (with HTML entities inside the ID!)
            // We can just grab ALL text from '.board_view_cont' or '.board-view-content' or 'body' and parse it.
            let divContent = $('.board_view_cont, .board-view-content, #hwpEditorBoardContent, div[id*="hwpEditorBoardContent"]').html();
            
            if (!divContent) {
                 divContent = $('body').html();
            }

            if (divContent) {
                divContent = divContent.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ').replace(/<p.*?>/gi, '\n');
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
                    '원문': text.substring(0, 500)
                });
            }
        } catch(e) {
            console.error(`Error on ${ntctxt_no}:`, e.message);
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
        { header: '원문', key: '원문', width: 50 }
    ];

    records.forEach(r => worksheet.addRow(r));
    
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.eachRow((row) => {
        row.alignment = { vertical: 'middle', wrapText: true };
    });

    const outputPath = 'C:\\식약처\\food-safety\\데이터_활용사례.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Excel saved to ${outputPath}`);

    await browser.close();
}

scrapeBoard().catch(console.error);
