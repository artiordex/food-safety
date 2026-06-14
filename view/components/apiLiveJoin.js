import { escapeHtml, escapeAttr } from '/view/utils.js';
// 실시간 API 조인 분석 컴포넌트
// 식약처 외부 OpenAPI에서 두 테이블 데이터를 병렬 크롤링 후 메모리 상에서 Inner Join하여 결과를 표시합니다.

import { getDatasets } from '../datasetStore.js';

export async function renderApiLiveJoin(container, onSelectDataset) {
  const datasets = await getDatasets();
  // 융합뷰 제외 순수 OpenAPI 테이블만 추출
  const apiTables = datasets.filter(ds => !ds.id.startsWith('v_') && ds.id !== 'api_tables' && ds.id !== 'api_columns');
  // 이름순 정렬
  apiTables.sort((a, b) => a.name.localeCompare(b.name));

  // 컴포넌트 전체 UI를 container에 렌더링하는 함수 (테이블 선택, 조인 키 입력, 결과 영역 포함)
  const render = () => {
    container.innerHTML = `
      <section style="padding:40px 0; background:#f8f9fb;">
        <div style="max-width:1220px; margin:0 auto; padding:0 20px;">

        <!-- 섹션 헤더 -->
        <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:16px; border-bottom:2px solid #0168c1;">
          <div>
            <h2 style="font-size:22px; font-weight:700; color:#1a1a2e; margin:0 0 4px 0; font-family:'Nanum Square',sans-serif;">
              <span style="color:#0168c1;">■</span> 실시간 DB 분석
            </h2>
            <p style="font-size:13px; color:#666; margin:0;">
              식약처 공식 OpenAPI 서버에서 두 테이블의 전체 데이터를 병렬 크롤링하여 메모리 상에서 실시간으로 결합(Inner Join)합니다.
            </p>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-5 md:p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4 md:items-end">
            <!-- Table A Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">기준 테이블 (Table A)</label>
              <select id="select-table-a" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white">
                <option value="">테이블을 선택하세요</option>
                ${apiTables.map(ds => `<option value="${escapeAttr(ds.id)}">${escapeHtml(ds.name.split(' (')[0])} [${escapeHtml(ds.id)}]</option>`).join('')}
              </select>
            </div>
            
            <div class="hidden md:flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-400">
              <i class="ri-link-m"></i>
            </div>

            <!-- Table B Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">결합 대상 테이블 (Table B)</label>
              <select id="select-table-b" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white">
                <option value="">테이블을 선택하세요</option>
                ${apiTables.map(ds => `<option value="${escapeAttr(ds.id)}">${escapeHtml(ds.name.split(' (')[0])} [${escapeHtml(ds.id)}]</option>`).join('')}
              </select>
            </div>

            <!-- Join Key Input -->
            <div class="w-full md:w-64 relative">
              <label class="block text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                <span>조인 기준 키 (Join Key)</span>
                <span id="join-key-hint" class="text-[10px] text-emerald-600 font-normal hidden">추천 키 발견됨!</span>
              </label>
              <input type="text" id="input-join-key" list="join-key-suggestions" value="LCNS_NO" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono" placeholder="검색 또는 입력 (예: LCNS_NO)" />
              <datalist id="join-key-suggestions">
                <!-- Dynamically populated -->
              </datalist>
            </div>

            <!-- Start Button -->
            <button id="btn-start-join" class="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-1.5">
              <i class="ri-play-circle-line text-lg"></i> 조인 스캔 시작
            </button>
          </div>
        </div>

        <!-- Progress Log Area -->
        <div id="progress-container" class="bg-slate-900 border border-slate-800 rounded-xl shadow-inner p-4 mb-6 hidden">
          <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h3 class="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <i class="ri-terminal-box-line"></i> SSE 실시간 크롤링 및 조인 로그
            </h3>
            <span class="text-[10px] text-slate-500">서버의 처리 현황이 실시간으로 수신됩니다.</span>
          </div>
          <div id="log-content" class="text-[11px] font-mono text-slate-300 h-[150px] overflow-y-auto space-y-1">
            <!-- Logs go here -->
          </div>
        </div>

        <!-- Result Grid Area -->
        <div id="result-container" class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hidden flex-col">
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-800" id="result-title">조인 결과 데이터</h3>
            <span id="result-count" class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"></span>
          </div>
          <div class="overflow-x-auto" style="max-height: 500px;">
            <table class="w-full text-left border-collapse min-w-[800px]">
              <thead id="result-thead" class="sticky top-0 bg-slate-100 z-10 shadow-sm">
              </thead>
              <tbody id="result-tbody" class="text-xs text-slate-700 divide-y divide-slate-100 bg-white">
              </tbody>
            </table>
          </div>
        </div>

        </div><!-- max-width container -->
      </section>
    `;

    bindEvents();
  };

  // 이벤트 리스너 등록 함수: 테이블 선택, 조인 키 추천, 스캔 시작, SSE 스트림 처리
  const bindEvents = () => {
    const btnStart = container.querySelector('#btn-start-join');
    const selA = container.querySelector('#select-table-a');
    const selB = container.querySelector('#select-table-b');
    const inputKey = container.querySelector('#input-join-key');
    const datalist = container.querySelector('#join-key-suggestions');
    const keyHint = container.querySelector('#join-key-hint');
    const logContainer = container.querySelector('#progress-container');
    const logContent = container.querySelector('#log-content');
    const resultContainer = container.querySelector('#result-container');

    let eventSource = null;

    // 테이블 스키마에서 공통 컬럼(Join Key 후보)을 추출하는 로직
    const updateJoinKeySuggestions = async () => {
      const tableA = selA.value;
      const tableB = selB.value;
      
      datalist.innerHTML = '';
      keyHint.classList.add('hidden');
      keyHint.textContent = '';

      if (!tableA || !tableB) return;

      try {
        const [resA, resB] = await Promise.all([
          fetch(`/api/tables/${tableA}/schema`).then(r => r.json()),
          fetch(`/api/tables/${tableB}/schema`).then(r => r.json())
        ]);

        if (Array.isArray(resA) && Array.isArray(resB)) {
          const colsA = resA.map(c => c.name);
          const colsB = resB.map(c => c.name);
          
          // 공통 컬럼 교집합 찾기
          let commonCols = colsA.filter(col => colsB.includes(col));

          // 동의어(Synonym) 확장에 따른 지능형 매칭 추가
          const keySynonyms = [
            ['PRDLST_REPORT_NO', 'ITEM_REPORT_NO'],
            ['BAR_CD', 'BARCODE_NO']
          ];
          
          if (commonCols.length === 0) {
            for (const group of keySynonyms) {
              const hasA = colsA.find(c => group.includes(c));
              const hasB = colsB.find(c => group.includes(c));
              if (hasA && hasB) {
                // 두 테이블에 동의어 그룹 내의 키가 각각 존재하면 공통 키로 간주
                commonCols.push(hasA); // 입력창엔 Table A의 키 이름을 대표로 넣음
                break;
              }
            }
          }
          
          if (commonCols.length > 0) {
            datalist.innerHTML = commonCols.map(col => `<option value="${escapeAttr(col)}">추천 공통 키 (Synonym 포함)</option>`).join('');
            // 자동으로 첫 번째 공통 키를 입력창에 세팅 (사용자 편의성)
            inputKey.value = commonCols[0];
            keyHint.textContent = `${commonCols.length}개의 공통 키 발견!`;
            keyHint.classList.remove('hidden');
          } else {
            // 공통 키가 없으면 그냥 두 테이블의 모든 컬럼을 후보로 제공
            const allCols = [...new Set([...colsA, ...colsB])];
            datalist.innerHTML = allCols.map(col => `<option value="${escapeAttr(col)}"></option>`).join('');
            keyHint.textContent = `공통 키 없음`;
            keyHint.classList.remove('hidden');
            keyHint.classList.replace('text-emerald-600', 'text-amber-500');
          }
        }
      } catch (err) {
        console.warn('스키마 조회 실패 (Join Key 추천 불가):', err);
      }
    };

    selA.addEventListener('change', updateJoinKeySuggestions);
    selB.addEventListener('change', updateJoinKeySuggestions);

    btnStart.addEventListener('click', () => {
      const tableA = selA.value;
      const tableB = selB.value;
      const joinKey = inputKey.value.trim();

      if (!tableA || !tableB || !joinKey) {
        alert("테이블 2개와 조인 키를 모두 입력해 주세요.");
        return;
      }
      if (tableA === tableB) {
        alert("서로 다른 두 테이블을 선택해 주세요.");
        return;
      }

      // UI 초기화
      btnStart.disabled = true;
      btnStart.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 크롤링 중...';
      btnStart.classList.add('opacity-70');
      
      logContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
      logContent.innerHTML = '';
      appendLog('INFO', `서버에 실시간 전체 조인 스캔을 요청합니다. 대상: ${tableA} ↔ ${tableB} (Key: ${joinKey})`);

      if (eventSource) {
        eventSource.close();
      }

      const url = `/api/live-join-stream?tableA=${encodeURIComponent(tableA)}&tableB=${encodeURIComponent(tableB)}&joinKey=${encodeURIComponent(joinKey)}`;
      eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'status') {
            appendLog('STATUS', data.message);
          } 
          else if (data.type === 'progress') {
            appendLog('FETCH', `[${data.table}] ${data.fetched.toLocaleString()} / ${data.total.toLocaleString()} 건 적재 완료...`);
          }
          else if (data.type === 'complete') {
            appendLog('SUCCESS', data.message);
            renderResult(data.result, data.totalMatched);
            finishStreaming();
          }
          else if (data.type === 'error') {
            appendLog('ERROR', data.message);
            finishStreaming();
          }

        } catch(e) {
          console.error("SSE parse error", e);
        }
      };

      eventSource.onerror = (err) => {
        appendLog('ERROR', 'SSE 연결 스트림에 오류가 발생했거나 종료되었습니다.');
        finishStreaming();
      };
    });

    // 로그 패널에 타입별 색상과 함께 메시지를 추가하고 자동 스크롤하는 함수
    const appendLog = (type, msg) => {
      let colorClass = 'text-slate-300';
      if (type === 'ERROR') colorClass = 'text-rose-400';
      if (type === 'SUCCESS') colorClass = 'text-emerald-400';
      if (type === 'STATUS') colorClass = 'text-blue-300';
      
      const time = new Date().toLocaleTimeString();
      const div = document.createElement('div');
      const timeSpan = document.createElement('span');
      timeSpan.className = 'text-slate-500';
      timeSpan.textContent = '[' + time + ']';
      const msgSpan = document.createElement('span');
      msgSpan.className = colorClass;
      msgSpan.textContent = msg;
      div.appendChild(timeSpan);
      div.appendChild(document.createTextNode(' '));
      div.appendChild(msgSpan);
      logContent.appendChild(div);
      logContent.scrollTop = logContent.scrollHeight;
    };

    // SSE 스트림 종료 후 버튼 상태를 복원하는 함수
    const finishStreaming = () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      btnStart.disabled = false;
      btnStart.innerHTML = '<i class="ri-play-circle-line text-lg"></i> 조인 스캔 재시작';
      btnStart.classList.remove('opacity-70');
    };

    // 조인 결과 데이터를 결과 영역 테이블로 렌더링하는 함수 (최대 500건 표시)
    const renderResult = (rows, totalMatched) => {
      if (!rows || rows.length === 0) {
        appendLog('WARN', '조인된 결과 데이터가 없습니다. (두 테이블 간 조인 키의 실제 데이터 값이 일치하는 항목이 없음)');
        return;
      }

      resultContainer.classList.remove('hidden');
      resultContainer.classList.add('flex');
      container.querySelector('#result-count').textContent = `총 ${totalMatched.toLocaleString()} 건 매칭됨`;

      // 컬럼 추출
      const columns = Object.keys(rows[0]);
      
      const thead = container.querySelector('#result-thead');
      const tbody = container.querySelector('#result-tbody');

      thead.innerHTML = `
        <tr>
          ${columns.map(col => `<th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap bg-slate-100">${escapeHtml(col)}</th>`).join('')}
        </tr>
      `;

      // 최대 500건 렌더링
      const renderRows = rows.slice(0, 500);
      tbody.innerHTML = renderRows.map(row => `
        <tr class="hover:bg-slate-50">
          ${columns.map(col => `<td class="px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]" title="${escapeAttr(row[col] || '')}">${escapeHtml(row[col] || '-')}</td>`).join('')}
        </tr>
      `).join('');
    };
  };

  render();
}
