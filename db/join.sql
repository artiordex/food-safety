-- =============================================================================
--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록
--   총 검증된 조인 성공 관계: 3개
--   생성일시: 2026-06-09T07:49:10.533Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [HIGH] I2580.PRDLST_CD <-> I0950.PRDLST_CD
--   - 값 일치율: 100.0% (1개 / Unique 1개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["D0300300003000"]
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
-- 2. [HIGH] I2560.LCNS_NO <-> I2500.LCNS_NO
--   - 값 일치율: 100.0% (5개 / Unique 5개)
--   - 실제 JOIN 레코드 수: 5건
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
-- 3. [HIGH] C001.LCNS_NO <-> I1260.LCNS_NO
--   - 값 일치율: 100.0% (5개 / Unique 5개)
--   - 실제 JOIN 레코드 수: 5건
--   - 매칭된 샘플 데이터: ["20190009444","20200009171","20210006762"]
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

