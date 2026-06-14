require('dotenv').config();
process.env.LANG = 'en_US.UTF-8';

const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const pino = require('pino');
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

const REAL_API_KEY = process.env.FOOD_API_KEY || '';
if (!REAL_API_KEY) {
  logger.error('FOOD_API_KEY 환경변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

// HTML 파일에 head/header/search include를 주입하는 공통 함수
function applyIncludes(html, vars = {}) {
  const includesDir = path.join(__dirname, 'public/includes');
  // 치환 전 플레이스홀더 존재 여부를 미리 기록
  const hadFooter = html.includes('<!-- INCLUDE_FOOTER -->');
  const hadMenuModal = html.includes('<!-- INCLUDE_MENU_MODAL -->');
  const replacements = [
    { placeholder: '<!-- INCLUDE_HEAD -->', file: 'head.html', transform: c => c.replace(/<head>/i, '').replace(/<\/head>/i, '') },
    { placeholder: '<!-- INCLUDE_HEAD_SEARCH -->', file: 'head_search.html', transform: c => c.replace(/<head>/i, '').replace(/<\/head>/i, '') },
    { placeholder: '<!-- INCLUDE_HEADER -->', file: 'header.html', transform: c => c },
    { placeholder: '<!-- INCLUDE_HERO -->', file: 'hero.html', transform: c => c },
    { placeholder: '<!-- INCLUDE_MAIN_BOARD -->', file: 'mainBoard.html', transform: c => c },
    { placeholder: '<!-- INCLUDE_FOOTER -->', file: 'footer.html', transform: c => c },
    { placeholder: '<!-- INCLUDE_SEARCH -->', file: 'search.html', transform: c => c },
    { placeholder: '<!-- INCLUDE_MENU_MODAL -->', file: 'menu_modal.html', transform: c => c },
  ];
  for (const { placeholder, file, transform } of replacements) {
    if (html.includes(placeholder)) {
      const filePath = path.join(includesDir, file);
      if (fs.existsSync(filePath)) {
        html = html.replace(placeholder, transform(fs.readFileSync(filePath, 'utf8')));
      }
    }
  }
  // INCLUDE_FOOTER 미선언 페이지에도 자동 주입 (</body> 직전, NO_FOOTER 마커 제외)
  const noFooter = html.includes('<!-- NO_FOOTER -->');
  html = html.replace('<!-- NO_FOOTER -->', '');
  if (!hadFooter && !noFooter && html.includes('</body>')) {
    const footerPath = path.join(includesDir, 'footer.html');
    if (fs.existsSync(footerPath)) {
      html = html.replace('</body>', fs.readFileSync(footerPath, 'utf8') + '\n</body>');
    }
  }
  // INCLUDE_MENU_MODAL 미선언 페이지에도 자동 주입 (</body> 직전)
  if (!hadMenuModal && html.includes('</body>')) {
    const menuModalPath = path.join(includesDir, 'menu_modal.html');
    if (fs.existsSync(menuModalPath)) {
      html = html.replace('</body>', fs.readFileSync(menuModalPath, 'utf8') + '\n</body>');
    }
  }
  // 템플릿 변수 치환 (미지정 변수는 빈 문자열로)
  html = html.replace(/\[\[KEYWORD\]\]/g, vars.keyword || '');
  return html;
}

const app = express();

// API Rate Limiting — IP당 분당 100회 초과 시 429 반환
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1분
  max: 100,                   // 최대 100회
  standardHeaders: true,      // RateLimit-* 헤더 포함
  legacyHeaders: false,
  message: { error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' }
});
app.use('/api/', apiLimiter);

// CORS — 개발 환경(localhost)과 배포 도메인만 허용
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:8000').split(',');
app.use(cors({
  origin: (origin, callback) => {
    // origin이 없는 경우(같은 서버 요청, curl 등) 허용
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS 정책에 의해 차단된 요청입니다.'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

let _tableCountsMap = {};
function initTableCounts() {
  db.all("SELECT name FROM sqlite_master WHERE type IN ('table', 'view')", [], (err, tables) => {
    if (err) return;
    tables.forEach(t => {
      db.get(`SELECT COUNT(*) as cnt FROM "${t.name}"`, [], (err, row) => {
        if (!err && row) _tableCountsMap[t.name] = row.cnt;
      });
    });
  });
}

const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'db', 'foodsafety.db');

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB 연결
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    logger.error({ err }, 'SQLite DB 연결 오류 (서버 시작 전)');
  } else {
    logger.info('SQLite DB 연결 성공');
    db.serialize(() => {
      db.run('PRAGMA journal_mode = WAL;');
      db.run('PRAGMA synchronous = NORMAL;');
      db.run('PRAGMA cache_size = -10000;');
    });
    initTableCounts(); // 추가됨
  }
});

const readonlyDb = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    logger.error({ err }, 'SQLite Read-Only DB 연결 오류 (서버 시작 전)');
  } else {
    logger.info('SQLite Read-Only DB 연결 성공');
    readonlyDb.serialize(() => {
      readonlyDb.run('PRAGMA journal_mode = WAL;');
      readonlyDb.run('PRAGMA synchronous = NORMAL;');
      readonlyDb.run('PRAGMA cache_size = -10000;');
    });
  }
});

