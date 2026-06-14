const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = (db, dbAll, logger, _tableCountsMap, appDir) => {

  // crawl_cache 맵 (svc_no → { provd_instt_nm, ... })
  let _cacheMap = null;
  function getCacheMap() {
    if (_cacheMap) return _cacheMap;
    _cacheMap = {};
    try {
      const cachePath = path.join(appDir, 'crawler', 'crawl_cache.json');
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
    const dataCount = typeof _tableCountsMap[svcNo] !== 'undefined' ? _tableCountsMap[svcNo] : 0;
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

  // 테이블 간 공통키 연관관계 캐시
  let cachedRelationships = null;

  router.get('/datasets', (req, res) => {
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
        if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });

        const datasets = rows.map(row => {
          const fieldNames = row.fields_concat ? row.fields_concat.split('||') : [];
          const cacheItem = cacheMap[String(row.svc_no)];
          return buildDatasetEntry(row, cacheItem, fieldNames);
        });

        res.json(datasets);
      }
    );
  });

  router.get('/db-schema', (req, res) => {
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
        res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
    })();
  });

  router.get('/db-relationships', (req, res) => {
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

        // 약한 식별자 필터링
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
                    logger.error({ err: e }, '[datasets] 예외 발생');
                    return null;
                  }
                }
              });
            }
          }
        });

        // 4. 청크 비동기 병렬 검증 (청크당 30개 실행)
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

        // 5. 최종 연관관계 데이터 구축
        const result = Object.values(verifiedEdgesMap)
          .map(item => ({
            key: item.key,
            kor: item.kor,
            count: item.tablesSet.size,
            tables: Array.from(item.tablesSet),
            edges: item.edges
          }))
          .sort((a, b) => b.edges.length - a.edges.length);

        cachedRelationships = result;
        res.json(result);
      } catch (err) {
        logger.error({ err }, '[db-relationships] 관계 분석 중 오류가 발생했습니다.');
        res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
    })();
  });

  return router;
};
