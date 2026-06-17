/**
 * view/components/keywordGraph.js
 * 키워드 데이터맵 그래프 컴포넌트 (순수 D3.js)
 * - renderKeywordGraph(keyword)
 *     → 입력 키워드로 연관 테이블·컬럼을 검색해 포스 레이아웃 그래프로 시각화
 *     → #kwmap-graph-container 내 SVG와 #kwmap-detail-panel 을 담당
 */
import { escapeHtml, escapeAttr } from '/view/utils.js';
import { renderEmptyState, renderLoadingSpinner } from '../uiComponents.js';
import { getDatasetsSync } from '../datasetStore.js';

// 카테고리별 고정 색상 매핑 (도메인 이름 → 색상 코드)
const CATEGORY_COLORS = {
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
  '용어사전': '#ca8a04',
  '기타': '#475569'
};

// CATEGORY_COLORS에 없는 도메인에 대한 순환 폴백 색상 목록
const FALLBACK_COLORS = [
  '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
  '#0891b2', '#ea580c', '#4f46e5', '#db2777', '#0d9488',
  '#65a30d', '#9333ea', '#e11d48', '#0284c7', '#ca8a04',
  '#059669', '#be123c', '#475569'
];

// 도메인명에 해당하는 색상을 반환하는 헬퍼 함수 (없으면 폴백 색상 순환)
function getCategoryColor(domain, index = 0) {
  return CATEGORY_COLORS[domain] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

// SVG 캔버스 크기 및 중심 좌표 상수
const W = 1800, H = 1400, CX = W / 2, CY = H / 2;

// 전역 상태 변수: D3 시뮬레이션, 타이머, 현재 키워드, 변환 정보 등
let _sim = null;
let _settleTimer = null;
let _currentKeyword = '';
let _transform = { x: 0, y: 0, scale: 1 };
let _nodes = [];
let _links = [];
let _svgG = null;   // <g> transform 그룹
let _svg = null;

let _lastData = null;
let _externalFilterIds = null;
let _onSelectDataset = null;

function handleDatamapFilterUpdate(e) {
  if (e.detail !== undefined) {
    if (e.detail.matchedIds === null) {
      _externalFilterIds = null;
    } else {
      _externalFilterIds = new Set(e.detail.matchedIds);
    }
    if (_lastData && _currentKeyword) {
      const svgWrap = document.getElementById('kwmap-svg-wrap');
      if (svgWrap) {
        const { nodes, links } = buildGraph(_lastData, _currentKeyword);
        renderSvg(svgWrap, nodes, links, _currentKeyword, updateDetailPanel);
      }
    }
  }
}

window.removeEventListener('datamap-filter-updated', handleDatamapFilterUpdate);
window.addEventListener('datamap-filter-updated', handleDatamapFilterUpdate);

// 여러 키워드에 대해 정규식 생성 (콤마, 띄어쓰기 등 연산자를 제외한 순수 단어)
function appendKwText(parentG, text, kw, x, y, anchor, fontSize, fontWeight, fill) {
  const t = parentG.append('text')
    .attr('x', x).attr('y', y)
    .attr('text-anchor', anchor)
    .attr('font-size', fontSize).attr('font-weight', fontWeight).attr('fill', fill)
    .attr('font-family', 'Malgun Gothic,sans-serif');

  if (!kw || !text) {
    t.text(text);
    return;
  }
  const isOperator = w => w.toUpperCase() === 'AND' || w.toUpperCase() === 'OR';
  const tokens = kw.split(';').map(w => w.trim()).filter(w => w && !isOperator(w));
  if (tokens.length === 0) {
    t.text(text);
    return;
  }

  const escapedTokens = tokens.map(w => w.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|');
  const regex = new RegExp(`(${escapedTokens})`, 'gi');
  const parts = text.split(regex);
  
  parts.forEach(part => {
    if (tokens.some(t => t.toLowerCase() === part.toLowerCase())) {
      t.append('tspan').attr('fill', '#ef4444').attr('font-weight', 900).text(part);
    } else if (part) {
      t.append('tspan').text(part);
    }
  });
}

// 긴 텍스트에서 키워드 주변 일부를 잘라내어 말줄임 처리하는 함수
function snippet(text, kw, maxLen = 24) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  const idx = text.indexOf(kw);
  if (idx === -1 || idx < maxLen - 5) return text.substring(0, maxLen) + '..';
  return '..' + text.substring(Math.max(0, idx - 5), Math.max(0, idx - 5) + maxLen - 4) + '..';
}

// 로딩 인디케이터를 표시하고 SVG 래퍼와 줌 버튼을 숨기는 함수
function showLoading(text = '데이터 불러오는 중...') {
  const el = document.getElementById('kwmap-loading');
  if (el) {
    el.style.display = '';
    el.style.background = 'white'; // 투명도 제거하여 화면 덮기
    el.innerHTML = renderLoadingSpinner(text, '네트워크 토폴로지를 분석하고 있습니다.');
  }
  const wrap = document.getElementById('kwmap-svg-wrap');
  const zbtns = document.getElementById('kwmap-zoom-btns');
  if (wrap) wrap.style.display = 'none';
  if (zbtns) zbtns.style.display = 'none';
}

// 로딩 인디케이터를 숨기고 SVG 래퍼와 줌 버튼을 표시하는 함수
function hideLoading() {
  const el = document.getElementById('kwmap-loading');
  if (el) el.style.display = 'none';
  const wrap = document.getElementById('kwmap-svg-wrap');
  const zbtns = document.getElementById('kwmap-zoom-btns');
  if (wrap) wrap.style.display = '';
  if (zbtns) zbtns.style.display = '';
}

// 오류 메시지를 에러 엘리먼트에 표시하는 함수
function showError(msg) {
  const el = document.getElementById('kwmap-error');
  if (el) { 
    el.innerHTML = renderEmptyState(msg, '다른 검색어나 필터 조건을 사용해 보세요.', 'ri-inbox-line');
    el.style.removeProperty('display');
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.background = 'white';
    el.style.zIndex = '20';
  }
  hideLoading();
}

// SVG 그룹의 translate/scale 변환 값을 업데이트하는 함수
function setTransform(t) {
  _transform = { ..._transform, ...t };
  if (_svgG) _svgG.attr('transform', `translate(${_transform.x},${_transform.y}) scale(${_transform.scale})`);
}

// 마우스 드래그(패닝) 및 휠(줌) 이벤트를 등록하는 함수
function applyPanZoom(svgEl, wrap) {
  let dragging = false, startX = 0, startY = 0, startTx = 0, startTy = 0;

  wrap.addEventListener('mousedown', e => {
    if (e.target.closest('[data-node]')) return;
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    startTx = _transform.x; startTy = _transform.y;
    wrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    setTransform({ x: startTx + e.clientX - startX, y: startTy + e.clientY - startY });
  });
  window.addEventListener('mouseup', () => { dragging = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mouseleave', () => { dragging = false; wrap.style.cursor = 'grab'; });

  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setTransform({ scale: Math.min(Math.max(0.15, _transform.scale + delta), 5) });
  }, { passive: false });
}

// 전체 그래프가 뷰포트에 맞도록 스케일과 오프셋을 계산하는 함수
function fitView(wrap) {
  const cw = wrap.clientWidth || 800;
  const ch = wrap.clientHeight || 550;
  // 기존 0.88에서 0.70으로 줄여 캡처 시 여백 확보 (가장자리 짤림 방지)
  const s = Math.min(cw / W, ch / H) * 0.70;
  setTransform({ x: (cw - W * s) / 2, y: (ch - H * s) / 2, scale: s });
}

// API 응답 데이터를 D3 시뮬레이션용 노드·링크 배열로 변환하는 함수
// 중심(CENTER) → 도메인(domain) → 테이블(table) → 리프(leaf) 4계층 구조 생성
function buildGraph(data, keyword) {
  let tables = data.matchedTables || [];
  if (_externalFilterIds) {
    tables = tables.filter(t => _externalFilterIds.has(t.tableName));
  }
  const leafs  = data.nodes || [];
  const nodes = [], links = [];

  nodes.push({ id: 'CENTER', type: 'center', label: keyword, r: 80, radialDist: 0, x: CX, y: CY });

  const groups = {};
  tables.forEach(t => { const d = t.domain || '기타'; (groups[d] = groups[d] || []).push(t); });
  const domains = Object.keys(groups);

  const minDeg = Math.min(45, 360 / Math.max(domains.length, 1));
  const rawSums = domains.map(d => Math.max(minDeg, (groups[d].length / (tables.length || 1)) * 360));
  const scl = 360 / rawSums.reduce((s, v) => s + v, 0);
  let ang = 0;

  domains.forEach((domain, di) => {
    const deg = rawSums[di] * scl;
    const midAng = ang + deg / 2;
    ang += deg;
    const rad = (midAng - 90) * Math.PI / 180;
    const color = getCategoryColor(domain, di);
    const dId = 'DOM_' + domain;
    const ts = groups[domain];

    nodes.push({
      id: dId, type: 'domain', label: domain, r: 52, radialDist: 280,
      color, domain, tables: ts, count: ts.length,
      x: CX + 280 * Math.cos(rad), y: CY + 280 * Math.sin(rad)
    });
    links.push({ source: 'CENTER', target: dId });

    const tStep = deg * 0.85 / Math.max(ts.length, 1);
    const tStart = midAng - (deg * 0.85) / 2;

    ts.forEach((t, ti) => {
      const ta = ts.length === 1 ? midAng : tStart + ti * tStep + tStep / 2;
      const trad = (ta - 90) * Math.PI / 180;
      const tId = 'TBL_' + t.tableName;

      nodes.push({
        id: tId, type: 'table', label: (t.tableLabel || t.tableName).trim(),
        r: 7, radialDist: 500, color, table: t, tableName: t.tableName,
        x: CX + 500 * Math.cos(trad), y: CY + 500 * Math.sin(trad)
      });
      links.push({ source: dId, target: tId });

      const tLeafs = leafs.filter(n => (n.id || '').startsWith('LEAF_' + t.tableName + '_'));
      const lStep = Math.min(tStep * 0.7 / Math.max(tLeafs.length, 1), 20);
      tLeafs.forEach((lf, li) => {
        const lo = tLeafs.length === 1 ? 0 : (li - (tLeafs.length - 1) / 2) * (lStep * 2 / Math.max(1, tLeafs.length - 1));
        const la = (ta + lo) % 360;
        const lrad = (la - 90) * Math.PI / 180;
        nodes.push({
          id: lf.id, type: 'leaf', label: snippet(lf.label || '', keyword),
          r: 4, radialDist: 740, color, leaf: lf, tableName: t.tableName,
          x: CX + 740 * Math.cos(lrad), y: CY + 740 * Math.sin(lrad)
        });
        links.push({ source: tId, target: lf.id });
      });
    });
  });

  return { nodes, links };
}

// SVG를 DOM에 생성하고 노드·링크를 그린 뒤 D3 물리 시뮬레이션을 시작하는 함수
function renderSvg(wrap, nodes, links, keyword, onNodeClick) {
  wrap.innerHTML = '';
  const cw = wrap.clientWidth || 800;
  const ch = wrap.clientHeight || 550;

  _svg = d3.select(wrap).append('svg')
    .attr('width', '100%').attr('height', '100%')
    .style('display', 'block');

  _svg.append('defs').append('filter').attr('id', 'kwshadow')
    .append('feDropShadow').attr('dx', 0).attr('dy', 2).attr('stdDeviation', 4).attr('flood-color', '#00000025');

  _svgG = _svg.append('g');

  // fit view
  const s = Math.min(cw / W, ch / H) * 0.88;
  _transform = { x: (cw - W * s) / 2, y: (ch - H * s) / 2, scale: s };
  _svgG.attr('transform', `translate(${_transform.x},${_transform.y}) scale(${_transform.scale})`);

  // Links
  const linkSel = _svgG.append('g').attr('class', 'links')
    .selectAll('line').data(links).enter().append('line')
    .attr('stroke', d => {
      const t = d.source.type;
      return t === 'center' ? '#475569' : t === 'domain' ? '#94a3b8' : '#cbd5e1';
    })
    .attr('stroke-width', d => {
      const t = d.source.type;
      return t === 'center' ? 2.5 : t === 'domain' ? 2 : 1.5;
    })
    .attr('stroke-dasharray', d => {
      const t = d.source.type;
      return t === 'center' ? '8 5' : t === 'domain' ? '5 4' : '3 3';
    });

  // Nodes group
  const nodeG = _svgG.append('g').attr('class', 'nodes')
    .selectAll('g').data(nodes).enter().append('g')
    .attr('data-node', d => d.id)
    .style('cursor', 'pointer');

  nodeG.each(function(d) {
    const g = d3.select(this);

    if (d.type === 'center') {
      g.append('circle')
        .attr('cx', 0).attr('cy', 0).attr('r', d.r)
        .attr('fill', '#334155').attr('stroke', '#ffffff').attr('stroke-width', 4)
        .attr('filter', 'url(#kwshadow)');
      g.append('text').text(d.label)
        .attr('text-anchor', 'middle').attr('y', -8)
        .attr('font-size', 32).attr('font-weight', 900).attr('fill', '#fff')
        .attr('font-family', 'Malgun Gothic,sans-serif');
      g.append('text').text(nodes.filter(n => n.type === 'leaf').length)
        .attr('text-anchor', 'middle').attr('y', 24)
        .attr('font-size', 18).attr('font-weight', 700).attr('fill', '#cbd5e1')
        .attr('font-family', 'Malgun Gothic,sans-serif');

    } else if (d.type === 'domain') {
      g.append('circle')
        .attr('cx', 0).attr('cy', 0).attr('r', d.r)
        .attr('fill', d.color).attr('stroke', '#ffffff').attr('stroke-width', 2)
        .attr('filter', 'url(#kwshadow)');
      g.append('text').text(d.label)
        .attr('text-anchor', 'middle').attr('y', 5)
        .attr('font-size', 17).attr('font-weight', 800).attr('fill', '#fff')
        .attr('font-family', 'Malgun Gothic,sans-serif');

    } else if (d.type === 'table') {
      const angle = Math.atan2(d.y - CY, d.x - CX) * 180 / Math.PI;
      const isLeft = angle > 90 || angle < -90;
      const textRot = isLeft ? angle + 180 : angle;
      const textAnchor = isLeft ? 'end' : 'start';
      const dx = isLeft ? -16 : 16;

      g.append('circle')
        .attr('cx', 0).attr('cy', 0).attr('r', d.r)
        .attr('fill', '#ffffff').attr('stroke', d.color).attr('stroke-width', 3);
      appendKwText(g.append('g').attr('transform', `rotate(${textRot})`),
        d.label, keyword, dx, 5, textAnchor, 15, 700, '#334155');

    } else if (d.type === 'leaf') {
      const angle = Math.atan2(d.y - CY, d.x - CX) * 180 / Math.PI;
      const isLeft = angle > 90 || angle < -90;
      const textRot = isLeft ? angle + 180 : angle;
      const textAnchor = isLeft ? 'end' : 'start';
      const dx = isLeft ? -10 : 10;

      g.append('circle')
        .attr('cx', 0).attr('cy', 0).attr('r', d.r)
        .attr('fill', d.color).attr('stroke', 'none');
      appendKwText(g.append('g').attr('transform', `rotate(${textRot})`),
        d.label, keyword, dx, 4, textAnchor, 13, 400, '#475569');
    }
  });

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute').style('visibility', 'hidden')
    .style('background', 'rgba(15,23,42,.9)').style('color', '#fff')
    .style('padding', '6px 12px').style('border-radius', '6px')
    .style('font-size', '12px').style('pointer-events', 'none').style('z-index', '9999')
    .attr('class', 'kwmap-tooltip');

  nodeG.on('mouseover', function(event, d) {
    if (d.type === 'center') return;
    d3.select(this).select('circle').attr('stroke', '#fbbf24').attr('stroke-width', 3);
    tooltip.style('visibility', 'visible').text(
      d.type === 'domain' ? `${escapeHtml(d.label)} (${escapeHtml(d.count)}개 데이터셋)` :
      d.type === 'table' ? d.label : d.leaf?.label || d.label
    );
  })
  .on('mousemove', function(event) {
    tooltip.style('top', (event.pageY - 36) + 'px').style('left', (event.pageX + 12) + 'px');
  })
  .on('mouseout', function(event, d) {
    if (d.type === 'center') return;
    d3.select(this).select('circle')
      .attr('stroke', d.type === 'table' ? d.color : (d.type === 'domain' ? '#ffffff' : 'none'))
      .attr('stroke-width', d.type === 'table' ? 3 : (d.type === 'domain' ? 2 : 0));
    tooltip.style('visibility', 'hidden');
  })
  .on('click', function(event, d) {
    event.stopPropagation();
    if (d.type === 'center') return;
    
    // 선택 안 된 다른 노드들을 원래 색상으로 복구
    d3.selectAll('[data-node] circle')
      .attr('stroke', dd => dd.type === 'table' ? dd.color : (dd.type === 'domain' ? '#ffffff' : 'none'))
      .attr('stroke-width', dd => dd.type === 'table' ? 3 : (dd.type === 'domain' ? 2 : 0));
      
    // 클릭한 노드만 강조
    d3.select(this).select('circle').attr('stroke', '#fbbf24').attr('stroke-width', 3);
    if (onNodeClick) onNodeClick(d);
  });

  // Drag
  nodeG.call(d3.drag()
    .on('start', function(event, d) {
      if (_sim) _sim.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    })
    .on('drag', function(event, d) {
      d.fx = event.x; d.fy = event.y;
    })
    .on('end', function(event, d) {
      d.fx = null; d.fy = null;
      if (_sim) _sim.alphaTarget(0.015);
    })
  );

  // Simulation tick → update positions
  const tick = () => {
    linkSel
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeG.attr('transform', d => `translate(${escapeHtml(d.x)},${escapeHtml(d.y)})`);
  };

  // Stop old sim
  if (_sim) { _sim.stop(); clearTimeout(_settleTimer); }
  d3.selectAll('.kwmap-tooltip').remove();

  // D3 포스 시뮬레이션 설정: 링크 거리, 반발력, 충돌 회피, 방사형 배치 힘 적용
  _sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => d.source.type === 'CENTER' ? 280 : 240).strength(0.8))
    .force('charge', d3.forceManyBody().strength(d => d.type === 'domain' ? -1200 : d.type === 'table' ? -400 : -120))
    .force('collide', d3.forceCollide().radius(d => d.r + (d.type === 'leaf' ? 12 : 22)).iterations(2))
    .force('radial', d3.forceRadial(d => d.radialDist, CX, CY).strength(0.6))
    .alphaDecay(0.004).alphaTarget(0.04).velocityDecay(0.18)
    .on('tick', tick);

  _settleTimer = setTimeout(() => { if (_sim) _sim.alphaTarget(0.015); }, 5000);
  _nodes = nodes;

  return { linkSel, nodeG };
}

