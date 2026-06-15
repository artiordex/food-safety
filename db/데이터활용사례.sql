-- ============================================================
-- 식품안전나라 데이터 활용사례 - 데이터셋 연결 시나리오
-- 출처: 식품안전나라_데이터_활용사례.xlsx  /  생성일: 2026-06-15
-- ※ 각 쿼리를 개별로 실행하세요 (세미콜론 기준 구분)
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
--   I0490      회수.판매중지 정보
--   I2620      검사부적합(국내)
--   I2630      행정처분결과(식품접객업)
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
--   I2510      품목유형코드
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
-- ============================================================


-- ============================================================
-- [사례 1] 건전지 / 건강비밀(Vi-meal) / 어떠케어 / 위드페어
--   건강기능식품 정보 앱 — 품목·원료·기능성·GMP 통합 검색
-- ============================================================

-- 1-1. 건기식 품목 + 원재료  [연결키: PRDLST_REPORT_NO]
--      어떤 제품에 어떤 제형·원재료가 들어가는지 확인
SELECT
    p.LCNS_NO,
    p.BSSH_NM           AS 업소명,
    p.PRDLST_REPORT_NO  AS 품목보고번호,
    p.PRDLST_NM         AS 품목명,
    p.PRIMARY_FNCLTY    AS 주요기능성,
    p.PRDLST_CDNM       AS 품목분류,
    r.SHAP              AS 제형
FROM "I0030" p
JOIN "C003"  r ON p.PRDLST_REPORT_NO = r.PRDLST_REPORT_NO
WHERE p.PRDLST_CDNM LIKE '%비타민%'
LIMIT 30;

-- 1-2. 건기식 품목분류 + 기능성 원료인정현황  [연결키: 원료명 텍스트 매칭]
--      건강비밀·어떠케어: 원료별 기능성 인정 내용 제공
SELECT
    f.PRDCT_NM              AS 품목명,
    f.PRIMARY_FNCLTY        AS 기능성,
    f.DAY_INTK_LOWLIMIT     AS 일최소섭취,
    f.DAY_INTK_HIGHLIMIT    AS 일최대섭취,
    f.INTK_UNIT             AS 단위,
    r.FNCLTY_CN             AS 기능성원료인정내용,
    r.BSSH_NM               AS 인정업소
FROM "I2710" f
LEFT JOIN "I-0040" r ON TRIM(f.PRDCT_NM) = TRIM(r.APLC_RAWMTRL_NM)
WHERE f.PRIMARY_FNCLTY IS NOT NULL
LIMIT 30;

-- 1-3. 건기식 영양DB + 개별인정형 정보  [연결키: 원료명 텍스트 매칭]
--      건강비밀(Vi-meal): 영양 성분과 원료 인정 현황 동시 제공
SELECT
    n.SCLAS_NM              AS 원료분류,
    n.HELT_ITM_GRP_NM       AS 건강기능식품명,
    i.PRIMARY_FNCLTY        AS 기능성,
    i.DAY_INTK_HIGHLIMIT    AS 일상한섭취량,
    i.IFTKN_ATNT_MATR_CN    AS 섭취주의사항
FROM "I0760" n
LEFT JOIN "I-0050" i ON TRIM(n.HELT_ITM_GRP_NM) = TRIM(i.RAWMTRL_NM)
LIMIT 30;

-- 1-4. GMP 지정업소 + 품목 신고사항  [연결키: LCNS_NO]
--      건전지: GMP 인증 업소 제품만 필터링해 신뢰도 높은 정보 제공
SELECT
    g.BSSH_NM           AS 업소명,
    g.GMP_APPN_NO       AS GMP지정번호,
    g.APPN_DT           AS GMP지정일,
    p.PRDLST_NM         AS 제품명,
    p.PRDLST_CDNM       AS 품목분류,
    p.PRIMARY_FNCLTY    AS 기능성
FROM "I0630" g
JOIN "I0030" p ON g.LCNS_NO = p.LCNS_NO
WHERE g.APPN_CANCL_DT IS NULL OR g.APPN_CANCL_DT = ''
LIMIT 30;


-- ============================================================
-- [사례 2] H-wis(현대그린푸드) / 농심 / 삼성 웰스토리 / BGF리테일 / 워치독
--   식품 위해정보 실시간 모니터링 — 행정처분·회수·부적합 통합 관리 (값조회x)
-- ============================================================

