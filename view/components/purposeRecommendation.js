import {
  purposes,
  datasets,
  subjectColorMap
} from '../datasetData.js';

export function renderPurposeRecommendation(container, onSelectDataset, initialMode = "beginner") {
  let selectedPurposeId = null;
  let mode = initialMode; // "beginner" or "developer"

  const getDatasetById = (id) => datasets.find((d) => d.id === id);

  const render = () => {
    const selected = purposes.find((p) => p.id === selectedPurposeId);

    const renderPurposeCards = () => {
      return purposes.map((purpose) => {
        const isSelected = selectedPurposeId === purpose.id;
        const baseClass = "text-left bg-white border rounded-xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md";
        const activeClass = "border-gov-400 ring-2 ring-gov-100 bg-gov-50/30";
        const inactiveClass = "border-slate-200 hover:border-gov-300";
        
        const iconBaseClass = "w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg";
        const iconActiveClass = "bg-gov-600 text-white";
        const iconInactiveClass = "bg-slate-100 text-slate-500";

        return `
          <button data-id="${purpose.id}" class="purpose-card ${baseClass} ${isSelected ? activeClass : inactiveClass}">
            <div class="${iconBaseClass} ${isSelected ? iconActiveClass : iconInactiveClass}">
              <i class="${purpose.icon}"></i>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-1.5 leading-snug">${purpose.title}</h3>
            <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${purpose.description}</p>
          </button>
        `;
      }).join('');
    };

    const renderSelectedDetails = () => {
      if (!selected) {
        return `
          <div class="text-center py-12 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i class="ri-cursor-line text-slate-400 text-2xl"></i>
            </div>
            <p class="text-sm text-slate-500">위 목적 카드 중 하나를 선택하면 추천 데이터세트가 표시됩니다.</p>
          </div>
        `;
      }

      const dsListHTML = selected.recommendedDatasets.map((dsId) => {
        const ds = getDatasetById(dsId);
        if (!ds) return '';
        return `
          <div data-dsid="${ds.id}" class="recommended-ds-item flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-gov-300 transition-colors group">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gov-600 shrink-0 group-hover:border-gov-300 transition-colors">
              <i class="ri-database-2-line text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="text-sm font-bold text-slate-900 group-hover:text-gov-700 transition-colors truncate">${ds.name}</h5>
              <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${ds.description}</p>
              <div class="flex items-center gap-2 mt-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold border ${subjectColorMap[ds.subject] || 'bg-slate-50 text-slate-600 border-slate-200'}">${ds.subject}</span>
                <span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200">${ds.process}</span>
                ${ds.formats.map(f => `<span class="px-2 py-0.5 rounded-md bg-white text-slate-600 text-[11px] font-medium border border-slate-200">${f}</span>`).join('')}
              </div>
            </div>
            <i class="ri-arrow-right-s-line text-slate-400 text-lg shrink-0 mt-2 group-hover:text-gov-600 transition-colors"></i>
          </div>
        `;
      }).join('');

      const stepsHTML = selected.steps.map((step, i) => `
        <div class="flex items-start gap-4 relative">
          <div class="w-10 h-10 rounded-full bg-gov-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">${i + 1}</div>
          <div class="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3">
            <p class="text-sm text-slate-700">${step}</p>
          </div>
        </div>
      `).join('');

      return `
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
          <div class="bg-gov-50 border-b border-gov-100 px-5 md:px-8 py-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-gov-600 flex items-center justify-center text-white shrink-0">
              <i class="${selected.icon}"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">${selected.title}</h3>
              <p class="text-sm text-slate-600 mt-1">${selected.reason}</p>
            </div>
          </div>

          <div class="px-5 md:px-8 py-6">
            <!-- Recommended datasets -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-star-line text-gov-600"></i> 추천 데이터세트
              </h4>
              <div class="flex flex-col gap-3">
                ${dsListHTML}
              </div>
            </div>

            <!-- Steps -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-route-line text-gov-600"></i> 활용 단계
              </h4>
              <div class="relative">
                <div class="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                <div class="space-y-4">
                  ${stepsHTML}
                </div>
              </div>
            </div>

            <!-- Mode-specific tip -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="${mode === 'beginner' ? 'ri-user-line' : 'ri-code-box-line'} text-gov-600"></i>
                ${mode === 'beginner' ? '초보자를 위한 팁' : '개발자를 위한 팁'}
              </h4>
              <div class="rounded-lg px-4 py-3 border ${mode === 'beginner' ? 'bg-emerald-50 border-emerald-100' : 'bg-gov-50 border-gov-100'}">
                <p class="text-sm leading-relaxed ${mode === 'beginner' ? 'text-emerald-800' : 'text-gov-800'}">
                  ${mode === 'beginner' ? selected.beginnerTip : selected.devTip}
                </p>
              </div>
            </div>

            <!-- Related APIs -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-plug-line text-gov-600"></i> 관련 Open API
              </h4>
              <div class="flex flex-wrap gap-2">
                ${selected.relatedApis.map(api => `<span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">${api}</span>`).join('')}
              </div>
            </div>

            <!-- Required level -->
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <span class="text-sm font-semibold text-slate-700">필요한 사용자 수준</span>
              <span class="px-3 py-1 rounded-full bg-gov-50 text-gov-700 text-xs font-bold border border-gov-100">${selected.requiredLevel}</span>
            </div>
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Section header -->
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">어떤 식품안전 데이터를 활용하고 싶으신가요?</h2>
            <p class="text-sm text-slate-500 max-w-xl mx-auto">목적을 선택하면 적합한 데이터세트와 활용 방법을 추천해 드립니다.</p>
          </div>

          <!-- Purpose cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-14">
            ${renderPurposeCards()}
          </div>

          <!-- Recommendation result -->
          ${renderSelectedDetails()}
        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {

    container.querySelectorAll('.purpose-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        selectedPurposeId = selectedPurposeId === id ? null : id;
        render();
      });
    });

    container.querySelectorAll('.recommended-ds-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const dsId = e.currentTarget.dataset.dsid;
        const ds = getDatasetById(dsId);
        if (ds && onSelectDataset) {
          onSelectDataset(ds);
        }
      });
    });
  };

  render();
}
