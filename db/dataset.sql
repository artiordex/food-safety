-- =============================================================================
-- 식품안전나라 공공데이터 연계 데이터 세트 SQL
-- 설명: 바코드, 품목제조보고, 인허가, HACCP, 행정처분, 지도점검,
--       회수/판매중지 정보를 연계하여 목적별 데이터 세트 후보를 구성하기 위한 SQL
--
-- 공통 유의사항
-- 1. 제품명 기준 조인은 동명이품 가능성이 있으므로 품목제조보고번호 기준 매칭을 우선 적용함
-- 2. 원재료, 행정처분, 지도점검, 회수정보는 1:N 관계일 수 있어 중복 row 발생 가능성이 있음
-- 3. 실제 실행 전 테이블별 컬럼명 및 데이터 적재 여부 확인 필요함
-- 4. 본 SQL은 데이터 세트 구성 및 연계 가능성 검토용 초안임
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. 바코드 기반 제품 안전성 통합 조회 SQL
-- 카테고리: 식품 품목제조보고 · 바코드 · 인허가 · HACCP · 회수/판매중지 정보 연계
-- 목적: 바코드 또는 품목제조보고번호를 기준으로 제품 기본정보, 제조업체 정보,
--       HACCP 적용 여부, 회수/판매중지 이력을 통합 조회하기 위한 SQL
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: C005  / 바코드연계 제품정보
--             I2500 / 인허가 업소 정보
--             I0580 / HACCP 적용 업소 정보
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: PRDLST_REPORT_NO / 품목제조보고번호
--             LCNS_NO           / 인허가번호
-- 활용 예시: 제품 바코드 조회, 식품 안전상태 확인, HACCP 인증 여부 확인,
--           회수·판매중지 대상 제품 식별
-- 유의사항: 제품명 기준 회수정보 매칭은 동명이품 가능성이 있어 보조 기준으로만 활용 권장
-- -----------------------------------------------------------------------------

SELECT 
    -- 1. 제품 기본 정보
    B.BAR_CD                AS "바코드",
    P.PRDLST_REPORT_NO      AS "품목제조보고번호",
    P.PRDLST_NM             AS "제품명",
    P.PRDLST_DCNM           AS "식품유형",

    -- 2. 제조업체 및 인허가 정보
    E.BSSH_NM               AS "제조업체명",
    E.ADDR                  AS "주소",
    P.LCNS_NO               AS "인허가번호",

    -- 3. HACCP 인증 정보
    CASE 
        WHEN H.HACCP_APPN_NO IS NOT NULL THEN 'Y'
        ELSE 'N'
    END                     AS "HACCP_적용여부",
    H.HACCP_APPN_NO         AS "HACCP_지정번호",

    -- 4. 회수/판매중지 정보
    C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS            AS "회수사유",

    -- 5. 안전상태
    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN '위험'
        ELSE '안전'
    END                     AS "안전상태"

FROM 
    I1250 P

LEFT JOIN 
    C005 B 
    ON P.PRDLST_REPORT_NO = B.PRDLST_REPORT_NO

LEFT JOIN 
    I2500 E 
    ON P.LCNS_NO = E.LCNS_NO

LEFT JOIN 
    I0580 H 
    ON P.LCNS_NO = H.LCNS_NO

LEFT JOIN 
    I0490 C 
    ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO

WHERE 
    1=1
    -- AND B.BAR_CD = '조회할_바코드_입력'
    -- AND P.PRDLST_REPORT_NO = '조회할_품목제조보고번호_입력'
;


-- -----------------------------------------------------------------------------
-- 2. 알레르기·유해성분 회피 바코드 제품 데이터 세트
-- 카테고리: 식품 품목제조보고 · 바코드 · 원재료 · 회수/판매중지 정보 연계
-- 목적: 바코드 스캔을 통해 제품의 원재료 정보 및 회수 이력을 확인하여
--       알레르기 및 유해성분 회피를 지원하기 위한 SQL
-- 중심 테이블: C005 / 바코드연계 제품정보
-- 연계 테이블: I1250 / 식품 품목제조보고
--             C002  / 식품원재료
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 알레르기 유발 물질 확인, 유해성분 포함 여부 조회, 안전한 제품 선택
-- 유의사항: 원재료 정보는 제품 1건당 여러 건이 존재할 수 있어 제품 단위 중복 발생 가능
-- -----------------------------------------------------------------------------

