import { renderDatasetExplorer } from './components/datasetExplorer.js';
import { renderDataMap } from './components/dataMap.js';
import { renderErdMap } from './components/erdMap.js';
import { renderRelationDataMap } from './components/relationDataMap.js';
import { renderDetailPanel } from './components/detailPanel.js';
import { renderSqlPlayground } from './components/sqlPlayground.js';
import { renderApiExplorer } from './components/apiExplorer.js';
import { renderApiLiveJoin } from './components/apiLiveJoin.js';
import { renderLocalHygiene } from './components/localHygiene.js';
import { renderBarcodeSearch } from './components/barcodeSearch.js';
import { renderSuperErdMap } from './components/superErdMap.js';
import { renderSauceDataMap } from './components/sauceDataMap.js';
import { renderDbErdMap } from './components/dbErdMap.js';
import { renderNongshimDataset } from './components/nongshimDataset.js';
import { renderWordCloud } from './components/wordCloud.js';
import { renderScenarioTabs } from './components/scenarioRecommend.js';

const urlParams = new URLSearchParams(window.location.search);
let activeTab = 'explorer'; // fallback default

const path = window.location.pathname;
if (path.includes('/data/dataset.html')) {
  activeTab = urlParams.get('tab') || 'explorer';
} else if (path.includes('/data/datamap.html')) {
  activeTab = urlParams.get('tab') || 'datamap';
} else if (path.includes('/data/erdmap.html')) {
  activeTab = urlParams.get('tab') || 'erdmap';
} else if (path.includes('/data/dberd.html')) {
  activeTab = urlParams.get('tab') || 'db-erd';
} else if (path.includes('/data/scenario.html')) {
  activeTab = urlParams.get('tab') || 'recommend-beginner';
  if (activeTab === 'recommend') activeTab = 'recommend-beginner';
} else if (path.includes('/data/analysis.html')) {
  activeTab = urlParams.get('tab') || 'sql-playground';
} else {
  // 인덱스 페이지 등 기타 가변 서빙에 대한 분기
  activeTab = urlParams.get('tab') || 'explorer';
}

let initialSearchKeyword = '소스';
let selectedDataset = null;

const tabContent = document.getElementById('tab-content');

const onSelectDataset = (ds) => {
  selectedDataset = ds;
  renderDetailPanel(selectedDataset, () => {
    selectedDataset = null;
    renderDetailPanel(null);
  });
};

const renderTabContent = () => {
  tabContent.innerHTML = ''; // clear

  if (activeTab === 'explorer') {
    renderDatasetExplorer(tabContent, onSelectDataset);
  } else if (activeTab === 'datamap') {
    renderDataMap(tabContent, onSelectDataset);
  } else if (activeTab === 'erdmap') {
    renderRelationDataMap(tabContent, onSelectDataset);
  } else if (activeTab === 'erd-inquiry') {
    renderErdMap(tabContent, onSelectDataset);
  } else if (activeTab === 'super-erdmap') {
    renderSuperErdMap(tabContent, onSelectDataset);
  } else if (activeTab === 'sql-playground') {
    renderSqlPlayground(tabContent, onSelectDataset);
  } else if (activeTab === 'api-explorer') {
    renderApiExplorer(tabContent, onSelectDataset);
  } else if (activeTab === 'api-live-join') {
    renderApiLiveJoin(tabContent, onSelectDataset);
  } else if (activeTab === 'api-hygiene') {
    renderLocalHygiene(tabContent, onSelectDataset);
  } else if (activeTab === 'api-barcode') {
    renderBarcodeSearch(tabContent, onSelectDataset);
  } else if (activeTab === 'keyword-datamap') {
    renderSauceDataMap(tabContent, initialSearchKeyword, onSelectDataset);
  } else if (activeTab === 'db-erd') {
    renderDbErdMap(tabContent);
  } else if (activeTab === 'nongshim-spec') {
    renderNongshimDataset(tabContent);
  } else if (activeTab === 'wordcloud') {
    renderWordCloud(tabContent, onSelectDataset);
  } else if (activeTab === 'recommend-beginner') {
    renderScenarioTabs(tabContent, 'beginner');
  } else if (activeTab === 'recommend-developer') {
    renderScenarioTabs(tabContent, 'developer');
  }
};

const updateActiveTabUI = () => {
  const datamapTabBar = document.getElementById('datamap-tab-bar');
  const datamapTabs = document.getElementById('datamap-tabs');
  const scenarioTabs = document.getElementById('scenario-tabs');
  const analysisTabs = document.getElementById('analysis-tabs');
  
  if (datamapTabBar) {
    // 쪼개진 정적 페이지에 속한 서브 탭들의 보임/숨김 제어
    const isDatamapPage = window.location.pathname.includes('/data/datamap.html');
    const isScenarioPage = window.location.pathname.includes('/data/scenario.html');
    const isAnalysisPage = window.location.pathname.includes('/data/analysis.html');
    
    datamapTabBar.style.display = (isDatamapPage || isScenarioPage || isAnalysisPage) ? 'block' : 'none';
    if (datamapTabs) datamapTabs.style.display = isDatamapPage ? 'flex' : 'none';
    if (scenarioTabs) scenarioTabs.style.display = isScenarioPage ? 'flex' : 'none';
    if (analysisTabs) analysisTabs.style.display = isAnalysisPage ? 'flex' : 'none';
  }

  // datamap 페이지의 통합 탭바 디자인 활성화 제어
  const isDatamapPage = window.location.pathname.includes('/data/datamap.html');
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
  const isDatasetPage = window.location.pathname.includes('/data/dataset.html');
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
  const isAnalysisPage = window.location.pathname.includes('/data/analysis.html');
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
  const isScenarioPage = window.location.pathname.includes('/data/scenario.html');
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
  'explorer': '/data/dataset.html',
  'datamap': '/data/datamap.html',
  'keyword-datamap': '/data/datamap.html',
  'erdmap': '/data/datamap.html',
  'db-erd': '/data/datamap.html',
  'recommend-beginner': '/data/scenario.html',
  'recommend-developer': '/data/scenario.html',
  'sql-playground': '/data/analysis.html',
  'api-explorer': '/data/dataset.html',
  'api-live-join': '/data/analysis.html',
  'api-hygiene': '/data/analysis.html',
  'api-barcode': '/data/analysis.html',
  'nongshim-spec': '/data/analysis.html',
  'wordcloud': '/data/datamap.html'
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
  changeTab('keyword-datamap');
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
