const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const REAL_API_KEY = '77183c01c07d44798948';

const app = express();
const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'foodsafety.db');

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB 연결
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('SQLite 데이터베이스 연결 실패:', err.message);
  } else {
    console.log('SQLite 데이터베이스에 성공적으로 연결되었습니다:', DB_PATH);
  }
});

// 1. DB 테이블 목록 조회 API (뷰(View)도 포함하여 조회 가능하도록 고도화)
app.get('/api/tables', (req, res) => {
  const query = `
    SELECT name 
    FROM sqlite_master 
    WHERE (type='table' OR type='view') AND name NOT LIKE 'sqlite_%'
    ORDER BY name;
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('테이블 목록 조회 중 오류:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows.map(row => row.name));
  });
});

// 2. 특정 테이블 스키마 조회 API
app.get('/api/tables/:tableName/schema', (req, res) => {
  const { tableName } = req.params;
  // SQL Injection 방지를 위해 알파벳, 숫자, 언더바만 허용하도록 테이블명 검증
  if (!/^[a-zA-Z0-9_-]+$/.test(tableName)) {
    return res.status(400).json({ error: '유효하지 않은 테이블 명입니다.' });
  }

  const query = `PRAGMA table_info("${tableName}");`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(`${tableName} 스키마 조회 중 오류:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 3. 특정 테이블 실시간 상위 데이터 조회 API
app.get('/api/tables/:tableName/data', (req, res) => {
  const { tableName } = req.params;
  const limit = req.query.limit;

  if (!/^[a-zA-Z0-9_-]+$/.test(tableName)) {
    return res.status(400).json({ error: '유효하지 않은 테이블 명입니다.' });
  }

  let query = `SELECT * FROM "${tableName}"`;
  const params = [];

  if (limit && limit !== 'all') {
    query += ` LIMIT ?;`;
    params.push(parseInt(limit, 10));
  } else {
    query += `;`;
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(`${tableName} 데이터 조회 중 오류:`, err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 4. 임의의 SQL 쿼리 실행 API
app.post('/api/query', (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '쿼리 내용이 비어 있습니다.' });
  }

  console.log('실행 요청된 SQL 쿼리:', query);

  // SELECT 등 조회 쿼리에만 대응하도록 간단히 체크 (데이터 훼손 방지)
  const trimmed = query.trim().toUpperCase();
  if (trimmed.startsWith('INSERT') || trimmed.startsWith('UPDATE') || trimmed.startsWith('DELETE') || trimmed.startsWith('DROP')) {
    return res.status(403).json({ error: '안전을 위해 조회(SELECT, PRAGMA) 목적의 쿼리만 실행이 허용됩니다.' });
  }

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('SQL 실행 오류:', err.message);
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 5. 실제 식약처 OpenAPI 규격 에뮬레이터 API (168종 전체 지원)
app.get('/api/:keyId/:serviceId/:dataType/:startIdx/:endIdx', (req, res) => {
  const { keyId, serviceId, dataType, startIdx, endIdx } = req.params;

  // 서비스 ID(테이블명) 검증 (알파벳, 숫자, 하이픈 등)
  if (!/^[a-zA-Z0-9_-]+$/.test(serviceId)) {
    return res.status(400).json({ error: '유효하지 않은 서비스 ID(테이블명)입니다.' });
  }

  const start = parseInt(startIdx, 10);
  const end = parseInt(endIdx, 10);

  if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({
      error: '요청 시작/종료 인덱스 범위가 올바르지 않습니다. (1 이상의 양수이며 startIdx <= endIdx 여야 합니다)'
    });
  }

  const limit = end - start + 1;
  const offset = start - 1;

  // 1. 해당 테이블 전체 건수 조회
  const countQuery = `SELECT COUNT(*) AS total FROM "${serviceId}";`;
  db.get(countQuery, [], (err, countRow) => {
    if (err) {
      console.error(`${serviceId} 총 건수 조회 오류:`, err.message);
      const errorResult = {};
      errorResult[serviceId] = {
        total_count: "0",
        row: [],
        RESULT: {
          MSG: `해당 서비스 ID(${serviceId})에 매칭되는 DB 테이블이 없거나 조회할 수 없습니다.`,
          CODE: 'ERROR-500'
        }
      };
      return res.status(500).json(errorResult);
    }

    const totalCount = countRow ? countRow.total : 0;

    // 2. 실제 데이터 페이징 조회 (SQLite LIMIT/OFFSET 변환)
    const dataQuery = `SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`;
    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) {
        console.error(`${serviceId} 데이터 페이징 조회 오류:`, err.message);
        const errorResult = {};
        errorResult[serviceId] = {
          total_count: "0",
          row: [],
          RESULT: {
            MSG: err.message,
            CODE: 'ERROR-500'
          }
        };
        return res.status(500).json(errorResult);
      }

      // 3. 식약처 OpenAPI 응답 JSON 규격 100% 동일화 설계
      const openApiResult = {};
      openApiResult[serviceId] = {
        total_count: String(totalCount),
        row: rows,
        RESULT: {
          MSG: '정상처리되었습니다.',
          CODE: 'INFO-000'
        }
      };

      res.json(openApiResult);
    });
  });
});

// 6. 실제 외부 식약처 실시간 라이브 OpenAPI 프록시 API (168종 전체 지원)
app.get('/api/external/:serviceId/:dataType/:startIdx/:endIdx', async (req, res) => {
  const { serviceId, dataType, startIdx, endIdx } = req.params;
  const externalUrl = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${serviceId}/${dataType}/${startIdx}/${endIdx}`;
  console.log(`[실시간 외부 식약처 OpenAPI 호출] URL: ${externalUrl}`);

  try {
    const response = await fetch(externalUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`식약처 공식 서버 응답 실패 (HTTP Status: ${response.status})`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.warn(`[외부 API 실시간 호출 실패 -> 로컬 DB Fallback 자동 작동] 사유: ${err.message}`);
    
    // 외부 식약처 서버 장애나 인터넷 단선 시 로컬 SQLite 백업에서 긁어와(Fallback) 서비스 무중단 제공!
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
            MSG: `[실시간 하이브리드 연동] 외부 API 서버 장애로 인해 로컬 SQLite 백업 데이터에서 자동 대체되었습니다. (${err.message})`,
            CODE: 'WARN-200'
          }
        };
        res.json(fallbackResult);
      });
    });
  }
});

// 프론트엔드 정적 리소스 서빙
app.use(express.static(__dirname));

// 서버 구동
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` 식품안전나라 통합 DB 웹 앱 서비스가 작동 중입니다.`);
  console.log(` 포트 번호: http://localhost:${PORT}`);
  console.log(`==================================================`);
});

// 프로세스 종료 시 DB 연결 해제
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('DB 종료 오류:', err.message);
    } else {
      console.log('SQLite DB 연결이 성공적으로 닫혔습니다.');
    }
    process.exit(0);
  });
});
