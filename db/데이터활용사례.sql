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
-- ============================================================


-- ============================================================
-- [사례 1] 건전지 / 건강비밀(Vi-meal) / 어떠케어 / 위드페어
--   건강기능식품 정보 앱 — 품목·원료·기능성·GMP 통합 검색
-- ============================================================

-- 1-1. 건기식 품목 + 원재료  [연결키: PRDLST_REPORT_NO]
--      어떤 제품에 어떤 제형·원재료가 들어가는지 확인
--      ※ I0030.PRDLST_CDNM 컬럼은 미적재 — PRIMARY_FNCLTY 로 필터링
SELECT
    p.LCNS_NO,
    p.BSSH_NM           AS 업소명,
    p.PRDLST_REPORT_NO  AS 품목보고번호,
    p.PRDLST_NM         AS 품목명,
    p.PRIMARY_FNCLTY    AS 주요기능성,
    p.PRDLST_CDNM       AS 품목분류,
    r.SHAP              AS 제형
FROM "I0030" p
LEFT JOIN "C003"  r ON p.PRDLST_REPORT_NO = r.PRDLST_REPORT_NO
WHERE p.PRIMARY_FNCLTY LIKE '%비타민%'
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

-- 2-1. 행정처분 + 인허가 업소  [연결키: LCNS_NO] (값조회x)
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

-- 2-2. 검사부적합(국내) + 회수·판매중지  [연결키: BRCDNO 바코드] (값조회x)
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

-- 2-3. 회수·판매중지 + 행정처분 + 부적합 3종 통합  [UNION ALL] (값조회x)
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

-- 2-4. 검사부적합 + 시험항목코드  [연결키: TESTITM_NM] (값조회x)
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

-- 3-1. 식품접객업 인허가 + 위생등급  [연결키: LCNS_NO] (값조회x)
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

-- 3-2. 식품접객업 + 행정처분(식품접객업)  [연결키: LCNS_NO] (값조회x)
--      요기요·네이버 플레이스: 음식점 처분 이력 실시간 반영
--      ※ I1200(997건)·I2630(993건) 적재됨. 단 현재 DB 데이터 범위 비겹침으로 JOIN 결과 0건
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

-- 3-3. 위생등급 + 행정처분 + 인허가 3중 연결  [연결키: LCNS_NO] (값조회x)
--      한국관광공사: 위생등급 우수 업소 중 최근 2년 처분 이력 없는 곳 추천
--      ※ I1200(997건)·I2630(993건) 적재됨. 단 현재 DB 데이터 범위 비겹침으로 JOIN 결과 0건
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

-- 4-2. 식품영양성분DB — 단백질 함량 높은 식품 TOP30
--      듀얼케어·하루다이어트: 특정 영양소 기준 식품 추천
--      ※ 1471000.DB_CLASS_NM 값은 '품목대표' 단일값 — 별도 필터 불필요
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
ORDER BY CAST(AMT_NUM3 AS REAL) DESC
LIMIT 30;


-- ============================================================
-- [사례 5] 제품 유형·공통기준규격 연계
--   식품제조·기준규격 정보 시스템
-- ============================================================

-- 5-1. 품목유형코드 + 공통기준규격  [연결키: PRDLST_CD → I2600]
--      제품 유형에 따른 공통기준규격 자동 매핑
--      ※ I2510(A-prefix)↔I2580(D-prefix) 코드체계 불일치 → I2600(공통기준규격) 으로 대체
SELECT
    c.KOR_NM            AS 품목유형명,
    c.PRDLST_CD         AS 품목유형코드,
    g.TESTITM_NM        AS 시험항목,
    g.SPEC_VAL          AS 기준값,
    g.PIAM_KOR_NM       AS 단위,
    g.VALD_BEGN_DT      AS 기준적용시작일
FROM "I2510" c
JOIN "I2600" g ON c.PRDLST_CD = g.PRDLST_CD
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
--      경쟁사 신제품 출시 현황 모니터링 (식품 + 축산물)
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

-- 5-4. 식품원재료코드 + 품목유형코드
--      ⚠️ I2520.RAWMTRL_LCLAS_NM 값이 '식품원료(A코드)' 단일값으로 I2510.KOR_NM과 실질적 연결 불가
--      두 테이블 간 공통 JOIN 키 없음 — 쿼리 비활성화
-- SELECT
--     r.RPRSNT_RAWMTRL_NM AS 원재료명,
--     r.RAWMTRL_LCLAS_NM  AS 원재료분류,
--     p.KOR_NM            AS 품목유형명,
--     p.PRDLST_CD         AS 품목유형코드
-- FROM "I2520" r
-- LEFT JOIN "I2510" p ON r.RAWMTRL_LCLAS_NM = p.KOR_NM
-- LIMIT 30;


-- ============================================================
-- [사례 6] 토스(Toss) / 푸드비투비(FoodB2B)
--   식품 판매자 인허가 사전 검수 및 B2B 거래처 검증
-- ============================================================

-- 6-1. 건기식판매업 + 인허가 업소 + HACCP 지정 통합  [연결키: LCNS_NO]
--      토스: 식품 판매자의 인허가·HACCP 인증 상태 한번에 확인
--      ※ I2500.INDUTY_CD_NM 에 '건강기능식품' 값 없음 → I1290(건기식판매업) 을 드라이빙 테이블로 변경
SELECT
    hf.BSSH_NM          AS 업소명,
    hf.LCNS_NO           AS 허가번호,
    hf.INDUTY_NM         AS 건기식판매업종,
    hf.PRMS_DT           AS 건기식신고일,
    u.ADDR               AS 주소,
    u.INDUTY_CD_NM       AS 업종,
    h.HACCP_APPN_NO      AS HACCP지정번호,
    h.HACCP_APPN_DT      AS HACCP지정일
FROM "I1290" hf
LEFT JOIN "I2500" u  ON hf.LCNS_NO = u.LCNS_NO
LEFT JOIN "I0580" h  ON hf.LCNS_NO = h.LCNS_NO
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

-- 7-1. 유통바코드 + 바코드연계제품정보  [연결키: BRCD_NO = BAR_CD] (값조회x)
--      큐마켓: 바코드 스캔으로 제품 유형·유통기한·제조사 즉시 확인
--      ※ I2570(964건)·C005(949건) 적재됨. BRCD_NO↔BAR_CD 크로스키 JOIN 14건 매칭
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

