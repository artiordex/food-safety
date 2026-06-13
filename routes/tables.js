/**
 * routes/tables.js
 * /api/tables/* 관련 라우트 모음
 * - GET /api/tables            — 전체 테이블 목록 (논리명 포함)
 * - GET /api/tables/:name/schema       — 특정 테이블 컬럼 스키마
 * - GET /api/tables/:name/data         — 특정 테이블 상위 데이터
 * - GET /api/tables/:name/keyword-count — 키워드 포함 레코드 수
 */

const express = require('express');
const router = express.Router();

// db, dbAll, logger는 server.js에서 주입
module.exports = (db, dbAll, logger) => {

  // tableName 검증 공통 함수
  const validateTableName = (tableName, res) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(tableName)) {
      res.status(400).json({ error: '유효하지 않은 테이블 명입니다.' });
      return false;
    }
    return true;
  };

  // 1. 전체 테이블 목록
  router.get('/', (req, res) => {
    const query = `
      SELECT m.name, a.svc_nm AS logical_name
      FROM sqlite_master m
      LEFT JOIN api_tables a ON m.name = a.svc_no
      WHERE m.type = 'table' AND m.name NOT LIKE 'sqlite_%' AND m.name NOT LIKE 'v_%'
      ORDER BY m.name;
    `;
    db.all(query, [], (err, rows) => {
      if (err) {
        logger.error({ err }, '테이블 목록 조회 중 오류가 발생했습니다.');
        return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
      res.json(rows.map(row => ({
        name: row.name,
        logicalName: row.logical_name || row.name
      })));
    });
  });

  // 2. 특정 테이블 스키마
  router.get('/:tableName/schema', (req, res) => {
    const { tableName } = req.params;
    if (!validateTableName(tableName, res)) return;

    db.all(`PRAGMA table_info("${tableName}");`, [], (err, rows) => {
      if (err) {
        logger.error({ err, tableName }, '스키마 조회 중 오류가 발생했습니다.');
        return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
      res.json(rows);
    });
  });

  // 3. 특정 테이블 상위 데이터
  router.get('/:tableName/data', (req, res) => {
    const { tableName } = req.params;
    if (!validateTableName(tableName, res)) return;

    const limit = req.query.limit;
    let query = `SELECT * FROM "${tableName}"`;
    const params = [];

    if (limit && limit !== 'all') {
      query += ` LIMIT ?;`;
      params.push(parseInt(limit, 10));
    } else {
      query += ';';
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        logger.error({ err, tableName }, '데이터 조회 중 오류가 발생했습니다.');
        return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
      res.json(rows);
    });
  });

  // 4. 키워드 포함 레코드 수
  router.get('/:tableName/keyword-count', async (req, res) => {
    const { tableName } = req.params;
    const { keyword } = req.query;
    if (!keyword) return res.json({ count: 0 });
    if (!validateTableName(tableName, res)) return;

    try {
      const columns = await dbAll(`PRAGMA table_info("${tableName}")`);
      if (!columns.length) return res.json({ count: 0 });

      const conditions = columns.map(c => `CAST("${c.name}" AS TEXT) LIKE ?`).join(' OR ');
      const params = columns.map(() => `%${keyword}%`);
      const sql = `SELECT COUNT(*) AS cnt FROM "${tableName}" WHERE ${conditions}`;

      const rows = await dbAll(sql, params);
      res.json({ count: rows[0].cnt || 0 });
    } catch (err) {
      logger.error({ err, tableName }, 'keyword-count 조회 중 오류가 발생했습니다.');
      res.json({ count: 0 });
    }
  });

  return router;
};
