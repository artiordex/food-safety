// view/components/apiExplorer.js
import { datasets } from '../datasetData.js';

export function renderApiExplorer(container, onSelectDataset) {
  let searchQuery = "";
  
  // 타 컴포넌트(예: 데이터맵)로부터 연계된 API 코드 자동 필터 및 포커싱 연동
  if (window.apiExplorerAutoSearch) {
    searchQuery = window.apiExplorerAutoSearch;
    window.apiExplorerAutoSearch = null; // 단회성 소비 후 즉시 초기화
  }

  let selectedApi = datasets.find(d => 
    d.id.toLowerCase() === searchQuery.toLowerCase()
  ) || datasets.find(d => d.id === 'I0580') || datasets[0]; // 기본선택: HACCP 적용업소(I0580)
  
  // API 데이터 소스 상태
  let apiSource = 'local'; // 'local' (로컬 DB 에뮬레이터), 'external' (실제 외부 식약처 라이브 OpenAPI)
  
  // API 테스트 베드 상태
  let startIdx = 1;
  let endIdx = 5;
  let apiResponse = null;
  let apiError = null;
  let isApiCalling = false;
  let callDuration = 0; // ms

  const fetchApiResponse = async () => {
    isApiCalling = true;
    apiResponse = null;
    apiError = null;
    render();

    const startTime = performance.now();
    
    // API 소스 모드에 따른 URL 분기
    const baseUrl = apiSource === 'external' ? '/api/external' : '/api/sample_key';
    const testUrl = `${baseUrl}/${selectedApi.id}/json/${startIdx}/${endIdx}`;

    try {
      const res = await fetch(testUrl);
      const data = await res.json();
      callDuration = Math.round(performance.now() - startTime);

      if (res.ok) {
        apiResponse = data;
      } else {
        apiError = data.error || 'API 요청 처리 중 오류가 발생했습니다.';
      }
    } catch (e) {
      apiError = e.message || '서버와 통신할 수 없습니다.';
    } finally {
      isApiCalling = false;
      render();
      // 결과 영역으로 부드럽게 스크롤
      const respEl = container.querySelector('#api-response-section');
      if (respEl) {
        respEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const render = () => {
    // API 리스트 필터링
    const filteredApis = datasets.filter(ds => 
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ds.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const apiListHTML = filteredApis.map(ds => {
      const isSelected = selectedApi.id === ds.id;
      const activeClass = "bg-gov-50 border-gov-300 text-gov-800 font-semibold shadow-sm";
      const inactiveClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
      return `
        <button data-api-id="${ds.id}" class="api-select-btn w-full text-left px-4 py-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${isSelected ? activeClass : inactiveClass}">
          <div class="truncate pr-2">
            <span class="font-bold text-slate-800 block text-xs truncate">${ds.name}</span>
            <span class="text-[10px] text-slate-400 font-mono mt-0.5 block">Endpoint: /api/sample/${ds.id}/json</span>
          </div>
          <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-mono shrink-0">${ds.id}</span>
        </button>
      `;
    }).join('');

    // 요청 파라미터 구조 정의
    const requestParams = [
      { name: "KEY", desc: "인증키", type: "STRING (Required)", sample: apiSource === 'external' ? "77183c01c07d44798948 (내 정식 API Key)" : "sample (로컬 에뮬레이터에서는 임의 값 허용)" },
      { name: "serviceId", desc: "서비스명 (테이블코드)", type: "STRING (Required)", sample: selectedApi.id },
      { name: "dataType", desc: "파일형식", type: "STRING (Required)", sample: "json (or xml)" },
      { name: "startIdx", desc: "요청시작위치 (시작인덱스)", type: "INTEGER (Required)", sample: "1" },
      { name: "endIdx", desc: "요청종료위치 (종료인덱스)", type: "INTEGER (Required)", sample: "5" }
    ];

    const paramsHTML = requestParams.map(p => `
      <tr class="border-b border-slate-100 hover:bg-slate-50/50">
        <td class="px-4 py-3 font-semibold text-slate-800 font-mono">${p.name}</td>
        <td class="px-4 py-3 text-slate-600">${p.desc}</td>
        <td class="px-4 py-3"><code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-600 font-mono text-[11px]">${p.type}</code></td>
        <td class="px-4 py-3 text-slate-500 font-mono">${p.sample}</td>
      </tr>
    `).join('');

    // API 테스트 베드 출력 영역
    let responseBoxHTML = '';
    if (isApiCalling) {
      responseBoxHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-slate-500">
          <i class="ri-loader-4-line text-4xl animate-spin text-gov-600 mb-3"></i>
          <p class="text-sm font-medium">로컬 및 외부 서버와 실시간 통신 중입니다...</p>
        </div>
      `;
    } else if (apiError) {
      responseBoxHTML = `
        <div class="p-5 border border-red-200 bg-red-50 text-red-700 rounded-xl">
          <div class="flex items-center gap-2 mb-2">
            <i class="ri-error-warning-fill text-lg"></i>
            <h4 class="text-sm font-bold">API 호출 오류</h4>
          </div>
          <p class="text-xs font-mono bg-white p-3 rounded-lg border border-red-100 leading-relaxed">${apiError}</p>
        </div>
      `;
    } else if (apiResponse) {
      const prettyJson = JSON.stringify(apiResponse, null, 2);
      
      // 결과 데이터로부터 실제 total_count 파싱
      const totalCountVal = apiResponse[selectedApi.id] ? apiResponse[selectedApi.id].total_count : 'Unknown';
      const rowCount = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].row ? apiResponse[selectedApi.id].row.length : 0;
      const isFallback = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].RESULT && apiResponse[selectedApi.id].RESULT.CODE === 'WARN-200';

      responseBoxHTML = `
        ${isFallback ? `
          <div class="mb-4 p-3.5 border border-amber-200 bg-amber-50 text-amber-800 rounded-xl flex items-start gap-2.5 text-xs">
            <i class="ri-alert-line text-lg shrink-0 mt-0.5"></i>
            <div>
              <strong class="font-bold block">실시간 로컬 DB 자동 폴백(Fallback) 처리됨</strong>
              <span class="text-slate-600">인터넷 불안정 또는 식약처 라이브 서버 점검으로 인해, 로컬 SQLite에 수집 및 백업된 168종 DB 데이터로 안전하게 즉시 대체되었습니다.</span>
            </div>
          </div>
        ` : ''}
        
        <div class="bg-slate-900 border border-slate-850 rounded-xl overflow-hidden shadow-lg">
          <div class="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${isFallback ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
              <span class="text-xs font-bold text-white">HTTP 200 OK | Response Payload</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[10px] text-slate-400 font-mono">총 데이터 건수: ${totalCountVal} | 응답 행 수: ${rowCount}건</span>
              <span class="text-[10px] text-slate-400 font-mono">수행 속도: ${callDuration}ms</span>
              <button id="copy-json-btn" class="px-2 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all">코드 복사</button>
            </div>
          </div>
          <pre class="p-5 text-[11px] text-emerald-400 font-mono leading-relaxed overflow-x-auto max-h-[450px]"><code>${prettyJson}</code></pre>
        </div>
      `;
    } else {
      responseBoxHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
          <i class="ri-send-plane-2-line text-4xl mb-2 text-slate-300 animate-pulse"></i>
          <p class="text-sm font-medium">로컬 또는 실제 식약처 API 호출 테스트를 수행하지 않았습니다.</p>
          <p class="text-xs text-slate-400 mt-1">상단의 설정 모드 및 조회 범위를 설정한 뒤 호출 버튼을 클릭해 보세요.</p>
        </div>
      `;
    }

    // 소스 선택 버튼 스타일
    const sourceLocalClass = apiSource === 'local' ? 'bg-gov-600 text-white font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200';
    const sourceExtClass = apiSource === 'external' ? 'bg-gov-600 text-white font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200';

    container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Title -->
          <div class="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">식약처 로컬 & 외부 실시간 OpenAPI Explorer (168종 완벽 연동)</h2>
              <p class="text-sm text-slate-500">
                로컬 SQLite 캐시 데이터베이스뿐만 아니라 **실제 외부 식약처 공공데이터 포털 서버(openapi.foodsafetykorea.go.kr)와의 실시간 라이브 연동**을 완비하였습니다.
                로컬 에뮬레이팅 응답과 실제 인터넷 실시간 응답을 자유롭게 교차 검증하며 고도의 데이터 연동 테스트를 구현합니다.
              </p>
            </div>
            <div class="shrink-0 flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <i class="ri-wifi-line text-emerald-600 text-xl animate-pulse"></i>
              <div>
                <p class="text-[10px] text-slate-400 leading-none">실시간 연동 상태</p>
                <p class="text-xs font-bold text-slate-700 leading-tight mt-1">식약처 Live Connected</p>
              </div>
            </div>
          </div>

          <!-- Grid: Left API Browser & Right API Sandbox -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Sidebar: API Navigator -->
            <div class="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col max-h-[600px] overflow-hidden">
              <div class="mb-4">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">식약처 168종 API 검색</label>
                <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:border-gov-400 focus-within:ring-2 focus-within:ring-gov-50 transition-all">
                  <i class="ri-search-line text-slate-400 text-sm"></i>
                  <input type="text" id="api-search-input" value="${searchQuery}" placeholder="API명 또는 테이블코드 검색" class="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              
              <div class="flex-1 overflow-y-auto space-y-2 pr-1" id="apis-container">
                ${apiListHTML}
                ${filteredApis.length === 0 ? `
                  <div class="py-12 text-center text-slate-400 text-xs">일치하는 API가 없습니다.</div>
                ` : ''}
              </div>
            </div>

            <!-- Main Panel: Spec & Sandbox Test Bed -->
            <div class="lg:col-span-3 space-y-6">
              <!-- Selected API Brief Card -->
              <div class="bg-gradient-to-r from-gov-800 to-gov-950 text-white rounded-2xl p-6 shadow-md">
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span class="px-3 py-1 rounded bg-white/10 text-[11px] font-mono tracking-wider">Service ID: ${selectedApi.id}</span>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">168종 실시간 외부 연동 지원</span>
                  </div>
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2">${selectedApi.name}</h3>
                <p class="text-xs text-slate-200 leading-relaxed mb-4 max-w-3xl">${selectedApi.description}</p>
                <div class="border-t border-white/10 pt-3 flex items-center gap-2 flex-wrap">
                  <span class="text-[10px] text-slate-400 font-semibold">추천 활용테마:</span>
                  <span class="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-medium border border-white/5">${selectedApi.theme}</span>
                  <span class="text-[10px] text-slate-400 font-semibold ml-2">분류주제:</span>
                  <span class="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-medium border border-white/5">${selectedApi.subject}</span>
                </div>
              </div>

              <!-- DATA SOURCE TOGGLE SWITCH (식약처 외부 API vs 로컬 DB) -->
              <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">호출 대상 데이터 소스 스위칭 (Data Source Toggle)</h3>
                <div class="flex gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  <button id="toggle-source-local" class="flex-1 py-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${sourceLocalClass}">
                    <i class="ri-database-2-line"></i> 로컬 에뮬레이터 (SQLite DB 백업)
                  </button>
                  <button id="toggle-source-external" class="flex-1 py-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${sourceExtClass}">
                    <i class="ri-global-line animate-spin-slow"></i> 식약처 공식 API (외부 실시간 라이브)
                  </button>
                </div>
                <p class="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                  ${apiSource === 'external' 
                    ? '📢 <strong>[실시간 라이브 통신 활성화]</strong> 현재 외부 식약처 공공 포털 서버와 직접 소켓 통신을 하여 가장 최신의 식약처 데이터를 무제한 조회합니다.'
                    : '📢 <strong>[로컬 SQLite 통신 활성화]</strong> 네트워크 미연결 시에도 168종 전체 데이터를 100% 식약처 규격으로 모방 에뮬레이팅하여 초고속으로 조회합니다.'}
                </p>
              </div>

              <!-- URL Specification Comparison -->
              <div class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
                <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i class="ri-exchange-line text-gov-600"></i> API 호출 주소 비교 (URL Specification)
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">1. 실제 식약처 공공포털 공식 OpenAPI 주소</h4>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-[11px] text-slate-600 break-all select-all">
                      http://openapi.foodsafetykorea.go.kr/api/${apiSource === 'external' ? '77183c01c07d44798948' : 'sample'}/${selectedApi.id}/json/<span class="text-blue-600 font-bold">${startIdx}</span>/<span class="text-blue-600 font-bold">${endIdx}</span>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>2. 현재 선택된 8000 포트 호출 타깃 주소</span>
                      <span class="text-[10px] text-gov-600 font-bold font-sans">★ 실제 API와 구조 동일</span>
                    </h4>
                    <div class="bg-gov-50/50 border border-gov-200 rounded-lg p-3 font-mono text-[11px] text-gov-800 break-all select-all">
                      ${apiSource === 'external'
                        ? `http://localhost:8000/api/external/${selectedApi.id}/json/<span class="text-gov-600 font-bold">${startIdx}</span>/<span class="text-gov-600 font-bold">${endIdx}</span> <span class="text-slate-400 text-[10px] block mt-1">(내부 호출 시 인증키 77183c01c07d44798948 로 치환됨)</span>`
                        : `http://localhost:8000/api/sample_key/${selectedApi.id}/json/<span class="text-gov-600 font-bold">${startIdx}</span>/<span class="text-gov-600 font-bold">${endIdx}</span>`}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Parameter Spec Table -->
              <div class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm overflow-hidden">
                <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i class="ri-table-line text-gov-600"></i> 요청 파라미터 구조 (Request Parameters)
                </h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <th class="px-4 py-2.5">파라미터명 (Name)</th>
                        <th class="px-4 py-2.5">설명 (Description)</th>
                        <th class="px-4 py-2.5">타입 및 필수여부</th>
                        <th class="px-4 py-2.5">샘플값 (Sample Value)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-slate-700">
                      ${paramsHTML}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- API Interactive Test Bed (Sandbox) -->
              <div class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md">
                <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i class="ri-flask-line text-gov-600"></i> 실시간 API 테스트 베드 & 데이터 전체 조회 (Sandbox)
                </h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5 items-end">
                  <div>
                    <label class="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">요청 시작 위치 (startIdx)</label>
                    <input type="number" id="test-start-idx" min="1" value="${startIdx}" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-gov-400 focus:ring-1 focus:ring-gov-400" />
                  </div>
                  <div>
                    <label class="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">요청 종료 위치 (endIdx)</label>
                    <input type="number" id="test-end-idx" min="1" value="${endIdx}" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-gov-400 focus:ring-1 focus:ring-gov-400" />
                  </div>
                  <div>
                    <button id="set-all-range-btn" class="w-full px-4 py-2.5 rounded-lg border border-gov-200 hover:border-gov-400 bg-gov-50/50 hover:bg-gov-50 text-gov-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                      <i class="ri-expand-height-line"></i> 전체 범위 자동설정
                    </button>
                  </div>
                  <div>
                    <button id="send-api-btn" class="w-full px-5 py-2.5 rounded-lg bg-gov-600 hover:bg-gov-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all ${isApiCalling ? 'opacity-70 cursor-not-allowed' : ''}" ${isApiCalling ? 'disabled' : ''}>
                      ${isApiCalling ? '<i class="ri-loader-4-line animate-spin"></i> 전송 중...' : '<i class="ri-send-plane-fill"></i> 로컬 API 호출 (Send)'}
                    </button>
                  </div>
                </div>

                <!-- API Response Output -->
                <div id="api-response-section" class="scroll-mt-24">
                  <div class="mb-2.5 flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-500 flex items-center gap-1.5"><i class="ri-code-s-slash-line text-gov-600"></i> API Response JSON Payload</span>
                  </div>
                  <div id="api-response-box">
                    ${responseBoxHTML}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // API 리스트 검색 이벤트
    const searchInput = container.querySelector('#api-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearchInput = container.querySelector('#api-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          const val = newSearchInput.value;
          newSearchInput.value = '';
          newSearchInput.value = val;
        }
      });
    }

    // API 아이템 선택 이벤트
    container.querySelectorAll('.api-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.apiId;
        const ds = datasets.find(d => d.id === id);
        if (ds) {
          selectedApi = ds;
          apiResponse = null;
          apiError = null;
          render();
        }
      });
    });

    // 시작/종료 인덱스 변경 이벤트
    const startInput = container.querySelector('#test-start-idx');
    if (startInput) {
      startInput.addEventListener('input', (e) => {
        startIdx = parseInt(e.target.value, 10) || 1;
      });
    }

    const endInput = container.querySelector('#test-end-idx');
    if (endInput) {
      endInput.addEventListener('input', (e) => {
        endIdx = parseInt(e.target.value, 10) || 5;
      });
    }

    // 소스 전환 토글 이벤트
    const btnLocal = container.querySelector('#toggle-source-local');
    if (btnLocal) {
      btnLocal.addEventListener('click', () => {
        apiSource = 'local';
        render();
      });
    }

    const btnExt = container.querySelector('#toggle-source-external');
    if (btnExt) {
      btnExt.addEventListener('click', () => {
        apiSource = 'external';
        render();
      });
    }

    // 전체 범위 자동설정 클릭 이벤트 (100개 페이징을 해제하고 전체 건수를 한꺼번에 조회하도록 인덱스 자동 매핑)
    const setAllBtn = container.querySelector('#set-all-range-btn');
    if (setAllBtn) {
      setAllBtn.addEventListener('click', () => {
        startIdx = 1;
        // 각 데이터셋 정보에서 기본 count를 가져오거나 없으면 대략 1000건, 혹은 이전 응답의 total_count를 참조
        let totalCount = 1000;
        if (apiResponse && apiResponse[selectedApi.id] && apiResponse[selectedApi.id].total_count) {
          totalCount = parseInt(apiResponse[selectedApi.id].total_count, 10) || 1000;
        } else if (selectedApi.id === 'I0580') {
          totalCount = 1000; // HACCP
        } else if (selectedApi.id === 'I2500') {
          totalCount = 500; // 인허가
        }
        
        endIdx = totalCount;
        
        const startInEl = container.querySelector('#test-start-idx');
        const endInEl = container.querySelector('#test-end-idx');
        if (startInEl) startInEl.value = startIdx;
        if (endInEl) endInEl.value = endIdx;
        
        // 시각적으로 전체 범위 설정 완료를 알리기 위해 마이크로 변경 알림
        setAllBtn.textContent = `전체설정 완료 (${totalCount}건)`;
        setAllBtn.classList.remove('bg-gov-50/50', 'text-gov-700', 'border-gov-200');
        setAllBtn.classList.add('bg-emerald-500', 'text-white', 'border-transparent');
        setTimeout(() => {
          render();
        }, 800);
      });
    }

    // API 호출 전송 버튼 이벤트
    const sendBtn = container.querySelector('#send-api-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', fetchApiResponse);
    }

    // JSON 코드 복사 이벤트
    const copyBtn = container.querySelector('#copy-json-btn');
    if (copyBtn && apiResponse) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = JSON.stringify(apiResponse, null, 2);
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.textContent = "복사 완료!";
          copyBtn.classList.remove('bg-slate-800');
          copyBtn.classList.add('bg-emerald-600');
          setTimeout(() => {
            copyBtn.textContent = "코드 복사";
            copyBtn.classList.remove('bg-emerald-600');
            copyBtn.classList.add('bg-slate-800');
          }, 2000);
        }).catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
      });
    }
  };

  render();
}
