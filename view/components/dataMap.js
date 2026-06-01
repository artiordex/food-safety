import {
  datasets,
  subjectColorMap,
  dataMapNodes,
  dataMapEdges
} from '../datasetData.js';

// Vis.js 노드 카테고리별 테마 HSL/RGB 색상맵 (Vibrant & Premium)
const subjectColors = {
  '식품·제품': { background: '#ccfbf1', border: '#0d9488', highlight: { background: '#99f6e4', border: '#0f766e' } },
  '업체·영업자': { background: '#d9e8ff', border: '#1a5fb4', highlight: { background: '#bcd8ff', border: '#154a8c' } },
  '원재료·첨가물': { background: '#ffe4e6', border: '#e11d48', highlight: { background: '#fecdd3', border: '#be123c' } },
  '영양·건강': { background: '#d1fae5', border: '#059669', highlight: { background: '#a7f3d0', border: '#047857' } },
  '수입식품': { background: '#fef3c7', border: '#d97706', highlight: { background: '#fde68a', border: '#b45309' } },
  '농·축·수산물': { background: '#ede9fe', border: '#7c3aed', highlight: { background: '#ddd6fe', border: '#6d28d9' } },
  '기타': { background: '#f1f5f9', border: '#475569', highlight: { background: '#e2e8f0', border: '#334155' } }
};

