import { renderDatasetExplorer } from './components/datasetExplorer.js?v=100';
import { renderDataMap } from './components/dataMap.js?v=104';
import { renderRelationDataMap } from './components/relationDataMap.js?v=100';
import { renderDetailPanel } from './components/detailDataset.js?v=102';
import { renderSqlPlayground } from './components/sqlPlayground.js?v=100';
import { renderApiExplorer } from './components/apiExplorer.js?v=100';
import { renderApiLiveJoin } from './components/apiLiveJoin.js?v=100';
import { renderKeywordDataMap } from './components/keywordGraph.js?v=7';
import { renderDbErdMap } from './components/dbErdMap.js?v=100';
import { renderWordCloud } from './components/wordCloud.js?v=100';
import { getDatasetsSync } from './datasetStore.js?v=100';

const urlParams = new URLSearchParams(window.location.search);
let activeTab = 'explorer'; // fallback default

const path = window.location.pathname;
if (path.includes('/data/dataset.do') || path.includes('/pages/data/dataset.html')) {
  activeTab = urlParams.get('tab') || 'explorer';
} else if (path.includes('/data/datamap.do') || path.includes('/pages/data/datamap.html')) {
  activeTab = urlParams.get('tab') || 'datamap';
} else if (path.includes('/data/erdmap.html')) {
  activeTab = urlParams.get('tab') || 'erdmap';
} else if (path.includes('/data/dberd.html')) {
  activeTab = urlParams.get('tab') || 'db-erd';
} else if (path.includes('/data/scenario.do')) {
  activeTab = urlParams.get('tab') || 'recommend-beginner';
  if (activeTab === 'recommend') activeTab = 'recommend-beginner';
} else if (path.includes('/data/analysis.do')) {
  activeTab = urlParams.get('tab') || 'sql-playground';
} else {
  // 인덱스 페이지 등 기타 가변 서빙에 대한 분기
  activeTab = urlParams.get('tab') || 'explorer';
}

let globalDatamapKeyword = '';
let selectedDataset = null;

const tabContent = document.getElementById('tab-content');

const onSelectDataset = (ds) => {
  const fullDs = getDatasetsSync().find(d => String(d.id) === String(ds.id || ds.svc_no)) || ds;
  selectedDataset = fullDs;
  renderDetailPanel(selectedDataset, () => {
    selectedDataset = null;
    renderDetailPanel(null);
  });
};

const renderTabContent = () => {
  // 기존 동적 렌더링 방식과 정적 HTML 유지 방식을 혼용하기 위한 처리
  // .static-view 클래스가 있는 요소는 숨기기만 하고, 나머지는 삭제합니다.
  Array.from(tabContent.children).forEach(child => {
    if (child.classList.contains('static-view')) {
      child.style.display = 'none';
    } else {
      child.remove();
    }
  });

  const getView = (tab) => {
    const map = {
      'explorer': 'dataset-explorer-view',
      'api-explorer': 'api-explorer-view',
      'datamap': 'datamap-view',
      'keyword-datamap': 'keyword-datamap-view',
      'erdmap': 'erdmap-view',
      'sql-playground': 'sql-playground-view',
      'api-live-join': 'api-live-join-view',
      'api-hygiene': 'api-hygiene-view',
      'api-barcode': 'api-barcode-view',
      'db-erd': 'db-erd-view',
      'nongshim-spec': 'nongshim-spec-view',
      'wordcloud': 'wordcloud-view',
      'recommend-beginner': 'scenario-view',
      'recommend-developer': 'scenario-view'
    };
    const id = map[tab] || `${tab}-view`;
    let view = document.getElementById(id);
    if (!view) {
      view = document.createElement('div');
      view.id = id;
      view.className = 'static-view w-full h-full relative';
      tabContent.appendChild(view);
    }
    view.style.display = 'block';
    return view;
  };

  const currentView = getView(activeTab);

  if (activeTab === 'explorer') {
    renderDatasetExplorer(currentView, onSelectDataset);
  } else if (activeTab === 'datamap') {
    renderDataMap(currentView, onSelectDataset);
  } else if (activeTab === 'erdmap') {
    renderRelationDataMap(currentView, onSelectDataset);
  } else if (activeTab === 'sql-playground') {
    renderSqlPlayground(currentView, onSelectDataset);
  } else if (activeTab === 'api-explorer') {
    renderApiExplorer(currentView, onSelectDataset);
  } else if (activeTab === 'api-live-join') {
    renderApiLiveJoin(currentView, onSelectDataset);
  } else if (activeTab === 'keyword-datamap') {
    renderKeywordDataMap(currentView, globalDatamapKeyword, onSelectDataset);
  } else if (activeTab === 'db-erd') {
    renderDbErdMap(currentView, onSelectDataset);
  } else if (activeTab === 'wordcloud') {
    renderWordCloud(currentView, onSelectDataset, globalDatamapKeyword);
  } else if (activeTab === 'recommend-beginner' || activeTab === 'recommend-developer') {
    renderScenarioTabs(currentView);
  }
};

