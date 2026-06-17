/**
 * routes/tables.js
 * SQLite 테이블 탐색, 컬럼 검색, 데이터 미리보기 API 라우트
 * - GET /api/tables
 *     → sqlite_master와 api_tables를 조인해 전체 물리 테이블명·논리명을 반환
 * - GET /api/tables/column-search
 *     → 단일 키워드가 컬럼 메타데이터 또는 실제 데이터 값에 포함된 테이블 목록 반환
 * - POST /api/tables/column-search-multi
 *     → 여러 키워드별 매칭 테이블 목록을 반환해 AND/OR 검색 화면에서 사용
 * - GET /api/tables/:tableName/schema
 *     → 특정 테이블의 PRAGMA table_info 스키마 반환
 * - GET /api/tables/:tableName/data
 *     → 특정 테이블의 데이터 미리보기 반환, limit=all 또는 1~50000 제한 지원
 * - GET /api/tables/:tableName/keyword-count
 *     → 특정 테이블 전체 컬럼에서 키워드가 포함된 레코드 수 반환
 * - GET /api/tables/:tableName/wordcloud
 *     → 특정 테이블의 텍스트 컬럼을 분석해 워드클라우드용 단어 빈도 반환
 *
 * ⚠️ /column-search처럼 고정된 라우트는 /:tableName/... 동적 라우트보다 먼저 선언해야 합니다.
 *     tableName은 SQL 식별자로 직접 쓰이므로 영문·숫자·언더스코어·하이픈만 허용합니다.
 *
 * 참고: 워드클라우드 결과는 테이블별로 짧게 캐시하고, server.js에서 주입한 _tableCountsMap으로
 *      전체 테이블 목록과 테이블명 유효성을 확인합니다.
 */

const express = require('express');
const router = express.Router();

// db, dbAll, logger는 server.js에서 주입
module.exports = (db, dbAll, logger, _tableCountsMap) => {

  // tableName 검증 공통 함수
  const validateTableName = (tableName, res) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(tableName)) {
      res.status(400).json({ error: '유효하지 않은 테이블 명입니다.' });
      return false;
    }
    return true;
  };

  // 컬럼명의 큰따옴표를 이스케이프하여 SQL 식별자로 안전하게 감쌈
  const escapeCol = (colName) => colName.replace(/"/g, '""');

  // =============================================================================
  // 리터럴 라우트 (파람 라우트보다 반드시 먼저 선언)
  // =============================================================================

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

  // 2. 키워드 컬럼 검색 (단일 키워드)
  router.get('/column-search', async (req, res) => {
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

      // 2) 전체 테이블 데이터 스캔
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
              `SELECT COUNT(*) as cnt FROM "${tableName}" WHERE CAST("${escapeCol(col.name)}" AS TEXT) LIKE ?`,
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

  // 3. 다중 키워드 검색 (AND/OR 조건 지원)
  router.post('/column-search-multi', async (req, res) => {
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
          if (result[w].has(tableName)) continue;
          const colResults = await Promise.all(columns.map(async col => {
            try {
              const rows = await dbAll(
                `SELECT 1 FROM "${tableName}" WHERE CAST("${escapeCol(col.name)}" AS TEXT) LIKE ? LIMIT 1`,
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

  // =============================================================================
  // 파람 라우트 (리터럴 라우트 이후에 선언)
  // =============================================================================

  // 4. 특정 테이블 스키마
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

  // 5. 특정 테이블 상위 데이터
  router.get('/:tableName/data', (req, res) => {
    const { tableName } = req.params;
    if (!validateTableName(tableName, res)) return;

    const rawLimit = req.query.limit;
    let query = `SELECT * FROM "${tableName}"`;
    const params = [];

    if (rawLimit && rawLimit !== 'all') {
      const parsedLimit = parseInt(rawLimit, 10);
      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50000) {
        return res.status(400).json({ error: 'limit은 1~50000 사이의 정수여야 합니다.' });
      }
      query += ' LIMIT ?;';
      params.push(parsedLimit);
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

  // 6. 키워드 포함 레코드 수
  router.get('/:tableName/keyword-count', async (req, res) => {
    const { tableName } = req.params;
    const { keyword } = req.query;
    if (!keyword) return res.json({ count: 0 });
    if (!validateTableName(tableName, res)) return;

    try {
      const columns = await dbAll(`PRAGMA table_info("${tableName}")`);
      if (!columns.length) return res.json({ count: 0 });

      const conditions = columns.map(c => `CAST("${escapeCol(c.name)}" AS TEXT) LIKE ?`).join(' OR ');
      const params = columns.map(() => `%${keyword}%`);
      const sql = `SELECT COUNT(*) AS cnt FROM "${tableName}" WHERE ${conditions}`;

      const rows = await dbAll(sql, params);
      res.json({ count: rows[0].cnt || 0 });
    } catch (err) {
      logger.error({ err, tableName }, 'keyword-count 조회 중 오류가 발생했습니다.');
      res.json({ count: 0 });
    }
  });

  // 7. 워드클라우드 데이터
  const _wcCache = {};
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

  router.get('/:tableName/wordcloud', (req, res) => {
    const { tableName } = req.params;
    const now = Date.now();

    if (!validateTableName(tableName, res)) return;

    // [보안 검증] 실제 존재하는 테이블인지 확인 (SQL 인젝션 방지)
    // 'ALL' → 전체 테이블 스캔 (wordCloud.js 초기화 시 사용)
    const tableList = tableName === 'ALL'
      ? Object.keys(_tableCountsMap)
      : (() => {
          if (Object.keys(_tableCountsMap).length > 0 && !Object.prototype.hasOwnProperty.call(_tableCountsMap, tableName)) {
            logger.warn({ tableName }, '유효하지 않은 테이블명 파라미터 접근 차단');
            res.status(400).json({ error: '유효하지 않은 테이블명입니다.' });
            return null;
          }
          return [tableName];
        })();

    if (!tableList) return;

    if (_wcCache[tableName] && (now - _wcCache[tableName].ts) < WC_TTL) {
      return res.json(_wcCache[tableName].words);
    }

    const isTextCol = (name) => {
      const u = name.toUpperCase();
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
        .replace(/[^가-힣\s]/g, ' ')
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w.length >= 3 && !WC_STOPWORDS.has(w));
    };

    (async () => {
      try {
        const tables = tableList;
        const freq = {};
        const SAMPLE_LIMIT = 2000;

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
        logger.error({ err: e }, '[wordcloud] 예외 발생');
        res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
    })();
  });

  return router;
};
