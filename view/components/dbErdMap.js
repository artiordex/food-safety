/**
 * dbErdMap.js - 로컬 DB ERD 시각화 (D3.js 기반 동적 물리 시뮬레이션 레이아웃)
 *              + 데이터 관계도 (Vis.js 포스 다이렉티드 네트워크) 통합
 */
import { renderRelationDataMap } from './relationDataMap.js';

const CAT_COLORS = [
  { accent: '#3b82f6', light: '#eff6ff', border: '#bfdbfe' },
  { accent: '#10b981', light: '#f0fdf4', border: '#a7f3d0' },
  { accent: '#ec4899', light: '#fdf2f8', border: '#fbcfe8' },
  { accent: '#f59e0b', light: '#fffbeb', border: '#fde68a' },
  { accent: '#6366f1', light: '#eef2ff', border: '#c7d2fe' },
  { accent: '#14b8a6', light: '#f0fdfa', border: '#99f6e4' },
  { accent: '#ef4444', light: '#fef2f2', border: '#fecaca' },
  { accent: '#a855f7', light: '#faf5ff', border: '#e9d5ff' },
  { accent: '#22c55e', light: '#f0fdf4', border: '#bbf7d0' },
  { accent: '#f97316', light: '#fff7ed', border: '#fed7aa' },
  { accent: '#06b6d4', light: '#ecfeff', border: '#a5f3fc' },
  { accent: '#e879f9', light: '#fdf4ff', border: '#f0abfc' },
  { accent: '#84cc16', light: '#f7fee7', border: '#d9f99d' },
  { accent: '#fb923c', light: '#fff7ed', border: '#fed7aa' },
  { accent: '#38bdf8', light: '#f0f9ff', border: '#bae6fd' },
];

const CARD_W = 260;
const CARD_H_COL = 20;
const CARD_HEADER = 38;
const MAX_COLS = 7;

// 공통키 테마 칼라 맵
const KEY_COLORS = {
  'LCNS_NO': '#2563eb',
  'PRDLST_REPORT_NO': '#10b981',
  'BAR_CD': '#d97706',
  'BARCODE_NO': '#d97706',
  'HACCP_NO': '#8b5cf6',
  'HCCP_NO': '#8b5cf6',
  'PRDLST_CD': '#06b6d4',
  'BSSH_NO': '#ec4899',
  'FOOD_CD': '#f97316',
  'CRTFC_NO': '#e879f9',
  'ITEM_REPORT_NO': '#22c55e'
};

// CDN을 이용해 D3.js 동적 주입 헬퍼
function loadD3(callback) {
  if (window.d3) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://d3js.org/d3.v7.min.js';
  script.onload = () => callback();
  script.onerror = () => {
    console.error('D3.js 로드 실패');
  };
  document.head.appendChild(script);
}

// 각 카드의 높이 계산
function getCardHeight(t) {
  const colCount = Math.min((t.columns || []).length, MAX_COLS);
  const extra = (t.columns || []).length > MAX_COLS ? 14 : 4;
  return CARD_HEADER + colCount * CARD_H_COL + extra;
}

// 테이블 카드 렌더링용 HTML 템플릿 (D3 노드 바인딩용)
function getTableCardMarkup(t, isSelected, colorInfo) {
  const cols = (t.columns || []).slice(0, MAX_COLS);
  const extra = (t.columns || []).length - MAX_COLS;
  const cardH = getCardHeight(t);
  const c = colorInfo;
  
  let colRows = '';
  cols.forEach((col, i) => {
    const bg = i % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'rgba(0,0,0,0.003)';
    const nameColor = col.pk ? '#b45309' : '#374151';
    const prefix = col.pk ? '🔑 ' : '  ';
    
    // 물리명 + 논리명(한글명) 병합 표기
    const displayName = col.kor 
      ? `${col.name} (${col.kor})`
      : col.name;
    
    // 카드 영역을 넘지 않도록 말줄임 처리
    const cutName = displayName.length > 25 
      ? displayName.substring(0, 24) + '…' 
      : displayName;

    const typeShort = (col.type || 'TEXT').replace('VARCHAR', 'VC').replace('NUMERIC', 'NUM').substring(0, 8);
    
    colRows += `
      <rect x="0" y="${CARD_HEADER + i * CARD_H_COL}" width="${CARD_W}" height="${CARD_H_COL}" fill="${bg}"/>
      <text x="6" y="${CARD_HEADER + i * CARD_H_COL + 14}" font-size="8.5" fill="${nameColor}" font-family="sans-serif">${prefix}${cutName}</text>
      <text x="${CARD_W - 6}" y="${CARD_HEADER + i * CARD_H_COL + 14}" font-size="8" fill="${c.accent}aa" text-anchor="end" font-family="monospace">${typeShort}</text>`;
  });

  const extraText = extra > 0
    ? `<text x="${CARD_W / 2}" y="${CARD_HEADER + cols.length * CARD_H_COL + 11}" font-size="8.5" fill="#94a3b8" text-anchor="middle">+ ${extra}개 컬럼 더 있음</text>`
    : '';

  const fillColor = isSelected ? c.light : '#ffffff';
  const strokeColor = isSelected ? c.accent : c.border;
  const strokeW = isSelected ? 2.5 : 1.5;
  // 논리형한글명(물리테이블명) 조합
  const displayTitle = t.label && t.label !== t.table 
    ? `${t.label}(${t.table})` 
    : t.table;
    
  // 가로 크기를 넘어가지 않도록 제목 글자수 제한 보정
  const cutTitle = displayTitle.length > 29 
    ? displayTitle.substring(0, 28) + '…' 
    : displayTitle;

  return `
    <g class="erd-card-container">
      <rect x="3" y="3" width="${CARD_W}" height="${cardH}" rx="8" fill="rgba(0,0,0,0.04)"/>
      <rect width="${CARD_W}" height="${cardH}" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeW}"/>
      <rect width="${CARD_W}" height="28" rx="8" fill="${c.accent}"/>
      <rect y="20" width="${CARD_W}" height="8" fill="${c.accent}"/>
      <text x="8" y="21" font-size="9.5" font-weight="700" fill="#fff" font-family="sans-serif">${cutTitle}</text>
      ${colRows}
      ${extraText}
    </g>`;
}

