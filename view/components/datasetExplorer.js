export function renderDatasetExplorer(container, onSelectDataset) {
  // ── 상태 ──────────────────────────────────────────────────────────────────
  let allData      = [];          // 전체 데이터 (로드 후 고정)
  let selectedCat  = '';          // 분류별 셀렉트
  let selectedOrg  = '';          // 제공기관별 셀렉트
  let selectedType = '';          // 유형별 셀렉트
  let keyword      = '';          // 키워드 검색 (input 임시값)
  let appliedKeyword = '';        // 검색 버튼을 눌렀을 때 확정된 키워드
  let pageSize     = 10;          // 10개씩 셀렉트
  let currentPage  = 1;           // 현재 페이지

  // ── 필터링 ────────────────────────────────────────────────────────────────
  const getFiltered = () => allData.filter(item => {
    if (selectedCat  && item.cat             !== selectedCat)  return false;
    if (selectedOrg  && item.provd_instt_nm  !== selectedOrg)  return false;
    if (selectedType && item.data_type_nm    !== selectedType) return false;
    if (appliedKeyword) {
      const q = appliedKeyword.toLowerCase();
      const hit = (item.svc_nm  || '').toLowerCase().includes(q)
               || (item.svc_no  || '').toLowerCase().includes(q)
               || (item.desc    || '').toLowerCase().includes(q)
               || (item.cat     || '').toLowerCase().includes(q);
      if (!hit) return false;
    }
    return true;
  });

  // ── 셀렉트 옵션 생성 헬퍼 ────────────────────────────────────────────────
  const makeOptions = (values, currentVal, allLabel = '전체') =>
    [`<option value="">${allLabel}</option>`,
     ...values.map(v => `<option value="${v}" ${v === currentVal ? 'selected' : ''}>${v}</option>`)
    ].join('');

  // ── 카드 HTML ─────────────────────────────────────────────────────────────
  const cardHTML = (item) => `
    <div class="dataset-card bg-white border border-slate-200 rounded-xl p-5
                hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer
                flex flex-col h-full group" data-id="${item.svc_no}">
      <div class="flex justify-between items-start mb-3">
        <span class="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md">
          ${item.data_type_nm || 'OPEN API'}
        </span>
        <div class="flex gap-1">
          <span class="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-200">JSON</span>
          <span class="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-200">XML</span>
        </div>
      </div>
      <h4 class="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
        ${item.svc_nm}
      </h4>
      <p class="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
        ${item.desc || (item.svc_nm + ' 공공데이터입니다.')}
      </p>
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div class="flex items-center gap-1.5 text-xs text-slate-500">
          <i class="ri-building-line"></i> ${item.provd_instt_nm || '식약처'}
        </div>
        <span class="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
          ${item.cat || ''}
        </span>
      </div>
    </div>
  `;

  // ── 메인 렌더 ─────────────────────────────────────────────────────────────
  const render = () => {
    const filtered  = getFiltered();
    const total     = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = 1;

    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // 셀렉트 옵션용 고유값 목록 (전체 데이터 기준)
    const cats  = [...new Set(allData.map(d => d.cat).filter(Boolean))].sort();
    const orgs  = [...new Set(allData.map(d => d.provd_instt_nm).filter(Boolean))].sort();
    const types = [...new Set(allData.map(d => d.data_type_nm).filter(Boolean))].sort();

    // 분류 셀렉트 라벨 (선택된 경우 건수 표시)
    const catLabel = selectedCat
      ? `${selectedCat} (${filtered.length})`
      : '분류별';

    // 페이지네이션 버튼
    const pageButtons = (() => {
      if (totalPages <= 1) return '';
      const btns = [];
      const start = Math.max(1, currentPage - 2);
      const end   = Math.min(totalPages, currentPage + 2);
      if (start > 1) btns.push(`<button class="page-btn px-2 py-1 text-xs border rounded" data-page="1">1</button>`);
      if (start > 2) btns.push(`<span class="text-slate-400 text-xs px-1">…</span>`);
      for (let p = start; p <= end; p++) {
        btns.push(`<button class="page-btn px-2 py-1 text-xs border rounded
          ${p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}"
          data-page="${p}">${p}</button>`);
      }
      if (end < totalPages - 1) btns.push(`<span class="text-slate-400 text-xs px-1">…</span>`);
      if (end < totalPages)     btns.push(`<button class="page-btn px-2 py-1 text-xs border rounded" data-page="${totalPages}">${totalPages}</button>`);
      return btns.join('');
    })();

    container.innerHTML = `
      <div class="max-w-[1400px] mx-auto px-4 py-8">

        <!-- 헤더 -->
        <div class="flex items-end justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">전체 데이터세트 탐색</h2>
            <p class="text-slate-500 text-sm mt-1">
              식품의약품안전처에서 제공하는 공공데이터를 검색·필터링하세요.
            </p>
          </div>
          <a href="#" class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors">
            OpenAPI 이용신청
          </a>
        </div>

        <!-- 검색 필터 영역 -->
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 mb-4 flex flex-wrap items-center gap-3">

          <!-- 분류별 -->
          <select id="sel-cat" class="h-9 px-3 border border-gray-300 rounded text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">분류별</option>
            ${cats.map(c => `<option value="${c}" ${c === selectedCat ? 'selected' : ''}>${c}</option>`).join('')}
          </select>

          <!-- 제공기관별 -->
          <select id="sel-org" class="h-9 px-3 border border-gray-300 rounded text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">제공기관별</option>
            ${orgs.map(o => `<option value="${o}" ${o === selectedOrg ? 'selected' : ''}>${o}</option>`).join('')}
          </select>

          <!-- 유형별 -->
          <select id="sel-type" class="h-9 px-3 border border-gray-300 rounded text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">유형별</option>
            ${types.map(t => `<option value="${t}" ${t === selectedType ? 'selected' : ''}>${t}</option>`).join('')}
          </select>

          <!-- 키워드 검색 -->
          <input id="inp-keyword" type="text" value="${appliedKeyword}"
            placeholder="서비스명·코드·설명 검색"
            class="h-9 px-3 border border-gray-300 rounded text-sm bg-white text-slate-700 flex-1 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-300" />

          <!-- 검색 버튼 -->
          <button id="btn-search"
            class="h-9 px-5 bg-slate-700 text-white text-sm font-bold rounded hover:bg-slate-800 transition-colors">
            검색
          </button>

          <!-- 초기화 버튼 -->
          ${(selectedCat || selectedOrg || selectedType || appliedKeyword) ? `
          <button id="btn-reset"
            class="h-9 px-4 border border-slate-300 text-slate-600 text-sm rounded hover:bg-slate-100 transition-colors">
            초기화
          </button>` : ''}
        </div>

        <!-- Total + 페이지당 건수 -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm text-slate-600">
            Total: <strong class="text-slate-900">${total}</strong>
            ${total !== allData.length ? `<span class="text-blue-600 ml-1">(전체 ${allData.length}건 중 필터)</span>` : ''}
          </span>
          <div class="flex items-center gap-2">
            <select id="sel-pagesize" class="h-8 px-2 border border-gray-300 rounded text-sm bg-white text-slate-700 focus:outline-none">
              ${[10, 20, 30, 40, 50].map(n =>
                `<option value="${n}" ${n === pageSize ? 'selected' : ''}>${n}개씩</option>`
              ).join('')}
            </select>
            <button id="btn-view"
              class="h-8 px-4 border border-slate-300 text-slate-700 text-sm rounded hover:bg-slate-100 transition-colors">
              보기
            </button>
          </div>
        </div>

        <!-- 카드 그리드 -->
        <div id="cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6">
          ${paged.length === 0
            ? `<div class="col-span-full py-20 text-center text-slate-400">
                <i class="ri-search-line text-4xl block mb-3 opacity-40"></i>
                검색 결과가 없습니다.
               </div>`
            : paged.map(cardHTML).join('')
          }
        </div>

        <!-- 페이지네이션 -->
        ${totalPages > 1 ? `
        <div class="flex items-center justify-center gap-1 mt-2">
          <button class="page-btn px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50"
            data-page="${Math.max(1, currentPage - 1)}">‹</button>
          ${pageButtons}
          <button class="page-btn px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50"
            data-page="${Math.min(totalPages, currentPage + 1)}">›</button>
        </div>` : ''}

      </div>
    `;

    bindEvents();
  };

  // ── 이벤트 바인딩 ─────────────────────────────────────────────────────────
  const bindEvents = () => {
    // 분류별 셀렉트 — 즉시 필터 적용
    const selCat = container.querySelector('#sel-cat');
    if (selCat) selCat.addEventListener('change', e => {
      selectedCat = e.target.value;
      currentPage = 1;
      render();
    });

    // 제공기관별 셀렉트 — 즉시 필터 적용
    const selOrg = container.querySelector('#sel-org');
    if (selOrg) selOrg.addEventListener('change', e => {
      selectedOrg = e.target.value;
      currentPage = 1;
      render();
    });

    // 유형별 셀렉트 — 즉시 필터 적용
    const selType = container.querySelector('#sel-type');
    if (selType) selType.addEventListener('change', e => {
      selectedType = e.target.value;
      currentPage = 1;
      render();
    });

    // 키워드 input — 임시 저장 (검색 버튼으로 확정)
    const inp = container.querySelector('#inp-keyword');
    if (inp) {
      inp.addEventListener('input', e => { keyword = e.target.value; });
      // Enter 키도 검색 실행
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          appliedKeyword = keyword;
          currentPage = 1;
          render();
          container.querySelector('#inp-keyword')?.focus();
        }
      });
    }

    // 검색 버튼
    const btnSearch = container.querySelector('#btn-search');
    if (btnSearch) btnSearch.addEventListener('click', () => {
      appliedKeyword = keyword;
      currentPage = 1;
      render();
    });

    // 초기화 버튼
    const btnReset = container.querySelector('#btn-reset');
    if (btnReset) btnReset.addEventListener('click', () => {
      selectedCat = ''; selectedOrg = ''; selectedType = '';
      keyword = ''; appliedKeyword = '';
      currentPage = 1;
      render();
    });

    // 페이지당 건수 셀렉트
    const selPageSize = container.querySelector('#sel-pagesize');
    if (selPageSize) selPageSize.addEventListener('change', e => {
      pageSize = parseInt(e.target.value, 10) || 10;
    });

    // 보기 버튼 — pageSize 확정 후 렌더
    const btnView = container.querySelector('#btn-view');
    if (btnView) btnView.addEventListener('click', () => {
      const sel = container.querySelector('#sel-pagesize');
      if (sel) pageSize = parseInt(sel.value, 10) || 10;
      currentPage = 1;
      render();
    });

    // 페이지 버튼
    container.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const p = parseInt(e.currentTarget.dataset.page, 10);
        if (!isNaN(p)) { currentPage = p; render(); }
        // 렌더 후 스크롤 상단으로
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // 카드 클릭
    container.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', e => {
        const svc_no = e.currentTarget.getAttribute('data-id');
        const ds = allData.find(d => d.svc_no === svc_no);
        if (ds && onSelectDataset) {
          onSelectDataset({
            id:          ds.svc_no,
            name:        ds.svc_nm,
            subject:     ds.cat,
            process:     ds.cat,
            issue:       '해당없음',
            theme:       ds.cat,
            description: ds.desc || '',
            includedData: ds.fields ? ds.fields.map(f => f.kor_nm || f.field) : [],
            dataCount:   ds.sample_data_length || 0
          });
        }
      });
    });
  };

  // ── 초기 로딩 ─────────────────────────────────────────────────────────────
  // 로딩 스피너 표시
  container.innerHTML = `
    <div class="py-32 text-center text-slate-400">
      <i class="ri-loader-4-line text-3xl block mb-3 animate-spin opacity-60"></i>
      데이터를 불러오는 중입니다...
    </div>
  `;

  Promise.all([
    fetch('/crawler/crawl_cache.json').then(r => r.json()),
    fetch('/api/tables').then(r => r.json())
  ])
    .then(([data, dbTables]) => {
      const validTableNames = new Set(dbTables.map(t => t.name));
      allData = (data || []).filter(d => validTableNames.has(d.svc_no));
      render();
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `
        <div class="py-20 text-center text-red-500">
          <i class="ri-error-warning-line text-3xl block mb-3"></i>
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      `;
    });
}
