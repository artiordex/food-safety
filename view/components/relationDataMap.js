import { getDatasets } from '../datasetStore.js';

const subjectColorMap = {
  '융합 데이터 세트': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  '식품·제품': 'bg-teal-50 text-teal-700 border-teal-200',
  '업체·영업자': 'bg-gov-50 text-gov-700 border-gov-200',
  '원재료·첨가물': 'bg-rose-50 text-rose-700 border-rose-200',
  '영양·건강': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '수입식품': 'bg-amber-50 text-amber-700 border-amber-200',
  '농·축·수산물': 'bg-violet-50 text-violet-700 border-violet-200',
  '기타': 'bg-slate-50 text-slate-700 border-slate-200'
};

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
function dynamicallyCategorizeDatasets(datasets) {
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

export async function renderRelationDataMap(container, onSelectDataset) {
  const datasets = await getDatasets();
  const allNodes = datasets.map(ds => ({
    id: ds.id,
    label: ds.name ? ds.name.split(' (')[0] : ds.id,
    type: 'data',
    datasets: [ds.id]
  }));
  dynamicallyCategorizeDatasets(datasets);
  let activeDomainId = 'all';
  let maxNodesLimit = 30;
  let activePhysics = true;
  let selectedNodeId = null;
  let networkInstance = null;
  let relationships = [];
  let activeKeyword = '';
  let columnMatchedIds = new Set();

  let allColumnsMap = {}; // { svc_no: [{ field, type, kor_nm }, ...] }

  // XML 특수문자 이스케이프 유틸
  const escapeXml = (unsafe) => {
    if (!unsafe) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // SVG HTML 카드 노드 동적 생성
  const createTableSvg = (tableName, tableKorName, columns) => {
    let rowsHtml = '';
    columns.forEach((col, idx) => {
      const bg = idx % 2 === 0 ? 'transparent' : '#f8fafc';
      let keyIcon = '';
      if (col.field === 'LCNS_NO' || col.field === 'PRDLST_REPORT_NO' || col.field === 'BAR_CD' || col.field === 'BSSH_NO') {
        keyIcon = '🔑 ';
      }
      rowsHtml += `
        <tr style="border-bottom: 1px solid #f1f5f9; background: ${bg}; height: 18px;">
          <td style="padding: 3px 5px; font-family: monospace; color: #1e293b; font-weight: 600; font-size: 8.5px; white-space: nowrap; max-width: 85px; overflow: hidden; text-overflow: ellipsis;">
            ${keyIcon}${escapeXml(col.field)}
          </td>
          <td style="padding: 3px 3px; color: #2563eb; font-size: 7.5px; font-family: monospace; white-space: nowrap;">
            ${escapeXml(col.type || 'VARCHAR')}
          </td>
          <td style="padding: 3px 5px; color: #64748b; font-size: 8px; text-align: right; white-space: nowrap; max-width: 85px; overflow: hidden; text-overflow: ellipsis;">
            ${escapeXml(col.kor_nm || '-')}
          </td>
        </tr>
      `;
    });

    const width = 230;
    const headerHeight = 26;
    const rowHeight = 18;
    // 최대 7개행 정도만 보여주어 캔버스가 너무 커지는 것 방지
    const displayColsCount = columns.length;
    const contentHeight = 20 + (displayColsCount * rowHeight);
    const totalHeight = headerHeight + contentHeight + 4;

    const html = `
      <div xmlns="http://www.w3.org/1999/xhtml" style="width: ${width}px; height: ${totalHeight}px; font-family: system-ui, -apple-system, sans-serif; box-sizing: border-box; background: #ffffff; border: 1.5px solid #64748b; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: #ffffff; padding: 4px 8px; font-weight: bold; font-size: 10px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e3a8a;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px;">${escapeXml(tableName)}</span>
          <span style="font-size: 8px; background: rgba(255, 255, 255, 0.25); padding: 1px 4px; border-radius: 3px; font-weight: normal; margin-left: auto; white-space: nowrap;">${escapeXml(tableKorName.split(' (')[0])}</span>
        </div>
        <div style="background: #ffffff; height: ${contentHeight}px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
            <thead>
              <tr style="background: #f1f5f9; border-bottom: 1px solid #e2e8f0; height: 18px;">
                <th style="width: 90px; padding: 2px 5px; text-align: left; color: #475569; font-weight: 600; font-size: 7.5px;">컬럼명</th>
                <th style="width: 55px; padding: 2px 3px; text-align: left; color: #475569; font-weight: 600; font-size: 7.5px;">타입</th>
                <th style="width: 85px; padding: 2px 5px; text-align: right; color: #475569; font-weight: 600; font-size: 7.5px;">한글명</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}">
        <foreignObject width="100%" height="100%">
          ${html}
        </foreignObject>
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const fetchAllColumns = async () => {
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT svc_no, field, kor_nm, sql_type FROM api_columns ORDER BY svc_no, col_seq` })
      });
      if (res.ok) {
        const rows = await res.json();
        allColumnsMap = {};
        rows.forEach(r => {
          if (!allColumnsMap[r.svc_no]) {
            allColumnsMap[r.svc_no] = [];
          }
          // 노드 카드가 무한히 길어지지 않도록 한 카드당 최대 8개 컬럼만 리스트업
          if (allColumnsMap[r.svc_no].length < 8) {
            allColumnsMap[r.svc_no].push({
              field: r.field,
              type: r.sql_type || 'VARCHAR',
              kor_nm: r.kor_nm || '-'
            });
          }
        });
      }
    } catch (e) {
      console.warn('[DataMap] Failed to pre-fetch all columns:', e);
    }
  };

  const fetchRelationships = async () => {
    try {
      await fetchAllColumns(); // 컬럼 정보 사전 적재 수행
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
          <div class="flex-1 flex flex-col gap-6 min-w-0 w-full relative">
            
            <!-- 메인 가동 캔버스 카드 -->
            <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[290px] relative">
              
              <!-- 캔버스 컨트롤 헤더 -->
              <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
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

              <!-- 관계도 그리기 캔버스 및 우측 슬라이드인 사이드바 영역 -->
              <div class="flex-1 bg-slate-50/20 relative flex overflow-hidden" style="height: 700px; width: 100%;">
                
                <!-- 캔버스 자체 -->
                <div class="flex-1 h-full" id="network-graph-canvas"></div>
                
                <!-- 우측 슬라이드 오버레이 사이드바 패널 (캔버스 내부 플로팅 위젯화) -->
                <div id="table-inspector-panel" class="absolute top-4 right-4 h-[calc(100%-2rem)] w-[380px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl z-30 transform translate-x-[calc(100%+2rem)] transition-all duration-300 flex flex-col hidden">
                  <!-- Dynamic inspector injected here -->
                </div>

              </div>
              
              <!-- 로딩 또는 힌트 메세지 오버레이 -->
              <div id="network-loading-overlay" class="absolute inset-0 bg-white/80 z-20 flex items-center justify-center hidden">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-8 h-8 rounded-full border-4 border-slate-200 border-t-gov-600 animate-spin"></div>
                  <span class="text-xs text-slate-500 font-medium">대용량 관계망 구조 분석 및 정렬 배치 중...</span>
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
    let visibleNodes = allNodes.filter(node => {
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
        : [];
      edgesToUseEarly.forEach(edge => {
        if (matchedIds.has(edge.from) && filteredNodeIds.has(edge.to)) matchedIds.add(edge.to);
        if (matchedIds.has(edge.to) && filteredNodeIds.has(edge.from)) matchedIds.add(edge.from);
      });
      visibleNodes = allNodes.filter(n => matchedIds.has(n.id));
    }

    // 노드 개수 리밋 적용
    if (visibleNodes.length > maxNodesLimit && !activeKeyword) {
      visibleNodes = visibleNodes.slice(0, maxNodesLimit);
    }

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // 2단계: 핵심 조인키 기준 연계선 필터링
    let edgesToUse = [...[]];
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
      const logicalLabel = ds ? ds.name.split(' (')[0] : node.label;

      const cols = allColumnsMap[node.id] || [];

      // 툴팁 구성
      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'p-2.5 text-xs font-sans text-slate-700 leading-relaxed max-w-xs';
      tooltipEl.innerHTML = `
        <p class="font-bold text-slate-900 mb-1">${logicalLabel} (${node.id})</p>
        <p class="mb-1"><span class="text-slate-400">도메인:</span> <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${subject}</span></p>
        <p class="mb-1"><span class="text-slate-400">보존 레코드:</span> <strong class="text-gov-700">${Number(dataCount).toLocaleString()} 건</strong></p>
        <p class="text-[10px] text-slate-400 border-t border-slate-100 pt-1 mt-1">💡 더블클릭 시 데이터 탐색기로 연결</p>
      `;

      if (cols.length > 0) {
        // [테이블 컬럼 포함형 SVG 카드 카드 노드]
        const svgUrl = createTableSvg(node.id, logicalLabel, cols);
        return {
          id: node.id,
          label: '', // 카드 안에 텍스트가 다 내장되어 있으므로 노드 하단 텍스트 레이블 제거
          title: tooltipEl,
          shape: 'image',
          image: svgUrl,
          size: 90, // 선명하게 카드 렌더링
          borderWidth: selectedNodeId === node.id ? 4 : 1.5,
          color: {
            border: selectedNodeId === node.id ? '#1e3a8a' : '#94a3b8'
          },
          shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.1)',
            size: 8,
            x: 0,
            y: 3
          }
        };
      } else {
        // [폴백 버블 노드]
        const size = Math.log10(dataCount || 10) * 12 + 10;
        const themeColors = subjectColors[subject] || subjectColors['기타'];
        const displayLabel = `${node.id}\n${logicalLabel}`;
        return {
          id: node.id,
          label: displayLabel,
          title: tooltipEl,
          shape: 'dot',
          size: size,
          font: {
            size: 14,
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
      }
    });

    // 4단계: Vis.js 포맷 엣지 DataSet 생성
    const getRelationType = (fromT, toT, key) => {
      // Unique/PK 테이블 식별
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

    const visEdges = visibleEdges.map((edge, idx) => {
      // 엣지 굵기: 신뢰도나 주요 키에 맞게 튜닝
      let width = 1.5;
      let style = 'solid';

      const baseLabel = edge.label.split(' ')[0];
      if (baseLabel === 'LCNS_NO' || baseLabel === 'PRDLST_REPORT_NO' || baseLabel === 'BAR_CD') {
        width = 2.5; // 핵심 연결 굵게
      }

      // 1:1, 1:N, N:M 기호 도출 및 레이블 합성
      const relType = getRelationType(edge.from, edge.to, baseLabel);
      const displayEdgeLabel = `(${relType}) ${baseLabel}`;

      return {
        id: `edge_${idx}`,
        from: edge.from,
        to: edge.to,
        label: displayEdgeLabel,
        font: {
          size: 11,
          face: 'Pretendard, Inter, sans-serif',
          color: '#334155',
          background: '#ffffff',
          strokeWidth: 2,
          strokeColor: '#f1f5f9',
          align: 'horizontal'
        },
        color: {
          color: selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId) ? '#3b82f6' : '#cbd5e1',
          highlight: '#2563eb',
          hover: '#64748b'
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
          type: 'continuous', // 직선처럼 정렬되면서도 뭉칠 때 곡선으로 휘어지는 고급형
          roundness: 0.18
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
          gravitationalConstant: -4000,
          centralGravity: 0.1,
          springLength: 180,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 1.0
        },
        stabilization: {
          enabled: true,
          iterations: 500,
          updateInterval: 50
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

    // 노드 및 엣지(연결선) 선택 통합 이벤트 핸들러 바인딩
    networkInstance.on("select", (params) => {
      if (params.nodes && params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        selectedNodeId = nodeId;
        showTableDetail(nodeId);
      } else if (params.edges && params.edges.length > 0) {
        selectedNodeId = null;
        const edgeId = params.edges[0];
        showEdgeDetail(edgeId);
      } else {
        selectedNodeId = null;
        hideTableDetail();
      }
    });
  };

  // 선택된 버블 노드의 스키마 속성 분석 및 렌더 패널 함수 (사이드바 버전)
  const showTableDetail = (nodeId) => {
    const inspector = container.querySelector('#table-inspector-panel');
    if (!inspector) return;

    const ds = getDatasetById(nodeId);
    if (!ds) return;

    inspector.classList.remove('hidden');
    // 약간의 딜레이 후 클래스 제거하여 부드러운 슬라이드인 애니메이션 효과 부여
    setTimeout(() => {
      inspector.classList.remove('translate-x-[calc(100%+2rem)]');
    }, 10);

    inspector.innerHTML = `
      <!-- Sidebar Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gov-100 text-gov-800 border border-gov-200">TABLE</span>
            <span class="font-mono text-xs font-bold text-slate-500 truncate max-w-[120px] block" title="${nodeId}">${nodeId}</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${subjectColorMap[ds.subject] || 'bg-slate-100 text-slate-700'}">${ds.subject}</span>
          </div>
          <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <i class="ri-table-line text-gov-600"></i> ${ds.name.split(' (')[0]}
          </h3>
          <p class="text-[10px] text-slate-400 mt-0.5 line-clamp-1">${ds.description}</p>
        </div>
        <button id="btn-close-inspector" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-500 shrink-0 ml-2">
          <i class="ri-close-line text-lg"></i>
        </button>
      </div>

      <!-- Sidebar Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-5 space-y-6">
        
        <!-- 1구역: 테이블 컬럼 명세 (Schema) -->
        <div class="flex flex-col gap-2">
          <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <i class="ri-article-line text-gov-600"></i> 테이블 컬럼 명세 (Schema)
          </h4>
          <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto shadow-sm bg-white max-h-[190px] w-full">
            <table class="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 bg-slate-50 z-10">
                  <th class="px-3 py-2 bg-slate-50">컬럼명</th>
                  <th class="px-3 py-2 bg-slate-50">타입</th>
                  <th class="px-3 py-2 bg-slate-50 text-right">한글명</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700" id="schema-tbody-target">
                <tr>
                  <td colspan="3" class="px-3 py-6 text-center text-slate-400">
                    <div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1.5 align-middle"></div>
                    컬럼 명세를 조회하고 있습니다...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2구역: 실제 데이터 샘플 (최대 50개행) -->
        <div class="flex flex-col gap-2">
          <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <i class="ri-database-2-line text-gov-600"></i> 데이터 레코드 샘플 (최대 50개행 미리보기)
          </h4>
          <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto shadow-sm bg-white max-h-[300px] w-full" id="data-sample-wrapper">
            <div class="px-3 py-6 text-center text-slate-400 text-xs">
              <div class="inline-block w-3 h-3 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-1.5 align-middle"></div>
              실시간 레코드 데이터를 로드하고 있습니다...
            </div>
          </div>
        </div>

        <!-- 3구역: 데이터 연계 흐름 구조도 (다중 JOIN) -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 class="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <i class="ri-node-tree text-gov-600 text-base"></i> 데이터 연계 흐름 구조도 (다중 JOIN)
          </h4>
          
          <!-- Dynamic Flowchart based on table -->
          ${(() => {
            let flowHTML = '';
            let scenarioTitle = '기본 업체 기준 연계';
            let scenarioDesc = '인허가번호(LCNS_NO)를 기준으로 업체의 기본 정보 및 제조 품목 현황을 융합합니다.';
            let targetSql = `SELECT A.BSSH_NM, B.PRDLST_NM FROM "I2500" A INNER JOIN "I1250" B ON A.LCNS_NO = B.LCNS_NO LIMIT 10;`;

            if (nodeId === 'I2500' || nodeId === 'I1250' || nodeId === 'C002') {
              scenarioTitle = '제조사 ↔ 품목제조 ↔ 원재료 성분';
              scenarioDesc = '업체 인허가 정보와 제품 목록, 제품별 상세 고유 원재료 성분을 연쇄 매핑합니다.';
              targetSql = `SELECT A.BSSH_NM AS "제조사명", B.PRDLST_NM AS "제품명", C.RAWMTRL_NM AS "원재료명" FROM "I2500" A INNER JOIN "I1250" B ON A.LCNS_NO = B.LCNS_NO INNER JOIN "C002" C ON B.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO LIMIT 15;`;
              flowHTML = `
                <div class="flex flex-col gap-1.5 items-center my-2 bg-white p-2 rounded border border-slate-100 shadow-inner text-[10px]">
                  <div class="font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded w-full text-center">업체 인허가 (I2500)</div>
                  <div class="text-[9px] text-slate-400 font-mono">↓ LCNS_NO</div>
                  <div class="font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded w-full text-center">품목제조보고 (I1250)</div>
                  <div class="text-[9px] text-slate-400 font-mono">↓ PRDLST_REPORT_NO</div>
                  <div class="font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded w-full text-center">원재료 상세 (C002)</div>
                </div>
              `;
            }
            else if (nodeId === 'I0470' || nodeId === 'I0482') {
              scenarioTitle = '위반 행정처분 ↔ 업체 연락처 연계';
              scenarioDesc = '행정처분을 받은 위해 업소의 처분 내역과 해당 업소의 정확한 실시간 연락처 및 주소를 결합 조회합니다.';
              targetSql = `SELECT A.PRCSCITYPOINT_BSSHNM AS "업소명", A.VILTCN AS "위반사항", B.DSPSCN AS "처분내용", C.ADDR AS "소재지주소", C.TELNO AS "대표전화" FROM "I0470" A INNER JOIN "I0482" B ON A.DSPSDTLS_SEQ = B.DSPSDTLS_SEQ INNER JOIN "I2500" C ON A.PRCSCITYPOINT_BSSHNM = C.BSSH_NM LIMIT 10;`;
              flowHTML = `
                <div class="flex flex-col gap-1.5 items-center my-2 bg-white p-2 rounded border border-slate-100 shadow-inner text-[10px]">
                  <div class="font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded w-full text-center">행정처분 이력 (I0470)</div>
                  <div class="text-[9px] text-slate-400 font-mono">↓ DSPSDTLS_SEQ</div>
                  <div class="font-bold px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded w-full text-center">행정처분 상세 (I0482)</div>
                  <div class="text-[9px] text-slate-400 font-mono">↓ BSSH_NM (업체명 매칭)</div>
                  <div class="font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded w-full text-center">업체 인허가 (I2500)</div>
                </div>
              `;
            }
            else if (['I2530', 'I0940', 'I0490', 'C001', 'I1260'].includes(nodeId)) {
              scenarioTitle = '5차 연쇄 체인 JOIN (위해성 추적)';
              scenarioDesc = '시험항목 규격과 실제 위해 유통 적발 제품, 통관 정보, 최종 행정처분까지 연쇄 결합합니다.';
              targetSql = `SELECT A.TESTITM_CD, A.KOR_NM, B.PRDLST_CD, B.PC_KOR_NM, C.PRDTNM, C.RTRVLPRVNS, D.BSSH_NM, E.BSSH_NM FROM "I2530" A INNER JOIN "I0940" B ON A.TESTITM_CD = B.TESTITM_CD INNER JOIN "I0490" C ON B.PRDLST_CD = C.PRDLST_CD INNER JOIN "C001" D ON C.LCNS_NO = D.LCNS_NO INNER JOIN "I1260" E ON D.LCNS_NO = E.LCNS_NO WHERE A.TESTITM_CD IS NOT NULL LIMIT 8;`;
              flowHTML = `
                <div class="flex flex-col gap-1.5 items-center my-2 bg-white p-2 rounded border border-slate-100 shadow-inner max-h-[160px] overflow-y-auto text-[9px]">
                  <div class="font-bold px-1 py-0.5 bg-teal-50 text-teal-700 border border-teal-100 rounded w-full text-center">시험검사 (I2530)</div>
                  <div class="text-[8px] text-slate-400 font-mono">↓ TESTITM_CD</div>
                  <div class="font-bold px-1 py-0.5 bg-slate-50 text-slate-700 border border-slate-100 rounded w-full text-center">기준규격 (I0940)</div>
                  <div class="text-[8px] text-slate-400 font-mono">↓ PRDLST_CD</div>
                  <div class="font-bold px-1 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded w-full text-center">위해회수 (I0490)</div>
                  <div class="text-[8px] text-slate-400 font-mono">↓ LCNS_NO</div>
                  <div class="font-bold px-1 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded w-full text-center">수입통관 (C001)</div>
                  <div class="text-[8px] text-slate-400 font-mono">↓ LCNS_NO</div>
                  <div class="font-bold px-1 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded w-full text-center">행정처분 (I1260)</div>
                </div>
              `;
            }
            else {
              flowHTML = `
                <div class="flex flex-col gap-1.5 items-center my-2 bg-white p-2 rounded border border-slate-100 shadow-inner text-[10px]">
                  <div class="font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded w-full text-center">${nodeId} (현재)</div>
                  <div class="text-[9px] text-slate-400 font-mono">↓ LCNS_NO</div>
                  <div class="font-bold px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-100 rounded w-full text-center">식품업체 인허가 (I2500)</div>
                </div>
              `;
            }

            return `
              <div class="text-[11px] font-bold text-slate-700 mb-0.5">${scenarioTitle}</div>
              <div class="text-[10px] text-slate-500 leading-normal mb-2">${scenarioDesc}</div>
              ${flowHTML}
              <button id="btn-flow-jump-sql" data-sql="${encodeURIComponent(targetSql)}" class="w-full mt-1.5 py-1.5 bg-gov-50 hover:bg-gov-100 text-gov-700 border border-gov-200 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5">
                <i class="ri-terminal-box-line"></i> 이 시나리오 SQL 실행기 연동
              </button>
            `;
          })()}
        </div>

      </div>

      <!-- Sidebar Action Footer -->
      <div class="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button id="btn-jump-sql" class="flex-1 py-2 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5">
          <i class="ri-terminal-box-line"></i> SQL 실행기
        </button>
        <button id="btn-jump-api" class="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
          <i class="ri-search-eye-line"></i> API 탐색기
        </button>
      </div>
    `;

    // Cache elements for layout loading
    const tbody = inspector.querySelector('#schema-tbody-target');
    const dataWrapper = inspector.querySelector('#data-sample-wrapper');

    // 1) 스키마 정보 비동기 로드
    let colsMeta = []; // 스키마 컬럼 정보 임시 보관용

    // 공통 데이터 샘플 렌더러
    const renderSampleRows = (rows, isMocked = false) => {
      if (!rows || rows.length === 0) {
        dataWrapper.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">테이블에 적재된 데이터 레코드가 없습니다.</div>`;
        return;
      }
      const cols = Object.keys(rows[0]);
      
      let mockBadge = "";
      if (isMocked) {
        mockBadge = `
          <div class="px-3 py-1.5 bg-amber-50 text-amber-800 text-[9px] font-semibold border-b border-slate-200 flex items-center justify-between">
            <span>⚠️ 이 테이블은 데이터 미적재 상태로, 시뮬레이션용 더미 데이터가 표시됩니다.</span>
            <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">더미 데이터</span>
          </div>
        `;
      }

      dataWrapper.innerHTML = `
        ${mockBadge}
        <div class="overflow-x-auto w-full">
          <table class="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 bg-slate-50 z-10">
                ${cols.map(c => `<th class="px-3 py-2 bg-slate-50">${c}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-[10px] text-slate-600 font-mono">
              ${rows.map(row => `
                <tr class="hover:bg-slate-50/50 transition-colors">
                  ${cols.map(c => {
                    const val = row[c];
                    const displayVal = val !== null ? String(val).replace(/"/g, '&quot;') : '';
                    return `<td class="px-3 py-1.5 truncate max-w-[150px]" title="${displayVal}">${val !== null ? val : '<span class="text-slate-300 italic">null</span>'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    // 실시간 DB 데이터 쿼리 수행
    const loadSampleData = () => {
      fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT * FROM "${nodeId}" LIMIT 50` })
      })
        .then(res => res.json())
        .then(rows => {
          if (!rows || rows.length === 0) {
            // [폴백] 데이터가 없으면 지능형 Mock Data 생성
            const mockData = generateMockRows(colsMeta, 50);
            renderSampleRows(mockData, true);
            return;
          }
          // 실제 데이터 정상 출력
          renderSampleRows(rows, false);
        })
        .catch(err => {
          console.warn("데이터 샘플 실시간 조회 실패, 폴백 더미 데이터 생성:", err);
          const mockData = generateMockRows(colsMeta, 50);
          renderSampleRows(mockData, true);
        });
    };

    // 1) 스키마 정보 비동기 로드
    fetch(`/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `SELECT field, kor_nm, sql_type FROM api_columns WHERE svc_no = '${nodeId}'` })
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          fetchSchemaFromPragma(nodeId, tbody, loadSampleData); // pragma 스키마 검색으로 위임
          return;
        }
        
        colsMeta = data; // 저장
        
        tbody.innerHTML = data.map(row => {
          let keyBadge = '';
          if (row.field === 'LCNS_NO' || row.field === 'PRDLST_REPORT_NO' || row.field === 'BAR_CD' || row.field === 'BSSH_NO') {
            keyBadge = `<span class="px-1 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 ml-1">KEY</span>`;
          }
          return `
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="px-3 py-2 font-mono font-semibold text-slate-800 select-all">${row.field}${keyBadge}</td>
              <td class="px-3 py-2 font-mono text-[10px] text-blue-600">${row.sql_type || 'VARCHAR'}</td>
              <td class="px-3 py-2 text-right text-slate-500 font-medium">${row.kor_nm || '-'}</td>
            </tr>
          `;
        }).join('');

        // 스키마 선인출 완료 후 데이터 호출 진행
        loadSampleData();
      })
      .catch(err => {
        fetchSchemaFromPragma(nodeId, tbody, loadSampleData);
      });

    // 닫기 버튼 리스너 바인딩
    const btnClose = inspector.querySelector('#btn-close-inspector');
    if (btnClose) {
      btnClose.addEventListener('click', hideTableDetail);
    }

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

    // 흐름도 시나리오 SQL 실행기 연동 리스너
    const btnFlowJump = inspector.querySelector('#btn-flow-jump-sql');
    if (btnFlowJump) {
      btnFlowJump.addEventListener('click', () => {
        const queryText = decodeURIComponent(btnFlowJump.dataset.sql);
        window.sqlPlaygroundAutoQuery = queryText;
        const sqlTabBtn = document.querySelector('[data-tab="sql-playground"], [data-nav="sql-playground"]');
        if (sqlTabBtn) sqlTabBtn.click();
      });
    }
  };

  // 공통키 연결선(Edge) 클릭 시 결합 데이터 주르륵 조회해서 사이드바에 렌더링하는 함수
  const showEdgeDetail = (edgeId) => {
    const inspector = container.querySelector('#table-inspector-panel');
    if (!inspector) return;

    const edgeData = networkInstance.body.data.edges.get(edgeId);
    if (!edgeData) return;

    const fromTable = edgeData.from;
    const toTable = edgeData.to;
    let joinKey = edgeData.label.split(' ')[0];
    if (joinKey === 'BARCODE_NO') joinKey = 'BAR_CD';

    inspector.classList.remove('hidden');
    setTimeout(() => {
      inspector.classList.remove('translate-x-[calc(100%+2rem)]');
    }, 10);

    inspector.innerHTML = `
      <!-- Sidebar Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-0.5">
              <i class="ri-key-2-line"></i> JOIN KEY
            </span>
            <span class="font-mono text-xs font-bold text-amber-700">${joinKey}</span>
          </div>
          <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            공통키 융합 데이터 조회
          </h3>
          <p class="text-[10px] text-slate-400 mt-0.5">공통키 결합을 통한 실시간 매칭 레코드를 출력합니다.</p>
        </div>
        <button id="btn-close-inspector" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-500 shrink-0 ml-2">
          <i class="ri-close-line text-lg"></i>
        </button>
      </div>

      <!-- Sidebar Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-5 space-y-6">
        
        <!-- 연계 정보 요약 -->
        <div class="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2.5">
          <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">연계 매핑 정보</div>
          <div class="flex items-center justify-between gap-1 text-[11px] font-mono font-bold text-slate-800">
            <span class="px-2 py-1 bg-white rounded border border-slate-200 truncate max-w-[130px]" title="${fromTable}">${fromTable}</span>
            <span class="text-slate-400">↔</span>
            <span class="px-2 py-1 bg-white rounded border border-slate-200 truncate max-w-[130px]" title="${toTable}">${toTable}</span>
          </div>
          <p class="text-[10px] text-slate-400 leading-normal pt-1.5 border-t border-slate-200/50">
            두 테이블 간에 공통 식별키인 <code class="font-mono text-amber-600 bg-amber-50 px-1 py-0.5 rounded font-semibold">${joinKey}</code>를 기준으로 실제로 일치하는 교집합 레코드들을 융합합니다.
          </p>
        </div>

        <!-- 결합된 실제 데이터 표 (주르륵 뿌려줌) -->
        <div class="flex flex-col gap-2">
          <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <i class="ri-database-2-line text-gov-600"></i> 결합 매칭 데이터 (상위 50개행 미리보기)
          </h4>
          <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto shadow-sm bg-white max-h-[420px] w-full" id="join-data-wrapper">
            <div class="px-4 py-8 text-center text-slate-400 text-xs">
              <div class="inline-block w-4 h-4 rounded-full border-2 border-slate-200 border-t-gov-600 animate-spin mr-2 align-middle"></div>
              공통키 조인 매칭 값을 계산하여 주르륵 불러오는 중...
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar Action Footer -->
      <div class="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button id="btn-edge-jump-sql" class="flex-1 py-2 bg-gov-600 hover:bg-gov-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5">
          <i class="ri-terminal-box-line"></i> 이 조인 쿼리 에디터로 연동
        </button>
      </div>
    `;

    // 닫기 버튼 리스너 바인딩
    const btnClose = inspector.querySelector('#btn-close-inspector');
    if (btnClose) {
      btnClose.addEventListener('click', hideTableDetail);
    }

    const joinDataWrapper = inspector.querySelector('#join-data-wrapper');

    // 융합 쿼리문 디자인
    let fromKey = joinKey;
    let toKey = joinKey;

    // 위해행정처분 예외 매핑
    if (fromTable === 'I0470' && toTable === 'I0482' && joinKey === 'DSPSDTLS_SEQ') {
      fromKey = 'DSPSDTLS_SEQ';
      toKey = 'DSPSDTLS_SEQ';
    }

    // 융합 조인 쿼리문 (50개 한도)
    const sqlQuery = `SELECT A.*, B.* FROM "${fromTable}" A INNER JOIN "${toTable}" B ON A."${fromKey}" = B."${toKey}" LIMIT 50`;

    // 에디터 연동 버튼
    const btnEdgeJump = inspector.querySelector('#btn-edge-jump-sql');
    if (btnEdgeJump) {
      btnEdgeJump.addEventListener('click', () => {
        window.sqlPlaygroundAutoQuery = sqlQuery;
        const sqlTabBtn = document.querySelector('[data-tab="sql-playground"], [data-nav="sql-playground"]');
        if (sqlTabBtn) sqlTabBtn.click();
      });
    }

    const renderJoinRows = (rows, isMock = false) => {
      if (!rows || rows.length === 0) {
        joinDataWrapper.innerHTML = `
          <div class="p-8 text-center text-slate-400 text-xs">
            <i class="ri-error-warning-line text-lg text-slate-300 block mb-1"></i>
            실제 공통키로 묶인 매칭 레코드가 존재하지 않습니다.
          </div>
        `;
        return;
      }

      const cols = Object.keys(rows[0]);
      const mockBadge = isMock ? `
        <div class="px-3 py-1.5 bg-amber-50 text-amber-800 text-[9px] font-semibold border-b border-slate-200 flex items-center justify-between">
          <span>⚠️ 데이터 미적재 관계로 시뮬레이션용 결합 데이터가 표시됩니다.</span>
          <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 font-bold">결합 시뮬레이션</span>
        </div>
      ` : '';

      joinDataWrapper.innerHTML = `
        ${mockBadge}
        <div class="overflow-x-auto w-full">
          <table class="w-full text-left border-collapse min-w-[600px] text-[10px]">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 z-10 bg-slate-50">
                ${cols.map(c => `<th class="px-2.5 py-2 bg-slate-50 whitespace-nowrap">${c}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-mono">
              ${rows.map(row => `
                <tr class="hover:bg-slate-50/50 transition-colors">
                  ${cols.map(c => {
                    const val = row[c];
                    const displayVal = val !== null ? String(val).replace(/"/g, '&quot;') : '';
                    return `<td class="px-2.5 py-1.5 truncate max-w-[120px]" title="${displayVal}">${val !== null ? val : '<span class="text-slate-350 italic">null</span>'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    // 실시간 DB 데이터 쿼리 수행
    fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sqlQuery })
    })
      .then(res => res.json())
      .then(rows => {
        if (!rows || rows.length === 0 || rows.error) {
          if (networkInstance && networkInstance.body && networkInstance.body.data && networkInstance.body.data.edges) {
            // 해당 데이터가 존재하지 않으면 연결을 조용히 없앰
            const edgesDS = networkInstance.body.data.edges;
            const edgesToRemove = edgesDS.get().filter(e => 
              (e.from === fromTable && e.to === toTable) || 
              (e.from === toTable && e.to === fromTable)
            );
            edgesToRemove.forEach(e => edgesDS.remove(e.id));
          }
          hideTableDetail();
          return;
        }
        renderJoinRows(rows, false);
      })
      .catch(err => {
        console.warn("공통키 결합 데이터 쿼리 실패:", err);
        renderJoinRows([], false);
      });
  };

  // PRAGMA table_info 기반 스키마 폴백 로직
  const fetchSchemaFromPragma = (nodeId, tbody, callback) => {
    fetch(`/api/tables/${nodeId}/schema`)
      .then(res => res.json())
      .then(pragmaRows => {
        if (!pragmaRows || pragmaRows.length === 0) {
          tbody.innerHTML = `<tr><td colspan="3" class="px-3 py-6 text-center text-rose-500">스키마 정보 로드 불가</td></tr>`;
          if (callback) callback();
          return;
        }

        // pragmaRows 결과를 colsMeta 스키마 구조로 파싱 변환하여 보관
        colsMeta = pragmaRows.map(r => ({
          field: r.name,
          sql_type: r.type || 'VARCHAR',
          kor_nm: r.name // pragma는 한글명이 없으므로 물리명을 폴백
        }));

        tbody.innerHTML = pragmaRows.map(row => {
          let keyBadge = '';
          if (row.pk === 1) {
            keyBadge = `<span class="px-1 py-0.5 text-[8px] font-bold rounded bg-gov-100 text-gov-800 border border-gov-200 ml-1">PK</span>`;
          } else if (row.name === 'LCNS_NO' || row.name === 'PRDLST_REPORT_NO' || row.name === 'BAR_CD' || row.name === 'BSSH_NO') {
            keyBadge = `<span class="px-1 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200 ml-1">KEY</span>`;
          }

          return `
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="px-3 py-2 font-mono font-semibold text-slate-800 select-all">${row.name}${keyBadge}</td>
              <td class="px-3 py-2 font-mono text-[10px] text-slate-500">${row.type || 'TEXT'}</td>
              <td class="px-3 py-2 text-right text-slate-400 italic">-</td>
            </tr>
          `;
        }).join('');

        if (callback) callback();
      })
      .catch(err => {
        tbody.innerHTML = `<tr><td colspan="3" class="px-3 py-6 text-center text-rose-500">로드 실패</td></tr>`;
        if (callback) callback();
      });
  };

  const hideTableDetail = () => {
    const inspector = container.querySelector('#table-inspector-panel');
    if (inspector) {
      inspector.classList.add('translate-x-[calc(100%+2rem)]');
      setTimeout(() => {
        inspector.classList.add('hidden');
      }, 300);
    }
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
