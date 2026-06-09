-- =============================================================================
--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록
--   총 검증된 조인 성공 관계: 34개
--   생성일시: 2026-06-07T15:57:30.210Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [HIGH] I2600.CMMN_SPEC_CD <-> I2590.CMMN_SPEC_CD
--   - 값 일치율: 100.0% (26개 / Unique 26개)
--   - 실제 JOIN 레코드 수: 1,000건
--   - 매칭된 샘플 데이터: ["000080","000081","000084"]
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
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
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
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."LOCPLC" AS "A_소재지",
    A."SAN" AS "A_산",
    A."LNBR" AS "A_번지",
    A."ISSNO" AS "A_호",
    A."TONG" AS "A_통",
    A."BAN" AS "A_반",
    A."SPCLADDR" AS "A_특수주소",
    A."SPCPPDONG" AS "A_특수지동",
    A."SPCPPISSNO" AS "A_특수지호",
    A."ROADNMSIGNGUCD" AS "A_도로명시군구코드",
    A."ROADNMADDREMDDVS" AS "A_도로명주소읍면동구분",
    A."ROADNMADDREMDCD" AS "A_도로명주소읍면동코드",
    A."ROADNMADDRBDFLRDVS" AS "A_도로명주소건물층구분",
    A."ROADNMADDRBDORIGNO" AS "A_도로명주소건물본번호",
    A."ROADNMADDRBDSUBNO" AS "A_도로명주소건물부번호",
    A."ROADNMADDRSPCLADDR" AS "A_도로명주소특수주소",
    A."PNU_CD" AS "A_PNU코드",
    A."BDMERGEMANAGENO" AS "A_건물통합관리번호",
    A."UFID_CD" AS "A_UFID코드",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
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
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRDLST_REPORT_NO" AS "A_품목제조번호",
    A."PRMS_DT" AS "A_허가일자",
    A."PRDLST_NM" AS "A_제품명",
    A."PRDLST_DCNM" AS "A_유형",
    A."PRODUCTION" AS "A_생산종료여부",
    A."POG_DAYCNT" AS "A_유통/소비기한",
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
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [HIGH] I2580.PRDLST_CD <-> I0950.PRDLST_CD
--   - 값 일치율: 11.4% (21개 / Unique 185개)
--   - 실제 JOIN 레코드 수: 972건
--   - 매칭된 샘플 데이터: ["D0300300001000","D0300300003000","D0300300027000"]
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_개별기준규격일련번호",
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
    B."PRDLST_CD" AS "B_품목코드",
    B."PC_KOR_NM" AS "B_품목한글명",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."T_KOR_NM" AS "B_시험항목 한글명",
    B."FNPRT_ITM_NM" AS "B_세부항목명",
    B."SPEC_VAL" AS "B_기준규격값",
    B."SPEC_VAL_SUMUP" AS "B_기준규격값 요약",
    B."VALD_BEGN_DT" AS "B_유효개시일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."SORC" AS "B_출처",
    B."MXMM_VAL" AS "B_최대값",
    B."MIMM_VAL" AS "B_최소값",
    B."INJRY_YN" AS "B_위해여부",
    B."UNIT_NM" AS "B_단위명"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [HIGH] I2712.LCNS_NO <-> I2713.LCNS_NO
