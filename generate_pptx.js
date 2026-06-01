const sqlite3 = require('sqlite3').verbose();
const pptxgen = require('pptxgenjs');
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'foodsafety.db');
const db = new sqlite3.Database(dbPath);

async function generateDataMapPPTX() {
    console.log('데이터 분석 시작...');

    // 1. I2500 (인허가 업소 정보) 1000개 데이터 조회
    const i2500Query = `SELECT LCNS_NO FROM "I2500" WHERE LCNS_NO IS NOT NULL LIMIT 1000`;
    
    const lcnsList = await new Promise((resolve, reject) => {
        db.all(i2500Query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(r => r.LCNS_NO));
        });
    });

    console.log(`I2500 기준 데이터 ${lcnsList.length}건 확보 완료.`);
    
    if(lcnsList.length === 0) {
        console.error("I2500 테이블에 데이터가 없습니다.");
        return;
    }

    const placeholders = lcnsList.map(() => '?').join(',');

    // 2. 조인 관계 데이터 카운트 조회
    const i0580Count = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(DISTINCT LCNS_NO) as count FROM "I0580" WHERE LCNS_NO IN (${placeholders})`, lcnsList, (err, row) => {
            if (err) resolve(0); // 테이블이 없거나 에러 시 0
            else resolve(row.count);
        });
    });

    const i0470Count = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(DISTINCT LCNS_NO) as count FROM "I0470" WHERE LCNS_NO IN (${placeholders})`, lcnsList, (err, row) => {
            if (err) resolve(0);
            else resolve(row.count);
        });
    });

    const i1250Count = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(DISTINCT LCNS_NO) as count FROM "I1250" WHERE LCNS_NO IN (${placeholders})`, lcnsList, (err, row) => {
            if (err) resolve(0);
            else resolve(row.count);
        });
    });

    console.log(`조인 매칭 건수 - I0580: ${i0580Count}건, I0470: ${i0470Count}건, I1250: ${i1250Count}건`);

    // 3. PPTX 생성
    console.log('PPTX 생성 중...');
    let pptx = new pptxgen();
    pptx.author = 'Antigravity AI';
    pptx.company = '식품안전나라';
    pptx.subject = '데이터맵';
    pptx.title = 'I2500 인허가 업소 기준 조인 데이터맵';

    // Slide 1: Title
    let slide1 = pptx.addSlide();
    slide1.addText('식품안전 통합 데이터맵\n(I2500 인허가 업소 중심)', { 
        x: 0, y: 2, w: '100%', h: 1.5, 
        align: 'center', fontSize: 36, bold: true, color: '1f3864' 
    });
    slide1.addText(`분석 대상: I2500 데이터 ${lcnsList.length}건\n공통 연결 키: LCNS_NO (인허가번호)`, { 
        x: 0, y: 3.5, w: '100%', h: 1, 
        align: 'center', fontSize: 18, color: '595959' 
    });

    // Slide 2: ERD Diagram
    let slide2 = pptx.addSlide();
    slide2.addText('조인 관계도 (Entity-Relationship Data Map)', { 
        x: 0.5, y: 0.5, w: '90%', h: 0.8, 
        fontSize: 24, bold: true, color: '1f3864', border: {type: 'bottom', pt: 2, color: '1f3864'} 
    });

    // 중심 노드: I2500
    slide2.addShape(pptx.ShapeType.rect, { 
        x: 4, y: 2.5, w: 2.5, h: 1.2, 
        fill: { color: '4f81bd' }, 
        line: { color: '385d8a', width: 2 },
        rectRadius: 0.2
    });
    slide2.addText('I2500\n식품(첨가물)인허가\n업소정보 마스터', { 
        x: 4, y: 2.5, w: 2.5, h: 1.2, 
        align: 'center', fontSize: 14, bold: true, color: 'ffffff', valign: 'middle'
    });
    slide2.addText(`샘플 데이터: ${lcnsList.length}건`, { 
        x: 4, y: 3.8, w: 2.5, h: 0.5, 
        align: 'center', fontSize: 12, color: '385d8a', bold: true
    });

    // 노드 함수
    const addNode = (x, y, title, desc, matchCount, matchRatio) => {
        slide2.addShape(pptx.ShapeType.rect, { 
            x: x, y: y, w: 2.2, h: 1.0, 
            fill: { color: 'dbe5f1' }, 
            line: { color: '95b3d7', width: 1.5 },
            rectRadius: 0.1
        });
        slide2.addText(`${title}\n${desc}`, { 
            x: x, y: y, w: 2.2, h: 1.0, 
            align: 'center', fontSize: 12, bold: true, color: '1f497d', valign: 'middle'
        });
        
        // 연결선
        const cx = 5.25; // center x of main node
        const cy = 3.1; // center y of main node
        const nx = x + 1.1;
        const ny = y + 0.5;
        
        slide2.addShape(pptx.ShapeType.line, { 
            x: Math.min(cx, nx), y: Math.min(cy, ny),
            w: Math.abs(cx - nx), h: Math.abs(cy - ny),
            line: { color: 'ffc000', width: 2, dashType: 'dash' }
        });
        
        // 매칭률 텍스트
        slide2.addText(`매칭: ${matchCount}건\n(조인율: ${matchRatio}%)`, { 
            x: nx > cx ? x - 1 : x + 2.3, 
            y: ny > cy ? y - 0.5 : y + 0.5, 
            w: 1.5, h: 0.6, 
            align: 'center', fontSize: 10, color: 'c0504d', bold: true
        });
    };

    // 노드 배치
    const ratio0580 = ((i0580Count / lcnsList.length) * 100).toFixed(1);
    addNode(1, 1, 'I0580', 'HACCP 인증 정보', i0580Count, ratio0580);
    
    const ratio0470 = ((i0470Count / lcnsList.length) * 100).toFixed(1);
    addNode(7, 1, 'I0470', '행정처분 내역', i0470Count, ratio0470);
    
    const ratio1250 = ((i1250Count / lcnsList.length) * 100).toFixed(1);
    addNode(4, 5, 'I1250', '품목제조보고마스터', i1250Count, ratio1250);

    // Slide 3: 조인 분석 결과 인사이트
    let slide3 = pptx.addSlide();
    slide3.addText('데이터 조인 분석 인사이트', { 
        x: 0.5, y: 0.5, w: '90%', h: 0.8, 
        fontSize: 24, bold: true, color: '1f3864', border: {type: 'bottom', pt: 2, color: '1f3864'} 
    });

    slide3.addText([
        { text: 'I2500 (인허가 업소) 중심 1,000건 매칭 요약', options: { fontSize: 18, bold: true, color: '000000', bullet: true, breakLine: true } },
        { text: `• HACCP(I0580) 교집합: 1,000개 업소 중 ${i0580Count}건 (${ratio0580}%) 이 매칭되었습니다.`, options: { fontSize: 14, indentLevel: 1, breakLine: true } },
        { text: `• 행정처분(I0470) 교집합: 1,000개 업소 중 ${i0470Count}건 (${ratio0470}%) 이 매칭되었습니다.`, options: { fontSize: 14, indentLevel: 1, breakLine: true } },
        { text: `• 품목제조(I1250) 교집합: 1,000개 업소 중 ${i1250Count}건 (${ratio1250}%) 이 매칭되었습니다.`, options: { fontSize: 14, indentLevel: 1, breakLine: true } },
        { text: '\n' },
        { text: '활용 방안 (Use Case)', options: { fontSize: 18, bold: true, color: '000000', bullet: true, breakLine: true } },
        { text: '• 이 데이터맵을 통해 인허가번호(LCNS_NO)만으로 특정 업소의 HACCP 지정 여부, 행정처분 이력, 제조한 품목들까지 원스톱으로 확장 조회가 가능합니다.', options: { fontSize: 14, indentLevel: 1, breakLine: true } },
        { text: '• 추후 융합 분석 웹사이트에서 시각화 대시보드로 발전시킬 수 있습니다.', options: { fontSize: 14, indentLevel: 1 } }
    ], { x: 0.5, y: 1.5, w: '90%', h: 3.5, color: '333333' });

    const outPath = path.join(__dirname, '데이터맵.pptx');
    await pptx.writeFile({ fileName: outPath });
    console.log(`PPTX 생성 완료: ${outPath}`);
    
    db.close();
}

generateDataMapPPTX().catch(err => {
    console.error(err);
    db.close();
});
