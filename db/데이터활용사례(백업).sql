-- ============================================================
-- 식품안전나라 데이터 활용사례 - 데이터셋 연결 시나리오
-- 출처: 식품안전나라_데이터_활용사례.xlsx  /  생성일: 2026-06-15
-- ============================================================
-- 테이블 번호 범례
--   I0030      건강기능식품 품목제조 신고사항 현황
--   C003       건강기능식품 품목제조신고(원재료)
--   I-0040     건강기능식품 기능성 원료인정현황
--   I-0050     건강기능식품 개별인정형 정보
--   I0630      건강기능식품GMP 지정 현황
--   I0760      건강기능식품 영양DB
--   I1290      건강기능식품판매업
--   I2710      건강기능식품 품목분류정보
--   I2500      인허가 업소 정보
--   I0470      행정처분결과
--   I0490      회수.판매중지 정보 (= "회수판매 중지 정보" — 워치독 표기)
--   I2620      검사부적합(국내)
--   I2630      행정처분결과(식품접객업) (= "행정처분 의뢰 및 결과 현황(식품접객업)" — 네이버 플레이스 표기)
--   C004       식품접객업소 위생등급 지정현황
--   I1200      식품접객업정보
--   I1220      식품제조가공업정보
--   I1250      식품(첨가물)품목제조보고
--   I1310      축산물 품목제조정보
--   1471000    식품영양성분 DB정보
--   COOKRCP01  조리식품의 레시피 DB
--   I2580      개별기준규격
--   I2600      공통기준규격
--   I2590      공통기준종류
--   I2610      공통기준제외
--   I2510      품목유형코드 (= "품목분류코드" — LIMS·식품LIMS 표기)
--   I2530      시험항목코드
--   I2520      식품원재료코드
--   I0320      식품이력추적관리 등록 현황
--   C005       바코드연계제품정보
--   I2570      유통바코드
--   I0580      HACCP 적용업소 지정 현황
--   I0600      HACCP 교육훈련기관 지정 현황
--   C001       수입식품등영업신고대장
--   I2811      식품제조가공업 폐업정보
--   I2815      식품소분업 폐업정보
--   I2821      수입식품업 폐업정보
--   I2822      건강기능식품 폐업정보
--   I2827      식육즉석판매가공업 폐업정보
--   I2831      식품소분업 인허가 대장
--   I2835      식육즉석판매가공업 인허가 대장
--   I1260      식품등수입판매업정보
--   I1560      식품위생교육내역
--   I1240      기구.용기포장제조업
--   I1230      식품첨가물제조업
--   I1300      축산물 가공업허가정보
--   I0610      축산물HACCP 지정정보
--   I2819      식품접객업 폐업정보
--   I1040      농약잔류허용기준
--   I1050      식품별 농약잔류허용기준
--   I1080      동물의약품별 잔류허용 기준
--   I0480      행정처분결과(식품제조가공업)
--   I0481      행정처분결과(식품판매업)
--   I0482      행정처분결과(식품접객업)
--   I0930      기준규격(일반)
--   I0940      기준규격(개별)
--   I0960      건강기능식품공전
--   I0460      검사부적합(수입)
--   I2640      검사부적합 현황(농산물)
--   I2711      위생용품품목제조보고
--   I2712      위생용품 제조·수입업체
--   I2713      위생용품영업정보
--   I1920      이력추적등록(농산물)
--   I1930      이력추적관리업무이력(농산물)
--   I1940      이력추적관리단계이력(농산물)
--   I1660      과태료부과내역
--   I1670      과태료부과기준
--   I2550      처분기준코드
--   I2852      공유주방 운영업정보
--   C006       축산물 검사기관정보
--   I1320      위생용품 제조·수입업정보
-- ============================================================


-- ============================================================
-- [사례 1] 건전지 / 건강비밀(Vi-meal) / 어떠케어 / 위드페어
--   건강기능식품 정보 앱 — 품목·원료·기능성·GMP 통합 검색
-- ============================================================

-- 1-1. 건기식 품목 + 원재료  [연결키: PRDLST_REPORT_NO] O
--      어떤 제품에 어떤 제형·원재료가 들어가는지 확인
--      ※ I0030.PRDLST_CDNM 컬럼은 미적재 — PRIMARY_FNCLTY 로 필터링
SELECT DISTINCT
    a.LCNS_NO,
    a.BSSH_NM              AS 업소명,
    a.PRDLST_REPORT_NO     AS 품목보고번호,
    a.PRDLST_NM            AS 품목명,
    a.PRIMARY_FNCLTY       AS 주요기능성,
    a.PRDLST_CDNM          AS 품목분류,
    b.SHAP                 AS 제형
FROM "I0030" a
LEFT JOIN "C003" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
WHERE a.PRIMARY_FNCLTY LIKE '%비타민%'
LIMIT 30;

-- 1-2. 건기식 품목분류 + 기능성 원료인정현황  [연결키: 원료명 텍스트 매칭] O
--      건강비밀·어떠케어: 원료별 기능성 인정 내용 제공
SELECT DISTINCT
    a.PRDCT_NM                 AS 품목명,
    a.PRIMARY_FNCLTY           AS 기능성,
    a.DAY_INTK_LOWLIMIT        AS 일최소섭취,
    a.DAY_INTK_HIGHLIMIT       AS 일최대섭취,
    a.INTK_UNIT                AS 단위,
    b.FNCLTY_CN                AS 기능성원료인정내용,
    b.BSSH_NM                  AS 인정업소
FROM "I2710" a
LEFT JOIN "I-0040" b ON TRIM(a.PRDCT_NM) = TRIM(b.APLC_RAWMTRL_NM)
WHERE a.PRIMARY_FNCLTY IS NOT NULL
LIMIT 30;


-- 1-3. GMP 지정업소 + 품목 신고사항  [연결키: LCNS_NO] O
--      건전지: GMP 인증 업소 제품만 필터링해 신뢰도 높은 정보 제공
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.GMP_APPN_NO          AS GMP지정번호,
    a.APPN_DT              AS GMP지정일,
    b.PRDLST_NM            AS 제품명,
    b.PRDLST_CDNM          AS 품목분류,
    b.PRIMARY_FNCLTY       AS 기능성
FROM "I0630" a
JOIN "I0030" b ON a.LCNS_NO = b.LCNS_NO
WHERE a.APPN_CANCL_DT IS NULL OR a.APPN_CANCL_DT = ''
LIMIT 30;


-- ============================================================
-- [사례 2] 먹깨비 / 한눈에 강동 / REDTABLE / 대구광역시 / 요기요 / 네이버 플레이스
--   식품접객업소 위생·인허가 정보 서비스 (값조회x)
-- ============================================================

-- 2. 식품접객업 인허가 + 위생등급  [연결키: LCNS_NO] O
--      먹깨비·REDTABLE: 배달·관광 플랫폼에 위생등급 표시
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.LCNS_NO              AS 허가번호,
    a.INDUTY_NM            AS 업종,
    a.LOCP_ADDR            AS 주소,
    a.TELNO                AS 전화번호,
    b.HG_ASGN_LV           AS 위생등급,
    b.HG_ASGN_NO           AS 등급지정번호,
    b.HG_ASGN_YMD          AS 지정일
FROM "I1200" a
LEFT JOIN "C004" b ON a.LCNS_NO = b.LCNS_NO
WHERE b.HG_ASGN_LV IS NOT NULL
LIMIT 30;


-- ============================================================
-- [사례 4] 듀얼케어 / 하루다이어트 / 메이킷 / 쉐어홈트 / NUGU(SKT)
--   영양성분·식단관리·레시피 앱
-- ============================================================

-- 4. 식품영양성분DB + 레시피DB  [연결키: 음식명 텍스트 매칭] O
--      NUGU(SKT)·어떠케어: 레시피 음식의 영양 성분 자동 계산
SELECT DISTINCT
    a.RCP_NM               AS 레시피명,
    a.RCP_WAY2             AS 조리방법,
    a.RCP_PAT2             AS 요리분류,
    a.INFO_ENG             AS 레시피열량_kcal,
    b.FOOD_NM_KR           AS 매칭식품명,
    b.DB_CLASS_NM          AS 식품분류
FROM "COOKRCP01" a
LEFT JOIN "1471000" b ON TRIM(a.RCP_NM) = TRIM(b.FOOD_NM_KR)
LIMIT 30;


-- ============================================================
-- [사례 5] 제품 유형·공통기준규격 연계
--   식품제조·기준규격 정보 시스템
-- ============================================================

-- 5-1. 품목유형코드 + 공통기준규격  [연결키: PRDLST_CD → I2600] O
--      제품 유형에 따른 공통기준규격 자동 매핑
--      ※ I2510(A-prefix)↔I2580(D-prefix) 코드체계 불일치 → I2600(공통기준규격) 으로 대체
SELECT DISTINCT
    a.KOR_NM               AS 품목유형명,
    a.PRDLST_CD            AS 품목유형코드,
    b.TESTITM_NM           AS 시험항목,
    b.SPEC_VAL             AS 기준값,
    b.PIAM_KOR_NM          AS 단위,
    b.VALD_BEGN_DT         AS 기준적용시작일
FROM "I2510" a
JOIN "I2600" b ON a.PRDLST_CD = b.PRDLST_CD
WHERE a.LV = 3
LIMIT 30;

-- 5-2. 시험항목코드 + 공통기준규격  [연결키: TESTITM_CD] O
--      LIMS: 시험 완료 후 기준 적합 여부 자동 판정
SELECT DISTINCT
    a.KOR_NM               AS 시험항목명,
    a.ENG_NM               AS 영문명,
    b.PRDLST_CD_NM         AS 적용품목유형,
    b.SPEC_NM              AS 규격구분,
    b.SPEC_VAL             AS 기준값,
    b.PIAM_KOR_NM          AS 단위
FROM "I2530" a
JOIN "I2600" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;

-- 5-3. 식품 품목제조보고 + 축산물 품목제조정보 통합  [UNION ALL]
--      경쟁사 신제품 출시 현황 모니터링 (식품 + 축산물)
SELECT DISTINCT
    '식품' AS 구분,
    a.LCNS_NO, a.BSSH_NM AS 업소명, a.PRDLST_NM          AS 제품명,
    a.PRDLST_DCNM AS 품목유형, CAST(a.PRMS_DT AS TEXT)    AS 신고일
FROM "I1250" a
UNION ALL
SELECT
    '축산물',
    b.LCNS_NO, b.BSSH_NM, b.PRDLST_NM,
    b.PRDLST_DCNM, CAST(b.PRMS_DT AS TEXT)
FROM "I1310" b
ORDER BY 신고일 DESC
LIMIT 30;


-- ============================================================
-- [사례 6] 토스(Toss) / 푸드비투비(FoodB2B)
--   식품 판매자 인허가 사전 검수 및 B2B 거래처 검증
-- ============================================================

-- 6-1. 건기식판매업 + 인허가 업소 + HACCP 지정 통합  [연결키: LCNS_NO] O
--      토스: 식품 판매자의 인허가·HACCP 인증 상태 한번에 확인
--      ※ I2500.INDUTY_CD_NM 에 '건강기능식품' 값 없음 → I1290(건기식판매업) 을 드라이빙 테이블로 변경
SELECT DISTINCT
    f.BSSH_NM               AS 업소명,
    f.LCNS_NO               AS 허가번호,
    f.INDUTY_NM             AS 건기식판매업종,
    f.PRMS_DT               AS 건기식신고일,
    b.ADDR                  AS 주소,
    b.INDUTY_CD_NM          AS 업종,
    c.HACCP_APPN_NO         AS HACCP지정번호,
    c.HACCP_APPN_DT         AS HACCP지정일
FROM "I1290" a
LEFT JOIN "I2500" b  ON a.LCNS_NO = b.LCNS_NO
LEFT JOIN "I0580" c  ON a.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 6-2. 수입식품영업신고 + 수입식품업 폐업정보  [연결키: LCNS_NO] O
--      토스: 수입식품 판매자의 현재 영업 상태 검증
SELECT DISTINCT
    a.LCNS_NO                                         AS 허가번호,
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_NM                                       AS 업종,
    a.PRMS_DT                                         AS 신고일,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태,
    b.CLSBIZ_DT                                       AS 폐업일
FROM "C001" a
LEFT JOIN "I2821" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 6-3. 여러 업종 폐업·인허가 통합 현황  [UNION ALL] O
--      토스: 식품소분업·건기식·식육즉석판매업·수입식품 일괄 검수
SELECT DISTINCT
    '식품소분업' AS 업종구분, LCNS_NO, BSSH_NM, INDUTY_NM,
    CAST(PRMS_DT AS TEXT) AS 허가일, NULL AS 폐업일
FROM "I2831"
UNION ALL
SELECT '식품소분업(폐업)', LCNS_NO, BSSH_NM, INDUTY_NM,
       NULL, CAST(CLSBIZ_DT AS TEXT)
FROM "I2815"
UNION ALL
SELECT '건강기능식품(폐업)', LCNS_NO, BSSH_NM, INDUTY_NM,
       NULL, CAST(CLSBIZ_DT AS TEXT)
FROM "I2822"
UNION ALL
SELECT '식육즉석판매가공업(폐업)', LCNS_NO, BSSH_NM, INDUTY_NM,
       NULL, CAST(CLSBIZ_DT AS TEXT)
FROM "I2827"
UNION ALL
SELECT '수입식품업(폐업)', LCNS_NO, BSSH_NM, INDUTY_NM,
       NULL, CAST(CLSBIZ_DT AS TEXT)
FROM "I2821"
LIMIT 30;

-- 6-4. 푸드비투비: HACCP + 건기식판매업 + 수입식품영업 + 식품제조가공업 통합  [UNION ALL] O
SELECT DISTINCT
    '건기식판매업' AS 업종구분, LCNS_NO, BSSH_NM AS 업소명, INDUTY_NM AS 업종세목,
    CAST(PRMS_DT AS TEXT) AS 허가일
FROM "I1290"
UNION ALL
SELECT '수입식품영업', LCNS_NO, BSSH_NM, INDUTY_NM,
       CAST(PRMS_DT AS TEXT)
FROM "C001"
UNION ALL
SELECT 'HACCP업소', LCNS_NO, BSSH_NM, INDUTY_CD_NM,
       CAST(HACCP_APPN_DT AS TEXT)
FROM "I0580"
UNION ALL
SELECT '식품제조가공업', LCNS_NO, BSSH_NM, INDUTY_NM,
       CAST(PRMS_DT AS TEXT)
FROM "I1220"
LIMIT 30;


-- ============================================================
-- [사례 7] 큐마켓 / SK스토아 / BGF리테일
--   바코드 기반 제품 정보·이력추적 서비스
-- ============================================================

-- 7-1. 유통바코드 + 바코드연계제품정보  [연결키: BRCD_NO = BAR_CD] O
--      큐마켓: 바코드 스캔으로 제품 유형·유통기한·제조사 즉시 확인
--      ※ I2570(964건)·C005(949건) 적재됨. BRCD_NO↔BAR_CD 크로스키 JOIN 14건 매칭
SELECT DISTINCT
    a.BRCD_NO              AS 바코드,
    a.PRDT_NM              AS 제품명,
    a.CMPNY_NM             AS 제조사,
    a.PRDLST_NM            AS 품목유형,
    b.PRDLST_REPORT_NO     AS 품목보고번호,
    b.POG_DAYCNT           AS 유통기한,
    b.END_DT               AS 보고종료일
FROM "I2570" a
LEFT JOIN "C005" b ON a.BRCD_NO = b.BAR_CD
LIMIT 30;

-- 7-2. 이력추적관리 + 유통바코드  [연결키: PDT_BARCD = BRCD_NO] O
--      BGF리테일: 이력추적 제품의 바코드로 제조~유통 전 단계 추적
--      ※ I0320(534건)·I2570(964건) 적재됨. 단 PDT_BARCD↔BRCD_NO 현재 매칭값 없음 (JOIN 0건)
SELECT DISTINCT
    a.PDT_NM               AS 제품명,
    a.PDT_BARCD            AS 제품바코드,
    a.PRDLST_REPORT_NO     AS 품목보고번호,
    a.FOOD_HISTRACE_NUM    AS 이력추적번호,
    a.FOOD_TYPE            AS 식품유형,
    b.CMPNY_NM             AS 제조사,
    b.PRDLST_NM            AS 바코드상품분류
FROM "I0320" a
LEFT JOIN "I2570" b ON a.PDT_BARCD = b.BRCD_NO
LIMIT 30;


-- ============================================================
-- [사례 8] 한국외식업중앙회 / 에그스토리 (값조회x)
--   업소 위생교육 + 인허가 현황 연동
-- ============================================================

-- 8-1. 식품접객업 + 식품위생교육내역  [연결키: LCNS_NO] (값조회x)
--      한국외식업중앙회: 교육 이수 업소와 인허가 현황 대조
--      ※ I1200(997건) 적재됨. 단 LCNS_NO 포맷 불일치로 현재 JOIN 결과 0건
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.LCNS_NO              AS 허가번호,
    a.INDUTY_NM            AS 업종,
    a.LOCP_ADDR            AS 주소,
    b.INSTT_CD_NM          AS 교육기관,
    b.EDC_TYPE_NM          AS 교육유형,
    b.COMPL_DTM            AS 교육이수일
FROM "I1200" a
LEFT JOIN "I1560" b ON a.LCNS_NO = b.LCNS_NO
WHERE b.COMPL_DTM >= '20240101'
LIMIT 30;

-- 8-2. 위생등급 + 위생교육 이수 현황  [연결키: LCNS_NO] O
--      한국외식업중앙회: 위생등급 지정 업소의 교육 이수 횟수 파악
--      ※ I1200(997건) 적재됨. 단 LCNS_NO 포맷 불일치로 현재 JOIN 결과 0건
SELECT
    a.BSSH_NM              AS 업소명,
    a.LCNS_NO              AS 인허가번호,
    b.HG_ASGN_LV           AS 위생등급,
    COUNT(c.LCNS_NO)       AS 교육이수횟수
FROM "I1200" a
LEFT JOIN "C004" b ON a.LCNS_NO = b.LCNS_NO
LEFT JOIN "I1560" c ON a.LCNS_NO = c.LCNS_NO
WHERE b.HG_ASGN_LV IS NOT NULL
GROUP BY a.LCNS_NO, a.BSSH_NM, b.HG_ASGN_LV
ORDER BY 교육이수횟수 DESC
LIMIT 30;


-- ============================================================
-- [사례 9] 개별기준규격·시험항목·처분기준 연계
--   기준규격 계열 — 개별기준규격 + 공통기준종류 + 공통기준제외
-- ============================================================

-- 9-1. 개별기준규격 + 시험항목코드  [연결키: TESTITM_CD] O
--      식품 LIMS·LIMS: 품목별 개별 기준규격과 시험항목 상세 조회
SELECT DISTINCT
    a.INDV_SPEC_SEQ        AS 개별기준규격일련번호,
    a.PRDLST_CD            AS 품목분류코드,
    a.PRDLST_CD_NM         AS 품목명,
    a.TESTITM_CD           AS 시험항목코드,
    a.TESTITM_NM           AS 시험항목명,
    a.SPEC_VAL             AS 기준규격,
    b.KOR_NM               AS 시험항목한글명
FROM "I2580" a
LEFT JOIN "I2530" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;

-- 9-2. 공통기준종류 계층 구조  [연결키: CMMN_SPEC_CD → HRNK_CMMN_SPEC_CD] O
--      LIMS: 공통기준규격의 상위-하위 계층 구조 파악
SELECT DISTINCT
    a.CMMN_SPEC_CD             AS 기준규격코드,
    a.SPEC_NM                  AS 기준규격명,
    a.HRNK_CMMN_SPEC_CD        AS 상위코드,
    b.SPEC_NM                  AS 상위기준규격명,
    a.LV                       AS 레벨,
    a.DFN                      AS 정의
FROM "I2590" a
LEFT JOIN "I2590" b ON a.HRNK_CMMN_SPEC_CD = b.CMMN_SPEC_CD
WHERE a.LV = 2
LIMIT 30;

-- 9-3. 공통기준제외 + 공통기준규격  [연결키: CMMN_SPEC_CD + TESTITM_CD] O
--      특정 품목에서 제외되는 기준규격 확인
SELECT DISTINCT
    a.CMMN_SPEC_CD         AS 공통기준규격코드,
    a.SPEC_NM              AS 기준규격명,
    a.PRDLST_CD            AS 품목코드,
    a.KOR_NM               AS 한글명,
    a.TESTITM_CD           AS 시험항목코드,
    b.SPEC_VAL             AS 공통기준규격값
FROM "I2610" a
LEFT JOIN "I2600" b ON a.CMMN_SPEC_CD = b.CMMN_SPEC_CD
                    AND a.TESTITM_CD   = b.TESTITM_CD
LIMIT 30;


-- ============================================================
-- [사례 10] 토스(Toss) — 영업 인허가 + 폐업 통합 현황
--   식품등수입판매업 / 식품제조가공업 폐업 / 식육즉석판매가공업 인허가
-- ============================================================

-- 10. 식품등수입판매업정보 + 인허가 업소  [연결키: LCNS_NO] O
--       토스: 수입판매업체 인허가 상태 종합 확인
SELECT DISTINCT
    a.LCNS_NO                                         AS 인허가번호,
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_NM                                       AS 업종,
    a.PRMS_DT                                         AS 허가일자,
    b.INDUTY_CD_NM                                    AS 인허가_업종분류,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I1260" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 11] 푸드비투비(FoodB2B) — 식품업체 통합 인허가 현황
