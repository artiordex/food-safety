/**
 * routes/stream.js
 * Server-Sent Events(SSE) 기반 실시간 스트리밍 라우트
 * - GET /api/live-join-stream?tableA=&tableB=&joinKey=
 *     → 두 테이블을 joinKey 로 JOIN하여 결과를 SSE로 청크 단위 전송
 * - GET /api/live-hygiene-stream
 *     → 식품접객업소 위생등급 데이터를 SSE로 스트리밍
 * - GET /api/live-barcode-stream
 *     → 바코드 연계 제품 정보를 SSE로 스트리밍
 *
 * ⚠️ 테이블명 파라미터는 SQL 인젝션 방지를 위해 정규식으로 화이트리스트 검증합니다.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = (db, dbAll, logger, REAL_API_KEY) => {
router.get('/live-join-stream', async (req, res) => {
  const { tableA, tableB, joinKey } = req.query;

  // [보안 검증] tableA, tableB 파라미터가 허용된 형식인지 검증 (SSRF 방지)
  const TABLE_NAME_RE = /^[A-Za-z0-9_]{1,30}$/;
  if (!TABLE_NAME_RE.test(tableA) || !TABLE_NAME_RE.test(tableB)) {
    logger.warn({ tableA, tableB }, '유효하지 않은 테이블명 파라미터 접근 차단');
    return res.status(400).json({ error: '유효하지 않은 테이블명입니다.' });
  }

  // SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // 클라이언트 연결 종료 감지 — 이후 sendEvent 호출을 무시하여 EPIPE 방지
  let isClosed = false;
  req.on('close', () => { isClosed = true; });

  const sendEvent = (data) => {
    if (isClosed) return;
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
    sendEvent({ type: 'error', message: '조인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    res.end();
  }
});
router.get('/live-hygiene-stream', async (req, res) => {
  const { region, industry, violation } = req.query;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // 클라이언트 연결 종료 감지 — 이후 sendEvent 호출을 무시하여 EPIPE 방지
  let isClosed = false;
  req.on('close', () => { isClosed = true; });

  const sendEvent = (data) => {
    if (isClosed) return;
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
          logger.error({ err: e }, '[stream] 예외 발생');
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
        logger.error({ err: dbErr }, 'SQLite 폴백 쿼리 실행 중 오류');
        sendEvent({ type: 'error', message: '데이터 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
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
router.get('/live-barcode-stream', async (req, res) => {
  const { barcode, barcodeExist, haccp, safeStatus } = req.query;

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // 클라이언트 연결 종료 감지 — 이후 sendEvent 호출을 무시하여 EPIPE 방지
  let isClosed = false;
  req.on('close', () => { isClosed = true; });

  const sendEvent = (data) => {
    if (isClosed) return;
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
          logger.error({ err: e }, '[stream] 예외 발생');
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
        logger.error({ err: dbErr }, 'SQLite 폴백 쿼리 실행 중 오류');
        sendEvent({ type: 'error', message: '데이터 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
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

  return router;
};