-- 7-2. 이력추적관리 + 유통바코드  [연결키: PDT_BARCD = BRCD_NO] (값조회x)
--      BGF리테일: 이력추적 제품의 바코드로 제조~유통 전 단계 추적
--      ※ I0320(534건)·I2570(964건) 적재됨. 단 PDT_BARCD↔BRCD_NO 현재 매칭값 없음 (JOIN 0건)
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

-- 8-1. 식품접객업 + 식품위생교육내역  [연결키: LCNS_NO] (값조회x)
--      한국외식업중앙회: 교육 이수 업소와 인허가 현황 대조
--      ※ I1200(997건) 적재됨. 단 LCNS_NO 포맷 불일치로 현재 JOIN 결과 0건
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

-- 8-2. 위생등급 + 위생교육 이수 현황  [연결키: LCNS_NO] (값조회x)
--      한국외식업중앙회: 위생등급 지정 업소의 교육 이수 횟수 파악
--      ※ I1200(997건) 적재됨. 단 LCNS_NO 포맷 불일치로 현재 JOIN 결과 0건
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
-- [사례 9] 개별기준규격·시험항목·처분기준 연계
--   기준규격 계열 — 개별기준규격 + 공통기준종류 + 공통기준제외
-- ============================================================

-- 9-1. 개별기준규격 + 시험항목코드  [연결키: TESTITM_CD]
--      식품 LIMS·LIMS: 품목별 개별 기준규격과 시험항목 상세 조회
SELECT
    s.INDV_SPEC_SEQ     AS 개별기준규격일련번호,
    s.PRDLST_CD         AS 품목분류코드,
    s.PRDLST_CD_NM      AS 품목명,
    s.TESTITM_CD        AS 시험항목코드,
    s.TESTITM_NM        AS 시험항목명,
    s.SPEC_VAL          AS 기준규격,
    t.KOR_NM            AS 시험항목한글명
FROM "I2580" s
LEFT JOIN "I2530" t ON s.TESTITM_CD = t.TESTITM_CD
LIMIT 30;

-- 9-2. 공통기준종류 계층 구조  [연결키: CMMN_SPEC_CD → HRNK_CMMN_SPEC_CD]
--      LIMS: 공통기준규격의 상위-하위 계층 구조 파악
SELECT
    c.CMMN_SPEC_CD          AS 기준규격코드,
    c.SPEC_NM               AS 기준규격명,
    c.HRNK_CMMN_SPEC_CD     AS 상위코드,
    p.SPEC_NM               AS 상위기준규격명,
    c.LV                    AS 레벨,
    c.DFN                   AS 정의
FROM "I2590" c
LEFT JOIN "I2590" p ON c.HRNK_CMMN_SPEC_CD = p.CMMN_SPEC_CD
WHERE c.LV = 2
LIMIT 30;

-- 9-3. 공통기준제외 + 공통기준규격  [연결키: CMMN_SPEC_CD + TESTITM_CD]
--      특정 품목에서 제외되는 기준규격 확인
SELECT
    x.CMMN_SPEC_CD      AS 공통기준규격코드,
    x.SPEC_NM           AS 기준규격명,
    x.PRDLST_CD         AS 품목코드,
    x.KOR_NM            AS 한글명,
    x.TESTITM_CD        AS 시험항목코드,
    r.SPEC_VAL          AS 공통기준규격값
FROM "I2610" x
LEFT JOIN "I2600" r ON x.CMMN_SPEC_CD = r.CMMN_SPEC_CD
                    AND x.TESTITM_CD   = r.TESTITM_CD
LIMIT 30;


-- ============================================================
-- [사례 10] 농심 (내부 구축 시스템)
--   HACCP 교육훈련기관 + HACCP 적용업소 연동
-- ============================================================

-- 10-1. HACCP 교육훈련기관 + HACCP 적용업소  [연결키: LCNS_NO]
--       농심: HACCP 인증 업소가 이용한 교육훈련기관 파악
SELECT
    h.BSSH_NM               AS HACCP_업소명,
    h.LCNS_NO               AS 인허가번호,
    h.INDUTY_CD_NM          AS 업종,
    e.BSSH_NM               AS 교육훈련기관명,
    e.EDC_INSTT_APPN_NO     AS 기관지정번호,
    e.BSSH_ADDR             AS 기관주소
FROM "I0580" h
LEFT JOIN "I0600" e ON h.LCNS_NO = e.EDC_INSTT_APPN_NO
LIMIT 30;

-- 10-2. HACCP 교육훈련기관 단독 조회
--       농심: 기관별 지정 현황 목록
SELECT
    EDC_INSTT_APPN_NO   AS 지정번호,
    BSSH_NM             AS 기관명,
    BSSH_ADDR           AS 주소,
    PRSDNT_NM           AS 대표자,
    PRMS_DT             AS 허가일자
FROM "I0600"
LIMIT 30;


-- ============================================================
-- [사례 11] 토스(Toss) — 영업 인허가 + 폐업 통합 현황
--   식품등수입판매업 / 식품제조가공업 폐업 / 식육즉석판매가공업 인허가
-- ============================================================

-- 11-1. 식품등수입판매업정보 + 인허가 업소  [연결키: LCNS_NO]
--       토스: 수입판매업체 인허가 상태 종합 확인
SELECT
    i.LCNS_NO           AS 인허가번호,
    i.BSSH_NM           AS 업소명,
    i.INDUTY_NM         AS 업종,
    i.PRMS_DT           AS 허가일자,
    h.INDUTY_CD_NM      AS 인허가_업종분류,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I1260" i
LEFT JOIN "I2500" h ON i.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 11-2. 식품제조가공업 폐업정보  [단독 조회]
--       토스: 폐업 처리된 식품제조가공업체 현황
SELECT
    LCNS_NO     AS 인허가번호,
    BSSH_NM     AS 업소명,
    PRSDNT_NM   AS 대표자명,
    INDUTY_NM   AS 업종,
    PRMS_DT     AS 허가일자
FROM "I2811"
ORDER BY PRMS_DT DESC
LIMIT 30;

-- 11-3. 식육즉석판매가공업 인허가 대장  [단독 조회]
--       토스: 식육즉석판매가공업 현행 인허가 목록
SELECT
    LCNS_NO     AS 인허가번호,
    BSSH_NM     AS 업소명,
    PRSDNT_NM   AS 대표자명,
    INDUTY_NM   AS 업종,
    PRMS_DT     AS 허가일자
