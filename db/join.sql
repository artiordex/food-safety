-- DB 실제 데이터 기반 검증된 JOIN 관계 목록 (join.sql)
-- [카테시안 곱(데이터 폭발) 방지 적용됨] GROUP BY를 통해 각 테이블에서 키당 1개의 대표값만 추출하여 조인합니다.

-- =========================================================================
-- [I0580] HACCP 적용업소 지정 현황  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0580" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [C003] 건강기능식품 품목제조신고(원재료)  <==>  [I0030] 건강기능식품 품목제조 신고사항 현황
-- 연결 매개체 : 품목제조번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C003" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I0030" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I0960] 건강기능식품공전  <==>  [I2530] 시험항목코드
-- 연결 매개체 : 시험항목코드 (TESTITM_CD)
-- 고유 매칭 건수 : 103 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I0960" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD";


-- =========================================================================
-- [I2620] 검사부적합(국내)  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 업체인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2620" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2600] 공통기준규격  <==>  [I2590] 공통기준종류
-- 연결 매개체 : 공통기준종류코드 (CMMN_SPEC_CD)
-- 고유 매칭 건수 : 26 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."CMMN_SPEC_CD" AS '매칭키_CMMN_SPEC_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I2600" GROUP BY "CMMN_SPEC_CD") A
INNER JOIN (SELECT * FROM "I2590" GROUP BY "CMMN_SPEC_CD") B
    ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD";


-- =========================================================================
-- [I2600] 공통기준규격  <==>  [I2510] 품목유형코드
-- 연결 매개체 : 품목분류코드 (PRDLST_CD)
-- 고유 매칭 건수 : 44 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_CD" AS '매칭키_PRDLST_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I2600" GROUP BY "PRDLST_CD") A
INNER JOIN (SELECT * FROM "I2510" GROUP BY "PRDLST_CD") B
    ON A."PRDLST_CD" = B."PRDLST_CD";


-- =========================================================================
-- [I2600] 공통기준규격  <==>  [I2530] 시험항목코드
-- 연결 매개체 : 시험항목코드 (TESTITM_CD)
-- 고유 매칭 건수 : 16 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I2600" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD";


-- =========================================================================
-- [I2610] 공통기준제외  <==>  [I2510] 품목유형코드
-- 연결 매개체 : 품목코드 (PRDLST_CD)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_CD" AS '매칭키_PRDLST_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I2610" GROUP BY "PRDLST_CD") A
INNER JOIN (SELECT * FROM "I2510" GROUP BY "PRDLST_CD") B
    ON A."PRDLST_CD" = B."PRDLST_CD";


-- =========================================================================
-- [I2610] 공통기준제외  <==>  [I2530] 시험항목코드
-- 연결 매개체 : 시험항목코드 (TESTITM_CD)
-- 고유 매칭 건수 : 4 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I2610" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD";


-- =========================================================================
-- [C005] 바코드연계제품정보  <==>  [I1250] 식품(첨가물)품목제조보고
-- 연결 매개체 : 품목보고(신고)번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C005" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1250" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [C005] 바코드연계제품정보  <==>  [I1310] 축산물 품목제조정보
-- 연결 매개체 : 품목보고(신고)번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C005" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1310" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I0460] 수거검사 계획 및 실적 관련 현황  <==>  [I1310] 축산물 품목제조정보
-- 연결 매개체 : 품목제조보고번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0460" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1310" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [C001] 수입식품등영업신고대장  <==>  [I1260] 식품등수입판매업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1000 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C001" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1260" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I1250] 식품(첨가물)품목제조보고  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I1250" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [C002] 식품(첨가물)품목제조보고(원재료)  <==>  [I1250] 식품(첨가물)품목제조보고
-- 연결 매개체 : 품목제조번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 4 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C002" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1250" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I2859] 식품업소 인허가 변경 정보  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 345 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2859" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2859] 식품업소 인허가 변경 정보  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2859" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0940] 식품용 기구 및 용기.포장 공전  <==>  [I2530] 시험항목코드
-- 연결 매개체 : 시험항목코드 (TESTITM_CD)
-- 고유 매칭 건수 : 12 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I0940" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD";


-- =========================================================================
-- [I0950] 식품첨가물공전  <==>  [I2530] 시험항목코드
-- 연결 매개체 : 시험항목코드 (TESTITM_CD)
-- 고유 매칭 건수 : 17 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."TESTITM_CD" AS '매칭키_TESTITM_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I0950" GROUP BY "TESTITM_CD") A
INNER JOIN (SELECT * FROM "I2530" GROUP BY "TESTITM_CD") B
    ON A."TESTITM_CD" = B."TESTITM_CD";


