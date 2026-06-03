const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../db', 'foodsafety.db');
const db = new sqlite3.Database(dbPath);

const url = 'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=edacbf8d03ba77b54a1e5c7d9f1149b47582fc23fc9b1e038776fc5b896e143d&pageNo=1&numOfRows=500&type=json';

console.log('Fetching data from API...');
fetch(url)
  .then(res => res.json())
  .then(data => {
    const items = data.body.items;
    if (!items || items.length === 0) {
      console.log("No items found");
      return;
    }

    // ── 캐시 업데이트 (crawl_cache.json) ──
    const cachePath = path.join(__dirname, 'crawl_cache.json');
    let cache = [];
    if (fs.existsSync(cachePath)) {
      try {
        cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      } catch (err) { }
    }

    const fields = Object.keys(items[0]).map(col => ({
      field: col,
      kor_nm: col, // 따로 한글명이 없으므로 필드명을 임시 사용
      type: typeof items[0][col] === 'number' ? 'NUMBER' : 'STRING',
      length: "",
      desc: col,
      sample: String(items[0][col] || "")
    }));

    const metaData = {
      svc_no: "1471000",
      svc_nm: "식품영양성분 DB정보",
      cat: "식품영양정보",
      cat_code: "API_SRT03",
      detail_url: "https://www.data.go.kr/data/15100070/openapi.do",
      type_cd: "API_TYPE06",
      fields: fields,
      desc: "공공데이터포털 식품영양성분 데이터",
      error: "",
      sample_url: url,
      sample_data_length: JSON.stringify(items).length
    };

    const existingIndex = cache.findIndex(d => d.svc_no === '1471000');
    if (existingIndex >= 0) {
      cache[existingIndex] = metaData;
    } else {
      cache.push(metaData);
    }

    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
    console.log('[완료] crawler/crawl_cache.json 에 메타데이터 추가 성공');

    // ── 샘플 파일 저장 (crawler/samples/1471000.json) ──
    const sampleDir = path.join(__dirname, 'samples');
    if (!fs.existsSync(sampleDir)) fs.mkdirSync(sampleDir, { recursive: true });
    fs.writeFileSync(path.join(sampleDir, '1471000.json'), JSON.stringify(items.slice(0, 5), null, 2), 'utf-8');
    console.log('[완료] crawler/samples/1471000.json 샘플 파일 저장 성공');

    // ── DB 저장 로직 ──
    const columns = Object.keys(items[0]);
    const columnDefs = columns.map(col => `"${col}" TEXT`).join(', ');

    const createTableSql = `CREATE TABLE IF NOT EXISTS "1471000" (${columnDefs})`;

    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS "1471000"`);
      db.run(createTableSql, (err) => {
        if (err) {
          console.error("Error creating table:", err);
          return;
        }
        console.log('Table "1471000" created successfully.');

        const placeholders = columns.map(() => '?').join(', ');
        const insertSql = `INSERT INTO "1471000" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;

        const stmt = db.prepare(insertSql);

        let count = 0;
        db.parallelize(() => {
          items.forEach(item => {
            const values = columns.map(col => typeof item[col] === 'object' ? JSON.stringify(item[col]) : item[col] || null);
            stmt.run(values, (err) => {
              if (err) {
                console.error("Error inserting row:", err);
              } else {
                count++;
              }
            });
          });
        });

        stmt.finalize(() => {
          console.log(`Successfully inserted ${count} rows into table "1471000".`);
          db.close();
        });
      });
    });
  })
  .catch(err => console.error("Fetch error:", err));
