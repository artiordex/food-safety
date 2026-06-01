const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

let slide = pptx.addSlide();
slide.background = { color: "FFFFFF" };

// Title
slide.addText("식품안전나라 공공데이터 데이터 맵", {
    x: 0.5, y: 0.3, w: 8.0, h: 0.5,
    fontSize: 20, color: "003366", bold: true, align: "left", fontFace: "Malgun Gothic"
});

function addRotatedLine(x1, y1, x2, y2, color) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = Math.sqrt(dx*dx + dy*dy);
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    let cx = (x1 + x2) / 2;
    let cy = (y1 + y2) / 2;
    slide.addShape('rect', {
        x: cx - length / 2,
        y: cy - 0.015,
        w: length,
        h: 0.03,
        fill: { color: color },
        rotate: angle
    });
}

function drawNodes(centerX, centerY, radius, items, color, angleStartDeg, angleEndDeg) {
    let count = items.length;
    let start = angleStartDeg * Math.PI / 180;
    let end = angleEndDeg * Math.PI / 180;
    let angleStep = count > 1 ? (end - start) / (count - 1) : 0;
    
    for (let i = 0; i < count; i++) {
        let angle = start + i * angleStep;
        let nx = centerX + radius * Math.cos(angle);
        let ny = centerY + radius * Math.sin(angle);
        
        addRotatedLine(centerX, centerY, nx, ny, "E0E0E0");
        
        slide.addShape('ellipse', {
            x: nx - 0.08, y: ny - 0.08, w: 0.16, h: 0.16, fill: { color: color }
        });
        
        let tx, align;
        if (nx > centerX + 0.1) {
            tx = nx + 0.12; align = "left";
        } else if (nx < centerX - 0.1) {
            tx = nx - 1.62; align = "right";
        } else {
            tx = nx - 0.75; align = "center";
        }
        
        slide.addText(items[i], {
            x: tx, y: ny - 0.12, w: 1.5, h: 0.24,
            fontSize: 9, color: "333333", align: align, valign: "middle", fontFace: "Malgun Gothic"
        });
    }
}

const colors = {
    publicData: "00B0B9",
    search: "595959",
    infoSys: "00529B",
    news: "E24A4A"
};

const hubs = [
    { name: "공공데이터", count: "37/500", x: 2.3, y: 3.0, color: colors.publicData, 
      items: ["식품제조가공업", "수입식품", "HACCP", "회수·판매중지", "행정처분", "식품첨가물", "영양성분", "건강기능식품", "어린이기호식품", "검사결과", "식중독 통계"],
      start: 90, end: 270 },
    { name: "검색어", count: "20,102", x: 4.8, y: 2.8, color: colors.search, 
      items: ["학교급식", "알레르기", "영양정보", "원산지", "식품이력", "회수정보"],
      start: 220, end: 320 },
    { name: "정보시스템", count: "27/31", x: 6.0, y: 1.4, color: colors.infoSys, 
      items: ["식품안전나라", "공공데이터포털", "식품행정통합", "통합식품안전정보망", "위해예방관리"],
      start: -45, end: 60 },
    { name: "보도자료", count: "19,571", x: 6.0, y: 4.3, color: colors.news, 
      items: ["식품안전 정책", "위해식품 회수", "소비자 안내", "수입검사 관련", "건강기능식품 관련"],
      start: 0, end: 135 }
];

addRotatedLine(2.3, 3.0, 4.8, 2.8, "DDDDDD");
addRotatedLine(4.8, 2.8, 6.0, 1.4, "DDDDDD");
addRotatedLine(4.8, 2.8, 6.0, 4.3, "DDDDDD");

hubs.forEach(h => {
    drawNodes(h.x, h.y, 1.4, h.items, h.color, h.start, h.end);
});

hubs.forEach(h => {
    slide.addShape('ellipse', {
        x: h.x - 0.7, y: h.y - 0.7, w: 1.4, h: 1.4,
        fill: { color: "FFFFFF" },
        line: { color: h.color, width: 1.5, dashType: 'dash' }
    });
    slide.addShape('ellipse', {
        x: h.x - 0.55, y: h.y - 0.55, w: 1.1, h: 1.1,
        fill: { color: h.color }
    });
    slide.addText(`${h.name}\n${h.count}`, {
        x: h.x - 0.5, y: h.y - 0.4, w: 1.0, h: 0.8,
        align: "center", valign: "middle", fontSize: 11, color: "FFFFFF", bold: true, fontFace: "Malgun Gothic"
    });
});

// Panel
let px = 7.4, py = 0.5, pw = 2.4, ph = 4.7;
slide.addShape('rect', {
    x: px, y: py, w: pw, h: ph,
    fill: { color: "FFFFFF" },
    line: { color: "DDDDDD", width: 1 },
    shadow: { type: 'outer', blur: 5, offset: 2, angle: 45, opacity: 0.1 }
});

slide.addText("알레르기, 학교급식 정보", {
    x: px, y: py, w: pw, h: 0.4,
    color: "333333", bold: true, fontSize: 11,
    align: "left", valign: "middle", margin: [0, 0, 0, 10], fontFace: "Malgun Gothic"
});
slide.addShape('line', {
    x: px, y: py+0.4, w: pw, h: 0, line: { color: "DDDDDD" }
});

slide.addShape('rect', {
    x: px + 0.1, y: py + 0.5, w: 0.6, h: 0.25,
    fill: { color: "00529B" },
    rectRadius: 0.1
});
slide.addText("개방데이터", {
    x: px + 0.1, y: py + 0.5, w: 0.6, h: 0.25,
    fontSize: 8, color: "FFFFFF", align: "center", valign: "middle", bold: true, fontFace: "Malgun Gothic"
});

const details = [
    { label: "데이터명", val: "학교알리미_학교정보" },
    { label: "보유기관", val: "한국교육학술정보원" },
    { label: "부처", val: "교육부" },
    { label: "데이터영역", val: "교육 - 초중등교육" },
    { label: "키워드", val: "정보공시, 학교, 학교급식" },
    { label: "설명", val: "공시 기준에 따라 학교알리미에 제공되며, 급식, 알레르기 유발 정보, 식단표 등 학교 주요 정보를 안내합니다." },
    { label: "URL", val: "https://www.data.go.kr/data/15134838/fileData.do" },
    { label: "목록번호", val: "15134838" },
    { label: "목록수정일", val: "2024-09-13" }
];

let curY = py + 0.85;
details.forEach(d => {
    let rowH = d.label === "설명" ? 0.7 : (d.label === "URL" ? 0.4 : 0.25);
    
    slide.addText(d.label, {
        x: px + 0.1, y: curY, w: 0.6, h: rowH,
        fontSize: 8, color: "666666", bold: true, valign: "top", fontFace: "Malgun Gothic"
    });
    slide.addText(d.val, {
        x: px + 0.7, y: curY, w: 1.6, h: rowH,
        fontSize: 8, color: "333333", valign: "top", wrap: true, fontFace: "Malgun Gothic"
    });
    
    curY += rowH + 0.05;
    slide.addShape('line', {
        x: px + 0.1, y: curY, w: pw - 0.2, h: 0, line: { color: "EEEEEE" }
    });
    curY += 0.05;
});

pptx.writeFile({ fileName: "c:/식약처/food-safety/데이터맵_보고서.pptx" }).then(fileName => {
    console.log("PPTX created successfully: " + fileName);
});
