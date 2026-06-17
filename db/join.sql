-- =============================================================================
--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록
--   총 검증된 조인 성공 관계: 25개
--   생성일시: 2026-06-17T18:46:53.688+09:00
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [HIGH] I2600.CMMN_SPEC_CD <-> I2590.CMMN_SPEC_CD
--   - 값 일치율: 100.0% (26개 / Unique 26개)
--   - 실제 JOIN 레코드 수: 1,000건
--   - 매칭된 샘플 데이터: ["000080","000081","000084"]
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    A."SPEC_NM" AS "공통기준종류명",
    A."PRDLST_CD" AS "품목분류코드",
    A."PRDLST_CD_NM" AS "품목명",
    A."TESTITM_CD" AS "시험항목코드",
    A."TESTITM_NM" AS "시험항목명",
    A."FNPRT_ITM_NM" AS "세부항목명",
    A."ATTRB_SEQ" AS "단서조항일련번호",
    A."PIAM_KOR_NM" AS "단서조항명",
    A."SPEC_VAL" AS "기준규격",
    A."SPEC_VAL_SUMUP" AS "기준규격요약",
    A."VALD_BEGN_DT" AS "유효개시일",
    A."VALD_END_DT" AS "유효종료일",
    A."SORC" AS "출처",
    A."VALD_MANLI" AS "유효자리",
    A."JDGMNT_FOM_CD" AS "판정형식코드",
    A."A079_FNPRT_CD_NM" AS "판정형식명",
    A."MXMM_VAL" AS "최대값",
    A."MXMM_VAL_DVS_CD" AS "최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "최대값구분명",
    A."MIMM_VAL" AS "최소값",
    A."MIMM_VAL_DVS_CD" AS "최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "최소값구분명",
    A."CHOIC_FIT" AS "선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "선택형적합명",
    A."CHOIC_IMPROPT" AS "선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "선택형부적합명",
    A."MCRRGNSM_2N" AS "미생물2N",
    A."MCRRGNSM_2C" AS "미생물2C",
    A."MCRRGNSM_2M" AS "미생물2M",
    A."MCRRGNSM_3M" AS "미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "세부항목포함여부",
    A."INJRY_YN" AS "위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "자품검사시험항목여부",
    A."UNIT_CD" AS "단위코드",
    A."UNIT_NM" AS "단위명",
    A."UPDT_PRVNS" AS "수정사유",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    B."HRNK_CMMN_SPEC_CD" AS "상위공통기준규격코드",
    B."LV" AS "레벨",
    B."DFN" AS "정의",
    B."USE_YN" AS "사용여부",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I2600" A
INNER JOIN "I2590" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2. [HIGH] I1310.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 100.0% (10개 / Unique 10개)
--   - 실제 JOIN 레코드 수: 1,000건
--   - 매칭된 샘플 데이터: ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "제품명",
    A."PRDLST_DCNM" AS "유형",
    A."PRODUCTION" AS "생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "소비기한",
    A."INDUTY_CD_NM" AS "업종",
    A."LAST_UPDT_DTM" AS "최종수정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명",
    B."TELNO" AS "전화번호"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 3. [HIGH] C001.LCNS_NO <-> I1260.LCNS_NO