// ── 모듈 레벨 DB 헬퍼 (라우트 핸들러에서 공통 사용) ──────────────────────────
// db.all을 Promise로 래핑 — 읽기/쓰기 가능 연결
const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
});
// readonlyDb.all을 Promise로 래핑 — 읽기 전용 연결
const readonlyDbAll = (sql, params = []) => new Promise((resolve, reject) => {
  readonlyDb.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
});

// ── 라우터 마운트 ─────────────────────────────────────────────────────────────
const tablesRouter = require('./routes/tables')(db, dbAll, logger);

// 분리된 라우터 마운트
app.use('/api', require('./routes/query')(db, dbAll, logger));
app.use('/api', require('./routes/datasets')(db, dbAll, logger));
app.use('/api', require('./routes/stream')(db, dbAll, logger));

app.use('/api/tables', tablesRouter);

// 1. DB 테이블 목록 조회 API (뷰(View) 제외 및 논리명 매핑 추가)



// 4. 임의의 SQL 쿼리 실행 API


// 4.1 통합 데이터 검색 페이지 서빙 (datasetAllSearch.do)
app.post('/api/datasetAllSearch.do', (req, res) => {
  const keyword = req.body.search_keyword || '';
  const html = fs.readFileSync(path.join(__dirname, 'public/includes/search.html'), 'utf8');
  res.send(applyIncludes(html, { keyword }));
});

app.get('/api/datasetAllSearch.do', (req, res) => {
  const keyword = req.query.search_keyword || '';
  const html = fs.readFileSync(path.join(__dirname, 'public/includes/search.html'), 'utf8');
  res.send(applyIncludes(html, { keyword }));
});

