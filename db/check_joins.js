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

// Load cache to get korean names
const cachePath = path.join(__dirname, '../crawler/crawl_cache.json');
let cache = [];
if (fs.existsSync(cachePath)) {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
}
const tableCols = {};
cache.forEach(ds => {
    tableCols[ds.svc_no] = ds.fields || [];
});

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

    // Use ALL 470 relationships
    const rels = candidates.relationships;

    for (let i = 0; i < rels.length; i++) {
        const rel = rels[i];
        const { from_table, from_field, to_table, to_field, confidence } = rel;
        
        if (i > 0 && i % 50 === 0) {
            console.log(`Analyzing candidates... (${i}/${rels.length} processed)`);
        }

        try {
            // 1. Get live counts from the actual populated database!
            const countSql = `
                SELECT 
                    (SELECT COUNT(DISTINCT "${from_field}") FROM "${from_table}" WHERE "${from_field}" IS NOT NULL AND "${from_field}" != '') as total_unique,
                    (SELECT COUNT(DISTINCT A."${from_field}") FROM "${from_table}" A INNER JOIN "${to_table}" B ON A."${from_field}" = B."${to_field}" WHERE A."${from_field}" IS NOT NULL AND A."${from_field}" != '') as matched_unique,
                    (SELECT COUNT(*) FROM "${from_table}" A INNER JOIN "${to_table}" B ON A."${from_field}" = B."${to_field}") as actual_join_count
            `;
            const stats = await runQuery(countSql);
            const totalUnique = stats[0]?.total_unique || 0;
            const matchedUnique = stats[0]?.matched_unique || 0;
            const actualJoinCount = stats[0]?.actual_join_count || 0;

            let samples = [];
            let ratio = '0.0';
            if (actualJoinCount > 0) {
                // 2. Fetch sample values
                const sampleSql = `
                    SELECT DISTINCT A."${from_field}" as sample_val
                    FROM "${from_table}" A
                    INNER JOIN "${to_table}" B ON A."${from_field}" = B."${to_field}"
                    WHERE A."${from_field}" IS NOT NULL AND A."${from_field}" != ''
                    LIMIT 3
                `;
                const sampleRows = await runQuery(sampleSql);
                samples = sampleRows.map(r => r.sample_val).filter(Boolean);
                ratio = totalUnique > 0 ? (matchedUnique / totalUnique * 100).toFixed(1) : '0.0';
            }

            verified.push({
                fromTable: from_table,
                fromField: from_field,
                toTable: to_table,
                toField: to_field,
                ratio,
                matchedCount: matchedUnique,
                fromTotal: totalUnique,
                actualJoinCount,
                samples,
                confidence
            });
        } catch (err) {
            // Ignore error for non-existent table or missing fields
        }
    }

    // Sort by actual join count descending
    verified.sort((a, b) => b.actualJoinCount - a.actualJoinCount);

    db.close();

    // Only include relationships that have at least one successfully matched record!
    const activeVerified = verified.filter(v => v.actualJoinCount > 0);

    // 1. Build and Write join.sql
    const joinSqlPath = path.join(__dirname, 'join.sql');
    let sqlContent = `-- =============================================================================\n`;
    sqlContent += `--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록\n`;
    sqlContent += `--   총 검증된 조인 성공 관계: ${activeVerified.length}개\n`;
    sqlContent += `--   생성일시: ${new Date().toISOString()}\n`;
    sqlContent += `-- =============================================================================\n\n`;

    activeVerified.forEach((v, idx) => {
        sqlContent += `-- -----------------------------------------------------------------------------\n`;
        sqlContent += `-- ${idx + 1}. [${v.confidence}] ${v.fromTable}.${v.fromField} ↔ ${v.toTable}.${v.toField}\n`;
        sqlContent += `--   - 값 일치율 (Inclusion): ${v.ratio}% (${v.matchedCount}개 / Unique ${v.fromTotal}개)\n`;
        sqlContent += `--   - 실제 JOIN 레코드 수 : ${v.actualJoinCount.toLocaleString()}건 매칭됨\n`;
        sqlContent += `--   - 매칭된 샘플 데이터   : ${JSON.stringify(v.samples)}\n`;
        sqlContent += `-- -----------------------------------------------------------------------------\n`;
        let selectCols = [];
        const colsA = tableCols[v.fromTable] || [];
        const colsB = tableCols[v.toTable] || [];
        
        colsA.forEach(c => selectCols.push(`A."${c.field}" AS "A_${c.kor_nm || c.field}"`));
        colsB.forEach(c => selectCols.push(`B."${c.field}" AS "B_${c.kor_nm || c.field}"`));
        
        if (selectCols.length === 0) {
            sqlContent += `SELECT A.*, B.*\n`;
        } else {
            sqlContent += `SELECT \n    ${selectCols.join(',\n    ')}\n`;
        }
        sqlContent += `FROM "${v.fromTable}" A\n`;
        sqlContent += `INNER JOIN "${v.toTable}" B ON A."${v.fromField}" = B."${v.toField}"\n`;
        sqlContent += `WHERE A."${v.fromField}" IS NOT NULL AND A."${v.fromField}" != ''\n`;
        sqlContent += `LIMIT 10;\n\n`;
    });

    fs.writeFileSync(joinSqlPath, sqlContent, 'utf8');
    console.log(`\n[System] Successfully generated verified join query file (only active joins): ${joinSqlPath}\n`);

    // Print a beautiful report!
    console.log(`=============================================================================`);
    console.log(`   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 목록`);
    console.log(`=============================================================================`);
    console.log(`실제 SQLite 적재 데이터를 바탕으로 INNER JOIN을 실행하여 매칭되는 레코드가 존재하는`);
    console.log(`조인 관계 목록을 분석하였습니다.\n`);

    activeVerified.forEach((v, idx) => {
        console.log(`${idx + 1}. [${v.confidence}] ${v.fromTable}.${v.fromField} ↔ ${v.toTable}.${v.toField}`);
        console.log(`   - 값 일치율 (Inclusion): ${v.ratio}% (${v.matchedCount}개 / Unique ${v.fromTotal}개)`);
        console.log(`   - 실제 JOIN 레코드 수 : ${v.actualJoinCount.toLocaleString()}건 매칭됨`);
        console.log(`   - 매칭된 샘플 데이터   : ${JSON.stringify(v.samples)}`);
        console.log(`-----------------------------------------------------------------------------`);
    });
}

verifyJoins();
