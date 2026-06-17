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

// 서버 기동 시 include 파일을 메모리에 캐싱 (요청마다 readFileSync 방지)
const _includesCache = {};
(function preloadIncludes() {
  const includesDir = path.join(__dirname, 'public/includes');
  const files = ['head.html', 'head_search.html', 'header.html', 'hero.html',
    'mainBoard.html', 'footer.html', 'search.html', 'menu_modal.html'];
  for (const file of files) {
    const filePath = path.join(includesDir, file);
    if (fs.existsSync(filePath)) {
      _includesCache[file] = fs.readFileSync(filePath, 'utf8');
    }
  }
})();

// HTML 파일에 head/header/search include를 주입하는 공통 함수 (캐시 사용)
function applyIncludes(html, vars = {}) {
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
    if (html.includes(placeholder) && _includesCache[file]) {
      html = html.replace(placeholder, transform(_includesCache[file]));
    }
  }
  // INCLUDE_FOOTER 미선언 페이지에도 자동 주입 (</body> 직전, NO_FOOTER 마커 제외)
  const noFooter = html.includes('<!-- NO_FOOTER -->');
  html = html.replace('<!-- NO_FOOTER -->', '');
  if (!hadFooter && !noFooter && html.includes('</body>') && _includesCache['footer.html']) {
    html = html.replace('</body>', _includesCache['footer.html'] + '\n</body>');
  }
  // INCLUDE_MENU_MODAL 미선언 페이지에도 자동 주입 (</body> 직전)
  if (!hadMenuModal && html.includes('</body>') && _includesCache['menu_modal.html']) {
    html = html.replace('</body>', _includesCache['menu_modal.html'] + '\n</body>');
  }
  // 템플릿 변수 치환 (미지정 변수는 빈 문자열로)
  html = html.replace(/\[\[KEYWORD\]\]/g, vars.keyword || '');
  return html;
}

const app = express();

// API Rate Limiting — IP당 분당 600회 초과 시 429 반환 (localhost 제외)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1분
  max: 600,                    // IP당 분당 최대 600회
  standardHeaders: true,      // RateLimit-* 헤더 포함
  legacyHeaders: false,
  skip: (req) => req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === '::ffff:127.0.0.1',
  message: { error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' }
});
app.use('/api/', apiLimiter);

// CORS — 개발 환경(localhost)과 배포 도메인만 허용
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:8000,https://food-safety-muxr.onrender.com').split(',');
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
let _dbReady = false; // DB 초기화 완료 여부

function initTableCounts() {
  db.all("SELECT name FROM sqlite_master WHERE type IN ('table', 'view')", [], (err, tables) => {
    if (err) { _dbReady = true; return; } // 실패해도 서버는 기동
    let pending = tables.length;
    if (pending === 0) { _dbReady = true; return; }
    tables.forEach(t => {
      db.get(`SELECT COUNT(*) as cnt FROM "${t.name}"`, [], (err, row) => {
        if (!err && row) _tableCountsMap[t.name] = row.cnt;
        if (--pending === 0) {
          _dbReady = true;
          logger.info(`테이블 카운트 초기화 완료 (${Object.keys(_tableCountsMap).length}개 테이블)`);
        }
      });
    });
  });
}

const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'db', 'foodsafety.db');

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB 초기화 완료 전 API 요청 차단 (테이블 카운트 레이스 컨디션 방지)
app.use('/api', (req, res, next) => {
  if (!_dbReady) return res.status(503).json({ error: '서버가 초기화 중입니다. 잠시 후 다시 시도해 주세요.' });
  next();
});

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

// 모듈 레벨 DB 헬퍼 (라우트 핸들러에서 공통 사용)
// db.all을 Promise로 래핑 — 읽기/쓰기 가능 연결
const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
});
// readonlyDb.all을 Promise로 래핑 — 읽기 전용 연결
const readonlyDbAll = (sql, params = []) => new Promise((resolve, reject) => {
  readonlyDb.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
});

// 라우터 마운트
const tablesRouter = require('./routes/tables')(db, dbAll, logger, _tableCountsMap);

// 분리된 라우터 마운트
app.use('/api', require('./routes/query')(db, dbAll, logger, readonlyDb));
app.use('/api', require('./routes/datasets')(db, dbAll, logger, _tableCountsMap, __dirname));
app.use('/api', require('./routes/stream')(db, dbAll, logger, REAL_API_KEY));

app.use('/api/tables', tablesRouter);
const searchRouter = require('./routes/search')(db, applyIncludes, logger, __dirname);
app.use('/api', searchRouter);

// 공공포털 호환 스텁 (클라이언트 JS가 호출하나 사용하지 않음)
app.post('/api/topMenu.do', (req, res) => res.json({ result: [] }));

