import {
  datasets,
  subjectFilters,
  processFilters,
  issueFilters,
  themeFilters,
  subjectColorMap
} from '../datasetData.js';

export function renderDatasetExplorer(container, onSelectDataset) {
  let search = "";
  let subject = "all";
  let process = "all";
  let issue = "all";
  let theme = "all";

  const render = () => {
    const filtered = datasets.filter((ds) => {
      const matchesSearch =
        search === "" ||
        ds.name.includes(search) ||
        ds.description.includes(search) ||
        ds.includedData.some((d) => d.includes(search));

      const matchesSubject = subject === "all" || ds.subject === subject;
      const matchesProcess = process === "all" || ds.process === process;
      const matchesIssue = issue === "all" || ds.issue === issue;
      const matchesTheme = theme === "all" || ds.theme === theme;

      return matchesSearch && matchesSubject && matchesProcess && matchesIssue && matchesTheme;
    });

    const makeOptions = (filters, current) => filters.map(f =>
      `<option value="${f.value}" ${current === f.value ? 'selected' : ''}>${f.label}</option>`
    ).join('');

    container.innerHTML = `
      <section style="padding:40px 0; background:#f8f9fb;">
        <div style="max-width:1220px; margin:0 auto; padding:0 20px;">

          <!-- 섹션 헤더 (식품안전나라 스타일) -->
          <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:16px; border-bottom:2px solid #0168c1;">
            <div>
              <h2 style="font-size:22px; font-weight:700; color:#1a1a2e; margin:0 0 4px 0; font-family:'Nanum Square',sans-serif;">
                <span style="color:#0168c1;">■</span> 데이터 세트
              </h2>
              <p style="font-size:13px; color:#666; margin:0;">주제별·업무별·이슈별 다차원 필터로 원하는 데이터를 탐색하세요.</p>
            </div>
            <span style="font-size:13px; color:#555;">
              검색결과 <strong style="color:#0168c1; font-size:16px;">${filtered.length}</strong>건 / 전체 ${datasets.length}건
            </span>
          </div>

          <!-- 필터 영역 (식품안전나라 search-form 스타일) -->
          <div style="background:#fff; border:1px solid #dde1e7; border-radius:6px; padding:20px 24px; margin-bottom:24px;">
            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
              <!-- 검색어 -->
              <div style="flex:1; min-width:220px; position:relative;">
                <input type="text" id="ds-search-input" value="${search}"
                  placeholder="데이터 세트명 검색"
                  style="width:100%; height:40px; padding:0 40px 0 14px; border:1px solid #cdd1d8; border-radius:4px; font-size:14px; box-sizing:border-box; outline:none;"
                  onfocus="this.style.borderColor='#0168c1'" onblur="this.style.borderColor='#cdd1d8'">
                <i class="ri-search-line" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#999; font-size:16px;"></i>
              </div>
              <!-- 주제별 -->
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:13px; color:#555; white-space:nowrap; font-weight:600;">주제별</label>
                <select id="ds-subject-sel" style="height:40px; padding:0 10px; border:1px solid #cdd1d8; border-radius:4px; font-size:13px; min-width:120px;">
                  ${makeOptions(subjectFilters, subject)}
                </select>
              </div>
              <!-- 업무별 -->
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:13px; color:#555; white-space:nowrap; font-weight:600;">업무별</label>
                <select id="ds-process-sel" style="height:40px; padding:0 10px; border:1px solid #cdd1d8; border-radius:4px; font-size:13px; min-width:120px;">
                  ${makeOptions(processFilters, process)}
                </select>
              </div>
              <!-- 이슈별 -->
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:13px; color:#555; white-space:nowrap; font-weight:600;">이슈별</label>
                <select id="ds-issue-sel" style="height:40px; padding:0 10px; border:1px solid #cdd1d8; border-radius:4px; font-size:13px; min-width:120px;">
                  ${makeOptions(issueFilters, issue)}
                </select>
              </div>
              <!-- 테마별 -->
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:13px; color:#555; white-space:nowrap; font-weight:600;">테마별</label>
                <select id="ds-theme-sel" style="height:40px; padding:0 10px; border:1px solid #cdd1d8; border-radius:4px; font-size:13px; min-width:120px;">
                  ${makeOptions(themeFilters, theme)}
                </select>
              </div>
              <!-- 초기화 버튼 -->
              <button id="ds-reset-btn"
                style="height:40px; padding:0 18px; background:#68727f; color:#fff; border:none; border-radius:4px; font-size:13px; cursor:pointer; white-space:nowrap;">
                초기화
              </button>
            </div>
          </div>

          <!-- 데이터 세트 카드 목록 -->
          ${filtered.length === 0 ? `
            <div style="text-align:center; padding:60px 0; background:#fff; border:1px solid #dde1e7; border-radius:6px;">
              <i class="ri-search-line" style="font-size:40px; color:#bbb;"></i>
              <p style="margin-top:12px; color:#888; font-size:14px;">조건에 맞는 데이터 세트가 없습니다.</p>
              <button id="ds-no-result-reset"
                style="margin-top:12px; padding:8px 20px; background:#0168c1; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:13px;">
                필터 초기화
              </button>
            </div>
          ` : `
            <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:16px;">
              ${filtered.map(ds => `
                <div data-id="${ds.id}" class="ds-card"
                  style="background:#fff; border:1px solid #dde1e7; border-radius:6px; overflow:hidden; cursor:pointer; transition:box-shadow .2s, border-color .2s;"
                  onmouseover="this.style.boxShadow='0 4px 16px rgba(1,104,193,0.12)'; this.style.borderColor='#0168c1';"
                  onmouseout="this.style.boxShadow='none'; this.style.borderColor='#dde1e7';">
                  <!-- 카드 헤더 바 -->
                  <div style="height:4px; background:#0168c1;"></div>
                  <div style="padding:16px 18px;">
                    <!-- 태그 -->
                    <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px;">
                      <span style="padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; background:#e8f1fb; color:#0168c1; border:1px solid #c2d8f5;">
                        ${ds.subject}
                      </span>
                      <span style="padding:3px 10px; border-radius:20px; font-size:11px; background:#f3f4f6; color:#555; border:1px solid #e2e4e8;">
                        ${ds.process}
                      </span>
                      ${ds.issue !== '해당없음' ? `
                        <span style="padding:3px 10px; border-radius:20px; font-size:11px; background:#fff3f3; color:#d44; border:1px solid #f5c5c5;">
                          ${ds.issue}
                        </span>
                      ` : ''}
                      <span style="padding:3px 10px; border-radius:20px; font-size:11px; background:#f3f4f6; color:#555; border:1px solid #e2e4e8;">
                        데이터 ${ds.dataCount}개
                      </span>
                    </div>
                    <!-- 제목 -->
                    <h3 style="font-size:15px; font-weight:700; color:#1a1a2e; margin:0 0 6px 0; line-height:1.4;">
                      ${ds.name}
                    </h3>
                    <!-- 설명 -->
                    <p style="font-size:12px; color:#777; line-height:1.6; margin:0 0 12px 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                      ${ds.description}
                    </p>
                    <!-- 추천 테마 -->
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:12px;">
                      <span style="font-size:11px; color:#999;">추천 테마:</span>
                      <span style="padding:2px 8px; border-radius:3px; background:#eef5ff; color:#0168c1; font-size:11px; font-weight:600; border:1px solid #c2d8f5;">
                        ${ds.theme}
                      </span>
                    </div>
                    <!-- 구분선 + 주요 컬럼 -->
                    <div style="border-top:1px solid #f0f0f0; padding-top:10px;">
                      <p style="font-size:11px; color:#aaa; font-weight:600; text-transform:uppercase; letter-spacing:.05em; margin:0 0 6px 0;">주요 컬럼 구성</p>
                      <ul style="margin:0; padding:0; list-style:none;">
                        ${ds.includedData.slice(0, 3).map(item => `
                          <li style="font-size:12px; color:#555; padding:2px 0; display:flex; align-items:flex-start; gap:6px;">
                            <i class="ri-checkbox-circle-line" style="color:#0168c1; font-size:12px; margin-top:2px; flex-shrink:0;"></i>${item}
                          </li>
                        `).join('')}
                        ${ds.includedData.length > 3 ? `
                          <li style="font-size:11px; color:#aaa; padding:2px 0 0 18px;">외 ${ds.includedData.length - 3}개 데이터</li>
                        ` : ''}
                      </ul>
                    </div>
                  </div>
                  <!-- 카드 하단 버튼 -->
                  <div style="padding:10px 18px 14px; display:flex; gap:8px; border-top:1px solid #f0f0f0;">
                    <button class="ds-analyze-btn"
                      style="flex:1; padding:8px 0; background:#0168c1; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:600; cursor:pointer;">
                      데이터 세트 분석하기
                    </button>
                    <button class="ds-schema-btn"
                      style="padding:8px 14px; background:#fff; color:#555; border:1px solid #cdd1d8; border-radius:4px; font-size:12px; font-weight:600; cursor:pointer;">
                      스키마 보기
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    const searchInput = container.querySelector('#ds-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        search = e.target.value;
        render();
        const el = container.querySelector('#ds-search-input');
        if (el) { el.focus(); const v = el.value; el.value = ''; el.value = v; }
      });
    }

    const bind = (id, setter) => {
      const el = container.querySelector(id);
      if (el) el.addEventListener('change', (e) => { setter(e.target.value); render(); });
    };
    bind('#ds-subject-sel', v => subject = v);
    bind('#ds-process-sel', v => process = v);
    bind('#ds-issue-sel',   v => issue = v);
    bind('#ds-theme-sel',   v => theme = v);

    const resetAll = () => { search = ""; subject = "all"; process = "all"; issue = "all"; theme = "all"; render(); };
    const resetBtn = container.querySelector('#ds-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetAll);
    const noResultReset = container.querySelector('#ds-no-result-reset');
    if (noResultReset) noResultReset.addEventListener('click', resetAll);

    container.querySelectorAll('.ds-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.ds-analyze-btn') || e.target.closest('.ds-schema-btn')) return;
        const ds = datasets.find(d => d.id === card.dataset.id);
        if (ds && onSelectDataset) onSelectDataset(ds);
      });
      card.querySelector('.ds-analyze-btn')?.addEventListener('click', () => {
        const ds = datasets.find(d => d.id === card.dataset.id);
        if (ds && onSelectDataset) onSelectDataset(ds);
      });
    });
  };

  render();
}