-- 2-1. 행정처분 + 인허가 업소  [연결키: LCNS_NO]
--      H-wis·농심: 거래처 업소의 처분 이력 파악
SELECT
    a.PRCSCITYPOINT_BSSHNM  AS 업소명,
    a.LCNS_NO               AS 허가번호,
    a.INDUTY_CD_NM          AS 업종,
    a.DSPS_DCSNDT           AS 처분결정일,
    a.DSPS_TYPECD_NM        AS 처분유형,
    a.VILTCN                AS 위반내용,
    u.ADDR                  AS 업소주소
FROM "I0470" a
JOIN "I2500" u ON a.LCNS_NO = u.LCNS_NO
ORDER BY a.DSPS_DCSNDT DESC
LIMIT 30;

-- 2-2. 검사부적합(국내) + 회수·판매중지  [연결키: BRCDNO 바코드]
--      BGF리테일 QSS: 바코드로 부적합 이력과 회수 현황 동시 조회
SELECT
    b.PRDTNM            AS 제품명,
    b.BSSHNM            AS 제조사,
    b.BRCDNO            AS 바코드,
    b.TEST_ITMNM        AS 부적합항목,
    b.TESTANALS_RSLT    AS 검사결과,
    r.RTRVLPRVNS        AS 회수사유,
    r.DISTBTMLMT        AS 유통기한
FROM "I2620" b
LEFT JOIN "I0490" r ON b.BRCDNO = r.BRCDNO
WHERE b.BRCDNO IS NOT NULL AND b.BRCDNO != ''
LIMIT 30;

-- 2-3. 회수·판매중지 + 행정처분 + 부적합 3종 통합  [UNION ALL]
--      농심 내부시스템: 위해이력 종합 타임라인
SELECT '회수' AS 구분, r.PRDTNM AS 제품명, r.BSSHNM AS 업소명,
       r.RTRVLPRVNS AS 사유내용, CAST(r.MNFDT AS TEXT) AS 기준일
FROM "I0490" r
UNION ALL
SELECT '행정처분', '', a.PRCSCITYPOINT_BSSHNM,
       a.VILTCN, CAST(a.DSPS_DCSNDT AS TEXT)
FROM "I0470" a
UNION ALL
SELECT '부적합', b.PRDTNM, b.BSSHNM,
       b.TEST_ITMNM, CAST(b.MNFDT AS TEXT)
FROM "I2620" b
ORDER BY 기준일 DESC
LIMIT 50;

-- 2-4. 검사부적합 + 시험항목코드  [연결키: TESTITM_NM]
--      농심·삼성 웰스토리: 시험항목 영문명·분류 정보 보강
SELECT
    b.PRDTNM            AS 제품명,
    b.TEST_ITMNM        AS 시험항목,
    t.ENG_NM            AS 영문명,
    t.M_KOR_NM          AS 중분류,
    t.L_KOR_NM          AS 대분류,
    b.STDR_STND         AS 기준규격,
    b.TESTANALS_RSLT    AS 검사결과
FROM "I2620" b
LEFT JOIN "I2530" t ON b.TEST_ITMNM = t.TESTITM_NM
LIMIT 30;


-- ============================================================
-- [사례 3] 먹깨비 / 한눈에 강동 / REDTABLE / 대구광역시 / 요기요 / 네이버 플레이스
--   식품접객업소 위생·인허가 정보 서비스 (값조회x)
-- ============================================================

-- 3-1. 식품접객업 인허가 + 위생등급  [연결키: LCNS_NO]
--      먹깨비·REDTABLE: 배달·관광 플랫폼에 위생등급 표시
SELECT
    i.BSSH_NM           AS 업소명,
    i.LCNS_NO           AS 허가번호,
    i.INDUTY_NM         AS 업종,
    i.LOCP_ADDR         AS 주소,
    i.TELNO             AS 전화번호,
    g.HG_ASGN_LV        AS 위생등급,
    g.HG_ASGN_NO        AS 등급지정번호,
    g.HG_ASGN_YMD       AS 지정일
FROM "I1200" i
LEFT JOIN "C004" g ON i.LCNS_NO = g.LCNS_NO
WHERE g.HG_ASGN_LV IS NOT NULL
LIMIT 30;