FROM "I2835"
ORDER BY PRMS_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 12] 푸드비투비(FoodB2B) — 식품업체 통합 인허가 현황
--   기구.용기포장제조업 / 식품첨가물제조업 / 축산물 가공업허가 / 축산물HACCP
-- ============================================================

-- 12-1. 기구.용기포장제조업 + 인허가 업소  [연결키: LCNS_NO]
--       푸드비투비: 기구·용기·포장 제조업체 인허가 현황
SELECT
    k.LCNS_NO       AS 인허가번호,
    k.BSSH_NM       AS 업소명,
    k.INDUTY_NM     AS 업종,
    k.PRMS_DT       AS 허가일자,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I1240" k
LEFT JOIN "I2500" h ON k.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 12-2. 식품첨가물제조업 + 인허가 업소  [연결키: LCNS_NO]
--       푸드비투비: 식품첨가물 제조업체 인허가 현황
SELECT
    a.LCNS_NO       AS 인허가번호,
    a.BSSH_NM       AS 업소명,
    a.INDUTY_NM     AS 업종,
    a.PRMS_DT       AS 허가일자,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I1230" a
LEFT JOIN "I2500" h ON a.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 12-3. 축산물 가공업허가정보 + 축산물HACCP 지정정보  [연결키: LCNS_NO]
--       BGF리테일·푸드비투비: 축산물 가공업체의 HACCP 지정 여부 교차 확인
SELECT
    m.LCNS_NO           AS 인허가번호,
    m.BSSH_NM           AS 업소명,
    m.INDUTY_NM         AS 업종,
    m.PRMS_DT           AS 허가일자,
    h.INDUTY_CD_NM      AS HACCP_업종,
    h.CLSBIZ_DVS_CD_NM  AS HACCP_영업상태
FROM "I1300" m
LEFT JOIN "I0610" h ON m.LCNS_NO = h.LCNS_NO
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
--   I2510 ↔ I2600(공통기준규격)  [A-prefix 코드 공유]
--   I2580(개별기준규격, D-prefix) ↔ I2590(공통기준종류, CMMN_SPEC_CD)  [별도 코드체계]
--
-- TESTITM_CD (시험항목코드)
--   I2530 ↔ I2580 ↔ I2600
--
-- FOOD_NM_KR / RCP_NM (식품·레시피명, 텍스트 매칭)
--   1471000 ↔ COOKRCP01

-- ============================================================
-- [사례 13] 위생용품 이력 관리
--   위생용품 품목 등록·원재료·생산실적 통합 조회
-- ============================================================

-- 13-1. 위생용품 품목제조 + 영업정보  [연결키: LCNS_NO]
--       위생용품 납품업체의 품목등록 현황과 업체 기본정보 통합 조회
SELECT
    p.BSSH_NM           AS 업소명,
    p.PRDLST_REPORT_NO  AS 품목보고번호,
    p.PRDLST_NM         AS 제품명,
    p.PRDLST_DCNM       AS 제품유형,
    p.PRMS_DT           AS 보고일자,
    e.INDUTY_NM         AS 업종,
    e.LOCP_ADDR         AS 소재지,
    e.TELNO             AS 전화번호
FROM "I2711" p
JOIN "I2713" e ON p.LCNS_NO = e.LCNS_NO
LIMIT 30;

-- 13-2. 위생용품 원재료 + 완제품 연결  [연결키: PRDLST_REPORT_NO]
--       위생용품 완제품과 사용 원재료 대조 확인
SELECT
    p.PRDLST_NM         AS 완제품명,
    p.PRDLST_DCNM       AS 제품유형,
    r.RAWMTRL_NM        AS 원재료명
FROM "I2711" p
JOIN "I2712" r ON p.PRDLST_REPORT_NO = r.PRDLST_REPORT_NO
LIMIT 30;

-- 13-3. 위생용품 생산실적 + 영업정보  [연결키: LCNS_NO]
--       연도별 위생용품 생산실적과 업체 현황 통합 조회
SELECT
    s.EVL_YR            AS 평가연도,
    s.BSSH_NM           AS 업소명,
    s.PRDLST_NM         AS 제품명,
    s.PRDCTN_QY         AS 생산량,
    e.INDUTY_NM         AS 업종,
    e.LOCP_ADDR         AS 소재지
FROM "I2851" s
JOIN "I2713" e ON s.LCNS_NO = e.LCNS_NO
ORDER BY s.EVL_YR DESC, s.PRDCTN_QY DESC
LIMIT 30;


-- ============================================================
-- [사례 14] 영업소 위치·변경 이력 관리
--   영업소 위치·변경 이력 기반 지도·음식점 서비스
-- ============================================================

-- 14-1. 영업소재지 GIS 코드 + 인허가 업소  [연결키: LCNS_NO]
--       영업소 상세 주소(도로명·지번) + 인허가 업종 정보 지도 표출
SELECT
    g.BSSH_NM               AS 업소명,
    g.LOCPLC                AS 지번주소,
    g.ROADNMADDREMDCD       AS 도로명주소코드,
    g.PNU_CD                AS PNU코드,
    h.INDUTY_CD_NM          AS 업종
FROM "I2560" g
JOIN "I2500" h ON g.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 14-2. 음식점 인허가 변경 이력 + 식품접객업  [연결키: LCNS_NO]
--       음식점 상호·주소 변경 이력 실시간 반영
SELECT
    i.BSSH_NM           AS 현재업소명,
    i.INDUTY_NM         AS 업종,
    i.LOCP_ADDR         AS 현재주소,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용,
    c.CHNG_PRVNS        AS 변경사유
FROM "I1200" i
JOIN "I2861" c ON i.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;

-- 14-3. 식품판매업 인허가 현황  [연결키: LCNS_NO]
--       식품판매업소 인허가 상태 확인
SELECT
    s.LCNS_NO           AS 인허가번호,
    s.BSSH_NM           AS 업소명,
    s.INDUTY_NM         AS 업종,
    s.PRMS_DT           AS 허가일자,
    s.LOCP_ADDR         AS 소재지,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I2832" s
LEFT JOIN "I2500" h ON s.LCNS_NO = h.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 15] 공전 시험기준·시험항목 통합 조회
--   공전 시험기준 + 시험항목코드 연계
-- ============================================================