const updateActiveTabUI = () => {
  const datamapTabBar = document.getElementById('datamap-tab-bar');
  const datamapTabs = document.getElementById('datamap-tabs');
  const scenarioTabs = document.getElementById('scenario-tabs');
  const analysisTabs = document.getElementById('analysis-tabs');

  if (datamapTabBar) {
    // 쪼개진 정적 페이지에 속한 서브 탭들의 보임/숨김 제어
  const isDatamapPage = window.location.pathname.includes('/data/datamap.do') || window.location.pathname.includes('/pages/data/datamap.html');
    const isScenarioPage = window.location.pathname.includes('/data/scenario.do');
    const isAnalysisPage = window.location.pathname.includes('/data/analysis.do');

    datamapTabBar.style.display = (isDatamapPage || isScenarioPage || isAnalysisPage) ? 'block' : 'none';
    if (datamapTabs) datamapTabs.style.display = isDatamapPage ? 'flex' : 'none';
    if (scenarioTabs) scenarioTabs.style.display = isScenarioPage ? 'flex' : 'none';
    if (analysisTabs) analysisTabs.style.display = isAnalysisPage ? 'flex' : 'none';
  }

  // datamap 페이지의 통합 탭바 디자인 활성화 제어
  const isDatamapPage = window.location.pathname.includes('/data/datamap.do') || window.location.pathname.includes('/pages/data/datamap.html');
  if (isDatamapPage) {
    const container = document.getElementById('datamap-tabs-container');
    if (container) {
      container.querySelectorAll('button').forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        const isMatch = (btnTab === activeTab);
        if (isMatch) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  // dataset 페이지의 통합 탭바 디자인 활성화 제어
  const isDatasetPage = window.location.pathname.includes('/data/dataset.do') || window.location.pathname.includes('/pages/data/dataset.html');
  if (isDatasetPage) {
    const container = document.getElementById('dataset-tabs-container');
    if (container) {
      container.querySelectorAll('button').forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        const isMatch = (btnTab === activeTab);
        if (isMatch) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  // analysis 페이지의 통합 탭바 디자인 활성화 제어
  const isAnalysisPage = window.location.pathname.includes('/data/analysis.do');
  if (isAnalysisPage) {
    const container = document.getElementById('analysis-tabs-container');
    if (container) {
      container.querySelectorAll('button').forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        const isMatch = (btnTab === activeTab);
        if (isMatch) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  // scenario 페이지의 통합 탭바 디자인 활성화 제어
  const isScenarioPage = window.location.pathname.includes('/data/scenario.do');
  if (isScenarioPage) {
    const container = document.getElementById('scenario-tabs-container');
    if (container) {
      container.querySelectorAll('button').forEach(btn => {
        const btnTab = btn.getAttribute('data-tab');
        const isMatch = (btnTab === activeTab);
        if (isMatch) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  document.querySelectorAll('.nav-menu-btn, .tab-pill, .mobile-nav-btn, .tab-btn').forEach(btn => {
    const tabId = btn.dataset.tab || btn.dataset.nav;
    if (!tabId) return;

    if (btn.classList.contains('tab-pill') || btn.classList.contains('tab-btn')) {
      if (tabId === activeTab) {
        if (tabId === 'recommend-beginner' || tabId === 'recommend-developer') {
          btn.classList.add('border-gov-600', 'text-gov-700', 'font-bold');
          btn.classList.remove('border-transparent', 'text-slate-500', 'font-medium');
        } else if (btn.classList.contains('tab-btn')) {
          btn.classList.add('active');
        } else {
          btn.classList.add('bg-gov-50', 'text-gov-700');
          btn.classList.remove('text-slate-600', 'hover:bg-slate-50');
        }
      } else {
        if (tabId === 'recommend-beginner' || tabId === 'recommend-developer') {
          btn.classList.remove('border-gov-600', 'text-gov-700', 'font-bold');
          btn.classList.add('border-transparent', 'text-slate-500', 'font-medium');
        } else if (btn.classList.contains('tab-btn')) {
          btn.classList.remove('active');
        } else {
          btn.classList.remove('bg-gov-50', 'text-gov-700');
          btn.classList.add('text-slate-600', 'hover:bg-slate-50');
        }
      }
    } else {
      if (tabId === activeTab) {
        if (tabId === 'api-live-join' || tabId === 'api-hygiene' || tabId === 'api-barcode') {
          btn.classList.add('bg-emerald-50', 'text-emerald-700');
          btn.classList.remove('text-emerald-600', 'hover:bg-emerald-50');
        } else {
          btn.classList.add('bg-gov-50', 'text-gov-700');
          btn.classList.remove('text-slate-600', 'hover:text-gov-700', 'hover:bg-slate-50');
        }
      } else {
        if (tabId === 'api-live-join' || tabId === 'api-hygiene' || tabId === 'api-barcode') {
          btn.classList.remove('bg-emerald-50', 'text-emerald-700');
          btn.classList.add('text-emerald-600', 'hover:bg-emerald-50');
        } else {
          btn.classList.remove('bg-gov-50', 'text-gov-700');
          btn.classList.add('text-slate-600', 'hover:text-gov-700', 'hover:bg-slate-50');
        }
      }
    }
  });
};

const TAB_PAGES = {
  'explorer': '/data/dataset.do',
  'datamap': '/data/datamap.do',
  'keyword-datamap': '/data/datamap.do',
  'erdmap': '/data/datamap.do',
  'db-erd': '/data/datamap.do',
  'recommend-beginner': '/data/scenario.do',
  'recommend-developer': '/data/scenario.do',
  'sql-playground': '/data/analysis.do',
  'api-explorer': '/data/dataset.do',
  'api-live-join': '/data/analysis.do',
  'api-hygiene': '/data/analysis.do',
  'api-barcode': '/data/analysis.do',
  'nongshim-spec': '/data/analysis.do',
  'wordcloud': '/data/datamap.do'
};

const changeTab = (tabId) => {
  const targetPage = TAB_PAGES[tabId];
  if (!targetPage) {
    // 예외적인 탭들은 SPA 처리
    activeTab = tabId;
    updateActiveTabUI();
    renderTabContent();
    return;
  }

  const currentPath = window.location.pathname;
  const isDifferentPage = !currentPath.includes(targetPage);

  if (isDifferentPage) {
    // 다른 정적 페이지로 이동해야 하는 경우
    window.location.href = `${targetPage}?tab=${tabId}`;
  } else {
    // 같은 페이지 내에서 서브 탭 전환인 경우 (SPA)
    activeTab = tabId;

    // URL 쿼리스트링만 조용히 갱신
    const newUrl = `${window.location.pathname}?tab=${tabId}`;
    window.history.pushState({ tab: tabId }, '', newUrl);

    updateActiveTabUI();
    renderTabContent();
  }
};

window.switchToKeywordMap = (keyword) => {
  globalDatamapKeyword = keyword || '';
  changeTab('keyword-datamap');
};

window.setGlobalDatamapKeyword = (keyword) => {
  globalDatamapKeyword = keyword || '';
};
window.getGlobalDatamapKeyword = () => globalDatamapKeyword;


document.querySelectorAll('.nav-menu-btn, .tab-pill, .mobile-nav-btn, .tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabId = e.currentTarget.dataset.tab || e.currentTarget.dataset.nav;
    if (tabId) {
      changeTab(tabId);
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

let mobileOpen = false;
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    if (mobileOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenuIcon.classList.remove('ri-menu-line');
      mobileMenuIcon.classList.add('ri-close-line');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuIcon.classList.remove('ri-close-line');
      mobileMenuIcon.classList.add('ri-menu-line');
    }
  });
}

// Mobile nav buttons close the menu
document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    mobileOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenuIcon.classList.remove('ri-close-line');
    mobileMenuIcon.classList.add('ri-menu-line');
  });
});

// Bind click events for Hero section CTA buttons
const btnHeroRecommend = document.getElementById('btn-hero-recommend');
const btnHeroRecommend2 = document.getElementById('btn-hero-recommend-2');

const goToRecommendTab = () => {
  changeTab('recommend-beginner');
  // Smooth scroll down to the sticky tab bar so the user immediately sees the recommend content
  const tabContainer = document.getElementById('tab-pills-container');
  if (tabContainer) {
    tabContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

if (btnHeroRecommend) {
  btnHeroRecommend.addEventListener('click', goToRecommendTab);
}
if (btnHeroRecommend2) {
  btnHeroRecommend2.addEventListener('click', goToRecommendTab);
}

window.switchTab = (tabId) => {
  changeTab(tabId);
};

window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  activeTab = urlParams.get('tab') || 'explorer';
  updateActiveTabUI();
  renderTabContent();
});

// Initial render
updateActiveTabUI();
renderTabContent();

// 데이터 시나리오 추천 렌더러
async function renderScenarioTabs(container) {
  const view = document.getElementById('scenario-view');
  if (!view) return;
  view.style.display = 'block';

  const root = view.querySelector('#scenario-root');
  if (!root) return;

  // ── 상수 ──────────────────────────────────────────────
  const PAGE_SIZE = 12;
  const GRADE_LABELS = { HIGH: '검증 JOIN', MEDIUM: '추천', CHAIN: '체인 JOIN', CASE: '활용 사례', SUPER: 'SUPER' };
  const GRADE_COLORS = {
    HIGH:   'bg-emerald-100 text-emerald-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    CHAIN:  'bg-violet-100 text-violet-700',
    CASE:   'bg-sky-100 text-sky-700',
    SUPER:  'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
  };
  const FILTER_TABS = [
    { key: 'ALL',    label: '전체' },
    { key: 'CASE',   label: '활용 사례' },
    { key: 'HIGH',   label: '검증 JOIN' },
    { key: 'CHAIN',  label: '체인 JOIN' },
    { key: 'MEDIUM', label: '추천' },
  ];

  let allScenarios = [];
  let currentFilter = 'ALL';
  let currentPage   = 1;
  let currentDetail = null; // 상세 보기 중인 시나리오

  // ── 로딩 ──────────────────────────────────────────────
  root.innerHTML = `<div class="flex justify-center items-center py-32 text-slate-400">
    <div style="width:44px;height:44px;border:4px solid #e2e8f0;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  </div>`;

  try {
    const res = await fetch('/api/join-scenarios?size=1000');
    const data = await res.json();
    allScenarios = Array.isArray(data) ? data : (data.items || []);
  } catch (err) {
    root.innerHTML = `<div class="p-8 text-red-500 text-center">데이터를 불러오는 중 오류가 발생했습니다.</div>`;
    return;
  }

  // ── 헬퍼 ──────────────────────────────────────────────
  const escHtml = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  function filtered() {
    return currentFilter === 'ALL' ? allScenarios : allScenarios.filter(s => s.grade === currentFilter);
  }

  // ── 카드 그리드 렌더 ─────────────────────────────────
  function renderGrid() {
    currentDetail = null;
    const list = filtered();
    const total = list.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    currentPage = Math.min(currentPage, totalPages || 1);
    const slice = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const filterHtml = FILTER_TABS.map(f => {
      const cnt = f.key === 'ALL' ? allScenarios.length : allScenarios.filter(s => s.grade === f.key).length;
      const active = currentFilter === f.key;
      return `<button data-filter="${f.key}"
        class="px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
          active ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                 : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'}"
      >${f.label} <span class="ml-1 opacity-70">${cnt}</span></button>`;
    }).join('');

    const BANNER_GRADIENTS = {
      HIGH:   'from-emerald-500 to-teal-600',
      MEDIUM: 'from-amber-400 to-orange-500',
      CHAIN:  'from-violet-500 to-purple-600',
      CASE:   'from-sky-400 to-blue-500',
      SUPER:  'from-purple-600 to-indigo-700',
    };
    const BANNER_ICONS = {
      HIGH:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>`,
      MEDIUM: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>`,
      CHAIN:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>`,
      CASE:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>`,
      SUPER:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
    };

    const cardHtml = slice.length === 0
      ? `<div class="col-span-full py-24 text-center text-slate-400">해당 시나리오가 없습니다.</div>`
      : slice.map((sc, i) => {
          const gi = allScenarios.indexOf(sc);
          const badgeCls = GRADE_COLORS[sc.grade] || 'bg-gray-100 text-gray-600';
          const badgeLabel = GRADE_LABELS[sc.grade] || sc.grade;
          const desc = (sc.description || '').split('|')[0].replace(/^\s*[-–·]\s*/, '').trim();
          const shortDesc = desc.length > 72 ? desc.slice(0, 72) + '…' : desc;
          const bannerGrad = BANNER_GRADIENTS[sc.grade] || 'from-slate-400 to-slate-600';
          const bannerIcon = BANNER_ICONS[sc.grade] || '';
          return `
          <article data-idx="${gi}" title="${escHtml(sc.title)}"
            class="scenario-card group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden">
            <!-- 썸네일 배너 -->
            <div class="relative h-32 bg-gradient-to-br ${bannerGrad} flex items-center justify-center overflow-hidden">
              <svg class="w-16 h-16 text-white/20 absolute -right-2 -bottom-2 scale-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">${bannerIcon}</svg>
              <svg class="w-10 h-10 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">${bannerIcon}</svg>
            </div>
            <!-- 카드 본문 -->
            <div class="p-4 flex-1 flex flex-col">
              <div class="flex items-center gap-1.5 mb-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${badgeCls}">${badgeLabel}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-500">SQL</span>
              </div>
              <h3 class="text-[14px] font-bold text-slate-800 leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">${escHtml(sc.title)}</h3>
              <p class="text-[12px] text-slate-400 line-clamp-2 flex-1 leading-relaxed">${shortDesc ? escHtml(shortDesc) : '&nbsp;'}</p>
            </div>
            <!-- 카드 푸터 -->
            <div class="px-4 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 font-mono">No.${escHtml(String(sc.no))}</span>
              <span class="text-[11px] font-semibold text-blue-500 group-hover:text-blue-700 flex items-center gap-0.5">자세히 보기
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </span>
            </div>
          </article>`;
        }).join('');

    // 페이지네이션
    let pageHtml = '';
    if (totalPages > 1) {
      const pages = [];
      for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2) {
          pages.push(p);
        } else if (pages[pages.length - 1] !== '…') {
          pages.push('…');
        }
      }
      pageHtml = `<div class="flex items-center justify-center gap-1 mt-10">
        <button data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}
          class="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-30">‹</button>
        ${pages.map(p => p === '…'
          ? `<span class="px-2 text-slate-400">…</span>`
          : `<button data-page="${p}" class="w-9 h-9 rounded-lg text-sm font-semibold border transition-all ${
              p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}">${p}</button>`
        ).join('')}
        <button data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}
          class="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-30">›</button>
      </div>`;
    }

    root.innerHTML = `
      <div class="flex flex-wrap gap-2 mb-6" id="scenario-filter-tabs">${filterHtml}</div>
      <p class="text-sm text-slate-500 mb-4">총 <strong>${total}</strong>개의 시나리오</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="scenario-card-grid">${cardHtml}</div>
      ${pageHtml}`;

    // 이벤트
    root.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        renderGrid();
      });
    });
    root.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.dataset.page);
        if (!isNaN(p) && p >= 1 && p <= totalPages) { currentPage = p; renderGrid(); }
      });
    });
    root.querySelectorAll('.scenario-card').forEach(card => {
      card.addEventListener('click', () => {
        location.href = '/data/scenario/detail.do?idx=' + card.dataset.idx;
      });
    });
  }

  // ── 상세 뷰 렌더 ─────────────────────────────────────
  function renderDetail(idx) {
    currentDetail = idx;
    const sc = allScenarios[idx];
    if (!sc) return;

    const badgeCls   = GRADE_COLORS[sc.grade] || 'bg-gray-100 text-gray-600';
    const badgeLabel = GRADE_LABELS[sc.grade] || sc.grade;
    const descParts  = (sc.description || '').split('|').map(p => p.trim()).filter(Boolean);

    root.innerHTML = `
      <div class="animate-fade-in-up max-w-4xl mx-auto">

        <!-- 뒤로가기 -->
        <button id="scenario-back-btn"
          class="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          목록으로 돌아가기
        </button>

        <!-- 배지 + 제목 -->
        <div class="mb-2">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${badgeCls}">${badgeLabel}</span>
        </div>
        <h1 class="text-2xl font-extrabold text-slate-900 mb-5 leading-tight">${escHtml(sc.title)}</h1>

        ${descParts.length ? `
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 text-slate-600 leading-relaxed text-[15px] space-y-1">
          ${descParts.map(p => `<p>• ${escHtml(p)}</p>`).join('')}
        </div>` : ''}

        <!-- SQL 코드 블록 -->
        <div class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800 mb-6">
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#2d2d2d]">
            <div class="flex items-center gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span class="text-xs font-mono text-gray-400">SQL Query</span>
            <button id="btn-copy-sql" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              복사
            </button>
          </div>
          <div class="p-6 overflow-x-auto">
            <pre class="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">${escHtml(sc.sql)}</pre>
          </div>
        </div>

        <!-- Playground 버튼 -->
        <button id="run-playground-btn"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-colors mb-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          SQL Playground에서 실행해보기
        </button>

        <!-- 활용 기대 효과 -->
        <div class="bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 class="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            활용 기대 효과
          </h3>
          <ul class="space-y-3 text-blue-800 text-sm">
            <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>데이터 융합을 통해 새로운 인사이트 도출</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>복잡한 정보 탐색 시간을 획기적으로 단축</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>대국민 맞춤형 식품 안전 서비스 기획에 즉시 활용 가능</li>
          </ul>
        </div>
      </div>`;

    root.querySelector('#scenario-back-btn').addEventListener('click', () => renderGrid());

    root.querySelector('#btn-copy-sql').addEventListener('click', async () => {
      await navigator.clipboard.writeText(sc.sql).catch(() => {});
      const btn = root.querySelector('#btn-copy-sql');
      if (btn) { btn.textContent = '복사됨 ✓'; setTimeout(() => { if(btn) btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> 복사'; }, 2000); }
    });

    root.querySelector('#run-playground-btn').addEventListener('click', () => {
      sessionStorage.setItem('sqlPlaygroundAutoQuery', sc.sql);
      window.location.href = '/data/analysis.do?tab=sql-playground';
    });
  }

  renderGrid();
}

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