export function renderDataMap(container, onSelectDataset) {
  let maxNodesLimit = 50;
  let activePhysics = true;
  let activeSubjectFilter = '전체';
  let selectedNodeId = null;
  let networkInstance = null;
  let relationships = [];

  const fetchRelationships = async () => {
    try {
      const res = await fetch('/api/relationships');
      if (res.ok) {
        relationships = await res.json();
        console.log(`[DataMap] Loaded ${relationships.length} dynamic relationships from database!`);
        if (relationships.length > 0) {
          initNetwork();
        }
      }
    } catch (err) {
      console.warn('[DataMap] Failed to load dynamic relationships:', err);
    }
  };

  const getDatasetById = (id) => datasets.find(d => d.id === id);

  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        <!-- Header -->
        <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              📊 식품안전 JOIN 기반 융합 관계도
            </h2>
            <p class="text-xs text-slate-500 mt-1.5">
              실제 DB 스키마 간의 조인(JOIN) 관계를 동적인 포스 디렉티드(Force-Directed) 그래프로 시각화합니다.
            </p>
          </div>
          
          <div class="flex items-center gap-2 text-xs text-slate-400 self-end bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 실시간 라이브 조인 분석 중
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-6">
          
          <!-- LEFT: 메인 캔버스 -->
          <div class="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col relative min-h-[650px]">
            
            <!-- 캔버스 상단 컨트롤 패널 -->
            <div class="px-5 py-3 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-4 z-10 relative">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gov-600 animate-ping"></span>
                <span class="text-xs font-semibold text-slate-500">조인 연계선을 따라 동적으로 노드가 배치됩니다.</span>
              </div>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" id="physics-toggle" class="w-3.5 h-3.5 rounded text-gov-600 border-slate-300" ${activePhysics ? 'checked' : ''} />
                  <span>물리 엔진(정렬) 가동</span>
                </label>
                
                <div class="h-4 w-[1px] bg-slate-200"></div>

                <!-- 분야(Subject) 제어 필터 -->
                <div class="flex items-center gap-1">
                  <span class="text-[11px] font-bold text-slate-600 whitespace-nowrap">분야:</span>
                  <select id="subject-filter-select" class="text-[11px] border border-slate-200 rounded px-2 py-1 outline-none focus:border-gov-400 bg-white shadow-sm font-medium">
                    <option value="전체" ${activeSubjectFilter === '전체' ? 'selected' : ''}>전체 분야</option>
                    ${Object.keys(subjectColors).map(subj => 
                      `<option value="${subj}" ${activeSubjectFilter === subj ? 'selected' : ''}>${subj}</option>`
                    ).join('')}
                  </select>
                </div>

                <!-- 노드 한도 제어 필터 -->
                <div class="flex items-center gap-1">
                  <span class="text-[11px] font-bold text-slate-600 whitespace-nowrap">최대 표시 노드:</span>
                  <select id="max-nodes-select" class="text-[11px] border border-slate-200 rounded px-2 py-1 outline-none focus:border-gov-400 bg-white shadow-sm font-medium">
                    <option value="30" ${maxNodesLimit == 30 ? 'selected' : ''}>30개</option>
                    <option value="50" ${maxNodesLimit == 50 ? 'selected' : ''}>50개</option>
                    <option value="100" ${maxNodesLimit == 100 ? 'selected' : ''}>100개</option>
                    <option value="200" ${maxNodesLimit == 200 ? 'selected' : ''}>전체 노드 표시</option>
                  </select>
                </div>
                
                <button id="btn-fit-screen" class="px-2.5 py-1 text-[11px] border border-slate-200 bg-white hover:bg-slate-50 rounded text-slate-600 shadow-sm transition-colors flex items-center gap-1 font-bold">
                  <i class="ri-focus-3-line"></i> 화면 맞춤
                </button>
              </div>
            </div>

            <!-- Vis.js 영역 -->
            <div class="flex-1 bg-slate-50/20 relative" id="network-graph-canvas" style="width: 100%; height: 100%;"></div>
            
            <!-- 로딩 안내 -->
            <div id="network-loading-overlay" class="absolute inset-0 bg-white/80 z-20 flex items-center justify-center hidden">
              <div class="flex flex-col items-center gap-3">
                <div class="w-8 h-8 rounded-full border-4 border-slate-200 border-t-gov-600 animate-spin"></div>
                <span class="text-xs text-slate-500 font-medium">관계망 구조 분석 및 물리 엔진 정렬 중...</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: 우측 상세 패널 (PPTX 스타일 유지) -->
          <div class="lg:w-[350px] shrink-0 flex flex-col gap-4">
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[650px]">
              <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
                <h3 class="text-sm font-bold text-slate-800" id="panel-title">데이터를 선택하세요</h3>
              </div>
              <div class="p-5 flex-1 overflow-y-auto" id="panel-content">
                <div class="flex items-center justify-center h-full text-slate-400 text-xs text-center leading-relaxed">
                  좌측 데이터맵에서 데이터 노드(점)를 클릭하시면<br>이곳에 상세 정보가 표시됩니다.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    initNetwork();
    bindEvents();
  };

  const initNetwork = () => {
    const canvasContainer = container.querySelector('#network-graph-canvas');
    if (!canvasContainer) return;

    // 1. 노드 구성 (169개 기준 동적 로드)
    // 데이터맵용 dataMapNodes를 사용하되, datasets 정보로 확장합니다.
    let baseNodes = dataMapNodes && dataMapNodes.length > 0 
      ? dataMapNodes 
      : datasets.map(ds => ({ id: ds.id, label: ds.name.split(' (')[0] }));
      
    let visibleNodes = baseNodes;

    if (activeSubjectFilter !== '전체') {
      visibleNodes = visibleNodes.filter(node => {
        const ds = getDatasetById(node.id);
        const subject = ds ? ds.subject : '기타';
        return subject === activeSubjectFilter;
      });
    }

    if (visibleNodes.length > maxNodesLimit) {
      visibleNodes = visibleNodes.slice(0, maxNodesLimit);
    }
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // 2. 연계선(Edges) 구성 (JOIN 관계 기반)
    let edgesToUse = (dataMapEdges && dataMapEdges.length > 0) ? [...dataMapEdges] : [];
    if (relationships && relationships.length > 0) {
      edgesToUse = relationships.map(rel => {
        let labelKey = rel.from_field;
        if (labelKey === 'BAR_CD') labelKey = 'BARCODE_NO';
        return {
          from: rel.from_table,
          to: rel.to_table,
          label: `${labelKey} (${rel.confidence === 'HIGH' ? '확정' : '추정'})`
        };
      });
    }

    // 보이는 노드 간의 엣지만 필터링
    const visibleEdges = edgesToUse.filter(edge => 
      visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)
    );

    // 3. Vis.js 포맷 노드 세트 생성
    const visNodes = visibleNodes.map(node => {
      const ds = getDatasetById(node.id);
      const subject = ds ? ds.subject : '기타';
      const dataCount = ds ? ds.dataCount : 10;
      
      // 로그 스케일 크기 (적재 건수에 비례)
      const size = Math.log10(dataCount || 10) * 10 + 10;
      const themeColors = subjectColors[subject] || subjectColors['기타'];

      return {
        id: node.id,
        label: ds ? ds.name.split(' (')[0] : node.label,
        shape: 'dot',
        size: size,
        font: { size: 10, face: 'Pretendard', color: '#334155', strokeWidth: 2, strokeColor: '#ffffff' },
        color: themeColors,
        borderWidth: selectedNodeId === node.id ? 4 : 1.5,
        shadow: { enabled: true, color: 'rgba(0, 0, 0, 0.05)', size: 5, x: 0, y: 2 },
        title: `
          <div class="p-2 text-xs text-slate-700">
            <p class="font-bold mb-1">${ds ? ds.name.split(' (')[0] : node.label}</p>
            <p><span class="text-slate-400">분야:</span> ${subject}</p>
          </div>
        `
      };
    });

    // 4. Vis.js 포맷 엣지 세트 생성
    const visEdgesMapped = visibleEdges.map((edge, idx) => {
      let width = 1.5;
      if (edge.label.includes('LCNS_NO') || edge.label.includes('PRDLST_REPORT_NO') || edge.label.includes('BAR_CD')) {
        width = 2.5; // 주요 키는 굵게
      }
      return {
        id: `edge_${idx}`,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        font: { size: 9, face: 'monospace', color: '#64748b', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#cbd5e1', highlight: '#3374f6', hover: '#94a3b8' },
        width: width,
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        smooth: { enabled: true, type: 'continuous' }
      };
    });

    const data = {
      nodes: new vis.DataSet(visNodes),
      edges: new vis.DataSet(visEdgesMapped)
    };

    const options = {
      nodes: { borderWidthSelected: 4 },
      edges: { selectionWidth: function (w) { return w + 2; } },
      interaction: { hover: true, tooltipDelay: 100, selectable: true },
      physics: {
        enabled: activePhysics,
        barnesHut: {
          gravitationalConstant: -4000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0.8
        },
        stabilization: { enabled: true, iterations: 150, updateInterval: 25 }
      }
    };

    const overlay = container.querySelector('#network-loading-overlay');
    if (overlay) overlay.classList.remove('hidden');

    networkInstance = new vis.Network(canvasContainer, data, options);

    networkInstance.on("stabilizationIterationsDone", () => {
      if (overlay) overlay.classList.add('hidden');
    });

    networkInstance.on("selectNode", (params) => {
      const nodeId = params.nodes[0];
      selectedNodeId = nodeId;
      showTableDetail(nodeId);
      
      // 선택된 노드 하이라이팅 연출
      networkInstance.setSelection({ nodes: [nodeId] }, { unselectAll: true });
    });
    
    networkInstance.on("deselectNode", () => {
      selectedNodeId = null;
      resetTableDetail();
    });
  };

  const showTableDetail = (nodeId) => {
    const ds = getDatasetById(nodeId);
    if (!ds) return;

    const panelTitle = container.querySelector('#panel-title');
    const panelContent = container.querySelector('#panel-content');
    
    panelTitle.textContent = ds.name.split(' (')[0];
    const kws = (ds.keywords || ['식품안전', '공공데이터']).join(', ');

    panelContent.innerHTML = `
      <div class="mb-4">
        <span class="inline-block px-2.5 py-1 bg-[#00529B] text-white text-[10px] font-bold rounded">개방데이터</span>
      </div>
      
      <div class="flex flex-col gap-0 border-t border-slate-100">
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">데이터명</div>
          <div class="flex-1 text-[11px] text-slate-800 font-medium">${ds.name}</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">보유기관</div>
          <div class="flex-1 text-[11px] text-slate-800">식품의약품안전처</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">부처</div>
          <div class="flex-1 text-[11px] text-slate-800">식품의약품안전처</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">분류</div>
          <div class="flex-1 text-[11px] text-slate-800">${ds.subject || '식품안전'}</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">키워드</div>
          <div class="flex-1 text-[11px] text-slate-800">${kws}</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">설명</div>
          <div class="flex-1 text-[11px] text-slate-800 leading-relaxed">${ds.description || '이 데이터는 식품안전나라에서 제공하는 공공데이터입니다.'}</div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">URL</div>
          <div class="flex-1 text-[11px] text-[#00529B] hover:underline break-all">
            <a href="#" target="_blank">https://www.data.go.kr/data/${nodeId}/fileData.do</a>
          </div>
        </div>
        <div class="flex py-3 border-b border-slate-100">
          <div class="w-20 shrink-0 text-[11px] font-bold text-slate-500">목록번호</div>
          <div class="flex-1 text-[11px] font-mono text-slate-800">${nodeId}</div>
        </div>
      </div>
      
      <div class="mt-6 flex flex-col gap-2">
        <button id="btn-jump-sql" class="w-full py-2.5 bg-gov-600 hover:bg-gov-700 text-white rounded text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1">
          <i class="ri-terminal-box-line"></i> SQL 실행기로 데이터 분석
        </button>
        <button id="btn-jump-api" class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
          <i class="ri-search-eye-line"></i> API 탐색기에서 스키마 확인
        </button>
      </div>
    `;

    // 쿼리 플레이그라운드로 점프
    const btnJumpSql = container.querySelector('#btn-jump-sql');
    if (btnJumpSql) {
      btnJumpSql.addEventListener('click', () => {
        window.sqlPlaygroundAutoQuery = ds.usageExample || `SELECT * FROM ${nodeId} LIMIT 10;`;
        const sqlTabBtn = document.querySelector('[data-tab="sql-playground"], [data-nav="sql-playground"]');
        if (sqlTabBtn) sqlTabBtn.click();
      });
    }

    // API Explorer로 점프
    const btnJumpApi = container.querySelector('#btn-jump-api');
    if (btnJumpApi) {
      btnJumpApi.addEventListener('click', () => {
        window.apiExplorerAutoSearch = nodeId;
        const apiTabBtn = document.querySelector('[data-tab="api-explorer"], [data-nav="api-explorer"]');
        if (apiTabBtn) apiTabBtn.click();
      });
    }
  };

  const resetTableDetail = () => {
    const panelTitle = container.querySelector('#panel-title');
    const panelContent = container.querySelector('#panel-content');
    if(panelTitle) panelTitle.textContent = "데이터를 선택하세요";
    if(panelContent) {
      panelContent.innerHTML = `
        <div class="flex items-center justify-center h-full text-slate-400 text-xs text-center leading-relaxed">
          좌측 데이터맵에서 데이터 노드(점)를 클릭하시면<br>이곳에 상세 정보가 표시됩니다.
        </div>
      `;
    }
  };

  const bindEvents = () => {
    // 노드 개수 한도 필터
    const maxNodesSelect = container.querySelector('#max-nodes-select');
    if (maxNodesSelect) {
      maxNodesSelect.addEventListener('change', (e) => {
        maxNodesLimit = parseInt(e.target.value);
        initNetwork();
      });
    }

    // 분야(Subject) 필터
    const subjectSelect = container.querySelector('#subject-filter-select');
    if (subjectSelect) {
      subjectSelect.addEventListener('change', (e) => {
        activeSubjectFilter = e.target.value;
        initNetwork();
      });
    }

    // 물리 엔진(Physics) 토글
    const physicsToggle = container.querySelector('#physics-toggle');
    if (physicsToggle) {
      physicsToggle.addEventListener('change', (e) => {
        activePhysics = e.target.checked;
        if (networkInstance) {
          networkInstance.setOptions({ physics: { enabled: activePhysics } });
        }
      });
    }

    // 한눈에 보기
    const btnFit = container.querySelector('#btn-fit-screen');
    if (btnFit) {
      btnFit.addEventListener('click', () => {
        if (networkInstance) {
          networkInstance.fit({ animation: { duration: 800, easingFunction: "easeInOutQuad" } });
        }
      });
    }
  };

  render();
  fetchRelationships(); // 동적 관계망 엣지 로딩 가동!
}
