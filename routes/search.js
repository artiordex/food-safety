/**
 * routes/search.js
 * 데이터 검색 화면과 데이터셋 목록·메타데이터 API 라우트
 * - POST/GET /api/datasetAllSearch.do
 *     → public/includes/search.html을 include 처리해 통합 검색 페이지로 반환
 * - GET /api/categoryList.do
 *     → api_tables 기준 카테고리 목록과 데이터셋 수 반환
 * - GET /api/providerList.do
 *     → crawler/crawl_cache.json 기준 제공기관 목록 반환
 * - POST /api/search
 *     → 데이터 구조 검색 조건에 맞는 데이터셋 목록 반환
 * - POST /api/searchDatasetList.do
 *     → 키워드·카테고리·제공기관·유형 조건으로 데이터셋 목록 검색
 * - GET /api/dataset-tree
 *     → crawler/crawl_cache.json에 저장된 전체 데이터셋 트리 반환
 * - GET /api/datasetMetadata.do
 *     → api_columns 기준 특정 데이터셋의 컬럼 정의 반환
 *
 * ⚠️ 이 라우터는 /api에 마운트되며, /api/:keyId/:serviceId/... 형태의 OpenAPI 프록시보다
 *     먼저 등록되어야 합니다. 그렇지 않으면 datasetAllSearch.do 같은 고정 경로가 프록시 라우트에
 *     먼저 매칭될 수 있습니다.
 *
 * 참고: crawl_cache.json과 search.html은 반복 파일 읽기를 줄이기 위해 메모리에 캐시합니다.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

module.exports = (db, applyIncludes, logger, appDir) => {

  // crawl_cache 맵 (svc_no → { provd_instt_nm, data_type_nm })
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

  let _datasetTreeCache = null;

  // search.html을 최초 요청 시 한 번만 읽어 캐싱 (요청마다 readFileSync 방지)
  let _searchHtmlCache = null;
  function getSearchHtml() {
    if (!_searchHtmlCache) {
      _searchHtmlCache = fs.readFileSync(path.join(appDir, 'public/includes/search.html'), 'utf8');
    }
    return _searchHtmlCache;
  }

  // 4.1 통합 데이터 검색 페이지 서빙
  router.post('/datasetAllSearch.do', (req, res) => {
    const keyword = req.body.search_keyword || '';
    res.send(applyIncludes(getSearchHtml(), { keyword }));
  });

  router.get('/datasetAllSearch.do', (req, res) => {
    const keyword = req.query.search_keyword || '';
    res.send(applyIncludes(getSearchHtml(), { keyword }));
  });

  // 4.2a 카테고리 목록 API
  router.get('/categoryList.do', (req, res) => {
    db.all(`SELECT DISTINCT cat, COUNT(*) as cnt FROM api_tables WHERE cat IS NOT NULL AND cat != '' GROUP BY cat ORDER BY cnt DESC`, [], (err, rows) => {
      if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      res.json(rows.map(r => ({ cat: r.cat, cnt: r.cnt })));
    });
  });

  // 제공기관 목록 API
  router.get('/providerList.do', (req, res) => {
    const map = getCacheMap();
    const providers = [...new Set(Object.values(map).map(v => v.provd_instt_nm))].sort();
    res.json({ list: providers });
  });

  // 데이터구조 검색 API
  router.post('/search', (req, res) => {
    const svcTypeCode = (req.body.search_svcTypeCode || '').trim();
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

  // 4.2 통합 데이터 검색 결과 API
  router.post('/searchDatasetList.do', (req, res) => {
    const keyword = (req.body.search_keyword || '').trim();
    const catFilter = (req.body.search_clCdCode || '').trim();
    const typeFilter = (req.body.search_svcTypeCode || '').trim();
    const provdFilter = (req.body.search_provdInsttCode || '').trim();

    // keyword·cat 필터를 SQL WHERE로 처리해 DB 풀스캔 방지
    let query = 'SELECT svc_no, svc_nm, cat, description FROM api_tables WHERE 1=1';
    const params = [];
    if (catFilter) {
      query += ' AND cat = ?';
      params.push(catFilter);
    }
    if (keyword) {
      query += ' AND (svc_nm LIKE ? OR svc_no LIKE ? OR cat LIKE ? OR description LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
    }

    db.all(query, params, (err, rows) => {
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

        // typeFilter·provdFilter는 crawl_cache 기반이므로 JS에서 처리
        if (typeFilter === 'API_TYPE05' && typeNm !== 'LINK') return;
        if (typeFilter === 'API_TYPE06' && typeNm !== 'XML/JSON') return;
        if (typeFilter === 'API_TYPE03') return;
        if (provdFilter && provdNm !== provdFilter) return;

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
  router.get('/dataset-tree', (req, res) => {
    try {
      if (_datasetTreeCache) {
        return res.json(_datasetTreeCache);
      }
      const cachePath = path.join(appDir, 'crawler', 'crawl_cache.json');
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

  // 4.3 데이터셋 메타데이터 (컬럼 정의) API
  router.get('/datasetMetadata.do', (req, res) => {
    const svc_no = req.query.svc_no;
    if (!svc_no) return res.status(400).json({ error: 'svc_no is required' });

    const query = `SELECT * FROM api_columns WHERE replace(svc_no, '-', '') = replace(?, '-', '')`;
    db.all(query, [svc_no], (err, rows) => {
      if (err) return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      res.json(rows);
    });
  });

  return router;
};
