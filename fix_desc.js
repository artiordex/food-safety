const fs = require('fs');

const path = 'view/datasetData.js';
let code = fs.readFileSync(path, 'utf8');

let count = 0;
const newCode = code.replace(/식약처 OpenAPI ([a-zA-Z0-9_]+) 데이터베이스 테이블입니다\. 총 \d+건의 데이터가 포함되어 있습니다\./g, (match, tableId, offset, fullText) => {
    const listStart = fullText.indexOf('"includedList":', offset);
    if (listStart === -1 || (listStart - offset > 1000)) { // limit search to avoid finding next object
        return match;
    }

    const listEnd = fullText.indexOf(']', listStart);
    if (listEnd === -1) return match;

    const listBlock = fullText.substring(listStart, listEnd);
    // count strings inside includedList
    const colCount = Math.floor((listBlock.match(/"/g) || []).length / 2);
    
    count++;
    return `식약처 OpenAPI ${tableId} 데이터베이스 테이블입니다. 총 ${colCount}개의 컬럼으로 구성되어 있습니다.`;
});

console.log(`Replaced ${count} items`);
if (count > 0) {
    fs.writeFileSync(path, newCode, 'utf8');
}
