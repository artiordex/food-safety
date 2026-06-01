const fs = require('fs');
let c = fs.readFileSync('c:/식약처/food-safety/create_pptx.js', 'utf8');
c = c.replace(/pptx\.shapes\.RECT/g, "'rect'");
c = c.replace(/pptx\.shapes\.OVAL/g, "'ellipse'");
c = c.replace(/pptx\.shapes\.LINE/g, "'line'");
fs.writeFileSync('c:/식약처/food-safety/create_pptx.js', c);
