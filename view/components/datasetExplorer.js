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

  container.innerHTML = styleStr + `
    <div style="padding: 20px; text-align: center;">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1a1a2e;">데이터구조 검색</h2>
    </div>

    <!-- 검색 영역 -->
    <div class="search_area">
      <label style="font-weight: bold; font-size: 14px;">검색어</label>
      <select id="search-type" style="padding: 6px; border: 1px solid #ccc;">
        <option value="all">전체 (서비스명 + 제공기관)</option>
        <option value="svc_nm">서비스명</option>
        <option value="provd_instt_nm">제공기관</option>
      </select>
      <input type="text" id="search-input" placeholder="검색어를 입력하세요." style="flex: 1; padding: 6px 10px; border: 1px solid #ccc;">
      <button id="search-btn" style="background: #0099d8; color: white; border: none; padding: 6px 20px; cursor: pointer; font-weight: bold;">검색</button>
    </div>

    <!-- 레이아웃 -->
    <div class="site_cnt">
        <!-- 트리 영역 -->
        <div class="fl w_317 m_r_6">
            <div class="box">
                <h1 class="h05">데이터카테고리</h1>
                <div id="layerTree">
                    <ul>
                        <li class="jstree-open tree-node" data-type="전체" data-val="전체"><a href="#">전체</a>
                            <ul id="tree-root">
                                <li class="jstree-open"><a href="#">분류별</a>
                                    <ul id="tree-cat"></ul>
                                </li>
                                <li class="jstree-open"><a href="#">제공기관별</a>
                                    <ul id="tree-provd"></ul>
                                </li>
                                <li class="jstree-open"><a href="#">유형별</a>
                                    <ul id="tree-type"></ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 데이터 영역 -->
        <div class="fl w_850 m_r_6">
            <div class="box">
                <h1 class="h05" id="datasetSjct">데이터카테고리</h1>
                <div id="struct_div">
                    <table class="struct_tb">
                        <caption>데이터</caption>
                        <colgroup>
                            <col style="width:20%;">
                            <col style="width:15%;">
                            <col style="width:50%;">
                            <col style="width:15%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">제공기관</th>
                                <th scope="col">분류</th>
                                <th scope="col">서비스명</th>
                                <th scope="col">유형</th>
                            </tr>
                        </thead>
                        <tbody id="tb_struct_list">
                            <tr><td colspan="4">데이터를 불러오는 중입니다...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  `;

  let allData = [];
  let currentFilterType = '전체'; // '전체', 'cat', 'provd_instt_nm', 'data_type_nm'
  let currentFilterValue = '전체';
  let currentKeyword = '';
  let currentSearchType = 'all';

  const datasetSjct = container.querySelector('#datasetSjct');
  const tb_struct_list = container.querySelector('#tb_struct_list');
  const searchInput = container.querySelector('#search-input');
  const searchType = container.querySelector('#search-type');
  const searchBtn = container.querySelector('#search-btn');

  const renderTable = () => {
    datasetSjct.textContent = currentFilterValue === '전체' ? '전체 데이터' : currentFilterValue;
    
    let items = allData;

    // 1. 트리 필터 적용
    if (currentFilterType === 'cat') {
      items = items.filter(item => item.cat === currentFilterValue);
    } else if (currentFilterType === 'provd_instt_nm') {
      items = items.filter(item => item.provd_instt_nm === currentFilterValue);
    } else if (currentFilterType === 'data_type_nm') {
      items = items.filter(item => (item.data_type_nm || '').includes(currentFilterValue));
    }

    // 2. 검색어 필터 적용
    if (currentKeyword) {
      items = items.filter(item => {
        const svcNm = item.svc_nm || '';
        const provdNm = item.provd_instt_nm || '식품의약품안전처';
        if (currentSearchType === 'svc_nm') return svcNm.includes(currentKeyword);
        if (currentSearchType === 'provd_instt_nm') return provdNm.includes(currentKeyword);
        return svcNm.includes(currentKeyword) || provdNm.includes(currentKeyword);
      });
    }

    if (items.length === 0) {
      tb_struct_list.innerHTML = '<tr><td colspan="4" style="padding: 40px; color: #999;">조건에 맞는 데이터가 없습니다.</td></tr>';
      return;
    }

    tb_struct_list.innerHTML = items.map(item => `
      <tr>
        <td>${item.provd_instt_nm || '식품의약품안전처'}</td>
        <td>${item.cat || ''}</td>
        <td style="text-align: left;">
          <a href="#" class="service-link" data-id="${item.svc_no}">${item.svc_nm}</a>
        </td>
        <td>${item.data_type_nm || 'XML/JSON'}</td>
      </tr>
    `).join('');

    tb_struct_list.querySelectorAll('.service-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const svc_no = e.target.getAttribute('data-id');
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

  const doSearch = () => {
    currentKeyword = searchInput.value.trim();
    currentSearchType = searchType.value;
    renderTable();
  };

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  const bindTreeEvents = () => {
    container.querySelectorAll('.tree-node').forEach(node => {
      node.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // 중첩 리스트 이벤트 전파 방지
        const type = e.currentTarget.getAttribute('data-type');
        const val = e.currentTarget.getAttribute('data-val');
        
        if (type && val) {
          currentFilterType = type;
          currentFilterValue = val;
          
          container.querySelectorAll('.tree-node').forEach(n => n.classList.remove('active'));
          e.currentTarget.classList.add('active');
          
          renderTable();
        }
      });
    });
  };

  Promise.all([
    fetch('/api/dataset-tree').then(res => res.json()),
    fetch('/api/tables').then(res => res.json())
  ])
    .then(([data, dbTables]) => {
      // DB에 실제 존재하는 테이블만 남기기
      allData = (data || []).filter(d => dbTables.includes(d.svc_no));
      
      // 고유값 추출하여 트리 생성
      const cats = [...new Set(allData.map(d => d.cat).filter(Boolean))].sort();
      const provds = [...new Set(allData.map(d => d.provd_instt_nm).filter(Boolean))].sort();
      const types = ['XML/JSON', 'File', 'Link']; // 고정

      container.querySelector('#tree-cat').innerHTML = cats.map(c => 
        `<li class="tree-node" data-type="cat" data-val="${c}"><a href="#">${c}</a></li>`
      ).join('');

      container.querySelector('#tree-provd').innerHTML = provds.map(p => 
        `<li class="tree-node" data-type="provd_instt_nm" data-val="${p}"><a href="#">${p}</a></li>`
      ).join('');

      container.querySelector('#tree-type').innerHTML = types.map(t => 
        `<li class="tree-node" data-type="data_type_nm" data-val="${t}"><a href="#">${t}</a></li>`
      ).join('');

      bindTreeEvents();
      
      // 초기 '전체' 탭 활성화
      const rootNode = container.querySelector('.tree-node[data-val="전체"]');
      if (rootNode) rootNode.classList.add('active');
      renderTable();
    })
    .catch(err => {
      console.error(err);
      tb_struct_list.innerHTML = '<tr><td colspan="4" style="color: red; padding: 20px;">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>';
    });
}
