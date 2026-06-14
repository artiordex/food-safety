const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const REAL_API_KEY = process.env.FOOD_API_KEY || '';

module.exports = (db, dbAll, logger) => {
router.get('/join-scenarios', (req, res) => {
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
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});
router.post('/query', (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '쿼리 내용이 비어 있습니다.' });
  }

  logger.info({ query }, 'SQL 쿼리 실행 요청이 들어왔습니다.');

  // SELECT 등 조회 쿼리에만 대응하도록 간단히 체크 (데이터 훼손 방지)
  // 화이트리스트 방식: SELECT / EXPLAIN / PRAGMA 만 허용 (ATTACH 등 우회 차단)
  const ALLOWED_SQL = /^\s*(SELECT|EXPLAIN|PRAGMA\s+(table_info|table_list|index_list|foreign_key_list|database_list|compile_options|encoding|journal_mode|page_size|user_version|schema_version|quick_check|integrity_check))/i;
  if (!ALLOWED_SQL.test(query)) {
    return res.status(403).json({ error: '안전을 위해 조회(SELECT, EXPLAIN, PRAGMA) 목적의 쿼리만 실행이 허용됩니다.' });
  }

  readonlyDb.all(query, [], (err, rows) => {
    if (err) {
      logger.error({ err }, 'SQL 실행 중 오류가 발생했습니다.');
      return res.status(400).json({ error: 'SQL 실행 중 오류가 발생했습니다.' });
    }
    res.json(rows);
  });
});

  return router;
};