SELECT 
    B.BAR_CD                AS "바코드",
    B.PRDLST_REPORT_NO      AS "품목제조보고번호",
    P.PRDLST_NM             AS "제품명",
    P.PRDLST_DCNM           AS "식품유형",
    R.RAWMTRL_NM            AS "원재료명",
    C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS            AS "회수사유",

    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN '주의'
        ELSE '안전'
    END                     AS "안전상태",

    CASE 
        WHEN R.RAWMTRL_NM IS NOT NULL THEN '원재료 정보 있음'
        ELSE '원재료 정보 없음'
    END                     AS "원재료_확인상태"

FROM 
    C005 B

INNER JOIN 
    I1250 P 
    ON B.PRDLST_REPORT_NO = P.PRDLST_REPORT_NO

LEFT JOIN 
    C002 R 
    ON P.PRDLST_REPORT_NO = R.PRDLST_REPORT_NO

LEFT JOIN 
    I0490 C 
    ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO

WHERE 
    1=1
    -- AND B.BAR_CD = '조회할_바코드_입력'
    -- AND R.RAWMTRL_NM LIKE '%알레르기_성분명%'
;


-- -----------------------------------------------------------------------------
-- 3. 제조업체 식품안전 위험등급 데이터 세트
-- 카테고리: 식품 품목제조보고 · 인허가 · HACCP · 행정처분 · 지도점검 정보 연계
-- 목적: 제조업체의 HACCP 인증 여부, 행정처분 내역, 지도점검 결과를 바탕으로
--       식품안전 위험등급을 산출하기 위한 SQL
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: I2500 / 인허가 업소 정보
--             I0580 / HACCP 적용 업소 정보
--             I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 제조업체별 위험등급 평가, 우수/주의 제조업체 선별, 협력사 품질 관리
-- 유의사항: 행정처분 및 지도점검 정보는 1:N 관계일 수 있어 중복 row 발생 가능
-- -----------------------------------------------------------------------------

SELECT 
    P.LCNS_NO               AS "인허가번호",
    E.BSSH_NM               AS "제조업체명",
    E.ADDR                  AS "주소",
    P.PRDLST_REPORT_NO      AS "품목제조보고번호",
    P.PRDLST_NM             AS "제품명",

    CASE 
        WHEN H.HACCP_APPN_NO IS NOT NULL THEN 'Y'
        ELSE 'N'
    END                     AS "HACCP_적용여부",
    H.HACCP_APPN_NO         AS "HACCP_지정번호",

    A.DSPS_TYPECD_NM        AS "행정처분유형",
    A.VILTCN                AS "위반내용",
    I.TESTANALS_RSLT        AS "지도점검결과",
    I.TEST_ITMNM            AS "부적합항목",

    CASE 
        WHEN A.LCNS_NO IS NOT NULL THEN '위험'
        WHEN I.TESTANALS_RSLT LIKE '%부적합%' THEN '주의'
        WHEN H.HACCP_APPN_NO IS NOT NULL THEN '우수'
        ELSE '보통'
    END                     AS "식품안전_위험등급"

FROM 
    I1250 P

LEFT JOIN 
    I2500 E 
    ON P.LCNS_NO = E.LCNS_NO

LEFT JOIN 
    I0580 H 
    ON P.LCNS_NO = H.LCNS_NO

LEFT JOIN 
    I0470 A 
    ON P.LCNS_NO = A.LCNS_NO

LEFT JOIN 
    I2620 I 
    ON P.LCNS_NO = I.LCNS_NO

WHERE 
    1=1
    -- AND P.LCNS_NO = '조회할_인허가번호_입력'
;


-- -----------------------------------------------------------------------------
-- 4. 지역 기반 위생 안심 요식업소 데이터 세트
-- 카테고리: 인허가 업소 · 행정처분 정보 연계
-- 목적: 지역별 인허가 업소 중 행정처분 이력을 기준으로 위생상태를 구분하기 위한 SQL
-- 중심 테이블: I2500 / 인허가 업소 정보
-- 연계 테이블: I0470 / 행정처분 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 지역 기반 위생업소 조회, 위생 우수 업소 후보 발굴, 지역 위생 수준 분석
-- 유의사항: 행정처분 이력이 없다는 것이 반드시 위생 우수를 의미하지는 않으므로
--           '클린업소'보다는 '주의이력 없음' 표현을 권장
-- -----------------------------------------------------------------------------

SELECT 
    E.LCNS_NO               AS "인허가번호",
    E.BSSH_NM               AS "업소명",
    E.INDUTY_CD_NM          AS "업종",
    E.ADDR                  AS "주소",
    A.DSPS_TYPECD_NM        AS "행정처분유형",
    A.VILTCN                AS "위반내용",

    CASE 
        WHEN A.LCNS_NO IS NULL THEN '주의이력 없음'
        ELSE '주의이력 있음'
    END                     AS "위생상태"