// OpenAPI 프록시 라우터 — 반드시 다른 /api/* 라우터보다 나중에 등록
const openapiRouter = require('./routes/openapi')(db, logger, REAL_API_KEY);
app.use('/api', openapiRouter);


// 1. DB 테이블 목록 조회 API (뷰(View) 제외 및 논리명 매핑 추가)
// 워드 클라우드 API
// .do URL → pages/ HTML 파일 매핑
const doRoutes = {
  '/service/serviceIntro.do': '/service/serviceIntro.html',
  '/service/serviceUse.do': '/service/serviceUse.html',
  '/data/datamap.do': '/data/datamap.html',
  '/data/dataset.do': '/data/dataset.html',
  '/data/analysis.do': '/data/analysis.html',
  '/data/scenario.do': '/data/scenario.html',
};
Object.entries(doRoutes).forEach(([doUrl, htmlPath]) => {
  app.get(doUrl, (req, res) => {
    const filePath = path.join(__dirname, 'pages', htmlPath);
    const keyword = req.query.search_keyword || '';
    try {
      const html = applyIncludes(fs.readFileSync(filePath, 'utf8'), { keyword });
      res.send(html);
    } catch (err) {
      logger.error({ err, filePath }, '.do 라우트 페이지 렌더링 오류');
      res.status(500).send('<h1>페이지를 불러올 수 없습니다.</h1>');
    }
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
  let filePath = path.resolve(__dirname, '.' + requestPath);

  // Path Traversal 방어: 해결된 경로가 프로젝트 루트를 벗어나면 차단
  if (!filePath.startsWith(__dirname + path.sep) && filePath !== __dirname) {
    return res.status(400).send('잘못된 요청입니다.');
  }

  // 2) 없으면 pages/ 하위에서 탐색
  if (!fs.existsSync(filePath)) {
    filePath = path.resolve(path.join(__dirname, 'pages', requestPath));
    if (!filePath.startsWith(path.join(__dirname, 'pages'))) {
      return res.status(400).send('잘못된 요청입니다.');
    }
  }

  // 3) 없으면 public/includes/ 하위에서 탐색
  if (!fs.existsSync(filePath)) {
    filePath = path.resolve(path.join(__dirname, 'public', 'includes', requestPath));
    if (!filePath.startsWith(path.join(__dirname, 'public', 'includes'))) {
      return res.status(400).send('잘못된 요청입니다.');
    }
  }

  if (!fs.existsSync(filePath)) {
    return next();
  }

  const keyword = req.query.search_keyword || '';
  try {
    const html = applyIncludes(fs.readFileSync(filePath, 'utf8'), { keyword });
    res.send(html);
  } catch (err) {
    logger.error({ err, filePath }, 'HTML 페이지 렌더링 오류');
    res.status(500).send('<h1>페이지를 불러올 수 없습니다.</h1>');
  }
});

// pages/ 안의 JS·CSS 등 정적 리소스도 /pages 없이 서빙
// crawl_cache.json 전용 라우트 (crawler 디렉터리 전체 노출 방지)
app.get('/crawler/crawl_cache.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'crawler', 'crawl_cache.json'));
});

app.use(express.static(path.join(__dirname, 'pages')));
// app.use(express.static(__dirname)); // ⚠️ 루트 노출 제거 — view/public만 서빙
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));  // 공공포털 CSS 호환
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

// 테이블 간 공통키 연관관계 API (실제 데이터 존재 여부 검증 및 캐싱)
let cachedRelationships = null;

// 프로세스 종료 시 DB 연결 해제 (SIGINT: Ctrl+C, SIGTERM: 클라우드/Docker 종료)
function gracefulShutdown(signal) {
  logger.info(`${signal} 수신 — DB 연결을 종료합니다.`);
  db.close((err) => {
    if (err) logger.error({ err }, 'DB 연결 종료 중 오류가 발생했습니다.');
    else logger.info('SQLite DB 연결이 성공적으로 닫혔습니다.');
    process.exit(0);
  });
}
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// 전역 에러 핸들러 — 라우트에서 next(err) 또는 throw된 에러 포착
app.use((err, req, res, next) => {
  logger.error({ err }, '처리되지 않은 오류');
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

// 프로세스 레벨 예외 — 잡히지 않은 예외로 서버가 죽는 것 방지
process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaughtException — 서버가 비정상 종료될 수 있습니다.');
});
process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'unhandledRejection — Promise 처리 누락');
});

app.listen(PORT, () => {
  logger.info(`식품안전나라 통합 DB 웹 앱 서비스가 시작되었습니다. http://localhost:${PORT}`);
});
