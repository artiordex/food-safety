// view/components/apiExplorer.js
import { datasets } from '../datasetData.js';

export function renderApiExplorer(container, onSelectDataset) {
  let searchQuery = "";

  // 타 컴포넌트(예: 데이터맵)로부터 연계된 API 코드 자동 필터 및 포커싱 연동
  if (window.apiExplorerAutoSearch) {
    searchQuery = window.apiExplorerAutoSearch;
    window.apiExplorerAutoSearch = null; // 단회성 소비 후 즉시 초기화
  }

  let selectedApi = datasets.find(d =>
    d.id.toLowerCase() === searchQuery.toLowerCase()
  ) || datasets.find(d => d.id === 'I0580') || datasets[0]; // 기본선택: HACCP 적용업소(I0580)

  // API 데이터 소스 상태
  let apiSource = 'external'; // 'local' (로컬 DB 에뮬레이터), 'external' (실제 외부 식약처 라이브 OpenAPI)

  // API 테스트 베드 상태
  let startIdx = 1;
  let endIdx = 5;
  let apiResponse = null;
  let apiError = null;
  let isApiCalling = false;
  let callDuration = 0; // ms

  const fetchApiResponse = async () => {
    isApiCalling = true;
    apiResponse = null;
    apiError = null;
    render();

    const startTime = performance.now();

    // API 소스 모드에 따른 URL 분기
    const baseUrl = apiSource === 'external' ? '/api/external' : '/api/sample_key';
    const testUrl = `${baseUrl}/${selectedApi.id}/json/${startIdx}/${endIdx}`;

    try {
      const res = await fetch(testUrl);
      const data = await res.json();
      callDuration = Math.round(performance.now() - startTime);

      if (res.ok) {
        apiResponse = data;
      } else {
        apiError = data.error || 'API 요청 처리 중 오류가 발생했습니다.';
      }
    } catch (e) {
      apiError = e.message || '서버와 통신할 수 없습니다.';
    } finally {
      isApiCalling = false;
      render();
      // 결과 영역으로 부드럽게 스크롤
      const respEl = container.querySelector('#api-response-section');
      if (respEl) {
        respEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const render = () => {
    // API 리스트 필터링 (뷰·메타 테이블 제외)
    const filteredApis = datasets.filter(ds => {
      if (ds.id.startsWith('v_') || ds.id === 'api_tables' || ds.id === 'api_columns') return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return ds.name.toLowerCase().includes(q) || ds.id.toLowerCase().includes(q) || ds.description.toLowerCase().includes(q);
    });

    const apiListHTML = filteredApis.map(ds => {
      const isSelected = selectedApi.id === ds.id;
      const bg = isSelected ? '#eef5ff' : '#fff';
      const border = isSelected ? '1px solid #0168c1' : '1px solid #dde1e7';
      const color = isSelected ? '#0168c1' : '#444';
      return `
        <button data-api-id="${ds.id}" class="api-select-btn"
          style="width:100%; text-align:left; padding:8px 10px; border-radius:4px; border:${border}; background:${bg}; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:6px;">
          <div style="overflow:hidden; flex:1;">
            <span style="font-size:12px; font-weight:${isSelected ? '700' : '500'}; color:${color}; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${ds.name}</span>
            <span style="font-size:10px; color:#aaa; font-family:monospace;">/api/sample/${ds.id}/json</span>
          </div>
          <span style="padding:2px 6px; border-radius:3px; background:#eef5ff; color:#0168c1; font-size:10px; font-family:monospace; flex-shrink:0;">${ds.id}</span>
        </button>
      `;
    }).join('');

    // 요청 파라미터 구조 정의
    const requestParams = [
      { name: "KEY", desc: "인증키", type: "STRING (Required)", sample: apiSource === 'external' ? "77183c01c07d44798948 (내 정식 API Key)" : "sample (로컬 에뮬레이터에서는 임의 값 허용)" },
      { name: "serviceId", desc: "서비스명 (테이블코드)", type: "STRING (Required)", sample: selectedApi.id },
      { name: "dataType", desc: "파일형식", type: "STRING (Required)", sample: "json (or xml)" },
      { name: "startIdx", desc: "요청시작위치 (시작인덱스)", type: "INTEGER (Required)", sample: "1" },
      { name: "endIdx", desc: "요청종료위치 (종료인덱스)", type: "INTEGER (Required)", sample: "5" }
    ];

    const paramsHTML = requestParams.map(p => `
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 12px; font-family:monospace; font-weight:700; color:#333; font-size:12px;">${p.name}</td>
        <td style="padding:8px 12px; color:#555; font-size:12px;">${p.desc}</td>
        <td style="padding:8px 12px;"><code style="padding:2px 6px; border-radius:3px; background:#f0f0f0; color:#0168c1; font-family:monospace; font-size:11px;">${p.type}</code></td>
        <td style="padding:8px 12px; color:#777; font-family:monospace; font-size:11px;">${p.sample}</td>
      </tr>
    `).join('');

    // API 테스트 베드 출력 영역
    let responseBoxHTML = '';
    if (isApiCalling) {
      responseBoxHTML = `
        <div style="text-align:center; padding:40px 0; color:#888;">
          <i class="ri-loader-4-line" style="font-size:32px; color:#0168c1; display:block; margin-bottom:8px;"></i>
          <p style="font-size:13px;">서버와 실시간 통신 중입니다...</p>
        </div>
      `;
    } else if (apiError) {
      responseBoxHTML = `
        <div style="padding:16px; border:1px solid #f5c5c5; background:#fff3f3; border-radius:6px; color:#c00;">
          <p style="font-weight:700; margin:0 0 6px 0; font-size:13px;"><i class="ri-error-warning-fill"></i> API 호출 오류</p>
          <code style="font-size:11px; font-family:monospace; line-height:1.6;">${apiError}</code>
        </div>
      `;
    } else if (apiResponse) {
      const prettyJson = JSON.stringify(apiResponse, null, 2);

      // 결과 데이터로부터 실제 total_count 파싱
      const totalCountVal = apiResponse[selectedApi.id] ? apiResponse[selectedApi.id].total_count : 'Unknown';
      const rowCount = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].row ? apiResponse[selectedApi.id].row.length : 0;
      const isFallback = apiResponse[selectedApi.id] && apiResponse[selectedApi.id].RESULT && apiResponse[selectedApi.id].RESULT.CODE === 'WARN-200';

      responseBoxHTML = `
        ${isFallback ? `
          <div style="margin-bottom:10px; padding:10px 14px; border:1px solid #ffe0a0; background:#fffbf0; border-radius:6px; font-size:12px; color:#b7780a;">
            <strong>⚠ 로컬 DB 자동 폴백 처리됨</strong> — 인터넷 불안정으로 로컬 SQLite 데이터로 대체되었습니다.
          </div>
        ` : ''}
        <div style="background:#1a1a2e; border-radius:6px; overflow:hidden;">
          <div style="padding:10px 16px; background:#0f0f1e; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:8px; height:8px; border-radius:50%; background:${isFallback ? '#f0a500' : '#27ae60'}; display:inline-block;"></span>
              <span style="font-size:11px; font-weight:700; color:#fff;">HTTP 200 OK | Response Payload</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:10px; color:#888; font-family:monospace;">총 ${totalCountVal}건 | 응답 ${rowCount}행 | ${callDuration}ms</span>
              <button id="copy-json-btn" style="padding:3px 10px; background:#333; color:#ccc; border:none; border-radius:3px; font-size:11px; cursor:pointer;">복사</button>
            </div>
          </div>
          <pre style="padding:16px; font-size:11px; color:#50fa7b; font-family:monospace; line-height:1.6; overflow-x:auto; max-height:400px; margin:0;"><code>${prettyJson}</code></pre>
        </div>
      `;
    } else {
      responseBoxHTML = `
        <div style="text-align:center; padding:40px 0; border:2px dashed #dde1e7; border-radius:6px; background:#fafafa;">
          <i class="ri-send-plane-2-line" style="font-size:32px; color:#ccc; display:block; margin-bottom:8px;"></i>
          <p style="font-size:13px; color:#888; margin:0;">호출 버튼을 클릭하여 API 테스트를 시작하세요.</p>
        </div>
      `;
    }


    container.innerHTML = `
      <section style="padding:40px 0; background:#f8f9fb;">
        <div style="max-width:1220px; margin:0 auto; padding:0 20px;">

          <!-- 추천 데이터셋 카드 섹션 -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size:18px; font-weight:700; color:#1a1a2e; margin-bottom:16px;">
              <i class="ri-star-fill" style="color:#0168c1; margin-right:4px;"></i> 추천 데이터셋
            </h2>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px;">
              
              <!-- 카드 1 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:8px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <i class="ri-alert-fill" style="font-size:28px; color:#e74c3c; margin-bottom:12px; display:block;"></i>
                  <h3 style="font-size:15px; font-weight:700; color:#333; margin:0 0 8px 0;">회수·판매중지 정보</h3>
                  <p style="font-size:12px; color:#666; line-height:1.5; margin:0 0 16px 0;">위해식품 및 회수 대상 식품에 대한 실시간 정보 제공</p>
                </div>
                <a href="#" style="font-size:12px; color:#0168c1; font-weight:700; text-decoration:none;">자세히 보기 &rarr;</a>
              </div>

              <!-- 카드 2 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:8px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <i class="ri-leaf-fill" style="font-size:28px; color:#27ae60; margin-bottom:12px; display:block;"></i>
                  <h3 style="font-size:15px; font-weight:700; color:#333; margin:0 0 8px 0;">알레르기·영양성분</h3>
                  <p style="font-size:12px; color:#666; line-height:1.5; margin:0 0 16px 0;">가공식품 및 조리식품의 알레르기 유발 물질 데이터</p>
                </div>
                <a href="#" style="font-size:12px; color:#0168c1; font-weight:700; text-decoration:none;">자세히 보기 &rarr;</a>
              </div>

              <!-- 카드 3 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:8px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <i class="ri-store-2-fill" style="font-size:28px; color:#f39c12; margin-bottom:12px; display:block;"></i>
                  <h3 style="font-size:15px; font-weight:700; color:#333; margin:0 0 8px 0;">식품업체 정보</h3>
                  <p style="font-size:12px; color:#666; line-height:1.5; margin:0 0 16px 0;">전국 식품 제조 및 판매 업소의 인허가 기본 정보</p>
                </div>
                <a href="#" style="font-size:12px; color:#0168c1; font-weight:700; text-decoration:none;">자세히 보기 &rarr;</a>
              </div>

              <!-- 카드 4 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:8px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <i class="ri-test-tube-fill" style="font-size:28px; color:#8e44ad; margin-bottom:12px; display:block;"></i>
                  <h3 style="font-size:15px; font-weight:700; color:#333; margin:0 0 8px 0;">검사결과 정보</h3>
                  <p style="font-size:12px; color:#666; line-height:1.5; margin:0 0 16px 0;">국내외 유통 식품에 대한 수거 및 검사 결과 확인</p>
                </div>
                <a href="#" style="font-size:12px; color:#0168c1; font-weight:700; text-decoration:none;">자세히 보기 &rarr;</a>
              </div>

            </div>
          </div>

          <!-- 서비스 아이콘 메뉴 -->
          <div style="margin-bottom: 40px; display:grid; grid-template-columns: repeat(5, 1fr); gap:12px;">
            <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 10px; text-align:center; cursor:pointer;">
              <i class="ri-book-read-line" style="font-size:26px; color:#0168c1; margin-bottom:10px; display:block;"></i>
              <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 4px 0;">활용 가이드 (e-book)</h4>
              <p style="font-size:11px; color:#777; margin:0;">데이터 활용 안내서</p>
            </div>
            <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 10px; text-align:center; cursor:pointer;">
              <i class="ri-braces-line" style="font-size:26px; color:#0168c1; margin-bottom:10px; display:block;"></i>
              <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 4px 0;">API 활용 가이드</h4>
              <p style="font-size:11px; color:#777; margin:0;">Open API 연동 방법</p>
            </div>
            <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 10px; text-align:center; cursor:pointer;">
              <i class="ri-lightbulb-line" style="font-size:26px; color:#0168c1; margin-bottom:10px; display:block;"></i>
              <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 4px 0;">활용 사례</h4>
              <p style="font-size:11px; color:#777; margin:0;">우수 활용 사례 모음</p>
            </div>
            <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 10px; text-align:center; cursor:pointer;">
              <i class="ri-download-cloud-2-line" style="font-size:26px; color:#0168c1; margin-bottom:10px; display:block;"></i>
              <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 4px 0;">다운로드 센터</h4>
              <p style="font-size:11px; color:#777; margin:0;">공통 코드 및 양식</p>
            </div>
            <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 10px; text-align:center; cursor:pointer;">
              <i class="ri-question-answer-line" style="font-size:26px; color:#0168c1; margin-bottom:10px; display:block;"></i>
              <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 4px 0;">FAQ / 문의</h4>
              <p style="font-size:11px; color:#777; margin:0;">자주 묻는 질문 및 지원</p>
            </div>
          </div>

          <!-- 이용 절차 -->
          <div style="margin-bottom: 50px;">
            <div style="display:flex; align-items:center; margin-bottom:30px;">
              <h2 style="font-size:18px; font-weight:700; color:#1a1a2e; margin:0; white-space:nowrap; padding-right:16px;">데이터 이용 절차</h2>
              <div style="flex:1; height:1px; background:#dde1e7;"></div>
            </div>
            
            <div style="display:flex; align-items:flex-start; justify-content:space-between; position:relative; padding:0 20px;">
              <!-- Connecting Line Background -->
              <div style="position:absolute; top:30px; left:60px; right:60px; height:2px; background:#e2e8f0; z-index:0;"></div>
              
              <!-- 단계별 렌더링 -->
              ${['데이터 검색', '데이터 다운로드', '데이터 활용', '결과 적용', '성과 공유'].map((title, i) => {
                const icons = ['ri-search-eye-line', 'ri-download-2-line', 'ri-pie-chart-line', 'ri-settings-4-line', 'ri-share-line'];
                const descs = [
                  '원하는 데이터를<br>검색합니다.',
                  'API/CSV 형식으로<br>다운로드합니다.',
                  '제공된 데이터를<br>분석·가공합니다.',
                  '앱/웹 서비스에<br>결과를 적용합니다.',
                  '우수 활용 사례로<br>성과를 공유합니다.'
                ];
                return `
                <div style="position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; flex:1;">
                  <div style="width:60px; height:60px; background:#fff; border:2px solid #0168c1; border-radius:50%; margin:0 auto 12px auto; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 6px rgba(0,0,0,0.05); position:relative;">
                    <i class="${icons[i]}" style="font-size:24px; color:#0168c1;"></i>
                    <div style="position:absolute; top:-4px; right:-4px; width:20px; height:20px; background:#0168c1; color:#fff; font-size:10px; font-weight:bold; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff;">
                      ${i + 1}
                    </div>
                  </div>
                  <h4 style="font-size:14px; font-weight:700; color:#333; margin:0 0 6px 0;">${title}</h4>
                  <p style="font-size:11px; color:#666; line-height:1.4; margin:0;">${descs[i]}</p>
                </div>
                ${i < 4 ? `<div style="z-index:1; margin-top:20px; color:#94a3b8; font-size:20px;"><i class="ri-arrow-right-s-line"></i></div>` : ''}
                `;
              }).join('')}
            </div>
          </div>

          <!-- 섹션 헤더 -->
          <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:16px; border-bottom:2px solid #0168c1;">
            <h2 style="font-size:22px; font-weight:700; color:#1a1a2e; margin:0 0 4px 0; font-family:'Nanum Square',sans-serif;">
              <span style="color:#0168c1;">■</span> 로컬 API Explorer
            </h2>
          </div>

          <!-- 2단 레이아웃: 좌측 API 목록 + 우측 상세 -->
          <div style="display:flex; gap:20px; align-items:flex-start;">

            <!-- 좌측: API 목록 -->
            <div style="width:260px; flex-shrink:0; background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:16px; max-height:640px; display:flex; flex-direction:column;">
              <div style="display:flex; align-items:center; gap:6px; background:#f8f9fb; border:1px solid #dde1e7; border-radius:4px; padding:6px 10px; margin-bottom:12px;">
                <i class="ri-search-line" style="color:#aaa; font-size:13px;"></i>
                <input type="text" id="api-search-input" value="${searchQuery}" placeholder="API명 또는 코드 검색"
                  style="flex:1; border:none; background:transparent; font-size:12px; color:#444; outline:none;" />
              </div>
              <div id="apis-container" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:4px;">
                ${apiListHTML}
                ${filteredApis.length === 0 ? `<p style="text-align:center; color:#bbb; font-size:12px; padding:20px 0;">일치하는 API가 없습니다.</p>` : ''}
              </div>
            </div>

            <!-- 우측: 상세 패널 -->
            <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:16px;">

              <!-- 선택된 API 요약 카드 -->
              <div style="background:#1a3a6b; color:#fff; border-radius:6px; padding:20px 24px;">
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                  <span style="padding:3px 10px; border-radius:4px; background:rgba(255,255,255,.15); font-size:11px; font-family:monospace;">Service ID: ${selectedApi.id}</span>
                  <span style="padding:3px 10px; border-radius:4px; background:#27ae60; font-size:11px; font-weight:700;">168종 실시간 외부 연동 지원</span>
                </div>
                <h3 style="font-size:16px; font-weight:700; margin:0 0 6px 0;">${selectedApi.name}</h3>
                <p style="font-size:12px; color:#cdd; line-height:1.6; margin:0 0 12px 0;">${selectedApi.description}</p>
                <div style="border-top:1px solid rgba(255,255,255,.15); padding-top:10px; display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
                  <span style="font-size:11px; color:#aab;">추천 테마:</span>
                  <span style="padding:2px 8px; border-radius:3px; background:rgba(255,255,255,.1); font-size:11px;">${selectedApi.theme}</span>
                  <span style="font-size:11px; color:#aab;">분류:</span>
                  <span style="padding:2px 8px; border-radius:3px; background:rgba(255,255,255,.1); font-size:11px;">${selectedApi.subject}</span>
                </div>
              </div>

              <!-- 데이터 소스 토글 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:16px 20px;">
                <p style="font-size:11px; font-weight:700; color:#999; text-transform:uppercase; margin:0 0 10px 0;">호출 대상 데이터 소스</p>
                <div style="display:flex; gap:8px; background:#f8f9fb; padding:6px; border-radius:6px; border:1px solid #dde1e7;">
                  <button id="toggle-source-local"
                    style="flex:1; padding:10px; border-radius:4px; font-size:12px; font-weight:700; border:none; cursor:pointer; background:${apiSource === 'local' ? '#0168c1' : 'transparent'}; color:${apiSource === 'local' ? '#fff' : '#555'};">
                    <i class="ri-database-2-line"></i> 로컬 에뮬레이터
                  </button>
                  <button id="toggle-source-external"
                    style="flex:1; padding:10px; border-radius:4px; font-size:12px; font-weight:700; border:none; cursor:pointer; background:${apiSource === 'external' ? '#0168c1' : 'transparent'}; color:${apiSource === 'external' ? '#fff' : '#555'};">
                    <i class="ri-global-line"></i> 식약처 공식 API
                  </button>
                </div>
                <p style="font-size:11px; color:#888; margin:8px 0 0 0; line-height:1.6;">
                  ${apiSource === 'external'
        ? '📢 <strong>실시간 라이브 통신 활성화</strong> — 식약처 공공 포털 서버와 직접 통신합니다.'
        : '📢 <strong>로컬 SQLite 통신 활성화</strong> — 네트워크 없이도 168종 데이터를 고속 조회합니다.'}
                </p>
              </div>

              <!-- URL 비교 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:16px 20px;">
                <h3 style="font-size:13px; font-weight:700; color:#333; margin:0 0 12px 0;"><i class="ri-exchange-line" style="color:#0168c1;"></i> API 호출 주소 비교</h3>
                <div style="margin-bottom:10px;">
                  <p style="font-size:11px; color:#999; font-weight:700; margin:0 0 4px 0;">1. 식약처 공식 OpenAPI</p>
                  <div style="background:#f8f9fb; border:1px solid #dde1e7; border-radius:4px; padding:8px 12px; font-family:monospace; font-size:11px; color:#555; word-break:break-all;">
                    http://openapi.foodsafetykorea.go.kr/api/${apiSource === 'external' ? '77183c01c07d44798948' : 'sample'}/${selectedApi.id}/json/${startIdx}/${endIdx}
                  </div>
                </div>
                <div>
                  <p style="font-size:11px; color:#999; font-weight:700; margin:0 0 4px 0;">2. 로컬 8000 포트 주소</p>
                  <div style="background:#eef5ff; border:1px solid #c2d8f5; border-radius:4px; padding:8px 12px; font-family:monospace; font-size:11px; color:#0168c1; word-break:break-all;">
                    http://localhost:8000/api/${apiSource === 'external' ? 'external' : 'sample_key'}/${selectedApi.id}/json/${startIdx}/${endIdx}
                  </div>
                </div>
              </div>

              <!-- 요청 파라미터 테이블 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:16px 20px; overflow:hidden;">
                <h3 style="font-size:13px; font-weight:700; color:#333; margin:0 0 12px 0;"><i class="ri-table-line" style="color:#0168c1;"></i> 요청 파라미터 구조</h3>
                <div style="overflow-x:auto;">
                  <table style="width:100%; border-collapse:collapse; font-size:12px;">
                    <thead>
                      <tr style="background:#f8f9fb; border-bottom:2px solid #dde1e7;">
                        <th style="padding:8px 12px; text-align:left; color:#555; font-weight:700;">파라미터명</th>
                        <th style="padding:8px 12px; text-align:left; color:#555; font-weight:700;">설명</th>
                        <th style="padding:8px 12px; text-align:left; color:#555; font-weight:700;">타입/필수</th>
                        <th style="padding:8px 12px; text-align:left; color:#555; font-weight:700;">샘플값</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${paramsHTML}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- API 테스트 베드 -->
              <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:16px 20px;">
                <h3 style="font-size:13px; font-weight:700; color:#333; margin:0 0 12px 0;"><i class="ri-flask-line" style="color:#0168c1;"></i> 실시간 API 테스트</h3>
                <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:14px; align-items:flex-end;">
                  <div>
                    <label style="font-size:11px; color:#999; font-weight:700; display:block; margin-bottom:4px;">시작 위치 (startIdx)</label>
                    <input type="number" id="test-start-idx" min="1" value="${startIdx}"
                      style="width:100px; height:36px; padding:0 10px; border:1px solid #dde1e7; border-radius:4px; font-size:12px; color:#444;" />
                  </div>
                  <div>
                    <label style="font-size:11px; color:#999; font-weight:700; display:block; margin-bottom:4px;">종료 위치 (endIdx)</label>
                    <input type="number" id="test-end-idx" min="1" value="${endIdx}"
                      style="width:100px; height:36px; padding:0 10px; border:1px solid #dde1e7; border-radius:4px; font-size:12px; color:#444;" />
                  </div>
                  <button id="set-all-range-btn"
                    style="height:36px; padding:0 14px; border:1px solid #0168c1; background:#eef5ff; color:#0168c1; border-radius:4px; font-size:12px; font-weight:700; cursor:pointer;">
                    <i class="ri-expand-height-line"></i> 전체 범위
                  </button>
                  <button id="send-api-btn"
                    style="height:36px; padding:0 20px; background:${isApiCalling ? '#aaa' : '#0168c1'}; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:700; cursor:pointer;"
                    ${isApiCalling ? 'disabled' : ''}>
                    ${isApiCalling ? '<i class="ri-loader-4-line"></i> 전송 중...' : `<i class="ri-send-plane-fill"></i> ${apiSource === 'external' ? 'OpenAPI 호출' : '로컬 호출'}`}
                  </button>
                </div>

                <!-- 응답 출력 -->
                <div id="api-response-section">
                  <p style="font-size:11px; font-weight:700; color:#999; margin:0 0 6px 0;"><i class="ri-code-s-slash-line" style="color:#0168c1;"></i> API Response</p>
                  <div id="api-response-box">
                    ${responseBoxHTML}
                  </div>
                </div>
              </div>

            </div><!-- 우측 패널 end -->
          </div><!-- 2단 레이아웃 end -->

        </div><!-- max-width container -->
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // API 리스트 검색 이벤트
    const searchInput = container.querySelector('#api-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearchInput = container.querySelector('#api-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          const val = newSearchInput.value;
          newSearchInput.value = '';
          newSearchInput.value = val;
        }
      });
    }

    // API 아이템 선택 이벤트
    container.querySelectorAll('.api-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.apiId;
        const ds = datasets.find(d => d.id === id);
        if (ds) {
          selectedApi = ds;
          apiResponse = null;
          apiError = null;
          render();
        }
      });
    });

    // 시작/종료 인덱스 변경 이벤트
    const startInput = container.querySelector('#test-start-idx');
    if (startInput) {
      startInput.addEventListener('input', (e) => {
        startIdx = parseInt(e.target.value, 10) || 1;
      });
    }

    const endInput = container.querySelector('#test-end-idx');
    if (endInput) {
      endInput.addEventListener('input', (e) => {
        endIdx = parseInt(e.target.value, 10) || 5;
      });
    }

    // 소스 전환 토글 이벤트
    const btnLocal = container.querySelector('#toggle-source-local');
    if (btnLocal) {
      btnLocal.addEventListener('click', () => {
        apiSource = 'local';
        render();
      });
    }

    const btnExt = container.querySelector('#toggle-source-external');
    if (btnExt) {
      btnExt.addEventListener('click', () => {
        apiSource = 'external';
        render();
      });
    }

    // 전체 범위 자동설정 클릭 이벤트 (100개 페이징을 해제하고 전체 건수를 한꺼번에 조회하도록 인덱스 자동 매핑)
    const setAllBtn = container.querySelector('#set-all-range-btn');
    if (setAllBtn) {
      setAllBtn.addEventListener('click', () => {
        startIdx = 1;
        // 각 데이터셋 정보에서 기본 count를 가져오거나 없으면 대략 1000건, 혹은 이전 응답의 total_count를 참조
        let totalCount = 1000;
        if (apiResponse && apiResponse[selectedApi.id] && apiResponse[selectedApi.id].total_count) {
          totalCount = parseInt(apiResponse[selectedApi.id].total_count, 10) || 1000;
        } else if (selectedApi.id === 'I0580') {
          totalCount = 1000; // HACCP
        } else if (selectedApi.id === 'I2500') {
          totalCount = 500; // 인허가
        }

        endIdx = totalCount;

        const startInEl = container.querySelector('#test-start-idx');
        const endInEl = container.querySelector('#test-end-idx');
        if (startInEl) startInEl.value = startIdx;
        if (endInEl) endInEl.value = endIdx;

        // 시각적으로 전체 범위 설정 완료를 알리기 위해 마이크로 변경 알림
        setAllBtn.textContent = `전체설정 완료 (${totalCount}건)`;
        setAllBtn.classList.remove('bg-gov-50/50', 'text-gov-700', 'border-gov-200');
        setAllBtn.classList.add('bg-emerald-500', 'text-white', 'border-transparent');
        setTimeout(() => {
          render();
        }, 800);
      });
    }

    // API 호출 전송 버튼 이벤트
    const sendBtn = container.querySelector('#send-api-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', fetchApiResponse);
    }

    // JSON 코드 복사 이벤트
    const copyBtn = container.querySelector('#copy-json-btn');
    if (copyBtn && apiResponse) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = JSON.stringify(apiResponse, null, 2);
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.textContent = "복사 완료!";
          copyBtn.classList.remove('bg-slate-800');
          copyBtn.classList.add('bg-emerald-600');
          setTimeout(() => {
            copyBtn.textContent = "코드 복사";
            copyBtn.classList.remove('bg-emerald-600');
            copyBtn.classList.add('bg-slate-800');
          }, 2000);
        }).catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
      });
    }
  };

  render();
}
