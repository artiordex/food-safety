import { datasets } from '../datasetData.js';

export function renderWordCloud(container, onSelectDataset) {
  // Sort datasets by name for the dropdown
  const sortedDatasets = [...datasets].sort((a, b) => a.name.localeCompare(b.name));
  
  const optionsHtml = sortedDatasets.map(ds => 
    `<option value="${ds.id}">${ds.name} (${ds.id})</option>`
  ).join('');

  container.innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1a1a2e;">
        식품안전 통합 DB 워드 클라우드
      </h2>
      <p style="color: #666; margin-bottom: 20px;">
        원하는 데이터 세트를 선택하면 해당 데이터에서 가장 자주 등장하는 핵심 내용을 한눈에 확인할 수 있습니다.
      </p>
      
      <div style="margin-bottom: 30px; display: flex; justify-content: center; align-items: center; gap: 10px;">
        <label for="wc-dataset-select" style="font-weight: 600; color: #333;">분석 대상 선택:</label>
        <select id="wc-dataset-select" style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px; min-width: 300px; outline: none;">
          <option value="ALL">전체 통합 데이터베이스 (ALL)</option>
          ${optionsHtml}
        </select>
      </div>

      <div id="wordcloud-canvas" style="width: 100%; height: 600px; display: flex; justify-content: center; align-items: center; border: 1px solid #eee; border-radius: 8px; background: #fafafa; position: relative;">
        <div id="wordcloud-loading" style="position: absolute; font-size: 18px; color: #999;">데이터베이스 분석 결과를 불러오는 중...</div>
      </div>
    </div>
  `;
  
  let currentFetchTimeout = null;

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

    fetch(`/api/wordcloud?tableName=${tableName}`)
      .then(res => {
        if (res.status === 202) {
          // If still building, retry after 2 seconds
          if (loadingEl) loadingEl.innerText = '데이터베이스 스캔 및 단어 빈도 분석이 진행 중입니다. 잠시만 기다려주세요...';
          currentFetchTimeout = setTimeout(() => fetchWordCloudData(tableName), 2000);
          throw new Error('BUILDING'); // break the chain
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
            // Remove old tooltip if any
            d3.selectAll(".wordcloud-tooltip").remove();

            // Setup tooltip
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
                         .text(`'${d.text}' (해당 DB 내 ${d.actualCount || '다수'}회 출현)`);
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
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      fetchWordCloudData(e.target.value);
    });
  }

  // Initial fetch for ALL
  fetchWordCloudData('ALL');
}
