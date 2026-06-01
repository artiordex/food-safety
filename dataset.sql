-- -----------------------------------------------------------------------------
-- 알레르기·유해성분 회피 바코드 제품 데이터 세트
-- 카테고리: 식품 품목제조보고 · 바코드 · 원재료 · 회수/판매중지 정보 연계
-- 목적: 바코드 스캔을 통해 제품의 원재료 정보 및 회수 이력을 확인하여 알레르기 및 유해성분을 회피
-- 중심 테이블: C005 / 바코드연계 제품정보
-- 연계 테이블: I1250 / 식품 품목제조보고
--             C002 / 식품원재료
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 알레르기 유발 물질 확인, 유해성분 포함 여부 조회, 안전한 제품 선택
-- -----------------------------------------------------------------------------
SELECT 
    B.BAR_CD AS "바코드",
    B.PRDLST_REPORT_NO AS "품목제조보고번호",
    P.PRDLST_NM AS "제품명",
    P.PRDLST_DCNM AS "식품유형",
    R.RAWMTRL_NM AS "원재료명",
    C.RTRVLDSUSE_SEQ AS "회수_판매중지_일련번호",
    C.RTRVLPRVNS AS "회수사유",
    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN '주의 (회수/판매중지 대상)' 
        ELSE '안전' 
    END AS "안전상태"
FROM 
    C005 B
INNER JOIN 
    I1250 P ON B.PRDLST_REPORT_NO = P.PRDLST_REPORT_NO
LEFT JOIN 
    C002 R ON P.PRDLST_REPORT_NO = R.PRDLST_REPORT_NO
LEFT JOIN 
    I0490 C ON (P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO OR P.PRDLST_NM = C.PRDTNM)
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 제조업체 식품안전 위험등급 데이터 세트
-- 카테고리: 식품 품목제조보고 · HACCP · 행정처분 · 지도점검 정보 연계
-- 목적: 제조업체의 HACCP 인증 여부, 행정처분 내역, 지도점검 결과를 바탕으로 식품안전 위험등급을 산출
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: I0580 / HACCP 적용 업소 정보
--             I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 제조업체별 위험등급 평가, 우수/주의 제조업체 선별, 협력사 품질 관리
-- -----------------------------------------------------------------------------
SELECT 
    P.LCNS_NO AS "인허가번호",
    P.BSSH_NM AS "제조업체명",
    P.PRDLST_REPORT_NO AS "품목제조보고번호",
    P.PRDLST_NM AS "제품명",
    H.HACCP_APPN_NO AS "HACCP_지정번호",
    A.DSPS_TYPECD_NM AS "행정처분유형",
    A.VILTCN AS "위반내용",
    I.TESTANALS_RSLT AS "지도점검결과",
    I.TEST_ITMNM AS "부적합항목"
FROM 
    I1250 P
LEFT JOIN 
    I0580 H ON P.LCNS_NO = H.LCNS_NO
LEFT JOIN 
    I0470 A ON P.LCNS_NO = A.LCNS_NO
LEFT JOIN 
    I2620 I ON P.LCNS_NO = I.LCNS_NO
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 행정동별 클린 위생 안심 요식업소 데이터 세트
-- 카테고리: 인허가 업소 · 행정처분 정보 연계
-- 목적: 지역별(행정동) 인허가 업소 중 행정처분 이력이 없는 안심 요식업소 목록을 추출
-- 중심 테이블: I2500 / 인허가 업소 정보
-- 연계 테이블: I0470 / 행정처분 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 지역 기반 클린 맛집 추천, 위생 우수 업소 지도 서비스, 행정동 위생 수준 분석
-- -----------------------------------------------------------------------------
SELECT 
    E.LCNS_NO AS "인허가번호",
    E.BSSH_NM AS "업소명",
    E.INDUTY_CD_NM AS "업종",
    E.ADDR AS "주소",
    A.DSPS_TYPECD_NM AS "행정처분유형",
    CASE 
        WHEN A.LCNS_NO IS NULL THEN '클린업소' 
        ELSE '주의업소' 
    END AS "위생상태"
FROM 
    I2500 E
LEFT JOIN 
    I0470 A ON E.LCNS_NO = A.LCNS_NO
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 수입식품 영업자 안전성 진단 및 행정처분 분석 데이터 세트
-- 카테고리: 수입식품 인허가 · 행정처분 정보 연계
-- 목적: 수입식품 영업자의 기본 정보와 행정처분 이력을 연계하여 안전성을 진단
-- 중심 테이블: C001 / 수입식품 인허가 정보
-- 연계 테이블: I0482 / 수입식품 행정처분 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: 수입업자 신뢰도 평가, 행정처분 다발 수입업자 모니터링, 안전한 수입식품 유통 관리
-- -----------------------------------------------------------------------------
SELECT 
    I.LCNS_NO AS "인허가번호",
    I.BSSH_NM AS "수입업소명",
    I.INDUTY_NM AS "업종",
    I.LOCP_ADDR AS "주소",
    D.DSPS_TYPECD_NM AS "행정처분유형",
    D.VILTCN AS "위반내용",
    D.DSPS_DCSNDT AS "처분확정일자"
