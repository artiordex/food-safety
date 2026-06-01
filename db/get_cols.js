const fs = require('fs');
const sql = fs.readFileSync('c:/식약처/food-safety/db/foodsafety_erd.sql', 'utf8');
const tables = ['C002', 'I0470', 'I2620', 'C001', 'I0482', 'I0760'];
tables.forEach(t => {
    const idx = sql.indexOf(`CREATE TABLE IF NOT EXISTS "${t}"`);
    if (idx !== -1) {
        console.log(sql.substring(idx, sql.indexOf(');', idx) + 2));
    }
});