--   - 값 일치율: 70.8% (114개 / Unique 161개)
--   - 실제 JOIN 레코드 수: 794건
--   - 매칭된 샘플 데이터: ["11111111123","19879415001","19909614003"]
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
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [HIGH] I2600.PRDLST_CD <-> I2510.PRDLST_CD
--   - 값 일치율: 31.7% (44개 / Unique 139개)
--   - 실제 JOIN 레코드 수: 788건
--   - 매칭된 샘플 데이터: ["A0000000000000","A0100000000000","A0100100000000"]
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
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [HIGH] I2580.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 53.4% (117개 / Unique 219개)
--   - 실제 JOIN 레코드 수: 706건
--   - 매칭된 샘플 데이터: ["A10008","A10018","A10019"]
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_개별기준규격일련번호",
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
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [HIGH] I0940.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 16.9% (12개 / Unique 71개)
--   - 실제 JOIN 레코드 수: 230건
--   - 매칭된 샘플 데이터: ["A20024","A20025","A30009"]
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
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [HIGH] I1310.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 30.0% (3개 / Unique 10개)
--   - 실제 JOIN 레코드 수: 212건
--   - 매칭된 샘플 데이터: ["19640448001","19670230001","19690086016"]
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
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [HIGH] I2600.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 5.4% (16개 / Unique 299개)
--   - 실제 JOIN 레코드 수: 171건
--   - 매칭된 샘플 데이터: ["A10029","A30023","B10001"]
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
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [HIGH] I0950.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 50.0% (17개 / Unique 34개)
--   - 실제 JOIN 레코드 수: 94건
--   - 매칭된 샘플 데이터: ["A10008","A10029","A10098"]
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
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [HIGH] I2550.HRNK_DSPS_STDR_CD <-> I1670.DSPS_STDR_CD
--   - 값 일치율: 7.0% (12개 / Unique 172개)
--   - 실제 JOIN 레코드 수: 88건
--   - 매칭된 샘플 데이터: ["00409702000000","00409702000015","00409702000018"]
-- -----------------------------------------------------------------------------
SELECT
    A."DSPS_STDR_CD" AS "A_처분기준코드",
    A."HRNK_DSPS_STDR_CD" AS "A_상위처분기준코드",
    A."LV_NO" AS "A_레벨",
    A."DSPS_STDR_CD_NM" AS "A_처분기준코드명",
    A."BASIS_LAWORD" AS "A_근거법령",
    A."VILT_TYPE_CD" AS "A_위반유형코드",
    A."VILT_TYPE_CD_NM" AS "A_위반유형명",
    A."USE_YN" AS "A_사용여부",
    A."VALD_BGN_DT" AS "A_유효시작일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    A."LAST_UPDT_DTM" AS "A_최종수정일시",
    B."DSPS_STDR_CD" AS "B_처분기준코드",
    B."DSPS_STDR_CD_NM" AS "B_처분기준명",
    B."LV_NO" AS "B_레벨",
    B."BASIS_LAWORD" AS "B_근거법령",
    B."VILT_TYPE_NM" AS "B_위반유형",
    B."VALD_BGN_DT" AS "B_유효시작일자",
    B."VALD_END_DT" AS "B_유효종료일자"
FROM "I2550" A
INNER JOIN "I1670" B
  ON A."HRNK_DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."HRNK_DSPS_STDR_CD" IS NOT NULL AND A."HRNK_DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [HIGH] C002.LCNS_NO <-> I1220.LCNS_NO
--   - 값 일치율: 6.4% (17개 / Unique 267개)
--   - 실제 JOIN 레코드 수: 73건
--   - 매칭된 샘플 데이터: ["19940506240","19950433026","19990461386"]
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
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "C002" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [HIGH] I1670.DSPS_STDR_CD <-> I2550.DSPS_STDR_CD
--   - 값 일치율: 13.4% (66개 / Unique 493개)
--   - 실제 JOIN 레코드 수: 66건
--   - 매칭된 샘플 데이터: ["00180502745000","00180527000000","00409702000000"]
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
INNER JOIN "I2550" B
  ON A."DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."DSPS_STDR_CD" IS NOT NULL AND A."DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [HIGH] I2712.PRDLST_REPORT_NO <-> I2711.PRDLST_REPORT_NO
