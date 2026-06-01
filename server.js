const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const REAL_API_KEY = '77183c01c07d44798948';

const app = express();
const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'db', 'foodsafety.db');

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

// 5. 실제 식약처 OpenAPI 규격 에뮬레이터 API (168종 전체 지원) -> 직접 식약처 실시간 호출로 전격 개조!
app.get('/api/:keyId/:serviceId/:dataType/:startIdx/:endIdx', async (req, res) => {
  const { keyId, serviceId, dataType, startIdx, endIdx } = req.params;

  // 서비스 ID(테이블명) 검증
  if (!/^[a-zA-Z0-9_-]+$/.test(serviceId)) {
    return res.status(400).json({ error: '유효하지 않은 서비스 ID(테이블명)입니다.' });
  }

  // 4대 융합 뷰(v_...)인 경우에만 예외적으로 로컬 DB에서 처리 (원격 식약처 서버에는 융합 뷰가 없으므로!)
  if (serviceId.startsWith('v_')) {
    const start = parseInt(startIdx, 10) || 1;
    const end = parseInt(endIdx, 10) || 10;
    const limit = end - start + 1;
    const offset = start - 1;

    const countQuery = `SELECT COUNT(*) AS total FROM "${serviceId}";`;
    db.get(countQuery, [], (err, countRow) => {
      if (err) {
        console.error(`${serviceId} 융합 뷰 총 건수 조회 오류:`, err.message);
        const errorResult = {};
        errorResult[serviceId] = { total_count: "0", row: [], RESULT: { MSG: err.message, CODE: 'ERROR-500' } };
        return res.status(500).json(errorResult);
      }
      const totalCount = countRow ? countRow.total : 0;
      const dataQuery = `SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`;
      db.all(dataQuery, [limit, offset], (err, rows) => {
        if (err) {
          console.error(`${serviceId} 융합 뷰 데이터 조회 오류:`, err.message);
          const errorResult = {};
          errorResult[serviceId] = { total_count: "0", row: [], RESULT: { MSG: err.message, CODE: 'ERROR-500' } };
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

  // 그 외 모든 표준 테이블은 식약처 공식 실시간 OpenAPI 서버를 직접 호출!
  const externalUrl = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${serviceId}/${dataType}/${startIdx}/${endIdx}`;
  console.log(`[에뮬레이터 -> 다이렉트 외부 식약처 OpenAPI 호출] URL: ${externalUrl}`);

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

    if (dataType.toLowerCase() === 'xml') {
      const xmlData = await response.text();
      res.set('Content-Type', 'application/xml');
      return res.send(xmlData);
    } else {
      const data = await response.json();
      return res.json(data);
    }
  } catch (err) {
    console.warn(`[다이렉트 API 호출 실패 -> 로컬 DB Fallback 자동 작동] 사유: ${err.message}`);
    
    // 외부 식약처 서버 장애나 네트워크 단선 시 로컬 SQLite 백업에서 긁어와(Fallback) 서비스 무중단 제공!
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
        return res.json(fallbackResult);
      });
    });
  }
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

// 7. PK/FK 관계 데이터 조회 API (데이터맵 동적 연동용)
app.get('/api/relationships', (req, res) => {
  const jsonPath = path.join(__dirname, 'db', 'foodsafety_key_candidates.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      res.json(data.relationships || []);
    } catch (err) {
      res.status(500).json({ error: '관계 데이터 파일을 읽는 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(404).json({ error: '관계 데이터 분석 결과가 존재하지 않습니다.' });
  }
});

// 8. OpenAPI 실시간 전체 스캔 및 조인 기능 (SSE - Server-Sent Events)
app.get('/api/live-join-stream', async (req, res) => {
  const { tableA, tableB, joinKey } = req.query;

  // SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent({ type: 'status', message: `[1/4] ${tableA}, ${tableB} 데이터 총 건수 조회 중...` });

    const fetchTotalCount = async (tableName) => {
      if(tableName.startsWith('v_')) throw new Error("융합 뷰는 로컬 전용이므로 외부 실시간 조인에서 제외됩니다.");
      const url = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${tableName}/json/1/1`;
      const response = await fetch(url);
      const data = await response.json();
      if (data[tableName] && data[tableName].total_count) {
        return parseInt(data[tableName].total_count, 10);
      }
      return 0;
    };

    const totalA = await fetchTotalCount(tableA);
    const totalB = await fetchTotalCount(tableB);

    if (totalA === 0 || totalB === 0) {
      throw new Error(`데이터 건수가 0건이거나 API 호출에 실패했습니다. (${tableA}: ${totalA}, ${tableB}: ${totalB})`);
    }

    sendEvent({ type: 'status', message: `[2/4] 총 건수 확인 완료 (${tableA}: ${totalA}건, ${tableB}: ${totalB}건). 데이터 적재 시작...` });

    const fetchAllData = async (tableName, totalCount) => {
      const allRows = [];
      const batchSize = 1000;
      // 외부 서버 부하 및 차단(WAF) 방지를 위해 최대 1000건까지만 제한적으로 가져오도록 수정
      const safeTotalCount = Math.min(totalCount, 1000);
      const parallelLimit = 8;
      
      let promises = [];
      for (let start = 1; start <= safeTotalCount; start += batchSize) {
        const end = Math.min(start + batchSize - 1, safeTotalCount);
        const url = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${tableName}/json/${start}/${end}`;
        
        const fetchPromise = fetch(url).then(r => r.json()).then(data => {
          if (data[tableName] && data[tableName].row) {
            allRows.push(...data[tableName].row);
          }
          sendEvent({ type: 'progress', table: tableName, fetched: allRows.length, total: safeTotalCount });
        }).catch(err => {
          console.error(`Fetch error for ${tableName}:`, err);
        });

        promises.push(fetchPromise);

        if (promises.length >= parallelLimit) {
          await Promise.all(promises);
          promises = [];
        }
      }
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      return allRows;
    };

    sendEvent({ type: 'status', message: `[3/4] ${tableA} 및 ${tableB} 전체 데이터를 병렬 크롤링 중입니다. (대기 시간이 수 분 이상 소요될 수 있습니다)` });
    
    // 테이블 단위 순차 수집 (병렬 수집 시 서버 및 대역폭 과부하 방지)
    const dataA = await fetchAllData(tableA, totalA);
    const dataB = await fetchAllData(tableB, totalB);

    sendEvent({ type: 'status', message: `[4/4] 수집 완료. 서버 메모리에서 '${joinKey}' 기준으로 Inner Join 연산을 수행 중...` });

    // Inner Join 로직
    const joinedData = [];
    const mapB = new Map();

    dataB.forEach(row => {
      const keyVal = row[joinKey];
      if (keyVal) {
        if(!mapB.has(keyVal)) mapB.set(keyVal, []);
        mapB.get(keyVal).push(row);
      }
    });

    dataA.forEach(rowA => {
      const keyVal = rowA[joinKey];
      if (keyVal && mapB.has(keyVal)) {
        const matchedRowsB = mapB.get(keyVal);
        matchedRowsB.forEach(rowB => {
          // 컬럼명 충돌 방지를 위해 접두어 추가
          const merged = {};
          Object.keys(rowA).forEach(k => merged[`${tableA}_${k}`] = rowA[k]);
          Object.keys(rowB).forEach(k => merged[`${tableB}_${k}`] = rowB[k]);
          joinedData.push(merged);
        });
      }
    });

    const maxTransfer = 1000;
    sendEvent({ 
      type: 'complete', 
      totalMatched: joinedData.length, 
      result: joinedData.slice(0, maxTransfer),
      message: `성공적으로 ${joinedData.length}건이 매칭되었습니다. (브라우저 보호를 위해 상위 ${maxTransfer}건만 화면에 전송합니다)`
    });
    res.end();

  } catch (err) {
    console.error("SSE 조인 에러:", err);
    sendEvent({ type: 'error', message: err.message });
    res.end();
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
