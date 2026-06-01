-- =============================================================================
--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록
--   총 검증된 조인 성공 관계: 49개
--   생성일시: 2026-05-31T12:25:27.740Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [HIGH] I2600.CMMN_SPEC_CD ↔ I2590.CMMN_SPEC_CD
--   - 값 일치율 (Inclusion): 100.0% (26개 / Unique 26개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["000080","000081","000084"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CMMN_SPEC_SEQ" AS "A_공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "A_공통기준종류코드",
    A."SPEC_NM" AS "A_공통기준종류명",
    A."PRDLST_CD" AS "A_품목분류코드",
    A."PRDLST_CD_NM" AS "A_품목명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."TESTITM_NM" AS "A_시험항목명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."ATTRB_SEQ" AS "A_단서조항일련번호",
    A."PIAM_KOR_NM" AS "A_단서조항명",
    A."SPEC_VAL" AS "A_기준규격",
    A."SPEC_VAL_SUMUP" AS "A_기준규격요약",
    A."VALD_BEGN_DT" AS "A_유효개시일",
    A."VALD_END_DT" AS "A_유효종료일",
    A."SORC" AS "A_출처",
    A."VALD_MANLI" AS "A_유효자리",
    A."JDGMNT_FOM_CD" AS "A_판정형식코드",
    A."A079_FNPRT_CD_NM" AS "A_판정형식명",
    A."MXMM_VAL" AS "A_최대값",
    A."MXMM_VAL_DVS_CD" AS "A_최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "A_최대값구분명",
    A."MIMM_VAL" AS "A_최소값",
    A."MIMM_VAL_DVS_CD" AS "A_최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "A_최소값구분명",
    A."CHOIC_FIT" AS "A_선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "A_선택형적합명",
    A."CHOIC_IMPROPT" AS "A_선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "A_선택형부적합명",
    A."MCRRGNSM_2N" AS "A_미생물2N",
    A."MCRRGNSM_2C" AS "A_미생물2C",
    A."MCRRGNSM_2M" AS "A_미생물2M",
    A."MCRRGNSM_3M" AS "A_미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "A_세부항목포함여부",
    A."INJRY_YN" AS "A_위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "A_중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "A_감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "A_공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "A_자품검사시험항목여부",
    A."UNIT_CD" AS "A_단위코드",
    A."UNIT_NM" AS "A_단위명",
    A."UPDT_PRVNS" AS "A_수정사유",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."CMMN_SPEC_CD" AS "B_공통기준규격코드",
    B."SPEC_NM" AS "B_기준규격명",
    B."HRNK_CMMN_SPEC_CD" AS "B_상위공통기준규격코드",
    B."LV" AS "B_레벨",
    B."DFN" AS "B_정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I2600" A
INNER JOIN "I2590" B ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2. [HIGH] C001.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (1000개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19880066159","19910355053","19910358063"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."INDUTY_NM" AS "A_업종",
    A."PRMS_DT" AS "A_허가일자",
    A."LOCP_ADDR" AS "A_주소",
    A."INSTT_NM" AS "A_기관명",
    A."TELNO" AS "A_전화번호",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "C001" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 3. [HIGH] I1250.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (2개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_허가일자",
    A."PRDLST_NM" AS "A_제품명",
    A."PRDLST_DCNM" AS "A_품목유형명",
    A."PRODUCTION" AS "A_생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "A_고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "A_어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "A_소비기한",
    A."LAST_UPDT_DTM" AS "A_최종수정일자",
    A."INDUTY_CD_NM" AS "A_업종",
    A."QLITY_MNTNC_TMLMT_DAYCNT" AS "A_품질유지기한일수",
    A."USAGE" AS "A_용법",
    A."PRPOS" AS "A_용도",
    A."DISPOS" AS "A_제품형태",
    A."FRMLC_MTRQLT" AS "A_포장재질",
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I1250" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 4. [HIGH] I2859.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (345개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19670154002","19720154001","19720275004"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LCNS_NO" AS "A_인허가번호",
    A."TELNO" AS "A_전화번호",
    A."SITE_ADDR" AS "A_주소",
    A."CHNG_DT" AS "A_변경일자",
    A."CHNG_BF_CN" AS "A_변경전내용",
    A."CHNG_AF_CN" AS "A_변경후내용",
    A."CHNG_PRVNS" AS "A_변경사유",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2859" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 5. [HIGH] I1310.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (10개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_제품명",
    A."PRDLST_DCNM" AS "A_유형",
    A."PRODUCTION" AS "A_생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "A_고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "A_어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "A_소비기한",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LAST_UPDT_DTM" AS "A_최종수정일자",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I1310" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 6. [HIGH] I2711.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 78.4% (29개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 985건 매칭됨
--   - 매칭된 샘플 데이터   : ["19879368002","19879415001","19889294002"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_허가일자",
    A."PRDLST_NM" AS "A_제품명",
    A."PRDLST_DCNM" AS "A_유형",
    A."PRODUCTION" AS "A_생산종료여부",
    A."POG_DAYCNT" AS "A_유통",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LAST_UPDT_DTM" AS "A_최종수정일자",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2711" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [HIGH] I2600.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 31.7% (44개 / Unique 139개)
--   - 실제 JOIN 레코드 수 : 788건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0000000000000","A0100000000000","A0100100000000"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CMMN_SPEC_SEQ" AS "A_공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "A_공통기준종류코드",
    A."SPEC_NM" AS "A_공통기준종류명",
    A."PRDLST_CD" AS "A_품목분류코드",
    A."PRDLST_CD_NM" AS "A_품목명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."TESTITM_NM" AS "A_시험항목명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."ATTRB_SEQ" AS "A_단서조항일련번호",
    A."PIAM_KOR_NM" AS "A_단서조항명",
    A."SPEC_VAL" AS "A_기준규격",
    A."SPEC_VAL_SUMUP" AS "A_기준규격요약",
    A."VALD_BEGN_DT" AS "A_유효개시일",
    A."VALD_END_DT" AS "A_유효종료일",
    A."SORC" AS "A_출처",
    A."VALD_MANLI" AS "A_유효자리",
    A."JDGMNT_FOM_CD" AS "A_판정형식코드",
    A."A079_FNPRT_CD_NM" AS "A_판정형식명",
    A."MXMM_VAL" AS "A_최대값",
    A."MXMM_VAL_DVS_CD" AS "A_최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "A_최대값구분명",
    A."MIMM_VAL" AS "A_최소값",
    A."MIMM_VAL_DVS_CD" AS "A_최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "A_최소값구분명",
    A."CHOIC_FIT" AS "A_선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "A_선택형적합명",
    A."CHOIC_IMPROPT" AS "A_선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "A_선택형부적합명",
    A."MCRRGNSM_2N" AS "A_미생물2N",
    A."MCRRGNSM_2C" AS "A_미생물2C",
    A."MCRRGNSM_2M" AS "A_미생물2M",
    A."MCRRGNSM_3M" AS "A_미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "A_세부항목포함여부",
    A."INJRY_YN" AS "A_위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "A_중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "A_감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "A_공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "A_자품검사시험항목여부",
    A."UNIT_CD" AS "A_단위코드",
    A."UNIT_NM" AS "A_단위명",
    A."UPDT_PRVNS" AS "A_수정사유",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."LV" AS "B_레벨",
    B."PRDLST_CD" AS "B_품목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."DFN" AS "B_정의",
    B."VALD_BEGN_DT" AS "B_유효개시일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."HRNK_PRDLST_CD" AS "B_상위품목코드",
    B."HTRK_PRDLST_CD" AS "B_최상위품목코드",
    B."MXTR_PRDLST_YN" AS "B_조합품목여부",
    B."ATTRB_SEQ" AS "B_속성일련번호",
    B."PIAM_KOR_NM" AS "B_속성한글명",
    B."PRDLST_YN" AS "B_품목여부",
    B."UPDT_PRVNS" AS "B_수정사유",
    B."USE_YN" AS "B_사용여부",
    B."RM" AS "B_비고",
    B."FDGRP_YN" AS "B_식품군여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일",
    B."CHD_SMBL_FD_YN" AS "B_어린이기호식품 여부"
FROM "I2600" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [HIGH] I2712.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 70.6% (113개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 784건 매칭됨
--   - 매칭된 샘플 데이터   : ["11111111123","19879415001","19909614003"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_유형",
    A."RAWMTRL_NM" AS "A_원재료",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2712" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [HIGH] I2851.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 42.1% (72개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 721건 매칭됨
--   - 매칭된 샘플 데이터   : ["19859046001","19899221002","19909601001"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_NM" AS "A_품목명",
    A."GUBUN" AS "A_품목구분",
    A."H_ITEM_NM" AS "A_품목유형",
    A."LCNS_NO" AS "A_인허가번호",
    A."EVL_YR" AS "A_보고년도",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."PRDCTN_QY" AS "A_생산량(KG",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2851" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [HIGH] I0960.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 60.9% (103개 / Unique 169개)
--   - 실제 JOIN 레코드 수 : 567건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10018","A10019","A10020"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDLST_CD" AS "A_품목코드",
    A."PC_KOR_NM" AS "A_품목한글명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."T_KOR_NM" AS "A_시험항목 한글명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."SPEC_VAL" AS "A_기준규격값",
    A."SPEC_VAL_SUMUP" AS "A_기준규격값 요약",
    A."VALD_BEGN_DT" AS "A_유효개시일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    A."SORC" AS "A_출처",
    A."MXMM_VAL" AS "A_최대값",
    A."MIMM_VAL" AS "A_최소값",
    A."INJRY_YN" AS "A_위해여부",
    A."UNIT_NM" AS "A_단위명",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."ABRV" AS "B_약어",
    B."NCKNM" AS "B_이명",
    B."TESTITM_NM" AS "B_시험항목명",
    B."TESTITM_LCLAS_CD" AS "B_시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "B_시험항목대분류코드",
    B."L_KOR_NM" AS "B_대분류한글명",
    B."TESTITM_MLSFC_CD" AS "B_시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "B_시험항목중분류코드",
    B."M_KOR_NM" AS "B_중분류한글명",
    B."REMN_MTTR_DFN" AS "B_잔류물질정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I0960" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [SUGGESTED] I0300.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 5.6% (3개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 385건 매칭됨
--   - 매칭된 샘플 데이터   : ["20030467180","20080236134","20100530033"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."SITE_ADDR" AS "A_주소",
    A."EVL_YR" AS "A_보고년도",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."H_ITEM_NM" AS "A_품목유형",
    A."PRDLST_NM" AS "A_품목명",
    A."FYER_PRDCTN_ABRT_QY" AS "A_연간생산능력(KG",
    A."PRDCTN_QY" AS "A_생산량(KG",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0300" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [HIGH] I0940.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 16.9% (12개 / Unique 71개)
--   - 실제 JOIN 레코드 수 : 230건 매칭됨
--   - 매칭된 샘플 데이터   : ["A20024","A20025","A30009"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDLST_CD" AS "A_품목코드",
    A."PC_KOR_NM" AS "A_품목한글명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."T_KOR_NM" AS "A_시험항목 한글명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."SPEC_VAL" AS "A_기준규격값",
    A."SPEC_VAL_SUMUP" AS "A_기준규격값 요약",
    A."VALD_BEGN_DT" AS "A_유효개시일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    A."SORC" AS "A_출처",
    A."MXMM_VAL" AS "A_최대값",
    A."MIMM_VAL" AS "A_최소값",
    A."INJRY_YN" AS "A_위해여부",
    A."UNIT_NM" AS "A_단위명",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."ABRV" AS "B_약어",
    B."NCKNM" AS "B_이명",
    B."TESTITM_NM" AS "B_시험항목명",
    B."TESTITM_LCLAS_CD" AS "B_시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "B_시험항목대분류코드",
    B."L_KOR_NM" AS "B_대분류한글명",
    B."TESTITM_MLSFC_CD" AS "B_시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "B_시험항목중분류코드",
    B."M_KOR_NM" AS "B_중분류한글명",
    B."REMN_MTTR_DFN" AS "B_잔류물질정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I0940" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [HIGH] I1310.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 30.0% (3개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 212건 매칭됨
--   - 매칭된 샘플 데이터   : ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_제품명",
    A."PRDLST_DCNM" AS "A_유형",
    A."PRODUCTION" AS "A_생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "A_고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "A_어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "A_소비기한",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LAST_UPDT_DTM" AS "A_최종수정일자",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I1310" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [HIGH] I2600.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 5.4% (16개 / Unique 299개)
--   - 실제 JOIN 레코드 수 : 171건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10029","A30023","B10001"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CMMN_SPEC_SEQ" AS "A_공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "A_공통기준종류코드",
    A."SPEC_NM" AS "A_공통기준종류명",
    A."PRDLST_CD" AS "A_품목분류코드",
    A."PRDLST_CD_NM" AS "A_품목명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."TESTITM_NM" AS "A_시험항목명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."ATTRB_SEQ" AS "A_단서조항일련번호",
    A."PIAM_KOR_NM" AS "A_단서조항명",
    A."SPEC_VAL" AS "A_기준규격",
    A."SPEC_VAL_SUMUP" AS "A_기준규격요약",
    A."VALD_BEGN_DT" AS "A_유효개시일",
    A."VALD_END_DT" AS "A_유효종료일",
    A."SORC" AS "A_출처",
    A."VALD_MANLI" AS "A_유효자리",
    A."JDGMNT_FOM_CD" AS "A_판정형식코드",
    A."A079_FNPRT_CD_NM" AS "A_판정형식명",
    A."MXMM_VAL" AS "A_최대값",
    A."MXMM_VAL_DVS_CD" AS "A_최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "A_최대값구분명",
    A."MIMM_VAL" AS "A_최소값",
    A."MIMM_VAL_DVS_CD" AS "A_최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "A_최소값구분명",
    A."CHOIC_FIT" AS "A_선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "A_선택형적합명",
    A."CHOIC_IMPROPT" AS "A_선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "A_선택형부적합명",
    A."MCRRGNSM_2N" AS "A_미생물2N",
    A."MCRRGNSM_2C" AS "A_미생물2C",
    A."MCRRGNSM_2M" AS "A_미생물2M",
    A."MCRRGNSM_3M" AS "A_미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "A_세부항목포함여부",
    A."INJRY_YN" AS "A_위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "A_중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "A_감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "A_공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "A_자품검사시험항목여부",
    A."UNIT_CD" AS "A_단위코드",
    A."UNIT_NM" AS "A_단위명",
    A."UPDT_PRVNS" AS "A_수정사유",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."ABRV" AS "B_약어",
    B."NCKNM" AS "B_이명",
    B."TESTITM_NM" AS "B_시험항목명",
    B."TESTITM_LCLAS_CD" AS "B_시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "B_시험항목대분류코드",
    B."L_KOR_NM" AS "B_대분류한글명",
    B."TESTITM_MLSFC_CD" AS "B_시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "B_시험항목중분류코드",
    B."M_KOR_NM" AS "B_중분류한글명",
    B."REMN_MTTR_DFN" AS "B_잔류물질정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I2600" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [HIGH] I0610.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 9.7% (94개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 95건 매칭됨
--   - 매칭된 샘플 데이터   : ["19760262002","19790532001","19850262004"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."INDUTY_CD_NM" AS "A_업종명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."CLSBIZ_DVS_CD_NM" AS "A_영업상태",
    A."CLSBIZ_DT" AS "A_폐업일자",
    A."SITE_ADDR" AS "A_업소주소",
    A."HACCP_APPN_DT" AS "A_HACCP 지정일자",
    A."HACCP_APPN_NO" AS "A_HACCP 지정번호",
    A."ASGN_CANCL_DT" AS "A_지정취소일자",
    A."CRTFC_ENDDT" AS "A_인증종료일자",
    A."CRTFC_RETN_DT" AS "A_인증반납일자",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I0610" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [HIGH] I0950.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 50.0% (17개 / Unique 34개)
--   - 실제 JOIN 레코드 수 : 94건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10008","A10029","A10098"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDLST_CD" AS "A_품목코드",
    A."PC_KOR_NM" AS "A_품목한글명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."T_KOR_NM" AS "A_시험항목 한글명",
    A."FNPRT_ITM_NM" AS "A_세부항목명",
    A."SPEC_VAL" AS "A_기준규격값",
    A."SPEC_VAL_SUMUP" AS "A_기준규격값 요약",
    A."VALD_BEGN_DT" AS "A_유효개시일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    A."SORC" AS "A_출처",
    A."MXMM_VAL" AS "A_최대값",
    A."MIMM_VAL" AS "A_최소값",
    A."INJRY_YN" AS "A_위해여부",
    A."UNIT_NM" AS "A_단위명",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."ABRV" AS "B_약어",
    B."NCKNM" AS "B_이명",
    B."TESTITM_NM" AS "B_시험항목명",
    B."TESTITM_LCLAS_CD" AS "B_시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "B_시험항목대분류코드",
    B."L_KOR_NM" AS "B_대분류한글명",
    B."TESTITM_MLSFC_CD" AS "B_시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "B_시험항목중분류코드",
    B."M_KOR_NM" AS "B_중분류한글명",
    B."REMN_MTTR_DFN" AS "B_잔류물질정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I0950" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [SUGGESTED] C002.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 6.3% (17개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 73건 매칭됨
--   - 매칭된 샘플 데이터   : ["19940506240","19950433026","19990461386"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_품목유형명",
    A."RAWMTRL_NM" AS "A_원재료명",
    A."RAWMTRL_ORDNO" AS "A_원재료표시순서",
    A."CHNG_DT" AS "A_변경일자(YYYYMMDD)",
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "C002" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [SUGGESTED] I1670.DSPS_STDR_CD ↔ I2550.DSPS_STDR_CD
--   - 값 일치율 (Inclusion): 13.4% (66개 / Unique 493개)
--   - 실제 JOIN 레코드 수 : 66건 매칭됨
--   - 매칭된 샘플 데이터   : ["00409702000000","00409702000053","00409702000010"]
-- -----------------------------------------------------------------------------
SELECT 
    A."DSPS_STDR_CD" AS "A_처분기준코드",
    A."DSPS_STDR_CD_NM" AS "A_처분기준명",
    A."LV_NO" AS "A_레벨",
    A."BASIS_LAWORD" AS "A_근거법령",
    A."VILT_TYPE_NM" AS "A_위반유형",
    A."VALD_BGN_DT" AS "A_유효시작일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    B."DSPS_STDR_CD" AS "B_처분기준코드",
    B."HRNK_DSPS_STDR_CD" AS "B_상위처분기준코드",
    B."LV_NO" AS "B_레벨",
    B."DSPS_STDR_CD_NM" AS "B_처분기준코드명",
    B."BASIS_LAWORD" AS "B_근거법령",
    B."VILT_TYPE_CD" AS "B_위반유형코드",
    B."VILT_TYPE_CD_NM" AS "B_위반유형명",
    B."USE_YN" AS "B_사용여부",
    B."VALD_BGN_DT" AS "B_유효시작일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I1670" A
INNER JOIN "I2550" B ON A."DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."DSPS_STDR_CD" IS NOT NULL AND A."DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [HIGH] I0080.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 11.1% (24개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 64건 매칭됨
--   - 매칭된 샘플 데이터   : ["19760262001","19760262002","19770262001"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CHILD_FFQ_CRTFC_NO" AS "A_인증번호",
    A."BSSH_NM" AS "A_업소명",
    A."LCNS_NO" AS "A_인허가번호",
    A."PRDLST_CD_NM" AS "A_식품유형",
    A."PRDLST_NM" AS "A_제품명",
    A."CN_WT" AS "A_제품용량",
    A."APPN_BGN_DT" AS "A_인증일자",
    A."APPN_END_DT" AS "A_만료일자",
    A."CHILD_FAVOR_FOOD_TYPE_NM" AS "A_제품형태",
    A."PRDLST_REPORT_NO" AS "A_품목보고번호",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I0080" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [HIGH] I2851.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 6.4% (48개 / Unique 755개)
--   - 실제 JOIN 레코드 수 : 48건 매칭됨
--   - 매칭된 샘플 데이터   : ["198992210021","199593080012","199593080013"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_NM" AS "A_품목명",
    A."GUBUN" AS "A_품목구분",
    A."H_ITEM_NM" AS "A_품목유형",
    A."LCNS_NO" AS "A_인허가번호",
    A."EVL_YR" AS "A_보고년도",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."PRDCTN_QY" AS "A_생산량(KG",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_허가일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_유형",
    B."PRODUCTION" AS "B_생산종료여부",
    B."POG_DAYCNT" AS "B_유통",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "I2851" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [HIGH] I2712.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 4.8% (48개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 48건 매칭됨
--   - 매칭된 샘플 데이터   : ["19879415001133","19879415001134","19879415001135"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_유형",
    A."RAWMTRL_NM" AS "A_원재료",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_허가일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_유형",
    B."PRODUCTION" AS "B_생산종료여부",
    B."POG_DAYCNT" AS "B_유통",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "I2712" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [SUGGESTED] I0580.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 5.0% (33개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 45건 매칭됨
--   - 매칭된 샘플 데이터   : ["19930355035","19950364019","20020445130"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."INDUTY_CD_NM" AS "A_업종",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."SITE_ADDR" AS "A_주소",
    A."HACCP_APPN_DT" AS "A_HACCP 지정일자",
    A."HACCP_APPN_NO" AS "A_HACCP 지정번호",
    A."PRDLST_NM" AS "A_품목명",
    A."CLSBIZ_DVS_CD_NM" AS "A_영업상태",
    A."CLSBIZ_DT" AS "A_폐업일자",
    A."ASGN_CANCL_DT" AS "A_지정취소일자",
    A."CRTFC_ENDDT" AS "A_인증종료일자",
    A."CRTFC_RETN_DT" AS "A_인증반납일자",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0580" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [SUGGESTED] C006.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 9.6% (11개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 25건 매칭됨
--   - 매칭된 샘플 데이터   : ["19930405001","19960262002","20030262013"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_유형",
    A."RAWMTRL_NM" AS "A_원재료",
    A."LCNS_NO" AS "A_인허가번호",
    A."CHNG_DT" AS "A_변경일자",
    A."RAWMTRL_ORDNO" AS "A_원재료표시순서",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "C006" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [SUGGESTED] I0080.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (5개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 25건 매칭됨
--   - 매칭된 샘플 데이터   : ["19720275004","19910461101","20040275047"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CHILD_FFQ_CRTFC_NO" AS "A_인증번호",
    A."BSSH_NM" AS "A_업소명",
    A."LCNS_NO" AS "A_인허가번호",
    A."PRDLST_CD_NM" AS "A_식품유형",
    A."PRDLST_NM" AS "A_제품명",
    A."CN_WT" AS "A_제품용량",
    A."APPN_BGN_DT" AS "A_인증일자",
    A."APPN_END_DT" AS "A_만료일자",
    A."CHILD_FAVOR_FOOD_TYPE_NM" AS "A_제품형태",
    A."PRDLST_REPORT_NO" AS "A_품목보고번호",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0080" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [HIGH] I2610.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 57.1% (4개 / Unique 7개)
--   - 실제 JOIN 레코드 수 : 16건 매칭됨
--   - 매칭된 샘플 데이터   : ["B10002","B10004","B10006"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CMMN_SPEC_CD" AS "A_공통기준규격코드",
    A."SPEC_NM" AS "A_기준규격명",
    A."PRDLST_CD" AS "A_품목코드",
    A."KOR_NM" AS "A_한글명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."ABRV" AS "B_약어",
    B."NCKNM" AS "B_이명",
    B."TESTITM_NM" AS "B_시험항목명",
    B."TESTITM_LCLAS_CD" AS "B_시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "B_시험항목대분류코드",
    B."L_KOR_NM" AS "B_대분류한글명",
    B."TESTITM_MLSFC_CD" AS "B_시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "B_시험항목중분류코드",
    B."M_KOR_NM" AS "B_중분류한글명",
    B."REMN_MTTR_DFN" AS "B_잔류물질정의",
    B."USE_YN" AS "B_사용여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일시"
FROM "I2610" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 26. [SUGGESTED] I0490.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 9.2% (11개 / Unique 119개)
--   - 실제 JOIN 레코드 수 : 16건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0101000004000","A0200400004000","A0300000000000"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDTNM" AS "A_제품명",
    A."RTRVLPRVNS" AS "A_회수사유",
    A."BSSHNM" AS "A_제조업체명",
    A."ADDR" AS "A_업체주소",
    A."TELNO" AS "A_전화번호",
    A."BRCDNO" AS "A_바코드번호",
    A."FRMLCUNIT" AS "A_포장단위",
    A."MNFDT" AS "A_제조일자",
    A."RTRVLPLANDOC_RTRVLMTHD" AS "A_회수방법",
    A."DISTBTMLMT" AS "A_유통",
    A."PRDLST_TYPE" AS "A_식품분류",
    A."IMG_FILE_PATH" AS "A_제품사진 URL",
    A."PRDLST_CD" AS "A_품목코드",
    A."CRET_DTM" AS "A_등록일",
    A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."RTRVL_GRDCD_NM" AS "A_회수등급",
    A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
    A."LCNS_NO" AS "A_업체인허가번호",
    B."LV" AS "B_레벨",
    B."PRDLST_CD" AS "B_품목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."DFN" AS "B_정의",
    B."VALD_BEGN_DT" AS "B_유효개시일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."HRNK_PRDLST_CD" AS "B_상위품목코드",
    B."HTRK_PRDLST_CD" AS "B_최상위품목코드",
    B."MXTR_PRDLST_YN" AS "B_조합품목여부",
    B."ATTRB_SEQ" AS "B_속성일련번호",
    B."PIAM_KOR_NM" AS "B_속성한글명",
    B."PRDLST_YN" AS "B_품목여부",
    B."UPDT_PRVNS" AS "B_수정사유",
    B."USE_YN" AS "B_사용여부",
    B."RM" AS "B_비고",
    B."FDGRP_YN" AS "B_식품군여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일",
    B."CHD_SMBL_FD_YN" AS "B_어린이기호식품 여부"
FROM "I0490" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 27. [SUGGESTED] I2852.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (2개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 13건 매칭됨
--   - 매칭된 샘플 데이터   : ["20030149214","20160263104"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."PRMS_DT" AS "A_품목보고일자",
    A."PRDLST_NM" AS "A_제품명",
    A."END_DT" AS "A_생산중단일자",
    A."PRDLST_DCNM" AS "A_품목유형명",
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."FOOD_HF_LS_CL_CD_NM" AS "A_구분",
    A."ARTCL_END_WHY" AS "A_생산중단사유",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2852" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 28. [SUGGESTED] I1230.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 1.2% (12개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 12건 매칭됨
--   - 매칭된 샘플 데이터   : ["19630255002","19630355001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가 번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."INDUTY_NM" AS "A_업종",
    A."PRMS_DT" AS "A_허가일자",
    A."TELNO" AS "A_전화번호",
    A."LOCP_ADDR" AS "A_주소",
    A."INSTT_NM" AS "A_기관명",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I1230" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 29. [HIGH] I0080.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.7% (5개 / Unique 742개)
--   - 실제 JOIN 레코드 수 : 7건 매칭됨
--   - 매칭된 샘플 데이터   : ["1977026200119","1977026200126","1977026200157"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CHILD_FFQ_CRTFC_NO" AS "A_인증번호",
    A."BSSH_NM" AS "A_업소명",
    A."LCNS_NO" AS "A_인허가번호",
    A."PRDLST_CD_NM" AS "A_식품유형",
    A."PRDLST_NM" AS "A_제품명",
    A."CN_WT" AS "A_제품용량",
    A."APPN_BGN_DT" AS "A_인증일자",
    A."APPN_END_DT" AS "A_만료일자",
    A."CHILD_FAVOR_FOOD_TYPE_NM" AS "A_제품형태",
    A."PRDLST_REPORT_NO" AS "A_품목보고번호",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_보고일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_유형",
    B."PRODUCTION" AS "B_생산종료여부",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양식품여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."POG_DAYCNT" AS "B_소비기한",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "I0080" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 30. [HIGH] I0490.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (5개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 7건 매칭됨
--   - 매칭된 샘플 데이터   : ["19910262003","19960379001","19980262029"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDTNM" AS "A_제품명",
    A."RTRVLPRVNS" AS "A_회수사유",
    A."BSSHNM" AS "A_제조업체명",
    A."ADDR" AS "A_업체주소",
    A."TELNO" AS "A_전화번호",
    A."BRCDNO" AS "A_바코드번호",
    A."FRMLCUNIT" AS "A_포장단위",
    A."MNFDT" AS "A_제조일자",
    A."RTRVLPLANDOC_RTRVLMTHD" AS "A_회수방법",
    A."DISTBTMLMT" AS "A_유통",
    A."PRDLST_TYPE" AS "A_식품분류",
    A."IMG_FILE_PATH" AS "A_제품사진 URL",
    A."PRDLST_CD" AS "A_품목코드",
    A."CRET_DTM" AS "A_등록일",
    A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."RTRVL_GRDCD_NM" AS "A_회수등급",
    A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
    A."LCNS_NO" AS "A_업체인허가번호",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I0490" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 31. [HIGH] I2832.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.6% (6개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 6건 매칭됨
--   - 매칭된 샘플 데이터   : ["18820308001","19680134001","19700129010"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."INDUTY_NM" AS "A_업종",
    A."PRMS_DT" AS "A_허가일자",
    A."LOCP_ADDR" AS "A_주소",
    A."INSTT_NM" AS "A_기관명",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I2832" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 32. [SUGGESTED] I0310.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.5% (5개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 5건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040015191104","20040016020168","20040016020196"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_NM" AS "A_품목명",
    A."GUBUN" AS "A_품목구분",
    A."H_ITEM_NM" AS "A_품목유형",
    A."LCNS_NO" AS "A_인허가번호",
    A."EVL_YR" AS "A_보고년도",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."FYER_PRDCTN_ABRT_QY" AS "A_연간생산능력(KG)",
    A."PRDCTN_QY" AS "A_생산량(KG)",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소_명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRDLST_NM" AS "B_품목_명",
    B."PRMS_DT" AS "B_허가_일자",
    B."POG_DAYCNT" AS "B_소비기한_일수",
    B."DISPOS" AS "B_제품형태",
    B."NTK_MTHD" AS "B_섭취방법",
    B."PRIMARY_FNCLTY" AS "B_주된기능성",
    B."IFTKN_ATNT_MATR_CN" AS "B_섭취시주의사항",
    B."CSTDY_MTHD" AS "B_보관방법",
    B."PRDLST_CDNM" AS "B_유형",
    B."STDR_STND" AS "B_기준규격",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양여부",
    B."PRODUCTION" AS "B_생산종료여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."PRDT_SHAP_CD_NM" AS "B_제품_형태_코드_명",
    B."FRMLC_MTRQLT" AS "B_포장재질",
    B."RAWMTRL_NM" AS "B_품목유형(기능지표성분)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자",
    B."INDIV_RAWMTRL_NM" AS "B_기능성 원재료",
    B."ETC_RAWMTRL_NM" AS "B_기타 원재료",
    B."CAP_RAWMTRL_NM" AS "B_캡슐 원재료",
    B."FRMLC_MTHD" AS "B_포장방법"
FROM "I0310" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 33. [SUGGESTED] C002.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 1.1% (3개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 5건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001","19660202002","19690086003"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_품목유형명",
    A."RAWMTRL_NM" AS "A_원재료명",
    A."RAWMTRL_ORDNO" AS "A_원재료표시순서",
    A."CHNG_DT" AS "A_변경일자(YYYYMMDD)",
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "C002" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 34. [SUGGESTED] I0080.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.5% (1개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 4건 매칭됨
--   - 매칭된 샘플 데이터   : ["19690086003"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CHILD_FFQ_CRTFC_NO" AS "A_인증번호",
    A."BSSH_NM" AS "A_업소명",
    A."LCNS_NO" AS "A_인허가번호",
    A."PRDLST_CD_NM" AS "A_식품유형",
    A."PRDLST_NM" AS "A_제품명",
    A."CN_WT" AS "A_제품용량",
    A."APPN_BGN_DT" AS "A_인증일자",
    A."APPN_END_DT" AS "A_만료일자",
    A."CHILD_FAVOR_FOOD_TYPE_NM" AS "A_제품형태",
    A."PRDLST_REPORT_NO" AS "A_품목보고번호",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I0080" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 35. [HIGH] I2620.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 3.4% (3개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040379002","20110262008","20250371008"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDTNM" AS "A_제품명",
    A."BSSHNM" AS "A_업소명",
    A."MNFDT" AS "A_제조일자",
    A."DISTBTMLMT" AS "A_유통",
    A."ADDR" AS "A_영업자주소",
    A."INSTT_NM" AS "A_검사기관",
    A."REGSTR_TELNO" AS "A_전화번호",
    A."BRCDNO" AS "A_바코드번호",
    A."FRMLCUNIT" AS "A_포장단위",
    A."TEST_ITMNM" AS "A_부적합항목",
    A."STDR_STND" AS "A_기준규격",
    A."TESTANALS_RSLT" AS "A_검사결과",
    A."CRET_DTM" AS "A_등록일",
    A."RTRVLDSUSE_SEQ" AS "A_회수폐기일련번호",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."LCNS_NO" AS "A_업체인허가번호",
    A."REPORTR_TELNO" AS "A_보고자전화번호",
    A."PRDLST_CD_NM" AS "A_식품유형",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I2620" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 36. [HIGH] I0460.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.8% (3개 / Unique 366개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["19790257016213","19790257016801","19790257016802"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRCSCITYPOINT_INDUTYCD_NM" AS "A_업종",
    A."BSSH_NM" AS "A_업소명",
    A."SITE_ADDR" AS "A_소재지",
    A."PRDTNM" AS "A_제품명",
    A."TKAWYDTM" AS "A_수거일자",
    A."JDGMNT_CD_NM" AS "A_판정결과",
    A."EXC_INSTT_NM" AS "A_수행기관명",
    A."TKAWYSPCI_TYPECD_NM" AS "A_검체구분",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    A."TKAWYPRNO" AS "A_수거증번호",
    A."PLAN_TITL" AS "A_수거계획명",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_보고일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_유형",
    B."PRODUCTION" AS "B_생산종료여부",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양식품여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."POG_DAYCNT" AS "B_소비기한",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "I0460" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 37. [HIGH] I0480.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.8% (2개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20200363209","20250875056"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRCSCITYPOINT_BSSHNM" AS "A_업소명",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LCNS_NO" AS "A_인허가번호",
    A."DSPS_DCSNDT" AS "A_처분확정일자",
    A."DSPS_BGNDT" AS "A_처분시작일(영업정지의경우)",
    A."DSPS_ENDDT" AS "A_처분종료일(영업정지의경우)",
    A."DSPS_TYPECD_NM" AS "A_처분유형",
    A."VILTCN" AS "A_위반일자및위반내용",
    A."ADDR" AS "A_주소",
    A."TELNO" AS "A_전화번호",
    A."PRSDNT_NM" AS "A_대표자명",
    A."LAWORD_CD_NM" AS "A_위반법령",
    A."DSPSCN" AS "A_처분내용",
    A."PUBLIC_DT" AS "A_공개기한",
    A."LAST_UPDT_DTM" AS "A_최종수정일",
    A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
    A."DSPS_INSTTCD_NM" AS "A_처분기관명",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0480" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 38. [SUGGESTED] I0490.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 1.4% (3개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20010114979","20130036663","20190014192"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDTNM" AS "A_제품명",
    A."RTRVLPRVNS" AS "A_회수사유",
    A."BSSHNM" AS "A_제조업체명",
    A."ADDR" AS "A_업체주소",
    A."TELNO" AS "A_전화번호",
    A."BRCDNO" AS "A_바코드번호",
    A."FRMLCUNIT" AS "A_포장단위",
    A."MNFDT" AS "A_제조일자",
    A."RTRVLPLANDOC_RTRVLMTHD" AS "A_회수방법",
    A."DISTBTMLMT" AS "A_유통",
    A."PRDLST_TYPE" AS "A_식품분류",
    A."IMG_FILE_PATH" AS "A_제품사진 URL",
    A."PRDLST_CD" AS "A_품목코드",
    A."CRET_DTM" AS "A_등록일",
    A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."RTRVL_GRDCD_NM" AS "A_회수등급",
    A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
    A."LCNS_NO" AS "A_업체인허가번호",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0490" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 39. [HIGH] I0580.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.2% (1개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19690364004"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."INDUTY_CD_NM" AS "A_업종",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."SITE_ADDR" AS "A_주소",
    A."HACCP_APPN_DT" AS "A_HACCP 지정일자",
    A."HACCP_APPN_NO" AS "A_HACCP 지정번호",
    A."PRDLST_NM" AS "A_품목명",
    A."CLSBIZ_DVS_CD_NM" AS "A_영업상태",
    A."CLSBIZ_DT" AS "A_폐업일자",
    A."ASGN_CANCL_DT" AS "A_지정취소일자",
    A."CRTFC_ENDDT" AS "A_인증종료일자",
    A."CRTFC_RETN_DT" AS "A_인증반납일자",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I0580" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 40. [HIGH] C002.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.2% (2개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001438","19550509001587"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_보고일자",
    A."PRDLST_NM" AS "A_품목명",
    A."PRDLST_DCNM" AS "A_품목유형명",
    A."RAWMTRL_NM" AS "A_원재료명",
    A."RAWMTRL_ORDNO" AS "A_원재료표시순서",
    A."CHNG_DT" AS "A_변경일자(YYYYMMDD)",
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_허가일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_품목유형명",
    B."PRODUCTION" AS "B_생산종료여부",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양식품여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."POG_DAYCNT" AS "B_소비기한",
    B."LAST_UPDT_DTM" AS "B_최종수정일자",
    B."INDUTY_CD_NM" AS "B_업종",
    B."QLITY_MNTNC_TMLMT_DAYCNT" AS "B_품질유지기한일수",
    B."USAGE" AS "B_용법",
    B."PRPOS" AS "B_용도",
    B."DISPOS" AS "B_제품형태",
    B."FRMLC_MTRQLT" AS "B_포장재질",
    B."ETQTY_XPORT_PRDLST_YN" AS "B_내수"
FROM "C002" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 41. [HIGH] I2859.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (1개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19670154002"]
-- -----------------------------------------------------------------------------
SELECT 
    A."BSSH_NM" AS "A_업소명",
    A."INDUTY_CD_NM" AS "A_업종",
    A."LCNS_NO" AS "A_인허가번호",
    A."TELNO" AS "A_전화번호",
    A."SITE_ADDR" AS "A_주소",
    A."CHNG_DT" AS "A_변경일자",
    A."CHNG_BF_CN" AS "A_변경전내용",
    A."CHNG_AF_CN" AS "A_변경후내용",
    A."CHNG_PRVNS" AS "A_변경사유",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "I2859" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 42. [SUGGESTED] I1540.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (2개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["20140522061","20190533136"]
-- -----------------------------------------------------------------------------
SELECT 
    A."EVL_SEQ" AS "A_평가일련번호",
    A."EVL_PLAN_DT" AS "A_평가계획일자",
    A."EVL_TYPE_DVS_CD_NM" AS "A_평가유형구분",
    A."EVL_DT" AS "A_평가일자",
    A."EVL_SCORE" AS "A_평가점수",
    A."EVL_GRD_CD_NM" AS "A_평가등급",
    A."BSSH_LOC_CD_NM" AS "A_업소위치",
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업체명",
    A."PRSDNT_NM" AS "A_대표자",
    A."ADDR" AS "A_주소",
    A."EVL_INCPCTY_YN" AS "A_점검불능여부",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I1540" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 43. [SUGGESTED] I0680.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (2개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["20140522061","20190533136"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."EVL_TYPE_DVS_NM" AS "A_평가유형",
    A."EVL_GRD_NM" AS "A_평가등급",
    A."EVL_DT" AS "A_평가일자",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0680" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 44. [HIGH] C003.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.1% (1개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["2004001510459"]
-- -----------------------------------------------------------------------------
SELECT 
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRDLST_NM" AS "A_품목명",
    A."PRMS_DT" AS "A_보고일자",
    A."POG_DAYCNT" AS "A_소비기한",
    A."DISPOS" AS "A_성상",
    A."NTK_MTHD" AS "A_섭취방법",
    A."PRIMARY_FNCLTY" AS "A_주된기능성",
    A."IFTKN_ATNT_MATR_CN" AS "A_섭취시주의사항",
    A."CSTDY_MTHD" AS "A_보관방법",
    A."SHAP" AS "A_형태",
    A."STDR_STND" AS "A_기준규격",
    A."RAWMTRL_NM" AS "A_원재료",
    A."CRET_DTM" AS "A_최초생성일시",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    A."PRDT_SHAP_CD_NM" AS "A_제품형태",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소_명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRDLST_NM" AS "B_품목_명",
    B."PRMS_DT" AS "B_허가_일자",
    B."POG_DAYCNT" AS "B_소비기한_일수",
    B."DISPOS" AS "B_제품형태",
    B."NTK_MTHD" AS "B_섭취방법",
    B."PRIMARY_FNCLTY" AS "B_주된기능성",
    B."IFTKN_ATNT_MATR_CN" AS "B_섭취시주의사항",
    B."CSTDY_MTHD" AS "B_보관방법",
    B."PRDLST_CDNM" AS "B_유형",
    B."STDR_STND" AS "B_기준규격",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양여부",
    B."PRODUCTION" AS "B_생산종료여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."PRDT_SHAP_CD_NM" AS "B_제품_형태_코드_명",
    B."FRMLC_MTRQLT" AS "B_포장재질",
    B."RAWMTRL_NM" AS "B_품목유형(기능지표성분)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자",
    B."INDIV_RAWMTRL_NM" AS "B_기능성 원재료",
    B."ETC_RAWMTRL_NM" AS "B_기타 원재료",
    B."CAP_RAWMTRL_NM" AS "B_캡슐 원재료",
    B."FRMLC_MTHD" AS "B_포장방법"
FROM "C003" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 45. [HIGH] I2610.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 12.5% (1개 / Unique 8개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0000000000000"]
-- -----------------------------------------------------------------------------
SELECT 
    A."CMMN_SPEC_CD" AS "A_공통기준규격코드",
    A."SPEC_NM" AS "A_기준규격명",
    A."PRDLST_CD" AS "A_품목코드",
    A."KOR_NM" AS "A_한글명",
    A."TESTITM_CD" AS "A_시험항목코드",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."LV" AS "B_레벨",
    B."PRDLST_CD" AS "B_품목코드",
    B."KOR_NM" AS "B_한글명",
    B."ENG_NM" AS "B_영문명",
    B."DFN" AS "B_정의",
    B."VALD_BEGN_DT" AS "B_유효개시일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."HRNK_PRDLST_CD" AS "B_상위품목코드",
    B."HTRK_PRDLST_CD" AS "B_최상위품목코드",
    B."MXTR_PRDLST_YN" AS "B_조합품목여부",
    B."ATTRB_SEQ" AS "B_속성일련번호",
    B."PIAM_KOR_NM" AS "B_속성한글명",
    B."PRDLST_YN" AS "B_품목여부",
    B."UPDT_PRVNS" AS "B_수정사유",
    B."USE_YN" AS "B_사용여부",
    B."RM" AS "B_비고",
    B."FDGRP_YN" AS "B_식품군여부",
    B."LAST_UPDT_DTM" AS "B_최종수정일",
    B."CHD_SMBL_FD_YN" AS "B_어린이기호식품 여부"
FROM "I2610" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 46. [HIGH] C005.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.1% (1개 / Unique 949개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["1969008601620"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDLST_REPORT_NO" AS "A_품목보고(신고)번호",
    A."PRMS_DT" AS "A_보고(신고일)",
    A."END_DT" AS "A_생산중단일",
    A."PRDLST_NM" AS "A_제품명",
    A."POG_DAYCNT" AS "A_소비기한",
    A."PRDLST_DCNM" AS "A_식품 유형",
    A."BSSH_NM" AS "A_제조사명",
    A."INDUTY_NM" AS "A_업종",
    A."SITE_ADDR" AS "A_주소",
    A."CLSBIZ_DT" AS "A_폐업일자",
    A."BAR_CD" AS "A_유통바코드",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRMS_DT" AS "B_보고일자",
    B."PRDLST_NM" AS "B_제품명",
    B."PRDLST_DCNM" AS "B_유형",
    B."PRODUCTION" AS "B_생산종료여부",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양식품여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."POG_DAYCNT" AS "B_소비기한",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "C005" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 47. [HIGH] I0250.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 2.5% (1개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["20060345032"]
-- -----------------------------------------------------------------------------
SELECT 
    A."EXCLNC_INCM_BSSH_REGNO" AS "A_우수수입업소등록번호",
    A."PRMS_DT" AS "A_허가일자",
    A."BSSH_NM" AS "A_업소명",
    A."ADDR" AS "A_소재지",
    A."EXCOURY_NATN_CD_NM" AS "A_수출국가",
    A."INCM_PRDT_XPORT_MC_NM" AS "A_수입제품제조회사명",
    A."PRDLST_CNT" AS "A_품목수",
    A."PRDLST_NM" AS "A_품목명",
    A."LCNS_NO" AS "A_인허가번호",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0250" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 48. [SUGGESTED] I0320.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.2% (1개 / Unique 533개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040020031142"]
-- -----------------------------------------------------------------------------
SELECT 
    A."REG_NUM" AS "A_등록번호",
    A."PDT_NM" AS "A_제품명",
    A."PDT_BARCD" AS "A_바코드",
    A."PDT_TYPE" AS "A_식품유형",
    A."MAKE_TYPE" AS "A_제조구분",
    A."ADDR" AS "A_주소",
    A."BRNCH_NM" AS "A_업체명",
    A."BTYPE" AS "A_업종",
    A."FOOD_TYPE" AS "A_식품구분",
    A."PRDLST_REPORT_NO" AS "A_품목보고번호",
    A."MNFT_DAY" AS "A_제조일자",
    A."FOOD_HISTRACE_NUM" AS "A_식품이력추적관리번호",
    A."CRCL_PRD" AS "A_소비기한",
    A."MOD_DT" AS "A_최종수정일(YYYYMMDD)",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소_명",
    B."PRDLST_REPORT_NO" AS "B_품목제조번호",
    B."PRDLST_NM" AS "B_품목_명",
    B."PRMS_DT" AS "B_허가_일자",
    B."POG_DAYCNT" AS "B_소비기한_일수",
    B."DISPOS" AS "B_제품형태",
    B."NTK_MTHD" AS "B_섭취방법",
    B."PRIMARY_FNCLTY" AS "B_주된기능성",
    B."IFTKN_ATNT_MATR_CN" AS "B_섭취시주의사항",
    B."CSTDY_MTHD" AS "B_보관방법",
    B."PRDLST_CDNM" AS "B_유형",
    B."STDR_STND" AS "B_기준규격",
    B."HIENG_LNTRT_DVS_NM" AS "B_고열량저영양여부",
    B."PRODUCTION" AS "B_생산종료여부",
    B."CHILD_CRTFC_YN" AS "B_어린이기호식품품질인증여부",
    B."PRDT_SHAP_CD_NM" AS "B_제품_형태_코드_명",
    B."FRMLC_MTRQLT" AS "B_포장재질",
    B."RAWMTRL_NM" AS "B_품목유형(기능지표성분)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자",
    B."INDIV_RAWMTRL_NM" AS "B_기능성 원재료",
    B."ETC_RAWMTRL_NM" AS "B_기타 원재료",
    B."CAP_RAWMTRL_NM" AS "B_캡슐 원재료",
    B."FRMLC_MTHD" AS "B_포장방법"
FROM "I0320" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 49. [SUGGESTED] I0490.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.5% (1개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["19950310007"]
-- -----------------------------------------------------------------------------
SELECT 
    A."PRDTNM" AS "A_제품명",
    A."RTRVLPRVNS" AS "A_회수사유",
    A."BSSHNM" AS "A_제조업체명",
    A."ADDR" AS "A_업체주소",
    A."TELNO" AS "A_전화번호",
    A."BRCDNO" AS "A_바코드번호",
    A."FRMLCUNIT" AS "A_포장단위",
    A."MNFDT" AS "A_제조일자",
    A."RTRVLPLANDOC_RTRVLMTHD" AS "A_회수방법",
    A."DISTBTMLMT" AS "A_유통",
    A."PRDLST_TYPE" AS "A_식품분류",
    A."IMG_FILE_PATH" AS "A_제품사진 URL",
    A."PRDLST_CD" AS "A_품목코드",
    A."CRET_DTM" AS "A_등록일",
    A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
    A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
    A."RTRVL_GRDCD_NM" AS "A_회수등급",
    A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
    A."LCNS_NO" AS "A_업체인허가번호",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I0490" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

