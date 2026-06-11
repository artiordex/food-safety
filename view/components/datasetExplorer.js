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
    const view = document.getElementById('dataset-explorer-view');
    if (!view) return;
    
    // 로딩 스피너 제거 (정적 HTML에서는 기본 숨김 처리되어 있거나 표시됨)
    view.style.display = 'block';
    
    const filtered  = getFiltered();
    const total     = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = 1;

    const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // 셀렉트 옵션용 고유값 목록 (전체 데이터 기준)
    const cats  = [...new Set(allData.map(d => d.cat).filter(Boolean))].sort();
    const orgs  = [...new Set(allData.map(d => d.provd_instt_nm).filter(Boolean))].sort();
    const types = [...new Set(allData.map(d => d.data_type_nm).filter(Boolean))].sort();

    // 동적 요소 업데이트
    const selCat = view.querySelector('#sel-cat');
    if (selCat) {
      selCat.innerHTML = `<option value="">분류별</option>` + cats.map(c => `<option value="${c}" ${c === selectedCat ? 'selected' : ''}>${c}</option>`).join('');
    }

    const selOrg = view.querySelector('#sel-org');
    if (selOrg) {
      selOrg.innerHTML = `<option value="">제공기관별</option>` + orgs.map(o => `<option value="${o}" ${o === selectedOrg ? 'selected' : ''}>${o}</option>`).join('');
    }

    const selType = view.querySelector('#sel-type');
    if (selType) {
      selType.innerHTML = `<option value="">유형별</option>` + types.map(t => `<option value="${t}" ${t === selectedType ? 'selected' : ''}>${t}</option>`).join('');
    }

    const inpKeyword = view.querySelector('#inp-keyword');
    if (inpKeyword && document.activeElement !== inpKeyword) {
      inpKeyword.value = appliedKeyword;
    }

    const resetContainer = view.querySelector('#reset-container');
    if (resetContainer) {
      if (selectedCat || selectedOrg || selectedType || appliedKeyword) {
        resetContainer.innerHTML = `<button id="btn-reset" class="h-9 px-4 border border-slate-300 text-slate-600 text-sm rounded hover:bg-slate-100 transition-colors">초기화</button>`;
        const btnReset = resetContainer.querySelector('#btn-reset');
        if (btnReset) {
          btnReset.addEventListener('click', () => {
            selectedCat = ''; selectedOrg = ''; selectedType = '';
            keyword = ''; appliedKeyword = '';
            currentPage = 1;
            render();
          });
        }
      } else {
        resetContainer.innerHTML = '';
      }
    }

    const totalCount = view.querySelector('#total-count');
    if (totalCount) {
      totalCount.innerHTML = `Total: <strong class="text-slate-900">${total}</strong>` + 
        (total !== allData.length ? `<span class="text-blue-600 ml-1">(전체 ${allData.length}건 중 필터)</span>` : '');
    }

    const selPageSize = view.querySelector('#sel-pagesize');
    if (selPageSize) {
      selPageSize.value = pageSize;
    }

    // 카드 그리드 업데이트
    const cardsGrid = view.querySelector('#cards-grid');
    if (cardsGrid) {
      cardsGrid.innerHTML = paged.length === 0
        ? `<div class="col-span-full py-20 text-center text-slate-400">
            <i class="ri-search-line text-4xl block mb-3 opacity-40"></i>
            검색 결과가 없습니다.
           </div>`
        : paged.map(cardHTML).join('');
        
      // 이벤트 재바인딩
      cardsGrid.querySelectorAll('.dataset-card').forEach(card => {
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
    }

    // 페이지네이션 업데이트
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

    const paginationContainer = view.querySelector('#pagination-container');
    if (paginationContainer) {
      if (totalPages > 1) {
        paginationContainer.innerHTML = `
          <button class="page-btn px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50"
            data-page="${Math.max(1, currentPage - 1)}">‹</button>
          ${pageButtons}
          <button class="page-btn px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50"
            data-page="${Math.min(totalPages, currentPage + 1)}">›</button>
        `;
        // 이벤트 바인딩
        paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            const p = parseInt(e.currentTarget.dataset.page, 10);
            if (!isNaN(p)) { currentPage = p; render(); }
            view.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      } else {
        paginationContainer.innerHTML = '';
      }
    }
  };

  // ── 이벤트 바인딩 (최초 1회) ────────────────────────────────────────────────
  const bindEvents = () => {
    const view = document.getElementById('dataset-explorer-view');
    if (!view) return;

    const selCat = view.querySelector('#sel-cat');
    if (selCat) selCat.addEventListener('change', e => { selectedCat = e.target.value; currentPage = 1; render(); });

    const selOrg = view.querySelector('#sel-org');
    if (selOrg) selOrg.addEventListener('change', e => { selectedOrg = e.target.value; currentPage = 1; render(); });

    const selType = view.querySelector('#sel-type');
    if (selType) selType.addEventListener('change', e => { selectedType = e.target.value; currentPage = 1; render(); });

    const inp = view.querySelector('#inp-keyword');
    if (inp) {
      inp.addEventListener('input', e => { keyword = e.target.value; });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          appliedKeyword = keyword; currentPage = 1; render();
        }
      });
    }

    const btnSearch = view.querySelector('#btn-search');
    if (btnSearch) btnSearch.addEventListener('click', () => { appliedKeyword = keyword; currentPage = 1; render(); });

    const selPageSize = view.querySelector('#sel-pagesize');
    if (selPageSize) selPageSize.addEventListener('change', e => { pageSize = parseInt(e.target.value, 10) || 10; });

    const btnView = view.querySelector('#btn-view');
    if (btnView) btnView.addEventListener('click', () => {
      if (selPageSize) pageSize = parseInt(selPageSize.value, 10) || 10;
      currentPage = 1; render();
    });
  };

  // ── 초기 로딩 ─────────────────────────────────────────────────────────────
  const view = document.getElementById('dataset-explorer-view');
  if (view) {
    const cardsGrid = view.querySelector('#cards-grid');
    if (cardsGrid) {
      cardsGrid.innerHTML = `
        <div class="col-span-full py-32 text-center text-slate-400">
          <i class="ri-loader-4-line text-3xl block mb-3 animate-spin opacity-60"></i>
          데이터를 불러오는 중입니다...
        </div>
      `;
    }
  }

  // 아직 바인딩되지 않았다면 이벤트 리스너를 한 번만 등록합니다.
  if (!container._explorerEventsBound) {
    bindEvents();
    container._explorerEventsBound = true;
  }

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
      if (view) {
        const cardsGrid = view.querySelector('#cards-grid');
        if (cardsGrid) {
          cardsGrid.innerHTML = `
            <div class="col-span-full py-20 text-center text-red-500">
              <i class="ri-error-warning-line text-3xl block mb-3"></i>
              데이터를 불러오는 중 오류가 발생했습니다.
            </div>
          `;
        }
      }
    });
}
