process.env.LANG = 'en_US.UTF-8';

const express = require('express');
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

const REAL_API_KEY = '77183c01c07d44798948';

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

// 1. DB 테이블 목록 조회 API (뷰(View) 제외 및 논리명 매핑 추가)
app.get('/api/tables', (req, res) => {
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
      return res.status(500).json({ error: err.message });
    }
    res.json(rows.map(row => ({
      name: row.name,
      logicalName: row.logical_name || row.name
    })));
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
      logger.error({ err, tableName }, '스키마 조회 중 오류가 발생했습니다.');
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
      logger.error({ err, tableName }, '데이터 조회 중 오류가 발생했습니다.');
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/join-scenarios', (req, res) => {
  const joinSqlPath = path.join(__dirname, 'db', 'join.sql');
  try {
    // 1) 고품격 다중 (체인) 조인 시나리오 정의 (전체 데이터 연결 구조 예시)
    const multiJoinScenarios = [
      {
        no: 101,
        grade: "SUPER",
        title: "★ [3차 JOIN] 식품 제조사 ↔ 품목제조보고 ↔ 원재료 성분 통합 분석",
        description: "식품업체 인허가 마스터(I2500) ↔ 품목제조보고(I1250) ↔ 품목 원재료 상세(C002) 3차 연쇄 결합. 특정 제조회사 아래 어떤 제품이 등록되어 있고, 해당 제품의 실제 원재료 구성 성분이 무엇인지 정밀 분석합니다. (교집합 실존)",
        sql: `SELECT \n    A.BSSH_NM AS "제조사명", \n    B.PRDLST_NM AS "제품명", \n    C.RAWMTRL_NM AS "원재료명"\nFROM "I2500" A\nINNER JOIN "I1250" B ON A.LCNS_NO = B.LCNS_NO\nINNER JOIN "C002" C ON B.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO\nLIMIT 15;`
      },
      {
        no: 102,
        grade: "SUPER",
        title: "★ [3차 JOIN] 위생법 위반 행정처분 업체 연락처/소재지 통합 조회",
        description: "행정처분 통보 이력(I0470) ↔ 행정처분 상세(I0482) ↔ 업체 인허가(I2500) 3차 결합. 위생법 위반 등으로 행정처분을 받은 영업소의 실시간 주소와 연락처를 스캔하여 안전 관리에 활용합니다. (교집합 실존)",
        sql: `SELECT \n    A.PRCSCITYPOINT_BSSHNM AS "업소명", \n    A.VILTCN AS "위반사항", \n    B.DSPSCN AS "처분내용",\n    C.ADDR AS "소재지주소",\n    C.TELNO AS "대표전화"\nFROM "I0470" A\nINNER JOIN "I0482" B ON A.DSPSDTLS_SEQ = B.DSPSDTLS_SEQ\nINNER JOIN "I2500" C ON A.PRCSCITYPOINT_BSSHNM = C.BSSH_NM\nLIMIT 10;`
      },
      {
        no: 103,
        grade: "SUPER",
        title: "★ [5차 체인 JOIN] 시험항목 ↔ 규격 기준 ↔ 위해회수 ↔ 통관 ↔ 행정처분",
        description: "db/chain_joins.sql의 입증된 5차 체인 조인 실데이터. 시험검사(I2530) ↔ 기준규격(I0940) ↔ 위해회수(I0490) ↔ 수입통관(C001) ↔ 행정처분(I1260)까지 전체 데이터 맵이 꼬리를 물고 유기적으로 엮인 연쇄 구조입니다.",
        sql: `SELECT\n    A.TESTITM_CD AS "시험항목코드",\n    A.KOR_NM AS "시험항목한글명",\n    B.PRDLST_CD AS "품목코드",\n    B.PC_KOR_NM AS "품목한글명",\n    C.PRDTNM AS "위해제품명",\n    C.RTRVLPRVNS AS "회수사유",\n    D.BSSH_NM AS "수입사명",\n    E.BSSH_NM AS "처분업체명"\nFROM "I2530" A\nINNER JOIN "I0940" B ON A.TESTITM_CD = B.TESTITM_CD\nINNER JOIN "I0490" C ON B.PRDLST_CD = C.PRDLST_CD\nINNER JOIN "C001" D ON C.LCNS_NO = D.LCNS_NO\nINNER JOIN "I1260" E ON D.LCNS_NO = E.LCNS_NO\nWHERE A.TESTITM_CD IS NOT NULL AND A.TESTITM_CD != ''\nLIMIT 10;`
      }
    ];

    // 2) 기존 join.sql 파일 파싱
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

    // 3) 다중 조인 시나리오를 맨 위에 오도록 결합하여 반환
    const finalResult = [...multiJoinScenarios, ...parsedScenarios];
    res.json(finalResult);
  } catch (err) {
    logger.error({ err }, 'join.sql 파싱 중 오류가 발생했습니다.');
    res.status(500).json({ error: err.message });
  }
});