FROM 
    I2500 E

LEFT JOIN 
    I0470 A 
    ON E.LCNS_NO = A.LCNS_NO

WHERE 
    1=1
    -- AND E.ADDR LIKE '%지역명%'
    -- AND E.INDUTY_CD_NM LIKE '%업종명%'
;


-- -----------------------------------------------------------------------------
-- 5. 수입식품 영업자 안전성 진단 및 행정처분 분석 데이터 세트
-- 카테고리: 수입식품 인허가 · 행정처분 정보 연계
-- 목적: 수입식품 영업자의 기본 정보와 행정처분 이력을 연계하여
--       영업자 안전성을 진단하기 위한 SQL
-- 중심 테이블: C001 / 수입식품 인허가 정보
-- 연계 테이블: I0482 / 수입식품 행정처분 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 수입업자 신뢰도 평가, 행정처분 다발 수입업자 모니터링,
--           안전한 수입식품 유통 관리
-- -----------------------------------------------------------------------------

SELECT 
    I.LCNS_NO               AS "인허가번호",
    I.BSSH_NM               AS "수입업소명",
    I.INDUTY_NM             AS "업종",
    I.LOCP_ADDR             AS "주소",
    D.DSPS_TYPECD_NM        AS "행정처분유형",
    D.VILTCN                AS "위반내용",
    D.DSPS_DCSNDT           AS "처분확정일자",

    CASE 
        WHEN D.LCNS_NO IS NULL THEN '주의이력 없음'
        ELSE '주의이력 있음'
    END                     AS "수입영업자_안전상태"

FROM 
    C001 I

LEFT JOIN 
    I0482 D 
    ON I.LCNS_NO = D.LCNS_NO

WHERE 
    1=1
    -- AND I.BSSH_NM LIKE '%업소명%'
    -- AND I.LOCP_ADDR LIKE '%지역명%'
;


-- -----------------------------------------------------------------------------
-- 6. 어린이·고령자 안심 식품 데이터 세트
-- 카테고리: 식품 품목제조보고 · 원재료 · 건강 항목 · 회수/판매중지 정보 연계
-- 목적: 취약계층을 위한 건강 기능성, 원재료 정보, 회수 이력을 확인하여
--       어린이·고령자 대상 안심 식품 후보를 조회하기 위한 SQL
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: C002  / 식품원재료
--             I0760 / 건강 항목 그룹 정보
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 어린이 기호식품 품질인증 제품 추천, 고령자 친화 식품 선별,
--           취약계층 맞춤형 식단 구성
-- 유의사항: 건강 항목 그룹 정보와 식품유형 간 매칭 기준은 실제 코드·분류체계 확인 필요
-- -----------------------------------------------------------------------------

SELECT 
    P.PRDLST_REPORT_NO      AS "품목제조보고번호",
    P.PRDLST_NM             AS "제품명",
    P.PRDLST_DCNM           AS "식품유형",
    P.CHILD_CRTFC_YN        AS "어린이인증여부",
    P.HIENG_LNTRT_DVS_NM    AS "고열량저영양여부",
    R.RAWMTRL_NM            AS "원재료명",
    H.HELT_ITM_GRP_NM       AS "건강항목그룹명",
    C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS            AS "회수사유",

    CASE 
        WHEN C.PRDLST_REPORT_NO IS NULL THEN '안심후보'
        ELSE '주의필요'
    END                     AS "안전상태",

    CASE 
        WHEN P.CHILD_CRTFC_YN = 'Y' THEN '어린이 인증 제품'
        WHEN P.HIENG_LNTRT_DVS_NM IS NOT NULL THEN '영양정보 확인 필요'
        ELSE '일반 제품'
    END                     AS "취약계층_분류"

FROM 
    I1250 P

LEFT JOIN 
    C002 R 
    ON P.PRDLST_REPORT_NO = R.PRDLST_REPORT_NO

LEFT JOIN 
    I0760 H 
    ON P.PRDLST_DCNM = H.SCLAS_NM

LEFT JOIN 
    I0490 C 
    ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO

WHERE 
    1=1
    -- AND P.CHILD_CRTFC_YN = 'Y'
    -- AND P.PRDLST_DCNM LIKE '%식품유형%'
;