-- 15-1. 식품첨가물공전 + 시험항목코드  [연결키: TESTITM_CD]
--       식품첨가물 품목별 시험기준 항목 상세 조회
SELECT
    s.PC_KOR_NM         AS 품목명,
    s.TESTITM_CD        AS 시험항목코드,
    t.KOR_NM            AS 시험항목한글명,
    s.SPEC_VAL          AS 기준규격,
    s.UNIT_NM           AS 단위,
    s.INJRY_YN          AS 위해여부
FROM "I0950" s
LEFT JOIN "I2530" t ON s.TESTITM_CD = t.TESTITM_CD
LIMIT 30;

-- 15-2. 건강기능식품공전 + 시험항목코드  [연결키: TESTITM_CD]
--       건강기능식품 기준규격별 시험항목 조회
SELECT
    s.PC_KOR_NM         AS 품목명,
    s.TESTITM_CD        AS 시험항목코드,
    t.KOR_NM            AS 시험항목한글명,
    s.SPEC_VAL          AS 기준규격,
    s.UNIT_NM           AS 단위
FROM "I0960" s
LEFT JOIN "I2530" t ON s.TESTITM_CD = t.TESTITM_CD
LIMIT 30;

-- 15-3. 기구·용기·포장 공전 + 시험항목코드  [연결키: TESTITM_CD]
--       기구·용기·포장 재질별 시험기준 조회
SELECT
    s.PC_KOR_NM         AS 품목명,
    s.TESTITM_CD        AS 시험항목코드,
    t.KOR_NM            AS 시험항목한글명,
    s.SPEC_VAL          AS 기준규격,
    s.UNIT_NM           AS 단위
FROM "I0940" s
LEFT JOIN "I2530" t ON s.TESTITM_CD = t.TESTITM_CD
LIMIT 30;


-- ============================================================
-- [사례 16] 식품 생산실적 통계 분석
--   식품 생산실적 통계 분석
-- ============================================================

-- 16-1. 식품(첨가물) 품목제조보고 원재료 + 제조업체  [연결키: LCNS_NO]
--       제조업체별 사용 원재료 현황 분석
SELECT
    r.BSSH_NM           AS 업소명,
    r.PRDLST_NM         AS 품목명,
    r.RAWMTRL_NM        AS 원재료명,
    m.LOCP_ADDR         AS 소재지
FROM "C002" r
JOIN "I1220" m ON r.LCNS_NO = m.LCNS_NO
LIMIT 30;

-- 16-2. 식품·식품첨가물 생산실적 + 제조업체  [연결키: LCNS_NO]
--       연도별 생산실적 현황과 업체 정보 통합 분석
SELECT
    p.EVL_YR            AS 평가연도,
    p.BSSH_NM           AS 업소명,
    p.H_ITEM_NM         AS 대분류,
    p.PRDLST_NM         AS 품목명,
    p.PRDCTN_QY         AS 생산량,
    m.LOCP_ADDR         AS 소재지
FROM "I0300" p
JOIN "I1220" m ON p.LCNS_NO = m.LCNS_NO
ORDER BY p.EVL_YR DESC, p.PRDCTN_QY DESC
LIMIT 30;

-- 16-3. 건강기능식품 생산실적 + 품목제조신고  [연결키: PRDLST_REPORT_NO]
--       건강기능식품 품목별 연도별 생산량 추적
SELECT
    r.EVL_YR            AS 평가연도,
    r.BSSH_NM           AS 업소명,
    r.PRDLST_NM         AS 제품명,
    r.PRDCTN_QY         AS 생산량,
    d.PRMS_DT           AS 신고일자
FROM "I0310" r
JOIN "I0030" d ON r.PRDLST_REPORT_NO = d.PRDLST_REPORT_NO
ORDER BY r.EVL_YR DESC
LIMIT 30;


-- ============================================================
-- [사례 17] 식약처 법규·집행 정보 시스템
--   처분기준·과태료 코드 연계
-- ============================================================

-- 17-1. 처분기준코드 계층 구조  [연결키: HRNK_DSPS_STDR_CD → DSPS_STDR_CD]
--       처분기준 상위-하위 계층 전체 조회
SELECT
    c.DSPS_STDR_CD      AS 처분기준코드,
    c.DSPS_STDR_CD_NM   AS 처분기준명,
    c.LV_NO             AS 레벨,
    p.DSPS_STDR_CD_NM   AS 상위처분기준명,
    c.VILT_TYPE_CD_NM   AS 위반유형,
    c.BASIS_LAWORD      AS 근거법령
FROM "I2550" c
LEFT JOIN "I2550" p ON c.HRNK_DSPS_STDR_CD = p.DSPS_STDR_CD
WHERE c.USE_YN = 'Y'
LIMIT 30;

-- 17-2. 처분기준 + 과태료 부과기준  [연결키: DSPS_STDR_CD]
--       위반 유형별 처분기준과 과태료 매핑
SELECT
    d.DSPS_STDR_CD      AS 처분기준코드,
    d.DSPS_STDR_CD_NM   AS 처분기준명,
    d.VILT_TYPE_CD_NM   AS 위반유형,
    d.BASIS_LAWORD      AS 근거법령,
    f.DSPS_STDR_CD_NM   AS 과태료기준명
FROM "I2550" d
JOIN "I1670" f ON d.DSPS_STDR_CD = f.DSPS_STDR_CD
WHERE d.USE_YN = 'Y'
LIMIT 30;

-- 17-3. 식품제조가공업 행정처분 + 제조업체  [연결키: LCNS_NO]
--       행정처분 이력과 업체 기본정보 통합 조회
SELECT
    a.PRCSCITYPOINT_BSSHNM  AS 처분업소명,
    a.DSPS_TYPECD_NM        AS 처분유형,
    a.VILTCN                AS 위반내용,
    a.DSPS_DCSNDT           AS 처분결정일,
    m.LOCP_ADDR             AS 소재지,
    m.TELNO                 AS 전화번호
FROM "I0480" a
JOIN "I1220" m ON a.LCNS_NO = m.LCNS_NO
ORDER BY a.DSPS_DCSNDT DESC
LIMIT 30;


-- ============================================================
-- [사례 18] 건강기능식품 전주기 추적
--   건강기능식품 전주기 추적 (chain: 원재료 → 제조 → 생산실적 → GMP인증)
-- ============================================================

