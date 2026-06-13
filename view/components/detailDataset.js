// 데이터세트 상세 패널 컴포넌트
// 데이터세트 선택 시 우측에 슬라이드인 패널로 상세 정보(컬럼, 샘플 데이터, API 명세)를 표시합니다.

// 주제 분류별 배지 색상 매핑 (Tailwind 클래스)
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
  
  // 이전 ESC 키 리스너가 중복 등록되지 않도록 기존 리스너 제거 후 재등록
  window.removeEventListener("keydown", window._detailPanelEscHandler);
  window._detailPanelEscHandler = handleEsc;
  window.addEventListener("keydown", window._detailPanelEscHandler);

  const includedListHTML = (dataset.detail?.includedList || []).map((item, i) => `
    <li class="flex items-start gap-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-3">
      <span class="w-5 h-5 rounded-full bg-gov-50 text-gov-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        ${i + 1}
      </span>
      ${item}
    </li>
  `).join('');

  const joinKeysHTML = (dataset.detail?.joinKeys || []).map(key => `
    <div class="flex items-center gap-2 text-sm text-slate-700 bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
      <i class="ri-key-2-line text-teal-600"></i>
      ${key}
    </div>
  `).join('');

  const scenariosHTML = (dataset.detail?.scenarios || []).map(scenario => `
    <li class="text-sm text-slate-700 flex items-start gap-2">
      <i class="ri-check-double-line text-emerald-500 mt-0.5 shrink-0"></i>
      ${scenario}
    </li>
  `).join('');

  const recommendedUsersHTML = (dataset.detail?.recommendedUsers || []).map(u => `
    <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">${u}</span>
  `).join('');

  const guideLinksHTML = (dataset.detail?.guideLinks || []).map(link => `
    <a href="${link.url}" class="flex items-center gap-2 text-sm text-gov-700 hover:text-gov-900 bg-gov-50 hover:bg-gov-100 border border-gov-100 rounded-lg px-4 py-2.5 transition-colors">
      <i class="ri-external-link-line text-xs"></i>
      ${link.label}
    </a>
  `).join('');

  const examplesHTML = (dataset.detail?.examples || []).map((ex, i) => `
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
          <span id="detail-dataset-size-badge" class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gov-50 text-gov-700 border border-gov-100">
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
            ${dataset.detail?.overview || dataset.description || ""}
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

        
        <!-- 워드 클라우드 영역 -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-cloud-line text-gov-600"></i> 키워드 워드 클라우드
          </h3>
          <div id="detail-wordcloud-wrap" class="w-full h-[320px] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div id="detail-wc-loading" class="text-center text-slate-500 text-xs">
              <i class="ri-loader-4-line animate-spin text-gov-600 text-lg mr-1 inline-block align-middle"></i>
              워드 클라우드 분석 중...
            </div>
          </div>
        </div>

        <!-- 데이터 컬럼 정보 -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-table-line text-gov-600"></i> 데이터 컬럼 (스키마)
          </h3>
          <div id="detail-columns-wrap" class="overflow-x-auto border border-slate-200 rounded-xl">
             <div class="p-4 text-center text-slate-500 text-xs">컬럼 정보를 불러오는 중...</div>
          </div>
        </div>

        <!-- Live DB Preview -->
        <div class="mb-8" id="detail-db-preview-section">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-database-2-line text-gov-600"></i> 데이터 프리뷰
            </h3>
            <!-- Data Source Selector (Premium Toggle Tab) -->
            <div class="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200" id="data-source-toggle-group">
              <button id="toggle-source-local" class="px-2.5 py-1 text-[10px] font-bold rounded-md ${dataset.id.startsWith('v_') ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'} transition-all flex items-center gap-1">
                <i class="ri-hard-drive-line"></i> 로컬 DB
              </button>
              <button id="toggle-source-live" class="px-2.5 py-1 text-[10px] font-bold rounded-md ${!dataset.id.startsWith('v_') ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'} transition-all flex items-center gap-1 ${dataset.id.startsWith('v_') ? 'opacity-50 cursor-not-allowed' : ''}" ${dataset.id.startsWith('v_') ? 'title="융합 뷰는 로컬 전용입니다"' : ''}>
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

  // 로컬 DB 또는 실시간 OpenAPI에서 데이터를 가져오는 하이브리드 프리뷰 로직
  let currentSource = dataset.id.startsWith('v_') ? 'local' : 'live';
  let previewLimit = 10;

  // 현재 소스 모드(로컬/라이브)에 따라 프리뷰 데이터를 로드하고 테이블로 렌더링하는 함수
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

  // 로컬 DB / 실시간 OpenAPI 전환 버튼에 클릭 이벤트를 등록하는 함수
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

    // 키워드 검색 시 해당 키워드 매칭 건수 동적 조회 및 배지 추가
    if (typeof window.getGlobalDatamapKeyword === 'function') {
      const kw = window.getGlobalDatamapKeyword();
      if (kw) {
        const badgeContainer = container.querySelector('.flex.items-center.gap-2.mb-4.flex-wrap');
        if (badgeContainer) {
          const kwBadge = document.createElement('span');
          kwBadge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-200 animate-pulse';
          kwBadge.innerHTML = `<i class="ri-search-line mr-1"></i> "${kw}" 매칭 건수 계산 중...`;
          
          // "데이터 N개 포함" 뱃지 앞에 삽입
          const sizeBadge = badgeContainer.querySelector('#detail-dataset-size-badge');
          if (sizeBadge) {
            badgeContainer.insertBefore(kwBadge, sizeBadge);
          } else {
            badgeContainer.appendChild(kwBadge);
          }

          // 단일 키워드나 AND/OR 중 첫 번째 의미 있는 단어를 사용하거나 전체 kw를 넘겨 서버에서 처리
          // 여기서는 /api/tables/:tableName/keyword-count?keyword=xxx 로 호출
          const primaryKw = kw.split(';')[0].trim().replace(/AND|OR/gi, '').trim();
          fetch(`/api/tables/${dataset.id}/keyword-count?keyword=${encodeURIComponent(primaryKw)}`)
            .then(r => r.json())
            .then(data => {
              kwBadge.classList.remove('animate-pulse');
              if (data.count > 0) {
                kwBadge.innerHTML = `<i class="ri-search-line mr-1"></i> 키워드 "${primaryKw}" <strong>${data.count}개</strong> 포함`;
              } else {
                kwBadge.innerHTML = `<i class="ri-search-line mr-1"></i> 키워드 "${primaryKw}" 포함 안 됨`;
                kwBadge.className = 'px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200';
              }
            })
            .catch(() => {
              kwBadge.remove(); // 실패 시 숨김
            });
        }
      }
    }

  }, 100);

  
  // 워드 클라우드 렌더링
  const renderDetailWordCloud = (tableName, wrap) => {
    const fetchAndDraw = () => {
      fetch(`/api/wordcloud?tableName=${tableName}`)
        .then(res => {
          if (res.status === 202) {
            const loadEl = wrap.querySelector('#detail-wc-loading');
            if (loadEl) loadEl.innerHTML = '<i class="ri-loader-4-line animate-spin text-gov-600 text-lg mr-1 inline-block align-middle"></i>데이터 분석 중... 잠시만 기다려주세요.';
            setTimeout(fetchAndDraw, 2000);
            throw new Error('BUILDING');
          }
          if (!res.ok) throw new Error('FAIL');
          return res.json();
        })
        .then(words => {
          if (!words || words.length === 0) {
            wrap.innerHTML = '<div class="text-slate-400 text-sm">분석할 텍스트 데이터가 없습니다.</div>';
            return;
          }
          drawWordCloud(words, wrap);
        })
        .catch(err => {
          if (err.message === 'BUILDING') return;
          wrap.innerHTML = '<div class="text-rose-500 text-sm">워드 클라우드 데이터를 불러오지 못했습니다.</div>';
        });
    };
    fetchAndDraw();
  };

  const drawWordCloud = (wordsArray, wrap) => {
    const tryDraw = () => {
      if (!window.d3 || !window.d3.layout || !window.d3.layout.cloud) {
        setTimeout(tryDraw, 100); return;
      }
      const width = wrap.clientWidth || 600;
      const height = wrap.clientHeight || 320;
      const fill = window.d3.scaleOrdinal(window.d3.schemeTableau10);

      window.d3.layout.cloud()
        .size([width - 20, height - 20])
        .words(wordsArray)
        .padding(4)
        .rotate(() => (~~(Math.random() * 2) * 90))
        .font('Noto Sans KR, sans-serif')
        .fontSize(d => d.size)
        .on('end', words => {
          wrap.innerHTML = '';
          window.d3.selectAll('.wordcloud-tooltip').remove();
          const svg = window.d3.select(wrap).append('svg')
            .attr('width', width).attr('height', height)
            .style('background', '#f8fafc');
          
          const tooltip = window.d3.select('body').append('div')
            .attr('class', 'wordcloud-tooltip')
            .style('position', 'absolute').style('visibility', 'hidden')
            .style('background', 'rgba(0,0,0,.8)').style('color', '#fff')
            .style('padding', '6px 12px').style('border-radius', '4px')
            .style('font-size', '13px').style('pointer-events', 'none').style('z-index', '99999');

          svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`)
            .selectAll('text').data(words).enter().append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', 'Noto Sans KR, sans-serif')
            .style('fill', (_, i) => fill(i))
            .attr('text-anchor', 'middle')
            .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
            .text(d => d.text)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
              window.d3.select(this).style('opacity', 0.7);
              tooltip.style('visibility', 'visible').text(`'${d.text}' (${d.actualCount || '다수'}회 출현)`);
            })
            .on('mousemove', function(event) {
              tooltip.style('top', (event.pageY - 35) + 'px').style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', function() {
              window.d3.select(this).style('opacity', 1);
              tooltip.style('visibility', 'hidden');
            });
        })
        .start();
    };
    tryDraw();
  };

  // 컬럼 정보 가져오기
  const loadColumns = () => {
    const colWrap = container.querySelector('#detail-columns-wrap');
    fetch(`/api/datasetMetadata.do?svc_no=${encodeURIComponent(dataset.id)}`)
      .then(r => r.json())
      .then(cols => {
        if (!cols || cols.length === 0) {
          colWrap.innerHTML = '<div class="p-4 text-center text-slate-400 text-sm">컬럼 정보가 없습니다.</div>';
          return;
        }
        colWrap.innerHTML = `
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th class="px-3 py-2 w-1/3">컬럼명 (영문)</th>
                <th class="px-3 py-2">한글명 (설명)</th>
                <th class="px-3 py-2">타입</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${cols.map((c, i) => `
                <tr class="hover:bg-slate-50/50">
                  <td class="px-3 py-2 font-mono text-gov-700">${c.field || '-'}</td>
                  <td class="px-3 py-2">${c.kor_nm || '-'}</td>
                  <td class="px-3 py-2 text-slate-500 font-mono text-[11px]">${c.sql_type || c.data_type || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      })
      .catch(() => {
        colWrap.innerHTML = '<div class="p-4 text-center text-rose-500 text-sm">컬럼 정보를 불러오지 못했습니다.</div>';
      });
  };

  setTimeout(() => {
    renderDetailWordCloud(dataset.id, container.querySelector('#detail-wordcloud-wrap'));
    loadColumns();
  }, 100);

const doClose = () => {
    window.removeEventListener("keydown", window._detailPanelEscHandler);
    onClose();
  };

  container.querySelector('#detail-backdrop').addEventListener('click', doClose);
  container.querySelector('#close-panel-btn').addEventListener('click', doClose);
}