-- =========================================================================
-- [I2832] 식품판매업 인허가 대장  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 6 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2832" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0080] 어린이 기호식품 품질인증 현황 및 재심사 현황  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 24 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0080" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0080] 어린이 기호식품 품질인증 현황 및 재심사 현황  <==>  [I1310] 축산물 품목제조정보
-- 연결 매개체 : 품목보고번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 5 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0080" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I1310" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I0250] 우수수입업소 등록 현황  <==>  [I1260] 식품등수입판매업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0250" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1260" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2851] 위생용품영업 생산실적보고  <==>  [I2713] 위생용품영업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 72 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2851" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2713" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2851] 위생용품영업 생산실적보고  <==>  [I2711] 위생용품품목제조보고
-- 연결 매개체 : 품목제조보고번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 48 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2851" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I2711" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I2711] 위생용품품목제조보고  <==>  [I2713] 위생용품영업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 29 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2711" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2713" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2712] 위생용품품목제조보고(원재료)  <==>  [I2713] 위생용품영업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 113 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2712" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2713" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2712] 위생용품품목제조보고(원재료)  <==>  [I2711] 위생용품품목제조보고
-- 연결 매개체 : 품목제조번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 48 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2712" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I2711" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I1310] 축산물 품목제조정보  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I1310" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I1310] 축산물 품목제조정보  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 10 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I1310" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0610] 축산물HACCP 지정정보  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 94 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0610" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0480] 행정처분결과(식품제조가공업)  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0480" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0490] 회수.판매중지 정보  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 업체인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 5 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0490" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0310] 건강기능식품 생산실적 보고 품목 현황  <==>  [I0030] 건강기능식품 품목제조 신고사항 현황
-- 연결 매개체 : 품목제조보고번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 5 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0310" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I0030" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I1670] 과태료부과기준  <==>  [I2550] 처분기준코드
-- 연결 매개체 : 처분기준코드 (DSPS_STDR_CD)
-- 고유 매칭 건수 : 66 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."DSPS_STDR_CD" AS '매칭키_DSPS_STDR_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I1670" GROUP BY "DSPS_STDR_CD") A
INNER JOIN (SELECT * FROM "I2550" GROUP BY "DSPS_STDR_CD") B
    ON A."DSPS_STDR_CD" = B."DSPS_STDR_CD";


-- =========================================================================
-- [C002] 식품(첨가물)품목제조보고(원재료)  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 17 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C002" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0300] 식품.식품첨가물 생산실적 보고 현황  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0300" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [C006] 축산물품목제조보고(원재료)  <==>  [I1300] 축산물 가공업허가정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 11 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C006" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1300" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0490] 회수.판매중지 정보  <==>  [I2510] 품목유형코드
-- 연결 매개체 : 품목코드 (PRDLST_CD)
-- 고유 매칭 건수 : 11 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_CD" AS '매칭키_PRDLST_CD',
    A.*, 
    B.*
FROM (SELECT * FROM "I0490" GROUP BY "PRDLST_CD") A
INNER JOIN (SELECT * FROM "I2510" GROUP BY "PRDLST_CD") B
    ON A."PRDLST_CD" = B."PRDLST_CD";


-- =========================================================================
-- [I0580] HACCP 적용업소 지정 현황  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 33 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0580" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I2852] 생산중단제품정보  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I2852" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [C002] 식품(첨가물)품목제조보고(원재료)  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "C002" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I1540] 식품위생등급평가관리내역  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I1540" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0320] 식품이력추적관리 등록 현황  <==>  [I0030] 건강기능식품 품목제조 신고사항 현황
-- 연결 매개체 : 품목보고번호 (PRDLST_REPORT_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."PRDLST_REPORT_NO" AS '매칭키_PRDLST_REPORT_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0320" GROUP BY "PRDLST_REPORT_NO") A
INNER JOIN (SELECT * FROM "I0030" GROUP BY "PRDLST_REPORT_NO") B
    ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO";


-- =========================================================================
-- [I1230] 식품첨가물제조업  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가 번호 (LCNS_NO)
-- 고유 매칭 건수 : 12 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I1230" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0080] 어린이 기호식품 품질인증 현황 및 재심사 현황  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 5 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0080" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0080] 어린이 기호식품 품질인증 현황 및 재심사 현황  <==>  [I2500] 인허가 업소 정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0080" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I2500" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0680] 위생관리등급별 업소 현황  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 2 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0680" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0490] 회수.판매중지 정보  <==>  [I1260] 식품등수입판매업정보
-- 연결 매개체 : 업체인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 3 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0490" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1260" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


-- =========================================================================
-- [I0490] 회수.판매중지 정보  <==>  [I1220] 식품제조가공업정보
-- 연결 매개체 : 업체인허가번호 (LCNS_NO)
-- 고유 매칭 건수 : 1 건 (중복 제거됨)
-- =========================================================================
SELECT DISTINCT
    A."LCNS_NO" AS '매칭키_LCNS_NO',
    A.*, 
    B.*
FROM (SELECT * FROM "I0490" GROUP BY "LCNS_NO") A
INNER JOIN (SELECT * FROM "I1220" GROUP BY "LCNS_NO") B
    ON A."LCNS_NO" = B."LCNS_NO";


