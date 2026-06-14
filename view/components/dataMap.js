import { escapeHtml, escapeAttr } from '/view/utils.js';
/**
 * 데이터맵 메인 렌더러
 * 파일명: dataMap.js
 *
 * [수행 역할]
 * 1. /api/searchDatasetList.do 에서 전체 데이터세트 목록을 로드함
 * 2. 분야별 트리맵 · 기관별 사이드바 · 키워드 시각화 · ERD 탭을 렌더링함
 * 3. 키워드 검색 결과를 카드 목록 + 페이지네이션으로 표시함
 * 4. 트리맵 셀 클릭 시 데이터세트 목록 → 상세 → 워드 클라우드 드릴다운을 지원함
 * 5. 화면 캡처(html2canvas / React Flow 자체 캡처)를 수행함
 */
import { getDatasetsSync } from '../datasetStore.js';
import { renderKeywordGraph } from './keywordGraph.js?v=4';
import { renderDetailPanel } from './detailDataset.js?v=4';
import { renderCombinedErdMap as renderReactErdMap } from './reactErdMap.js?v=48';
import { renderCombinedErdMap as renderVisErdMap } from './dbErdMap.js?v=16';

// =============================================================================
// 1. 메인 진입점
// =============================================================================
/**
 * 데이터맵 화면 전체를 초기화하고 렌더링한다.
 * @param {Element} container  - 렌더링 대상 DOM 컨테이너
 * @param {Function} onSelectDataset - 데이터세트 선택 시 호출되는 콜백
 */