// 노드 클릭 시 우측 상세 패널을 업데이트하는 함수 (도메인/테이블/리프별 다른 UI 렌더링)
function updateDetailPanel(d) {
  const panel = document.getElementById('kwmap-detail-panel');
  if (!panel) return;

  if (d.type === 'domain') {
    panel.innerHTML = `
      <div style="padding:4px 0;">
        <div style="display:inline-block;padding:3px 10px;border-radius:6px;background:${escapeHtml(d.color)};color:#fff;font-size:12px;font-weight:700;margin-bottom:12px;">${escapeHtml(d.label)}</div>
        <p style="font-size:13px;color:#475569;margin:0 0 8px;">이 분야에 <strong style="color:#1e293b;">${escapeHtml(d.count)}개</strong>의 데이터세트가 연결되어 있습니다.</p>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px;">
          ${(d.tables || []).map(t => `
            <div style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#334155;">
              ${t.tableLabel || t.tableName}
            </div>`).join('')}
        </div>
      </div>`;
  } else if (d.type === 'table') {
    const t = d.table || {};
    const cleanId = (t.tableName || '').replace(/-/g, '').toLowerCase();
    const datasetObj = getDatasetsSync().find(ds => (ds.id || '').replace(/-/g, '').toLowerCase() === cleanId);

    panel.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;">
        <div style="flex:1;overflow-y:auto;padding-bottom:8px;">
          <div style="display:inline-block;padding:3px 10px;border-radius:6px;background:${escapeHtml(d.color)};color:#fff;font-size:12px;font-weight:700;margin-bottom:10px;">${escapeHtml(d.domain || '')}</div>
          <p style="font-size:15px;font-weight:700;color:#1e293b;margin:0 0 6px;">${escapeHtml(t.tableLabel || t.tableName)}</p>
          <p style="font-size:12px;color:#64748b;margin:0 0 16px;">테이블 ID: ${escapeHtml(t.tableName)}</p>
          <div id="kwmap-meta-loading" style="color:#94a3b8;font-size:13px;">컬럼 정보 불러오는 중...</div>
          <div id="kwmap-meta-list" style="display:none;"></div>
        </div>
        ${_onSelectDataset && datasetObj ? `
        <div style="padding:10px 0 0;border-top:1px solid #f1f5f9;flex-shrink:0;">
          <button id="kwmap-jump-dataset" style="width:100%;padding:8px 0;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
            <i class="ri-file-list-3-line"></i> 데이터 세트 자세히 보기
          </button>
        </div>` : ''}
      </div>`;

    fetch(`/api/datasetMetadata.do?svc_no=${encodeURIComponent(t.tableName)}`)
      .then(r => r.ok ? r.json() : [])
      .then(cols => {
        const loadEl = document.getElementById('kwmap-meta-loading');
        const listEl = document.getElementById('kwmap-meta-list');
        if (!loadEl || !listEl) return;
        loadEl.style.display = 'none';
        listEl.style.display = '';
        if (!cols.length) { listEl.innerHTML = '<p style="font-size:12px;color:#94a3b8;">컬럼 정보가 없습니다.</p>'; return; }
        listEl.innerHTML = `<p style="font-size:12px;font-weight:600;color:#475569;margin:0 0 8px;">컬럼 (${cols.length}개)</p>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${cols.map(c => `<div style="padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;color:#334155;display:flex;align-items:center;gap:8px;">
              <span style="font-weight:600;color:#1e293b;min-width:80px;">${escapeHtml(c.kor_nm || c.field || '')}</span>
              <span style="color:#94a3b8;font-family:monospace;font-size:10px;">${escapeHtml(c.field || '')}</span>
              ${c.sql_type ? `<span style="margin-left:auto;color:#64748b;font-size:10px;">${escapeHtml(c.sql_type)}</span>` : ''}
            </div>`).join('')}
          </div>`;
      }).catch(() => {});

    if (_onSelectDataset && datasetObj) {
      document.getElementById('kwmap-jump-dataset')?.addEventListener('click', () => _onSelectDataset(datasetObj));
    }

  } else if (d.type === 'leaf') {
    const cleanId = (d.tableName || '').replace(/-/g, '').toLowerCase();
    const datasetObj = getDatasetsSync().find(ds => (ds.id || '').replace(/-/g, '').toLowerCase() === cleanId);

    panel.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;">
        <div style="flex:1;overflow-y:auto;padding-bottom:8px;">
          <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0 0 8px;">${escapeHtml(d.leaf?.label || d.label || '')}</p>
          <p style="font-size:12px;color:#64748b;margin:0;">테이블: ${escapeHtml(d.tableName)}</p>
        </div>
        ${_onSelectDataset && datasetObj ? `
        <div style="padding:10px 0 0;border-top:1px solid #f1f5f9;flex-shrink:0;">
          <button id="kwmap-jump-dataset" style="width:100%;padding:8px 0;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
            <i class="ri-file-list-3-line"></i> 데이터 세트 자세히 보기
          </button>
        </div>` : ''}
      </div>`;

    if (_onSelectDataset && datasetObj) {
      document.getElementById('kwmap-jump-dataset')?.addEventListener('click', () => _onSelectDataset(datasetObj));
    }
  }
}