--   기구.용기포장제조업 / 식품첨가물제조업 / 축산물 가공업허가 / 축산물HACCP
-- ============================================================

-- 11-1. 기구.용기포장제조업 + 인허가 업소  [연결키: LCNS_NO] O
--       푸드비투비: 기구·용기·포장 제조업체 인허가 현황
SELECT DISTINCT
    a.LCNS_NO                                         AS 인허가번호,
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_NM                                       AS 업종,
    a.PRMS_DT                                         AS 허가일자,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I1240" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 11-2. 식품첨가물제조업 + 인허가 업소  [연결키: LCNS_NO] O
--       푸드비투비: 식품첨가물 제조업체 인허가 현황
SELECT DISTINCT
    a.LCNS_NO                                         AS 인허가번호,
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_NM                                       AS 업종,
    a.PRMS_DT                                         AS 허가일자,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I1230" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 11-3. 축산물 가공업허가정보 + 축산물HACCP 지정정보  [연결키: LCNS_NO] O
--       BGF리테일·푸드비투비: 축산물 가공업체의 HACCP 지정 여부 교차 확인
SELECT DISTINCT
    a.LCNS_NO              AS 인허가번호,
    a.BSSH_NM              AS 업소명,
    a.INDUTY_NM            AS 업종,
    a.PRMS_DT              AS 허가일자,
    b.INDUTY_CD_NM         AS HACCP_업종,
    b.CLSBIZ_DVS_CD_NM     AS HACCP_영업상태
FROM "I1300" a
LEFT JOIN "I0610" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 12] 위생용품 이력 관리
--   위생용품 품목 등록·원재료·생산실적 통합 조회
-- ============================================================

-- 12-1. 위생용품 품목제조 + 영업정보  [연결키: LCNS_NO] O
--       위생용품 납품업체의 품목등록 현황과 업체 기본정보 통합 조회
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.PRDLST_REPORT_NO     AS 품목보고번호,
    a.PRDLST_NM            AS 제품명,
    a.PRDLST_DCNM          AS 제품유형,
    a.PRMS_DT              AS 보고일자,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지,
    b.TELNO                AS 전화번호
FROM "I2711" a
JOIN "I2713" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 12-2. 위생용품 원재료 + 완제품 연결  [연결키: PRDLST_REPORT_NO] O
--       위생용품 완제품과 사용 원재료 대조 확인
SELECT DISTINCT
    a.PRDLST_NM            AS 완제품명,
    a.PRDLST_DCNM          AS 제품유형,
    b.RAWMTRL_NM           AS 원재료명
FROM "I2711" a
JOIN "I2712" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
LIMIT 30;

-- 12-3. 위생용품 생산실적 + 영업정보  [연결키: LCNS_NO] O
--       연도별 위생용품 생산실적과 업체 현황 통합 조회
SELECT DISTINCT
    a.EVL_YR               AS 평가연도,
    a.BSSH_NM              AS 업소명,
    a.PRDLST_NM            AS 제품명,
    a.PRDCTN_QY            AS 생산량,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "I2851" a
JOIN "I2713" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY a.EVL_YR DESC, a.PRDCTN_QY DESC
LIMIT 30;


-- ============================================================
-- [사례 13] 영업소 위치·변경 이력 관리
--   영업소 위치·변경 이력 기반 지도·음식점 서비스
-- ============================================================

-- 13-1. 영업소재지 GIS 코드 + 인허가 업소  [연결키: LCNS_NO]
--       영업소 상세 주소(도로명·지번) + 인허가 업종 정보 지도 표출
SELECT DISTINCT
    a.BSSH_NM                  AS 업소명,
    a.LOCPLC                   AS 지번주소,
    a.ROADNMADDREMDCD          AS 도로명주소코드,
    a.PNU_CD                   AS PNU코드,
    b.INDUTY_CD_NM             AS 업종
FROM "I2560" a
JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 13-2. 음식점 인허가 변경 이력 + 식품접객업  [연결키: LCNS_NO]
--       음식점 상호·주소 변경 이력 실시간 반영
SELECT DISTINCT
    a.BSSH_NM              AS 현재업소명,
    a.INDUTY_NM            AS 업종,
    a.LOCP_ADDR            AS 현재주소,
    b.CHNG_DT              AS 변경일자,
    b.CHNG_BF_CN           AS 변경전내용,
    b.CHNG_AF_CN           AS 변경후내용,
    b.CHNG_PRVNS           AS 변경사유
FROM "I1200" a
JOIN "I2861" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;

-- 13-3. 식품판매업 인허가 현황  [연결키: LCNS_NO]
--       식품판매업소 인허가 상태 확인
SELECT DISTINCT
    a.LCNS_NO                                         AS 인허가번호,
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_NM                                       AS 업종,
    a.PRMS_DT                                         AS 허가일자,
    a.LOCP_ADDR                                       AS 소재지,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I2832" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 14] 공전 시험기준·시험항목 통합 조회
--   공전 시험기준 + 시험항목코드 연계
-- ============================================================

-- 14-1. 식품첨가물공전 + 시험항목코드  [연결키: TESTITM_CD] O
--       식품첨가물 품목별 시험기준 항목 상세 조회
SELECT DISTINCT
    a.PC_KOR_NM            AS 품목명,
    a.TESTITM_CD           AS 시험항목코드,
    b.KOR_NM               AS 시험항목한글명,
    a.SPEC_VAL             AS 기준규격,
    a.UNIT_NM              AS 단위,
    a.INJRY_YN             AS 위해여부
FROM "I0950" a
LEFT JOIN "I2530" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;

-- 14-2. 건강기능식품공전 + 시험항목코드  [연결키: TESTITM_CD] O
--       건강기능식품 기준규격별 시험항목 조회
SELECT DISTINCT
    a.PC_KOR_NM            AS 품목명,
    a.TESTITM_CD           AS 시험항목코드,
    b.KOR_NM               AS 시험항목한글명,
    a.SPEC_VAL             AS 기준규격,
    a.UNIT_NM              AS 단위
FROM "I0960" a
LEFT JOIN "I2530" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;

-- 14-3. 기구·용기·포장 공전 + 시험항목코드  [연결키: TESTITM_CD]
--       기구·용기·포장 재질별 시험기준 조회
SELECT DISTINCT
    a.PC_KOR_NM            AS 품목명,
    a.TESTITM_CD           AS 시험항목코드,
    b.KOR_NM               AS 시험항목한글명,
    a.SPEC_VAL             AS 기준규격,
    a.UNIT_NM              AS 단위
FROM "I0940" a
LEFT JOIN "I2530" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;


-- ============================================================
-- [사례 15] 식품 생산실적 통계 분석
--   식품 생산실적 통계 분석
-- ============================================================

-- 15-1. 식품(첨가물) 품목제조보고 원재료 + 제조업체  [연결키: LCNS_NO] O
--       제조업체별 사용 원재료 현황 분석
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.PRDLST_NM            AS 품목명,
    a.RAWMTRL_NM           AS 원재료명,
    b.LOCP_ADDR            AS 소재지
FROM "C002" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 15-2. 식품·식품첨가물 생산실적 + 제조업체  [연결키: LCNS_NO]
--       연도별 생산실적 현황과 업체 정보 통합 분석
SELECT DISTINCT
    a.EVL_YR               AS 평가연도,
    a.BSSH_NM              AS 업소명,
    a.H_ITEM_NM            AS 대분류,
    a.PRDLST_NM            AS 품목명,
    a.PRDCTN_QY            AS 생산량,
    b.LOCP_ADDR            AS 소재지
FROM "I0300" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY a.EVL_YR DESC, a.PRDCTN_QY DESC
LIMIT 30;

-- 15-3. 건강기능식품 생산실적 + 품목제조신고  [연결키: PRDLST_REPORT_NO] O
--       건강기능식품 품목별 연도별 생산량 추적
SELECT DISTINCT
    a.EVL_YR               AS 평가연도,
    a.BSSH_NM              AS 업소명,
    a.PRDLST_NM            AS 제품명,
    a.PRDCTN_QY            AS 생산량,
    b.PRMS_DT              AS 신고일자
FROM "I0310" a
JOIN "I0030" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
ORDER BY a.EVL_YR DESC
LIMIT 30;


-- ============================================================
-- [사례 16] 식약처 법규·집행 정보 시스템
--   처분기준·과태료 코드 연계
-- ============================================================

-- 16-1. 처분기준코드 계층 구조  [연결키: HRNK_DSPS_STDR_CD → DSPS_STDR_CD] O
--       처분기준 상위-하위 계층 전체 조회
SELECT DISTINCT
    a.DSPS_STDR_CD         AS 처분기준코드,
    a.DSPS_STDR_CD_NM      AS 처분기준명,
    a.LV_NO                AS 레벨,
    b.DSPS_STDR_CD_NM      AS 상위처분기준명,
    a.VILT_TYPE_CD_NM      AS 위반유형,
    a.BASIS_LAWORD         AS 근거법령
FROM "I2550" a
LEFT JOIN "I2550" b ON a.HRNK_DSPS_STDR_CD = b.DSPS_STDR_CD
WHERE a.USE_YN = 'Y'
LIMIT 30;

-- 16-2. 처분기준 + 과태료 부과기준  [연결키: DSPS_STDR_CD] O
--       위반 유형별 처분기준과 과태료 매핑
SELECT DISTINCT
    a.DSPS_STDR_CD         AS 처분기준코드,
    a.DSPS_STDR_CD_NM      AS 처분기준명,
    a.VILT_TYPE_CD_NM      AS 위반유형,
    a.BASIS_LAWORD         AS 근거법령,
    b.DSPS_STDR_CD_NM      AS 과태료기준명
FROM "I2550" a
JOIN "I1670" b ON a.DSPS_STDR_CD = b.DSPS_STDR_CD
WHERE a.USE_YN = 'Y'
LIMIT 30;

-- 17-3. 식품제조가공업 행정처분 + 제조업체  [연결키: LCNS_NO] O
--       행정처분 이력과 업체 기본정보 통합 조회
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM       AS 처분업소명,
    a.DSPS_TYPECD_NM             AS 처분유형,
    a.VILTCN                     AS 위반내용,
    a.DSPS_DCSNDT                AS 처분결정일,
    b.LOCP_ADDR                  AS 소재지,
    b.TELNO                      AS 전화번호
FROM "I0480" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY a.DSPS_DCSNDT DESC
LIMIT 30;


-- ============================================================
-- [사례 17] 건강기능식품 전주기 추적
--   건강기능식품 전주기 추적 (chain: 원재료 → 제조 → 생산실적 → GMP인증)
-- ============================================================

-- 17-1. 건강기능식품 원재료 → 품목제조신고 → GMP 인증  [3차 체인: PRDLST_REPORT_NO → LCNS_NO] O
--       GMP 인증 업체의 품목별 원재료 구성 파악
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDLST_NM            AS 제품명,
    b.BSSH_NM              AS 업소명,
    c.INDUTY_CD_NM         AS GMP_업종,
    c.APPN_DT              AS GMP_인증일
FROM "C003" a
JOIN "I0030" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
JOIN "I0630" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 17-2. 건강기능식품 제조업 인허가 + 생산실적  [연결키: LCNS_NO] O
--       건강기능식품 전문·벤처 제조업체별 생산실적 추적
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.INDUTY_NM            AS 업종,
    a.LOCP_ADDR            AS 소재지,
    b.EVL_YR               AS 평가연도,
    b.PRDLST_NM            AS 제품명,
    b.PRDCTN_QY            AS 생산량
FROM "I-0020" a
JOIN "I0310" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.EVL_YR DESC
LIMIT 30;

-- 17-3. 건강기능식품 업소 인허가 변경 이력  [연결키: LCNS_NO] O
--       건강기능식품 제조업체 상호·주소 변경 이력 확인
SELECT DISTINCT
    a.PRDLST_NM            AS 제품명,
    a.BSSH_NM              AS 업소명,
    b.CHNG_DT              AS 변경일자,
    b.CHNG_BF_CN           AS 변경전내용,
    b.CHNG_AF_CN           AS 변경후내용,
    b.CHNG_PRVNS           AS 변경사유
FROM "I0030" a
JOIN "I2860" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 18] 농산물이력추적 생산·유통 연계
--   농산물이력추적 생산·유통 연계
-- ============================================================

-- 18. 농산물이력추적 생산 + 유통  [연결키: HIST_TRACE_REG_NO] O
--       이력추적 등록 농산물의 생산자→유통업체 연결
SELECT DISTINCT
    a.HIST_TRACE_REG_NO    AS 이력추적등록번호,
    a.RPRSNT_PRDLST_NM     AS 대표품목명,
    a.REG_INSTT_NM         AS 등록기관,
    a.ORGN_NM              AS 생산지,
    b.GRP_NM               AS 유통업체명,
    b.PRSDNT_NM            AS 유통업체대표
FROM "I1790" a
JOIN "I1800" b ON a.HIST_TRACE_REG_NO = b.HIST_TRACE_REG_NO
LIMIT 30;


-- ============================================================
-- [사례 19] 어린이·모범·우수 업소 인증 연계
--   어린이·모범·우수 업소 인증 연계
-- ============================================================

-- 19-1. 어린이 기호식품 품질인증 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO] O
--       어린이 기호식품 인증 제품의 품목제조 정보 대조
SELECT DISTINCT
    a.PRDLST_NM                    AS 인증제품명,
    a.CHILD_FAVOR_FOOD_TYPE_NM     AS 어린이기호식품유형,
    a.APPN_BGN_DT                  AS 인증시작일,
    a.APPN_END_DT                  AS 인증종료일,
    b.PRDLST_NM                    AS 품목명,
    b.INDUTY_CD_NM                 AS 업종
FROM "I0080" a
JOIN "I1310" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
LIMIT 30;

-- 19-2. 식품모범음식점 + 식품접객업  [연결키: LCNS_NO] O
--       모범음식점 지정 현황과 식품접객업 정보 통합 표출
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.SIGNGU_NM            AS 시군구,
    a.YEAR                 AS 지정연도,
    a.PNCPL_FOOD_NM        AS 주요음식,
    a.APPN_DT              AS 지정일자,
    b.LOCP_ADDR            AS 주소,
    b.TELNO                AS 전화번호
FROM "I1590" a
JOIN "I1200" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 20-3. 우수수입업소 + 수입판매업  [연결키: LCNS_NO] O
--       우수수입업소 등록 업체의 수입판매업 허가 현황 확인
SELECT DISTINCT
    a.BSSH_NM                  AS 업소명,
    a.EXCOURY_NATN_CD_NM       AS 수출국,
    a.PRDLST_NM                AS 품목,
    a.PRMS_DT                  AS 등록일자,
    b.INDUTY_NM                AS 업종,
    b.LOCP_ADDR                AS 소재지
FROM "I0250" a
JOIN "I1260" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 20] 검사기관 연계·수거검사 이력
--   검사기관 연계·수거검사 이력
-- ============================================================

-- 20-1. 국내외 검사기관 연계  [연결키: PRSEC_INSTT_RCOGN_NO] O
--       국내·외 검사기관 인정번호 기준 연계 조회
SELECT DISTINCT
    a.BSSH_NM              AS 국내기관명,
    a.WORK_SCOPE           AS 업무범위,
    a.APPN_BGN_DT          AS 지정시작일,
    a.APPN_END_DT          AS 지정종료일,
    b.BSSH_NM              AS 국외기관명,
    b.BSSH_ADDR            AS 국외기관주소,
    b.PRSEC_ITM_CD_NM      AS 검사항목
FROM "I0890" a
JOIN "I0910" b ON a.PRSEC_INSTT_RCOGN_NO = b.PRSEC_INSTT_RCOGN_NO
LIMIT 30;

-- 20-2. 수거검사 실적 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO] ) O
--       수거검사 대상 제품의 품목제조 정보 및 판정 결과 조회
SELECT DISTINCT
    a.BSSH_NM                  AS 업소명,
    a.PRDTNM                   AS 제품명,
    a.JDGMNT_CD_NM             AS 판정결과,
    a.TKAWYDTM                 AS 수거일시,
    a.TKAWYSPCI_TYPECD_NM      AS 수거특이유형,
    b.PRDLST_NM                AS 품목명,
    b.INDUTY_CD_NM             AS 업종
FROM "I0460" a
JOIN "I1310" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
LIMIT 30;


-- ============================================================
-- [사례 21] join.sql 조인 사례
-- ============================================================

-- 21-1. 공통기준규격 + 공통기준종류  [연결키: CMMN_SPEC_CD] (1,000건) O
SELECT DISTINCT
    a.CMMN_SPEC_CD         AS 공통기준코드,
    a.PRDLST_CD_NM         AS 품목명,
    a.TESTITM_NM           AS 시험항목명,
    a.SPEC_VAL             AS 기준규격,
    a.UNIT_NM              AS 단위,
    b.SPEC_NM              AS 공통기준종류명,
    b.LV                   AS 계층레벨
FROM "I2600" a
JOIN "I2590" b ON a.CMMN_SPEC_CD = b.CMMN_SPEC_CD
LIMIT 30;

-- 21-2. 축산물 품목제조정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] (1,000건) O
SELECT DISTINCT
    a.PRDLST_NM            AS 품목명,
    a.PRDLST_DCNM          AS 품목유형,
    a.PRMS_DT              AS 보고일자,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "I1310" a
JOIN "I1300" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-3. 수입식품등영업신고대장 + 식품등수입판매업정보  [연결키: LCNS_NO] (1,000건) O
SELECT DISTINCT
    a.BSSH_NM              AS 영업신고업소명,
    a.INDUTY_NM            AS 업종,
    a.PRMS_DT              AS 신고일자,
    b.LOCP_ADDR            AS 소재지,
    b.TELNO                AS 전화번호
FROM "C001" a
JOIN "I1260" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-4. 식품(첨가물)품목제조보고 + 인허가 업소 정보  [연결키: LCNS_NO] (1,000건) O
SELECT DISTINCT
    a.BSSH_NM              AS 업소명,
    a.PRDLST_NM            AS 품목명,
    a.PRDLST_DCNM          AS 품목유형,
    a.PRMS_DT              AS 보고일자,
    b.INDUTY_CD_NM         AS 인허가업종
FROM "I1250" a
JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-5. 위생용품 품목제조보고(원재료) + 위생용품영업정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM            AS 품목명,
    a.RAWMTRL_NM           AS 원재료명,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "I2712" a
JOIN "I2713" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-6. 축산물 품목제조정보 + 인허가 업소 정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM                                       AS 품목명,
    a.INDUTY_CD_NM                                    AS 업종,
    a.PRMS_DT                                         AS 보고일자,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I1310" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-7. 축산물품목제조보고(원재료) + 축산물 가공업허가정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM            AS 품목명,
    a.RAWMTRL_NM           AS 원재료명,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "C006" a
JOIN "I1300" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-8. 위생용품 생산실적 + 위생용품 품목제조보고  [연결키: PRDLST_REPORT_NO] O
SELECT DISTINCT
    a.EVL_YR               AS 평가연도,
    a.PRDLST_NM            AS 제품명,
    a.PRDCTN_QY            AS 생산량,
    b.PRDLST_DCNM          AS 품목유형,
    b.POG_DAYCNT           AS 유통기한
FROM "I2851" a
JOIN "I2711" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
LIMIT 30;

-- 21-9. 생산중단제품정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM            AS 생산중단품목명,
    a.END_DT               AS 생산중단일,
    a.ARTCL_END_WHY        AS 생산중단사유,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "I2852" a
JOIN "I1300" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-10. 공통기준제외 + 시험항목코드  [연결키: TESTITM_CD] O
SELECT DISTINCT
    a.SPEC_NM              AS 공통기준종류명,
    a.TESTITM_CD           AS 시험항목코드,
    a.KOR_NM               AS 제외항목명,
    b.KOR_NM               AS 시험항목한글명
FROM "I2610" a
JOIN "I2530" b ON a.TESTITM_CD = b.TESTITM_CD
LIMIT 30;

-- 21-11. 검사부적합(농산물) + 검사부적합(국내)  [연결키: BRCDNO] O
SELECT DISTINCT
    a.PRDTNM               AS 농산물제품명,
    a.BSSHNM               AS 업소명,
    a.TEST_ITMNM           AS 시험항목,
    a.TESTANALS_RSLT       AS 검사결과,
    b.PRDLST_CD_NM         AS 국내품목유형
FROM "I2640" a
JOIN "I2620" b ON a.BRCDNO = b.BRCDNO
LIMIT 30;

-- 21-12. 회수·판매중지 정보 + 품목유형코드  [연결키: PRDLST_CD] O
SELECT DISTINCT
    a.PRDTNM               AS 제품명,
    a.BSSHNM               AS 업소명,
    a.RTRVLPRVNS           AS 회수사유,
    b.KOR_NM               AS 품목유형명
FROM "I0490" a
JOIN "I2510" b ON a.PRDLST_CD = b.PRDLST_CD
LIMIT 30;

