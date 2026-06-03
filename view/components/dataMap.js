import { datasets } from '../datasetData.js';

export function renderDataMap(container, onSelectDataset) {
  // DB에서 데이터 가져오기
  const fetchDataAndRender = async () => {
    try {
      const res = await fetch('/api/searchDatasetList.do', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_idx: 1, show_cnt: 1000 })
      });
      const data = await res.json();

      const subjectCounts = {};
      let totalCount = 0;

      data.list.forEach(d => {
        const subj = d.cl_cd_nm || '기타';
        if (!subjectCounts[subj]) subjectCounts[subj] = { count: 0, items: [] };
        subjectCounts[subj].count += 1;

        subjectCounts[subj].items.push({
          id: d.svc_no,
          name: d.svc_nm,
          description: d.svc_nm + " 공공데이터 API입니다.",
          formats: ["JSON", "XML"],
          users: [d.provd_instt_nm || '식품의약품안전처']
        });
        totalCount += 1;
      });

      const subjectArray = Object.keys(subjectCounts).map(subj => ({
        subject: subj,
        count: subjectCounts[subj].count,
        ratio: ((subjectCounts[subj].count / totalCount) * 100).toFixed(1),
        items: subjectCounts[subj].items
      })).sort((a, b) => b.count - a.count);

      renderUI(subjectArray, totalCount);

    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="p-8 text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    }
  };

  const renderUI = (subjectArray, totalCount) => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <!-- Header -->
        <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-pie-chart-2-fill text-gov-600"></i> 분야별 데이터맵 (비율 분포)
            </h2>
          </div>
          
          <!-- 키워드 검색기 (키워드 데이터맵으로 전환) -->
          <div class="flex items-center gap-2 w-full md:w-auto max-w-md">
            <div class="relative flex-1 md:w-64">
              <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" id="datamap-keyword-search" 
                class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gov-500 focus:ring-1 focus:ring-gov-500" 
                style="padding-left: 2.5rem !important;"
                placeholder="키워드 검색 (예: 초콜릿, 우유...)">
            </div>
            <button id="btn-datamap-keyword-search" 
              class="px-4 py-2 bg-gov-600 text-white rounded-lg text-sm font-medium hover:bg-gov-700 transition-colors whitespace-nowrap">
              키워드 맵 조회
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 좌측: D3 Treemap -->
          <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[500px]">
             <h3 class="text-lg font-bold text-slate-800 mb-6">데이터 분포 트리맵 (Treemap)</h3>
             <div id="treemap-container" class="flex-1 w-full rounded-xl overflow-hidden relative bg-slate-50 border border-slate-100 min-h-[400px]">
             </div>
          </div>

          <!-- 우측: 카테고리 비율 현황 -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[500px]">
             <h3 class="text-lg font-bold text-slate-800 mb-6 flex justify-between items-end">
               <span>카테고리 비율 현황</span>
               <span class="text-xs font-normal text-slate-500">총 ${totalCount}종</span>
             </h3>
             <div class="flex-1 overflow-y-auto pr-2 space-y-4" id="category-list-container">
             </div>
          </div>
        </div>
        
        <!-- 하단: 선택된 카테고리의 데이터세트 목록 -->
        <div id="selected-category-datasets" class="mt-8 hidden animate-fade-in">
          <h3 class="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3 flex items-center justify-between">
            <span id="selected-category-title">선택된 카테고리</span>
            <button id="close-category-panel" class="text-slate-400 hover:text-slate-600"><i class="ri-close-line text-2xl"></i></button>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="dataset-cards-container">
          </div>
        </div>
      </section>
    `;

    renderCategoryList(subjectArray);

    // Treemap 렌더링을 약간 지연시켜 컨테이너 레이아웃이 잡히도록 함
    setTimeout(() => {
      renderTreemap(subjectArray);
    }, 100);

    // 하단 패널 닫기 버튼
    const closeBtn = container.querySelector('#close-category-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        container.querySelector('#selected-category-datasets').classList.add('hidden');
      });
    }

    // 키워드 데이터맵 검색 버튼 연동
    const searchInput = container.querySelector('#datamap-keyword-search');
    const searchBtn = container.querySelector('#btn-datamap-keyword-search');
    if (searchBtn && searchInput) {
      const doSearch = () => {
        const kw = searchInput.value.trim();
        if (kw) {
          if (typeof window.switchToKeywordMap === 'function') {
            window.switchToKeywordMap(kw);
          }
        } else {
          alert('검색어를 입력해 주세요.');
          searchInput.focus();
        }
      };
      searchBtn.addEventListener('click', doSearch);
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          doSearch();
        }
      });
    }
  };

  const colorScale = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#f97316', '#6366f1', '#ec4899', '#14b8a6',
    '#84cc16', '#a855f7', '#f43f5e', '#0ea5e9'
  ];

  const renderCategoryList = (subjectArray) => {
    const listContainer = container.querySelector('#category-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = subjectArray.map((item, idx) => {
      const color = colorScale[idx % colorScale.length];
      return `
        <div class="category-item cursor-pointer group p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200" data-subject="${item.subject}">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
              <span class="font-medium text-slate-700 text-sm group-hover:text-gov-700">${item.subject}</span>
            </div>
            <span class="text-xs font-bold text-slate-900">${item.count}종 <span class="text-slate-400 font-normal">(${item.ratio}%)</span></span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div class="h-1.5 rounded-full transition-all duration-1000" style="width: 0%; background-color: ${color}" data-target-width="${item.ratio}%"></div>
          </div>
        </div>
      `;
    }).join('');

    // Animate progress bars
    setTimeout(() => {
      listContainer.querySelectorAll('[data-target-width]').forEach(el => {
        el.style.width = el.dataset.targetWidth;
      });
    }, 50);

    // Click event for category list
    listContainer.querySelectorAll('.category-item').forEach(el => {
      el.addEventListener('click', () => {
        const subject = el.dataset.subject;
        const categoryData = subjectArray.find(s => s.subject === subject);
        if (categoryData) {
          showCategoryDatasets(categoryData);
        }
      });
    });
  };

  const renderTreemap = (subjectArray) => {
    if (typeof d3 === 'undefined') return;

    const containerEl = document.getElementById('treemap-container');
    if (!containerEl) return;

    const width = containerEl.clientWidth || 800;
    const height = containerEl.clientHeight || 500;

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
      .attr("fill", (d, i) => colorScale[i % colorScale.length])
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
      .attr("x", 8)
      .attr("y", 20)
      .attr("fill", "white")
      .attr("font-weight", "600")
      .attr("font-size", d => {
        const area = (d.x1 - d.x0) * (d.y1 - d.y0);
        return area > 10000 ? "16px" : area > 4000 ? "13px" : "11px";
      })
      .text(d => {
        const w = d.x1 - d.x0;
        return w > 50 ? d.data.name : "";
      });

    leaf.append("text")
      .attr("x", 8)
      .attr("y", 40)
      .attr("fill", "rgba(255,255,255,0.8)")
      .attr("font-size", d => {
        const area = (d.x1 - d.x0) * (d.y1 - d.y0);
        return area > 10000 ? "13px" : area > 4000 ? "11px" : "0px";
      })
      .text(d => {
        const w = d.x1 - d.x0;
        return w > 50 ? `${d.data.value}종` : "";
      });
  };

  const showCategoryDatasets = (categoryData) => {
    const panel = container.querySelector('#selected-category-datasets');
    const title = container.querySelector('#selected-category-title');
    const cardsContainer = container.querySelector('#dataset-cards-container');

    if (!panel || !title || !cardsContainer) return;

    panel.classList.remove('hidden');
    title.innerHTML = `<span class="text-gov-600">${categoryData.subject}</span> 분야 데이터세트 (${categoryData.count}종)`;

    cardsContainer.innerHTML = categoryData.items.map(ds => `
      <div class="dataset-card bg-white border border-slate-200 rounded-xl p-4 hover:border-gov-400 hover:shadow-md transition-all cursor-pointer flex flex-col h-full" data-id="${ds.id}">
        <div class="flex justify-between items-start mb-2">
          <span class="px-2 py-1 bg-gov-50 text-gov-700 text-[10px] font-bold rounded">OPEN API</span>
          <div class="flex gap-1">
            ${ds.formats.map(f => `<span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200">${f}</span>`).join('')}
          </div>
        </div>
        <h4 class="font-bold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug">${ds.name}</h4>
        <p class="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">${ds.description}</p>
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div class="flex items-center gap-1 text-[11px] text-slate-500">
            <i class="ri-building-line"></i> ${ds.users[0] || '식품의약품안전처'}
          </div>
        </div>
      </div>
    `).join('');

    // 카드 클릭 이벤트 (상세 패널 등)
    cardsContainer.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', () => {
        const dsId = card.dataset.id;
        let ds = datasets.find(i => i.id === dsId);
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
      });
    });

    // 스크롤 이동
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  fetchDataAndRender();
}
