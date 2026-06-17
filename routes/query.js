/**
 * routes/query.js
 * 화면 시안에서 사용하는 조회/분석성 API 라우트
 * - GET /api/join-scenarios
 *     → db/join.sql에 작성된 추천 JOIN 시나리오를 파싱해 반환
 * - POST /api/query
 *     → SQL Playground, ERD, 관계도에서 사용하는 읽기 전용 SQL 실행
 * - GET /api/relationships
 *     → analyze_pk_fk.js 산출물 기반 PK/FK 후보 관계 반환
 * - GET /api/super-converge-search
 *     → 바코드/품목보고번호/인허가번호 기준으로 업체·제품·영양·HACCP·행정처분 통합 조회
 * - GET /api/keyword-datamap
 *     → 키워드가 실제 데이터 어느 테이블/컬럼에서 발견되는지 그래프 데이터로 반환
 *
 * ⚠️ /api/query는 사용자 입력 SQL을 받기 때문에 SELECT, EXPLAIN, 일부 PRAGMA만 허용합니다.
 *     LIMIT 없는 SELECT는 최대 1000행으로 자동 제한합니다.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = (db, dbAll, logger, readonlyDb) => {
  // join.sql은 파일 파싱 비용이 있으므로 최초 1회 읽은 결과를 메모리에 캐시한다.
let _joinScenariosCache = null;

// 추천 JOIN 시나리오 목록 API.
// 주석으로 작성된 설명부와 SQL 본문을 분리해서 프론트에서 바로 표시할 수 있는 형태로 만든다.
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

// 읽기 전용 SQL 실행 API.
// 화면 시안에서 자유 쿼리와 ERD 확인에 사용되므로 SELECT/EXPLAIN/일부 PRAGMA만 허용한다.
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
  // PK/FK 관계 후보도 정적 분석 결과 JSON을 읽기 때문에 메모리에 캐시한다.
  let _relationshipsCache = null;

  // 데이터 관계도/ERD 화면에서 사용하는 관계 후보 목록 API.
  // analyze_pk_fk.js가 생성한 foodsafety_key_candidates.json을 읽어 relationships 배열만 반환한다.
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
  // 통합 검색 API.
  // 바코드 -> 품목보고번호 -> 인허가번호 순서로 단서를 확장해 업체, 제품, 영양, HACCP, 행정처분을 묶어준다.
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
  // 키워드 데이터맵은 전체 테이블/컬럼을 훑는 비용이 커서 짧은 TTL 캐시를 둔다.
  // 같은 키워드와 AND/OR 조건으로 반복 조회하면 캐시된 그래프 데이터를 바로 반환한다.
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

  // 키워드가 포함된 테이블과 컬럼을 찾아 vis-network용 nodes/edges로 변환한다.
  // 프론트의 "키워드 시각화" 탭에서 중심 노드, 테이블 노드, 샘플 데이터 노드를 그릴 때 사용된다.
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

    // 입력 키워드는 세미콜론으로 나누며, 명시 연산자가 없으면 defaultOp로 이어 붙인다.
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
      // 실제 데이터 테이블만 스캔하고, api_tables/api_columns 같은 메타 테이블은 제외한다.
      const tables = await dbAll(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables', 'api_columns')`);

      // api_tables의 서비스명/카테고리를 이용해 테이블 라벨과 색상 도메인을 보강한다.
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

      // nodes/edges는 프론트 그래프 라이브러리가 바로 소비할 수 있는 형태로 누적한다.
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

      // 테이블 수가 많으므로 일정 개수씩 병렬 처리해 응답 시간을 줄인다.
      const BATCH_SIZE = 20;
      const processTable = async (tableName) => {
        let columns = [];
        try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch (e) { return null; }
        if (!columns.length) return null;

        // 각 컬럼을 TEXT로 변환해 키워드 포함 여부를 확인한다.
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

        // 가장 많이 매칭된 컬럼 기준으로 샘플 행을 가져와 하위 노드로 표시한다.
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