// 4. 임의의 SQL 쿼리 실행 API
app.post('/api/query', (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '쿼리 내용이 비어 있습니다.' });
  }

  logger.info({ query }, 'SQL 쿼리 실행 요청이 들어왔습니다.');

  // SELECT 등 조회 쿼리에만 대응하도록 간단히 체크 (데이터 훼손 방지)
  const trimmed = query.trim().toUpperCase();
  if (trimmed.startsWith('INSERT') || trimmed.startsWith('UPDATE') || trimmed.startsWith('DELETE') || trimmed.startsWith('DROP')) {
    return res.status(403).json({ error: '안전을 위해 조회(SELECT, PRAGMA) 목적의 쿼리만 실행이 허용됩니다.' });
  }

  readonlyDb.all(query, [], (err, rows) => {
    if (err) {
      logger.error({ err }, 'SQL 실행 중 오류가 발생했습니다.');
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

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
    if (err) return res.status(500).json({ error: err.message });
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
    if (err) return res.status(500).json({ error: err.message });

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
    if (err) return res.status(500).json({ error: err.message });

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

// 4.2.1 전체 데이터 세트 구조(트리) API
app.get('/api/dataset-tree', (req, res) => {
  try {
    const cachePath = path.join(__dirname, 'crawler', 'crawl_cache.json');
    if (!fs.existsSync(cachePath)) {
      return res.json([]);
    }
    const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    res.json(data);
  } catch (err) {
    logger.error({ err }, '[dataset-tree] 크롤 캐시 읽기 오류');
    res.status(500).json({ error: err.message });
  }
});

// 4.3 데이터셋 메타데이터 (컬럼 정의) API - detail.html 용
app.get('/api/datasetMetadata.do', (req, res) => {
  let svc_no = req.query.svc_no;
  if (!svc_no) return res.status(400).json({ error: 'svc_no is required' });

  let query = `SELECT * FROM api_columns WHERE replace(svc_no, '-', '') = replace(?, '-', '')`;
  db.all(query, [svc_no], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
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

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

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
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/column-search', async (req, res) => {
  const keyword = (req.query.keyword || '').trim();
  if (!keyword) return res.json({ tables: [], count: 0 });

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

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
    res.status(500).json({ error: err.message });
  }
});

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
      if (tableName.startsWith('v_')) throw new Error("융합 뷰는 로컬 전용이므로 외부 실시간 조인에서 제외됩니다.");

      // 1471000 테이블은 외부 OpenAPI 규격이 다르므로 로컬 DB에서 조회
      if (tableName === '1471000') {
        return new Promise((resolve, reject) => {
          db.get(`SELECT COUNT(*) AS total FROM "1471000"`, [], (err, row) => {
            if (err) reject(err);
            else resolve(row.total);
          });
        });
      }

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
      if (tableName === '1471000') {
        return new Promise((resolve, reject) => {
          db.all(`SELECT * FROM "1471000" LIMIT 1000`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      }

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
          logger.error({ err, tableName }, '외부 API fetch 중 오류가 발생했습니다.');
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

    sendEvent({ type: 'status', message: `[3/4] ${tableA} 및 ${tableB} 전체 데이터를 수집 중입니다. (대기 시간이 소요될 수 있습니다)` });

    // 테이블 단위 순차 수집 (병렬 수집 시 서버 및 대역폭 과부하 방지)
    const dataA = await fetchAllData(tableA, totalA);
    const dataB = await fetchAllData(tableB, totalB);

    sendEvent({ type: 'status', message: `[4/4] 수집 완료. 서버 메모리에서 '${joinKey}' 기준으로 Inner Join 연산을 수행 중...` });

    // Inner Join 로직
    const joinedData = [];
    const mapB = new Map();

    const getSynonymKeyVal = (row, requestedKey) => {
      if (row[requestedKey] !== undefined) return row[requestedKey];

      const keySynonyms = [
        ['LCNS_NO'],
        ['PRDLST_REPORT_NO', 'ITEM_REPORT_NO'],
        ['BAR_CD', 'BARCODE_NO']
      ];

      for (const group of keySynonyms) {
        if (group.includes(requestedKey)) {
          for (const k of group) {
            if (row[k] !== undefined) return row[k];
          }
        }
      }
      return null;
    };

    dataB.forEach(row => {
      const keyVal = getSynonymKeyVal(row, joinKey);
      if (keyVal) {
        if (!mapB.has(keyVal)) mapB.set(keyVal, []);
        mapB.get(keyVal).push(row);
      }
    });

    dataA.forEach(rowA => {
      const keyVal = getSynonymKeyVal(rowA, joinKey);
      if (keyVal && mapB.has(keyVal)) {
        const matchedRowsB = mapB.get(keyVal);
        matchedRowsB.forEach(rowB => {
          // 컬럼명 충돌 방지 및 A/B 테이블 직관적 구분을 위해 접두어와 테이블명 추가
          const merged = {};
          Object.keys(rowA).forEach(k => merged[`[A] ${k}(${tableA})`] = rowA[k]);
          Object.keys(rowB).forEach(k => merged[`[B] ${k}(${tableB})`] = rowB[k]);
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
    logger.error({ err }, 'SSE 조인 처리 중 오류가 발생했습니다.');
    sendEvent({ type: 'error', message: err.message });
    res.end();
  }
});

// 9. OpenAPI 지역 기반 위생 안심 요식업소 실시간 분석 (SSE)
app.get('/api/live-hygiene-stream', async (req, res) => {
  const { region, industry, violation } = req.query;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent({ type: 'status', message: `[1/4] 기준 테이블 I2500(인허가업소) 및 연계 테이블 I0470(행정처분) API 호출 준비 중...` });

    const fetchAllData = async (tableName) => {
      const allRows = [];
      const totalToFetch = 10000;
      const batchSize = 1000;

      for (let start = 1; start <= totalToFetch; start += batchSize) {
        let end = start + batchSize - 1;
        const url = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${tableName}/json/${start}/${end}`;

        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const text = await response.text();
          const data = JSON.parse(text);

          if (data[tableName] && data[tableName].row) {
            const rows = data[tableName].row;
            allRows.push(...rows);
            sendEvent({ type: 'progress', table: tableName, fetched: allRows.length, total: totalToFetch });
            if (rows.length < batchSize) break; // 데이터가 더 없으면 조기 종료
          } else {
            break; // 응답 구조가 이상하거나 데이터가 없을 때
          }
        } catch (e) {
          throw new Error(`식약처 API 응답 파싱 실패 (${tableName} ${start}~${end}): API 호출 제한이 걸렸을 수 있습니다.`);
        }

        // 동시 접속 차단(WAF)을 방지하기 위해 0.2초 대기
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      return allRows;
    };

    sendEvent({ type: 'status', message: `[2/4] 외부 OpenAPI에서 I2500 (최대 10000건), I0470 (최대 10000건) 1000건씩 순차 크롤링 적재 중...` });

    // 식약처 서버의 "현재 접속 중인 인증키입니다" (동시접속 제한) 에러를 막기 위해
    // I2500을 먼저 다 가져오고, 그 다음에 I0470을 순차적으로 가져오도록 수정
    const dataI2500 = await fetchAllData('I2500');
    const dataI0470 = await fetchAllData('I0470');

    sendEvent({ type: 'status', message: `[3/4] 수집 완료. 지역('${region || '전체'}') 및 업종('${industry || '전체'}') 필터링 중...` });

    // 필터링 적용 (WHERE)
    const filteredI2500 = dataI2500.filter(row => {
      let pass = true;
      if (region && row.ADDR && !row.ADDR.includes(region)) pass = false;
      if (industry && row.INDUTY_CD_NM && !row.INDUTY_CD_NM.includes(industry)) pass = false;
      return pass;
    });

    sendEvent({ type: 'status', message: `[4/4] 서버 메모리에서 LCNS_NO 기준으로 LEFT JOIN 연산 및 위생상태 필터링 수행 중...` });

    // I0470 해시맵(Index) 구성 (행정처분 정보 룩업 용도)
    const i0470Map = new Map();
    dataI0470.forEach(row => {
      if (row.LCNS_NO) {
        i0470Map.set(row.LCNS_NO, row);
      }
    });

    // LEFT JOIN 및 SELECT 컬럼 매핑
    const resultRows = [];
    filteredI2500.forEach(rowE => {
      const rowA = i0470Map.get(rowE.LCNS_NO); // LEFT JOIN

      const hasViolation = rowA ? true : false;
      if (violation === '있음' && !hasViolation) return;
      if (violation === '없음' && hasViolation) return;

      resultRows.push({
        '인허가번호': rowE.LCNS_NO,
        '업소명': rowE.BSSH_NM,
        '업종': rowE.INDUTY_CD_NM,
        '주소': rowE.ADDR,
        '행정처분유형': rowA ? rowA.DSPS_TYPECD_NM : null,
        '위반내용': rowA ? rowA.VILTCN : null,
        '위생상태': rowA ? '주의이력 있음' : '주의이력 없음'
      });
    });

    sendEvent({
      type: 'complete',
      result: resultRows,
      message: `분석 완료. 외부 API를 통해 필터 조건에 부합하는 총 ${resultRows.length}건의 업소 위생상태가 조회되었습니다.`
    });
    res.end();

  } catch (err) {
    logger.warn({ err }, '외부 API 실시간 호출 실패 -> 로컬 DB SQL Fallback 작동');
    sendEvent({ type: 'status', message: `[Fallback] 외부 API 호출 오류로 인해, 내부 SQLite DB에서 조건에 맞게 SQL을 직접 실행합니다.` });

    let sqlQuery = `
      SELECT 
          E.LCNS_NO               AS "인허가번호",
          E.BSSH_NM               AS "업소명",
          E.INDUTY_CD_NM          AS "업종",
          E.ADDR                  AS "주소",
          A.DSPS_TYPECD_NM        AS "행정처분유형",
          A.VILTCN                AS "위반내용",
          CASE 
              WHEN A.LCNS_NO IS NULL THEN '주의이력 없음'
              ELSE '주의이력 있음'
          END                     AS "위생상태"
      FROM I2500 E
      LEFT JOIN I0470 A 
          ON E.LCNS_NO = A.LCNS_NO
      WHERE 1=1
    `;
    const params = [];

    if (region) {
      sqlQuery += ` AND E.ADDR LIKE ? `;
      params.push(`%${region}%`);
    }
    if (industry) {
      sqlQuery += ` AND E.INDUTY_CD_NM LIKE ? `;
      params.push(`%${industry}%`);
    }
    if (violation === '있음') {
      sqlQuery += ` AND A.LCNS_NO IS NOT NULL `;
    } else if (violation === '없음') {
      sqlQuery += ` AND A.LCNS_NO IS NULL `;
    }

    // 최대 10000건까지 조회 허용
    sqlQuery += ` LIMIT 10000;`;

    db.all(sqlQuery, params, (dbErr, rows) => {
      if (dbErr) {
        sendEvent({ type: 'error', message: 'SQLite 폴백 쿼리 실행 중 오류: ' + dbErr.message });
      } else {
        sendEvent({
          type: 'complete',
          result: rows || [],
          message: `[SQL Fallback 결과] 로컬 DB에서 조건에 부합하는 총 ${(rows || []).length}건이 조회되었습니다.`
        });
      }
      res.end();
    });
  }
});

// 10. 바코드 기반 안전 식품 조회 실시간 스트림 (5개 테이블 연계)
app.get('/api/live-barcode-stream', async (req, res) => {
  const { barcode, barcodeExist, haccp, safeStatus } = req.query;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent({ type: 'status', message: `[1/4] 5개 테이블 (I1250, C005, I2500, I0580, I0490) API 호출 준비 중...` });

    const fetchAllData = async (tableName) => {
      const allRows = [];
      const totalToFetch = 10000;
      const batchSize = 1000;
      for (let start = 1; start <= totalToFetch; start += batchSize) {
        let end = start + batchSize - 1;
        const url = `http://openapi.foodsafetykorea.go.kr/api/${REAL_API_KEY}/${tableName}/json/${start}/${end}`;
        try {
          const response = await fetch(url, {
            headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' }
          });
          const text = await response.text();
          const data = JSON.parse(text);
          if (data[tableName] && data[tableName].row) {
            allRows.push(...data[tableName].row);
            sendEvent({ type: 'progress', table: tableName, fetched: allRows.length, total: totalToFetch });
            if (data[tableName].row.length < batchSize) break;
          } else break;
        } catch (e) {
          throw new Error(`식약처 API 응답 파싱 실패 (${tableName} ${start}~${end})`);
        }
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      return allRows;
    };

    sendEvent({ type: 'status', message: `[2/4] 외부 OpenAPI에서 5개 테이블 (각 최대 10000건) 1000건씩 순차 크롤링 적재 중...` });

    const dataI1250 = await fetchAllData('I1250');
    const dataC005 = await fetchAllData('C005');
    const dataI2500 = await fetchAllData('I2500');
    const dataI0580 = await fetchAllData('I0580');
    const dataI0490 = await fetchAllData('I0490');

    sendEvent({ type: 'status', message: `[3/4] 수집 완료. 서버 메모리에서 5개 테이블 Left Join 연산 수행 중...` });

    // HashMaps for fast lookup
    const mapB = new Map(); dataC005.forEach(r => { if (r.PRDLST_REPORT_NO) mapB.set(r.PRDLST_REPORT_NO, r) });
    const mapE = new Map(); dataI2500.forEach(r => { if (r.LCNS_NO) mapE.set(r.LCNS_NO, r) });
    const mapH = new Map(); dataI0580.forEach(r => { if (r.LCNS_NO) mapH.set(r.LCNS_NO, r) });
    const mapC = new Map(); dataI0490.forEach(r => { if (r.PRDLST_REPORT_NO) mapC.set(r.PRDLST_REPORT_NO, r) });

    const resultRows = [];
    dataI1250.forEach(rowP => {
      const rowB = mapB.get(rowP.PRDLST_REPORT_NO);
      const rowE = mapE.get(rowP.LCNS_NO);
      const rowH = mapH.get(rowP.LCNS_NO);
      const rowC = mapC.get(rowP.PRDLST_REPORT_NO);

      const hasHaccp = rowH && rowH.HACCP_APPN_NO ? 'Y' : 'N';
      const safeStatusValue = (rowC && rowC.PRDLST_REPORT_NO) ? '위험' : '안전';
      const barcodeValue = rowB ? rowB.BAR_CD : null;

      // 필터링 적용
      if (barcode && barcodeValue !== barcode) return;
      if (barcodeExist === 'Y' && !barcodeValue) return;
      if (barcodeExist === 'N' && barcodeValue) return;
      if (haccp && haccp !== '' && hasHaccp !== haccp) return;
      if (safeStatus && safeStatus !== '' && safeStatusValue !== safeStatus) return;

      resultRows.push({
        '바코드': barcodeValue,
        '품목제조보고번호': rowP.PRDLST_REPORT_NO,
        '제품명': rowP.PRDLST_NM,
        '식품유형': rowP.PRDLST_DCNM,
        '제조업체명': rowE ? rowE.BSSH_NM : null,
        '주소': rowE ? rowE.ADDR : null,
        '인허가번호': rowP.LCNS_NO,
        'HACCP_적용여부': hasHaccp,
        'HACCP_지정번호': rowH ? rowH.HACCP_APPN_NO : null,
        '회수_판매중지_일련번호': rowC ? rowC.RTRVLDSUSE_SEQ : null,
        '회수사유': rowC ? rowC.RTRVLPRVNS : null,
        '안전상태': safeStatusValue
      });
    });

    sendEvent({
      type: 'complete',
      result: resultRows,
      message: `분석 완료. 필터 조건에 부합하는 총 ${resultRows.length}건이 조회되었습니다.`
    });
    res.end();

  } catch (err) {
    logger.warn({ err }, '외부 API 실시간 호출 실패 -> 로컬 DB SQL Fallback 작동');
    sendEvent({ type: 'status', message: `[Fallback] 외부 API 호출 오류로 인해 내부 SQLite DB에서 5개 테이블 조인 SQL 쿼리를 직접 실행합니다.` });

    let sqlQuery = `
      SELECT 
          B.BAR_CD                AS "바코드",
          P.PRDLST_REPORT_NO      AS "품목제조보고번호",
          P.PRDLST_NM             AS "제품명",
          P.PRDLST_DCNM           AS "식품유형",
          E.BSSH_NM               AS "제조업체명",
          E.ADDR                  AS "주소",
          P.LCNS_NO               AS "인허가번호",
          CASE 
              WHEN H.HACCP_APPN_NO IS NOT NULL THEN 'Y'
              ELSE 'N'
          END                     AS "HACCP_적용여부",
          H.HACCP_APPN_NO         AS "HACCP_지정번호",
          C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
          C.RTRVLPRVNS            AS "회수사유",
          CASE 
              WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN '위험'
              ELSE '안전'
          END                     AS "안전상태"
      FROM I1250 P
      LEFT JOIN C005 B ON P.PRDLST_REPORT_NO = B.PRDLST_REPORT_NO
      LEFT JOIN I2500 E ON P.LCNS_NO = E.LCNS_NO
      LEFT JOIN I0580 H ON P.LCNS_NO = H.LCNS_NO
      LEFT JOIN I0490 C ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO
      WHERE 1=1
    `;
    const params = [];

    if (barcode) {
      sqlQuery += ` AND B.BAR_CD = ? `;
      params.push(barcode);
    }

    if (barcodeExist === 'Y') {
      sqlQuery += ` AND B.BAR_CD IS NOT NULL `;
    } else if (barcodeExist === 'N') {
      sqlQuery += ` AND B.BAR_CD IS NULL `;
    }

    if (haccp === 'Y') {
      sqlQuery += ` AND H.HACCP_APPN_NO IS NOT NULL `;
    } else if (haccp === 'N') {
      sqlQuery += ` AND H.HACCP_APPN_NO IS NULL `;
    }

    if (safeStatus === '위험') {
      sqlQuery += ` AND C.PRDLST_REPORT_NO IS NOT NULL `;
    } else if (safeStatus === '안전') {
      sqlQuery += ` AND C.PRDLST_REPORT_NO IS NULL `;
    }

    sqlQuery += ` LIMIT 10000;`;

    db.all(sqlQuery, params, (dbErr, rows) => {
      if (dbErr) {
        sendEvent({ type: 'error', message: 'SQLite 폴백 쿼리 오류: ' + dbErr.message });
      } else {
        sendEvent({
          type: 'complete',
          result: rows || [],
          message: `[SQL Fallback 결과] 로컬 DB에서 조건에 부합하는 총 ${(rows || []).length}건이 5개 테이블 조인으로 조회되었습니다.`
        });
      }
      res.end();
    });
  }
});

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

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
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

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

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
    res.status(500).json({ error: err.message });
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

  if (_wcCache[tableName] && (now - _wcCache[tableName].ts) < WC_TTL) {
    return res.json(_wcCache[tableName].words);
  }

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

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
app.use(express.static(__dirname));

// 서버 구동
// 농심 내부 시스템 사내 규격 데이터 세트 API (7개 테이블 조인)
app.get('/api/nongshim-dataset', async (req, res) => {
  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

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
    res.status(500).json({ error: err.message });
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
app.get('/api/tables/:tableName/keyword-count', async (req, res) => {
  const tableName = req.params.tableName;
  const keyword = req.query.keyword;
  if (!keyword) return res.json({ count: 0 });

  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

  try {
    const columns = await dbAll(`PRAGMA table_info("${tableName}")`);
    if (!columns.length) return res.json({ count: 0 });

    const conditions = columns.map(c => `CAST("${c.name}" AS TEXT) LIKE ?`).join(' OR ');
    const params = columns.map(() => `%${keyword}%`);
    const sql = `SELECT COUNT(*) AS cnt FROM "${tableName}" WHERE ${conditions}`;

    const rows = await dbAll(sql, params);
    res.json({ count: rows[0].cnt || 0 });
  } catch (err) {
    res.json({ count: 0 });
  }
});

app.get('/api/datasets', (req, res) => {
  const cacheMap = getCacheMap();

  db.all(
    `SELECT t.svc_no, t.svc_nm, t.cat, t.description, t.sample_data_length,
            GROUP_CONCAT(c.field, '||') AS fields_concat
     FROM api_tables t
     LEFT JOIN api_columns c ON t.svc_no = c.svc_no
     GROUP BY t.svc_no
     ORDER BY t.svc_no`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const datasets = rows.map(row => {
        const fieldNames = row.fields_concat ? row.fields_concat.split('||') : [];
        const cacheItem = cacheMap[String(row.svc_no)];
        return buildDatasetEntry(row, cacheItem, fieldNames);
      });

      res.json(datasets);
    }
  );
});

app.listen(PORT, () => {
  logger.info(`식품안전나라 통합 DB 웹 앱 서비스가 시작되었습니다. http://localhost:${PORT}`);
});

// ── DB ERD 스키마 API: 모든 테이블의 컬럼 정보를 일괄 반환 ──────────────────
app.get('/api/db-schema', (req, res) => {
  const dbAll = (sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params || [], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });

  (async () => {
    try {
      // 1) 모든 base 테이블 목록 (뷰, sqlite 내부 테이블 제외)
      const tables = await dbAll(
        `SELECT m.name, a.svc_nm, a.cat
         FROM sqlite_master m
         LEFT JOIN api_tables a ON m.name = a.svc_no
         WHERE m.type = 'table'
           AND m.name NOT LIKE 'sqlite_%'
           AND m.name NOT LIKE 'v_%'
           AND m.name NOT IN ('api_tables', 'api_columns')
         ORDER BY a.cat, m.name`
      );

      // 2) 각 테이블별 컬럼 정보 + 한글명 병합
      const result = [];
      for (const tbl of tables) {
        const cols = await dbAll(`PRAGMA table_info("${tbl.name}")`);
        const korNames = await dbAll(
          `SELECT field, kor_nm FROM api_columns WHERE replace(svc_no,'-','') = replace(?,'-','')`,
          [tbl.name]
        );
        const korMap = {};
        korNames.forEach(r => { korMap[r.field] = r.kor_nm; });

        result.push({
          table: tbl.name,
          label: tbl.svc_nm || tbl.name,
          category: tbl.cat || '기타',
          columns: cols.map(c => ({
            name: c.name,
            type: c.type || 'TEXT',
            pk: c.pk > 0,
            notNull: c.notnull > 0,
            kor: korMap[c.name] || ''
          }))
        });
      }

      res.json(result);
    } catch (err) {
      logger.error({ err }, '[db-schema] 스키마 조회 중 오류가 발생했습니다.');
      res.status(500).json({ error: err.message });
    }
  })();
});

// ── 테이블 간 공통키 연관관계 API (실제 데이터 존재 여부 검증 및 캐싱) ─────────────────────────
let cachedRelationships = null;


// =============================================================================
// /api/datasets — crawl_cache + DB를 합쳐서 동적으로 데이터셋 목록 반환
// datasetData.js 정적 파일을 대체한다.
// =============================================================================


app.get('/api/db-relationships', (req, res) => {
  const dbAll = (sql, p) => new Promise((ok, ng) => db.all(sql, p || [], (e, r) => e ? ng(e) : ok(r)));

  if (cachedRelationships) {
    return res.json(cachedRelationships);
  }

  (async () => {
    try {
      // 1. 공통 컬럼 메타 데이터 조회
      const colRows = await dbAll(
        `SELECT replace(svc_no,'-','') as tbl, field, kor_nm FROM api_columns
         WHERE field IS NOT NULL AND field != '' AND length(field) > 2`
      );
      // 2. 실제 SQLite에 적재된 전체 테이블 리스트 조회
      const tables = await dbAll(
        `SELECT name FROM sqlite_master WHERE type='table'
         AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'v_%'
         AND name NOT IN ('api_tables','api_columns')`
      );
      const validSet = new Set(tables.map(t => t.name));

      // 약한 식별자(공통 키로 보기 어렵고 값이 무의미하게 같을 수 있는 날짜, 여부 등 필터링)
      const isWeak = (f) =>
        /_NM$/i.test(f) || /_NAME$/i.test(f) || /_CD_NM$/i.test(f) ||
        /ADDR$/i.test(f) || /TEL/i.test(f) || /FAX/i.test(f) ||
        /_DT$/i.test(f) || /DTM$/i.test(f) || /DATE$/i.test(f) ||
        /_CN$/i.test(f) || /_DESC$/i.test(f) || /_MEMO$/i.test(f) ||
        /^AMT_NUM\d+$/.test(f) || /^(SEQ|NUM|CNT|QTY|YN)$/.test(f);

      const fieldMap = {};
      colRows.forEach(r => {
        if (!validSet.has(r.tbl) || isWeak(r.field)) return;
        if (!fieldMap[r.field]) fieldMap[r.field] = { tables: [], kor: r.kor_nm || r.field };
        if (!fieldMap[r.field].tables.includes(r.tbl)) fieldMap[r.field].tables.push(r.tbl);
      });

      // 3. 공통 필드별로 두 테이블 간의 실제 매치 여부를 검사할 태스크 생성
      const checkTasks = [];
      const rawRelationships = Object.entries(fieldMap)
        .filter(([, v]) => v.tables.length >= 2)
        .map(([key, v]) => ({ key, kor: v.kor, tables: v.tables }));

      rawRelationships.forEach(rel => {
        const tbls = rel.tables;
        // 각 공통키 필드에 대해 모든 가능한 테이블 쌍(T1, T2) 생성
        for (let i = 0; i < tbls.length; i++) {
          for (let j = i + 1; j < tbls.length; j++) {
            const tA = tbls[i];
            const tB = tbls[j];
            checkTasks.push({
              key: rel.key,
              kor: rel.kor,
              tA,
              tB,
              fn: async () => {
                try {
                  // SQLite EXISTS 쿼리로 실제 교집합 데이터가 최소 1건 이상 존재하는지 체크
                  // 빈 값이나 공백, 하이픈(-)은 조인 키 매칭에서 제외
                  const query = `
                    SELECT EXISTS(
                      SELECT 1 FROM "${tA}" a
                      INNER JOIN "${tB}" b ON a."${rel.key}" = b."${rel.key}"
                      WHERE a."${rel.key}" IS NOT NULL 
                        AND a."${rel.key}" != '' 
                        AND a."${rel.key}" != '-'
                    ) AS has_match
                  `;
                  const rows = await dbAll(query);
                  const matched = rows[0]?.has_match === 1;
                  return matched ? { tA, tB } : null;
                } catch (e) {
                  // 테이블이나 컬럼이 실제 DB에 불일치하거나 깨져 있는 경우 매칭 무시
                  return null;
                }
              }
            });
          }
        }
      });

      // 4. 동시 실행 부하 제어를 위한 청크 비동기 병렬 검증 (청크당 30개 실행)
      const verifiedEdgesMap = {};
      const chunkSize = 30;
      for (let i = 0; i < checkTasks.length; i += chunkSize) {
        const chunk = checkTasks.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(task => task.fn()));

        chunk.forEach((task, idx) => {
          const edge = chunkResults[idx];
          if (edge) {
            if (!verifiedEdgesMap[task.key]) {
              verifiedEdgesMap[task.key] = {
                key: task.key,
                kor: task.kor,
                edges: [],
                tablesSet: new Set()
              };
            }
            verifiedEdgesMap[task.key].edges.push({ from: edge.tA, to: edge.tB });
            verifiedEdgesMap[task.key].tablesSet.add(edge.tA);
            verifiedEdgesMap[task.key].tablesSet.add(edge.tB);
          }
        });
      }

      // 5. 실제 데이터 매칭 엣지가 존재하는 공통키 연관관계 최종 데이터 구축
      const result = Object.values(verifiedEdgesMap)
        .map(item => ({
          key: item.key,
          kor: item.kor,
          count: item.tablesSet.size,
          tables: Array.from(item.tablesSet),
          edges: item.edges
        }))
        .sort((a, b) => b.edges.length - a.edges.length); // 실제 매칭 연결선 수 기준으로 정렬

      cachedRelationships = result;
      res.json(result);
    } catch (err) {
      logger.error({ err }, '[db-relationships] 관계 분석 중 오류가 발생했습니다.');
      res.status(500).json({ error: err.message });
    }
  })();
});

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