-- 18-1. 건강기능식품 원재료 → 품목제조신고 → GMP 인증  [3차 체인: PRDLST_REPORT_NO → LCNS_NO]
--       GMP 인증 업체의 품목별 원재료 구성 파악
SELECT
    r.RAWMTRL_NM        AS 원재료명,
    d.PRDLST_NM         AS 제품명,
    d.BSSH_NM           AS 업소명,
    g.INDUTY_CD_NM      AS GMP_업종,
    g.APPN_DT           AS GMP_인증일
FROM "C003" r
JOIN "I0030" d ON r.PRDLST_REPORT_NO = d.PRDLST_REPORT_NO
JOIN "I0630" g ON d.LCNS_NO = g.LCNS_NO
LIMIT 30;

-- 18-2. 건강기능식품 제조업 인허가 + 생산실적  [연결키: LCNS_NO]
--       건강기능식품 전문·벤처 제조업체별 생산실적 추적
SELECT
    m.BSSH_NM           AS 업소명,
    m.INDUTY_NM         AS 업종,
    m.LOCP_ADDR         AS 소재지,
    p.EVL_YR            AS 평가연도,
    p.PRDLST_NM         AS 제품명,
    p.PRDCTN_QY         AS 생산량
FROM "I-0020" m
JOIN "I0310" p ON m.LCNS_NO = p.LCNS_NO
ORDER BY p.EVL_YR DESC
LIMIT 30;

-- 18-3. 건강기능식품 업소 인허가 변경 이력  [연결키: LCNS_NO]
--       건강기능식품 제조업체 상호·주소 변경 이력 확인
SELECT
    d.PRDLST_NM         AS 제품명,
    d.BSSH_NM           AS 업소명,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용,
    c.CHNG_PRVNS        AS 변경사유
FROM "I0030" d
JOIN "I2860" c ON d.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 19] 농산물이력추적 생산·유통 연계
--   농산물이력추적 생산·유통 연계
-- ============================================================

-- 19-1. 농산물이력추적 생산 + 유통  [연결키: HIST_TRACE_REG_NO]
--       이력추적 등록 농산물의 생산자→유통업체 연결
SELECT
    p.HIST_TRACE_REG_NO AS 이력추적등록번호,
    p.RPRSNT_PRDLST_NM  AS 대표품목명,
    p.REG_INSTT_NM      AS 등록기관,
    p.ORGN_NM           AS 생산지,
    d.GRP_NM            AS 유통업체명,
    d.PRSDNT_NM         AS 유통업체대표
FROM "I1790" p
JOIN "I1800" d ON p.HIST_TRACE_REG_NO = d.HIST_TRACE_REG_NO
LIMIT 30;


-- ============================================================
-- [사례 20] 어린이·모범·우수 업소 인증 연계
--   어린이·모범·우수 업소 인증 연계
-- ============================================================

-- 20-1. 어린이 기호식품 품질인증 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO]
--       어린이 기호식품 인증 제품의 품목제조 정보 대조
SELECT
    c.PRDLST_NM                 AS 인증제품명,
    c.CHILD_FAVOR_FOOD_TYPE_NM  AS 어린이기호식품유형,
    c.APPN_BGN_DT               AS 인증시작일,
    c.APPN_END_DT               AS 인증종료일,
    m.PRDLST_NM                 AS 품목명,
    m.INDUTY_CD_NM              AS 업종
FROM "I0080" c
JOIN "I1310" m ON c.PRDLST_REPORT_NO = m.PRDLST_REPORT_NO
LIMIT 30;

-- 20-2. 식품모범음식점 + 식품접객업  [연결키: LCNS_NO]
--       모범음식점 지정 현황과 식품접객업 정보 통합 표출
SELECT
    r.BSSH_NM           AS 업소명,
    r.SIGNGU_NM         AS 시군구,
    r.YEAR              AS 지정연도,
    r.PNCPL_FOOD_NM     AS 주요음식,
    r.APPN_DT           AS 지정일자,
    i.LOCP_ADDR         AS 주소,
    i.TELNO             AS 전화번호
FROM "I1590" r
JOIN "I1200" i ON r.LCNS_NO = i.LCNS_NO
LIMIT 30;

-- 20-3. 우수수입업소 + 수입판매업  [연결키: LCNS_NO]
--       우수수입업소 등록 업체의 수입판매업 허가 현황 확인
SELECT
    u.BSSH_NM               AS 업소명,
    u.EXCOURY_NATN_CD_NM    AS 수출국,
    u.PRDLST_NM             AS 품목,
    u.PRMS_DT               AS 등록일자,
    i.INDUTY_NM             AS 업종,
    i.LOCP_ADDR             AS 소재지
FROM "I0250" u
JOIN "I1260" i ON u.LCNS_NO = i.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 21] 검사기관 연계·수거검사 이력
--   검사기관 연계·수거검사 이력
-- ============================================================

-- 21-1. 국내외 검사기관 연계  [연결키: PRSEC_INSTT_RCOGN_NO]
--       국내·외 검사기관 인정번호 기준 연계 조회
SELECT
    n.BSSH_NM           AS 국내기관명,
    n.WORK_SCOPE        AS 업무범위,
    n.APPN_BGN_DT       AS 지정시작일,
    n.APPN_END_DT       AS 지정종료일,
    f.BSSH_NM           AS 국외기관명,
    f.BSSH_ADDR         AS 국외기관주소,
    f.PRSEC_ITM_CD_NM   AS 검사항목
FROM "I0890" n
JOIN "I0910" f ON n.PRSEC_INSTT_RCOGN_NO = f.PRSEC_INSTT_RCOGN_NO
LIMIT 30;

-- 21-2. 수거검사 실적 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO]
--       수거검사 대상 제품의 품목제조 정보 및 판정 결과 조회
SELECT
    s.BSSH_NM               AS 업소명,
    s.PRDTNM                AS 제품명,
    s.JDGMNT_CD_NM          AS 판정결과,
    s.TKAWYDTM              AS 수거일시,
    s.TKAWYSPCI_TYPECD_NM   AS 수거특이유형,
    m.PRDLST_NM             AS 품목명,
    m.INDUTY_CD_NM          AS 업종
FROM "I0460" s
JOIN "I1310" m ON s.PRDLST_REPORT_NO = m.PRDLST_REPORT_NO
LIMIT 30;


