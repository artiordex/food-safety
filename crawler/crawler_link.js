/**
 * 식품영양성분 DB정보 API 수집 스크립트
 *
 * 주요 기능:
 * 1. 공공데이터포털 식품영양성분 API 호출
 * 2. 수집한 데이터의 메타데이터를 crawl_cache.json에 저장
 * 3. 샘플 데이터를 crawler/samples/1471000.json에 저장
 * 4. SQLite foodsafety.db에 1471000 테이블 생성 및 데이터 적재
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const pino = require('pino');

// 로그 설정
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

// SQLite DB 파일 경로 설정
const dbPath = path.join(__dirname, '../db', 'foodsafety.db');

// SQLite DB 연결 생성
const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    logger.error({ err }, 'SQLite DB 연결 중 오류가 발생했습니다.');
    process.exit(1);
  }

  logger.info('SQLite DB 연결이 완료되었습니다.');
});

// 식품영양성분 DB정보 API 호출 URL
const url = 'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=edacbf8d03ba77b54a1e5c7d9f1149b47582fc23fc9b1e038776fc5b896e143d&pageNo=1&numOfRows=500&type=json';

logger.info('식품영양성분 API 데이터 수집을 시작합니다.');

fetch(url)
  // API 응답을 JSON 형식으로 변환
  .then(res => {
    if (!res.ok) {
      throw new Error(`API 응답 오류: HTTP ${res.status}`);
    }
    return res.json();
  })

  // 변환된 JSON 데이터 처리
  .then(data => {
    // API 응답 본문에서 데이터 목록 추출
    const items = data?.body?.items;

    // 수집된 데이터가 없을 경우 처리 중단
    if (!items || items.length === 0) {
      logger.warn('API 응답에서 수집할 데이터가 없습니다.');
      db.close();
      return;
    }

    logger.info({ count: items.length }, 'API 데이터 수집이 완료되었습니다.');

    /**
     * 캐시 파일 업데이트
     *
     * crawl_cache.json에 API 메타데이터를 저장함
     * 기존에 동일한 svc_no가 있으면 갱신하고, 없으면 새로 추가함
     */

    const cachePath = path.join(__dirname, 'crawl_cache.json');
    let cache = [];

    if (fs.existsSync(cachePath)) {
      try {
        cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        logger.info('기존 캐시 파일을 불러왔습니다.');
      } catch (err) {
        logger.warn({ err }, '캐시 파일 파싱에 실패하여 빈 캐시로 처리합니다.');
      }
    } else {
      logger.info('기존 캐시 파일이 없어 새로 생성합니다.');
    }

    // 첫 번째 데이터 항목을 기준으로 필드 메타데이터 생성
    const fields = Object.keys(items[0]).map(col => ({
      field: col,
      kor_nm: col,
      type: typeof items[0][col] === 'number' ? 'NUMBER' : 'STRING',
      length: '',
      desc: col,
      sample: String(items[0][col] || '')
    }));

    // API 메타데이터 구성
    const metaData = {
      svc_no: '1471000',
      svc_nm: '식품영양성분 DB정보',
      cat: '식품영양정보',
      cat_code: 'API_SRT03',
      provd_instt_nm: '식품의약품안전처',
      data_type_nm: 'LINK',
      detail_url: 'https://www.data.go.kr/data/15100070/openapi.do',
      type_cd: 'API_TYPE06',
      fields: fields,
      desc: '공공데이터포털 식품영양성분 데이터',
      error: '',
      sample_url: url,
      sample_data_length: JSON.stringify(items).length
    };

    // 기존 캐시에서 동일한 서비스 번호가 있는지 확인
    const existingIndex = cache.findIndex(d => d.svc_no === '1471000');

    if (existingIndex >= 0) {
      cache[existingIndex] = metaData;
      logger.info('기존 메타데이터를 갱신했습니다.');
    } else {
      cache.push(metaData);
      logger.info('신규 메타데이터를 추가했습니다.');
    }

    // 갱신된 캐시 데이터를 JSON 파일로 저장
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
    logger.info('crawl_cache.json 파일 저장이 완료되었습니다.');

    /**
     * 샘플 데이터 저장
     *
     * 수집 데이터 중 앞 5건을 crawler/samples/1471000.json 파일로 저장함
     */

    const sampleDir = path.join(__dirname, 'samples');

    if (!fs.existsSync(sampleDir)) {
      fs.mkdirSync(sampleDir, { recursive: true });
      logger.info('샘플 데이터 저장 디렉터리를 생성했습니다.');
    }

    const samplePath = path.join(sampleDir, '1471000.json');

    fs.writeFileSync(
      samplePath,
      JSON.stringify(items.slice(0, 5), null, 2),
      'utf-8'
    );

    logger.info('샘플 데이터 파일 저장이 완료되었습니다.');

    /**
     * SQLite DB 저장 처리
     *
     * 1471000 테이블을 새로 생성하고 API 수집 데이터를 적재함
     */

    const columns = Object.keys(items[0]);
    const columnDefs = columns.map(col => `"${col}" TEXT`).join(', ');
    const createTableSql = `CREATE TABLE IF NOT EXISTS "1471000" (${columnDefs})`;

    db.serialize(() => {
      // 기존 테이블 삭제
      db.run(`DROP TABLE IF EXISTS "1471000"`, err => {
        if (err) {
          logger.error({ err }, '기존 1471000 테이블 삭제 중 오류가 발생했습니다.');
          db.close();
          return;
        }

        logger.info('기존 1471000 테이블을 삭제했습니다.');
      });

      // 신규 테이블 생성
      db.run(createTableSql, err => {
        if (err) {
          logger.error({ err }, '1471000 테이블 생성 중 오류가 발생했습니다.');
          db.close();
          return;
        }

        logger.info('1471000 테이블 생성이 완료되었습니다.');

        const placeholders = columns.map(() => '?').join(', ');
        const insertSql = `INSERT INTO "1471000" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;
        const stmt = db.prepare(insertSql);

        let count = 0;
        let insertErrorCount = 0;

        db.parallelize(() => {
          items.forEach(item => {
            const values = columns.map(col =>
              typeof item[col] === 'object'
                ? JSON.stringify(item[col])
                : item[col] || null
            );

            stmt.run(values, err => {
              if (err) {
                insertErrorCount++;
                logger.error({ err }, '데이터 행 삽입 중 오류가 발생했습니다.');
              } else {
                count++;
              }
            });
          });
        });

        stmt.finalize(err => {
          if (err) {
            logger.error({ err }, '데이터 삽입 마무리 처리 중 오류가 발생했습니다.');
            db.close();
            return;
          }

          logger.info(
            {
              insertedRows: count,
              failedRows: insertErrorCount
            },
            '1471000 테이블 데이터 적재가 완료되었습니다.'
          );

          db.close(closeErr => {
            if (closeErr) {
              logger.error({ err: closeErr }, 'SQLite DB 연결 종료 중 오류가 발생했습니다.');
              return;
            }

            logger.info('SQLite DB 연결을 정상적으로 종료했습니다.');
          });
        });
      });
    });
  })

  // API 호출 또는 전체 처리 중 오류 발생 시 출력
  .catch(err => {
    logger.error({ err }, 'API 데이터 수집 처리 중 오류가 발생했습니다.');

    db.close(closeErr => {
      if (closeErr) {
        logger.error({ err: closeErr }, '오류 처리 중 DB 연결 종료에 실패했습니다.');
      }
    });
  });