import { datasets, subjectColorMap } from '../datasetData.js';

export function renderPurposeRecommendation(container, onSelectDataset, initialMode = "beginner") {
  const renderBeginner = () => {
    return `
      <section class="py-12 md:py-16 px-4 md:px-8 bg-white animate-fade-in-up">
        <div class="max-w-[1200px] mx-auto">
          <!-- 헤더 섹션 -->
          <div class="text-center mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">데이터를 활용하는 방법 — 누구나 쉽게</h2>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              복잡한 코딩이나 전문 용어 없이도 괜찮습니다.<br/>
              원하는 데이터를 엑셀(CSV) 형태로 다운로드하여 즉시 분석과 업무에 활용해보세요.
            </p>
          </div>

          <!-- 단계별 안내 카드 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
            <!-- Connecting Line -->
            <div class="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
            
            <div class="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm relative z-10 hover:shadow-md transition-shadow">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold border-4 border-white shadow-sm">1</div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">원하는 데이터 검색</h3>
              <p class="text-sm text-slate-600 leading-relaxed">식품안전나라에서 제공하는 다양한 테마별 데이터 중 필요한 정보를 키워드로 손쉽게 찾아보세요.</p>
            </div>
            
            <div class="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm relative z-10 hover:shadow-md transition-shadow">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold border-4 border-white shadow-sm">2</div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">CSV/엑셀 파일 다운로드</h3>
              <p class="text-sm text-slate-600 leading-relaxed">검색된 데이터를 클릭 한 번으로 다운로드 센터에서 친숙한 엑셀(CSV) 파일 형식으로 저장합니다.</p>
            </div>
            
            <div class="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm relative z-10 hover:shadow-md transition-shadow">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold border-4 border-white shadow-sm">3</div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">스프레드시트에서 분석</h3>
              <p class="text-sm text-slate-600 leading-relaxed">다운받은 엑셀 파일을 열어 차트를 그리거나, 필터를 적용하여 자유롭게 통계를 내고 분석하세요.</p>
            </div>
          </div>

          <!-- 추천 데이터셋 카드 -->
          <div class="mb-20">
            <h3 class="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-center gap-2">
              <i class="ri-star-smile-fill text-yellow-400"></i> 가장 인기 있는 추천 데이터
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <!-- Card 1 -->
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors group cursor-pointer">
                <div>
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-red-500 text-2xl shadow-sm border border-slate-100"><i class="ri-alert-fill"></i></div>
                  <h4 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">회수·판매중지 정보</h4>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-6">시중에 유통 중인 위해식품 목록 및 회수 현황 데이터를 확인할 수 있습니다.</p>
                </div>
                <button class="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-2">
                  <i class="ri-download-2-line"></i> 다운로드
                </button>
              </div>

              <!-- Card 2 -->
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors group cursor-pointer">
                <div>
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-green-500 text-2xl shadow-sm border border-slate-100"><i class="ri-leaf-fill"></i></div>
                  <h4 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">알레르기·영양성분</h4>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-6">가공식품 및 조리식품의 칼로리, 나트륨, 알레르기 유발 물질 상세 정보입니다.</p>
                </div>
                <button class="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-2">
                  <i class="ri-download-2-line"></i> 다운로드
                </button>
              </div>

              <!-- Card 3 -->
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors group cursor-pointer">
                <div>
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-yellow-500 text-2xl shadow-sm border border-slate-100"><i class="ri-store-2-fill"></i></div>
                  <h4 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">식품업체 정보</h4>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-6">전국의 식품 제조 및 판매 업소, 식당 등의 인허가 현황과 주소지 데이터입니다.</p>
                </div>
                <button class="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-2">
                  <i class="ri-download-2-line"></i> 다운로드
                </button>
              </div>

              <!-- Card 4 -->
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors group cursor-pointer">
                <div>
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-purple-500 text-2xl shadow-sm border border-slate-100"><i class="ri-test-tube-fill"></i></div>
                  <h4 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">검사결과 정보</h4>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-6">수입식품 및 국내 유통 식품의 성분 검사 및 적합성 판정 결과 내역입니다.</p>
                </div>
                <button class="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center gap-2">
                  <i class="ri-download-2-line"></i> 다운로드
                </button>
              </div>

            </div>
          </div>

          <!-- 하단 활용 사례 링크 -->
          <div>
            <h3 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">공공데이터 활용 우수 사례</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="#" class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl group-hover:scale-105 transition-transform"><i class="ri-smartphone-line"></i></div>
                <div>
                  <h4 class="font-bold text-slate-900">맞춤형 영양 관리 앱</h4>
                  <p class="text-sm text-slate-500 mt-1">영양성분 데이터를 활용한 식단 추천 서비스 구축 사례</p>
                </div>
              </a>
              <a href="#" class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-2xl group-hover:scale-105 transition-transform"><i class="ri-map-pin-line"></i></div>
                <div>
                  <h4 class="font-bold text-slate-900">내 주변 안심 식당 지도</h4>
                  <p class="text-sm text-slate-500 mt-1">식품업체 및 위생등급 정보를 연동한 지도 서비스</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>
    `;
  };

  const renderDeveloper = () => {
    return `
      <section class="py-12 md:py-16 px-4 md:px-8 bg-slate-900 text-slate-300 animate-fade-in-up">
        <div class="max-w-[1200px] mx-auto">
          <!-- 헤더 섹션 -->
          <div class="mb-16 border-b border-slate-700 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tight flex items-center gap-3">
                <i class="ri-code-box-fill text-blue-500"></i> API로 데이터 연동하기
              </h2>
              <p class="text-base text-slate-400 max-w-2xl leading-relaxed">
                식품안전나라 OpenAPI 엔드포인트를 활용하여 서비스에 실시간으로 데이터를 통합하세요.<br/>
                발급받은 인증키를 통해 JSON 또는 XML 형식의 RESTful 응답을 지원합니다.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2">
                <i class="ri-key-2-line"></i> 인증키 발급
              </button>
              <button class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-600 transition-colors flex items-center gap-2">
                <i class="ri-github-fill"></i> GitHub
              </button>
            </div>
          </div>

          <!-- 빠른 시작 코드블록 레이아웃 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <!-- Left: Request Examples -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-white flex items-center gap-2"><i class="ri-terminal-box-line text-slate-400"></i> Quick Start</h3>
              
              <div class="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                <div class="bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-between items-center">
                  <span class="text-xs font-mono text-slate-400">cURL (Terminal)</span>
                  <button class="text-slate-500 hover:text-white"><i class="ri-file-copy-line"></i></button>
                </div>
                <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed"><code class="text-emerald-400">curl <span class="text-blue-300">-X GET</span> <span class="text-yellow-200">"http://openapi.foodsafetykorea.go.kr/api/YOUR_KEY_HERE/I1250/json/1/5"</span></code></pre>
              </div>

              <div class="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                <div class="bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-between items-center">
                  <span class="text-xs font-mono text-slate-400">Python (Requests)</span>
                  <button class="text-slate-500 hover:text-white"><i class="ri-file-copy-line"></i></button>
                </div>
                <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed"><code class="text-slate-300"><span class="text-purple-400">import</span> requests

url = <span class="text-yellow-200">"http://openapi.foodsafetykorea.go.kr/api/YOUR_KEY/I1250/json/1/5"</span>
response = requests.get(url)
data = response.json()

<span class="text-purple-400">print</span>(data[<span class="text-yellow-200">'I1250'</span>][<span class="text-yellow-200">'row'</span>])</code></pre>
              </div>
            </div>

            <!-- Right: Response Example -->
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2 mb-6"><i class="ri-braces-line text-slate-400"></i> JSON Response Sample</h3>
              <div class="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl h-[330px] flex flex-col">
                <div class="bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-between items-center shrink-0">
                  <span class="text-xs font-mono text-slate-400">Status: 200 OK</span>
                </div>
                <pre class="p-4 overflow-auto text-xs font-mono leading-relaxed flex-1"><code class="text-blue-200">{
  <span class="text-yellow-100">"I1250"</span>: {
    <span class="text-yellow-100">"total_count"</span>: <span class="text-purple-300">"876524"</span>,
    <span class="text-yellow-100">"RESULT"</span>: {
      <span class="text-yellow-100">"MSG"</span>: <span class="text-green-300">"정상처리되었습니다."</span>,
      <span class="text-yellow-100">"CODE"</span>: <span class="text-green-300">"INFO-000"</span>
    },
    <span class="text-yellow-100">"row"</span>: [
      {
        <span class="text-yellow-100">"PRDLST_REPORT_NO"</span>: <span class="text-green-300">"2015041920875"</span>,
        <span class="text-yellow-100">"PRDLST_NM"</span>: <span class="text-green-300">"맛있는 핫도그"</span>,
        <span class="text-yellow-100">"LCNS_NO"</span>: <span class="text-green-300">"20150419208"</span>
      }
    ]
  }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- 추천 API 카드 -->
          <div class="mb-12">
            <h3 class="text-2xl font-bold text-white mb-8 border-b border-slate-700 pb-3 flex items-center justify-between">
              <span>주요 핵심 API 명세서</span>
              <a href="#" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">Swagger UI 열기 <i class="ri-external-link-line"></i></a>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <!-- Card 1 -->
              <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500 transition-colors group cursor-pointer">
                <div>
                  <div class="mb-4 flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-blue-900 text-blue-300 text-[10px] font-bold rounded font-mono">GET</span>
                    <span class="text-xs font-mono text-slate-400">/I2500</span>
                  </div>
                  <h4 class="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">인허가 정보 (I2500)</h4>
                  <p class="text-xs text-slate-400 line-clamp-2 mb-6">식품업체 기초 영업허가 식별자(LCNS_NO) 기준 테이블.</p>
                </div>
                <button class="w-full py-2 bg-slate-700 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 rounded text-xs font-bold text-slate-200 hover:text-white transition-all">
                  API 문서 보기
                </button>
              </div>

              <!-- Card 2 -->
              <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500 transition-colors group cursor-pointer">
                <div>
                  <div class="mb-4 flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-blue-900 text-blue-300 text-[10px] font-bold rounded font-mono">GET</span>
                    <span class="text-xs font-mono text-slate-400">/I1250</span>
                  </div>
                  <h4 class="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">품목제조보고 (I1250)</h4>
                  <p class="text-xs text-slate-400 line-clamp-2 mb-6">생산되는 제품 단위의 식별자(PRDLST_REPORT_NO) 부여.</p>
                </div>
                <button class="w-full py-2 bg-slate-700 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 rounded text-xs font-bold text-slate-200 hover:text-white transition-all">
                  API 문서 보기
                </button>
              </div>

              <!-- Card 3 -->
              <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500 transition-colors group cursor-pointer">
                <div>
                  <div class="mb-4 flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-blue-900 text-blue-300 text-[10px] font-bold rounded font-mono">GET</span>
                    <span class="text-xs font-mono text-slate-400">/I0580</span>
                  </div>
                  <h4 class="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">HACCP 지정업소 (I0580)</h4>
                  <p class="text-xs text-slate-400 line-clamp-2 mb-6">안전관리인증기준(HACCP) 획득 업소 데이터.</p>
                </div>
                <button class="w-full py-2 bg-slate-700 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 rounded text-xs font-bold text-slate-200 hover:text-white transition-all">
                  API 문서 보기
                </button>
              </div>

              <!-- Card 4 -->
              <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500 transition-colors group cursor-pointer">
                <div>
                  <div class="mb-4 flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-blue-900 text-blue-300 text-[10px] font-bold rounded font-mono">GET</span>
                    <span class="text-xs font-mono text-slate-400">/C005</span>
                  </div>
                  <h4 class="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">바코드 정보 (C005)</h4>
                  <p class="text-xs text-slate-400 line-clamp-2 mb-6">유통 바코드(BAR_CD) 매핑 메타데이터.</p>
                </div>
                <button class="w-full py-2 bg-slate-700 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 rounded text-xs font-bold text-slate-200 hover:text-white transition-all">
                  API 문서 보기
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  };

  container.innerHTML = initialMode === 'developer' ? renderDeveloper() : renderBeginner();
}
