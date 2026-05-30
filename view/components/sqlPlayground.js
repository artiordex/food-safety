// view/components/sqlPlayground.js

// join.sql에서 엄선한 6개 핵심 JOIN 및 분석 시나리오 쿼리 명세
const joinScenarios = [
  {
    id: "haccp_join",
    title: "HACCP 적용업소 [I0580] ↔ 인허가 업소 정보 [I2500]",
    description: "HACCP 지정 업소의 실제 영업 신고 대장 및 인허가 세부 상세 정보를 인허가번호(LCNS_NO) 기준으로 결합하여 분석합니다.",
    sql: `SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A."BSSH_NM" AS 'HACCP_업소명',
    A."PRDLST_NM" AS 'HACCP_지정품목',
    B."BSSH_NM" AS '인허가_업소명',
    B."PRSDNT_NM" AS '대표자명',
    B."ADDR" AS '소재지주소',
    B."PRMS_DT" AS '인허가일자'
FROM (SELECT * FROM "I0580" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO"
LIMIT 10;`
  },
  {
    id: "spec_join",
    title: "식품 개별기준규격 [I2580] ↔ 시험항목코드 [I2530]",
    description: "각 식품 개별 규격 항목별로 매칭된 구체적인 시험 항목 명칭과 적용 최대/최소 기준 및 단위를 식별합니다.",
    sql: `SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A."PRDLST_CD_NM" AS '식품분류명',
    A."TESTITM_NM" AS '규격시험명',
    A."SPEC_VAL_SUMUP" AS '기준치요약',
    B."TESTITM_NM" AS '코드명칭',
    B."TESTITM_LCLAS_NM" AS '시험대분류'
FROM (SELECT * FROM "I2580" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD"
LIMIT 10;`
  },
  {
    id: "lmo_status",
    title: "LMO 수입 승인 현황 [I0130] 전체 조회",
    description: "승인 완료된 유전자변형생물체(LMO)의 승인번호, 승인일자, 수입업소명 및 용도(PRPOS)를 조회합니다.",
    sql: `SELECT 
    LMO_CONFM_NO AS 'LMO승인번호',
    CONFM_DT AS '승인일자',
    BSSH_NM AS '수입업소명',
    COMMON_NM AS '일반명칭',
    SYSTM_NM AS '이벤트명',
    PRPOS AS '수입용도'
FROM "I0130"
ORDER BY CONFM_DT DESC
LIMIT 15;`
  },
  {
    id: "health_food_join",
    title: "건강기능식품 개별인정형 [I-0050] ↔ 기능성원료인정 [I-0040]",
    description: "개별적으로 기능성 인정을 획득한 건강기능식품 원료들의 1일 섭취량 상/하한선 규격과 상세 효능(기능성 내용)을 매핑합니다.",
    sql: `SELECT DISTINCT
    A."HF_FNCLTY_MTRAL_RCOGN_NO" AS '인정번호',
    A."RAWMTRL_NM" AS '원료명',
    A."PRIMARY_FNCLTY" AS '대표기능성',
    A."DAY_INTK_LOWLIMIT" AS '섭취하한치',
    A."DAY_INTK_HIGHLIMIT" AS '섭취상한치',
    A."WT_UNIT" AS '단위',
    B."FNCLTY_CN" AS '기능성상세내용',
    B."BSSH_NM" AS '인정신청업체'
FROM (SELECT * FROM "I-0050" GROUP BY "HF_FNCLTY_MTRAL_RCOGN_NO") A
INNER JOIN (SELECT * FROM "I-0040" GROUP BY "HF_FNCLTY_MTRAL_RCOGN_NO") B
    ON A."HF_FNCLTY_MTRAL_RCOGN_NO" = B."HF_FNCLTY_MTRAL_RCOGN_NO"
LIMIT 10;`
  },
  {
    id: "barcode_join",
    title: "바코드 연계 제품 [C005] ↔ 축산물 품목제조정보 [I1310]",
    description: "시중 유통되는 바코드(유통기한 정보 포함)와 실제 식품의약품안전처에 신고된 축산물 품목제조의 원재료 및 규격 상세 보고 명세를 연결합니다.",
    sql: `SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '품목보고번호',
    A."BAR_CD" AS '바코드번호',
    A."PRDLST_NM" AS '제품명',
    B."BSSH_NM" AS '제조업소명',
    B."PRDLST_NM" AS '보고등록제품명',
    B."RAWMTRL_NM" AS '주요원재료명세'
FROM (SELECT * FROM "C005" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1310" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
LIMIT 10;`
  },
  {
    id: "sanitary_3way_join",
    title: "위생용품 3-WAY 연쇄 JOIN [I2851] ↔ [I2711] ↔ [I2713]",
    description: "생산실적이 보고된 위생용품을 바탕으로, 해당 위생용품의 구체적인 품목 제조 성분 구조와 제조사 영업 허가 정보를 다차원 결합합니다.",
    sql: `SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '품목보고번호',
    A."LCNS_NO" AS '영업인허가번호',
    A."PRDLST_NM" AS '생산보고제품명',
    A."PRDCTN_QY" AS '연간생산량',
    B."PRDLST_NM" AS '품목제조제품명',
    B."RAWMTRL_NM" AS '원료성분배합',
    C."BSSH_NM" AS '위생영업소명',
    C."LOCP_ADDR" AS '위생영업소주소'
FROM (SELECT * FROM "I2851" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I2711" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
INNER JOIN (SELECT * FROM "I2713" GROUP BY "LCNS_NO") C
    ON A."LCNS_NO" = C."LCNS_NO"
LIMIT 5;`
  }
];