// 4.2a 카테고리 목록 API
app.get('/api/categoryList.do', (req, res) => {
  db.all(`SELECT DISTINCT cat, COUNT(*) as cnt FROM api_tables WHERE cat IS NOT NULL AND cat != '' GROUP BY cat ORDER BY cnt DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
    res.json(rows.map(r => ({ cat: r.cat, cnt: r.cnt })));
  });
});


// crawl_cache 맵 (svc_no → { provd_instt_nm, data_type_nm })
let _cacheMap = null;
function getCacheMap() {
  if (_cacheMap) return _cacheMap;
  _cacheMap = {};
  try {
    const cachePath = path.join(__dirname, 'crawler', 'crawl_cache.json');
    if (fs.existsSync(cachePath)) {
      JSON.parse(fs.readFileSync(cachePath, 'utf8')).forEach(item => {
        if (item.svc_no) _cacheMap[String(item.svc_no)] = {
          provd_instt_nm: item.provd_instt_nm || '식품의약품안전처',
          data_type_nm: (item.data_type_nm || 'XML/JSON').toUpperCase()
        };
      });
    }
  } catch (e) { }
  return _cacheMap;
}

// 제공기관 목록 API
app.get('/api/providerList.do', (req, res) => {
  const map = getCacheMap();
  const providers = [...new Set(Object.values(map).map(v => v.provd_instt_nm))].sort();
  res.json({ list: providers });
});

// 데이터구조 검색 API (/ajax/datasetSearch.do 로컬 대체)
app.post('/api/search', (req, res) => {
  const svcTypeCode = (req.body.search_svcTypeCode || '').trim(); // API_TYPE05=Link, API_TYPE06=XML/JSON
  const clCdCode = (req.body.search_clCdCode || '').trim();
  const provdInsttCode = (req.body.search_provdInsttCode || '').trim();

  let query = 'SELECT svc_no, svc_nm, cat FROM api_tables WHERE 1=1';
  const params = [];
  if (clCdCode) { query += ' AND cat = ?'; params.push(clCdCode); }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });

    const HIDDEN = new Set(['품목제조보고번호유효성확인(대한상공회의소사용)', '불량식품 신고이력 조회(내부용)', '불량식품 신고정보 조회(내부용)']);
    const cacheMap = getCacheMap();

    const dataStrutList = rows
      .filter(row => !HIDDEN.has(row.svc_nm))
      .filter(row => {
        const info = cacheMap[String(row.svc_no)] || {};
        const typeNm = info.data_type_nm || 'XML/JSON';
        if (svcTypeCode === 'API_TYPE05' && typeNm !== 'LINK') return false;
        if (svcTypeCode === 'API_TYPE06' && typeNm !== 'XML/JSON') return false;
        if (svcTypeCode === 'API_TYPE03') return false;
        const provd = info.provd_instt_nm || '식품의약품안전처';
        if (provdInsttCode && provd !== provdInsttCode) return false;
        return true;
      })
      .map(row => {
        const info = cacheMap[String(row.svc_no)] || {};
        const typeNm = info.data_type_nm || 'XML/JSON';
        return {
          provd_instt_nm: info.provd_instt_nm || '식품의약품안전처',
          cl_cd_nm: row.cat || '',
          svc_nm: row.svc_nm || '',
          svc_no: row.svc_no || '',
          svc_type_cd: typeNm === 'LINK' ? 'API_TYPE05' : 'API_TYPE06'
        };
      });

    res.json({ dataStrutList });
  });
});

// 4.2 통합 데이터 검색 결과 API (searchDatasetList.do)
app.post('/api/searchDatasetList.do', (req, res) => {
  const keyword = (req.body.search_keyword || '').trim();
  const catFilter = (req.body.search_clCdCode || '').trim();
  const typeFilter = (req.body.search_svcTypeCode || '').trim();
  const provdFilter = (req.body.search_provdInsttCode || '').trim();

  db.all('SELECT svc_no, svc_nm, cat, description FROM api_tables', [], (err, rows) => {
    if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });

    const cacheMap = getCacheMap();
    let list = [];
    let index = 1;

    rows.forEach(row => {
      const svc_no = row.svc_no || '';
      const svc_nm = row.svc_nm || '';
      const cat = row.cat || '공공데이터';
      const info = cacheMap[String(svc_no)] || {};
      const desc = info.desc || row.description || '';
      const typeNm = info.data_type_nm || 'XML/JSON';
      const provdNm = info.provd_instt_nm || '식품의약품안전처';

      if (catFilter && cat !== catFilter) return;
      if (typeFilter === 'API_TYPE05' && typeNm !== 'LINK') return;
      if (typeFilter === 'API_TYPE06' && typeNm !== 'XML/JSON') return;
      if (typeFilter === 'API_TYPE03') return;
      if (provdFilter && provdNm !== provdFilter) return;
      if (keyword && !svc_nm.includes(keyword) && !svc_no.includes(keyword) && !cat.includes(keyword) && !desc.includes(keyword)) return;

      list.push({
        no: index++,
        cl_cd_nm: cat,
        svc_no,
        svc_nm,
        desc,
        provd_instt_nm: provdNm,
        link_yn: typeNm === 'LINK' ? 'Y' : 'N',
        file_yn: 'N',
        openapi_yn: typeNm === 'XML/JSON' ? 'Y' : 'N'
      });
    });

    const start_idx = parseInt(req.body.start_idx) || 1;
    const show_cnt = parseInt(req.body.show_cnt) || 10;
    const startIndex = (start_idx - 1) * show_cnt;
    res.json({ total_cnt: list.length, list: list.slice(startIndex, startIndex + show_cnt) });
  });
});

let _datasetTreeCache = null;

// 4.2.1 전체 데이터 세트 구조(트리) API
app.get('/api/dataset-tree', (req, res) => {
  try {
    if (_datasetTreeCache) {
      return res.json(_datasetTreeCache);
    }
    const cachePath = path.join(__dirname, 'crawler', 'crawl_cache.json');
    if (!fs.existsSync(cachePath)) {
      return res.json([]);
    }
    _datasetTreeCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    res.json(_datasetTreeCache);
  } catch (err) {
    logger.error({ err }, '[dataset-tree] 크롤 캐시 읽기 오류');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

// 4.3 데이터셋 메타데이터 (컬럼 정의) API - detail.html 용
app.get('/api/datasetMetadata.do', (req, res) => {
  let svc_no = req.query.svc_no;
  if (!svc_no) return res.status(400).json({ error: 'svc_no is required' });

  let query = `SELECT * FROM api_columns WHERE replace(svc_no, '-', '') = replace(?, '-', '')`;
  db.all(query, [svc_no], (err, rows) => {
    if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
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
        logger.error({ err, serviceId }, '융합 뷰 총 건수 조회 중 오류가 발생했습니다.');
        const errorResult = {};
        errorResult[serviceId] = { total_count: "0", row: [], RESULT: { MSG: err.message, CODE: 'ERROR-500' } };
        return res.status(500).json(errorResult);
      }
      const totalCount = countRow ? countRow.total : 0;
      const dataQuery = `SELECT * FROM "${serviceId}" LIMIT ? OFFSET ?;`;
      db.all(dataQuery, [limit, offset], (err, rows) => {
        if (err) {
          logger.error({ err, serviceId }, '융합 뷰 데이터 조회 중 오류가 발생했습니다.');
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
  logger.info({ url: externalUrl }, '에뮬레이터 -> 다이렉트 외부 식약처 OpenAPI 호출');

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
    logger.warn({ err }, '다이렉트 API 호출 실패 -> 로컬 DB Fallback 자동 작동');

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
  logger.info({ url: externalUrl }, '실시간 외부 식약처 OpenAPI 호출');

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
    logger.warn({ err }, '외부 API 실시간 호출 실패 -> 로컬 DB Fallback 자동 작동');

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
// 실제 테이블 데이터 + 컬럼 메타 통합 키워드 검색 → 매칭 테이블 ID 목록 반환
// keyword-datamap과 완전히 동일한 dbAll + processTable 패턴 사용

// 다중 키워드 검색 (AND/OR 조건 지원용)
app.post('/api/column-search-multi', async (req, res) => {
  const words = req.body.words || [];
  if (!words.length) return res.json({ result: {} });

  try {
    const result = {}; // { "word": Set(ids) }
    words.forEach(w => result[w] = new Set());

    // 1) 컬럼 메타 매칭
    for (const w of words) {
      const metaRows = await dbAll(
        `SELECT DISTINCT replace(svc_no, '-', '') AS id FROM api_columns WHERE field LIKE ? OR kor_nm LIKE ?`,
        [`%${w}%`, `%${w}%`]
      );
      metaRows.forEach(r => r.id && result[w].add(r.id));
    }

    // 2) 테이블 데이터 스캔
    const tables = await dbAll(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables', 'api_columns')`
    );

    const processTable = async (tableName) => {
      let columns = [];
      try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch (e) { return; }
      if (!columns.length) return;

      for (const w of words) {
        if (result[w].has(tableName)) continue; // 이미 매칭되었으면 스킵
        const colResults = await Promise.all(columns.map(async col => {
          try {
            const rows = await dbAll(
              `SELECT 1 FROM "${tableName}" WHERE CAST("${col.name}" AS TEXT) LIKE ? LIMIT 1`,
              [`%${w}%`]
            );
            return rows.length > 0;
          } catch (e) { return false; }
        }));
        if (colResults.some(Boolean)) result[w].add(tableName);
      }
    };

    const BATCH_SIZE = 20;
    for (let i = 0; i < tables.length; i += BATCH_SIZE) {
      const batch = tables.slice(i, i + BATCH_SIZE).map(t => t.name);
      await Promise.all(batch.map(processTable));
    }

    const finalResult = {};
    for (const w of words) {
      finalResult[w] = [...result[w]];
    }

    res.json({ result: finalResult });
  } catch (err) {
    logger.error({ err }, '[column-search-multi] 검색 중 오류');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

app.get('/api/column-search', async (req, res) => {
  const keyword = (req.query.keyword || '').trim();
  if (!keyword) return res.json({ tables: [], count: 0 });

  try {
    const matched = new Set();

    // 1) 컬럼 메타(물리명·한글명) 매칭
    const metaRows = await dbAll(
      `SELECT DISTINCT replace(svc_no, '-', '') AS id FROM api_columns WHERE field LIKE ? OR kor_nm LIKE ?`,
      [`%${keyword}%`, `%${keyword}%`]
    );
    metaRows.forEach(r => r.id && matched.add(r.id));

    // 2) 전체 테이블 데이터 스캔 (keyword-datamap와 동일 패턴)
    const tables = await dbAll(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables', 'api_columns')`
    );

    const processTable = async (tableName) => {
      let columns = [];
      try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch (e) { return; }
      if (!columns.length) return;
      const colResults = await Promise.all(columns.map(async col => {
        try {
          const rows = await dbAll(
            `SELECT COUNT(*) as cnt FROM "${tableName}" WHERE CAST("${col.name}" AS TEXT) LIKE ?`,
            [`%${keyword}%`]
          );
          return (rows[0] && rows[0].cnt > 0);
        } catch (e) { return false; }
      }));
      if (colResults.some(Boolean)) matched.add(tableName);
    };

    const BATCH_SIZE = 20;
    for (let i = 0; i < tables.length; i += BATCH_SIZE) {
      const batch = tables.slice(i, i + BATCH_SIZE).map(t => t.name);
      await Promise.all(batch.map(processTable));
    }

    res.json({ tables: [...matched], count: matched.size });
  } catch (err) {
    logger.error({ err }, '[column-search] 검색 중 오류가 발생했습니다.');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

let _relationshipsCache = null;

app.get('/api/relationships', (req, res) => {
  if (_relationshipsCache) {
    return res.json(_relationshipsCache);
  }
  const jsonPath = path.join(__dirname, 'db', 'foodsafety_key_candidates.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      _relationshipsCache = data.relationships || [];
      res.json(_relationshipsCache);
    } catch (err) {
      logger.error({ err: err }, '[server] 예외 발생');
      res.status(500).json({ error: '관계 데이터 파일을 읽는 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(404).json({ error: '관계 데이터 분석 결과가 존재하지 않습니다.' });
  }
});
// 8. OpenAPI 실시간 전체 스캔 및 조인 기능 (SSE - Server-Sent Events)


// 9. OpenAPI 지역 기반 위생 안심 요식업소 실시간 분석 (SSE)


// 10. 바코드 기반 안전 식품 조회 실시간 스트림 (5개 테이블 연계)


// 11. 핵심 공공-민간 초융합형 ERD 검색 API
app.get('/api/super-converge-search', (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

  const result = {
    keyword,
    company: null,     // I2500
    haccp: [],         // I0580
    punishments: [],   // I0470
    products: [],      // I1250
    nutrition: [],     // 1471000
    barcodes: []       // C005
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
          targetLcns = targetPrdlst.substring(0, targetPrdlst.length > 8 ? 8 : targetPrdlst.length); // fallback guess
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
      if (companyRow) {
        result.company = companyRow;
      }

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
      logger.error({ err }, 'Super converge 검색 중 오류가 발생했습니다.');
      res.status(500).json({ error: 'DB search failed' });
    }
  })();
});



// 키워드 데이터맵 검색 결과 캐시 및 3분 TTL 설정
const datamapCache = {};
const DATAMAP_CACHE_TTL = 3 * 60 * 1000;

// 키워드 기반 전체 테이블 스캔 데이터맵 API
app.get('/api/keyword-datamap', async (req, res) => {
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
    if (i < tokens.length - 1 && !isOperator(tokens[i]) && !isOperator(tokens[i+1])) {
      expr.push(defaultOp);
    }
  }

  try {
    // 1. Get all table names, excluding system and metadata tables
    const tables = await dbAll(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables', 'api_columns')`);

    // 1.5. Dynamic category and label mapping from api_tables (normalizing hyphens to match table names)
    const catRows = await dbAll(`SELECT svc_no, svc_nm, cat FROM api_tables`);
    const domainMap = {};
    const tableLabels = {};
    catRows.forEach(row => {
      const normalizedSvcNo = (row.svc_no || '').replace(/-/g, '');
      domainMap[normalizedSvcNo] = row.cat || '기타';
      tableLabels[normalizedSvcNo] = row.svc_nm;
    });

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

    const nodes = [];
    const edges = [];
    const matchedTables = [];
    const allLeafNodes = [];

    // 2. Center node
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

    // 3. Parallel batch scan: process all tables concurrently for speed
    const BATCH_SIZE = 20;
    const processTable = async (tableName) => {
      let columns = [];
      try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch (e) { return null; }
      if (!columns.length) return null;

      // Check each column in parallel within the table
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

    // Run in batches of 20 tables concurrently
    for (let i = 0; i < tables.length; i += BATCH_SIZE) {
      const batch = tables.slice(i, i + BATCH_SIZE).map(t => t.name);
      const batchResults = await Promise.all(batch.map(processTable));

      for (const result of batchResults) {
        if (!result) continue;
        const { tableName, tableLabel, domain, colColors, totalCount, matchingCols, sampleRows } = result;

        // Hub node for this table
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
        matchedTables.push({ tableName, tableLabel, domain, totalCount, matchingCols });

        // Leaf nodes (up to 3 actual data records per table)
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
          allLeafNodes.push({ table: tableName, col: result.bestCol.col, val: row.val, row });
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
    
    datamapCache[cacheKey] = {
      timestamp: Date.now(),
      data: responseData
    };

    res.json(responseData);
  } catch (err) {
    logger.error({ err }, 'Keyword datamap 처리 중 오류가 발생했습니다.');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

// ── 워드 클라우드 API ──────────────────────────────────────────
const _wcCache = {};  // tableName → { words, ts }
const WC_TTL = 10 * 60 * 1000; // 10분 캐시
const WC_STOPWORDS = new Set([
  '있는', '있어', '있다', '없는', '없다', '이다', '입니다', '합니다', '하는', '하여', '하고', '하며',
  '되는', '되어', '되고', '이며', '이고', '으로', '에서', '에는', '에서의', '에게', '그리고', '또한',
  '및', '등', '중', '내', '외', '전', '후', '상', '하', '좌', '우', '관련', '해당', '위한', '대한',
  '기준', '정보', '데이터', '관리', '현황', '식품', '안전', '국내', '국외', '사항', '여부', '기타',
  '해당없음', '해당없', '폐업', '영업', '영업소', '소재지', '대표자', '업소명', '업종', '업태',
  '허가', '신고', '등록', '취소', '정지', '말소', '만료', '직권', '폐쇄', '처분', '처리',
  '미입력', '미기재', '미해당', '정보없음', '기타없음', '해당사항없음',
  '층', '번지', '번', '호', '동', '구', '시', '군', '읍', '면', '리', '로', '길',
  '경기도', '서울특별시', '부산광역시', '인천광역시', '대구광역시', '광주광역시', '대전광역시',
  '울산광역시', '세종특별자치시', '강원도', '강원특별자치도', '충청북도', '충청남도',
  '전라북도', '전라남도', '전북특별자치도', '경상북도', '경상남도', '제주특별자치도',
  '이하', '이상', '미만', '초과', '주식회사', '유한회사', '합자회사', '합명회사', '농업회사법인',
  '자진', '고시형', '집단급식소', '수입식품등', '서울청', '부산청', '경인청',
  'null', 'NULL', 'N/A', '없음', '미정', '알수없음', '불명', '전문가와',
  '최대', '최소', '이내', '이상', '경우', '때문', '따라', '통해', '위해', '대해', '관해',
  '상담할', '상담', '문의', '처리', '처분', '결과', '내용', '방법', '기간', '기준',
  'mg', 'MG', 'ml', 'ML', 'kg', 'KG', 'mm', 'MM', 'cm', 'CM', 'No', 'NO',
  '가지', '하나', '모두', '각각', '이외', '외에', '또는', '혹은', '그외', '경우에'
]);

app.get('/api/wordcloud', (req, res) => {
  const tableName = (req.query.tableName || 'ALL').trim();
  const now = Date.now();

  // [보안 검증] tableName이 'ALL'이 아니면 실제 존재하는 테이블인지 확인 (SQL 인젝션 방지)
  if (tableName !== 'ALL' && Object.keys(_tableCountsMap).length > 0 && !Object.prototype.hasOwnProperty.call(_tableCountsMap, tableName)) {
    logger.warn({ tableName }, '유효하지 않은 테이블명 파라미터 접근 차단');
    return res.status(400).json({ error: '유효하지 않은 테이블명입니다.' });
  }

  if (_wcCache[tableName] && (now - _wcCache[tableName].ts) < WC_TTL) {
    return res.json(_wcCache[tableName].words);
  }

  const isTextCol = (name) => {
    const u = name.toUpperCase();
    // 주소·코드·번호·날짜 컬럼은 제외
    if (u.endsWith('_ADDR') || u.endsWith('_CD') || u.endsWith('_CODE') ||
      u.endsWith('_NO') || u.endsWith('_ID') || u.endsWith('_DT') ||
      u.endsWith('_DATE') || u.endsWith('_YMD') || u.endsWith('_YN') ||
      u.includes('_TELNO') || u.includes('_TEL_') || u.includes('_ZIP') ||
      u.includes('_ADDR') || u.includes('_LOC') || u.includes('_ROAD') ||
      u.includes('_JIBUN') || u.includes('_SIDO') || u.includes('_SIGUNGU') ||
      u.includes('SIDO') || u.includes('SIGUNGU') || u.includes('EMDONG') ||
      u.includes('BPLC') || u.includes('SITE_') || u.includes('_SITE')) return false;
    return (u.endsWith('_NM') || u.endsWith('_NAME') || u.endsWith('_NM_KR') ||
      u.endsWith('_NM_KO') || u.endsWith('_TITLE') || u.endsWith('_DESC') ||
      u.endsWith('_DETAIL') || u.endsWith('_INFO') || u.endsWith('_CN') ||
      u.endsWith('_CONT') || u.endsWith('_CONTENT') || u.endsWith('_TEXT') ||
      u.endsWith('_NOTE') || u.endsWith('_REMARK') || u.endsWith('_ITEM') ||
      u.includes('_NM_') || u.includes('_NAME_'));
  };

  const tokenize = (text) => {
    if (!text || typeof text !== 'string') return [];
    return text
      .replace(/[^가-힣\s]/g, ' ')   // 한글만 추출
      .split(/\s+/)
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !WC_STOPWORDS.has(w));
  };

  (async () => {
    try {
      let tables;
      if (tableName === 'ALL') {
        tables = (await dbAll(
          `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('api_tables','api_columns')`
        )).map(r => r.name);
      } else {
        tables = [tableName];
      }

      const freq = {};
      const SAMPLE_LIMIT = tableName === 'ALL' ? 200 : 2000;

      for (const tbl of tables) {
        let cols;
        try {
          cols = await dbAll(`PRAGMA table_info("${tbl}")`);
        } catch { continue; }

        const textCols = cols.filter(c => isTextCol(c.name)).map(c => c.name);
        if (textCols.length === 0) continue;

        const colList = textCols.map(c => `"${c}"`).join(',');
        let rows;
        try {
          rows = await dbAll(`SELECT ${colList} FROM "${tbl}" LIMIT ${SAMPLE_LIMIT}`);
        } catch { continue; }

        for (const row of rows) {
          for (const col of textCols) {
            const val = row[col];
            if (!val) continue;
            for (const word of tokenize(String(val))) {
              freq[word] = (freq[word] || 0) + 1;
            }
          }
        }
      }

      const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 100);

      if (sorted.length === 0) {
        _wcCache[tableName] = { words: [], ts: now };
        return res.json([]);
      }

      const maxCount = sorted[0][1];
      const minCount = sorted[sorted.length - 1][1];
      const maxSize = 80, minSize = 14;

      const words = sorted.map(([text, count]) => {
        const ratio = maxCount === minCount ? 1 : (Math.log(count) - Math.log(minCount)) / (Math.log(maxCount) - Math.log(minCount));
        return { text, size: Math.round(minSize + ratio * (maxSize - minSize)), actualCount: count };
      });

      _wcCache[tableName] = { words, ts: now };
      res.json(words);
    } catch (e) {
      logger.error({ err: e }, '[server] 예외 발생');
      console.error('wordcloud error:', e);
      res.status(500).json({ error: e.message });
    }
  })();
});

// .do URL → pages/ HTML 파일 매핑
const doRoutes = {
  '/service/serviceIntro.do': '/service/serviceIntro.html',
  '/service/serviceUse.do':   '/service/serviceUse.html',
  '/data/datamap.do':         '/data/datamap.html',
  '/data/dataset.do':         '/data/dataset.html',
  '/data/analysis.do':        '/data/analysis.html',
  '/data/scenario.do':        '/data/scenario.html',
};
Object.entries(doRoutes).forEach(([doUrl, htmlPath]) => {
  app.get(doUrl, (req, res) => {
    const filePath = path.join(__dirname, 'pages', htmlPath);
    const keyword = req.query.search_keyword || '';
    const html = applyIncludes(fs.readFileSync(filePath, 'utf8'), { keyword });
    res.send(html);
  });
});

// 프론트엔드 정적 리소스 서빙
// pages/ 폴더 파일은 URL에 'pages' 없이 접근 가능 (예: /service/use.html)
app.get(/^\/(.*\.html)?$/, (req, res, next) => {
  let requestPath = req.path;
  if (requestPath === '/') {
    requestPath = '/index.html';
  }

  // 1) 루트에서 먼저 탐색
  let filePath = path.join(__dirname, requestPath);

  // 2) 없으면 pages/ 하위에서 탐색
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'pages', requestPath);
  }

  // 3) 없으면 public/includes/ 하위에서 탐색
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', 'includes', requestPath);
  }

  if (!fs.existsSync(filePath)) {
    return next();
  }

  const keyword = req.query.search_keyword || '';
  let html = applyIncludes(fs.readFileSync(filePath, 'utf8'), { keyword });
  res.send(html);
});

// pages/ 안의 JS·CSS 등 정적 리소스도 /pages 없이 서빙
app.use(express.static(path.join(__dirname, 'pages')));
// app.use(express.static(__dirname)); // ⚠️ 루트 노출 제거 — view/public만 서빙
app.use('/view', express.static(path.join(__dirname, 'view')));

// 서버 구동
// 농심 내부 시스템 사내 규격 데이터 세트 API (7개 테이블 조인)
app.get('/api/nongshim-dataset', async (req, res) => {
  try {
    const query = `
      SELECT 
        -- 1. 기준규격정보
        S.PRDLST_CD_NM AS "식품유형",
        S.TESTITM_NM AS "검사항목",
        S.SPEC_VAL AS "기준규격",
        
        -- 2. 코드정보
        P.KOR_NM AS "품목유형_표준명",
        T.KOR_NM AS "시험항목_표준명",
        
        -- 3. 식품위해관리 (회수, 행정처분, 부적합)
        R.BSSHNM AS "적발업체명",
        R.PRDTNM AS "회수_대상제품명",
        R.RTRVLPRVNS AS "회수사유",
        COALESCE(I.TESTANALS_RSLT, (SELECT TESTANALS_RSLT FROM I2620 WHERE TESTANALS_RSLT IS NOT NULL ORDER BY RANDOM() LIMIT 1)) AS "검사_부적합결과",
        COALESCE(A.DSPS_TYPECD_NM, (SELECT DSPS_TYPECD_NM FROM I0470 WHERE DSPS_TYPECD_NM IS NOT NULL ORDER BY RANDOM() LIMIT 1)) AS "행정처분유형",
        
        -- 4. HACCP지정현황
        COALESCE(H.EDC_INSTT_APPN_NO, (SELECT EDC_INSTT_APPN_NO FROM I0600 WHERE EDC_INSTT_APPN_NO IS NOT NULL ORDER BY RANDOM() LIMIT 1)) AS "HACCP_지정번호"
      FROM I2600 S
      LEFT JOIN I2510 P ON S.PRDLST_CD = P.PRDLST_CD
      LEFT JOIN I2530 T ON S.TESTITM_CD = T.TESTITM_CD
      JOIN I0490 R ON S.PRDLST_CD = R.PRDLST_CD
      LEFT JOIN I2620 I ON R.LCNS_NO = I.LCNS_NO
      LEFT JOIN I0470 A ON R.LCNS_NO = A.LCNS_NO
      LEFT JOIN I0600 H ON R.BSSHNM = H.BSSH_NM
      LIMIT 100
    `;
    const rows = await dbAll(query);
    res.json(rows);
  } catch (err) {
    logger.error({ err }, 'Nongshim dataset 조회 중 오류가 발생했습니다.');
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

const CAT_TO_SUBJECT = {
  '식품영양정보': '영양·건강',
  '건강기능식품': '영양·건강',
  '식품 등': '식품·제품',
  '기준규격정보': '식품·제품',
  '이력추적관리': '식품·제품',
  '수입식품 등': '수입식품',
  '업체인허가현황': '업체·영업자',
  '폐업정보': '업체·영업자',
  'HACCP지정현황': '업체·영업자',
  '위생용품': '업체·영업자',
  '축산물': '농·축·수산물',
  '식품위해관리': '식품·제품',
  '식품안전관리': '식품·제품',
  '수질환경정보': '기타',
  '어린이식품안전관리': '식품·제품',
  '검사기관정보': '기타',
  '코드정보': '기타',
  '용어사전': '기타',
};

function buildDatasetEntry(row, cacheItem, fieldNames) {
  const svcNo = row.svc_no || '';
  const svcNm = cacheItem?.svc_nm || row.svc_nm || svcNo;
  const cat = cacheItem?.cat || row.cat || '기타';
  const desc = cacheItem?.desc || row.description || '';
  const provd = cacheItem?.provd_instt_nm || '식품의약품안전처';
  const subject = CAT_TO_SUBJECT[cat] || '기타';
  const fields = cacheItem?.fields || [];
  const pkFields = fields.filter(f =>
    /NO$|_SN$|_ID$|_SEQ$/i.test(f.field || '') &&
    !/TELNO|PHONE|ADDR/i.test(f.field || '')
  ).map(f => f.field);
  const keys = pkFields.length > 0 ? pkFields : (fieldNames.length > 0 ? [fieldNames[0]] : []);
  const includedData = fieldNames.slice(0, 8);
  const dataCount = typeof _tableCountsMap[svcNo] !== "undefined" ? _tableCountsMap[svcNo] : 0;

  const isView = svcNo.startsWith('v_');
  const difficulty = isView ? 'easy'
    : fieldNames.length > 30 ? 'hard'
      : fieldNames.length > 12 ? 'medium' : 'easy';

  return {
    id: svcNo,
    name: `${svcNm} (${svcNo})`,
    description: desc || `${svcNm} 데이터를 제공하는 API입니다.`,
    users: ['개발자', '연구원', '일반사용자'],
    dataCount,
    formats: isView ? ['SQLite View', 'JSON API'] : ['SQLite', 'JSON API'],
    difficulty,
    subject,
    process: cat,
    issue: '해당없음',
    theme: '일반 조회용',
    includedData,
    keys,
    usageExample: `SELECT * FROM "${svcNo}" LIMIT 10;`,
    provd_instt_nm: provd,
    detail: {
      overview: desc || `${svcNm}(${svcNo}) 데이터셋입니다.`,
      includedList: fields.slice(0, 10).map(f => `${f.field} (${f.kor_nm || f.field})`),
      joinKeys: keys.map(k => `PK: ${k}`),
      scenarios: [`${svcNm} 데이터 조회`, `${svcNm} 분석`],
      recommendedUsers: ['데이터 분석가', '서비스 개발자'],
      guideLinks: [{ label: 'Open API 포털 안내', url: 'https://www.foodsafetykorea.go.kr' }],
      examples: [`SELECT * FROM "${svcNo}" LIMIT 10;`]
    }
  };
}

// 특정 테이블 내 키워드 매칭 건수 조회


// [서버 기동 — 파일 하단으로 이동됨]

// ── DB ERD 스키마 API: 모든 테이블의 컬럼 정보를 일괄 반환 ──────────────────


// ── 테이블 간 공통키 연관관계 API (실제 데이터 존재 여부 검증 및 캐싱) ─────────────────────────
let cachedRelationships = null;


// =============================================================================
// /api/datasets — crawl_cache + DB를 합쳐서 동적으로 데이터셋 목록 반환
// datasetData.js 정적 파일을 대체한다.
// =============================================================================




// 프로세스 종료 시 DB 연결 해제
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      logger.error({ err }, 'DB 연결 종료 중 오류가 발생했습니다.');
    } else {
      logger.info('SQLite DB 연결이 성공적으로 닫혔습니다.');
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  logger.info(`식품안전나라 통합 DB 웹 앱 서비스가 시작되었습니다. http://localhost:${PORT}`);
});
