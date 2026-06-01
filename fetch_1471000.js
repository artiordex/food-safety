const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'foodsafety.db');
const db = new sqlite3.Database(dbPath);

const url = 'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=edacbf8d03ba77b54a1e5c7d9f1149b47582fc23fc9b1e038776fc5b896e143d&pageNo=1&numOfRows=500&type=json';

console.log('Fetching data from API...');
fetch(url)
  .then(res => res.json())
  .then(data => {
    const items = data.body.items;
    if (!items || items.length === 0) {
      console.log("No items found");
      return;
    }
    
    const columns = Object.keys(items[0]);
    const columnDefs = columns.map(col => `"${col}" TEXT`).join(', ');
    
    const createTableSql = `CREATE TABLE IF NOT EXISTS "1471000" (${columnDefs})`;
    
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS "1471000"`);
      db.run(createTableSql, (err) => {
        if (err) {
          console.error("Error creating table:", err);
          return;
        }
        console.log('Table "1471000" created successfully.');
        
        const placeholders = columns.map(() => '?').join(', ');
        const insertSql = `INSERT INTO "1471000" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;
        
        const stmt = db.prepare(insertSql);
        
        let count = 0;
        db.parallelize(() => {
          items.forEach(item => {
            const values = columns.map(col => typeof item[col] === 'object' ? JSON.stringify(item[col]) : item[col] || null);
            stmt.run(values, (err) => {
              if (err) {
                console.error("Error inserting row:", err);
              } else {
                count++;
              }
            });
          });
        });
        
        stmt.finalize(() => {
          console.log(`Successfully inserted ${count} rows into table "1471000".`);
          db.close();
        });
      });
    });
  })
  .catch(err => console.error("Fetch error:", err));
