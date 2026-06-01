const https = require('https');
const url = 'https://www.foodsafetykorea.go.kr/api/datasetList.do?svc_type_cd=API_TYPE06&menu_no=661&menu_grp=MENU_GRP31';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('건강기능식품')) {
        // try to find the anchor tag in the same line or previous/next lines
        const block = lines.slice(Math.max(0, i-5), i+5).join(' ');
        const match = block.match(/fn_datasetDetail\('([^']+)'\)/);
        if (match) {
           console.log(match[1], lines[i].trim());
        }
      }
    }
  });
}).on('error', err => console.error(err));
