// view/components/apiExplorer.js
// 식약처 OpenAPI 탐색기 컴포넌트
// 데이터셋 목록을 검색·선택하고 로컬 에뮬레이터 또는 실제 외부 API로 테스트 호출합니다.
import { getDatasets } from '../datasetStore.js';
import { renderEmptyState, renderLoadingSpinner } from '../uiComponents.js';
import { escapeHtml } from '../utils.js';

export async function renderApiExplorer(container, onSelectDataset) {
  const datasets = await getDatasets();
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
  let apiSource = 'external'; // 'local' (로컬 DB 에뮬레이터), 'external' (실제 외부 식약처 라이브 OpenAPI)

  // API 테스트 베드 상태
  let startIdx = 1;
  let endIdx = 5;
  let apiResponse = null;
  let apiError = null;
  let isApiCalling = false;
  let callDuration = 0; // ms

  // 선택된 API와 소스 모드에 따라 실제 호출을 수행하고 응답 상태를 저장하는 함수
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

  // 전체 API 탐색기 UI를 갱신하는 함수 (API 목록, 요약 카드, 파라미터 표, 응답 박스 포함)
  const render = () => {
    const view = document.getElementById('api-explorer-view');
    if (!view) return;
    
    view.style.display = 'block';

    // API 리스트 필터링
    const filteredApis = datasets.filter(ds => {
      if (ds.id.startsWith('v_') || ds.id === 'api_tables' || ds.id === 'api_columns') return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return ds.name.toLowerCase().includes(q) || ds.id.toLowerCase().includes(q) || ds.description.toLowerCase().includes(q);
    });

    const apiListHTML = filteredApis.map(ds => {
      const isSelected = selectedApi.id === ds.id;
      const bg = isSelected ? '#eef5ff' : '#fff';
      const border = isSelected ? '1px solid #0168c1' : '1px solid #dde1e7';
      const color = isSelected ? '#0168c1' : '#444';
      return `
        <button data-api-id="${escapeHtml(ds.id)}" class="api-select-btn"
          style="width:100%; text-align:left; padding:8px 10px; border-radius:4px; border:${border}; background:${bg}; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:6px;">
          <div style="overflow:hidden; flex:1;">
            <span style="font-size:12px; font-weight:${isSelected ? '700' : '500'}; color:${color}; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(ds.name)}</span>
            <span style="font-size:10px; color:#aaa; font-family:monospace;">/api/sample/${escapeHtml(ds.id)}/json</span>
          </div>
          <span style="padding:2px 6px; border-radius:3px; background:#eef5ff; color:#0168c1; font-size:10px; font-family:monospace; flex-shrink:0;">${escapeHtml(ds.id)}</span>
        </button>
      `;
    }).join('');

    const apisContainer = view.querySelector('#apis-container');
    if (apisContainer) {
      apisContainer.innerHTML = apiListHTML + (filteredApis.length === 0 ? `<p style="text-align:center; color:#bbb; font-size:12px; padding:20px 0;">일치하는 API가 없습니다.</p>` : '');
      // 참고: 카드 클릭 이벤트는 bindEvents()에서 이벤트 위임(Event Delegation)으로 1번만 등록하여 성능을 최적화함.
    }

    const summaryCard = view.querySelector('#api-summary-card');
    if (summaryCard) {
      summaryCard.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <span style="padding:3px 10px; border-radius:4px; background:rgba(255,255,255,.15); font-size:11px; font-family:monospace;">Service ID: ${escapeHtml(selectedApi.id)}</span>
          <span style="padding:3px 10px; border-radius:4px; background:#27ae60; font-size:11px; font-weight:700;">168종 실시간 외부 연동 지원</span>
        </div>
        <h3 style="font-size:16px; font-weight:700; margin:0 0 6px 0;">${escapeHtml(selectedApi.name)}</h3>
        <p style="font-size:12px; color:#cdd; line-height:1.6; margin:0 0 12px 0;">${escapeHtml(selectedApi.description)}</p>
        <div style="border-top:1px solid rgba(255,255,255,.15); padding-top:10px; display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
          <span style="font-size:11px; color:#aab;">추천 테마:</span>
          <span style="padding:2px 8px; border-radius:3px; background:rgba(255,255,255,.1); font-size:11px;">${escapeHtml(selectedApi.theme)}</span>
          <span style="font-size:11px; color:#aab;">분류:</span>
          <span style="padding:2px 8px; border-radius:3px; background:rgba(255,255,255,.1); font-size:11px;">${escapeHtml(selectedApi.subject)}</span>
        </div>
      `;
    }

    const toggleContainer = view.querySelector('#api-source-toggle-container');
    if (toggleContainer) {
      toggleContainer.innerHTML = `
        <p style="font-size:11px; font-weight:700; color:#999; text-transform:uppercase; margin:0 0 10px 0;">호출 대상 데이터 소스</p>
        <div style="display:flex; gap:8px; background:#f8f9fb; padding:6px; border-radius:6px; border:1px solid #dde1e7;">
          <button id="toggle-source-local"
            style="flex:1; padding:10px; border-radius:4px; font-size:12px; font-weight:700; border:none; cursor:pointer; background:${apiSource === 'local' ? '#0168c1' : 'transparent'}; color:${apiSource === 'local' ? '#fff' : '#555'};">
            <i class="ri-database-2-line"></i> 로컬 에뮬레이터
          </button>
          <button id="toggle-source-external"
            style="flex:1; padding:10px; border-radius:4px; font-size:12px; font-weight:700; border:none; cursor:pointer; background:${apiSource === 'external' ? '#0168c1' : 'transparent'}; color:${apiSource === 'external' ? '#fff' : '#555'};">
            <i class="ri-global-line"></i> 식약처 공식 API
          </button>
        </div>
        <p style="font-size:11px; color:#888; margin:8px 0 0 0; line-height:1.6;">
          ${apiSource === 'external'
            ? '📢 <strong>실시간 라이브 통신 활성화</strong> — 식약처 공공 포털 서버와 직접 통신합니다.'
            : '📢 <strong>로컬 SQLite 통신 활성화</strong> — 네트워크 없이도 168종 데이터를 고속 조회합니다.'}
        </p>
      `;
      const btnLocal = toggleContainer.querySelector('#toggle-source-local');
      if (btnLocal) btnLocal.addEventListener('click', () => { apiSource = 'local'; apiResponse = null; render(); });
      
      const btnExternal = toggleContainer.querySelector('#toggle-source-external');
      if (btnExternal) btnExternal.addEventListener('click', () => { apiSource = 'external'; apiResponse = null; render(); });
    }

    const urlComparison = view.querySelector('#api-url-comparison');
    if (urlComparison) {
      urlComparison.innerHTML = `
        <h3 style="font-size:13px; font-weight:700; color:#333; margin:0 0 12px 0;"><i class="ri-exchange-line" style="color:#0168c1;"></i> API 호출 주소 비교</h3>
        <div style="margin-bottom:10px;">
          <p style="font-size:11px; color:#999; font-weight:700; margin:0 0 4px 0;">1. 식약처 공식 OpenAPI</p>
          <div style="background:#f8f9fb; border:1px solid #dde1e7; border-radius:4px; padding:8px 12px; font-family:monospace; font-size:11px; color:#555; word-break:break-all;">
            http://openapi.foodsafetykorea.go.kr/api/${apiSource === 'external' ? '77183c01c07d44798948' : 'sample'}/${selectedApi.id}/json/${startIdx}/${endIdx}
          </div>
        </div>
        <div>
          <p style="font-size:11px; color:#999; font-weight:700; margin:0 0 4px 0;">2. 로컬 8000 포트 주소</p>
          <div style="background:#eef5ff; border:1px solid #c2d8f5; border-radius:4px; padding:8px 12px; font-family:monospace; font-size:11px; color:#0168c1; word-break:break-all;">
            http://localhost:8000/api/${apiSource === 'external' ? 'external' : 'sample_key'}/${selectedApi.id}/json/${startIdx}/${endIdx}
          </div>
        </div>
      `;
    }

    const requestParams = [
      { name: "KEY", desc: "인증키", type: "STRING (Required)", sample: apiSource === 'external' ? "77183c01c07d44798948 (내 정식 API Key)" : "sample (로컬 에뮬레이터에서는 임의 값 허용)" },
      { name: "serviceId", desc: "서비스명 (테이블코드)", type: "STRING (Required)", sample: selectedApi.id },
      { name: "dataType", desc: "파일형식", type: "STRING (Required)", sample: "json (or xml)" },
      { name: "startIdx", desc: "요청시작위치 (시작인덱스)", type: "INTEGER (Required)", sample: "1" },
      { name: "endIdx", desc: "요청종료위치 (종료인덱스)", type: "INTEGER (Required)", sample: "5" }
    ];
    const paramsHTML = requestParams.map(p => `
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 12px; font-family:monospace; font-weight:700; color:#333; font-size:12px;">${p.name}</td>
        <td style="padding:8px 12px; color:#555; font-size:12px;">${p.desc}</td>
        <td style="padding:8px 12px;"><code style="padding:2px 6px; border-radius:3px; background:#f0f0f0; color:#0168c1; font-family:monospace; font-size:11px;">${p.type}</code></td>
        <td style="padding:8px 12px; color:#777; font-family:monospace; font-size:11px;">${p.sample}</td>
      </tr>
    `).join('');

    const paramsTbody = view.querySelector('#api-params-tbody');
    if (paramsTbody) {
      paramsTbody.innerHTML = paramsHTML;
    }

    const testControls = view.querySelector('#api-test-controls');
    if (testControls) {
      testControls.innerHTML = `
        <div>
          <label style="font-size:11px; color:#999; font-weight:700; display:block; margin-bottom:4px;">시작 위치 (startIdx)</label>
          <input type="number" id="test-start-idx" min="1" value="${startIdx}"
            style="width:100px; height:36px; padding:0 10px; border:1px solid #dde1e7; border-radius:4px; font-size:12px; color:#444;" />
        </div>
        <div>
          <label style="font-size:11px; color:#999; font-weight:700; display:block; margin-bottom:4px;">종료 위치 (endIdx)</label>
          <input type="number" id="test-end-idx" min="1" value="${endIdx}"
            style="width:100px; height:36px; padding:0 10px; border:1px solid #dde1e7; border-radius:4px; font-size:12px; color:#444;" />
        </div>
        <button id="set-all-range-btn"
          style="height:36px; padding:0 14px; border:1px solid #0168c1; background:#eef5ff; color:#0168c1; border-radius:4px; font-size:12px; font-weight:700; cursor:pointer;">
          <i class="ri-expand-height-line"></i> 전체 범위
        </button>
        <button id="send-api-btn"
          style="height:36px; padding:0 20px; background:${isApiCalling ? '#aaa' : '#0168c1'}; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:700; cursor:pointer;"
          ${isApiCalling ? 'disabled' : ''}>
          ${isApiCalling ? '<i class="ri-loader-4-line"></i> 전송 중...' : `<i class="ri-send-plane-fill"></i> ${apiSource === 'external' ? 'OpenAPI 호출' : '로컬 호출'}`}
        </button>
      `;

      const inpStart = testControls.querySelector('#test-start-idx');
      if (inpStart) inpStart.addEventListener('change', e => { startIdx = parseInt(e.target.value) || 1; });

      const inpEnd = testControls.querySelector('#test-end-idx');
      if (inpEnd) inpEnd.addEventListener('change', e => { endIdx = parseInt(e.target.value) || 5; });

      const btnAllRange = testControls.querySelector('#set-all-range-btn');
      if (btnAllRange) btnAllRange.addEventListener('click', () => {
        startIdx = 1;
        let totalCount = 1000;
        if (apiResponse && apiResponse[selectedApi.id] && apiResponse[selectedApi.id].total_count) {
          totalCount = parseInt(apiResponse[selectedApi.id].total_count, 10) || 1000;
        } else if (selectedApi.id === 'I0580') {
          totalCount = 1000; // HACCP
        } else if (selectedApi.id === 'I2500') {
          totalCount = 500; // 인허가
        }
        endIdx = totalCount;
        btnAllRange.textContent = `전체설정 완료 (${totalCount}건)`;
        btnAllRange.style.background = '#27ae60';
        btnAllRange.style.color = '#fff';
        setTimeout(() => { render(); }, 800);
      });

      const btnSend = testControls.querySelector('#send-api-btn');
      if (btnSend) btnSend.addEventListener('click', fetchApiResponse);
    }

    const responseBox = view.querySelector('#api-response-box');
    if (responseBox) {
      let responseBoxHTML = '';
      if (isApiCalling) {
        responseBoxHTML = renderLoadingSpinner('서버와 실시간 통신 중입니다...');
      } else if (apiError) {
        responseBoxHTML = `
          <div style="padding:16px; border:1px solid #f5c5c5; background:#fff3f3; border-radius:6px; color:#c00;">
            <p style="font-weight:700; margin:0 0 6px 0; font-size:13px;"><i class="ri-error-warning-fill"></i> API 호출 오류</p>
            <code style="font-size:11px; font-family:monospace; line-height:1.6;">${apiError}</code>
          </div>
        `;
      } else if (apiResponse) {
        const prettyJson = JSON.stringify(apiResponse, null, 2);
        const totalCountVal = apiResponse[selectedApi.id] ? apiResponse[selectedApi.id].total_count : 'Unknown';
        const rowCount = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].row ? apiResponse[selectedApi.id].row.length : 0;
        const isFallback = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].RESULT && apiResponse[selectedApi.id].RESULT.CODE === 'WARN-200';

        responseBoxHTML = `
          ${isFallback ? `
            <div style="margin-bottom:10px; padding:10px 14px; border:1px solid #ffe0a0; background:#fffbf0; border-radius:6px; font-size:12px; color:#b7780a;">
              <strong>⚠ 로컬 DB 자동 폴백 처리됨</strong> — 인터넷 불안정으로 로컬 SQLite 데이터로 대체되었습니다.
            </div>
          ` : ''}
          <div style="background:#1a1a2e; border-radius:6px; overflow:hidden;">
            <div style="padding:10px 16px; background:#0f0f1e; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:8px; height:8px; border-radius:50%; background:${isFallback ? '#f0a500' : '#27ae60'}; display:inline-block;"></span>
                <span style="font-size:11px; font-weight:700; color:#fff;">HTTP 200 OK | Response Payload</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:10px; color:#888; font-family:monospace;">총 ${totalCountVal}건 | 응답 ${rowCount}행 | ${callDuration}ms</span>
                <button id="copy-json-btn" style="padding:3px 10px; background:#333; color:#ccc; border:none; border-radius:3px; font-size:11px; cursor:pointer;">복사</button>
              </div>
            </div>
            <pre style="padding:16px; font-size:11px; color:#50fa7b; font-family:monospace; line-height:1.6; overflow-x:auto; max-height:400px; margin:0;"><code>${prettyJson}</code></pre>
          </div>
        `;
      } else {
        responseBoxHTML = renderEmptyState('호출 버튼을 클릭하여 API 테스트를 시작하세요.', '', 'ri-send-plane-2-line');
      }

      responseBox.innerHTML = responseBoxHTML;
      
      const copyBtn = responseBox.querySelector('#copy-json-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (apiResponse) {
            navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2)).then(() => {
              copyBtn.textContent = '복사됨!';
              setTimeout(() => { copyBtn.textContent = '복사'; }, 2000);
            });
          }
        });
      }
    }
  };

  // API 목록 검색 입력 이벤트 및 클릭 위임을 바인딩하는 함수 (단 1번 실행)
  const bindEvents = () => {
    const view = document.getElementById('api-explorer-view');
    if (!view) return;

    // API 리스트 검색 이벤트
    const searchInput = view.querySelector('#api-search-input');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearchInput = view.querySelector('#api-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          const val = newSearchInput.value;
          newSearchInput.value = '';
          newSearchInput.value = val;
        }
      });
    }

    // API 목록 항목(Card) 클릭에 대한 이벤트 위임 (메모리 절약)
    const apisContainer = view.querySelector('#apis-container');
    if (apisContainer && !apisContainer.dataset.bound) {
      apisContainer.dataset.bound = 'true';
      apisContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.api-select-btn');
        if (!btn) return;

        const id = btn.dataset.apiId;
        const ds = datasets.find(d => d.id === id);
        if (ds) {
          selectedApi = ds;
          apiResponse = null;
          apiError = null;
          render();
        }
      });
    }
  };

  // 아직 바인딩되지 않았다면 최초 1회 바인딩
  if (!container._apiExplorerBound) {
    bindEvents();
    container._apiExplorerBound = true;
  }

  render();
}
