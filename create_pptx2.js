const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

let slide = pptx.addSlide();
slide.background = { color: "FFFFFF" };

// Title
slide.addText("식품안전나라 공공데이터 현행 사이트 데이터맵", {
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
    if (count === 1) {
        start = (angleStartDeg + angleEndDeg) / 2 * Math.PI / 180;
    }
    
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
  '식품·제품': '#0d9488',
  '업체·영업자': '#1a5fb4',
  '원재료·첨가물': '#e11d48',
  '영양·건강': '#059669',
  '수입식품': '#d97706',
  '농·축·수산물': '#7c3aed',
  '기타': '#475569'
};

const center = { x: 3.8, y: 3.0 };
const mainRadius = 1.6;
const numHubs = 7;
const angles = [];
for (let i = 0; i < numHubs; i++) {
    angles.push(i * (360 / numHubs) - 90); 
}

const hubs = [
    { name: "식품·제품", count: "45종", x: center.x + mainRadius * Math.cos(angles[0]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[0]*Math.PI/180), color: colors['식품·제품'], 
      items: ["건강기능식품", "어린이기호식품", "식품회수", "위해식품 판별"],
      start: angles[0]-45, end: angles[0]+45 },
    { name: "업체·영업자", count: "38종", x: center.x + mainRadius * Math.cos(angles[1]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[1]*Math.PI/180), color: colors['업체·영업자'], 
      items: ["식품제조가공업", "식품첨가물제조", "수입식품영업", "HACCP인증"],
      start: angles[1]-40, end: angles[1]+40 },
    { name: "원재료·첨가물", count: "12종", x: center.x + mainRadius * Math.cos(angles[2]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[2]*Math.PI/180), color: colors['원재료·첨가물'], 
      items: ["식품첨가물 기준", "잔류농약 기준", "원재료 안전정보"],
      start: angles[2]-40, end: angles[2]+40 },
    { name: "영양·건강", count: "21종", x: center.x + mainRadius * Math.cos(angles[3]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[3]*Math.PI/180), color: colors['영양·건강'], 
      items: ["식품영양성분 DB", "나트륨/당류 저감", "식단정보"],
      start: angles[3]-40, end: angles[3]+40 },
    { name: "수입식품", count: "18종", x: center.x + mainRadius * Math.cos(angles[4]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[4]*Math.PI/180), color: colors['수입식품'], 
      items: ["수입식품 신고", "수입금지 성분", "해외제조업소"],
      start: angles[4]-40, end: angles[4]+40 },
    { name: "농축수산물", count: "15종", x: center.x + mainRadius * Math.cos(angles[5]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[5]*Math.PI/180), color: colors['농·축·수산물'], 
      items: ["축산물 가공업", "농산물 안전성", "수산물 방사능"],
      start: angles[5]-40, end: angles[5]+40 },
    { name: "기타", count: "20종", x: center.x + mainRadius * Math.cos(angles[6]*Math.PI/180), y: center.y + mainRadius * Math.sin(angles[6]*Math.PI/180), color: colors['기타'], 
      items: ["식중독 발생통계", "행정처분 내역", "기타 공공데이터"],
      start: angles[6]-40, end: angles[6]+40 }
];

// Draw connections between hubs
for (let i = 0; i < hubs.length; i++) {
    for (let j = i + 1; j < hubs.length; j++) {
        // Just draw lines to center and maybe ring
        if (j === (i + 1) % hubs.length) {
            addRotatedLine(hubs[i].x, hubs[i].y, hubs[j].x, hubs[j].y, "EEEEEE");
        }
    }
    // Line to center
    addRotatedLine(center.x, center.y, hubs[i].x, hubs[i].y, "DDDDDD");
}

// Center node
slide.addShape('ellipse', {
    x: center.x - 0.7, y: center.y - 0.7, w: 1.4, h: 1.4,
    fill: { color: "FFFFFF" },
    line: { color: "666666", width: 2, dashType: 'dash' }
});
slide.addText("식품안전\n공공데이터\n(169종)", {
    x: center.x - 0.6, y: center.y - 0.5, w: 1.2, h: 1.0,
    align: "center", valign: "middle", fontSize: 11, color: "333333", bold: true, fontFace: "Malgun Gothic"
});

hubs.forEach(h => {
    drawNodes(h.x, h.y, 0.9, h.items, h.color, h.start, h.end);
});

hubs.forEach(h => {
    slide.addShape('ellipse', {
        x: h.x - 0.55, y: h.y - 0.55, w: 1.1, h: 1.1,
        fill: { color: "FFFFFF" },
        line: { color: h.color, width: 1.5 }
    });
    slide.addShape('ellipse', {
        x: h.x - 0.45, y: h.y - 0.45, w: 0.9, h: 0.9,
        fill: { color: h.color }
    });
    slide.addText(`${h.name}\n${h.count}`, {
        x: h.x - 0.5, y: h.y - 0.4, w: 1.0, h: 0.8,
        align: "center", valign: "middle", fontSize: 10, color: "FFFFFF", bold: true, fontFace: "Malgun Gothic"
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

slide.addText("상세 데이터 정보", {
    x: px, y: py, w: pw, h: 0.4,
    color: "333333", bold: true, fontSize: 11,
    align: "left", valign: "middle", margin: [0, 0, 0, 10], fontFace: "Malgun Gothic"
});
slide.addShape('line', {
    x: px, y: py+0.4, w: pw, h: 0, line: { color: "DDDDDD" }
});

slide.addShape('rect', {
    x: px + 0.1, y: py + 0.5, w: 0.6, h: 0.25,
    fill: { color: colors['식품·제품'] },
    rectRadius: 0.1
});
slide.addText("식품·제품", {
    x: px + 0.1, y: py + 0.5, w: 0.6, h: 0.25,
    fontSize: 8, color: "FFFFFF", align: "center", valign: "middle", bold: true, fontFace: "Malgun Gothic"
});

const details = [
    { label: "데이터명", val: "건강기능식품 국내조제(제조) 품목신고" },
    { label: "보유기관", val: "식품의약품안전처" },
    { label: "부처", val: "식품의약품안전처" },
    { label: "분류", val: "식품·제품" },
    { label: "키워드", val: "건기식, 품목신고, 기능성식품" },
    { label: "설명", val: "국내에서 조제 및 제조되는 건강기능식품의 품목신고 기본정보를 제공하는 공공데이터입니다." },
    { label: "URL", val: "https://www.data.go.kr/data/15058721/openapi.do" },
    { label: "목록번호", val: "I2710" },
    { label: "목록수정일", val: "2024-03-12" }
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

pptx.writeFile({ fileName: "c:/식약처/food-safety/데이터맵_보고서_현행화.pptx" }).then(fileName => {
    console.log("PPTX created successfully: " + fileName);
});
