export function renderLocalHygiene(container, onSelectDataset) {
  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        <!-- Header -->
        <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i class="ri-restaurant-line text-blue-500"></i> 지역 기반 위생 안심 요식업소 조회 (OpenAPI 실시간)
            </h2>
            <p class="text-xs text-slate-500 mt-1.5">
              인허가 업소 정보(I2500)와 행정처분 정보(I0470)를 실시간으로 Left Join하여, 지역별 '주의이력 없음' 안심 업소를 찾습니다.
            </p>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-5 md:p-6 mb-6">
          <div class="flex flex-col md:flex-row gap-4 md:items-end">
            <!-- Region Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">지역명</label>
              <select id="select-region" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white">
                <option value="">전체 지역</option>
                <option value="서울">서울특별시</option>
                <option value="부산">부산광역시</option>
                <option value="대구">대구광역시</option>
                <option value="인천">인천광역시</option>
                <option value="광주">광주광역시</option>
                <option value="대전">대전광역시</option>
                <option value="울산">울산광역시</option>
                <option value="세종">세종특별자치시</option>
                <option value="경기">경기도</option>
                <option value="강원">강원도</option>
                <option value="충북">충청북도</option>
                <option value="충남">충청남도</option>
                <option value="전북">전라북도</option>
                <option value="전남">전라남도</option>
                <option value="경북">경상북도</option>
                <option value="경남">경상남도</option>
                <option value="제주">제주특별자치도</option>
              </select>
            </div>
            
            <!-- Industry Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">업종</label>
              <select id="select-industry" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white">
                <option value="">전체 업종</option>
                <option value="일반음식점">일반음식점</option>
                <option value="휴게음식점">휴게음식점</option>
                <option value="제과점영업">제과점영업</option>
                <option value="단란주점영업">단란주점영업</option>
                <option value="유흥주점영업">유흥주점영업</option>
                <option value="위탁급식영업">위탁급식영업</option>
              </select>
            </div>
            
            <!-- Violation Status Select -->
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">위생상태 필터</label>
              <select id="select-violation" class="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white">
                <option value="">전체 상태</option>
                <option value="있음" selected>주의이력 있음 (처분/위반내용 포함)</option>
                <option value="없음">주의이력 없음 (클린 업소)</option>
              </select>
            </div>

            <!-- Start Button -->
            <button id="btn-start-hygiene" class="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-1.5">
              <i class="ri-search-line text-lg"></i> 위생 분석 시작
            </button>
          </div>
        </div>

        <!-- Progress Log Area -->
        <div id="hygiene-progress" class="bg-slate-900 border border-slate-800 rounded-xl shadow-inner p-4 mb-6 hidden">
          <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h3 class="text-xs font-bold text-blue-400 flex items-center gap-1">
              <i class="ri-terminal-box-line"></i> SSE 실시간 크롤링 및 Left Join 로그
            </h3>
            <span class="text-[10px] text-slate-500">서버의 처리 현황이 실시간으로 수신됩니다.</span>
          </div>
          <div id="hygiene-log-content" class="text-[11px] font-mono text-slate-300 h-[150px] overflow-y-auto space-y-1">
            <!-- Logs go here -->
          </div>
        </div>

        <!-- Result Grid Area -->
        <div id="hygiene-result" class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hidden flex-col">
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-800">위생상태 판별 결과</h3>
            <span id="hygiene-result-count" class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200"></span>
          </div>
          <div class="overflow-x-auto" style="max-height: 500px;">
            <table class="w-full text-left border-collapse min-w-[900px]">
              <thead class="sticky top-0 bg-slate-100 z-10 shadow-sm">
                <tr>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">인허가번호</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">업소명</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">업종</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">주소</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">행정처분유형</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">위반내용</th>
                  <th class="px-3 py-2.5 font-bold text-[11px] text-slate-600 whitespace-nowrap">위생상태</th>
                </tr>
              </thead>
              <tbody id="hygiene-tbody" class="text-[11px] text-slate-700 divide-y divide-slate-100 bg-white">
              </tbody>
            </table>
          </div>
        </div>

      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    const btnStart = container.querySelector('#btn-start-hygiene');
    const selectRegion = container.querySelector('#select-region');
    const selectIndustry = container.querySelector('#select-industry');
    const selectViolation = container.querySelector('#select-violation');
    const logContainer = container.querySelector('#hygiene-progress');
    const logContent = container.querySelector('#hygiene-log-content');
    const resultContainer = container.querySelector('#hygiene-result');
    const tbody = container.querySelector('#hygiene-tbody');

    let eventSource = null;

    btnStart.addEventListener('click', () => {
      const region = selectRegion.value;
      const industry = selectIndustry.value;
      const violation = selectViolation.value;

      // UI 초기화
      btnStart.disabled = true;
      btnStart.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 실시간 연계 중...';
      btnStart.classList.add('opacity-70');
      
      logContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
      logContent.innerHTML = '';
      
      let reqMsg = '서버에 실시간 Left Join 스캔을 요청합니다.';
      if(region) reqMsg += ` (지역: ${region})`;
      if(industry) reqMsg += ` (업종: ${industry})`;
      if(violation) reqMsg += ` (위생상태: 주의이력 ${violation})`;
      appendLog('INFO', reqMsg);

      if (eventSource) {
        eventSource.close();
      }

      const url = `/api/live-hygiene-stream?region=${encodeURIComponent(region)}&industry=${encodeURIComponent(industry)}&violation=${encodeURIComponent(violation)}`;
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
      if (type === 'SUCCESS') colorClass = 'text-emerald-400';
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
      btnStart.innerHTML = '<i class="ri-search-line text-lg"></i> 위생 분석 재시작';
      btnStart.classList.remove('opacity-70');
    };

    const renderResult = (rows) => {
      if (!rows || rows.length === 0) {
        appendLog('WARN', '조회된 결과 데이터가 없습니다.');
        return;
      }

      resultContainer.classList.remove('hidden');
      resultContainer.classList.add('flex');
      container.querySelector('#hygiene-result-count').textContent = `총 ${rows.length.toLocaleString()} 건 조회됨`;

      tbody.innerHTML = rows.map(row => {
        const isClean = row['위생상태'] === '주의이력 없음';
        const badge = isClean 
          ? `<span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap"><i class="ri-shield-check-fill"></i> 주의이력 없음</span>`
          : `<span class="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap"><i class="ri-error-warning-fill"></i> 주의이력 있음</span>`;

        return `
          <tr class="hover:bg-slate-50">
            <td class="px-3 py-2 font-mono whitespace-nowrap">${row['인허가번호'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap text-slate-900 font-bold">${row['업소명'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap text-slate-500">${row['업종'] || '-'}</td>
            <td class="px-3 py-2 overflow-hidden text-ellipsis max-w-[200px]" title="${row['주소']}">${row['주소'] || '-'}</td>
            <td class="px-3 py-2 whitespace-nowrap text-rose-600">${row['행정처분유형'] || '-'}</td>
            <td class="px-3 py-2 overflow-hidden text-ellipsis max-w-[250px]" title="${row['위반내용']}">${row['위반내용'] || '-'}</td>
            <td class="px-3 py-2">${badge}</td>
          </tr>
        `;
      }).join('');
    };
  };

  render();
}
