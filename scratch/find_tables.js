const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/foodsafety.db');

db.serialize(() => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
    if (err) throw err;
    console.log("Tables:", tables.map(t => t.name).join(', '));
    
    tables.forEach(table => {
      if (table.name !== 'sqlite_sequence') {
        db.all(`PRAGMA table_info("${table.name}")`, [], (err, columns) => {
          if (err) throw err;
          console.log(`\nTable: ${table.name}`);
          console.log(columns.map(c => c.name).join(', '));
        });
      }
    });
  });
});
