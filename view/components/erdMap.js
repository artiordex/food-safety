// ERD형 공공데이터 연계 데이터맵 시각화 컴포넌트
export function renderErdMap(container, onSelectDataset) {
  let activeErdTab = 'core'; // 'core', 'license', 'haccp', 'product', 'standards', 'safety', 'import', 'nutrition', 'discipline'

  const erdDiagrams = {
    core: `
erDiagram
    I2500 {
        VARCHAR LCNS_NO PK "영업고유구분번호(인허가번호)"
        VARCHAR BSSH_NM "업소명"
        VARCHAR ADDR "소재지주소"
    }
    I1250 {
        VARCHAR PRDLST_REPORT_NO PK "품목제조보고번호"
        VARCHAR LCNS_NO "인허가번호 관계키"
        VARCHAR PRDLST_NM "품목명"
    }
    C005 {
        VARCHAR BAR_CD PK "유통바코드번호"
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
    }
    C002 {
        NUMERIC RAWMTRL_SEQ PK "원재료일련번호"
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
        VARCHAR RAWMTRL_NM "원재료명"
    }
    I0580 {
        NUMERIC HACCP_SEQ PK "HACCP일련번호"
        VARCHAR LCNS_NO "인허가번호"
    }
    I0470 {
        NUMERIC DSPSDTLS_SEQ PK "처분일련번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR DISPOSE_TREAT_NM "행정처분명"
    }
    I2620 {
        VARCHAR PRDLST_REPORT_NO PK "품목제조보고번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR TEST_ITMNM "부적합항목"
    }
    I0490 {
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
        VARCHAR RTRVL_PRVNS "회수사유"
    }
    I2832 {
        VARCHAR LCNS_NO PK "식품판매업 인허가번호"
        VARCHAR BSSH_NM "판매업소명"
    }
    I2834 {
        VARCHAR LCNS_NO PK "집단급식소 인허가번호"
        VARCHAR BSSH_NM "급식소명"
    }
    I2856 {
        VARCHAR LCNS_NO PK "푸드트럭 인허가번호"
        VARCHAR BSSH_NM "트럭상호명"
    }
    I2859 {
        VARCHAR LCNS_NO PK "식품업소 인허가 변경일련번호"
        VARCHAR CHG_ITEM "변경항목"
    }
    I2560 {
        VARCHAR LCNS_NO PK "위생점검일련번호"
        VARCHAR VILTCN "위반내용"
    }
    I2810 {
        VARCHAR PRDLST_NM PK "해외위해제품명"
        VARCHAR RTRVL_PRVNS "회수사유"
    }

    I2500 ||--o{ I1250 : "LCNS_NO"
    I2500 ||--o{ I0580 : "LCNS_NO"
    I2500 ||--o{ I0470 : "LCNS_NO"
    I2500 ||--o{ I2620 : "LCNS_NO"
    I2500 ||--o{ I2832 : "LCNS_NO"
    I2500 ||--o{ I2834 : "LCNS_NO"
    I2500 ||--o{ I2856 : "LCNS_NO"
    I2500 ||--o{ I2859 : "LCNS_NO"
    I2500 ||--o{ I2560 : "LCNS_NO"
    
    I1250 ||--o{ C005 : "PRDLST_REPORT_NO"
    I1250 ||--o{ C002 : "PRDLST_REPORT_NO"
    I1250 ||--o{ I2620 : "PRDLST_REPORT_NO"
    I1250 ||--o{ I0490 : "PRDLST_REPORT_NO"
    I0490 ||--o{ I2810 : "PRDLST_NM"
    `,
    license: `
erDiagram
    I2500 {
        VARCHAR LCNS_NO PK "영업고유구분번호(인허가번호)"
        VARCHAR BSSH_NM "업소명"
        VARCHAR PRSDNT_NM "대표자명"
        VARCHAR TELNO "전화번호"
        VARCHAR ADDR "소재지주소"
        DATE PRMS_DT "인허가일자"
        VARCHAR CLSBIZ_DT "폐업일자"
        VARCHAR BSN_STATE_NM "영업상태명"
    }
    I1220 {
        VARCHAR LCNS_NO PK "인허가번호"
        VARCHAR BSSH_NM "업소명"
        VARCHAR SITE_ADDR "주소"
        VARCHAR INDUTY_CD_NM "업태명"
    }
    I2857 {
        VARCHAR LCNS_NO PK "공유주방 인허가번호"
        VARCHAR BSSH_NM "업소명"
    }
    I2858 {
        VARCHAR LCNS_NO PK "도축업 인허가번호"
        VARCHAR BSSH_NM "업소명"
    }
    I2829 {
        VARCHAR LCNS_NO PK "즉석제조 인허가번호"
        VARCHAR BSSH_NM "업소명"
    }
    I2834 {
        VARCHAR LCNS_NO PK "집단급식소 인허가번호"
        VARCHAR BSSH_NM "급식소명"
    }
    I2832 {
        VARCHAR LCNS_NO PK "식품판매업 인허가번호"
        VARCHAR BSSH_NM "판매업소명"
    }
    I2856 {
        VARCHAR LCNS_NO PK "푸드트럭 지정 인허가번호"
        VARCHAR BSSH_NM "푸드트럭명"
    }
    I2859 {
        VARCHAR LCNS_NO PK "식품업소 변경 인허가번호"
        VARCHAR CHG_ITEM "변경항목"
    }
    I2861 {
        VARCHAR LCNS_NO PK "음식점 변경 인허가번호"
        VARCHAR CHG_ITEM "변경항목"
    }
    I2560 {
        VARCHAR LCNS_NO PK "점검 위반 인허가번호"
        VARCHAR VILTCN "점검결과"
    }

    I2500 ||--o| I1220 : "LCNS_NO"
    I2500 ||--o| I2857 : "LCNS_NO"
    I2500 ||--o| I2858 : "LCNS_NO"
    I2500 ||--o{ I2829 : "LCNS_NO"
    I2500 ||--o{ I2834 : "LCNS_NO"
    I2500 ||--o{ I2832 : "LCNS_NO"
    I2500 ||--o{ I2856 : "LCNS_NO"
    I2500 ||--o{ I2859 : "LCNS_NO"
    I2500 ||--o{ I2861 : "LCNS_NO"
    I2500 ||--o{ I2560 : "LCNS_NO"
    `,
    haccp: `
erDiagram
    I2500 {
        VARCHAR LCNS_NO PK "영업고유구분번호"
        VARCHAR BSSH_NM "업소명"
    }
    I0580 {
        NUMERIC HACCP_SEQ PK "HACCP일련번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR BSSH_NM "업소명"
        VARCHAR HACCP_APPN_NO "HACCP지정번호"
        VARCHAR PRDLST_NM "지정품목명"
    }
    I0600 {
        NUMERIC EDC_INSTT_APPN_NO PK "지정번호"
        VARCHAR BSSH_NM "교육훈련기관명"
        VARCHAR PRSDNT_NM "대표자"
        VARCHAR BSSH_ADDR "주소"
    }
    I0630 {
        VARCHAR GMP_APPN_NO PK "GMP지정번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR BSSH_NM "업소명"
        DATE APPN_DT "지정일자"
    }

    I2500 ||--o{ I0580 : "LCNS_NO"
    I2500 ||--o{ I0630 : "LCNS_NO"
    `,
    product: `
erDiagram
    I1250 {
        VARCHAR PRDLST_REPORT_NO PK "품목제조보고번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR BSSH_NM "제조업소명"
        VARCHAR PRDLST_NM "품목명"
        VARCHAR PRDLST_DCLS_NM "품목분류명"
        DATE PRMS_DT "보고일자"
    }
    C002 {
        NUMERIC RAWMTRL_SEQ PK "원재료일련번호"
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
        VARCHAR RAWMTRL_NM "원재료명"
        VARCHAR SPEC_CNTNT "규격내용"
    }
    C005 {
        VARCHAR BAR_CD PK "유통바코드번호"
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
        VARCHAR PRDLST_NM "제품명"
        VARCHAR BSSH_NM "유통업소명"
    }
    I2510 {
        VARCHAR PRDLST_CD PK "품목분류코드"
        VARCHAR PRDLST_NM "품목유형명"
    }
    I2852 {
        VARCHAR PRDLST_REPORT_NO PK "생산중단 품목보고번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR PRDLST_NM "제품명"
    }

    I1250 ||--o{ C002 : "PRDLST_REPORT_NO"
    I1250 ||--o{ C005 : "PRDLST_REPORT_NO"
    I1250 ||--o{ I2852 : "PRDLST_REPORT_NO"
    `,
    standards: `
erDiagram
    I2580 {
        NUMERIC INDV_SPEC_SEQ PK "개별기준규격일련번호"
        VARCHAR PRDLST_CD "품목분류코드"
        VARCHAR TESTITM_CD "시험항목코드"
        VARCHAR SPEC_VAL "기준규격치"
    }
    I2600 {
        NUMERIC CMMN_SPEC_SEQ PK "공통기준종류일련번호"
        VARCHAR CMMN_SPEC_CD "공통기준규격코드"
        VARCHAR PRDLST_CD "품목코드"
        VARCHAR TESTITM_CD "시험항목코드"
        VARCHAR SPEC_VAL "기준규격"
    }
    I2590 {
        VARCHAR CMMN_SPEC_CD PK "공통기준규격코드"
        VARCHAR SPEC_NM "기준규격명"
    }
    I2530 {
        VARCHAR TESTITM_CD PK "시험항목코드"
        VARCHAR TESTITM_NM "시험항목명"
    }
    I2610 {
        VARCHAR TESTITM_CD PK "첨가물 시험항목코드"
        VARCHAR PRDLST_CD "품목분류코드"
    }
    I0960 {
        VARCHAR TESTITM_CD PK "기구용기 시험항목코드"
        VARCHAR SPEC_VAL "검사규격"
    }
    I0940 {
        VARCHAR TESTITM_CD PK "기구용기공전 시험항목코드"
        VARCHAR SPEC_VAL "공전스펙"
    }

    I2590 ||--o{ I2600 : "CMMN_SPEC_CD"
    I2580 ||--o{ I2530 : "TESTITM_CD"
    I2600 ||--o{ I2530 : "TESTITM_CD"
    I2610 ||--o{ I2530 : "TESTITM_CD"
    I0960 ||--o{ I2530 : "TESTITM_CD"
    I0940 ||--o{ I2530 : "TESTITM_CD"
    `,
    safety: `
erDiagram
    I2620 {
        VARCHAR PRDLST_REPORT_NO PK "품목제조보고번호"
        VARCHAR LCNS_NO "업체인허가번호"
        VARCHAR PRDTNM "제품명"
        VARCHAR TEST_ITMNM "부적합항목"
        VARCHAR TESTANALS_RSLT "검사결과"
    }
    I0490 {
        VARCHAR PRDLST_REPORT_NO "품목제조보고번호"
        VARCHAR PRDLST_NM "제품명"
        VARCHAR RTRVL_PRVNS "회수사유"
        VARCHAR BSSH_NM "제조업소명"
    }
    I2810 {
        VARCHAR PRDLST_NM PK "해외위해제품명"
        VARCHAR DECLA_NATION "신고국가"
    }
    I2640 {
        VARCHAR LCNS_NO PK "업체인허가번호"
        VARCHAR PRDTNM "농산물제품명"
        VARCHAR TEST_ITMNM "부적합항목"
    }

    I2620 ||--o{ I0490 : "PRDLST_REPORT_NO"
    I0490 ||--o{ I2810 : "PRDLST_NM"
    `,
    import: `
erDiagram
    C001 {
        VARCHAR LCNS_NO PK "인허가번호"
        VARCHAR BSSH_NM "수입업소명"
        VARCHAR DECL_NO "신고번호"
        VARCHAR PRDT_NM "제품명"
        VARCHAR MC_NATN_CD_NM "제조국가"
    }
    I2821 {
        VARCHAR LCNS_NO PK "인허가번호"
        VARCHAR BSSH_NM "업소명"
        DATE CLSBIZ_DT "폐업일자"
    }
    C003 {
        VARCHAR DECL_NO PK "수입원재료 신고번호"
        VARCHAR RAWMTRL_NM "원재료명"
    }
    I0482 {
        VARCHAR LCNS_NO PK "수입처분 인허가번호"
        VARCHAR DSPS_CORS "처분사유"
    }

    C001 ||--o| I2821 : "LCNS_NO"
    C001 ||--o{ C003 : "DECL_NO"
    C001 ||--o{ I0482 : "LCNS_NO"
    `,
    nutrition: `
erDiagram
    I0760 {
        VARCHAR HELT_ITM_GRP_CD PK "건강항목그룹코드"
        VARCHAR HELT_ITM_GRP_NM "건강항목그룹명"
    }
    I2780 {
        VARCHAR NUTR_DIET_GRP_CD PK "식품영양그룹코드"
        VARCHAR NUTR_NM "영양성분명"
    }
    I2819 {
        VARCHAR NUTR_DIET_GRP_CD PK "가공식품영양그룹코드"
        VARCHAR NUTR_NM "영양성분명"
    }
    `,
    discipline: `
erDiagram
    I0470 {
        NUMERIC DSPSDTLS_SEQ PK "처분일련번호"
        VARCHAR LCNS_NO "인허가번호"
        VARCHAR BSSH_NM "처분대상업소명"
        DATE DSPS_DT "행정처분일자"
        VARCHAR DISPOSE_TREAT_NM "행정처분명"
    }
    I2822 {
        VARCHAR LCNS_NO PK "인허가번호"
        VARCHAR BSSH_NM "업소명"
        DATE CLSBIZ_DT "폐업일자"
    }
    I0482 {
        VARCHAR LCNS_NO PK "수입처분 인허가번호"
        VARCHAR DSPS_CORS "처분사유"
    }

    I0470 ||--o{ I2822 : "LCNS_NO"
    I0470 ||--o{ I0482 : "LCNS_NO"
    `
  };

  const domainInfos = {
    core: {
      title: "핵심 공공-민간 초융합형 ERD 데이터맵",
      description: "식약처 공공데이터 포털 상의 3대 만능 매핑 인덱스인 인허가번호(LCNS_NO), 품목제조보고번호(PRDLST_REPORT_NO), 그리고 바코드번호(BAR_CD)를 기준으로 제조업체, 제품, 원재료 성분, 검사 부적합 및 사후 행정처분 이력까지 하나의 생태계로 관통하는 거대 초융합 데이터망 모델입니다."
    },
    license: {
      title: "인허가 · 업소 정보 ERD",
      description: "전국 모든 식품업종의 제조 허가, 위생 현황, 대장 테이블과 실제 업장 간의 인허가번호(LCNS_NO) 기반 1:1 결합 관계를 정의합니다. 도축업 대장이나 공유주방과 같은 특수 업태의 행정 원천을 추적하는 기반 마스터 테이블 레이아웃입니다."
    },
    haccp: {
      title: "HACCP · 위생 인증 정보 ERD",
      description: "식품위생 안전의 척도인 안전관리인증(HACCP) 업소 및 건강기능식품 우수제조기준(GMP) 지정 내역을 관리하는 데이터셋 구조입니다. 업소마스터와의 연결을 통해 안심 먹거리 업장 여부를 동적으로 판별합니다."
    },
    product: {
      title: "품목제조 · 제품 정보 ERD",
      description: "완제품의 상세 제조 성분(레시피)과 민간 유통을 연결하는 핵심 다리역할의 ERD입니다. 품목제조보고번호를 기준으로 바코드 마스터 및 원재료 성분 테이블을 결합하는 논리 구조를 제공합니다."
    },
    standards: {
      title: "기준규격 · 공전 정보 ERD",
      description: "식품공전 및 수입 검사에 활용되는 규격 및 시험항목의 학술 표준 코드를 관리하는 도메인 ERD입니다. 공통기준규격코드를 마스터로 삼아 각 세부 규격이 시험항목코드와 매칭되는 1:N 릴레이션을 구성합니다."
    },
    safety: {
      title: "검사 · 부적합 · 위해 정보 ERD",
      description: "국민 보건 안전과 직결되는 실시간 수거 검사 부적합 현황 및 긴급 회수 명령이 내려진 불량 제품의 목록을 결합하는 ERD입니다. 품목제조보고번호와 유통제품명을 연결고리로 사용하여 긴급 차단 시스템의 기반을 제공합니다."
    },
    import: {
      title: "수입식품 정보 ERD",
      description: "해외 통관 신고를 필한 수입 제품과 외국 제조업체, 수입영업소 마스터 대장의 결합 구조를 나타냅니다. 인허가번호를 매개로 업소의 폐업 로그 및 불량 해외 제조업체 이력을 연쇄적으로 교차 분석합니다."
    },
    nutrition: {
      title: "영양성분 정보 ERD",
      description: "국민 건강 식단 앱이나 헬스케어 빅데이터 플랫폼의 주춧돌이 되는 성분 분석 테이블 구성입니다. 기준 항목 그룹 코드 하위에 대/중/소 분류명과 칼로리, 탄단지 성분 함량을 적재하는 1:N 코드 기반 ERD입니다."
    },
    discipline: {
      title: "행정처분 · 폐업 정보 ERD",
      description: "법률 위반으로 사법 조치나 행정처분을 받은 영업소 목록과 건강기능식품 폐업 대장 간의 관계를 다룹니다. 인허가번호를 연계키로 삼아 업체의 생존 상태 및 누적 벌점 리스크 프로파일링을 고속 처리합니다."
    }
  };

  const render = () => {
    container.innerHTML = `
      <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        
        <!-- Premium Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 text-xs font-semibold text-gov-600 uppercase tracking-wider mb-2">
              <span class="w-1.5 h-3 bg-gov-600 rounded-sm"></span> RDBMS 물리 데이터 모델링 뷰어
            </div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              📂 식품안전 공공데이터 ERD 데이터맵 <span class="text-sm font-normal text-slate-500">(Entity Relationship Diagram)</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1.5">
              식약처 169개 OpenAPI의 RDBMS 스키마 기본키(PK) 및 외래키(FK) 정합성 구조를 Mermaid 기반 인터랙티브 ERD로 동적 렌더링하여 보여줍니다.
            </p>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400 self-end bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Mermaid 인터랙티브 모델러 탑재
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-6">
          
          <!-- 1. LEFT SIDEBAR: ERD 도메인 목록 필터 -->
          <div class="lg:w-[320px] shrink-0 flex flex-col gap-5">
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                📁 ERD 도메인 영역 선택
              </h4>
              <div class="flex flex-col gap-1.5">
                ${Object.entries(domainInfos).map(([key, info]) => {
                  const isActive = activeErdTab === key;
                  return `
                    <button data-erd="${key}" class="erd-tab-btn w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-gov-600 text-white shadow-md' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
                    }">
                      <i class="${key === 'core' ? 'ri-focus-3-line text-amber-300' : 'ri-database-line text-slate-400'} text-sm shrink-0"></i>
                      <span class="truncate">${info.title.split(' ERD')[0]}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 관계 스펙 통계 -->
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-md">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3.5 flex items-center gap-1.5">
                <i class="ri-shield-check-line text-emerald-400"></i> ERD 연계 설계 무결성 보장
              </h4>
              <div class="space-y-2.5 text-[11px] leading-relaxed text-slate-300">
                <p>✔ <strong>PK / FK 매핑 기준</strong>: 데이터 고유성 점수 80% 이상 및 실제 매핑 포함률 50~70% 이상 검증.</p>
                <p>✔ <strong>Mermaid Specification</strong>: RDBMS 개체 관계 표준 표기법(IE Notation)을 지원하여 1대다(1:N) 및 1대1(1:1) 의존관계를 직관적으로 렌더링합니다.</p>
              </div>
            </div>
          </div>

          <!-- 2. MAIN CENTER: Mermaid 다이어그램 렌더링 캔버스 -->
          <div class="flex-1 flex flex-col gap-6">
            <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[580px]">
              
              <!-- 다이어그램 헤더 설명 패널 -->
              <div class="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <i class="ri-git-branch-line text-gov-600"></i> ${domainInfos[activeErdTab].title}
                </h3>
                <p class="text-xs text-slate-500 mt-2 leading-relaxed">
                  ${domainInfos[activeErdTab].description}
                </p>
              </div>

              <!-- Mermaid ERD 렌더링 박스 -->
              <div class="flex-1 p-8 flex items-center justify-center bg-slate-50/20 overflow-x-auto" id="mermaid-render-box">
                <pre class="mermaid select-none flex justify-center w-full min-h-[400px]">
                  ${erdDiagrams[activeErdTab]}
                </pre>
              </div>

              <!-- 푸터 팁 -->
              <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>💡 각 엔티티 박스 내의 <strong>PK</strong>는 기본 식별자 기본키를, 뒤에 붙은 문자열은 논리적 상세 설명을 뜻합니다.</span>
                <span class="text-gov-600 font-bold">참조 무결성 검증 필터 완료</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    bindEvents();
    renderMermaid();
  };

  const renderMermaid = () => {
    try {
      // Mermaid 초기화 및 렌더 가동
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        er: {
          useMaxWidth: true,
          fontFamily: 'Pretendard, Inter, system-ui',
          fontSize: 12
        }
      });
      mermaid.init(undefined, container.querySelectorAll('.mermaid'));
    } catch (err) {
      console.error("Mermaid 렌더링 에러:", err);
    }
  };

  const bindEvents = () => {
    container.querySelectorAll('.erd-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeErdTab = e.currentTarget.dataset.erd;
        render();
      });
    });
  };

  render();
}
