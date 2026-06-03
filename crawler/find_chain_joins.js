/**
 * Highly effective chain join finder:
 * 1. Checks every candidate edge's actual overlap first.
 * 2. Builds a graph of only positive-overlap edges.
 * 3. Traverses the graph to find N-th degree chain joins.
 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'db', 'foodsafety.db');
const db = new sqlite3.Database(DB_PATH);

const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
});
const dbGet = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
});

const VALID_JOIN_KEYS = new Set([
  'LCNS_NO',
  'PRDLST_REPORT_NO',
  'TESTITM_CD',
  'CMMN_SPEC_CD',
  'PRDLST_CD',
  'HF_FNCLTY_MTRAL_RCOGN_NO',
  'BAR_CD',
  'DSPS_STDR_CD',
  'ITEM_REPORT_NO'
]);

async function main() {
  console.log('[1/4] 테이블 목록 및 컬럼 조회...');
  const tables = await dbAll(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'v_%' AND name != 'api_tables'
    ORDER BY name
  `);
  const tableNames = tables.map(t => t.name);

  const tableColumns = {};
  for (const tbl of tableNames) {
    const cols = await dbAll(`PRAGMA table_info("${tbl}")`);
    tableColumns[tbl] = cols.map(c => c.name);
  }

  console.log('[2/4] 테이블 간 공통 키 검증 (실제 overlap > 0 인 에지 찾기)...');
  const verifiedEdges = new Map();
  let checkedEdges = 0;

  for (let i = 0; i < tableNames.length; i++) {
    for (let j = i + 1; j < tableNames.length; j++) {
      const a = tableNames[i];
      const b = tableNames[j];
      const colsA = new Set(tableColumns[a]);
      const common = tableColumns[b].filter(c => colsA.has(c) && VALID_JOIN_KEYS.has(c));
      
      if (common.length > 0) {
        checkedEdges++;
        // 가장 가능성 높은 키로 DB에서 실제 조인 매칭 수 체크
        const key = common[0];
        try {
          const checkSql = `
            SELECT COUNT(*) as cnt 
            FROM "${a}" A 
            INNER JOIN "${b}" B ON A."${key}" = B."${key}" 
            WHERE A."${key}" IS NOT NULL AND A."${key}" != ''
            LIMIT 1
          `;
          const row = await dbGet(checkSql);
          if (row && row.cnt > 0) {
            // 실제 매칭되는 에지만 추가
            if (!verifiedEdges.has(a)) verifiedEdges.set(a, new Map());
            if (!verifiedEdges.has(b)) verifiedEdges.set(b, new Map());
            verifiedEdges.get(a).set(b, { key, count: row.cnt });
            verifiedEdges.get(b).set(a, { key, count: row.cnt });
          }
        } catch (e) {
          // 쿼리 에러 무시
        }
      }
    }
  }

  const vEdgeCount = [...verifiedEdges.values()].reduce((sum, m) => sum + m.size, 0) / 2;
  console.log(`  → 검증된 에지 수: ${vEdgeCount}개 (실제 데이터 매칭 존재)`);

  console.log('[3/4] 검증된 에지 기반으로 3차~6차 체인 탐색...');
  const chains = [];
  
  for (const startTable of tableNames) {
    if (!verifiedEdges.has(startTable)) continue;

    const queue = [{ current: startTable, path: [startTable], keys: [] }];
    while (queue.length > 0) {
      const { current, path: curPath, keys: curKeys } = queue.shift();

      if (curPath.length >= 3) {
        chains.push({ path: [...curPath], keys: [...curKeys] });
      }

      if (curPath.length >= 6) continue; // 최대 6차 체인 조인까지 탐색!

      const neighbors = verifiedEdges.get(current);
      if (!neighbors) continue;

      for (const [nextTable, info] of neighbors) {
        if (curPath.includes(nextTable)) continue;
        queue.push({
          current: nextTable,
          path: [...curPath, nextTable],
          keys: [...curKeys, info.key]
        });
      }
    }
  }

  // 중복 체인 제거
  const uniqueChains = [];
  const seen = new Set();
  for (const chain of chains) {
    const sorted = [...chain.path].sort().join('|');
    const key = sorted + '::' + chain.keys.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      uniqueChains.push(chain);
    }
  }

  console.log(`  → 후보 체인 수: ${uniqueChains.length}개`);

  console.log('[4/4] 전체 경로의 최종 매칭 여부 최종 검증...');
  const verifiedChains = [];
  let checkedChains = 0;

  for (const chain of uniqueChains) {
    checkedChains++;
    if (checkedChains % 100 === 0 || checkedChains === uniqueChains.length) {
      console.log(`  경로 검증 진행 중: ${checkedChains}/${uniqueChains.length}`);
    }

    try {
      const aliases = 'ABCDEFGH'.split('');
      let fromClause = `"${chain.path[0]}" ${aliases[0]}`;
      const joinClauses = [];

      for (let i = 1; i < chain.path.length; i++) {
        const key = chain.keys[i - 1];
        joinClauses.push(
          `INNER JOIN "${chain.path[i]}" ${aliases[i]} ON ${aliases[i-1]}."${key}" = ${aliases[i]}."${key}"`
        );
      }

      const countSql = `SELECT COUNT(*) as cnt FROM ${fromClause} ${joinClauses.join(' ')} LIMIT 1`;
      const row = await dbGet(countSql);

      if (row && row.cnt > 0) {
        verifiedChains.push({ ...chain, count: row.cnt });
      }
    } catch (e) {
      // 에러 무시
    }
  }

  // 차수 높은 순, 건수 많은 순으로 정렬
  verifiedChains.sort((a, b) => {
    if (b.path.length !== a.path.length) {
      return b.path.length - a.path.length; // 차수 내림차순
    }
    return b.count - a.count; // 매칭 건수 내림차순
  });

  console.log(`\n최종 매칭되는 체인 조인 수: ${verifiedChains.length}개 발견!`);

  // SQL 파일 작성
  const outputPath = path.join(__dirname, '..', 'db', 'chain_joins.sql');
  let sqlContent = `-- =============================================================================\n`;
  sqlContent += `--   N차 체인 조인 자동 탐색 결과 (실제 매칭 레코드 존재 필터링)\n`;
  sqlContent += `--   총 검증된 체인 조인: ${verifiedChains.length}개\n`;
  sqlContent += `--   생성일시: ${new Date().toISOString()}\n`;
  sqlContent += `-- =============================================================================\n\n`;

  verifiedChains.forEach((v, idx) => {
    const aliases = 'ABCDEFGH'.split('');
    const depth = v.path.length;

    sqlContent += `-- -----------------------------------------------------------------------------\n`;
    sqlContent += `-- ${idx + 1}. [${depth}차 체인 JOIN] ${v.path.join(' ↔ ')}\n`;
    sqlContent += `--   조인 관계: ${v.path.map((t, i) => i === 0 ? t : `--(${v.keys[i-1]})-->${t}`).join(' ')}\n`;
    sqlContent += `--   실제 매칭 레코드: ${v.count.toLocaleString()}건\n`;
    sqlContent += `-- -----------------------------------------------------------------------------\n`;

    const selectCols = [];
    for (let i = 0; i < v.path.length; i++) {
      const tbl = v.path[i];
      const cols = tableColumns[tbl] || [];
      const meaningful = cols.filter(c => c !== 'NUM' && c !== 'ROW_NUM' && c !== 'LAST_UPDT_DTM').slice(0, 2);
      meaningful.forEach(c => {
        selectCols.push(`${aliases[i]}."${c}" AS "${aliases[i]}_${c}"`);
      });
    }

    sqlContent += `SELECT\n    ${selectCols.join(',\n    ')}\n`;
    sqlContent += `FROM "${v.path[0]}" ${aliases[0]}\n`;

    for (let i = 1; i < v.path.length; i++) {
      sqlContent += `INNER JOIN "${v.path[i]}" ${aliases[i]} ON ${aliases[i-1]}."${v.keys[i-1]}" = ${aliases[i]}."${v.keys[i-1]}"\n`;
    }

    sqlContent += `WHERE ${aliases[0]}."${v.keys[0]}" IS NOT NULL AND ${aliases[0]}."${v.keys[0]}" != ''\n`;
    sqlContent += `LIMIT 10;\n\n`;
  });

  fs.writeFileSync(outputPath, sqlContent, 'utf-8');
  console.log(`결과 SQL 파일 저장 완료: ${outputPath}`);

  db.close();
}

main().catch(err => {
  console.error('오류:', err);
  db.close();
});
