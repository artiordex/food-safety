import { getDatasetsSync } from '../datasetStore.js';
import { renderKeywordGraph } from './keywordGraph.js';
import { renderCombinedErdMap } from './dbErdMap.js';

export function renderDataMap(container, onSelectDataset) {
  // DB에서 데이터 가져오기
  const fetchDataAndRender = async () => {
    try {
      const res = await fetch('/api/searchDatasetList.do', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_idx: 1, show_cnt: 1000 })
      });
      const data = await res.json();

      const subjectCounts = {};
      let totalCount = 0;

      data.list.forEach(d => {
        const subj = d.cl_cd_nm || '기타';
        if (!subjectCounts[subj]) subjectCounts[subj] = { count: 0, items: [] };
        subjectCounts[subj].count += 1;

        subjectCounts[subj].items.push({
          id: d.svc_no,
          name: d.svc_nm,
          description: d.svc_nm + " 공공데이터 API입니다.",
          formats: ["JSON", "XML"],
          users: [d.provd_instt_nm || '식품의약품안전처']
        });
        totalCount += 1;
      });

      const subjectArray = Object.keys(subjectCounts).map(subj => ({
        subject: subj,
        count: subjectCounts[subj].count,
        ratio: ((subjectCounts[subj].count / totalCount) * 100).toFixed(1),
        items: subjectCounts[subj].items
      })).sort((a, b) => b.count - a.count);

      renderUI(subjectArray, totalCount);

    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="p-8 text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    }
  };

  const renderUI = (subjectArray, totalCount) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    
    view.style.display = 'block';
    
    const countEl = view.querySelector('#category-total-count');
    if (countEl) countEl.textContent = `총 ${totalCount}종`;

    renderCategoryList(subjectArray);

    // Treemap 렌더링을 약간 지연시켜 컨테이너 레이아웃이 잡히도록 함
    setTimeout(() => {
      renderTreemap(subjectArray);
    }, 100);

    // 3탭 전환 헬퍼
    const ALL_TABS = ['treemap', 'visualization', 'erd'];
    let erdRendered = false;
    const resetErdPanel = (message = '검색어를 입력하면 데이터 관계도·ERD가 표시됩니다.') => {
      erdRendered = false;
      const canvas = view.querySelector('#cem-canvas');
      const loading = view.querySelector('#cem-loading');
      const inspector = view.querySelector('#cem-inspector');
      if (canvas) {
        canvas.innerHTML = `
          <div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:#64748b;padding:32px;">
            <div>
              <i class="ri-search-line" style="font-size:34px;display:block;margin-bottom:10px;color:#94a3b8;"></i>
              <p style="font-size:14px;font-weight:700;color:#334155;margin:0 0 6px;">${message}</p>
              <p style="font-size:12px;margin:0;">예: 초콜릿, 식품, 회수, HACCP</p>
            </div>
          </div>`;
      }
      if (loading) loading.classList.add('hidden');
      if (inspector) inspector.classList.add('hidden', 'translate-x-[calc(100%+2rem)]');
    };

    const resetKeywordVisualization = (message = '검색어를 입력하면 데이터 관계도·ERD가 표시됩니다.') => {
      const loading = view.querySelector('#kwmap-loading');
      const error = view.querySelector('#kwmap-error');
      const svgWrap = view.querySelector('#kwmap-svg-wrap');
      const zoomBtns = view.querySelector('#kwmap-zoom-btns');
      const detailPanel = view.querySelector('#kwmap-detail-panel');

      if (loading) loading.style.display = 'none';
      if (error) {
        error.textContent = '';
        error.style.setProperty('display', 'none', 'important');
      }
      if (zoomBtns) zoomBtns.style.display = 'none';
      if (svgWrap) {
        svgWrap.style.display = 'block';
        svgWrap.innerHTML = `
          <div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:#64748b;padding:32px;">
            <div>
              <i class="ri-search-line" style="font-size:34px;display:block;margin-bottom:10px;color:#94a3b8;"></i>
              <p style="font-size:14px;font-weight:700;color:#334155;margin:0 0 6px;">${message}</p>
              <p style="font-size:12px;margin:0;">예: 초콜릿, 식품, 회수, HACCP</p>
            </div>
          </div>`;
      }
      if (detailPanel) {
        detailPanel.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
            <i class="ri-search-eye-line text-4xl mb-3 text-slate-300"></i>
            <p class="text-sm font-semibold text-slate-500">${message}</p>
          </div>`;
      }
    };

    const switchContentTab = (active) => {
      ALL_TABS.forEach(t => {
        const panel = view.querySelector(`#content-panel-${t}`);
        const btn = view.querySelector(`#content-tab-btn-${t}`);
        const isActive = t === active;
        if (panel) panel.style.display = isActive ? 'block' : 'none';
        if (btn) {
          btn.style.borderBottomColor = isActive ? '#2563eb' : 'transparent';
          btn.style.color = isActive ? '#2563eb' : '#94a3b8';
        }
      });
    };

    // 탭 버튼 클릭 핸들러
    ALL_TABS.forEach(t => {
      const btn = view.querySelector(`#content-tab-btn-${t}`);
      if (btn) btn.addEventListener('click', () => {
        switchContentTab(t);
        if (t === 'visualization') {
          const kw = view.querySelector('#datamap-keyword-search')?.value.trim() || '';
          if (!kw) {
            resetKeywordVisualization();
            return;
          }
          renderKeywordGraph(kw);
        }
        if (t === 'erd' && !erdRendered) {
          const kw = view.querySelector('#datamap-keyword-search')?.value.trim() || '';
          const panel = view.querySelector('#content-panel-erd');
          if (!kw) {
            resetErdPanel();
            return;
          }
          erdRendered = true;
          if (panel) renderCombinedErdMap(panel);
        }
      });
    });

    const buildSubjectArrayFromDatasets = (datasets) => {
      const subjectCounts = {};
      const total = datasets.length;

      datasets.forEach(d => {
        const subj = d.cl_cd_nm || '기타';
        if (!subjectCounts[subj]) subjectCounts[subj] = { count: 0, items: [] };
        subjectCounts[subj].count += 1;
        subjectCounts[subj].items.push({
          id: d.svc_no,
          name: d.svc_nm,
          description: d.description || `${d.svc_nm || d.svc_no} 공공데이터 API입니다.`,
          formats: ["JSON", "XML"],
          users: [d.provd_instt_nm || '식품의약품안전처']
        });
      });

      return Object.keys(subjectCounts).map(subj => ({
        subject: subj,
        count: subjectCounts[subj].count,
        ratio: total > 0 ? ((subjectCounts[subj].count / total) * 100).toFixed(1) : '0.0',
        items: subjectCounts[subj].items
      })).sort((a, b) => b.count - a.count);
    };

    const updateTreemapForSearch = (datasets, kw) => {
      const filteredSubjectArray = buildSubjectArrayFromDatasets(datasets);
      const countEl = view.querySelector('#category-total-count');
      const treemapPanel = view.querySelector('#content-panel-treemap');

      if (countEl) countEl.textContent = kw ? `"${kw}" 검색 ${datasets.length}종` : `전체 ${datasets.length}종`;
      if (treemapPanel) showTreemapOriginal(treemapPanel);
      renderCategoryList(filteredSubjectArray);
      renderTreemap(filteredSubjectArray);
    };

    // 키워드 검색 결과 렌더링
    const renderSearchResults = async (kw) => {
      const summary = view.querySelector('#keyword-result-summary');
      const cardsEl = view.querySelector('#keyword-dataset-cards');
      const vizEl = view.querySelector('#keyword-viz-container');
      if (!cardsEl) return;

      // 탭 바 표시 (최초 검색 시)
      const tabBar = view.querySelector('#content-tab-bar');
      if (tabBar) tabBar.style.display = 'flex';

      // viz 초기화 (새 키워드 검색 시 재렌더 허용)
      const graphWrap = view.querySelector('#kwmap-graph-container');
      if (graphWrap) graphWrap.dataset.panzoom = ''; // panzoom 재등록 허용 안함, keyword만 리셋
      // keywordGraph.js의 _currentKeyword를 리셋하기 위해 kwmap-svg-wrap 비움
      const svgWrapEl = view.querySelector('#kwmap-svg-wrap');
      if (svgWrapEl && kw) svgWrapEl.innerHTML = '';
      if (!kw) resetKeywordVisualization();
      switchContentTab('treemap');
      view.querySelector('#content-panel-treemap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 로딩 상태
      if (summary) summary.innerHTML = kw
        ? `실제 데이터 내 <strong style="color:#1e293b;">"${kw}"</strong> 검색 중...`
        : `전체 데이터세트를 불러오는 중...`;
      cardsEl.innerHTML = `<div style="grid-column:1/-1;padding:48px 24px;text-align:center;color:#64748b;">
        <div style="display:inline-block;width:32px;height:32px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:12px;"></div>
        <div style="font-size:14px;">${kw ? `실제 데이터 안에서 <strong>"${kw}"</strong> 검색 중...` : '전체 데이터세트를 불러오는 중...'}<br><span style="font-size:12px;color:#94a3b8;">잠시만 기다려주세요.</span></div>
      </div>`;

      let matchedTableIds = new Set();
      let allDatasets = [];
      try {
        const metaRequest = fetch('/api/searchDatasetList.do', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_idx: 1, show_cnt: 1000 })
          });
        const [colData, metaData] = await Promise.all([
          kw
            ? fetch(`/api/column-search?keyword=${encodeURIComponent(kw)}`).then(res => res.json())
            : Promise.resolve({ tables: [] }),
          metaRequest.then(res => res.json())
        ]);
        (colData.tables || []).forEach(id => matchedTableIds.add(String(id)));
        allDatasets = metaData.list || [];
      } catch (e) {
        cardsEl.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:#ef4444;">검색 중 오류가 발생했습니다.</div>`;
        return;
      }

      const matched = kw ? allDatasets.filter(d => {
        const inName = (d.svc_nm || '').toLowerCase().includes(kw.toLowerCase()) || (d.description || '').toLowerCase().includes(kw.toLowerCase());
        const inData = matchedTableIds.has(String(d.svc_no));
        d._match_inName = inName;
        d._match_inData = inData;
        return inName || inData;
      }) : allDatasets.map(d => {
        d._match_inName = false;
        d._match_inData = false;
        return d;
      });
      if (summary) summary.innerHTML = kw
        ? `검색어 <strong style="color:#1e293b;">"${kw}"</strong> 포함 데이터세트 — 총 <strong style="color:#2563eb;">${matched.length}개</strong>`
        : `전체 데이터세트 — 총 <strong style="color:#2563eb;">${matched.length}개</strong>`;
      updateTreemapForSearch(matched, kw);

      if (matched.length === 0) {
        cardsEl.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:#94a3b8;">
          <i class="ri-search-line" style="font-size:32px;display:block;margin-bottom:8px;"></i>
          ${kw ? `"<strong>${kw}</strong>"에 해당하는 데이터세트가 없습니다.` : '표시할 데이터세트가 없습니다.'}
        </div>`;
      } else {
        cardsEl.innerHTML = matched.map((d, idx) => {
          const cat = d.cl_cd_nm || '기타';
          const catColor = getColor(cat, idx);
          const catBg = getSoftColor(cat, idx);
          return `
          <div data-svc-no="${d.svc_no}" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;cursor:pointer;transition:box-shadow .15s,border-color .15s;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;">
              <div>
                <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:${catBg};color:${catColor};white-space:nowrap;margin-right:4px;">${cat}</span>
              </div>
              <span style="font-size:11px;color:#94a3b8;white-space:nowrap;flex-shrink:0;">${d.svc_no}</span>
            </div>
            <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0 0 6px;line-height:1.4;">${kw ? (d.svc_nm || '').replace(new RegExp(kw, 'gi'), m => `<mark style="background:#fef08a;padding:0 1px;">${m}</mark>`) : (d.svc_nm || '')}</p>
            <p style="font-size:12px;color:#64748b;margin:0;">${d.provd_instt_nm || '식품의약품안전처'}</p>
          </div>
          `;
        }).join('');

        // 카드 클릭 → 세부 패널 열기
        cardsEl.querySelectorAll('[data-svc-no]').forEach(card => {
          card.addEventListener('mouseover', () => { card.style.boxShadow = '0 4px 16px rgba(0,0,0,.1)'; card.style.borderColor = '#93c5fd'; });
          card.addEventListener('mouseout', () => {
            if (card.dataset.active !== '1') { card.style.boxShadow = 'none'; card.style.borderColor = '#e2e8f0'; }
          });
          card.addEventListener('click', () => {
            const svcNo = card.dataset.svcNo;
            const ds = matched.find(d => String(d.svc_no) === svcNo);
            if (ds) openDatasetDetail(ds, view);
            // 선택 강조
            cardsEl.querySelectorAll('[data-svc-no]').forEach(c => { c.dataset.active = ''; c.style.borderColor = '#e2e8f0'; c.style.boxShadow = 'none'; });
            card.dataset.active = '1';
            card.style.borderColor = '#2563eb';
            card.style.boxShadow = '0 0 0 2px #bfdbfe';
          });
        });
      }

      if (typeof window.setGlobalDatamapKeyword === 'function') {
        window.setGlobalDatamapKeyword(kw);
      }
    };

    // 데이터세트 세부 패널 (워드 클라우드 포함)
    const openDatasetDetail = (ds, view) => {
      let detailEl = view.querySelector('#dataset-detail-panel');
      if (!detailEl) {
        detailEl = document.createElement('div');
        detailEl.id = 'dataset-detail-panel';
        view.querySelector('#keyword-search-result-panel')?.appendChild(detailEl);
      }
      detailEl.style.cssText = 'margin-top:32px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;';
      detailEl.innerHTML = `
        <!-- 세부 헤더 -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #f1f5f9;background:#f8fafc;">
          <div>
            <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:#dbeafe;color:#1d4ed8;margin-bottom:6px;display:inline-block;">${ds.cl_cd_nm || '기타'}</span>
            <h4 style="font-size:18px;font-weight:700;color:#1e293b;margin:0;">${ds.svc_nm || ''}</h4>
            <p style="font-size:13px;color:#64748b;margin:4px 0 0;">${ds.provd_instt_nm || '식품의약품안전처'} · 데이터셋 ID: ${ds.svc_no}</p>
          </div>
          <button id="btn-close-detail" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:22px;line-height:1;" title="닫기">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <!-- 워드 클라우드 영역 -->
        <div style="padding:24px;">
          <h5 style="font-size:15px;font-weight:700;color:#1e293b;margin:0 0 4px;display:flex;align-items:center;gap:8px;">
            <i class="ri-cloud-line" style="color:#2563eb;"></i> 키워드 워드 클라우드
            <span style="font-size:12px;font-weight:400;color:#94a3b8;">— 해당 데이터세트에서 가장 많이 등장하는 단어</span>
          </h5>
          <div id="detail-wordcloud-wrap" style="width:100%;height:360px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-top:16px;">
            <div id="detail-wc-loading" style="text-align:center;color:#64748b;">
              <div style="display:inline-block;width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:12px;"></div>
              <div style="font-size:14px;">워드 클라우드 생성 중...</div>
            </div>
          </div>
        </div>
      `;

      detailEl.querySelector('#btn-close-detail').addEventListener('click', () => {
        detailEl.remove();
        view.querySelectorAll('[data-svc-no]').forEach(c => { c.dataset.active = ''; c.style.borderColor = '#e2e8f0'; c.style.boxShadow = 'none'; });
      });

      detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 워드 클라우드 fetch & render
      renderDetailWordCloud(String(ds.svc_no), detailEl.querySelector('#detail-wordcloud-wrap'));
    };

    const renderDetailWordCloud = (tableName, wrap) => {
      let retryTimer = null;

      const fetchAndDraw = () => {
        fetch(`/api/wordcloud?tableName=${tableName}`)
          .then(res => {
            if (res.status === 202) {
              const loadEl = wrap.querySelector('#detail-wc-loading');
              if (loadEl) loadEl.querySelector('div:last-child').textContent = '데이터 분석 중... 잠시만 기다려주세요.';
              retryTimer = setTimeout(fetchAndDraw, 2000);
              throw new Error('BUILDING');
            }
            if (!res.ok) throw new Error('FAIL');
            return res.json();
          })
          .then(words => {
            if (!words || words.length === 0) {
              wrap.innerHTML = '<div style="color:#94a3b8;font-size:14px;">분석할 텍스트 데이터가 없습니다.</div>';
              return;
            }
            drawWordCloud(words, wrap);
          })
          .catch(err => {
            if (err.message === 'BUILDING') return;
            wrap.innerHTML = '<div style="color:#ef4444;font-size:14px;">워드 클라우드 데이터를 불러오지 못했습니다.</div>';
          });
      };

      fetchAndDraw();
    };

    const drawWordCloud = (wordsArray, wrap) => {
      const tryDraw = () => {
        if (!window.d3 || !window.d3.layout || !window.d3.layout.cloud) {
          setTimeout(tryDraw, 100); return;
        }
        const width = wrap.clientWidth || 700;
        const height = wrap.clientHeight || 360;
        const fill = d3.scaleOrdinal(d3.schemeTableau10);

        window.d3.layout.cloud()
          .size([width - 20, height - 20])
          .words(wordsArray)
          .padding(4)
          .rotate(() => (~~(Math.random() * 2) * 90))
          .font('Noto Sans KR, sans-serif')
          .fontSize(d => d.size)
          .on('end', words => {
            wrap.innerHTML = '';
            const svg = d3.select(wrap).append('svg')
              .attr('width', width).attr('height', height)
              .style('background', '#f8fafc');
            const tooltip = d3.select('body').append('div')
              .attr('class', 'wordcloud-tooltip')
              .style('position', 'absolute').style('visibility', 'hidden')
              .style('background', 'rgba(0,0,0,.8)').style('color', '#fff')
              .style('padding', '6px 12px').style('border-radius', '4px')
              .style('font-size', '13px').style('pointer-events', 'none').style('z-index', '9999');
            svg.append('g')
              .attr('transform', `translate(${width / 2},${height / 2})`)
              .selectAll('text').data(words).enter().append('text')
              .style('font-size', d => d.size + 'px')
              .style('font-family', 'Noto Sans KR, sans-serif')
              .style('fill', (_, i) => fill(i))
              .attr('text-anchor', 'middle')
              .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
              .text(d => d.text)
              .style('cursor', 'pointer')
              .on('mouseover', function(event, d) {
                d3.select(this).style('opacity', 0.7);
                tooltip.style('visibility', 'visible').text(`'${d.text}' (${d.actualCount || '다수'}회 출현)`);
              })
              .on('mousemove', function(event) {
                tooltip.style('top', (event.pageY - 35) + 'px').style('left', (event.pageX + 10) + 'px');
              })
              .on('mouseout', function() {
                d3.select(this).style('opacity', 1);
                tooltip.style('visibility', 'hidden');
              });
          })
          .start();
      };
      tryDraw();
    };

    // 키워드 데이터맵 검색 버튼 연동
    const searchBtn = view.querySelector('#btn-datamap-keyword-search');
    if (searchBtn) {
      const doSearch = () => {
        // 항상 현재 DOM에서 input 값을 읽음
        const input = view.querySelector('#datamap-keyword-search');
        const kw = input ? input.value.trim() : '';
        if (!kw) {
          resetErdPanel();
          resetKeywordVisualization();
        }
        renderSearchResults(kw);
      };

      // 버튼만 교체 (input은 건드리지 않음)
      const newBtn = searchBtn.cloneNode(true);
      searchBtn.parentNode.replaceChild(newBtn, searchBtn);
      newBtn.addEventListener('click', doSearch);

      // input Enter 키
      const searchInput = view.querySelector('#datamap-keyword-search');
      if (searchInput) {
        searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
      }
    }

    // 트리맵 캡처 버튼
    const captureBtn = view.querySelector('#btn-treemap-capture');
    if (captureBtn) {
      captureBtn.addEventListener('click', async () => {
        const treemapCard = view.querySelector('#treemap-container').closest('.lg\\:col-span-2');
        if (!treemapCard || typeof html2canvas === 'undefined') return;

        captureBtn.disabled = true;
        captureBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> 저장 중...';

        try {
          // overflow hidden 임시 해제하여 잘림 방지
          const origOverflow = treemapCard.style.overflow;
          treemapCard.style.overflow = 'visible';

          const canvas = await html2canvas(treemapCard, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            width: treemapCard.scrollWidth,
            height: treemapCard.scrollHeight,
            windowWidth: treemapCard.scrollWidth,
            windowHeight: treemapCard.scrollHeight,
          });

          treemapCard.style.overflow = origOverflow;

          const link = document.createElement('a');
          link.download = `식품안전나라_데이터맵_${new Date().toISOString().slice(0,10)}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        } catch (e) {
          console.error('캡처 실패:', e);
          alert('이미지 저장에 실패했습니다.');
        } finally {
          captureBtn.disabled = false;
          captureBtn.innerHTML = '<i class="ri-camera-line"></i> 화면 캡처';
        }
      });
    }
  };

  const colorScale = [
    '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
    '#0891b2', '#ea580c', '#4f46e5', '#db2777', '#0d9488',
    '#65a30d', '#9333ea', '#e11d48', '#0284c7', '#ca8a04',
    '#059669', '#be123c', '#475569'
  ];

  const categoryColorMap = {
    '식품영양정보': '#16a34a',
    '기준규격정보': '#2563eb',
    '코드정보': '#7c3aed',
    '수질환경정보': '#0284c7',
    '검사기관정보': '#475569',
    '식품위해관리': '#dc2626',
    '식품안전관리': '#0d9488',
    '이력추적관리': '#4f46e5',
    '어린이식품안전관리': '#db2777',
    'HACCP지정현황': '#0891b2',
    '업체인허가현황': '#ea580c',
    '위생용품': '#e11d48',
    '축산물': '#9333ea',
    '건강기능식품': '#65a30d',
    '수입식품 등': '#f59e0b',
    '식품 등': '#059669',
    '폐업정보': '#be123c',
    '용어사전': '#ca8a04'
  };

  const getColor = (subject, idx) => categoryColorMap[subject] || colorScale[idx % colorScale.length];
  const hexToRgb = (hex) => {
    const raw = String(hex || '').replace('#', '');
    const value = raw.length === 3 ? raw.split('').map(ch => ch + ch).join('') : raw;
    const n = Number.parseInt(value, 16);
    return {
      r: (n >> 16) & 255,
      g: (n >> 8) & 255,
      b: n & 255
    };
  };
  const getSoftColor = (subject, idx) => {
    const rgb = hexToRgb(getColor(subject, idx));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
  };

  const renderCategoryList = (subjectArray) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    const listContainer = view.querySelector('#category-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = subjectArray.map((item, idx) => {
      const color = getColor(item.subject, idx);
      const softColor = getSoftColor(item.subject, idx);
      return `
        <div class="category-item cursor-pointer group p-3 rounded-lg transition-colors border" data-subject="${item.subject}" style="border-color:${softColor};background:${softColor};">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
              <span class="font-medium text-slate-700 text-sm">${item.subject}</span>
            </div>
            <span class="text-xs font-bold text-slate-900">${item.count}종 <span class="text-slate-400 font-normal">(${item.ratio}%)</span></span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div class="h-1.5 rounded-full transition-all duration-1000" style="width: 0%; background-color: ${color}" data-target-width="${item.ratio}%"></div>
          </div>
        </div>
      `;
    }).join('');

    // Animate progress bars
    setTimeout(() => {
      listContainer.querySelectorAll('[data-target-width]').forEach(el => {
        el.style.width = el.dataset.targetWidth;
      });
    }, 50);

    // Click event for category list
    listContainer.querySelectorAll('.category-item').forEach(el => {
      el.addEventListener('click', () => {
        const subject = el.dataset.subject;
        const categoryData = subjectArray.find(s => s.subject === subject);
        if (categoryData) {
          showCategoryDatasets(categoryData);
        }
      });
    });
  };

  const renderTreemap = (subjectArray) => {
    if (typeof d3 === 'undefined') return;

    const containerEl = document.getElementById('treemap-container');
    if (!containerEl) return;

    const width = containerEl.clientWidth || 800;
    const height = containerEl.clientHeight || 250;

    // Remove old svg
    containerEl.innerHTML = '';

    const rootData = {
      name: "Root",
      children: subjectArray.map(s => ({
        name: s.subject,
        value: s.count,
        items: s.items
      }))
    };

    const root = d3.hierarchy(rootData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .padding(4)
      .paddingInner(4)
      (root);

    const svg = d3.select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "Inter, sans-serif");

    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        const categoryData = subjectArray.find(s => s.subject === d.data.name);
        if (categoryData) showCategoryDatasets(categoryData);
      });

    leaf.append("rect")
      .attr("width", d => Math.max(0, d.x1 - d.x0))
      .attr("height", d => Math.max(0, d.y1 - d.y0))
      .attr("fill", (d, i) => getColor(d.data.name, i))
      .attr("rx", 6)
      .attr("ry", 6)
      .style("opacity", 0.9)
      .on("mouseover", function () {
        d3.select(this).style("opacity", 1).attr("stroke", "#fff").attr("stroke-width", 2);
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.9).attr("stroke", "none");
      });

    leaf.append("text")
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? h / 2 - 6 : h / 2 + 5;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-weight", "600")
      .attr("font-size", d => {
        const w = d.x1 - d.x0;
        const name = d.data.name;
        const maxFontSize = 16;
        const minFontSize = 8;
        // 너비 기준으로 글자 수에 맞게 폰트 크기 계산
        const fitSize = Math.floor(w / (name.length * 0.65));
        return Math.min(maxFontSize, Math.max(minFontSize, fitSize)) + "px";
      })
      .each(function(d) {
        const w = d.x1 - d.x0;
        if (w < 20) { d3.select(this).text(""); return; }
        d3.select(this).text(d.data.name);
        // textLength로 박스 너비 초과 방지
        const textEl = this;
        const padding = 8;
        if (textEl.getComputedTextLength && textEl.getComputedTextLength() > w - padding * 2) {
          d3.select(this).attr("textLength", Math.max(1, w - padding * 2)).attr("lengthAdjust", "spacingAndGlyphs");
        }
      });

    leaf.append("text")
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? h / 2 + 14 : h / 2 + 5;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.85)")
      .attr("font-size", d => {
        const h = d.y1 - d.y0;
        return h > 40 ? "11px" : "0px";
      })
      .text(d => {
        const w = d.x1 - d.x0;
        return w > 40 ? `${d.data.value}종` : "";
      });
  };

  const getTreemapPanel = () => document.getElementById('datamap-view')?.querySelector('#content-panel-treemap');

  const hideTreemapOriginal = (panel) => {
    Array.from(panel.children).forEach(child => {
      if (child.id !== 'treemap-replacement-view') child.style.display = 'none';
    });
  };

  const showTreemapOriginal = (panel) => {
    panel.querySelector('#treemap-replacement-view')?.remove();
    Array.from(panel.children).forEach(child => {
      child.style.display = '';
    });
  };

  const renderTreemapWordCloud = (tableName, wrap) => {
    if (!wrap) return;

    const draw = (wordsArray) => {
      const tryDraw = () => {
        if (!window.d3 || !window.d3.layout || !window.d3.layout.cloud) {
          setTimeout(tryDraw, 100);
          return;
        }

        const width = wrap.clientWidth || 760;
        const height = wrap.clientHeight || 360;
        const fill = d3.scaleOrdinal(d3.schemeTableau10);

        window.d3.layout.cloud()
          .size([width - 24, height - 24])
          .words(wordsArray)
          .padding(4)
          .rotate(() => (Math.random() > 0.72 ? 90 : 0))
          .font('Noto Sans KR, sans-serif')
          .fontSize(d => d.size)
          .on('end', words => {
            wrap.innerHTML = '';
            const svg = d3.select(wrap).append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background', '#f8fafc');

            svg.append('g')
              .attr('transform', `translate(${width / 2},${height / 2})`)
              .selectAll('text')
              .data(words)
              .enter()
              .append('text')
              .style('font-size', d => `${d.size}px`)
              .style('font-family', 'Noto Sans KR, sans-serif')
              .style('fill', (_, i) => fill(i))
              .attr('text-anchor', 'middle')
              .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
              .text(d => d.text);
          })
          .start();
      };
      tryDraw();
    };

    const fetchAndDraw = () => {
      fetch(`/api/wordcloud?tableName=${encodeURIComponent(tableName)}`)
        .then(res => {
          if (res.status === 202) {
            const label = wrap.querySelector('[data-wordcloud-loading-text]');
            if (label) label.textContent = '데이터 분석 중... 잠시만 기다려주세요.';
            setTimeout(fetchAndDraw, 2000);
            throw new Error('BUILDING');
          }
          if (!res.ok) throw new Error('FAIL');
          return res.json();
        })
        .then(words => {
          if (!words || words.length === 0) {
            wrap.innerHTML = '<div style="color:#94a3b8;font-size:14px;">분석할 텍스트 데이터가 없습니다.</div>';
            return;
          }
          draw(words);
        })
        .catch(err => {
          if (err.message === 'BUILDING') return;
          wrap.innerHTML = '<div style="color:#ef4444;font-size:14px;">워드 클라우드 데이터를 불러오지 못했습니다.</div>';
        });
    };

    fetchAndDraw();
  };

  const showTreemapDatasetDetail = (dataset, categoryData) => {
    const panel = getTreemapPanel();
    const page = panel?.querySelector('#treemap-replacement-view');
    if (!panel || !page) return;

    const categoryColor = getColor(categoryData.subject, 0);
    const categoryBg = getSoftColor(categoryData.subject, 0);
    const tableName = dataset.id || dataset.svc_no;

    page.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-slate-100 bg-slate-50">
          <div>
            <button id="btn-back-dataset-list" class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-gov-700 mb-3">
              <i class="ri-arrow-left-line"></i> 데이터세트 목록
            </button>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 text-[11px] font-bold rounded" style="background:${categoryBg};color:${categoryColor};">${categoryData.subject}</span>
              <span class="text-xs text-slate-400">ID ${tableName || '-'}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 leading-snug">${dataset.name || dataset.svc_nm || '-'}</h3>
            <p class="text-sm text-slate-500 mt-1">${dataset.users?.[0] || dataset.provd_instt_nm || '식품의약품안전처'}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-0">
          <div class="xl:col-span-1 p-6 border-b xl:border-b-0 xl:border-r border-slate-100">
            <h4 class="text-sm font-bold text-slate-800 mb-3">데이터세트 상세 정보</h4>
            <p class="text-sm text-slate-600 leading-6 mb-5">${dataset.description || '데이터세트 설명 정보가 없습니다.'}</p>
            <dl class="space-y-3 text-sm">
              <div>
                <dt class="text-xs font-bold text-slate-400 mb-1">제공 형식</dt>
                <dd class="flex flex-wrap gap-1">${(dataset.formats || ['JSON', 'XML']).map(f => `<span class="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-semibold">${f}</span>`).join('')}</dd>
              </div>
              <div>
                <dt class="text-xs font-bold text-slate-400 mb-1">분류</dt>
                <dd class="text-slate-700">${categoryData.subject}</dd>
              </div>
              <div>
                <dt class="text-xs font-bold text-slate-400 mb-1">테이블명</dt>
                <dd class="font-mono text-slate-700">${tableName || '-'}</dd>
              </div>
            </dl>
          </div>

          <div class="xl:col-span-2 p-6">
            <h4 class="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <i class="ri-cloud-line text-gov-600"></i> 워드 클라우드 정보
            </h4>
            <p class="text-xs text-slate-500 mb-4">해당 데이터세트의 실제 데이터에서 자주 등장하는 키워드를 시각화합니다.</p>
            <div id="treemap-detail-wordcloud-wrap" style="width:100%;height:380px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
              <div style="text-align:center;color:#64748b;">
                <div style="display:inline-block;width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:12px;"></div>
                <div data-wordcloud-loading-text style="font-size:14px;">워드 클라우드 생성 중...</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    page.querySelector('#btn-back-dataset-list')?.addEventListener('click', () => showCategoryDatasets(categoryData));
    renderTreemapWordCloud(String(tableName || ''), page.querySelector('#treemap-detail-wordcloud-wrap'));
    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showCategoryDatasetsLegacy = (categoryData) => {
    const view = document.getElementById('datamap-view');
    if (!view) return;
    const resultPanel = view.querySelector('#keyword-search-result-panel');
    const summary = view.querySelector('#keyword-result-summary');
    const cardsContainer = view.querySelector('#keyword-dataset-cards');

    if (!resultPanel || !cardsContainer) return;

    const activeBtn = view.querySelector('#content-tab-btn-treemap');
    const activePanel = view.querySelector('#content-panel-treemap');
    if (activePanel) activePanel.style.display = 'block';
    if (activeBtn) {
      activeBtn.style.borderBottomColor = '#2563eb';
      activeBtn.style.color = '#2563eb';
    }
    if (summary) {
      summary.innerHTML = `<strong style="color:#1e293b;">${categoryData.subject}</strong> 분야 데이터세트 — 총 <strong style="color:#2563eb;">${categoryData.count}개</strong>`;
    }

    const categoryColor = getColor(categoryData.subject, 0);
    const categoryBg = getSoftColor(categoryData.subject, 0);

    cardsContainer.innerHTML = categoryData.items.map(ds => `
      <div class="dataset-card bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer flex flex-col h-full" data-id="${ds.id}" style="border:1px solid ${categoryBg};border-top:3px solid ${categoryColor};">
        <div class="flex justify-between items-start mb-2">
          <span class="px-2 py-1 text-[10px] font-bold rounded" style="background:${categoryBg};color:${categoryColor};">${categoryData.subject}</span>
          <div class="flex gap-1">
            ${ds.formats.map(f => `<span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200">${f}</span>`).join('')}
          </div>
        </div>
        <h4 class="font-bold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug">${ds.name}</h4>
        <p class="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">${ds.description}</p>
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div class="flex items-center gap-1 text-[11px] text-slate-500">
            <i class="ri-building-line"></i> ${ds.users[0] || '식품의약품안전처'}
          </div>
        </div>
      </div>
    `).join('');

    // 카드 클릭 이벤트 (상세 패널 등)
    cardsContainer.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', () => {
        const dsId = card.dataset.id;
        let ds = getDatasetsSync().find(i => i.id === dsId);
        if (!ds) {
          const rawDs = categoryData.items.find(i => i.id === dsId);
          if (rawDs) {
            ds = {
              id: rawDs.id,
              name: rawDs.name,
              description: rawDs.description || (rawDs.name + " 공공데이터 API입니다."),
              users: ["일반사용자", "개발자"],
              dataCount: rawDs.dataCount || 100,
              formats: rawDs.formats || ["JSON", "XML"],
              difficulty: "easy",
              subject: categoryData.subject || "기타",
              process: "정보 제공",
              issue: "해당없음",
              theme: "일반 조회용",
              includedData: [rawDs.name],
              keys: ["SVC_NO"],
              usageExample: `SELECT * FROM "${rawDs.id}" LIMIT 10;`,
              detail: {
                overview: rawDs.description || (rawDs.name + " 공공데이터 API입니다."),
                includedList: [rawDs.name],
                joinKeys: ["LCNS_NO", "PRDLST_REPORT_NO"],
                scenarios: ["공공데이터 연계 및 분석 시나리오 수립"],
                recommendedUsers: ["공공데이터 활용 개발자", "식품 안전 관리자"],
                guideLinks: [
                  {
                    label: "Open API 포털 안내",
                    url: "https://www.foodsafetykorea.go.kr"
                  }
                ],
                examples: [
                  `SELECT * FROM "${rawDs.id}" LIMIT 10;`
                ]
              }
            };
          }
        }
        if (ds && onSelectDataset) onSelectDataset(ds);
      });
    });

    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showCategoryDatasets = (categoryData) => {
    const view = document.getElementById('datamap-view');
    const panel = getTreemapPanel();
    if (!view || !panel) return;

    const activeBtn = view.querySelector('#content-tab-btn-treemap');
    if (panel) panel.style.display = 'block';
    if (activeBtn) {
      activeBtn.style.borderBottomColor = '#2563eb';
      activeBtn.style.color = '#2563eb';
    }

    const categoryColor = getColor(categoryData.subject, 0);
    const categoryBg = getSoftColor(categoryData.subject, 0);

    hideTreemapOriginal(panel);
    panel.querySelector('#treemap-replacement-view')?.remove();

    const page = document.createElement('div');
    page.id = 'treemap-replacement-view';
    page.className = 'space-y-5';
    page.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5">
        <div>
          <button id="btn-back-treemap" class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-gov-700 mb-3">
            <i class="ri-arrow-left-line"></i> 데이터 분포 트리맵
          </button>
          <h3 class="text-xl font-bold text-slate-900">${categoryData.subject} 데이터세트</h3>
          <p class="text-sm text-slate-500 mt-1">총 <strong class="text-gov-700">${categoryData.count}개</strong> 데이터세트를 확인할 수 있습니다.</p>
        </div>
        <span class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold" style="background:${categoryBg};color:${categoryColor};">
          <span class="w-2.5 h-2.5 rounded-full" style="background:${categoryColor};"></span>
          ${categoryData.subject}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" id="treemap-dataset-list">
        ${categoryData.items.map(ds => `
          <div class="dataset-card bg-white rounded-xl p-4 flex flex-col min-h-[190px] cursor-pointer hover:shadow-md transition-shadow" data-id="${ds.id}" style="border:1px solid ${categoryBg};border-top:3px solid ${categoryColor};">
            <div class="flex justify-between items-start gap-3 mb-3">
              <span class="px-2 py-1 text-[10px] font-bold rounded" style="background:${categoryBg};color:${categoryColor};">${categoryData.subject}</span>
              <span class="text-[11px] text-slate-400 font-mono">${ds.id}</span>
            </div>
            <h4 class="font-bold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug">${ds.name}</h4>
            <p class="text-xs text-slate-500 line-clamp-3 mb-4 flex-1">${ds.description}</p>
            <div class="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-slate-100">
              <span class="text-[11px] text-slate-500 truncate"><i class="ri-building-line"></i> ${ds.users?.[0] || '식품의약품안전처'}</span>
              <button type="button" class="btn-dataset-detail inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gov-600 text-white text-xs font-bold hover:bg-gov-700" data-id="${ds.id}">
                세부내용 <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    panel.appendChild(page);

    page.querySelector('#btn-back-treemap')?.addEventListener('click', () => {
      showTreemapOriginal(panel);
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    page.querySelectorAll('.dataset-card').forEach(card => {
      card.addEventListener('click', () => {
        const dsId = card.dataset.id;
        const dataset = categoryData.items.find(i => String(i.id) === String(dsId));
        if (dataset) showTreemapDatasetDetail(dataset, categoryData);
      });
    });

    page.querySelectorAll('.btn-dataset-detail').forEach(btn => {
      btn.addEventListener('click', event => {
        event.stopPropagation();
        const dsId = btn.dataset.id;
        const dataset = categoryData.items.find(i => String(i.id) === String(dsId));
        if (dataset) showTreemapDatasetDetail(dataset, categoryData);
      });
    });

    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  fetchDataAndRender();
}
