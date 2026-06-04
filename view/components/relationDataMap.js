import {
  datasets,
  subjectColorMap,
  dataMapNodes,
  dataMapEdges
} from '../datasetData.js';

// 8대 주제 도메인별 참여 테이블 정의
const domainTables = {
  core: ["I2500", "I1250", "C005", "C002", "I0580", "I0470", "I2620", "I0490"],
  license: ["I2500", "I1220", "I2857", "I2858", "I2830", "I2831", "I2833", "I2835", "I2836", "I2821", "I2822", "I2829", "I2834", "I2832", "I2856", "I2859", "I2861", "I2560"],
  haccp: ["I2500", "I0580", "I0630", "I0600"],
  product: ["I1250", "C005", "C002", "I2510", "I2852"],
  standards: ["I2580", "I0960", "I2600", "I2610", "I0940"],
  safety: ["I2620", "I0490", "I2810"],
  import: ["C001", "C003", "I0482", "I2821"],
  nutrition: ["I2780", "I2819"],
  discipline: ["I0470", "I0482", "I2822"]
};

// 모든 미분류 데이터셋을 해당 도메인에 동적으로 분류
function dynamicallyCategorizeDatasets() {
  const allCategorized = new Set(Object.values(domainTables).flat());

  datasets.forEach(ds => {
    if (allCategorized.has(ds.id)) return; // 이미 분류 완료된 메이저 테이블 패스

    const id = ds.id;
    const name = ds.name || "";
    const subject = ds.subject || "기타";
    const desc = ds.description || "";

    // 1. Core / Fusion (융합 데이터 세트)
    if (subject === "융합 데이터 세트" || id.startsWith("v_")) {
      domainTables.core.push(id);
      return;
    }

    // 2. HACCP & GMP
    if (
      name.includes("HACCP") ||
      name.includes("GMP") ||
      desc.includes("HACCP") ||
      desc.includes("GMP")
    ) {
      domainTables.haccp.push(id);
    }

    // 3. Discipline (행정처분 · 폐업)
    if (
      name.includes("행정처분") ||
      name.includes("폐업") ||
      name.includes("단속") ||
      name.includes("위반") ||
      name.includes("처분") ||
      desc.includes("행정처분") ||
      desc.includes("폐업")
    ) {
      domainTables.discipline.push(id);
      return;
    }

    // 4. Safety (검사 · 부적합 · 위해)
    if (
      name.includes("부적합") ||
      name.includes("회수") ||
      name.includes("위해") ||
      name.includes("수거") ||
      name.includes("식중독") ||
      name.includes("독소") ||
      desc.includes("부적합") ||
      desc.includes("회수") ||
      desc.includes("위해")
    ) {
      domainTables.safety.push(id);
      return;
    }

    // 5. Import (수입식품)
    if (
      subject === "수입식품" ||
      name.includes("수입") ||
      name.includes("해외") ||
      name.includes("국외") ||
      name.includes("통관") ||
      desc.includes("수입")
    ) {
      domainTables.import.push(id);
      return;
    }

    // 6. Nutrition (영양성분)
    if (
      subject === "영양·건강" ||
      name.includes("영양") ||
      name.includes("식단") ||
      name.includes("칼로리") ||
      name.includes("나트륨") ||
      desc.includes("영양")
    ) {
      domainTables.nutrition.push(id);
      return;
    }

    // 7. Product (품목제조 · 제품)
    if (
      subject === "식품·제품" ||
      subject === "원재료·첨가물" ||
      name.includes("품목") ||
      name.includes("제품") ||
      name.includes("바코드") ||
      name.includes("원재료") ||
      name.includes("식품") ||
      desc.includes("제품") ||
      desc.includes("품목")
    ) {
      domainTables.product.push(id);
      return;
    }

    // 8. License (인허가 · 업소)
    if (
      subject === "업체·영업자" ||
      name.includes("인허가") ||
      name.includes("영업") ||
      name.includes("업소") ||
      name.includes("급식") ||
      name.includes("식당") ||
      desc.includes("업소") ||
      desc.includes("인허가")
    ) {
      domainTables.license.push(id);
      return;
    }

    // 9. Standards (기준규격 · 공전 · 기타)
    domainTables.standards.push(id);
  });
}

// 초기화 가동
dynamicallyCategorizeDatasets();

// 도메인 한글 칭 명칭 매핑
const domainNames = {
  core: "핵심 초융합형 데이터맵",
  license: "인허가 · 업소 정보",
  haccp: "HACCP · 위생 인증 정보",
  product: "품목제조 · 제품 정보",
  standards: "기준규격 · 공전 정보",
  safety: "검사 · 부적합 · 위해 정보",
  import: "수입식품 정보",
  nutrition: "영양성분 정보",
  discipline: "행정처분 · 폐업 정보"
};

// Vis.js 노드 카테고리별 테마 HSL/RGB 색상맵 (Vibrant & Premium)
const subjectColors = {
  '식품·제품': {
    background: '#ccfbf1', // teal-100
    border: '#0d9488', // teal-600
    highlight: { background: '#99f6e4', border: '#0f766e' },
    hover: { background: '#99f6e4', border: '#0f766e' }
  },
  '업체·영업자': {
    background: '#d9e8ff', // gov-100
    border: '#1a5fb4', // gov-600
    highlight: { background: '#bcd8ff', border: '#154a8c' },
    hover: { background: '#bcd8ff', border: '#154a8c' }
  },
  '원재료·첨가물': {
    background: '#ffe4e6', // rose-100
    border: '#e11d48', // rose-600
    highlight: { background: '#fecdd3', border: '#be123c' },
    hover: { background: '#fecdd3', border: '#be123c' }
  },
  '영양·건강': {
    background: '#d1fae5', // emerald-100
    border: '#059669', // emerald-600
    highlight: { background: '#a7f3d0', border: '#047857' },
    hover: { background: '#a7f3d0', border: '#047857' }
  },
  '수입식품': {
    background: '#fef3c7', // amber-100
    border: '#d97706', // amber-600
    highlight: { background: '#fde68a', border: '#b45309' },
    hover: { background: '#fde68a', border: '#b45309' }
  },
  '농·축·수산물': {
    background: '#ede9fe', // violet-100
    border: '#7c3aed', // violet-600
    highlight: { background: '#ddd6fe', border: '#6d28d9' },
    hover: { background: '#ddd6fe', border: '#6d28d9' }
  },
  '기타': {
    background: '#f1f5f9', // slate-100
    border: '#475569', // slate-600
    highlight: { background: '#e2e8f0', border: '#334155' },
    hover: { background: '#e2e8f0', border: '#334155' }
  }
};

