export function renderDatasetExplorer(container, onSelectDataset) {
  // Styles based on the user's HTML structure
  const styleStr = `
    <style>
      .site_cnt { display: flex; max-width: 1200px; margin: 0 auto; gap: 10px; font-family: 'Nanum Gothic', sans-serif; }
      .fl { float: left; }
      .w_317 { width: 317px; }
      .w_850 { width: 850px; flex: 1; }
      .box { border: 1px solid #ccc; background: #fff; min-height: 600px; }
      .h05 { background: #0099d8; color: #fff; padding: 12px; margin: 0; font-size: 16px; text-align: center; font-weight: bold; }
      
      #layerTree { padding: 15px; }
      #layerTree ul { list-style: none; padding-left: 15px; margin: 5px 0; }
      #layerTree > ul { padding-left: 0; }
      #layerTree li { margin: 3px 0; position: relative; }
      #layerTree li > a { text-decoration: none; color: #333; font-size: 14px; padding: 2px 5px; display: inline-block; }
      #layerTree li > a:hover { background-color: #e1f5fe; }
      #layerTree li.active > a { background-color: #0099d8; color: #fff; font-weight: bold; border-radius: 3px; }
      
      /* Folder Icons */
      #layerTree li > a::before {
        content: "\\EA4A"; /* Remix Icon folder */
        font-family: "remixicon";
        margin-right: 6px;
        color: #f6c358;
      }
      
      .struct_tb { width: 100%; border-collapse: collapse; text-align: center; font-size: 13px; }
      .struct_tb caption { display: none; }
      .struct_tb th { padding: 12px 10px; background: #f4f4f4; border-bottom: 1px solid #ccc; font-weight: bold; }
      .struct_tb td { padding: 12px 10px; border-bottom: 1px solid #eee; color: #555; }
      .struct_tb td a { color: #0066cc; text-decoration: none; }
      .struct_tb td a:hover { text-decoration: underline; }
      
      /* 상단 검색 영역 */
      .search_area { max-width: 1200px; margin: 0 auto 15px auto; padding: 15px 20px; background: #f8f9fa; border: 1px solid #ddd; display: flex; align-items: center; gap: 10px; }
    </style>
  `;

  container.innerHTML = `
    <div class="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">전체 데이터세트 탐색</h2>
        <p class="text-slate-500 text-sm">식품의약품안전처에서 제공하는 169종의 공공데이터를 한눈에 둘러보세요.</p>
      </div>

      <!-- Category Filter Chips -->
      <div id="category-chips" class="flex flex-wrap justify-center gap-2 mb-10">
        <!-- Chips will be generated here -->
      </div>

      <!-- Dataset Cards Grid -->
      <div id="dataset-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div class="col-span-full py-20 text-center text-slate-400">데이터를 불러오는 중입니다...</div>
      </div>
    </div>
  `;

  let allData = [];
  let currentCategory = '전체';

  const chipsContainer = container.querySelector('#category-chips');
  const cardsContainer = container.querySelector('#dataset-cards-container');

  const renderCards = () => {
    let items = allData;

    if (currentCategory !== '전체') {
      items = items.filter(item => item.cat === currentCategory);
    }

    if (items.length === 0) {
      cardsContainer.innerHTML = '<div class="col-span-full py-20 text-center text-slate-400">해당 카테고리에 데이터가 없습니다.</div>';
      return;
    }

    cardsContainer.innerHTML = items.map(item => `
      <div class="dataset-card bg-white border border-slate-200 rounded-xl p-5 hover:border-gov-500 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group" data-id="${item.svc_no}">
        <div class="flex justify-between items-start mb-3">
          <span class="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md">${item.data_type_nm || 'OPEN API'}</span>
          <div class="flex gap-1">
            <span class="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-200 group-hover:bg-white transition-colors">JSON</span>
            <span class="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-200 group-hover:bg-white transition-colors">XML</span>
          </div>
        </div>
        <h4 class="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-gov-700 transition-colors">${item.svc_nm}</h4>
        <p class="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">${item.desc || (item.svc_nm + ' 공공데이터입니다.')}</p>
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div class="flex items-center gap-1.5 text-xs text-slate-500">
            <i class="ri-building-line"></i> ${item.provd_instt_nm || '식약처'}
          </div>
          <span class="text-[10px] font-medium text-gov-600 bg-gov-50 px-2 py-1 rounded-full">${item.cat || ''}</span>
        </div>
      </div>
    `).join('');

    // Event listeners for cards
    cardsContainer.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const svc_no = e.currentTarget.getAttribute('data-id');
        const ds = allData.find(d => d.svc_no === svc_no);
        if (ds && onSelectDataset) {
          onSelectDataset({
            id: ds.svc_no,
            name: ds.svc_nm,
            subject: ds.cat,
            process: ds.cat,
            issue: '해당없음',
            theme: ds.cat,
            description: ds.desc || '',
            includedData: ds.fields ? ds.fields.map(f => f.kor_nm || f.field) : [],
            dataCount: ds.sample_data_length || 0
          });
        }
      });
    });
  };

  const renderChips = (cats) => {
    const allCats = ['전체', ...cats];
    chipsContainer.innerHTML = allCats.map(c => `
      <button class="category-chip px-4 py-2 rounded-full text-sm font-medium transition-all ${c === currentCategory ? 'bg-gov-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}" data-val="${c}">
        ${c}
      </button>
    `).join('');

    chipsContainer.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        currentCategory = e.currentTarget.getAttribute('data-val');
        renderChips(cats); // Re-render to update active state
        renderCards();
      });
    });
  };

  Promise.all([
    fetch('/api/dataset-tree').then(res => res.json()),
    fetch('/api/tables').then(res => res.json())
  ])
    .then(([data, dbTables]) => {
      // DB에 실제 존재하는 테이블만 남기기
      const validTableNames = dbTables.map(t => t.name);
      allData = (data || []).filter(d => validTableNames.includes(d.svc_no));
      
      // 고유 카테고리 추출
      const cats = [...new Set(allData.map(d => d.cat).filter(Boolean))].sort();
      
      renderChips(cats);
      renderCards();
    })
    .catch(err => {
      console.error(err);
      tb_struct_list.innerHTML = '<tr><td colspan="4" style="color: red; padding: 20px;">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>';
    });
}
