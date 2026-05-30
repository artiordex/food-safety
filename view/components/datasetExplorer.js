import {
  datasets,
  subjectFilters,
  processFilters,
  issueFilters,
  themeFilters,
  subjectColorMap
} from '../datasetData.js';

export function renderDatasetExplorer(container, onSelectDataset) {
  let search = "";
  let subject = "all";
  let process = "all";
  let issue = "all";
  let theme = "all";

  const render = () => {
    const filtered = datasets.filter((ds) => {
      const matchesSearch =
        search === "" ||
        ds.name.includes(search) ||
        ds.description.includes(search) ||
        ds.includedData.some((d) => d.includes(search));

      const matchesSubject = subject === "all" || ds.subject === subject;
      const matchesProcess = process === "all" || ds.process === process;
      const matchesIssue = issue === "all" || ds.issue === issue;
      const matchesTheme = theme === "all" || ds.theme === theme;

      return matchesSearch && matchesSubject && matchesProcess && matchesIssue && matchesTheme;
    });

    const createFilterButtons = (filters, currentValue, onClick) => {
      return filters.map(f => {
        const isActive = currentValue === f.value;
        const baseClass = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border";
        const activeClass = "bg-gov-600 text-white border-gov-600";
        const inactiveClass = "bg-white text-slate-600 border-slate-200 hover:border-gov-300 hover:text-gov-700";
        
        return `<button data-value="${f.value}" class="filter-btn ${baseClass} ${isActive ? activeClass : inactiveClass}">
          ${f.label}
        </button>`;
      }).join('');
    };

    container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Section title -->
          <div class="mb-8 md:mb-10">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">데이터세트 찾기</h2>
            <p class="text-sm text-slate-500">주제별, 업무별, 이슈별 다차원 필터를 사용하여 원하는 데이터를 정밀하게 탐색하세요.</p>
          </div>

          <!-- Filters -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
            <!-- Search -->
            <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 mb-5 focus-within:border-gov-400 focus-within:ring-2 focus-within:ring-gov-100 transition-all">
              <i class="ri-search-line text-slate-400"></i>
              <input type="text" id="search-input" value="${search}" placeholder="데이터세트명 또는 포함 데이터명 검색" class="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
              ${search ? `<button id="clear-search-btn" class="text-slate-400 hover:text-slate-600"><i class="ri-close-line"></i></button>` : ''}
            </div>

            <!-- Filter groups -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">1. 주제별 (대상)</label>
                <div class="flex flex-wrap gap-2" id="subject-filters">
                  ${createFilterButtons(subjectFilters, subject)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">2. 업무별 (프로세스)</label>
                <div class="flex flex-wrap gap-2" id="process-filters">
                  ${createFilterButtons(processFilters, process)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">3. 이슈별 (관심사)</label>
                <div class="flex flex-wrap gap-2" id="issue-filters">
                  ${createFilterButtons(issueFilters, issue)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">4. 테마별 (활용목적)</label>
                <div class="flex flex-wrap gap-2" id="theme-filters">
                  ${createFilterButtons(themeFilters, theme)}
                </div>
              </div>
            </div>

            <!-- Active filter count -->
            <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span class="text-sm text-slate-500">
                검색 결과 <strong class="text-gov-700">${filtered.length}건</strong> / 전체 ${datasets.length}건
              </span>
              ${(subject !== "all" || process !== "all" || issue !== "all" || theme !== "all") ? `
                <button id="reset-filters-btn" class="text-xs text-gov-600 hover:text-gov-800 font-medium">필터 초기화</button>
              ` : ''}
            </div>
          </div>

          <!-- Dataset cards grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            ${filtered.map(ds => `
              <div data-id="${ds.id}" class="dataset-card flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gov-200 transition-all duration-300 cursor-pointer group h-full">
                <div class="p-5 md:p-6 flex-1">
                  <!-- Tags -->
                  <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${subjectColorMap[ds.subject] || "bg-slate-50 text-slate-600 border-slate-200"}">
                      ${ds.subject}
                    </span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-slate-50 text-slate-600 border-slate-200">
                      ${ds.process}
                    </span>
                    ${ds.issue !== '해당없음' ? `
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                        ${ds.issue}
                      </span>
                    ` : ''}
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                      데이터 ${ds.dataCount}개
                    </span>
                  </div>
                  
                  <h3 class="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-gov-700 transition-colors">
                    ${ds.name}
                  </h3>
                  <p class="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    ${ds.description}
                  </p>
                  
                  <div class="flex items-center gap-1.5 mb-4 flex-wrap">
                    <span class="text-xs text-slate-400 font-medium">추천 테마:</span>
                    <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-medium border border-blue-100">${ds.theme}</span>
                  </div>

                  <div class="border-t border-slate-100 pt-3 mt-auto">
                    <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">주요 컬럼 구성</p>
                    <ul class="space-y-1">
                      ${ds.includedData.slice(0, 3).map(item => `
                        <li class="text-xs text-slate-600 flex items-start gap-1.5">
                          <i class="ri-checkbox-circle-line text-teal-500 text-[10px] mt-0.5 shrink-0"></i>${item}
                        </li>
                      `).join('')}
                      ${ds.includedData.length > 3 ? `
                        <li class="text-xs text-slate-400 pl-4">외 ${ds.includedData.length - 3}개 데이터</li>
                      ` : ''}
                    </ul>
                  </div>
                </div>
                <div class="px-5 md:px-6 pb-5 md:pb-6 pt-0 flex gap-2 mt-auto">
                  <button class="flex-1 px-4 py-2.5 rounded-lg bg-gov-600 text-white text-xs font-semibold hover:bg-gov-700 transition-colors whitespace-nowrap">데이터셋 분석하기</button>
                  <button class="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:border-gov-300 hover:text-gov-700 transition-colors whitespace-nowrap">스키마 보기</button>
                </div>
              </div>
            `).join('')}
          </div>

          ${filtered.length === 0 ? `
            <div class="text-center py-16">
              <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <i class="ri-search-line text-slate-400 text-2xl"></i>
              </div>
              <p class="text-slate-500 text-sm">다중 필터 조건에 일치하는 데이터세트가 없습니다.</p>
              <button id="no-result-reset-btn" class="mt-3 text-sm text-gov-600 font-medium hover:text-gov-800">필터 초기화하기</button>
            </div>
          ` : ''}
        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    const searchInput = container.querySelector('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        search = e.target.value;
        render();
        const newSearchInput = container.querySelector('#search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          const val = newSearchInput.value;
          newSearchInput.value = '';
          newSearchInput.value = val;
        }
      });
    }

    const clearSearchBtn = container.querySelector('#clear-search-btn');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        search = "";
        render();
      });
    }

    const bindFilters = (id, setter) => {
      const wrapper = container.querySelector(id);
      if (wrapper) {
        wrapper.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            setter(e.currentTarget.dataset.value);
            render();
          });
        });
      }
    };

    bindFilters('#subject-filters', (v) => subject = v);
    bindFilters('#process-filters', (v) => process = v);
    bindFilters('#issue-filters', (v) => issue = v);
    bindFilters('#theme-filters', (v) => theme = v);

    const resetFiltersBtn = container.querySelector('#reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        subject = "all";
        process = "all";
        issue = "all";
        theme = "all";
        render();
      });
    }

    const noResultResetBtn = container.querySelector('#no-result-reset-btn');
    if (noResultResetBtn) {
      noResultResetBtn.addEventListener('click', () => {
        search = "";
        subject = "all";
        process = "all";
        issue = "all";
        theme = "all";
        render();
      });
    }

    container.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const ds = datasets.find(d => d.id === id);
        if (ds && onSelectDataset) {
          onSelectDataset(ds);
        }
      });
    });
  };

  render();
}
