const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/foodsafety.db');

db.all(`PRAGMA table_info("1471000")`, [], (err, rows) => {
  if (err) console.error(err);
  console.log(rows.map(r => r.name).join(', '));
  db.close();
});