-- 3-2. 식품접객업 + 행정처분(식품접객업)  [연결키: LCNS_NO]
--      요기요·네이버 플레이스: 음식점 처분 이력 실시간 반영
SELECT
    i.BSSH_NM           AS 업소명,
    i.LOCP_ADDR         AS 주소,
    i.INDUTY_NM         AS 업종,
    a.DSPS_TYPECD_NM    AS 처분유형,
    a.VILTCN            AS 위반내용,
    a.DSPS_DCSNDT       AS 처분결정일,
    a.DSPS_BGNDT        AS 처분시작일,
    a.DSPS_ENDDT        AS 처분종료일
FROM "I1200" i
JOIN "I2630" a ON i.LCNS_NO = a.LCNS_NO
ORDER BY a.DSPS_DCSNDT DESC
LIMIT 30;

-- 3-3. 위생등급 + 행정처분 + 인허가 3중 연결  [연결키: LCNS_NO]
--      한국관광공사: 위생등급 우수 업소 중 최근 2년 처분 이력 없는 곳 추천
SELECT
    i.BSSH_NM           AS 업소명,
    i.LOCP_ADDR         AS 주소,
    g.HG_ASGN_LV        AS 위생등급,
    g.HG_ASGN_YMD       AS 등급지정일,
    COUNT(a.LCNS_NO)    AS 최근처분건수
FROM "I1200" i
JOIN "C004" g ON i.LCNS_NO = g.LCNS_NO
LEFT JOIN "I2630" a ON i.LCNS_NO = a.LCNS_NO
    AND CAST(a.DSPS_DCSNDT AS TEXT) >= '20240101'
WHERE g.HG_ASGN_LV IN ('매우 우수', '우수')
GROUP BY i.LCNS_NO, i.BSSH_NM, i.LOCP_ADDR, g.HG_ASGN_LV, g.HG_ASGN_YMD
HAVING 최근처분건수 = 0
LIMIT 30;


-- ============================================================
-- [사례 4] 듀얼케어 / 하루다이어트 / 메이킷 / 쉐어홈트 / NUGU(SKT)
--   영양성분·식단관리·레시피 앱
-- ============================================================

-- 4-1. 식품영양성분DB + 레시피DB  [연결키: 음식명 텍스트 매칭]
--      NUGU(SKT)·어떠케어: 레시피 음식의 영양 성분 자동 계산
SELECT
    r.RCP_NM            AS 레시피명,
    r.RCP_WAY2          AS 조리방법,
    r.RCP_PAT2          AS 요리분류,
    r.INFO_ENG          AS 레시피열량_kcal,
    n.FOOD_NM_KR        AS 매칭식품명,
    n.DB_CLASS_NM       AS 식품분류
FROM "COOKRCP01" r
LEFT JOIN "1471000" n ON TRIM(r.RCP_NM) = TRIM(n.FOOD_NM_KR)
LIMIT 30;

-- 4-2. 식품영양성분DB — 단백질 함량 높은 음식 TOP30
--      듀얼케어·하루다이어트: 특정 영양소 기준 식품 추천
SELECT
    FOOD_NM_KR          AS 식품명,
    DB_CLASS_NM         AS 분류,
    FOOD_OR_NM          AS 원산지,
    AMT_NUM1            AS 에너지_kcal,
    AMT_NUM3            AS 단백질_g,
    AMT_NUM4            AS 지방_g,
    AMT_NUM5            AS 탄수화물_g,
    AMT_NUM10           AS 나트륨_mg
FROM "1471000"
WHERE DB_CLASS_NM LIKE '%음식%'
ORDER BY CAST(AMT_NUM3 AS REAL) DESC
LIMIT 30;


-- ============================================================
-- [사례 5] 오뚜기 / 한살림 ERP / 식품 LIMS
--   식품제조·기준규격 정보 시스템
-- ============================================================

-- 5-1. 품목유형코드 + 개별기준규격  [연결키: PRDLST_CD]
--      오뚜기·LIMS: 제품 유형에 따른 기준규격 자동 매핑
SELECT
    c.KOR_NM            AS 품목유형명,
    c.PRDLST_CD         AS 품목유형코드,
    s.TESTITM_NM        AS 시험항목,
    s.SPEC_VAL          AS 기준값,
    s.VALD_BEGN_DT      AS 기준적용시작일
FROM "I2510" c
JOIN "I2580" s ON c.PRDLST_CD = s.PRDLST_CD
WHERE c.LV = 3
LIMIT 30;