// 키워드 데이터맵 그래프를 렌더링하는 메인 진입 함수
// 동일 키워드 중복 렌더를 방지하고, 데이터 로드 후 buildGraph → renderSvg 순서로 처리
let _currentOp = 'AND';

export function renderKeywordGraph(keyword, onSelectDataset) {
  const graphWrap = document.getElementById('kwmap-graph-container');
  const svgWrap = document.getElementById('kwmap-svg-wrap');
  if (!graphWrap || !svgWrap) return;

  if (onSelectDataset !== undefined) _onSelectDataset = onSelectDataset;

  const currentOperator = document.getElementById('datamap-keyword-operator')?.value || 'AND';

  if (_currentKeyword === keyword && _currentOp === currentOperator && _lastData) {
    // 키워드와 연산자가 모두 같으면 _lastData를 재사용하여 새로 렌더링만 수행 (불필요한 API 요청 방지)
    const { nodes, links } = buildGraph(_lastData, keyword);
    renderSvg(svgWrap, nodes, links, keyword, updateDetailPanel);
    return;
  }

  _currentKeyword = keyword;
  _currentOp = currentOperator;

  showLoading(`"${keyword}" 데이터 불러오는 중...`);
  if (_sim) { _sim.stop(); _sim = null; }
  d3.selectAll('.kwmap-tooltip').remove();

  // Pan/zoom 핸들러 (처음 한 번만)
  if (!graphWrap.dataset.panzoom) {
    applyPanZoom(null, graphWrap);
    graphWrap.dataset.panzoom = '1';

    document.getElementById('kwmap-zoom-in')?.addEventListener('click', () =>
      setTransform({ scale: Math.min(_transform.scale + 0.12, 5) }));
    document.getElementById('kwmap-zoom-out')?.addEventListener('click', () =>
      setTransform({ scale: Math.max(_transform.scale - 0.12, 0.15) }));
    document.getElementById('kwmap-zoom-home')?.addEventListener('click', () =>
      fitView(graphWrap));
  }

  // 캡처 버튼
  const captureBtn = document.getElementById('btn-kwmap-capture');
  if (captureBtn && !captureBtn.dataset.bound) {
    captureBtn.dataset.bound = '1';
    captureBtn.addEventListener('click', async () => {
      const svgEl = svgWrap.querySelector('svg');
      if (!svgEl || !_nodes.length) return;
      captureBtn.disabled = true;
      captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 캡처 중...';
      try {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        _nodes.forEach(n => { minX = Math.min(minX, n.x); minY = Math.min(minY, n.y); maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y); });
        minX -= 200; minY -= 150; maxX += 200; maxY += 150;
        const cW = Math.max(800, maxX - minX), cH = Math.max(600, maxY - minY);
        const clone = svgEl.cloneNode(true);
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.setAttribute('width', cW); clone.setAttribute('height', cH);
        clone.setAttribute('viewBox', `0 0 ${cW} ${cH}`);
        clone.style.backgroundColor = '#ffffff';
        const g = clone.querySelector('g');
        if (g) g.setAttribute('transform', `translate(${-minX},${-minY}) scale(1)`);
        const svgData = new XMLSerializer().serializeToString(clone);
        const canvas = document.createElement('canvas');
        canvas.width = cW * 2; canvas.height = cH * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cW, cH);
        await new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => { ctx.drawImage(img, 0, 0); res(); };
          img.onerror = rej;
          img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        });
        const a = document.createElement('a');
        a.download = `키워드데이터맵_${keyword}_${new Date().toISOString().slice(0,10)}.png`;
        a.href = canvas.toDataURL('image/png'); a.click();
      } catch(e) { alert('캡처 실패: ' + e.message); }
      finally { captureBtn.disabled = false; captureBtn.innerHTML = '<i class="ri-camera-lens-line"></i> 화면 캡처'; }
    });
  }

  const op = document.getElementById('datamap-keyword-operator')?.value || 'AND';
  Promise.all([
    fetch(`/api/keyword-datamap?keyword=${encodeURIComponent(keyword)}&op=${op}`).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
    fetch('/api/searchDatasetList.do', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ start_idx: 1, show_cnt: 1000 }) }).then(r => r.ok ? r.json() : { list: [] })
  ])
    .then(([data, dsJson]) => {
      // 데이터세트 이름(svc_nm)에 키워드가 포함된 항목을 matchedTables에 추가
      const kwLower = keyword.toLowerCase();
      const existingIds = new Set((data.matchedTables || []).map(t => String(t.tableName)));
      (dsJson.list || []).forEach(d => {
        if ((d.svc_nm || '').toLowerCase().includes(kwLower)) {
          const normId = String(d.svc_no || '').replace(/-/g, '');
          if (!existingIds.has(normId)) {
            existingIds.add(normId);
            (data.matchedTables = data.matchedTables || []).push({
              tableName: normId, svcNo: d.svc_no,
              tableLabel: d.svc_nm, domain: d.cl_cd_nm || '기타',
              totalCount: 0, matchingCols: [], sampleRows: []
            });
          }
        }
      });

      _lastData = data;
      if (!data.matchedTables || data.matchedTables.length === 0) {
        showError('일치하는 데이터가 없습니다.');
        return;
      }

      // 검색 결과가 있으면 에러창 숨김
      const errEl = document.getElementById('kwmap-error');
      if (errEl) errEl.style.display = 'none';

      const { nodes, links } = buildGraph(data, keyword);
      hideLoading();
      renderSvg(svgWrap, nodes, links, keyword, updateDetailPanel);
    })
    .catch(e => showError(e.message));
}