export function renderDataMap(container, onSelectDataset) {
  // 이미 초기화된 경우 중복 이벤트 바인딩 방지 (탭 전환 시 재호출 방어)
  if (container._datamapInitialized) return;
  container._datamapInitialized = true;

  // 1-1. 데이터 fetch 및 렌더 트리거
  // API에서 전체 데이터세트를 받아 분야별·기관별 집계 후 renderUI를 호출함
  const fetchDataAndRender = async () => {
    try {
      const res = await fetch('/api/searchDatasetList.do', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_idx: 1, show_cnt: 1000 })
      });
      const data = await res.json();
      const list = data.list || [];
      window.currentDatasets = list;
      const subjectCounts = {};
      const instCounts = {};
      let totalCount = 0;

      list.forEach(d => {
        const subj = d.cl_cd_nm || '기타';
        if (!subjectCounts[subj]) subjectCounts[subj] = { count: 0, items: [] };
        subjectCounts[subj].count += 1;

        const commonItem = {
          id: d.svc_no,
          name: d.svc_nm,
          description: d.desc || d.svc_nm + " 공공데이터 API입니다.",
          formats: ["JSON", "XML"],
          users: [d.provd_instt_nm || '식품의약품안전처']
        };

        subjectCounts[subj].items.push(commonItem);

        const inst = d.provd_instt_nm || '식품의약품안전처';
        if (!instCounts[inst]) instCounts[inst] = { count: 0, items: [] };
        instCounts[inst].count += 1;
        instCounts[inst].items.push(commonItem);

        totalCount += 1;
      });

      const subjectArray = Object.keys(subjectCounts).map(subj => ({
        subject: subj,
        count: subjectCounts[subj].count,
        ratio: ((subjectCounts[subj].count / totalCount) * 100).toFixed(1),
        items: subjectCounts[subj].items
      })).sort((a, b) => b.count - a.count);

      const institutionArray = Object.keys(instCounts).map(inst => ({
        subject: inst,
        isInstitution: true,
        count: instCounts[inst].count,
        ratio: ((instCounts[inst].count / totalCount) * 100).toFixed(1),
        items: instCounts[inst].items
      })).sort((a, b) => b.count - a.count);

      renderUI(subjectArray, institutionArray, totalCount);

    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="p-8 text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    }
  };

  // 1-2. UI 초기화 및 탭·이벤트 바인딩
  // 트리맵·사이드바·탭 전환·검색·캡처 이벤트를 일괄 초기화함
  const renderUI = (subjectArray, institutionArray, totalCount) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;

    const countEl = view.querySelector('#category-total-count');
    if (countEl) countEl.textContent = `총 ${totalCount}종`;

    const instCountEl = view.querySelector('#institution-total-count');
    if (instCountEl) instCountEl.textContent = `총 ${institutionArray.length}개 기관`;

    renderCategoryList(subjectArray);
    renderInstitutionList(institutionArray);

    // Treemap 렌더링을 약간 지연시켜 컨테이너 레이아웃이 잡히도록 함
    setTimeout(() => {
      renderTreemap(subjectArray);
    }, 100);

    // 3탭 전환 헬퍼
    const ALL_TABS = ['treemap', 'visualization', 'erd'];
    let erdRendered = false;
    // ERD 패널을 초기(빈) 상태로 리셋함
    const resetErdPanel = (message = '검색어를 입력하면 데이터 관계도·ERD가 표시됩니다.') => {
      erdRendered = false;
      const canvas = view.querySelector('#cem-canvas');
      const loading = view.querySelector('#cem-loading');
      const inspector = view.querySelector('#cem-inspector');
      if (canvas) {
        canvas.innerHTML = `
          <div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:#64748b;padding:32px;">
            <div>
              <i class="ri-search-line" style="font-size:34px;display:block;margin-bottom:10px;color:#94a3b8;"></i>
              <p style="font-size:14px;font-weight:700;color:#334155;margin:0 0 6px;">${message}</p>
              <p style="font-size:12px;margin:0;">예: 초콜릿, 식품, 회수, HACCP</p>
            </div>
          </div>`;
      }
      if (loading) loading.classList.add('hidden');
      if (inspector) inspector.classList.add('hidden', 'translate-x-[calc(100%+2rem)]');
    };

    // ERD 패널에 로딩 스피너를 표시함
    const showErdSpinner = (panel) => {
      const canvas = (panel || view).querySelector('#cem-canvas');
      const loading = (panel || view).querySelector('#cem-loading');
      if (loading) loading.classList.add('hidden');
      if (canvas) {
        canvas.innerHTML = `
          <div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#64748b;">
            <div style="width:44px;height:44px;border:4px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <p style="font-size:14px;font-weight:600;color:#334155;margin:0;">데이터 관계도 불러오는 중...</p>
          </div>`;
      }
    };

    // 키워드 시각화 패널을 초기 안내 메시지 상태로 리셋함
    const resetKeywordVisualization = (message = '검색어를 입력하면 키워드 시각화가 표시됩니다.') => {
      const loading = view.querySelector('#kwmap-loading');
      const loadingText = view.querySelector('#kwmap-loading-text');
      const error = view.querySelector('#kwmap-error');
      const svgWrap = view.querySelector('#kwmap-svg-wrap');
      const zoomBtns = view.querySelector('#kwmap-zoom-btns');
      const detailPanel = view.querySelector('#kwmap-detail-panel');

      // 스피너 대신 안내 메시지를 loading 영역에 표시
      if (loading) {
        loading.style.display = 'flex';
        const spinner = loading.querySelector('div:first-child');
        if (spinner) spinner.style.display = 'none';
        if (loadingText) {
          loadingText.innerHTML = `
            <i class="ri-search-line" style="font-size:34px;display:block;margin-bottom:10px;color:#94a3b8;"></i>
            <p style="font-size:14px;font-weight:700;color:#334155;margin:0 0 6px;">${message}</p>
            <p style="font-size:12px;color:#94a3b8;margin:0;">예: 초콜릿, 식품, 회수, HACCP</p>`;
        }
      }
      if (error) {
        error.textContent = '';
        error.style.setProperty('display', 'none', 'important');
      }
      if (zoomBtns) zoomBtns.style.display = 'none';
      if (svgWrap) { svgWrap.style.display = 'none'; svgWrap.innerHTML = ''; }
      if (detailPanel) {
        detailPanel.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
            <i class="ri-information-line text-4xl mb-3 text-slate-300"></i>
            <p class="text-sm font-semibold text-slate-500">검색 후, 좌측 그래프에서<br>노드를 클릭해 보세요.</p>
          </div>`;
      }
    };

    // kwmap 스피너 DOM을 원래 상태(로딩 중 텍스트)로 복원함
    const restoreKwmapSpinner = () => {
      const loading = view.querySelector('#kwmap-loading');
      const loadingText = view.querySelector('#kwmap-loading-text');
      if (loading) {
        const spinner = loading.querySelector('div:first-child');
        if (spinner) spinner.style.display = '';
        if (loadingText) loadingText.innerHTML = '데이터 불러오는 중...';
      }
    };

    // 키워드 유무에 따라 시각화·ERD 탭을 렌더링함
    const renderKeywordDependentTabs = (kw) => {
      const erdPanel = view.querySelector('#content-panel-erd');

      const renderActiveErd = () => {
        if (!erdPanel) return;
        erdRendered = true;
        showErdSpinner(erdPanel);
        const btnReact = view.querySelector('#btn-erd-react');
        const isReactActive = btnReact ? btnReact.classList.contains('text-blue-600') : true;
        if (isReactActive) {
          renderReactErdMap(erdPanel, onSelectDataset);
        } else {
          renderVisErdMap(erdPanel, onSelectDataset);
        }
      };

      if (!kw) {
        resetKeywordVisualization();
        renderActiveErd();
        return;
      }

      restoreKwmapSpinner();
      renderKeywordGraph(kw);
      renderActiveErd();
    };

    let activeContentTab = 'treemap';

    // 콘텐츠 탭을 전환하고 비활성 탭 패널을 숨김
    const switchContentTab = (active) => {
      activeContentTab = active;
      ALL_TABS.forEach(t => {
        const panel = view.querySelector(`#content-panel-${t}`);
        const btn = view.querySelector(`#content-tab-btn-${t}`);
        const isActive = t === active;
        if (panel) panel.style.display = isActive ? 'block' : 'none';
        if (btn) {
          btn.style.borderBottomColor = isActive ? '#2563eb' : 'transparent';
          btn.style.color = isActive ? '#2563eb' : '#94a3b8';
        }
      });
    };

    // 탭 버튼 클릭 핸들러
    ALL_TABS.forEach(t => {
      const btn = view.querySelector(`#content-tab-btn-${t}`);
      if (btn) btn.addEventListener('click', () => {
        switchContentTab(t);
        if (t === 'visualization') {
          const kw = view.querySelector('#datamap-keyword-search')?.value.trim() || '';
          if (!kw) {
            resetKeywordVisualization();
            return;
          }
          restoreKwmapSpinner();
          renderKeywordGraph(kw);
        }
        if (t === 'erd') {
          const kw = view.querySelector('#datamap-keyword-search')?.value.trim() || '';
          const panel = view.querySelector('#content-panel-erd');
          const canvas = panel?.querySelector('#cem-canvas');
          const hasRenderedErd = !!canvas?.querySelector('svg, canvas, .vis-network, .react-flow');
          if (erdRendered && hasRenderedErd) return;
          erdRendered = true;
          showErdSpinner(panel);
          const btnReact = view.querySelector('#btn-erd-react');
          const isReactActive = btnReact ? btnReact.classList.contains('text-blue-600') : true;
          if (isReactActive) {
            if (panel) renderReactErdMap(panel, onSelectDataset);
          } else {
            if (panel) renderVisErdMap(panel, onSelectDataset);
          }
        }
      });
    });

    // ERD Sub-tab listeners
    const btnErdReact = view.querySelector('#btn-erd-react');
    const btnErdVis = view.querySelector('#btn-erd-vis');
    const panelErd = view.querySelector('#content-panel-erd');

    if (btnErdReact && btnErdVis && panelErd) {
      btnErdReact.addEventListener('click', () => {
        btnErdReact.className = 'px-4 py-2 text-sm font-semibold rounded-md bg-white text-blue-600 shadow-sm transition-all';
        btnErdVis.className = 'px-4 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-800 transition-all';
        showErdSpinner(panelErd);
        renderReactErdMap(panelErd, onSelectDataset);
      });
      btnErdVis.addEventListener('click', () => {
        btnErdVis.className = 'px-4 py-2 text-sm font-semibold rounded-md bg-white text-blue-600 shadow-sm transition-all';
        btnErdReact.className = 'px-4 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-800 transition-all';
        showErdSpinner(panelErd);
        renderVisErdMap(panelErd, onSelectDataset);
      });
    }



    // 키워드로 데이터세트를 검색하고 카드 목록·페이지네이션을 렌더링함
    const renderSearchResults = async (kw) => {
      const summary = view.querySelector('#keyword-result-summary');
      const cardsEl = view.querySelector('#keyword-dataset-cards');
      const vizEl = view.querySelector('#keyword-viz-container');
      if (!cardsEl) { console.warn('[dataMap] #keyword-dataset-cards NOT FOUND in view'); return; }

      // 탭 바 표시 (최초 검색 시)
      const tabBar = view.querySelector('#content-tab-bar');
      if (tabBar) tabBar.style.display = 'flex';

      // viz 초기화 (새 키워드 검색 시 재렌더 허용)
      const graphWrap = view.querySelector('#kwmap-graph-container');
      if (graphWrap) graphWrap.dataset.panzoom = ''; // panzoom 재등록 허용 안함, keyword만 리셋
      // keywordGraph.js의 _currentKeyword를 리셋하기 위해 kwmap-svg-wrap 비움
      const svgWrapEl = view.querySelector('#kwmap-svg-wrap');
      if (!kw) resetKeywordVisualization();
      // ERD: 검색 버튼에서 미리 렌더링되므로 빈 검색어일 때만 초기화한다.
      if (!kw) erdRendered = false;
      // 탭은 현재 위치 유지 (검색 결과는 탭 외부에 표시)

      // 로딩 상태
      if (summary) summary.innerHTML = kw
        ? `실제 데이터 내 <strong style="color:#1e293b;">"${escapeHtml(kw)}"</strong> 검색 중...`
        : `전체 데이터세트를 불러오는 중...`;
      cardsEl.innerHTML = `<div style="grid-column:1/-1;padding:48px 24px;text-align:center;color:#64748b;">
        <div style="display:inline-block;width:32px;height:32px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:12px;"></div>
        <div style="font-size:14px;">${kw ? `실제 데이터 안에서 <strong>"${escapeHtml(kw)}"</strong> 검색 중...` : '전체 데이터세트를 불러오는 중...'}<br><span style="font-size:12px;color:#94a3b8;">잠시만 기다려주세요.</span></div>
      </div>`;

      let allDatasets = [];
      let matchedIdSet = null; // keyword-datamap에서 받은 정확한 매칭 ID 집합

      try {
        const metaRequest = fetch('/api/searchDatasetList.do', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ start_idx: 1, show_cnt: 1000 })
        });

        if (kw) {
          const op = view.querySelector('#datamap-keyword-operator')?.value || 'AND';

          // keyword-datamap: 서버에서 AND/OR 조건을 컬럼 단위로 정확하게 평가 (키워드 시각화와 동일)
          const [kwdmRes, metaDataRes] = await Promise.all([
            fetch(`/api/keyword-datamap?keyword=${encodeURIComponent(kw)}&op=${op}`),
            metaRequest
          ]);

          const kwdmData = await kwdmRes.json();
          const metaData = await metaDataRes.json();

          allDatasets = metaData.list || [];

          // matchedTables의 tableName(하이픈 없음)을 집합으로 구성
          const rawMatchedTables = kwdmData.matchedTables || [];
          matchedIdSet = new Set(rawMatchedTables.map(t => String(t.tableName)));

        } else {
          const metaDataRes = await metaRequest;
          const metaData = await metaDataRes.json();
          allDatasets = metaData.list || [];
        }
      } catch (e) {
        cardsEl.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:#ef4444;">검색 중 오류가 발생했습니다.</div>`;
        return;
      }

      // matchedIdSet 기준으로 필터 (svc_no 하이픈 제거 후 비교)
      const matched = kw ? allDatasets.filter(d => {
        const normalizedId = String(d.svc_no || '').replace(/-/g, '');
        return matchedIdSet ? matchedIdSet.has(normalizedId) : false;
      }) : allDatasets.map(d => {
        d._match_inName = false;
        return d;
      });
      if (summary) summary.innerHTML = kw
        ? `검색어 <strong style="color:#1e293b;">"${escapeHtml(kw)}"</strong> 포함 데이터세트 — 총 <strong style="color:#2563eb;">${matched.length}개</strong>`
        : `전체 데이터세트 — 총 <strong style="color:#2563eb;">${matched.length}개</strong>`;
      updateTreemapForSearch(matched, kw);

      // 검색 결과로 필터 업데이트 이벤트 발행 (ERD 연동용)
      const matchedIds = kw ? matched.map(d => String(d.svc_no)) : null;
      window.dispatchEvent(new CustomEvent('datamap-filter-updated', { detail: { matchedIds, keyword: kw } }));

      if (matched.length === 0) {
        cardsEl.innerHTML = `<div style="padding:40px;text-align:center;color:#94a3b8;">
          <i class="ri-search-line" style="font-size:32px;display:block;margin-bottom:8px;"></i>
          ${kw ? `"<strong>${escapeHtml(kw)}</strong>"에 해당하는 데이터세트가 없습니다.` : '표시할 데이터세트가 없습니다.'}
        </div>`;
        const pg = view.querySelector('#keyword-pagination');
        if (pg) pg.innerHTML = '';
      } else {
        const PAGE_SIZE = 10;
        let currentPage = 1;
        const totalPages = () => Math.max(1, Math.ceil(matched.length / PAGE_SIZE));

        const renderListItem = (d, idx) => {
          const cat = d.cl_cd_nm || '기타';
          const catColor = getColor(cat, idx);
          const catBg = getSoftColor(cat, idx);
          const fmt = d.link_yn === 'Y' ? 'LINK' : 'API';
          const safeTitle = escapeHtml(d.svc_nm || '');
          const safeKw = escapeHtml(kw || '');
          // XSS 방어 후 검색어 하이라이팅 적용
          const title = kw && safeKw ? safeTitle.replace(new RegExp(safeKw, 'gi'), m => `<mark style="background:#fef08a;padding:0 1px;">${m}</mark>`) : safeTitle;
          const desc = escapeHtml(d.desc || d.description || '');
          const inst = escapeHtml(d.provd_instt_nm || '식품의약품안전처');
          const safeCat = escapeHtml(cat);
          const keywords = [safeCat, inst].filter(Boolean);
          const fmtColor = d.link_yn === 'Y' ? '#14b8a6' : '#f97316';
          return `
          <div data-svc-no="${escapeAttr(d.svc_no)}" style="padding:20px;cursor:pointer;background:#fff;border-bottom:1px solid #e5e7eb;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='#fff'">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <span style="font-size:12px;font-weight:500;padding:1px 6px;color:#b45309;border:1px solid #d97706;">${safeCat}</span>
              <span style="font-size:12px;font-weight:500;padding:1px 6px;color:#ef4444;border:1px solid #ef4444;">${inst}</span>
              <span style="font-size:12px;font-weight:500;padding:1px 6px;color:${fmtColor};border:1px solid ${fmtColor};">${fmt}</span>
            </div>
            <p style="font-size:18px;font-weight:700;color:#111827;margin:0 0 10px;line-height:1.4;">${title}</p>
            <p style="font-size:14px;color:#374151;margin:0 0 12px;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${desc}</p>
            <p style="font-size:13px;color:#4b5563;margin:0;">키워드 : ${keywords.join(',')}</p>
          </div>`;
        };

        const renderPagination = () => {
          const paginationEl = view.querySelector('#keyword-pagination');
          if (!paginationEl) return;
          const tp = totalPages();
          if (tp <= 1) { try { $(paginationEl).pagination('destroy'); } catch (e) { } paginationEl.innerHTML = ''; return; }
          try { $(paginationEl).pagination('destroy'); } catch (e) { }
          $(paginationEl).pagination({
            items: matched.length,
            itemsOnPage: PAGE_SIZE,
            cssStyle: 'compact-theme',
            currentPage: currentPage,
            onPageClick: (pageNumber, event) => {
              if (event) event.preventDefault();
              currentPage = pageNumber;
              renderPage();
              view.querySelector('#keyword-search-result-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        };

        const renderPage = () => {
          const start = (currentPage - 1) * PAGE_SIZE;
          const paged = matched.slice(start, start + PAGE_SIZE);
          cardsEl.innerHTML = paged.map((d, i) => renderListItem(d, start + i)).join('');
          cardsEl.onclick = (e) => {
            const card = e.target.closest('[data-svc-no]');
            if (!card) return;
            const ds = matched.find(d => String(d.svc_no) === card.dataset.svcNo);
            if (ds) openDatasetDetail(ds, view);
          };
          renderPagination();
        };

        renderPage();
      }

      if (typeof window.setGlobalDatamapKeyword === 'function') {
        window.setGlobalDatamapKeyword(kw);
      }
    };

    // 선택된 데이터세트의 상세 패널(워드 클라우드 포함)을 표시함
    const openDatasetDetail = (ds, view) => {
      if (typeof onSelectDataset === 'function') {
        onSelectDataset(ds);
        return;
      }
      const mappedDataset = {
        id: ds.svc_no,
        name: ds.svc_nm || ds.svc_no,
        subject: ds.cl_cd_nm || '기타',
        process: '제공 데이터',
        dataCount: ds.data_cnt || 0,
        description: ds.desc || ds.description || '상세 설명이 없습니다.',
        detail: {}
      };
      renderDetailPanel(mappedDataset, () => renderDetailPanel(null));
    };

    // 키워드 검색 버튼 · Enter 키 이벤트 바인딩
    const searchBtn = view.querySelector('#btn-datamap-keyword-search');
    if (searchBtn) {
      const doSearch = async () => {
        // 항상 현재 DOM에서 input 값을 읽음
        const input = view.querySelector('#datamap-keyword-search');
        const kw = input ? input.value.trim() : '';
        const targetTab = activeContentTab;
        await renderSearchResults(kw);
        switchContentTab(targetTab);
        renderKeywordDependentTabs(kw);
      };

      // 버튼만 교체 (input은 건드리지 않음)
      const newBtn = searchBtn.cloneNode(true);
      searchBtn.parentNode.replaceChild(newBtn, searchBtn);
      newBtn.addEventListener('click', doSearch);

      // input Enter 키
      const searchInput = view.querySelector('#datamap-keyword-search');
      if (searchInput) {
        const newInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newInput, searchInput);
        newInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
      }
    }

    // 현재 활성 탭(트리맵·시각화·ERD)을 PNG로 캡처하여 다운로드함
    const captureBtn = view.querySelector('#btn-treemap-capture');
    if (captureBtn) {
      captureBtn.addEventListener('click', async () => {
        let targetElement = null;
        let filename = '식품안전나라_데이터맵';

        const treemapPanel = view.querySelector('#content-panel-treemap');
        const vizPanel = view.querySelector('#content-panel-visualization');
        const erdPanel = view.querySelector('#content-panel-erd');

        if (treemapPanel && treemapPanel.style.display !== 'none') {
          targetElement = view.querySelector('#treemap-container');
          filename = '식품안전나라_데이터분포_트리맵';
        } else if (vizPanel && vizPanel.style.display !== 'none') {
          // 상세정보 패널이나 줌 버튼 등 UI 요소를 제외하고 순수 그래프 부분만 캡처
          targetElement = view.querySelector('#kwmap-svg-wrap') || view.querySelector('#kwmap-graph-container');
          filename = '식품안전나라_키워드시각화_데이터맵';
        } else if (erdPanel && erdPanel.style.display !== 'none') {
          const btnErdReact = view.querySelector('#btn-erd-react');
          const isReactActive = btnErdReact && btnErdReact.classList.contains('text-blue-600') && btnErdReact.classList.contains('bg-white');
          if (isReactActive) {
            // React Flow 탭: 컴포넌트 내장 캡처 함수 사용 (CSS transform 짤림 방지)
            const panel = view.querySelector('#content-panel-erd');
            if (panel?._rfCapture) {
              captureBtn.disabled = true;
              captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 캡처 중...';
              try {
                const cvs = await panel._rfCapture();
                if (cvs) {
                  const link = document.createElement('a');
                  link.download = '식품안전나라_데이터융합관계도_ReactFlow.png';
                  link.href = cvs.toDataURL('image/png');
                  link.click();
                }
              } finally {
                captureBtn.disabled = false;
                captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
              }
              return;
            }
            targetElement = view.querySelector('#cem-canvas');
            filename = '식품안전나라_데이터융합관계도_ReactFlow';
          } else {
            // Vis.js 탭: 자체 고해상도 캡처 사용
            const erdBtn = view.querySelector('#cem-capture');
            if (erdBtn) { erdBtn.click(); return; }
            targetElement = view.querySelector('#cem-canvas');
            filename = '식품안전나라_데이터융합관계도_Visjs';
          }
        }

        if (!targetElement || typeof html2canvas === 'undefined') return;

        captureBtn.disabled = true;
        captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 요소 정렬 중...';

        try {
          if (filename === '식품안전나라_키워드시각화_데이터맵') {
            const homeBtn = view.querySelector('#kwmap-zoom-home');
            if (homeBtn) {
              homeBtn.click();
              await new Promise(r => setTimeout(r, 800));
            }
          }

          captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 이미지 생성 중...';

          const canvas = await html2canvas(targetElement, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
          });

          const link = document.createElement('a');
          link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        } catch (e) {
          console.error('캡처 실패:', e);
          alert('이미지 저장에 실패했습니다.');
        } finally {
          captureBtn.disabled = false;
          captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
        }
      });
    }
  };

  // =============================================================================
  // 2. 색상 유틸리티
  // =============================================================================
  // 카테고리 미매핑 시 사용하는 fallback 색상 팔레트
  const colorScale = [
    '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
    '#0891b2', '#ea580c', '#4f46e5', '#db2777', '#0d9488',
    '#65a30d', '#9333ea', '#e11d48', '#0284c7', '#ca8a04',
    '#059669', '#be123c', '#475569'
  ];

  // 분야명 → 고정 브랜드 색상 맵
  const categoryColorMap = {
    '식품영양정보': '#16a34a',
    '기준규격정보': '#2563eb',
    '코드정보': '#7c3aed',
    '수질환경정보': '#0284c7',
    '검사기관정보': '#475569',
    '식품위해관리': '#dc2626',
    '식품안전관리': '#0d9488',
    '이력추적관리': '#4f46e5',
    '어린이식품안전관리': '#db2777',
    'HACCP지정현황': '#0891b2',
    '업체인허가현황': '#ea580c',
    '위생용품': '#e11d48',
    '축산물': '#9333ea',
    '건강기능식품': '#65a30d',
    '수입식품 등': '#f59e0b',
    '식품 등': '#059669',
    '폐업정보': '#be123c',
    '용어사전': '#ca8a04'
  };

  // 분야명에 해당하는 색상을 반환함 (없으면 colorScale fallback)
  const getColor = (subject, idx) => categoryColorMap[subject] || colorScale[idx % colorScale.length];
  // HEX 색상 문자열을 { r, g, b } 객체로 변환함
  const hexToRgb = (hex) => {
    const raw = String(hex || '').replace('#', '');
    const value = raw.length === 3 ? raw.split('').map(ch => ch + ch).join('') : raw;
    const n = Number.parseInt(value, 16);
    return {
      r: (n >> 16) & 255,
      g: (n >> 8) & 255,
      b: n & 255
    };
  };
  // 분야 색상의 12% 투명도 rgba 문자열을 반환함 (배경 칩 등에 사용)
  const getSoftColor = (subject, idx) => {
    const rgb = hexToRgb(getColor(subject, idx));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
  };

  // =============================================================================
  // 3. 데이터 변환 유틸리티
  // =============================================================================
  // 데이터세트 배열에서 분야별 집계 배열을 생성함
  const buildSubjectArrayFromDatasets = (datasets) => {
    const subjectCounts = {};
    const total = datasets.length;

    datasets.forEach(d => {
      const subj = d.cl_cd_nm || '기타';
      if (!subjectCounts[subj]) subjectCounts[subj] = { count: 0, items: [] };
      subjectCounts[subj].count += 1;
      subjectCounts[subj].items.push({
        id: d.svc_no,
        name: d.svc_nm,
        description: d.desc || d.description || `${d.svc_nm || d.svc_no} 공공데이터 API입니다.`,
        formats: ["JSON", "XML"],
        users: [d.provd_instt_nm || '식품의약품안전처']
      });
    });

    return Object.keys(subjectCounts).map(subj => ({
      subject: subj,
      count: subjectCounts[subj].count,
      ratio: total > 0 ? ((subjectCounts[subj].count / total) * 100).toFixed(1) : '0.0',
      items: subjectCounts[subj].items
    })).sort((a, b) => b.count - a.count);
  };

  // 데이터세트 배열에서 기관별 집계 배열을 생성함
  const buildInstitutionArrayFromDatasets = (datasets) => {
    const instCounts = {};
    const total = datasets.length;

    datasets.forEach(d => {
      const inst = d.provd_instt_nm || '식품의약품안전처';
      if (!instCounts[inst]) instCounts[inst] = { count: 0, items: [] };
      instCounts[inst].count += 1;
      instCounts[inst].items.push({
        id: d.svc_no,
        name: d.svc_nm,
        description: d.desc || d.description || `${d.svc_nm || d.svc_no} 공공데이터 API입니다.`,
        formats: ["JSON", "XML"],
        users: [inst]
      });
    });

    return Object.keys(instCounts).map(inst => ({
      subject: inst,
      isInstitution: true,
      count: instCounts[inst].count,
      ratio: total > 0 ? ((instCounts[inst].count / total) * 100).toFixed(1) : '0.0',
      items: instCounts[inst].items
    })).sort((a, b) => b.count - a.count);
  };

  // 검색·필터 결과로 트리맵·사이드바·카운트를 일괄 갱신함
  const updateTreemapForSearch = (datasets, kw, isFromCheckbox = false) => {
    const filteredSubjectArray = buildSubjectArrayFromDatasets(datasets);
    const filteredInstitutionArray = buildInstitutionArrayFromDatasets(datasets);
    const view = document.getElementById('datamap-view');
    const countEl = view?.querySelector('#category-total-count');
    const instCountEl = view?.querySelector('#institution-total-count');
    const treemapPanel = view?.querySelector('#content-panel-treemap');

    if (countEl) countEl.textContent = kw ? `"${kw}" 검색 ${datasets.length}종` : `전체 ${datasets.length}종`;
    if (instCountEl) instCountEl.textContent = `총 ${filteredInstitutionArray.length}개 기관`;
    if (treemapPanel) showTreemapOriginal(treemapPanel);

    if (!isFromCheckbox) {
      renderCategoryList(filteredSubjectArray);
      renderInstitutionList(filteredInstitutionArray);
    }

    renderTreemap(filteredSubjectArray);
  };

  // 분야·기관 체크박스 선택 상태를 읽어 트리맵과 ERD를 동시에 필터링함
  const applyCombinedFilters = () => {
    const view = document.getElementById('datamap-view');
    const selectedCats = Array.from(view.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value);
    const selectedInsts = Array.from(view.querySelectorAll('.institution-checkbox:checked')).map(cb => cb.value);

    console.log("applyCombinedFilters called", selectedCats.length, selectedInsts.length);
    const allData = window.currentDatasets || [];
    // 선택 없음 = 해당 축 필터 없음 (전체 허용)
    const matched = allData.filter(d => {
      const cat = d.cl_cd_nm || '기타';
      const inst = d.provd_instt_nm || '식품의약품안전처';
      const matchCat = selectedCats.length === 0 || selectedCats.includes(cat);
      const matchInst = selectedInsts.length === 0 || selectedInsts.includes(inst);
      return matchCat && matchInst;
    });

    // 1. Update Treemap without showing the list panel
    updateTreemapForSearch(matched, '', true);

    // 2. Dispatch event to update ERD map
    // 아무것도 선택되지 않은 경우 null(전체 표시), 아니면 매칭 ID 목록
    const matchedIds = (selectedCats.length === 0 && selectedInsts.length === 0)
      ? null
      : matched.map(d => String(d.svc_no));
    window.dispatchEvent(new CustomEvent('datamap-filter-updated', { detail: { matchedIds } }));
  };

  // =============================================================================
  // 4. 사이드바 목록 렌더링
  // =============================================================================
  // 분야별 체크박스 목록을 #category-list-container에 렌더링함
  const renderCategoryList = (subjectArray) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    const listContainer = view.querySelector('#category-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = subjectArray.map((item, idx) => {
      const color = getColor(item.subject, idx);
      return `
        <label class="category-item cursor-pointer group py-1.5 px-2 rounded-md transition-colors border border-transparent hover:border-slate-200 hover:bg-slate-50 flex justify-between items-center w-full m-0">
          <div class="flex items-center gap-2 max-w-[70%]">
            <input type="checkbox" class="category-checkbox w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" value="${item.subject}" checked>
            <div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${color}"></div>
            <span class="font-medium text-slate-700 text-[13px] truncate group-hover:text-gov-700" title="${item.subject}">${item.subject}</span>
          </div>
          <span class="text-[11px] font-bold text-slate-900 whitespace-nowrap">${item.count}종<span class="text-slate-400 font-normal ml-0.5">(${item.ratio}%)</span></span>
        </label>
      `;
    }).join('');

    listContainer.querySelectorAll('.category-checkbox').forEach(el => {
      el.addEventListener('change', applyCombinedFilters);
    });
  };

  // 기관별 체크박스 목록을 #institution-list-container에 렌더링함
  const renderInstitutionList = (instArray) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    const listContainer = view.querySelector('#institution-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = instArray.map((item, idx) => {
      return `
        <label class="institution-item cursor-pointer group py-1.5 px-2 rounded-md transition-colors border border-transparent hover:border-slate-200 hover:bg-slate-50 flex justify-between items-center w-full m-0">
          <div class="flex items-center gap-2 max-w-[70%]">
            <input type="checkbox" class="institution-checkbox w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" value="${item.subject}" checked>
            <i class="ri-building-4-line text-slate-400 group-hover:text-gov-600 shrink-0 text-[13px]"></i>
            <span class="font-medium text-slate-700 text-[13px] truncate group-hover:text-gov-700" title="${item.subject}">${item.subject}</span>
          </div>
          <span class="text-[11px] font-bold text-slate-900 whitespace-nowrap">${item.count}종<span class="text-slate-400 font-normal ml-0.5">(${item.ratio}%)</span></span>
        </label>
      `;
    }).join('');

    listContainer.querySelectorAll('.institution-checkbox').forEach(el => {
      el.addEventListener('change', applyCombinedFilters);
    });
  };

  // =============================================================================
  // 5. 트리맵 및 드릴다운
  // =============================================================================
  // 마지막 렌더 데이터 캐시 (리사이즈 시 재렌더용)
  let lastTreemapData = null;
  let treemapResizeObserver = null;
  let lastTreemapWidth = 0;

  // D3 treemap으로 분야별 데이터 분포를 시각화하고 클릭 시 드릴다운함
  const renderTreemap = (subjectArray) => {
    if (typeof d3 === 'undefined') return;

    const containerEl = document.getElementById('treemap-container');
    if (!containerEl) return;

    lastTreemapData = subjectArray;

    const width = containerEl.clientWidth || 800;
    const height = containerEl.clientHeight || 250;

    if (!treemapResizeObserver) {
      let resizeTimer;
      treemapResizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const newW = entry.contentRect.width;
          if (Math.abs(newW - lastTreemapWidth) > 1) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              if (lastTreemapData) renderTreemap(lastTreemapData);
            }, 320); // wait for css transition
          }
        }
      });
      treemapResizeObserver.observe(containerEl);
    }

    lastTreemapWidth = width;

    // Remove old svg
    containerEl.innerHTML = '';

    const rootData = {
      name: "Root",
      children: subjectArray.map(s => ({
        name: s.subject,
        value: s.count,
        items: s.items
      }))
    };

    const root = d3.hierarchy(rootData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .padding(4)
      .paddingInner(4)
      (root);

    const svg = d3.select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "Inter, sans-serif");

    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        const categoryData = subjectArray.find(s => s.subject === d.data.name);
        if (categoryData) showCategoryDatasets(categoryData);
      });

    leaf.append("rect")
      .attr("width", d => Math.max(0, d.x1 - d.x0))
      .attr("height", d => Math.max(0, d.y1 - d.y0))
      .attr("fill", (d, i) => getColor(d.data.name, i))
      .attr("rx", 6)
      .attr("ry", 6)
      .style("opacity", 0.9)
      .on("mouseover", function () {
        d3.select(this).style("opacity", 1).attr("stroke", "#fff").attr("stroke-width", 2);
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.9).attr("stroke", "none");
      });

    leaf.append("text")
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? h / 2 - 6 : h / 2 + 5;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-weight", "600")
      .attr("font-size", d => {
        const w = d.x1 - d.x0;
        const name = d.data.name;
        const maxFontSize = 16;
        const minFontSize = 8;
        // 너비 기준으로 글자 수에 맞게 폰트 크기 계산
        const fitSize = Math.floor(w / (name.length * 0.65));
        return Math.min(maxFontSize, Math.max(minFontSize, fitSize)) + "px";
      })
      .each(function (d) {
        const w = d.x1 - d.x0;
        if (w < 20) { d3.select(this).text(""); return; }
        d3.select(this).text(d.data.name);
        // textLength로 박스 너비 초과 방지
        const textEl = this;
        const padding = 8;
        if (textEl.getComputedTextLength && textEl.getComputedTextLength() > w - padding * 2) {
          d3.select(this).attr("textLength", Math.max(1, w - padding * 2)).attr("lengthAdjust", "spacingAndGlyphs");
        }
      });

    leaf.append("text")
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? h / 2 + 14 : h / 2 + 5;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.85)")
      .attr("font-size", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? "11px" : "0px";
      })
      .text(d => {
        const w = d.x1 - d.x0;
        return w > 40 ? `${d.data.value}종` : "";
      });
  };

  // 트리맵 패널 DOM 엘리먼트를 반환함
  const getTreemapPanel = () => document.getElementById('datamap-view')?.querySelector('#content-panel-treemap');

  // 트리맵 교체 뷰 진입 시 원래 자식 엘리먼트를 숨김
  const hideTreemapOriginal = (panel) => {
    Array.from(panel.children).forEach(child => {
      if (child.id !== 'treemap-replacement-view') child.style.display = 'none';
    });
  };

  // 교체 뷰에서 원래 트리맵 패널로 복귀함
  const showTreemapOriginal = (panel) => {
    panel.querySelector('#treemap-replacement-view')?.remove();
    Array.from(panel.children).forEach(child => {
      child.style.display = '';
    });
  };

  // 트리맵 데이터세트 상세 뷰의 워드 클라우드를 fetch하고 그림
  const renderTreemapWordCloud = (tableName, wrap) => {
    if (!wrap) return;

    const draw = (wordsArray) => {
      const tryDraw = () => {
        if (!window.d3 || !window.d3.layout || !window.d3.layout.cloud) {
          setTimeout(tryDraw, 100);
          return;
        }

        const width = wrap.clientWidth || 760;
        const height = wrap.clientHeight || 360;
        const fill = d3.scaleOrdinal(d3.schemeTableau10);

        window.d3.layout.cloud()
          .size([width - 24, height - 24])
          .words(wordsArray)
          .padding(4)
          .rotate(() => (Math.random() > 0.72 ? 90 : 0))
          .font('Noto Sans KR, sans-serif')
          .fontSize(d => d.size)
          .on('end', words => {
            wrap.innerHTML = '';
            d3.selectAll('.wordcloud-tooltip').remove();
            const svg = d3.select(wrap).append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background', '#f8fafc');

            const tooltip = d3.select('body').append('div')
              .attr('class', 'wordcloud-tooltip')
              .style('position', 'absolute').style('visibility', 'hidden')
              .style('background', 'rgba(0,0,0,.8)').style('color', '#fff')
              .style('padding', '6px 12px').style('border-radius', '4px')
              .style('font-size', '13px').style('pointer-events', 'none').style('z-index', '9999');

            svg.append('g')
              .attr('transform', `translate(${width / 2},${height / 2})`)
              .selectAll('text')
              .data(words)
              .enter()
              .append('text')
              .style('font-size', d => `${d.size}px`)
              .style('font-family', 'Noto Sans KR, sans-serif')
              .style('fill', (_, i) => fill(i))
              .attr('text-anchor', 'middle')
              .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
              .text(d => d.text)
              .style('cursor', 'pointer')
              .on('mouseover', function (event, d) {
                d3.select(this).style('opacity', 0.7);
                tooltip.style('visibility', 'visible').text(`'${d.text}' (${d.actualCount || '다수'}회 출현)`);
              })
              .on('mousemove', function (event) {
                tooltip.style('top', (event.pageY - 35) + 'px').style('left', (event.pageX + 10) + 'px');
              })
              .on('mouseout', function () {
                d3.select(this).style('opacity', 1);
                tooltip.style('visibility', 'hidden');
              });
          })
          .start();
      };
      tryDraw();
    };

    const fetchAndDraw = () => {
      fetch(`/api/tables/${tableName}/wordcloud`)
        .then(res => {
          if (res.status === 202) {
            const label = wrap.querySelector('[data-wordcloud-loading-text]');
            if (label) label.textContent = '데이터 분석 중... 잠시만 기다려주세요.';
            setTimeout(fetchAndDraw, 2000);
            throw new Error('BUILDING');
          }
          if (!res.ok) throw new Error('FAIL');
          return res.json();
        })
        .then(words => {
          if (!words || words.length === 0) {
            wrap.innerHTML = '<div style="color:#94a3b8;font-size:14px;">분석할 텍스트 데이터가 없습니다.</div>';
            return;
          }
          draw(words);
        })
        .catch(err => {
          if (err.message === 'BUILDING') return;
          wrap.innerHTML = '<div style="color:#ef4444;font-size:14px;">워드 클라우드 데이터를 불러오지 못했습니다.</div>';
        });
    };

    fetchAndDraw();
  };

  // 트리맵 내 데이터세트 상세 페이지(컬럼표 + 워드 클라우드)를 렌더링함
  const showTreemapDatasetDetail = (dataset, categoryData) => {
    if (typeof onSelectDataset === 'function') {
      onSelectDataset(dataset);
      return;
    }
    const mappedDataset = {
      id: dataset.id || dataset.svc_no,
      name: dataset.name || dataset.svc_nm || '-',
      subject: categoryData.subject || '기타',
      process: '제공 데이터',
      dataCount: dataset.dataCount || 0,
      description: dataset.description || '데이터세트 설명 정보가 없습니다.',
      detail: {}
    };
    renderDetailPanel(mappedDataset, () => renderDetailPanel(null));
  };

  // (구버전) 분야 클릭 시 검색결과 패널에 카드 목록을 표시함
  const showCategoryDatasetsLegacy = (categoryData) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    const resultPanel = view.querySelector('#keyword-search-result-panel');
    const summary = view.querySelector('#keyword-result-summary');
    const cardsContainer = view.querySelector('#keyword-dataset-cards');

    if (!resultPanel || !cardsContainer) return;

    const activeBtn = view.querySelector('#content-tab-btn-treemap');
    const activePanel = view.querySelector('#content-panel-treemap');
    if (activePanel) activePanel.style.display = 'block';
    if (activeBtn) {
      activeBtn.style.borderBottomColor = '#2563eb';
      activeBtn.style.color = '#2563eb';
    }
    if (summary) {
      summary.innerHTML = `<strong style="color:#1e293b;">${escapeHtml(categoryData.subject)}</strong> 분야 데이터세트 — 총 <strong style="color:#2563eb;">${Number(categoryData.count)}개</strong>`;
    }

    const categoryColor = getColor(categoryData.subject, 0);
    const categoryBg = getSoftColor(categoryData.subject, 0);

    cardsContainer.innerHTML = categoryData.items.map(ds => `
      <div class="dataset-card bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer flex flex-col h-full" data-id="${ds.id}" style="border:1px solid ${categoryBg};border-top:3px solid ${categoryColor};">
        <div class="flex justify-between items-start mb-2">
          <span class="px-2 py-1 text-[10px] font-bold rounded" style="background:${categoryBg};color:${categoryColor};">${categoryData.subject}</span>
          <div class="flex gap-1">
            ${ds.formats.map(f => `<span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200">${escapeHtml(f)}</span>`).join('')}
          </div>
        </div>
        <h4 class="font-bold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug" title="${escapeAttr(ds.name)}">${escapeHtml(ds.name)}</h4>
        <p class="text-xs text-slate-500 line-clamp-2 mb-4 flex-1" title="${escapeAttr(ds.description)}">${escapeHtml(ds.description)}</p>
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div class="flex items-center gap-1 text-[11px] text-slate-500">
            <i class="ri-building-line"></i> ${escapeHtml(ds.users[0] || '식품의약품안전처')}
          </div>
        </div>
      </div>
    `).join('');

    // 이벤트 위임(Event Delegation)으로 단일 리스너 등록 (메모리 누수 방지)
    cardsContainer.onclick = (e) => {
      const card = e.target.closest('.dataset-card');
      if (!card) return;
      const dsId = card.dataset.id;
      let ds = getDatasetsSync().find(i => i.id === dsId);
        if (!ds) {
          const rawDs = categoryData.items.find(i => i.id === dsId);
          if (rawDs) {
            ds = {
              id: rawDs.id,
              name: rawDs.name,
              description: rawDs.description || (rawDs.name + " 공공데이터 API입니다."),
              users: ["일반사용자", "개발자"],
              dataCount: rawDs.dataCount || 100,
              formats: rawDs.formats || ["JSON", "XML"],
              difficulty: "easy",
              subject: categoryData.subject || "기타",
              process: "정보 제공",
              issue: "해당없음",
              theme: "일반 조회용",
              includedData: [rawDs.name],
              keys: ["SVC_NO"],
              usageExample: `SELECT * FROM "${rawDs.id}" LIMIT 10;`,
              detail: {
                overview: rawDs.description || (rawDs.name + " 공공데이터 API입니다."),
                includedList: [rawDs.name],
                joinKeys: ["LCNS_NO", "PRDLST_REPORT_NO"],
                scenarios: ["공공데이터 연계 및 분석 시나리오 수립"],
                recommendedUsers: ["공공데이터 활용 개발자", "식품 안전 관리자"],
                guideLinks: [
                  {
                    label: "Open API 포털 안내",
                    url: "https://www.foodsafetykorea.go.kr"
                  }
                ],
                examples: [
                  `SELECT * FROM "${rawDs.id}" LIMIT 10;`
                ]
              }
            };
          }
        }
        if (ds && onSelectDataset) onSelectDataset(ds);
    };

    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 트리맵 셀 클릭 시 해당 분야 데이터세트 목록 페이지를 렌더링함
  const showCategoryDatasets = (categoryData) => {
    const view = document.getElementById('datamap-view');
    const panel = getTreemapPanel();
    if (!view || !panel) return;

    const activeBtn = view.querySelector('#content-tab-btn-treemap');
    if (panel) panel.style.display = 'block';
    if (activeBtn) {
      activeBtn.style.borderBottomColor = '#2563eb';
      activeBtn.style.color = '#2563eb';
    }

    const categoryColor = getColor(categoryData.subject, 0);
    const categoryBg = getSoftColor(categoryData.subject, 0);

    hideTreemapOriginal(panel);
    panel.querySelector('#treemap-replacement-view')?.remove();

    const page = document.createElement('div');
    page.id = 'treemap-replacement-view';
    page.className = 'space-y-5';
    page.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5">
        <div>
          <button id="btn-back-treemap" class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-gov-700 mb-3">
            <i class="ri-arrow-left-line"></i> 데이터 분포 트리맵
          </button>
          <h3 class="text-xl font-bold text-slate-900">${categoryData.subject} 데이터세트</h3>
          <p class="text-sm text-slate-500 mt-1">총 <strong class="text-gov-700">${categoryData.count}개</strong> 데이터세트를 확인할 수 있습니다.</p>
        </div>
        <span class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold" style="background:${categoryBg};color:${categoryColor};">
          <span class="w-2.5 h-2.5 rounded-full" style="background:${categoryColor};"></span>
          ${categoryData.subject}
        </span>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden" id="treemap-dataset-list"></div>
      <div id="treemap-dataset-pagination" style="display:flex;align-items:center;justify-content:center;gap:4px;margin-top:16px;"></div>
    `;

    panel.appendChild(page);

    page.querySelector('#btn-back-treemap')?.addEventListener('click', () => {
      showTreemapOriginal(panel);
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // 페이지네이션
    const PAGE_SIZE = 10;
    let currentPage = 1;
    const items = categoryData.items;
    const totalPages = () => Math.max(1, Math.ceil(items.length / PAGE_SIZE));

    const renderCategoryPage = () => {
      const listEl = page.querySelector('#treemap-dataset-list');
      const paginationEl = page.querySelector('#treemap-dataset-pagination');
      if (!listEl) return;

      const start = (currentPage - 1) * PAGE_SIZE;
      const paged = items.slice(start, start + PAGE_SIZE);

      listEl.innerHTML = paged.map(ds => {
        const institution = ds.users?.[0] || '식품의약품안전처';
        const keywords = [categoryData.subject, institution].filter(Boolean);
        return `
        <div class="dataset-card cursor-pointer" data-id="${ds.id}" style="padding:20px;background:#fff;border-bottom:1px solid #e5e7eb;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='#fff'">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
            <span style="font-size:12px;font-weight:500;padding:1px 6px;color:#b45309;border:1px solid #d97706;">${escapeHtml(categoryData.subject)}</span>
            <span style="font-size:12px;font-weight:500;padding:1px 6px;color:#ef4444;border:1px solid #ef4444;">${escapeHtml(institution)}</span>
            <span style="font-size:12px;font-weight:500;padding:1px 6px;color:#14b8a6;border:1px solid #14b8a6;">API</span>
          </div>
          <h4 style="font-size:18px;font-weight:700;color:#111827;margin:0 0 10px;line-height:1.4;">${escapeHtml(ds.name)}</h4>
          <p style="font-size:14px;color:#374151;margin:0 0 12px;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(ds.description)}</p>
          <p style="font-size:13px;color:#4b5563;margin:0;">키워드 : ${escapeHtml(keywords.join(','))}</p>
        </div>`;
      }).join('');

      // 이벤트 위임 방식으로 리스너 1개만 바인딩
      listEl.onclick = (e) => {
        const card = e.target.closest('.dataset-card');
        if (!card) return;
        const dataset = items.find(i => String(i.id) === String(card.dataset.id));
        if (dataset) showTreemapDatasetDetail(dataset, categoryData);
      };


      // 페이지네이션 렌더
      if (!paginationEl) return;
      const tp = totalPages();
      if (tp <= 1) { try { $(paginationEl).pagination('destroy'); } catch (e) { } paginationEl.innerHTML = ''; return; }
      try { $(paginationEl).pagination('destroy'); } catch (e) { }
      $(paginationEl).pagination({
        items: items.length,
        itemsOnPage: PAGE_SIZE,
        cssStyle: 'compact-theme',
        currentPage: currentPage,
        onPageClick: (pageNumber, event) => {
          if (event) event.preventDefault();
          currentPage = pageNumber;
          renderCategoryPage();
          page.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    };

    renderCategoryPage();
    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  fetchDataAndRender();
}
