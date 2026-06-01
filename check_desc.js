const fs = require('fs');
let code = fs.readFileSync('view/datasetData.js', 'utf8');

const matches = code.match(/"description":\s*".*?"/g);
if (matches) {
    console.log(matches.slice(0, 10).join('\n'));
} else {
    console.log("No description fields found at all.");
}