export function renderRelationDataMap(container, onSelectDataset) {
  let activeDomainId = 'all';
  let maxNodesLimit = 30;
  let activePhysics = true;
  let selectedNodeId = null;
  let networkInstance = null;
  let relationships = [];
  let activeKeyword = '';
  let columnMatchedIds = new Set();

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

  // 좌측 체크 필터 변수
  let selectedDomains = {
    core: true, license: true, haccp: true, product: true,
    standards: true, safety: true, import: true, nutrition: true, discipline: true
  };
  let selectedKeys = {
    LCNS_NO: true, PRDLST_REPORT_NO: true, BAR_CD: true, BSSH_NO: true, TESTITM_CD: true, PRDLST_NM: true
  };

  const getDatasetById = (id) => datasets.find(d => d.id === id);

  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        <!-- Premium Section Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 w-full">
          <div class="w-full break-keep">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
              식품안전 공공데이터 융합 관계도 <span class="text-sm font-normal text-slate-500">(포스 디렉티드 버블 그래프 기반)</span>
            </h2>
          </div>

          <!-- 키워드 검색 → 네트워크 맵 전환 -->
          <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
            <div class="relative flex-1 md:w-72">
              <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" style="z-index:1;"></i>
              <input type="text" id="rdm-keyword-input"
                style="padding-left: 2rem !important;"
                class="w-full pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-gov-500 focus:ring-1 focus:ring-gov-500 bg-white"
                placeholder="테이블명 또는 컬럼명 검색...">
            </div>
            <button id="rdm-keyword-btn"
              class="px-4 py-2 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm">
              <i class="ri-node-tree text-sm"></i> 검색
            </button>
            <button id="rdm-keyword-clear"
              class="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 rounded-lg text-sm transition-colors whitespace-nowrap">
              초기화
            </button>
          </div>
          <span id="rdm-keyword-badge" class="hidden mt-1 px-3 py-1 bg-gov-100 text-gov-700 text-xs font-semibold rounded-full border border-gov-200 self-start md:self-auto"></span>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-hidden">
          
          <!-- [1] LEFT SIDEBAR: 필터링 및 통계 패널 (300px) -->
          <div class="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            
            <!-- 1. 도메인 분류 체크박스 필터 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span class="flex items-center gap-1.5 text-slate-800"><i class="ri-folder-open-line text-gov-600"></i> 카테고리 분류 필터 (${Object.keys(domainNames).length}대 카테고리)</span>
                <button id="btn-all-domains-toggle" class="text-[11px] text-gov-600 hover:text-gov-800 hover:underline font-semibold">반전</button>
              </h4>
              <div class="grid grid-cols-2 gap-2">
                ${Object.entries(domainNames).map(([key, name]) => {
      const isChecked = selectedDomains[key];
      const colorDot = key === 'core' ? 'bg-indigo-600' :
        key === 'license' ? 'bg-sky-600' :
          key === 'haccp' ? 'bg-teal-600' :
            key === 'product' ? 'bg-rose-600' :
              key === 'standards' ? 'bg-emerald-600' :
                key === 'safety' ? 'bg-red-600' :
                  key === 'import' ? 'bg-amber-600' :
                    key === 'nutrition' ? 'bg-violet-600' : 'bg-fuchsia-600';
      return `
                    <label class="flex items-center justify-between gap-2 text-[11px] text-slate-700 cursor-pointer hover:bg-slate-50 border border-slate-100 bg-slate-50/30 p-2 rounded-lg transition-all select-none hover:border-slate-200 w-full">
                      <span class="flex items-center gap-1.5 min-w-0">
                        <span class="w-2 h-2 rounded-full ${colorDot} shrink-0"></span>
                        <span class="font-semibold text-slate-700 truncate" title="${name}">${name}</span>
                      </span>
                      <input type="checkbox" data-filter="domain" data-key="${key}" class="w-3.5 h-3.5 rounded text-gov-600 border-slate-300 focus:ring-gov-500 shrink-0" ${isChecked ? 'checked' : ''} />
                    </label>
                  `;
    }).join('')}
              </div>
            </div>

            <!-- 2. 핵심 연계키 필터 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span class="flex items-center gap-1.5 text-slate-800"><i class="ri-key-2-line text-gov-600"></i> 핵심 조인키 필터</span>
                <button id="btn-all-keys-toggle" class="text-[11px] text-gov-600 hover:text-gov-800 hover:underline font-semibold">반전</button>
              </h4>
              <div class="grid grid-cols-2 gap-2">
                ${Object.entries(selectedKeys).map(([key, isChecked]) => {
      return `
                    <label class="flex items-center justify-between gap-2 text-[11px] text-slate-700 cursor-pointer hover:bg-slate-50 border border-slate-100 bg-slate-50/30 p-2 rounded-lg transition-all select-none hover:border-slate-200 w-full">
                      <span class="flex items-center gap-1.5 min-w-0">
                        <i class="ri-key-2-line text-amber-500 shrink-0 text-xs"></i>
                        <span class="font-mono font-semibold text-slate-700 truncate" title="${key}">${key}</span>
                      </span>
                      <input type="checkbox" data-filter="key" data-key="${key}" class="w-3.5 h-3.5 rounded text-gov-600 border-slate-300 focus:ring-gov-500 shrink-0" ${isChecked ? 'checked' : ''} />
                    </label>
                  `;
    }).join('')}
              </div>
            </div>

            <!-- 3. 통계 요약 카드 -->
            <div class="bg-gradient-to-br from-gov-900 to-gov-800 text-white rounded-xl p-5 shadow-md">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3.5 flex items-center gap-1.5">
                <i class="ri-pulse-line text-emerald-400"></i> 데이터 관계 맵 메트릭스
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/10 rounded-lg p-3 text-center">
                  <p class="text-[10px] text-slate-300">총 연계 노드</p>
                  <p class="text-xl font-bold mt-1 text-emerald-300" id="stat-nodes-cnt">0</p>
                </div>
                <div class="bg-white/10 rounded-lg p-3 text-center">
                  <p class="text-[10px] text-slate-300">연계선 수</p>
                  <p class="text-xl font-bold mt-1 text-amber-300" id="stat-edges-cnt">0</p>
                </div>
              </div>
              <div class="mt-4 p-3 bg-white/5 rounded-lg text-[10px] leading-relaxed text-slate-200">
                💡 <strong>버블 노드 크기</strong>는 해당 테이블의 적재 건수에 비례하며(로그 스케일), 연결 선의 굵기는 연계 신뢰도를 의미합니다.
              </div>
            </div>

          </div>

          <!-- [2] CENTER/RIGHT MAIN: 버블 네트워크 캔버스 및 상세 패널 -->
          <div class="flex-1 flex flex-col gap-6 min-w-0 w-full">
            
            <!-- 메인 가동 캔버스 카드 -->
            <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[580px] relative">
              
              <!-- 캔버스 컨트롤 헤더 -->
              <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div class="flex items-center gap-2"></div>
                <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <!-- 피직스(Physics) 켜고 끄기 토글 -->
                  <label class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input type="checkbox" id="physics-toggle" class="w-3.5 h-3.5 rounded text-gov-600 border-slate-300" ${activePhysics ? 'checked' : ''} />
                    <span>정렬 중력 가동</span>
                  </label>
                  
                  <div class="h-4 w-[1px] bg-slate-200"></div>

                  <!-- 노드 한도 제어 -->
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-slate-500 whitespace-nowrap">최대 표시:</span>
                    <select id="max-nodes-select" class="text-xs border border-slate-200 rounded px-2 py-1 outline-none focus:border-gov-400 bg-white">
                      <option value="15" ${maxNodesLimit == 15 ? 'selected' : ''}>15개</option>
                      <option value="30" ${maxNodesLimit == 30 ? 'selected' : ''}>30개</option>
                      <option value="50" ${maxNodesLimit == 50 ? 'selected' : ''}>50개</option>
                      <option value="200" ${maxNodesLimit == 200 ? 'selected' : ''}>전체 (175개)</option>
                    </select>
                  </div>
                  
                  <button id="btn-fit-screen" class="px-2.5 py-1 text-xs border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-slate-600 shadow-sm transition-colors flex items-center gap-1">
                    <i class="ri-focus-3-line"></i> 한눈에 보기
                  </button>

                  <button id="btn-capture-graph" class="px-2.5 py-1 text-xs border border-gov-200 bg-gov-50 hover:bg-gov-100 rounded-lg text-gov-700 shadow-sm transition-colors flex items-center gap-1">
                    <i class="ri-camera-line"></i> PNG 저장
                  </button>
                </div>
              </div>

              <!-- 관계도 그리기 캔버스 영역 -->
              <div class="flex-1 bg-slate-50/20 relative" id="network-graph-canvas" style="height: clamp(400px, 60vw, 720px); width: 100%;">
                <!-- Dynamic Network rendering here -->
              </div>
              
              <!-- 로딩 또는 힌트 메세지 오버레이 -->
              <div id="network-loading-overlay" class="absolute inset-0 bg-white/80 z-20 flex items-center justify-center hidden">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-8 h-8 rounded-full border-4 border-slate-200 border-t-gov-600 animate-spin"></div>
                  <span class="text-xs text-slate-500 font-medium">대용량 관계망 구조 분석 및 정렬 배치 중...</span>
                </div>
              </div>

            </div>

            <!-- 하단부: 선택된 테이블 논리/물리 속성 ERD 명세 패널 -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hidden" id="table-inspector-panel">
              <!-- Dynamic inspector injected here -->
            </div>

          </div>

        </div>

      </section>
    `;

    initNetwork();
    bindEvents();
  };

  // Vis.js 네트워크 관계도 빌더 함수
  const initNetwork = () => {
    const canvasContainer = container.querySelector('#network-graph-canvas');
    if (!canvasContainer) return;

    // 1단계: 사용자 필터 조건 적용하여 노드 리스트 구성
    let filteredNodeIds = new Set();

    // 도메인 분류 기준 노드 필터링
    Object.entries(selectedDomains).forEach(([domainKey, isSelected]) => {
      if (isSelected && domainTables[domainKey]) {
        domainTables[domainKey].forEach(tblId => filteredNodeIds.add(tblId));
      }
    });

    // 키워드 필터 적용 (테이블명·설명 + 컬럼명·한글명 통합 매칭)
    let visibleNodes = dataMapNodes.filter(node => {
      if (!filteredNodeIds.has(node.id)) return false;
      if (!activeKeyword) return true;
      const kw = activeKeyword.toLowerCase();
      const ds = getDatasetById(node.id);
      // 1) 컬럼 검색 API 매칭
      if (columnMatchedIds.has(node.id)) return true;
      // 2) 테이블 ID / 이름 / 설명 / 분류
      return (
        node.id.toLowerCase().includes(kw) ||
        (node.label || '').toLowerCase().includes(kw) ||
        (ds && ds.name && ds.name.toLowerCase().includes(kw)) ||
        (ds && ds.description && ds.description.toLowerCase().includes(kw)) ||
        (ds && ds.subject && ds.subject.toLowerCase().includes(kw))
      );
    });

    // 키워드 적중 노드와 직접 연결된 노드도 함께 표시
    if (activeKeyword && visibleNodes.length > 0) {
      const matchedIds = new Set(visibleNodes.map(n => n.id));
      const edgesToUseEarly = relationships.length > 0
        ? relationships.map(r => ({ from: r.from_table, to: r.to_table }))
        : dataMapEdges;
      edgesToUseEarly.forEach(edge => {
        if (matchedIds.has(edge.from) && filteredNodeIds.has(edge.to)) matchedIds.add(edge.to);
        if (matchedIds.has(edge.to) && filteredNodeIds.has(edge.from)) matchedIds.add(edge.from);
      });
      visibleNodes = dataMapNodes.filter(n => matchedIds.has(n.id));
    }

    // 노드 개수 리밋 적용
    if (visibleNodes.length > maxNodesLimit && !activeKeyword) {
      visibleNodes = visibleNodes.slice(0, maxNodesLimit);
    }

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // 2단계: 핵심 조인키 기준 연계선 필터링
    let edgesToUse = [...dataMapEdges];
    if (relationships && relationships.length > 0) {
      edgesToUse = relationships.map(rel => {
        let labelKey = rel.from_field;
        if (labelKey === 'BAR_CD') labelKey = 'BARCODE_NO';
        return {
          from: rel.from_table,
          to: rel.to_table,
          label: rel.confidence === 'HIGH' ? labelKey : `${labelKey} (추정)`
        };
      });
    }

    const visibleEdges = edgesToUse.filter(edge => {
      // 노드 자체가 보이고 있는가?
      if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) return false;
      // 해당 엣지의 연결 조인키 필터가 활성화되어 있는가?
      let baseLabel = edge.label.split(' ')[0];
      if (baseLabel === 'BARCODE_NO') baseLabel = 'BAR_CD';
      return selectedKeys[baseLabel] !== false;
    });

    // 메트릭 카운트 통계 업데이트
    const statNodes = container.querySelector('#stat-nodes-cnt');
    const statEdges = container.querySelector('#stat-edges-cnt');
    if (statNodes) statNodes.textContent = visibleNodeIds.size;
    if (statEdges) statEdges.textContent = visibleEdges.length;

    // 3단계: Vis.js 포맷 노드 DataSet 생성
    const visNodes = visibleNodes.map(node => {
      const ds = getDatasetById(node.id);
      const subject = ds ? ds.subject : '기타';
      const dataCount = ds ? ds.dataCount : 10;

      // 로그 스케일로 크기 스케일링 (버블의 시각적 밸런스 튜닝)
      const size = Math.log10(dataCount || 10) * 12 + 10;
      const themeColors = subjectColors[subject] || subjectColors['기타'];

      // 노드 레이블의 가독성을 위해 개행처리 포함
      const logicalLabel = ds ? ds.name.split(' (')[0] : node.label;
      const displayLabel = `${node.id}\n${logicalLabel}`;

      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'p-2 text-xs font-sans text-slate-700 leading-relaxed max-w-xs';
      tooltipEl.innerHTML = `
        <p class="font-bold text-slate-900 mb-1">${logicalLabel} (${node.id})</p>
        <p class="mb-1"><span class="text-slate-400">카테고리:</span> <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${subject}</span></p>
        <p><span class="text-slate-400">보존 레코드:</span> <strong class="text-gov-700">${Number(dataCount).toLocaleString()} 건</strong></p>
      `;

      return {
        id: node.id,
        label: displayLabel,
        title: tooltipEl,
        shape: 'dot',
        size: size,
        font: {
          size: 15,
          face: 'Pretendard, Inter, system-ui',
          color: '#1e293b',
          strokeWidth: 4,
          strokeColor: '#ffffff'
        },
        color: themeColors,
        borderWidth: selectedNodeId === node.id ? 4 : 1.5,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.04)',
          size: 5,
          x: 0,
          y: 2
        }
      };
    });

    // 4단계: Vis.js 포맷 엣지 DataSet 생성
    const visEdges = visibleEdges.map((edge, idx) => {
      // 엣지 굵기: 신뢰도나 주요 키에 맞게 튜닝
      let width = 1.5;
      let style = 'solid';

      if (edge.label === 'LCNS_NO' || edge.label === 'PRDLST_REPORT_NO' || edge.label === 'BAR_CD') {
        width = 2.5; // 핵심 연결 굵게
      }

      return {
        id: `edge_${idx}`,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        font: {
          size: 15,
          face: 'Pretendard, Inter, sans-serif',
          color: '#0f172a',
          background: '#ffffff',
          strokeWidth: 2.5,
          strokeColor: '#cbd5e1',
          align: 'horizontal'
        },
        color: {
          color: selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId) ? '#5999ff' : '#cbd5e1',
          highlight: '#3374f6',
          hover: '#94a3b8'
        },
        width: width,
        hoverWidth: 3.5,
        selectionWidth: 3.5,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.8
          }
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          roundness: 0.2
        }
      };
    });

    // 5단계: Vis.js 그래프 인스턴스 빌드
    const data = {
      nodes: new vis.DataSet(visNodes),
      edges: new vis.DataSet(visEdges)
    };

    const options = {
      nodes: {
        borderWidthSelected: 4,
        scaling: {
          min: 10,
          max: 60
        }
      },
      edges: {
        hoverConnectedNodes: true,
        selectionWidth: function (width) { return width + 2; }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        selectable: true,
        selectConnectedEdges: true
      },
      physics: {
        enabled: activePhysics,
        barnesHut: {
          gravitationalConstant: -3000,
          centralGravity: 0.3,
          springLength: 120,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0.6
        },
        stabilization: {
          enabled: true,
          iterations: 120,
          updateInterval: 25
        }
      }
    };

    // 로딩 오버레이 켜기
    const overlay = container.querySelector('#network-loading-overlay');
    if (overlay) overlay.classList.remove('hidden');

    networkInstance = new vis.Network(canvasContainer, data, options);

    // 배치 완료 시 로딩 끄기
    networkInstance.on("stabilizationIterationsDone", () => {
      if (overlay) overlay.classList.add('hidden');
    });

    // 노드 선택 이벤트 핸들러 바인딩
    networkInstance.on("selectNode", (params) => {
      const nodeId = params.nodes[0];
      selectedNodeId = nodeId;
      showTableDetail(nodeId);
    });

    // 배경 클릭 시 스키마 세부 닫기
    networkInstance.on("deselectNode", () => {
      selectedNodeId = null;
      hideTableDetail();
    });
  };

  // 선택된 버블 노드의 스키마 속성 분석 및 렌더 패널 함수
  const showTableDetail = (nodeId) => {
    const inspector = container.querySelector('#table-inspector-panel');
    if (!inspector) return;

    const ds = getDatasetById(nodeId);
    if (!ds) return;

    inspector.classList.remove('hidden');
    inspector.innerHTML = `
      <div class="flex flex-col gap-5">
        
        <!-- Header Info -->
        <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4 w-full min-w-0">
          <div class="min-w-0 flex-1 break-words">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gov-100 text-gov-800 border border-gov-200">TABLE</span>
              <span class="font-mono text-sm font-bold text-slate-500">${nodeId}</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${subjectColorMap[ds.subject] || 'bg-slate-100 text-slate-700'}">${ds.subject}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <i class="ri-table-line text-gov-600"></i> ${ds.name.split(' (')[0]}
            </h3>
            <p class="text-xs text-slate-500 mt-1">${ds.description}</p>
          </div>

          <div class="flex flex-wrap gap-2 shrink-0">
            <button id="btn-jump-sql" class="px-3.5 py-2 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
              <i class="ri-terminal-box-line"></i> SQL 실행기 연동
            </button>
            <button id="btn-jump-api" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
              <i class="ri-search-eye-line"></i> API 탐색기로 이동
            </button>
          </div>
        </div>

        <!-- 2-Column Details -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <!-- 스키마 물리/논리 속성 표 (2/3 width) -->
          <div class="xl:col-span-2 flex flex-col gap-2">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="ri-database-2-line text-gov-600"></i> 테이블 명세 및 데이터 샘플
              </h4>
              <div class="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button id="btn-inspect-schema" class="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all">스키마 구조</button>
                <button id="btn-inspect-data" class="px-2.5 py-1 text-[11px] font-bold rounded-md text-slate-600 hover:text-slate-800 transition-all">데이터 샘플 (5개행)</button>
              </div>
            </div>
            
            <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto shadow-sm bg-white max-h-[380px] w-full" id="inspect-content-wrapper">
              <table class="w-full text-left border-collapse min-w-[500px]" id="schema-table-element">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th class="px-4 py-3">컬럼 물리명 (field)</th>
                    <th class="px-4 py-3">컬럼 논리명 (kor_nm)</th>
                    <th class="px-4 py-3">데이터 타입</th>
                    <th class="px-4 py-3 text-center">물리 제약</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs text-slate-700" id="schema-tbody-target">
                  <!-- Loading spinner inside tbody -->
                  <tr>
                    <td colspan="4" class="px-4 py-8 text-center text-slate-400">
                      <div class="inline-block w-4 h-4 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-2 align-middle"></div>
                      라이브 스키마 카탈로그를 로드하고 있습니다...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 연계 세부 시나리오 (1/3 width) -->
          <div class="flex flex-col gap-4">
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4.5">
              <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                <i class="ri-lightbulb-line text-amber-500 text-base"></i> 추천 융합 결합 시나리오
              </h4>
              <ul class="space-y-2 text-xs text-slate-600 leading-relaxed">
                ${ds.detail && ds.detail.scenarios ? ds.detail.scenarios.map(sc => `
                  <li class="flex gap-1.5 items-start">
                    <span class="text-emerald-500 shrink-0 font-bold">✔</span>
                    <span>${sc}</span>
                  </li>
                `).join('') : `
                  <li class="flex gap-1.5 items-start">
                    <span class="text-slate-400">●</span>
                    <span>해당 테이블은 다른 마스터 키(LCNS_NO)와 조인하여 분석 보고서를 구축하기에 적합합니다.</span>
                  </li>
                `}
              </ul>
            </div>

            <!-- 라이브 쿼리 템플릿 -->
            <div class="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-[11px] leading-relaxed relative group">
              <span class="absolute top-2.5 right-2.5 text-[9px] font-bold text-gov-400 bg-gov-950 px-2 py-0.5 rounded border border-gov-800/50">SQL TEMPLATE</span>
              <p class="text-slate-500 mb-2">// 이 테이블을 활용한 기본 쿼리</p>
              <pre class="overflow-x-auto text-emerald-400">${ds.usageExample || `SELECT * FROM ${nodeId} LIMIT 10;`}</pre>
            </div>

          </div>

        </div>

      </div>
    `;

    // Cache elements for tab switching
    const inspectWrapper = inspector.querySelector('#inspect-content-wrapper');
    const schemaTable = inspector.querySelector('#schema-table-element');
    const btnInspectSchema = inspector.querySelector('#btn-inspect-schema');
    const btnInspectData = inspector.querySelector('#btn-inspect-data');

    const loadDataSample = () => {
      inspectWrapper.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          <div class="inline-block w-4 h-4 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-2 align-middle"></div>
          실시간 테이블 데이터를 조회하고 있습니다...
        </div>
      `;

      fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT * FROM "${nodeId}" LIMIT 5` })
      })
        .then(res => res.json())
        .then(rows => {
          if (!rows || rows.length === 0) {
            inspectWrapper.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">테이블에 조회 가능한 데이터 레코드가 없습니다.</div>`;
            return;
          }

          const cols = Object.keys(rows[0]);
          inspectWrapper.innerHTML = `
          <div class="overflow-x-auto w-full">
            <table class="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr class="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  ${cols.map(c => `<th class="px-4 py-3 whitespace-nowrap">${c}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-[11px] text-slate-600 font-mono">
                ${rows.map(row => `
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    ${cols.map(c => {
            const val = row[c];
            const displayVal = val !== null ? String(val).replace(/"/g, '&quot;') : '';
            return `<td class="px-4 py-2.5 truncate max-w-[220px]" title="${displayVal}">${val !== null ? val : '<span class="text-slate-350 italic">null</span>'}</td>`;
          }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        })
        .catch(err => {
          console.error("데이터 샘플 로드 에러:", err);
          inspectWrapper.innerHTML = `<div class="p-8 text-center text-red-500 text-xs">데이터를 조회하는 데 실패했습니다. (테이블이 비어있거나 생성되지 않았을 수 있습니다.)</div>`;
        });
    };

    const loadSchema = () => {
      inspectWrapper.innerHTML = '';
      inspectWrapper.appendChild(schemaTable);

      const tbody = inspector.querySelector('#schema-tbody-target');
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="px-4 py-8 text-center text-slate-400">
            <div class="inline-block w-4 h-4 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-2 align-middle"></div>
            라이브 스키마 카탈로그를 로드하고 있습니다...
          </td>
        </tr>
      `;

      fetch(`/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT field, kor_nm, sql_type, infer_reason FROM api_columns WHERE svc_no = '${nodeId}'` })
      })
        .then(res => res.json())
        .then(data => {
          if (!data || data.length === 0) {
            fetchSchemaFromPragma(nodeId, tbody);
            return;
          }
          tbody.innerHTML = data.map(row => {
            let keyBadge = '';
            if (row.field === 'LCNS_NO' || row.field === 'PRDLST_REPORT_NO' || row.field === 'BAR_CD' || row.field === 'BSSH_NO') {
              keyBadge = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200">KEY</span>`;
            }
            return `
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3 font-mono font-semibold text-slate-800 select-all">${row.field}</td>
              <td class="px-4 py-3 font-medium text-slate-600">${row.kor_nm || '-'}</td>
              <td class="px-4 py-3 font-mono text-[11px] text-slate-500">${row.sql_type || 'VARCHAR'}</td>
              <td class="px-4 py-3 text-center">${keyBadge}</td>
            </tr>
          `;
          }).join('');
        })
        .catch(err => {
          fetchSchemaFromPragma(nodeId, tbody);
        });
    };

    // Toggle button handlers
    btnInspectSchema.addEventListener('click', () => {
      btnInspectSchema.className = 'px-2.5 py-1 text-[11px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all';
      btnInspectData.className = 'px-2.5 py-1 text-[11px] font-bold rounded-md text-slate-600 hover:text-slate-800 transition-all';
      loadSchema();
    });

    btnInspectData.addEventListener('click', () => {
      btnInspectData.className = 'px-2.5 py-1 text-[11px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all';
      btnInspectSchema.className = 'px-2.5 py-1 text-[11px] font-bold rounded-md text-slate-600 hover:text-slate-800 transition-all';
      loadDataSample();
    });

    // Default load schema
    loadSchema();

    // 쿼리 플레이그라운드로 점프 액션 리스너
    const btnJumpSql = inspector.querySelector('#btn-jump-sql');
    if (btnJumpSql) {
      btnJumpSql.addEventListener('click', () => {
        const queryText = ds.usageExample || `SELECT * FROM ${nodeId} LIMIT 10;`;
        window.sqlPlaygroundAutoQuery = queryText;
        const sqlTabBtn = document.querySelector('[data-tab="sql-playground"], [data-nav="sql-playground"]');
        if (sqlTabBtn) sqlTabBtn.click();
      });
    }

    // API Explorer로 점프 액션 리스너
    const btnJumpApi = inspector.querySelector('#btn-jump-api');
    if (btnJumpApi) {
      btnJumpApi.addEventListener('click', () => {
        window.apiExplorerAutoSearch = nodeId;
        const apiTabBtn = document.querySelector('[data-tab="api-explorer"], [data-nav="api-explorer"]');
        if (apiTabBtn) apiTabBtn.click();
      });
    }
  };

  // PRAGMA table_info 기반 스키마 폴백 로직
  const fetchSchemaFromPragma = (nodeId, tbody) => {
    fetch(`/api/tables/${nodeId}/schema`)
      .then(res => res.json())
      .then(pragmaRows => {
        if (!pragmaRows || pragmaRows.length === 0) {
          tbody.innerHTML = `<tr><td colspan="4" class="px-4 py-6 text-center text-rose-500">스키마 정보를 로드할 수 없습니다.</td></tr>`;
          return;
        }

        tbody.innerHTML = pragmaRows.map(row => {
          let keyBadge = '';
          if (row.pk === 1) {
            keyBadge = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-gov-100 text-gov-800 border border-gov-200">PK</span>`;
          } else if (row.name === 'LCNS_NO' || row.name === 'PRDLST_REPORT_NO' || row.name === 'BAR_CD' || row.name === 'BSSH_NO') {
            keyBadge = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200">KEY</span>`;
          }

          return `
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3 font-mono font-semibold text-slate-800 select-all">${row.name}</td>
              <td class="px-4 py-3 text-slate-400 font-normal italic">-</td>
              <td class="px-4 py-3 font-mono text-[11px] text-slate-500">${row.type || 'TEXT'}</td>
              <td class="px-4 py-3 text-center">${keyBadge}</td>
            </tr>
          `;
        }).join('');
      })
      .catch(err => {
        tbody.innerHTML = `<tr><td colspan="4" class="px-4 py-6 text-center text-rose-500">네트워크 연결 오류로 로드 실패: ${err.message}</td></tr>`;
      });
  };

  const hideTableDetail = () => {
    const inspector = container.querySelector('#table-inspector-panel');
    if (inspector) inspector.classList.add('hidden');
  };

  const bindEvents = () => {
    // 0. 키워드 검색 → 테이블명 + 컬럼명/한글명 통합 검색 후 인라인 필터링
    const kwInput = container.querySelector('#rdm-keyword-input');
    const kwBtn   = container.querySelector('#rdm-keyword-btn');
    const kwClear = container.querySelector('#rdm-keyword-clear');

    // (columnMatchedIds는 외부 스코프에 선언됨)

    const updateKeywordUI = (kw) => {
      const badge = container.querySelector('#rdm-keyword-badge');
      if (!badge) return;
      if (kw) {
        const colCount = columnMatchedIds.size;
        badge.textContent = `"${kw}" — 컬럼 매칭 ${colCount}개 테이블 포함`;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    };

    const doSearch = async () => {
      const kw = kwInput ? kwInput.value.trim() : '';
      if (!kw) {
        columnMatchedIds = new Set();
        activeKeyword = '';
        maxNodesLimit = 30;
        updateKeywordUI('');
        initNetwork();
        return;
      }

      // 버튼 로딩 상태
      kwBtn.disabled = true;
      kwBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 스캔 중...';

      const badge = container.querySelector('#rdm-keyword-badge');
      if (badge) { badge.textContent = `"${kw}" 전체 데이터 스캔 중...`; badge.classList.remove('hidden'); }

      // 실제 테이블 데이터 + 컬럼 메타 통합 검색
      try {
        const res = await fetch(`/api/column-search?keyword=${encodeURIComponent(kw)}`);
        const json = await res.json();
        columnMatchedIds = new Set(json.tables || []);
      } catch (_) {
        columnMatchedIds = new Set();
      }

      kwBtn.disabled = false;
      kwBtn.innerHTML = '<i class="ri-node-tree text-sm"></i> 검색';

      activeKeyword = kw;
      maxNodesLimit = 9999;
      updateKeywordUI(kw);
      initNetwork();
    };

    if (kwBtn)   kwBtn.addEventListener('click', doSearch);
    if (kwInput) kwInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
    if (kwClear) {
      kwClear.addEventListener('click', () => {
        if (kwInput) kwInput.value = '';
        columnMatchedIds = new Set();
        activeKeyword = '';
        maxNodesLimit = 30;
        updateKeywordUI('');
        initNetwork();
      });
    }

    // 1. 도메인 분류 필터 변경 시 관계도 실시간 갱신
    container.querySelectorAll('[data-filter="domain"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        selectedDomains[key] = e.target.checked;
        initNetwork();
      });
    });

    // 2. 조인키 분류 필터 변경 시 갱신
    container.querySelectorAll('[data-filter="key"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        selectedKeys[key] = e.target.checked;
        initNetwork();
      });
    });

    // 3. 도메인 반전 버튼 이벤트
    const btnAllDom = container.querySelector('#btn-all-domains-toggle');
    if (btnAllDom) {
      btnAllDom.addEventListener('click', () => {
        Object.keys(selectedDomains).forEach(k => {
          selectedDomains[k] = !selectedDomains[k];
        });
        render();
      });
    }

    // 4. 조인키 반전 버튼 이벤트
    const btnAllKeys = container.querySelector('#btn-all-keys-toggle');
    if (btnAllKeys) {
      btnAllKeys.addEventListener('click', () => {
        Object.keys(selectedKeys).forEach(k => {
          selectedKeys[k] = !selectedKeys[k];
        });
        render();
      });
    }

    // 5. 정렬 중력(Physics) 가동 이벤트 토글
    const physicsToggle = container.querySelector('#physics-toggle');
    if (physicsToggle) {
      physicsToggle.addEventListener('change', (e) => {
        activePhysics = e.target.checked;
        if (networkInstance) {
          networkInstance.setOptions({ physics: { enabled: activePhysics } });
        }
      });
    }

    // 6. 노드 개수 한계 필터 변경 시
    const maxNodesSelect = container.querySelector('#max-nodes-select');
    if (maxNodesSelect) {
      maxNodesSelect.addEventListener('change', (e) => {
        maxNodesLimit = parseInt(e.target.value);
        initNetwork();
      });
    }

    // 7. 한눈에 보기(Fit screen) 버튼 클릭 시
    const btnFit = container.querySelector('#btn-fit-screen');
    if (btnFit) {
      btnFit.addEventListener('click', () => {
        if (networkInstance) {
          networkInstance.fit({
            animation: {
              duration: 800,
              easingFunction: "easeInOutQuad"
            }
          });
        }
      });
    }

    // 8. PNG 저장 버튼 — position:fixed 오프스크린 렌더링으로 클리핑 완전 방지
    const btnCapture = container.querySelector('#btn-capture-graph');
    if (btnCapture) {
      btnCapture.addEventListener('click', () => {
        if (!networkInstance) return;

        btnCapture.disabled = true;
        btnCapture.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 캡처 중...';

        const EXPORT_W = 4000;
        const EXPORT_H = 3000;

        // ── 1. 렌더링 전용 오프스크린 컨테이너 생성 (fixed, 화면 밖) ──
        const offEl = document.createElement('div');
        offEl.style.cssText = `
          position: fixed;
          top: 0; left: 0;
          width: ${EXPORT_W}px;
          height: ${EXPORT_H}px;
          z-index: -9999;
          pointer-events: none;
          overflow: visible;
          background: #f8fafc;
        `;
        document.body.appendChild(offEl);

        // ── 2. 노드·엣지 DataSet 백업 후 캡처용 스타일 적용 ─────────
        const nodesDS = networkInstance.body.data.nodes;
        const edgesDS = networkInstance.body.data.edges;

        const origNodes = nodesDS.get().map(n => ({
          id: n.id, size: n.size, font: n.font, borderWidth: n.borderWidth, shadow: n.shadow
        }));
        const origEdges = edgesDS.get().map(e => ({
          id: e.id, font: e.font, width: e.width
        }));

        nodesDS.update(origNodes.map(n => ({
          id: n.id,
          size: (n.size || 20) * 1.3,
          font: { size: 40, face: 'Pretendard, Inter, system-ui', color: '#0f172a', strokeWidth: 7, strokeColor: '#ffffff' },
          borderWidth: 4,
          shadow: { enabled: true, color: 'rgba(0,0,0,0.12)', size: 10, x: 0, y: 2 }
        })));
        edgesDS.update(origEdges.map(e => ({
          id: e.id,
          width: 4,
          font: { size: 30, face: 'Pretendard, Inter, system-ui', color: '#0f172a', strokeWidth: 5, strokeColor: '#ffffff', background: '#ffffff' }
        })));

        // ── 3. 오프스크린 컨테이너에 새 Network 인스턴스 생성 ─────────
        const positions = networkInstance.getPositions();
        const currentData = {
          nodes: new vis.DataSet(nodesDS.get()),
          edges: new vis.DataSet(edgesDS.get())
        };

        const exportNet = new vis.Network(offEl, currentData, {
          nodes: { borderWidthSelected: 4, scaling: { min: 10, max: 80 } },
          edges: { hoverConnectedNodes: false },
          interaction: { dragNodes: false, zoomView: false, dragView: false },
          physics: { enabled: false },
          layout: { improvedLayout: false }
        });

        // 현재 레이아웃 포지션 그대로 복사
        exportNet.setOptions({ physics: { enabled: false } });
        const posUpdate = Object.keys(positions).map(id => ({
          id, x: positions[id].x, y: positions[id].y
        }));
        posUpdate.forEach(p => {
          try { exportNet.moveNode(p.id, p.x, p.y); } catch(_) {}
        });

        exportNet.fit({ animation: false });

        // ── 4. 렌더 완료 후 캔버스 캡처 및 픽셀 크롭 ─────────────────
        setTimeout(() => {
          exportNet.fit({ animation: false });

          setTimeout(() => {
            const canvas = offEl.querySelector('canvas');
            if (!canvas) {
              cleanup(); return;
            }

            // 흰 배경 합성
            const full = document.createElement('canvas');
            full.width  = canvas.width;
            full.height = canvas.height;
            const fCtx = full.getContext('2d', { willReadFrequently: true });
            fCtx.fillStyle = '#f8fafc';
            fCtx.fillRect(0, 0, full.width, full.height);
            fCtx.drawImage(canvas, 0, 0);

            // 픽셀 스캔으로 실제 콘텐츠 영역 탐색
            const W = full.width, H = full.height;
            const data = fCtx.getImageData(0, 0, W, H).data;
            const bgR = 248, bgG = 250, bgB = 252;
            const THR = 15;
            let top = H, bottom = 0, left = W, right = 0;
            for (let y = 0; y < H; y += 3) {
              for (let x = 0; x < W; x += 3) {
                const i = (y * W + x) * 4;
                if (Math.abs(data[i]-bgR)>THR || Math.abs(data[i+1]-bgG)>THR || Math.abs(data[i+2]-bgB)>THR) {
                  if (x < left)   left   = x;
                  if (x > right)  right  = x;
                  if (y < top)    top    = y;
                  if (y > bottom) bottom = y;
                }
              }
            }

            const PAD = 100;
            const cx = Math.max(0, left - PAD);
            const cy = Math.max(0, top  - PAD);
            const cw = Math.min(W, right  + PAD) - cx;
            const ch = Math.min(H, bottom + PAD) - cy;

            const out = document.createElement('canvas');
            out.width  = cw > 0 ? cw : W;
            out.height = ch > 0 ? ch : H;
            const oCtx = out.getContext('2d');
            oCtx.fillStyle = '#f8fafc';
            oCtx.fillRect(0, 0, out.width, out.height);
            oCtx.drawImage(full, cx, cy, out.width, out.height, 0, 0, out.width, out.height);

            const link = document.createElement('a');
            link.download = `식품안전_공공데이터_관계도_${new Date().toISOString().slice(0, 10)}.png`;
            link.href = out.toDataURL('image/png', 1.0);
            link.click();

            cleanup();
          }, 400);
        }, 600);

        const cleanup = () => {
          // 오프스크린 DOM 제거
          try { document.body.removeChild(offEl); } catch(_) {}
          // 원래 노드·엣지 복원
          nodesDS.update(origNodes);
          edgesDS.update(origEdges);
          btnCapture.disabled = false;
          btnCapture.innerHTML = '<i class="ri-camera-line"></i> PNG 저장';
        };
      });
    }
  };

  render();
  fetchRelationships();
}