export function renderSqlPlayground(container, onSelectDataset) {
  let tableList = [];
  let selectedTable = null;
  let activeDetailTab = 'data'; // 'data', 'schema'
  let tableSchema = [];
  let tableData = [];
  let isTableLoading = false;

  // SQL Playground 에디터 상태
  let currentSql = joinScenarios[0].sql;
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
    const tableItemsHTML = tableList.map(name => {
      const isSelected = selectedTable === name;
      const activeClass = "bg-gov-50 border-gov-300 text-gov-800 font-semibold";
      const inactiveClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
      return `
        <button data-table="${name}" class="table-select-btn w-full text-left px-4 py-3 rounded-lg border text-xs flex items-center justify-between transition-all ${isSelected ? activeClass : inactiveClass}">
          <span class="truncate"><i class="ri-database-2-line text-gov-500 mr-2"></i>${name}</span>
          <i class="ri-arrow-right-s-line text-slate-400"></i>
        </button>
      `;
    }).join('');

    const scenarioOptionsHTML = joinScenarios.map(sc => `
      <option value="${sc.id}">${sc.title}</option>
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
              <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">실시간 데이터베이스 분석 및 SQL Playground</h2>
              <p class="text-sm text-slate-500">실제 적재된 식품의약품안전처 SQLite 데이터베이스(\`foodsafety.db\`)의 물리 구조를 확인하고, 검증된 시나리오 기반의 고차원 JOIN 쿼리를 실시간으로 실행합니다.</p>
            </div>
            <div class="shrink-0 flex items-center gap-2 bg-gov-50 border border-gov-100 rounded-lg px-4 py-2.5">
              <i class="ri-shield-user-line text-gov-600 text-lg"></i>
              <div>
                <p class="text-xs text-slate-400 leading-none">연결 상태</p>
                <p class="text-xs font-bold text-gov-700 leading-tight mt-0.5">SQLite Live Connected</p>
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
              <div class="flex items-center gap-2">
                <label class="text-xs text-slate-400 font-semibold whitespace-nowrap"><i class="ri-magic-line text-gov-400"></i> 검증된 시나리오:</label>
                <select id="scenario-selector" class="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-gov-500 cursor-pointer">
                  ${scenarioOptionsHTML}
                </select>
              </div>
            </div>

            <!-- Text Editor & Description -->
            <div class="p-6">
              <div class="mb-4 bg-slate-950 border border-slate-800 rounded-lg p-4" id="scenario-desc-container">
                <h4 class="text-xs font-bold text-gov-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <i class="ri-information-line"></i> 시나리오 상세 설명
                </h4>
                <p id="scenario-desc-text" class="text-xs text-slate-300 leading-relaxed">${joinScenarios[0].description}</p>
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

    // 시나리오 선택 이벤트
    const scenarioSelector = container.querySelector('#scenario-selector');
    if (scenarioSelector) {
      // 셀렉트 박스 현재 선택 상태 유지
      const currentScenario = joinScenarios.find(s => s.sql === currentSql);
      if (currentScenario) {
        scenarioSelector.value = currentScenario.id;
      }

      scenarioSelector.addEventListener('change', (e) => {
        const id = e.target.value;
        const sc = joinScenarios.find(s => s.id === id);
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

  // 마운트 시 초기 작동
  const init = async () => {
    await fetchTables();
    
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