// container를 받아 내부에 전체 UI를 생성한 뒤 renderKeywordGraph를 실행하는 진입점
export function renderKeywordDataMap(container, initialKeyword, onSelectDataset) {
  if (!container) return;

  // 이미 초기화된 경우 키워드만 변경하여 재검색
  if (container._kwmapInitialized) {
    const input = container.querySelector('#kwmap-standalone-input');
    if (input && initialKeyword) {
      input.value = initialKeyword;
      renderKeywordGraph(initialKeyword, onSelectDataset);
    }
    return;
  }
  container._kwmapInitialized = true;

  container.style.height = '100%';
  container.innerHTML = `
    <section style="display:flex;flex-direction:column;height:100%;padding:24px 32px;gap:16px;box-sizing:border-box;">
      <!-- 헤더 -->
      <div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <h3 style="font-size:16px;font-weight:700;color:#1e293b;margin:0;display:flex;align-items:center;gap:8px;">
            <i class="ri-share-circle-fill" style="color:#2563eb;"></i>
            키워드 데이터맵 (D3 Force)
          </h3>
          <p style="font-size:12px;color:#64748b;margin:0;">노드를 드래그하여 유기적인 데이터 관계망을 탐색해 보세요.</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <input id="kwmap-standalone-input" type="text"
            value="${initialKeyword || ''}"
            placeholder="키워드 입력 (예: 건강기능식품)"
            style="border:1px solid #e2e8f0;border-radius:8px;padding:7px 14px;font-size:13px;outline:none;width:220px;" />
          <button id="kwmap-standalone-search"
            style="padding:7px 18px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;">
            검색
          </button>
          <button id="btn-kwmap-capture"
            style="padding:7px 18px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px;">
            <i class="ri-camera-lens-line"></i> 화면 캡처
          </button>
        </div>
      </div>

      <!-- 본문: 그래프 + 상세 패널 -->
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;flex:1;min-height:0;">
        <!-- 그래프 영역 -->
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;min-height:0;">
          <h4 style="font-size:14px;font-weight:700;color:#1e293b;margin:0 0 12px;">키워드 연계 관계 시각화</h4>
          <div id="kwmap-graph-container" style="flex:1;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0;position:relative;overflow:hidden;cursor:grab;min-height:0;">
            <!-- 로딩 -->
            <div id="kwmap-loading" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:white;z-index:10;">
              <div style="width:44px;height:44px;border:4px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:kwspin 0.8s linear infinite;"></div>
              <div style="font-size:13px;font-weight:600;color:#475569;" id="kwmap-loading-text">데이터 불러오는 중...</div>
            </div>
            <!-- 에러 -->
            <div id="kwmap-error" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;padding:32px;font-weight:700;z-index:10;background:white;"></div>
            <!-- SVG -->
            <div id="kwmap-svg-wrap" style="width:100%;height:100%;background:#fff;display:none;"></div>
            <!-- 줌 버튼 -->
            <div id="kwmap-zoom-btns" style="position:absolute;bottom:16px;right:16px;display:none;flex-direction:column;gap:8px;z-index:10;">
              <button id="kwmap-zoom-in" style="width:36px;height:36px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 1px 4px #0001;">+</button>
              <button id="kwmap-zoom-out" style="width:36px;height:36px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 1px 4px #0001;">−</button>
              <button id="kwmap-zoom-home" style="width:36px;height:36px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;box-shadow:0 1px 4px #0001;display:flex;align-items:center;justify-content:center;">
                <i class="ri-home-4-line" style="font-size:16px;color:#475569;"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 상세 패널 -->
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:18px;display:flex;flex-direction:column;overflow-y:auto;">
          <h4 style="font-size:14px;font-weight:700;color:#1e293b;margin:0 0 4px;">상세 정보 패널</h4>
          <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;border-bottom:1px solid #f1f5f9;padding-bottom:12px;">노드를 클릭하면 세부 정보가 표시됩니다.</p>
          <div id="kwmap-detail-panel" style="flex:1;overflow-y:auto;">
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-size:13px;gap:8px;min-height:160px;">
              <i class="ri-cursor-line" style="font-size:28px;"></i>
              <span>← 맵에서 노드를 클릭하세요</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <style>@keyframes kwspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}</style>`;

  const input = container.querySelector('#kwmap-standalone-input');
  const searchBtn = container.querySelector('#kwmap-standalone-search');

  const doSearch = () => {
    const kw = input?.value.trim() || '';
    if (kw) renderKeywordGraph(kw, onSelectDataset);
  };

  searchBtn?.addEventListener('click', doSearch);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  const kw = initialKeyword?.trim() || '';
  if (kw) {
    renderKeywordGraph(kw, onSelectDataset);
  } else {
    // 로딩 숨기고 빈 상태 표시
    const loadEl = container.querySelector('#kwmap-loading');
    if (loadEl) loadEl.style.display = 'none';
  }
}
