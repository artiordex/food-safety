import {
  subjectColorMap,
} from '../datasetData.js';

export function renderDetailPanel(dataset, onClose) {
  const container = document.getElementById('detail-panel-container');
  if (!container) return;

  if (!dataset) {
    container.innerHTML = '';
    return;
  }

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  
  // Clean up any existing listeners just in case
  window.removeEventListener("keydown", window._detailPanelEscHandler);
  window._detailPanelEscHandler = handleEsc;
  window.addEventListener("keydown", window._detailPanelEscHandler);

  const includedListHTML = dataset.detail.includedList.map((item, i) => `
    <li class="flex items-start gap-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-3">
      <span class="w-5 h-5 rounded-full bg-gov-50 text-gov-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        ${i + 1}
      </span>
      ${item}
    </li>
  `).join('');

  const joinKeysHTML = dataset.detail.joinKeys.map(key => `
    <div class="flex items-center gap-2 text-sm text-slate-700 bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
      <i class="ri-key-2-line text-teal-600"></i>
      ${key}
    </div>
  `).join('');

  const scenariosHTML = dataset.detail.scenarios.map(scenario => `
    <li class="text-sm text-slate-700 flex items-start gap-2">
      <i class="ri-check-double-line text-emerald-500 mt-0.5 shrink-0"></i>
      ${scenario}
    </li>
  `).join('');

  const recommendedUsersHTML = dataset.detail.recommendedUsers.map(u => `
    <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">${u}</span>
  `).join('');

  const guideLinksHTML = dataset.detail.guideLinks.map(link => `
    <a href="${link.url}" class="flex items-center gap-2 text-sm text-gov-700 hover:text-gov-900 bg-gov-50 hover:bg-gov-100 border border-gov-100 rounded-lg px-4 py-2.5 transition-colors">
      <i class="ri-external-link-line text-xs"></i>
      ${link.label}
    </a>
  `).join('');

  const examplesHTML = dataset.detail.examples.map((ex, i) => `
    <div class="mb-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
      <span class="text-gov-600 font-semibold text-xs mr-1.5">예시 ${i + 1}</span>
      ${ex}
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Backdrop -->
    <div id="detail-backdrop" class="fixed inset-0 bg-black/40 z-[60] animate-fade-in"></div>
    
    <!-- Panel -->
    <div class="fixed top-0 right-0 h-full w-full md:w-[560px] lg:w-[640px] bg-white z-[70] shadow-2xl overflow-y-auto animate-slide-right">
      <div class="sticky top-0 bg-white border-b border-slate-200 px-5 md:px-8 py-4 flex items-center justify-between z-10">
        <h2 class="text-base md:text-lg font-bold text-slate-900 truncate pr-4">${dataset.name}</h2>
        <button id="close-panel-btn" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors shrink-0">
          <i class="ri-close-line"></i>
        </button>
      </div>

      <div class="px-5 md:px-8 py-6">
        <!-- Tags -->
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${subjectColorMap[dataset.subject] || 'bg-slate-100 text-slate-600 border-slate-200'}">
            ${dataset.subject}
          </span>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            ${dataset.process}
          </span>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gov-50 text-gov-700 border border-gov-100">
            데이터 ${dataset.dataCount}개 포함
          </span>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-600 leading-relaxed mb-6">
          ${dataset.description}
        </p>

        <!-- Overview -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-file-list-3-line text-gov-600"></i> 데이터세트 개요
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-4 border border-slate-100">
            ${dataset.detail.overview}
          </p>
        </div>

        <!-- Included data list -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-database-line text-gov-600"></i> 포함 공공데이터 목록
          </h3>
          <ul class="space-y-2">
            ${includedListHTML}
          </ul>
        </div>

        <!-- Join keys -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-link text-gov-600"></i> 결합 기준 키
          </h3>
          <div class="grid grid-cols-1 gap-2">
            ${joinKeysHTML}
          </div>
        </div>

        <!-- Scenarios -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-lightbulb-line text-gov-600"></i> 활용 시나리오
          </h3>
          <ul class="space-y-2">
            ${scenariosHTML}
          </ul>
        </div>

        <!-- Recommended users -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-user-star-line text-gov-600"></i> 추천 사용자
          </h3>
          <div class="flex flex-wrap gap-2">
            ${recommendedUsersHTML}
          </div>
        </div>

        <!-- Guide links -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-book-open-line text-gov-600"></i> 관련 가이드
          </h3>
          <div class="flex flex-col gap-2">
            ${guideLinksHTML}
          </div>
        </div>

        <!-- Examples -->
        <div class="mb-8">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-bar-chart-box-line text-gov-600"></i> 예상 활용 예시
          </h3>
          ${examplesHTML}
        </div>

        <!-- Live DB Preview -->
        <div class="mb-8" id="detail-db-preview-section">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-database-2-line text-gov-600"></i> 데이터 프리뷰
            </h3>
            <!-- Data Source Selector (Premium Toggle Tab) -->
            <div class="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200" id="data-source-toggle-group">
              <button id="toggle-source-local" class="px-2.5 py-1 text-[10px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all flex items-center gap-1">
                <i class="ri-hard-drive-line"></i> 로컬 DB
              </button>
              <button id="toggle-source-live" class="px-2.5 py-1 text-[10px] font-bold rounded-md text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1 ${dataset.id.startsWith('v_') ? 'opacity-50 cursor-not-allowed' : ''}" ${dataset.id.startsWith('v_') ? 'title="융합 뷰는 로컬 전용입니다"' : ''}>
                <i class="ri-pulse-line"></i> 실시간 OpenAPI
              </button>
            </div>
          </div>
          <div id="live-db-preview-container" class="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center text-xs text-slate-500">
            <i class="ri-loader-4-line animate-spin text-gov-600 text-lg mr-1 inline-block align-middle"></i>
            데이터를 로드하는 중입니다...
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pb-6">
          <button class="flex-1 px-5 py-3 rounded-lg bg-gov-600 text-white text-sm font-semibold hover:bg-gov-700 transition-colors text-center whitespace-nowrap">
            <i class="ri-external-link-line mr-1.5"></i> Open API 포털 바로가기
          </button>
          <button class="px-5 py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:border-gov-300 hover:text-gov-700 transition-colors text-center whitespace-nowrap">
            <i class="ri-file-download-line mr-1.5"></i> 샘플 데이터 다운로드
          </button>
        </div>
      </div>
    </div>
  `;

  // 실시간 하이브리드(로컬-라이브) 데이터 조회 연동
  let currentSource = 'local';
  let previewLimit = 10;

  const loadLivePreview = async () => {
    const previewContainer = container.querySelector('#live-db-preview-container');
    if (!previewContainer) return;

    previewContainer.className = "bg-slate-50 border border-slate-200 rounded-xl p-5 text-center text-xs text-slate-500";
    previewContainer.innerHTML = `
      <div class="py-8 text-center text-slate-500 text-xs">
        <i class="ri-loader-4-line animate-spin text-gov-600 text-lg mr-1 inline-block align-middle"></i>
        ${currentSource === 'local' ? '로컬 데이터베이스에서 레코드를 가져오고 있습니다...' : '식약처 공식 OpenAPI 서버에서 실시간 정보를 받아오고 있습니다...'}
      </div>
    `;

    try {
      let rows = [];
      let totalCount = 0;
      let isFallback = false;
      let fallbackMessage = "";
      
      if (currentSource === 'local') {
        const res = await fetch(`/api/tables/${dataset.id}/data?limit=${previewLimit}`);
        if (!res.ok) throw new Error('DB 조회 에러');
        rows = await res.json();
        totalCount = rows.length;
      } else {
        // Live OpenAPI Mode
        if (dataset.id.startsWith('v_')) {
          previewContainer.innerHTML = `
            <div class="py-8 px-4 text-slate-500 text-center">
              <i class="ri-information-line text-amber-500 text-xl mb-1.5 block"></i>
              <p class="font-semibold text-slate-800 mb-1">융합 뷰 전용 데이터셋</p>
              <p class="text-[11px] leading-relaxed text-slate-500">본 데이터세트는 로컬 RDBMS에서 여러 독립 테이블을 실시간 조인(Join)하여 가공한 융합 뷰(View)입니다. 외부 OpenAPI에서는 단일 호출로 제공되지 않으므로 <strong class="text-gov-700">로컬 DB 모드</strong>로 조회해 주세요.</p>
            </div>
          `;
          return;
        }

        const startIdx = 1;
        const endIdx = previewLimit === 'all' ? 100 : 10;
        const res = await fetch(`/api/external/${dataset.id}/json/${startIdx}/${endIdx}`);
        if (!res.ok) throw new Error('외부 OpenAPI 서버 호출 에러');
        const data = await res.json();
        
        if (data && data[dataset.id]) {
          rows = data[dataset.id].row || [];
          totalCount = data[dataset.id].total_count || 0;
          if (data[dataset.id].RESULT && data[dataset.id].RESULT.CODE === 'WARN-200') {
            isFallback = true;
            fallbackMessage = data[dataset.id].RESULT.MSG;
          }
        }
      }

      if (rows.length === 0) {
        previewContainer.innerHTML = `
          <div class="py-8 text-slate-400">
            <i class="ri-inbox-line text-lg mb-1 block"></i>
            조회된 데이터가 없습니다. (외부 OpenAPI 호출 차단 또는 로컬 DB 비어있음)
          </div>
        `;
        return;
      }

      const keys = Object.keys(rows[0]);
      previewContainer.className = "bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm";
      previewContainer.innerHTML = `
        ${isFallback ? `
          <div class="bg-amber-50 border-b border-amber-100 px-4 py-2 text-[10px] text-amber-800 text-left flex items-start gap-1.5">
            <i class="ri-alert-line text-amber-600 mt-0.5 shrink-0"></i>
            <span>${fallbackMessage}</span>
          </div>
        ` : ''}
        <div class="overflow-x-auto max-h-[300px] overflow-y-auto">
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 z-10">
                ${keys.map(k => `<th class="px-3 py-2 bg-slate-50">${k}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${rows.map(row => `
                <tr class="hover:bg-slate-50/50">
                  ${keys.map(k => `<td class="px-3 py-2 max-w-[200px] truncate" title="${row[k] !== null ? row[k] : ''}">${row[k] !== null ? row[k] : '<span class="text-slate-300">null</span>'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <span class="text-[10px] text-slate-400 font-medium">
            ${currentSource === 'local' 
              ? `로컬 SQLite DB에 적재된 실시간 데이터 ${rows.length}개 행입니다.` 
              : `식약처 공식 라이브 OpenAPI 실시간 수신 성공 (전체 ${totalCount}개 중 ${rows.length}개 표기)`}
          </span>
          ${previewLimit === 10 ? `
            <button id="detail-view-all-btn" class="px-2.5 py-1 rounded bg-gov-50 hover:bg-gov-100 text-gov-700 text-[10px] font-bold border border-gov-100 transition-all flex items-center gap-1">
              <i class="ri-expand-left-right-line"></i> 전체 조회하기 (무제한)
            </button>
          ` : `
            <button id="detail-view-limit-btn" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold border border-slate-200 transition-all flex items-center gap-1">
              <i class="ri-contract-left-right-line"></i> 10개만 보기
            </button>
          `}
        </div>
      `;

      // 버튼 리스너 바인딩
      const allBtn = previewContainer.querySelector('#detail-view-all-btn');
      if (allBtn) {
        allBtn.addEventListener('click', () => {
          previewLimit = 'all';
          loadLivePreview();
        });
      }

      const limitBtn = previewContainer.querySelector('#detail-view-limit-btn');
      if (limitBtn) {
        limitBtn.addEventListener('click', () => {
          previewLimit = 10;
          loadLivePreview();
        });
      }
    } catch (e) {
      previewContainer.className = "bg-slate-50 border border-slate-200 rounded-xl p-5 text-center text-xs text-slate-500";
      previewContainer.innerHTML = `
        <div class="py-4 text-rose-600 flex items-center justify-center gap-1.5 font-semibold">
          <i class="ri-error-warning-line text-base"></i>
          <span>데이터 로딩 실패 (${currentSource === 'local' ? '로컬 RDBMS 서버 상태 점검 요망' : '외부 식약처 OpenAPI 라이브 서버 응답 장애'})</span>
        </div>
      `;
    }
  };

  const bindToggleListeners = () => {
    const localBtn = container.querySelector('#toggle-source-local');
    const liveBtn = container.querySelector('#toggle-source-live');
    if (!localBtn || !liveBtn) return;

    localBtn.addEventListener('click', () => {
      if (currentSource === 'local') return;
      currentSource = 'local';
      localBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all flex items-center gap-1";
      liveBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1";
      loadLivePreview();
    });

    liveBtn.addEventListener('click', () => {
      if (dataset.id.startsWith('v_')) return; // 융합뷰 클릭 차단
      if (currentSource === 'live') return;
      currentSource = 'live';
      liveBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all flex items-center gap-1";
      localBtn.className = "px-2.5 py-1 text-[10px] font-bold rounded-md text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1";
      loadLivePreview();
    });
  };

  setTimeout(() => {
    loadLivePreview();
    bindToggleListeners();
  }, 100);

  const doClose = () => {
    window.removeEventListener("keydown", window._detailPanelEscHandler);
    onClose();
  };

  container.querySelector('#detail-backdrop').addEventListener('click', doClose);
  container.querySelector('#close-panel-btn').addEventListener('click', doClose);
}
