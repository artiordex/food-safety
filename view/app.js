import { renderDatasetExplorer } from './components/datasetExplorer.js?v=100';
import { renderDataMap } from './components/dataMap.js?v=101';
import { renderRelationDataMap } from './components/relationDataMap.js?v=100';
import { renderDetailPanel } from './components/detailDataset.js?v=100';
import { renderSqlPlayground } from './components/sqlPlayground.js?v=100';
import { renderApiExplorer } from './components/apiExplorer.js?v=100';
import { renderApiLiveJoin } from './components/apiLiveJoin.js?v=100';
import { renderSauceDataMap } from './components/sauceDataMap.js?v=100';
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
    renderSauceDataMap(currentView, globalDatamapKeyword, onSelectDataset);
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

// 데이터 시나리오 추천 렌더러
async function renderScenarioTabs(container, mode) {
  const view = document.getElementById('scenario-view');
  if (!view) return;
  
  view.style.display = 'block';
  
  const titleEl = view.querySelector('#scenario-sidebar-title');
  if (titleEl) titleEl.textContent = mode === 'developer' ? '개발자 데이터 시나리오' : '일반인 데이터 시나리오';
  
  const descEl = view.querySelector('#scenario-sidebar-desc');
  if (descEl) descEl.textContent = mode === 'developer' ? 'API 연동 및 SQL 쿼리 가이드' : '데이터 활용 비즈니스 아이디어';

  try {
    const res = await fetch('/api/join-scenarios');
    const scenarios = await res.json();
    
    const listEl = view.querySelector('#scenario-list');
    listEl.innerHTML = '';
    
    let activeIndex = 0;

    const renderDetail = (index) => {
      activeIndex = index;
      const scenario = scenarios[index];
      const isDev = mode === 'developer';

      Array.from(listEl.children).forEach((li, i) => {
        if (i === index) {
          li.className = 'px-4 py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg cursor-pointer transition-colors';
        } else {
          li.className = 'px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors';
        }
      });

      const contentEl = view.querySelector('#scenario-content');
      
      const badgeColor = scenario.grade === 'SUPER' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 
                         scenario.grade === 'HIGH' ? 'bg-emerald-500 text-white' : 
                         scenario.grade === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-gray-400 text-white';

      let html = `
        <div class="animate-fade-in-up">
          <div class="mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${badgeColor} shadow-sm">
              ${scenario.grade} 신뢰도
            </span>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">${scenario.title}</h1>
          
          <div class="prose prose-blue max-w-none text-gray-600 mb-10 leading-relaxed text-lg">
            ${scenario.description.split('|').map(p => `<p class="mb-2">${p.trim()}</p>`).join('')}
          </div>
      `;

      if (isDev) {
        html += `
          <div class="mt-8 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#2d2d2d]">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-xs font-mono text-gray-400">SQL Query</span>
              <button class="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
            <div class="p-6 overflow-x-auto">
              <pre><code class="text-sm font-mono text-gray-300 leading-relaxed">${scenario.sql}</code></pre>
            </div>
          </div>
          
          <div class="mt-8">
            <button id="run-playground-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>API Playground에서 쿼리 실행해보기</span>
            </button>
          </div>
        `;
      } else {
        html += `
          <div class="mt-8 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              활용 기대 효과
            </h3>
            <ul class="space-y-3 text-blue-800">
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                데이터 융합을 통해 새로운 인사이트 도출
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                복잡한 정보 탐색 시간을 획기적으로 단축
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                대국민 맞춤형 식품 안전 서비스 기획에 즉시 활용 가능
              </li>
            </ul>
          </div>
        `;
      }

      html += `</div>`;
      contentEl.innerHTML = html;

      const runPlaygroundBtn = contentEl.querySelector('#run-playground-btn');
      if (runPlaygroundBtn) {
        runPlaygroundBtn.addEventListener('click', () => {
          window.sqlPlaygroundAutoQuery = scenario.sql;
          document.querySelector('[data-tab="sql-playground"]')?.click();
        });
      }
    };

    scenarios.forEach((sc, idx) => {
      const li = document.createElement('li');
      li.className = 'px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors line-clamp-2';
      li.textContent = sc.title;
      li.onclick = () => renderDetail(idx);
      listEl.appendChild(li);
    });

    if (scenarios.length > 0) {
      renderDetail(0);
    } else {
      const contentEl = view.querySelector('#scenario-content');
      if (contentEl) contentEl.innerHTML = '<div class="text-center text-gray-500 mt-20">시나리오가 없습니다.</div>';
    }

  } catch (err) {
    console.error(err);
    const contentEl = view.querySelector('#scenario-content');
    if (contentEl) contentEl.innerHTML = '<div class="p-8 text-red-500">데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>';
  }
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