--   - 값 일치율: 4.9% (49개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 49건
--   - 매칭된 샘플 데이터: ["19879415001133","19879415001134","19879415001135"]
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
    B."POG_DAYCNT" AS "B_유통/소비기한",
    B."INDUTY_CD_NM" AS "B_업종",
    B."LAST_UPDT_DTM" AS "B_최종수정일자"
FROM "I2712" A
INNER JOIN "I2711" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [HIGH] C006.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 9.6% (11개 / Unique 115개)
--   - 실제 JOIN 레코드 수: 25건
--   - 매칭된 샘플 데이터: ["19930405001","19960262002","20030262013"]
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
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [HIGH] I2852.LCNS_NO <-> I1220.LCNS_NO
--   - 값 일치율: 4.2% (5개 / Unique 120개)
--   - 실제 JOIN 레코드 수: 18건
--   - 매칭된 샘플 데이터: ["20000461325","20130443205","20160386393"]
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
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [HIGH] I2610.TESTITM_CD <-> I2530.TESTITM_CD
--   - 값 일치율: 57.1% (4개 / Unique 7개)
--   - 실제 JOIN 레코드 수: 16건
--   - 매칭된 샘플 데이터: ["B10002","B10004","B10006"]
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
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [HIGH] I2852.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 4.2% (5개 / Unique 120개)
--   - 실제 JOIN 레코드 수: 16건
--   - 매칭된 샘플 데이터: ["20060405043","20230049770","20240261015"]
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
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I2852" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [HIGH] I1230.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 1.2% (12개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 12건
--   - 매칭된 샘플 데이터: ["19630255002","19630355001","19630364001"]
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
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [HIGH] I2832.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 0.6% (6개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 6건
--   - 매칭된 샘플 데이터: ["18820308001","19680134001","19700129010"]
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
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [HIGH] I0310.PRDLST_REPORT_NO <-> I0030.PRDLST_REPORT_NO
--   - 값 일치율: 0.5% (5개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["20040015191104","20040016020168","20040016020196"]
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
    B."FRMLC_MTHD" AS "B_포장방법",
    B."FRMLC_MTRQLT" AS "B_포장재질"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 26. [HIGH] C002.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 1.1% (3개 / Unique 267개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["19550509001","19660202002","19690086003"]
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
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수/겸용구분(N:내수, O:겸용)",
    B."LCNS_NO" AS "B_영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "B_업종",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."TELNO" AS "B_전화번호",
    B."PRMS_DT" AS "B_허가일자",
    B."ADDR" AS "B_주소"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 27. [HIGH] I2560.LCNS_NO <-> I1300.LCNS_NO
--   - 값 일치율: 0.3% (3개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 3건
--   - 매칭된 샘플 데이터: ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."LOCPLC" AS "A_소재지",
    A."SAN" AS "A_산",
    A."LNBR" AS "A_번지",
    A."ISSNO" AS "A_호",
    A."TONG" AS "A_통",
    A."BAN" AS "A_반",
    A."SPCLADDR" AS "A_특수주소",
    A."SPCPPDONG" AS "A_특수지동",
    A."SPCPPISSNO" AS "A_특수지호",
    A."ROADNMSIGNGUCD" AS "A_도로명시군구코드",
    A."ROADNMADDREMDDVS" AS "A_도로명주소읍면동구분",
    A."ROADNMADDREMDCD" AS "A_도로명주소읍면동코드",
    A."ROADNMADDRBDFLRDVS" AS "A_도로명주소건물층구분",
    A."ROADNMADDRBDORIGNO" AS "A_도로명주소건물본번호",
    A."ROADNMADDRBDSUBNO" AS "A_도로명주소건물부번호",
    A."ROADNMADDRSPCLADDR" AS "A_도로명주소특수주소",
    A."PNU_CD" AS "A_PNU코드",
    A."BDMERGEMANAGENO" AS "A_건물통합관리번호",
    A."UFID_CD" AS "A_UFID코드",
    B."LCNS_NO" AS "B_인허가번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명",
    B."TELNO" AS "B_전화번호"
FROM "I2560" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 28. [HIGH] I2600.PRDLST_CD <-> I0950.PRDLST_CD
--   - 값 일치율: 0.7% (1개 / Unique 139개)
--   - 실제 JOIN 레코드 수: 2건
--   - 매칭된 샘플 데이터: ["D0000000000000"]
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
    B."PRDLST_CD" AS "B_품목코드",
    B."PC_KOR_NM" AS "B_품목한글명",
    B."TESTITM_CD" AS "B_시험항목코드",
    B."T_KOR_NM" AS "B_시험항목 한글명",
    B."FNPRT_ITM_NM" AS "B_세부항목명",
    B."SPEC_VAL" AS "B_기준규격값",
    B."SPEC_VAL_SUMUP" AS "B_기준규격값 요약",
    B."VALD_BEGN_DT" AS "B_유효개시일자",
    B."VALD_END_DT" AS "B_유효종료일자",
    B."SORC" AS "B_출처",
    B."MXMM_VAL" AS "B_최대값",
    B."MIMM_VAL" AS "B_최소값",
    B."INJRY_YN" AS "B_위해여부",
    B."UNIT_NM" AS "B_단위명"
FROM "I2600" A
INNER JOIN "I0950" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 29. [HIGH] I2560.LCNS_NO <-> I1220.LCNS_NO
--   - 값 일치율: 0.2% (2개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 2건
--   - 매칭된 샘플 데이터: ["19670154002","19700493002"]
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_인허가번호",
    A."BSSH_NM" AS "A_업소명",
    A."LOCPLC" AS "A_소재지",
    A."SAN" AS "A_산",
    A."LNBR" AS "A_번지",
    A."ISSNO" AS "A_호",
    A."TONG" AS "A_통",
    A."BAN" AS "A_반",
    A."SPCLADDR" AS "A_특수주소",
    A."SPCPPDONG" AS "A_특수지동",
    A."SPCPPISSNO" AS "A_특수지호",
    A."ROADNMSIGNGUCD" AS "A_도로명시군구코드",
    A."ROADNMADDREMDDVS" AS "A_도로명주소읍면동구분",
    A."ROADNMADDREMDCD" AS "A_도로명주소읍면동코드",
    A."ROADNMADDRBDFLRDVS" AS "A_도로명주소건물층구분",
    A."ROADNMADDRBDORIGNO" AS "A_도로명주소건물본번호",
    A."ROADNMADDRBDSUBNO" AS "A_도로명주소건물부번호",
    A."ROADNMADDRSPCLADDR" AS "A_도로명주소특수주소",
    A."PNU_CD" AS "A_PNU코드",
    A."BDMERGEMANAGENO" AS "A_건물통합관리번호",
    A."UFID_CD" AS "A_UFID코드",
    B."LCNS_NO" AS "B_인허가 번호",
    B."BSSH_NM" AS "B_업소명",
    B."PRSDNT_NM" AS "B_대표자명",
    B."INDUTY_NM" AS "B_업종",
    B."PRMS_DT" AS "B_허가일자",
    B."TELNO" AS "B_전화번호",
    B."LOCP_ADDR" AS "B_주소",
    B."INSTT_NM" AS "B_기관명"
FROM "I2560" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 30. [HIGH] C002.PRDLST_REPORT_NO <-> I1250.PRDLST_REPORT_NO
--   - 값 일치율: 0.2% (2개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 2건
--   - 매칭된 샘플 데이터: ["19550509001438","19550509001587"]
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
    A."ETQTY_XPORT_PRDLST_YN" AS "A_내수/겸용구분(N:내수, O:겸용)",
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
    B."ETQTY_XPORT_PRDLST_YN" AS "B_내수/겸용구분(N:내수, O:겸용)"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 31. [HIGH] I1540.LCNS_NO <-> I1220.LCNS_NO
--   - 값 일치율: 0.3% (2개 / Unique 756개)
--   - 실제 JOIN 레코드 수: 2건
--   - 매칭된 샘플 데이터: ["20140522061","20190533136"]
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
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 32. [HIGH] I2610.PRDLST_CD <-> I2510.PRDLST_CD
--   - 값 일치율: 12.5% (1개 / Unique 8개)
--   - 실제 JOIN 레코드 수: 1건
--   - 매칭된 샘플 데이터: ["A0000000000000"]
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
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 33. [HIGH] I2852.PRDLST_REPORT_NO <-> I0030.PRDLST_REPORT_NO
--   - 값 일치율: 0.1% (1개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 1건
--   - 매칭된 샘플 데이터: ["201000190041484"]
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
    B."FRMLC_MTHD" AS "B_포장방법",
    B."FRMLC_MTRQLT" AS "B_포장재질"
FROM "I2852" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 34. [HIGH] C003.PRDLST_REPORT_NO <-> I0030.PRDLST_REPORT_NO
--   - 값 일치율: 0.1% (1개 / Unique 1000개)
--   - 실제 JOIN 레코드 수: 1건
--   - 매칭된 샘플 데이터: ["2004001510459"]
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
    B."FRMLC_MTHD" AS "B_포장방법",
    B."FRMLC_MTRQLT" AS "B_포장재질"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;


-- =============================================================================
--   실제 데이터 활용 사례 (Playwright 크롤링) 기반 조인 시나리오
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1001. [PLAYWRIGHT] 건전지(건강기능식품 정보를 전부 모아! 지키자 내 건강)
--   - 활용 기관: 주식회사 피매치(https://www.pmatch.co.kr/)
--   - 매핑된 API: 건강기능식품 품목제조 신고사항 현황(I0030), 건강기능식품GMP 지정 현황(I0630), 건강기능식품 기능성 원료인정현황(I-0040), 건강기능식품 품목제조신고(원재료)(C003)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1002. [PLAYWRIGHT] 건강비밀(Vi-meal)
--   - 활용 기관: 와이즈셀렉션
--   - 매핑된 API: 건강기능식품 영양DB(I0760), 건강기능식품 기능성 원료인정현황(I-0040), 건강기능식품 개별인정형 정보(I-0050)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0050" A
INNER JOIN "I-0040" B
  ON A."HF_FNCLTY_MTRAL_RCOGN_NO" = B."HF_FNCLTY_MTRAL_RCOGN_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1003. [PLAYWRIGHT] 토스(Toss)
--   - 활용 기관: 주식회사 비바리퍼블리카(https://toss.im/)
--   - 매핑된 API: 건강기능식품 폐업정보(I2822), 건강기능식품판매업(I1290), 수입식품등영업신고대장(C001), 수입식품업 폐업정보(I2821), 식육즉석판매가공업 인허가 대장(I2835), 식육즉석판매가공업 폐업정보(I2827), 식품등수입판매업정보(I1260), 식품소분업 인허가 대장(I2831), 식품소분업 폐업정보(I2815), 식품제조가공업 폐업정보(I2811)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1004. [PLAYWRIGHT] 어떠케어
--   - 활용 기관: GC케어(https://www.gccare.net/)
--   - 매핑된 API: 건강기능식품 품목제조신고(원재료)(C003), 건강기능식품판매업(I1290), 조리식품의 레시피 DB(COOKRCP01), 건강기능식품GMP 지정 현황(I0630), 건강기능식품 품목분류정보(I2710), 건강기능식품 개별인정형 정보(I-0050), 건강기능식품 기능성 원료인정현황(I-0040)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0050" A
INNER JOIN "I-0040" B
  ON A."HF_FNCLTY_MTRAL_RCOGN_NO" = B."HF_FNCLTY_MTRAL_RCOGN_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1005. [PLAYWRIGHT] 농심(내부 구축 시스템)
--   - 활용 기관: 농심(https://www.nongshim.com/)
--   - 매핑된 API: 행정처분결과(I0470), 검사부적합(국내)(I2620), 회수.판매중지 정보(I0490), 공통기준규격(I2600), 품목유형코드(I2510), 시험항목코드(I2530), HACCP 교육훈련기관 지정 현황(I0600)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I0490" B
  ON A."BRCDNO" = B."BRCDNO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1006. [PLAYWRIGHT] 식품 LIMS
--   - 활용 기관: 
--   - 매핑된 API: 개별기준규격(I2580), 공통기준규격(I2600), 시험항목코드(I2530)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 1007. [PLAYWRIGHT] LIMS(Laboratory Information Management System)
--   - 활용 기관: 
--   - 매핑된 API: 공통기준규격(I2600), 공통기준종류(I2590), 공통기준제외(I2610), 시험항목코드(I2530)
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2600" A
INNER JOIN "I2590" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
LIMIT 10;


-- =============================================================================
--   실제 데이터 활용 사례 (Playwright 크롤링) 전체 시나리오 매핑
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 2001. [PLAYWRIGHT] 건전지(건강기능식품 정보를 전부 모아! 지키자 내 건강)
--   - 활용 기관: 주식회사 피매치(https://www.pmatch.co.kr/)
--   - 매핑된 API: 건강기능식품 품목제조 신고사항 현황(I0030), 건강기능식품GMP 지정 현황(I0630), 건강기능식품 기능성 원료인정현황(I-0040), 건강기능식품 품목제조신고(원재료)(C003)
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
    B."FRMLC_MTHD" AS "B_포장방법",
    B."FRMLC_MTRQLT" AS "B_포장재질"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2002. [PLAYWRIGHT] H-wis, 식품 위해정보 실시간 대응 시스템
--   - 활용 기관: 현대그린푸드(https://hyundaigreenfood.com/)
--   - 매핑된 API: 인허가 업소 정보(I2500), 회수.판매중지 정보(I0490), 행정처분결과(I0470)
-- -----------------------------------------------------------------------------
-- 💡 I0490 등 여러 테이블이 언급되었으나 직접 연관 키를 찾지 못함.
SELECT
    A."LCNS_NO" AS "A_영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "A_업종",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자명",
    A."TELNO" AS "A_전화번호",
    A."PRMS_DT" AS "A_허가일자",
    A."ADDR" AS "A_주소"
FROM "I2500" A
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2003. [PLAYWRIGHT] 건강비밀(Vi-meal)
--   - 활용 기관: 와이즈셀렉션
--   - 매핑된 API: 건강기능식품 영양DB(I0760), 건강기능식품 기능성 원료인정현황(I-0040), 건강기능식품 개별인정형 정보(I-0050)
-- -----------------------------------------------------------------------------
SELECT
    A."HF_FNCLTY_MTRAL_RCOGN_NO" AS "A_원료인정번호",
    A."DAY_INTK_HIGHLIMIT" AS "A_1일 섭취량 상한선",
    A."DAY_INTK_LOWLIMIT" AS "A_1일 섭취량 하한선",
    A."WT_UNIT" AS "A_중량 단위",
    A."RAWMTRL_NM" AS "A_원재료 명",
    A."IFTKN_ATNT_MATR_CN" AS "A_섭취시 주의 사항 내용",
    A."PRIMARY_FNCLTY" AS "A_주된 기능성",
    B."HF_FNCLTY_MTRAL_RCOGN_NO" AS "B_인정번호",
    B."PRMS_DT" AS "B_인정일자",
    B."BSSH_NM" AS "B_업체명",
    B."INDUTY_NM" AS "B_업종",
    B."ADDR" AS "B_주소",
    B."APLC_RAWMTRL_NM" AS "B_신청원료명",
    B."FNCLTY_CN" AS "B_기능성 내용",
    B."DAY_INTK_CN" AS "B_1일 섭취량",
    B."IFTKN_ATNT_MATR_CN" AS "B_섭취시 주의사항"
FROM "I-0050" A
INNER JOIN "I-0040" B
  ON A."HF_FNCLTY_MTRAL_RCOGN_NO" = B."HF_FNCLTY_MTRAL_RCOGN_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2004. [PLAYWRIGHT] 한살림 ERP 시스템
--   - 활용 기관: http://www.hansalim.or.kr/
--   - 매핑된 API: 품목유형코드(I2510), 시험항목코드(I2530), 식품원재료코드(I2520)
-- -----------------------------------------------------------------------------
-- 💡 I2530 등 여러 테이블이 언급되었으나 직접 연관 키를 찾지 못함.
SELECT
    A."LV" AS "A_레벨",
    A."PRDLST_CD" AS "A_품목코드",
    A."KOR_NM" AS "A_한글명",
    A."ENG_NM" AS "A_영문명",
    A."DFN" AS "A_정의",
    A."VALD_BEGN_DT" AS "A_유효개시일자",
    A."VALD_END_DT" AS "A_유효종료일자",
    A."HRNK_PRDLST_CD" AS "A_상위품목코드",
    A."HTRK_PRDLST_CD" AS "A_최상위품목코드",
    A."MXTR_PRDLST_YN" AS "A_조합품목여부",
    A."ATTRB_SEQ" AS "A_속성일련번호",
    A."PIAM_KOR_NM" AS "A_속성한글명",
    A."PRDLST_YN" AS "A_품목여부",
    A."UPDT_PRVNS" AS "A_수정사유",
    A."USE_YN" AS "A_사용여부",
    A."RM" AS "A_비고",
    A."FDGRP_YN" AS "A_식품군여부",
    A."LAST_UPDT_DTM" AS "A_최종수정일",
    A."CHD_SMBL_FD_YN" AS "A_어린이기호식품 여부"
FROM "I2510" A
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2005. [PLAYWRIGHT] 토스(Toss)
--   - 활용 기관: 주식회사 비바리퍼블리카(https://toss.im/)
--   - 매핑된 API: 건강기능식품 폐업정보(I2822), 건강기능식품판매업(I1290), 수입식품등영업신고대장(C001), 수입식품업 폐업정보(I2821), 식육즉석판매가공업 인허가 대장(I2835), 식육즉석판매가공업 폐업정보(I2827), 식품등수입판매업정보(I1260), 식품소분업 인허가 대장(I2831), 식품소분업 폐업정보(I2815), 식품제조가공업 폐업정보(I2811)
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
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2006. [PLAYWRIGHT] 어떠케어
--   - 활용 기관: GC케어(https://www.gccare.net/)
--   - 매핑된 API: 건강기능식품 품목제조신고(원재료)(C003), 건강기능식품판매업(I1290), 조리식품의 레시피 DB(COOKRCP01), 건강기능식품 전문.벤처제조업인허가 현황(I-0020), 건강기능식품GMP 지정 현황(I0630), 건강기능식품 품목분류정보(I2710), 건강기능식품 개별인정형 정보(I-0050), 건강기능식품 기능성 원료인정현황(I-0040)
-- -----------------------------------------------------------------------------
SELECT
    A."HF_FNCLTY_MTRAL_RCOGN_NO" AS "A_원료인정번호",
    A."DAY_INTK_HIGHLIMIT" AS "A_1일 섭취량 상한선",
    A."DAY_INTK_LOWLIMIT" AS "A_1일 섭취량 하한선",
    A."WT_UNIT" AS "A_중량 단위",
    A."RAWMTRL_NM" AS "A_원재료 명",
    A."IFTKN_ATNT_MATR_CN" AS "A_섭취시 주의 사항 내용",
    A."PRIMARY_FNCLTY" AS "A_주된 기능성",
    B."HF_FNCLTY_MTRAL_RCOGN_NO" AS "B_인정번호",
    B."PRMS_DT" AS "B_인정일자",
    B."BSSH_NM" AS "B_업체명",
    B."INDUTY_NM" AS "B_업종",
    B."ADDR" AS "B_주소",
    B."APLC_RAWMTRL_NM" AS "B_신청원료명",
    B."FNCLTY_CN" AS "B_기능성 내용",
    B."DAY_INTK_CN" AS "B_1일 섭취량",
    B."IFTKN_ATNT_MATR_CN" AS "B_섭취시 주의사항"
FROM "I-0050" A
INNER JOIN "I-0040" B
  ON A."HF_FNCLTY_MTRAL_RCOGN_NO" = B."HF_FNCLTY_MTRAL_RCOGN_NO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2007. [PLAYWRIGHT] 농심(내부 구축 시스템)
--   - 활용 기관: 농심(https://www.nongshim.com/)
--   - 매핑된 API: 행정처분결과(I0470), 검사부적합(국내)(I2620), 회수.판매중지 정보(I0490), 공통기준규격(I2600), 품목유형코드(I2510), 시험항목코드(I2530), HACCP 교육훈련기관 지정 현황(I0600)
-- -----------------------------------------------------------------------------
SELECT
    A."PRDTNM" AS "A_제품명",
    A."BSSHNM" AS "A_업소명",
    A."MNFDT" AS "A_제조일자",
    A."DISTBTMLMT" AS "A_유통/소비기한",
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
    B."PRDTNM" AS "B_제품명",
    B."RTRVLPRVNS" AS "B_회수사유",
    B."BSSHNM" AS "B_제조업체명",
    B."ADDR" AS "B_업체주소",
    B."TELNO" AS "B_전화번호",
    B."BRCDNO" AS "B_바코드번호",
    B."FRMLCUNIT" AS "B_포장단위",
    B."MNFDT" AS "B_제조일자",
    B."RTRVLPLANDOC_RTRVLMTHD" AS "B_회수방법",
    B."DISTBTMLMT" AS "B_유통/소비기한",
    B."PRDLST_TYPE" AS "B_식품분류",
    B."IMG_FILE_PATH" AS "B_제품사진 URL",
    B."PRDLST_CD" AS "B_품목코드",
    B."CRET_DTM" AS "B_등록일",
    B."RTRVLDSUSE_SEQ" AS "B_회수.판매중지 일련번호",
    B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
    B."RTRVL_GRDCD_NM" AS "B_회수등급",
    B."PRDLST_CD_NM" AS "B_품목유형(품목코드명)",
    B."LCNS_NO" AS "B_업체인허가번호"
FROM "I2620" A
INNER JOIN "I0490" B
  ON A."BRCDNO" = B."BRCDNO"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2008. [PLAYWRIGHT] 식품 LIMS
--   - 활용 기관: 
--   - 매핑된 API: 개별기준규격(I2580), 공통기준규격(I2600), 시험항목코드(I2530)
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_개별기준규격일련번호",
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
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2009. [PLAYWRIGHT] (주)필로시스생명과학이 운영하는 Gmate Premium에서 조리식품의 레시피DB 자료 공
--   - 활용 기관: (주)필로시스생명과학
--   - 매핑된 API: 조리식품의 레시피 DB(COOKRCP01)
-- -----------------------------------------------------------------------------
SELECT
    A."RCP_SEQ" AS "A_일련번호",
    A."RCP_NM" AS "A_메뉴명",
    A."RCP_WAY2" AS "A_조리방법",
    A."RCP_PAT2" AS "A_요리종류",
    A."INFO_WGT" AS "A_중량(1인분)",
    A."INFO_ENG" AS "A_열량",
    A."INFO_CAR" AS "A_탄수화물",
    A."INFO_PRO" AS "A_단백질",
    A."INFO_FAT" AS "A_지방",
    A."INFO_NA" AS "A_나트륨",
    A."HASH_TAG" AS "A_해쉬태그",
    A."ATT_FILE_NO_MAIN" AS "A_이미지경로(소)",
    A."ATT_FILE_NO_MK" AS "A_이미지경로(대)",
    A."RCP_PARTS_DTLS" AS "A_재료정보",
    A."MANUAL01" AS "A_만드는법_01",
    A."MANUAL_IMG01" AS "A_만드는법_이미지_01",
    A."MANUAL02" AS "A_만드는법_02",
    A."MANUAL_IMG02" AS "A_만드는법_이미지_02",
    A."MANUAL03" AS "A_만드는법_03",
    A."MANUAL_IMG03" AS "A_만드는법_이미지_03",
    A."MANUAL04" AS "A_만드는법_04",
    A."MANUAL_IMG04" AS "A_만드는법_이미지_04",
    A."MANUAL05" AS "A_만드는법_05",
    A."MANUAL_IMG05" AS "A_만드는법_이미지_05",
    A."MANUAL06" AS "A_만드는법_06",
    A."MANUAL_IMG06" AS "A_만드는법_이미지_06",
    A."MANUAL07" AS "A_만드는법_07",
    A."MANUAL_IMG07" AS "A_만드는법_이미지_07",
    A."MANUAL08" AS "A_만드는법_08",
    A."MANUAL_IMG08" AS "A_만드는법_이미지_08",
    A."MANUAL09" AS "A_만드는법_09",
    A."MANUAL_IMG09" AS "A_만드는법_이미지_09",
    A."MANUAL10" AS "A_만드는법_10",
    A."MANUAL_IMG10" AS "A_만드는법_이미지_10",
    A."MANUAL11" AS "A_만드는법_11",
    A."MANUAL_IMG11" AS "A_만드는법_이미지_11",
    A."MANUAL12" AS "A_만드는법_12",
    A."MANUAL_IMG12" AS "A_만드는법_이미지_12",
    A."MANUAL13" AS "A_만드는법_13",
    A."MANUAL_IMG13" AS "A_만드는법_이미지_13",
    A."MANUAL14" AS "A_만드는법_14",
    A."MANUAL_IMG14" AS "A_만드는법_이미지_14",
    A."MANUAL15" AS "A_만드는법_15",
    A."MANUAL_IMG15" AS "A_만드는법_이미지_15",
    A."MANUAL16" AS "A_만드는법_16",
    A."MANUAL_IMG16" AS "A_만드는법_이미지_16",
    A."MANUAL17" AS "A_만드는법_17",
    A."MANUAL_IMG17" AS "A_만드는법_이미지_17",
    A."MANUAL18" AS "A_만드는법_18",
    A."MANUAL_IMG18" AS "A_만드는법_이미지_18",
    A."MANUAL19" AS "A_만드는법_19",
    A."MANUAL_IMG19" AS "A_만드는법_이미지_19",
    A."MANUAL20" AS "A_만드는법_20",
    A."MANUAL_IMG20" AS "A_만드는법_이미지_20",
    A."RCP_NA_TIP" AS "A_저감 조리법 TIP"
FROM "COOKRCP01" A
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2010. [PLAYWRIGHT] 한국관광공사 대한민국구석구석 웹사이트 내 식품접객업소 정보 및 위생등급 제공, 행정처분결과
--   - 활용 기관: 한국관광공사
--   - 매핑된 API: 행정처분결과(I0470)
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
    A."DSPSCN" AS "A_처분내용",
    A."LAWORD_CD_NM" AS "A_위반법령",
    A."PUBLIC_DT" AS "A_공개기한",
    A."LAST_UPDT_DTM" AS "A_최종수정일",
    A."DSPS_INSTTCD_NM" AS "A_처분기관명",
    A."DSPSDTLS_SEQ" AS "A_행정처분전산키"
FROM "I0470" A
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2011. [PLAYWRIGHT] LIMS(Laboratory Information Management System)
--   - 활용 기관: 
--   - 매핑된 API: 공통기준규격(I2600), 공통기준종류(I2590), 공통기준제외(I2610), 시험항목코드(I2530)
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
INNER JOIN "I2590" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2012. [PLAYWRIGHT] 푸드비투비(FoodB2B)
--   - 활용 기관: 
--   - 매핑된 API: 건강기능식품 전문.벤처제조업인허가 현황(I-0020), 건강기능식품GMP 지정 현황(I0630), 건강기능식품판매업(I1290), 기구.용기포장제조업(I1240), 수입식품등영업신고대장(C001), 식품제조가공업정보(I1220), 식품첨가물제조업(I1230), 축산물 가공업허가정보(I1300)
-- -----------------------------------------------------------------------------
-- I0630 등 여러 테이블이 언급되었으나 직접 연관 키를 찾지 못함.
SELECT
    A."LCNS_NO" AS "A_인허가 번호",
    A."BSSH_NM" AS "A_업소명",
    A."PRSDNT_NM" AS "A_대표자",
    A."INDUTY_NM" AS "A_업종",
    A."PRMS_DT" AS "A_허가일자",
    A."TELNO" AS "A_전화번호",
    A."LOCP_ADDR" AS "A_주소"
FROM "I-0020" A
LIMIT 10;