-- -----------------------------------------------------------------------------
-- 7. 지역 식품 안전 모니터링 데이터 세트
-- 카테고리: 식품 품목제조보고 · 인허가 · 행정처분 · 지도점검 · 회수/판매중지 정보 연계
-- 목적: 특정 지역 내 제조·판매되는 식품의 행정처분, 지도점검, 회수 이력을
--       종합 모니터링하기 위한 SQL
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: I2500 / 인허가 업소 정보
--             I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: LCNS_NO / 인허가번호
--             PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 지자체별 식품안전 통계 산출, 위해식품 발생 우려 지역 예측,
--           맞춤형 위생 점검 계획 수립
-- 유의사항: 지역 기준은 I2500 주소 정보를 우선 활용하는 것을 권장
-- -----------------------------------------------------------------------------

SELECT 
    P.LCNS_NO               AS "인허가번호",
    E.BSSH_NM               AS "업소명",
    E.ADDR                  AS "주소",
    P.PRDLST_REPORT_NO      AS "품목제조보고번호",
    P.PRDLST_NM             AS "제품명",
    P.PRDLST_DCNM           AS "식품유형",
    A.DSPS_TYPECD_NM        AS "행정처분유형",
    A.VILTCN                AS "위반내용",
    I.TESTANALS_RSLT        AS "지도점검결과",
    I.TEST_ITMNM            AS "부적합항목",
    C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS            AS "회수사유",

    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN '회수주의'
        WHEN A.LCNS_NO IS NOT NULL THEN '처분주의'
        WHEN I.TESTANALS_RSLT LIKE '%부적합%' THEN '점검주의'
        ELSE '특이이력 없음'
    END                     AS "지역_식품안전상태"

FROM 
    I1250 P

LEFT JOIN 
    I2500 E 
    ON P.LCNS_NO = E.LCNS_NO

LEFT JOIN 
    I0470 A 
    ON P.LCNS_NO = A.LCNS_NO

LEFT JOIN 
    I2620 I 
    ON P.LCNS_NO = I.LCNS_NO

LEFT JOIN 
    I0490 C 
    ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO

WHERE 
    1=1
    -- AND E.ADDR LIKE '%지역명%'
    -- AND P.PRDLST_DCNM LIKE '%식품유형%'
;


-- -----------------------------------------------------------------------------
-- 8. 식품기업 ESG·안전경영지원 데이터 세트
-- 카테고리: HACCP 적용 업소 · 인허가 · 행정처분 · 지도점검 · 회수/판매중지 정보 연계
-- 목적: 식품기업의 지속가능경영 및 안전관리 역량을 HACCP, 행정처분,
--       지도점검, 회수 이력 기준으로 평가하기 위한 SQL
-- 중심 테이블: I0580 / HACCP 적용 업소 정보
-- 연계 테이블: I2500 / 인허가 업소 정보
--             I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: ESG 우수 식품기업 후보 발굴, 안전경영 지수 개발,
--           투자자 대상 기업 안전성 정보 제공
-- 유의사항: ESG 평가는 실제 환경·사회·거버넌스 지표와 결합해야 하며,
--           본 SQL은 식품안전관리 측면의 보조 지표로 활용
-- -----------------------------------------------------------------------------

SELECT 
    H.LCNS_NO               AS "인허가번호",
    COALESCE(E.BSSH_NM, H.BSSH_NM) AS "업소명",
    E.ADDR                  AS "주소",
    H.HACCP_APPN_NO         AS "HACCP_지정번호",
    H.HACCP_APPN_DT         AS "HACCP_지정일자",
    A.DSPS_TYPECD_NM        AS "행정처분유형",
    A.VILTCN                AS "위반내용",
    I.TESTANALS_RSLT        AS "지도점검결과",
    I.TEST_ITMNM            AS "부적합항목",
    C.RTRVLDSUSE_SEQ        AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS            AS "회수사유",

    CASE 
        WHEN A.LCNS_NO IS NULL 
         AND C.LCNS_NO IS NULL 
         AND I.TESTANALS_RSLT NOT LIKE '%부적합%' THEN '우수'
        WHEN A.LCNS_NO IS NOT NULL 
          OR C.LCNS_NO IS NOT NULL 
          OR I.TESTANALS_RSLT LIKE '%부적합%' THEN '개선필요'
        ELSE '검토필요'
    END                     AS "안전경영등급"

FROM 
    I0580 H

LEFT JOIN 
    I2500 E 
    ON H.LCNS_NO = E.LCNS_NO

LEFT JOIN 
    I0470 A 
    ON H.LCNS_NO = A.LCNS_NO

LEFT JOIN 
    I2620 I 
    ON H.LCNS_NO = I.LCNS_NO

LEFT JOIN 
    I0490 C 
    ON H.LCNS_NO = C.LCNS_NO

WHERE 
    1=1
    -- AND E.ADDR LIKE '%지역명%'
    -- AND H.HACCP_APPN_NO IS NOT NULL
;