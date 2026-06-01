const fs = require('fs');

const erd = fs.readFileSync('c:/식약처/food-safety/db/foodsafety_erd.sql', 'utf8');
const lines = erd.split('\n');

const schema = {};
let currentTable = null;

lines.forEach(line => {
    line = line.trim();
    const tableMatch = line.match(/CREATE TABLE IF NOT EXISTS "([^"]+)"/);
    if (tableMatch) {
        currentTable = tableMatch[1];
        schema[currentTable] = [];
        return;
    }
    
    if (currentTable && line.startsWith('"')) {
        const colMatch = line.match(/^"([^"]+)"/);
        if (colMatch) {
            const colName = colMatch[1];
            let krName = colName; 
            
            const commentMatch = line.match(/-- [^\/]+\/\s*([^\/]+)/);
            if (commentMatch) {
                krName = commentMatch[1].trim();
            }
            schema[currentTable].push({ col: colName, kr: krName });
        }
    }
});

let joinSql = fs.readFileSync('c:/식약처/food-safety/db/join.sql', 'utf8');

let updatedJoinSql = joinSql.replace(/SELECT A\.\*, B\.\*\s+FROM "([^"]+)" A\s+INNER JOIN "([^"]+)" B/g, (match, tableA, tableB) => {
    const colsA = schema[tableA] || [];
    const colsB = schema[tableB] || [];
    
    const selectParts = [];
    colsA.forEach(c => {
        selectParts.push(`A."${c.col}" AS "A_${c.kr}"`);
    });
    colsB.forEach(c => {
        selectParts.push(`B."${c.col}" AS "B_${c.kr}"`);
    });
    
    if (selectParts.length === 0) return match;

    const selectStr = "SELECT \n    " + selectParts.join(",\n    ");
    return `${selectStr}\nFROM "${tableA}" A\nINNER JOIN "${tableB}" B`;
});

fs.writeFileSync('c:/식약처/food-safety/db/join_korean.sql', updatedJoinSql);
console.log('Successfully updated join.sql with Korean aliases and saved to join_korean.sql');