-- 5-2. 시험항목코드 + 공통기준규격  [연결키: TESTITM_CD]
--      LIMS: 시험 완료 후 기준 적합 여부 자동 판정
SELECT
    t.KOR_NM            AS 시험항목명,
    t.ENG_NM            AS 영문명,
    g.PRDLST_CD_NM      AS 적용품목유형,
    g.SPEC_NM           AS 규격구분,
    g.SPEC_VAL          AS 기준값,
    g.PIAM_KOR_NM       AS 단위
FROM "I2530" t
JOIN "I2600" g ON t.TESTITM_CD = g.TESTITM_CD
LIMIT 30;

-- 5-3. 식품 품목제조보고 + 축산물 품목제조정보 통합  [UNION ALL]
--      오뚜기: 경쟁사 신제품 출시 현황 모니터링 (식품 + 축산물)
SELECT
    '식품' AS 구분,
    f.LCNS_NO, f.BSSH_NM AS 업소명, f.PRDLST_NM AS 제품명,
    f.PRDLST_DCNM AS 품목유형, CAST(f.PRMS_DT AS TEXT) AS 신고일
FROM "I1250" f
UNION ALL
SELECT
    '축산물',
    a.LCNS_NO, a.BSSH_NM, a.PRDLST_NM,
    a.PRDLST_DCNM, CAST(a.PRMS_DT AS TEXT)
FROM "I1310" a
ORDER BY 신고일 DESC
LIMIT 50;

-- 5-4. 한살림 ERP: 식품원재료코드 + 품목유형코드  [연결키: 원재료분류명]
SELECT
    r.RPRSNT_RAWMTRL_NM AS 원재료명,
    r.RAWMTRL_LCLAS_NM  AS 원재료분류,
    p.KOR_NM            AS 품목유형명,
    p.PRDLST_CD         AS 품목유형코드
FROM "I2520" r
LEFT JOIN "I2510" p ON r.RAWMTRL_LCLAS_NM = p.KOR_NM
LIMIT 30;


-- ============================================================
-- [사례 6] 토스(Toss) / 푸드비투비(FoodB2B)
--   식품 판매자 인허가 사전 검수 및 B2B 거래처 검증
-- ============================================================

-- 6-1. 인허가 업소 + 건기식판매업 + HACCP 지정 통합  [연결키: LCNS_NO]
--      토스: 식품 판매자의 인허가·HACCP 인증 상태 한번에 확인
SELECT
    u.BSSH_NM           AS 업소명,
    u.LCNS_NO           AS 허가번호,
    u.INDUTY_CD_NM      AS 업종,
    u.ADDR              AS 주소,
    hf.INDUTY_NM        AS 건기식판매업종,
    hf.PRMS_DT          AS 건기식신고일,
    h.HACCP_APPN_NO     AS HACCP지정번호,
    h.HACCP_APPN_DT     AS HACCP지정일
FROM "I2500" u
LEFT JOIN "I1290" hf ON u.LCNS_NO = hf.LCNS_NO
LEFT JOIN "I0580" h  ON u.LCNS_NO = h.LCNS_NO
WHERE u.INDUTY_CD_NM LIKE '%건강기능식품%'
LIMIT 30;

-- 6-2. 수입식품영업신고 + 수입식품업 폐업정보  [연결키: LCNS_NO]
--      토스: 수입식품 판매자의 현재 영업 상태 검증
SELECT
    i.LCNS_NO           AS 허가번호,
    i.BSSH_NM           AS 업소명,
    i.INDUTY_NM         AS 업종,
    i.PRMS_DT           AS 신고일,
    CASE WHEN c.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태,
    c.CLSBIZ_DT         AS 폐업일
FROM "C001" i
LEFT JOIN "I2821" c ON i.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 6-3. 여러 업종 폐업·인허가 통합 현황  [UNION ALL]
--      토스: 식품소분업·건기식·식육즉석판매업·수입식품 일괄 검수
SELECT '식품소분업' AS 업종구분, LCNS_NO, BSSH_NM, INDUTY_NM,
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
LIMIT 100;

-- 6-4. 푸드비투비: HACCP + 건기식판매업 + 수입식품영업 + 식품제조가공업 통합  [UNION ALL]
SELECT '건기식판매업' AS 업종구분, LCNS_NO, BSSH_NM AS 업소명, INDUTY_NM AS 업종세목,
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
LIMIT 100;


-- ============================================================
-- [사례 7] 큐마켓 / SK스토아 / BGF리테일 (값조회x)
--   바코드 기반 제품 정보·이력추적 서비스
-- ============================================================