--   - 값 일치율: 100.0% (1000개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 1,000건
--   - 매칭된 샘플 데이터: ["19880066159","19910355053","19910358063"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    A."INDUTY_NM" AS "업종",
    A."PRMS_DT" AS "허가일자",
    A."LOCP_ADDR" AS "주소",
    A."INSTT_NM" AS "기관명",
    A."TELNO" AS "전화번호",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."TELNO" AS "전화번호",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 4. [HIGH] I1250.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 100.0% (2개 / Unique 2개)
--   - 실제 JOIN 레코드 수: 1,000건
--   - 매칭된 샘플 데이터: ["19550509001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "허가일자",
    A."PRDLST_NM" AS "제품명",
    A."PRDLST_DCNM" AS "품목유형명",
    A."PRODUCTION" AS "생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "소비기한",
    A."LAST_UPDT_DTM" AS "최종수정일자",
    A."INDUTY_CD_NM" AS "업종",
    A."QLITY_MNTNC_TMLMT_DAYCNT" AS "품질유지기한일수",
    A."USAGE" AS "용법",
    A."PRPOS" AS "용도",
    A."DISPOS" AS "제품형태",
    A."FRMLC_MTRQLT" AS "포장재질",
    A."ETQTY_XPORT_PRDLST_YN" AS "내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "I1250" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 5. [HIGH] I2560.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 99.9% (999개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 999건
--   - 매칭된 샘플 데이터: ["18820308001","18830478001","18890592003"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."LOCPLC" AS "소재지",
    A."SAN" AS "산",
    A."LNBR" AS "번지",
    A."ISSNO" AS "호",
    A."TONG" AS "통",
    A."BAN" AS "반",
    A."SPCLADDR" AS "특수주소",
    A."SPCPPDONG" AS "특수지동",
    A."SPCPPISSNO" AS "특수지호",
    A."ROADNMSIGNGUCD" AS "도로명시군구코드",
    A."ROADNMADDREMDDVS" AS "도로명주소읍면동구분",
    A."ROADNMADDREMDCD" AS "도로명주소읍면동코드",
    A."ROADNMADDRBDFLRDVS" AS "도로명주소건물층구분",
    A."ROADNMADDRBDORIGNO" AS "도로명주소건물본번호",
    A."ROADNMADDRBDSUBNO" AS "도로명주소건물부번호",
    A."ROADNMADDRSPCLADDR" AS "도로명주소특수주소",
    A."PNU_CD" AS "PNU코드",
    A."BDMERGEMANAGENO" AS "건물통합관리번호",
    A."UFID_CD" AS "UFID코드",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "I2560" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 6. [HIGH] I2711.LCNS_NO <-> I2713.LCNS_NO
--   - 값 일치율: 81.4% (35개 / Unique 43개)
--   - 실제 JOIN 레코드 수: 985건
--   - 매칭된 샘플 데이터: ["19879368002","19879415001","19889294002"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "허가일자",
    A."PRDLST_NM" AS "제품명",
    A."PRDLST_DCNM" AS "유형",
    A."PRODUCTION" AS "생산종료여부",
    A."POG_DAYCNT" AS "유통/소비기한",
    A."INDUTY_CD_NM" AS "업종",
    A."LAST_UPDT_DTM" AS "최종수정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."TELNO" AS "전화번호",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명"
FROM "I2711" A
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [HIGH] I2712.LCNS_NO <-> I2713.LCNS_NO
--   - 값 일치율: 71.4% (115개 / Unique 161개)
--   - 실제 JOIN 레코드 수: 802건
--   - 매칭된 샘플 데이터: ["11111111123","19879415001","19909614003"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "품목명",
    A."PRDLST_DCNM" AS "유형",
    A."RAWMTRL_NM" AS "원재료",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."TELNO" AS "전화번호",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명"
FROM "I2712" A
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [HIGH] I2600.PRDLST_CD <-> I2510.PRDLST_CD
--   - 값 일치율: 31.7% (44개 / Unique 139개)
--   - 실제 JOIN 레코드 수: 788건
--   - 매칭된 샘플 데이터: ["A0000000000000","A0100000000000","A0100100000000"]
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    A."SPEC_NM" AS "공통기준종류명",
    A."PRDLST_CD" AS "품목분류코드",
    A."PRDLST_CD_NM" AS "품목명",
    A."TESTITM_CD" AS "시험항목코드",
    A."TESTITM_NM" AS "시험항목명",
    A."FNPRT_ITM_NM" AS "세부항목명",
    A."ATTRB_SEQ" AS "단서조항일련번호",
    A."PIAM_KOR_NM" AS "단서조항명",
    A."SPEC_VAL" AS "기준규격",
    A."SPEC_VAL_SUMUP" AS "기준규격요약",
    A."VALD_BEGN_DT" AS "유효개시일",
    A."VALD_END_DT" AS "유효종료일",
    A."SORC" AS "출처",
    A."VALD_MANLI" AS "유효자리",
    A."JDGMNT_FOM_CD" AS "판정형식코드",
    A."A079_FNPRT_CD_NM" AS "판정형식명",
    A."MXMM_VAL" AS "최대값",
    A."MXMM_VAL_DVS_CD" AS "최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "최대값구분명",
    A."MIMM_VAL" AS "최소값",
    A."MIMM_VAL_DVS_CD" AS "최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "최소값구분명",
    A."CHOIC_FIT" AS "선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "선택형적합명",
    A."CHOIC_IMPROPT" AS "선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "선택형부적합명",
    A."MCRRGNSM_2N" AS "미생물2N",
    A."MCRRGNSM_2C" AS "미생물2C",
    A."MCRRGNSM_2M" AS "미생물2M",
    A."MCRRGNSM_3M" AS "미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "세부항목포함여부",
    A."INJRY_YN" AS "위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "자품검사시험항목여부",
    A."UNIT_CD" AS "단위코드",
    A."UNIT_NM" AS "단위명",
    A."UPDT_PRVNS" AS "수정사유",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."LV" AS "레벨",
    B."PRDLST_CD" AS "품목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."DFN" AS "정의",
    B."VALD_BEGN_DT" AS "유효개시일자",
    B."VALD_END_DT" AS "유효종료일자",
    B."HRNK_PRDLST_CD" AS "상위품목코드",
    B."HTRK_PRDLST_CD" AS "최상위품목코드",
    B."MXTR_PRDLST_YN" AS "조합품목여부",
    B."ATTRB_SEQ" AS "속성일련번호",
    B."PIAM_KOR_NM" AS "속성한글명",
    B."PRDLST_YN" AS "품목여부",
    B."UPDT_PRVNS" AS "수정사유",
    B."USE_YN" AS "사용여부",
    B."RM" AS "비고",
    B."FDGRP_YN" AS "식품군여부",
    B."LAST_UPDT_DTM" AS "최종수정일",
    B."CHD_SMBL_FD_YN" AS "어린이기호식품 여부"
FROM "I2600" A
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [HIGH] I2580.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 53.4% (117개 / Unique 219개)
--   - 실제 JOIN 레코드 수: 706건
--   - 매칭된 샘플 데이터: ["A10008","A10018","A10019"]
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    A."PRDLST_CD_NM" AS "품목명",
    A."TESTITM_CD" AS "시험항목코드",
    A."TESTITM_NM" AS "시험항목명",
    A."FNPRT_ITM_NM" AS "세부항목명",
    A."ATTRB_SEQ" AS "단서조항일련번호",
    A."PIAM_KOR_NM" AS "단서조항명",
    A."SPEC_VAL" AS "기준규격",
    A."SPEC_VAL_SUMUP" AS "기준규격요약",
    A."VALD_BEGN_DT" AS "유효개시일",
    A."VALD_END_DT" AS "유효종료일",
    A."SORC" AS "출처",
    A."VALD_MANLI" AS "유효자리",
    A."JDGMNT_FOM_CD" AS "판정형식코드",
    A."A079_FNPRT_CD_NM" AS "판정형식명",
    A."MXMM_VAL" AS "최대값",
    A."MXMM_VAL_DVS_CD" AS "최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "최대값구분명",
    A."MIMM_VAL" AS "최소값",
    A."MIMM_VAL_DVS_CD" AS "최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "최소값구분명",
    A."CHOIC_FIT" AS "선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "선택형적합명",
    A."CHOIC_IMPROPT" AS "선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "선택형부적합명",
    A."MCRRGNSM_2N" AS "미생물2N",
    A."MCRRGNSM_2C" AS "미생물2C",
    A."MCRRGNSM_2M" AS "미생물2M",
    A."MCRRGNSM_3M" AS "미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "세부항목포함여부",
    A."INJRY_YN" AS "위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "자품검사시험항목여부",
    A."UNIT_CD" AS "단위코드",
    A."UNIT_NM" AS "단위명",
    A."UPDT_PRVNS" AS "수정사유",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."ABRV" AS "약어",
    B."NCKNM" AS "이명",
    B."TESTITM_NM" AS "시험항목명",
    B."TESTITM_LCLAS_CD" AS "시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "시험항목대분류코드",
    B."L_KOR_NM" AS "대분류한글명",
    B."TESTITM_MLSFC_CD" AS "시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "시험항목중분류코드",
    B."M_KOR_NM" AS "중분류한글명",
    B."REMN_MTTR_DFN" AS "잔류물질정의",
    B."USE_YN" AS "사용여부",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [HIGH] I0940.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 16.9% (12개 / Unique 71개)
--   - 실제 JOIN 레코드 수: 230건
--   - 매칭된 샘플 데이터: ["A20024","A20025","A30009"]
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    A."TESTITM_CD" AS "시험항목코드",
    A."T_KOR_NM" AS "시험항목 한글명",
    A."FNPRT_ITM_NM" AS "세부항목명",
    A."SPEC_VAL" AS "기준규격값",
    A."SPEC_VAL_SUMUP" AS "기준규격값 요약",
    A."VALD_BEGN_DT" AS "유효개시일자",
    A."VALD_END_DT" AS "유효종료일자",
    A."SORC" AS "출처",
    A."MXMM_VAL" AS "최대값",
    A."MIMM_VAL" AS "최소값",
    A."INJRY_YN" AS "위해여부",
    A."UNIT_NM" AS "단위명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."ABRV" AS "약어",
    B."NCKNM" AS "이명",
    B."TESTITM_NM" AS "시험항목명",
    B."TESTITM_LCLAS_CD" AS "시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "시험항목대분류코드",
    B."L_KOR_NM" AS "대분류한글명",
    B."TESTITM_MLSFC_CD" AS "시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "시험항목중분류코드",
    B."M_KOR_NM" AS "중분류한글명",
    B."REMN_MTTR_DFN" AS "잔류물질정의",
    B."USE_YN" AS "사용여부",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [HIGH] I1310.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 30.0% (3개 / Unique 10개)
--   - 실제 JOIN 레코드 수: 212건
--   - 매칭된 샘플 데이터: ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "제품명",
    A."PRDLST_DCNM" AS "유형",
    A."PRODUCTION" AS "생산종료여부",
    A."HIENG_LNTRT_DVS_NM" AS "고열량저영양식품여부",
    A."CHILD_CRTFC_YN" AS "어린이기호식품품질인증여부",
    A."POG_DAYCNT" AS "소비기한",
    A."INDUTY_CD_NM" AS "업종",
    A."LAST_UPDT_DTM" AS "최종수정일자",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "I1310" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [HIGH] I2600.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 5.4% (16개 / Unique 299개)
--   - 실제 JOIN 레코드 수: 171건
--   - 매칭된 샘플 데이터: ["A10029","A30023","B10001"]
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    A."SPEC_NM" AS "공통기준종류명",
    A."PRDLST_CD" AS "품목분류코드",
    A."PRDLST_CD_NM" AS "품목명",
    A."TESTITM_CD" AS "시험항목코드",
    A."TESTITM_NM" AS "시험항목명",
    A."FNPRT_ITM_NM" AS "세부항목명",
    A."ATTRB_SEQ" AS "단서조항일련번호",
    A."PIAM_KOR_NM" AS "단서조항명",
    A."SPEC_VAL" AS "기준규격",
    A."SPEC_VAL_SUMUP" AS "기준규격요약",
    A."VALD_BEGN_DT" AS "유효개시일",
    A."VALD_END_DT" AS "유효종료일",
    A."SORC" AS "출처",
    A."VALD_MANLI" AS "유효자리",
    A."JDGMNT_FOM_CD" AS "판정형식코드",
    A."A079_FNPRT_CD_NM" AS "판정형식명",
    A."MXMM_VAL" AS "최대값",
    A."MXMM_VAL_DVS_CD" AS "최대값구분코드",
    A."A081_FNPRT_CD_NM" AS "최대값구분명",
    A."MIMM_VAL" AS "최소값",
    A."MIMM_VAL_DVS_CD" AS "최소값구분코드",
    A."A080_FNPRT_CD_NM" AS "최소값구분명",
    A."CHOIC_FIT" AS "선택형적합코드",
    A."A082_CF_FNPRT_CD_NM" AS "선택형적합명",
    A."CHOIC_IMPROPT" AS "선택형부적합코드",
    A."A082_CI_FNPRT_CD_NM" AS "선택형부적합명",
    A."MCRRGNSM_2N" AS "미생물2N",
    A."MCRRGNSM_2C" AS "미생물2C",
    A."MCRRGNSM_2M" AS "미생물2M",
    A."MCRRGNSM_3M" AS "미생물3M",
    A."FNPRT_ITM_INCLS_YN" AS "세부항목포함여부",
    A."INJRY_YN" AS "위해여부",
    A."EMPHS_PRSEC_TESTITM_YN" AS "중점검사시험항목여부",
    A."MONTRNG_TESTITM_YN" AS "감시시험항목여부",
    A."RVLV_ELSE_TESTITM_YN" AS "공전외시험항목여부",
    A."NTR_PRSEC_ITM_YN" AS "자품검사시험항목여부",
    A."UNIT_CD" AS "단위코드",
    A."UNIT_NM" AS "단위명",
    A."UPDT_PRVNS" AS "수정사유",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."ABRV" AS "약어",
    B."NCKNM" AS "이명",
    B."TESTITM_NM" AS "시험항목명",
    B."TESTITM_LCLAS_CD" AS "시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "시험항목대분류코드",
    B."L_KOR_NM" AS "대분류한글명",
    B."TESTITM_MLSFC_CD" AS "시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "시험항목중분류코드",
    B."M_KOR_NM" AS "중분류한글명",
    B."REMN_MTTR_DFN" AS "잔류물질정의",
    B."USE_YN" AS "사용여부",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I2600" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [HIGH] I2550.HRNK_DSPS_STDR_CD <-> I1670.DSPS_STDR_CD
--   - 값 일치율: 7.0% (12개 / Unique 172개)
--   - 실제 JOIN 레코드 수: 88건
--   - 매칭된 샘플 데이터: ["00409702000000","00409702000015","00409702000018"]
-- -----------------------------------------------------------------------------
SELECT
    A."DSPS_STDR_CD" AS "처분기준코드",
    A."HRNK_DSPS_STDR_CD" AS "상위처분기준코드",
    A."LV_NO" AS "레벨",
    A."DSPS_STDR_CD_NM" AS "처분기준코드명",
    A."BASIS_LAWORD" AS "근거법령",
    A."VILT_TYPE_CD" AS "위반유형코드",
    A."VILT_TYPE_CD_NM" AS "위반유형명",
    A."USE_YN" AS "사용여부",
    A."VALD_BGN_DT" AS "유효시작일자",
    A."VALD_END_DT" AS "유효종료일자",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."DSPS_STDR_CD" AS "처분기준코드",
    B."DSPS_STDR_CD_NM" AS "처분기준명",
    B."LV_NO" AS "레벨",
    B."BASIS_LAWORD" AS "근거법령",
    B."VILT_TYPE_NM" AS "위반유형",
    B."VALD_BGN_DT" AS "유효시작일자",
    B."VALD_END_DT" AS "유효종료일자"
FROM "I2550" A
INNER JOIN "I1670" B
  ON A."HRNK_DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."HRNK_DSPS_STDR_CD" IS NOT NULL AND A."HRNK_DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [HIGH] C002.LCNS_NO <-> I1220.LCNS_NO
--   - 값 일치율: 6.4% (17개 / Unique 265개)
--   - 실제 JOIN 레코드 수: 73건
--   - 매칭된 샘플 데이터: ["19940506240","19950433026","19990461386"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "품목명",
    A."PRDLST_DCNM" AS "품목유형명",
    A."RAWMTRL_NM" AS "원재료명",
    A."RAWMTRL_ORDNO" AS "원재료표시순서",
    A."CHNG_DT" AS "변경일자(YYYYMMDD)",
    A."ETQTY_XPORT_PRDLST_YN" AS "내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."TELNO" AS "전화번호",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명"
FROM "C002" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [HIGH] I1670.DSPS_STDR_CD <-> I2550.DSPS_STDR_CD
--   - 값 일치율: 13.4% (66개 / Unique 493개)
--   - 실제 JOIN 레코드 수: 66건
--   - 매칭된 샘플 데이터: ["00180502745000","00180527000000","00409702000000"]
-- -----------------------------------------------------------------------------
SELECT
    A."DSPS_STDR_CD" AS "처분기준코드",
    A."DSPS_STDR_CD_NM" AS "처분기준명",
    A."LV_NO" AS "레벨",
    A."BASIS_LAWORD" AS "근거법령",
    A."VILT_TYPE_NM" AS "위반유형",
    A."VALD_BGN_DT" AS "유효시작일자",
    A."VALD_END_DT" AS "유효종료일자",
    B."DSPS_STDR_CD" AS "처분기준코드",
    B."HRNK_DSPS_STDR_CD" AS "상위처분기준코드",
    B."LV_NO" AS "레벨",
    B."DSPS_STDR_CD_NM" AS "처분기준코드명",
    B."BASIS_LAWORD" AS "근거법령",
    B."VILT_TYPE_CD" AS "위반유형코드",
    B."VILT_TYPE_CD_NM" AS "위반유형명",
    B."USE_YN" AS "사용여부",
    B."VALD_BGN_DT" AS "유효시작일자",
    B."VALD_END_DT" AS "유효종료일자",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I1670" A
INNER JOIN "I2550" B
  ON A."DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."DSPS_STDR_CD" IS NOT NULL AND A."DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [HIGH] I2712.PRDLST_REPORT_NO <-> I2711.PRDLST_REPORT_NO
--   - 값 일치율: 4.9% (49개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 49건
--   - 매칭된 샘플 데이터: ["19879415001133","19879415001134","19879415001135"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "품목명",
    A."PRDLST_DCNM" AS "유형",
    A."RAWMTRL_NM" AS "원재료",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조번호",
    B."PRMS_DT" AS "허가일자",
    B."PRDLST_NM" AS "제품명",
    B."PRDLST_DCNM" AS "유형",
    B."PRODUCTION" AS "생산종료여부",
    B."POG_DAYCNT" AS "유통/소비기한",
    B."INDUTY_CD_NM" AS "업종",
    B."LAST_UPDT_DTM" AS "최종수정일자"
FROM "I2712" A
INNER JOIN "I2711" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [HIGH] C006.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 9.6% (11개 / Unique 115개)
--   - 실제 JOIN 레코드 수: 25건
--   - 매칭된 샘플 데이터: ["19930405001","19960262002","20030262013"]
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "품목명",
    A."PRDLST_DCNM" AS "유형",
    A."RAWMTRL_NM" AS "원재료",
    A."LCNS_NO" AS "인허가번호",
    A."CHNG_DT" AS "변경일자",
    A."RAWMTRL_ORDNO" AS "원재료표시순서",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명",
    B."TELNO" AS "전화번호"
FROM "C006" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [HIGH] I2852.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 2.8% (5개 / Unique 180개)
--   - 실제 JOIN 레코드 수: 17건
--   - 매칭된 샘플 데이터: ["20060405043","20230049770","20240261015"]
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_REPORT_NO" AS "품목제조보고번호",
    A."PRMS_DT" AS "품목보고일자",
    A."PRDLST_NM" AS "제품명",
    A."END_DT" AS "생산중단일자",
    A."PRDLST_DCNM" AS "품목유형명",
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."FOOD_HF_LS_CL_CD_NM" AS "구분",
    A."ARTCL_END_WHY" AS "생산중단사유",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."INDUTY_NM" AS "업종",
    B."PRMS_DT" AS "허가일자",
    B."LOCP_ADDR" AS "주소",
    B."INSTT_NM" AS "기관명",
    B."TELNO" AS "전화번호"
FROM "I2852" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [HIGH] I2610.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 57.1% (4개 / Unique 7개)
--   - 실제 JOIN 레코드 수: 16건
--   - 매칭된 샘플 데이터: ["B10002","B10004","B10006"]
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    A."PRDLST_CD" AS "품목코드",
    A."KOR_NM" AS "한글명",
    A."TESTITM_CD" AS "시험항목코드",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."ABRV" AS "약어",
    B."NCKNM" AS "이명",
    B."TESTITM_NM" AS "시험항목명",
    B."TESTITM_LCLAS_CD" AS "시험항목대분류시퀀스",
    B."L_ATTRB_CD" AS "시험항목대분류코드",
    B."L_KOR_NM" AS "대분류한글명",
    B."TESTITM_MLSFC_CD" AS "시험항목중분류시퀀스",
    B."M_ATTRB_CD" AS "시험항목중분류코드",
    B."M_KOR_NM" AS "중분류한글명",
    B."REMN_MTTR_DFN" AS "잔류물질정의",
    B."USE_YN" AS "사용여부",
    B."LAST_UPDT_DTM" AS "최종수정일시"
FROM "I2610" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [HIGH] I1230.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 1.2% (12개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 12건
--   - 매칭된 샘플 데이터: ["19630255002","19630355001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    A."INDUTY_NM" AS "업종",
    A."PRMS_DT" AS "허가일자",
    A."TELNO" AS "전화번호",
    A."LOCP_ADDR" AS "주소",
    A."INSTT_NM" AS "기관명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [HIGH] I2832.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 0.6% (6개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 6건
--   - 매칭된 샘플 데이터: ["18820308001","19680134001","19700129010"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    A."INDUTY_NM" AS "업종",
    A."PRMS_DT" AS "허가일자",
    A."LOCP_ADDR" AS "주소",
    A."INSTT_NM" AS "기관명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "I2832" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [HIGH] I0310.PRDLST_REPORT_NO <-> I0030.PRDLST_REPORT_NO
--   - 값 일치율: 0.5% (5개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["20040015191104","20040016020168","20040016020196"]
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    A."GUBUN" AS "품목구분",
    A."H_ITEM_NM" AS "품목유형",
    A."LCNS_NO" AS "인허가번호",
    A."EVL_YR" AS "보고년도",
    A."PRDLST_REPORT_NO" AS "품목제조보고번호",
    A."FYER_PRDCTN_ABRT_QY" AS "연간생산능력(KG)",
    A."PRDCTN_QY" AS "생산량(KG)",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    B."PRDLST_REPORT_NO" AS "품목제조번호",
    B."PRDLST_NM" AS "품목_명",
    B."PRMS_DT" AS "허가_일자",
    B."POG_DAYCNT" AS "소비기한_일수",
    B."DISPOS" AS "제품형태",
    B."NTK_MTHD" AS "섭취방법",
    B."PRIMARY_FNCLTY" AS "주된기능성",
    B."IFTKN_ATNT_MATR_CN" AS "섭취시주의사항",
    B."CSTDY_MTHD" AS "보관방법",
    B."PRDLST_CDNM" AS "유형",
    B."STDR_STND" AS "기준규격",
    B."HIENG_LNTRT_DVS_NM" AS "고열량저영양여부",
    B."PRODUCTION" AS "생산종료여부",
    B."CHILD_CRTFC_YN" AS "어린이기호식품품질인증여부",
    B."PRDT_SHAP_CD_NM" AS "제품_형태_코드_명",
    B."FRMLC_MTRQLT" AS "포장재질",
    B."RAWMTRL_NM" AS "품목유형(기능지표성분)",
    B."INDUTY_CD_NM" AS "업종",
    B."LAST_UPDT_DTM" AS "최종수정일자",
    B."INDIV_RAWMTRL_NM" AS "기능성 원재료",
    B."ETC_RAWMTRL_NM" AS "기타 원재료",
    B."CAP_RAWMTRL_NM" AS "캡슐 원재료",
    B."FRMLC_MTHD" AS "포장방법",
    B."FRMLC_MTRQLT" AS "포장재질"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [HIGH] C002.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 1.1% (3개 / Unique 265개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["19550509001","19660202002","19690086003"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRMS_DT" AS "보고일자",
    A."PRDLST_NM" AS "품목명",
    A."PRDLST_DCNM" AS "품목유형명",
    A."RAWMTRL_NM" AS "원재료명",
    A."RAWMTRL_ORDNO" AS "원재료표시순서",
    A."CHNG_DT" AS "변경일자(YYYYMMDD)",
    A."ETQTY_XPORT_PRDLST_YN" AS "내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    B."TELNO" AS "전화번호",
    B."PRMS_DT" AS "허가일자",
    B."ADDR" AS "주소"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [HIGH] I2610.PRDLST_CD <-> I2510.PRDLST_CD
--   - 값 일치율: 12.5% (1개 / Unique 8개)
--   - 실제 JOIN 레코드 수: 1건
--   - 매칭된 샘플 데이터: ["A0000000000000"]
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    A."PRDLST_CD" AS "품목코드",
    A."KOR_NM" AS "한글명",
    A."TESTITM_CD" AS "시험항목코드",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    B."LV" AS "레벨",
    B."PRDLST_CD" AS "품목코드",
    B."KOR_NM" AS "한글명",
    B."ENG_NM" AS "영문명",
    B."DFN" AS "정의",
    B."VALD_BEGN_DT" AS "유효개시일자",
    B."VALD_END_DT" AS "유효종료일자",
    B."HRNK_PRDLST_CD" AS "상위품목코드",
    B."HTRK_PRDLST_CD" AS "최상위품목코드",
    B."MXTR_PRDLST_YN" AS "조합품목여부",
    B."ATTRB_SEQ" AS "속성일련번호",
    B."PIAM_KOR_NM" AS "속성한글명",
    B."PRDLST_YN" AS "품목여부",
    B."UPDT_PRVNS" AS "수정사유",
    B."USE_YN" AS "사용여부",
    B."RM" AS "비고",
    B."FDGRP_YN" AS "식품군여부",
    B."LAST_UPDT_DTM" AS "최종수정일",
    B."CHD_SMBL_FD_YN" AS "어린이기호식품 여부"
FROM "I2610" A
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [HIGH] C003.PRDLST_REPORT_NO <-> I0030.PRDLST_REPORT_NO
--   - 값 일치율: 0.1% (1개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 1건
--   - 매칭된 샘플 데이터: ["2004001510459"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    A."PRDLST_REPORT_NO" AS "품목제조번호",
    A."PRDLST_NM" AS "품목명",
    A."PRMS_DT" AS "보고일자",
    A."POG_DAYCNT" AS "소비기한",
    A."DISPOS" AS "성상",
    A."NTK_MTHD" AS "섭취방법",
    A."PRIMARY_FNCLTY" AS "주된기능성",
    A."IFTKN_ATNT_MATR_CN" AS "섭취시주의사항",
    A."CSTDY_MTHD" AS "보관방법",
    A."SHAP" AS "형태",
    A."STDR_STND" AS "기준규격",
    A."RAWMTRL_NM" AS "원재료",
    A."CRET_DTM" AS "최초생성일시",
    A."LAST_UPDT_DTM" AS "최종수정일시",
    A."PRDT_SHAP_CD_NM" AS "제품형태",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    B."PRDLST_REPORT_NO" AS "품목제조번호",
    B."PRDLST_NM" AS "품목_명",
    B."PRMS_DT" AS "허가_일자",
    B."POG_DAYCNT" AS "소비기한_일수",
    B."DISPOS" AS "제품형태",
    B."NTK_MTHD" AS "섭취방법",
    B."PRIMARY_FNCLTY" AS "주된기능성",
    B."IFTKN_ATNT_MATR_CN" AS "섭취시주의사항",
    B."CSTDY_MTHD" AS "보관방법",
    B."PRDLST_CDNM" AS "유형",
    B."STDR_STND" AS "기준규격",
    B."HIENG_LNTRT_DVS_NM" AS "고열량저영양여부",
    B."PRODUCTION" AS "생산종료여부",
    B."CHILD_CRTFC_YN" AS "어린이기호식품품질인증여부",
    B."PRDT_SHAP_CD_NM" AS "제품_형태_코드_명",
    B."FRMLC_MTRQLT" AS "포장재질",
    B."RAWMTRL_NM" AS "품목유형(기능지표성분)",
    B."INDUTY_CD_NM" AS "업종",
    B."LAST_UPDT_DTM" AS "최종수정일자",
    B."INDIV_RAWMTRL_NM" AS "기능성 원재료",
    B."ETC_RAWMTRL_NM" AS "기타 원재료",
    B."CAP_RAWMTRL_NM" AS "캡슐 원재료",
    B."FRMLC_MTHD" AS "포장방법",
    B."FRMLC_MTRQLT" AS "포장재질"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