-- ============================================================
-- [사례 22] join.sql 미포함 관계 추가 (21개)
-- ============================================================

-- 22-1. 공통기준규격 + 공통기준종류  [연결키: CMMN_SPEC_CD] (1,000건)
SELECT
    r.CMMN_SPEC_CD      AS 공통기준코드,
    r.PRDLST_CD_NM      AS 품목명,
    r.TESTITM_NM        AS 시험항목명,
    r.SPEC_VAL          AS 기준규격,
    r.UNIT_NM           AS 단위,
    c.SPEC_NM           AS 공통기준종류명,
    c.LV                AS 계층레벨
FROM "I2600" r
JOIN "I2590" c ON r.CMMN_SPEC_CD = c.CMMN_SPEC_CD
LIMIT 30;

-- 22-2. 축산물 품목제조정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] (1,000건)
SELECT
    p.PRDLST_NM         AS 품목명,
    p.PRDLST_DCNM       AS 품목유형,
    p.PRMS_DT           AS 보고일자,
    m.INDUTY_NM         AS 업종,
    m.LOCP_ADDR         AS 소재지
FROM "I1310" p
JOIN "I1300" m ON p.LCNS_NO = m.LCNS_NO
LIMIT 30;

-- 22-3. 수입식품등영업신고대장 + 식품등수입판매업정보  [연결키: LCNS_NO] (1,000건)
SELECT
    e.BSSH_NM           AS 영업신고업소명,
    e.INDUTY_NM         AS 업종,
    e.PRMS_DT           AS 신고일자,
    i.LOCP_ADDR         AS 소재지,
    i.TELNO             AS 전화번호
FROM "C001" e
JOIN "I1260" i ON e.LCNS_NO = i.LCNS_NO
LIMIT 30;

-- 22-4. 식품(첨가물)품목제조보고 + 인허가 업소 정보  [연결키: LCNS_NO] (1,000건)
SELECT
    p.BSSH_NM           AS 업소명,
    p.PRDLST_NM         AS 품목명,
    p.PRDLST_DCNM       AS 품목유형,
    p.PRMS_DT           AS 보고일자,
    h.INDUTY_CD_NM      AS 인허가업종
FROM "I1250" p
JOIN "I2500" h ON p.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 22-5. 위생용품 품목제조보고(원재료) + 위생용품영업정보  [연결키: LCNS_NO] (802건)
SELECT
    r.PRDLST_NM         AS 품목명,
    r.RAWMTRL_NM        AS 원재료명,
    e.INDUTY_NM         AS 업종,
    e.LOCP_ADDR         AS 소재지
FROM "I2712" r
JOIN "I2713" e ON r.LCNS_NO = e.LCNS_NO
LIMIT 30;

-- 22-6. 축산물 품목제조정보 + 인허가 업소 정보  [연결키: LCNS_NO] (212건)
SELECT
    p.PRDLST_NM         AS 품목명,
    p.INDUTY_CD_NM      AS 업종,
    p.PRMS_DT           AS 보고일자,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I1310" p
LEFT JOIN "I2500" h ON p.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 22-7. 축산물품목제조보고(원재료) + 축산물 가공업허가정보  [연결키: LCNS_NO] (25건)
SELECT
    r.PRDLST_NM         AS 품목명,
    r.RAWMTRL_NM        AS 원재료명,
    m.INDUTY_NM         AS 업종,
    m.LOCP_ADDR         AS 소재지
FROM "C006" r
JOIN "I1300" m ON r.LCNS_NO = m.LCNS_NO
LIMIT 30;

-- 22-8. 위생용품 생산실적 + 위생용품 품목제조보고  [연결키: PRDLST_REPORT_NO] (21건)
SELECT
    s.EVL_YR            AS 평가연도,
    s.PRDLST_NM         AS 제품명,
    s.PRDCTN_QY         AS 생산량,
    p.PRDLST_DCNM       AS 품목유형,
    p.POG_DAYCNT        AS 유통기한
FROM "I2851" s
JOIN "I2711" p ON s.PRDLST_REPORT_NO = p.PRDLST_REPORT_NO
LIMIT 30;

-- 22-9. 생산중단제품정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] (17건)
SELECT
    d.PRDLST_NM         AS 생산중단품목명,
    d.END_DT            AS 생산중단일,
    d.ARTCL_END_WHY     AS 생산중단사유,
    m.INDUTY_NM         AS 업종,
    m.LOCP_ADDR         AS 소재지
FROM "I2852" d
JOIN "I1300" m ON d.LCNS_NO = m.LCNS_NO
LIMIT 30;

-- 22-10. 공통기준제외 + 시험항목코드  [연결키: TESTITM_CD] (16건)
SELECT
    x.SPEC_NM           AS 공통기준종류명,
    x.TESTITM_CD        AS 시험항목코드,
    x.KOR_NM            AS 제외항목명,
    t.KOR_NM            AS 시험항목한글명
FROM "I2610" x
JOIN "I2530" t ON x.TESTITM_CD = t.TESTITM_CD
LIMIT 30;

-- 22-11. 검사부적합(농산물) + 검사부적합(국내)  [연결키: BRCDNO] (16건)
SELECT
    a.PRDTNM            AS 농산물제품명,
    a.BSSHNM            AS 업소명,
    a.TEST_ITMNM        AS 시험항목,
    a.TESTANALS_RSLT    AS 검사결과,
    d.PRDLST_CD_NM      AS 국내품목유형
FROM "I2640" a
JOIN "I2620" d ON a.BRCDNO = d.BRCDNO
LIMIT 30;

-- 22-12. 회수·판매중지 정보 + 품목유형코드  [연결키: PRDLST_CD] (11건)
SELECT
    r.PRDTNM            AS 제품명,
    r.BSSHNM            AS 업소명,
    r.RTRVLPRVNS        AS 회수사유,
    c.KOR_NM            AS 품목유형명
FROM "I0490" r
JOIN "I2510" c ON r.PRDLST_CD = c.PRDLST_CD
LIMIT 30;

-- 22-13. 검사부적합(농산물) + 회수·판매중지 정보  [연결키: BRCDNO] (7건)
SELECT
    a.PRDTNM            AS 농산물제품명,
    a.BSSHNM            AS 업소명,
    a.TEST_ITMNM        AS 시험항목,
    a.TESTANALS_RSLT    AS 검사결과,
    r.RTRVLPRVNS        AS 회수사유
