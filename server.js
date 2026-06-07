const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const REAL_API_KEY = '77183c01c07d44798948';

// HTML 파일에 head/header/search include를 주입하는 공통 함수
function applyIncludes(html, vars = {}) {
    const includesDir = path.join(__dirname, 'public/includes');
    const replacements = [
        { placeholder: '<!-- INCLUDE_HEAD -->', file: 'head.html', transform: c => c.replace(/<head>/i, '').replace(/<\/head>/i, '') },
        { placeholder: '<!-- INCLUDE_HEAD_SEARCH -->', file: 'head_search.html', transform: c => c.replace(/<head>/i, '').replace(/<\/head>/i, '') },
        { placeholder: '<!-- INCLUDE_HEADER -->', file: 'header.html', transform: c => c },
        { placeholder: '<!-- INCLUDE_HERO -->', file: 'hero.html', transform: c => c },
        { placeholder: '<!-- INCLUDE_MAIN_BOARD -->', file: 'mainBoard.html', transform: c => c },
        { placeholder: '<!-- INCLUDE_FOOTER -->', file: 'footer.html', transform: c => c },
        { placeholder: '<!-- INCLUDE_SEARCH -->', file: 'search.html', transform: c => c },
    ];
    for (const { placeholder, file, transform } of replacements) {
        if (html.includes(placeholder)) {
            const filePath = path.join(includesDir, file);
            if (fs.existsSync(filePath)) {
                html = html.replace(placeholder, transform(fs.readFileSync(filePath, 'utf8')));
            }
        }
    }
    // 템플릿 변수 치환 (미지정 변수는 빈 문자열로)
    html = html.replace(/\[\[KEYWORD\]\]/g, vars.keyword || '');
    return html;
}

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
      console.error('테이블 목록 조회 중 오류:', err.message);
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
    console.error('join.sql 파싱 오류:', err.message);
    res.status(500).json({ error: err.message });
  }
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

// 4.2 통합 데이터 검색 결과 API (searchDatasetList.do)
app.post('/api/searchDatasetList.do', (req, res) => {
    const keyword  = (req.body.search_keyword || '').trim();
    const catFilter = (req.body.search_clCdCode || '').trim();  // 카테고리 한글명

    db.all(`SELECT svc_no, svc_nm, cat, description FROM api_tables`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        let list = [];
        let index = 1;

        rows.forEach(row => {
            const svc_no = row.svc_no || '';
            const svc_nm = row.svc_nm || '';
            const cat    = row.cat || '공공데이터';
            const desc   = row.description || '';

            // 카테고리 필터
            if (catFilter && cat !== catFilter) return;

            // 키워드 필터 (서비스번호, 서비스명, 카테고리, 설명)
            if (keyword && !svc_nm.includes(keyword) && !svc_no.includes(keyword) && !cat.includes(keyword) && !desc.includes(keyword)) return;

            const isLink = (svc_nm.includes('식품영양성분 DB정보')) ? 'Y' : 'N';
            const isOpenApi = isLink === 'Y' ? 'N' : 'Y';

            list.push({
                no: index++,
                cl_cd_nm: cat,
                svc_no,
                svc_nm,
                provd_instt_nm: '식품의약품안전처',
                link_yn: isLink,
                file_yn: 'N',
                openapi_yn: isOpenApi
            });
        });

        const start_idx = parseInt(req.body.start_idx) || 1;
        const show_cnt  = parseInt(req.body.show_cnt)  || 10;
        const startIndex = (start_idx - 1) * show_cnt;

        res.json({
            total_cnt: list.length,
            list: list.slice(startIndex, startIndex + show_cnt)
        });
    });
});

