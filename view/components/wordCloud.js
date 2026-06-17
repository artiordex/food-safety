/**
 * view/components/wordCloud.js
 * 워드 클라우드 컴포넌트
 * - renderWordCloud(container, onSelectDataset, keyword)
 *     → 선택한 데이터세트의 컬럼값 빈도를 분석하여 d3-cloud로 시각화
 *     → 단어 클릭 시 키워드 검색으로 연동
 */
import { escapeHtml, escapeAttr } from '/view/utils.js';
import { getDatasets } from '../datasetStore.js';

export async function renderWordCloud(container, onSelectDataset, keyword = '') {
  const datasets = await getDatasets();
  const sortedDatasets = [...datasets].sort((a, b) => a.name.localeCompare(b.name));

  const buildOptions = (kw) => {
    const filtered = kw
      ? sortedDatasets.filter(ds =>
          ds.name.toLowerCase().includes(kw.toLowerCase()) ||
          (ds.description || '').toLowerCase().includes(kw.toLowerCase()) ||
          (ds.subject || '').toLowerCase().includes(kw.toLowerCase())
        )
      : sortedDatasets;
    return filtered.map(ds =>
      `<option value="${escapeHtml(ds.id)}">${escapeHtml(ds.name)} (${escapeHtml(ds.id)})</option>`
    ).join('');
  };

  container.innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #1a1a2e;">
        식품안전 통합 DB 워드 클라우드
      </h2>
      <p style="color: #666; margin-bottom: 20px;">
        데이터세트를 선택하면 해당 데이터에서 가장 자주 등장하는 핵심 키워드를 한눈에 확인할 수 있습니다.
      </p>

      <!-- 키워드 필터 -->
      <div style="margin-bottom: 12px; display: flex; justify-content: center; align-items: center; gap: 8px;">
        <div style="position: relative;">
          <i class="ri-search-line" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
          <input type="text" id="wc-keyword-filter" value="${keyword}"
            placeholder="키워드로 데이터세트 필터 (예: 초콜릿, 우유...)"
            style="padding: 8px 12px 8px 32px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; width: 320px; outline: none;" />
        </div>
        <button id="btn-wc-filter" style="padding: 8px 16px; background: #475569; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">필터 적용</button>
      </div>

      <div style="margin-bottom: 24px; display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap;">
        <label for="wc-dataset-select" style="font-weight: 600; color: #333;">분석 대상 선택:</label>
        <select id="wc-dataset-select" style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px; min-width: 300px; outline: none;">
          <option value="ALL">전체 통합 데이터베이스 (ALL)</option>
          ${buildOptions(keyword)}
        </select>
        <button id="btn-wc-search" style="padding: 8px 20px; background: #0099d8; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 6px;">
          <i class="ri-search-line"></i> 분석 시작
        </button>
        <button id="btn-wc-capture" style="padding: 8px 20px; background: #27ae60; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 6px;">
          <i class="ri-camera-line"></i> 화면 캡처
        </button>
      </div>

      <div id="wordcloud-canvas" style="width: 100%; height: 600px; display: flex; justify-content: center; align-items: center; border: 1px solid #eee; border-radius: 8px; background: #fafafa; position: relative; overflow: hidden;">
        <div id="wordcloud-loading" style="position: absolute; font-size: 18px; color: #999;">데이터베이스 분석 결과를 불러오는 중...</div>
      </div>
    </div>
  `;
  
  let currentFetchTimeout = null;

  // 지정한 테이블의 워드클라우드 데이터를 서버에서 가져와 d3-cloud로 렌더링하는 함수
  // 서버가 202(빌딩 중)를 반환하면 2초 후 재시도
  const fetchWordCloudData = (tableName) => {
    if (currentFetchTimeout) clearTimeout(currentFetchTimeout);
    
    const loadingEl = container.querySelector('#wordcloud-loading');
    const cloudContainer = container.querySelector('#wordcloud-canvas');
    if (loadingEl) {
      loadingEl.style.display = 'block';
      loadingEl.innerText = '데이터베이스 단어 빈도 분석 중입니다...';
    }
    
    // Clear existing SVG
    const existingSvg = cloudContainer.querySelector('svg');
    if (existingSvg) existingSvg.remove();

    fetch(`/api/tables/${tableName}/wordcloud`)
      .then(res => {
        if (res.status === 202) {
          if (loadingEl) loadingEl.innerText = '데이터베이스 스캔 및 단어 빈도 분석이 진행 중입니다. 잠시만 기다려주세요...';
          currentFetchTimeout = setTimeout(() => fetchWordCloudData(tableName), 2000);
          throw new Error('BUILDING');
        }
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(wordsArray => {
        if (loadingEl) loadingEl.style.display = 'none';

        if (!wordsArray || wordsArray.length === 0) {
          if (loadingEl) {
            loadingEl.style.display = 'block';
            loadingEl.innerText = '해당 데이터 세트에는 분석할 텍스트 데이터가 없습니다.';
          }
          return;
        }

        // d3-cloud 레이아웃으로 단어 배치를 계산하고 SVG로 그리는 내부 함수
        const drawCloud = () => {
          if (!cloudContainer) return;
          
          const width = cloudContainer.clientWidth || 800;
          const height = cloudContainer.clientHeight || 600;
          
          if (!window.d3 || !window.d3.layout || !window.d3.layout.cloud) {
            setTimeout(drawCloud, 100);
            return;
          }
          
          const fill = d3.scaleOrdinal(d3.schemeCategory10);
          
          window.d3.layout.cloud().size([width - 40, height - 40])
            .words(wordsArray)
            .padding(5)
            .rotate(() => (~~(Math.random() * 2) * 90))
            .font("Impact")
            .fontSize(d => d.size)
            .on("end", draw)
            .start();
            
          function draw(words) {
            d3.selectAll(".wordcloud-tooltip").remove();

            const tooltip = d3.select("body").append("div")
              .attr("class", "wordcloud-tooltip")
              .style("position", "absolute")
              .style("visibility", "hidden")
              .style("background", "rgba(0, 0, 0, 0.8)")
              .style("color", "#fff")
              .style("padding", "8px 12px")
              .style("border-radius", "4px")
              .style("font-size", "13px")
              .style("pointer-events", "none")
              .style("z-index", "9999");

            d3.select("#wordcloud-canvas").append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "#fafafa") // 캡처 시 배경색 유지
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", d => d.size + "px")
                .style("font-family", "Impact")
                .style("fill", (d, i) => fill(i))
                .attr("text-anchor", "middle")
                .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                .text(d => d.text)
                .style("cursor", "pointer")
                .style("transition", "opacity 0.2s")
                .on("mouseover", function(event, d) {
                  d3.select(this).style("opacity", 0.7);
                  tooltip.style("visibility", "visible")
                         .text(`'${escapeHtml(d.text)}' (해당 DB 내 ${escapeHtml(d.actualCount || '다수')}회 출현)`);
                })
                .on("mousemove", function(event) {
                  tooltip.style("top", (event.pageY - 35) + "px")
                         .style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", function() {
                  d3.select(this).style("opacity", 1);
                  tooltip.style("visibility", "hidden");
                })
                .on("click", (e, d) => {
                  if (window.switchToKeywordMap) {
                    window.switchToKeywordMap(d.text);
                  }
                });
          }
        };
        
        setTimeout(drawCloud, 100);
      })
      .catch(err => {
        if (err.message === 'BUILDING') return;
        console.error('Failed to load wordcloud data', err);
        if (loadingEl) {
          loadingEl.style.display = 'block';
          loadingEl.innerText = '데이터를 불러오는데 실패했습니다.';
        }
      });
  };

  const selectEl = container.querySelector('#wc-dataset-select');
  const searchBtn = container.querySelector('#btn-wc-search');
  const captureBtn = container.querySelector('#btn-wc-capture');
  const filterInput = container.querySelector('#wc-keyword-filter');
  const filterBtn = container.querySelector('#btn-wc-filter');

  // 필터 입력값 기준으로 데이터세트 드롭다운 옵션을 재구성하는 함수
  const applyFilter = () => {
    const kw = filterInput ? filterInput.value.trim() : '';
    const newOptions = '<option value="ALL">전체 통합 데이터베이스 (ALL)</option>' + buildOptions(kw);
    selectEl.innerHTML = newOptions;
  };

  if (filterBtn) {
    filterBtn.addEventListener('click', applyFilter);
  }
  if (filterInput) {
    filterInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyFilter();
    });
  }

  if (searchBtn && selectEl) {
    searchBtn.addEventListener('click', () => {
      fetchWordCloudData(selectEl.value);
    });
  }

  // 전역 키워드로 자동 실행
  if (keyword) {
    fetchWordCloudData('ALL');
  }

  // SVG를 Canvas에 렌더링 후 PNG로 다운로드하는 캡처 기능
  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      const svg = container.querySelector('#wordcloud-canvas svg');
      if (!svg) {
        alert('캡처할 워드 클라우드가 없습니다.');
        return;
      }
      
      captureBtn.disabled = true;
      captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 캡처 중...';

      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width * 2; // 고해상도 처리
        canvas.height = svgSize.height * 2;
        const ctx = canvas.getContext("2d");
        
        // 배경색
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
        
        img.onload = function() {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imgURL = canvas.toDataURL("image/png");

          const dlLink = document.createElement('a');
          dlLink.download = `워드클라우드_${selectEl.value}_${new Date().getTime()}.png`;
          dlLink.href = imgURL;
          dlLink.click();

          captureBtn.disabled = false;
          captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
        };
        
        img.onerror = function() {
          alert('캡처 중 오류가 발생했습니다.');
          captureBtn.disabled = false;
          captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
        };
      } catch (e) {
        console.error(e);
        alert('캡처 중 오류가 발생했습니다.');
        captureBtn.disabled = false;
        captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
      }
    });
  }

  // 초기 자동 렌더링
  fetchWordCloudData('ALL');
}
