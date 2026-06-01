const { useState, useEffect, useRef, useCallback, createElement: h } = React;

const DOMAINS = {
  product:  { label: '식품·제품', color: '#0d9488', bg: '#0d9488' },
  business: { label: '업체·영업자', color: '#1a5fb4', bg: '#1a5fb4' },
  material: { label: '원재료·첨가물', color: '#7c3aed', bg: '#7c3aed' },
  health:   { label: '영양·건강', color: '#e11d48', bg: '#e11d48' },
  import:   { label: '수입식품', color: '#d97706', bg: '#d97706' },
  farm:     { label: '농·축·수산물', color: '#059669', bg: '#059669' },
  other:    { label: '기타', color: '#64748b', bg: '#64748b' }
};

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

function getSnippet(text, kw, maxLen) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  const idx = text.indexOf(kw);
  if (idx === -1 || idx < maxLen - 5) return text.substring(0, maxLen) + '..';
  const start = Math.max(0, idx - 5);
  return '..' + text.substring(start, start + maxLen - 4) + '..';
}

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

function KeywordDataMap() {
  const [inputVal, setInputVal] = useState('소스');
  const [keyword, setKeyword] = useState('소스');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [capturing, setCapturing] = useState(false);
  
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

  const loadData = useCallback(async (kw) => {
    setLoading(true); setError(null); setData(null); setSelected(null);
    setTransform({ x: -150, y: -250, scale: 0.65 });
    if (simRef.current) { simRef.current.stop(); simRef.current = null; }
    
    try {
      const r = await fetch(`/api/keyword-datamap?keyword=${encodeURIComponent(kw)}`);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      setData(j);
      
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

  // Setup D3 Simulation
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
    tables.forEach(t => { const d = t.domain || 'other'; (groups[d] = groups[d] || []).push(t); });
    const activeDomains = Object.keys(groups);

    // Give them initial radial positions to help the physics engine settle nicely
    const minDeg = Math.min(45, 360 / Math.max(activeDomains.length, 1));
    const rawSums = activeDomains.map(d => Math.max(minDeg, (groups[d].length / (tables.length||1)) * 360));
    const scale = 360 / rawSums.reduce((s, v) => s + v, 0);
    let ang = 0;

    activeDomains.forEach(domain => {
      const deg = rawSums[activeDomains.indexOf(domain)] * scale;
      const midAng = ang + deg / 2;
      ang += deg;
      const rad = (midAng - 90) * Math.PI / 180;
      
      const dc = DOMAINS[domain] || DOMAINS.other;
      const dId = 'DOM_' + domain;
      const ts = groups[domain];

      d3nodes.push({
        id: dId, type: 'domain', label: dc.label, count: ts.length, sum: ts.reduce((a,b)=>a+(b.totalCount||0),0),
        r: 56, radialDist: 280, dc, domain, tables: ts,
        x: CX + 280 * Math.cos(rad), y: CY + 280 * Math.sin(rad)
      });
      d3links.push({ source: 'CENTER', target: dId });

      const tStep = deg * 0.85 / Math.max(ts.length, 1);
      const tStart = midAng - (deg * 0.85) / 2;

      ts.forEach((t, ti) => {
        const ta = ts.length === 1 ? midAng : tStart + ti * tStep + tStep/2;
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
      .force('link', d3.forceLink(d3links).id(d => d.id).distance(d => d.source.type === 'CENTER' ? 280 : (d.source.type === 'domain' ? 240 : 240)).strength(1))
      .force('charge', d3.forceManyBody().strength(d => d.type === 'domain' ? -1000 : (d.type === 'table' ? -300 : -100)))
      .force('collide', d3.forceCollide().radius(d => d.r + (d.type==='leaf'?10:20)).iterations(3))
      .force('radial', d3.forceRadial(d => d.radialDist, CX, CY).strength(1.5))
      .alphaDecay(0.02)
      .on('tick', () => {
        setNodes([...nodesRef.current]);
        setLinks([...linksRef.current]);
      });

    simRef.current = sim;
    return () => sim.stop();
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
    if (!captureRef.current || typeof html2canvas === 'undefined') return;
    setCapturing(true);
    
    const el = captureRef.current;
    // Save original styles
    const oldW = el.style.width;
    const oldH = el.style.height;
    const oldPos = el.style.position;
    const oldT = transform;

    // Force massive dimensions so nothing is cut off (max text bounds)
    el.style.width = '2400px';
    el.style.height = '2000px';
    el.style.position = 'absolute';
    el.style.zIndex = '9999';
    el.style.top = '0';
    el.style.left = '0';

    // The graph center is CX=900, CY=700. 
    // For 2400x2000, the center is 1200x1000. 
    // Offset by +300, +300 to perfectly center it in the massive capture box.
    setTransform({ x: 300, y: 300, scale: 1 });

    try {
      await new Promise(r => setTimeout(r, 400)); // wait for DOM to update and settle
      const c = await html2canvas(el, { 
        width: 2400, 
        height: 2000, 
        scale: 1.5, // Crisp resolution 
        backgroundColor: '#fff',
        useCORS: true
      });
      const a = document.createElement('a');
      a.download = keyword + '_전체_방사형데이터맵.png'; 
      a.href = c.toDataURL(); 
      a.click();
    } catch (e) { 
      alert('캡처 실패: ' + e.message); 
    } finally { 
      // Revert everything
      el.style.width = oldW;
      el.style.height = oldH;
      el.style.position = oldPos;
      el.style.zIndex = '';
      setTransform(oldT);
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
      const centerDots = [];
      for(let i=0; i<12; i++) {
        const rad = i * 30 * Math.PI / 180;
        centerDots.push(h('circle', { key: 'cd'+i, cx: CX + 105*Math.cos(rad), cy: CY + 105*Math.sin(rad), r: 4, fill: Object.values(DOMAINS)[i % 7].color, opacity: 0.8 }));
      }
      els.push(h('g', { key: n.id, style: { cursor: 'pointer' }, onClick: () => setTransform({ x: 0, y: 0, scale: 1 }) },
        ...centerDots,
        h('circle', { cx: n.x, cy: n.y, r: n.r, fill: '#334155', stroke: '#ffffff', strokeWidth: 4, filter: 'url(#sh)' }),
        h('text', { x: n.x, y: n.y - 8, textAnchor: 'middle', fontSize: 32, fontWeight: 900, fill: '#fff', fontFamily: 'Malgun Gothic,sans-serif' }, n.label),
        h('text', { x: n.x, y: n.y + 24, textAnchor: 'middle', fontSize: 18, fontWeight: 700, fill: '#cbd5e1', fontFamily: 'Malgun Gothic,sans-serif' }, (data?.nodes?.filter(x=>x.id.startsWith('LEAF')).length||0).toLocaleString())
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
    const dc = selected.dc || DOMAINS.other;
    if (selected.type === 'domain') return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
      h('div', { style: { background: dc.bg, borderRadius: 10, padding: 14 } },
        h('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, dc.label),
        h('div', { style: { fontSize: 12, color: '#ffffffcc', marginTop: 4 } }, `테이블 ${selected.tables?.length || 0}개 포함`)
      ),
      ...(selected.tables || []).map((t, i) =>
        h('div', { key: i, style: { background: '#f8fafc', borderRadius: 8, padding: '8px 12px', fontSize: 12 } },
          h('span', { style: { fontWeight: 700, color: dc.color } }, t.tableLabel || t.tableName),
          h('span', { style: { color: '#94a3b8', marginLeft: 8 } }, t.totalCount + '건')
        )
      )
    );
    if (selected.type === 'table') return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
      h('div', { style: { background: dc.bg, borderRadius: 10, padding: 12 } },
        h('div', { style: { fontSize: 14, fontWeight: 700, color: '#fff' } }, selected.tableLabel || selected.tableName),
        h('div', { style: { fontSize: 24, fontWeight: 800, color: '#fff', marginTop: 4 } }, selected.totalCount + '건')
      ),
      ...(selected.matchingCols || []).map((c, i) =>
        h('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px' } },
          h('span', { style: { fontSize: 12, fontWeight: 600 } }, c.col),
          h('span', { style: { fontSize: 11, background: dc.color, color: '#fff', borderRadius: 20, padding: '1px 8px' } }, c.count + '건')
        )
      )
    );
    if (selected.type === 'leaf') {
      let row = {};
      try { row = JSON.parse(selected.fullData || '{}'); } catch(e) {}
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        h('div', { style: { background: '#f1f5f9', borderRadius: 8, padding: 10, fontSize: 12, fontWeight: 700, color: '#475569' } }, '📌 실제 데이터 · ' + selected.tableName),
        ...Object.entries(row).filter(([k]) => k !== 'val').slice(0, 10).map(([k, v], i) =>
          h('div', { key: i, style: { background: '#fff', borderRadius: 6, padding: '6px 10px', border: '1px solid #e2e8f0' } },
            h('div', { style: { fontSize: 10, color: '#94a3b8', fontWeight: 600 } }, k),
            h('div', { style: { fontSize: 12, color: '#1e293b', wordBreak: 'break-all' } }, String(v || '').substring(0, 60) || '–')
          )
        )
      );
    }
    return null;
  };

  return h('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: '92vh', fontFamily: 'Malgun Gothic,Segoe UI,sans-serif', background: '#f8fafc' } },
    h('div', { style: { background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, zIndex: 20 } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        h('div', { style: { width: 42, height: 42, background: 'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, '📊'),
        h('div', null,
          h('div', { style: { color: '#1e293b', fontSize: 18, fontWeight: 800 } }, '동적 물리엔진 방사형 데이터맵 (D3 Force)'),
          h('div', { style: { color: '#64748b', fontSize: 12, marginTop: 2 } }, '노드를 드래그해 보세요! (겹침 방지 + 유기적 움직임)')
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flex: 1, maxWidth: 480, minWidth: 260 } },
        h('div', { style: { flex: 1, display: 'flex', alignItems: 'center', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 14px', gap: 8 } },
          h('span', { style: { color: '#94a3b8' } }, '🔎'),
          h('input', { type: 'text', value: inputVal, onChange: e => setInputVal(e.target.value), onKeyDown: e => e.key === 'Enter' && setKeyword(inputVal.trim()), style: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#1e293b', fontSize: 14, minWidth: 0, fontWeight: 600 }, placeholder: '검색어 입력 (예: 학생, 초콜릿...)' })
        ),
        h('button', { onClick: () => setKeyword(inputVal.trim()), style: { background: '#3b82f6', color: '#ffffff', fontWeight: 700, fontSize: 13, border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap' } }, '검색'),
        h('button', { onClick: capture, disabled: !data || capturing, style: { background: capturing ? '#cbd5e1' : '#10b981', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', whiteSpace: 'nowrap' } }, capturing ? '⏳' : '📷 캡처')
      )
    ),
    h('div', { style: { display: 'flex', flex: 1, overflow: 'hidden' } },
      h('div', { 
          ref: svgWrapRef,
          onMouseDown, onMouseMove, onMouseUp, onMouseLeave,
          style: { flex: 1, background: '#ffffff', position: 'relative', overflow: 'hidden', cursor: 'grab' } 
        },
        loading && h('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#ffffff', zIndex: 10 } },
          h('div', { style: { width: 50, height: 50, border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' } }),
          h('div', { style: { color: '#64748b', fontSize: 14, fontWeight: 700 } }, '"' + keyword + '" 검색 중...')
        ),
        error && h('div', { style: { position: 'absolute', zIndex: 10, padding: 40, color: '#ef4444', fontSize: 15, fontWeight: 700 } }, '⚠️ ' + error),
        !loading && !error && data && h('div', { ref: captureRef, style: { width: '100%', height: '100%', background: '#fff' } },
          h('svg', { width: '100%', height: '100%', style: { display: 'block' } },
            h('defs', null, h('filter', { id: 'sh' }, h('feDropShadow', { dx: 0, dy: 2, stdDeviation: 4, floodColor: '#00000030' }))),
            h('g', { transform: `translate(${transform.x}, ${transform.y}) scale(${transform.scale})`, style: { transformOrigin: '0 0' } }, ...els)
          )
        )
      ),
      h('div', { style: { width: 320, background: '#f8fafc', borderLeft: '1px solid #e2e8f0', overflowY: 'auto', display: 'flex', flexDirection: 'column', zIndex: 20 } },
        h('div', { style: { padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#fff' } },
          h('div', { style: { fontSize: 14, fontWeight: 800, color: '#1e293b' } }, '상세 정보 패널'),
          h('div', { style: { fontSize: 12, color: '#94a3b8', marginTop: 4 } }, '노드를 드래그/클릭하면 데이터가 표시됩니다')
        ),
        h('div', { style: { padding: '16px', flex: 1 } }, renderDetail())
      )
    ),
    h('style', null, '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}')
  );
}

let _root = null;
export function renderSauceDataMap(container) {
  container.style.height = '100%';
  if (_root) _root.unmount();
  _root = ReactDOM.createRoot(container);
  _root.render(h(KeywordDataMap));
}
