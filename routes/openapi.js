/**
 * routes/openapi.js
 * 식약처 OpenAPI 프록시 라우트
 * - GET /api/:keyId/:serviceId/:dataType/:startIdx/:endIdx
 *     → v_ 융합뷰는 로컬 DB, 나머지는 외부 식약처 API 직접 호출 (장애 시 로컬 Fallback)
 * - GET /api/external/:serviceId/:dataType/:startIdx/:endIdx
 *     → 외부 식약처 API 직접 프록시 (장애 시 로컬 Fallback)
 *
 * ⚠️ 이 라우터는 반드시 다른 모든 /api/* 라우터보다 나중에 등록해야 합니다.
 *     /:keyId/:serviceId/... 패턴이 구체적 경로보다 먼저 매칭될 수 있습니다.
 */

const express = require('express');
const router = express.Router();

module.exports = (db, logger, REAL_API_KEY) => {

  // 5. 식약처 OpenAPI 에뮬레이터 (v_ 뷰 → 로컬, 나머지 → 외부 실시간)
  router.get('/:keyId/:serviceId/:dataType/:startIdx/:endIdx', async (req, res) => {
    const { keyId, serviceId, dataType, startIdx, endIdx } = req.params;

    if (!/^[a-zA-Z0-9_-]+$/.test(serviceId)) {
      return res.status(400).json({ error: '유효하지 않은 서비스 ID(테이블명)입니다.' });
    }

    // 4대 융합 뷰(v_...)는 로컬 DB에서 처리
    if (serviceId.startsWith('v_')) {
      const start = parseInt(startIdx, 10) || 1;
      const end = parseInt(endIdx, 10) || 10;
      const limit = end - start + 1;
      const offset = start - 1;

      db.get(`SELECT COUNT(*) AS total FROM "${serviceId}";`, [], (err, countRow) => {
        if (err) {
          logger.error({ err, serviceId }, '융합 뷰 총 건수 조회 중 오류가 발생했습니다.');
          const errorResult = {};
          errorResult[serviceId] = { total_count: '0', row: [], RESULT: { MSG: '서버 내부 오류가 발생했습니다.', CODE: 'ERROR-500' } };
          return res.status(500).json(errorResult);
        }
        const totalCount = countRow ? countRow.total : 0;
        db.all(`SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`, [limit, offset], (err, rows) => {
          if (err) {
            logger.error({ err, serviceId }, '융합 뷰 데이터 조회 중 오류가 발생했습니다.');
            const errorResult = {};
            errorResult[serviceId] = { total_count: '0', row: [], RESULT: { MSG: '서버 내부 오류가 발생했습니다.', CODE: 'ERROR-500' } };
            return res.status(500).json(errorResult);
          }
          const openApiResult = {};
          openApiResult[serviceId] = {
            total_count: String(totalCount),
            row: rows,
            RESULT: { MSG: '정상처리되었습니다. (로컬 융합 뷰)', CODE: 'INFO-000' }
          };
          return res.json(openApiResult);
        });
      });
      return;
    }

    // 표준 테이블: 외부 식약처 API 직접 호출
    const externalUrl = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${serviceId}/${dataType}/${startIdx}/${endIdx}`;
    logger.info({ url: externalUrl }, '에뮬레이터 -> 다이렉트 외부 식약처 OpenAPI 호출');

    try {
      const response = await fetch(externalUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`식약처 공식 서버 응답 실패 (HTTP Status: ${response.status})`);
      }

      if (dataType.toLowerCase() === 'xml') {
        const xmlData = await response.text();
        res.set('Content-Type', 'application/xml');
        return res.send(xmlData);
      } else {
        const data = await response.json();
        return res.json(data);
      }
    } catch (err) {
      logger.warn({ err }, '다이렉트 API 호출 실패 -> 로컬 DB Fallback 자동 작동');

      const start = parseInt(startIdx, 10) || 1;
      const end = parseInt(endIdx, 10) || 5;
      const limit = end - start + 1;
      const offset = start - 1;

      db.get(`SELECT COUNT(*) AS total FROM "${serviceId}";`, [], (cErr, countRow) => {
        const totalCount = countRow ? countRow.total : 0;
        db.all(`SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`, [limit, offset], (dErr, rows) => {
          const fallbackResult = {};
          fallbackResult[serviceId] = {
            total_count: String(totalCount),
            row: rows || [],
            RESULT: {
              MSG: '[실시간 하이브리드 연동] 외부 API 서버 장애로 인해 로컬 SQLite 백업 데이터에서 자동 대체되었습니다.',
              CODE: 'WARN-200'
            }
          };
          return res.json(fallbackResult);
        });
      });
    }
  });

  // 6. 외부 식약처 실시간 라이브 OpenAPI 직접 프록시
  router.get('/external/:serviceId/:dataType/:startIdx/:endIdx', async (req, res) => {
    const { serviceId, dataType, startIdx, endIdx } = req.params;
    const externalUrl = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${serviceId}/${dataType}/${startIdx}/${endIdx}`;
    logger.info({ url: externalUrl }, '실시간 외부 식약처 OpenAPI 호출');

    try {
      const response = await fetch(externalUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`식약처 공식 서버 응답 실패 (HTTP Status: ${response.status})`);
      }

      const data = await response.json();
      res.json(data);
    } catch (err) {
      logger.warn({ err }, '외부 API 실시간 호출 실패 -> 로컬 DB Fallback 자동 작동');

      const start = parseInt(startIdx, 10) || 1;
      const end = parseInt(endIdx, 10) || 5;
      const limit = end - start + 1;
      const offset = start - 1;

      db.get(`SELECT COUNT(*) AS total FROM "${serviceId}";`, [], (cErr, countRow) => {
        const totalCount = countRow ? countRow.total : 0;
        db.all(`SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`, [limit, offset], (dErr, rows) => {
          const fallbackResult = {};
          fallbackResult[serviceId] = {
            total_count: String(totalCount),
            row: rows || [],
            RESULT: {
              MSG: '[실시간 하이브리드 연동] 외부 API 서버 장애로 인해 로컬 SQLite 백업 데이터에서 자동 대체되었습니다.',
              CODE: 'WARN-200'
            }
          };
          res.json(fallbackResult);
        });
      });
    }
  });

  return router;
};
