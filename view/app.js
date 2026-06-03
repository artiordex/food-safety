import { renderDatasetExplorer } from './components/datasetExplorer.js';
import { renderPurposeRecommendation } from './components/purposeRecommendation.js';
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
import { renderNongshimDataset } from './components/nongshimDataset.js';

const urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab') || 'explorer';
if (activeTab === 'recommend') activeTab = 'recommend-beginner';
if (window.location.pathname.includes('datamap.html') && !urlParams.has('tab')) {
  activeTab = 'datamap';
}
if (window.location.pathname.includes('analysis.html') && !urlParams.has('tab')) {
  activeTab = 'api-explorer';
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
  } else if (activeTab === 'recommend-beginner') {
    renderPurposeRecommendation(tabContent, onSelectDataset, 'beginner');
  } else if (activeTab === 'recommend-developer') {
    renderPurposeRecommendation(tabContent, onSelectDataset, 'developer');
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
  } else if (activeTab === 'nongshim-spec') {
    renderNongshimDataset(tabContent);
  }
};

const updateActiveTabUI = () => {
  const datamapTabBar = document.getElementById('datamap-tab-bar');
  const datamapTabs = document.getElementById('datamap-tabs');
  const scenarioTabs = document.getElementById('scenario-tabs');
  if (datamapTabBar) {
    const isDatamap = (
      activeTab === 'datamap' ||
      activeTab === 'keyword-datamap' ||
      activeTab === 'erdmap' ||
      activeTab === 'erd-inquiry' ||
      activeTab === 'sql-playground' ||
      activeTab === 'api-explorer' ||
      activeTab === 'api-live-join' ||
      activeTab === 'api-hygiene' ||
      activeTab === 'api-barcode' ||
      activeTab === 'nongshim-spec'
    );
    const isScenario = (activeTab === 'recommend-beginner' || activeTab === 'recommend-developer');
    if (isDatamap || isScenario) {
      datamapTabBar.style.display = 'block';
      if (datamapTabs) datamapTabs.style.display = isDatamap ? 'flex' : 'none';
      if (scenarioTabs) scenarioTabs.style.display = isScenario ? 'flex' : 'none';
    } else {
      datamapTabBar.style.display = 'none';
    }
  }

  document.querySelectorAll('.nav-menu-btn, .tab-pill, .mobile-nav-btn').forEach(btn => {
    const tabId = btn.dataset.tab || btn.dataset.nav;
    if (!tabId) return;

    if (btn.classList.contains('tab-pill')) {
      if (tabId === activeTab) {
      } else {
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

const changeTab = (tabId) => {
  activeTab = tabId;
  updateActiveTabUI();
  renderTabContent();
};

window.switchToKeywordMap = (keyword) => {
  initialSearchKeyword = keyword || '소스';
  changeTab('keyword-datamap');
};

document.querySelectorAll('.nav-menu-btn, .tab-pill, .mobile-nav-btn').forEach(btn => {
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

// Initial render
updateActiveTabUI();
renderTabContent();
