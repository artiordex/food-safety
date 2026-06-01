export function renderBarcodeSearch(container, onSelectDataset) {
  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        <!-- Header -->
        <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-barcode-box-line text-indigo-500"></i> 바코드 기반 안전 식품 조회 (OpenAPI 5개 연계)
            </h2>
            <p class="text-xs text-slate-500 mt-1.5">
              품목제조보고(I1250), 바코드(C005), 업소(I2500), HACCP(I0580), 회수정보(I0490) 5개 데이터를 실시간으로 Left Join하여 종합 분석합니다.
            </p>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-5 md:p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4 md:items-end">
            <!-- Barcode Input -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">특정 바코드 번호 (선택)</label>
              <input type="text" id="input-barcode" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white font-mono" placeholder="예: 8801043000000" />
            </div>
            
            <!-- Barcode Exist Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">바코드 존재 여부</label>
              <select id="select-barcode-exist" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="">전체 (무관)</option>
                <option value="Y">바코드 있음</option>
                <option value="N">바코드 없음</option>
              </select>
            </div>
            
            <!-- HACCP Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">HACCP 적용 여부</label>
              <select id="select-haccp" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="">전체 (Y/N 무관)</option>
                <option value="Y" selected>HACCP 인증 (Y)</option>
                <option value="N">미인증 (N)</option>
              </select>
            </div>
            
            <!-- Safe Status Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">안전상태 여부</label>
              <select id="select-safe-status" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="">전체 (무관)</option>
                <option value="안전">안전 (회수이력 없음)</option>
                <option value="위험">위험 (회수/판매중지 포함)</option>
              </select>
            </div>

            <!-- Start Button -->
            <button id="btn-start-barcode" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-1.5">
              <i class="ri-search-line text-lg"></i> 통합 분석 시작
            </button>
          </div>
        </div>

        <!-- Progress Log Area -->
        <div id="barcode-progress" class="bg-slate-900 border border-slate-800 rounded-xl shadow-inner p-4 mb-6 hidden">
          <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h3 class="text-xs font-bold text-indigo-400 flex items-center gap-1">
              <i class="ri-terminal-box-line"></i> SSE 다중 테이블 크롤링 및 Join 로그
            </h3>
            <span class="text-[10px] text-slate-500">5개 테이블 최대 5만 건 실시간 수집 및 메모리 Join 처리 현황입니다.</span>
          </div>
          <div id="barcode-log-content" class="text-[11px] font-mono text-slate-300 h-[150px] overflow-y-auto space-y-1">
            <!-- Logs go here -->
          </div>
        </div>

        <!-- Result Grid Area -->
        <div id="barcode-result" class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hidden flex-col">
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-800">바코드 기반 종합 식품 안전 분석 결과</h3>
            <span id="barcode-result-count" class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200"></span>
          </div>
          <div class="overflow-x-auto" style="max-height: 500px;">
            <table class="w-full text-left border-collapse min-w-[1200px]">
              <thead class="sticky top-0 bg-slate-100 z-10 shadow-sm">
                <tr>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">바코드</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">품목보고번호</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">제품명</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">식품유형</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">제조업체명</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">HACCP여부</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">HACCP번호</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">안전상태</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">회수사유</th>
                </tr>
              </thead>
              <tbody id="barcode-tbody" class="text-[11px] text-slate-700 divide-y divide-slate-100 bg-white">
              </tbody>
            </table>
          </div>
        </div>

      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    const btnStart = container.querySelector('#btn-start-barcode');
    const inputBarcode = container.querySelector('#input-barcode');
    const selectBarcodeExist = container.querySelector('#select-barcode-exist');
    const selectHaccp = container.querySelector('#select-haccp');
    const selectSafeStatus = container.querySelector('#select-safe-status');
    const logContainer = container.querySelector('#barcode-progress');
    const logContent = container.querySelector('#barcode-log-content');
    const resultContainer = container.querySelector('#barcode-result');
    const tbody = container.querySelector('#barcode-tbody');

    let eventSource = null;

    btnStart.addEventListener('click', () => {
      const barcode = inputBarcode.value.trim();
      const barcodeExist = selectBarcodeExist.value;
      const haccp = selectHaccp.value;
      const safeStatus = selectSafeStatus.value;

      // UI 초기화
      btnStart.disabled = true;
      btnStart.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 다중 연계 중...';
      btnStart.classList.add('opacity-70');
      
      logContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
      logContent.innerHTML = '';
      
      let reqMsg = '서버에 실시간 5개 테이블 Left Join 스캔을 요청합니다.';
      if(barcode) reqMsg += ` (특정바코드: ${barcode})`;
      if(barcodeExist) reqMsg += ` (바코드존재: ${barcodeExist})`;
      if(haccp) reqMsg += ` (HACCP조건: ${haccp})`;
      if(safeStatus) reqMsg += ` (안전상태: ${safeStatus})`;
      appendLog('INFO', reqMsg);

      if (eventSource) {
        eventSource.close();
      }

      const url = `/api/live-barcode-stream?barcode=${encodeURIComponent(barcode)}&barcodeExist=${encodeURIComponent(barcodeExist)}&haccp=${encodeURIComponent(haccp)}&safeStatus=${encodeURIComponent(safeStatus)}`;
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
            renderResult(data.result);
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

    const appendLog = (type, msg) => {
      let colorClass = 'text-slate-300';
      if (type === 'ERROR') colorClass = 'text-rose-400';
      if (type === 'SUCCESS') colorClass = 'text-indigo-400';
      if (type === 'STATUS') colorClass = 'text-blue-300';
      
      const time = new Date().toLocaleTimeString();
      const div = document.createElement('div');
      div.innerHTML = `<span class="text-slate-500">[${time}]</span> <span class="${colorClass}">${msg}</span>`;
      logContent.appendChild(div);
      logContent.scrollTop = logContent.scrollHeight;
    };

    const finishStreaming = () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      btnStart.disabled = false;
      btnStart.innerHTML = '<i class="ri-search-line text-lg"></i> 통합 분석 재시작';
      btnStart.classList.remove('opacity-70');
    };

    const renderResult = (rows) => {
      if (!rows || rows.length === 0) {
        appendLog('WARN', '조회된 결과 데이터가 없습니다.');
        return;
      }

      resultContainer.classList.remove('hidden');
      resultContainer.classList.add('flex');
      container.querySelector('#barcode-result-count').textContent = `총 ${rows.length.toLocaleString()} 건 조회됨`;

      tbody.innerHTML = rows.map(row => {
        const isSafe = row['안전상태'] === '안전';
        const isHaccp = row['HACCP_적용여부'] === 'Y';
        
        const safeBadge = isSafe 
          ? `<span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap"><i class="ri-shield-check-fill"></i> 안전</span>`
          : `<span class="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap"><i class="ri-error-warning-fill"></i> 위험(회수)</span>`;
          
        const haccpBadge = isHaccp
          ? `<span class="text-indigo-600 font-bold">Y</span>`
          : `<span class="text-slate-400">N</span>`;

        return `
          <tr class="hover:bg-slate-50">
            <td class="px-3 py-2 font-mono whitespace-nowrap text-indigo-700">${row['바코드'] || '-'}</td>
            <td class="px-3 py-2 font-mono whitespace-nowrap">${row['품목제조보고번호'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap text-slate-900 font-bold overflow-hidden text-ellipsis max-w-[200px]" title="${row['제품명']}">${row['제품명'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap text-slate-500">${row['식품유형'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap font-medium text-slate-700">${row['제조업체명'] || '-'}</td>
            <td class="px-3 py-2 text-center">${haccpBadge}</td>
            <td class="px-3 py-2 font-mono whitespace-nowrap">${row['HACCP_지정번호'] || '-'}</td>
            <td class="px-3 py-2">${safeBadge}</td>
            <td class="px-3 py-2 overflow-hidden text-ellipsis max-w-[200px] text-rose-600" title="${row['회수사유']}">${row['회수사유'] || '-'}</td>
          </tr>
        `;
      }).join('');
    };
  };

  render();
}
