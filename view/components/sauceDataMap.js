import { escapeHtml, escapeAttr } from '/view/utils.js';
// 소스 데이터맵 컴포넌트
// 8대 주제 도메인별로 데이터세트를 분류하고 관계도를 시각화합니다.

import { getDatasetsSync } from '../datasetStore.js';
const { useState, useEffect, useRef, useCallback, createElement: h } = React;

const CATEGORY_COLORS = {
  '식품영양정보': '#0d9488',
  '기준규격정보': '#1a5fb4',
  '코드정보': '#7c3aed',
  '수질환경정보': '#e11d48',
  '검사기관정보': '#d97706',
  '식품위해관리': '#059669',
  '식품안전관리': '#2563eb',
  '이력추적관리': '#db2777',
  '어린이식품안전관리': '#ca8a04',
  'HACCP지정현황': '#4f46e5',
  '업체인허가현황': '#0891b2',
  '위생용품': '#ea580c',
  '축산물': '#16a34a',
  '건강기능식품': '#9333ea',
  '수입식품 등': '#be123c',
  '식품 등': '#0369a1',
  '폐업정보': '#475569',
  '용어사전': '#854d0e',
  '기타': '#57534e'
};

// SVG text 엘리먼트에서 키워드 부분만 빨간색 tspan으로 강조하는 React 컴포넌트
function KwText({ text, kw, ...rest }) {
  if (!kw || !text || !text.includes(kw)) return h('text', rest, text);
  const parts = text.split(kw);
  return h('text', rest,
    ...parts.flatMap((p, i) => [
      p && h('tspan', { key: 'p' + i }, p),
      i < parts.length - 1 && h('tspan', { key: 'k' + i, fill: '#ef4444', fontWeight: '900' }, kw)
    ].filter(Boolean))
  );
}

// 긴 텍스트에서 키워드 주변 일부를 추출하여 말줄임 처리하는 함수
function getSnippet(text, kw, maxLen) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  const idx = text.indexOf(kw);
  if (idx === -1 || idx < maxLen - 5) return text.substring(0, maxLen) + '..';
  const start = Math.max(0, idx - 5);
  return '..' + text.substring(start, start + maxLen - 4) + '..';
}

// SVG 패닝(드래그) 및 줌(휠) 인터랙션을 처리하는 커스텀 훅
function usePanZoom(svgRef) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const scaleAdjust = e.deltaY * -0.001;
    setTransform(p => {
      const newScale = Math.min(Math.max(0.2, p.scale + scaleAdjust), 5);
      return { ...p, scale: newScale };
    });
  }, []);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    if (svgRef.current) svgRef.current.style.cursor = 'grabbing';
  }, [transform]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    setTransform(p => ({ ...p, x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y }));
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (svgRef.current) svgRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', onWheel, { passive: false });
      return () => svg.removeEventListener('wheel', onWheel);
    }
  }, [onWheel, svgRef]);

  return { transform, onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp, setTransform };
}

