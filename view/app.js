import { renderDatasetExplorer } from './components/datasetExplorer.js?v=3';
import { renderDataMap } from './components/dataMap.js?v=32';
import { renderErdMap } from './components/erdMap.js?v=4';
import { renderRelationDataMap } from './components/relationDataMap.js?v=6';
import { renderDetailPanel } from './components/detailDataset.js?v=4';
import { renderSqlPlayground } from './components/sqlPlayground.js?v=3';
import { renderApiExplorer } from './components/apiExplorer.js?v=3';
import { renderApiLiveJoin } from './components/apiLiveJoin.js?v=3';
import { renderSuperErdMap } from './components/superErdMap.js?v=3';
import { renderSauceDataMap } from './components/sauceDataMap.js?v=3';
import { renderDbErdMap } from './components/dbErdMap.js?v=9';
import { renderWordCloud } from './components/wordCloud.js?v=3';
import { renderScenarioTabs } from './components/scenarioRecommend.js?v=3';
import { getDatasetsSync } from './datasetStore.js';

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

let initialSearchKeyword = '건강';
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
      'erd-inquiry': 'erd-inquiry-view',
      'super-erdmap': 'super-erdmap-view',
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
  } else if (activeTab === 'erd-inquiry') {
    renderErdMap(currentView, onSelectDataset);
  } else if (activeTab === 'super-erdmap') {
    renderSuperErdMap(currentView, onSelectDataset);
  } else if (activeTab === 'sql-playground') {
    renderSqlPlayground(currentView, onSelectDataset);
  } else if (activeTab === 'api-explorer') {
    renderApiExplorer(currentView, onSelectDataset);
  } else if (activeTab === 'api-live-join') {
    renderApiLiveJoin(currentView, onSelectDataset);
  } else if (activeTab === 'keyword-datamap') {
    renderSauceDataMap(currentView, initialSearchKeyword, onSelectDataset);
  } else if (activeTab === 'db-erd') {
    renderDbErdMap(currentView, onSelectDataset);
  } else if (activeTab === 'wordcloud') {
    renderWordCloud(currentView, onSelectDataset, globalDatamapKeyword);
  } else if (activeTab === 'recommend-beginner') {
    renderScenarioTabs(currentView, 'beginner');
  } else if (activeTab === 'recommend-developer') {
    renderScenarioTabs(currentView, 'developer');
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
        if (tabId === 'api-live-join' || tabId === 'api-hygiene' || tabId === 'api-barcode' || tabId === 'super-erdmap') {
          btn.classList.add('bg-emerald-50', 'text-emerald-700');
          btn.classList.remove('text-emerald-600', 'hover:bg-emerald-50');
        } else {
          btn.classList.add('bg-gov-50', 'text-gov-700');
          btn.classList.remove('text-slate-600', 'hover:text-gov-700', 'hover:bg-slate-50');
        }
      } else {
        if (tabId === 'api-live-join' || tabId === 'api-hygiene' || tabId === 'api-barcode' || tabId === 'super-erdmap') {
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
  initialSearchKeyword = keyword || '소스';
  globalDatamapKeyword = keyword || '';
  changeTab('keyword-datamap');
};

window.setGlobalDatamapKeyword = (keyword) => {
  globalDatamapKeyword = keyword || '';
  initialSearchKeyword = keyword || initialSearchKeyword;
};

window.renderSauceDataMapInto = (container, keyword) => {
  renderSauceDataMap(container, keyword || '검색', null);
};

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
