export const renderScenarioTabs = async (container, mode) => {
  const view = document.getElementById('scenario-view');
  if (!view) return;
  
  view.style.display = 'block';
  
  const titleEl = view.querySelector('#scenario-sidebar-title');
  if (titleEl) titleEl.textContent = mode === 'developer' ? '개발자 데이터 시나리오' : '일반인 데이터 시나리오';
  
  const descEl = view.querySelector('#scenario-sidebar-desc');
  if (descEl) descEl.textContent = mode === 'developer' ? 'API 연동 및 SQL 쿼리 가이드' : '데이터 활용 비즈니스 아이디어';

  try {
    const res = await fetch('/api/join-scenarios');
    const scenarios = await res.json();
    
    const listEl = view.querySelector('#scenario-list');
    listEl.innerHTML = '';
    
    let activeIndex = 0;

    const renderDetail = (index) => {
      activeIndex = index;
      const scenario = scenarios[index];
      const isDev = mode === 'developer';
      
      // Update sidebar active state
      Array.from(listEl.children).forEach((li, i) => {
        if (i === index) {
          li.className = 'px-4 py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg cursor-pointer transition-colors';
        } else {
          li.className = 'px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors';
        }
      });

      const contentEl = view.querySelector('#scenario-content');
      
      const badgeColor = scenario.grade === 'SUPER' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 
                         scenario.grade === 'HIGH' ? 'bg-emerald-500 text-white' : 
                         scenario.grade === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-gray-400 text-white';

      let html = `
        <div class="animate-fade-in-up">
          <div class="mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${badgeColor} shadow-sm">
              ${scenario.grade} 신뢰도
            </span>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">${scenario.title}</h1>
          
          <div class="prose prose-blue max-w-none text-gray-600 mb-10 leading-relaxed text-lg">
            ${scenario.description.split('|').map(p => `<p class="mb-2">${p.trim()}</p>`).join('')}
          </div>
      `;

      if (isDev) {
        // Developer Mode: Show SQL and Technical details
        html += `
          <div class="mt-8 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#2d2d2d]">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-xs font-mono text-gray-400">SQL Query</span>
              <button class="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
            <div class="p-6 overflow-x-auto">
              <pre><code class="text-sm font-mono text-gray-300 leading-relaxed">${scenario.sql}</code></pre>
            </div>
          </div>
          
          <div class="mt-8">
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>API Playground에서 쿼리 실행해보기</span>
            </button>
          </div>
        `;
      } else {
        // Beginner Mode: Show simple expected output or use case
        html += `
          <div class="mt-8 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              활용 기대 효과
            </h3>
            <ul class="space-y-3 text-blue-800">
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                데이터 융합을 통해 새로운 인사이트 도출
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                복잡한 정보 탐색 시간을 획기적으로 단축
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                대국민 맞춤형 식품 안전 서비스 기획에 즉시 활용 가능
              </li>
            </ul>
          </div>
        `;
      }

      html += `</div>`;
      contentEl.innerHTML = html;
    };

    scenarios.forEach((sc, idx) => {
      const li = document.createElement('li');
      li.className = 'px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors line-clamp-2';
      li.textContent = sc.title;
      li.onclick = () => renderDetail(idx);
      listEl.appendChild(li);
    });

    if (scenarios.length > 0) {
      renderDetail(0);
    } else {
      const contentEl = view.querySelector('#scenario-content');
      if (contentEl) contentEl.innerHTML = '<div class="text-center text-gray-500 mt-20">시나리오가 없습니다.</div>';
    }

  } catch (err) {
    console.error(err);
    const contentEl = view.querySelector('#scenario-content');
    if (contentEl) contentEl.innerHTML = `<div class="p-8 text-red-500">데이터를 불러오는 중 오류가 발생했습니다: ${err.message}</div>`;
  }
};

// Add some required custom animations if not using tailwind perfectly
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
