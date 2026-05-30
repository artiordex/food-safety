const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('c:/식약처/foodsafety_final.db', (err) => {
    if (err) {
        console.error("DB 열기 실패:", err);
        return;
    }
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'api_%' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'v_%'", (err, tables) => {
        if(err) { console.error(err); return; }
        
        console.log("테이블 총 개수:", tables.length);
        if (tables.length === 0) return;
        
        let count = 0;
        let emptyTables = [];
        tables.forEach(t => {
            db.get(`SELECT COUNT(*) as count FROM "${t.name}"`, (err, row) => {
                if(err) console.error(err);
                else if (row.count === 0) emptyTables.push(t.name);
                
                count++;
                if (count === tables.length) {
                    console.log(`총 ${emptyTables.length}개의 빈 테이블이 발견되었습니다:`);
                    if (emptyTables.length > 0) {
                        console.log(emptyTables.join('\n'));
                    }
                }
            });
        });
    });
});
