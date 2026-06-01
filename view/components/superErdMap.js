export function renderSuperErdMap(container, onSelectDataset) {
  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1600px] mx-auto px-4 md:px-8 py-8 animate-fade-in flex flex-col h-full min-h-[90vh]">
        
        <!-- Header -->
        <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-global-line text-emerald-500"></i> 핵심 공공-민간 초융합형 ERD 데이터맵
            </h2>
            <p class="text-sm text-slate-500 mt-2 max-w-4xl leading-relaxed">
              식약처 주요 6대 테이블(I2500, I1250, I0580, I0470, C005, 1471000)에서 <b>각각 5,000건의 데이터를 일괄 추출하여</b>
              전체 생태계의 교집합 매칭 구조(ERD)와 조인 관계를 실시간으로 그립니다.
            </p>
          </div>
        </div>

        <!-- Dashboard Layout -->
        <div id="super-dashboard" class="flex-1 flex flex-col gap-6 relative">
          
          <div id="loading-indicator" class="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center pt-20">
            <i class="ri-radar-line text-5xl text-emerald-500 mb-4 animate-spin"></i>
            <p class="text-slate-700 font-bold text-lg mb-2">총 30,000건의 생태계 데이터를 분석 및 융합 중입니다...</p>
            <p class="text-slate-500 text-sm">잠시만 기다려주세요.</p>
          </div>

          <div id="dashboard-content" class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-0 transition-opacity duration-500">
            
            <!-- Left: ERD Map -->
            <div class="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div class="bg-slate-50 border-b border-slate-200 p-5 flex items-center justify-between">
                <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <i class="ri-node-tree text-gov-600 text-xl"></i> 3만 건 구조적 ERD 데이터 맵
                </h4>
                <span class="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">실시간 통계</span>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-center items-center bg-slate-50 overflow-auto" id="mermaid-container">
                <!-- mermaid injected here -->
              </div>
            </div>

            <!-- Right: Circular Force Map -->
            <div class="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div class="bg-slate-50 border-b border-slate-200 p-5 flex items-center justify-between">
                <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <i class="ri-bubble-chart-line text-gov-600 text-xl"></i> 초융합 원형 데이터 맵
                </h4>
                <span class="text-xs font-medium text-slate-500">브라우저 최적화를 위해 시각적 노드 개수 제한 적용</span>
              </div>
              <div class="flex-1 w-full bg-slate-900 min-h-[500px]" id="vis-network-container">
                <!-- vis.js injected here -->
              </div>
            </div>

          </div>
        </div>

      </section>
    `;

    loadData();
  };

  const loadData = async () => {
    const loading = container.querySelector('#loading-indicator');
    const content = container.querySelector('#dashboard-content');
    
    try {
      const res = await fetch(`/api/bulk-ecosystem`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // --- Render Mermaid ERD with Stats ---
      const stats = data.stats;
      let mermaidDef = `erDiagram
  I2500 ||--o{ I0580 : "매칭 ${stats.match_I2500_I0580}건 (LCNS_NO)"
  I2500 ||--o{ I0470 : "매칭 ${stats.match_I2500_I0470}건 (LCNS_NO)"
  I2500 ||--o{ I1250 : "매칭 ${stats.match_I2500_I1250}건 (LCNS_NO)"
  I1250 ||--o{ DB_1471000 : "매칭 ${stats.match_I1250_1471000}건 (ITEM_REPORT_NO)"
  I1250 ||--o{ C005 : "매칭 ${stats.match_I1250_C005}건 (PRDLST_REPORT_NO)"

  I2500 {
    int Total "${stats.I2500_total}건 조회됨"
    string LCNS_NO PK
    string BSSH_NM
  }
  I1250 {
    int Total "${stats.I1250_total}건 조회됨"
    string PRDLST_REPORT_NO PK
    string LCNS_NO FK
  }
  I0580 {
    int Total "${stats.I0580_total}건 조회됨"
    string LCNS_NO FK
  }
  I0470 {
    int Total "${stats.I0470_total}건 조회됨"
    string LCNS_NO FK
  }
  DB_1471000 {
    int Total "${stats.N1471000_total}건 조회됨"
    string ITEM_REPORT_NO FK
  }
  C005 {
    int Total "${stats.C005_total}건 조회됨"
    string BAR_CD PK
    string PRDLST_REPORT_NO FK
  }
`;

      const mermaidContainer = container.querySelector('#mermaid-container');
      mermaidContainer.innerHTML = `<pre class="mermaid bg-transparent border-none">${mermaidDef}</pre>`;
      
      if (window.mermaid) {
        mermaid.init(undefined, mermaidContainer.querySelectorAll('.mermaid'));
      }

      // --- Render Vis.js Circular Map ---
      const visContainer = container.querySelector('#vis-network-container');
      if (window.vis && window.vis.Network) {
        const visNodes = new vis.DataSet(data.nodes);
        const visEdges = new vis.DataSet(data.edges);
        
        new vis.Network(visContainer, { nodes: visNodes, edges: visEdges }, {
          physics: { 
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
              gravitationalConstant: -50,
              centralGravity: 0.01,
              springLength: 100,
              springConstant: 0.08,
              damping: 0.4
            },
            stabilization: { iterations: 150 }
          },
          nodes: { 
            borderWidth: 2, 
            font: { bold: true, color: '#f8fafc', size: 12 },
            shadow: true
          },
          edges: { 
            arrows: 'to', 
            color: 'rgba(148, 163, 184, 0.4)',
            smooth: { type: 'continuous' }
          },
          interaction: { hover: true, tooltipDelay: 200 }
        });
      } else {
        visContainer.innerHTML = '<span class="text-slate-400 p-4">vis.js 라이브러리를 로드할 수 없습니다.</span>';
      }

      // Show content
      loading.classList.add('hidden');
      content.classList.remove('opacity-0');

      // --- Render Sample Data Tables ---
      const sampleContainer = document.createElement('div');
      sampleContainer.className = "col-span-1 lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden mt-2 flex flex-col";
      
      let html = `<div class="bg-slate-50 border-b border-slate-200 p-5 flex items-center justify-between">
          <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2">
            <i class="ri-link-m text-gov-600 text-xl"></i> 통합 데이터 조인 결과 (전체 생태계 조인 샘플링 100건)
          </h4>
        </div>
        <div class="p-6">`;
        
      const renderWideTable = (rows) => {
        if (!rows || rows.length === 0) return '<div class="p-4 text-slate-500 text-center">조인된 데이터가 없습니다.</div>';
        const keys = Object.keys(rows[0]);
        return `<div class="border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
          <div class="overflow-x-auto h-[400px] overflow-y-auto bg-white custom-scrollbar">
            <table class="w-full text-left text-xs whitespace-nowrap">
              <thead class="bg-slate-100 sticky top-0 border-b border-slate-300 shadow-sm z-10">
                <tr>${keys.map(k => {
                  // Style different columns based on their source table prefixes
                  let bgClass = "bg-slate-100";
                  if(k.includes('[I2500]')) bgClass = "bg-blue-50";
                  else if(k.includes('[I1250]')) bgClass = "bg-purple-50";
                  else if(k.includes('[I0580]')) bgClass = "bg-blue-100";
                  else if(k.includes('[I0470]')) bgClass = "bg-rose-50";
                  else if(k.includes('[1471000]')) bgClass = "bg-emerald-50";
                  else if(k.includes('[C005]')) bgClass = "bg-amber-50";
                  return `<th class="p-3 font-bold text-slate-700 border-r border-slate-200 last:border-0 ${bgClass}">${k}</th>`;
                }).join('')}</tr>
              </thead>
              <tbody>
                ${rows.map(r => `<tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">${keys.map(k => `<td class="p-3 text-slate-700 border-r border-slate-100 last:border-0">${r[k] || '<span class="text-slate-300">-</span>'}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
      };

      html += renderWideTable(data.sample_joined_data);

      html += `</div>`;
      sampleContainer.innerHTML = html;
      content.appendChild(sampleContainer);

    } catch (err) {
      console.error(err);
      loading.innerHTML = `<div class="text-rose-500 font-bold p-4 bg-rose-50 rounded-lg shadow border border-rose-200">데이터 로드 중 오류가 발생했습니다: ${err.message}</div>`;
    }
  };

  render();
}
