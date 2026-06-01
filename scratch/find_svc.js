const fs = require('fs');
const cache = JSON.parse(fs.readFileSync('../crawl_cache.json', 'utf8'));

const targets = [
  "건강기능식품 품목제조신고(원재료)",
  "건강기능식품 개별 인정형 정보",
  "건강기능식품 영양DB",
  "건강기능식품 기능성 원료인정현황"
];

for (const t of targets) {
  const matches = cache.filter(c => c.svc_nm.includes(t) || t.includes(c.svc_nm) || c.svc_nm.includes(t.split(' ')[0]));
  console.log(`\n--- Matches for "${t}" ---`);
  matches.forEach(m => {
    console.log(`${m.svc_no}: ${m.svc_nm}`);
  });
}
