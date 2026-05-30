const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'foodsafety.db');
const CANDIDATES_PATH = path.join(__dirname, 'foodsafety_key_candidates.json');
const OUTPUT_PATH = path.join(__dirname, 'join.sql'); // 변경: join.sql

async function main() {
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY);
  const runQuery = (sql) => new Promise((resolve) => {
    db.get(sql, (err, row) => {
      if (err) resolve({ error: err });
      else resolve(row);
    });
  });

  const candidates = JSON.parse(fs.readFileSync(CANDIDATES_PATH, 'utf8'));
  const relationships = candidates.relationships || [];
  const processedPairs = new Set();
  
  let sqlContent = `-- DB 실제 데이터 기반 검증된 JOIN 관계 목록 (join.sql)\n`;
  sqlContent += `-- [카테시안 곱(데이터 폭발) 방지 적용됨] GROUP BY를 통해 각 테이블에서 키당 1개의 대표값만 추출하여 조인합니다.\n\n`;
  
  let validJoins = 0;
  
  for (const rel of relationships) {
    const sorted = [rel.from_table, rel.to_table].sort();
    const pairKey = `${sorted[0]}.${rel.from_field}-${sorted[1]}.${rel.to_field}`;
    if (processedPairs.has(pairKey)) continue;
    processedPairs.add(pairKey);

    const t1 = rel.from_table;
    const t2 = rel.to_table;
    const c1 = rel.from_field;
    const c2 = rel.to_field;
    
    const testSql = `SELECT COUNT(*) as cnt FROM (SELECT "${c1}" FROM "${t1}" GROUP BY "${c1}") A INNER JOIN (SELECT "${c2}" FROM "${t2}" GROUP BY "${c2}") B ON A."${c1}" = B."${c2}"`;
    const result = await runQuery(testSql);
    
    if (!result.error && result.cnt > 0) {
      validJoins++;
      const n1 = rel.from_table_name || t1;
      const n2 = rel.to_table_name || t2;
      
      sqlContent += `-- =========================================================================\n`;
      sqlContent += `-- [${t1}] ${n1}  <==>  [${t2}] ${n2}\n`;
      sqlContent += `-- 연결 매개체 : ${rel.from_kor_nm || c1} (${c1})\n`;
      sqlContent += `-- 고유 매칭 건수 : ${result.cnt} 건 (중복 제거됨)\n`;
      sqlContent += `-- =========================================================================\n`;
      sqlContent += `SELECT DISTINCT\n`;
      sqlContent += `    A."${c1}" AS '매칭키_${c1}',\n`;
      sqlContent += `    A.*, \n`;
      sqlContent += `    B.*\n`;
      sqlContent += `FROM (SELECT * FROM "${t1}" GROUP BY "${c1}") A\n`;
      sqlContent += `INNER JOIN (SELECT * FROM "${t2}" GROUP BY "${c2}") B\n`;
      sqlContent += `    ON A."${c1}" = B."${c2}";\n\n\n`;
    }
  }
  
  db.close();
  fs.writeFileSync(OUTPUT_PATH, sqlContent, 'utf8');
  console.log(`검증 완료: 총 ${validJoins}개의 유효한 JOIN 쿼리를 ${OUTPUT_PATH} 에 저장했습니다.`);
}

main().catch(console.error);
