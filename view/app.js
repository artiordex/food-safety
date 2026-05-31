import { renderDatasetExplorer } from './components/datasetExplorer.js';
import { renderPurposeRecommendation } from './components/purposeRecommendation.js';
import { renderDataMap } from './components/dataMap.js';
import { renderErdMap } from './components/erdMap.js';
import { renderDetailPanel } from './components/detailPanel.js';
import { renderSqlPlayground } from './components/sqlPlayground.js';
import { renderApiExplorer } from './components/apiExplorer.js';

let activeTab = 'explorer'; // 'explorer', 'recommend', 'datamap', 'erdmap'
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
  } else if (activeTab === 'recommend') {
    renderPurposeRecommendation(tabContent, onSelectDataset);
  } else if (activeTab === 'datamap') {
    renderDataMap(tabContent, onSelectDataset);
  } else if (activeTab === 'erdmap') {
    renderErdMap(tabContent, onSelectDataset);
  } else if (activeTab === 'sql-playground') {
    renderSqlPlayground(tabContent, onSelectDataset);
  } else if (activeTab === 'api-explorer') {
    renderApiExplorer(tabContent, onSelectDataset);
  }
};

const updateActiveTabUI = () => {
  document.querySelectorAll('.nav-menu-btn, .tab-pill, .mobile-nav-btn').forEach(btn => {
    const tabId = btn.dataset.tab || btn.dataset.nav;
    if (!tabId) return;

    if (btn.classList.contains('tab-pill')) {
      if (tabId === activeTab) {
        btn.className = "tab-pill px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all bg-gov-600 text-white shadow-sm";
      } else {
        btn.className = "tab-pill px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all text-slate-600 hover:text-gov-700 hover:bg-slate-50";
      }
    } else {
      if (tabId === activeTab) {
        btn.classList.add('bg-gov-50', 'text-gov-700');
        btn.classList.remove('text-slate-600', 'hover:text-gov-700', 'hover:bg-slate-50');
      } else {
        btn.classList.remove('bg-gov-50', 'text-gov-700');
        btn.classList.add('text-slate-600', 'hover:text-gov-700', 'hover:bg-slate-50');
      }
    }
  });
};

const changeTab = (tabId) => {
  activeTab = tabId;
  updateActiveTabUI();
  renderTabContent();
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
  changeTab('recommend');
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
