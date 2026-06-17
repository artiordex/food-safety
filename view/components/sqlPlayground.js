/**
 * view/components/sqlPlayground.js
 * SQL 플레이그라운드 컴포넌트
 * - renderSqlPlayground(container, onSelectDataset)
 *     → 브라우저에서 직접 SELECT 쿼리를 입력·실행하고 결과를 테이블로 표시
 *     → join.sql 시나리오 기반의 JOIN 쿼리 가이드 제공
 */
import { renderEmptyState, renderLoadingSpinner } from '../uiComponents.js';
import { escapeHtml, escapeAttr } from '../utils.js';

// join.sql에서 동적 로드되는 JOIN 시나리오 목록 (서버에서 파싱)
let joinScenarios = [];

export function renderSqlPlayground(container, onSelectDataset) {
  let tableList = [];
  let selectedTable = null;
  let activeDetailTab = 'data'; // 'data', 'schema'
  let tableSchema = [];
  let tableData = [];
  let isTableLoading = false;

  // 시나리오 제목에서 테이블 물리명을 논리명(한글명)으로 치환하는 헬퍼 함수
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

  // 로컬 DB의 테이블 목록을 서버 API에서 조회하는 함수
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

  // 선택한 테이블의 스키마(컬럼 정보) 및 상위 50개 데이터를 병렬로 조회하는 함수
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

  // 에디터의 SQL을 서버에 실행 요청하고 결과를 상태에 저장하는 함수
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

  const normalizeResultValue = (value) => {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  };

  // A_LCNS_NO, B_LCNS_NO, C_LCNS_NO처럼 같은 의미의 컬럼이 반복될 때,
  // B/C 값이 A와 모든 행에서 동일하면 A 기준 컬럼만 표시한다.
  const getDisplayResultKeys = (rows) => {
    if (!rows || rows.length === 0) return [];

    const originalKeys = Object.keys(rows[0]);
    const nonEmptyKeys = originalKeys.filter(k =>
      rows.some(row => row[k] !== null && row[k] !== undefined && row[k] !== '')
    );

    const aKeyByBaseName = new Map();
    nonEmptyKeys.forEach(k => {
      const match = k.match(/^A_(.+)$/);
      if (match) aKeyByBaseName.set(match[1], k);
    });

    return nonEmptyKeys.filter(k => {
      const match = k.match(/^[B-Z]_(.+)$/);
      if (!match) return true;

      const aKey = aKeyByBaseName.get(match[1]);
      if (!aKey) return true;

      const isSameAsA = rows.every(row =>
        normalizeResultValue(row[k]) === normalizeResultValue(row[aKey])
      );
      return !isSameAsA;
    });
  };

  // 전체 UI를 container에 렌더링하는 함수 (테이블 목록, 상세 패널, 에디터, 결과 영역 포함)
  const render = () => {
    // ── 테이블 목록 ── escapeAttr: title 속성, escapeHtml: 텍스트 콘텐츠
    const tableItemsHTML = tableList.map(table => {
      const name = table.name;
      const logicalName = table.logicalName;
      const isSelected = selectedTable === name;
      const activeClass = "bg-gov-50 border-gov-300 text-gov-800 font-semibold shadow-sm";
      const inactiveClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
      return `
        <button data-table="${escapeAttr(name)}" class="table-select-btn w-full text-left px-4 py-3 rounded-lg border text-xs flex items-center justify-between transition-all ${isSelected ? activeClass : inactiveClass}">
          <span class="truncate" title="${escapeAttr(logicalName)} (${escapeAttr(name)})">
            <i class="ri-database-2-line text-gov-500 mr-1.5"></i>
            <span class="font-bold text-slate-800">${escapeHtml(logicalName)}</span>
            <span class="text-slate-400">(${escapeHtml(name)})</span>
          </span>
          <i class="ri-arrow-right-s-line text-slate-400"></i>
        </button>
      `;
    }).join('');

    const scenarioOptionsHTML = joinScenarios.map(sc => {
      const isSuper = sc.grade === 'SUPER';
      const prefix = isSuper ? '🔗 [다중 JOIN] ' : '';
      return `
        <option value="${escapeAttr(sc.no)}" ${isSuper ? 'style="color:#f59e0b; font-weight:bold;"' : ''}>${prefix}${escapeHtml(getLogicalTitle(sc.title))}</option>
      `;
    }).join('');

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
      // 1단: 컬럼 정보 (Schema) — PRAGMA 결과는 상대적으로 안전하나 일관성을 위해 이스케이프
      const schemaRowsHTML = tableSchema.map(col => `
        <tr class="hover:bg-slate-50/50">
          <td class="px-4 py-2.5 font-medium text-slate-400">${escapeHtml(col.cid)}</td>
          <td class="px-4 py-2.5 font-semibold text-slate-900">${escapeHtml(col.name)}</td>
          <td class="px-4 py-2.5"><code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-600 font-mono text-[10px]">${escapeHtml(col.type || 'TEXT')}</code></td>
          <td class="px-4 py-2.5">${col.notnull ? '❌ Not Null' : '⭕ Nullable'}</td>
          <td class="px-4 py-2.5">${col.pk ? '🔑 <span class="text-amber-600 font-semibold">PK</span>' : '-'}</td>
        </tr>
      `).join('');

      const schemaPanelHTML = `
        <div class="flex flex-col gap-2">
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <i class="ri-article-line text-gov-600"></i> 테이블 컬럼 명세 (Schema)
          </h4>
          <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto max-h-[170px] bg-white">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 z-10 bg-slate-50">
                  <th class="px-4 py-2.5 bg-slate-50">순번</th>
                  <th class="px-4 py-2.5 bg-slate-50">컬럼코드 (Name)</th>
                  <th class="px-4 py-2.5 bg-slate-50">데이터타입 (Type)</th>
                  <th class="px-4 py-2.5 bg-slate-50">Null 허용여부</th>
                  <th class="px-4 py-2.5 bg-slate-50">PK여부</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${schemaRowsHTML.length > 0 ? schemaRowsHTML : '<tr><td colspan="5" class="px-4 py-6 text-center text-slate-400">컬럼 정보가 존재하지 않습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;

      // 2단: 실제 데이터 조회 (Preview)
      let dataPanelHTML = '';
      if (tableData.length === 0) {
        dataPanelHTML = `
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <i class="ri-database-2-line text-gov-600"></i> 실제 데이터 조회 (Preview)
            </h4>
            <div class="py-8 text-center text-slate-400 text-xs border border-slate-200 rounded-xl bg-white">
              테이블 내에 적재된 데이터 레코드가 존재하지 않습니다.
            </div>
          </div>
        `;
      } else {
        const keys = Object.keys(tableData[0]);
        dataPanelHTML = `
          <div class="flex flex-col gap-2">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <i class="ri-database-2-line text-gov-600"></i> 실제 데이터 미리보기 (상위 50개행 Preview)
            </h4>
            <div class="border border-slate-200 rounded-xl overflow-x-auto overflow-y-auto max-h-[190px] bg-white">
              <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0 z-10 bg-slate-50">
                    ${keys.map(k => `<th class="px-4 py-2.5 bg-slate-50">${escapeHtml(k)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${tableData.map(row => `
                    <tr class="hover:bg-slate-50/50">
                      ${keys.map(k => `<td class="px-4 py-2.5 max-w-[250px] truncate" title="${escapeAttr(row[k])}">${row[k] !== null ? escapeHtml(row[k]) : '<span class="text-slate-300">null</span>'}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      detailContentHTML = `
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div class="px-5 py-3.5 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 class="text-sm font-bold text-slate-900">${escapeHtml(selectedTable)} <span class="text-xs font-normal text-slate-500">테이블 정보 카탈로그</span></h3>
            </div>
          </div>
          <div class="p-5 flex flex-col gap-6">
            ${schemaPanelHTML}
            ${dataPanelHTML}
          </div>
        </div>
      `;
    }

    // 쿼리 결과 섹션 렌더링
    let queryResultHTML = '';
    if (isQueryRunning) {
      queryResultHTML = renderLoadingSpinner(
        '데이터베이스 매칭 쿼리가 수행 중입니다...',
        '대량 데이터에 대한 JOIN 및 정밀 필터링 연산을 수행하고 있습니다.'
      );
    } else if (queryError) {
      // 에러 메시지도 escapeHtml 처리 (서버 에러 메시지가 HTML을 포함할 수 있음)
      queryResultHTML = `
        <div class="p-5 border border-red-200 bg-red-50 text-red-700 rounded-xl flex items-start gap-3">
          <i class="ri-error-warning-line text-xl mt-0.5 shrink-0"></i>
          <div>
            <h4 class="text-sm font-bold">SQL 실행 중 오류 발생</h4>
            <p class="text-xs font-mono mt-1.5 leading-relaxed bg-white/60 p-3 rounded-lg border border-red-100">${escapeHtml(queryError)}</p>
          </div>
        </div>
      `;
    } else if (queryResult) {
      if (queryResult.length === 0) {
        queryResultHTML = renderEmptyState(
          '쿼리가 성공적으로 수행되었으나, 일치하는 데이터가 없습니다.',
          `Query Execution Time: ${queryExecutionTime}ms`
        );
      } else {
        const originalKeys = Object.keys(queryResult[0]);
        const keys = getDisplayResultKeys(queryResult);

        const hiddenCount = originalKeys.length - keys.length;
        const hiddenMessage = hiddenCount > 0
          ? `<span class="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded border border-amber-200 font-sans">빈 컬럼 ${hiddenCount}개 숨김 처리됨</span>`
          : '';

        queryResultHTML = `
          <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md">
            <div class="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <i class="ri-checkbox-circle-fill text-lg"></i>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 flex items-center">쿼리 실행 완료 ${hiddenMessage}</h4>
                  <p class="text-[10px] text-slate-400 font-mono mt-0.5">수행 시간: ${queryExecutionTime}ms | 총 레코드: ${queryResult.length}건 | 표시 컬럼: ${keys.length}개</p>
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
                    ${keys.map(k => `<th class="px-4 py-3 bg-slate-100">${escapeHtml(k)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${queryResult.map(row => `
                    <tr class="hover:bg-slate-50">
                      ${keys.map(k => `<td class="px-4 py-2.5 max-w-[300px] truncate" title="${escapeAttr(row[k])}">${row[k] !== null ? escapeHtml(row[k]) : '<span class="text-slate-300 font-mono">null</span>'}</td>`).join('')}
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
      <section style="padding:40px 0; background:#f8f9fb;">
        <div style="max-width:1220px; margin:0 auto; padding:0 20px;">

          <!-- 섹션 헤더 -->
          <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:16px; border-bottom:2px solid #0168c1;">
            <div>
              <h2 style="font-size:22px; font-weight:700; color:#1a1a2e; margin:0 0 4px 0; font-family:'Nanum Square',sans-serif;">
                <span style="color:#0168c1;">■</span> 데이터베이스 분석
              </h2>
              <p style="font-size:13px; color:#666; margin:0;">로컬 SQLite DB 테이블을 탐색하고 SQL 쿼리를 직접 실행하세요.</p>
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
              <!-- Scenario Description Panel -->
              ${(() => {
                const firstScenario = joinScenarios.length > 0 ? joinScenarios[0] : null;
                const isFirstSuper = firstScenario && firstScenario.grade === 'SUPER';
                const borderClass = isFirstSuper ? 'border-amber-500/50 shadow-md shadow-amber-500/5' : 'border-slate-800';
                const titleHTML = isFirstSuper
                  ? `<i class="ri-lightbulb-fill text-amber-400"></i> <span class="text-amber-400 font-bold">대규모 다중 연계 조인 시나리오</span> <span class="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold ml-1.5">RECOMMENDED</span>`
                  : `<i class="ri-information-line"></i> 시나리오 상세 설명`;
                return `
                  <div class="mb-4 bg-slate-950 border ${borderClass} rounded-lg p-4 transition-all duration-300" id="scenario-desc-container">
                    <h4 class="text-xs font-bold text-gov-400 uppercase tracking-wider mb-1 flex items-center gap-1.5" id="scenario-desc-title">
                      ${titleHTML}
                    </h4>
                    <p id="scenario-desc-text" class="text-xs text-slate-300 leading-relaxed">${firstScenario ? escapeHtml(firstScenario.description) : '시나리오 로딩 중...'}</p>
                  </div>
                `;
              })()}

              <!-- SQL Editor textarea -->
              <textarea
                id="sql-editor"
                class="w-full bg-slate-800 text-green-300 font-mono text-sm p-4 rounded-xl border border-slate-700 focus:border-gov-500 focus:outline-none resize-none leading-relaxed"
                rows="8"
                spellcheck="false"
                placeholder="SELECT * FROM 테이블명 LIMIT 10;"
              ></textarea>

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

        </div><!-- max-width container -->
      </section>
    `;

    // 에디터에 현재 SQL 채우기
    const editor = container.querySelector('#sql-editor');
    if (editor) {
      editor.value = currentSql;
    }

    bindEvents();
  };

  // 렌더링된 DOM 요소에 이벤트 리스너를 바인딩하는 함수
  const bindEvents = () => {
    // 테이블 브라우저 선택 이벤트 위임 (Event Delegation)
    // 169개의 테이블 버튼마다 각각 달던 이벤트를 컨테이너에 단 1번만 달아 메모리 최적화
    if (!container.dataset.boundTableSelect) {
      container.dataset.boundTableSelect = 'true';
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.table-select-btn');
        if (!btn) return;
        const tbl = btn.dataset.table;
        loadTableDetails(tbl);
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
            selector.innerHTML = filtered.map(sc => `<option value="${escapeAttr(sc.no)}">${escapeHtml(getLogicalTitle(sc.title))}</option>`).join('');
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
        const no = String(e.target.value);
        const sc = joinScenarios.find(s => String(s.no) === no);
        if (sc) {
          currentSql = sc.sql;
          const editor = container.querySelector('#sql-editor');
          if (editor) {
            editor.value = currentSql;
          }

          const descContainer = container.querySelector('#scenario-desc-container');
          const descTitle = container.querySelector('#scenario-desc-title');
          const desc = container.querySelector('#scenario-desc-text');

          if (desc) {
            desc.textContent = sc.description; // textContent: XSS 안전
          }
          if (sc.grade === 'SUPER') {
            if (descContainer) {
              descContainer.className = "mb-4 bg-slate-950 border border-amber-500/50 rounded-lg p-4 shadow-md shadow-amber-500/5 transition-all duration-300";
            }
            if (descTitle) {
              descTitle.innerHTML = `<i class="ri-lightbulb-fill text-amber-400"></i> <span class="text-amber-400 font-bold">대규모 다중 연계 조인 시나리오</span> <span class="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold ml-1.5">RECOMMENDED</span>`;
            }
          } else {
            if (descContainer) {
              descContainer.className = "mb-4 bg-slate-950 border border-slate-800 rounded-lg p-4 transition-all duration-300";
            }
            if (descTitle) {
              descTitle.innerHTML = `<i class="ri-information-line"></i> 시나리오 상세 설명`;
            }
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
        const keys = getDisplayResultKeys(queryResult);
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

  // 서버의 /api/join-scenarios 엔드포인트에서 JOIN 시나리오 목록을 로드하는 함수
  const fetchJoinScenarios = async () => {
    try {
      const res = await fetch('/api/join-scenarios?size=1000');
      if (res.ok) {
        const data = await res.json();
        joinScenarios = Array.isArray(data) ? data : (data.items || []);
        if (joinScenarios.length > 0 && currentSql.startsWith('-- join.sql')) {
          currentSql = joinScenarios[0].sql;
        }
      }
    } catch (e) {
      console.error('join.sql 시나리오 로드 실패:', e);
    }
  };

  // 컴포넌트 초기화 함수: 테이블 목록과 시나리오를 병렬 로드 후 렌더링 및 자동 실행 처리
  const init = async () => {
    await Promise.all([fetchTables(), fetchJoinScenarios()]);

    let autoRun = false;
    // 타 컴포넌트(예: 데이터맵)로부터 연계된 SQL 자동 입력 및 포커싱 연동
    const _autoQuery = window.sqlPlaygroundAutoQuery || sessionStorage.getItem('sqlPlaygroundAutoQuery');
    if (_autoQuery) {
      currentSql = _autoQuery;
      window.sqlPlaygroundAutoQuery = null;
      sessionStorage.removeItem('sqlPlaygroundAutoQuery');
      autoRun = true;

      // SQL 쿼리에서 FROM 구문을 분석하여 참조 테이블 명세를 자동 파싱/로드
      const match = currentSql.match(/FROM\s+["']?([a-zA-Z0-9_-]+)["']?/i);
      if (match && match[1]) {
        const parsedTable = match[1];
        selectedTable = parsedTable;
        loadTableDetails(parsedTable);
      }
    }

    render();

    // 자동 실행 트리거가 활성화된 경우 쿼리를 즉시 수행하여 분석 결과를 출력합니다.
    if (autoRun) {
      runQuery();
    }
  };

  init();
}