FROM "I2640" a
JOIN "I0490" r ON a.BRCDNO = r.BRCDNO
LIMIT 30;

-- 22-14. 회수·판매중지 정보 + 축산물 가공업허가정보  [연결키: LCNS_NO] (6건)
SELECT
    r.PRDTNM            AS 제품명,
    r.BSSHNM            AS 업소명,
    r.RTRVLPRVNS        AS 회수사유,
    m.INDUTY_NM         AS 업종,
    m.LOCP_ADDR         AS 소재지
FROM "I0490" r
JOIN "I1300" m ON r.LCNS_NO = m.LCNS_NO
LIMIT 30;

-- 22-15. 식품(첨가물)품목제조보고(원재료) + 인허가 업소 정보  [연결키: LCNS_NO] (5건)
SELECT
    r.PRDLST_NM         AS 품목명,
    r.RAWMTRL_NM        AS 원재료명,
    h.INDUTY_CD_NM      AS 인허가업종
FROM "C002" r
JOIN "I2500" h ON r.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 22-16. 어린이 기호식품 품질인증 + 인허가 업소 정보  [연결키: LCNS_NO] (4건)
SELECT
    c.PRDLST_NM                 AS 인증제품명,
    c.CHILD_FAVOR_FOOD_TYPE_NM  AS 어린이기호식품유형,
    c.APPN_BGN_DT               AS 인증시작일,
    c.APPN_END_DT               AS 인증종료일,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I0080" c
LEFT JOIN "I2500" h ON c.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 22-17. 공통기준제외 + 품목유형코드  [연결키: PRDLST_CD] (1건)
SELECT
    x.SPEC_NM           AS 공통기준종류명,
    x.PRDLST_CD         AS 품목분류코드,
    x.KOR_NM            AS 제외항목명,
    c.KOR_NM            AS 품목유형명
FROM "I2610" x
JOIN "I2510" c ON x.PRDLST_CD = c.PRDLST_CD
LIMIT 30;

-- 22-18. 바코드연계제품정보 + 축산물 품목제조정보  [연결키: PRDLST_REPORT_NO] (1건)
SELECT
    b.PRDLST_NM         AS 바코드제품명,
    b.BSSH_NM           AS 업소명,
    b.BAR_CD            AS 바코드,
    p.PRDLST_DCNM       AS 품목유형,
    p.INDUTY_CD_NM      AS 업종
FROM "C005" b
JOIN "I1310" p ON b.PRDLST_REPORT_NO = p.PRDLST_REPORT_NO
LIMIT 30;

-- 22-19. 건강기능식품 개별인정형 정보 + 기능성 원료인정현황  [연결키: HF_FNCLTY_MTRAL_RCOGN_NO] (1건)
SELECT
    i.RAWMTRL_NM            AS 원료명,
    i.PRIMARY_FNCLTY        AS 주요기능성,
    i.DAY_INTK_HIGHLIMIT    AS 최대섭취량,
    i.DAY_INTK_LOWLIMIT     AS 최소섭취량,
    r.BSSH_NM               AS 인정업체명,
    r.FNCLTY_CN             AS 기능성내용
FROM "I-0050" i
JOIN "I-0040" r ON i.HF_FNCLTY_MTRAL_RCOGN_NO = r.HF_FNCLTY_MTRAL_RCOGN_NO
LIMIT 30;

-- 22-20. 식품업소 인허가 변경 정보 + 인허가 업소 정보  [연결키: LCNS_NO] (1건)
SELECT
    c.BSSH_NM           AS 업소명,
    c.INDUTY_CD_NM      AS 업종,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I2859" c
LEFT JOIN "I2500" h ON c.LCNS_NO = h.LCNS_NO
LIMIT 30;

-- 22-21. 식품모범음식점 + 인허가 업소 정보  [연결키: LCNS_NO] (1건)
SELECT
    r.BSSH_NM           AS 업소명,
    r.SIGNGU_NM         AS 시군구,
    r.YEAR              AS 지정연도,
    r.PNCPL_FOOD_NM     AS 주요음식,
    CASE WHEN h.LCNS_NO IS NOT NULL THEN '폐업' ELSE '영업중' END AS 영업상태
FROM "I1590" r
LEFT JOIN "I2500" h ON r.LCNS_NO = h.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 23] 식품(첨가물) 원재료 제조업체 인허가 변경이력
-- ============================================================

-- 23-1. 식품(첨가물) 원재료 제조업체 + 인허가 변경이력  [연결키: LCNS_NO] (37건 / DISTINCT 5개 업체)
SELECT DISTINCT
    a.PRDLST_NM         AS 원재료품목명,
    b.BSSH_NM           AS 업소명,
    b.INDUTY_NM         AS 업종,
    b.LOCP_ADDR         AS 소재지,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용
FROM "C002" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2859" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 24] chain_joins.sql 신규 2차 조인 (7개)
-- ============================================================

