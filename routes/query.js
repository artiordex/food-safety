const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = (db, dbAll, logger, readonlyDb) => {
let _joinScenariosCache = null;
router.get('/join-scenarios', (req, res) => {
  if (_joinScenariosCache) {
    return res.json(_joinScenariosCache);
  }
  const joinSqlPath = path.join(__dirname, '..', 'db', 'join.sql');
  try {
    // join.sql 파일 파싱
    const content = fs.readFileSync(joinSqlPath, 'utf-8');
    const lines = content.split('\n');
    const fileScenarios = [];
    let currentBlock = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const titleMatch = line.match(/^--\s+(\d+)\.\s+\[([A-Z]+)\]\s+(.+)$/);
      if (titleMatch) {
        currentBlock = {
          no: parseInt(titleMatch[1]),
          grade: titleMatch[2],
          relation: titleMatch[3].trim(),
          descLines: [],
          sqlLines: []
        };
        fileScenarios.push(currentBlock);
        continue;
      }
      if (!currentBlock) continue;
      if (/^--\s*[-=]{10,}/.test(line)) continue;

      if (line.trim().startsWith('--')) {
        currentBlock.descLines.push(line.replace(/^--\s*/, '').trim());
      } else if (line.trim() !== '') {
        currentBlock.sqlLines.push(line);
      }
    }

    const parsedScenarios = fileScenarios.map(block => {
      const description = block.descLines.filter(Boolean).join(' | ');
      const sql = block.sqlLines.join('\n').trim();
      return {
        no: block.no,
        grade: block.grade,
        title: `${block.no}. ${block.relation}`,
        description,
        sql
      };
    }).filter(s => s.sql);

    const finalResult = parsedScenarios;
    _joinScenariosCache = finalResult;
    res.json(finalResult);
  } catch (err) {
    logger.error({ err }, 'join.sql 파싱 중 오류가 발생했습니다.');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});
router.post('/query', (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '쿼리 내용이 비어 있습니다.' });
  }

  logger.info({ query }, 'SQL 쿼리 실행 요청이 들어왔습니다.');

  // 화이트리스트 방식: SELECT / EXPLAIN / PRAGMA 만 허용 (ATTACH 등 우회 차단)
  const ALLOWED_SQL = /^\s*(SELECT|EXPLAIN|PRAGMA\s+(table_info|table_list|index_list|foreign_key_list|database_list|compile_options|encoding|journal_mode|page_size|user_version|schema_version|quick_check|integrity_check))/i;
  if (!ALLOWED_SQL.test(query)) {
    return res.status(403).json({ error: '안전을 위해 조회(SELECT, EXPLAIN, PRAGMA) 목적의 쿼리만 실행이 허용됩니다.' });
  }

  // LIMIT 미포함 SELECT 쿼리는 최대 1000행으로 자동 제한 (전체 풀스캔 방지)
  const MAX_ROWS = 1000;
  const hasLimit = /\bLIMIT\b/i.test(query);
  const safeQuery = (!hasLimit && /^\s*SELECT/i.test(query))
    ? query.replace(/;?\s*$/, '') + ` LIMIT ${MAX_ROWS}`
    : query;

  readonlyDb.all(safeQuery, [], (err, rows) => {
    if (err) {
      logger.error({ err }, 'SQL 실행 중 오류가 발생했습니다.');
      return res.status(400).json({ error: 'SQL 실행 중 오류가 발생했습니다.' });
    }
    res.json(rows);
  });
});


  // PK/FK 관계 데이터 조회
  let _relationshipsCache = null;
  router.get('/relationships', (req, res) => {
    if (_relationshipsCache) {
      return res.json(_relationshipsCache);
    }
    const jsonPath = path.join(__dirname, '..', 'db', 'foodsafety_key_candidates.json');
    if (fs.existsSync(jsonPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        _relationshipsCache = data.relationships || [];
        res.json(_relationshipsCache);
      } catch (err) {
        logger.error({ err }, '[relationships] 관계 데이터 파일 읽기 오류');
        res.status(500).json({ error: '관계 데이터 파일을 읽는 중 오류가 발생했습니다.' });
      }
    } else {
      res.status(404).json({ error: '관계 데이터 분석 결과가 존재하지 않습니다.' });
    }
  });

  // 핵심 공공-민간 초융합형 ERD 검색 API
  router.get('/super-converge-search', (req, res) => {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

    const result = {
      keyword,
      company: null,
      haccp: [],
      punishments: [],
      products: [],
      nutrition: [],
      barcodes: []
    };

    const dbGet = (sql, params) => new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err); else resolve(row);
      });
    });

    (async () => {
      try {
        let targetBarcode = keyword;
        let targetPrdlst = keyword;
        let targetLcns = keyword;

        const barcodeRows = await dbAll('SELECT * FROM "C005" WHERE BAR_CD = ?', [targetBarcode]);
        if (barcodeRows.length > 0) {
          result.barcodes = barcodeRows;
          if (barcodeRows[0].PRDLST_REPORT_NO) {
            targetPrdlst = barcodeRows[0].PRDLST_REPORT_NO;
            targetLcns = targetPrdlst.substring(0, targetPrdlst.length > 8 ? 8 : targetPrdlst.length);
          }
        }

        const productRows = await dbAll('SELECT * FROM "I1250" WHERE PRDLST_REPORT_NO = ?', [targetPrdlst]);
        if (productRows.length > 0) {
          result.products = productRows;
          if (productRows[0].LCNS_NO) targetLcns = productRows[0].LCNS_NO;
        }

        const nutritionRows = await dbAll('SELECT * FROM "1471000" WHERE ITEM_REPORT_NO = ?', [targetPrdlst]);
        if (nutritionRows.length > 0) result.nutrition = nutritionRows;

        const companyRow = await dbGet('SELECT * FROM "I2500" WHERE LCNS_NO = ?', [targetLcns]);
        if (companyRow) result.company = companyRow;

        const haccpRows = await dbAll('SELECT * FROM "I0580" WHERE LCNS_NO = ?', [targetLcns]);
        if (haccpRows.length > 0) result.haccp = haccpRows;

        const punishRows = await dbAll('SELECT * FROM "I0470" WHERE LCNS_NO = ?', [targetLcns]);
        if (punishRows.length > 0) result.punishments = punishRows;

        if (result.company && result.products.length === 0) {
          const companyProducts = await dbAll('SELECT * FROM "I1250" WHERE LCNS_NO = ? LIMIT 50', [targetLcns]);
          result.products = companyProducts;
        }

        res.json(result);
      } catch (err) {
        logger.error({ err }, '[super-converge-search] 검색 중 오류가 발생했습니다.');
        res.status(500).json({ error: 'DB search failed' });
      }
    })();
  });

  // 키워드 기반 전체 테이블 스캔 데이터맵 API
  const datamapCache = {};
  const DATAMAP_CACHE_TTL = 3 * 60 * 1000;

  const domainColors = {
    '식품영양정보': { bg: '#0d9488', border: '#0f766e', light: '#ccfbf1' },
    '기준규격정보': { bg: '#1a5fb4', border: '#1e40af', light: '#dbeafe' },
    '코드정보': { bg: '#7c3aed', border: '#6d28d9', light: '#ede9fe' },
    '수질환경정보': { bg: '#e11d48', border: '#be123c', light: '#ffe4e6' },
    '검사기관정보': { bg: '#d97706', border: '#b45309', light: '#fef3c7' },
    '식품위해관리': { bg: '#059669', border: '#047857', light: '#d1fae5' },
    '식품안전관리': { bg: '#2563eb', border: '#1d4ed8', light: '#dbeafe' },
    '이력추적관리': { bg: '#db2777', border: '#be185d', light: '#fce7f3' },
    '어린이식품안전관리': { bg: '#ca8a04', border: '#a16207', light: '#fef9c3' },
    'HACCP지정현황': { bg: '#4f46e5', border: '#3730a3', light: '#e0e7ff' },
    '업체인허가현황': { bg: '#0891b2', border: '#0e7490', light: '#ecfeff' },
    '위생용품': { bg: '#ea580c', border: '#c2410c', light: '#ffedd5' },
    '축산물': { bg: '#16a34a', border: '#15803d', light: '#dcfce7' },
    '건강기능식품': { bg: '#9333ea', border: '#7e22ce', light: '#f3e8ff' },
    '수입식품 등': { bg: '#be123c', border: '#9f1239', light: '#ffe4e6' },
    '식품 등': { bg: '#0369a1', border: '#075985', light: '#e0f2fe' },
    '폐업정보': { bg: '#475569', border: '#334155', light: '#f1f5f9' },
    '용어사전': { bg: '#854d0e', border: '#713f12', light: '#fef9c3' },
    '기타': { bg: '#57534e', border: '#44403c', light: '#f5f5f4' }
  };

  router.get('/keyword-datamap', async (req, res) => {
    const rawKeyword = req.query.keyword || '소스';
    const defaultOp = req.query.op || 'AND';

    const cacheKey = `${defaultOp}::${rawKeyword.toLowerCase()}`;
    if (datamapCache[cacheKey]) {
      const { timestamp, data } = datamapCache[cacheKey];
      if (Date.now() - timestamp < DATAMAP_CACHE_TTL) {
        logger.info({ cacheKey }, 'keyword-datamap 캐시 적중');
        return res.json(data);
      }
    }

    const isOperator = w => w.toUpperCase() === 'AND' || w.toUpperCase() === 'OR';
    const rawWords = rawKeyword.split(';').map(w => w.trim()).filter(Boolean);
    const tokens = rawWords.map(w => isOperator(w) ? w.toUpperCase() : w);
    const expr = [];
    for (let i = 0; i < tokens.length; i++) {
      expr.push(tokens[i]);
      if (i < tokens.length - 1 && !isOperator(tokens[i]) && !isOperator(tokens[i + 1])) {
        expr.push(defaultOp);
      }
    }

    try {
      const tables = await dbAll(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables', 'api_columns')`);

      const catRows = await dbAll(`SELECT svc_no, svc_nm, cat FROM api_tables`);
      const domainMap = {};
      const tableLabels = {};
      const svcNoMap = {}; // normalized → original (with hyphens)
      catRows.forEach(row => {
        const normalizedSvcNo = (row.svc_no || '').replace(/-/g, '');
        domainMap[normalizedSvcNo] = row.cat || '기타';
        tableLabels[normalizedSvcNo] = row.svc_nm;
        svcNoMap[normalizedSvcNo] = row.svc_no;
      });

      const nodes = [];
      const edges = [];
      const matchedTables = [];
      const allLeafNodes = [];

      nodes.push({
        id: 'CENTER',
        label: rawKeyword,
        shape: 'circle',
        size: 55,
        color: { background: '#1e293b', border: '#f59e0b', highlight: { background: '#334155', border: '#fbbf24' } },
        font: { size: 18, color: '#ffffff', bold: true, face: 'Malgun Gothic' },
        borderWidth: 4,
        level: 0
      });

      const BATCH_SIZE = 20;
      const processTable = async (tableName) => {
        let columns = [];
        try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch (e) { return null; }
        if (!columns.length) return null;

        const colResults = await Promise.all(columns.map(async col => {
          try {
            let sqlWhere = '';
            const params = [];
            for (let i = 0; i < expr.length; i++) {
              const t = expr[i];
              if (t === 'AND' || t === 'OR') { sqlWhere += ` ${t} `; }
              else { sqlWhere += `CAST("${col.name}" AS TEXT) LIKE ?`; params.push(`%${t}%`); }
            }
            if (!sqlWhere) return null;
            const countRow = await dbAll(`SELECT COUNT(*) as cnt FROM "${tableName}" WHERE ${sqlWhere}`, params);
            return (countRow[0] && countRow[0].cnt > 0) ? { col: col.name, count: countRow[0].cnt, sqlWhere, params } : null;
          } catch (e) { return null; }
        }));

        const matchingCols = colResults.filter(Boolean);
        if (!matchingCols.length) return null;

        const totalCount = matchingCols.reduce((s, c) => s + c.count, 0);
        const domain = domainMap[tableName] || '기타';
        const colColors = domainColors[domain] || domainColors['기타'];
        const tableLabel = tableLabels[tableName] || tableName;
        const bestCol = matchingCols.sort((a, b) => b.count - a.count)[0];

        let sampleRows = [];
        try {
          sampleRows = await dbAll(
            `SELECT "${bestCol.col}" as val, * FROM "${tableName}" WHERE ${bestCol.sqlWhere} LIMIT 3`,
            bestCol.params
          );
        } catch (e) { }

        return { tableName, tableLabel, domain, colColors, totalCount, matchingCols, bestCol, sampleRows };
      };

      for (let i = 0; i < tables.length; i += BATCH_SIZE) {
        const batch = tables.slice(i, i + BATCH_SIZE).map(t => t.name);
        const batchResults = await Promise.all(batch.map(processTable));

        for (const result of batchResults) {
          if (!result) continue;
          const { tableName, tableLabel, domain, colColors, totalCount, matchingCols, sampleRows, bestCol } = result;

          nodes.push({
            id: `TABLE_${tableName}`,
            label: tableLabel + '\n(' + totalCount + '건)',
            shape: 'ellipse',
            size: Math.min(32, 18 + Math.sqrt(totalCount) * 2),
            color: { background: colColors.bg, border: colColors.border, highlight: { background: colColors.light, border: colColors.border } },
            font: { size: 10, color: '#ffffff', bold: true, face: 'Malgun Gothic' },
            borderWidth: 2, level: 1, domain, totalCount
          });
          edges.push({
            from: 'CENTER', to: `TABLE_${tableName}`,
            width: Math.min(6, 1 + Math.log(totalCount + 1)),
            color: { color: colColors.bg, highlight: colColors.border },
            smooth: { type: 'curvedCW', roundness: 0.2 }
          });
          matchedTables.push({ tableName, tableLabel, domain, totalCount, matchingCols, svcNo: svcNoMap[tableName] || tableName });

          sampleRows.forEach((row, idx) => {
            const leafId = `LEAF_${tableName}_${idx}`;
            const valStr = String(row.val || '');
            nodes.push({
              id: leafId, label: valStr, shape: 'dot', size: 10,
              color: { background: colColors.light, border: colColors.bg, highlight: { background: '#ffffff', border: colColors.border } },
              font: { size: 8, color: '#1e293b', face: 'Malgun Gothic' },
              borderWidth: 2, level: 2, fullData: JSON.stringify(row).substring(0, 300)
            });
            edges.push({
              from: `TABLE_${tableName}`, to: leafId, width: 1,
              color: { color: colColors.light + 'cc' },
              dashes: true,
              smooth: { type: 'dynamic' }
            });
            allLeafNodes.push({ table: tableName, col: bestCol.col, val: row.val, row });
          });
        }
      }

      const responseData = {
        keyword: rawKeyword,
        tableCount: matchedTables.length,
        totalLeafCount: allLeafNodes.length,
        nodes,
        edges,
        matchedTables
      };

      datamapCache[cacheKey] = { timestamp: Date.now(), data: responseData };
      res.json(responseData);
    } catch (err) {
      logger.error({ err }, '[keyword-datamap] 처리 중 오류가 발생했습니다.');
      res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
    }
  });

  return router;
};