-- 7-1. 유통바코드 + 바코드연계제품정보  [연결키: BRCD_NO = BAR_CD]
--      큐마켓: 바코드 스캔으로 제품 유형·유통기한·제조사 즉시 확인
SELECT
    b.BRCD_NO           AS 바코드,
    b.PRDT_NM           AS 제품명,
    b.CMPNY_NM          AS 제조사,
    b.PRDLST_NM         AS 품목유형,
    p.PRDLST_REPORT_NO  AS 품목보고번호,
    p.POG_DAYCNT        AS 유통기한,
    p.END_DT            AS 보고종료일
FROM "I2570" b
LEFT JOIN "C005" p ON b.BRCD_NO = p.BAR_CD
LIMIT 30;

-- 7-2. 이력추적관리 + 유통바코드  [연결키: PDT_BARCD = BRCD_NO]
--      BGF리테일: 이력추적 제품의 바코드로 제조~유통 전 단계 추적
SELECT
    t.PDT_NM            AS 제품명,
    t.PDT_BARCD         AS 제품바코드,
    t.PRDLST_REPORT_NO  AS 품목보고번호,
    t.FOOD_HISTRACE_NUM AS 이력추적번호,
    t.FOOD_TYPE         AS 식품유형,
    b.CMPNY_NM          AS 제조사,
    b.PRDLST_NM         AS 바코드상품분류
FROM "I0320" t
LEFT JOIN "I2570" b ON t.PDT_BARCD = b.BRCD_NO
LIMIT 30;


-- ============================================================
-- [사례 8] 한국외식업중앙회 / 에그스토리 (값조회x)
--   업소 위생교육 + 인허가 현황 연동
-- ============================================================

-- 8-1. 식품접객업 + 식품위생교육내역  [연결키: LCNS_NO]
--      한국외식업중앙회: 교육 이수 업소와 인허가 현황 대조
SELECT
    i.BSSH_NM           AS 업소명,
    i.LCNS_NO           AS 허가번호,
    i.INDUTY_NM         AS 업종,
    i.LOCP_ADDR         AS 주소,
    e.INSTT_CD_NM       AS 교육기관,
    e.EDC_TYPE_NM       AS 교육유형,
    e.COMPL_DTM         AS 교육이수일
FROM "I1200" i
LEFT JOIN "I1560" e ON i.LCNS_NO = e.LCNS_NO
WHERE e.COMPL_DTM >= '20240101'
LIMIT 30;

-- 8-2. 위생등급 + 위생교육 이수 현황  [연결키: LCNS_NO]
--      한국외식업중앙회: 위생등급 지정 업소의 교육 이수 횟수 파악
SELECT
    i.BSSH_NM           AS 업소명,
    i.LCNS_NO,
    g.HG_ASGN_LV        AS 위생등급,
    COUNT(e.LCNS_NO)    AS 교육이수횟수
FROM "I1200" i
LEFT JOIN "C004"  g ON i.LCNS_NO = g.LCNS_NO
LEFT JOIN "I1560" e ON i.LCNS_NO = e.LCNS_NO
WHERE g.HG_ASGN_LV IS NOT NULL
GROUP BY i.LCNS_NO, i.BSSH_NM, g.HG_ASGN_LV
ORDER BY 교육이수횟수 DESC
LIMIT 30;


-- ============================================================
-- 주요 연결 키 요약
-- ============================================================
-- LCNS_NO (업소허가번호)
--   I2500 ↔ I0470 ↔ I2620(부적합-업소명) ↔ I1200 ↔ C004 ↔ I2630
--   I2500 ↔ I0580(HACCP) ↔ I0630(GMP) ↔ I1290(건기식판매업)
--   I1200 ↔ I1560(위생교육) ↔ C001(수입식품영업)
--
-- PRDLST_REPORT_NO (품목보고번호)
--   I0030 ↔ C003 ↔ C005(바코드연계) ↔ I0320(이력추적) ↔ I1250
--
-- BAR_CD / BRCD_NO (바코드)
--   I2570 ↔ C005 ↔ I0490(회수) ↔ I2620(부적합)
--
-- PRDLST_CD (품목유형코드)
--   I2510 ↔ I2580(개별기준규격) ↔ I2600(공통기준규격)
--
-- TESTITM_CD (시험항목코드)
--   I2530 ↔ I2580 ↔ I2600
--
-- FOOD_NM_KR / RCP_NM (식품·레시피명, 텍스트 매칭)
--   1471000 ↔ COOKRCP01