-- 24-1. 위생관리 종합평가 + 평가 상세결과  [연결키: LCNS_NO] (DISTINCT 759개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.EVL_TYPE_DVS_NM   AS 평가유형,
    a.EVL_GRD_NM        AS 평가등급,
    a.EVL_DT            AS 평가일,
    b.EVL_SCORE         AS 평가점수,
    b.EVL_GRD_CD_NM     AS 상세등급,
    b.ADDR              AS 주소
FROM "I0680" a
JOIN "I1540" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 24-2. 식품영업허가 + 위생관리 종합평가  [연결키: LCNS_NO] (DISTINCT 372개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.INDUTY_NM         AS 업종,
    a.PRMS_DT           AS 허가일,
    b.EVL_TYPE_DVS_NM   AS 평가유형,
    b.EVL_GRD_NM        AS 평가등급,
    b.EVL_DT            AS 평가일
FROM "I0060" a
JOIN "I0680" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 24-3. 건강기능식품 제조업 + 인허가 변경이력  [연결키: LCNS_NO] (DISTINCT 315개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.INDUTY_NM         AS 업종,
    a.LOCP_ADDR         AS 소재지,
    b.CHNG_DT           AS 변경일자,
    b.CHNG_BF_CN        AS 변경전내용,
    b.CHNG_AF_CN        AS 변경후내용
FROM "I-0020" a
JOIN "I2860" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;

-- 24-4. 건강기능식품 GMP 인증 + 인허가 변경이력  [연결키: LCNS_NO] (DISTINCT 293개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.INDUTY_CD_NM      AS 업종,
    a.APPN_DT           AS GMP인증일,
    b.CHNG_DT           AS 변경일자,
    b.CHNG_BF_CN        AS 변경전내용,
    b.CHNG_AF_CN        AS 변경후내용
FROM "I0630" a
JOIN "I2860" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CHNG_DT DESC
LIMIT 30;

-- 24-5. HACCP 인증 업소 + 식품제조업 인허가  [연결키: LCNS_NO] (DISTINCT 22개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.INDUTY_CD_NM      AS 업종,
    a.HACCP_APPN_DT     AS HACCP인증일,
    a.PRDLST_NM         AS 인증품목,
    b.INDUTY_NM         AS 인허가업종,
    b.LOCP_ADDR         AS 소재지
FROM "I0580" a
JOIN "I1220" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;

-- 24-6. 회수·판매중지 제품 + 공통기준규격  [연결키: PRDLST_CD] (DISTINCT 28개 업체)
SELECT DISTINCT
    a.PRDTNM            AS 제품명,
    a.BSSHNM            AS 업소명,
    a.RTRVLPRVNS        AS 회수사유,
    b.PRDLST_CD_NM      AS 품목유형,
    b.TESTITM_NM        AS 시험항목,
    b.SPEC_VAL          AS 기준규격,
    b.UNIT_NM           AS 단위
FROM "I0490" a
JOIN "I2600" b ON a.PRDLST_CD = b.PRDLST_CD
LIMIT 30;

-- 24-7. HACCP 인증 업소 + 건강기능식품 생산중단  [연결키: LCNS_NO] (DISTINCT 7개 업체)
SELECT DISTINCT
    a.BSSH_NM           AS 업소명,
    a.INDUTY_CD_NM      AS 업종,
    a.HACCP_APPN_DT     AS HACCP인증일,
    b.PRDLST_NM         AS 생산중단품목,
    b.END_DT            AS 생산중단일,
    b.ARTCL_END_WHY     AS 중단사유
FROM "I0580" a
JOIN "I2852" b ON a.LCNS_NO = b.LCNS_NO
LIMIT 30;


-- ============================================================
-- [사례 25] chain_joins.sql 신규 3차 체인 (3개)
-- ============================================================

-- 25-1. 건기식 원재료 → 제조업 → GMP 인증  [연결키: LCNS_NO → LCNS_NO] (DISTINCT 30개 업체)
SELECT DISTINCT
    a.RAWMTRL_NM        AS 원재료명,
    a.BSSH_NM           AS 원재료업소명,
    b.INDUTY_NM         AS 제조업종,
    b.LOCP_ADDR         AS 소재지,
    c.INDUTY_CD_NM      AS GMP업종,
    c.APPN_DT           AS GMP인증일
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I0630" c ON b.LCNS_NO = c.LCNS_NO
LIMIT 30;

-- 25-2. 건기식 원재료 → 제조업 → 인허가 변경이력  [연결키: LCNS_NO → LCNS_NO] (DISTINCT 23개 업체)
SELECT DISTINCT
    a.RAWMTRL_NM        AS 원재료명,
    b.BSSH_NM           AS 업소명,
    b.INDUTY_NM         AS 업종,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용
FROM "C003" a
JOIN "I-0020" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2860" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;

-- 25-3. 건기식 원재료 → 품목제조신고 → 인허가 변경이력  [연결키: LCNS_NO → LCNS_NO] (DISTINCT 12개 업체)
SELECT DISTINCT
    a.RAWMTRL_NM        AS 원재료명,
    b.PRDLST_NM         AS 제품명,
    b.PRIMARY_FNCLTY    AS 주요기능성,
    c.CHNG_DT           AS 변경일자,
    c.CHNG_BF_CN        AS 변경전내용,
    c.CHNG_AF_CN        AS 변경후내용
FROM "C003" a
JOIN "I0030" b ON a.LCNS_NO = b.LCNS_NO
JOIN "I2860" c ON b.LCNS_NO = c.LCNS_NO
ORDER BY c.CHNG_DT DESC
LIMIT 30;


-- ============================================================
-- [사례 26] REDTABLE — 식품접객업 영업·폐업 통합 조회
--   활용 데이터: I2500(인허가 업소 정보) + I2819(식품접객업 폐업정보)
--   출처: 식품안전나라_데이터_활용사례.xlsx
-- ============================================================

-- 26-1. 현재 영업 중인 식품접객업소 목록  [I2500 단독]
SELECT
    LCNS_NO        AS 인허가번호,
    BSSH_NM        AS 업소명,
    PRSDNT_NM      AS 대표자명,
    INDUTY_CD_NM   AS 업종,
    PRMS_DT        AS 허가일자,
    ADDR           AS 주소
FROM "I2500"
WHERE INDUTY_CD_NM LIKE '%접객%'
ORDER BY PRMS_DT DESC
LIMIT 30;

-- 26-2. 폐업한 식품접객업소 목록  [I2819 단독]
SELECT
    LCNS_NO          AS 인허가번호,
    BSSH_NM          AS 업소명,
    PRSDNT_NM        AS 대표자명,
    INDUTY_NM        AS 업종,
    PRMS_DT          AS 허가일자,
    CLSBIZ_DT        AS 폐업일자,
    CLSBIZ_DVS_CD_NM AS 폐업상태,
    LOCP_ADDR        AS 주소
FROM "I2819"
ORDER BY CLSBIZ_DT DESC
LIMIT 30;

-- 26-3. 동일 인허가번호로 영업→폐업 이력 연계  [연결키: LCNS_NO]
SELECT
    a.LCNS_NO          AS 인허가번호,
    a.BSSH_NM          AS 현재업소명,
    a.INDUTY_CD_NM     AS 업종,
    a.ADDR             AS 현재주소,
    b.CLSBIZ_DT        AS 폐업일자,
    b.CLSBIZ_DVS_CD_NM AS 폐업상태,
    b.LOCP_ADDR        AS 폐업당시주소
FROM "I2500" a
JOIN "I2819" b ON a.LCNS_NO = b.LCNS_NO
ORDER BY b.CLSBIZ_DT DESC
LIMIT 30;
