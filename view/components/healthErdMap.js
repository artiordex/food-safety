export function renderHealthErdMap(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div id="super-dashboard" class="w-full flex flex-col gap-6 fade-in p-2">
      <!-- Header -->
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-800 flex items-center gap-3">
            <i class="ri-heart-pulse-fill text-gov-600"></i> 건강기능식품 특화 통합 생태계 (ERD & Data Map)
          </h2>
          <p class="text-slate-500 mt-2">건강기능식품 4대 핵심 데이터를 실시간 조인하여 시각화합니다.</p>
        </div>
        <button id="refresh-health-map" class="bg-gov-600 hover:bg-gov-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
          <i class="ri-refresh-line"></i> 실시간 조인
        </button>
      </div>

      <!-- Loading State -->
      <div id="health-loading" class="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-gov-600 mb-4"></div>
        <p class="text-slate-600 font-medium text-lg">건강기능식품 생태계를 조인하고 있습니다...</p>
      </div>

      <!-- Diagrams -->
      <div id="health-content" class="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-0 transition-opacity duration-500">
        <!-- 원형 데이터 맵 -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="bg-slate-50 border-b border-slate-200 p-4 font-bold text-slate-700 flex items-center gap-2">
            <i class="ri-bubble-chart-line text-gov-600"></i> 동적 초융합 데이터 맵 (Hub-and-Spoke)
          </div>
          <div id="health-vis-container" class="w-full h-[500px] bg-slate-50"></div>
        </div>

        <!-- ERD 다이어그램 -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="bg-slate-50 border-b border-slate-200 p-4 font-bold text-slate-700 flex items-center gap-2">
            <i class="ri-organization-chart text-gov-600"></i> 스키마 ERD 구조
          </div>
          <div class="w-full h-[500px] bg-slate-50 overflow-auto flex items-center justify-center p-4">
            <div id="health-mermaid-container" class="mermaid flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const loading = document.getElementById('health-loading');
  const content = document.getElementById('health-content');
  const visContainer = document.getElementById('health-vis-container');
  const mermaidContainer = document.getElementById('health-mermaid-container');

  document.getElementById('refresh-health-map').addEventListener('click', () => {
    loading.classList.remove('hidden');
    content.classList.add('opacity-0');
    // existing table might be there, we recreate it anyway
    const existingTable = document.getElementById('health-table-container');
    if (existingTable) existingTable.remove();
    render();
  });

  const render = async () => {
    try {
      const res = await fetch('/api/bulk-ecosystem-health');
      if (!res.ok) throw new Error('건강기능식품 데이터 조인 실패');
      const data = await res.json();

      // --- Mermaid ERD ---
      const mermaidCode = \`erDiagram
    I0030 ||--o{ I0040 : "PRDLST_REPORT_NO"
    I0030 ||--o{ I0730 : "PRDLST_REPORT_NO"
    I0040 ||--o{ I2790 : "CRTFC_NO"

    I0030 {
        string LCNS_NO PK "인허가번호"
        string PRDLST_REPORT_NO PK "품목보고번호"
    }
    I0040 {
        string CRTFC_NO PK "인정번호"
        string PRDLST_REPORT_NO FK "품목보고번호"
    }
    I0730 {
        string NUTR_NO PK "영양번호"
        string PRDLST_REPORT_NO FK "품목보고번호"
    }
    I2790 {
        string RAW_MAT_NO PK "원료번호"
        string CRTFC_NO FK "인정번호"
    }\`;
      
      mermaidContainer.innerHTML = mermaidCode;
      mermaidContainer.removeAttribute('data-processed');
      if (window.mermaid) {
        try {
          await mermaid.run({ nodes: [mermaidContainer] });
        } catch(e) { console.error('Mermaid render error:', e); }
      }

      // --- Vis.js Network ---
      if (window.vis) {
        const visNodes = new vis.DataSet(data.nodes);
        const visEdges = new vis.DataSet(data.edges);
        new vis.Network(visContainer, { nodes: visNodes, edges: visEdges }, {
          physics: {
            forceAtlas2Based: { gravitationalConstant: -50, centralGravity: 0.01, springLength: 100, springConstant: 0.08, damping: 0.4 },
            solver: 'forceAtlas2Based',
            stabilization: { iterations: 150 }
          },
          nodes: { borderWidth: 2, font: { bold: true, color: '#f8fafc', size: 12 }, shadow: true },
          edges: { arrows: 'to', color: 'rgba(148, 163, 184, 0.4)', smooth: { type: 'continuous' } },
          interaction: { hover: true, tooltipDelay: 200 }
        });
      }

      // --- Joined Data Table ---
      loading.classList.add('hidden');
      content.classList.remove('opacity-0');

      const sampleContainer = document.createElement('div');
      sampleContainer.id = 'health-table-container';
      sampleContainer.className = "col-span-1 lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden mt-2 flex flex-col";
      
      let html = \`<div class="bg-slate-50 border-b border-slate-200 p-5 flex items-center justify-between">
          <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2">
            <i class="ri-link-m text-gov-600 text-xl"></i> 통합 데이터 조인 결과 (건강기능식품 샘플링 100건)
          </h4>
        </div>
        <div class="p-6">\`;
        
      const renderWideTable = (rows) => {
        if (!rows || rows.length === 0) return '<div class="p-4 text-slate-500 text-center">조인된 데이터가 없습니다.</div>';
        const keys = Object.keys(rows[0]);
        return \`<div class="border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
          <div class="overflow-x-auto h-[400px] overflow-y-auto bg-white custom-scrollbar">
            <table class="w-full text-left text-xs whitespace-nowrap">
              <thead class="bg-slate-100 sticky top-0 border-b border-slate-300 shadow-sm z-10">
                <tr>\${keys.map(k => {
                  let bgClass = "bg-slate-100";
                  if(k.includes('[I0030]')) bgClass = "bg-blue-50";
                  else if(k.includes('[I0040]')) bgClass = "bg-purple-50";
                  else if(k.includes('[I0730]')) bgClass = "bg-emerald-50";
                  else if(k.includes('[I2790]')) bgClass = "bg-amber-50";
                  return \`<th class="p-3 font-bold text-slate-700 border-r border-slate-200 last:border-0 \${bgClass}">\${k}</th>\`;
                }).join('')}</tr>
              </thead>
              <tbody>
                \${rows.map(r => \`<tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">\${keys.map(k => \`<td class="p-3 text-slate-700 border-r border-slate-100 last:border-0">\${r[k] || '<span class="text-slate-300">-</span>'}</td>\`).join('')}</tr>\`).join('')}
              </tbody>
            </table>
          </div>
        </div>\`;
      };

      html += renderWideTable(data.sample_joined_data);
      html += \`</div>\`;
      sampleContainer.innerHTML = html;
      content.appendChild(sampleContainer);

    } catch (err) {
      console.error(err);
      loading.innerHTML = \`<div class="text-rose-500 font-bold p-4 bg-rose-50 rounded-lg shadow border border-rose-200">데이터 로드 중 오류가 발생했습니다: \${err.message}</div>\`;
    }
  };

  render();
}