FROM 
    C001 I
LEFT JOIN 
    I0482 D ON I.LCNS_NO = D.LCNS_NO
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 어린이·고령자 안심 식품 데이터 세트
-- 카테고리: 식품 품목제조보고 · 원재료 · 건강 항목 · 회수/판매중지 정보 연계
-- 목적: 취약계층(어린이, 고령자)을 위한 건강 기능성, 원재료 안정성 및 회수 이력이 없는 안심 식품 조회
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: C002  / 식품원재료
--             I0760 / 건강 항목 그룹 정보
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 어린이 기호식품 품질인증 제품 추천, 고령자 친화 식품 선별, 취약계층 맞춤형 식단 구성
-- -----------------------------------------------------------------------------
SELECT 
    P.PRDLST_REPORT_NO AS "품목제조보고번호",
    P.PRDLST_NM AS "제품명",
    P.CHILD_CRTFC_YN AS "어린이인증여부",
    P.HIENG_LNTRT_DVS_NM AS "고열량저영양여부",
    R.RAWMTRL_NM AS "원재료명",
    H.HELT_ITM_GRP_NM AS "건강항목그룹명",
    C.RTRVLPRVNS AS "회수사유",
    CASE 
        WHEN C.PRDLST_REPORT_NO IS NULL THEN '안심식품' 
        ELSE '주의요망' 
    END AS "안전상태"
FROM 
    I1250 P
LEFT JOIN 
    C002 R ON P.PRDLST_REPORT_NO = R.PRDLST_REPORT_NO
LEFT JOIN 
    I0760 H ON P.PRDLST_DCNM = H.SCLAS_NM
LEFT JOIN 
    I0490 C ON (P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO OR P.PRDLST_NM = C.PRDTNM)
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 지역 식품 안전 모니터링 데이터 세트
-- 카테고리: 식품 품목제조보고 · 행정처분 · 지도점검 · 회수/판매중지 정보 연계
-- 목적: 특정 지역 내 제조/판매되는 식품의 행정처분, 지도점검, 회수 이력을 종합 모니터링
-- 중심 테이블: I1250 / 식품 품목제조보고
-- 연계 테이블: I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: LCNS_NO / 인허가번호, PRDLST_REPORT_NO / 품목제조보고번호
-- 활용 예시: 지자체별 식품안전 통계 산출, 위해식품 발생 우려 지역 예측, 맞춤형 위생 점검 계획 수립
-- -----------------------------------------------------------------------------
SELECT 
    P.LCNS_NO AS "인허가번호",
    P.PRDLST_REPORT_NO AS "품목제조보고번호",
    P.PRDLST_NM AS "제품명",
    A.ADDR AS "주소",
    A.DSPS_TYPECD_NM AS "행정처분유형",
    I.TESTANALS_RSLT AS "지도점검결과",
    C.RTRVLPRVNS AS "회수사유"
FROM 
    I1250 P
LEFT JOIN 
    I0470 A ON P.LCNS_NO = A.LCNS_NO
LEFT JOIN 
    I2620 I ON (P.LCNS_NO = I.LCNS_NO OR P.PRDLST_REPORT_NO = I.PRDLST_REPORT_NO)
LEFT JOIN 
    I0490 C ON (P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO OR P.PRDLST_NM = C.PRDTNM)
WHERE 
    1=1;

-- -----------------------------------------------------------------------------
-- 식품기업 ESG·안전경영지원 데이터 세트
-- 카테고리: HACCP 적용 업소 · 행정처분 · 지도점검 · 회수/판매중지 정보 연계
-- 목적: 식품기업의 지속가능경영(ESG) 및 안전관리 역량(HACCP, 처분/회수 이력 부재 등)을 평가
-- 중심 테이블: I0580 / HACCP 적용 업소 정보
-- 연계 테이블: I0470 / 행정처분 정보
--             I2620 / 지도점검 결과
--             I0490 / 회수 판매중지 정보
-- 주요 기준키: LCNS_NO / 인허가번호
-- 활용 예시: ESG 우수 식품기업 인증, 안전경영 지수 개발, 투자자 대상 기업 안전성 정보 제공
-- -----------------------------------------------------------------------------
SELECT 
    H.LCNS_NO AS "인허가번호",
    H.BSSH_NM AS "업소명",
    H.HACCP_APPN_NO AS "HACCP_지정번호",
    H.HACCP_APPN_DT AS "HACCP_지정일자",
    A.DSPS_TYPECD_NM AS "행정처분유형",
    I.TESTANALS_RSLT AS "지도점검결과",
    C.RTRVLPRVNS AS "회수사유",
    CASE 
        WHEN A.LCNS_NO IS NULL AND C.LCNS_NO IS NULL THEN '우수' 
        ELSE '개선필요' 
    END AS "안전경영등급"
FROM 
    I0580 H
LEFT JOIN 
    I0470 A ON H.LCNS_NO = A.LCNS_NO
LEFT JOIN 
    I2620 I ON H.LCNS_NO = I.LCNS_NO
LEFT JOIN 
    I0490 C ON H.LCNS_NO = C.LCNS_NO
WHERE 
    1=1;