export function renderDbErdMap(container) {
  // CSS 애니메이션 및 D3 용 스타일 주입
  if (!document.getElementById('erd-d3-styles')) {
    const style = document.createElement('style');
    style.id = 'erd-d3-styles';
    style.textContent = `
      @keyframes dash {
        to { stroke-dashoffset: -20; }
      }
      .active-relation-line {
        stroke-dasharray: 6 4;
        animation: dash 1s linear infinite;
      }
      .erd-key-badge {
        transition: all 0.2s ease;
      }
      .erd-key-badge:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .erd-card-node {
        cursor: grab;
      }
      .erd-card-node:active {
        cursor: grabbing;
      }
    `;
    document.head.appendChild(style);
  }

  container.innerHTML = `
    <div id="erd-wrap" style="display:flex;flex-direction:column;height:100%;min-height:85vh;background:#f8fafc;">
      <!-- 컨트롤 바 -->
      <div style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:14px;font-weight:700;color:#1e293b;display:flex;align-items:center;gap:6px;">
          🗄️ 데이터 ERD (동적 물리 맵)
          <span id="erd-count" style="font-size:11px;background:#f1f5f9;color:#475569;border-radius:99px;padding:2px 8px;"></span>
        </span>
        <input id="erd-search" type="text" placeholder="테이블명 / 서비스명 검색…"
          style="flex:1;min-width:180px;max-width:240px;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:6px 12px;color:#1e293b;font-size:13px;outline:none;"/>
        <select id="erd-cat-filter"
          style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;color:#1e293b;font-size:12px;outline:none;">
          <option value="전체">전체 카테고리</option>
        </select>
        <div style="display:flex;gap:4px;align-items:center;">
          <button id="erd-zoom-in" style="background:#ffffff;border:1px solid #cbd5e1;color:#475569;border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:18px;line-height:1;">+</button>
          <span id="erd-zoom-label" style="font-size:11px;color:#475569;min-width:38px;text-align:center;">100%</span>
          <button id="erd-zoom-out" style="background:#ffffff;border:1px solid #cbd5e1;color:#475569;border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:18px;line-height:1;">−</button>
          <button id="erd-reset" style="background:#ffffff;border:1px solid #cbd5e1;color:#475569;border-radius:6px;padding:0 8px;height:28px;cursor:pointer;font-size:11px;">구조 초기화</button>
        </div>
        <span style="font-size:11px;color:#64748b;">마우스 드래그: 배경 이동 | 휠: 줌 | 카드 드래그: 고정 및 물리력 작동</span>
        <button id="erd-rel-toggle" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:4px 10px;color:#2563eb;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:4px;font-weight:500;">🔗 관계선 ON</button>
        <span id="erd-rel-count" style="font-size:11px;color:#64748b;"></span>
      </div>

      <!-- 공통키 필터 레전드 영역 -->
      <div id="erd-key-legend" style="padding:8px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;overflow-x:auto;">
        <span style="font-size:11px;font-weight:700;color:#64748b;margin-right:4px;">공통키 관계 탐색:</span>
        <div id="erd-key-badges" style="display:flex;gap:6px;flex-wrap:wrap;">
          <span class="erd-key-badge" data-key="all" style="cursor:pointer;font-size:10px;background:#2563eb;color:#ffffff;padding:2px 8px;border-radius:99px;font-weight:600;">전체 보기</span>
        </div>
      </div>
 
      <!-- SVG 뷰포트 -->
      <div id="erd-viewport" style="flex:1;overflow:hidden;position:relative;">
        <svg id="erd-svg" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;overflow:visible;">
          <defs>
            <pattern id="erd-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0L0 0 0 50" fill="none" stroke="#f1f5f9" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc"/>
          <rect id="erd-grid-rect" width="100%" height="100%" fill="url(#erd-grid)" style="pointer-events:none;"/>
          
          <!-- D3 줌 대상 그룹 -->
          <g id="erd-zoom-container">
            <g id="erd-links-group"></g>
            <g id="erd-nodes-group"></g>
            <g id="erd-labels-group"></g>
          </g>
        </svg>
      </div>
 
      <!-- 우측 상세 패널 -->
      <div id="erd-detail" style="display:none;position:absolute;right:0;top:0;bottom:0;width:320px;
        background:#ffffff;border-left:1px solid #e2e8f0;overflow-y:auto;z-index:50;flex-direction:column;box-shadow:-2px 0 10px rgba(0,0,0,0.05);">
      </div>
    </div>`;

  // 상태 변수
  let schema = [];
  let relationships = [];
  let categories = [];
  let filterCat = '전체';
  let searchTerm = '';
  let selectedTable = null;
  let selectedKey = 'all';
  let showRelations = true;

  // D3 컴포넌트 객체들
  let nodes = [];
  let links = [];
  let simulation = null;
  let zoomBehavior = null;

  const svg = d3.select('#erd-svg');
  const zoomContainer = d3.select('#erd-zoom-container');
  const linksGroup = d3.select('#erd-links-group');
  const nodesGroup = d3.select('#erd-nodes-group');
  const labelsGroup = d3.select('#erd-labels-group');
  const viewport = document.getElementById('erd-viewport');
  const detail = document.getElementById('erd-detail');
  const countEl = document.getElementById('erd-count');

  // 로딩 인디케이터
  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#475569;background:#f8fafc;z-index:99;';
  loadingDiv.innerHTML = `<div style="font-size:36px;margin-bottom:12px;animation:epulse 1.5s infinite">⚙️</div><div style="font-size:14px;font-weight:600;">물리 시뮬레이션 ERD 로딩 중…</div>`;
  viewport.appendChild(loadingDiv);

  // 1. D3.js 로딩 후 실행
  loadD3(() => {
    fetchData();
  });

  // 데이터 로드
  function fetchData() {
    Promise.all([
      fetch('/api/db-schema').then(r => r.json()),
      fetch('/api/db-relationships').then(r => r.json())
    ]).then(([schemaData, relData]) => {
      schema = schemaData;
      relationships = relData;
      
      // 카테고리 추출
      const cats = new Set(schema.map(t => t.category || '기타'));
      categories = Array.from(cats);
      
      // 카테고리 필터 채우기
      const sel = document.getElementById('erd-cat-filter');
      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat; opt.textContent = cat;
        sel.appendChild(opt);
      });

      loadingDiv.remove();
      
      // D3 시뮬레이터 셋업
      initD3Simulation();
      renderKeyBadges();
      bindEvents();
    }).catch(err => {
      console.error(err);
      loadingDiv.innerHTML = `<div style="color:#ef4444;font-size:14px;">⚠️ 스키마 로드 실패: ${err.message}</div>`;
    });
  }

  // D3 시뮬레이션 및 데이터 매핑
  function initD3Simulation() {
    const width = viewport.offsetWidth || 1200;
    const height = viewport.offsetHeight || 800;

    // 카테고리별 컬러 인덱스 맵 생성
    const categoryBaseColors = {
      '기준규격정보': '#3b82f6', '식품 등': '#10b981', '폐업정보': '#f59e0b',
      '식품위해관리': '#ef4444', '업체인허가현황': '#8b5cf6', '이력추적관리': '#06b6d4',
      '건강기능식품': '#f97316', '축산물': '#6366f1', '코드정보': '#ec4899',
      '식품안전관리': '#14b8a6', '수입식품 등': '#84cc16', '검사기관정보': '#a855f7',
      '위생용품': '#f43f5e', '수질환경정보': '#0ea5e9', '어린이식품안전관리': '#3b82f6',
      '식품영양정보': '#10b981', 'HACCP지정현황': '#f59e0b', '용어사전': '#ef4444'
    };
    const catColorMap = {};
    categories.forEach((cat, idx) => {
      if (categoryBaseColors[cat]) {
        const base = categoryBaseColors[cat];
        catColorMap[cat] = { accent: base, light: base + '15', border: base + '40' };
      } else {
        catColorMap[cat] = CAT_COLORS[idx % CAT_COLORS.length];
      }
    });

    // 1. 노드 데이터 정의
    nodes = schema.map((t, idx) => {
      const color = catColorMap[t.category || '기타'] || CAT_COLORS[0];
      // 카테고리별로 초기 위치를 약간 다른 그룹 영역에 뿌려주어 물리 뭉침이 원활해지도록 분산
      const catIdx = categories.indexOf(t.category || '기타');
      const angle = (catIdx / categories.length) * 2 * Math.PI;
      const radius = 600 + Math.random() * 800;
      
      return {
        id: t.table,
        tableData: t,
        color: color,
        // D3 물리 속성
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        fx: null,
        fy: null
      };
    });

    // 2. 링크 데이터 매핑 (관계 차수 1:1, 1:N, N:M 분석 탑재)
    const getRelationType = (fromT, toT, key) => {
      const isUniqueKey = (table, col) => {
        const t = String(table).toUpperCase();
        const c = String(col).toUpperCase();
        if (t === 'I2500' && (c === 'LCNS_NO' || c === 'BSSH_NO')) return true;
        if (t === 'I1250' && c === 'PRDLST_REPORT_NO') return true;
        if (t === 'I2530' && c === 'TESTITM_CD') return true;
        if (t === 'I0470' && c === 'DSPSDTLS_SEQ') return true;
        if (t === 'C001' && c === 'LCNS_NO') return true;
        return false;
      };

      const fromUniq = isUniqueKey(fromT, key);
      const toUniq = isUniqueKey(toT, key);

      if (fromUniq && toUniq) return '1:1';
      if (fromUniq && !toUniq) return '1:N';
      if (!fromUniq && toUniq) return 'N:1';
      return 'N:M';
    };

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    links = [];
    
    relationships.forEach(rel => {
      if (!rel.edges) return;
      
      rel.edges.forEach(edge => {
        if (nodeMap.has(edge.from) && nodeMap.has(edge.to)) {
          links.push({
            source: edge.from,
            target: edge.to,
            key: rel.key,
            kor: rel.kor,
            relType: getRelationType(edge.from, edge.to, rel.key)
          });
        }
      });
    });

    // 3. D3 Zoom 설정 (무한 줌 및 잘림 방지 격자 패턴 연동)
    zoomBehavior = d3.zoom()
      .scaleExtent([0.02, 5])
      .on('zoom', (event) => {
        zoomContainer.attr('transform', event.transform);
        // 줌 비율 실시간 표시
        document.getElementById('erd-zoom-label').textContent = Math.round(event.transform.k * 100) + '%';
        // 격자 패턴의 transform을 마우스 줌/팬과 동기화하여 무한 배경으로 잘림 없이 흐르게 만듦
        d3.select('#erd-grid').attr('patternTransform', event.transform.toString());
      });

    svg.call(zoomBehavior);
    // 초기 줌: 전체 170개 노드 집합이 짤리지 않고 다 보일 수 있도록 0.15배 줌아웃 상태로 시작
    svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(width * 0.42, height * 0.42).scale(0.12));

    // 4. Force 물리 시뮬레이션 설정 (사전 연산으로 겹침 방지 최적화)
    simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(240).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-2000).distanceMax(2000))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force('collision', d3.forceCollide().radius(180)); // 테이블 카드 충돌 반경 여유 있게 확보

    // 화면에 겹쳐서 그려지는 현상을 없애기 위해 물리 엔진을 백그라운드에서 400틱 강제 사전 연산
    simulation.stop();
    for (let i = 0; i < 400; i++) {
      simulation.alpha(0.1);
      simulation.tick();
    }

    // 요소들을 먼저 DOM에 생성 (이 시점엔 좌표가 적용되지 않음)
    updateView();
    // 생성된 DOM에 사전 연산된 완벽한 x,y 좌표 일괄 적용
    ticked();
    
    // 이후 상호작용(드래그 등)을 위한 틱 핸들러 등록
    simulation.on('tick', ticked);
  }

  // 매 틱마다 위치 업데이트
  function ticked() {
    // 헬퍼: CCW 판별법을 사용한 선분 교차 검사
    const ccw = (A, B, C) => {
      return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
    };
    const isLineIntersectingLine = (p1, p2, p3, p4) => {
      return (ccw(p1, p3, p4) !== ccw(p2, p3, p4)) && (ccw(p1, p2, p3) !== ccw(p1, p2, p4));
    };
    const isLineIntersectingRect = (p1, p2, rect) => {
      const top = [{x: rect.left, y: rect.top}, {x: rect.right, y: rect.top}];
      const bottom = [{x: rect.left, y: rect.bottom}, {x: rect.right, y: rect.bottom}];
      const left = [{x: rect.left, y: rect.top}, {x: rect.left, y: rect.bottom}];
      const right = [{x: rect.right, y: rect.top}, {x: rect.right, y: rect.bottom}];
      
      return [top, bottom, left, right].some(side => 
        isLineIntersectingLine(p1, p2, side[0], side[1])
      );
    };

    // 각 링크의 최적 경로와 중간 라벨 위치 사전 계산
    const linkPathAndLabelCoords = new Map();

    links.forEach(d => {
      const sourceId = d.source.id || d.source;
      const targetId = d.target.id || d.target;

      const sx = d.source.x + CARD_W / 2;
      const sy = d.source.y + getCardHeight(d.source.tableData) / 2;
      const tx = d.target.x + CARD_W / 2;
      const ty = d.target.y + getCardHeight(d.target.tableData) / 2;

      const p1 = { x: sx, y: sy };
      const p2 = { x: tx, y: ty };

      let isOverlapped = false;
      let blockingNode = null;

      // nodes 배열에서 source/target을 제외한 노드들을 검사
      for (const n of nodes) {
        if (n.id === sourceId || n.id === targetId) continue;
        
        const nH = getCardHeight(n.tableData);
        // 충돌 판정을 위해 약간의 마진(패딩)을 사각형에 추가해서 충돌 판정에 여유를 줌
        const rect = {
          left: n.x - 10,
          right: n.x + CARD_W + 10,
          top: n.y - 10,
          bottom: n.y + nH + 10
        };

        if (isLineIntersectingRect(p1, p2, rect)) {
          isOverlapped = true;
          blockingNode = n;
          break; // 첫 번째 장애 노드 검출 시 종료
        }
      }

      let pathStr = "";
      let labelPos = { x: (sx + tx) / 2, y: (sy + ty) / 2 };

      if (isOverlapped && blockingNode) {
        // 테이블과 겹칠 것 같으면 꺾은선(Polyline) 생성
        const mx = (sx + tx) / 2;
        const bH = getCardHeight(blockingNode.tableData);
        
        // 장애 노드의 아래쪽 또는 위쪽으로 우회
        const blockingCenterY = blockingNode.y + bH / 2;
        const lineCenterY = (sy + ty) / 2;
        
        let bentY;
        if (lineCenterY >= blockingCenterY) {
          // 아래로 우회
          bentY = blockingNode.y + bH + 28;
        } else {
          // 위로 우회
          bentY = blockingNode.y - 28;
        }

        pathStr = `M${sx},${sy} L${mx},${bentY} L${tx},${ty}`;
        labelPos = { x: mx, y: bentY };
      } else {
        // 겹치지 않으면 깔끔한 직선
        pathStr = `M${sx},${sy} L${tx},${ty}`;
      }

      linkPathAndLabelCoords.set(`${sourceId}-${targetId}-${d.key}`, {
        d: pathStr,
        labelPos: labelPos
      });
    });

    // 1. 관계선 좌표 계산 및 적용
    linksGroup.selectAll('.relation-path')
      .attr('d', d => {
        const sourceId = d.source.id || d.source;
        const targetId = d.target.id || d.target;
        const info = linkPathAndLabelCoords.get(`${sourceId}-${targetId}-${d.key}`);
        return info ? info.d : '';
      });

    // 2. 테이블 노드 위치 적용
    nodesGroup.selectAll('.erd-card-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // 3. 관계선 라벨 위치 적용
    labelsGroup.selectAll('.relation-label-group')
      .attr('transform', d => {
        const sourceId = d.source.id || d.source;
        const targetId = d.target.id || d.target;
        const info = linkPathAndLabelCoords.get(`${sourceId}-${targetId}-${d.key}`);
        return info ? `translate(${info.labelPos.x}, ${info.labelPos.y})` : '';
      });
  }

  // 뷰포트 내 엘리먼트 그리기/갱신
  function updateView() {
    // 검색어 및 카테고리 필터링 반영
    const filteredNodes = nodes.filter(n => {
      const t = n.tableData;
      if (filterCat !== '전체' && t.category !== filterCat) return false;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        return t.table.toLowerCase().includes(s) || (t.label || '').toLowerCase().includes(s);
      }
      return true;
    });

    const activeNodeIds = new Set(filteredNodes.map(n => n.id));

    // 필터에 따른 링크선 추출
    const filteredLinks = links.filter(l => {
      if (!showRelations) return false;
      if (selectedKey !== 'all' && l.key !== selectedKey) return false;
      
      // 소스/타겟이 모두 필터링된 활성 노드셋에 속해야 함
      if (!activeNodeIds.has(l.source.id) || !activeNodeIds.has(l.target.id)) return false;

      // LCNS_NO 등 과도하게 큰 공통키는 테이블이 선택되지 않았다면 전체보기 모드에서 간소화
      if (selectedKey === 'all' && relationships.find(r => r.key === l.key)?.count > 20) {
        if (selectedTable !== l.source.id && selectedTable !== l.target.id) return false;
      }
      return true;
    });

    countEl.textContent = `${filteredNodes.length} / ${schema.length} 테이블`;
    document.getElementById('erd-rel-count').textContent = `${filteredLinks.length}개 관계`;

    // ── 1. 링크선 렌더링 ──
    const pathBind = linksGroup.selectAll('.relation-path')
      .data(filteredLinks, d => `${d.source.id}-${d.target.id}-${d.key}`);

    pathBind.exit().remove();

    const pathEnter = pathBind.enter()
      .append('path')
      .attr('class', 'relation-path')
      .attr('fill', 'none')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        showEdgeDetail(d);
      });

    // 머지 후 디자인 속성 바인딩
    pathBind.merge(pathEnter)
      .attr('stroke', d => KEY_COLORS[d.key] || '#94a3b8')
      .attr('stroke-width', d => {
        const isRelatedToSelected = selectedTable === d.source.id || selectedTable === d.target.id;
        return (isRelatedToSelected || selectedKey === d.key) ? 2.5 : 1.2;
      })
      .attr('opacity', d => {
        const isRelatedToSelected = selectedTable === d.source.id || selectedTable === d.target.id;
        if (selectedKey !== 'all') {
          return (selectedKey === d.key) ? 0.9 : 0.05;
        }
        if (selectedTable) {
          return isRelatedToSelected ? 0.9 : 0.06;
        }
        return 0.18;
      })
      .attr('class', d => {
        const isRelatedToSelected = selectedTable === d.source.id || selectedTable === d.target.id;
        const isActive = (selectedKey === d.key) || (selectedTable && isRelatedToSelected);
        return 'relation-path' + (isActive ? ' active-relation-line' : '');
      });

    // ── 2. 관계선 중앙 라벨 렌더링 (모든 관계선에 상시 텍스트 표시, 활성 상태에 따라 투명도 차별화) ──
    const labelBind = labelsGroup.selectAll('.relation-label-group')
      .data(filteredLinks, d => `${d.source.id}-${d.target.id}-${d.key}`);

    labelBind.exit().remove();

    const labelEnter = labelBind.enter()
      .append('g')
      .attr('class', 'relation-label-group')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        showEdgeDetail(d);
      });

    labelEnter.append('rect')
      .attr('x', -52.5)
      .attr('y', -8)
      .attr('width', 105)
      .attr('height', 16)
      .attr('rx', 4)
      .attr('fill', '#ffffff')
      .attr('stroke-width', 1);

    labelEnter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '3.5')
      .attr('font-size', '8px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', '700');

    // 머지 후 활성 상태에 맞춰 투명도 및 속성 실시간 보정
    const labelMerge = labelBind.merge(labelEnter);

    labelMerge.attr('opacity', d => {
      const isRelatedToSelected = selectedTable === d.source.id || selectedTable === d.target.id;
      const isActive = (selectedKey === d.key) || (selectedTable && isRelatedToSelected);
      
      if (selectedKey !== 'all') {
        return (selectedKey === d.key) ? 1.0 : 0.05;
      }
      if (selectedTable) {
        return isRelatedToSelected ? 1.0 : 0.05;
      }
      return 0.42; // 비선택 일반 관계선 라벨도 흐릿하게 항상 표시하여 어떤 공통키로 묶였는지 노출
    });

    labelMerge.select('rect')
      .attr('stroke', d => KEY_COLORS[d.key] || '#94a3b8')
      .attr('stroke-width', d => {
        const isRelatedToSelected = selectedTable === d.source.id || selectedTable === d.target.id;
        const isActive = (selectedKey === d.key) || (selectedTable && isRelatedToSelected);
        return isActive ? 1.5 : 1;
      });

    labelMerge.select('text')
      .attr('fill', d => KEY_COLORS[d.key] || '#64748b')
      .text(d => `(${d.relType || 'N:M'}) ${d.key}`);

    // ── 3. 노드(테이블 카드) 렌더링 ──
    const nodeBind = nodesGroup.selectAll('.erd-card-node')
      .data(filteredNodes, d => d.id);

    nodeBind.exit().remove();

    const nodeEnter = nodeBind.enter()
      .append('g')
      .attr('class', 'erd-card-node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // 클릭 시 상세 팝업 바인딩
    nodeEnter.on('click', (event, d) => {
      event.stopPropagation();
      // 드래그 중 단순 미세 잔상 클릭 오발 방지
      if (event.defaultPrevented) return;
      
      selectedTable = selectedTable === d.id ? null : d.id;
      updateView();
      showDetail(selectedTable);
    });

    // 템플릿 마크업 바인딩
    nodeBind.merge(nodeEnter)
      .html(d => getTableCardMarkup(d.tableData, selectedTable === d.id, d.color));
  }

  // D3 드래그 관련 콜백 함수
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    d3.select(this).style('cursor', 'grabbing');
  }

  function dragged(event, d) {
    // 줌 배율을 감안하여 드래그 반응 조정
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    // 고정 풀지 않고 드래그 완료 후 위치 고정 유지 ( Erd 배치 편집이 쉽도록 )
    // 더블클릭이나 리셋 버튼을 통해 물리 고정을 해제할 수 있게 함
    d3.select(this).style('cursor', 'grab');
  }

  // 상세 보기 패널 (테이블 정보 + 50개 데이터 샘플 미리보기 탑재)
  function showDetail(tableId) {
    if (!tableId) {
      detail.style.display = 'none';
      return;
    }
    const node = nodes.find(n => n.id === tableId);
    if (!node) return;
    const t = node.tableData;
    const c = node.color;

    detail.style.display = 'flex';
    detail.innerHTML = `
      <div style="padding:14px 16px;background:${c.light};border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;shrink-0;">
        <div>
          <div style="font-size:13px;font-weight:700;color:${c.accent};">${t.label && t.label !== t.table ? `${t.label} (${t.table})` : t.table}</div>
        </div>
        <button id="detail-close" style="background:transparent;border:none;color:#94a3b8;font-size:20px;cursor:pointer;line-height:1;font-weight:700;">✕</button>
      </div>
      <div style="padding:8px 14px;border-bottom:1px solid #e2e8f0;background:#f8fafc;shrink-0;">
        <span style="font-size:11px;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:99px;font-weight:600;">📁 ${t.category}</span>
        <span style="font-size:11px;margin-left:8px;color:#64748b;">컬럼 ${(t.columns||[]).length}개</span>
      </div>
      
      <!-- 스크롤 가능한 본문 영역 -->
      <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:20px;background:#ffffff;">
        
        <!-- 1구역: 테이블 컬럼 명세 -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          <h4 style="font-size:11px;font-weight:700;color:#64748b;margin:0;text-transform:uppercase;">🗂️ 테이블 컬럼 명세 (Schema)</h4>
          <div style="border:1px solid #cbd5e1;border-radius:10px;overflow:auto;max-h:180px;background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <table style="width:100%;border-collapse:collapse;font-size:11px;">
              <thead>
                <tr style="background:#f1f5f9;position:sticky;top:0;border-bottom:1px solid #e2e8f0;z-index:10;">
                  <th style="padding:6px 8px;text-align:left;color:#475569;font-weight:600;">컬럼명</th>
                  <th style="padding:6px 6px;text-align:left;color:#475569;font-weight:600;">타입</th>
                  <th style="padding:6px 6px;text-align:right;color:#475569;font-weight:600;">한글명</th>
                </tr>
              </thead>
              <tbody>
                ${(t.columns||[]).map((col, i) => `
                  <tr style="border-bottom:1px solid #f1f5f9;background:${i%2===0?'transparent':'#f8fafc'}">
                    <td style="padding:6px 8px;font-family:monospace;color:${col.pk?'#b45309':'#1e293b'};font-weight:${col.pk?'700':'400'};">
                      ${col.pk ? '🔑 ' : ''}${col.name}
                    </td>
                    <td style="padding:6px 6px;color:#2563eb;font-size:10px;font-family:monospace;">${col.type||'TEXT'}</td>
                    <td style="padding:6px 6px;color:#475569;font-size:10.5px;text-align:right;">${col.kor||'-'}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2구역: 50개 레코드 샘늘 미리보기 -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          <h4 style="font-size:11px;font-weight:700;color:#64748b;margin:0;text-transform:uppercase;">📊 데이터 레코드 샘플 (최대 50개행 미리보기)</h4>
          <div id="erd-data-sample-wrapper" style="border:1px solid #cbd5e1;border-radius:10px;overflow:auto;max-h:280px;background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">
              <span style="display:inline-block;width:12px;height:12px;border:2px solid #cbd5e1;border-top-color:#2563eb;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
              실시간 레코드를 불러오고 있습니다...
            </div>
          </div>
        </div>

      </div>
    `;

    document.getElementById('detail-close').addEventListener('click', () => {
      selectedTable = null;
      detail.style.display = 'none';
      updateView();
    });

    // 실시간 DB 데이터 50개 로드 핸들러
    const dataWrapper = document.getElementById('erd-data-sample-wrapper');
    const colsMeta = t.columns || [];

    const renderRows = (rows, isMock = false) => {
      if (!rows || rows.length === 0) {
        dataWrapper.innerHTML = `<div style="padding:24px;text-align:center;color:#94a3b8;font-size:11px;">데이터가 존재하지 않습니다.</div>`;
        return;
      }
      const colNames = colsMeta.map(c => c.name);
      const mockBadge = isMock ? `
        <div style="padding:6px 10px;background:#fef3c7;color:#92400e;font-size:9.5px;font-weight:700;border-bottom:1px solid #fde68a;display:flex;justify-content:space-between;align-items:center;">
          <span>⚠️ 미적재 테이블로 가상 더미 데이터가 표시됩니다.</span>
          <span style="background:#fde68a;color:#78350f;padding:1px 5px;border-radius:4px;font-size:9px;">더미</span>
        </div>
      ` : '';

      dataWrapper.innerHTML = `
        ${mockBadge}
        <div style="overflow-x:auto;width:100%;">
          <table style="width:100%;border-collapse:collapse;font-size:10px;text-align:left;">
            <thead>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:10;">
                ${colNames.map(name => `<th style="padding:6px 10px;color:#64748b;font-weight:600;background:#f8fafc;white-space:nowrap;">${name}</th>`).join('')}
              </tr>
            </thead>
            <tbody style="font-family:monospace;color:#334155;">
              ${rows.map(row => `
                <tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                  ${colNames.map(name => {
                    const val = row[name];
                    const disp = val !== null ? String(val).replace(/"/g, '&quot;') : '';
                    return `<td style="padding:6px 10px;white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis;" title="${disp}">${val !== null ? val : '<span style="color:#cbd5e1;font-style:italic;">null</span>'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `SELECT * FROM "${tableId}" LIMIT 50` })
    })
      .then(res => res.json())
      .then(rows => {
        if (!rows || rows.length === 0) {
          const mockData = generateMockRows(colsMeta, 50);
          renderRows(mockData, true);
          return;
        }
        renderRows(rows, false);
      })
      .catch(err => {
        console.warn("로컬 ERD 실시간 레코드 조회 실패, 더미로 폴백:", err);
        const mockData = generateMockRows(colsMeta, 50);
        renderRows(mockData, true);
      });
  }

  // 공통키 관계 클릭 상세 보기 패널 (융합 조인 데이터 50개 미리보기)
  function showEdgeDetail(d) {
    const fromTable = d.source.id || d.source;
    const toTable = d.target.id || d.target;
    const joinKey = d.key;

    // 패널 열기
    detail.style.display = 'flex';
    
    // 위해행정처분 예외 필드 보정
    let fromKey = joinKey;
    let toKey = joinKey;
    if (fromTable === 'I0470' && toTable === 'I0482' && joinKey === 'DSPSDTLS_SEQ') {
      fromKey = 'DSPSDTLS_SEQ';
      toKey = 'DSPSDTLS_SEQ';
    }

    const sqlQuery = `SELECT A.*, B.* FROM "${fromTable}" A INNER JOIN "${toTable}" B ON A."${fromKey}" = B."${toKey}" LIMIT 50`;

    detail.innerHTML = `
      <div style="padding:14px 16px;background:#fff7ed;border-bottom:1px solid #fed7aa;display:flex;justify-content:space-between;align-items:center;shrink-0;">
        <div>
          <div style="font-size:12px;font-weight:700;color:#c2410c;">🔗 공통키 융합 조인 분석</div>
          <div style="font-size:9.5px;color:#7c2d12;margin-top:2.5px;font-family:monospace;">${fromTable} ↔ ${toTable}</div>
        </div>
        <button id="detail-close" style="background:transparent;border:none;color:#c2410c;font-size:20px;cursor:pointer;line-height:1;font-weight:700;">✕</button>
      </div>
      
      <!-- 본문 영역 -->
      <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;background:#ffffff;">
        
        <!-- 관계 요약 카드 -->
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">연계 키 정보</div>
          <div style="font-size:11px;color:#334155;line-height:1.5;">
            두 테이블 간 공통 키 <code style="font-family:monospace;color:#b45309;background:#fef3c7;padding:2px 5px;border-radius:4px;font-weight:700;">${joinKey}</code>를 기준으로 교집합 데이터 조인(INNER JOIN)을 수행합니다.
          </div>
          <div style="font-size:10px;color:#64748b;font-family:monospace;background:#f1f5f9;padding:6px;border-radius:6px;border:1px solid #e2e8f0;word-break:break-all;">
            ${sqlQuery}
          </div>
        </div>

        <!-- 결합 데이터 표 구역 -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          <h4 style="font-size:11px;font-weight:700;color:#64748b;margin:0;text-transform:uppercase;">🔀 공통키 결합 데이터 (상위 50개행 미리보기)</h4>
          <div id="erd-join-sample-wrapper" style="border:1px solid #cbd5e1;border-radius:10px;overflow:auto;max-h:360px;background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">
              <span style="display:inline-block;width:12px;height:12px;border:2px solid #cbd5e1;border-top-color:#c2410c;border-radius:50%;animation:spin 1s linear infinite;margin-right:6px;vertical-align:middle;"></span>
              공통키 조인 매칭 값을 계산하는 중...
            </div>
          </div>
        </div>

      </div>
    `;

    document.getElementById('detail-close').addEventListener('click', () => {
      detail.style.display = 'none';
    });

    const joinDataWrapper = document.getElementById('erd-join-sample-wrapper');

    const renderJoinRows = (rows, isMock = false) => {
      if (!rows || rows.length === 0) {
        joinDataWrapper.innerHTML = `<div style="padding:24px;text-align:center;color:#94a3b8;font-size:11px;">매칭 데이터가 존재하지 않습니다.</div>`;
        return;
      }
      const cols = Object.keys(rows[0]);
      const mockBadge = isMock ? `
        <div style="padding:6px 10px;background:#fef3c7;color:#92400e;font-size:9.5px;font-weight:700;border-bottom:1px solid #fde68a;display:flex;justify-content:space-between;align-items:center;">
          <span>⚠️ 데이터 미적재 관계로 시뮬레이션용 결합 데이터가 표시됩니다.</span>
          <span style="background:#fde68a;color:#78350f;padding:1px 5px;border-radius:4px;font-size:9px;font-weight:700;">시뮬레이션</span>
        </div>
      ` : '';

      joinDataWrapper.innerHTML = `
        ${mockBadge}
        <div style="overflow-x:auto;width:100%;">
          <table style="width:100%;border-collapse:collapse;font-size:10px;text-align:left;">
            <thead>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:10;">
                ${cols.map(c => `<th style="padding:6px 10px;color:#64748b;font-weight:600;background:#f8fafc;white-space:nowrap;">${c}</th>`).join('')}
              </tr>
            </thead>
            <tbody style="font-family:monospace;color:#334155;">
              ${rows.map(row => `
                <tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                  ${cols.map(c => {
                    const val = row[c];
                    const disp = val !== null ? String(val).replace(/"/g, '&quot;') : '';
                    return `<td style="padding:6px 10px;white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis;" title="${disp}">${val !== null ? val : '<span style="color:#cbd5e1;font-style:italic;">null</span>'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sqlQuery })
    })
      .then(res => res.json())
      .then(rows => {
        if (rows && rows.error) {
          joinDataWrapper.innerHTML = `<div style="padding:24px;text-align:center;color:#ef4444;font-size:11px;">조인 쿼리 오류: ${rows.error}</div>`;
          return;
        }
        if (!rows || rows.length === 0) {
          joinDataWrapper.innerHTML = `<div style="padding:24px;text-align:center;color:#94a3b8;font-size:11px;">매칭 데이터가 없습니다. (두 테이블 간 공통 값 없음)</div>`;
          return;
        }
        renderJoinRows(rows, false);
      })
      .catch(err => {
        console.warn("로컬 ERD 조인 쿼리 실패:", err);
        joinDataWrapper.innerHTML = `<div style="padding:24px;text-align:center;color:#94a3b8;font-size:11px;">서버에 연결할 수 없습니다.</div>`;
      });
  }

  // 공통키 뱃지 렌더링 및 클릭 필터 연동
  function renderKeyBadges() {
    const badgeContainer = document.getElementById('erd-key-badges');
    if (!badgeContainer) return;

    const topRels = relationships.slice(0, 10);
    let html = `<span class="erd-key-badge" data-key="all" style="cursor:pointer;font-size:10px;background:${selectedKey === 'all' ? '#2563eb' : '#f1f5f9'};color:${selectedKey === 'all' ? '#ffffff' : '#475569'};padding:3px 10px;border-radius:99px;font-weight:600;border:1px solid ${selectedKey === 'all' ? '#2563eb' : '#cbd5e1'};transition:all 0.15s;display:inline-block;">전체 보기</span>`;
    
    topRels.forEach(rel => {
      const color = KEY_COLORS[rel.key] || '#64748b';
      const isCurrent = selectedKey === rel.key;
      const bg = isCurrent ? color : '#ffffff';
      const textCol = isCurrent ? '#ffffff' : '#374151';
      const borderCol = isCurrent ? color : '#cbd5e1';
      
      html += `
        <span class="erd-key-badge" data-key="${rel.key}" 
          style="cursor:pointer;font-size:10px;background:${bg};color:${textCol};padding:3px 10px;border-radius:99px;font-weight:600;border:1px solid ${borderCol};display:inline-flex;align-items:center;gap:4px;transition:all 0.15s;">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${isCurrent ? '#ffffff' : color};"></span>
          ${rel.key} (${rel.count})
        </span>`;
    });

    badgeContainer.innerHTML = html;

    // 이벤트 리스너
    badgeContainer.querySelectorAll('.erd-key-badge').forEach(badge => {
      badge.addEventListener('click', () => {
        selectedKey = badge.dataset.key;
        renderKeyBadges();
        updateView();
      });
    });
  }

  // 기타 이벤트 연결
  function bindEvents() {
    // 줌 인/아웃 버튼 연동
    document.getElementById('erd-zoom-in').addEventListener('click', () => {
      svg.transition().duration(250).call(zoomBehavior.scaleBy, 1.3);
    });
    document.getElementById('erd-zoom-out').addEventListener('click', () => {
      svg.transition().duration(250).call(zoomBehavior.scaleBy, 0.7);
    });
    
    // 리셋 버튼 (모든 노드 고정 해제 및 중앙 시뮬레이션 재정렬)
    document.getElementById('erd-reset').addEventListener('click', () => {
      nodes.forEach(n => {
        n.fx = null;
        n.fy = null;
      });
      // 시뮬레이션 웜업 및 위치 초기화
      simulation.alpha(1).restart();
      
      const width = viewport.offsetWidth || 1200;
      const height = viewport.offsetHeight || 800;
      svg.transition().duration(500).call(
        zoomBehavior.transform, 
        d3.zoomIdentity.translate(width * 0.42, height * 0.42).scale(0.12)
      );
    });

    // 관계선 토글 버튼
    const relToggle = document.getElementById('erd-rel-toggle');
    relToggle.addEventListener('click', () => {
      showRelations = !showRelations;
      relToggle.style.color = showRelations ? '#2563eb' : '#64748b';
      relToggle.style.background = showRelations ? '#eff6ff' : '#f1f5f9';
      relToggle.style.borderColor = showRelations ? '#bfdbfe' : '#cbd5e1';
      relToggle.textContent = showRelations ? '🔗 관계선 ON' : '🔗 관계선 OFF';
      updateView();
    });

    // 검색 인풋 필터링
    document.getElementById('erd-search').addEventListener('input', (e) => {
      searchTerm = e.target.value;
      updateView();
    });

    // 카테고리 셀렉트 필터링
    document.getElementById('erd-cat-filter').addEventListener('change', (e) => {
      filterCat = e.target.value;
      updateView();
    });
  }
}

/**
 * renderCombinedErdMap
 * ERD 테이블 카드 노드(dbErdMap) + Vis.js 포스 레이아웃(relationDataMap) 통합
 * - 노드 크기  ∝ log(데이터 건수)
 * - 연결 많은 테이블은 mass 높게 설정 → 물리 레이아웃에서 자동 중앙 배치
 */
export function renderCombinedErdMap(container) {
  // ── 카테고리 분류 ────────────────────────────────────
  const domainTables = {
    core:       ['I2500','I1250','C005','C002','I0580','I0470','I2620','I0490'],
    license:    ['I2500','I1220','I2857','I2858','I2830','I2831','I2833','I2835','I2836','I2821','I2822','I2829','I2834','I2832','I2856','I2859','I2861','I2560'],
    haccp:      ['I2500','I0580','I0630','I0600'],
    product:    ['I1250','C005','C002','I2510','I2852'],
    standards:  ['I2580','I0960','I2600','I2610','I0940'],
    safety:     ['I2620','I0490','I2810'],
    import:     ['C001','C003','I0482','I2821'],
    nutrition:  ['I2780','I2819'],
    discipline: ['I0470','I0482','I2822']
  };
  const domainNames = {
    core:'핵심 초융합형', license:'인허가·업소', haccp:'HACCP·위생',
    product:'품목제조·제품', standards:'기준규격·공전', safety:'검사·부적합·위해',
    import:'수입식품', nutrition:'영양성분', discipline:'행정처분·폐업'
  };
  const domainColors = {
    core:'#6366f1', license:'#0891b2', haccp:'#0d9488',
    product:'#e11d48', standards:'#059669', safety:'#dc2626',
    import:'#d97706', nutrition:'#7c3aed', discipline:'#db2777'
  };
  const categoryColorMap = {
    '식품영양정보': '#16a34a',
    '기준규격정보': '#2563eb',
    '코드정보': '#7c3aed',
    '수질환경정보': '#0284c7',
    '검사기관정보': '#475569',
    '식품위해관리': '#dc2626',
    '식품안전관리': '#0d9488',
    '이력추적관리': '#4f46e5',
    '어린이식품안전관리': '#db2777',
    'HACCP지정현황': '#0891b2',
    '업체인허가현황': '#ea580c',
    '위생용품': '#e11d48',
    '축산물': '#9333ea',
    '건강기능식품': '#65a30d',
    '수입식품 등': '#f59e0b',
    '식품 등': '#059669',
    '폐업정보': '#be123c',
    '용어사전': '#ca8a04'
  };
  const fallbackCategoryColors = [
    '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
    '#0891b2', '#ea580c', '#4f46e5', '#db2777', '#0d9488',
    '#65a30d', '#9333ea', '#e11d48', '#0284c7', '#ca8a04',
    '#059669', '#be123c', '#475569'
  ];
  const KEY_EDGE_COLORS = {
    LCNS_NO:'#2563eb', PRDLST_REPORT_NO:'#10b981', BAR_CD:'#d97706',
    BSSH_NO:'#ec4899', HACCP_NO:'#8b5cf6', PRDLST_CD:'#06b6d4', FOOD_CD:'#f97316'
  };
  const subjectColorMap = {
    '융합 데이터 세트':'bg-indigo-50 text-indigo-700 border-indigo-200',
    '식품·제품':'bg-teal-50 text-teal-700 border-teal-200',
    '업체·영업자':'bg-sky-50 text-sky-700 border-sky-200',
    '원재료·첨가물':'bg-rose-50 text-rose-700 border-rose-200',
    '영양·건강':'bg-emerald-50 text-emerald-700 border-emerald-200',
    '수입식품':'bg-amber-50 text-amber-700 border-amber-200',
    '농·축·수산물':'bg-violet-50 text-violet-700 border-violet-200',
    '기타':'bg-slate-50 text-slate-700 border-slate-200'
  };

  // ── 상태 ──────────────────────────────────────────────
  let allDatasets = [];
  let allColumnsMap = {};
  let relationships = [];
  let networkInstance = null;
  let activeKeyword = '';
  let columnMatchedIds = new Set();
  let maxNodesLimit = 9999;
  let activePhysics = true;
  let selectedNodeId = null;
  let selectedDomains = Object.fromEntries(Object.keys(domainTables).map(k => [k, true]));
  let selectedKeys = { LCNS_NO:true, PRDLST_REPORT_NO:true, BAR_CD:true, BSSH_NO:true, TESTITM_CD:true };

  const escX = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const quoteIdent = id => `"${String(id).replace(/"/g, '""')}"`;
  const parseCount = value => {
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  // ── SVG 테이블 카드 생성 ──────────────────────────────
  function createCardSvg(tableId, label, cols, rowCount, accentColor, isSelected) {
    const W = 240, HEADER_H = 40, ROW_H = 18;
    const displayCols = cols.slice(0, 5);
    const extra = cols.length - 5;
    const H = HEADER_H + displayCols.length * ROW_H + (extra > 0 ? 14 : 4) + 2;
    const stroke = isSelected ? '#fbbf24' : `${accentColor}70`;
    const strokeW = isSelected ? 3 : 1.5;

    let colRows = displayCols.map((col, i) => {
      const bg = i % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'transparent';
      const isKey = !!KEY_EDGE_COLORS[col.field];
      const nameColor = isKey ? '#b45309' : '#374151';
      const prefix = isKey ? '🔑' : ' ';
      const raw = `${col.field}${col.kor_nm ? ' ('+col.kor_nm+')' : ''}`;
      const cut = escX(raw.length > 25 ? raw.slice(0, 24)+'…' : raw);
      const tp = (col.sql_type||'VC').replace('VARCHAR','VC').replace('NUMERIC','NUM').replace('NUMBER','NUM').slice(0,8);
      return `<rect x="0" y="${HEADER_H+i*ROW_H}" width="${W}" height="${ROW_H}" fill="${bg}"/>` +
        `<text x="7" y="${HEADER_H+i*ROW_H+13}" font-size="8.5" fill="${nameColor}" font-family="monospace">${prefix} ${cut}</text>` +
        `<text x="${W-5}" y="${HEADER_H+i*ROW_H+13}" font-size="8" fill="${accentColor}aa" text-anchor="end" font-family="monospace">${tp}</text>`;
    }).join('');

    const extraTxt = extra > 0
      ? `<text x="${W/2}" y="${H-4}" font-size="8.5" fill="#94a3b8" text-anchor="middle">+${extra}개 더</text>` : '';
    const rowLabel = rowCount > 0 ? `${Number(rowCount).toLocaleString()}rows` : '';
    const lbl = escX(label.split(' (')[0]).slice(0, 22);
    const tid = escX(tableId).slice(0, 14);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
      `<rect x="3" y="3" width="${W}" height="${H}" rx="7" fill="rgba(0,0,0,0.05)"/>` +
      `<rect width="${W}" height="${H}" rx="7" fill="#fff" stroke="${stroke}" stroke-width="${strokeW}"/>` +
      `<rect width="${W}" height="${HEADER_H}" rx="7" fill="${accentColor}"/>` +
      `<rect y="${HEADER_H-7}" width="${W}" height="7" fill="${accentColor}"/>` +
      `<text x="8" y="16" font-size="10.5" font-weight="700" fill="#fff" font-family="sans-serif">${lbl}</text>` +
      `<text x="8" y="30" font-size="8.5" fill="rgba(255,255,255,0.7)" font-family="monospace">${tid}</text>` +
      `<text x="${W-6}" y="30" font-size="8.5" fill="rgba(255,255,255,0.9)" text-anchor="end" font-family="sans-serif">${rowLabel}</text>` +
      colRows + extraTxt + `</svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  // ── UI 렌더 ───────────────────────────────────────────
  const requiredRoot = container.querySelector('#cem-canvas');
  if (!requiredRoot) {
    console.error('[CombinedErd] missing ERD HTML structure');
    container.className = 'p-8 text-sm text-red-500';
    container.textContent = 'ERD 화면 구조를 찾을 수 없습니다.';
    return;
  }
  // ── 데이터 로딩 ───────────────────────────────────────
  const getDs = id => allDatasets.find(d => d.id === id);

  async function loadData() {
    // 데이터셋 목록
    try {
      const r = await fetch('/api/searchDatasetList.do', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ start_idx:1, show_cnt:1000 })
      });
      const j = await r.json();
      allDatasets = (j.list || []).map(d => ({
        id: d.svc_no, name: d.svc_nm, subject: d.cl_cd_nm || '기타',
        dataCount: parseCount(d.data_cnt || d.sample_data_length)
      }));
    } catch(e) { console.warn('[CombinedErd] datasets load failed', e); }

    let existingTables = new Set(allDatasets.map(ds => ds.id));
    try {
      const r = await fetch('/api/query', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ query:`SELECT name FROM sqlite_master WHERE type='table'` })
      });
      if (r.ok) {
        const rows = await r.json();
        existingTables = new Set((rows || []).map(row => String(row.name)));
      }
    } catch {}

    await Promise.allSettled(allDatasets.filter(ds => existingTables.has(String(ds.id))).map(async ds => {
      try {
        const r = await fetch('/api/query', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ query:`SELECT COUNT(*) AS cnt FROM ${quoteIdent(ds.id)}` })
        });
        if (!r.ok) return;
        const rows = await r.json();
        ds.dataCount = parseCount(rows?.[0]?.cnt);
      } catch {}
    }));

    // 컬럼 정보 — bulk 쿼리 시도 후 실패 시 개별 fetch
    allColumnsMap = {};
    try {
      const r = await fetch('/api/query', {
        method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ query:`SELECT svc_no, field, kor_nm, sql_type FROM api_columns ORDER BY svc_no, field` })
      });
      const rows = await r.json();
      if (Array.isArray(rows) && rows.length > 0) {
        rows.forEach(row => {
          if (!allColumnsMap[row.svc_no]) allColumnsMap[row.svc_no] = [];
          if (allColumnsMap[row.svc_no].length < 5)
            allColumnsMap[row.svc_no].push({ field:row.field, kor_nm:row.kor_nm, sql_type:row.sql_type });
        });
      }
    } catch(e) { console.warn('[CombinedErd] columns bulk load failed', e); }

    // bulk 결과가 없으면 개별 테이블 fetch
    if (Object.keys(allColumnsMap).length === 0) {
      const targetIds = allDatasets.map(d => d.id);
      await Promise.allSettled(targetIds.map(async id => {
        try {
          const r = await fetch(`/api/datasetMetadata.do?svc_no=${encodeURIComponent(id)}`);
          const cols = await r.json();
          if (Array.isArray(cols) && cols.length > 0) {
            allColumnsMap[id] = cols.slice(0, 5).map(c => ({
              field: c.field, kor_nm: c.kor_nm, sql_type: c.sql_type || c.data_type
            }));
          }
        } catch{}
      }));
    }

    // 관계 데이터
    try {
      const r = await fetch('/api/relationships');
      let loadedRels = await r.json() || [];
      if (!Array.isArray(loadedRels)) loadedRels = [];
      
      // 사용자 요청: 실제 조인 시 매칭되는 값이 존재하는 관계만 묶기
      relationships = loadedRels.filter(rel => 
        rel.inclusion_check && rel.inclusion_check.matched_count > 0
      );
    } catch(e) { console.warn('[CombinedErd] relationships load failed', e); }

    // 데이터셋이 없으면 domainTables의 ID로 최소 구성
    if (allDatasets.length === 0) {
      const allIds = [...new Set(Object.values(domainTables).flat())];
      allDatasets = allIds.map(id => ({ id, name: id, subject: '기타', dataCount: 0 }));
    }
  }

  // ── 필터링 ────────────────────────────────────────────
  function getVisibleIds() {
    let allowed = new Set(allDatasets.map(d => d.id));

    if (activeKeyword) {
      const kw = activeKeyword.toLowerCase();
      const matched = allDatasets.filter(ds => {
        if (!allowed.has(ds.id)) return false;
        return columnMatchedIds.has(ds.id) ||
          ds.id.toLowerCase().includes(kw) ||
          ds.name.toLowerCase().includes(kw);
      });
      if (matched.length > 0) {
        const ms = new Set(matched.map(d => d.id));
        relationships.forEach(r => {
          if (ms.has(r.from_table) && allowed.has(r.to_table)) ms.add(r.to_table);
          if (ms.has(r.to_table) && allowed.has(r.from_table)) ms.add(r.from_table);
        });
        return ms;
      } else {
        return new Set();
      }
    }

    const ids = allDatasets.filter(d => allowed.has(d.id)).map(d => d.id);
    return new Set(ids.slice(0, maxNodesLimit));
  }

  // ── 관계 유형 판별 ────────────────────────────────────
  function getRelType(fromT, toT, key) {
    const isPk = (t, c) => {
      const T = t.toUpperCase(), C = c.toUpperCase();
      return (T==='I2500'&&(C==='LCNS_NO'||C==='BSSH_NO')) ||
             (T==='I1250'&&C==='PRDLST_REPORT_NO');
    };
    if (isPk(fromT,key) && isPk(toT,key)) return '1:1';
    if (isPk(fromT,key)) return '1:N';
    if (isPk(toT,key)) return 'N:1';
    return 'N:M';
  }

  // ── 네트워크 렌더 ────────────────────────────────────
  function renderNetwork() {
    const canvasEl = container.querySelector('#cem-canvas');
    if (!canvasEl) return;
    if (typeof vis === 'undefined') {
      console.error('[CombinedErd] vis-network not loaded');
      const el = container.querySelector('#cem-loading');
      if (el) { el.classList.remove('hidden'); el.innerHTML = '<p class="text-red-500 text-sm p-4">vis-network 라이브러리가 로드되지 않았습니다.</p>'; }
      return;
    }

    const visibleIds = getVisibleIds();

    // degree map (연결 수) → mass 계산에 사용
    const degreeMap = {};
    relationships.forEach(r => {
      if (visibleIds.has(r.from_table)) degreeMap[r.from_table] = (degreeMap[r.from_table]||0) + 1;
      if (visibleIds.has(r.to_table))   degreeMap[r.to_table]   = (degreeMap[r.to_table]||0)   + 1;
    });

    const categoryIndex = new Map();
    let nextColorIndex = 0;
    const getCategoryColor = (subject) => {
      const key = subject || '기타';
      if (categoryColorMap[key]) return categoryColorMap[key];
      if (!categoryIndex.has(key)) categoryIndex.set(key, nextColorIndex++);
      return fallbackCategoryColors[categoryIndex.get(key) % fallbackCategoryColors.length];
    };

    // Vis.js 노드 (SVG 카드)
    const visNodes = allDatasets
      .filter(ds => visibleIds.has(ds.id))
      .map(ds => {
        const cols   = allColumnsMap[ds.id] || [];
        const rows   = parseCount(ds.dataCount);
        const degree = degreeMap[ds.id] || 0;
        const color  = getCategoryColor(ds.subject);
        const svgUrl = createCardSvg(ds.id, ds.name, cols, rows, color, selectedNodeId === ds.id);

        // 크기: log 스케일, 70~130px
        const sz = Math.min(150, Math.max(42, 42 + Math.log10(rows + 1) * 22));
        // mass: 연결 많을수록 중앙으로 → sqrt(degree) 비례
        const mass = Math.max(1, Math.sqrt(degree + 1) + Math.log10(rows + 1) * 0.18);

        const tip = document.createElement('div');
        tip.className = 'p-2 text-xs text-slate-700 max-w-xs';
        tip.innerHTML = `<p class="font-bold text-slate-900">${ds.name} (${ds.id})</p>
          <p class="text-slate-400">${ds.subject} · ${Number(rows).toLocaleString()} rows · 연결 ${degree}개</p>`;

        return { id:ds.id, label:'', shape:'image', image:svgUrl, size:sz, mass, title:tip };
      });

    // Vis.js 엣지
    const visEdges = relationships
      .filter(r => {
        if (!visibleIds.has(r.from_table) || !visibleIds.has(r.to_table)) return false;
        const k = r.from_field;
        return selectedKeys[k] !== false;
      })
      .map((r, i) => {
        const key   = r.from_field;
        const rel   = getRelType(r.from_table, r.to_table, key);
        const eClr  = KEY_EDGE_COLORS[key] || '#94a3b8';
        const isSel = selectedNodeId && (r.from_table===selectedNodeId || r.to_table===selectedNodeId);
        return {
          id:`e${i}`, from:r.from_table, to:r.to_table,
          label:`(${rel}) ${key}`,
          font:{ size:10, face:'sans-serif', color:'#334155', background:'#ffffff', strokeWidth:2, strokeColor:'#f1f5f9' },
          color:{ color: isSel ? eClr : `${eClr}80`, highlight:eClr, hover:eClr },
          width: r.confidence==='HIGH' ? 2.5 : 1.5,
          hoverWidth:3, selectionWidth:3,
          arrows:{ to:{ enabled:true, scaleFactor:0.7 } },
          smooth:{ enabled:true, type:'continuous', roundness:0.15 }
        };
      });

    // 통계
    const sn = container.querySelector('#cem-stat-nodes');
    const se = container.querySelector('#cem-stat-edges');
    if (sn) sn.textContent = visNodes.length;
    if (se) se.textContent = visEdges.length;

    const loadingEl = container.querySelector('#cem-loading');
    if (loadingEl) loadingEl.classList.remove('hidden');

    if (networkInstance) { networkInstance.destroy(); networkInstance = null; }

    networkInstance = new vis.Network(canvasEl,
      { nodes: new vis.DataSet(visNodes), edges: new vis.DataSet(visEdges) },
      {
        nodes: { borderWidthSelected:4, scaling:{ min:60, max:140 } },
        interaction: { hover:true, tooltipDelay:150, selectable:true, selectConnectedEdges:true },
        physics: {
          enabled: activePhysics,
          barnesHut: {
            gravitationalConstant: -4500,
            centralGravity: 0.28,   // 연결 많은 노드(mass ↑)가 중앙으로
            springLength: 240,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0.9
          },
          stabilization: { enabled:true, iterations:600, updateInterval:50 }
        }
      }
    );

    networkInstance.on('stabilizationIterationsDone', () => {
      if (loadingEl) loadingEl.classList.add('hidden');
    });

    networkInstance.on('select', ({ nodes:ns, edges:es }) => {
      if (ns && ns.length > 0) {
        selectedNodeId = ns[0]; showInspector(ns[0]);
      } else if (es && es.length > 0) {
        selectedNodeId = null; showEdgeInspector(es[0]);
      } else {
        selectedNodeId = null; hideInspector();
      }
    });
  }

  // ── 인스펙터 (우측 슬라이드 패널) ────────────────────
  function showInspector(nodeId) {
    const panel = container.querySelector('#cem-inspector');
    if (!panel) return;
    const ds = getDs(nodeId);
    if (!ds) return;
    panel.classList.remove('hidden');
    setTimeout(() => panel.classList.remove('translate-x-[calc(100%+2rem)]'), 10);

    const subjectColor = categoryColorMap[ds.subject] || '#475569';
    panel.innerHTML = `
      <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gov-100 text-gov-800 border border-gov-200">TABLE</span>
            <span class="font-mono text-xs font-bold text-slate-500">${nodeId}</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold border" style="color:${subjectColor};border-color:${subjectColor}40;background:${subjectColor}18;">${ds.subject}</span>
          </div>
          <h3 class="text-sm font-bold text-slate-800 truncate">${ds.name.split(' (')[0]}</h3>
        </div>
        <button id="cem-close-insp" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 ml-2">
          <i class="ri-close-line text-lg"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <i class="ri-article-line text-gov-600"></i> 컬럼 명세 (Schema)
          </h4>
          <div class="border border-slate-200 rounded-xl overflow-auto bg-white max-h-52">
            <table class="w-full text-left text-[11px] border-collapse">
              <thead><tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold sticky top-0 z-10">
                <th class="px-3 py-2 bg-slate-50">컬럼명</th>
                <th class="px-2 py-2 bg-slate-50">타입</th>
                <th class="px-3 py-2 bg-slate-50 text-right">한글명</th>
              </tr></thead>
              <tbody id="cem-schema-tbody" class="divide-y divide-slate-100">
                <tr><td colspan="3" class="px-3 py-4 text-center text-slate-400">
                  <div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1 align-middle"></div>로딩 중...
                </td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <i class="ri-database-2-line text-gov-600"></i> 데이터 샘플 (상위 30행)
          </h4>
          <div id="cem-sample-wrap" class="border border-slate-200 rounded-xl overflow-auto bg-white max-h-64">
            <div class="px-3 py-4 text-center text-slate-400 text-xs">
              <div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1 align-middle"></div>로딩 중...
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 shrink-0">
        <button id="cem-jump-sql" class="flex-1 py-2 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
          <i class="ri-terminal-box-line"></i> SQL 실행기
        </button>
        <button id="cem-jump-api" class="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
          <i class="ri-search-eye-line"></i> API 탐색기
        </button>
      </div>`;

    fetch('/api/query', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ query:`SELECT field, kor_nm, sql_type FROM api_columns WHERE svc_no='${nodeId}'` })
    }).then(r => r.json()).then(cols => {
      const tb = container.querySelector('#cem-schema-tbody');
      if (!tb) return;
      tb.innerHTML = (cols||[]).map(c => {
        const badge = KEY_EDGE_COLORS[c.field]
          ? `<span class="px-1 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 ml-1">KEY</span>` : '';
        return `<tr class="hover:bg-slate-50/50">
          <td class="px-3 py-1.5 font-mono font-semibold text-slate-800">${c.field}${badge}</td>
          <td class="px-2 py-1.5 font-mono text-[10px] text-blue-600">${c.sql_type||'VARCHAR'}</td>
          <td class="px-3 py-1.5 text-right text-slate-500">${c.kor_nm||'-'}</td>
        </tr>`;
      }).join('') || '<tr><td colspan="3" class="px-3 py-4 text-center text-slate-400">없음</td></tr>';
    }).catch(() => {});

    fetch('/api/query', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ query:`SELECT * FROM "${nodeId}" LIMIT 30` })
    }).then(r => r.json()).then(rows => {
      const wrap = container.querySelector('#cem-sample-wrap');
      if (!wrap) return;
      if (!rows || !rows.length) { wrap.innerHTML='<p class="p-4 text-center text-xs text-slate-400">데이터 없음</p>'; return; }
      const ks = Object.keys(rows[0]);
      wrap.innerHTML = `<div class="overflow-x-auto"><table class="w-full text-left text-[10px] border-collapse min-w-[400px]">
        <thead><tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0 z-10">
          ${ks.map(c=>`<th class="px-2.5 py-1.5 bg-slate-50">${c}</th>`).join('')}
        </tr></thead>
        <tbody class="divide-y divide-slate-100 font-mono text-slate-600">
          ${rows.map(row=>`<tr class="hover:bg-slate-50/50">${ks.map(c=>{const v=row[c];const sv=v!==null?String(v).replace(/"/g,'&quot;'):'';return`<td class="px-2.5 py-1 truncate max-w-[100px]" title="${sv}">${v!==null?v:'<span class="text-slate-300">null</span>'}</td>`;}).join('')}</tr>`).join('')}
        </tbody></table></div>`;
    }).catch(() => {});

    container.querySelector('#cem-close-insp')?.addEventListener('click', hideInspector);
    container.querySelector('#cem-jump-sql')?.addEventListener('click', () => {
      window.sqlPlaygroundAutoQuery = `SELECT * FROM "${nodeId}" LIMIT 10;`;
      document.querySelector('[data-tab="sql-playground"]')?.click();
    });
    container.querySelector('#cem-jump-api')?.addEventListener('click', () => {
      window.apiExplorerAutoSearch = nodeId;
      document.querySelector('[data-tab="api-explorer"]')?.click();
    });
  }

  function showEdgeInspector(edgeId) {
    const panel = container.querySelector('#cem-inspector');
    if (!panel || !networkInstance) return;
    const edge = networkInstance.body.data.edges.get(edgeId);
    if (!edge) return;
    panel.classList.remove('hidden');
    setTimeout(() => panel.classList.remove('translate-x-[calc(100%+2rem)]'), 10);
    const baseKey = (edge.label||'').split(' ').pop();
    panel.innerHTML = `
      <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
        <div>
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">JOIN KEY</span>
          <h3 class="text-sm font-bold text-slate-800 mt-1">${edge.from} ↔ ${edge.to}</h3>
          <p class="text-[11px] text-slate-500">공통키: <code class="text-amber-600 font-mono">${baseKey}</code></p>
        </div>
        <button id="cem-close-insp" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 ml-2">
          <i class="ri-close-line text-lg"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2">결합 데이터 (상위 30행)</h4>
        <div id="cem-join-wrap" class="border border-slate-200 rounded-xl overflow-auto bg-white max-h-80">
          <div class="p-4 text-center text-xs text-slate-400">
            <div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1"></div>조인 데이터 로딩 중...
          </div>
        </div>
      </div>`;

    fetch('/api/query', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ query:`SELECT A.*, B.* FROM "${edge.from}" A INNER JOIN "${edge.to}" B ON A."${baseKey}" = B."${baseKey}" LIMIT 30` })
    }).then(r => r.json()).then(rows => {
      const wrap = container.querySelector('#cem-join-wrap');
      if (!wrap) return;
      if (!rows||!rows.length) { wrap.innerHTML='<p class="p-4 text-center text-xs text-slate-400">매칭 데이터 없음</p>'; return; }
      const ks = Object.keys(rows[0]);
      wrap.innerHTML = `<div class="overflow-x-auto"><table class="w-full text-left text-[10px] border-collapse min-w-[400px]">
        <thead><tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0 z-10">
          ${ks.map(c=>`<th class="px-2.5 py-1.5 bg-slate-50">${c}</th>`).join('')}
        </tr></thead>
        <tbody class="divide-y divide-slate-100 font-mono text-slate-600">
          ${rows.map(row=>`<tr>${ks.map(c=>{const v=row[c];return`<td class="px-2.5 py-1 truncate max-w-[80px]">${v!==null?v:''}</td>`;}).join('')}</tr>`).join('')}
        </tbody></table></div>`;
    }).catch(() => {});

    container.querySelector('#cem-close-insp')?.addEventListener('click', hideInspector);
  }

  function hideInspector() {
    const panel = container.querySelector('#cem-inspector');
    if (!panel) return;
    panel.classList.add('translate-x-[calc(100%+2rem)]');
    setTimeout(() => panel.classList.add('hidden'), 300);
  }

  // ── 이벤트 바인딩 ────────────────────────────────────
  function bindEvents() {
    const kwInput = document.getElementById('datamap-keyword-search');
    const kwBtn   = document.getElementById('btn-datamap-keyword-search');

    const doSearch = async () => {
      const kw = kwInput?.value.trim() || '';
      if (!kw) { columnMatchedIds=new Set(); activeKeyword=''; maxNodesLimit=9999; renderNetwork(); return; }
      
      try {
        const r = await fetch(`/api/column-search?keyword=${encodeURIComponent(kw)}`);
        columnMatchedIds = new Set((await r.json()).tables || []);
      } catch { columnMatchedIds = new Set(); }
      
      activeKeyword=kw; maxNodesLimit=9999; renderNetwork();
    };

    kwBtn?.addEventListener('click', doSearch);
    kwInput?.addEventListener('keydown', e => { if (e.key==='Enter') doSearch(); });

    container.querySelectorAll('[data-domain]').forEach(c =>
      c.addEventListener('change', e => { selectedDomains[e.target.dataset.domain]=e.target.checked; renderNetwork(); })
    );
    container.querySelector('#cem-dom-toggle')?.addEventListener('click', () => {
      Object.keys(selectedDomains).forEach(k => selectedDomains[k]=!selectedDomains[k]);
      container.querySelectorAll('[data-domain]').forEach(c => { c.checked=selectedDomains[c.dataset.domain]; });
      renderNetwork();
    });

    container.querySelectorAll('[data-joinkey]').forEach(c =>
      c.addEventListener('change', e => { selectedKeys[e.target.dataset.joinkey]=e.target.checked; renderNetwork(); })
    );
    container.querySelector('#cem-key-toggle')?.addEventListener('click', () => {
      Object.keys(selectedKeys).forEach(k => selectedKeys[k]=!selectedKeys[k]);
      container.querySelectorAll('[data-joinkey]').forEach(c => { c.checked=selectedKeys[c.dataset.joinkey]; });
      renderNetwork();
    });

    container.querySelector('#cem-physics')?.addEventListener('change', e => {
      activePhysics=e.target.checked;
      networkInstance?.setOptions({ physics:{ enabled:activePhysics } });
    });
    container.querySelector('#cem-max-nodes')?.addEventListener('change', e => {
      maxNodesLimit=parseInt(e.target.value); renderNetwork();
    });
    container.querySelector('#cem-fit')?.addEventListener('click', () =>
      networkInstance?.fit({ animation:{ duration:800, easingFunction:'easeInOutQuad' } })
    );
    container.querySelector('#cem-capture')?.addEventListener('click', () => {
      if (!networkInstance) return;
      const btn = container.querySelector('#cem-capture');
      if (btn) { btn.disabled=true; btn.innerHTML='<i class="ri-loader-4-line animate-spin"></i> 캡처 중...'; }
      const off = document.createElement('div');
      off.style.cssText = 'position:fixed;top:0;left:0;width:3200px;height:2400px;z-index:-9999;background:#f8fafc;pointer-events:none;';
      document.body.appendChild(off);
      const expNet = new vis.Network(off,
        { nodes:new vis.DataSet(networkInstance.body.data.nodes.get()), edges:new vis.DataSet(networkInstance.body.data.edges.get()) },
        { physics:{enabled:false}, interaction:{dragNodes:false,zoomView:false} }
      );
      const pos = networkInstance.getPositions();
      Object.keys(pos).forEach(id => { try { expNet.moveNode(id, pos[id].x, pos[id].y); } catch{} });
      expNet.fit({ animation:false });
      setTimeout(() => {
        const cvs = off.querySelector('canvas');
        if (cvs) {
          const out = document.createElement('canvas');
          out.width=cvs.width; out.height=cvs.height;
          const ctx=out.getContext('2d');
          ctx.fillStyle='#f8fafc'; ctx.fillRect(0,0,out.width,out.height);
          ctx.drawImage(cvs,0,0);
          const a=document.createElement('a');
          a.download=`데이터관계도ERD_${new Date().toISOString().slice(0,10)}.png`;
          a.href=out.toDataURL('image/png',1.0); a.click();
        }
        document.body.removeChild(off);
        if (btn) { btn.disabled=false; btn.innerHTML='<i class="ri-camera-line"></i> PNG 저장'; }
      }, 1200);
    });
  }

  // ── 초기화 ────────────────────────────────────────────
  loadData().then(() => {
    renderNetwork();
    bindEvents();
  });
}
