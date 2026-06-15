import { escapeHtml, escapeAttr } from '/view/utils.js';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, MarkerType, Handle, Position, Panel } from '@xyflow/react';
import htm from 'htm';
import { getDatasetsSync } from '../datasetStore.js';

const html = htm.bind(React.createElement);

// =============================================================================
// 1. 커스텀 노드 정의 (테이블 카드 UI)
// =============================================================================
const KEY_EDGE_COLORS = {
  LCNS_NO: '#2563eb', PRDLST_REPORT_NO: '#10b981', BAR_CD: '#d97706',
  BSSH_NO: '#ec4899', HACCP_NO: '#8b5cf6', PRDLST_CD: '#06b6d4', FOOD_CD: '#f97316'
};

const CustomTableNode = React.memo(({ data }) => {
  const { tableId, label, cols, rowCount, accentColor, subject, isSelected, rels, isNeighbor } = data;
  const [activeKey, setActiveKey] = React.useState(null);

  const sortedCols = [...(cols || [])].sort((a, b) => {
    const aIsKey = !!KEY_EDGE_COLORS[a.field];
    const bIsKey = !!KEY_EDGE_COLORS[b.field];
    if (aIsKey && !bIsKey) return -1;
    if (!aIsKey && bIsKey) return 1;
    return 0;
  });

  // 카드에 표시할 최대 컬럼 수 (늘리면 카드 높이 증가, 권장 3~8)
  const displayCols = sortedCols.slice(0, 5);
  const extra = sortedCols.length - 5;

  const handleKeyClick = (e, field) => {
    e.stopPropagation();
    setActiveKey(prev => prev === field ? null : field);
  };

  const getJoins = (field) => {
    if (!rels) return [];
    const joins = [];
    rels.forEach(r => {
      if (r.from_table === tableId && r.from_field === field)
        joins.push({ dir: '→', table: r.to_table, field: r.to_field || field, conf: r.confidence });
      else if (r.to_table === tableId && r.from_field === field)
        joins.push({ dir: '←', table: r.from_table, field: r.from_field, conf: r.confidence });
    });
    return joins;
  };

  const shadow = isSelected ? ('0 0 0 3px ' + accentColor) : '0 4px 6px -1px rgba(0,0,0,0.1)';
  const borderClr = isSelected ? accentColor : '#e2e8f0';
  const nodeOpacity = isNeighbor ? 0.35 : 1;

  return html`
    <div style=${{
      // 📐 노드 카드 너비: 360px로 대폭 확대
      width: '360px', backgroundColor: '#fff', borderRadius: '12px', position: 'relative',
      boxShadow: shadow, border: '2px solid ' + borderClr, overflow: 'visible', fontFamily: 'sans-serif', opacity: nodeOpacity
    }}>
      <div style=${{ backgroundColor: accentColor, padding: '16px 20px', color: '#fff', borderRadius: '10px 10px 0 0' }}>
        <div style=${{ fontSize: '18px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ${label.split(' (')[0]}
        </div>
        <div style=${{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px', opacity: 0.9 }}>
          <span>${tableId}</span>
          <span>${rowCount > 0 ? Number(rowCount).toLocaleString() + ' rows' : ''}</span>
        </div>
      </div>

      <div style=${{ padding: '8px 0', borderRadius: '0 0 10px 10px', backgroundColor: '#fff' }}>
        ${displayCols.map((col, i) => {
      const isKey = !!KEY_EDGE_COLORS[col.field];
      const isActive = activeKey === col.field;
      const keyColor = KEY_EDGE_COLORS[col.field] || '#b45309';
      const joins = isActive ? getJoins(col.field) : [];
      const rowBg = isActive ? (keyColor + '18') : (i % 2 === 0 ? '#f8fafc' : '#fff');
      const leftBorder = isActive ? ('4px solid ' + keyColor) : '4px solid transparent';
      return html`
            <div key=${col.field}>
              <div
                onClick=${isKey ? (e => handleKeyClick(e, col.field)) : undefined}
                style=${{
          display: 'flex', justifyContent: 'space-between', padding: '8px 20px',
          backgroundColor: rowBg, fontSize: '14px', fontFamily: 'monospace',
          cursor: isKey ? 'pointer' : 'default', borderLeft: leftBorder, alignItems: 'center'
        }}>
                <div style=${{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style=${{ color: isKey ? keyColor : '#334155', fontWeight: isKey ? 'bold' : 'normal' }}>
                    ${isKey ? '🔑 ' : ''}${col.field}
                  </span>
                  <span style=${{ color: '#94a3b8', fontSize: '12px' }}>
                    ${(col.sql_type || 'VC').replace('VARCHAR', 'VC').slice(0, 8)}
                  </span>
                </div>
                ${isKey ? html`
                  <i class="${isActive ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}" style=${{ color: keyColor, marginLeft: '8px', fontSize: '16px' }}></i>
                ` : html`<div style=${{ width: '24px' }}></div>`}
              </div>
              ${isActive && html`
                <div style=${{
            background: '#1e293b', color: '#e2e8f0', fontSize: '13px',
            padding: '10px 16px', borderLeft: '4px solid ' + keyColor, lineHeight: '1.7',
            maxHeight: '180px', overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box', wordBreak: 'break-all', width: '100%'
          }}>
                  <div style=${{ color: keyColor, fontWeight: 'bold', marginBottom: '4px', position: 'sticky', top: 0, background: '#1e293b', zIndex: 1, paddingBottom: '4px' }}>
                    <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>🔗 조인 (${joins.length}건)</span>
                      <i class="ri-arrow-up-s-line" style=${{ cursor: 'pointer', fontSize: '16px' }} onClick=${(e) => handleKeyClick(e, col.field)}></i>
                    </div>
                  </div>
                  ${joins.length === 0
            ? html`<div style=${{ color: '#94a3b8' }}>연결 없음</div>`
            : joins.map((j, ji) => html`
                        <div key=${ji} style=${{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span style=${{ color: j.dir === '→' ? '#34d399' : '#fb923c', fontWeight: 'bold' }}>${j.dir}</span>
                          <span style=${{ color: '#93c5fd', fontFamily: 'monospace' }}>${j.table}</span>
                          <span style=${{ color: '#94a3b8' }}>.</span>
                          <span style=${{ color: '#fde68a', fontFamily: 'monospace' }}>${j.field}</span>
                          ${j.conf === 'HIGH' ? html`<span style=${{ color: '#4ade80', fontSize: '11px', whiteSpace: 'nowrap' }}>●HIGH</span>` : ''}
                        </div>
                      `)
          }
                </div>
              `}
            </div>
          `;
    })}
        ${extra > 0 && html`
          <div style=${{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', padding: '10px 0', fontWeight: 'bold' }}>
            +${extra}개 컬럼 더 보기
          </div>
        `}
      </div>

      <${Handle} type="target" position=${Position.Top} style=${{ background: '#94a3b8', width: '10px', height: '10px' }} />
      <${Handle} type="source" position=${Position.Bottom} style=${{ background: '#94a3b8', width: '10px', height: '10px' }} />
    </div>
  `;
});

const nodeTypes = { tableNode: CustomTableNode };

// =============================================================================
// 2-1. 엣지 클릭 인스펙터 (조인 관계 상세)
// =============================================================================
function showEdgeInspector(container, rel) {
  const panel = container.querySelector('#cem-inspector');
  if (!panel) return;

  const CONF_COLOR = { HIGH: '#16a34a', MEDIUM: '#d97706', LOW: '#dc2626', SUGGESTED: '#7c3aed' };
  const confColor = CONF_COLOR[rel.confidence] || '#64748b';
  const relColor = rel.relation_type === 'CONFIRMED' ? '#16a34a' : '#7c3aed';
  const edgeColor = KEY_EDGE_COLORS[rel.from_field] || '#64748b';

  const inclusionPct = rel.inclusion_check?.checked
    ? (rel.inclusion_check.inclusion_ratio * 100).toFixed(1) + '%'
    : '미검증';
  const matchedStr = rel.inclusion_check?.checked
    ? `${rel.inclusion_check.matched_count} / ${rel.inclusion_check.from_unique_count}건`
    : '';

  const sampleSql =
    `SELECT A."${rel.from_field}", B."${rel.to_field}", A.*, B.*\n` +
    `FROM "${rel.from_table}" A\n` +
    `JOIN "${rel.to_table}" B\n` +
    `  ON A."${rel.from_field}" = B."${rel.to_field}"\n` +
    `LIMIT 100;`;

  const fromNm = rel.from_table_name || rel.from_table;
  const toNm = rel.to_table_name || rel.to_table;

  panel.innerHTML = `
    <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
      <div class="min-w-0">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">JOIN</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold border" style="color:${confColor};border-color:${confColor}40;background:${confColor}18;">${rel.confidence}</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold border" style="color:${relColor};border-color:${relColor}40;background:${relColor}18;">${rel.relation_type || ''}</span>
        </div>
        <h3 class="text-sm font-bold font-mono" style="color:${edgeColor}">🔑 ${rel.from_field}</h3>
      </div>
      <button id="cem-close-insp" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 ml-2">
        <i class="ri-close-line text-lg"></i>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4 text-xs">

      <!-- 테이블 관계 -->
      <div>
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
          <i class="ri-git-branch-line text-gov-600"></i> 관계 구조
        </h4>
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-2">
          <div class="flex items-start gap-2">
            <span class="shrink-0 w-12 text-right text-[10px] font-bold text-slate-400 pt-0.5">FROM</span>
            <div class="min-w-0">
              <div class="font-mono font-bold text-slate-800">${rel.from_table}</div>
              <div class="text-slate-500 truncate">${fromNm !== rel.from_table ? fromNm : ''}</div>
              <div class="mt-0.5 font-mono text-[11px] font-bold" style="color:${edgeColor}">${rel.from_field} <span class="text-slate-400 text-[9px] font-normal">${rel.from_kor_nm ? '(' + rel.from_kor_nm + ')' : ''}</span></div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="w-12 text-right text-[10px]"></span>
            <div class="flex items-center gap-1">
              <i class="ri-arrow-down-line text-base" style="color:${edgeColor}"></i>
              <span class="text-[10px]">JOIN</span>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="shrink-0 w-12 text-right text-[10px] font-bold text-slate-400 pt-0.5">TO</span>
            <div class="min-w-0">
              <div class="font-mono font-bold text-slate-800">${rel.to_table}</div>
              <div class="text-slate-500 truncate">${toNm !== rel.to_table ? toNm : ''}</div>
              <div class="mt-0.5 font-mono text-[11px] font-bold" style="color:${edgeColor}">${rel.to_field} <span class="text-slate-400 text-[9px] font-normal">${rel.to_kor_nm ? '(' + rel.to_kor_nm + ')' : ''}</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 통계 -->
      <div>
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
          <i class="ri-bar-chart-line text-gov-600"></i> 검증 통계
        </h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-white border border-slate-200 rounded-lg p-2 text-center">
            <div class="text-[10px] text-slate-400 mb-1">점수</div>
            <div class="font-bold text-base text-slate-700">${rel.score ?? '-'}</div>
          </div>
          <div class="bg-white border border-slate-200 rounded-lg p-2 text-center">
            <div class="text-[10px] text-slate-400 mb-1">포함률</div>
            <div class="font-bold text-base" style="color:${rel.inclusion_check?.checked ? (rel.inclusion_check.inclusion_ratio >= 0.5 ? '#16a34a' : rel.inclusion_check.inclusion_ratio > 0 ? '#d97706' : '#dc2626') : '#94a3b8'}">${inclusionPct}</div>
          </div>
          <div class="bg-white border border-slate-200 rounded-lg p-2 text-center">
            <div class="text-[10px] text-slate-400 mb-1">매칭 건수</div>
            <div class="font-bold text-base text-slate-700">${matchedStr || '-'}</div>
          </div>
        </div>
      </div>

      ${rel.reason ? `
      <!-- 판단 근거 -->
      <div>
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
          <i class="ri-information-line text-gov-600"></i> 판단 근거
        </h4>
        <p class="text-[11px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3">${rel.reason.replace(/\//g, '<br>·')}</p>
      </div>` : ''}

      <!-- SQL 힌트 -->
      <div>
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
          <i class="ri-code-s-slash-line text-gov-600"></i> 샘플 SQL
        </h4>
        <pre class="bg-slate-900 text-green-300 rounded-xl p-3 text-[10px] font-mono overflow-x-auto leading-relaxed whitespace-pre">${sampleSql}</pre>
      </div>
    </div>

    <div class="p-3 bg-slate-50 border-t border-slate-100 shrink-0">
      <button id="cem-copy-sql" class="w-full py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
        <i class="ri-clipboard-line"></i> SQL 복사
      </button>
    </div>`;

  container.querySelector('#cem-close-insp')?.addEventListener('click', () => {
    panel.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2" style="min-height:200px;"><i class="ri-cursor-line text-3xl"></i><span>← 노드 또는 관계선을 클릭하면 상세 정보가 표시됩니다</span></div>`;
  });
  container.querySelector('#cem-copy-sql')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(sampleSql.replace(/\n/g, '\n'))
      .then(() => {
        const btn = container.querySelector('#cem-copy-sql');
        if (btn) { btn.innerHTML = '<i class="ri-check-line"></i> 복사 완료'; setTimeout(() => { btn.innerHTML = '<i class="ri-clipboard-line"></i> SQL 복사'; }, 1500); }
      });
  });
}

// =============================================================================
// 2. 인스펙터 패널 렌더링 (React 외부, 순수 JS)
// =============================================================================
function showNodeInspector(container, nodeId, ds, onSelectDataset) {
  const panel = container.querySelector('#cem-inspector');
  if (!panel) return;
  const subjectColors = { '식품영양정보': '#16a34a', '건강기능식품': '#2563eb', '식품안전': '#dc2626', '기타': '#64748b' };
  const subjectColor = subjectColors[ds.subject || ds.cl_cd_nm] || '#475569';
  const dsName = (ds.name || ds.svc_nm || '').split(' (')[0];
  const descText = ds.desc || ds.description || ds.svc_desc || '';
  const provdInstt = ds.provd_instt_nm || '';

  panel.innerHTML = `
    <div class="px-4 py-3 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 shrink-0">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-1.5 mb-1.5">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gov-100 text-gov-800 border border-gov-200">TABLE</span>
          <span class="font-mono text-[11px] font-bold text-slate-500">${escapeHtml(nodeId)}</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold border" style="color:${escapeHtml(subjectColor)};border-color:${escapeHtml(subjectColor)}40;background:${escapeHtml(subjectColor)}18;">${escapeHtml(ds.subject || ds.cl_cd_nm || '기타')}</span>
          ${provdInstt ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold border bg-slate-100 text-slate-600 border-slate-200"><i class="ri-government-line mr-0.5"></i>${escapeHtml(provdInstt)}</span>` : ''}
        </div>
        <h3 class="text-sm font-bold text-slate-800 truncate" title="${escapeAttr(dsName)}">${escapeHtml(dsName)}</h3>
        ${descText ? `<p class="mt-1.5 text-[11px] text-slate-500 leading-relaxed overflow-hidden break-keep" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;" title="${escapeAttr(descText)}">${escapeHtml(descText)}</p>` : ''}
      </div>
      <button id="cem-close-insp" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 ml-3">
        <i class="ri-close-line text-lg"></i>
      </button>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden p-4 space-y-4">
      <div class="flex flex-col flex-1 min-h-0">
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5 shrink-0">
          <i class="ri-article-line text-gov-600"></i> 컬럼 명세 (Schema)
        </h4>
        <div class="border border-slate-200 rounded-xl overflow-auto bg-white flex-1 min-h-0">
          <table class="min-w-max w-full text-left text-[11px] border-collapse">
            <thead><tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold sticky top-0 z-10">
              <th class="px-3 py-2 bg-slate-50 whitespace-nowrap">컬럼명</th><th class="px-2 py-2 bg-slate-50 whitespace-nowrap">타입</th><th class="px-3 py-2 bg-slate-50 whitespace-nowrap">한글명</th>
            </tr></thead>
            <tbody id="cem-schema-tbody" class="divide-y divide-slate-100">
              <tr><td colspan="3" class="px-3 py-4 text-center text-slate-400"><div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1 align-middle"></div>로딩 중...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col flex-1 min-h-0">
        <h4 class="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5 shrink-0">
          <i class="ri-database-2-line text-gov-600"></i> 데이터 샘플 (상위 30행)
        </h4>
        <div id="cem-sample-wrap" class="border border-slate-200 rounded-xl overflow-auto bg-white flex-1 min-h-0">
          <div class="px-3 py-4 text-center text-slate-400 text-xs"><div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1 align-middle"></div>로딩 중...</div>
        </div>
      </div>
    </div>
    <div class="p-3 bg-slate-50 border-t border-slate-100 shrink-0">
      <button id="cem-jump-api" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
        <i class="ri-file-list-3-line"></i> 데이터 세트 자세히 보기
      </button>
    </div>`;

  // 컬럼 명세 로드
  fetch('/api/query', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `SELECT field, kor_nm, sql_type FROM api_columns WHERE REPLACE(svc_no,'-','') = REPLACE('${nodeId}','-','') ORDER BY field` })
  }).then(r => r.json()).then(cols => {
    const tb = container.querySelector('#cem-schema-tbody');
    if (!tb) return;
    const sorted = (Array.isArray(cols) ? cols : []).sort((a, b) => {
      const aKey = !!KEY_EDGE_COLORS[a.field], bKey = !!KEY_EDGE_COLORS[b.field];
      return aKey === bKey ? 0 : aKey ? -1 : 1;
    });
    tb.innerHTML = sorted.map(c => {
      const badge = KEY_EDGE_COLORS[c.field] ? `<span class="px-1 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 ml-1">KEY</span>` : '';
      return `<tr class="hover:bg-slate-50/50"><td class="px-3 py-1.5 font-mono font-semibold text-slate-800 whitespace-nowrap">${escapeHtml(c.field)}${badge}</td><td class="px-2 py-1.5 font-mono text-[10px] text-blue-600 whitespace-nowrap">${escapeHtml(c.sql_type || 'VARCHAR')}</td><td class="px-3 py-1.5 text-slate-500 whitespace-nowrap">${escapeHtml(c.kor_nm || '-')}</td></tr>`;
    }).join('') || '<tr><td colspan="3" class="px-3 py-4 text-center text-slate-400">없음</td></tr>';
  }).catch(() => {
    const tb = container.querySelector('#cem-schema-tbody');
    if (tb) tb.innerHTML = '<tr><td colspan="3" class="px-3 py-4 text-center text-slate-400">없음</td></tr>';
  });

  // 샘플 데이터 로드
  fetch('/api/query', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `SELECT * FROM "${nodeId}" LIMIT 30` })
  }).then(r => r.json()).then(rows => {
    const wrap = container.querySelector('#cem-sample-wrap');
    if (!wrap) return;
    if (!rows || !rows.length) { wrap.innerHTML = '<p class="p-4 text-center text-xs text-slate-400">데이터 없음</p>'; return; }
    const ks = Object.keys(rows[0]);
    wrap.innerHTML = `<div class="overflow-x-auto"><table class="w-full text-left text-[10px] border-collapse min-w-[400px]">
      <thead><tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0 z-10">${ks.map(c => `<th class="px-2.5 py-1.5 bg-slate-50 whitespace-nowrap">${c}</th>`).join('')}</tr></thead>
      <tbody class="divide-y divide-slate-100 font-mono text-slate-600">${rows.map(row => `<tr class="hover:bg-slate-50/50">${ks.map(c => { const v = row[c]; return `<td class="px-2.5 py-1 truncate max-w-[100px]" title="${v ?? ''}">${v !== null && v !== undefined ? v : '<span class="text-slate-300">null</span>'}</td>`; }).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }).catch(() => { });

  // 닫기 / 자세히 보기 이벤트
  container.querySelector('#cem-close-insp')?.addEventListener('click', () => {
    panel.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2" style="min-height:200px;"><i class="ri-cursor-line text-3xl"></i><span>← 노드를 클릭하면 상세 정보가 표시됩니다</span></div>`;
  });
  container.querySelector('#cem-jump-api')?.addEventListener('click', () => {
    if (onSelectDataset && ds) onSelectDataset(ds);
  });
}

// =============================================================================
// 2-1. 동기식 스프링 레이아웃 (관계 강도 기반 근접 배치)
// =============================================================================
// 카테고리 그리드 초기 위치에서 출발해 물리 시뮬레이션으로 정제
// → HIGH confidence 엣지로 연결된 노드끼리 가까이 당겨짐
function applySpringLayout(nodes, edges) {
  // 스프링 파라미터 (여기서 조정)
  // 연결 노드 간 목표 거리(px): 줄이면 관계 노드가 더 촘촘해짐 (권장: 280~500)
  const NATURAL_LEN = 380;
  // 반발력 강도: 높이면 비관계 노드가 더 멀리 퍼짐 (권장: 15000~40000)
  const REPEL_K = 28000;
  // confidence별 인력(당기는 힘): 높이면 관계 있는 노드가 더 가까이 붙음
  //   → HIGH를 크게 할수록 강한 관계 노드들이 밀착됨 (권장: 0.05~0.4)
  const ATTRACT = { HIGH: 0.28, MEDIUM: 0.12, LOW: 0.04 };
  // 시뮬레이션 반복 횟수: 늘리면 더 안정된 배치, 줄이면 속도 빠름 (권장: 100~300)
  const ITERATIONS = 300;
  // 감쇠율: 낮을수록 진동 없이 빠르게 수렴 (권장: 0.7~0.9)
  const DAMPING = 0.82;

  // 초기 위치·속도 설정
  const pos = {}, vel = {};
  nodes.forEach(n => {
    pos[n.id] = { x: n.position.x, y: n.position.y };
    vel[n.id] = { x: 0, y: 0 };
  });
  const ids = nodes.map(n => n.id);

  for (let iter = 0; iter < ITERATIONS; iter++) {
    const cooling = 1 - iter / ITERATIONS; // 냉각: 초반엔 크게 움직이고 후반엔 미세 조정
    const F = {};
    ids.forEach(id => { F[id] = { x: 0, y: 0 }; });

    // 반발력: 모든 노드 쌍이 서로 밀어냄 (비관계 노드가 멀어짐)
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ids[i], b = ids[j];
        const dx = pos[b].x - pos[a].x;
        const dy = pos[b].y - pos[a].y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        let f = REPEL_K / (d * d);
        // 충돌 방지: 노드가 겹치지 않도록 최소 거리(가로 420 이상) 유지
        const minDistance = 420;
        if (d < minDistance) {
          f += (minDistance - d) * 5.0; // 강제 분리력
        }
        F[a].x -= f * dx / d; F[a].y -= f * dy / d;
        F[b].x += f * dx / d; F[b].y += f * dy / d;
      }
    }

    // 인력: 엣지로 연결된 노드쌍이 서로 당겨짐 (관계 강도에 비례)
    edges.forEach(e => {
      if (!pos[e.source] || !pos[e.target]) return;
      const k = ATTRACT[e.data?.rel?.confidence] ?? ATTRACT.LOW;
      const dx = pos[e.target].x - pos[e.source].x;
      const dy = pos[e.target].y - pos[e.source].y;
      const d = Math.sqrt(dx * dx + dy * dy) + 1;
      const disp = d - 480; // NATURAL_LEN = 480 (노드 크기에 비례)
      const f = k * disp;
      F[e.source].x += f * dx / d; F[e.source].y += f * dy / d;
      F[e.target].x -= f * dx / d; F[e.target].y -= f * dy / d;
    });

    // 구심력 (Gravity): 비관계 노드들이 무한히 멀어지는 것을 방지 (중심으로 살짝 당김)
    // 노드 개수가 적을 때 빈 공간이 과도하게 넓어지는 현상을 해결합니다.
    ids.forEach(id => {
      const gx = -pos[id].x;
      const gy = -pos[id].y;
      F[id].x += 0.003 * gx;
      F[id].y += 0.003 * gy;
    });

    // 속도·위치 업데이트 (오일러 적분 + 냉각)
    ids.forEach(id => {
      vel[id].x = (vel[id].x + F[id].x) * DAMPING;
      vel[id].y = (vel[id].y + F[id].y) * DAMPING;
      // 최대 속도 제한 (폭발 방지)
      const spd = Math.hypot(vel[id].x, vel[id].y);
      const maxSpd = 80 * cooling;
      if (spd > maxSpd) { vel[id].x *= maxSpd / spd; vel[id].y *= maxSpd / spd; }
      pos[id].x += vel[id].x * cooling;
      pos[id].y += vel[id].y * cooling;
    });
  }

  return nodes.map(n => ({
    ...n,
    position: { x: Math.round(pos[n.id].x), y: Math.round(pos[n.id].y) }
  }));
}


// =============================================================================
// 2-2. 그리드 스냅 (직각 정렬 + 겹침 방지)
// =============================================================================
// 스프링으로 잡은 상대 위치를 유지하면서 그리드 셀에 스냅
// → 노드가 규칙적인 격자에 정렬되어 ERD 다이어그램처럼 깔끔하게 보임
function snapToGrid(nodes) {
  // 그리드 셀 크기 (여기서 조정)
  // 가로 셀: 노드 너비(360) + 좌우 여백. 줄이면 촘촘, 늘리면 넓음 (권장: 400~500)
  const CELL_W = 440;
  // 세로 셀: 노드 높이(~250) + 상하 여백. 줄이면 촘촘, 늘리면 넓음 (권장: 340~400)
  const CELL_H = 360;

  if (!nodes.length) return nodes;

  const xs = nodes.map(n => n.position.x);
  const ys = nodes.map(n => n.position.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  const occupied = new Set();
  const result = {};

  // 원점에 가까운 노드부터 배정 (중심부 노드 우선 확정)
  const sorted = [...nodes].sort((a, b) => {
    const ax = (a.position.x - minX) / CELL_W, ay = (a.position.y - minY) / CELL_H;
    const bx = (b.position.x - minX) / CELL_W, by = (b.position.y - minY) / CELL_H;
    return (ax * ax + ay * ay) - (bx * bx + by * by);
  });

  sorted.forEach(n => {
    // 스프링 위치 → 이상적인 그리드 좌표
    const gx0 = Math.round((n.position.x - minX) / CELL_W);
    const gy0 = Math.round((n.position.y - minY) / CELL_H);

    // 나선형 탐색: 이상적 셀에서 가장 가까운 빈 셀 배정
    let placed = false;
    for (let r = 0; r <= 30 && !placed; r++) {
      for (let dx = -r; dx <= r && !placed; dx++) {
        for (let dy = -r; dy <= r && !placed; dy++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue; // 외곽만 탐색
          const key = `${gx0 + dx},${gy0 + dy}`;
          if (!occupied.has(key)) {
            occupied.add(key);
            result[n.id] = {
              x: (gx0 + dx) * CELL_W,
              y: (gy0 + dy) * CELL_H
            };
            placed = true;
          }
        }
      }
    }
  });

  return nodes.map(n => ({
    ...n,
    position: result[n.id] ?? n.position
  }));
}

// =============================================================================
// 3. 메인 React 컴포넌트
// =============================================================================
function ReactErdApp({ onSelectDataset, container }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterIds, setFilterIds] = useState(null);
  const [relNodeIds, setRelNodeIds] = useState(new Set());
  const [maxNodes, setMaxNodes] = useState(9999);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [showDimNodes, setShowDimNodes] = useState(true);
  const [springLayoutResult, setSpringLayoutResult] = useState(null);
  const rfInstance = React.useRef(null);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onInit = useCallback((instance) => { rfInstance.current = instance; }, []);


  const onNodeClick = useCallback((event, node) => {
    const fullDs = getDatasetsSync().find(d => String(d.id) === String(node.id))
      || { id: node.id, name: node.data?.label || node.id, subject: node.data?.subject };
    showNodeInspector(container, node.id, fullDs, onSelectDataset);
  }, [container, onSelectDataset]);

  const onEdgeClick = useCallback((event, edge) => {
    const rel = edge.data?.rel;
    if (!rel) return;
    showEdgeInspector(container, rel);
  }, [container]);

  useEffect(() => {
    // 데이터 로드 로직
    async function loadData() {
      setLoading(true);
      try {
        // 초기 검색어 확인
        const kwInput = document.getElementById('datamap-keyword-search');
        const kw = kwInput?.value.trim() || '';
        let initialMatchedIds = null;

        let searchWords = [];
        let isComplexQuery = false;
        
        if (kw) {
          const isOperator = w => w.toUpperCase() === 'AND' || w.toUpperCase() === 'OR';
          const rawWords = kw.split(';').map(w => w.trim()).filter(Boolean);
          searchWords = [...new Set(rawWords.filter(w => !isOperator(w)))];
          isComplexQuery = rawWords.some(w => isOperator(w)) || searchWords.length > 1;
        }

        const requests = [
          fetch('/api/searchDatasetList.do', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ start_idx: 1, show_cnt: 1000 }) }),
          fetch('/api/relationships')
        ];
        if (kw) {
          const op = document.getElementById('datamap-keyword-operator')?.value || 'AND';
          requests.push(fetch(`/api/keyword-datamap?keyword=${encodeURIComponent(kw)}&op=${op}`));
        }

        const resAll = await Promise.all(requests);
        const [dsRes, relRes] = resAll;

        const dsJson = await dsRes.json();
        let allDatasets = (dsJson.list || []).map(d => ({
          ...d, id: d.svc_no, name: d.svc_nm || d.svc_no, subject: d.cl_cd_nm || '기타', dataCount: d.data_cnt || d.sample_data_length
        }));

        if (kw && resAll[2]) {
          const kwdmData = await resAll[2].json();
          const rawMatchedTables = kwdmData.matchedTables || [];
          // tableName은 하이픈 없는 형태 (sqlite_master 기준)
          initialMatchedIds = new Set(rawMatchedTables.map(t => String(t.svcNo || t.tableName)));
          // 데이터세트 이름(svc_nm)에 키워드가 포함된 경우도 매칭
          const kwLower = kw.toLowerCase();
          allDatasets.forEach(d => {
            if ((d.name || '').toLowerCase().includes(kwLower)) {
              initialMatchedIds.add(String(d.id || '').replace(/-/g, ''));
              initialMatchedIds.add(String(d.id || ''));
            }
          });
          setFilterIds(initialMatchedIds);
        }

        let loadedRels = await relRes.json() || [];
        if (!Array.isArray(loadedRels)) loadedRels = [];
        const validRels = loadedRels.filter(rel =>
          rel && rel.from_table && rel.to_table &&
          rel.inclusion_check && rel.inclusion_check.matched_count > 0
        );

        // 컬럼 정보 로드
        const colsRes = await fetch('/api/query', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          // LIMIT 명시로 자동 LIMIT 1000 우회 (api_columns 2000행 이상)
          body: JSON.stringify({ query: `SELECT svc_no, field, kor_nm, sql_type FROM api_columns ORDER BY svc_no, field LIMIT 10000` })
        });
        const colsRows = await colsRes.json();
        const allColumnsMap = {};
        if (Array.isArray(colsRows)) {
          colsRows.forEach(row => {
            if (!allColumnsMap[row.svc_no]) allColumnsMap[row.svc_no] = [];
            if (allColumnsMap[row.svc_no].length < 10) allColumnsMap[row.svc_no].push(row);
          });
        }

        // 그래프 생성
        const allowed = new Set(allDatasets.map(d => d.id));
        const finalRels = validRels.filter(r => allowed.has(r.from_table) && allowed.has(r.to_table));

        const activeNodeIds = new Set();
        finalRels.forEach(r => { activeNodeIds.add(r.from_table); activeNodeIds.add(r.to_table); });
        setRelNodeIds(new Set(activeNodeIds));

        // 노드 생성 (관계 없는 데이터셋도 포함 - 검색 매칭 시 표시)
        const newNodes = allDatasets.map((ds, idx) => {
          // 카테고리 색상 (필터 사이드바와 동일)
          const categoryColorMap = {
            '식품영양정보': '#16a34a', '기준규격정보': '#2563eb', '코드정보': '#7c3aed',
            '수질환경정보': '#0284c7', '검사기관정보': '#475569', '식품위해관리': '#dc2626',
            '식품안전관리': '#0d9488', '이력추적관리': '#4f46e5', '어린이식품안전관리': '#db2777',
            'HACCP지정현황': '#0891b2', '업체인허가현황': '#ea580c', '위생용품': '#e11d48',
            '축산물': '#9333ea', '건강기능식품': '#65a30d', '수입식품 등': '#f59e0b',
            '식품 등': '#059669', '폐업정보': '#be123c', '용어사전': '#ca8a04'
          };
          const fallbackColors = [
            '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
            '#0891b2', '#ea580c', '#4f46e5', '#db2777', '#0d9488',
            '#65a30d', '#9333ea', '#e11d48', '#0284c7', '#ca8a04', '#059669', '#be123c', '#475569'
          ];
          const color = categoryColorMap[ds.subject]
            || fallbackColors[Math.abs([...ds.subject || ''].reduce((h, ch) => h * 31 + ch.charCodeAt(0), 0)) % fallbackColors.length]
            || '#64748b';

          return {
            id: ds.id,
            type: 'tableNode',
            // 초기 위치는 그리드로 대략 배치 (이후 dagre 레이아웃 적용 가능)
            position: { x: (idx % 8) * 350, y: Math.floor(idx / 8) * 250 },
            data: {
              tableId: ds.id, label: ds.name, cols: allColumnsMap[ds.id] || [],
              rowCount: ds.dataCount, accentColor: color, subject: ds.subject, isSelected: false,
              rels: finalRels
            }
          };
        });

        // 엣지 생성 (Step 라우팅 + 점선 적용)
        const newEdges = finalRels.map((r, i) => {
          const key = r.from_field;
          const eClr = KEY_EDGE_COLORS[key] || '#94a3b8';
          return {
            id: `e${i}`, source: r.from_table, target: r.to_table,
            type: 'smoothstep', // 직각 계단형 (모서리 둥근 버전)
            animated: true,
            style: { stroke: eClr, strokeWidth: r.confidence === 'HIGH' ? 2.5 : 1.5, strokeDasharray: '5, 5' },
            label: key,
            labelStyle: { fill: '#334155', fontWeight: 600, fontSize: 10 },
            labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
            markerEnd: { type: MarkerType.ArrowClosed, color: eClr },
            data: { rel: r },
          };
        });

        let filteredNodes = newNodes;
        let activeEdges = newEdges;
        if (kw && initialMatchedIds) {
          const directIds = new Set([...initialMatchedIds]);
          const neighborIds = new Set();
          newEdges.forEach(e => {
            if (directIds.has(e.source)) neighborIds.add(e.target);
            if (directIds.has(e.target)) neighborIds.add(e.source);
          });
          const visibleIds = new Set([...directIds, ...neighborIds]);
          filteredNodes = newNodes.filter(n => visibleIds.has(n.id));
          activeEdges = newEdges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target));
        }

        // 레이아웃 조정 파라미터 (여기서 크기·간격 변경)
        {
          // 노드 1개의 셀 크기 (노드 자체 크기 + 여백)
          //   - 노드 실제 너비: 240px → CELL_W를 줄이면 노드가 더 촘촘하게 배치됨
          //   - 노드 실제 높이: 약 180~220px → CELL_H를 줄이면 세로 간격 좁아짐
          //   ↓ 값을 줄이면 전체가 작아져 한눈에 많이 보임, 늘리면 노드 간 여백 커짐
          const CELL_W = 420; // 노드 가로 셀 (권장: 250~450)
          const CELL_H = 360; // 노드 세로 셀 (권장: 210~400)

          // 카테고리 블록 사이 여백
          //   ↓ 줄이면 카테고리 그룹이 서로 붙음, 늘리면 그룹 간 공간 생김
          const CAT_GAP_X = 30;  // 카테고리 블록 좌우 간격 (권장: 20~60)
          const CAT_GAP_Y = 40;  // 카테고리 블록 상하 간격 (권장: 30~80)

          // 전체 카테고리 배치 열 수 비율
          //   - sqrt(전체 카테고리 수 × RATIO)로 열 수 계산
          //   ↓ 값을 올리면 가로로 더 펼쳐짐, 내리면 세로로 쌓임
          const GRID_RATIO = 2.2; // 가로/세로 비율 (권장: 1.5~3.0)

          // 연결 차수 계산 (많이 연결된 노드/카테고리를 앞에 배치)
          const degMap = {};
          newEdges.forEach(e => {
            degMap[e.source] = (degMap[e.source] || 0) + 1;
            degMap[e.target] = (degMap[e.target] || 0) + 1;
          });

          // 카테고리별 그룹핑 (연결 많은 카테고리 순 정렬)
          const groups = {};
          filteredNodes.forEach(n => {
            const cat = n.data.subject || '기타';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(n);
          });
          const catList = Object.keys(groups).sort((a, b) => {
            const dA = groups[a].reduce((s, n) => s + (degMap[n.id] || 0), 0);
            const dB = groups[b].reduce((s, n) => s + (degMap[n.id] || 0), 0);
            return dB - dA; // 연결 많은 카테고리 먼저
          });

          // 카테고리 블록을 가로 우선 그리드로 배치
          //   각 카테고리는 내부 노드 수에 맞춰 서브그리드(subCols × subRows)로 구성
          const numCats = catList.length;
          const gridCols = Math.ceil(Math.sqrt(numCats * GRID_RATIO));

          let catX = 0, catY = 0, rowMaxH = 0, colIdx = 0;
          const catPos = {};
          catList.forEach((cat) => {
            const nodesInCat = groups[cat];
            // 카테고리 내 노드를 정사각형에 가깝게 배치할 열 수
            const subCols = Math.max(1, Math.ceil(Math.sqrt(nodesInCat.length)));
            const subRows = Math.ceil(nodesInCat.length / subCols);
            const blockW = subCols * CELL_W + CAT_GAP_X;
            const blockH = subRows * CELL_H + 40; // 40: 카테고리 레이블 공간

            if (colIdx > 0 && colIdx % gridCols === 0) {
              // 다음 행으로 이동
              catY += rowMaxH + CAT_GAP_Y;
              catX = 0;
              rowMaxH = 0;
            }
            catPos[cat] = { x: catX, y: catY };
            rowMaxH = Math.max(rowMaxH, blockH);
            catX += blockW + CAT_GAP_X;
            colIdx++;
          });

          // 노드 위치 할당 (카테고리 내 연결 많은 노드를 좌상단에 배치)
          const layoutedNodes = [];
          catList.forEach(cat => {
            // 연결 많은 순으로 정렬 → 중요 노드가 먼저 보임
            const sorted = [...groups[cat]].sort((a, b) => (degMap[b.id] || 0) - (degMap[a.id] || 0));
            const subCols = Math.max(1, Math.ceil(Math.sqrt(sorted.length)));
            sorted.forEach((node, ni) => {
              layoutedNodes.push({
                ...node,
                position: {
                  x: catPos[cat].x + (ni % subCols) * CELL_W,
                  y: catPos[cat].y + 30 + Math.floor(ni / subCols) * CELL_H,
                }
              });
            });
          });

          // 카테고리 그리드 → 스프링(관계 근접) 및 충돌 방지 (물리 곡선 레이아웃 완성)
          const finalNodes = applySpringLayout(layoutedNodes, activeEdges);
          setSpringLayoutResult({ nodes: finalNodes, edges: activeEdges });
          setLoading(false);
        }

      } catch (e) {
        console.error('[ReactErdMap] Data load error', e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const handleFilter = (e) => {
      if (e.detail && e.detail.matchedIds !== undefined) {
        setFilterIds(e.detail.matchedIds === null ? null : new Set(e.detail.matchedIds));
      }
    };
    window.addEventListener('datamap-filter-updated', handleFilter);
    return () => window.removeEventListener('datamap-filter-updated', handleFilter);
  }, []);

  // 연관 테이블(희미한 노드) 표시 체크박스 연동
  useEffect(() => {
    const cb = document.getElementById('cem-show-dim');
    if (cb) {
      setShowDimNodes(cb.checked);
      const onChange = e => setShowDimNodes(e.target.checked);
      cb.addEventListener('change', onChange);
      return () => cb.removeEventListener('change', onChange);
    }
  }, []);

  // 물리 레이아웃 체크박스 연동
  useEffect(() => {
    const cb = document.getElementById('cem-physics');
    if (cb) {
      setPhysicsEnabled(cb.checked);
      const onChange = e => setPhysicsEnabled(e.target.checked);
      cb.addEventListener('change', onChange);
      return () => cb.removeEventListener('change', onChange);
    }
  }, []);

  // 레이아웃 변경 (물리 레이아웃 <-> 직각 그리드)
  useEffect(() => {
    if (!springLayoutResult) return;
    const { nodes: spNodes, edges: spEdges } = springLayoutResult;

    if (physicsEnabled) {
      setNodes(spNodes);
      setEdges(spEdges);
    } else {
      const gridNodes = snapToGrid(spNodes);
      setNodes(gridNodes);
      setEdges(spEdges);
    }

    // 레이아웃 변경 후 뷰 맞춤
    setTimeout(() => {
      if (rfInstance.current) {
        rfInstance.current.fitView({ padding: 0.1, duration: 600 });
      }
    }, 100);
  }, [physicsEnabled, springLayoutResult]);

  const displayNodes = useMemo(() => {
    // 검색 없음: 전체 노드 (관계 없는 노드 포함) — maxNodes 제한 적용 (차수 내림차순)
    if (!filterIds) {
      if (maxNodes >= nodes.length) return nodes;
      // 차수(연결 수) 기준 상위 maxNodes개 선택
      const degMap = {};
      edges.forEach(e => {
        degMap[e.source] = (degMap[e.source] || 0) + 1;
        degMap[e.target] = (degMap[e.target] || 0) + 1;
      });
      return [...nodes]
        .sort((a, b) => (degMap[b.id] || 0) - (degMap[a.id] || 0))
        .slice(0, maxNodes);
    }

    // 직접 매칭 노드 (관계 없는 것도 포함)
    const directIds = new Set(nodes.filter(n => filterIds.has(String(n.id))).map(n => String(n.id)));
    // 1-hop 이웃 (관계 있는 것만 확장)
    const neighborIds = new Set();
    edges.forEach(e => {
      if (directIds.has(String(e.source)) && relNodeIds.has(String(e.target))) neighborIds.add(String(e.target));
      if (directIds.has(String(e.target)) && relNodeIds.has(String(e.source))) neighborIds.add(String(e.source));
    });
    directIds.forEach(id => neighborIds.delete(id));

    return nodes.filter(n => {
      const id = String(n.id);
      if (directIds.has(id)) return true;
      if (showDimNodes && neighborIds.has(id)) return true;
      return false;
    }).map(n => {
      const isNeighbor = neighborIds.has(String(n.id));
      return isNeighbor ? { ...n, data: { ...n.data, isNeighbor: true } } : n;
    });
  }, [nodes, edges, filterIds, relNodeIds, maxNodes, showDimNodes]);

  // displayNodes가 변경될 때 (검색 필터 적용 등) 화면 뷰를 맞춤
  useEffect(() => {
    if (rfInstance.current) {
      setTimeout(() => {
        rfInstance.current.fitView({ padding: 0.1, duration: 600 });
      }, 100);
    }
  }, [displayNodes]);

  const displayEdges = useMemo(() => {
    if (!filterIds) return edges;
    // displayNodes에 포함된 id 기준으로 필터 (직접매칭+이웃 모두 포함)
    const visibleIds = new Set(displayNodes.map(n => String(n.id)));
    return edges.filter(e => visibleIds.has(String(e.source)) && visibleIds.has(String(e.target)));
  }, [edges, displayNodes]);

  // 한눈에 보기: 연결 컴포넌트별 직사각형 블록 → 격자 배치
  // 전체화면 진입/해제
  const enterFullscreen = useCallback(() => {
    const wrap = container.querySelector('#cem-canvas-wrap');
    if (!wrap || wrap._isFullscreen) return;
    wrap._isFullscreen = true;
    wrap._origStyle = wrap.getAttribute('style') || '';
    wrap.setAttribute('style', [
      'position:fixed', 'inset:0', 'z-index:9998',
      'width:100vw', 'height:100vh',
      'border-radius:0', 'border:none',
    ].join(';'));
    // 닫기 버튼 삽입
    const closeBtn = document.createElement('button');
    closeBtn.id = 'cem-fs-close';
    closeBtn.innerHTML = '<i class="ri-close-line text-lg"></i>';
    closeBtn.setAttribute('style', [
      'position:absolute', 'top:12px', 'right:12px', 'z-index:9999',
      'width:32px', 'height:32px', 'border-radius:50%',
      'background:#1e293b', 'color:#fff',
      'border:none', 'cursor:pointer',
      'display:flex', 'align-items:center', 'justify-content:center',
      'box-shadow:0 2px 8px rgba(0,0,0,0.3)',
    ].join(';'));
    closeBtn.addEventListener('click', exitFullscreen);
    wrap.appendChild(closeBtn);
    setTimeout(() => rfInstance.current?.fitView({ padding: 0.04, duration: 400 }), 100);
  }, [container]);

  const exitFullscreen = useCallback(() => {
    const wrap = container.querySelector('#cem-canvas-wrap');
    if (!wrap || !wrap._isFullscreen) return;
    wrap._isFullscreen = false;
    wrap.setAttribute('style', wrap._origStyle);
    container.querySelector('#cem-fs-close')?.remove();
    setTimeout(() => rfInstance.current?.fitView({ padding: 0.04, duration: 300 }), 100);
  }, [container]);

  // ESC 키로 전체화면 해제
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') exitFullscreen(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [exitFullscreen]);

  const handleFitLayout = useCallback(() => {
    rfInstance.current?.fitView({ padding: 0.02, duration: 500 });
  }, []);

  // 초기 로드 완료 시 자동 fitView
  useEffect(() => {
    if (displayNodes.length === 0) return;
    const timer = setTimeout(() => rfInstance.current?.fitView({ padding: 0.06, duration: 500 }), 600);
    return () => clearTimeout(timer);
  }, [relNodeIds]);

  // 검색/필터 변경 시 자동 fitView
  useEffect(() => {
    if (filterIds === null) return;
    const timer = setTimeout(() => rfInstance.current?.fitView({ padding: 0.02, duration: 400 }), 250);
    return () => clearTimeout(timer);
  }, [filterIds]);

  // 외부 #cem-fit 버튼 클릭 시 한눈에 보기 실행
  useEffect(() => {
    if (!container) return;
    const fitBtn = container.querySelector('#cem-fit');
    if (!fitBtn) return;
    fitBtn.addEventListener('click', handleFitLayout);
    return () => fitBtn.removeEventListener('click', handleFitLayout);
  }, [container, handleFitLayout]);

  // 화면 캡처 함수: container._rfCapture() → HTMLCanvasElement
  useEffect(() => {
    if (!container) return;
    container._rfCapture = async () => {
      // 즉시 fitView (애니메이션 없이) → 모든 노드가 뷰포트 안으로
      rfInstance.current?.fitView({ padding: 0.04, duration: 0 });
      await new Promise(r => setTimeout(r, 150));

      // React Flow 내부 viewport 요소 찾기
      const cemCanvas = container.querySelector('#cem-canvas');
      if (!cemCanvas || typeof html2canvas === 'undefined') return null;

      // react-flow__viewport: transform이 적용된 실제 콘텐츠 레이어
      const viewport = cemCanvas.querySelector('.react-flow__viewport');
      if (!viewport) {
        // fallback: 캔버스 전체 캡처
        return html2canvas(cemCanvas, { scale: 2, useCORS: true, backgroundColor: '#f8fafc', logging: false });
      }

      // viewport transform 파싱 (translate(x,y) scale(s))
      const style = window.getComputedStyle(viewport);
      const matrix = new DOMMatrixReadOnly(style.transform);
      const scale = matrix.a;  // CSS scale 값
      const tx = matrix.e, ty = matrix.f;

      // 실제 노드 바운딩 박스 계산 (React Flow 좌표)
      const nodeEls = cemCanvas.querySelectorAll('.react-flow__node');
      if (!nodeEls.length) return html2canvas(cemCanvas, { scale: 2, useCORS: true, backgroundColor: '#f8fafc', logging: false });

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodeEls.forEach(el => {
        // node position: transform: translate(NX, NY) → 실제 화면 좌표 = NX*scale + tx
        const nm = new DOMMatrixReadOnly(window.getComputedStyle(el).transform);
        const sx = nm.e * scale + tx, sy = nm.f * scale + ty;
        const w = el.offsetWidth * scale, h = el.offsetHeight * scale;
        if (sx < minX) minX = sx;
        if (sy < minY) minY = sy;
        if (sx + w > maxX) maxX = sx + w;
        if (sy + h > maxY) maxY = sy + h;
      });

      const pad = 20;
      const capW = Math.ceil(maxX - minX + pad * 2);
      const capH = Math.ceil(maxY - minY + pad * 2);
      const canvasRect = cemCanvas.getBoundingClientRect();

      return html2canvas(cemCanvas, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
        logging: false,
        x: minX - pad,
        y: minY - pad,
        width: capW,
        height: capH,
        scrollX: -canvasRect.left,
        scrollY: -canvasRect.top,
      });
    };
    return () => { delete container._rfCapture; };
  }, [container]);

  // 최대 표시 select 연동
  useEffect(() => {
    if (!container) return;
    const sel = container.querySelector('#cem-max-nodes');
    if (!sel) return;
    const onChange = () => setMaxNodes(Number(sel.value) || 9999);
    sel.addEventListener('change', onChange);
    // 초기값 반영
    setMaxNodes(Number(sel.value) || 9999);
    return () => sel.removeEventListener('change', onChange);
  }, [container]);

  return html`
    <div style=${{ width: '100%', height: '100%', background: '#f8fafc', position: 'relative' }}>
      ${loading && html`
        <div style=${{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.7)' }}>
          <div style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' }}>
            <div style=${{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
            <div>ERD 구조 분석 및 직각 다이어그램 생성 중...</div>
          </div>
        </div>
      `}

      ${!loading && filterIds && displayNodes.length === 0 && html`
        <div style=${{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, flexDirection: 'column', gap: '12px', color: '#94a3b8' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            <path d="M8 11h6"/></svg>
          <p style=${{ fontSize: '16px', fontWeight: '600', color: '#64748b', margin: 0 }}>검색 결과가 없습니다</p>
          <p style=${{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>AND 조건을 만족하는 데이터 관계가 존재하지 않습니다.</p>
        </div>
      `}

      <${ReactFlow}
        nodes=${displayNodes}
        edges=${displayEdges}
        nodeTypes=${nodeTypes}
        onNodesChange=${onNodesChange}
        onEdgesChange=${onEdgesChange}
        onNodeClick=${onNodeClick}
        onEdgeClick=${onEdgeClick}
        onInit=${onInit}
        fitView
        minZoom=${0.03}
        maxZoom=${2}
        nodesDraggable=${true}
      >
        <${Background} color="#cbd5e1" gap=${16} size=${1} />
        <${Controls} />

      </${ReactFlow}>
    </div>
  `;
}

// =============================================================================
// 3. 외부 노출용 마운트 함수
// =============================================================================
export function renderCombinedErdMap(container, onSelectDataset) {
  const canvas = container.querySelector('#cem-canvas');
  if (!canvas) {
    console.error('Cannot find #cem-canvas in container');
    return;
  }

  // 숨겨진 스피너 처리 (로딩 텍스트가 겹치지 않도록)
  const spinner = container.querySelector('#cem-loading');
  if (spinner) spinner.style.display = 'none';

  if (canvas._reactRoot) {
    try { canvas._reactRoot.unmount(); } catch (e) { }
  }

  // 기존 DOM 정리
  canvas.innerHTML = '';
  const rootDiv = document.createElement('div');
  rootDiv.style.width = '100%';
  rootDiv.style.height = '100%';
  canvas.appendChild(rootDiv);

  const root = createRoot(rootDiv);
  canvas._reactRoot = root;
  root.render(html`<${ReactErdApp} onSelectDataset=${onSelectDataset} container=${container} />`);
}