-- 21-13. 검사부적합(농산물) + 회수·판매중지 정보  [연결키: BRCDNO] O
SELECT DISTINCT
    a.PRDTNM               AS 농산물제품명,
    a.BSSHNM               AS 업소명,
    a.TEST_ITMNM           AS 시험항목,
    a.TESTANALS_RSLT       AS 검사결과,
    b.RTRVLPRVNS           AS 회수사유
FROM "I2640" a
JOIN "I0490" b ON a.BRCDNO = b.BRCDNO
LIMIT 30;

-- 21-14. 회수·판매중지 정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDTNM               AS 제품명,
    a.BSSHNM               AS 업소명,
    a.RTRVLPRVNS           AS 회수사유,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지
FROM "I0490" a
JOIN "I1300" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-15. 식품(첨가물)품목제조보고(원재료) + 인허가 업소 정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM            AS 품목명,
    a.RAWMTRL_NM           AS 원재료명,
    b.INDUTY_CD_NM         AS 인허가업종
FROM "C002" a
JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-16. 어린이 기호식품 품질인증 + 인허가 업소 정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.PRDLST_NM                                       AS 인증제품명,
    a.CHILD_FAVOR_FOOD_TYPE_NM                        AS 어린이기호식품유형,
    a.APPN_BGN_DT                                     AS 인증시작일,
    a.APPN_END_DT                                     AS 인증종료일,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I0080" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-17. 공통기준제외 + 품목유형코드  [연결키: PRDLST_CD] O
SELECT DISTINCT
    a.SPEC_NM              AS 공통기준종류명,
    a.PRDLST_CD            AS 품목분류코드,
    a.KOR_NM               AS 제외항목명,
    b.KOR_NM               AS 품목유형명
FROM "I2610" a
JOIN "I2510" b ON a.PRDLST_CD = b.PRDLST_CD
LIMIT 30;

-- 21-18. 바코드연계제품정보 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO] O
SELECT DISTINCT
    a.PRDLST_NM            AS 바코드제품명,
    a.BSSH_NM              AS 업소명,
    a.BAR_CD               AS 바코드,
    b.PRDLST_DCNM          AS 품목유형,
    b.INDUTY_CD_NM         AS 업종
FROM "C005" a
JOIN "I1310" b ON a.PRDLST_REPORT_NO = b.PRDLST_REPORT_NO
LIMIT 30;

-- 21-19. 건강기능식품 개별인정형 정보 + 기능성 원료인정현황  [연결키: HF_FNCLTY_MTRAL_RCOGN_NO] O
SELECT DISTINCT
    a.RAWMTRL_NM               AS 원료명,
    a.PRIMARY_FNCLTY           AS 주요기능성,
    a.DAY_INTK_HIGHLIMIT       AS 최대섭취량,
    a.DAY_INTK_LOWLIMIT        AS 최소섭취량,
    b.BSSH_NM                  AS 인정업체명,
    b.FNCLTY_CN                AS 기능성내용
FROM "I-0050" a
JOIN "I-0040" b ON a.HF_FNCLTY_MTRAL_RCOGN_NO = b.HF_FNCLTY_MTRAL_RCOGN_NO
LIMIT 30;

-- 21-20. 식품업소 인허가 변경 정보 + 인허가 업소 정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM                                         AS 업소명,
    a.INDUTY_CD_NM                                    AS 업종,
    a.CHNG_DT                                         AS 변경일자,
    a.CHNG_BF_CN                                      AS 변경전내용,
    a.CHNG_AF_CN                                      AS 변경후내용,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I2859" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 21-21. 식품모범음식점 + 인허가 업소 정보  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM                                         AS 업소명,
    a.SIGNGU_NM                                       AS 시군구,
    a.YEAR                                            AS 지정연도,
    a.PNCPL_FOOD_NM                                   AS 주요음식,
    CASE WHEN b.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END    AS 영업상태
FROM "I1590" a
LEFT JOIN "I2500" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 22] 식품(첨가물) 원재료 제조업체 인허가 변경이력
-- ============================================================

-- 22. 식품(첨가물) 원재료 제조업체 + 인허가 변경이력  [연결키: LCNS_NO] (37건 / DISTINCT 5개 업체) O
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료품목명,
    b.BSSH_NM              AS 업소명,
    b.INDUTY_NM            AS 업종,
    b.LOCP_ADDR            AS 소재지,
    c.CHNG_DT              AS 변경일자,
    c.CHNG_BF_CN           AS 변경전내용,
    c.CHNG_AF_CN           AS 변경후내용
FROM "C002" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2859" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 23] chain_joins.sql 사례
-- ============================================================

-- 23-1. 위생관리 종합평가 + 평가 상세결과  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM               AS 업소명,
    a.EVL_TYPE_DVS_NM       AS 평가유형,
    a.EVL_GRD_NM            AS 평가등급,
    a.EVL_DT                AS 평가일,
    b.EVL_SCORE             AS 평가점수,
    b.EVL_GRD_CD_NM         AS 상세등급,
    b.ADDR                  AS 주소
FROM "I0680" a
JOIN "I1540" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 23-2. 식품영업허가 + 위생관리 종합평가  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM               AS 업소명,
    a.INDUTY_NM             AS 업종,
    a.PRMS_DT               AS 허가일,
    b.EVL_TYPE_DVS_NM       AS 평가유형,
    b.EVL_GRD_NM            AS 평가등급,
    b.EVL_DT                AS 평가일
FROM "I0060" a
JOIN "I0680" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 23-3. 건강기능식품 제조업 + 인허가 변경이력  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM          AS 업소명,
    a.INDUTY_NM        AS 업종,
    a.LOCP_ADDR        AS 소재지,
    b.CHNG_DT          AS 변경일자,
    b.CHNG_BF_CN       AS 변경전내용,
    b.CHNG_AF_CN       AS 변경후내용
FROM "I-0020" a
JOIN "I2860" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;

-- 23-4. 건강기능식품 GMP 인증 + 인허가 변경이력  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM            AS 업소명,
    a.INDUTY_CD_NM       AS 업종,
    a.APPN_DT            AS GMP인증일,
    b.CHNG_DT            AS 변경일자,
    b.CHNG_BF_CN         AS 변경전내용,
    b.CHNG_AF_CN         AS 변경후내용
FROM "I0630" a
JOIN "I2860" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;

-- 23-5. HACCP 인증 업소 + 식품제조업 인허가  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM             AS 업소명,
    a.INDUTY_CD_NM        AS 업종,
    a.HACCP_APPN_DT       AS HACCP인증일,
    a.PRDLST_NM           AS 인증품목,
    b.INDUTY_NM           AS 인허가업종,
    b.LOCP_ADDR           AS 소재지
FROM "I0580" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 23-6. 회수·판매중지 제품 + 공통기준규격  [연결키: PRDLST_CD] O
SELECT DISTINCT
    a.PRDTNM             AS 제품명,
    a.BSSHNM             AS 업소명,
    a.RTRVLPRVNS         AS 회수사유,
    b.PRDLST_CD_NM       AS 품목유형,
    b.TESTITM_NM         AS 시험항목,
    b.SPEC_VAL           AS 기준규격,
    b.UNIT_NM            AS 단위
FROM "I0490" a
JOIN "I2600" b ON a.PRDLST_CD = b.PRDLST_CD
LIMIT 30;

-- 23-7. HACCP 인증 업소 + 건강기능식품 생산중단  [연결키: LCNS_NO] O
SELECT DISTINCT
    a.BSSH_NM             AS 업소명,
    a.INDUTY_CD_NM        AS 업종,
    a.HACCP_APPN_DT       AS HACCP인증일,
    b.PRDLST_NM           AS 생산중단품목,
    b.END_DT              AS 생산중단일,
    b.ARTCL_END_WHY       AS 중단사유
FROM "I0580" a
JOIN "I2852" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 23-8. 건기식 원재료 → 제조업 → GMP 인증  [연결키: LCNS_NO → LCNS_NO] O
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    a.BSSH_NM              AS 원재료업소명,
    b.INDUTY_NM            AS 제조업종,
    b.LOCP_ADDR            AS 소재지,
    c.INDUTY_CD_NM         AS GMP업종,
    c.APPN_DT              AS GMP인증일
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0630" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 23-9. 건기식 원재료 → 제조업 → 인허가 변경이력  [연결키: LCNS_NO → LCNS_NO] O
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 업소명,
    b.INDUTY_NM            AS 업종,
    c.CHNG_DT              AS 변경일자,
    c.CHNG_BF_CN           AS 변경전내용,
    c.CHNG_AF_CN           AS 변경후내용
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2860" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;

-- 23-10. 건기식 원재료 → 품목제조신고 → 인허가 변경이력  [연결키: LCNS_NO → LCNS_NO] O
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDLST_NM            AS 제품명,
    b.PRIMARY_FNCLTY       AS 주요기능성,
    c.CHNG_DT              AS 변경일자,
    c.CHNG_BF_CN           AS 변경전내용,
    c.CHNG_AF_CN           AS 변경후내용
FROM "C003" a
JOIN "I0030" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2860" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 24] H-wis, 식품 위해정보 실시간 대응 시스템
--   활용 데이터: 인허가업소 정보 회수.판매중지 정보 행정처분 결과
-- ============================================================

-- 24-1. H-wis, 식품 위해정보 실시간 대응 시스템 (값조회X)
SELECT DISTINCT
    a.LCNS_NO                 AS 인허가번호,
    a.BSSH_NM                 AS 업소명,
    a.INDUTY_CD_NM            AS 업종명,
    a.ADDR               AS 주소,
    b.LCNS_NO                 AS 인허가번호,
    b.RTRVLPRVNS             AS 회수사유,
    b.RTRVLDSUSE_SEQ       AS 회수계획문서번호,
    b.PRDLST_REPORT_NO        AS 품목제조번호
FROM "I2500" a
JOIN "I0490" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;


-- ============================================================
-- [사례 25] 오뚜기
--   활용 데이터: 식품(첨가물)품목 제조보고, 축산물품목제조정보, 개별기준규격, 공통기준규격,공통기준종류,공통기준제외,시험항목코드,품목유형코드
-- ============================================================

