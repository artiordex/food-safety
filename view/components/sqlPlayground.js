// view/components/sqlPlayground.js

// join.sql에서 동적 로드되는 JOIN 시나리오 목록 (서버에서 파싱)
let joinScenarios = [];

export function renderSqlPlayground(container, onSelectDataset) {
  let tableList = [];
  let selectedTable = null;
  let activeDetailTab = 'data'; // 'data', 'schema'
  let tableSchema = [];
  let tableData = [];
  let isTableLoading = false;

  const getLogicalTitle = (title) => {
    if (!tableList || tableList.length === 0) return title;
    let newTitle = title;
    tableList.forEach(t => {
      const regex = new RegExp(`\\b${t.name}\\b`, 'g');
      newTitle = newTitle.replace(regex, `${t.logicalName}(${t.name})`);
    });
    return newTitle;
  };

  // SQL Playground 에디터 상태
  let currentSql = '-- join.sql 시나리오 로딩 중...';
  let queryResult = null;
  let queryError = null;
  let isQueryRunning = false;
  let queryExecutionTime = 0; // ms

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/tables');
      if (res.ok) {
        tableList = await res.json();
      }
    } catch (e) {
      console.error('테이블 목록 로드 실패:', e);
    }
  };

  const loadTableDetails = async (tableName) => {
    selectedTable = tableName;
    isTableLoading = true;
    render();

    try {
      const [schemaRes, dataRes] = await Promise.all([
        fetch(`/api/tables/${tableName}/schema`),
        fetch(`/api/tables/${tableName}/data?limit=50`)
      ]);

      if (schemaRes.ok) tableSchema = await schemaRes.json();
      if (dataRes.ok) tableData = await dataRes.json();
    } catch (e) {
      console.error('테이블 세부정보 로드 실패:', e);
    } finally {
      isTableLoading = false;
      render();
    }
  };

  const runQuery = async () => {
    isQueryRunning = true;
    queryResult = null;
    queryError = null;
    render();

    const startTime = performance.now();
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentSql })
      });

      const data = await res.json();
      queryExecutionTime = Math.round(performance.now() - startTime);

      if (res.ok) {
        queryResult = data;

        // CREATE, DROP, ALTER 등의 스크마 변경 쿼리가 성공적으로 실행되었다면 좌측 테이블 목록 자동 갱신
        const upperSql = currentSql.toUpperCase();
        if (upperSql.includes('CREATE ') || upperSql.includes('DROP ') || upperSql.includes('ALTER ')) {
          await fetchTables();
        }
      } else {
        queryError = data.error || '쿼리 실행 중 알 수 없는 에러가 발생했습니다.';
      }
    } catch (e) {
      queryError = e.message || '백엔드 서버와 통신할 수 없습니다.';
    } finally {
      isQueryRunning = false;
      render();
      // 결과 영역으로 스크롤 이동
      const resultEl = container.querySelector('#query-result-section');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const render = () => {
    const tableItemsHTML = tableList.map(table => {
      const name = table.name;
      const logicalName = table.logicalName;
      const isSelected = selectedTable === name;
      const activeClass = "bg-gov-50 border-gov-300 text-gov-800 font-semibold shadow-sm";
      const inactiveClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
      return `
        <button data-table="${name}" class="table-select-btn w-full text-left px-4 py-3 rounded-lg border text-xs flex items-center justify-between transition-all ${isSelected ? activeClass : inactiveClass}">
          <span class="truncate" title="${logicalName} (${name})">
            <i class="ri-database-2-line text-gov-500 mr-1.5"></i>
            <span class="font-bold text-slate-800">${logicalName}</span>
            <span class="text-slate-400">(${name})</span>
          </span>
          <i class="ri-arrow-right-s-line text-slate-400"></i>
        </button>
      `;
    }).join('');

    const scenarioOptionsHTML = joinScenarios.map(sc => `
      <option value="${sc.no}">${getLogicalTitle(sc.title)}</option>
    `).join('');

    // 우측 상세 패널 (Schema vs Data) 렌더링
    let detailContentHTML = '';
    if (isTableLoading) {
      detailContentHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-slate-500">
          <i class="ri-loader-4-line text-3xl animate-spin text-gov-600 mb-2"></i>
          <p class="text-sm">실시간 데이터베이스에서 정보를 로드하고 있습니다...</p>
        </div>
      `;
    } else if (!selectedTable) {
      detailContentHTML = `
        <div class="flex flex-col items-center justify-center py-24 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
          <i class="ri-database-line text-4xl mb-3 text-slate-300"></i>
          <p class="text-sm font-medium">좌측 목록에서 데이터베이스 테이블을 클릭하여</p>
          <p class="text-xs text-slate-400 mt-1">실시간 스키마 구조 및 저장된 레코드를 즉시 조회하세요.</p>
        </div>
      `;
    } else {
      const tabSchemaClass = activeDetailTab === 'schema' ? "border-gov-600 text-gov-700 font-bold" : "border-transparent text-slate-500 hover:text-slate-700";
      const tabDataClass = activeDetailTab === 'data' ? "border-gov-600 text-gov-700 font-bold" : "border-transparent text-slate-500 hover:text-slate-700";

      let tabBodyHTML = '';
      if (activeDetailTab === 'schema') {
        tabBodyHTML = `
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th class="px-4 py-2.5">컬럼순번</th>
                  <th class="px-4 py-2.5">컬럼코드 (Name)</th>
                  <th class="px-4 py-2.5">데이터타입 (Type)</th>
                  <th class="px-4 py-2.5">Null 허용여부</th>
                  <th class="px-4 py-2.5">기본값</th>
                  <th class="px-4 py-2.5">PK여부</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${tableSchema.map(col => `
                  <tr class="hover:bg-slate-50/50">
                    <td class="px-4 py-2.5 font-medium text-slate-400">${col.cid}</td>
                    <td class="px-4 py-2.5 font-semibold text-slate-900">${col.name}</td>
                    <td class="px-4 py-2.5"><code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-600 font-mono">${col.type || 'TEXT'}</code></td>
                    <td class="px-4 py-2.5">${col.notnull ? '❌ Not Null' : '⭕ Nullable'}</td>
                    <td class="px-4 py-2.5 text-slate-400">${col.dflt_value !== null ? col.dflt_value : '-'}</td>
                    <td class="px-4 py-2.5">${col.pk ? '🔑 <span class="text-amber-600 font-semibold">PK</span>' : '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else {
        if (tableData.length === 0) {
          tabBodyHTML = `
            <div class="py-12 text-center text-slate-400 text-xs">
              테이블 내에 적재된 데이터 레코드가 존재하지 않습니다.
            </div>
          `;
        } else {
          const keys = Object.keys(tableData[0]);
          tabBodyHTML = `
            <div class="overflow-x-auto max-h-[350px] overflow-y-auto">
              <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 z-10">
                    ${keys.map(k => `<th class="px-4 py-2.5 bg-slate-50">${k}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${tableData.map(row => `
                    <tr class="hover:bg-slate-50/50">
                      ${keys.map(k => `<td class="px-4 py-2.5 max-w-[250px] truncate" title="${row[k] !== null ? row[k] : ''}">${row[k] !== null ? row[k] : '<span class="text-slate-300">null</span>'}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="mt-3 text-right">
              <span class="text-[11px] text-slate-400 font-medium">상위 ${tableData.length}개 행이 실시간 DB로부터 조회되었습니다.</span>
            </div>
          `;
        }
      }

      detailContentHTML = `
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div class="px-5 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 class="text-sm font-bold text-slate-900">${selectedTable} <span class="text-xs font-normal text-slate-500">테이블 정보</span></h3>
            </div>
            <div class="flex border-b border-slate-200 text-xs">
              <button id="tab-btn-data" class="px-3 py-1.5 border-b-2 font-medium transition-all ${tabDataClass}">실제 데이터 조회</button>
              <button id="tab-btn-schema" class="px-3 py-1.5 border-b-2 font-medium transition-all ${tabSchemaClass}">테이블 컬럼 정보 (Schema)</button>
            </div>
          </div>
          <div class="p-5">
            ${tabBodyHTML}
          </div>
        </div>
      `;
    }

    // 쿼리 결과 섹션 렌더링
    let queryResultHTML = '';
    if (isQueryRunning) {
      queryResultHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-slate-500">
          <i class="ri-loader-4-line text-4xl animate-spin text-gov-600 mb-3"></i>
          <p class="text-sm font-medium">데이터베이스 매칭 쿼리가 수행 중입니다...</p>
          <p class="text-xs text-slate-400 mt-1">대량 데이터에 대한 JOIN 및 정밀 필터링 연산을 수행하고 있습니다.</p>
        </div>
      `;
    } else if (queryError) {
      queryResultHTML = `
        <div class="p-5 border border-red-200 bg-red-50 text-red-700 rounded-xl flex items-start gap-3">
          <i class="ri-error-warning-line text-xl mt-0.5 shrink-0"></i>
          <div>
            <h4 class="text-sm font-bold">SQL 실행 중 오류 발생</h4>
            <p class="text-xs font-mono mt-1.5 leading-relaxed bg-white/60 p-3 rounded-lg border border-red-100">${queryError}</p>
          </div>
        </div>
      `;
    } else if (queryResult) {
      if (queryResult.length === 0) {
        queryResultHTML = `
          <div class="p-8 text-center text-slate-500 border border-slate-200 bg-white rounded-xl shadow-sm">
            <i class="ri-inbox-line text-3xl text-slate-300 mb-2"></i>
            <p class="text-sm font-semibold">쿼리가 성공적으로 수행되었으나, 일치하는 데이터가 없습니다.</p>
            <p class="text-xs text-slate-400 mt-1 font-mono">Query Execution Time: ${queryExecutionTime}ms</p>
          </div>
        `;
      } else {
        const keys = Object.keys(queryResult[0]);
        queryResultHTML = `
          <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md">
            <div class="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <i class="ri-checkbox-circle-fill text-lg"></i>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900">쿼리 실행 완료</h4>
                  <p class="text-[10px] text-slate-400 font-mono">수행 시간: ${queryExecutionTime}ms | 총 레코드: ${queryResult.length}건</p>
                </div>
              </div>
              <button id="download-csv-btn" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-gov-300 hover:text-gov-700 bg-white text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <i class="ri-file-excel-2-line text-emerald-600"></i> CSV 다운로드
              </button>
            </div>
            
            <div class="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr class="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold sticky top-0 z-10">
                    ${keys.map(k => `<th class="px-4 py-3 bg-slate-100">${k}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${queryResult.map(row => `
                    <tr class="hover:bg-slate-50">
                      ${keys.map(k => `<td class="px-4 py-2.5 max-w-[300px] truncate" title="${row[k] !== null ? row[k] : ''}">${row[k] !== null ? row[k] : '<span class="text-slate-300 font-mono">null</span>'}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }
    } else {
      queryResultHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
          <i class="ri-terminal-box-line text-4xl mb-2 text-slate-300"></i>
          <p class="text-sm font-medium">실행된 쿼리가 없습니다.</p>
          <p class="text-xs text-slate-400 mt-1">상단의 실행 버튼을 누르면 실시간 SQLite 결과가 여기에 출력됩니다.</p>
        </div>
      `;
    }

    container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Section title -->
          <div class="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">실시간 데이터베이스 분석</h2>
            </div>
              </div>
            </div>
          </div>

          <!-- Grid: Left Table Browser & Right Table Viewer -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            <!-- Sidebar: Table List -->
            <div class="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col max-h-[500px]">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">데이터베이스 테이블 목록 (${tableList.length})</h3>
              <div class="flex-1 overflow-y-auto space-y-2 pr-1" id="tables-container">
                ${tableItemsHTML}
              </div>
            </div>
            
            <!-- Main: Detail schema & raw data viewer -->
            <div class="lg:col-span-3" id="table-detail-container">
              ${detailContentHTML}
            </div>
          </div>

          <!-- Section: SQL Playground Editor -->
          <div class="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl mb-8">
            <div class="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-gov-600 flex items-center justify-center text-white">
                  <i class="ri-terminal-line"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-white leading-tight">Interactive SQL Query Editor</h3>
                  <p class="text-[10px] text-slate-400">데이터 조회(SELECT) 및 테이블 스키마 확인 전용 에디터</p>
                </div>
              </div>
              
              <!-- Select Join Scenarios -->
              <div class="flex items-center gap-3 flex-wrap justify-end">
                <div class="relative">
                  <i class="ri-search-line absolute left-2.5 top-[7px] text-slate-400 text-xs"></i>
                  <input type="text" id="scenario-search" placeholder="조인 시나리오 검색..." class="bg-slate-800 text-white border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-xs outline-none focus:border-gov-500 w-48 transition-colors placeholder:text-slate-500">
                </div>
                <div class="flex items-center gap-1.5">
                  <label class="text-xs text-slate-400 font-semibold whitespace-nowrap"><i class="ri-magic-line text-gov-400"></i> join.sql <span id="scenario-count">(${joinScenarios.length}건)</span>:</label>
                  <select id="scenario-selector" class="max-w-[300px] truncate bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-gov-500 cursor-pointer">
                    ${scenarioOptionsHTML}
                  </select>
                </div>
              </div>
            </div>

            <!-- Text Editor & Description -->
            <div class="p-6">
              <div class="mb-4 bg-slate-950 border border-slate-800 rounded-lg p-4" id="scenario-desc-container">
                <h4 class="text-xs font-bold text-gov-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <i class="ri-information-line"></i> 시나리오 상세 설명
                </h4>
                <p id="scenario-desc-text" class="text-xs text-slate-300 leading-relaxed">${joinScenarios.length > 0 ? joinScenarios[0].description : '시나리오 로딩 중...'}</p>
              </div>

              <!-- SQL Textarea -->
              <div class="relative font-mono text-xs">
                <textarea id="sql-editor" rows="10" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-5 text-emerald-400 outline-none focus:border-gov-500 focus:ring-1 focus:ring-gov-500 font-mono leading-relaxed resize-y" placeholder="SELECT * FROM table_name LIMIT 10;"></textarea>
              </div>
              
              <div class="mt-4 flex items-center justify-between flex-wrap gap-3">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span class="text-xs text-slate-400">데이터의 무단 변조 방지를 위해 <strong class="text-slate-200">조회(SELECT) 목적</strong>의 쿼리만 실행됩니다.</span>
                </div>
                
                <button id="run-query-btn" class="px-6 py-3 rounded-lg bg-gov-600 hover:bg-gov-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md ${isQueryRunning ? 'opacity-70 cursor-not-allowed' : ''}" ${isQueryRunning ? 'disabled' : ''}>
                  ${isQueryRunning ? '<i class="ri-loader-4-line animate-spin"></i> 실행 중...' : '<i class="ri-play-fill"></i> 쿼리 실행 (Run SQL)'}
                </button>
              </div>
            </div>
          </div>

          <!-- Section: SQL Result -->
          <div id="query-result-section" class="scroll-mt-24">
            <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i class="ri-list-ordered text-gov-600"></i> 쿼리 실행 결과 (Query Output)
            </h3>
            <div id="query-result-container">
              ${queryResultHTML}
            </div>
          </div>
        </div>
      </section>
    `;

    // 에디터에 현재 SQL 채우기
    const editor = container.querySelector('#sql-editor');
    if (editor) {
      editor.value = currentSql;
    }

    bindEvents();
  };

  const bindEvents = () => {
    // 테이블 브라우저 선택 이벤트
    container.querySelectorAll('.table-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tbl = e.currentTarget.dataset.table;
        loadTableDetails(tbl);
      });
    });

    // 테이블 뷰어 탭 클릭 이벤트
    const tabData = container.querySelector('#tab-btn-data');
    if (tabData) {
      tabData.addEventListener('click', () => {
        activeDetailTab = 'data';
        render();
      });
    }

    const tabSchema = container.querySelector('#tab-btn-schema');
    if (tabSchema) {
      tabSchema.addEventListener('click', () => {
        activeDetailTab = 'schema';
        render();
      });
    }

    // 시나리오 검색 이벤트
    const scenarioSearch = container.querySelector('#scenario-search');
    if (scenarioSearch) {
      scenarioSearch.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = joinScenarios.filter(sc => 
          sc.title.toLowerCase().includes(keyword) || 
          sc.description.toLowerCase().includes(keyword) || 
          sc.sql.toLowerCase().includes(keyword)
        );
        
        const selector = container.querySelector('#scenario-selector');
        const countLabel = container.querySelector('#scenario-count');
        if (selector) {
          if (filtered.length > 0) {
            selector.innerHTML = filtered.map(sc => `<option value="${sc.no}">${getLogicalTitle(sc.title)}</option>`).join('');
          } else {
            selector.innerHTML = '<option value="">검색 결과가 없습니다</option>';
          }
        }
        if (countLabel) {
          countLabel.textContent = `(${filtered.length}건)`;
        }
      });
    }

    // 시나리오 선택 이벤트
    const scenarioSelector = container.querySelector('#scenario-selector');
    if (scenarioSelector) {
      // 셀렉트 박스 현재 선택 상태 유지
      const currentScenario = joinScenarios.find(s => s.sql === currentSql);
      if (currentScenario) {
        scenarioSelector.value = currentScenario.no;
      }

      scenarioSelector.addEventListener('change', (e) => {
        const no = parseInt(e.target.value);
        const sc = joinScenarios.find(s => s.no === no);
        if (sc) {
          currentSql = sc.sql;
          const editor = container.querySelector('#sql-editor');
          if (editor) {
            editor.value = currentSql;
          }
          const desc = container.querySelector('#scenario-desc-text');
          if (desc) {
            desc.textContent = sc.description;
          }
        }
      });
    }

    // 에디터 직접 수정 반영
    const editor = container.querySelector('#sql-editor');
    if (editor) {
      editor.addEventListener('input', (e) => {
        currentSql = e.target.value;
      });
    }

    // 쿼리 실행 이벤트
    const runBtn = container.querySelector('#run-query-btn');
    if (runBtn) {
      runBtn.addEventListener('click', runQuery);
    }

    // 결과 CSV 다운로드 이벤트
    const csvBtn = container.querySelector('#download-csv-btn');
    if (csvBtn && queryResult && queryResult.length > 0) {
      csvBtn.addEventListener('click', () => {
        const keys = Object.keys(queryResult[0]);
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // 한글 깨짐 방지 BOM 추가
        csvContent += keys.join(",") + "\n";

        queryResult.forEach(row => {
          const rowData = keys.map(k => {
            let val = row[k] !== null ? String(row[k]) : '';
            // 쉼표나 따옴표가 들어있으면 감싸주기
            if (val.includes(",") || val.includes("\"") || val.includes("\n")) {
              val = `"${val.replace(/"/g, '""')}"`;
            }
            return val;
          });
          csvContent += rowData.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sql_query_result_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  // join.sql 시나리오 목록 로드
  const fetchJoinScenarios = async () => {
    try {
      const res = await fetch('/api/join-scenarios');
      if (res.ok) {
        joinScenarios = await res.json();
        if (joinScenarios.length > 0 && currentSql.startsWith('-- join.sql')) {
          currentSql = joinScenarios[0].sql;
        }
      }
    } catch (e) {
      console.error('join.sql 시나리오 로드 실패:', e);
    }
  };

  // 마운트 시 초기 작동
  const init = async () => {
    await Promise.all([fetchTables(), fetchJoinScenarios()]);

    // 타 컴포넌트(예: 데이터맵)로부터 연계된 SQL 자동 입력 및 포커싱 연동
    if (window.sqlPlaygroundAutoQuery) {
      currentSql = window.sqlPlaygroundAutoQuery;
      window.sqlPlaygroundAutoQuery = null; // 단회성 소비 후 초기화

      // SQL 쿼리에서 FROM 구문을 분석하여 참조 테이블 명세를 자동 파싱/로드
      const match = currentSql.match(/FROM\s+["']?([a-zA-Z0-9_-]+)["']?/i);
      if (match && match[1]) {
        const parsedTable = match[1];
        selectedTable = parsedTable;
        loadTableDetails(parsedTable);
      }
    }

    render();
  };

  init();
}