// 키워드 기반 데이터맵의 메인 React 컴포넌트
// D3 시뮬레이션으로 중심 → 도메인 → 테이블 → 리프 4계층 그래프를 렌더링
function KeywordDataMap({ initialKeyword, onSelectDataset }) {
  const defaultKw = initialKeyword || '소스';
  const [keyword, setKeyword] = useState(defaultKw);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [dynamicDomains, setDynamicDomains] = useState({});
  const [tableMetadata, setTableMetadata] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [, setTick] = useState(0); // Trigger renders

  const svgWrapRef = useRef(null);
  const captureRef = useRef(null);
  const simRef = useRef(null);
  const nodesRef = useRef([]);
  const linksRef = useRef([]);

  const { transform, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, setTransform } = usePanZoom(svgWrapRef);

  const W = 1800, H = 1400;
  const CX = W / 2, CY = H / 2;

  // 키워드로 데이터맵 API를 호출하고 D3 시뮬레이션 초기 좌표를 설정하는 함수
  const loadData = useCallback(async (kw) => {
    setLoading(true); setError(null); setData(null); setSelected(null);
    setTransform({ x: -150, y: -250, scale: 0.65 });
    if (simRef.current) { simRef.current.stop(); simRef.current = null; }

    try {
      const [r, dsRes] = await Promise.all([
        fetch(`/api/keyword-datamap?keyword=${encodeURIComponent(kw)}`),
        fetch('/api/searchDatasetList.do', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ start_idx: 1, show_cnt: 1000 }) })
      ]);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();

      // 데이터세트 이름(svc_nm)에 키워드가 포함된 항목을 노드에 추가
      if (dsRes.ok) {
        const dsJson = await dsRes.json();
        const kwLower = kw.toLowerCase();
        const existingIds = new Set((j.matchedTables || []).map(t => String(t.tableName)));
        (dsJson.list || []).forEach(d => {
          if ((d.svc_nm || '').toLowerCase().includes(kwLower)) {
            const normId = String(d.svc_no || '').replace(/-/g, '');
            if (!existingIds.has(normId)) {
              existingIds.add(normId);
              (j.matchedTables = j.matchedTables || []).push({
                tableName: normId, svcNo: d.svc_no,
                tableLabel: d.svc_nm, domain: d.cl_cd_nm || '기타',
                totalCount: 0, matchingCols: [], sampleRows: []
              });
            }
          }
        });
      }

      setData(j);

      const tables = j.matchedTables || [];
      const activeDomains = [...new Set(tables.map(t => t.domain || '기타'))];
      const domainsMap = {};
      activeDomains.forEach(domainName => {
        const color = CATEGORY_COLORS[domainName] || '#64748b';
        domainsMap[domainName] = {
          key: domainName,
          label: domainName,
          color: color,
          bg: color
        };
      });
      setDynamicDomains(domainsMap);

      setTimeout(() => {
        if (svgWrapRef.current) {
          const cw = svgWrapRef.current.clientWidth;
          const ch = svgWrapRef.current.clientHeight;
          const targetScale = Math.min(cw / 1800, ch / 1400) * 0.9;
          setTransform({ x: (cw - 1800 * targetScale) / 2, y: (ch - 1400 * targetScale) / 2, scale: targetScale });
        }
      }, 100);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [setTransform]);

  useEffect(() => { loadData(keyword); }, [keyword, loadData]);

  // 선택된 노드 변경 시 해당 테이블의 컬럼 메타데이터를 API에서 가져오는 이펙트
  useEffect(() => {
    if (!selected) {
      setTableMetadata([]);
      return;
    }
    let tName = null;
    if (selected.type === 'table') {
      tName = selected.tableName;
    } else if (selected.type === 'leaf') {
      tName = selected.tableName;
    }
    if (!tName) {
      setTableMetadata([]);
      return;
    }

    let active = true;
    const fetchMeta = async () => {
      setLoadingMeta(true);
      try {
        const res = await fetch(`/api/datasetMetadata.do?svc_no=${encodeURIComponent(tName)}`);
        if (res.ok) {
          const cols = await res.json();
          if (active) setTableMetadata(cols);
        }
      } catch (err) {
        console.error('Failed to load table metadata:', err);
      } finally {
        if (active) setLoadingMeta(false);
      }
    };
    fetchMeta();
    return () => { active = false; };
  }, [selected]);

  // 데이터 변경 시 D3 포스 시뮬레이션을 초기화하고 노드·링크 배열을 구성하는 이펙트
  useEffect(() => {
    if (!data || typeof d3 === 'undefined') return;

    const tables = data.matchedTables || [];
    const leafs = data.nodes || [];

    const d3nodes = [];
    const d3links = [];

    // Center Node
    d3nodes.push({
      id: 'CENTER', type: 'center', label: keyword,
      r: 90, radialDist: 0,
      x: CX, y: CY, fx: CX, fy: CY // Fixed at center
    });

    const groups = {};
    tables.forEach(t => { const d = t.domain || '기타'; (groups[d] = groups[d] || []).push(t); });
    const activeDomains = Object.keys(groups);

    // Give them initial radial positions to help the physics engine settle nicely
    const minDeg = Math.min(45, 360 / Math.max(activeDomains.length, 1));
    const rawSums = activeDomains.map(d => Math.max(minDeg, (groups[d].length / (tables.length || 1)) * 360));
    const scale = 360 / rawSums.reduce((s, v) => s + v, 0);
    let ang = 0;

    activeDomains.forEach(domain => {
      const deg = rawSums[activeDomains.indexOf(domain)] * scale;
      const midAng = ang + deg / 2;
      ang += deg;
      const rad = (midAng - 90) * Math.PI / 180;

      const color = CATEGORY_COLORS[domain] || '#64748b';
      const dc = { label: domain, color, bg: color };
      const dId = 'DOM_' + domain;
      const ts = groups[domain];

      d3nodes.push({
        id: dId, type: 'domain', label: dc.label, count: ts.length, sum: ts.reduce((a, b) => a + (b.totalCount || 0), 0),
        r: 56, radialDist: 280, dc, domain, tables: ts,
        x: CX + 280 * Math.cos(rad), y: CY + 280 * Math.sin(rad)
      });
      d3links.push({ source: 'CENTER', target: dId });

      const tStep = deg * 0.85 / Math.max(ts.length, 1);
      const tStart = midAng - (deg * 0.85) / 2;

      ts.forEach((t, ti) => {
        const ta = ts.length === 1 ? midAng : tStart + ti * tStep + tStep / 2;
        const trad = (ta - 90) * Math.PI / 180;
        const tId = 'TBL_' + t.tableName;

        d3nodes.push({
          id: tId, type: 'table', label: (t.tableLabel || t.tableName).trim(),
          r: 8, radialDist: 520, dc, table: t, tableName: t.tableName,
          x: CX + 520 * Math.cos(trad), y: CY + 520 * Math.sin(trad)
        });
        d3links.push({ source: dId, target: tId });

        const tLeafs = leafs.filter(n => (n.id || '').startsWith('LEAF_' + t.tableName + '_'));
        const lStep = Math.min(tStep * 0.7 / Math.max(tLeafs.length, 1), 20);

        tLeafs.forEach((lf, li) => {
          const lo = tLeafs.length === 1 ? 0 : (li - (tLeafs.length - 1) / 2) * (lStep * 2 / Math.max(1, tLeafs.length - 1));
          const la = (ta + lo) % 360;
          const lrad = (la - 90) * Math.PI / 180;

          d3nodes.push({
            id: lf.id, type: 'leaf', label: getSnippet(lf.label || '', keyword, 24),
            r: 5, radialDist: 760, dc, leaf: lf, tableName: t.tableName,
            x: CX + 760 * Math.cos(lrad), y: CY + 760 * Math.sin(lrad)
          });
          d3links.push({ source: tId, target: lf.id });
        });
      });
    });

    nodesRef.current = d3nodes;
    linksRef.current = d3links;

    const sim = d3.forceSimulation(d3nodes)
      .force('link', d3.forceLink(d3links).id(d => d.id).distance(d => d.source.type === 'CENTER' ? 280 : 240).strength(0.8))
      .force('charge', d3.forceManyBody().strength(d => d.type === 'domain' ? -1200 : (d.type === 'table' ? -400 : -120)))
      .force('collide', d3.forceCollide().radius(d => d.r + (d.type === 'leaf' ? 12 : 22)).iterations(2))
      .force('radial', d3.forceRadial(d => d.radialDist, CX, CY).strength(0.6))
      .alphaDecay(0.004)
      .alphaTarget(0.04)
      .velocityDecay(0.18)
      .on('tick', () => {
        setNodes([...nodesRef.current]);
        setLinks([...linksRef.current]);
      });

    // 5초 후 안정화: alphaTarget을 낮춰 미세 진동만 유지
    const settleTimer = setTimeout(() => {
      if (simRef.current) simRef.current.alphaTarget(0.015);
    }, 5000);

    simRef.current = sim;
    return () => { sim.stop(); clearTimeout(settleTimer); };
  }, [data, keyword]);

  // Drag interaction for D3 nodes in React
  const bindDrag = (nodeId) => {
    return {
      onMouseDown: (e) => {
        e.stopPropagation();
        const node = nodesRef.current.find(n => n.id === nodeId);
        if (!node || node.type === 'CENTER') return;

        const sim = simRef.current;
        if (sim) sim.alphaTarget(0.3).restart();

        const startX = e.clientX;
        const startY = e.clientY;
        const nodeStartX = node.x;
        const nodeStartY = node.y;

        const moveHandler = (moveEvent) => {
          node.fx = nodeStartX + (moveEvent.clientX - startX) / transform.scale;
          node.fy = nodeStartY + (moveEvent.clientY - startY) / transform.scale;
        };
        const upHandler = () => {
          node.fx = null;
          node.fy = null;
          if (sim) sim.alphaTarget(0);
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', upHandler);
        };
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
      }
    };
  };

  const capture = async () => {
    const svgEl = captureRef.current?.querySelector('svg');
    if (!svgEl || !nodesRef.current.length) return;
    setCapturing(true);

    try {
      // 1. Calculate dynamic bounding box of all nodes (including dragged ones)
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodesRef.current.forEach(n => {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x);
        maxY = Math.max(maxY, n.y);
      });

      // Add generous padding so long text strings at the edges are never cut off
      minX -= 250; minY -= 150;
      maxX += 250; maxY += 150;

      const captureW = Math.max(800, maxX - minX);
      const captureH = Math.max(600, maxY - minY);

      // 2. Clone the SVG and setup for pure un-clipped export
      const clone = svgEl.cloneNode(true);
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', captureW);
      clone.setAttribute('height', captureH);
      clone.setAttribute('viewBox', `0 0 ${captureW} ${captureH}`);
      clone.style.backgroundColor = '#ffffff';

      // 3. Strip the user's pan/zoom transform and perfectly center the logic coordinates into the box
      const g = clone.querySelector('g');
      if (g) g.setAttribute('transform', `translate(${-minX}, ${-minY}) scale(1)`);

      // 4. Serialize to string and render to 2x resolution Canvas
      const svgData = new XMLSerializer().serializeToString(clone);
      const canvas = document.createElement('canvas');
      canvas.width = captureW * 2;
      canvas.height = captureH * 2;
      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, captureW, captureH);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, captureW, captureH);
        const a = document.createElement('a');
        a.download = keyword + '_데이터맵_전체화면.jpg';
        a.href = canvas.toDataURL('image/jpeg', 0.95);
        a.click();
        setCapturing(false);
      };
      img.onerror = () => {
        alert('이미지 렌더링 실패');
        setCapturing(false);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    } catch (e) {
      alert('캡처 실패: ' + e.message);
      setCapturing(false);
    }
  };

  const els = [];

  // Draw links
  links.forEach(l => {
    let stroke = '#e2e8f0', width = 1.5, dash = 'none';
    if (l.source.type === 'center') { stroke = '#cbd5e1'; width = 2.5; dash = '6 6'; }
    else if (l.source.type === 'domain') { stroke = '#e2e8f0'; width = 2; dash = '4 4'; }
    else if (l.source.type === 'table') { stroke = '#f1f5f9'; width = 1.5; dash = '3 3'; }

    els.push(h('line', {
      key: `l-${l.source.id}-${l.target.id}`,
      x1: l.source.x, y1: l.source.y, x2: l.target.x, y2: l.target.y,
      stroke, strokeWidth: width, strokeDasharray: dash
    }));
  });

  // Draw nodes
  nodes.forEach(n => {
    if (n.type === 'center') {
      els.push(h('g', { key: n.id, style: { cursor: 'pointer' }, onClick: () => setTransform({ x: 0, y: 0, scale: 1 }) },
        h('circle', { cx: n.x, cy: n.y, r: n.r, fill: '#334155', stroke: '#ffffff', strokeWidth: 4, filter: 'url(#sh)' }),
        h('text', { x: n.x, y: n.y - 8, textAnchor: 'middle', fontSize: 32, fontWeight: 900, fill: '#fff', fontFamily: 'Malgun Gothic,sans-serif' }, n.label),
        h('text', { x: n.x, y: n.y + 24, textAnchor: 'middle', fontSize: 18, fontWeight: 700, fill: '#cbd5e1', fontFamily: 'Malgun Gothic,sans-serif' }, (data?.nodes?.filter(x => x.id.startsWith('LEAF')).length || 0).toLocaleString())
      ));
    } else if (n.type === 'domain') {
      els.push(h('g', { key: n.id, transform: `translate(${n.x},${n.y})`, style: { cursor: 'pointer' }, ...bindDrag(n.id), onClick: (e) => { e.stopPropagation(); setSelected({ type: 'domain', domain: n.domain, dc: n.dc, tables: n.tables }); } },
        h('circle', { cx: 0, cy: 0, r: n.r, fill: n.dc.bg, stroke: '#ffffff', strokeWidth: 2, filter: 'url(#sh)' }),
        h('text', { x: 0, y: 5, textAnchor: 'middle', fontSize: 17, fontWeight: 800, fill: '#fff', fontFamily: 'Malgun Gothic,sans-serif' }, n.label)
      ));
    } else if (n.type === 'table') {
      // Calculate rotation based on center
      const angle = Math.atan2(n.y - CY, n.x - CX) * 180 / Math.PI;
      const isLeft = angle > 90 || angle < -90;
      const textRot = isLeft ? angle + 180 : angle;
      const textAnchor = isLeft ? 'end' : 'start';
      const dx = isLeft ? -16 : 16;

      els.push(h('g', { key: n.id, transform: `translate(${n.x},${n.y})`, style: { cursor: 'pointer' }, ...bindDrag(n.id), onClick: (e) => { e.stopPropagation(); setSelected({ type: 'table', ...n.table, dc: n.dc }); } },
        h('circle', { cx: 0, cy: 0, r: n.r, fill: '#ffffff', stroke: n.dc.color, strokeWidth: 3 }),
        h('g', { transform: `rotate(${textRot})` },
          h(KwText, { text: n.label, kw: keyword, x: dx, y: 5, textAnchor: textAnchor, fontSize: 15, fontWeight: 700, fill: '#334155', fontFamily: 'Malgun Gothic,sans-serif' })
        )
      ));
    } else if (n.type === 'leaf') {
      const angle = Math.atan2(n.y - CY, n.x - CX) * 180 / Math.PI;
      const isLeft = angle > 90 || angle < -90;
      const textRot = isLeft ? angle + 180 : angle;
      const textAnchor = isLeft ? 'end' : 'start';
      const dx = isLeft ? -10 : 10;

      els.push(h('g', { key: n.id, transform: `translate(${n.x},${n.y})`, style: { cursor: 'pointer' }, ...bindDrag(n.id), onClick: (e) => { e.stopPropagation(); setSelected({ type: 'leaf', ...n.leaf, tableName: n.tableName, dc: n.dc }); } },
        h('circle', { cx: 0, cy: 0, r: n.r, fill: n.dc.color, stroke: 'none' }),
        h('g', { transform: `rotate(${textRot})` },
          h(KwText, { text: n.label, kw: keyword, x: dx, y: 4, textAnchor: textAnchor, fontSize: 13, fill: '#475569', fontFamily: 'Malgun Gothic,sans-serif' })
        )
      ));
    }
  });

  const renderDetail = () => {
    if (!selected) return h('div', { style: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 40 } }, '← 맵에서 노드를 클릭하세요 (드래그 가능)');
    const dc = selected.dc || { label: '기타', color: '#64748b', bg: '#64748b' };

    let datasetObj = null;
    let tName = null;
    if (selected.type === 'table') {
      tName = selected.tableName || selected.id?.replace('TBL_', '');
    } else if (selected.type === 'leaf') {
      tName = selected.tableName;
    }

    if (tName) {
      const cleanTName = tName.replace(/-/g, '').toLowerCase();
      datasetObj = getDatasetsSync().find(d => d.id?.replace(/-/g, '').toLowerCase() === cleanTName);
    }

    const metadataSection = () => {
      if (loadingMeta) {
        return h('div', { className: 'py-8 text-center text-xs text-slate-500' },
          h('i', { className: 'ri-loader-4-line animate-spin text-gov-600 text-lg mr-1 inline-block align-middle' }),
          '컬럼 정의 데이터 로드 중...'
        );
      }
      if (tableMetadata && tableMetadata.length > 0) {
        return h('div', { className: 'flex flex-col gap-2 mt-2' },
          h('h4', { className: 'text-xs font-bold text-slate-700 border-b border-slate-100 pb-1 flex items-center gap-1' },
            h('i', { className: 'ri-table-line text-gov-600' }),
            '데이터베이스 스키마 (컬럼 정의)'
          ),
          h('div', { className: 'flex flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-1' },
            tableMetadata.map((col, i) =>
              h('div', { key: 'col_' + i, className: 'flex flex-col bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs hover:border-slate-300 transition-all' },
                h('div', { className: 'flex justify-between items-center mb-1' },
                  h('span', { className: 'font-mono font-bold text-gov-700' }, col.field),
                  col.data_type && h('span', { className: 'bg-slate-200 text-slate-600 rounded px-1.5 py-0.5 text-[10px] font-mono' }, col.data_type + (col.length ? `(${col.length})` : ''))
                ),
                h('div', { className: 'text-slate-700 font-medium' }, col.kor_nm || '설명 없음'),
                col.description && col.description !== col.kor_nm && h('div', { className: 'text-slate-400 text-[10px] mt-0.5' }, col.description)
              )
            )
          )
        );
      }
      return null;
    };

    if (selected.type === 'domain') return h('div', { className: 'flex flex-col gap-3.5' },
      h('div', { style: { background: dc.bg, borderRadius: 10, padding: 14 } },
        h('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, dc.label),
        h('div', { style: { fontSize: 12, color: '#ffffffcc', marginTop: 4 } }, `테이블 ${selected.tables?.length || 0}개 포함`)
      ),
      h('div', { className: 'flex flex-col gap-2' },
        h('h4', { className: 'text-xs font-bold text-slate-700 border-b border-slate-100 pb-1 flex items-center gap-1' },
          h('i', { className: 'ri-list-check text-gov-600' }),
          '포함된 테이블 목록'
        ),
        ...(selected.tables || []).map((t, i) =>
          h('div', { key: i, style: { background: '#f8fafc', borderRadius: 8, padding: '10px 12px', fontSize: 12 } },
            h('span', { style: { fontWeight: 700, color: dc.color } }, t.tableLabel || t.tableName),
            h('span', { style: { color: '#94a3b8', marginLeft: 8 } }, t.totalCount + '건')
          )
        )
      )
    );

    if (selected.type === 'table') {
      return h('div', { className: 'flex flex-col gap-3.5' },
        h('div', { style: { background: dc.bg, borderRadius: 10, padding: 12 } },
          h('div', { style: { fontSize: 14, fontWeight: 700, color: '#fff' } }, selected.tableLabel || selected.tableName),
          h('div', { style: { fontSize: 24, fontWeight: 800, color: '#fff', marginTop: 4 } }, selected.totalCount + '건')
        ),

        datasetObj && h('div', { className: 'flex flex-col gap-2' },
          datasetObj.description && h('p', { className: 'text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-3 leading-relaxed' }, datasetObj.description),
          h('button', {
            onClick: () => onSelectDataset && onSelectDataset(datasetObj),
            className: 'w-full py-2 px-4 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5'
          },
            h('i', { className: 'ri-external-link-line' }),
            '공공데이터 상세분석 슬라이드 열기'
          )
        ),

        h('div', { className: 'flex flex-col gap-2' },
          h('h4', { className: 'text-xs font-bold text-slate-700 border-b border-slate-100 pb-1 flex items-center gap-1' },
            h('i', { className: 'ri-focus-3-line text-gov-600' }),
            '키워드 매칭 컬럼'
          ),
          h('div', { className: 'flex flex-col gap-1.5' },
            ...(selected.matchingCols || []).map((c, i) =>
              h('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px' } },
                h('span', { style: { fontSize: 12, fontWeight: 600 } }, c.col),
                h('span', { style: { fontSize: 11, background: dc.color, color: '#fff', borderRadius: 20, padding: '1px 8px' } }, c.count + '건')
              )
            )
          )
        ),

        metadataSection()
      );
    }

    if (selected.type === 'leaf') {
      let row = {};
      try { row = JSON.parse(selected.fullData || '{}'); } catch (e) { }
      return h('div', { className: 'flex flex-col gap-3.5' },
        h('div', { style: { background: '#f1f5f9', borderRadius: 8, padding: 10, fontSize: 12, fontWeight: 700, color: '#475569' } }, '📌 실제 데이터 · ' + selected.tableName),
        h('div', { className: 'flex flex-col gap-1.5' },
          ...Object.entries(row).filter(([k]) => k !== 'val').slice(0, 10).map(([k, v], i) =>
            h('div', { key: i, style: { background: '#fff', borderRadius: 6, padding: '6px 10px', border: '1px solid #e2e8f0' } },
              h('div', { style: { fontSize: 10, color: '#94a3b8', fontWeight: 600 } }, k),
              h('div', { style: { fontSize: 12, color: '#1e293b', wordBreak: 'break-all' } }, String(v || '').substring(0, 60) || '–')
            )
          )
        ),

        datasetObj && h('div', { className: 'flex flex-col gap-2 mt-2' },
          h('button', {
            onClick: () => onSelectDataset && onSelectDataset(datasetObj),
            className: 'w-full py-2 px-4 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5'
          },
            h('i', { className: 'ri-external-link-line' }),
            '소속 공공데이터 상세분석 열기'
          )
        ),

        metadataSection()
      );
    }
    return null;
  };

  return h('section', { className: 'max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in flex flex-col gap-6' },
    // Header
    h('div', { className: 'flex flex-row justify-between items-center gap-4 mb-2 bg-white p-4 rounded-xl shadow-sm border border-slate-200' },
      h('div', { className: 'flex flex-col gap-1' },
        h('h3', { className: 'text-lg font-bold text-slate-800 mb-4 flex items-center gap-2' },
          h('i', { className: 'ri-share-circle-fill text-gov-600' }),
          '키워드 데이터맵 (D3 Force)',
          h('span', { className: 'relative group', style: { display: 'inline-flex', alignItems: 'center' } },
            h('button', { className: 'tooltip-trigger', 'aria-label': '키워드 데이터맵 설명' }, '?'),
            h('div', { className: 'tooltip-dark', style: { left: '50%', transform: 'translateX(-50%)', top: '26px', width: '280px' } },
              h('p', null, h('strong', null, '키워드 데이터맵이란?')),
              h('p', null, '특정 키워드(예: 초콜릿, 우유)와 연관된 데이터세트를 분야별로 분류하여 네트워크 그래프로 시각화합니다. 노드를 드래그하거나 스크롤로 확대/축소할 수 있습니다.'),
              h('div', { className: 'tooltip-arrow', style: { top: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' } })
            )
          )
        ),
        h('p', { className: 'text-xs text-slate-500' }, '노드를 드래그하여 유기적인 데이터 관계망을 탐색해 보세요.')
      ),
      h('button', {
        onClick: capture,
        disabled: !data || capturing,
        className: `px-5 py-2.5 text-white rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap ${capturing ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`
      },
        h('i', { className: capturing ? 'ri-loader-4-line animate-spin' : 'ri-camera-lens-line' }),
        capturing ? '캡처 중...' : '화면 캡처'
      )
    ),

    // Content Grid
    h('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-8 items-start' },
      // Left Panel: Map Container (2 cols)
      h('div', { className: 'lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[600px] relative' },
        h('h3', { className: 'text-lg font-bold text-slate-800 mb-6 flex items-center gap-2' },
          '키워드 연계 관계 시각화',
          h('span', { className: 'relative group', style: { display: 'inline-flex', alignItems: 'center' } },
            h('button', { className: 'tooltip-trigger', 'aria-label': '키워드 연계 관계 시각화 설명' }, '?'),
            h('div', { className: 'tooltip-dark', style: { left: '50%', transform: 'translateX(-50%)', top: '24px', width: '256px' } },
              h('p', null, h('strong', null, '키워드 연계 관계란?')),
              h('p', null, '중앙 키워드 노드를 기준으로 관련 데이터세트가 분야별 색상으로 연결됩니다. 노드 클릭 시 우측 패널에서 상세 정보를 확인할 수 있습니다.'),
              h('div', { className: 'tooltip-arrow', style: { top: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' } })
            )
          )
        ),
        h('div', {
          ref: svgWrapRef,
          onMouseDown, onMouseMove, onMouseUp, onMouseLeave,
          className: 'w-full rounded-xl overflow-hidden relative bg-slate-50 border border-slate-100',
          style: { cursor: 'grab', height: '550px' }
        },
          loading && h('div', { className: 'absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/90 z-10' },
            h('div', { style: { width: 50, height: 50, border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' } }),
            h('div', { className: 'text-slate-600 text-sm font-bold animate-pulse' }, `"${keyword}" 검색 중...`)
          ),
          error && h('div', { className: 'absolute inset-0 flex items-center justify-center p-8 text-red-500 font-bold z-10' }, '⚠️ ' + error),
          !loading && !error && data && h('div', { ref: captureRef, className: 'w-full h-full bg-white' },
            h('svg', { width: '100%', height: '100%', style: { display: 'block' } },
              h('defs', null, h('filter', { id: 'sh' }, h('feDropShadow', { dx: 0, dy: 2, stdDeviation: 4, floodColor: '#00000030' }))),
              h('g', { transform: `translate(${transform.x}, ${transform.y}) scale(${transform.scale})`, style: { transformOrigin: '0 0' } }, ...els)
            )
          ),
          // Floating Map Controls (Zoom In, Zoom Out, Home)
          !loading && !error && data && h('div', { className: 'absolute bottom-6 right-6 flex flex-col gap-2 z-10' },
            h('button', {
              onClick: () => setTransform(p => ({ ...p, scale: Math.min(p.scale + 0.1, 5) })),
              className: 'w-10 h-10 bg-white border border-slate-200 shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:text-gov-600 hover:border-gov-400 transition-all font-bold text-lg'
            }, '+'),
            h('button', {
              onClick: () => setTransform(p => ({ ...p, scale: Math.max(p.scale - 0.1, 0.2) })),
              className: 'w-10 h-10 bg-white border border-slate-200 shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:text-gov-600 hover:border-gov-400 transition-all font-bold text-lg'
            }, '-'),
            h('button', {
              onClick: () => {
                if (svgWrapRef.current) {
                  const cw = svgWrapRef.current.clientWidth;
                  const ch = svgWrapRef.current.clientHeight;
                  const targetScale = Math.min(cw / 1800, ch / 1400) * 0.9;
                  setTransform({ x: (cw - 1800 * targetScale) / 2, y: (ch - 1400 * targetScale) / 2, scale: targetScale });
                }
              },
              className: 'w-10 h-10 bg-white border border-slate-200 shadow-md rounded-lg flex items-center justify-center text-slate-600 hover:text-gov-600 hover:border-gov-400 transition-all'
            }, h('i', { className: 'ri-home-4-line text-lg' }))
          )
        )
      ),

      // Right Panel: Detail Panel (1 col)
      h('div', { className: 'bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[600px] max-h-[660px]' },
        h('h3', { className: 'text-lg font-bold text-slate-800 mb-2 flex items-center gap-2' },
          '상세 정보 패널',
          h('span', { className: 'relative group', style: { display: 'inline-flex', alignItems: 'center' } },
            h('button', { className: 'tooltip-trigger', 'aria-label': '상세 정보 패널 설명' }, '?'),
            h('div', { className: 'tooltip-dark', style: { left: '50%', transform: 'translateX(-50%)', top: '24px', width: '240px' } },
              h('p', null, h('strong', null, '상세 정보 패널이란?')),
              h('p', null, '그래프에서 노드를 클릭하면 해당 데이터세트의 이름, 분야, 제공 기관 등 상세 정보가 이 패널에 표시됩니다.'),
              h('div', { className: 'tooltip-arrow', style: { top: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' } })
            )
          )
        ),
        h('p', { className: 'text-xs text-slate-500 mb-6 border-b border-slate-100 pb-3' }, '노드를 드래그하거나 클릭하면 세부 정보가 표시됩니다.'),
        h('div', { className: 'flex-1 overflow-y-auto pr-2' }, renderDetail())
      )
    ),
    h('style', null, '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}')
  );
}

export function renderSauceDataMap(container, initialKeyword, onSelectDataset) {
  container.style.height = '100%';
  if (!container._reactRoot) {
    container._reactRoot = ReactDOM.createRoot(container);
  }
  container._reactRoot.render(h(KeywordDataMap, { initialKeyword, onSelectDataset }));
}
