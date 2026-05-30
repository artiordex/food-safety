const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'foodsafety.db');
const CANDIDATES_PATH = path.join(__dirname, 'foodsafety_key_candidates.json');
const OUTPUT_PATH = path.join(__dirname, 'json_nway.sql');

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

  const baseEdges = [];
  const processedPairs = new Set();
  
  for (const rel of relationships) {
    const sorted = [rel.from_table, rel.to_table].sort();
    const pairKey = `${sorted[0]}.${rel.from_field}-${sorted[1]}.${rel.to_field}`;
    if (processedPairs.has(pairKey)) continue;
    processedPairs.add(pairKey);

    const testSql = `SELECT COUNT(*) as cnt FROM "${rel.from_table}" A INNER JOIN "${rel.to_table}" B ON A."${rel.from_field}" = B."${rel.to_field}"`;
    const result = await runQuery(testSql);
    if (!result.error && result.cnt > 0) {
      baseEdges.push({
        id: pairKey, t1: rel.from_table, t2: rel.to_table, c1: rel.from_field, c2: rel.to_field,
        n1: rel.from_table_name || rel.from_table, n2: rel.to_table_name || rel.to_table
      });
    }
  }

  let currentLevel = baseEdges.map(e => [e]); 
  const allValidSubgraphs = [];
  const checkedSignatures = new Set();
  let k = 2;
  const MAX_EDGES = 6; 
  
  while (currentLevel.length > 0 && k <= MAX_EDGES) {
    const nextLevel = [];
    for (const subgraph of currentLevel) {
      const tablesInGraph = new Set();
      subgraph.forEach(e => { tablesInGraph.add(e.t1); tablesInGraph.add(e.t2); });
      
      for (const edge of baseEdges) {
        const hasT1 = tablesInGraph.has(edge.t1);
        const hasT2 = tablesInGraph.has(edge.t2);
        
        if ((hasT1 && !hasT2) || (!hasT1 && hasT2)) {
          const newSubgraph = [...subgraph, edge].sort((a, b) => a.id.localeCompare(b.id));
          const sig = newSubgraph.map(e => e.id).join('|');
          if (checkedSignatures.has(sig)) continue;
          checkedSignatures.add(sig);
          
          const tables = Array.from(new Set(newSubgraph.flatMap(e => [e.t1, e.t2])));
          const tableAlias = {};
          tables.forEach((t, idx) => tableAlias[t] = `T${idx}`);
          
          // 사용되는 키들을 수집
          const usedKeys = {};
          tables.forEach(t => usedKeys[t] = new Set());
          for (const e of newSubgraph) {
            usedKeys[e.t1].add(e.c1);
            usedKeys[e.t2].add(e.c2);
          }
          
          const t0 = tables[0];
          const keys0 = Array.from(usedKeys[t0]).map(k => `"${k}"`).join(', ');
          let sql = `SELECT COUNT(*) as cnt FROM (SELECT * FROM "${t0}" GROUP BY ${keys0}) ${tableAlias[t0]}`;
          
          const joinedTables = new Set([t0]);
          let joinClauses = '';
          const edgesToAdd = [...newSubgraph];
          
          while (edgesToAdd.length > 0) {
            let added = false;
            for (let i = 0; i < edgesToAdd.length; i++) {
              const e = edgesToAdd[i];
              if (joinedTables.has(e.t1) && !joinedTables.has(e.t2)) {
                const keys = Array.from(usedKeys[e.t2]).map(k => `"${k}"`).join(', ');
                joinClauses += ` INNER JOIN (SELECT * FROM "${e.t2}" GROUP BY ${keys}) ${tableAlias[e.t2]} ON ${tableAlias[e.t1]}."${e.c1}" = ${tableAlias[e.t2]}."${e.c2}"`;
                joinedTables.add(e.t2);
                edgesToAdd.splice(i, 1);
                added = true; break;
              } else if (joinedTables.has(e.t2) && !joinedTables.has(e.t1)) {
                const keys = Array.from(usedKeys[e.t1]).map(k => `"${k}"`).join(', ');
                joinClauses += ` INNER JOIN (SELECT * FROM "${e.t1}" GROUP BY ${keys}) ${tableAlias[e.t1]} ON ${tableAlias[e.t2]}."${e.c2}" = ${tableAlias[e.t1]}."${e.c1}"`;
                joinedTables.add(e.t1);
                edgesToAdd.splice(i, 1);
                added = true; break;
              }
            }
            if (!added) break; 
          }
          sql += joinClauses;
          
          const result = await runQuery(sql);
          if (!result.error && result.cnt > 0) {
            nextLevel.push(newSubgraph);
            let selectFields = tables.map(t => `${tableAlias[t]}.*`).join(', ');
            allValidSubgraphs.push({
              tables, edges: newSubgraph, cnt: result.cnt,
              sql: sql.replace('COUNT(*) as cnt', 'DISTINCT ' + selectFields)
            });
          }
        }
      }
    }
    currentLevel = nextLevel; k++;
  }
  
  const byTableCount = {};
  for (const sg of allValidSubgraphs) {
    const numTables = sg.tables.length;
    if (numTables >= 3) { 
      if (!byTableCount[numTables]) byTableCount[numTables] = [];
      byTableCount[numTables].push(sg);
    }
  }
  
  let outSql = `-- N-way 심층 조인 쿼리 모음 (테이블 3개 이상 연결)\n`;
  outSql += `-- [카테시안 곱 방지 적용됨] GROUP BY를 활용하여 연결되는 키 기준으로 테이블당 1개의 데이터만 연결되도록 최적화했습니다.\n\n`;
  
  const countsDesc = Object.keys(byTableCount).map(Number).sort((a,b) => b - a);
  for (const n of countsDesc) {
    outSql += `\n-- =========================================================================\n`;
    outSql += `-- 🌟 [${n}중 조인] ${n}개 테이블 연결 (${byTableCount[n].length}개 구조)\n`;
    outSql += `-- =========================================================================\n\n`;
    byTableCount[n].sort((a,b) => b.cnt - a.cnt);
    for (const sg of byTableCount[n]) {
      outSql += `-- 고유 매칭 건수: ${sg.cnt}건\n-- 조인 구조:\n`;
      for (const e of sg.edges) { outSql += `--   [${e.t1}] ${e.n1} <==(${e.c1}=${e.c2})==> [${e.t2}] ${e.n2}\n`; }
      outSql += `${sg.sql.replace(/INNER JOIN/g, '\n    INNER JOIN')};\n\n`;
    }
  }
  db.close();
  fs.writeFileSync(OUTPUT_PATH, outSql, 'utf8');
  console.log(`완료! ${OUTPUT_PATH} 에 저장했습니다.`);
}
main().catch(console.error);
