const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'foodsafety.db');
const candidatesPath = path.join(__dirname, 'foodsafety_key_candidates.json');

if (!fs.existsSync(dbPath)) {
    console.error(`Error: foodsafety.db not found at ${dbPath}`);
    process.exit(1);
}

if (!fs.existsSync(candidatesPath)) {
    console.error(`Error: foodsafety_key_candidates.json not found at ${candidatesPath}`);
    process.exit(1);
}

const db = new sqlite3.Database(dbPath);
const candidates = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));

async function runQuery(sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function verifyJoins() {
    console.log(`Checking actual SQLite JOIN matches on ${dbPath}...\n`);
    const verified = [];

    // Filter relationships that have positive matched_count
    const rels = candidates.relationships.filter(r => 
        r.inclusion_check && 
        r.inclusion_check.checked && 
        r.inclusion_check.matched_count > 0
    );

    // Sort by matched count / inclusion ratio descending
    rels.sort((a, b) => b.inclusion_check.matched_count - a.inclusion_check.matched_count);

    for (const rel of rels) {
        const { from_table, from_field, to_table, to_field, confidence } = rel;
        const ratio = (rel.inclusion_check.inclusion_ratio * 100).toFixed(1);
        const matched = rel.inclusion_check.matched_count;
        const total = rel.inclusion_check.from_unique_count;

        try {
            // Run an actual SQL query to verify the join!
            const sql = `
                SELECT COUNT(*) as cnt, A."${from_field}" as sample_val
                FROM "${from_table}" A
                INNER JOIN "${to_table}" B ON A."${from_field}" = B."${to_field}"
                WHERE A."${from_field}" IS NOT NULL AND A."${from_field}" != ''
                GROUP BY A."${from_field}"
                LIMIT 3
            `;
            const rows = await runQuery(sql);
            
            // Total joined rows count
            const countSql = `
                SELECT COUNT(*) as cnt
                FROM "${from_table}" A
                INNER JOIN "${to_table}" B ON A."${from_field}" = B."${to_field}"
            `;
            const countRow = await runQuery(countSql);
            const actualJoinCount = countRow[0]?.cnt || 0;

            if (actualJoinCount > 0) {
                const samples = rows.map(r => r.sample_val).filter(Boolean);
                verified.push({
                    fromTable: from_table,
                    fromField: from_field,
                    toTable: to_table,
                    toField: to_field,
                    ratio,
                    matchedCount: matched,
                    fromTotal: total,
                    actualJoinCount,
                    samples,
                    confidence
                });
            }
        } catch (err) {
            // Ignore error for non-existent table or missing fields
        }
    }

    db.close();

    // Print a beautiful report!
    console.log(`=============================================================================`);
    console.log(`   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 목록`);
    console.log(`=============================================================================`);
    console.log(`실제 SQLite 적재 데이터를 바탕으로 INNER JOIN을 실행하여 매칭되는 레코드가 존재하는`);
    console.log(`조인 관계 목록을 분석하였습니다.\n`);

    verified.forEach((v, idx) => {
        console.log(`${idx + 1}. [${v.confidence}] ${v.fromTable}.${v.fromField} ↔ ${v.toTable}.${v.toField}`);
        console.log(`   - 값 일치율 (Inclusion): ${v.ratio}% (${v.matchedCount}개 / Unique ${v.fromTotal}개)`);
        console.log(`   - 실제 JOIN 레코드 수 : ${v.actualJoinCount.toLocaleString()}건 매칭됨`);
        console.log(`   - 매칭된 샘플 데이터   : ${JSON.stringify(v.samples)}`);
        console.log(`-----------------------------------------------------------------------------`);
    });
}

verifyJoins();