-- 25. 오뚜기
--       [I1250+I2580 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명,
    b.PRDLST_CD              AS 품목코드,
    b.TESTITM_CD             AS 시험항목코드,
    b.TESTITM_NM             AS 시험항목명
FROM "I1250" a
JOIN "I2580" b ON a.PRDLST_DCNM = b.PRDLST_CD_NM LIMIT 30;



-- ============================================================
-- [사례 34] 우리가 만들어가는 건강한 먹거리 문화
--   활용 데이터: 회수.판매중지 정보, 식품접객업소 위생등급 지정현황, 검사부적합(국내) 등
-- ============================================================

-- 34-1. 우리가 만들어가는 건강한 먹거리 문화
--       [I0490+I2859 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                 AS 인허가번호,
    a.RTRVLPRVNS             AS 회수사유,
    a.RTRVLDSUSE_SEQ       AS 회수계획문서번호,
    a.PRDLST_REPORT_NO        AS 품목제조번호,
    b.LCNS_NO                 AS 인허가번호,
    b.BSSH_NM                 AS 업소명,
    b.HG_ASGN_NM              AS 지정등급명,
    b.HG_ASGN_DT              AS 지정일자
FROM "I0490" a
JOIN "I2859" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 35] 영양제 리뷰 플랫폼, 위드페어
--   활용 데이터: 건강기능식품 품목제조 신고사항 현황, 건강기능식품 품목제조신고(원재료) 등
-- ============================================================

-- 35-1. 영양제 리뷰 플랫폼, 위드페어
--       [I2530+I1250+C002 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 36] 기능성농식품자원 정보를 빠르고 알기 쉽게 !
--   활용 데이터: 건강기능식품 품목제조 신고사항 현황, 건강기능식품 개별인정형 정보
-- ============================================================

-- 36-1. 기능성농식품자원 정보를 빠르고 알기 쉽게 !
--       [I1250 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명
FROM "I1250" a
LIMIT 30;

-- ============================================================
-- [사례 37] 대구광역시 위생등급제 지정업소 안내
--   활용 데이터: 식품접객업소 위생등급 지정현황
-- ============================================================

-- 37-1. 대구광역시 위생등급제 지정업소 안내
--       [I2859 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO          AS 인허가번호,
    a.BSSH_NM          AS 업소명,
    a.HG_ASGN_NM       AS 지정등급명,
    a.HG_ASGN_DT       AS 지정일자
FROM "I2859" a
LIMIT 30;

-- ============================================================
-- [사례 38] 먹을수록 돈이 되는 영양제 스토어
--   활용 데이터: 건강기능식품 품목제조신고(원재료), 식품이력추적관리 등록 현황 등
-- ============================================================

-- 38-1. 먹을수록 돈이 되는 영양제 스토어
--       [I2530+I1250+C002+I1930 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 39] 내 영양제 맞춤 분석: 과잉 섭취하거나 부족한 영양 성분 확인
--   활용 데이터: 건강기능식품 품목제조신고(원재료) / 건강기능식품 개별 인정형 정보 / 건강기능식품 영양DB / 건강기능식품 기능성 원료인정현황
-- ============================================================

-- 39-1. 내 영양제 맞춤 분석: 과잉 섭취하거나 부족한 영양 성분 확인
--       [I2530+I1250+C002 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 40] 내 몸에 맞는 과일, 오늘부터!
--   활용 데이터: 식품영양성분DB(NEW), 건강기능식품 영양DB 등
-- ============================================================

-- 40-1. 내 몸에 맞는 과일, 오늘부터!
--       [I2530 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 41] 친구와 함께 게임처럼 걸어요
--   활용 데이터: 건강기능식품 품목제조 신고사항 현황, 건강기능식품 개별인정형 정보 등
-- ============================================================

-- 41-1. 친구와 함께 게임처럼 걸어요
--       [I1250 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명
FROM "I1250" a
LIMIT 30;

-- ============================================================
-- [사례 42] 전국 음식점 위생등급제 지정업소 안내
--   활용 데이터: 식품접객업소 위생등급 지정현황
-- ============================================================

-- 42-1. 전국 음식점 위생등급제 지정업소 안내
--       [I2859 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO          AS 인허가번호,
    a.BSSH_NM          AS 업소명,
    a.HG_ASGN_NM       AS 지정등급명,
    a.HG_ASGN_DT       AS 지정일자
FROM "I2859" a
LIMIT 30;

-- ============================================================
-- [사례 43] 베럽 - 내 아이가 먹고 바르는 모든 제품의 성분 확인
--   활용 데이터: 건강기능식품 영양DB
-- ============================================================

-- 43-1. 베럽 - 내 아이가 먹고 바르는 모든 제품의 성분 확인
--       [I2530 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 44] 대세는 홈트의 시대! 신개념 홈트족 어플! 쉐어홈트
--   활용 데이터: 식품영양성분DB(NEW)
-- ============================================================

-- 44-1. 대세는 홈트의 시대! 신개념 홈트족 어플! 쉐어홈트
--       [I2530 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD             AS 시험항목코드,
    a.TESTITM_NM             AS 시험항목명,
    a.KOR_NM                 AS 국문명,
    a.ENG_NM                 AS 영문명
FROM "I2530" a
LIMIT 30;

-- ============================================================
-- [사례 45] BGF리테일 상품 위험 예측 품질안전관리시스템(QSS)
--   활용 데이터: 회수.판매중지 정보, 행정처분결과, 유통바코드, 바코드연계제품정보, 축산물HACCP 지정정보
-- ============================================================

-- 45-1. BGF리테일 상품 위험 예측 품질안전관리시스템(QSS)
--       [I0490+I0470+C005+I0580 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                 AS 인허가번호,
    a.RTRVLPRVNS             AS 회수사유,
    a.RTRVLDSUSE_SEQ       AS 회수계획문서번호,
    a.PRDLST_REPORT_NO        AS 품목제조번호,
    b.LCNS_NO                 AS 인허가번호,
    b.DSPS_DCSNDT             AS 처분확정일자,
    b.DSPS_TYPECD_NM          AS 처분유형명,
    b.VILTCN                  AS 위반내용
FROM "I0490" a
JOIN "I0470" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 46] 자연부터, 마음으로, 사람에게 칼렛바이오
--   활용 데이터: 건강기능식품 품목제조 신고사항 현황, 건강기능식품 품목분류정보, 건강기능식품 GMP 지정 현황
-- ============================================================

-- 46-1. 자연부터, 마음으로, 사람에게 칼렛바이오
--       [I1250 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명
FROM "I1250" a
LIMIT 30;

-- ============================================================
-- [사례 47] 최상의 제품을 위해 끊임없이 연구하는 코리아헬스(주)
--   활용 데이터: 건강기능식품 품목제조 신고사항 현황
-- ============================================================

-- 47-1. 최상의 제품을 위해 끊임없이 연구하는 코리아헬스(주)
--       [I1250 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명
FROM "I1250" a
LIMIT 30;

-- ============================================================
-- [사례 48] 식품 LIMS * 개발 및 운영 : (주)브릴리언트시스템즈 https://www.brillys.com, 044-865-6602 * 주요 내용 :  식품공전의 공공데이터(Open-API)를 활용하여 LIMS내에서 최신 기준규격이 즉시 적용되도록 하며, 시험 완료 후 식약처의 통합 LIMS에 자동으로 결과를 전송할 수 있는 기능 제공 * 관련 기사 : https://www.etnews.com/20211109000073 * 활용 데이터 : - 개별기준규격 - 공통기준규격 - 시험항목코드 - 품목분류코드
--   활용 데이터: - 개별기준규격 - 공통기준규격 - 시험항목코드 - 품목분류코드
-- ============================================================

-- 48-1. 식품 LIMS * 개발 및 운영 : (주)브릴리언트시스템즈 https://www.brillys.com, 044-865-6602 * 주요 내용 :  식품공전의 공공데이터(Open-API)를 활용하여 LIMS내에서 최신 기준규격이 즉시 적용되도록 하며, 시험 완료 후 식약처의 통합 LIMS에 자동으로 결과를 전송할 수 있는 기능 제공 * 관련 기사 : https://www.etnews.com/20211109000073 * 활용 데이터 : - 개별기준규격 - 공통기준규격 - 시험항목코드 - 품목분류코드
--       [I2580 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDLST_CD        AS 품목코드,
    a.TESTITM_CD       AS 시험항목코드,
    a.TESTITM_NM       AS 시험항목명
FROM "I2580" a
LIMIT 30;

-- ============================================================
-- [사례 49] 프렌차이즈 특화 소프트웨어 개발 업체 - 위솝(Wesop)
--   활용 데이터: 
-- ============================================================

-- 49-1. 프렌차이즈 특화 소프트웨어 개발 업체 - 위솝(Wesop)
--       [I2500 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO            AS 인허가번호,
    a.BSSH_NM            AS 업소명,
    a.INDUTY_CD_NM       AS 업종명,
    a.ADDR          AS 주소
FROM "I2500" a
LIMIT 30;

-- ============================================================
-- [사례 50] 장보는 시간보다 빠른 식료품 초고속배달 앱 - 큐마켓
--   활용 데이터: 바코드연계제품정보, 유통바코드
-- ============================================================

-- 50-1. 장보는 시간보다 빠른 식료품 초고속배달 앱 - 큐마켓
--       [C005 — 1개 패턴 커버]
SELECT DISTINCT
    a.BAR_CD                 AS 바코드,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명
FROM "C005" a
LIMIT 30;

-- ============================================================
-- [사례 51] 복약관리부터 검진결과까지 필수 앱 헬피(HELPY)
--   활용 데이터: 건강기능식품 품목분류정보  건강기능식품 품목제조신고 ( 원재료 )
-- ============================================================

-- 51-1. 복약관리부터 검진결과까지 필수 앱 헬피(HELPY)
--       [I1250+C002 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                AS 인허가번호,
    a.PRDLST_REPORT_NO       AS 품목제조번호,
    a.PRDLST_NM              AS 제품명,
    b.PRDLST_REPORT_NO       AS 품목제조번호,
    b.RAWMTRL_NM             AS 원재료명
FROM "I1250" a
JOIN "C002" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 52] 건강 관리, 식생활 관리에 도움을 주는 프로그램
--   활용 데이터: 조리식품의 레시피 DB
-- ============================================================

-- 52-1. 건강 관리, 식생활 관리에 도움을 주는 프로그램
--       [I0940+COOKRCP01 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD           AS 시험항목코드,
    a.TESTITM_NM           AS 시험항목명,
    b.RCP_SEQ              AS 레시피일련번호,
    b.RCP_NM               AS 메뉴명,
    b.RCP_PARTS_DTLS       AS 재료정보
FROM "I0940" a
JOIN "COOKRCP01" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 53] 한국관광공사에서 제공하는 착한 여행정보, 국내 최대 여행 플랫폼
--   활용 데이터: 식품접객업정보식품접객업소 위생등급 지정현황행정처분결과(식품접객업)
-- ============================================================

-- 53-1. 한국관광공사에서 제공하는 착한 여행정보, 국내 최대 여행 플랫폼
--       [I0470+I2859 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO              AS 인허가번호,
    a.DSPS_DCSNDT          AS 처분확정일자,
    a.DSPS_TYPECD_NM       AS 처분유형명,
    a.VILTCN               AS 위반내용,
    b.LCNS_NO              AS 인허가번호,
    b.BSSH_NM              AS 업소명,
    b.HG_ASGN_NM           AS 지정등급명,
    b.HG_ASGN_DT           AS 지정일자
FROM "I0470" a
JOIN "I2859" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 54] 집바레시피
--   활용 데이터: 조리식품의 레시피 DB
-- ============================================================

-- 54-1. 집바레시피
--       [I0940+COOKRCP01 — 1개 패턴 커버]
SELECT DISTINCT
    a.TESTITM_CD           AS 시험항목코드,
    a.TESTITM_NM           AS 시험항목명,
    b.RCP_SEQ              AS 레시피일련번호,
    b.RCP_NM               AS 메뉴명,
    b.RCP_PARTS_DTLS       AS 재료정보
FROM "I0940" a
JOIN "COOKRCP01" b ON a.LCNS_NO = b.LCNS_NO LIMIT 30;

-- ============================================================
-- [사례 55] 동방아그로(웹) / 동방박사(앱)
--   활용 데이터: 
-- ============================================================

-- 55-1. 동방아그로(웹) / 동방박사(앱)
--       [I2500 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO            AS 인허가번호,
    a.BSSH_NM            AS 업소명,
    a.INDUTY_CD_NM       AS 업종명,
    a.ADDR          AS 주소
FROM "I2500" a
LIMIT 30;


-- ============================================================
-- [사례 56] chain_joins.sql — C003 LCNS 확장 체인
--   건기식 원재료 + 생산실적(I0310) / 생산중단(I2852) 포함
--   새 조합: I0310, I2852, I0490 순열 등 29개 패턴 커버
-- ============================================================

-- 56-1. 건기식 원재료 → 제조업 → 품목제조신고 → 생산실적  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.PRDLST_NM            AS 품목명,
    c.PRIMARY_FNCLTY       AS 주요기능성,
    d.EVL_YR               AS 보고년도,
    d.PRDLST_NM            AS 생산실적품목명
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0030" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I0310" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;

-- 56-2. 건기식 원재료 → 생산실적 → GMP인증 → 인허가변경이력  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.EVL_YR               AS 보고년도,
    b.PRDLST_NM            AS 생산실적품목,
    c.APPN_DT              AS GMP인증일,
    d.CHNG_DT              AS 변경일자,
    d.CHNG_AF_CN           AS 변경후내용
FROM "C003" a
JOIN "I0310" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0630" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I2860" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;

-- 56-3. 건기식 원재료 → 제조업 → 회수제품 → GMP → 인허가변경  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.PRDTNM               AS 회수제품명,
    c.RTRVLPRVNS           AS 회수사유,
    d.APPN_DT              AS GMP인증일,
    e.CHNG_DT              AS 변경일자
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0490" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I0630" d ON c.LCNS_NO = d.LCNS_NO
JOIN "I2860" e ON d.LCNS_NO = e.LCNS_NO
LIMIT 30;

-- 56-4. 건기식 원재료 → 품목제조신고 → 회수제품 → GMP → 인허가변경  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDLST_NM            AS 품목명,
    c.PRDTNM               AS 회수제품명,
    c.RTRVLPRVNS           AS 회수사유,
    d.APPN_DT              AS GMP인증일,
    e.CHNG_DT              AS 변경일자
FROM "C003" a
JOIN "I0030" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0490" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I0630" d ON c.LCNS_NO = d.LCNS_NO
JOIN "I2860" e ON d.LCNS_NO = e.LCNS_NO
LIMIT 30;

-- 56-5. 건기식 원재료 → 제조업 → 품목제조신고 → 회수제품  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.PRDLST_NM            AS 품목명,
    d.PRDTNM               AS 회수제품명,
    d.RTRVLPRVNS           AS 회수사유
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0030" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I0490" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;

-- 56-6. 건기식 원재료 → 제조업 → GMP인증 → 생산중단제품  [LCNS_NO 체인]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.APPN_DT              AS GMP인증일,
    c.INDUTY_CD_NM         AS GMP업종,
    d.PRDLST_NM            AS 생산중단품목,
    d.END_DT               AS 생산중단일
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0630" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I2852" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 57] chain_joins.sql — C003 회수→기준규격 체인
--   건기식 원재료 → 회수제품(I0490) → 기준규격 테이블군
--   조인키: LCNS_NO → PRDLST_CD → TESTITM_CD
--   17개 패턴 커버
-- ============================================================

-- 57-1. 건기식 원재료 → 회수제품 → 공통기준규격 품목코드  [LCNS_NO → PRDLST_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.PC_KOR_NM            AS 품목유형명
FROM "C003" a
JOIN "I0490" b ON a.LCNS_NO  = b.LCNS_NO
JOIN "I0960" c ON b.PRDLST_CD = c.PRDLST_CD
LIMIT 30;

-- 57-2. 건기식 원재료 → 회수제품 → 개별기준규격  [LCNS_NO → PRDLST_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.TESTITM_NM           AS 시험항목,
    c.SPEC_VAL             AS 기준규격
FROM "C003" a
JOIN "I0490" b ON a.LCNS_NO  = b.LCNS_NO
JOIN "I2580" c ON b.PRDLST_CD = c.PRDLST_CD
LIMIT 30;

-- 57-3. 건기식 원재료 → 회수제품 → 품목코드 → 개별/공통기준규격  [PRDLST_CD + TESTITM_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDTNM               AS 회수제품명,
    c.PC_KOR_NM            AS 품목유형명,
    d.TESTITM_NM           AS 시험항목,
    d.SPEC_VAL             AS 기준규격,
    e.TESTITM_NM           AS 공통시험항목,
    e.SPEC_VAL             AS 공통기준규격
FROM "C003" a
JOIN "I0490" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0960" c ON b.PRDLST_CD = c.PRDLST_CD
JOIN "I2580" d ON b.PRDLST_CD = d.PRDLST_CD
JOIN "I2600" e ON b.PRDLST_CD = e.PRDLST_CD
LIMIT 30;

-- 57-4. 건기식 원재료 → 회수제품 → 품목코드 → 시험항목코드  [PRDLST_CD → TESTITM_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDTNM               AS 회수제품명,
    c.PC_KOR_NM            AS 품목유형명,
    d.TESTITM_NM           AS 시험항목명,
    d.SPEC_VAL             AS 기준규격
FROM "C003" a
JOIN "I0490" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0960" c ON b.PRDLST_CD = c.PRDLST_CD
JOIN "I2530" d ON c.TESTITM_CD = d.TESTITM_CD
LIMIT 30;

-- 57-5. 건기식 원재료 → 제조업/품목신고 → 회수제품 → 기준규격  [LCNS_NO + PRDLST_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.PRDLST_NM            AS 품목명,
    d.PRDTNM               AS 회수제품명,
    e.PC_KOR_NM            AS 품목유형명,
    f.TESTITM_NM           AS 시험항목
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0030" c ON b.LCNS_NO   = c.LCNS_NO
JOIN "I0490" d ON c.LCNS_NO   = d.LCNS_NO
JOIN "I0960" e ON d.PRDLST_CD = e.PRDLST_CD
JOIN "I2580" f ON d.PRDLST_CD = f.PRDLST_CD
LIMIT 30;

-- 57-6. 건기식 원재료 → GMP인증업소 → 회수제품 → 기준규격  [LCNS_NO + PRDLST_CD]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.APPN_DT              AS GMP인증일,
    c.PRDTNM               AS 회수제품명,
    d.PC_KOR_NM            AS 품목유형명,
    e.TESTITM_NM           AS 시험항목,
    e.SPEC_VAL             AS 개별기준규격
FROM "C003" a
JOIN "I0630" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0490" c ON b.LCNS_NO   = c.LCNS_NO
JOIN "I0960" d ON c.PRDLST_CD = d.PRDLST_CD
JOIN "I2580" e ON c.PRDLST_CD = e.PRDLST_CD
LIMIT 30;


-- ============================================================
-- [사례 58] chain_joins.sql — C001 수입업체 확장 체인
--   수입식품영업신고(C001) → 회수(I0490) → 기준규격 / 우수수입업소 연계
--   10개 패턴 커버
-- ============================================================

-- 58-1. 수입업체 → 회수제품 → 공통기준규격  [LCNS_NO → PRDLST_CD]
SELECT DISTINCT
    a.BSSH_NM              AS 수입업소명,
    a.INDUTY_NM            AS 업종,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.PC_KOR_NM            AS 품목유형명
FROM "C001" a
JOIN "I0490" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0960" c ON b.PRDLST_CD = c.PRDLST_CD
LIMIT 30;

-- 58-2. 수입업체 → 회수제품 → 기준규격 군 전체  [LCNS_NO → PRDLST_CD → TESTITM_CD]
SELECT DISTINCT
    a.BSSH_NM              AS 수입업소명,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.TESTITM_NM           AS 시험항목,
    c.SPEC_VAL             AS 공통기준규격,
    d.SPEC_NM              AS 기준종류명,
    e.TESTITM_NM           AS 개별시험항목,
    f.TESTITM_NM           AS 시험항목코드명
FROM "C001" a
JOIN "I0490" b ON a.LCNS_NO      = b.LCNS_NO
JOIN "I2600" c ON b.PRDLST_CD    = c.PRDLST_CD
JOIN "I2590" d ON c.CMMN_SPEC_CD = d.CMMN_SPEC_CD
JOIN "I2580" e ON b.PRDLST_CD    = e.PRDLST_CD
JOIN "I2530" f ON e.TESTITM_CD   = f.TESTITM_CD
LIMIT 30;

-- 58-3. 수입업체 → 수입판매업 → 회수제품 → 공통기준규격  [LCNS_NO + PRDLST_CD]
SELECT DISTINCT
    a.BSSH_NM              AS 수입업소명,
    b.BSSH_NM              AS 수입판매업소명,
    c.PRDTNM               AS 회수제품명,
    d.PC_KOR_NM            AS 품목유형명,
    e.TESTITM_NM           AS 시험항목
FROM "C001" a
JOIN "I1260" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0490" c ON b.LCNS_NO   = c.LCNS_NO
JOIN "I0960" d ON c.PRDLST_CD = d.PRDLST_CD
JOIN "I2600" e ON c.PRDLST_CD = e.PRDLST_CD
LIMIT 30;

-- 58-4. 수입업체 → 회수제품  [LCNS_NO] (단순 2-테이블)
SELECT DISTINCT
    a.BSSH_NM          AS 수입업소명,
    a.INDUTY_NM        AS 업종,
    a.LOCP_ADDR        AS 소재지,
    b.PRDTNM           AS 회수제품명,
    b.RTRVLPRVNS       AS 회수사유,
    b.RECLST_DT        AS 회수일자
FROM "C001" a
JOIN "I0490" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.RECLST_DT DESC
LIMIT 30;

-- 58-5. 우수수입업소 → 수입판매업 연계  [LCNS_NO]
SELECT DISTINCT
    a.BSSH_NM                     AS 우수수입업소명,
    a.EXCOURY_NATN_CD_NM          AS 수출국가,
    a.INCM_PRDT_XPORT_MC_NM       AS 제조회사명,
    a.PRDLST_NM                   AS 품목명,
    b.BSSH_NM                     AS 수입판매업소명,
    b.INDUTY_NM                   AS 업종
FROM "C001" a
JOIN "I0250" b ON a.LCNS_NO = b.EXCLNC_INCM_BSSH_REGNO
LIMIT 30;


-- ============================================================
-- [사례 59] chain_joins.sql — C002 식품(첨가물) 원재료 체인
--   식품(첨가물)품목제조보고(원재료)(C002) → 관련 업소/검사 정보
--   14개 패턴 커버
-- ============================================================

-- 59-1. 식품(첨가물) 원재료 → 식품제조가공업 → 생산실적  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    a.BSSH_NM              AS 업소명,
    b.BSSH_NM              AS 제조업소명,
    b.LOCP_ADDR            AS 소재지,
    c.EVL_YR               AS 보고년도,
    c.PRDLST_NM            AS 생산실적품목
FROM "C002" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0300" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 59-2. 식품(첨가물) 원재료 → 식품제조보고 → 인허가업소 → GIS소재지  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    b.PRDLST_NM            AS 제조보고품목,
    b.PRDLST_DCNM          AS 품목유형,
    c.BSSH_NM              AS 인허가업소명,
    c.INDUTY_CD_NM         AS 업종,
    d.LOCPLC               AS GIS소재지
FROM "C002" a
JOIN "I1250" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2500" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I2560" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;

-- 59-3. 식품(첨가물) 원재료 → 어린이기호식품 인증 → 인허가업소 → GIS소재지  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    b.PRDLST_NM            AS 인증제품명,
    b.APPN_BGN_DT          AS 인증일자,
    c.BSSH_NM              AS 인허가업소명,
    d.LOCPLC               AS GIS소재지
FROM "C002" a
JOIN "I0080" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2500" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I2560" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;

-- 59-4. 식품(첨가물) 원재료 → HACCP인증 → 식품제조가공업  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    b.PRDLST_NM            AS HACCP인증품목,
    b.HACCP_APPN_DT        AS HACCP인증일,
    c.BSSH_NM              AS 제조업소명,
    c.LOCP_ADDR            AS 소재지
FROM "C002" a
JOIN "I0580" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I1220" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 59-5. 식품(첨가물) 원재료 → HACCP인증 → 생산중단제품  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    b.PRDLST_NM            AS HACCP인증품목,
    c.PRDLST_NM            AS 생산중단품목,
    c.END_DT               AS 생산중단일,
    c.ARTCL_END_WHY        AS 중단사유
FROM "C002" a
JOIN "I0580" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2852" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 59-6. 식품(첨가물) 원재료 → 식품제조업 → 위생등급 → 위생등급평가  [LCNS_NO]
SELECT DISTINCT
    a.PRDLST_NM            AS 원재료명,
    b.BSSH_NM              AS 업소명,
    b.INDUTY_NM            AS 업종,
    c.GRD_NM               AS 위생등급,
    c.DESIG_DT             AS 지정일자,
    d.EVL_DT               AS 평가일자,
    d.EVL_GRD_CD_NM        AS 평가등급
FROM "C002" a
JOIN "I0060" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0680" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I1540" d ON c.LCNS_NO = d.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 60] chain_joins.sql 잔여 패턴 보충
--   위 사례 27~30 추가 후에도 미포함된 14개 패턴 커버
-- ============================================================

-- 60-1. 건기식 원재료 → 제조업 → 품목제조신고 → 생산실적 → GMP → 인허가변경
--       [C003+I-0020+I0030+I0310+I0630+I2860 — 6개 패턴 일괄 커버]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.BSSH_NM              AS 제조업소명,
    c.PRDLST_NM            AS 품목명,
    d.EVL_YR               AS 생산실적보고년도,
    e.APPN_DT              AS GMP인증일,
    f.CHNG_DT              AS 변경일자,
    f.CHNG_AF_CN           AS 변경후내용
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0030" c ON b.LCNS_NO = c.LCNS_NO
JOIN "I0310" d ON c.LCNS_NO = d.LCNS_NO
JOIN "I0630" e ON d.LCNS_NO = e.LCNS_NO
JOIN "I2860" f ON e.LCNS_NO = f.LCNS_NO
LIMIT 30;

-- 60-2. 건기식 원재료 → 회수제품 → 기구포장공전 + 식첨공전 + 개별기준규격 + 시험항목
--       [C003+I0490+I0940+I0950+I2580+I0960+I2530 — 5개 패턴 일괄 커버]
SELECT DISTINCT
    a.RAWMTRL_NM           AS 원재료명,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.PC_KOR_NM            AS 기구포장품목명,
    c.SPEC_VAL             AS 기구포장기준,
    d.PC_KOR_NM            AS 식첨품목명,
    d.SPEC_VAL             AS 식첨기준,
    e.TESTITM_NM           AS 개별시험항목,
    e.SPEC_VAL             AS 개별기준규격,
    f.PC_KOR_NM            AS 공통품목유형,
    g.TESTITM_NM           AS 시험항목코드명
FROM "C003" a
JOIN "I0490" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I0940" c ON b.PRDLST_CD = c.PRDLST_CD
JOIN "I0950" d ON b.PRDLST_CD = d.PRDLST_CD
JOIN "I2580" e ON b.PRDLST_CD = e.PRDLST_CD
JOIN "I0960" f ON b.PRDLST_CD = f.PRDLST_CD
JOIN "I2530" g ON e.TESTITM_CD = g.TESTITM_CD
LIMIT 30;

-- 60-3. 수입업체 → 회수제품 → 공통기준규격 → 기구포장공전 + 식첨공전
--       [C001+I0490+I2600+I0940+I0950 — 2개 패턴 커버]
SELECT DISTINCT
    a.BSSH_NM              AS 수입업소명,
    b.PRDTNM               AS 회수제품명,
    b.RTRVLPRVNS           AS 회수사유,
    c.TESTITM_NM           AS 공통기준규격시험항목,
    d.PC_KOR_NM            AS 기구포장품목명,
    d.SPEC_VAL             AS 기구포장기준,
    e.PC_KOR_NM            AS 식첨품목명,
    e.SPEC_VAL             AS 식첨기준
FROM "C001" a
JOIN "I0490" b ON a.LCNS_NO   = b.LCNS_NO
JOIN "I2600" c ON b.PRDLST_CD = c.PRDLST_CD
JOIN "I0940" d ON b.PRDLST_CD = d.PRDLST_CD
JOIN "I0950" e ON b.PRDLST_CD = e.PRDLST_CD
LIMIT 30;

-- 60-4. 수입업체 → 우수수입업소 → 수입판매업  [LCNS_NO]
--       [C001+I0250+I1260 — 1개 패턴 커버]
SELECT DISTINCT
    a.BSSH_NM                      AS 수입업소명,
    a.INDUTY_NM                    AS 업종,
    b.EXCOURY_NATN_CD_NM           AS 수출국가,
    b.INCM_PRDT_XPORT_MC_NM        AS 제조회사명,
    b.PRDLST_NM                    AS 우수인정품목,
    c.BSSH_NM                      AS 수입판매업소명,
    c.INDUTY_NM                    AS 판매업종
FROM "C001" a
JOIN "I0250" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I1260" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 61] 농약·동물의약품 잔류허용기준 통합 조회
--   농약잔류허용기준 + 식품별 기준 + 동물의약품 기준 (SCN_002, SCN_003)
-- ============================================================

-- 61-1. 농약잔류기준 × 식품별기준 × 동물의약품기준  [STEP 공통키]
--       [I1040+I1050+I1080 — 1개 패턴 커버]
SELECT DISTINCT
    a.AGCHM_KOR_NM             AS 농약명,
    a.FOOD_KOR_NM              AS 식품명_일반,
    a.MRL_VAL                  AS MRL값,
    a.STEP                     AS 단계,
    b.FOOD_ENG_NM              AS 식품영문명,
    b.LCLAS_NM                 AS 대분류,
    b.MLSFC_NM                 AS 중분류,
    b.TMPR_STDR_APPLC_YN       AS 잠정기준적용여부,
    c.MTRL_KOR_NM              AS 동물의약품명,
    c.FOOD_KOR_NM              AS 동물의약품_식품명,
    c.MRL_VAL                  AS 동물의약품_MRL값
FROM "I1040" a
LEFT JOIN "I1050" b ON a.STEP = b.STEP
LEFT JOIN "I1080" c ON a.STEP = c.STEP
LIMIT 30;


-- ============================================================
-- [사례 62] 행정처분결과 업종별 통합 분석
--   식품접객업소목록 + 식품제조가공업 + 식품판매업 + 식품접객업 + 행정처분결과
--   (SCN_CHAIN_005, SCN_CHAIN_006, SCN_CHAIN_007, SCN_CHAIN_008, SCN_005)
-- ============================================================

-- 62-1. 식품접객업소 처분기간 기반 업종별 행정처분 통합
--       [I2630+I0480+I0481+I0482+I0470 — 4개 패턴 커버]
--       커버: I0480+I0481+I2630 / I0470+I0480+I0481+I2630 /
--             I0480+I0481+I0482+I2630 / I0470+I0481+I2630
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM       AS 업소명_접객,
    a.INDUTY_CD_NM               AS 업종,
    a.DSPS_ENDDT                 AS 처분종료일,
    a.DSPSCN                     AS 처분내용,
    b.PRCSCITYPOINT_BSSHNM       AS 업소명_제조,
    b.DSPS_BGNDT                 AS 제조처분시작일,
    c.PRCSCITYPOINT_BSSHNM       AS 업소명_판매,
    c.DSPS_BGNDT                 AS 판매처분시작일,
    d.PRCSCITYPOINT_BSSHNM       AS 업소명_접객업,
    d.DSPS_ENDDT                 AS 접객처분종료일,
    e.LAWORD_CD_NM               AS 위반법령
FROM "I2630" a
LEFT JOIN "I0480" b ON a.DSPS_ENDDT = b.DSPS_ENDDT
LEFT JOIN "I0481" c ON a.DSPS_ENDDT = c.DSPS_BGNDT
LEFT JOIN "I0482" d ON a.DSPS_ENDDT = d.DSPS_ENDDT
LEFT JOIN "I0470" e ON a.DSPSCN = e.DSPSCN
LIMIT 30;

-- 62-2. 식품접객업 행정처분 × 농산물 검사부적합 연계  [LCNS_NO]
--       [I0470+I0482+I2630+I2640 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM       AS 업소명_접객업,
    a.LCNS_NO                    AS 인허가번호,
    a.DSPS_ENDDT                 AS 처분종료일,
    a.DSPSCN                     AS 처분내용,
    b.PRCSCITYPOINT_BSSHNM       AS 업소명_접객목록,
    c.LAWORD_CD_NM               AS 위반법령,
    d.PRDTNM                     AS 부적합_농산물명,
    d.TEST_ITMNM                 AS 부적합항목
FROM "I0482" a
LEFT JOIN "I2630" b ON a.DSPS_ENDDT = b.DSPS_ENDDT
LEFT JOIN "I0470" c ON a.DSPSCN = c.DSPSCN
LEFT JOIN "I2640" d ON a.LCNS_NO = d.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 63] 위생용품 품목·제조업체·영업정보 통합
--   위생용품품목제조보고 + 제조수입업체 + 영업정보 (SCN_CHAIN_012, SCN_CHAIN_013)
-- ============================================================

-- 63-1. 위생용품 품목유형 기반 제조업체·영업정보 통합
--       [I2711+I2712+I2713 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO              AS 인허가번호,
    a.BSSH_NM              AS 업소명_품목제조,
    a.PRDLST_NM            AS 제품명,
    a.PRDLST_DCNM          AS 품목유형,
    b.BSSH_NM              AS 업소명_제조수입업체,
    b.PRDLST_DCNM          AS 제조수입_품목유형,
    c.BSSH_NM              AS 업소명_영업정보,
    c.INDUTY_CD_NM         AS 업종,
    c.LCNS_NO              AS 영업_인허가번호
FROM "I2711" a
LEFT JOIN "I2712" b ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I2713" c ON a.LCNS_NO = c.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 64] 품목제조 영업정보 다업종 체인
--   C002/C005/C006 + I1250/I1300/I1310/I1320/I2852/I0030
--   (SCN_CHAIN_011, SCN_CHAIN_014, SCN_CHAIN_015, SCN_CHAIN_017)
-- ============================================================

-- 64-1. 식품(첨가물)·축산물 영업자 연계 + 공유주방·품목제조 확장
--       [C002+C005+I1250+I2852 — 2개 패턴 커버]
--       커버: C002+C005+I1250 / C002+C005+I2852
SELECT DISTINCT
    a.BSSH_NM              AS 업소명_식품첨가물,
    a.LCNS_NO              AS 인허가번호,
    a.PRDLST_DCNM          AS 품목유형,
    b.BSSH_NM              AS 업소명_축산물영업,
    b.PRDLST_DCNM          AS 축산물_품목유형,
    c.PRDLST_NM            AS 품목제조명,
    c.RAWMTRL_NM           AS 원재료명,
    d.BSSH_NM              AS 공유주방_업소명
FROM "C002" a
LEFT JOIN "C005" b ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I1250" c ON a.LCNS_NO = c.LCNS_NO
LEFT JOIN "I2852" d ON b.PRDLST_DCNM = d.PRDLST_DCNM
LIMIT 30;

-- 64-2. 공유주방 → 건강기능식품 신고 → 축산물 영업 연계  [PRDLST_DCNM+LCNS_NO]
--       [C005+I0030+I2852 — 1개 패턴 커버]
SELECT DISTINCT
    a.BSSH_NM              AS 공유주방_업소명,
    a.PRDLST_DCNM          AS 공유주방_품목유형,
    a.LCNS_NO              AS 공유주방_인허가번호,
    b.BSSH_NM              AS 축산물_영업자,
    b.PRDLST_DCNM          AS 축산물_품목유형,
    c.BSSH_NM              AS 건강기능식품_업소명,
    c.LCNS_NO              AS 건강기능식품_인허가번호
FROM "I2852" a
LEFT JOIN "C005" b ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I0030" c ON a.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 64-3. 축산물 검사기관 → 공유주방 → 위생용품제조수입업 연계  [PRDLST_DCNM+LCNS_NO]
--       [C006+I1320+I2852 — 1개 패턴 커버]
SELECT DISTINCT
    a.INSTT_NM             AS 검사기관명,
    a.LCNS_NO              AS 인허가번호,
    a.PRDLST_DCNM          AS 품목유형,
    b.BSSH_NM              AS 공유주방_업소명,
    b.PRDLST_DCNM          AS 공유주방_품목유형,
    c.BSSH_NM              AS 위생용품_제조수입업소,
    c.LCNS_NO              AS 위생용품_인허가번호
FROM "C006" a
LEFT JOIN "I2852" b ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I1320" c ON a.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 64-4. 축산물 품목제조 → 가공업허가 → 축산물영업자 체인  [LCNS_NO+PRDLST_DCNM]
--       [C005+I1300+I1310 — 1개 패턴 커버]
SELECT DISTINCT
    a.BSSH_NM              AS 업소명_품목제조,
    a.LCNS_NO              AS 인허가번호,
    a.PRDLST_NM            AS 품목명,
    a.PRDLST_DCNM          AS 품목유형,
    b.BSSH_NM              AS 가공업_업소명,
    b.LCNS_NO              AS 가공업_인허가번호,
    c.BSSH_NM              AS 축산물_영업자,
    c.PRDLST_DCNM          AS 축산물_품목유형
FROM "I1310" a
LEFT JOIN "I1300" b ON a.LCNS_NO = b.LCNS_NO
LEFT JOIN "C005" c ON a.PRDLST_DCNM = c.PRDLST_DCNM
LIMIT 30;


-- ============================================================
-- [사례 65] 기준규격 체계 통합 분석
--   I0930/I0940/I0960/I2530/I2580/I2600/I2610
--   (SCN_CHAIN_009, SCN_CHAIN_010, SCN_CHAIN_018, SCN_007, SCN_010)
-- ============================================================

-- 65-1. 건강기능식품공전 기반 기준규격 체계 통합
--       [I0960+I2580+I2530+I0930+I0940+I2600+I2610 — 5개 패턴 커버]
--       커버: I2580+I2600+I2610 / I0930+I2600+I2610 /
--             I0930+I0960+I2530+I2580 / I0940+I2580+I2600+I2610 / I0930+I0940+I0960+I2580
SELECT DISTINCT
    a.PRDLST_CD            AS 건강기능식품_품목코드,
    a.PC_KOR_NM            AS 건강기능식품_품목명,
    a.TESTITM_CD           AS 시험항목코드,
    a.SPEC_VAL             AS 기준규격값,
    a.SPEC_VAL_SUMUP       AS 기준규격요약,
    b.INDV_SPEC_SEQ        AS 개별기준_일련번호,
    b.PRDLST_CD            AS 개별기준_품목코드,
    c.T_KOR_NM             AS 시험항목명,
    d.SPEC_NM              AS 일반기준명,
    d.SPEC_VAL_SUMUP       AS 일반기준요약,
    e.PC_KOR_NM            AS 개별기준_품목명,
    e.SPEC_VAL             AS 개별기준값,
    f.SPEC_NM              AS 공통기준명,
    f.TESTITM_NM           AS 공통기준_시험항목,
    g.PRDLST_CD            AS 공통기준제외_품목코드
FROM "I0960" a
LEFT JOIN "I2580" b ON a.PRDLST_CD = b.PRDLST_CD
LEFT JOIN "I2530" c ON a.TESTITM_CD = c.TESTITM_CD
LEFT JOIN "I0930" d ON a.SPEC_VAL_SUMUP = d.SPEC_VAL_SUMUP
LEFT JOIN "I0940" e ON b.TESTITM_CD = e.TESTITM_CD
LEFT JOIN "I2600" f ON b.TESTITM_CD = f.TESTITM_CD
LEFT JOIN "I2610" g ON b.PRDLST_CD = g.PRDLST_CD
LIMIT 30;


-- ============================================================
-- [사례 66] 회수·검사부적합 통합 분석
--   I0460 + I0490 + I0940 + I2620 + I2640
--   (SCN_011, SCN_014, SCN_CHAIN_002, SCN_CHAIN_003, SCN_CHAIN_004, SCN_016)
-- ============================================================

-- 66-1. 회수제품 × 국내·수입·농산물 검사부적합 통합  [FRMLCUNIT+PRDTNM+PRDLST_CD]
--       [I0490+I2620+I2640+I0940+I0460 — 5개 패턴 커버]
--       커버: I0490+I2620+I2640 / I0490+I0940+I2620 /
--             I0460+I0490+I2620 / I0460+I0490+I2640 / I0460+I2620+I2640
SELECT DISTINCT
    a.PRDTNM               AS 회수제품명,
    a.BSSHNM               AS 제조업체명,
    a.RTRVLPRVNS           AS 회수사유,
    a.FRMLCUNIT            AS 포장단위,
    a.PRDLST_CD            AS 품목코드,
    b.PRDTNM               AS 국내부적합_제품명,
    b.TEST_ITMNM           AS 부적합항목_국내,
    b.TESTANALS_RSLT       AS 검사결과_국내,
    c.PRDTNM               AS 농산물부적합_제품명,
    c.TEST_ITMNM           AS 부적합항목_농산물,
    d.PC_KOR_NM            AS 개별기준_품목명,
    d.SPEC_VAL             AS 기준규격값,
    e.PRDTNM               AS 수입부적합_제품명,
    e.STDR_STND            AS 기준규격_수입
FROM "I0490" a
LEFT JOIN "I2620" b ON a.FRMLCUNIT = b.FRMLCUNIT
LEFT JOIN "I2640" c ON a.FRMLCUNIT = c.FRMLCUNIT
LEFT JOIN "I0940" d ON a.PRDLST_CD = d.PRDLST_CD
LEFT JOIN "I0460" e ON b.PRDTNM = e.PRDTNM
LIMIT 30;


-- ============================================================
-- [사례 67] 농산물 이력추적 관리 체계
--   이력추적등록 + 업무이력 + 단계이력 (SCN_013)
-- ============================================================

-- 67-1. 농산물 이력추적등록번호 기반 입고·출고·단계 이력 통합
--       [I1920+I1930+I1940 — 1개 패턴 커버]
SELECT DISTINCT
    a.HIST_TRACE_REG_NO         AS 이력추적등록번호,
    a.LOTNO_RELES               AS 로트번호_출고,
    a.LOTNO_WRHOUSNG            AS 로트번호_입고,
    a.PRDLST_GROUP_DVS_NM       AS 품목,
    a.RELES_DVS_NM              AS 출고구분,
    b.WRHOUSNG_QTY              AS 입고수량,
    b.WRHOUSNG_DT               AS 입고일자,
    b.GOODS_NM                  AS 상품명,
    c.STEP_NM                   AS 단계명,
    c.BIZPLC_NM                 AS 사업장명
FROM "I1930" a
LEFT JOIN "I1940" b ON a.HIST_TRACE_REG_NO = b.HIST_TRACE_REG_NO
LEFT JOIN "I1920" c ON a.HIST_TRACE_REG_NO = c.HIST_TRACE_REG_NO
LIMIT 30;


-- ============================================================
-- [사례 68] 과태료·처분기준 체계
--   과태료부과기준 + 처분기준코드 + 과태료부과내역 (SCN_015)
-- ============================================================

-- 68-1. 처분기준 근거법령 기반 과태료 부과내역 통합
--       [I1660+I1670+I2550 — 1개 패턴 커버]
SELECT DISTINCT
    a.DSPS_STDR_CD            AS 처분기준코드,
    a.DSPS_STDR_CD_NM         AS 처분기준명,
    a.BASIS_LAWORD            AS 근거법령,
    a.VILT_TYPE_NM            AS 위반유형,
    b.HRNK_DSPS_STDR_CD       AS 상위처분기준코드,
    b.DSPS_STDR_CD_NM         AS 처분기준코드명,
    b.USE_YN                  AS 사용여부,
    c.BSSH_NM                 AS 업소명,
    c.FNAMT                   AS 과태료금액,
    c.VILT_TYPE_CD_NM         AS 위반유형명
FROM "I1670" a
LEFT JOIN "I2550" b ON a.BASIS_LAWORD = b.BASIS_LAWORD
LEFT JOIN "I1660" c ON b.BASIS_LAWORD = c.BASIS_LAWORD
LIMIT 30;


-- ============================================================
-- [자동 추출 시나리오(34개) 기반 신규 서비스 사례]
-- ============================================================

-- ============================================================
-- ============================================================
-- [사례 69] 품목유형별 유통 바코드 및 원재료 정보 연동 스캐너
--   (SCN_CHAIN_011)
-- ============================================================

-- 69-1. 품목유형별 유통 바코드 및 원재료 정보 연동 스캐너
--       [C002+C005+I1250 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                     AS 인허가번호,
    a.BSSH_NM                     AS 업소명,
    a.PRDLST_REPORT_NO            AS 품목제조번호,
    a.PRMS_DT                     AS 보고일자,
    a.PRDLST_NM                   AS 품목명,
    a.PRDLST_DCNM                 AS 품목유형명,
    a.RAWMTRL_NM                  AS 원재료명,
    a.RAWMTRL_ORDNO               AS 원재료표시순서,
    a.CHNG_DT                     AS 변경일자(YYYYMMDD),
    a.ETQTY_XPORT_PRDLST_YN       AS 내수/겸용구분(N:내수, O:겸용),
    b.PRDLST_REPORT_NO            AS 품목보고(신고)번호,
    b.PRMS_DT                     AS 보고(신고일),
    b.END_DT                      AS 생산중단일,
    b.PRDLST_NM                   AS 제품명,
    b.POG_DAYCNT                  AS 소비기한,
    b.PRDLST_DCNM                 AS 식품 유형,
    b.BSSH_NM                     AS 제조사명,
    b.INDUTY_NM                   AS 업종,
    b.SITE_ADDR                   AS 주소,
    b.CLSBIZ_DT                   AS 폐업일자,
    b.BAR_CD                      AS 유통바코드,
    c.LCNS_NO                     AS 인허가번호,
    c.BSSH_NM                     AS 업소명,
    c.PRDLST_REPORT_NO            AS 품목제조번호,
    c.PRMS_DT                     AS 허가일자,
    c.PRDLST_NM                   AS 제품명,
    c.PRDLST_DCNM                 AS 품목유형명,
    c.PRODUCTION                  AS 생산종료여부,
    c.HIENG_LNTRT_DVS_NM          AS 고열량저영양식품여부,
    c.CHILD_CRTFC_YN              AS 어린이기호식품품질인증여부,
    c.POG_DAYCNT                  AS 소비기한,
    c.LAST_UPDT_DTM               AS 최종수정일자,
    c.INDUTY_CD_NM                AS 업종,
    c.QLITY_MNTNC_TMLMT_DAYCNT    AS 품질유지기한일수,
    c.USAGE                       AS 용법,
    c.PRPOS                       AS 용도,
    c.DISPOS                      AS 제품형태,
    c.FRMLC_MTRQLT                AS 포장재질,
    c.ETQTY_XPORT_PRDLST_YN       AS 내수/겸용구분(N:내수, O:겸용)
FROM "C002" a
LEFT JOIN "C005" b
  ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I1250" c
  ON a.LCNS_NO = c.LCNS_NO
WHERE a.PRDLST_DCNM IS NOT NULL AND a.PRDLST_DCNM != ''
LIMIT 30;

-- ============================================================
-- [사례 70] 특정 원재료 사용 업소의 인허가 상태 일괄 조회망
--   (SCN_CHAIN_016)
-- ============================================================

-- 70-1. 특정 원재료 사용 업소의 인허가 상태 일괄 조회망
--       [C002+I1250+I2500 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                     AS 인허가번호,
    a.BSSH_NM                     AS 업소명,
    a.PRDLST_REPORT_NO            AS 품목제조번호,
    a.PRMS_DT                     AS 허가일자,
    a.PRDLST_NM                   AS 제품명,
    a.PRDLST_DCNM                 AS 품목유형명,
    a.PRODUCTION                  AS 생산종료여부,
    a.HIENG_LNTRT_DVS_NM          AS 고열량저영양식품여부,
    a.CHILD_CRTFC_YN              AS 어린이기호식품품질인증여부,
    a.POG_DAYCNT                  AS 소비기한,
    a.LAST_UPDT_DTM               AS 최종수정일자,
    a.INDUTY_CD_NM                AS 업종,
    a.QLITY_MNTNC_TMLMT_DAYCNT    AS 품질유지기한일수,
    a.USAGE                       AS 용법,
    a.PRPOS                       AS 용도,
    a.DISPOS                      AS 제품형태,
    a.FRMLC_MTRQLT                AS 포장재질,
    a.ETQTY_XPORT_PRDLST_YN       AS 내수/겸용구분(N:내수, O:겸용),
    b.LCNS_NO                     AS 영업고유구분번호(인허가번호),
    b.INDUTY_CD_NM                AS 업종,
    b.BSSH_NM                     AS 업소명,
    b.PRSDNT_NM                   AS 대표자명,
    b.TELNO                       AS 전화번호,
    b.PRMS_DT                     AS 허가일자,
    b.ADDR                        AS 주소,
    c.LCNS_NO                     AS 인허가번호,
    c.BSSH_NM                     AS 업소명,
    c.PRDLST_REPORT_NO            AS 품목제조번호,
    c.PRMS_DT                     AS 보고일자,
    c.PRDLST_NM                   AS 품목명,
    c.PRDLST_DCNM                 AS 품목유형명,
    c.RAWMTRL_NM                  AS 원재료명,
    c.RAWMTRL_ORDNO               AS 원재료표시순서,
    c.CHNG_DT                     AS 변경일자(YYYYMMDD),
    c.ETQTY_XPORT_PRDLST_YN       AS 내수/겸용구분(N:내수, O:겸용)
FROM "I1250" a
LEFT JOIN "I2500" b
  ON a.LCNS_NO = b.LCNS_NO
LEFT JOIN "C002" c
  ON a.PRDLST_DCNM = c.PRDLST_DCNM
WHERE a.LCNS_NO IS NOT NULL AND a.LCNS_NO != ''
LIMIT 30;

-- ============================================================
-- [사례 71] 식품 LIMS용 - 품목별 제외 기준과 적용 기준의 교차 검증 자동화
--   (SCN_CHAIN_018)
-- ============================================================

-- 71-1. 식품 LIMS용 - 품목별 제외 기준과 적용 기준의 교차 검증 자동화
--       [I2580+I2600+I2610 — 1개 패턴 커버]
SELECT DISTINCT
    a.CMMN_SPEC_CD              AS 공통기준규격코드,
    a.SPEC_NM                   AS 기준규격명,
    a.PRDLST_CD                 AS 품목코드,
    a.KOR_NM                    AS 한글명,
    a.TESTITM_CD                AS 시험항목코드,
    a.LAST_UPDT_DTM             AS 최종수정일시,
    b.INDV_SPEC_SEQ             AS 개별기준규격일련번호,
    b.PRDLST_CD                 AS 품목분류코드,
    b.PRDLST_CD_NM              AS 품목명,
    b.TESTITM_CD                AS 시험항목코드,
    b.TESTITM_NM                AS 시험항목명,
    b.FNPRT_ITM_NM              AS 세부항목명,
    b.ATTRB_SEQ                 AS 단서조항일련번호,
    b.PIAM_KOR_NM               AS 단서조항명,
    b.SPEC_VAL                  AS 기준규격,
    b.SPEC_VAL_SUMUP            AS 기준규격요약,
    b.VALD_BEGN_DT              AS 유효개시일,
    b.VALD_END_DT               AS 유효종료일,
    b.SORC                      AS 출처,
    b.VALD_MANLI                AS 유효자리,
    b.JDGMNT_FOM_CD             AS 판정형식코드,
    b.A079_FNPRT_CD_NM          AS 판정형식명,
    b.MXMM_VAL                  AS 최대값,
    b.MXMM_VAL_DVS_CD           AS 최대값구분코드,
    b.A081_FNPRT_CD_NM          AS 최대값구분명,
    b.MIMM_VAL                  AS 최소값,
    b.MIMM_VAL_DVS_CD           AS 최소값구분코드,
    b.A080_FNPRT_CD_NM          AS 최소값구분명,
    b.CHOIC_FIT                 AS 선택형적합코드,
    b.A082_CF_FNPRT_CD_NM       AS 선택형적합명,
    b.CHOIC_IMPROPT             AS 선택형부적합코드,
    b.A082_CI_FNPRT_CD_NM       AS 선택형부적합명,
    b.MCRRGNSM_2N               AS 미생물2N,
    b.MCRRGNSM_2C               AS 미생물2C,
    b.MCRRGNSM_2M               AS 미생물2M,
    b.MCRRGNSM_3M               AS 미생물3M,
    b.FNPRT_ITM_INCLS_YN        AS 세부항목포함여부,
    b.INJRY_YN                  AS 위해여부,
    b.EMPHS_PRSEC_TESTITM_YN    AS 중점검사시험항목여부,
    b.MONTRNG_TESTITM_YN        AS 감시시험항목여부,
    b.RVLV_ELSE_TESTITM_YN      AS 공전외시험항목여부,
    b.NTR_PRSEC_ITM_YN          AS 자품검사시험항목여부,
    b.UNIT_CD                   AS 단위코드,
    b.UNIT_NM                   AS 단위명,
    b.UPDT_PRVNS                AS 수정사유,
    b.LAST_UPDT_DTM             AS 최종수정일시,
    c.CMMN_SPEC_SEQ             AS 공통기준종류코드일련번호,
    c.CMMN_SPEC_CD              AS 공통기준종류코드,
    c.SPEC_NM                   AS 공통기준종류명,
    c.PRDLST_CD                 AS 품목분류코드,
    c.PRDLST_CD_NM              AS 품목명,
    c.TESTITM_CD                AS 시험항목코드,
    c.TESTITM_NM                AS 시험항목명,
    c.FNPRT_ITM_NM              AS 세부항목명,
    c.ATTRB_SEQ                 AS 단서조항일련번호,
    c.PIAM_KOR_NM               AS 단서조항명,
    c.SPEC_VAL                  AS 기준규격,
    c.SPEC_VAL_SUMUP            AS 기준규격요약,
    c.VALD_BEGN_DT              AS 유효개시일,
    c.VALD_END_DT               AS 유효종료일,
    c.SORC                      AS 출처,
    c.VALD_MANLI                AS 유효자리,
    c.JDGMNT_FOM_CD             AS 판정형식코드,
    c.A079_FNPRT_CD_NM          AS 판정형식명,
    c.MXMM_VAL                  AS 최대값,
    c.MXMM_VAL_DVS_CD           AS 최대값구분코드,
    c.A081_FNPRT_CD_NM          AS 최대값구분명,
    c.MIMM_VAL                  AS 최소값,
    c.MIMM_VAL_DVS_CD           AS 최소값구분코드,
    c.A080_FNPRT_CD_NM          AS 최소값구분명,
    c.CHOIC_FIT                 AS 선택형적합코드,
    c.A082_CF_FNPRT_CD_NM       AS 선택형적합명,
    c.CHOIC_IMPROPT             AS 선택형부적합코드,
    c.A082_CI_FNPRT_CD_NM       AS 선택형부적합명,
    c.MCRRGNSM_2N               AS 미생물2N,
    c.MCRRGNSM_2C               AS 미생물2C,
    c.MCRRGNSM_2M               AS 미생물2M,
    c.MCRRGNSM_3M               AS 미생물3M,
    c.FNPRT_ITM_INCLS_YN        AS 세부항목포함여부,
    c.INJRY_YN                  AS 위해여부,
    c.EMPHS_PRSEC_TESTITM_YN    AS 중점검사시험항목여부,
    c.MONTRNG_TESTITM_YN        AS 감시시험항목여부,
    c.RVLV_ELSE_TESTITM_YN      AS 공전외시험항목여부,
    c.NTR_PRSEC_ITM_YN          AS 자품검사시험항목여부,
    c.UNIT_CD                   AS 단위코드,
    c.UNIT_NM                   AS 단위명,
    c.UPDT_PRVNS                AS 수정사유,
    c.LAST_UPDT_DTM             AS 최종수정일시
FROM "I2610" a
LEFT JOIN "I2580" b
  ON a.TESTITM_CD = b.TESTITM_CD
LEFT JOIN "I2600" c
  ON a.PRDLST_CD = c.PRDLST_CD
WHERE a.TESTITM_CD IS NOT NULL AND a.TESTITM_CD != ''
LIMIT 30;

-- ============================================================
-- [사례 72] 행정처분 확정부터 시작, 종료일까지의 타임라인 종합 관리
--   (SCN_CHAIN_006)
-- ============================================================

-- 72-1. 행정처분 확정부터 시작, 종료일까지의 타임라인 종합 관리
--       [I0470+I0480+I0481+I2630 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM    AS 업소명,
    a.INDUTY_CD_NM            AS 업종,
    a.LCNS_NO                 AS 인허가번호,
    a.DSPS_DCSNDT             AS 처분확정일자,
    a.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    a.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    a.DSPS_TYPECD_NM          AS 처분유형,
    a.VILTCN                  AS 위반일자및위반내용,
    a.ADDR                    AS 주소,
    a.TEL_NO                  AS 전화번호,
    a.PRSDNT_NM               AS 대표자명,
    a.DSPSCN                  AS 처분내용,
    a.LAWORD_CD_NM            AS 위반법령,
    a.PUBLIC_DT               AS 공개기한,
    a.LAST_UPDT_DTM           AS 최종수정일,
    a.DSPS_INSTTCD_NM         AS 처분기관명,
    a.DSPSDTLS_SEQ            AS 행정처분전산키,
    b.PRCSCITYPOINT_BSSHNM    AS 업소명,
    b.INDUTY_CD_NM            AS 업종,
    b.LCNS_NO                 AS 인허가번호,
    b.DSPS_DCSNDT             AS 처분확정일자,
    b.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    b.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    b.DSPS_TYPECD_NM          AS 처분유형,
    b.VILTCN                  AS 위반일자및위반내용,
    b.ADDR                    AS 주소,
    b.TELNO                   AS 전화번호,
    b.PRSDNT_NM               AS 대표자명,
    b.LAWORD_CD_NM            AS 위반법령,
    b.DSPSCN                  AS 처분내용,
    b.PUBLIC_DT               AS 공개기한,
    b.LAST_UPDT_DTM           AS 최종수정일,
    b.DSPSDTLS_SEQ            AS 행정처분전산키,
    b.DSPS_INSTTCD_NM         AS 처분기관명,
    c.PRCSCITYPOINT_BSSHNM    AS 업소명,
    c.INDUTY_CD_NM            AS 업종,
    c.LCNS_NO                 AS 인허가번호,
    c.DSPS_DCSNDT             AS 처분확정일자,
    c.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    c.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    c.DSPS_TYPECD_NM          AS 처분유형,
    c.VILTCN                  AS 위반일자 및 위반내용,
    c.ADDR                    AS 주소,
    c.TELNO                   AS 전화번호,
    c.PRSDNT_NM               AS 대표자명,
    c.LAWORD_CD_NM            AS 위반법령,
    c.DSPSCN                  AS 처분내용,
    c.PUBLIC_DT               AS 공개기한,
    c.LAST_UPDT_DTM           AS 최종수정일,
    c.DSPSDTLS_SEQ            AS 행정처분전산키,
    c.DSPS_INSTTCD_NM         AS 처분기관명,
    d.PRCSCITYPOINT_BSSHNM    AS 업소명,
    d.INDUTY_CD_NM            AS 업종,
    d.LCNS_NO                 AS 인허가번호,
    d.DSPS_DCSNDT             AS 처분확정일자,
    d.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    d.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    d.DSPS_TYPECD_NM          AS 처분유형,
    d.VILTCN                  AS 위반일자및위반내용,
    d.ADDR                    AS 주소,
    d.TELNO                   AS 전화번호,
    d.PRSDNT_NM               AS 대표자명,
    d.DSPSCN                  AS 처분내용,
    d.LAWORD_CD_NM            AS 위반법령,
    d.PUBLIC_DT               AS 공개기한,
    d.LAST_UPDT_DTM           AS 최종수정일,
    d.DSPS_INSTTCD_NM         AS 처분기관명,
    d.DSPSDTLS_SEQ            AS 행정처분전산키
FROM "I2630" a
LEFT JOIN "I0480" b
  ON a.DSPS_ENDDT = b.DSPS_ENDDT
LEFT JOIN "I0481" c
  ON a.DSPS_DCSNDT = c.DSPS_DCSNDT
LEFT JOIN "I0470" d
  ON a.DSPSCN = d.DSPSCN
WHERE a.DSPS_ENDDT IS NOT NULL AND a.DSPS_ENDDT != ''
LIMIT 30;

-- ============================================================
-- [사례 73] 생산중단 제품의 품목유형별 연관 원재료 및 대체품 검색
--   (SCN_004)
-- ============================================================

-- 73-1. 생산중단 제품의 품목유형별 연관 원재료 및 대체품 검색
--       [C002+C005+I2852 — 1개 패턴 커버]
SELECT DISTINCT
    a.LCNS_NO                  AS 인허가번호,
    a.BSSH_NM                  AS 업소명,
    a.PRDLST_REPORT_NO         AS 품목제조번호,
    a.PRMS_DT                  AS 보고일자,
    a.PRDLST_NM                AS 품목명,
    a.PRDLST_DCNM              AS 품목유형명,
    a.RAWMTRL_NM               AS 원재료명,
    a.RAWMTRL_ORDNO            AS 원재료표시순서,
    a.CHNG_DT                  AS 변경일자(YYYYMMDD),
    a.ETQTY_XPORT_PRDLST_YN    AS 내수/겸용구분(N:내수, O:겸용),
    b.PRDLST_REPORT_NO         AS 품목보고(신고)번호,
    b.PRMS_DT                  AS 보고(신고일),
    b.END_DT                   AS 생산중단일,
    b.PRDLST_NM                AS 제품명,
    b.POG_DAYCNT               AS 소비기한,
    b.PRDLST_DCNM              AS 식품 유형,
    b.BSSH_NM                  AS 제조사명,
    b.INDUTY_NM                AS 업종,
    b.SITE_ADDR                AS 주소,
    b.CLSBIZ_DT                AS 폐업일자,
    b.BAR_CD                   AS 유통바코드,
    c.PRDLST_REPORT_NO         AS 품목제조보고번호,
    c.PRMS_DT                  AS 품목보고일자,
    c.PRDLST_NM                AS 제품명,
    c.END_DT                   AS 생산중단일자,
    c.PRDLST_DCNM              AS 품목유형명,
    c.LCNS_NO                  AS 인허가번호,
    c.BSSH_NM                  AS 업소명,
    c.FOOD_HF_LS_CL_CD_NM      AS 구분,
    c.ARTCL_END_WHY            AS 생산중단사유
FROM "C002" a
LEFT JOIN "C005" b
  ON a.PRDLST_DCNM = b.PRDLST_DCNM
LEFT JOIN "I2852" c
  ON b.PRDLST_DCNM = c.PRDLST_DCNM
WHERE a.PRDLST_DCNM IS NOT NULL AND a.PRDLST_DCNM != ''
LIMIT 30;

-- ============================================================
-- [사례 74] 공통기준규격의 규격값 요약(예: 불검출) 기반 시험항목 필터링
--   (SCN_CHAIN_010)
-- ============================================================

-- 74-1. 공통기준규격의 규격값 요약(예: 불검출) 기반 시험항목 필터링
--       [I0930+I2600+I2610 — 1개 패턴 커버]
SELECT DISTINCT
    a.CMMN_SPEC_SEQ                AS 공통기준종류코드일련번호,
    a.CMMN_SPEC_CD                 AS 공통기준종류코드,
    a.SPEC_NM                      AS 공통기준종류명,
    a.PRDLST_CD                    AS 품목분류코드,
    a.PRDLST_CD_NM                 AS 품목명,
    a.TESTITM_CD                   AS 시험항목코드,
    a.TESTITM_NM                   AS 시험항목명,
    a.FNPRT_ITM_NM                 AS 세부항목명,
    a.ATTRB_SEQ                    AS 단서조항일련번호,
    a.PIAM_KOR_NM                  AS 단서조항명,
    a.SPEC_VAL                     AS 기준규격,
    a.SPEC_VAL_SUMUP               AS 기준규격요약,
    a.VALD_BEGN_DT                 AS 유효개시일,
    a.VALD_END_DT                  AS 유효종료일,
    a.SORC                         AS 출처,
    a.VALD_MANLI                   AS 유효자리,
    a.JDGMNT_FOM_CD                AS 판정형식코드,
    a.A079_FNPRT_CD_NM             AS 판정형식명,
    a.MXMM_VAL                     AS 최대값,
    a.MXMM_VAL_DVS_CD              AS 최대값구분코드,
    a.A081_FNPRT_CD_NM             AS 최대값구분명,
    a.MIMM_VAL                     AS 최소값,
    a.MIMM_VAL_DVS_CD              AS 최소값구분코드,
    a.A080_FNPRT_CD_NM             AS 최소값구분명,
    a.CHOIC_FIT                    AS 선택형적합코드,
    a.A082_CF_FNPRT_CD_NM          AS 선택형적합명,
    a.CHOIC_IMPROPT                AS 선택형부적합코드,
    a.A082_CI_FNPRT_CD_NM          AS 선택형부적합명,
    a.MCRRGNSM_2N                  AS 미생물2N,
    a.MCRRGNSM_2C                  AS 미생물2C,
    a.MCRRGNSM_2M                  AS 미생물2M,
    a.MCRRGNSM_3M                  AS 미생물3M,
    a.FNPRT_ITM_INCLS_YN           AS 세부항목포함여부,
    a.INJRY_YN                     AS 위해여부,
    a.EMPHS_PRSEC_TESTITM_YN       AS 중점검사시험항목여부,
    a.MONTRNG_TESTITM_YN           AS 감시시험항목여부,
    a.RVLV_ELSE_TESTITM_YN         AS 공전외시험항목여부,
    a.NTR_PRSEC_ITM_YN             AS 자품검사시험항목여부,
    a.UNIT_CD                      AS 단위코드,
    a.UNIT_NM                      AS 단위명,
    a.UPDT_PRVNS                   AS 수정사유,
    a.LAST_UPDT_DTM                AS 최종수정일시,
    b.CMMN_SPEC_CD                 AS 공통기준규격코드,
    b.SPEC_NM                      AS 기준규격명,
    b.PRDLST_CD                    AS 품목코드,
    b.KOR_NM                       AS 한글명,
    b.TESTITM_CD                   AS 시험항목코드,
    b.LAST_UPDT_DTM                AS 최종수정일시,
    c.PRDLST_NM                    AS 품목명,
    c.T_KOR_NM                     AS 시험항목,
    c.FNPRT_ITM_NM                 AS 세부항목,
    c.PIAM_KOR_NM                  AS 품목항목속성,
    c.SPEC_VAL                     AS 기준규격값,
    c.VALD_BEGN_DT                 AS 유효개시일자,
    c.VALD_END_DT                  AS 유효종료일자,
    c.SPEC_VAL_SUMUP               AS 규격값요약,
    c.JDGMNT_FNPRT_CD_NM           AS 판정형식,
    c.MXMM_VAL                     AS 최대값,
    c.MXMM_VAL_FNPRT_CD_NM         AS 이하/미만,
    c.MIMM_VAL                     AS 최소값,
    c.MIMM_VAL_FNPRT_CD_NM         AS 이상/초과,
    c.CHOIC_FIT_FNPRT_CD_NM        AS 세부적합,
    c.CHOIC_IMPROPT_FNPRT_CD_NM    AS 부적합,
    c.INJRY_YN                     AS 위해여부,
    c.UNIT_NM                      AS 단위명
FROM "I2600" a
LEFT JOIN "I2610" b
  ON a.PRDLST_CD = b.PRDLST_CD
LEFT JOIN "I0930" c
  ON a.SPEC_VAL_SUMUP = c.SPEC_VAL_SUMUP
WHERE a.PRDLST_CD IS NOT NULL AND a.PRDLST_CD != ''
LIMIT 30;

-- ============================================================
-- [사례 75] 처분 종료일 도래 업소 자동 알림 및 재점검 스케줄링 서비스
--   (SCN_005)
-- ============================================================

-- 75-1. 처분 종료일 도래 업소 자동 알림 및 재점검 스케줄링 서비스
--       [I0480+I0481+I0482+I2630 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM    AS 업소명,
    a.INDUTY_CD_NM            AS 업종,
    a.LCNS_NO                 AS 인허가번호,
    a.DSPS_DCSNDT             AS 처분확정일자,
    a.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    a.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    a.DSPS_TYPECD_NM          AS 처분유형,
    a.VILTCN                  AS 위반일자및위반내용,
    a.ADDR                    AS 주소,
    a.TELNO                   AS 전화번호,
    a.PRSDNT_NM               AS 대표자명,
    a.LAWORD_CD_NM            AS 위반법령,
    a.DSPSCN                  AS 처분내용,
    a.PUBLIC_DT               AS 공개기한,
    a.LAST_UPDT_DTM           AS 최종수정일,
    a.DSPSDTLS_SEQ            AS 행정처분전산키,
    a.DSPS_INSTTCD_NM         AS 처분기관명,
    b.PRCSCITYPOINT_BSSHNM    AS 업소명,
    b.INDUTY_CD_NM            AS 업종,
    b.LCNS_NO                 AS 인허가번호,
    b.DSPS_DCSNDT             AS 처분확정일자,
    b.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    b.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    b.DSPS_TYPECD_NM          AS 처분유형,
    b.VILTCN                  AS 위반일자및위반내용,
    b.ADDR                    AS 주소,
    b.TEL_NO                  AS 전화번호,
    b.PRSDNT_NM               AS 대표자명,
    b.DSPSCN                  AS 처분내용,
    b.LAWORD_CD_NM            AS 위반법령,
    b.PUBLIC_DT               AS 공개기한,
    b.LAST_UPDT_DTM           AS 최종수정일,
    b.DSPS_INSTTCD_NM         AS 처분기관명,
    b.DSPSDTLS_SEQ            AS 행정처분전산키,
    c.PRCSCITYPOINT_BSSHNM    AS 업소명,
    c.INDUTY_CD_NM            AS 업종,
    c.LCNS_NO                 AS 인허가번호,
    c.DSPS_DCSNDT             AS 처분확정일자,
    c.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    c.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    c.DSPS_TYPECD_NM          AS 처분유형,
    c.VILTCN                  AS 위반일자 및 위반내용,
    c.ADDR                    AS 주소,
    c.TELNO                   AS 전화번호,
    c.PRSDNT_NM               AS 대표자명,
    c.LAWORD_CD_NM            AS 위반법령,
    c.DSPSCN                  AS 처분내용,
    c.PUBLIC_DT               AS 공개기한,
    c.LAST_UPDT_DTM           AS 최종수정일,
    c.DSPSDTLS_SEQ            AS 행정처분전산키,
    c.DSPS_INSTTCD_NM         AS 처분기관명,
    d.PRCSCITYPOINT_BSSHNM    AS 업소명,
    d.INDUTY_CD_NM            AS 업종,
    d.LCNS_NO                 AS 인허가번호,
    d.DSPS_DCSNDT             AS 처분확정일자,
    d.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    d.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    d.DSPS_TYPECD_NM          AS 처분유형,
    d.VILTCN                  AS 위반일자 및 위반내용,
    d.ADDR                    AS 주소,
    d.TELNO                   AS 전화번호,
    d.PRSDNT_NM               AS 대표자명,
    d.LAWORD_CD_NM            AS 위반법령,
    d.DSPSCN                  AS 처분내용,
    d.PUBLIC_DT               AS 공개기한,
    d.LAST_UPDT_DTM           AS 최종수정일,
    d.DSPSDTLS_SEQ            AS 행정처분전산키,
    d.DSPS_INSTTCD_NM         AS 처분기관명
FROM "I0480" a
LEFT JOIN "I2630" b
  ON a.DSPS_ENDDT = b.DSPS_ENDDT
LEFT JOIN "I0482" c
  ON b.DSPS_ENDDT = c.DSPS_ENDDT
LEFT JOIN "I0481" d
  ON b.DSPS_ENDDT = d.DSPS_ENDDT
WHERE a.DSPS_ENDDT IS NOT NULL AND a.DSPS_ENDDT != ''
LIMIT 30;

-- ============================================================
-- [사례 76] 건강기능식품 공전과 개별기준규격 간 시험항목 맵핑 사전
--   (SCN_CHAIN_009)
-- ============================================================

-- 76-1. 건강기능식품 공전과 개별기준규격 간 시험항목 맵핑 사전
--       [I0930+I0960+I2530+I2580 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDLST_CD                    AS 품목코드,
    a.PC_KOR_NM                    AS 품목한글명,
    a.TESTITM_CD                   AS 시험항목코드,
    a.T_KOR_NM                     AS 시험항목 한글명,
    a.FNPRT_ITM_NM                 AS 세부항목명,
    a.SPEC_VAL                     AS 기준규격값,
    a.SPEC_VAL_SUMUP               AS 기준규격값 요약,
    a.VALD_BEGN_DT                 AS 유효개시일자,
    a.VALD_END_DT                  AS 유효종료일자,
    a.SORC                         AS 출처,
    a.MXMM_VAL                     AS 최대값,
    a.MIMM_VAL                     AS 최소값,
    a.INJRY_YN                     AS 위해여부,
    a.UNIT_NM                      AS 단위명,
    b.INDV_SPEC_SEQ                AS 개별기준규격일련번호,
    b.PRDLST_CD                    AS 품목분류코드,
    b.PRDLST_CD_NM                 AS 품목명,
    b.TESTITM_CD                   AS 시험항목코드,
    b.TESTITM_NM                   AS 시험항목명,
    b.FNPRT_ITM_NM                 AS 세부항목명,
    b.ATTRB_SEQ                    AS 단서조항일련번호,
    b.PIAM_KOR_NM                  AS 단서조항명,
    b.SPEC_VAL                     AS 기준규격,
    b.SPEC_VAL_SUMUP               AS 기준규격요약,
    b.VALD_BEGN_DT                 AS 유효개시일,
    b.VALD_END_DT                  AS 유효종료일,
    b.SORC                         AS 출처,
    b.VALD_MANLI                   AS 유효자리,
    b.JDGMNT_FOM_CD                AS 판정형식코드,
    b.A079_FNPRT_CD_NM             AS 판정형식명,
    b.MXMM_VAL                     AS 최대값,
    b.MXMM_VAL_DVS_CD              AS 최대값구분코드,
    b.A081_FNPRT_CD_NM             AS 최대값구분명,
    b.MIMM_VAL                     AS 최소값,
    b.MIMM_VAL_DVS_CD              AS 최소값구분코드,
    b.A080_FNPRT_CD_NM             AS 최소값구분명,
    b.CHOIC_FIT                    AS 선택형적합코드,
    b.A082_CF_FNPRT_CD_NM          AS 선택형적합명,
    b.CHOIC_IMPROPT                AS 선택형부적합코드,
    b.A082_CI_FNPRT_CD_NM          AS 선택형부적합명,
    b.MCRRGNSM_2N                  AS 미생물2N,
    b.MCRRGNSM_2C                  AS 미생물2C,
    b.MCRRGNSM_2M                  AS 미생물2M,
    b.MCRRGNSM_3M                  AS 미생물3M,
    b.FNPRT_ITM_INCLS_YN           AS 세부항목포함여부,
    b.INJRY_YN                     AS 위해여부,
    b.EMPHS_PRSEC_TESTITM_YN       AS 중점검사시험항목여부,
    b.MONTRNG_TESTITM_YN           AS 감시시험항목여부,
    b.RVLV_ELSE_TESTITM_YN         AS 공전외시험항목여부,
    b.NTR_PRSEC_ITM_YN             AS 자품검사시험항목여부,
    b.UNIT_CD                      AS 단위코드,
    b.UNIT_NM                      AS 단위명,
    b.UPDT_PRVNS                   AS 수정사유,
    b.LAST_UPDT_DTM                AS 최종수정일시,
    c.TESTITM_CD                   AS 시험항목코드,
    c.KOR_NM                       AS 한글명,
    c.ENG_NM                       AS 영문명,
    c.ABRV                         AS 약어,
    c.NCKNM                        AS 이명,
    c.TESTITM_NM                   AS 시험항목명,
    c.TESTITM_LCLAS_CD             AS 시험항목대분류시퀀스,
    c.L_ATTRB_CD                   AS 시험항목대분류코드,
    c.L_KOR_NM                     AS 대분류한글명,
    c.TESTITM_MLSFC_CD             AS 시험항목중분류시퀀스,
    c.M_ATTRB_CD                   AS 시험항목중분류코드,
    c.M_KOR_NM                     AS 중분류한글명,
    c.REMN_MTTR_DFN                AS 잔류물질정의,
    c.USE_YN                       AS 사용여부,
    c.LAST_UPDT_DTM                AS 최종수정일시,
    d.PRDLST_NM                    AS 품목명,
    d.T_KOR_NM                     AS 시험항목,
    d.FNPRT_ITM_NM                 AS 세부항목,
    d.PIAM_KOR_NM                  AS 품목항목속성,
    d.SPEC_VAL                     AS 기준규격값,
    d.VALD_BEGN_DT                 AS 유효개시일자,
    d.VALD_END_DT                  AS 유효종료일자,
    d.SPEC_VAL_SUMUP               AS 규격값요약,
    d.JDGMNT_FNPRT_CD_NM           AS 판정형식,
    d.MXMM_VAL                     AS 최대값,
    d.MXMM_VAL_FNPRT_CD_NM         AS 이하/미만,
    d.MIMM_VAL                     AS 최소값,
    d.MIMM_VAL_FNPRT_CD_NM         AS 이상/초과,
    d.CHOIC_FIT_FNPRT_CD_NM        AS 세부적합,
    d.CHOIC_IMPROPT_FNPRT_CD_NM    AS 부적합,
    d.INJRY_YN                     AS 위해여부,
    d.UNIT_NM                      AS 단위명
FROM "I0960" a
LEFT JOIN "I2580" b
  ON a.PRDLST_CD = b.PRDLST_CD
LEFT JOIN "I2530" c
  ON a.TESTITM_CD = c.TESTITM_CD
LEFT JOIN "I0930" d
  ON a.SPEC_VAL_SUMUP = d.SPEC_VAL_SUMUP
WHERE a.PRDLST_CD IS NOT NULL AND a.PRDLST_CD != ''
LIMIT 30;

-- ============================================================
-- [사례 77] 특정 포장단위(예: 500ml) 제품군의 회수 및 부적합 빈도 분석
--   (SCN_011)
-- ============================================================

-- 77-1. 특정 포장단위(예: 500ml) 제품군의 회수 및 부적합 빈도 분석
--       [I0490+I2620+I2640 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDTNM                    AS 제품명,
    a.RTRVLPRVNS                AS 회수사유,
    a.BSSHNM                    AS 제조업체명,
    a.ADDR                      AS 업체주소,
    a.TELNO                     AS 전화번호,
    a.BRCDNO                    AS 바코드번호,
    a.FRMLCUNIT                 AS 포장단위,
    a.MNFDT                     AS 제조일자,
    a.RTRVLPLANDOC_RTRVLMTHD    AS 회수방법,
    a.DISTBTMLMT                AS 유통/소비기한,
    a.PRDLST_TYPE               AS 식품분류,
    a.IMG_FILE_PATH             AS 제품사진 URL,
    a.PRDLST_CD                 AS 품목코드,
    a.CRET_DTM                  AS 등록일,
    a.RTRVLDSUSE_SEQ            AS 회수.판매중지 일련번호,
    a.PRDLST_REPORT_NO          AS 품목제조보고번호,
    a.RTRVL_GRDCD_NM            AS 회수등급,
    a.PRDLST_CD_NM              AS 품목유형(품목코드명),
    a.LCNS_NO                   AS 업체인허가번호,
    b.PRDTNM                    AS 제품명,
    b.BSSHNM                    AS 업소명,
    b.MNFDT                     AS 제조일자,
    b.DISTBTMLMT                AS 유통/소비기한,
    b.ADDR                      AS 영업자주소,
    b.INSTT_NM                  AS 검사기관,
    b.REGSTR_TELNO              AS 전화번호,
    b.BRCDNO                    AS 바코드번호,
    b.FRMLCUNIT                 AS 포장단위,
    b.TEST_ITMNM                AS 부적합항목,
    b.STDR_STND                 AS 기준규격,
    b.TESTANALS_RSLT            AS 검사결과,
    b.CRET_DTM                  AS 등록일,
    b.RTRVLDSUSE_SEQ            AS 회수폐기일련번호,
    b.PRDLST_REPORT_NO          AS 품목제조보고번호,
    b.LCNS_NO                   AS 업체인허가번호,
    b.REPORTR_TELNO             AS 보고자전화번호,
    b.PRDLST_CD_NM              AS 식품유형,
    c.PRDTNM                    AS 제품명,
    c.BSSHNM                    AS 업소명,
    c.MNFDT                     AS 제조일자,
    c.DISTBTMLMT                AS 유통/소비기한,
    c.ADDR                      AS 영업자주소,
    c.INSTT_NM                  AS 검사기관,
    c.REGSTR_TELNO              AS 전화번호,
    c.BRCDNO                    AS 바코드번호,
    c.FRMLCUNIT                 AS 포장단위,
    c.TEST_ITMNM                AS 부적합항목,
    c.STDR_STND                 AS 기준규격,
    c.TESTANALS_RSLT            AS 검사결과,
    c.CRET_DTM                  AS 등록일,
    c.RTRVLDSUSE_SEQ            AS 회수폐기일련번호,
    c.LCNS_NO                   AS 업체인허가번호,
    c.REPORTR_TELNO             AS 보고자전화번호
FROM "I0490" a
LEFT JOIN "I2620" b
  ON a.FRMLCUNIT = b.FRMLCUNIT
LEFT JOIN "I2640" c
  ON a.FRMLCUNIT = c.FRMLCUNIT
WHERE a.FRMLCUNIT IS NOT NULL AND a.FRMLCUNIT != ''
LIMIT 30;

-- ============================================================
-- [사례 78] 용기/포장 기준규격 위반으로 인한 제품 회수 연관성 분석
--   (SCN_CHAIN_002)
-- ============================================================

-- 78-1. 용기/포장 기준규격 위반으로 인한 제품 회수 연관성 분석
--       [I0490+I0940+I2620 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDTNM                    AS 제품명,
    a.RTRVLPRVNS                AS 회수사유,
    a.BSSHNM                    AS 제조업체명,
    a.ADDR                      AS 업체주소,
    a.TELNO                     AS 전화번호,
    a.BRCDNO                    AS 바코드번호,
    a.FRMLCUNIT                 AS 포장단위,
    a.MNFDT                     AS 제조일자,
    a.RTRVLPLANDOC_RTRVLMTHD    AS 회수방법,
    a.DISTBTMLMT                AS 유통/소비기한,
    a.PRDLST_TYPE               AS 식품분류,
    a.IMG_FILE_PATH             AS 제품사진 URL,
    a.PRDLST_CD                 AS 품목코드,
    a.CRET_DTM                  AS 등록일,
    a.RTRVLDSUSE_SEQ            AS 회수.판매중지 일련번호,
    a.PRDLST_REPORT_NO          AS 품목제조보고번호,
    a.RTRVL_GRDCD_NM            AS 회수등급,
    a.PRDLST_CD_NM              AS 품목유형(품목코드명),
    a.LCNS_NO                   AS 업체인허가번호,
    b.PRDTNM                    AS 제품명,
    b.BSSHNM                    AS 업소명,
    b.MNFDT                     AS 제조일자,
    b.DISTBTMLMT                AS 유통/소비기한,
    b.ADDR                      AS 영업자주소,
    b.INSTT_NM                  AS 검사기관,
    b.REGSTR_TELNO              AS 전화번호,
    b.BRCDNO                    AS 바코드번호,
    b.FRMLCUNIT                 AS 포장단위,
    b.TEST_ITMNM                AS 부적합항목,
    b.STDR_STND                 AS 기준규격,
    b.TESTANALS_RSLT            AS 검사결과,
    b.CRET_DTM                  AS 등록일,
    b.RTRVLDSUSE_SEQ            AS 회수폐기일련번호,
    b.PRDLST_REPORT_NO          AS 품목제조보고번호,
    b.LCNS_NO                   AS 업체인허가번호,
    b.REPORTR_TELNO             AS 보고자전화번호,
    b.PRDLST_CD_NM              AS 식품유형,
    c.PRDLST_CD                 AS 품목코드,
    c.PC_KOR_NM                 AS 품목한글명,
    c.TESTITM_CD                AS 시험항목코드,
    c.T_KOR_NM                  AS 시험항목 한글명,
    c.FNPRT_ITM_NM              AS 세부항목명,
    c.SPEC_VAL                  AS 기준규격값,
    c.SPEC_VAL_SUMUP            AS 기준규격값 요약,
    c.VALD_BEGN_DT              AS 유효개시일자,
    c.VALD_END_DT               AS 유효종료일자,
    c.SORC                      AS 출처,
    c.MXMM_VAL                  AS 최대값,
    c.MIMM_VAL                  AS 최소값,
    c.INJRY_YN                  AS 위해여부,
    c.UNIT_NM                   AS 단위명
FROM "I0490" a
LEFT JOIN "I2620" b
  ON a.FRMLCUNIT = b.FRMLCUNIT
LEFT JOIN "I0940" c
  ON a.PRDLST_CD = c.PRDLST_CD
WHERE a.FRMLCUNIT IS NOT NULL AND a.FRMLCUNIT != ''
LIMIT 30;

-- ============================================================
-- [사례 79] 시험항목코드 기반 전 공전(식품, 건기식, 첨가물) 시험법 통합 사전
--   (SCN_007)
-- ============================================================

-- 79-1. 시험항목코드 기반 전 공전(식품, 건기식, 첨가물) 시험법 통합 사전
--       [I0940+I2580+I2600+I2610 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDLST_CD                 AS 품목코드,
    a.PC_KOR_NM                 AS 품목한글명,
    a.TESTITM_CD                AS 시험항목코드,
    a.T_KOR_NM                  AS 시험항목 한글명,
    a.FNPRT_ITM_NM              AS 세부항목명,
    a.SPEC_VAL                  AS 기준규격값,
    a.SPEC_VAL_SUMUP            AS 기준규격값 요약,
    a.VALD_BEGN_DT              AS 유효개시일자,
    a.VALD_END_DT               AS 유효종료일자,
    a.SORC                      AS 출처,
    a.MXMM_VAL                  AS 최대값,
    a.MIMM_VAL                  AS 최소값,
    a.INJRY_YN                  AS 위해여부,
    a.UNIT_NM                   AS 단위명,
    b.INDV_SPEC_SEQ             AS 개별기준규격일련번호,
    b.PRDLST_CD                 AS 품목분류코드,
    b.PRDLST_CD_NM              AS 품목명,
    b.TESTITM_CD                AS 시험항목코드,
    b.TESTITM_NM                AS 시험항목명,
    b.FNPRT_ITM_NM              AS 세부항목명,
    b.ATTRB_SEQ                 AS 단서조항일련번호,
    b.PIAM_KOR_NM               AS 단서조항명,
    b.SPEC_VAL                  AS 기준규격,
    b.SPEC_VAL_SUMUP            AS 기준규격요약,
    b.VALD_BEGN_DT              AS 유효개시일,
    b.VALD_END_DT               AS 유효종료일,
    b.SORC                      AS 출처,
    b.VALD_MANLI                AS 유효자리,
    b.JDGMNT_FOM_CD             AS 판정형식코드,
    b.A079_FNPRT_CD_NM          AS 판정형식명,
    b.MXMM_VAL                  AS 최대값,
    b.MXMM_VAL_DVS_CD           AS 최대값구분코드,
    b.A081_FNPRT_CD_NM          AS 최대값구분명,
    b.MIMM_VAL                  AS 최소값,
    b.MIMM_VAL_DVS_CD           AS 최소값구분코드,
    b.A080_FNPRT_CD_NM          AS 최소값구분명,
    b.CHOIC_FIT                 AS 선택형적합코드,
    b.A082_CF_FNPRT_CD_NM       AS 선택형적합명,
    b.CHOIC_IMPROPT             AS 선택형부적합코드,
    b.A082_CI_FNPRT_CD_NM       AS 선택형부적합명,
    b.MCRRGNSM_2N               AS 미생물2N,
    b.MCRRGNSM_2C               AS 미생물2C,
    b.MCRRGNSM_2M               AS 미생물2M,
    b.MCRRGNSM_3M               AS 미생물3M,
    b.FNPRT_ITM_INCLS_YN        AS 세부항목포함여부,
    b.INJRY_YN                  AS 위해여부,
    b.EMPHS_PRSEC_TESTITM_YN    AS 중점검사시험항목여부,
    b.MONTRNG_TESTITM_YN        AS 감시시험항목여부,
    b.RVLV_ELSE_TESTITM_YN      AS 공전외시험항목여부,
    b.NTR_PRSEC_ITM_YN          AS 자품검사시험항목여부,
    b.UNIT_CD                   AS 단위코드,
    b.UNIT_NM                   AS 단위명,
    b.UPDT_PRVNS                AS 수정사유,
    b.LAST_UPDT_DTM             AS 최종수정일시,
    c.CMMN_SPEC_CD              AS 공통기준규격코드,
    c.SPEC_NM                   AS 기준규격명,
    c.PRDLST_CD                 AS 품목코드,
    c.KOR_NM                    AS 한글명,
    c.TESTITM_CD                AS 시험항목코드,
    c.LAST_UPDT_DTM             AS 최종수정일시,
    d.CMMN_SPEC_SEQ             AS 공통기준종류코드일련번호,
    d.CMMN_SPEC_CD              AS 공통기준종류코드,
    d.SPEC_NM                   AS 공통기준종류명,
    d.PRDLST_CD                 AS 품목분류코드,
    d.PRDLST_CD_NM              AS 품목명,
    d.TESTITM_CD                AS 시험항목코드,
    d.TESTITM_NM                AS 시험항목명,
    d.FNPRT_ITM_NM              AS 세부항목명,
    d.ATTRB_SEQ                 AS 단서조항일련번호,
    d.PIAM_KOR_NM               AS 단서조항명,
    d.SPEC_VAL                  AS 기준규격,
    d.SPEC_VAL_SUMUP            AS 기준규격요약,
    d.VALD_BEGN_DT              AS 유효개시일,
    d.VALD_END_DT               AS 유효종료일,
    d.SORC                      AS 출처,
    d.VALD_MANLI                AS 유효자리,
    d.JDGMNT_FOM_CD             AS 판정형식코드,
    d.A079_FNPRT_CD_NM          AS 판정형식명,
    d.MXMM_VAL                  AS 최대값,
    d.MXMM_VAL_DVS_CD           AS 최대값구분코드,
    d.A081_FNPRT_CD_NM          AS 최대값구분명,
    d.MIMM_VAL                  AS 최소값,
    d.MIMM_VAL_DVS_CD           AS 최소값구분코드,
    d.A080_FNPRT_CD_NM          AS 최소값구분명,
    d.CHOIC_FIT                 AS 선택형적합코드,
    d.A082_CF_FNPRT_CD_NM       AS 선택형적합명,
    d.CHOIC_IMPROPT             AS 선택형부적합코드,
    d.A082_CI_FNPRT_CD_NM       AS 선택형부적합명,
    d.MCRRGNSM_2N               AS 미생물2N,
    d.MCRRGNSM_2C               AS 미생물2C,
    d.MCRRGNSM_2M               AS 미생물2M,
    d.MCRRGNSM_3M               AS 미생물3M,
    d.FNPRT_ITM_INCLS_YN        AS 세부항목포함여부,
    d.INJRY_YN                  AS 위해여부,
    d.EMPHS_PRSEC_TESTITM_YN    AS 중점검사시험항목여부,
    d.MONTRNG_TESTITM_YN        AS 감시시험항목여부,
    d.RVLV_ELSE_TESTITM_YN      AS 공전외시험항목여부,
    d.NTR_PRSEC_ITM_YN          AS 자품검사시험항목여부,
    d.UNIT_CD                   AS 단위코드,
    d.UNIT_NM                   AS 단위명,
    d.UPDT_PRVNS                AS 수정사유,
    d.LAST_UPDT_DTM             AS 최종수정일시
FROM "I0940" a
LEFT JOIN "I2580" b
  ON a.TESTITM_CD = b.TESTITM_CD
LEFT JOIN "I2610" c
  ON b.TESTITM_CD = c.TESTITM_CD
LEFT JOIN "I2600" d
  ON c.TESTITM_CD = d.TESTITM_CD
WHERE a.TESTITM_CD IS NOT NULL AND a.TESTITM_CD != ''
LIMIT 30;

-- ============================================================
-- [사례 80] 특정 처분내용(예: 영업소 폐쇄) 대상자 추적 및 블랙리스트 관리
--   (SCN_CHAIN_008)
-- ============================================================

-- 80-1. 특정 처분내용(예: 영업소 폐쇄) 대상자 추적 및 블랙리스트 관리
--       [I0470+I0481+I2630 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRCSCITYPOINT_BSSHNM    AS 업소명,
    a.INDUTY_CD_NM            AS 업종,
    a.LCNS_NO                 AS 인허가번호,
    a.DSPS_DCSNDT             AS 처분확정일자,
    a.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    a.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    a.DSPS_TYPECD_NM          AS 처분유형,
    a.VILTCN                  AS 위반일자및위반내용,
    a.ADDR                    AS 주소,
    a.TELNO                   AS 전화번호,
    a.PRSDNT_NM               AS 대표자명,
    a.DSPSCN                  AS 처분내용,
    a.LAWORD_CD_NM            AS 위반법령,
    a.PUBLIC_DT               AS 공개기한,
    a.LAST_UPDT_DTM           AS 최종수정일,
    a.DSPS_INSTTCD_NM         AS 처분기관명,
    a.DSPSDTLS_SEQ            AS 행정처분전산키,
    b.PRCSCITYPOINT_BSSHNM    AS 업소명,
    b.INDUTY_CD_NM            AS 업종,
    b.LCNS_NO                 AS 인허가번호,
    b.DSPS_DCSNDT             AS 처분확정일자,
    b.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    b.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    b.DSPS_TYPECD_NM          AS 처분유형,
    b.VILTCN                  AS 위반일자 및 위반내용,
    b.ADDR                    AS 주소,
    b.TELNO                   AS 전화번호,
    b.PRSDNT_NM               AS 대표자명,
    b.LAWORD_CD_NM            AS 위반법령,
    b.DSPSCN                  AS 처분내용,
    b.PUBLIC_DT               AS 공개기한,
    b.LAST_UPDT_DTM           AS 최종수정일,
    b.DSPSDTLS_SEQ            AS 행정처분전산키,
    b.DSPS_INSTTCD_NM         AS 처분기관명,
    c.PRCSCITYPOINT_BSSHNM    AS 업소명,
    c.INDUTY_CD_NM            AS 업종,
    c.LCNS_NO                 AS 인허가번호,
    c.DSPS_DCSNDT             AS 처분확정일자,
    c.DSPS_BGNDT              AS 처분시작일(영업정지의경우),
    c.DSPS_ENDDT              AS 처분종료일(영업정지의경우),
    c.DSPS_TYPECD_NM          AS 처분유형,
    c.VILTCN                  AS 위반일자및위반내용,
    c.ADDR                    AS 주소,
    c.TEL_NO                  AS 전화번호,
    c.PRSDNT_NM               AS 대표자명,
    c.DSPSCN                  AS 처분내용,
    c.LAWORD_CD_NM            AS 위반법령,
    c.PUBLIC_DT               AS 공개기한,
    c.LAST_UPDT_DTM           AS 최종수정일,
    c.DSPS_INSTTCD_NM         AS 처분기관명,
    c.DSPSDTLS_SEQ            AS 행정처분전산키
FROM "I0470" a
LEFT JOIN "I0481" b
  ON a.DSPSCN = b.DSPSCN
LEFT JOIN "I2630" c
  ON a.DSPS_ENDDT = c.DSPS_ENDDT
WHERE a.DSPSCN IS NOT NULL AND a.DSPSCN != ''
LIMIT 30;

-- ============================================================
-- [사례 81] 수거검사 실적과 실제 부적합/회수 전환율 추적
--   (SCN_CHAIN_003)
-- ============================================================

-- 81-1. 수거검사 실적과 실제 부적합/회수 전환율 추적
--       [I0460+I0490+I2620 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDTNM                       AS 제품명,
    a.BSSHNM                       AS 업소명,
    a.MNFDT                        AS 제조일자,
    a.DISTBTMLMT                   AS 유통/소비기한,
    a.ADDR                         AS 영업자주소,
    a.INSTT_NM                     AS 검사기관,
    a.REGSTR_TELNO                 AS 전화번호,
    a.BRCDNO                       AS 바코드번호,
    a.FRMLCUNIT                    AS 포장단위,
    a.TEST_ITMNM                   AS 부적합항목,
    a.STDR_STND                    AS 기준규격,
    a.TESTANALS_RSLT               AS 검사결과,
    a.CRET_DTM                     AS 등록일,
    a.RTRVLDSUSE_SEQ               AS 회수폐기일련번호,
    a.PRDLST_REPORT_NO             AS 품목제조보고번호,
    a.LCNS_NO                      AS 업체인허가번호,
    a.REPORTR_TELNO                AS 보고자전화번호,
    a.PRDLST_CD_NM                 AS 식품유형,
    b.PRDTNM                       AS 제품명,
    b.RTRVLPRVNS                   AS 회수사유,
    b.BSSHNM                       AS 제조업체명,
    b.ADDR                         AS 업체주소,
    b.TELNO                        AS 전화번호,
    b.BRCDNO                       AS 바코드번호,
    b.FRMLCUNIT                    AS 포장단위,
    b.MNFDT                        AS 제조일자,
    b.RTRVLPLANDOC_RTRVLMTHD       AS 회수방법,
    b.DISTBTMLMT                   AS 유통/소비기한,
    b.PRDLST_TYPE                  AS 식품분류,
    b.IMG_FILE_PATH                AS 제품사진 URL,
    b.PRDLST_CD                    AS 품목코드,
    b.CRET_DTM                     AS 등록일,
    b.RTRVLDSUSE_SEQ               AS 회수.판매중지 일련번호,
    b.PRDLST_REPORT_NO             AS 품목제조보고번호,
    b.RTRVL_GRDCD_NM               AS 회수등급,
    b.PRDLST_CD_NM                 AS 품목유형(품목코드명),
    b.LCNS_NO                      AS 업체인허가번호,
    c.PRCSCITYPOINT_INDUTYCD_NM    AS 업종,
    c.BSSH_NM                      AS 업소명,
    c.SITE_ADDR                    AS 소재지,
    c.PRDTNM                       AS 제품명,
    c.TKAWYDTM                     AS 수거일자,
    c.JDGMNT_CD_NM                 AS 판정결과,
    c.EXC_INSTT_NM                 AS 수행기관명,
    c.TKAWYSPCI_TYPECD_NM          AS 검체구분,
    c.PRDLST_REPORT_NO             AS 품목제조보고번호,
    c.LAST_UPDT_DTM                AS 최종수정일시,
    c.TKAWYPRNO                    AS 수거증번호,
    c.PLAN_TITL                    AS 수거계획명
FROM "I2620" a
LEFT JOIN "I0490" b
  ON a.FRMLCUNIT = b.FRMLCUNIT
LEFT JOIN "I0460" c
  ON a.PRDTNM = c.PRDTNM
WHERE a.FRMLCUNIT IS NOT NULL AND a.FRMLCUNIT != ''
LIMIT 30;

-- ============================================================
-- [사례 82] 품목코드 하나로 조회하는 모든 기준규격 및 회수 현황 (품목 360도)
--   (SCN_006)
-- ============================================================

-- 82-1. 품목코드 하나로 조회하는 모든 기준규격 및 회수 현황 (품목 360도)
--       [I0940+I0960+I2580 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDLST_CD                 AS 품목코드,
    a.PC_KOR_NM                 AS 품목한글명,
    a.TESTITM_CD                AS 시험항목코드,
    a.T_KOR_NM                  AS 시험항목 한글명,
    a.FNPRT_ITM_NM              AS 세부항목명,
    a.SPEC_VAL                  AS 기준규격값,
    a.SPEC_VAL_SUMUP            AS 기준규격값 요약,
    a.VALD_BEGN_DT              AS 유효개시일자,
    a.VALD_END_DT               AS 유효종료일자,
    a.SORC                      AS 출처,
    a.MXMM_VAL                  AS 최대값,
    a.MIMM_VAL                  AS 최소값,
    a.INJRY_YN                  AS 위해여부,
    a.UNIT_NM                   AS 단위명,
    b.INDV_SPEC_SEQ             AS 개별기준규격일련번호,
    b.PRDLST_CD                 AS 품목분류코드,
    b.PRDLST_CD_NM              AS 품목명,
    b.TESTITM_CD                AS 시험항목코드,
    b.TESTITM_NM                AS 시험항목명,
    b.FNPRT_ITM_NM              AS 세부항목명,
    b.ATTRB_SEQ                 AS 단서조항일련번호,
    b.PIAM_KOR_NM               AS 단서조항명,
    b.SPEC_VAL                  AS 기준규격,
    b.SPEC_VAL_SUMUP            AS 기준규격요약,
    b.VALD_BEGN_DT              AS 유효개시일,
    b.VALD_END_DT               AS 유효종료일,
    b.SORC                      AS 출처,
    b.VALD_MANLI                AS 유효자리,
    b.JDGMNT_FOM_CD             AS 판정형식코드,
    b.A079_FNPRT_CD_NM          AS 판정형식명,
    b.MXMM_VAL                  AS 최대값,
    b.MXMM_VAL_DVS_CD           AS 최대값구분코드,
    b.A081_FNPRT_CD_NM          AS 최대값구분명,
    b.MIMM_VAL                  AS 최소값,
    b.MIMM_VAL_DVS_CD           AS 최소값구분코드,
    b.A080_FNPRT_CD_NM          AS 최소값구분명,
    b.CHOIC_FIT                 AS 선택형적합코드,
    b.A082_CF_FNPRT_CD_NM       AS 선택형적합명,
    b.CHOIC_IMPROPT             AS 선택형부적합코드,
    b.A082_CI_FNPRT_CD_NM       AS 선택형부적합명,
    b.MCRRGNSM_2N               AS 미생물2N,
    b.MCRRGNSM_2C               AS 미생물2C,
    b.MCRRGNSM_2M               AS 미생물2M,
    b.MCRRGNSM_3M               AS 미생물3M,
    b.FNPRT_ITM_INCLS_YN        AS 세부항목포함여부,
    b.INJRY_YN                  AS 위해여부,
    b.EMPHS_PRSEC_TESTITM_YN    AS 중점검사시험항목여부,
    b.MONTRNG_TESTITM_YN        AS 감시시험항목여부,
    b.RVLV_ELSE_TESTITM_YN      AS 공전외시험항목여부,
    b.NTR_PRSEC_ITM_YN          AS 자품검사시험항목여부,
    b.UNIT_CD                   AS 단위코드,
    b.UNIT_NM                   AS 단위명,
    b.UPDT_PRVNS                AS 수정사유,
    b.LAST_UPDT_DTM             AS 최종수정일시,
    c.PRDLST_CD                 AS 품목코드,
    c.PC_KOR_NM                 AS 품목한글명,
    c.TESTITM_CD                AS 시험항목코드,
    c.T_KOR_NM                  AS 시험항목 한글명,
    c.FNPRT_ITM_NM              AS 세부항목명,
    c.SPEC_VAL                  AS 기준규격값,
    c.SPEC_VAL_SUMUP            AS 기준규격값 요약,
    c.VALD_BEGN_DT              AS 유효개시일자,
    c.VALD_END_DT               AS 유효종료일자,
    c.SORC                      AS 출처,
    c.MXMM_VAL                  AS 최대값,
    c.MIMM_VAL                  AS 최소값,
    c.INJRY_YN                  AS 위해여부,
    c.UNIT_NM                   AS 단위명
FROM "I0940" a
LEFT JOIN "I2580" b
  ON a.PRDLST_CD = b.PRDLST_CD
LEFT JOIN "I0960" c
  ON b.PRDLST_CD = c.PRDLST_CD
WHERE a.PRDLST_CD IS NOT NULL AND a.PRDLST_CD != ''
LIMIT 30;

-- ============================================================
-- [사례 83] '불검출', '이하' 등 규격값 요약 키워드 기반 품질기준 검색엔진
--   (SCN_010)
-- ============================================================

-- 83-1. '불검출', '이하' 등 규격값 요약 키워드 기반 품질기준 검색엔진
--       [I0930+I0940+I0960+I2580 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDLST_CD                    AS 품목코드,
    a.PC_KOR_NM                    AS 품목한글명,
    a.TESTITM_CD                   AS 시험항목코드,
    a.T_KOR_NM                     AS 시험항목 한글명,
    a.FNPRT_ITM_NM                 AS 세부항목명,
    a.SPEC_VAL                     AS 기준규격값,
    a.SPEC_VAL_SUMUP               AS 기준규격값 요약,
    a.VALD_BEGN_DT                 AS 유효개시일자,
    a.VALD_END_DT                  AS 유효종료일자,
    a.SORC                         AS 출처,
    a.MXMM_VAL                     AS 최대값,
    a.MIMM_VAL                     AS 최소값,
    a.INJRY_YN                     AS 위해여부,
    a.UNIT_NM                      AS 단위명,
    b.INDV_SPEC_SEQ                AS 개별기준규격일련번호,
    b.PRDLST_CD                    AS 품목분류코드,
    b.PRDLST_CD_NM                 AS 품목명,
    b.TESTITM_CD                   AS 시험항목코드,
    b.TESTITM_NM                   AS 시험항목명,
    b.FNPRT_ITM_NM                 AS 세부항목명,
    b.ATTRB_SEQ                    AS 단서조항일련번호,
    b.PIAM_KOR_NM                  AS 단서조항명,
    b.SPEC_VAL                     AS 기준규격,
    b.SPEC_VAL_SUMUP               AS 기준규격요약,
    b.VALD_BEGN_DT                 AS 유효개시일,
    b.VALD_END_DT                  AS 유효종료일,
    b.SORC                         AS 출처,
    b.VALD_MANLI                   AS 유효자리,
    b.JDGMNT_FOM_CD                AS 판정형식코드,
    b.A079_FNPRT_CD_NM             AS 판정형식명,
    b.MXMM_VAL                     AS 최대값,
    b.MXMM_VAL_DVS_CD              AS 최대값구분코드,
    b.A081_FNPRT_CD_NM             AS 최대값구분명,
    b.MIMM_VAL                     AS 최소값,
    b.MIMM_VAL_DVS_CD              AS 최소값구분코드,
    b.A080_FNPRT_CD_NM             AS 최소값구분명,
    b.CHOIC_FIT                    AS 선택형적합코드,
    b.A082_CF_FNPRT_CD_NM          AS 선택형적합명,
    b.CHOIC_IMPROPT                AS 선택형부적합코드,
    b.A082_CI_FNPRT_CD_NM          AS 선택형부적합명,
    b.MCRRGNSM_2N                  AS 미생물2N,
    b.MCRRGNSM_2C                  AS 미생물2C,
    b.MCRRGNSM_2M                  AS 미생물2M,
    b.MCRRGNSM_3M                  AS 미생물3M,
    b.FNPRT_ITM_INCLS_YN           AS 세부항목포함여부,
    b.INJRY_YN                     AS 위해여부,
    b.EMPHS_PRSEC_TESTITM_YN       AS 중점검사시험항목여부,
    b.MONTRNG_TESTITM_YN           AS 감시시험항목여부,
    b.RVLV_ELSE_TESTITM_YN         AS 공전외시험항목여부,
    b.NTR_PRSEC_ITM_YN             AS 자품검사시험항목여부,
    b.UNIT_CD                      AS 단위코드,
    b.UNIT_NM                      AS 단위명,
    b.UPDT_PRVNS                   AS 수정사유,
    b.LAST_UPDT_DTM                AS 최종수정일시,
    c.PRDLST_NM                    AS 품목명,
    c.T_KOR_NM                     AS 시험항목,
    c.FNPRT_ITM_NM                 AS 세부항목,
    c.PIAM_KOR_NM                  AS 품목항목속성,
    c.SPEC_VAL                     AS 기준규격값,
    c.VALD_BEGN_DT                 AS 유효개시일자,
    c.VALD_END_DT                  AS 유효종료일자,
    c.SPEC_VAL_SUMUP               AS 규격값요약,
    c.JDGMNT_FNPRT_CD_NM           AS 판정형식,
    c.MXMM_VAL                     AS 최대값,
    c.MXMM_VAL_FNPRT_CD_NM         AS 이하/미만,
    c.MIMM_VAL                     AS 최소값,
    c.MIMM_VAL_FNPRT_CD_NM         AS 이상/초과,
    c.CHOIC_FIT_FNPRT_CD_NM        AS 세부적합,
    c.CHOIC_IMPROPT_FNPRT_CD_NM    AS 부적합,
    c.INJRY_YN                     AS 위해여부,
    c.UNIT_NM                      AS 단위명,
    d.PRDLST_CD                    AS 품목코드,
    d.PC_KOR_NM                    AS 품목한글명,
    d.TESTITM_CD                   AS 시험항목코드,
    d.T_KOR_NM                     AS 시험항목 한글명,
    d.FNPRT_ITM_NM                 AS 세부항목명,
    d.SPEC_VAL                     AS 기준규격값,
    d.SPEC_VAL_SUMUP               AS 기준규격값 요약,
    d.VALD_BEGN_DT                 AS 유효개시일자,
    d.VALD_END_DT                  AS 유효종료일자,
    d.SORC                         AS 출처,
    d.MXMM_VAL                     AS 최대값,
    d.MIMM_VAL                     AS 최소값,
    d.INJRY_YN                     AS 위해여부,
    d.UNIT_NM                      AS 단위명
FROM "I0940" a
LEFT JOIN "I2580" b
  ON a.SPEC_VAL_SUMUP = b.SPEC_VAL_SUMUP
LEFT JOIN "I0930" c
  ON b.SPEC_VAL_SUMUP = c.SPEC_VAL_SUMUP
LEFT JOIN "I0960" d
  ON c.SPEC_VAL_SUMUP = d.SPEC_VAL_SUMUP
WHERE a.SPEC_VAL_SUMUP IS NOT NULL AND a.SPEC_VAL_SUMUP != ''
LIMIT 30;

-- ============================================================
-- [사례 84] 농산물 부적합 적발 업소의 수거검사 이력 조회
--   (SCN_CHAIN_004)
-- ============================================================

-- 84-1. 농산물 부적합 적발 업소의 수거검사 이력 조회
--       [I0460+I0490+I2640 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRDTNM                       AS 제품명,
    a.BSSHNM                       AS 업소명,
    a.MNFDT                        AS 제조일자,
    a.DISTBTMLMT                   AS 유통/소비기한,
    a.ADDR                         AS 영업자주소,
    a.INSTT_NM                     AS 검사기관,
    a.REGSTR_TELNO                 AS 전화번호,
    a.BRCDNO                       AS 바코드번호,
    a.FRMLCUNIT                    AS 포장단위,
    a.TEST_ITMNM                   AS 부적합항목,
    a.STDR_STND                    AS 기준규격,
    a.TESTANALS_RSLT               AS 검사결과,
    a.CRET_DTM                     AS 등록일,
    a.RTRVLDSUSE_SEQ               AS 회수폐기일련번호,
    a.LCNS_NO                      AS 업체인허가번호,
    a.REPORTR_TELNO                AS 보고자전화번호,
    b.PRDTNM                       AS 제품명,
    b.RTRVLPRVNS                   AS 회수사유,
    b.BSSHNM                       AS 제조업체명,
    b.ADDR                         AS 업체주소,
    b.TELNO                        AS 전화번호,
    b.BRCDNO                       AS 바코드번호,
    b.FRMLCUNIT                    AS 포장단위,
    b.MNFDT                        AS 제조일자,
    b.RTRVLPLANDOC_RTRVLMTHD       AS 회수방법,
    b.DISTBTMLMT                   AS 유통/소비기한,
    b.PRDLST_TYPE                  AS 식품분류,
    b.IMG_FILE_PATH                AS 제품사진 URL,
    b.PRDLST_CD                    AS 품목코드,
    b.CRET_DTM                     AS 등록일,
    b.RTRVLDSUSE_SEQ               AS 회수.판매중지 일련번호,
    b.PRDLST_REPORT_NO             AS 품목제조보고번호,
    b.RTRVL_GRDCD_NM               AS 회수등급,
    b.PRDLST_CD_NM                 AS 품목유형(품목코드명),
    b.LCNS_NO                      AS 업체인허가번호,
    c.PRCSCITYPOINT_INDUTYCD_NM    AS 업종,
    c.BSSH_NM                      AS 업소명,
    c.SITE_ADDR                    AS 소재지,
    c.PRDTNM                       AS 제품명,
    c.TKAWYDTM                     AS 수거일자,
    c.JDGMNT_CD_NM                 AS 판정결과,
    c.EXC_INSTT_NM                 AS 수행기관명,
    c.TKAWYSPCI_TYPECD_NM          AS 검체구분,
    c.PRDLST_REPORT_NO             AS 품목제조보고번호,
    c.LAST_UPDT_DTM                AS 최종수정일시,
    c.TKAWYPRNO                    AS 수거증번호,
    c.PLAN_TITL                    AS 수거계획명
FROM "I2640" a
LEFT JOIN "I0490" b
  ON a.LCNS_NO = b.LCNS_NO
LEFT JOIN "I0460" c
  ON a.PRDTNM = c.PRDTNM
WHERE a.LCNS_NO IS NOT NULL AND a.LCNS_NO != ''
LIMIT 30;

-- ============================================================
-- [사례 85] 제품명 명칭 기반 전국 수거검사 및 부적합 현황 조회망
--   (SCN_016)
-- ============================================================

-- 85-1. 제품명 명칭 기반 전국 수거검사 및 부적합 현황 조회망
--       [I0460+I2620+I2640 — 1개 패턴 커버]
SELECT DISTINCT
    a.PRCSCITYPOINT_INDUTYCD_NM    AS 업종,
    a.BSSH_NM                      AS 업소명,
    a.SITE_ADDR                    AS 소재지,
    a.PRDTNM                       AS 제품명,
    a.TKAWYDTM                     AS 수거일자,
    a.JDGMNT_CD_NM                 AS 판정결과,
    a.EXC_INSTT_NM                 AS 수행기관명,
    a.TKAWYSPCI_TYPECD_NM          AS 검체구분,
    a.PRDLST_REPORT_NO             AS 품목제조보고번호,
    a.LAST_UPDT_DTM                AS 최종수정일시,
    a.TKAWYPRNO                    AS 수거증번호,
    a.PLAN_TITL                    AS 수거계획명,
    b.PRDTNM                       AS 제품명,
    b.BSSHNM                       AS 업소명,
    b.MNFDT                        AS 제조일자,
    b.DISTBTMLMT                   AS 유통/소비기한,
    b.ADDR                         AS 영업자주소,
    b.INSTT_NM                     AS 검사기관,
    b.REGSTR_TELNO                 AS 전화번호,
    b.BRCDNO                       AS 바코드번호,
    b.FRMLCUNIT                    AS 포장단위,
    b.TEST_ITMNM                   AS 부적합항목,
    b.STDR_STND                    AS 기준규격,
    b.TESTANALS_RSLT               AS 검사결과,
    b.CRET_DTM                     AS 등록일,
    b.RTRVLDSUSE_SEQ               AS 회수폐기일련번호,
    b.PRDLST_REPORT_NO             AS 품목제조보고번호,
    b.LCNS_NO                      AS 업체인허가번호,
    b.REPORTR_TELNO                AS 보고자전화번호,
    b.PRDLST_CD_NM                 AS 식품유형,
    c.PRDTNM                       AS 제품명,
    c.BSSHNM                       AS 업소명,
    c.MNFDT                        AS 제조일자,
    c.DISTBTMLMT                   AS 유통/소비기한,
    c.ADDR                         AS 영업자주소,
    c.INSTT_NM                     AS 검사기관,
    c.REGSTR_TELNO                 AS 전화번호,
    c.BRCDNO                       AS 바코드번호,
    c.FRMLCUNIT                    AS 포장단위,
    c.TEST_ITMNM                   AS 부적합항목,
    c.STDR_STND                    AS 기준규격,
    c.TESTANALS_RSLT               AS 검사결과,
    c.CRET_DTM                     AS 등록일,
    c.RTRVLDSUSE_SEQ               AS 회수폐기일련번호,
    c.LCNS_NO                      AS 업체인허가번호,
    c.REPORTR_TELNO                AS 보고자전화번호
FROM "I0460" a
LEFT JOIN "I2620" b
  ON a.PRDTNM = b.PRDTNM
LEFT JOIN "I2640" c
  ON a.PRDTNM = c.PRDTNM
WHERE a.PRDTNM IS NOT NULL AND a.PRDTNM != ''
LIMIT 30;