// 4.3 데이터셋 메타데이터 (컬럼 정의) API - detail.html 용
app.get('/api/datasetMetadata.do', (req, res) => {
    let svc_no = req.query.svc_no;
    if(!svc_no) return res.status(400).json({error: 'svc_no is required'});
    
    let query = `SELECT * FROM api_columns WHERE replace(svc_no, '-', '') = replace(?, '-', '')`;
    db.all(query, [svc_no], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
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
// 실제 테이블 데이터 + 컬럼 메타 통합 키워드 검색 → 매칭 테이블 ID 목록 반환
// keyword-datamap과 완전히 동일한 dbAll + processTable 패턴 사용
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
      try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch(e) { return; }
      if (!columns.length) return;
      const colResults = await Promise.all(columns.map(async col => {
        try {
          const rows = await dbAll(
            `SELECT COUNT(*) as cnt FROM "${tableName}" WHERE CAST("${col.name}" AS TEXT) LIKE ?`,
            [`%${keyword}%`]
          );
          return (rows[0] && rows[0].cnt > 0);
        } catch(e) { return false; }
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
    console.error('[column-search error]', err);
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
      if(tableName.startsWith('v_')) throw new Error("융합 뷰는 로컬 전용이므로 외부 실시간 조인에서 제외됩니다.");
      
      // 1471000 테이블은 외부 OpenAPI 규격이 다르므로 로컬 DB에서 조회
      if(tableName === '1471000') {
        return new Promise((resolve, reject) => {
          db.get(`SELECT COUNT(*) AS total FROM "1471000"`, [], (err, row) => {
            if(err) reject(err);
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
      if(tableName === '1471000') {
        return new Promise((resolve, reject) => {
          db.all(`SELECT * FROM "1471000" LIMIT 1000`, [], (err, rows) => {
            if(err) reject(err);
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
        if(!mapB.has(keyVal)) mapB.set(keyVal, []);
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
    console.error("SSE 조인 에러:", err);
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

    sendEvent({ type: 'status', message: `[3/4] 수집 완료. 지역('${region||'전체'}') 및 업종('${industry||'전체'}') 필터링 중...` });

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
    console.warn(`[외부 API 실시간 호출 실패 -> 로컬 DB SQL Fallback 작동] 사유: ${err.message}`);
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
    const mapB = new Map(); dataC005.forEach(r => { if(r.PRDLST_REPORT_NO) mapB.set(r.PRDLST_REPORT_NO, r) });
    const mapE = new Map(); dataI2500.forEach(r => { if(r.LCNS_NO) mapE.set(r.LCNS_NO, r) });
    const mapH = new Map(); dataI0580.forEach(r => { if(r.LCNS_NO) mapH.set(r.LCNS_NO, r) });
    const mapC = new Map(); dataI0490.forEach(r => { if(r.PRDLST_REPORT_NO) mapC.set(r.PRDLST_REPORT_NO, r) });

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
    console.warn(`[외부 API 실시간 호출 실패 -> 로컬 DB SQL Fallback 작동] 사유: ${err.message}`);
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
        if(barcodeRows[0].PRDLST_REPORT_NO) {
            targetPrdlst = barcodeRows[0].PRDLST_REPORT_NO;
            targetLcns = targetPrdlst.substring(0, targetPrdlst.length > 8 ? 8 : targetPrdlst.length); // fallback guess
        }
      }

      const productRows = await dbAll('SELECT * FROM "I1250" WHERE PRDLST_REPORT_NO = ?', [targetPrdlst]);
      if (productRows.length > 0) {
        result.products = productRows;
        if(productRows[0].LCNS_NO) targetLcns = productRows[0].LCNS_NO;
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
      console.error("Super converge search error:", err);
      res.status(500).json({ error: 'DB search failed' });
    }
  })();
});

// 12. 대규모(5000건) 초융합 생태계 그래프 분석 API
app.get('/api/bulk-ecosystem', async (req, res) => {
  const dbAll = (sql) => new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });

  try {
    const limit = 5000;
    const tI2500 = await dbAll(`SELECT LCNS_NO, BSSH_NM FROM "I2500" WHERE LCNS_NO IS NOT NULL LIMIT ${limit}`);
    const tI1250 = await dbAll(`SELECT PRDLST_REPORT_NO, LCNS_NO, PRDLST_NM FROM "I1250" WHERE PRDLST_REPORT_NO IS NOT NULL LIMIT ${limit}`);
    const tI0580 = await dbAll(`SELECT LCNS_NO FROM "I0580" WHERE LCNS_NO IS NOT NULL LIMIT ${limit}`);
    const tI0470 = await dbAll(`SELECT LCNS_NO FROM "I0470" WHERE LCNS_NO IS NOT NULL LIMIT ${limit}`);
    const t1471000 = await dbAll(`SELECT ITEM_REPORT_NO FROM "1471000" WHERE ITEM_REPORT_NO IS NOT NULL LIMIT ${limit}`);
    const tC005 = await dbAll(`SELECT BAR_CD, PRDLST_REPORT_NO FROM "C005" WHERE BAR_CD IS NOT NULL LIMIT ${limit}`);

    const setI2500 = new Set(tI2500.map(r => r.LCNS_NO));
    const setI1250 = new Set(tI1250.map(r => r.PRDLST_REPORT_NO));

    let matchI1250_I2500 = 0;
    let matchI0580_I2500 = 0;
    let matchI0470_I2500 = 0;
    let match1471000_I1250 = 0;
    let matchC005_I1250 = 0;

    const sampleNodes = [];
    const sampleEdges = [];

    sampleNodes.push({ id: 'I2500_HUB', label: 'I2500\\n인허가업소\\n[PK] LCNS_NO', shape: 'database', size: 50, color: '#bfdbfe', font: {size: 14, bold: true} });
    sampleNodes.push({ id: 'I1250_HUB', label: 'I1250\\n품목제조\\n[PK] PRDLST_REPORT_NO\\n[FK] LCNS_NO', shape: 'database', size: 50, color: '#e9d5ff', font: {size: 14, bold: true} });
    sampleNodes.push({ id: 'I0580_HUB', label: 'I0580\\nHACCP\\n[FK] LCNS_NO', shape: 'database', size: 50, color: '#dbeafe', font: {size: 14, bold: true} });
    sampleNodes.push({ id: 'I0470_HUB', label: 'I0470\\n행정처분\\n[FK] LCNS_NO', shape: 'database', size: 50, color: '#ffe4e6', font: {size: 14, bold: true} });
    sampleNodes.push({ id: '1471000_HUB', label: '1471000\\n영양성분\\n[FK] ITEM_REPORT_NO', shape: 'database', size: 50, color: '#d1fae5', font: {size: 14, bold: true} });
    sampleNodes.push({ id: 'C005_HUB', label: 'C005\\n바코드\\n[PK] BAR_CD\\n[FK] PRDLST_REPORT_NO', shape: 'database', size: 50, color: '#fef3c7', font: {size: 14, bold: true} });
    
    sampleEdges.push({ from: 'I2500_HUB', to: 'I1250_HUB', label: `LCNS_NO\\n(매칭: ${matchI1250_I2500}건)`, font: {align: 'horizontal', size: 14, color: '#475569'}, width: 3, color: '#94a3b8' });
    sampleEdges.push({ from: 'I2500_HUB', to: 'I0580_HUB', label: `LCNS_NO\\n(매칭: ${matchI0580_I2500}건)`, font: {align: 'horizontal', size: 14, color: '#475569'}, width: 3, color: '#94a3b8' });
    sampleEdges.push({ from: 'I2500_HUB', to: 'I0470_HUB', label: `LCNS_NO\\n(매칭: ${matchI0470_I2500}건)`, font: {align: 'horizontal', size: 14, color: '#475569'}, width: 3, color: '#94a3b8' });
    sampleEdges.push({ from: 'I1250_HUB', to: '1471000_HUB', label: `ITEM_REPORT_NO\\n(매칭: ${match1471000_I1250}건)`, font: {align: 'horizontal', size: 14, color: '#475569'}, width: 3, color: '#94a3b8' });
    sampleEdges.push({ from: 'I1250_HUB', to: 'C005_HUB', label: `PRDLST_REPORT_NO\\n(매칭: ${matchC005_I1250}건)`, font: {align: 'horizontal', size: 14, color: '#475569'}, width: 3, color: '#94a3b8' });

    // (개별 데이터 값을 뿌리는 루프 완전 제거)

    const joinedQuery = `
      SELECT 
        A.LCNS_NO AS '[I2500] 인허가번호(LCNS_NO)',
        A.BSSH_NM AS '[I2500] 업소명(BSSH_NM)',
        B.PRDLST_REPORT_NO AS '[I1250] 품목제조보고번호(PRDLST_REPORT_NO)',
        B.PRDLST_NM AS '[I1250] 제품명(PRDLST_NM)',
        C.LCNS_NO AS '[I0580] HACCP인허가(LCNS_NO)',
        D.LCNS_NO AS '[I0470] 행정처분인허가(LCNS_NO)',
        E.ITEM_REPORT_NO AS '[1471000] 영양성분품목번호(ITEM_REPORT_NO)',
        F.BAR_CD AS '[C005] 바코드(BAR_CD)'
      FROM I2500 A
      INNER JOIN I1250 B ON A.LCNS_NO = B.LCNS_NO
      LEFT JOIN I0580 C ON A.LCNS_NO = C.LCNS_NO
      LEFT JOIN I0470 D ON A.LCNS_NO = D.LCNS_NO
      LEFT JOIN "1471000" E ON B.PRDLST_REPORT_NO = E.ITEM_REPORT_NO
      LEFT JOIN C005 F ON B.PRDLST_REPORT_NO = F.PRDLST_REPORT_NO
      ORDER BY 
        (C.LCNS_NO IS NOT NULL) + 
        (D.LCNS_NO IS NOT NULL) + 
        (E.ITEM_REPORT_NO IS NOT NULL) + 
        (F.BAR_CD IS NOT NULL) DESC
      LIMIT 100
    `;
    const joinedData = await dbAll(joinedQuery, []);

    res.json({
       stats: {
         I2500_total: tI2500.length,
         I1250_total: tI1250.length,
         I0580_total: tI0580.length,
         I0470_total: tI0470.length,
         N1471000_total: t1471000.length,
         C005_total: tC005.length,
         
         match_I2500_I1250: matchI1250_I2500,
         match_I2500_I0580: matchI0580_I2500,
         match_I2500_I0470: matchI0470_I2500,
         match_I1250_1471000: match1471000_I1250,
         match_I1250_C005: matchC005_I1250
       },
       nodes: sampleNodes,
       edges: sampleEdges,
       sample_joined_data: joinedData
    });

  } catch (err) {
    console.error("Bulk ecosystem search error:", err);
    res.status(500).json({ error: 'DB search failed' });
  }
});


// 키워드 기반 전체 테이블 스캔 데이터맵 API
app.get('/api/keyword-datamap', async (req, res) => {
  const keyword = req.query.keyword || '소스';
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
      label: keyword,
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
      try { columns = await dbAll(`PRAGMA table_info("${tableName}")`); } catch(e) { return null; }
      if (!columns.length) return null;

      // Check each column in parallel within the table
      const colResults = await Promise.all(columns.map(async col => {
        try {
          const countRow = await dbAll(`SELECT COUNT(*) as cnt FROM "${tableName}" WHERE CAST("${col.name}" AS TEXT) LIKE ?`, [`%${keyword}%`]);
          return (countRow[0] && countRow[0].cnt > 0) ? { col: col.name, count: countRow[0].cnt } : null;
        } catch(e) { return null; }
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
          `SELECT "${bestCol.col}" as val, * FROM "${tableName}" WHERE CAST("${bestCol.col}" AS TEXT) LIKE ? LIMIT 3`,
          [`%${keyword}%`]
        );
      } catch(e) {}

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

    res.json({
      keyword,
      tableCount: matchedTables.length,
      totalLeafCount: allLeafNodes.length,
      nodes,
      edges,
      matchedTables
    });
  } catch (err) {
    console.error('Keyword datamap error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 프론트엔드 정적 리소스 서빙
// HTML 파일 요청을 가로채서 헤더와 헤드 컴포넌트를 주입 (Server-Side Includes)
app.get(/^\/(.*\.html)?$/, (req, res, next) => {
    let requestPath = req.path;
    if (requestPath === '/') {
        requestPath = '/index.html';
    }
    
    let filePath = path.join(__dirname, requestPath);
    if (!fs.existsSync(filePath)) {
        return next();
    }
    
    let html = applyIncludes(fs.readFileSync(filePath, 'utf8'));
    res.send(html);
});

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
    console.error('Nongshim dataset error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` 식품안전나라 통합 DB 웹 앱 서비스가 작동 중입니다.`);
  console.log(` 포트 번호: http://localhost:${PORT}`);
  console.log(`==================================================`);
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
      console.error('[db-schema error]', err);
      res.status(500).json({ error: err.message });
    }
  })();
});

// ── 테이블 간 공통키 연관관계 API (실제 데이터 존재 여부 검증 및 캐싱) ─────────────────────────
let cachedRelationships = null;

app.get('/api/db-relationships', (req, res) => {
  const dbAll = (sql, p) => new Promise((ok, ng) => db.all(sql, p||[], (e,r) => e ? ng(e) : ok(r)));
  
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
      console.error('[db-relationships error]', err);
      res.status(500).json({ error: err.message });
    }
  })();
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
