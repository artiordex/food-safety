-- =============================================================================
-- 식품안전나라 Open API PK/FK 후보 ERD DDL (전체 후보 무제한 연결 버전)
-- 목적: CONFIRMED 및 SUGGESTED를 포함한 모든 PK/FK 후보를 무제한 실선 연결
-- 정책: 모든 PK 후보를 PRIMARY KEY로 지정, 모든 FK 후보를 FOREIGN KEY 제약조건으로 주석 없이 실선 연결
-- =============================================================================

PRAGMA foreign_keys = ON;

-- -----------------------------------------------------------------------------
-- I2713 / 위생용품영업정보
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2713" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2510 / 품목유형코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2510" (
  "LV" VARCHAR(500), -- LV / 레벨
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드 / PK 후보(HIGH)
  "KOR_NM" VARCHAR(500), -- KOR_NM / 한글명
  "ENG_NM" VARCHAR(500), -- ENG_NM / 영문명
  "DFN" VARCHAR(500), -- DFN / 정의
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "HRNK_PRDLST_CD" VARCHAR(500), -- HRNK_PRDLST_CD / 상위품목코드
  "HTRK_PRDLST_CD" VARCHAR(500), -- HTRK_PRDLST_CD / 최상위품목코드
  "MXTR_PRDLST_YN" VARCHAR(500), -- MXTR_PRDLST_YN / 조합품목여부
  "ATTRB_SEQ" VARCHAR(500), -- ATTRB_SEQ / 속성일련번호
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 속성한글명
  "PRDLST_YN" VARCHAR(500), -- PRDLST_YN / 품목여부
  "UPDT_PRVNS" VARCHAR(500), -- UPDT_PRVNS / 수정사유
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "RM" VARCHAR(500), -- RM / 비고
  "FDGRP_YN" VARCHAR(500), -- FDGRP_YN / 식품군여부
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "CHD_SMBL_FD_YN" VARCHAR(500), -- CHD_SMBL_FD_YN / 어린이기호식품 여부
  PRIMARY KEY ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I2500 / 인허가 업소 정보
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2500" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 영업고유구분번호(인허가번호) / PK 후보(HIGH)
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1220 / 식품제조가공업정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1220" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1200 / 식품접객업정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1200" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "HG_LV" VARCHAR(500), -- HG_LV / 위생등급
  "ASGN_GIGAN_FROM" VARCHAR(500), -- ASGN_GIGAN_FROM / 위생등급지정시작일
  "ASGN_GIGAN_TO" VARCHAR(500), -- ASGN_GIGAN_TO / 위생등급지정종료일
  "PART_GBN" VARCHAR(500), -- PART_GBN / 나트륨저감화업소여부
  "JOIN_YMD" VARCHAR(500), -- JOIN_YMD / 나트륨저감화참여일
  "APPT_YMD" VARCHAR(500), -- APPT_YMD / 나트륨저감화업소지정일
  "CALC_YMD" VARCHAR(500), -- CALC_YMD / 나트륨저감화업소취소일
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "SITE_X" VARCHAR(500), -- SITE_X / 위도
  "SITE_Y" VARCHAR(500), -- SITE_Y / 경도
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 데이터생성일시
  "BSN_LCNS_LEDG_NO" VARCHAR(500), -- BSN_LCNS_LEDG_NO / 영업대장전산키(고유값)
  "PET_OUTIN_YN" VARCHAR(500), -- PET_OUTIN_YN / 반려동물출입여부
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1250 / 식품(첨가물)품목제조보고
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1250" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 품목유형명
  "PRODUCTION" VARCHAR(500), -- PRODUCTION / 생산종료여부
  "HIENG_LNTRT_DVS_NM" VARCHAR(500), -- HIENG_LNTRT_DVS_NM / 고열량저영양식품여부
  "CHILD_CRTFC_YN" VARCHAR(500), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 소비기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일자
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "QLITY_MNTNC_TMLMT_DAYCNT" VARCHAR(500), -- QLITY_MNTNC_TMLMT_DAYCNT / 품질유지기한일수
  "USAGE" VARCHAR(500), -- USAGE / 용법
  "PRPOS" VARCHAR(500), -- PRPOS / 용도
  "DISPOS" VARCHAR(500), -- DISPOS / 제품형태
  "FRMLC_MTRQLT" VARCHAR(500), -- FRMLC_MTRQLT / 포장재질
  "ETQTY_XPORT_PRDLST_YN" VARCHAR(500), -- ETQTY_XPORT_PRDLST_YN / 내수/겸용구분(N:내수, O:겸용)
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1260 / 식품등수입판매업정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1260" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0310 / 건강기능식품 생산실적 보고 품목 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0310" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(500), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(500), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "EVL_YR" VARCHAR(500), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "FYER_PRDCTN_ABRT_QY" VARCHAR(500), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG)
  "PRDCTN_QY" VARCHAR(500), -- PRDCTN_QY / 생산량(KG)
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I0030 / 건강기능식품 품목제조 신고사항 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0030" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소_명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목_명
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가_일자
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 소비기한_일수
  "DISPOS" VARCHAR(500), -- DISPOS / 제품형태
  "NTK_MTHD" VARCHAR(500), -- NTK_MTHD / 섭취방법
  "PRIMARY_FNCLTY" VARCHAR(500), -- PRIMARY_FNCLTY / 주된기능성
  "IFTKN_ATNT_MATR_CN" VARCHAR(500), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "CSTDY_MTHD" VARCHAR(500), -- CSTDY_MTHD / 보관방법
  "PRDLST_CDNM" VARCHAR(500), -- PRDLST_CDNM / 유형
  "STDR_STND" VARCHAR(500), -- STDR_STND / 기준규격
  "HIENG_LNTRT_DVS_NM" VARCHAR(500), -- HIENG_LNTRT_DVS_NM / 고열량저영양여부
  "PRODUCTION" VARCHAR(500), -- PRODUCTION / 생산종료여부
  "CHILD_CRTFC_YN" VARCHAR(500), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "PRDT_SHAP_CD_NM" VARCHAR(500), -- PRDT_SHAP_CD_NM / 제품_형태_코드_명
  "FRMLC_MTRQLT" VARCHAR(500), -- FRMLC_MTRQLT / 포장재질
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 품목유형(기능지표성분)
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일자
  "INDIV_RAWMTRL_NM" VARCHAR(500), -- INDIV_RAWMTRL_NM / 기능성 원재료
  "ETC_RAWMTRL_NM" VARCHAR(500), -- ETC_RAWMTRL_NM / 기타 원재료
  "CAP_RAWMTRL_NM" VARCHAR(500), -- CAP_RAWMTRL_NM / 캡슐 원재료
  "FRMLC_MTHD" VARCHAR(500), -- FRMLC_MTHD / 포장방법
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2711 / 위생용품품목제조보고
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2711" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 81.4%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 유형
  "PRODUCTION" VARCHAR(500), -- PRODUCTION / 생산종료여부
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 유통/소비기한
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일자
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1300 / 축산물 가공업허가정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1300" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0470 / 행정처분결과
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0470" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(500), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "DSPS_DCSNDT" VARCHAR(500), -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" VARCHAR(500), -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" VARCHAR(500), -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(500), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(500), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "DSPSCN" VARCHAR(500), -- DSPSCN / 처분내용
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 위반법령
  "PUBLIC_DT" VARCHAR(500), -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "DSPS_INSTTCD_NM" VARCHAR(500), -- DSPS_INSTTCD_NM / 처분기관명
  "DSPSDTLS_SEQ" VARCHAR(500), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  PRIMARY KEY ("DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0490 / 회수.판매중지 정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0490" (
  "PRDTNM" VARCHAR(500), -- PRDTNM / 제품명
  "RTRVLPRVNS" VARCHAR(500), -- RTRVLPRVNS / 회수사유
  "BSSHNM" VARCHAR(500), -- BSSHNM / 제조업체명
  "ADDR" VARCHAR(500), -- ADDR / 업체주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "BRCDNO" VARCHAR(500), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(500), -- FRMLCUNIT / 포장단위
  "MNFDT" VARCHAR(500), -- MNFDT / 제조일자
  "RTRVLPLANDOC_RTRVLMTHD" VARCHAR(500), -- RTRVLPLANDOC_RTRVLMTHD / 회수방법
  "DISTBTMLMT" VARCHAR(500), -- DISTBTMLMT / 유통/소비기한
  "PRDLST_TYPE" VARCHAR(500), -- PRDLST_TYPE / 식품분류
  "IMG_FILE_PATH" VARCHAR(500), -- IMG_FILE_PATH / 제품사진 URL
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드 / FK 후보: I2510.PRDLST_CD(HIGH, 9.2%)
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" VARCHAR(500), -- RTRVLDSUSE_SEQ / 회수.판매중지 일련번호 / PK 후보(HIGH)
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호
  "RTRVL_GRDCD_NM" VARCHAR(500), -- RTRVL_GRDCD_NM / 회수등급
  "PRDLST_CD_NM" VARCHAR(500), -- PRDLST_CD_NM / 품목유형(품목코드명)
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 업체인허가번호
  PRIMARY KEY ("RTRVLDSUSE_SEQ"),
  FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I2530 / 시험항목코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2530" (
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / PK 후보(HIGH)
  "KOR_NM" VARCHAR(500), -- KOR_NM / 한글명
  "ENG_NM" VARCHAR(500), -- ENG_NM / 영문명
  "ABRV" VARCHAR(500), -- ABRV / 약어
  "NCKNM" VARCHAR(500), -- NCKNM / 이명
  "TESTITM_NM" VARCHAR(500), -- TESTITM_NM / 시험항목명
  "TESTITM_LCLAS_CD" VARCHAR(500), -- TESTITM_LCLAS_CD / 시험항목대분류시퀀스
  "L_ATTRB_CD" VARCHAR(500), -- L_ATTRB_CD / 시험항목대분류코드
  "L_KOR_NM" VARCHAR(500), -- L_KOR_NM / 대분류한글명
  "TESTITM_MLSFC_CD" VARCHAR(500), -- TESTITM_MLSFC_CD / 시험항목중분류시퀀스
  "M_ATTRB_CD" VARCHAR(500), -- M_ATTRB_CD / 시험항목중분류코드
  "M_KOR_NM" VARCHAR(500), -- M_KOR_NM / 중분류한글명
  "REMN_MTTR_DFN" VARCHAR(500), -- REMN_MTTR_DFN / 잔류물질정의
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2590 / 공통기준종류
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2590" (
  "CMMN_SPEC_CD" VARCHAR(500), -- CMMN_SPEC_CD / 공통기준규격코드 / PK 후보(HIGH)
  "SPEC_NM" VARCHAR(500), -- SPEC_NM / 기준규격명
  "HRNK_CMMN_SPEC_CD" VARCHAR(500), -- HRNK_CMMN_SPEC_CD / 상위공통기준규격코드
  "LV" VARCHAR(500), -- LV / 레벨
  "DFN" VARCHAR(500), -- DFN / 정의
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("CMMN_SPEC_CD")
);

-- -----------------------------------------------------------------------------
-- I2826 / 축산물 판매업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2826" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2828 / 축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2828" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2837 / 용어사전(기구용기포장∙식의약품용어집)
-- 카테고리: 용어사전
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2837" (
  "WORD" VARCHAR(500), -- WORD / 단어
  "FRNTNFISH" VARCHAR(500), -- FRNTNFISH / 외국어
  "DTL_DESC" VARCHAR(500), -- DTL_DESC / 설명
  "KEYWORD" VARCHAR(500), -- KEYWORD / 연관어
  "SAUS" VARCHAR(500), -- SAUS / 출처
  "LAST_UPDT_DTM" VARCHAR(500) -- LAST_UPDT_DTM / 최종수정일
);

-- -----------------------------------------------------------------------------
-- I2825 / 축산물 식육포장처리업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2825" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2812 / 즉석판매제조가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2812" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2819 / 식품접객업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2819" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2824 / 축산물 가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2824" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2820 / 집단급식소 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2820" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2780 / 수입쇠고기 냉동전환 정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2780" (
  "MEATWATCH_NO" VARCHAR(500), -- MEATWATCH_NO / 이력번호 / PK 후보(LOW)
  "HIST_NO" VARCHAR(500), -- HIST_NO / 수입신고확인증번호
  "ORGNP_NM" VARCHAR(500), -- ORGNP_NM / 원산지
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 수입업체명
  "APLC_DTM" VARCHAR(500), -- APLC_DTM / 신고일
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품명(한글)
  "FREEZING_CNVRS_QTY" VARCHAR(500), -- FREEZING_CNVRS_QTY / 전환수량(BOX)
  "FREEZING_CNVRS_WT" VARCHAR(500), -- FREEZING_CNVRS_WT / 전환중량(KG)
  "FRESH_DISTB_TMLMT_BGN_DT" VARCHAR(500), -- FRESH_DISTB_TMLMT_BGN_DT / 냉장유통/소비기한 시작일자
  "FRESH_DISTB_TMLMT_DT" VARCHAR(500), -- FRESH_DISTB_TMLMT_DT / 냉장유통/소비기한 만료일자
  "FREEZING_CNVRS_OPRTN_DT" VARCHAR(500), -- FREEZING_CNVRS_OPRTN_DT / 냉동전환 실시일
  "FREEZING_CNVRS_PREARNGE_DT" VARCHAR(500), -- FREEZING_CNVRS_PREARNGE_DT / 냉동전환 완료일
  "FREEZING_DISTB_TMLMT_DT" VARCHAR(500), -- FREEZING_DISTB_TMLMT_DT / 냉동전환 후 유통/소비기한
  "ACCEPT_NO" VARCHAR(500), -- ACCEPT_NO / 축산물수입신고필증번호
  PRIMARY KEY ("MEATWATCH_NO")
);

-- -----------------------------------------------------------------------------
-- I2816 / 식품판매업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2816" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2823 / 위생용품 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2823" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2818 / 용기.포장류제조업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2818" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2811 / 식품제조가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2811" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2813 / 식품첨가물제조업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2813" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2814 / 식품운반업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2814" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2815 / 식품소분업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2815" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2822 / 건강기능식품 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2822" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2817 / 식품보존업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2817" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2821 / 수입식품업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2821" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2827 / 식육즉석판매가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2827" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1210 / 집단급식소 설치 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1210" (
  "CNCTR_MANAGE_BSSH_NO" VARCHAR(500), -- CNCTR_MANAGE_BSSH_NO / 집중관리업소번호 / PK 후보(HIGH)
  "SIGNGU_CD_NM" VARCHAR(500), -- SIGNGU_CD_NM / 시군구명
  "INDUTY_CL_CD_NM" VARCHAR(500), -- INDUTY_CL_CD_NM / 업종분류명
  "CNCTR_MANAGE_YN" VARCHAR(500), -- CNCTR_MANAGE_YN / 집중관리여부
  "MLSV_MTHD_CD_NM" VARCHAR(500), -- MLSV_MTHD_CD_NM / 급식방법명
  "FCPRV_NM" VARCHAR(500), -- FCPRV_NM / 급식소명
  "FCPRV_PRSDNT_NM" VARCHAR(500), -- FCPRV_PRSDNT_NM / 급식소대표자명
  "FCPRV_ADDR" VARCHAR(500), -- FCPRV_ADDR / 급식소주소
  "CNSGN_BSSH_NM" VARCHAR(500), -- CNSGN_BSSH_NM / 위탁업소명
  "ORGN_MLSV_YN" VARCHAR(500), -- ORGN_MLSV_YN / 단체급식여부
  "CNSGN_PRSDNT_NM" VARCHAR(500), -- CNSGN_PRSDNT_NM / 위탁대표자명
  "CNSGN_BSSH_ADDR" VARCHAR(500), -- CNSGN_BSSH_ADDR / 위탁업소주소
  "RM" VARCHAR(500), -- RM / 비고
  PRIMARY KEY ("CNCTR_MANAGE_BSSH_NO")
);

-- -----------------------------------------------------------------------------
-- I0680 / 위생관리등급별 업소 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0680" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "EVL_TYPE_DVS_NM" VARCHAR(500), -- EVL_TYPE_DVS_NM / 평가유형
  "EVL_GRD_NM" VARCHAR(500), -- EVL_GRD_NM / 평가등급
  "EVL_DT" VARCHAR(500), -- EVL_DT / 평가일자
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0060 / 주류제조.면허자 식품제조.가공영업 등록 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0060" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종명
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2861 / 음식점업소 인허가 변경 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2861" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I1200.LCNS_NO(HIGH, 100.0%)
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(500), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(500), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(500), -- CHNG_PRVNS / 변경사유
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1200" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C004 / 식품접객업소 위생등급 지정현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C004" (
  "HG_ASGN_NM" VARCHAR(500), -- HG_ASGN_NM / 지정기관
  "HG_ASGN_LV" VARCHAR(500), -- HG_ASGN_LV / 지정등급
  "HG_ASGN_NO" VARCHAR(500), -- HG_ASGN_NO / 지정번호 / PK 후보(HIGH)
  "HG_ASGN_YMD" VARCHAR(500), -- HG_ASGN_YMD / 지정일자
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "ASGN_FROM" VARCHAR(500), -- ASGN_FROM / 지정시작일자
  "ASGN_TO" VARCHAR(500), -- ASGN_TO / 지정종료일자
  "TELNO" VARCHAR(500), -- TELNO / 업소전화번호
  "WRKR_REG_NO" VARCHAR(500), -- WRKR_REG_NO / 사업자등록번호
  "ASGN_CANCEL_YMD" VARCHAR(500), -- ASGN_CANCEL_YMD / 지정취소일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자(YYYYMMDD)
  "INSTT_CD_NM" VARCHAR(500), -- INSTT_CD_NM / 인허가관할기관
  PRIMARY KEY ("HG_ASGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1550 / 위생공통교육기관내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1550" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "ZIPNO" VARCHAR(500), -- ZIPNO / 우편번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "LOCP_ADDR_DTL" VARCHAR(500), -- LOCP_ADDR_DTL / 주소상세
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRMS_DT" VARCHAR(500) -- PRMS_DT / 허가일자
);

-- -----------------------------------------------------------------------------
-- I1230 / 식품첨가물제조업
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1230" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1540 / 식품위생등급평가관리내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1540" (
  "EVL_SEQ" VARCHAR(500), -- EVL_SEQ / 평가일련번호 / PK 후보(HIGH)
  "EVL_PLAN_DT" VARCHAR(500), -- EVL_PLAN_DT / 평가계획일자
  "EVL_TYPE_DVS_CD_NM" VARCHAR(500), -- EVL_TYPE_DVS_CD_NM / 평가유형구분
  "EVL_DT" VARCHAR(500), -- EVL_DT / 평가일자
  "EVL_SCORE" VARCHAR(500), -- EVL_SCORE / 평가점수
  "EVL_GRD_CD_NM" VARCHAR(500), -- EVL_GRD_CD_NM / 평가등급
  "BSSH_LOC_CD_NM" VARCHAR(500), -- BSSH_LOC_CD_NM / 업소위치
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업체명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "EVL_INCPCTY_YN" VARCHAR(500), -- EVL_INCPCTY_YN / 점검불능여부
  PRIMARY KEY ("EVL_SEQ")
);

-- -----------------------------------------------------------------------------
-- I1560 / 식품위생교육내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1560" (
  "EDC_TYPE_NM" VARCHAR(500), -- EDC_TYPE_NM / 교육유형
  "EDC_DVS_NM" VARCHAR(500), -- EDC_DVS_NM / 교육구분
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "EDC_OBJ_NM" VARCHAR(500), -- EDC_OBJ_NM / 교육대상
  "CMPLTR_NAME" VARCHAR(500), -- CMPLTR_NAME / 성명
  "CTFHV_NO" VARCHAR(500), -- CTFHV_NO / 수료증번호 / PK 후보(HIGH)
  "COMPL_DTM" VARCHAR(500), -- COMPL_DTM / 수료일자
  "EDC_MEDIA" VARCHAR(500), -- EDC_MEDIA / 매체
  "EDC_COMPL_NMPR" VARCHAR(500), -- EDC_COMPL_NMPR / 교육수료인원
  "INSTT_CD_NM" VARCHAR(500), -- INSTT_CD_NM / 교육기관명
  "EDC_PROCES_NM" VARCHAR(500), -- EDC_PROCES_NM / 교육과정명
  "EDC_PLC" VARCHAR(500), -- EDC_PLC / 교육장소명
  "ADDR" VARCHAR(500), -- ADDR / 업소주소
  PRIMARY KEY ("CTFHV_NO")
);

-- -----------------------------------------------------------------------------
-- I2859 / 식품업소 인허가 변경 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2859" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I1220.LCNS_NO(HIGH, 100.0%)
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(500), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(500), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(500), -- CHNG_PRVNS / 변경사유
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1590 / 식품모범음식점
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1590" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "SIGNGU_NM" VARCHAR(500), -- SIGNGU_NM / 시군구
  "YEAR" VARCHAR(500), -- YEAR / 인허가연도
  "APLC_DT" VARCHAR(500), -- APLC_DT / 신청일자
  "PNCPL_FOOD_NM" VARCHAR(500), -- PNCPL_FOOD_NM / 주된 음식명
  "APPN_DT" VARCHAR(500), -- APPN_DT / 지정일자
  "OPERT_DT" VARCHAR(500), -- OPERT_DT / 작업일
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0300 / 식품.식품첨가물 생산실적 보고 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0300" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 5.6%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "EVL_YR" VARCHAR(500), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "H_ITEM_NM" VARCHAR(500), -- H_ITEM_NM / 품목유형
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "FYER_PRDCTN_ABRT_QY" VARCHAR(500), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG/옹기류:개)
  "PRDCTN_QY" VARCHAR(500), -- PRDCTN_QY / 생산량(KG/옹기류:개)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C002 / 식품(첨가물)품목제조보고(원재료)
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C002" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 6.4%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 품목유형명
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료명
  "RAWMTRL_ORDNO" VARCHAR(500), -- RAWMTRL_ORDNO / 원재료표시순서
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자(YYYYMMDD)
  "ETQTY_XPORT_PRDLST_YN" VARCHAR(500), -- ETQTY_XPORT_PRDLST_YN / 내수/겸용구분(N:내수, O:겸용)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2781 / 수입축산물 냉동전환 정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2781" (
  "MEATWATCH_NO" VARCHAR(500), -- MEATWATCH_NO / 이력번호
  "ACCEPT_NO" VARCHAR(500), -- ACCEPT_NO / 축산물수입신고필증번호 / PK 후보(LOW)
  "HIST_NO" VARCHAR(500), -- HIST_NO / 수입신고확인증번호
  "ORGNP_NM" VARCHAR(500), -- ORGNP_NM / 원산지
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 수입업체명
  "APLC_DTM" VARCHAR(500), -- APLC_DTM / 신고일
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품명(한글)
  "FREEZING_CNVRS_QTY" VARCHAR(500), -- FREEZING_CNVRS_QTY / 전환수량(BOX)
  "FREEZING_CNVRS_WT" VARCHAR(500), -- FREEZING_CNVRS_WT / 전환중량(KG)
  "FRESH_DISTB_TMLMT_BGN_DT" VARCHAR(500), -- FRESH_DISTB_TMLMT_BGN_DT / 냉장유통/소비기한 시작일자
  "FRESH_DISTB_TMLMT_DT" VARCHAR(500), -- FRESH_DISTB_TMLMT_DT / 냉장유통/소비기한 만료일자
  "FREEZING_CNVRS_OPRTN_DT" VARCHAR(500), -- FREEZING_CNVRS_OPRTN_DT / 냉동전환 실시일
  "FREEZING_CNVRS_PREARNGE_DT" VARCHAR(500), -- FREEZING_CNVRS_PREARNGE_DT / 냉동전환 완료일
  "FREEZING_DISTB_TMLMT_DT" VARCHAR(500), -- FREEZING_DISTB_TMLMT_DT / 냉동전환 후 유통/소비기한
  PRIMARY KEY ("ACCEPT_NO")
);

-- -----------------------------------------------------------------------------
-- I1380 / 수산물 수입업체 현황 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1380" (
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종코드명
  "BSN_PRMS_NO_1" VARCHAR(500), -- BSN_PRMS_NO_1 / 영업허가번호 / PK 후보(LOW)
  "ENTRPS_KOR_NM" VARCHAR(500), -- ENTRPS_KOR_NM / 업체한글명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "RM" VARCHAR(500), -- RM / 비고
  "PRSDNT_KOR_NM" VARCHAR(500), -- PRSDNT_KOR_NM / 대표자명
  PRIMARY KEY ("BSN_PRMS_NO_1")
);

-- -----------------------------------------------------------------------------
-- I2847 / 나트륨 줄이기 실천음식점 지정업체 대장
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2847" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업체명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 영업소재지
  "APPT_YMD" VARCHAR(500), -- APPT_YMD / 지정일자
  "ETC_INFO" VARCHAR(500), -- ETC_INFO / 기타정보
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 관할기관
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0250 / 우수수입업소 등록 현황
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0250" (
  "EXCLNC_INCM_BSSH_REGNO" VARCHAR(500), -- EXCLNC_INCM_BSSH_REGNO / 우수수입업소등록번호
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "ADDR" VARCHAR(500), -- ADDR / 소재지
  "EXCOURY_NATN_CD_NM" VARCHAR(500), -- EXCOURY_NATN_CD_NM / 수출국가
  "INCM_PRDT_XPORT_MC_NM" VARCHAR(500), -- INCM_PRDT_XPORT_MC_NM / 수입제품제조회사명
  "PRDLST_CNT" VARCHAR(500), -- PRDLST_CNT / 품목수
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1240 / 기구.용기포장제조업
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1240" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C001 / 수입식품등영업신고대장
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C001" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I1260.LCNS_NO(HIGH, 100.0%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2050 / 수산물 해외등록시설정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2050" (
  "REG_NO" VARCHAR(500), -- REG_NO / 등록번호 / PK 후보(HIGH)
  "ENTRPS_NM" VARCHAR(500), -- ENTRPS_NM / 업체명
  "KND_CD_NM" VARCHAR(500), -- KND_CD_NM / 종류코드명
  "NLTY_NM" VARCHAR(500), -- NLTY_NM / 국적명
  "ENTRPS_ADDR" VARCHAR(500), -- ENTRPS_ADDR / 업체주소
  "ADDR_PRDT" VARCHAR(500), -- ADDR_PRDT / 주소제품
  "APPLC_DT" VARCHAR(500), -- APPLC_DT / 적용일자
  "STATS_DVS" VARCHAR(500), -- STATS_DVS / 상태구분
  "POSTPNE_BGN_DT" VARCHAR(500), -- POSTPNE_BGN_DT / 유예시작일자
  "POSTPNE_END_DT" VARCHAR(500), -- POSTPNE_END_DT / 유예종료일자
  "POSTPNE_RELS_DT" VARCHAR(500), -- POSTPNE_RELS_DT / 유예해제일자
  "CANCL_DT" VARCHAR(500), -- CANCL_DT / 취소일자
  "RM" VARCHAR(500), -- RM / 비고
  PRIMARY KEY ("REG_NO")
);

-- -----------------------------------------------------------------------------
-- I1290 / 건강기능식품판매업
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1290" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0130 / LMO 수입 승인 현황
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0130" (
  "LMO_CONFM_NO" VARCHAR(500), -- LMO_CONFM_NO / 유전자 변형 생물체 승인번호 / PK 후보(HIGH)
  "CONFM_DT" VARCHAR(500), -- CONFM_DT / 승인일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "COMMON_NM" VARCHAR(500), -- COMMON_NM / 보통명
  "SYSTM_NM" VARCHAR(500), -- SYSTM_NM / 계통명
  "BNE_NM" VARCHAR(500), -- BNE_NM / 학명
  "PRPOS" VARCHAR(500), -- PRPOS / 용도
  "NATN_CD_NM" VARCHAR(500), -- NATN_CD_NM / 수입국
  PRIMARY KEY ("LMO_CONFM_NO")
);

-- -----------------------------------------------------------------------------
-- I1820 / 쇠고기(국내)이력추적 정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1820" (
  "ENTTY_IDNTFC_NO" VARCHAR(500), -- ENTTY_IDNTFC_NO / 개체식별번호 / PK 후보(HIGH)
  "SLAU_PLC_NM" VARCHAR(500), -- SLAU_PLC_NM / 도축장소
  "SNTT_PRSEC_NM" VARCHAR(500), -- SNTT_PRSEC_NM / 위생검사
  "SLAU_YMD" VARCHAR(500), -- SLAU_YMD / 도축년월일
  "ADDR" VARCHAR(500), -- ADDR / 도축장소주소
  "SNTT_PRSEC_PASS_ENNC" VARCHAR(500), -- SNTT_PRSEC_PASS_ENNC / 위생검사합격유무
  "PRCSS_DT" VARCHAR(500), -- PRCSS_DT / 가공일자
  "PRCSS_PLC_NM" VARCHAR(500), -- PRCSS_PLC_NM / 가공장소명
  "BRTH_DT" VARCHAR(500), -- BRTH_DT / 출생일자
  "ENTTY_STATS_NM" VARCHAR(500), -- ENTTY_STATS_NM / 개체상태명
  "COW_KND_NM" VARCHAR(500), -- COW_KND_NM / 소종류명
  "GND_NM" VARCHAR(500), -- GND_NM / 성별
  "FMH_NM" VARCHAR(500), -- FMH_NM / 농가명
  "VACIN_LAST_INOCL_DT" VARCHAR(500), -- VACIN_LAST_INOCL_DT / 백신최종접종일자
  "VACIN_LAST_INOCL_OPNO" VARCHAR(500), -- VACIN_LAST_INOCL_OPNO / 백신최종접종차수
  PRIMARY KEY ("ENTTY_IDNTFC_NO")
);

-- -----------------------------------------------------------------------------
-- C003 / 건강기능식품 품목제조신고(원재료)
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C003" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I0310.null(MEDIUM, 6.2%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH) / FK 후보: I0310.null(MEDIUM, 6.2%)
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고일자
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 소비기한
  "DISPOS" VARCHAR(500), -- DISPOS / 성상
  "NTK_MTHD" VARCHAR(500), -- NTK_MTHD / 섭취방법
  "PRIMARY_FNCLTY" VARCHAR(500), -- PRIMARY_FNCLTY / 주된기능성
  "IFTKN_ATNT_MATR_CN" VARCHAR(500), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "CSTDY_MTHD" VARCHAR(500), -- CSTDY_MTHD / 보관방법
  "SHAP" VARCHAR(500), -- SHAP / 형태
  "STDR_STND" VARCHAR(500), -- STDR_STND / 기준규격
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 최초생성일시
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  "PRDT_SHAP_CD_NM" VARCHAR(500), -- PRDT_SHAP_CD_NM / 제품형태
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO", "PRDLST_REPORT_NO") REFERENCES "I0310" ("LCNS_NO", "PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2860 / 건강기능식품업소 인허가 변경 정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2860" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(500), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(500), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(500), -- CHNG_PRVNS / 변경사유
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0630 / 건강기능식품GMP 지정 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0630" (
  "GMP_APPN_NO" VARCHAR(500), -- GMP_APPN_NO / GMP지정번호 / PK 후보(HIGH)
  "APPN_DT" VARCHAR(500), -- APPN_DT / 지정일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 업고고유번호
  "APPN_CANCL_DT" VARCHAR(500), -- APPN_CANCL_DT / GMP취소일자
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  PRIMARY KEY ("GMP_APPN_NO")
);

-- -----------------------------------------------------------------------------
-- I2710 / 건강기능식품 품목분류정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2710" (
  "PRDCT_NM" VARCHAR(500), -- PRDCT_NM / 품목명
  "IFTKN_ATNT_MATR_CN" VARCHAR(500), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "PRIMARY_FNCLTY" VARCHAR(500), -- PRIMARY_FNCLTY / 주된기능성
  "DAY_INTK_LOWLIMIT" VARCHAR(500), -- DAY_INTK_LOWLIMIT / 일일섭취량 하한
  "DAY_INTK_HIGHLIMIT" VARCHAR(500), -- DAY_INTK_HIGHLIMIT / 일일섭취량 상한
  "INTK_UNIT" VARCHAR(500), -- INTK_UNIT / 단위
  "INTK_MEMO" VARCHAR(500), -- INTK_MEMO / REMARK
  "SKLL_IX_IRDNT_RAWMTRL" VARCHAR(500), -- SKLL_IX_IRDNT_RAWMTRL / 성분명
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 최초등록일
  "LAST_UPDT_DTM" VARCHAR(500) -- LAST_UPDT_DTM / 최종수정일
);

-- -----------------------------------------------------------------------------
-- I-0020 / 건강기능식품 전문.벤처제조업인허가 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0020" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2712 / 위생용품품목제조보고(원재료)
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2712" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 70.8%), I2711.null(MEDIUM, 4.9%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH) / FK 후보: I2711.PRDLST_REPORT_NO(HIGH, 4.9%), I2711.null(MEDIUM, 4.9%)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 유형
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO", "PRDLST_REPORT_NO") REFERENCES "I2711" ("LCNS_NO", "PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I-0040 / 건강기능식품 기능성 원료인정현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0040" (
  "HF_FNCLTY_MTRAL_RCOGN_NO" VARCHAR(500), -- HF_FNCLTY_MTRAL_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 인정일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업체명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APLC_RAWMTRL_NM" VARCHAR(500), -- APLC_RAWMTRL_NM / 신청원료명
  "FNCLTY_CN" VARCHAR(500), -- FNCLTY_CN / 기능성 내용
  "DAY_INTK_CN" VARCHAR(500), -- DAY_INTK_CN / 1일 섭취량
  "IFTKN_ATNT_MATR_CN" VARCHAR(500), -- IFTKN_ATNT_MATR_CN / 섭취시 주의사항
  PRIMARY KEY ("HF_FNCLTY_MTRAL_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I-0050 / 건강기능식품 개별인정형 정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0050" (
  "HF_FNCLTY_MTRAL_RCOGN_NO" VARCHAR(500), -- HF_FNCLTY_MTRAL_RCOGN_NO / 원료인정번호 / PK 후보(HIGH)
  "DAY_INTK_HIGHLIMIT" VARCHAR(500), -- DAY_INTK_HIGHLIMIT / 1일 섭취량 상한선
  "DAY_INTK_LOWLIMIT" VARCHAR(500), -- DAY_INTK_LOWLIMIT / 1일 섭취량 하한선
  "WT_UNIT" VARCHAR(500), -- WT_UNIT / 중량 단위
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료 명
  "IFTKN_ATNT_MATR_CN" VARCHAR(500), -- IFTKN_ATNT_MATR_CN / 섭취시 주의 사항 내용
  "PRIMARY_FNCLTY" VARCHAR(500), -- PRIMARY_FNCLTY / 주된 기능성
  PRIMARY KEY ("HF_FNCLTY_MTRAL_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- C006 / 축산물품목제조보고(원재료)
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C006" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 유형
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 9.6%)
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자
  "RAWMTRL_ORDNO" VARCHAR(500), -- RAWMTRL_ORDNO / 원재료표시순서
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1310 / 축산물 품목제조정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1310" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I2500.LCNS_NO(HIGH, 30.0%), I1300.LCNS_NO(HIGH, 100.0%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 유형
  "PRODUCTION" VARCHAR(500), -- PRODUCTION / 생산종료여부
  "HIENG_LNTRT_DVS_NM" VARCHAR(500), -- HIENG_LNTRT_DVS_NM / 고열량저영양식품여부
  "CHILD_CRTFC_YN" VARCHAR(500), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 소비기한
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일자
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1350 / 축산물 판매업영업신고대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1350" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1370 / 축산물 집유업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1370" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "CLSBIZ_DVS_NM" VARCHAR(500), -- CLSBIZ_DVS_NM / 영업상태
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업 일자
  "CLSTMP_BGN_DT" VARCHAR(500), -- CLSTMP_BGN_DT / 휴업시작일자
  "CLSTMP_END_DT" VARCHAR(500), -- CLSTMP_END_DT / 휴업종료일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1340 / 축산물 운반업영업신고대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1340" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1320 / 축산물 식육포장처리업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1320" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "CLSBIZ_DVS_NM" VARCHAR(500), -- CLSBIZ_DVS_NM / 영업상태
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1420 / 축산물 생산실적정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1420" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(500), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(500), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "EVL_YR" VARCHAR(500), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "FYER_PRDCTN_ABRT_QY" VARCHAR(500), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG)
  "PRDCTN_QY" VARCHAR(500), -- PRDCTN_QY / 생산량(KG)
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1330 / 축산물 보관업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1330" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2851 / 위생용품영업 생산실적보고
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2851" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(500), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(500), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 41.5%)
  "EVL_YR" VARCHAR(500), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "PRDCTN_QY" VARCHAR(500), -- PRDCTN_QY / 생산량(KG/위생물수건:매)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2714 / 위생용품수입업영업신고대장
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2714" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2856 / 푸드트럭지정현황조회
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2856" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 인허가일자
  "INSTT_CDNM" VARCHAR(500), -- INSTT_CDNM / 인허가기관명
  "INDUTY_CDNM" VARCHAR(500), -- INDUTY_CDNM / 업종명
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 업소주소
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 업소대표자명
  "TELNO" VARCHAR(500), -- TELNO / 업소전화번호
  "CHNG_DT" VARCHAR(500), -- CHNG_DT / 변경일자(YYYYMMDD)
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2834 / 집단급식소 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2834" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2829 / 즉석판매제조가공업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2829" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2832 / 식품판매업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2832" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I-0010 / 식품조사처리업 인허가 현황
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0010" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "FOOD_HF_LS_CL_CD_NM" VARCHAR(500), -- FOOD_HF_LS_CL_CD_NM / 식품건기축산분류
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2830 / 식품운반업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2830" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2852 / 생산중단제품정보
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2852" (
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 품목보고일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "END_DT" VARCHAR(500), -- END_DT / 생산중단일자
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 품목유형명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 3.7%), I1220.LCNS_NO(HIGH, 4.5%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "FOOD_HF_LS_CL_CD_NM" VARCHAR(500), -- FOOD_HF_LS_CL_CD_NM / 구분
  "ARTCL_END_WHY" VARCHAR(500), -- ARTCL_END_WHY / 생산중단사유
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2831 / 식품소분업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2831" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2833 / 식품냉동.냉장업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2833" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2836 / 식용란선별포장업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2836" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2835 / 식육즉석판매가공업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2835" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2858 / 도축업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2858" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2857 / 공유주방운영업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2857" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0610 / 축산물HACCP 지정정보
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0610" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 9.5%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 업소주소
  "HACCP_APPN_DT" VARCHAR(500), -- HACCP_APPN_DT / HACCP 지정일자
  "HACCP_APPN_NO" VARCHAR(500), -- HACCP_APPN_NO / HACCP 지정번호 / PK 후보(HIGH)
  "ASGN_CANCL_DT" VARCHAR(500), -- ASGN_CANCL_DT / 지정취소일자
  "CRTFC_ENDDT" VARCHAR(500), -- CRTFC_ENDDT / 인증종료일자
  "CRTFC_RETN_DT" VARCHAR(500), -- CRTFC_RETN_DT / 인증반납일자
  PRIMARY KEY ("HACCP_APPN_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0580 / HACCP 적용업소 지정 현황
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0580" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 5.2%)
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "HACCP_APPN_DT" VARCHAR(500), -- HACCP_APPN_DT / HACCP 지정일자
  "HACCP_APPN_NO" VARCHAR(500), -- HACCP_APPN_NO / HACCP 지정번호 / PK 후보(HIGH)
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "CLSBIZ_DVS_CD_NM" VARCHAR(500), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "ASGN_CANCL_DT" VARCHAR(500), -- ASGN_CANCL_DT / 지정취소일자
  "CRTFC_ENDDT" VARCHAR(500), -- CRTFC_ENDDT / 인증종료일자
  "CRTFC_RETN_DT" VARCHAR(500), -- CRTFC_RETN_DT / 인증반납일자
  PRIMARY KEY ("HACCP_APPN_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2840 / 어린이 우수판매업소 지정현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2840" (
  "GNT_NO" VARCHAR(500), -- GNT_NO / 인허가번호 / PK 후보(HIGH)
  "UPSO_NM" VARCHAR(500), -- UPSO_NM / 업소명
  "UPJONG" VARCHAR(500), -- UPJONG / 업종
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APLC_DT" VARCHAR(500), -- APLC_DT / 지정_일자
  "HOLD_INSTT_CD" VARCHAR(500), -- HOLD_INSTT_CD / 관할기관
  PRIMARY KEY ("GNT_NO")
);

-- -----------------------------------------------------------------------------
-- I0340 / 어린이 식품안전보호구역 관리 현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0340" (
  "HOLD_INSTT_NM" VARCHAR(500), -- HOLD_INSTT_NM / 관할기관
  "SCHL_NM" VARCHAR(500), -- SCHL_NM / 학교명
  "FOOD_SAFE_PRTC_ZONE_NM" VARCHAR(500), -- FOOD_SAFE_PRTC_ZONE_NM / 식품안전보호구역지정명
  "ADDR" VARCHAR(500), -- ADDR / 위치
  "APPN_DT" VARCHAR(500), -- APPN_DT / 지정일자
  "BSSH_NO" VARCHAR(500), -- BSSH_NO / 업소고유번호(미사용)
  "UPSO_NM" VARCHAR(500), -- UPSO_NM / 업소명(미사용)
  "UPJONG" VARCHAR(500) -- UPJONG / 업종(미사용)
);

-- -----------------------------------------------------------------------------
-- I0600 / HACCP 교육훈련기관 지정 현황
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0600" (
  "EDC_INSTT_APPN_NO" VARCHAR(500), -- EDC_INSTT_APPN_NO / 지정번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 교육훈련기관명
  "BSSH_ADDR" VARCHAR(500), -- BSSH_ADDR / 주소
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  PRIMARY KEY ("EDC_INSTT_APPN_NO")
);

-- -----------------------------------------------------------------------------
-- I0080 / 어린이 기호식품 품질인증 현황 및 재심사 현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0080" (
  "CHILD_FFQ_CRTFC_NO" VARCHAR(500), -- CHILD_FFQ_CRTFC_NO / 인증번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "PRDLST_CD_NM" VARCHAR(500), -- PRDLST_CD_NM / 식품유형
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "CN_WT" VARCHAR(500), -- CN_WT / 제품용량
  "APPN_BGN_DT" VARCHAR(500), -- APPN_BGN_DT / 인증일자
  "APPN_END_DT" VARCHAR(500), -- APPN_END_DT / 만료일자
  "CHILD_FAVOR_FOOD_TYPE_NM" VARCHAR(500), -- CHILD_FAVOR_FOOD_TYPE_NM / 제품형태
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목보고번호
  PRIMARY KEY ("CHILD_FFQ_CRTFC_NO")
);

-- -----------------------------------------------------------------------------
-- I2846 / 어린이 급식센터 지원현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2846" (
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 관할기관
  "CNTER_NM" VARCHAR(500), -- CNTER_NM / 센터명
  "REPORT_YR" VARCHAR(500), -- REPORT_YR / 년도
  "REPORT_QU" VARCHAR(500), -- REPORT_QU / 분기
  "KNDRGR_REG_CO" VARCHAR(500), -- KNDRGR_REG_CO / 유치원 수
  "KNDRGR_NMPR_CO" VARCHAR(500), -- KNDRGR_NMPR_CO / 유치원 인원수
  "DCCNTR_REG_CO" VARCHAR(500), -- DCCNTR_REG_CO / 어린이집 수
  "DCCNTR_NMPR_CO" VARCHAR(500), -- DCCNTR_NMPR_CO / 어린이집 인원수
  "ETC_REG_CO" VARCHAR(500), -- ETC_REG_CO / 기타 수
  "ETC_NMPR_CO" VARCHAR(500) -- ETC_NMPR_CO / 기타 인원수
);

-- -----------------------------------------------------------------------------
-- I0320 / 식품이력추적관리 등록 현황
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0320" (
  "REG_NUM" VARCHAR(500), -- REG_NUM / 등록번호
  "PDT_NM" VARCHAR(500), -- PDT_NM / 제품명
  "PDT_BARCD" VARCHAR(500), -- PDT_BARCD / 바코드
  "PDT_TYPE" VARCHAR(500), -- PDT_TYPE / 식품유형
  "MAKE_TYPE" VARCHAR(500), -- MAKE_TYPE / 제조구분
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "BRNCH_NM" VARCHAR(500), -- BRNCH_NM / 업체명
  "BTYPE" VARCHAR(500), -- BTYPE / 업종
  "FOOD_TYPE" VARCHAR(500), -- FOOD_TYPE / 식품구분
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목보고번호 / PK 후보(HIGH)
  "MNFT_DAY" VARCHAR(500), -- MNFT_DAY / 제조일자(YYYYMMDD)
  "FOOD_HISTRACE_NUM" VARCHAR(500), -- FOOD_HISTRACE_NUM / 식품이력추적관리번호
  "CRCL_PRD" VARCHAR(500), -- CRCL_PRD / 소비기한
  "MOD_DT" VARCHAR(500), -- MOD_DT / 최종수정일(YYYYMMDD)
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1720 / 수입쇠고기 유통이력정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1720" (
  "BL_NO" VARCHAR(500), -- BL_NO / 선하증권번호 / PK 후보(HIGH)
  "INCM_BEEF_PRDLST_NM" VARCHAR(500), -- INCM_BEEF_PRDLST_NM / 수입쇠고기품목명
  "ORGNP_NATN_NM" VARCHAR(500), -- ORGNP_NATN_NM / 원산지국가명
  "EXCOURY_SLAU_PLC_NM" VARCHAR(500), -- EXCOURY_SLAU_PLC_NM / 수출국도축장소명
  "EXCOURY_SLAU_BGN_DT" VARCHAR(500), -- EXCOURY_SLAU_BGN_DT / 수출국도축시작일자
  "EXCOURY_SLAU_END_DT" VARCHAR(500), -- EXCOURY_SLAU_END_DT / 수출국도축종료일자
  "EXCOURY_PRCSS_PLC_NM" VARCHAR(500), -- EXCOURY_PRCSS_PLC_NM / 수출국가공장소명
  "EXCOURY_PRCSS_BGN_DT" VARCHAR(500), -- EXCOURY_PRCSS_BGN_DT / 수출국가공시작일자
  "EXCOURY_PRCSS_END_DT" VARCHAR(500), -- EXCOURY_PRCSS_END_DT / 수출국가공종료일자
  "XPORT_ENTRPS_NM" VARCHAR(500), -- XPORT_ENTRPS_NM / 수출업체명
  "INCM_ENTRPS_NM" VARCHAR(500), -- INCM_ENTRPS_NM / 수입업체명
  "INCM_DT" VARCHAR(500), -- INCM_DT / 수입일자
  "REGN_NM" VARCHAR(500), -- REGN_NM / 부위명
  PRIMARY KEY ("BL_NO")
);

-- -----------------------------------------------------------------------------
-- I1940 / 수산물이력정보-출하정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1940" (
  "HIST_TRACE_REG_NO" VARCHAR(500), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "LOTNO_RELES" VARCHAR(500), -- LOTNO_RELES / 로트번호출고 / PK 후보(LOW)
  "LOTNO_WRHOUSNG" VARCHAR(500), -- LOTNO_WRHOUSNG / 로트번호입고
  "PRDLST_GROUP_DVS_NM" VARCHAR(500), -- PRDLST_GROUP_DVS_NM / 품목
  "RELES_DVS_NM" VARCHAR(500), -- RELES_DVS_NM / 출고구분
  "PRDCTN_DT" VARCHAR(500), -- PRDCTN_DT / 생산일자
  "PRDCTN_QTY" VARCHAR(500), -- PRDCTN_QTY / 생산수량
  "RELES_DT" VARCHAR(500), -- RELES_DT / 출고일자
  "RELES_QTY" VARCHAR(500), -- RELES_QTY / 출고수량
  "RELES_UNIT_NM" VARCHAR(500), -- RELES_UNIT_NM / 출고단위
  PRIMARY KEY ("LOTNO_RELES")
);

-- -----------------------------------------------------------------------------
-- I1930 / 수산물이력정보-생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1930" (
  "HIST_TRACE_REG_NO" VARCHAR(500), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "LOTNO_WRHOUSNG" VARCHAR(500), -- LOTNO_WRHOUSNG / 로트번호입고
  "GOODS_NM" VARCHAR(500), -- GOODS_NM / 상품명
  "PRDLST_GROUP_DVS_NM" VARCHAR(500), -- PRDLST_GROUP_DVS_NM / 품목
  "SETT_QTY" VARCHAR(500), -- SETT_QTY / 입식수량
  "WRHOUSNG_DT" VARCHAR(500), -- WRHOUSNG_DT / 입고일자
  "WRHOUSNG_QTY" VARCHAR(500), -- WRHOUSNG_QTY / 입고수량
  "PHHGH_UNIT_CD_NM" VARCHAR(500) -- PHHGH_UNIT_CD_NM / 입고단위
);

-- -----------------------------------------------------------------------------
-- I1920 / 수산물이력정보-기본정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1920" (
  "HIST_TRACE_REG_NO" VARCHAR(500), -- HIST_TRACE_REG_NO / 이력추적등록번호 / PK 후보(LOW)
  "GOODS_NM" VARCHAR(500), -- GOODS_NM / 상품명
  "PRDLST_GROUP_DVS_NM" VARCHAR(500), -- PRDLST_GROUP_DVS_NM / 품목
  "ENTRPS_NM" VARCHAR(500), -- ENTRPS_NM / 업소명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "ADDR" VARCHAR(500), -- ADDR / 주소
  PRIMARY KEY ("HIST_TRACE_REG_NO")
);

-- -----------------------------------------------------------------------------
-- I1810 / 쇠고기(국내)이력추적 생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1810" (
  "ENTTY_IDNTFC_NO" VARCHAR(500), -- ENTTY_IDNTFC_NO / 개체식별번호 / PK 후보(HIGH)
  "BRTH_DT" VARCHAR(500), -- BRTH_DT / 출생일자
  "ENTTY_STATS_NM" VARCHAR(500), -- ENTTY_STATS_NM / 개체상태명
  "COW_KND_NM" VARCHAR(500), -- COW_KND_NM / 소종류명
  "GND_NM" VARCHAR(500), -- GND_NM / 성별
  "FMH_NM" VARCHAR(500), -- FMH_NM / 농가명
  "VACIN_LAST_INOCL_DT" VARCHAR(500), -- VACIN_LAST_INOCL_DT / 백신최종접종일자
  "VACIN_LAST_INOCL_OPNO" VARCHAR(500), -- VACIN_LAST_INOCL_OPNO / 백신최종접종차수
  PRIMARY KEY ("ENTTY_IDNTFC_NO")
);

-- -----------------------------------------------------------------------------
-- I1830 / 쇠고기(국내)이력추적 가공관리
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1830" (
  "ENTTY_IDNTFC_NO" VARCHAR(500), -- ENTTY_IDNTFC_NO / 개체식별번호 / PK 후보(HIGH)
  "PRCSS_PLC_CD" VARCHAR(500), -- PRCSS_PLC_CD / 가공장소코드
  "PRCSS_DT" VARCHAR(500), -- PRCSS_DT / 가공일자
  "PRCSS_PLC_NM" VARCHAR(500), -- PRCSS_PLC_NM / 가공장소명
  PRIMARY KEY ("ENTTY_IDNTFC_NO")
);

-- -----------------------------------------------------------------------------
-- I1800 / 농산물이력추적 유통정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1800" (
  "HIST_TRACE_REG_NO" VARCHAR(500), -- HIST_TRACE_REG_NO / 이력추적등록번호 / PK 후보(HIGH)
  "GRP_NM" VARCHAR(500), -- GRP_NM / 거래처명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("HIST_TRACE_REG_NO")
);

-- -----------------------------------------------------------------------------
-- I1960 / 패류독소정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1960" (
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "EXAM_SPOT_NM" VARCHAR(500), -- EXAM_SPOT_NM / 조사지점명
  "EXAM_SEAR_NM" VARCHAR(500), -- EXAM_SEAR_NM / 조사해역명
  "SPLORE_NO" VARCHAR(500), -- SPLORE_NO / 시료번호 / PK 후보(HIGH)
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 기관명
  "PICK_DT" VARCHAR(500), -- PICK_DT / 채취일자
  "WTNESSMAN_NM" VARCHAR(500), -- WTNESSMAN_NM / 입회자명
  "ORGNP_NM" VARCHAR(500), -- ORGNP_NM / 원산지명
  "SALT" VARCHAR(500), -- SALT / 염분
  "TEMOD" VARCHAR(500), -- TEMOD / 수온
  "SPLORE_DSUSE_DT" VARCHAR(500), -- SPLORE_DSUSE_DT / 시료폐기일자
  "FIT_YN" VARCHAR(500), -- FIT_YN / 적합여부
  PRIMARY KEY ("SPLORE_NO")
);

-- -----------------------------------------------------------------------------
-- I1790 / 농산물이력추적 생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1790" (
  "HIST_TRACE_REG_NO" VARCHAR(500), -- HIST_TRACE_REG_NO / 이력추적등록번호 / PK 후보(HIGH)
  "REG_INSTT_NM" VARCHAR(500), -- REG_INSTT_NM / 등록기관
  "RPRSNT_PRDLST_NM" VARCHAR(500), -- RPRSNT_PRDLST_NM / 대표품목
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "ORGN_NM" VARCHAR(500), -- ORGN_NM / 단체명
  "VALD_PRICE_BGN_DT" VARCHAR(500), -- VALD_PRICE_BGN_DT / 유효기간시작일자
  "VALD_PRICE_END_DT" VARCHAR(500), -- VALD_PRICE_END_DT / 유효기간종료일자
  PRIMARY KEY ("HIST_TRACE_REG_NO")
);

-- -----------------------------------------------------------------------------
-- I0150 / 후대교배종의 안전성 평가 신청 및 검토 정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0150" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "LMOCHILD_BTHTR_CRSS_YN" VARCHAR(500), -- LMOCHILD_BTHTR_CRSS_YN / 이종간교배여부
  "LMOCHILD_DFFPNT_YN" VARCHAR(500), -- LMOCHILD_DFFPNT_YN / 차이점여부
  "LMOCHILD_CHARTR_CHNGE_YN" VARCHAR(500), -- LMOCHILD_CHARTR_CHNGE_YN / 특성변화여부
  "GMO_PRDT_KND" VARCHAR(500), -- GMO_PRDT_KND / 제품종류
  "GOODS_NM" VARCHAR(500) -- GOODS_NM / 제품명
);

-- -----------------------------------------------------------------------------
-- I0140 / 유전자변형식품등의 안전성 평가 심사 결과 현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0140" (
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목 명
  "GOODS_NM" VARCHAR(500), -- GOODS_NM / 상품 명
  "INJECTION_GENE_CN" VARCHAR(500), -- INJECTION_GENE_CN / 삽입된 유전자 내용
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 허가 일자
  "ENDOW_CHARTR_CN" VARCHAR(500), -- ENDOW_CHARTR_CN / 부여된 특성 내용
  "GMO_SAFTY_NO" VARCHAR(500), -- GMO_SAFTY_NO / 통보 번호 / PK 후보(HIGH)
  "GMO_PRDT_KND_CL_NM" VARCHAR(500), -- GMO_PRDT_KND_CL_NM / 제품종류
  PRIMARY KEY ("GMO_SAFTY_NO")
);

-- -----------------------------------------------------------------------------
-- I1980 / 어류질병정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1980" (
  "DISS_NM" VARCHAR(500), -- DISS_NM / 질병명
  "DISS_CL_DVS_NM" VARCHAR(500), -- DISS_CL_DVS_NM / 질병분류구분명
  "ARA_DVS_NM" VARCHAR(500), -- ARA_DVS_NM / 지역구분명
  "FISHSPCS_NM" VARCHAR(500), -- FISHSPCS_NM / 어종명
  "SYMPTMS_CAUS_CN" VARCHAR(500), -- SYMPTMS_CAUS_CN / 증상원인내용
  "CURE_PREVNT_MESUR_CN" VARCHAR(500), -- CURE_PREVNT_MESUR_CN / 치료예방대책내용
  "DGNS_MTHD_CN" VARCHAR(500) -- DGNS_MTHD_CN / 진단방법내용
);

-- -----------------------------------------------------------------------------
-- I0460 / 수거검사 계획 및 실적 관련 현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0460" (
  "PRCSCITYPOINT_INDUTYCD_NM" VARCHAR(500), -- PRCSCITYPOINT_INDUTYCD_NM / 업종
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 소재지
  "PRDTNM" VARCHAR(500), -- PRDTNM / 제품명
  "TKAWYDTM" VARCHAR(500), -- TKAWYDTM / 수거일자
  "JDGMNT_CD_NM" VARCHAR(500), -- JDGMNT_CD_NM / 판정결과
  "EXC_INSTT_NM" VARCHAR(500), -- EXC_INSTT_NM / 수행기관명
  "TKAWYSPCI_TYPECD_NM" VARCHAR(500), -- TKAWYSPCI_TYPECD_NM / 검체구분
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  "TKAWYPRNO" VARCHAR(500), -- TKAWYPRNO / 수거증번호
  "PLAN_TITL" VARCHAR(500), -- PLAN_TITL / 수거계획명
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2410 / 물환경 수질정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2410" (
  "EXAM_ARA_NM" VARCHAR(500), -- EXAM_ARA_NM / 조사지역명
  "ABL_YN" VARCHAR(500), -- ABL_YN / 폐지여부
  "PRSEC_DT" VARCHAR(500), -- PRSEC_DT / 검사일자
  "WATSA_DT" VARCHAR(500), -- WATSA_DT / 채수일자
  "WATSA_TM" VARCHAR(500), -- WATSA_TM / 채수시간
  "MESURE_DP" VARCHAR(500), -- MESURE_DP / 측정깊이
  "TEMOD" VARCHAR(500), -- TEMOD / 수온
  "FLUX" VARCHAR(500), -- FLUX / 유량
  "PH" VARCHAR(500), -- PH / PH
  "BOD" VARCHAR(500), -- BOD / BOD
  "COD" VARCHAR(500), -- COD / COD
  "SS" VARCHAR(500), -- SS / SS
  "EEC_QTY" VARCHAR(500), -- EEC_QTY / 대장균군수량
  "TN" VARCHAR(500), -- TN / TN
  "TP" VARCHAR(500), -- TP / TP
  "DOC" VARCHAR(500), -- DOC / DOC
  "EC" VARCHAR(500), -- EC / EC
  "TOC" VARCHAR(500) -- TOC / TOC
);

-- -----------------------------------------------------------------------------
-- I1910 / 농약 등록정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1910" (
  "PRDLST_KOR_NM" VARCHAR(500), -- PRDLST_KOR_NM / 농약명
  "PRDLST_ENG_NM" VARCHAR(500), -- PRDLST_ENG_NM / 농약영문명
  "BRND_NM" VARCHAR(500), -- BRND_NM / 상표명
  "AGCHM_PRDLST_NO" VARCHAR(500), -- AGCHM_PRDLST_NO / 품목번호
  "PRDLST_REG_NO" VARCHAR(500), -- PRDLST_REG_NO / 등록번호 / PK 후보(LOW)
  "MDC_SHAP_NM" VARCHAR(500), -- MDC_SHAP_NM / 제제형태
  "AGCHM_DVS_NM" VARCHAR(500), -- AGCHM_DVS_NM / 농약구분
  "PRPOS_DVS_CD_NM" VARCHAR(500), -- PRPOS_DVS_CD_NM / 용도
  "SICKNS_HLSCT_NM_WEEDS_NM" VARCHAR(500), -- SICKNS_HLSCT_NM_WEEDS_NM / 병해충/잡초명
  "CROPS_NM" VARCHAR(500), -- CROPS_NM / 작물명
  "AGCHM_USE_MTHD" VARCHAR(500), -- AGCHM_USE_MTHD / 농약사용방법
  "USE_PPRTM" VARCHAR(500), -- USE_PPRTM / 사용적기
  "DILU_DRNG" VARCHAR(500), -- DILU_DRNG / 희석배수
  "USE_QTY" VARCHAR(500), -- USE_QTY / 사용수량
  "USE_UNIT" VARCHAR(500), -- USE_UNIT / 단위
  "USE_TMNO" VARCHAR(500), -- USE_TMNO / 사용횟수
  "BUSS_REG_NO" VARCHAR(500), -- BUSS_REG_NO / 업등록번호
  "BUSS_REG_EVNT_NM" VARCHAR(500), -- BUSS_REG_EVNT_NM / 업등록종목
  "CPR_NM" VARCHAR(500), -- CPR_NM / 법인명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "MNF_INCM_DVS_NM" VARCHAR(500), -- MNF_INCM_DVS_NM / 제조/수입구분
  "PRDLST_REG_VALD_DT" VARCHAR(500), -- PRDLST_REG_VALD_DT / 등록유효일자
  "PRDLST_REG_DT" VARCHAR(500), -- PRDLST_REG_DT / 등록일자
  "TEST_DRGS_NM" VARCHAR(500), -- TEST_DRGS_NM / 시험약제명
  "PRDLST_REG_STND" VARCHAR(500), -- PRDLST_REG_STND / 등록규격
  "REG_YN_NM" VARCHAR(500), -- REG_YN_NM / 등록여부
  "PERSN_LVSTCK_TOXCTY" VARCHAR(500), -- PERSN_LVSTCK_TOXCTY / 사람/가축독성
  "ECLGY_TOXCTY" VARCHAR(500), -- ECLGY_TOXCTY / 생태독성
  PRIMARY KEY ("PRDLST_REG_NO")
);

-- -----------------------------------------------------------------------------
-- I2839 / 건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2839" (
  "PLAN_CLCD" VARCHAR(500), -- PLAN_CLCD / 계획분류
  "CHCK_BGNDT" VARCHAR(500), -- CHCK_BGNDT / 계획시작일자
  "CHCK_ENDDT" VARCHAR(500), -- CHCK_ENDDT / 계획종료일자
  "EXC_INSTTCD" VARCHAR(500), -- EXC_INSTTCD / 점검기관
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "GIDCHCK_DT" VARCHAR(500), -- GIDCHCK_DT / 지도점검일자
  "BLDINSCTR_NAME" VARCHAR(500), -- BLDINSCTR_NAME / 피점검자성명
  "GIDCHCK_RSLTCD" VARCHAR(500), -- GIDCHCK_RSLTCD / 점검결과
  "PLAN_TITL" VARCHAR(500) -- PLAN_TITL / 계획명
);

-- -----------------------------------------------------------------------------
-- I0481 / 행정처분결과(식품판매업)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0481" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(500), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I0470.null(MEDIUM, 12.3%)
  "DSPS_DCSNDT" VARCHAR(500), -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" VARCHAR(500), -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" VARCHAR(500), -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(500), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(500), -- VILTCN / 위반일자 및 위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(500), -- DSPSCN / 처분내용
  "PUBLIC_DT" VARCHAR(500), -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" VARCHAR(500), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH) / FK 후보: I0470.null(MEDIUM, 12.3%)
  "DSPS_INSTTCD_NM" VARCHAR(500), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("DSPSDTLS_SEQ"),
  FOREIGN KEY ("LCNS_NO", "DSPSDTLS_SEQ") REFERENCES "I0470" ("LCNS_NO", "DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0480 / 행정처분결과(식품제조가공업)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0480" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(500), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I0470.null(MEDIUM, 18.8%)
  "DSPS_DCSNDT" VARCHAR(500), -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" VARCHAR(500), -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" VARCHAR(500), -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(500), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(500), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(500), -- DSPSCN / 처분내용
  "PUBLIC_DT" VARCHAR(500), -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" VARCHAR(500), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH) / FK 후보: I0470.null(MEDIUM, 18.8%)
  "DSPS_INSTTCD_NM" VARCHAR(500), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("DSPSDTLS_SEQ"),
  FOREIGN KEY ("LCNS_NO", "DSPSDTLS_SEQ") REFERENCES "I0470" ("LCNS_NO", "DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0482 / 행정처분결과(수입식품업)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0482" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(500), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / FK 후보: I0470.null(MEDIUM, 11.1%)
  "DSPS_DCSNDT" VARCHAR(500), -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" VARCHAR(500), -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" VARCHAR(500), -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(500), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(500), -- VILTCN / 위반일자 및 위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(500), -- DSPSCN / 처분내용
  "PUBLIC_DT" VARCHAR(500), -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" VARCHAR(500), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH) / FK 후보: I0470.null(MEDIUM, 11.1%)
  "DSPS_INSTTCD_NM" VARCHAR(500), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("DSPSDTLS_SEQ"),
  FOREIGN KEY ("LCNS_NO", "DSPSDTLS_SEQ") REFERENCES "I0470" ("LCNS_NO", "DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2630 / 행정처분결과(식품접객업)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2630" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(500), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(500), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호
  "DSPS_DCSNDT" VARCHAR(500), -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" VARCHAR(500), -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" VARCHAR(500), -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(500), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(500), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TEL_NO" VARCHAR(500), -- TEL_NO / 전화번호
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "DSPSCN" VARCHAR(500), -- DSPSCN / 처분내용
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 위반법령
  "PUBLIC_DT" VARCHAR(500), -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "DSPS_INSTTCD_NM" VARCHAR(500), -- DSPS_INSTTCD_NM / 처분기관명
  "DSPSDTLS_SEQ" VARCHAR(500), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  PRIMARY KEY ("DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2020 / 수산물 표시단속정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2020" (
  "ENTRPS_NM" VARCHAR(500), -- ENTRPS_NM / 업체명
  "BIZCND_DVS_NM" VARCHAR(500), -- BIZCND_DVS_NM / 업태
  "CTPRVN_NM" VARCHAR(500), -- CTPRVN_NM / 주소
  "VILT_ENTRPS_RELS_YN" VARCHAR(500), -- VILT_ENTRPS_RELS_YN / 위반업체해제여부
  "VILT_ENTRPS_RELS_DT" VARCHAR(500), -- VILT_ENTRPS_RELS_DT / 위반업체해제일자
  "DISCL_DTM" VARCHAR(500), -- DISCL_DTM / 단속일자
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 단속기관명
  "ORGNP_DVS_NM" VARCHAR(500), -- ORGNP_DVS_NM / 원산지구분
  "VILT_MATR_DVS_NM" VARCHAR(500), -- VILT_MATR_DVS_NM / 위반사항구분
  "MPRC_DVS_NM" VARCHAR(500) -- MPRC_DVS_NM / 수산물구분
);

-- -----------------------------------------------------------------------------
-- I2810 / 해외 위해식품 회수정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2810" (
  "TITL" VARCHAR(500), -- TITL / 제품명
  "DETECT_TITL" VARCHAR(500), -- DETECT_TITL / 유해물질
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 생성일자
  "BDT" VARCHAR(500), -- BDT / 본문내용
  "DOWNLOAD_URL" VARCHAR(500), -- DOWNLOAD_URL / 이미지 다운로드 URL
  "NTCTXT_NO" VARCHAR(500), -- NTCTXT_NO / 게시글번호 / PK 후보(HIGH)
  PRIMARY KEY ("NTCTXT_NO")
);

-- -----------------------------------------------------------------------------
-- I2715 / 해외직구 위해식품 차단정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2715" (
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  "MUFC_NM" VARCHAR(500), -- MUFC_NM / 제조사명
  "MUFC_CNTRY_NM" VARCHAR(500), -- MUFC_CNTRY_NM / 제조국가명
  "INGR_NM_LST" VARCHAR(500), -- INGR_NM_LST / 위해성분명
  "STT_YMD" VARCHAR(500), -- STT_YMD / 적용시작일
  "END_YMD" VARCHAR(500), -- END_YMD / 적용종료일
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 등록일
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일
  "IMAGE_URL" VARCHAR(500), -- IMAGE_URL / 이미지URL
  "SELF_IMPORT_SEQ" VARCHAR(500), -- SELF_IMPORT_SEQ / 일련번호(고유키값) / PK 후보(HIGH)
  "BARCD_CTN" VARCHAR(500), -- BARCD_CTN / 바코드번호
  PRIMARY KEY ("SELF_IMPORT_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2854 / 식품별 유해오염물질 검출량
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2854" (
  "SNT_GBN" VARCHAR(500), -- SNT_GBN / 구분
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 식품유형 / PK 후보(LOW)
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 식품명
  "ANALS_YEAR" VARCHAR(500), -- ANALS_YEAR / 분석연도
  "COL_A_RESULT" VARCHAR(500), -- COL_A_RESULT / 다이옥신
  "COL_B_RESULT" VARCHAR(500), -- COL_B_RESULT / PCBs
  "COL_C_RESULT" VARCHAR(500), -- COL_C_RESULT / 벤조피렌
  "COL_D_RESULT" VARCHAR(500), -- COL_D_RESULT / 3-MCPD
  "COL_E_RESULT" VARCHAR(500), -- COL_E_RESULT / 총 아플라톡신
  "COL_F_RESULT" VARCHAR(500), -- COL_F_RESULT / 아플라톡신B1
  "COL_G_RESULT" VARCHAR(500), -- COL_G_RESULT / 오크라톡신
  "COL_H_RESULT" VARCHAR(500), -- COL_H_RESULT / 푸모니신
  "COL_I_RESULT" VARCHAR(500), -- COL_I_RESULT / 제랄레논
  "COL_J_RESULT" VARCHAR(500), -- COL_J_RESULT / 데옥시니발레놀
  "COL_K_RESULT" VARCHAR(500), -- COL_K_RESULT / 파튤린
  "COL_L_RESULT" VARCHAR(500), -- COL_L_RESULT / 아플라톡신M1
  "COL_M_RESULT" VARCHAR(500), -- COL_M_RESULT / 납
  "COL_N_RESULT" VARCHAR(500), -- COL_N_RESULT / 카드뮴
  "COL_O_RESULT" VARCHAR(500), -- COL_O_RESULT / 비소
  "COL_P_RESULT" VARCHAR(500), -- COL_P_RESULT / 무기비소
  "COL_Q_RESULT" VARCHAR(500), -- COL_Q_RESULT / 수은
  "COL_R_RESULT" VARCHAR(500), -- COL_R_RESULT / 메틸수은
  "COL_S_RESULT" VARCHAR(500), -- COL_S_RESULT / 주석
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 생성일자
  PRIMARY KEY ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I2848 / 식중독 지역별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2848" (
  "OCCRNC_YEAR" VARCHAR(500), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" VARCHAR(500), -- OCCRNC_MM / 발생월
  "OCCRNC_AREA" VARCHAR(500), -- OCCRNC_AREA / 발생지역
  "OCCRNC_CNT" VARCHAR(500), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" VARCHAR(500) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I2849 / 식중독 원인시설별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2849" (
  "OCCRNC_YEAR" VARCHAR(500), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" VARCHAR(500), -- OCCRNC_MM / 발생월
  "OCCRNC_PLC" VARCHAR(500), -- OCCRNC_PLC / 발생장소
  "OCCRNC_CNT" VARCHAR(500), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" VARCHAR(500) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I2850 / 식중독 원인물질별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2850" (
  "OCCRNC_YEAR" VARCHAR(500), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" VARCHAR(500), -- OCCRNC_MM / 발생월
  "OCCRNC_VIRS" VARCHAR(500), -- OCCRNC_VIRS / 발생물질
  "OCCRNC_CNT" VARCHAR(500), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" VARCHAR(500) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I1860 / 농축산물유통관리 허위표시품목정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1860" (
  "BSN_KND_NM" VARCHAR(500), -- BSN_KND_NM / 업종
  "ENTRPS_NM" VARCHAR(500), -- ENTRPS_NM / 업소명
  "ENTRPS_BASS_ADDR" VARCHAR(500), -- ENTRPS_BASS_ADDR / 주소
  "VILT_DTLS" VARCHAR(500), -- VILT_DTLS / 위반내역
  "PUBLC_BGN_DT" VARCHAR(500), -- PUBLC_BGN_DT / 공표시작일자
  "PUBLC_END_DT" VARCHAR(500), -- PUBLC_END_DT / 공표종료일자
  "VILT_CN" VARCHAR(500), -- VILT_CN / 위반내용
  "DSPS_CN" VARCHAR(500), -- DSPS_CN / 처분내용
  "PRDLST_NM" VARCHAR(500) -- PRDLST_NM / 품목명
);

-- -----------------------------------------------------------------------------
-- I1850 / 농축산물유통관리 허위표시공표정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1850" (
  "BSN_KND_NM" VARCHAR(500), -- BSN_KND_NM / 업종
  "ENTRPS_NM" VARCHAR(500), -- ENTRPS_NM / 업체명
  "ENTRPS_BASS_ADDR" VARCHAR(500), -- ENTRPS_BASS_ADDR / 주소
  "VILT_DTLS" VARCHAR(500), -- VILT_DTLS / 위반내역
  "PUBLC_BGN_DT" VARCHAR(500), -- PUBLC_BGN_DT / 공표시작일
  "PUBLC_END_DT" VARCHAR(500) -- PUBLC_END_DT / 공표종료일
);

-- -----------------------------------------------------------------------------
-- I2620 / 검사부적합(국내)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2620" (
  "PRDTNM" VARCHAR(500), -- PRDTNM / 제품명
  "BSSHNM" VARCHAR(500), -- BSSHNM / 업소명
  "MNFDT" VARCHAR(500), -- MNFDT / 제조일자
  "DISTBTMLMT" VARCHAR(500), -- DISTBTMLMT / 유통/소비기한
  "ADDR" VARCHAR(500), -- ADDR / 영업자주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 검사기관
  "REGSTR_TELNO" VARCHAR(500), -- REGSTR_TELNO / 전화번호
  "BRCDNO" VARCHAR(500), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(500), -- FRMLCUNIT / 포장단위
  "TEST_ITMNM" VARCHAR(500), -- TEST_ITMNM / 부적합항목
  "STDR_STND" VARCHAR(500), -- STDR_STND / 기준규격
  "TESTANALS_RSLT" VARCHAR(500), -- TESTANALS_RSLT / 검사결과
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" VARCHAR(500), -- RTRVLDSUSE_SEQ / 회수폐기일련번호 / PK 후보(HIGH) / FK 후보: I0490.RTRVLDSUSE_SEQ(HIGH, 12.9%)
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목제조보고번호
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 업체인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 3.5%)
  "REPORTR_TELNO" VARCHAR(500), -- REPORTR_TELNO / 보고자전화번호
  "PRDLST_CD_NM" VARCHAR(500), -- PRDLST_CD_NM / 식품유형
  PRIMARY KEY ("RTRVLDSUSE_SEQ"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("RTRVLDSUSE_SEQ") REFERENCES "I0490" ("RTRVLDSUSE_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2640 / 검사부적합 현황(농산물)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2640" (
  "PRDTNM" VARCHAR(500), -- PRDTNM / 제품명
  "BSSHNM" VARCHAR(500), -- BSSHNM / 업소명
  "MNFDT" VARCHAR(500), -- MNFDT / 제조일자
  "DISTBTMLMT" VARCHAR(500), -- DISTBTMLMT / 유통/소비기한
  "ADDR" VARCHAR(500), -- ADDR / 영업자주소
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 검사기관
  "REGSTR_TELNO" VARCHAR(500), -- REGSTR_TELNO / 전화번호
  "BRCDNO" VARCHAR(500), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(500), -- FRMLCUNIT / 포장단위
  "TEST_ITMNM" VARCHAR(500), -- TEST_ITMNM / 부적합항목
  "STDR_STND" VARCHAR(500), -- STDR_STND / 기준규격
  "TESTANALS_RSLT" VARCHAR(500), -- TESTANALS_RSLT / 검사결과
  "CRET_DTM" VARCHAR(500), -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" VARCHAR(500), -- RTRVLDSUSE_SEQ / 회수폐기일련번호 / PK 후보(HIGH) / FK 후보: I0490.RTRVLDSUSE_SEQ(HIGH, 5.2%)
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 업체인허가번호
  "REPORTR_TELNO" VARCHAR(500), -- REPORTR_TELNO / 보고자전화번호
  PRIMARY KEY ("RTRVLDSUSE_SEQ"),
  FOREIGN KEY ("RTRVLDSUSE_SEQ") REFERENCES "I0490" ("RTRVLDSUSE_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0900 / 축산물위생검사기관 지정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0900" (
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 검사기관명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APPN_BGN_DT" VARCHAR(500), -- APPN_BGN_DT / 지정시작일자
  "APPN_END_DT" VARCHAR(500), -- APPN_END_DT / 지정종료일자
  "WORK_SCOPE" VARCHAR(500) -- WORK_SCOPE / 업무범위
);

-- -----------------------------------------------------------------------------
-- I0890 / 식품위생검사기관 지정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0890" (
  "PRSEC_INSTT_RCOGN_NO" VARCHAR(500), -- PRSEC_INSTT_RCOGN_NO / 지정번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 기관명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "APPN_BGN_DT" VARCHAR(500), -- APPN_BGN_DT / 지정일자
  "APPN_END_DT" VARCHAR(500), -- APPN_END_DT / 지정종료일자
  "WORK_SCOPE" VARCHAR(500), -- WORK_SCOPE / 업무범위
  PRIMARY KEY ("PRSEC_INSTT_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I0920 / 식품검사기관별 시험항목정보조회
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0920" (
  "REALM_NM" VARCHAR(500), -- REALM_NM / 분야
  "CMPTNC_INSTT_NM" VARCHAR(500), -- CMPTNC_INSTT_NM / 관할기관
  "INSTT_NM" VARCHAR(500), -- INSTT_NM / 검사기관
  "ADDR" VARCHAR(500), -- ADDR / 소재지
  "MSK_TELNO" VARCHAR(500), -- MSK_TELNO / 전화번호
  "TESTITM_LCLAS_NM" VARCHAR(500), -- TESTITM_LCLAS_NM / 대분류
  "TESTITM_MLSFC_NM" VARCHAR(500), -- TESTITM_MLSFC_NM / 중분류
  "TESTITM_NM" VARCHAR(500), -- TESTITM_NM / 시험항목명
  "RM" VARCHAR(500), -- RM / 비고
  "CHNG_DT" VARCHAR(500) -- CHNG_DT / 변경일자(YYYYMMDD)
);

-- -----------------------------------------------------------------------------
-- I0910 / 국외검사기관 인정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0910" (
  "PRSEC_INSTT_RCOGN_NO" VARCHAR(500), -- PRSEC_INSTT_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 기관명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "APPN_BGN_DT" VARCHAR(500), -- APPN_BGN_DT / 지정일자
  "PRSEC_ITM_CD_NM" VARCHAR(500), -- PRSEC_ITM_CD_NM / 검사항목
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "BSSH_ADDR" VARCHAR(500), -- BSSH_ADDR / 주소
  PRIMARY KEY ("PRSEC_INSTT_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1870 / 농산물 안전성검사기관 정보
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1870" (
  "APPN_NO" VARCHAR(500), -- APPN_NO / 지정번호 / PK 후보(HIGH)
  "APPN_DT" VARCHAR(500), -- APPN_DT / 지정일자
  "APPN_INSTT_NM" VARCHAR(500), -- APPN_INSTT_NM / 지정기관
  "PRSEC_INSTT_LOCPLC" VARCHAR(500), -- PRSEC_INSTT_LOCPLC / 검사기관소재지
  "PRSEC_WORK_SCOPE" VARCHAR(500), -- PRSEC_WORK_SCOPE / 검사업무범위
  "HRMF_MTTR_ITM" VARCHAR(500), -- HRMF_MTTR_ITM / 유해물질항목
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  PRIMARY KEY ("APPN_NO")
);

-- -----------------------------------------------------------------------------
-- I2380 / 하수도 수질정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2380" (
  "FCLTY_NM" VARCHAR(500), -- FCLTY_NM / 시설명
  "CTPRVN_NM" VARCHAR(500), -- CTPRVN_NM / 시도명
  "SIGNGU_NM" VARCHAR(500), -- SIGNGU_NM / 시군구명
  "ZIPNO" VARCHAR(500), -- ZIPNO / 우편번호
  "BASS_ADDR" VARCHAR(500), -- BASS_ADDR / 기본주소
  "DTL_ADDR" VARCHAR(500), -- DTL_ADDR / 상세주소
  "ROADNM_BASS_ADDR" VARCHAR(500), -- ROADNM_BASS_ADDR / 도로명기본주소
  "ROADNM_DTL_ADDR" VARCHAR(500), -- ROADNM_DTL_ADDR / 도로명상세주소
  "MESURE_DT" VARCHAR(500), -- MESURE_DT / 측정일자
  "FCLTY_CD" VARCHAR(500), -- FCLTY_CD / 시설코드
  "PAPRONSLF_NM" VARCHAR(500), -- PAPRONSLF_NM / 지자체명
  "RIVR_NM" VARCHAR(500), -- RIVR_NM / 하천명
  "BASE_FCLTY_DVS_NM" VARCHAR(500), -- BASE_FCLTY_DVS_NM / 기초시설구분명
  "BOD" VARCHAR(500), -- BOD / BOD
  "COD" VARCHAR(500), -- COD / COD
  "SS" VARCHAR(500), -- SS / SS
  "TP" VARCHAR(500), -- TP / TP
  "TN" VARCHAR(500), -- TN / TN
  "EEC_QTY" VARCHAR(500), -- EEC_QTY / 대장균군수량
  "TEMOD" VARCHAR(500), -- TEMOD / 수온
  "ECLGY_TOXCTY" VARCHAR(500) -- ECLGY_TOXCTY / 상태독성
);

-- -----------------------------------------------------------------------------
-- I2390 / 토양지하수 토양실태조사정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2390" (
  "SOIL_SEQ" VARCHAR(500), -- SOIL_SEQ / 토양 일련번호 / PK 후보(HIGH)
  "EXAM_YR" VARCHAR(500), -- EXAM_YR / 조사 년도
  "CHARTR_CL_NM" VARCHAR(500), -- CHARTR_CL_NM / 특성 분류 명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "LNDCGR_NM" VARCHAR(500), -- LNDCGR_NM / 지목 명
  "AREA" VARCHAR(500), -- AREA / 면적
  "CDMM" VARCHAR(500), -- CDMM / 카드뮴
  "COPPR" VARCHAR(500), -- COPPR / 구리
  "AS_" VARCHAR(500), -- AS_ / 비소
  "MRC" VARCHAR(500), -- MRC / 수은
  "PB" VARCHAR(500), -- PB / 납
  "CR6" VARCHAR(500), -- CR6 / 6가크롬
  "ZINC" VARCHAR(500), -- ZINC / 아연
  "NICKEL" VARCHAR(500), -- NICKEL / 니켈
  "IMCOW" VARCHAR(500), -- IMCOW / 불소
  "ORGNICPH" VARCHAR(500), -- ORGNICPH / 유기인
  "PCT" VARCHAR(500), -- PCT / 폴리클로리네이트페닐
  "CYN" VARCHAR(500), -- CYN / 시안
  "PHNL" VARCHAR(500), -- PHNL / 페놀
  "BENZ" VARCHAR(500), -- BENZ / 벤젠
  "TOLUE" VARCHAR(500), -- TOLUE / 톨루엔
  "ETBEN" VARCHAR(500), -- ETBEN / 에틸벤젠
  "XYLEN" VARCHAR(500), -- XYLEN / 크실렌
  "TPH" VARCHAR(500), -- TPH / 석유계총탄화수소
  "TCE" VARCHAR(500), -- TCE / 트리클로로에틸렌
  "PCE" VARCHAR(500), -- PCE / 테트라클로로에틸렌
  "HYDRIONDNSTY" VARCHAR(500), -- HYDRIONDNSTY / 수소이온농도
  "RM" VARCHAR(500), -- RM / 비고
  PRIMARY KEY ("SOIL_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2400 / 지하수수질측정망 측정결과
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2400" (
  "YR" VARCHAR(500), -- YR / 년도
  "QU" VARCHAR(500), -- QU / 분기
  "SPOT_NO" VARCHAR(500), -- SPOT_NO / 지점 번호 / PK 후보(LOW)
  "SIGNGU_NM" VARCHAR(500), -- SIGNGU_NM / 시군구
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "PRPOS_NM" VARCHAR(500), -- PRPOS_NM / 용도
  "DKPS_YN_NM" VARCHAR(500), -- DKPS_YN_NM / 음용 여부
  "HYDRIONDNSTY" VARCHAR(500), -- HYDRIONDNSTY / 수소이온농도
  "TOTEEC" VARCHAR(500), -- TOTEEC / 총대장균군
  "NO3N" VARCHAR(500), -- NO3N / 질산성질소
  "CI" VARCHAR(500), -- CI / 염소이온
  "CDMM" VARCHAR(500), -- CDMM / 카드뮴
  "AS_" VARCHAR(500), -- AS_ / 비소
  "CYN" VARCHAR(500), -- CYN / 시안
  "MRC" VARCHAR(500), -- MRC / 수은
  "ORGNICPH" VARCHAR(500), -- ORGNICPH / 유기인
  "PHNL" VARCHAR(500), -- PHNL / 페놀
  "PB" VARCHAR(500), -- PB / 납
  "CR6" VARCHAR(500), -- CR6 / 6가크롬
  "TCE" VARCHAR(500), -- TCE / 트리클로로에틸렌
  "PCE" VARCHAR(500), -- PCE / 테트라클로로에틸렌
  "TCE111" VARCHAR(500), -- TCE111 / 111트리클로로에탄
  "BENZ" VARCHAR(500), -- BENZ / 벤젠
  "TOLUE" VARCHAR(500), -- TOLUE / 톨루엔
  "ETBEN" VARCHAR(500), -- ETBEN / 에틸벤젠
  "XYLEN" VARCHAR(500), -- XYLEN / 크실렌
  "EC" VARCHAR(500), -- EC / 전기전도도
  "ARA_YN" VARCHAR(500), -- ARA_YN / 오염지역 여부
  "ARA" VARCHAR(500), -- ARA / 오염구분
  PRIMARY KEY ("SPOT_NO")
);

-- -----------------------------------------------------------------------------
-- I2381 / 상수도 수질정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2381" (
  "FCLTY_NM" VARCHAR(500), -- FCLTY_NM / 시설명
  "FCLTY_LOC" VARCHAR(500), -- FCLTY_LOC / 시설위치
  "PRSEC_YR" VARCHAR(500), -- PRSEC_YR / 검사년도
  "PRSEC_MM" VARCHAR(500), -- PRSEC_MM / 검사월
  "PICK_DT" VARCHAR(500), -- PICK_DT / 채취일자
  "PRSEC_ITM_NM" VARCHAR(500), -- PRSEC_ITM_NM / 검사항목명
  "MESURE_VAL" VARCHAR(500), -- MESURE_VAL / 측정값
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  "DCMLPOINT" VARCHAR(500), -- DCMLPOINT / 소수점
  "EXCS_YN" VARCHAR(500) -- EXCS_YN / 초과여부
);

-- -----------------------------------------------------------------------------
-- COOKRCP01 / 조리식품의 레시피 DB
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "COOKRCP01" (
  "RCP_SEQ" VARCHAR(500), -- RCP_SEQ / 일련번호 / PK 후보(HIGH)
  "RCP_NM" VARCHAR(500), -- RCP_NM / 메뉴명
  "RCP_WAY2" VARCHAR(500), -- RCP_WAY2 / 조리방법
  "RCP_PAT2" VARCHAR(500), -- RCP_PAT2 / 요리종류
  "INFO_WGT" VARCHAR(500), -- INFO_WGT / 중량(1인분)
  "INFO_ENG" VARCHAR(500), -- INFO_ENG / 열량
  "INFO_CAR" VARCHAR(500), -- INFO_CAR / 탄수화물
  "INFO_PRO" VARCHAR(500), -- INFO_PRO / 단백질
  "INFO_FAT" VARCHAR(500), -- INFO_FAT / 지방
  "INFO_NA" VARCHAR(500), -- INFO_NA / 나트륨
  "HASH_TAG" VARCHAR(500), -- HASH_TAG / 해쉬태그
  "ATT_FILE_NO_MAIN" VARCHAR(500), -- ATT_FILE_NO_MAIN / 이미지경로(소)
  "ATT_FILE_NO_MK" VARCHAR(500), -- ATT_FILE_NO_MK / 이미지경로(대)
  "RCP_PARTS_DTLS" VARCHAR(500), -- RCP_PARTS_DTLS / 재료정보
  "MANUAL01" VARCHAR(500), -- MANUAL01 / 만드는법_01
  "MANUAL_IMG01" VARCHAR(500), -- MANUAL_IMG01 / 만드는법_이미지_01
  "MANUAL02" VARCHAR(500), -- MANUAL02 / 만드는법_02
  "MANUAL_IMG02" VARCHAR(500), -- MANUAL_IMG02 / 만드는법_이미지_02
  "MANUAL03" VARCHAR(500), -- MANUAL03 / 만드는법_03
  "MANUAL_IMG03" VARCHAR(500), -- MANUAL_IMG03 / 만드는법_이미지_03
  "MANUAL04" VARCHAR(500), -- MANUAL04 / 만드는법_04
  "MANUAL_IMG04" VARCHAR(500), -- MANUAL_IMG04 / 만드는법_이미지_04
  "MANUAL05" VARCHAR(500), -- MANUAL05 / 만드는법_05
  "MANUAL_IMG05" VARCHAR(500), -- MANUAL_IMG05 / 만드는법_이미지_05
  "MANUAL06" VARCHAR(500), -- MANUAL06 / 만드는법_06
  "MANUAL_IMG06" VARCHAR(500), -- MANUAL_IMG06 / 만드는법_이미지_06
  "MANUAL07" VARCHAR(500), -- MANUAL07 / 만드는법_07
  "MANUAL_IMG07" VARCHAR(500), -- MANUAL_IMG07 / 만드는법_이미지_07
  "MANUAL08" VARCHAR(500), -- MANUAL08 / 만드는법_08
  "MANUAL_IMG08" VARCHAR(500), -- MANUAL_IMG08 / 만드는법_이미지_08
  "MANUAL09" VARCHAR(500), -- MANUAL09 / 만드는법_09
  "MANUAL_IMG09" VARCHAR(500), -- MANUAL_IMG09 / 만드는법_이미지_09
  "MANUAL10" VARCHAR(500), -- MANUAL10 / 만드는법_10
  "MANUAL_IMG10" VARCHAR(500), -- MANUAL_IMG10 / 만드는법_이미지_10
  "MANUAL11" VARCHAR(500), -- MANUAL11 / 만드는법_11
  "MANUAL_IMG11" VARCHAR(500), -- MANUAL_IMG11 / 만드는법_이미지_11
  "MANUAL12" VARCHAR(500), -- MANUAL12 / 만드는법_12
  "MANUAL_IMG12" VARCHAR(500), -- MANUAL_IMG12 / 만드는법_이미지_12
  "MANUAL13" VARCHAR(500), -- MANUAL13 / 만드는법_13
  "MANUAL_IMG13" VARCHAR(500), -- MANUAL_IMG13 / 만드는법_이미지_13
  "MANUAL14" VARCHAR(500), -- MANUAL14 / 만드는법_14
  "MANUAL_IMG14" VARCHAR(500), -- MANUAL_IMG14 / 만드는법_이미지_14
  "MANUAL15" VARCHAR(500), -- MANUAL15 / 만드는법_15
  "MANUAL_IMG15" VARCHAR(500), -- MANUAL_IMG15 / 만드는법_이미지_15
  "MANUAL16" VARCHAR(500), -- MANUAL16 / 만드는법_16
  "MANUAL_IMG16" VARCHAR(500), -- MANUAL_IMG16 / 만드는법_이미지_16
  "MANUAL17" VARCHAR(500), -- MANUAL17 / 만드는법_17
  "MANUAL_IMG17" VARCHAR(500), -- MANUAL_IMG17 / 만드는법_이미지_17
  "MANUAL18" VARCHAR(500), -- MANUAL18 / 만드는법_18
  "MANUAL_IMG18" VARCHAR(500), -- MANUAL_IMG18 / 만드는법_이미지_18
  "MANUAL19" VARCHAR(500), -- MANUAL19 / 만드는법_19
  "MANUAL_IMG19" VARCHAR(500), -- MANUAL_IMG19 / 만드는법_이미지_19
  "MANUAL20" VARCHAR(500), -- MANUAL20 / 만드는법_20
  "MANUAL_IMG20" VARCHAR(500), -- MANUAL_IMG20 / 만드는법_이미지_20
  "RCP_NA_TIP" VARCHAR(500), -- RCP_NA_TIP / 저감 조리법 TIP
  PRIMARY KEY ("RCP_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0760 / 건강기능식품 영양DB
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0760" (
  "HELT_ITM_GRP_CD" VARCHAR(500), -- HELT_ITM_GRP_CD / 건강 항목 그룹 코드 / PK 후보(HIGH)
  "HELT_ITM_GRP_NM" VARCHAR(500), -- HELT_ITM_GRP_NM / 건강 항목 그룹 명
  "LCLAS_CD" VARCHAR(500), -- LCLAS_CD / 대분류 코드
  "LCLAS_NM" VARCHAR(500), -- LCLAS_NM / 대분류 명
  "MLSFC_CD" VARCHAR(500), -- MLSFC_CD / 중분류 코드
  "MLSFC_NM" VARCHAR(500), -- MLSFC_NM / 중분류 명
  "SCLAS_CD" VARCHAR(500), -- SCLAS_CD / 소분류 코드
  "SCLAS_NM" VARCHAR(500), -- SCLAS_NM / 소분류 명
  PRIMARY KEY ("HELT_ITM_GRP_CD")
);

-- -----------------------------------------------------------------------------
-- I2560 / 영업소재지 GIS 코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2560" (
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I2500.LCNS_NO(HIGH, 99.8%)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "LOCPLC" VARCHAR(500), -- LOCPLC / 소재지
  "SAN" VARCHAR(500), -- SAN / 산
  "LNBR" VARCHAR(500), -- LNBR / 번지
  "ISSNO" VARCHAR(500), -- ISSNO / 호
  "TONG" VARCHAR(500), -- TONG / 통
  "BAN" VARCHAR(500), -- BAN / 반
  "SPCLADDR" VARCHAR(500), -- SPCLADDR / 특수주소
  "SPCPPDONG" VARCHAR(500), -- SPCPPDONG / 특수지동
  "SPCPPISSNO" VARCHAR(500), -- SPCPPISSNO / 특수지호
  "ROADNMSIGNGUCD" VARCHAR(500), -- ROADNMSIGNGUCD / 도로명시군구코드
  "ROADNMADDREMDDVS" VARCHAR(500), -- ROADNMADDREMDDVS / 도로명주소읍면동구분
  "ROADNMADDREMDCD" VARCHAR(500), -- ROADNMADDREMDCD / 도로명주소읍면동코드
  "ROADNMADDRBDFLRDVS" VARCHAR(500), -- ROADNMADDRBDFLRDVS / 도로명주소건물층구분
  "ROADNMADDRBDORIGNO" VARCHAR(500), -- ROADNMADDRBDORIGNO / 도로명주소건물본번호
  "ROADNMADDRBDSUBNO" VARCHAR(500), -- ROADNMADDRBDSUBNO / 도로명주소건물부번호
  "ROADNMADDRSPCLADDR" VARCHAR(500), -- ROADNMADDRSPCLADDR / 도로명주소특수주소
  "PNU_CD" VARCHAR(500), -- PNU_CD / PNU코드
  "BDMERGEMANAGENO" VARCHAR(500), -- BDMERGEMANAGENO / 건물통합관리번호
  "UFID_CD" VARCHAR(500), -- UFID_CD / UFID코드
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2570 / 유통바코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2570" (
  "BRCD_NO" VARCHAR(500), -- BRCD_NO / 바코드번호 / PK 후보(HIGH)
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목보고번호
  "CMPNY_NM" VARCHAR(500), -- CMPNY_NM / 회사명
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목분류_소분류
  "HRNK_PRDLST_NM" VARCHAR(500), -- HRNK_PRDLST_NM / 품목분류_중분류
  "HTRK_PRDLST_NM" VARCHAR(500), -- HTRK_PRDLST_NM / 품목분류_대분류
  PRIMARY KEY ("BRCD_NO")
);

-- -----------------------------------------------------------------------------
-- I0930 / 식품공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0930" (
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 품목명
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 품목항목속성
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 규격값요약
  "JDGMNT_FNPRT_CD_NM" VARCHAR(500), -- JDGMNT_FNPRT_CD_NM / 판정형식
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MXMM_VAL_FNPRT_CD_NM" VARCHAR(500), -- MXMM_VAL_FNPRT_CD_NM / 이하/미만
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "MIMM_VAL_FNPRT_CD_NM" VARCHAR(500), -- MIMM_VAL_FNPRT_CD_NM / 이상/초과
  "CHOIC_FIT_FNPRT_CD_NM" VARCHAR(500), -- CHOIC_FIT_FNPRT_CD_NM / 세부적합
  "CHOIC_IMPROPT_FNPRT_CD_NM" VARCHAR(500), -- CHOIC_IMPROPT_FNPRT_CD_NM / 부적합
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500) -- UNIT_NM / 단위명
);

-- -----------------------------------------------------------------------------
-- I2520 / 식품원재료코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2520" (
  "RAWMTRL_CD" VARCHAR(500), -- RAWMTRL_CD / 원재료코드 / PK 후보(HIGH)
  "RAWMTRL_LCLAS_NM" VARCHAR(500), -- RAWMTRL_LCLAS_NM / 대분류
  "RAWMTRL_MLSFC_NM" VARCHAR(500), -- RAWMTRL_MLSFC_NM / 중분류
  "RPRSNT_RAWMTRL_NM" VARCHAR(500), -- RPRSNT_RAWMTRL_NM / 원재료명
  "RAWMTRL_NCKNM" VARCHAR(500), -- RAWMTRL_NCKNM / 원재료이명
  "ENG_NM" VARCHAR(500), -- ENG_NM / 영문명
  "SCNM" VARCHAR(500), -- SCNM / 학명
  "REGN_CD" VARCHAR(500), -- REGN_CD / 부위코드
  "REGN_CD_NM" VARCHAR(500), -- REGN_CD_NM / 부위코드명
  "PRCSS_PROCS_CD" VARCHAR(500), -- PRCSS_PROCS_CD / 가공공정코드
  "PRCSS_PROCS_CD_NM" VARCHAR(500), -- PRCSS_PROCS_CD_NM / 가공공정코드명
  "RAWMTRL_STATS_CD" VARCHAR(500), -- RAWMTRL_STATS_CD / 원재료코드
  "RAWMTRL_STATS_CD_NM" VARCHAR(500), -- RAWMTRL_STATS_CD_NM / 원재료코드명
  "VALD_BGN_DT" VARCHAR(500), -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("RAWMTRL_CD")
);

-- -----------------------------------------------------------------------------
-- I2540 / 법령코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2540" (
  "FOOD_LAWORD_CD" VARCHAR(500), -- FOOD_LAWORD_CD / 법령코드 / PK 후보(HIGH)
  "HRNK_LAWORD_CD" VARCHAR(500), -- HRNK_LAWORD_CD / 상위법령코드
  "WORK_REALM_CD_NM" VARCHAR(500), -- WORK_REALM_CD_NM / 업무분야
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 법령명
  "ALL_LAWORD_CD_NM" VARCHAR(500), -- ALL_LAWORD_CD_NM / 전체법령명
  "LV_NO" VARCHAR(500), -- LV_NO / 레벨
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "VALD_BGN_DT" VARCHAR(500), -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("FOOD_LAWORD_CD")
);

-- -----------------------------------------------------------------------------
-- C005 / 바코드연계제품정보
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C005" (
  "PRDLST_REPORT_NO" VARCHAR(500), -- PRDLST_REPORT_NO / 품목보고(신고)번호 / PK 후보(HIGH)
  "PRMS_DT" VARCHAR(500), -- PRMS_DT / 보고(신고일)
  "END_DT" VARCHAR(500), -- END_DT / 생산중단일
  "PRDLST_NM" VARCHAR(500), -- PRDLST_NM / 제품명
  "POG_DAYCNT" VARCHAR(500), -- POG_DAYCNT / 소비기한
  "PRDLST_DCNM" VARCHAR(500), -- PRDLST_DCNM / 식품 유형
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 제조사명
  "INDUTY_NM" VARCHAR(500), -- INDUTY_NM / 업종
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CLSBIZ_DT" VARCHAR(500), -- CLSBIZ_DT / 폐업일자
  "BAR_CD" VARCHAR(500), -- BAR_CD / 유통바코드
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1090 / 잔류동물의약품 식품별 잔류허용 기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1090" (
  "FOOD_KOR_NM" VARCHAR(500), -- FOOD_KOR_NM / 식품한글명
  "FOOD_ENG_NM" VARCHAR(500), -- FOOD_ENG_NM / 식품영문명
  "DEDE_NTK_QTY" VARCHAR(500), -- DEDE_NTK_QTY / 일일섭취량
  "TMPR_STDR_APPLC_YN" VARCHAR(500), -- TMPR_STDR_APPLC_YN / 잠정기준적용여부
  "LCLAS_NM" VARCHAR(500), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(500), -- MLSFC_NM / 중분류
  "SCLAS_NM" VARCHAR(500) -- SCLAS_NM / 소분류
);

-- -----------------------------------------------------------------------------
-- I1650 / 신고대상분류기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1650" (
  "CMMN_CD_NM" VARCHAR(500), -- CMMN_CD_NM / 분류
  "FNPRT_CD_NM" VARCHAR(500), -- FNPRT_CD_NM / 신고분류
  "USER_DFN_CLMN_1" VARCHAR(500), -- USER_DFN_CLMN_1 / 분류1
  "USER_DFN_CLMN_2" VARCHAR(500) -- USER_DFN_CLMN_2 / 분류2
);

-- -----------------------------------------------------------------------------
-- I1000 / 식품첨가물의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1000" (
  "LIMIT_STDR_STND_RCOGN_NO" VARCHAR(500), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" VARCHAR(500), -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "MC_NM" VARCHAR(500), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1101 / 식품첨가물의 기준 및 규격 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1101" (
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목분류코드 / PK 후보(LOW)
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(500), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 수정일자
  PRIMARY KEY ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I1020 / 식품원재료(식물,동물,미생물,수산물) 정보
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1020" (
  "LCLAS_NM" VARCHAR(500), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(500), -- MLSFC_NM / 중분류
  "RPRSNT_RAWMTRL_NM" VARCHAR(500), -- RPRSNT_RAWMTRL_NM / 원재료명
  "RAWMTRL_NCKNM" VARCHAR(500), -- RAWMTRL_NCKNM / 이명
  "ENG_NM" VARCHAR(500), -- ENG_NM / 영문명
  "SCNM" VARCHAR(500), -- SCNM / 학명
  "REGN_CD_NM" VARCHAR(500), -- REGN_CD_NM / 부위명
  "RAWMTRL_STATS_CD_NM" VARCHAR(500), -- RAWMTRL_STATS_CD_NM / 상태명
  "USE_CND_NM" VARCHAR(500), -- USE_CND_NM / 사용조건
  "USE_CND_STDR_CN" VARCHAR(500) -- USE_CND_STDR_CN / 사용조건기준내용
);

-- -----------------------------------------------------------------------------
-- I0950 / 식품첨가물공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0950" (
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / PK 후보(LOW) / FK 후보: I2530.TESTITM_CD(HIGH, 50.0%)
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  PRIMARY KEY ("TESTITM_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I0980 / 식품원료의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0980" (
  "LIMIT_STDR_STND_RCOGN_NO" VARCHAR(500), -- LIMIT_STDR_STND_RCOGN_NO / 한시적 기준 규격 인정 번호 / PK 후보(MEDIUM)
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "BSSH_ADDR" VARCHAR(500), -- BSSH_ADDR / 주소
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자
  "RCOGN_DT" VARCHAR(500), -- RCOGN_DT / 인정일자
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  "RAWMTRL_NM" VARCHAR(500), -- RAWMTRL_NM / 원재료명
  "PRPOS" VARCHAR(500), -- PRPOS / 용도
  "USED" VARCHAR(500), -- USED / 사용량
  "USING_UNIT" VARCHAR(500), -- USING_UNIT / 사용량단위
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1050 / 식품별 농약잔류허용기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1050" (
  "FOOD_KOR_NM" VARCHAR(500), -- FOOD_KOR_NM / 식품한글명
  "FOOD_ENG_NM" VARCHAR(500), -- FOOD_ENG_NM / 식품영문명
  "AGCHM_KOR_NM" VARCHAR(500), -- AGCHM_KOR_NM / 농약명
  "DEDE_NTK_QTY" VARCHAR(500), -- DEDE_NTK_QTY / 일일섭취량
  "TMPR_STDR_APPLC_YN" VARCHAR(500), -- TMPR_STDR_APPLC_YN / 잠정기준적용여부
  "LCLAS_NM" VARCHAR(500), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(500), -- MLSFC_NM / 중분류
  "SCLAS_NM" VARCHAR(500), -- SCLAS_NM / 소분류
  "OPERTN_CITYPOINT" VARCHAR(500), -- OPERTN_CITYPOINT / 시행시점
  "STEP" VARCHAR(500), -- STEP / 단계
  "MRL_VAL" VARCHAR(500), -- MRL_VAL / MRL 값
  "ETC_YN" VARCHAR(500), -- ETC_YN / 기타여부
  "DSUSE_YN" VARCHAR(500) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I0940 / 식품용 기구 및 용기.포장 공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0940" (
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / PK 후보(LOW) / FK 후보: I2530.TESTITM_CD(HIGH, 16.9%)
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  PRIMARY KEY ("TESTITM_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I1100 / 기구등의 살균소독제 기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1100" (
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(500), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" VARCHAR(500) -- LAST_UPDT_DTM / 수정일자
);

-- -----------------------------------------------------------------------------
-- I1060 / 시약정보
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1060" (
  "CITYMEDI_NM_CD" VARCHAR(500), -- CITYMEDI_NM_CD / 시약 명
  "CMPNY_NO" VARCHAR(500), -- CMPNY_NO / 회사 명
  "CTPRVNACCTO_INTD_NO" VARCHAR(500), -- CTPRVNACCTO_INTD_NO / 시도별 지방청
  "STATS_NO" VARCHAR(500), -- STATS_NO / 상태
  "PUREDO" VARCHAR(500), -- PUREDO / 순도
  "VALD_TERM" VARCHAR(500) -- VALD_TERM / 유효기간
);

-- -----------------------------------------------------------------------------
-- I1030 / 방사선조사식품 품목 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1030" (
  "SPEC_NM" VARCHAR(500), -- SPEC_NM / 기준규격명
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "UNIT_NM" VARCHAR(500) -- UNIT_NM / 단위명
);

-- -----------------------------------------------------------------------------
-- I1080 / 동물의약품별 잔류허용 기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1080" (
  "CDX_KOREA_DVS_CD" VARCHAR(500), -- CDX_KOREA_DVS_CD / 구분
  "ANIMAL_ONLY_MDCIN_NM_KOR" VARCHAR(500), -- ANIMAL_ONLY_MDCIN_NM_KOR / 동물 전용 의약품 한글명
  "OPERTN_CITYPOINT" VARCHAR(500), -- OPERTN_CITYPOINT / 시행 시점
  "STEP" VARCHAR(500), -- STEP / 단계
  "MRL" VARCHAR(500), -- MRL / MRL
  "FOOD_KOR_NM" VARCHAR(500), -- FOOD_KOR_NM / 식품 한글명
  "FOOD_ENG_NM" VARCHAR(500), -- FOOD_ENG_NM / 식품 영문명
  "ETC_YN" VARCHAR(500), -- ETC_YN / 기타 여부
  "TMPR_STDR_APPLC_YN" VARCHAR(500), -- TMPR_STDR_APPLC_YN / 임시기준적용여부
  "DSUSE_YN" VARCHAR(500) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I1070 / 동물용의약품 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1070" (
  "ANIMAL_ONLY_MDCIN_NM_KOR" VARCHAR(500), -- ANIMAL_ONLY_MDCIN_NM_KOR / 의약품 한글명
  "ANIMAL_ONLY_MDCIN_NM_ENG" VARCHAR(500), -- ANIMAL_ONLY_MDCIN_NM_ENG / 의약품 영문명
  "APPLC_OBJ_ANIMAL" VARCHAR(500), -- APPLC_OBJ_ANIMAL / 적용 대상 동물
  "MCFRL" VARCHAR(500), -- MCFRL / 분자식
  "MCWGH" VARCHAR(500), -- MCWGH / 분자량
  "SYSTM_NM" VARCHAR(500), -- SYSTM_NM / 계통명
  "IUPAC_NM" VARCHAR(500), -- IUPAC_NM / IUPAC 명
  "CAS_NM" VARCHAR(500), -- CAS_NM / CAS 명
  "SHAP_NM" VARCHAR(500), -- SHAP_NM / 형태
  "POIOF" VARCHAR(500), -- POIOF / 녹는점
  "BOILPNT" VARCHAR(500), -- BOILPNT / 끓는점
  "STEPR" VARCHAR(500), -- STEPR / 증기압
  "LOGPOW" VARCHAR(500), -- LOGPOW / LOGPOW
  "DENS_UNIT" VARCHAR(500), -- DENS_UNIT / 밀도단위
  "PKA" VARCHAR(500), -- PKA / PKA
  "SOLUB" VARCHAR(500), -- SOLUB / 용해도
  "STBLY" VARCHAR(500) -- STBLY / 안정성
);

-- -----------------------------------------------------------------------------
-- I2600 / 공통기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2600" (
  "CMMN_SPEC_SEQ" VARCHAR(500), -- CMMN_SPEC_SEQ / 공통기준종류코드일련번호 / PK 후보(HIGH)
  "CMMN_SPEC_CD" VARCHAR(500), -- CMMN_SPEC_CD / 공통기준종류코드 / FK 후보: I2590.CMMN_SPEC_CD(HIGH, 100.0%)
  "SPEC_NM" VARCHAR(500), -- SPEC_NM / 공통기준종류명
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목분류코드 / FK 후보: I2510.PRDLST_CD(HIGH, 31.7%)
  "PRDLST_CD_NM" VARCHAR(500), -- PRDLST_CD_NM / 품목명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 5.4%)
  "TESTITM_NM" VARCHAR(500), -- TESTITM_NM / 시험항목명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "ATTRB_SEQ" VARCHAR(500), -- ATTRB_SEQ / 단서조항일련번호
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 단서조항명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일
  "SORC" VARCHAR(500), -- SORC / 출처
  "VALD_MANLI" VARCHAR(500), -- VALD_MANLI / 유효자리
  "JDGMNT_FOM_CD" VARCHAR(500), -- JDGMNT_FOM_CD / 판정형식코드
  "A079_FNPRT_CD_NM" VARCHAR(500), -- A079_FNPRT_CD_NM / 판정형식명
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MXMM_VAL_DVS_CD" VARCHAR(500), -- MXMM_VAL_DVS_CD / 최대값구분코드
  "A081_FNPRT_CD_NM" VARCHAR(500), -- A081_FNPRT_CD_NM / 최대값구분명
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "MIMM_VAL_DVS_CD" VARCHAR(500), -- MIMM_VAL_DVS_CD / 최소값구분코드
  "A080_FNPRT_CD_NM" VARCHAR(500), -- A080_FNPRT_CD_NM / 최소값구분명
  "CHOIC_FIT" VARCHAR(500), -- CHOIC_FIT / 선택형적합코드
  "A082_CF_FNPRT_CD_NM" VARCHAR(500), -- A082_CF_FNPRT_CD_NM / 선택형적합명
  "CHOIC_IMPROPT" VARCHAR(500), -- CHOIC_IMPROPT / 선택형부적합코드
  "A082_CI_FNPRT_CD_NM" VARCHAR(500), -- A082_CI_FNPRT_CD_NM / 선택형부적합명
  "MCRRGNSM_2N" VARCHAR(500), -- MCRRGNSM_2N / 미생물2N
  "MCRRGNSM_2C" VARCHAR(500), -- MCRRGNSM_2C / 미생물2C
  "MCRRGNSM_2M" VARCHAR(500), -- MCRRGNSM_2M / 미생물2M
  "MCRRGNSM_3M" VARCHAR(500), -- MCRRGNSM_3M / 미생물3M
  "FNPRT_ITM_INCLS_YN" VARCHAR(500), -- FNPRT_ITM_INCLS_YN / 세부항목포함여부
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "EMPHS_PRSEC_TESTITM_YN" VARCHAR(500), -- EMPHS_PRSEC_TESTITM_YN / 중점검사시험항목여부
  "MONTRNG_TESTITM_YN" VARCHAR(500), -- MONTRNG_TESTITM_YN / 감시시험항목여부
  "RVLV_ELSE_TESTITM_YN" VARCHAR(500), -- RVLV_ELSE_TESTITM_YN / 공전외시험항목여부
  "NTR_PRSEC_ITM_YN" VARCHAR(500), -- NTR_PRSEC_ITM_YN / 자품검사시험항목여부
  "UNIT_CD" VARCHAR(500), -- UNIT_CD / 단위코드
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(500), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("CMMN_SPEC_SEQ"),
  FOREIGN KEY ("CMMN_SPEC_CD") REFERENCES "I2590" ("CMMN_SPEC_CD"),
  FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I1040 / 농약잔류허용기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1040" (
  "AGCHM_KOR_NM" VARCHAR(500), -- AGCHM_KOR_NM / 농약명
  "FOOD_KOR_NM" VARCHAR(500), -- FOOD_KOR_NM / 식품명
  "OPERTN_CITYPOINT" VARCHAR(500), -- OPERTN_CITYPOINT / 시행 시점
  "STEP" VARCHAR(500), -- STEP / 단계
  "MRL_VAL" VARCHAR(500), -- MRL_VAL / MRL 값
  "DSUSE_YN" VARCHAR(500) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I1010 / 기구등의 살균소독제 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1010" (
  "LIMIT_STDR_STND_RCOGN_NO" VARCHAR(500), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" VARCHAR(500), -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "MC_NM" VARCHAR(500), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  "MC_NATN_CD_NM" VARCHAR(500), -- MC_NATN_CD_NM / 제조회사 국가
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I0990 / 기구 및 용기.포장의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0990" (
  "LIMIT_STDR_STND_RCOGN_NO" VARCHAR(500), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" VARCHAR(500), -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(500), -- TELNO / 전화번호
  "MC_NM" VARCHAR(500), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(500), -- PRDT_NM / 제품명
  "MC_NATN_CD_NM" VARCHAR(500), -- MC_NATN_CD_NM / 제조회사 국가
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I0960 / 건강기능식품공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0960" (
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(500), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 60.9%)
  "T_KOR_NM" VARCHAR(500), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(500), -- SORC / 출처
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I1660 / 과징금부과기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1660" (
  "DSPS_STDR_CD_NM" VARCHAR(500), -- DSPS_STDR_CD_NM / 처분기준명
  "LAWORD_CD_NM" VARCHAR(500), -- LAWORD_CD_NM / 식품법령
  "BASIS_LAWORD" VARCHAR(500), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_NM" VARCHAR(500), -- VILT_TYPE_NM / 위반유형
  "LV_NO" VARCHAR(500), -- LV_NO / 레벨
  "VALD_BGN_DT" VARCHAR(500), -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" VARCHAR(500) -- VALD_END_DT / 유효종료일자
);

-- -----------------------------------------------------------------------------
-- I2610 / 공통기준제외
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2610" (
  "CMMN_SPEC_CD" VARCHAR(500), -- CMMN_SPEC_CD / 공통기준규격코드 / PK 후보(MEDIUM)
  "SPEC_NM" VARCHAR(500), -- SPEC_NM / 기준규격명
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목코드 / PK 후보(MEDIUM)
  "KOR_NM" VARCHAR(500), -- KOR_NM / 한글명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / PK 후보(MEDIUM) / FK 후보: I2530.TESTITM_CD(HIGH, 57.1%)
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("CMMN_SPEC_CD", "PRDLST_CD", "TESTITM_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2580 / 개별기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2580" (
  "INDV_SPEC_SEQ" VARCHAR(500), -- INDV_SPEC_SEQ / 개별기준규격일련번호 / PK 후보(HIGH)
  "PRDLST_CD" VARCHAR(500), -- PRDLST_CD / 품목분류코드
  "PRDLST_CD_NM" VARCHAR(500), -- PRDLST_CD_NM / 품목명
  "TESTITM_CD" VARCHAR(500), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 53.4%)
  "TESTITM_NM" VARCHAR(500), -- TESTITM_NM / 시험항목명
  "FNPRT_ITM_NM" VARCHAR(500), -- FNPRT_ITM_NM / 세부항목명
  "ATTRB_SEQ" VARCHAR(500), -- ATTRB_SEQ / 단서조항일련번호
  "PIAM_KOR_NM" VARCHAR(500), -- PIAM_KOR_NM / 단서조항명
  "SPEC_VAL" VARCHAR(500), -- SPEC_VAL / 기준규격
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격요약
  "VALD_BEGN_DT" VARCHAR(500), -- VALD_BEGN_DT / 유효개시일
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일
  "SORC" VARCHAR(500), -- SORC / 출처
  "VALD_MANLI" VARCHAR(500), -- VALD_MANLI / 유효자리
  "JDGMNT_FOM_CD" VARCHAR(500), -- JDGMNT_FOM_CD / 판정형식코드
  "A079_FNPRT_CD_NM" VARCHAR(500), -- A079_FNPRT_CD_NM / 판정형식명
  "MXMM_VAL" VARCHAR(500), -- MXMM_VAL / 최대값
  "MXMM_VAL_DVS_CD" VARCHAR(500), -- MXMM_VAL_DVS_CD / 최대값구분코드
  "A081_FNPRT_CD_NM" VARCHAR(500), -- A081_FNPRT_CD_NM / 최대값구분명
  "MIMM_VAL" VARCHAR(500), -- MIMM_VAL / 최소값
  "MIMM_VAL_DVS_CD" VARCHAR(500), -- MIMM_VAL_DVS_CD / 최소값구분코드
  "A080_FNPRT_CD_NM" VARCHAR(500), -- A080_FNPRT_CD_NM / 최소값구분명
  "CHOIC_FIT" VARCHAR(500), -- CHOIC_FIT / 선택형적합코드
  "A082_CF_FNPRT_CD_NM" VARCHAR(500), -- A082_CF_FNPRT_CD_NM / 선택형적합명
  "CHOIC_IMPROPT" VARCHAR(500), -- CHOIC_IMPROPT / 선택형부적합코드
  "A082_CI_FNPRT_CD_NM" VARCHAR(500), -- A082_CI_FNPRT_CD_NM / 선택형부적합명
  "MCRRGNSM_2N" VARCHAR(500), -- MCRRGNSM_2N / 미생물2N
  "MCRRGNSM_2C" VARCHAR(500), -- MCRRGNSM_2C / 미생물2C
  "MCRRGNSM_2M" VARCHAR(500), -- MCRRGNSM_2M / 미생물2M
  "MCRRGNSM_3M" VARCHAR(500), -- MCRRGNSM_3M / 미생물3M
  "FNPRT_ITM_INCLS_YN" VARCHAR(500), -- FNPRT_ITM_INCLS_YN / 세부항목포함여부
  "INJRY_YN" VARCHAR(500), -- INJRY_YN / 위해여부
  "EMPHS_PRSEC_TESTITM_YN" VARCHAR(500), -- EMPHS_PRSEC_TESTITM_YN / 중점검사시험항목여부
  "MONTRNG_TESTITM_YN" VARCHAR(500), -- MONTRNG_TESTITM_YN / 감시시험항목여부
  "RVLV_ELSE_TESTITM_YN" VARCHAR(500), -- RVLV_ELSE_TESTITM_YN / 공전외시험항목여부
  "NTR_PRSEC_ITM_YN" VARCHAR(500), -- NTR_PRSEC_ITM_YN / 자품검사시험항목여부
  "UNIT_CD" VARCHAR(500), -- UNIT_CD / 단위코드
  "UNIT_NM" VARCHAR(500), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(500), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("INDV_SPEC_SEQ"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- 1471000 / 식품영양성분 DB정보
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "1471000" (
  "NUM" VARCHAR(500), -- NUM / NUM
  "FOOD_CD" VARCHAR(500), -- FOOD_CD / FOOD_CD / PK 후보(MEDIUM)
  "FOOD_NM_KR" VARCHAR(500), -- FOOD_NM_KR / FOOD_NM_KR
  "DB_GRP_CM" VARCHAR(500), -- DB_GRP_CM / DB_GRP_CM
  "DB_GRP_NM" VARCHAR(500), -- DB_GRP_NM / DB_GRP_NM
  "DB_CLASS_CM" VARCHAR(500), -- DB_CLASS_CM / DB_CLASS_CM
  "DB_CLASS_NM" VARCHAR(500), -- DB_CLASS_NM / DB_CLASS_NM
  "FOOD_OR_CD" VARCHAR(500), -- FOOD_OR_CD / FOOD_OR_CD / PK 후보(MEDIUM)
  "FOOD_OR_NM" VARCHAR(500), -- FOOD_OR_NM / FOOD_OR_NM
  "FOOD_CAT1_CD" VARCHAR(500), -- FOOD_CAT1_CD / FOOD_CAT1_CD
  "FOOD_CAT1_NM" VARCHAR(500), -- FOOD_CAT1_NM / FOOD_CAT1_NM
  "FOOD_REF_CD" VARCHAR(500), -- FOOD_REF_CD / FOOD_REF_CD
  "FOOD_REF_NM" VARCHAR(500), -- FOOD_REF_NM / FOOD_REF_NM
  "FOOD_CAT2_CD" VARCHAR(500), -- FOOD_CAT2_CD / FOOD_CAT2_CD
  "FOOD_CAT2_NM" VARCHAR(500), -- FOOD_CAT2_NM / FOOD_CAT2_NM
  "FOOD_CAT3_CD" VARCHAR(500), -- FOOD_CAT3_CD / FOOD_CAT3_CD
  "FOOD_CAT3_NM" VARCHAR(500), -- FOOD_CAT3_NM / FOOD_CAT3_NM
  "FOOD_CAT4_CD" VARCHAR(500), -- FOOD_CAT4_CD / FOOD_CAT4_CD
  "FOOD_CAT4_NM" VARCHAR(500), -- FOOD_CAT4_NM / FOOD_CAT4_NM
  "SERVING_SIZE" VARCHAR(500), -- SERVING_SIZE / SERVING_SIZE
  "AMT_NUM1" VARCHAR(500), -- AMT_NUM1 / AMT_NUM1
  "AMT_NUM2" VARCHAR(500), -- AMT_NUM2 / AMT_NUM2
  "AMT_NUM3" VARCHAR(500), -- AMT_NUM3 / AMT_NUM3
  "AMT_NUM4" VARCHAR(500), -- AMT_NUM4 / AMT_NUM4
  "AMT_NUM5" VARCHAR(500), -- AMT_NUM5 / AMT_NUM5
  "AMT_NUM6" VARCHAR(500), -- AMT_NUM6 / AMT_NUM6
  "AMT_NUM7" VARCHAR(500), -- AMT_NUM7 / AMT_NUM7
  "AMT_NUM8" VARCHAR(500), -- AMT_NUM8 / AMT_NUM8
  "AMT_NUM9" VARCHAR(500), -- AMT_NUM9 / AMT_NUM9
  "AMT_NUM10" VARCHAR(500), -- AMT_NUM10 / AMT_NUM10
  "AMT_NUM11" VARCHAR(500), -- AMT_NUM11 / AMT_NUM11
  "AMT_NUM12" VARCHAR(500), -- AMT_NUM12 / AMT_NUM12
  "AMT_NUM13" VARCHAR(500), -- AMT_NUM13 / AMT_NUM13
  "AMT_NUM14" VARCHAR(500), -- AMT_NUM14 / AMT_NUM14
  "AMT_NUM15" VARCHAR(500), -- AMT_NUM15 / AMT_NUM15
  "AMT_NUM16" VARCHAR(500), -- AMT_NUM16 / AMT_NUM16
  "AMT_NUM17" VARCHAR(500), -- AMT_NUM17 / AMT_NUM17
  "AMT_NUM18" VARCHAR(500), -- AMT_NUM18 / AMT_NUM18
  "AMT_NUM19" VARCHAR(500), -- AMT_NUM19 / AMT_NUM19
  "AMT_NUM20" VARCHAR(500), -- AMT_NUM20 / AMT_NUM20
  "AMT_NUM21" VARCHAR(500), -- AMT_NUM21 / AMT_NUM21
  "AMT_NUM22" VARCHAR(500), -- AMT_NUM22 / AMT_NUM22
  "AMT_NUM23" VARCHAR(500), -- AMT_NUM23 / AMT_NUM23
  "AMT_NUM24" VARCHAR(500), -- AMT_NUM24 / AMT_NUM24
  "AMT_NUM25" VARCHAR(500), -- AMT_NUM25 / AMT_NUM25
  "AMT_NUM26" VARCHAR(500), -- AMT_NUM26 / AMT_NUM26
  "AMT_NUM27" VARCHAR(500), -- AMT_NUM27 / AMT_NUM27
  "AMT_NUM28" VARCHAR(500), -- AMT_NUM28 / AMT_NUM28
  "AMT_NUM29" VARCHAR(500), -- AMT_NUM29 / AMT_NUM29
  "AMT_NUM30" VARCHAR(500), -- AMT_NUM30 / AMT_NUM30
  "AMT_NUM31" VARCHAR(500), -- AMT_NUM31 / AMT_NUM31
  "AMT_NUM32" VARCHAR(500), -- AMT_NUM32 / AMT_NUM32
  "AMT_NUM33" VARCHAR(500), -- AMT_NUM33 / AMT_NUM33
  "AMT_NUM34" VARCHAR(500), -- AMT_NUM34 / AMT_NUM34
  "AMT_NUM35" VARCHAR(500), -- AMT_NUM35 / AMT_NUM35
  "AMT_NUM36" VARCHAR(500), -- AMT_NUM36 / AMT_NUM36
  "AMT_NUM37" VARCHAR(500), -- AMT_NUM37 / AMT_NUM37
  "AMT_NUM38" VARCHAR(500), -- AMT_NUM38 / AMT_NUM38
  "AMT_NUM39" VARCHAR(500), -- AMT_NUM39 / AMT_NUM39
  "AMT_NUM40" VARCHAR(500), -- AMT_NUM40 / AMT_NUM40
  "AMT_NUM41" VARCHAR(500), -- AMT_NUM41 / AMT_NUM41
  "AMT_NUM42" VARCHAR(500), -- AMT_NUM42 / AMT_NUM42
  "AMT_NUM43" VARCHAR(500), -- AMT_NUM43 / AMT_NUM43
  "AMT_NUM44" VARCHAR(500), -- AMT_NUM44 / AMT_NUM44
  "AMT_NUM45" VARCHAR(500), -- AMT_NUM45 / AMT_NUM45
  "AMT_NUM46" VARCHAR(500), -- AMT_NUM46 / AMT_NUM46
  "AMT_NUM47" VARCHAR(500), -- AMT_NUM47 / AMT_NUM47
  "AMT_NUM48" VARCHAR(500), -- AMT_NUM48 / AMT_NUM48
  "AMT_NUM49" VARCHAR(500), -- AMT_NUM49 / AMT_NUM49
  "AMT_NUM50" VARCHAR(500), -- AMT_NUM50 / AMT_NUM50
  "AMT_NUM51" VARCHAR(500), -- AMT_NUM51 / AMT_NUM51
  "AMT_NUM52" VARCHAR(500), -- AMT_NUM52 / AMT_NUM52
  "AMT_NUM53" VARCHAR(500), -- AMT_NUM53 / AMT_NUM53
  "AMT_NUM54" VARCHAR(500), -- AMT_NUM54 / AMT_NUM54
  "AMT_NUM55" VARCHAR(500), -- AMT_NUM55 / AMT_NUM55
  "AMT_NUM56" VARCHAR(500), -- AMT_NUM56 / AMT_NUM56
  "AMT_NUM57" VARCHAR(500), -- AMT_NUM57 / AMT_NUM57
  "AMT_NUM58" VARCHAR(500), -- AMT_NUM58 / AMT_NUM58
  "AMT_NUM59" VARCHAR(500), -- AMT_NUM59 / AMT_NUM59
  "AMT_NUM60" VARCHAR(500), -- AMT_NUM60 / AMT_NUM60
  "AMT_NUM61" VARCHAR(500), -- AMT_NUM61 / AMT_NUM61
  "AMT_NUM62" VARCHAR(500), -- AMT_NUM62 / AMT_NUM62
  "AMT_NUM63" VARCHAR(500), -- AMT_NUM63 / AMT_NUM63
  "AMT_NUM64" VARCHAR(500), -- AMT_NUM64 / AMT_NUM64
  "AMT_NUM65" VARCHAR(500), -- AMT_NUM65 / AMT_NUM65
  "AMT_NUM66" VARCHAR(500), -- AMT_NUM66 / AMT_NUM66
  "AMT_NUM67" VARCHAR(500), -- AMT_NUM67 / AMT_NUM67
  "AMT_NUM68" VARCHAR(500), -- AMT_NUM68 / AMT_NUM68
  "AMT_NUM69" VARCHAR(500), -- AMT_NUM69 / AMT_NUM69
  "AMT_NUM70" VARCHAR(500), -- AMT_NUM70 / AMT_NUM70
  "AMT_NUM71" VARCHAR(500), -- AMT_NUM71 / AMT_NUM71
  "AMT_NUM72" VARCHAR(500), -- AMT_NUM72 / AMT_NUM72
  "AMT_NUM73" VARCHAR(500), -- AMT_NUM73 / AMT_NUM73
  "AMT_NUM74" VARCHAR(500), -- AMT_NUM74 / AMT_NUM74
  "AMT_NUM75" VARCHAR(500), -- AMT_NUM75 / AMT_NUM75
  "AMT_NUM76" VARCHAR(500), -- AMT_NUM76 / AMT_NUM76
  "AMT_NUM77" VARCHAR(500), -- AMT_NUM77 / AMT_NUM77
  "AMT_NUM78" VARCHAR(500), -- AMT_NUM78 / AMT_NUM78
  "AMT_NUM79" VARCHAR(500), -- AMT_NUM79 / AMT_NUM79
  "AMT_NUM80" VARCHAR(500), -- AMT_NUM80 / AMT_NUM80
  "AMT_NUM81" VARCHAR(500), -- AMT_NUM81 / AMT_NUM81
  "AMT_NUM82" VARCHAR(500), -- AMT_NUM82 / AMT_NUM82
  "AMT_NUM83" VARCHAR(500), -- AMT_NUM83 / AMT_NUM83
  "AMT_NUM84" VARCHAR(500), -- AMT_NUM84 / AMT_NUM84
  "AMT_NUM85" VARCHAR(500), -- AMT_NUM85 / AMT_NUM85
  "AMT_NUM86" VARCHAR(500), -- AMT_NUM86 / AMT_NUM86
  "AMT_NUM87" VARCHAR(500), -- AMT_NUM87 / AMT_NUM87
  "AMT_NUM88" VARCHAR(500), -- AMT_NUM88 / AMT_NUM88
  "AMT_NUM89" VARCHAR(500), -- AMT_NUM89 / AMT_NUM89
  "AMT_NUM90" VARCHAR(500), -- AMT_NUM90 / AMT_NUM90
  "AMT_NUM91" VARCHAR(500), -- AMT_NUM91 / AMT_NUM91
  "AMT_NUM92" VARCHAR(500), -- AMT_NUM92 / AMT_NUM92
  "AMT_NUM93" VARCHAR(500), -- AMT_NUM93 / AMT_NUM93
  "AMT_NUM94" VARCHAR(500), -- AMT_NUM94 / AMT_NUM94
  "AMT_NUM95" VARCHAR(500), -- AMT_NUM95 / AMT_NUM95
  "AMT_NUM96" VARCHAR(500), -- AMT_NUM96 / AMT_NUM96
  "AMT_NUM97" VARCHAR(500), -- AMT_NUM97 / AMT_NUM97
  "AMT_NUM98" VARCHAR(500), -- AMT_NUM98 / AMT_NUM98
  "AMT_NUM99" VARCHAR(500), -- AMT_NUM99 / AMT_NUM99
  "AMT_NUM100" VARCHAR(500), -- AMT_NUM100 / AMT_NUM100
  "AMT_NUM101" VARCHAR(500), -- AMT_NUM101 / AMT_NUM101
  "AMT_NUM102" VARCHAR(500), -- AMT_NUM102 / AMT_NUM102
  "AMT_NUM103" VARCHAR(500), -- AMT_NUM103 / AMT_NUM103
  "AMT_NUM104" VARCHAR(500), -- AMT_NUM104 / AMT_NUM104
  "AMT_NUM105" VARCHAR(500), -- AMT_NUM105 / AMT_NUM105
  "AMT_NUM106" VARCHAR(500), -- AMT_NUM106 / AMT_NUM106
  "AMT_NUM107" VARCHAR(500), -- AMT_NUM107 / AMT_NUM107
  "AMT_NUM108" VARCHAR(500), -- AMT_NUM108 / AMT_NUM108
  "AMT_NUM109" VARCHAR(500), -- AMT_NUM109 / AMT_NUM109
  "AMT_NUM110" VARCHAR(500), -- AMT_NUM110 / AMT_NUM110
  "AMT_NUM111" VARCHAR(500), -- AMT_NUM111 / AMT_NUM111
  "AMT_NUM112" VARCHAR(500), -- AMT_NUM112 / AMT_NUM112
  "AMT_NUM113" VARCHAR(500), -- AMT_NUM113 / AMT_NUM113
  "AMT_NUM114" VARCHAR(500), -- AMT_NUM114 / AMT_NUM114
  "AMT_NUM115" VARCHAR(500), -- AMT_NUM115 / AMT_NUM115
  "AMT_NUM116" VARCHAR(500), -- AMT_NUM116 / AMT_NUM116
  "AMT_NUM117" VARCHAR(500), -- AMT_NUM117 / AMT_NUM117
  "AMT_NUM118" VARCHAR(500), -- AMT_NUM118 / AMT_NUM118
  "AMT_NUM119" VARCHAR(500), -- AMT_NUM119 / AMT_NUM119
  "AMT_NUM120" VARCHAR(500), -- AMT_NUM120 / AMT_NUM120
  "AMT_NUM121" VARCHAR(500), -- AMT_NUM121 / AMT_NUM121
  "AMT_NUM122" VARCHAR(500), -- AMT_NUM122 / AMT_NUM122
  "AMT_NUM123" VARCHAR(500), -- AMT_NUM123 / AMT_NUM123
  "AMT_NUM124" VARCHAR(500), -- AMT_NUM124 / AMT_NUM124
  "AMT_NUM125" VARCHAR(500), -- AMT_NUM125 / AMT_NUM125
  "AMT_NUM126" VARCHAR(500), -- AMT_NUM126 / AMT_NUM126
  "AMT_NUM127" VARCHAR(500), -- AMT_NUM127 / AMT_NUM127
  "AMT_NUM128" VARCHAR(500), -- AMT_NUM128 / AMT_NUM128
  "AMT_NUM129" VARCHAR(500), -- AMT_NUM129 / AMT_NUM129
  "AMT_NUM130" VARCHAR(500), -- AMT_NUM130 / AMT_NUM130
  "AMT_NUM131" VARCHAR(500), -- AMT_NUM131 / AMT_NUM131
  "AMT_NUM132" VARCHAR(500), -- AMT_NUM132 / AMT_NUM132
  "AMT_NUM133" VARCHAR(500), -- AMT_NUM133 / AMT_NUM133
  "AMT_NUM134" VARCHAR(500), -- AMT_NUM134 / AMT_NUM134
  "AMT_NUM135" VARCHAR(500), -- AMT_NUM135 / AMT_NUM135
  "AMT_NUM136" VARCHAR(500), -- AMT_NUM136 / AMT_NUM136
  "AMT_NUM137" VARCHAR(500), -- AMT_NUM137 / AMT_NUM137
  "AMT_NUM138" VARCHAR(500), -- AMT_NUM138 / AMT_NUM138
  "AMT_NUM139" VARCHAR(500), -- AMT_NUM139 / AMT_NUM139
  "AMT_NUM140" VARCHAR(500), -- AMT_NUM140 / AMT_NUM140
  "AMT_NUM141" VARCHAR(500), -- AMT_NUM141 / AMT_NUM141
  "AMT_NUM142" VARCHAR(500), -- AMT_NUM142 / AMT_NUM142
  "AMT_NUM143" VARCHAR(500), -- AMT_NUM143 / AMT_NUM143
  "AMT_NUM144" VARCHAR(500), -- AMT_NUM144 / AMT_NUM144
  "AMT_NUM145" VARCHAR(500), -- AMT_NUM145 / AMT_NUM145
  "AMT_NUM146" VARCHAR(500), -- AMT_NUM146 / AMT_NUM146
  "AMT_NUM147" VARCHAR(500), -- AMT_NUM147 / AMT_NUM147
  "AMT_NUM148" VARCHAR(500), -- AMT_NUM148 / AMT_NUM148
  "AMT_NUM149" VARCHAR(500), -- AMT_NUM149 / AMT_NUM149
  "AMT_NUM150" VARCHAR(500), -- AMT_NUM150 / AMT_NUM150
  "AMT_NUM151" VARCHAR(500), -- AMT_NUM151 / AMT_NUM151
  "AMT_NUM152" VARCHAR(500), -- AMT_NUM152 / AMT_NUM152
  "AMT_NUM153" VARCHAR(500), -- AMT_NUM153 / AMT_NUM153
  "AMT_NUM154" VARCHAR(500), -- AMT_NUM154 / AMT_NUM154
  "AMT_NUM155" VARCHAR(500), -- AMT_NUM155 / AMT_NUM155
  "AMT_NUM156" VARCHAR(500), -- AMT_NUM156 / AMT_NUM156
  "AMT_NUM157" VARCHAR(500), -- AMT_NUM157 / AMT_NUM157
  "SUB_REF_CM" VARCHAR(500), -- SUB_REF_CM / SUB_REF_CM
  "SUB_REF_NAME" VARCHAR(500), -- SUB_REF_NAME / SUB_REF_NAME
  "NUTRI_AMOUNT_SERVING" VARCHAR(500), -- NUTRI_AMOUNT_SERVING / NUTRI_AMOUNT_SERVING
  "Z10500" VARCHAR(500), -- Z10500 / Z10500
  "DISH_ONE_SERVING" VARCHAR(500), -- DISH_ONE_SERVING / DISH_ONE_SERVING
  "ITEM_REPORT_NO" VARCHAR(500), -- ITEM_REPORT_NO / ITEM_REPORT_NO
  "MAKER_NM" VARCHAR(500), -- MAKER_NM / MAKER_NM
  "IMP_MANUFAC_NM" VARCHAR(500), -- IMP_MANUFAC_NM / IMP_MANUFAC_NM
  "SELLER_MANUFAC_NM" VARCHAR(500), -- SELLER_MANUFAC_NM / SELLER_MANUFAC_NM
  "IMP_YN" VARCHAR(500), -- IMP_YN / IMP_YN
  "NATION_CM" VARCHAR(500), -- NATION_CM / NATION_CM
  "NATION_NM" VARCHAR(500), -- NATION_NM / NATION_NM
  "CRT_MTH_CD" VARCHAR(500), -- CRT_MTH_CD / CRT_MTH_CD
  "CRT_MTH_NM" VARCHAR(500), -- CRT_MTH_NM / CRT_MTH_NM
  "RESEARCH_YMD" VARCHAR(500), -- RESEARCH_YMD / RESEARCH_YMD
  "UPDATE_DATE" VARCHAR(500), -- UPDATE_DATE / UPDATE_DATE
  PRIMARY KEY ("FOOD_CD", "FOOD_OR_CD")
);

-- -----------------------------------------------------------------------------
-- I1670 / 과태료부과기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1670" (
  "DSPS_STDR_CD" VARCHAR(500), -- DSPS_STDR_CD / 처분기준코드 / PK 후보(HIGH) / FK 후보: I2550.DSPS_STDR_CD(HIGH, 13.4%)
  "DSPS_STDR_CD_NM" VARCHAR(500), -- DSPS_STDR_CD_NM / 처분기준명
  "LV_NO" VARCHAR(500), -- LV_NO / 레벨
  "BASIS_LAWORD" VARCHAR(500), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_NM" VARCHAR(500), -- VILT_TYPE_NM / 위반유형
  "VALD_BGN_DT" VARCHAR(500), -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  PRIMARY KEY ("DSPS_STDR_CD"),
  FOREIGN KEY ("DSPS_STDR_CD") REFERENCES "I2550" ("DSPS_STDR_CD")
);

-- -----------------------------------------------------------------------------
-- I2550 / 처분기준코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2550" (
  "DSPS_STDR_CD" VARCHAR(500), -- DSPS_STDR_CD / 처분기준코드 / PK 후보(HIGH) / FK 후보: I1670.null(MEDIUM, 6.6%)
  "HRNK_DSPS_STDR_CD" VARCHAR(500), -- HRNK_DSPS_STDR_CD / 상위처분기준코드
  "LV_NO" VARCHAR(500), -- LV_NO / 레벨 / FK 후보: I1670.null(MEDIUM, 6.6%)
  "DSPS_STDR_CD_NM" VARCHAR(500), -- DSPS_STDR_CD_NM / 처분기준코드명
  "BASIS_LAWORD" VARCHAR(500), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_CD" VARCHAR(500), -- VILT_TYPE_CD / 위반유형코드
  "VILT_TYPE_CD_NM" VARCHAR(500), -- VILT_TYPE_CD_NM / 위반유형명
  "USE_YN" VARCHAR(500), -- USE_YN / 사용여부
  "VALD_BGN_DT" VARCHAR(500), -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" VARCHAR(500), -- VALD_END_DT / 유효종료일자
  "LAST_UPDT_DTM" VARCHAR(500), -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("DSPS_STDR_CD"),
  FOREIGN KEY ("DSPS_STDR_CD", "LV_NO") REFERENCES "I1670" ("DSPS_STDR_CD", "LV_NO")
);

-- =============================================================================
-- FK 후보 전체 목록 (검토용 주석)
-- =============================================================================

-- FK 후보 [UNVERIFIED/100] "I2580"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/185, row 0)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "개별기준규격" → "품목유형코드" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I2580"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 53.4% (117/219, row 706)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "개별기준규격" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 53.4%, 매칭 고유값 117개, 매칭 row 706건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [SUGGESTED/100] "I2610"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 12.5% (1/8, row 1)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준제외" → "품목유형코드" 부모-자식 관계 확인 / 값 포함률 12.5%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [HIGH/100] "I2610"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 57.1% (4/7, row 16)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준제외" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 57.1%, 매칭 고유값 4개, 매칭 row 16건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I0960"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 60.9% (103/169, row 567)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "건강기능식품공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 60.9%, 매칭 고유값 103개, 매칭 row 567건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I1670"."DSPS_STDR_CD" -> "I2550"."DSPS_STDR_CD"
-- 값 포함률: 13.4% (66/493, row 66)
-- 사유: 대상 테이블 I2550의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 13.4%, 매칭 고유값 66개, 매칭 row 66건
-- FOREIGN KEY ("DSPS_STDR_CD") REFERENCES "I2550" ("DSPS_STDR_CD")

-- FK 후보 [HIGH/100] "I2600"."CMMN_SPEC_CD" -> "I2590"."CMMN_SPEC_CD"
-- 값 포함률: 100.0% (26/26, row 1000)
-- 사유: 대상 테이블 I2590의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 값 포함률 100.0%, 매칭 고유값 26개, 매칭 row 1000건
-- FOREIGN KEY ("CMMN_SPEC_CD") REFERENCES "I2590" ("CMMN_SPEC_CD")

-- FK 후보 [HIGH/100] "I2600"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 31.7% (44/139, row 788)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준규격" → "품목유형코드" 부모-자식 관계 확인 / 값 포함률 31.7%, 매칭 고유값 44개, 매칭 row 788건
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [HIGH/100] "I2600"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 5.4% (16/299, row 171)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준규격" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 5.4%, 매칭 고유값 16개, 매칭 row 171건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I0940"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 16.9% (12/71, row 230)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품용 기구 및 용기.포장 공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 16.9%, 매칭 고유값 12개, 매칭 row 230건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I0950"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 50.0% (17/34, row 94)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품첨가물공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 50.0%, 매칭 고유값 17개, 매칭 row 94건
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [UNVERIFIED/100] "I1101"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 미검증
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 샘플 부족으로 값 포함률 미검증 — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "C005"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.1% (1/949, row 1)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.1%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "C005"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/949, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "바코드연계제품정보" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "C005"."BAR_CD" -> "I2570"."BRCD_NO"
-- 값 포함률: 1.5% (15/969, row 15)
-- 사유: 필드명 유사 매칭 유사도 100% (정규화 기준, -0점) / 대상 테이블 I2570의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.5%, 매칭 고유값 15개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [HIGH/100] "I2560"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 99.8% (998/1000, row 998)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "영업소재지 GIS 코드" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 99.8%, 매칭 고유값 998개, 매칭 row 998건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2560"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.3% (3/1000, row 3)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.3%, 매칭 고유값 3개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I2640"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/12, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "검사부적합 현황(농산물)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2640"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/12, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "검사부적합 현황(농산물)" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2620"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "검사부적합(국내)" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2620"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/85, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "검사부적합(국내)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I2620"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 3.5% (3/85, row 3)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 3.5%, 매칭 고유값 3개, 매칭 row 3건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0470"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/989, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0470"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/989, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2630"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/993, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과(식품접객업)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2630"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/993, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "행정처분결과(식품접객업)" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0482"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/45, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과(수입식품업)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0482"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/45, row 0)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "행정처분결과(수입식품업)" → "식품등수입판매업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0480"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/259, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과(식품제조가공업)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "I0480"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.8% (2/259, row 3)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "행정처분결과(식품제조가공업)" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 0.8%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0481"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/650, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "행정처분결과(식품판매업)" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0481"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/650, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "행정처분결과(식품판매업)" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I0490"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 9.2% (11/119, row 16)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 9.2%, 매칭 고유값 11개, 매칭 row 16건
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [UNVERIFIED/100] "I0490"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/154, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "회수.판매중지 정보" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0490"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 2.3% (5/219, row 7)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 2.3%, 매칭 고유값 5개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0490"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 1.4% (3/219, row 3)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.4%, 매칭 고유값 3개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0460"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 2.2% (7/323, row 8)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 2.2%, 매칭 고유값 7개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0460"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.9% (3/323, row 3)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.9%, 매칭 고유값 3개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0320"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.2% (1/533, row 1)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.2%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0320"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/533, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품이력추적관리 등록 현황" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0080"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.5% (1/217, row 4)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.5%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [SUGGESTED/100] "I0080"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 2.3% (5/217, row 25)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "어린이 기호식품 품질인증 현황 및 재심사 현황" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 2.3%, 매칭 고유값 5개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0080"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/743, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "어린이 기호식품 품질인증 현황 및 재심사 현황" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I0580"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/458, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "HACCP 적용업소 지정 현황" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I0580"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 5.2% (24/458, row 59)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "HACCP 적용업소 지정 현황" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 5.2%, 매칭 고유값 24개, 매칭 row 59건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0610"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/973, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물HACCP 지정정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I0610"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 9.5% (92/973, row 93)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물HACCP 지정정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 9.5%, 매칭 고유값 92개, 매칭 row 93건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2857"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/78, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공유주방운영업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2857"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/78, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2858"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/135, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "도축업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2858"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/135, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2835"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식육즉석판매가공업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2835"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2836"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/575, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식용란선별포장업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2833"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/890, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품냉동.냉장업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2833"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/890, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2831"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품소분업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2831"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2852"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "생산중단제품정보" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I2852"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 3.7% (5/134, row 16)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 3.7%, 매칭 고유값 5개, 매칭 row 16건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2852"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 4.5% (6/134, row 20)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "생산중단제품정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 4.5%, 매칭 고유값 6개, 매칭 row 20건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2830"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품운반업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2830"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I-0010"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/3, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "I2832"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.6% (6/1000, row 6)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품판매업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.6%, 매칭 고유값 6개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2832"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2829"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "즉석판매제조가공업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2829"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2834"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "집단급식소 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2834"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2856"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2714"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "위생용품수입업영업신고대장" → "위생용품영업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2714"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I2711"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 81.4% (35/43, row 985)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 81.4%, 매칭 고유값 35개, 매칭 row 985건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2851"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 41.5% (71/171, row 666)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "위생용품영업 생산실적보고" → "위생용품영업정보" 부모-자식 관계 확인 / 값 포함률 41.5%, 매칭 고유값 71개, 매칭 row 666건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [SUGGESTED/100] "I2851"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 2.8% (21/755, row 21)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "위생용품영업 생산실적보고" → "위생용품품목제조보고" 부모-자식 관계 확인 / 값 포함률 2.8%, 매칭 고유값 21개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")

-- FK 후보 [UNVERIFIED/100] "I1330"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 보관업영업허가대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1330"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1420"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/33, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물 생산실적정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1420"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물 생산실적정보" → "축산물 품목제조정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1320"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 식육포장처리업영업허가대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1320"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1340"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1370"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/54, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 집유업영업허가대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1370"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/54, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1350"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I1310"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 30.0% (3/10, row 212)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 30.0%, 매칭 고유값 3개, 매칭 row 212건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I1310"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 100.0% (10/10, row 1000)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 100.0%, 매칭 고유값 10개, 매칭 row 1000건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "C006"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +30 / 업무 명칭 규칙: "축산물품목제조보고(원재료)" → "축산물 품목제조정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "C006"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 9.6% (11/115, row 25)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 9.6%, 매칭 고유값 11개, 매칭 row 25건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I-0050"."HF_FNCLTY_MTRAL_RCOGN_NO" -> "I-0040"."HF_FNCLTY_MTRAL_RCOGN_NO"
-- 값 포함률: 0.2% (1/429, row 1)
-- 사유: 대상 테이블 I-0040의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 0.2%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I0310"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.5% (5/1000, row 5)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 0.5%, 매칭 고유값 5개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [HIGH/100] "I2712"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 70.8% (114/161, row 800)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 70.8%, 매칭 고유값 114개, 매칭 row 800건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2712"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 4.9% (49/1000, row 49)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +30 / 업무 명칭 규칙: "위생용품품목제조보고(원재료)" → "위생용품품목제조보고" 부모-자식 관계 확인 / 값 포함률 4.9%, 매칭 고유값 49개, 매칭 row 49건
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")

-- FK 후보 [UNVERIFIED/100] "I0630"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/601, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "건강기능식품GMP 지정 현황" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2860"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/315, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "건강기능식품업소 인허가 변경 정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "C003"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.1% (1/1000, row 1)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +30 / 업무 명칭 규칙: "건강기능식품 품목제조신고(원재료)" → "건강기능식품 품목제조 신고사항 현황" 부모-자식 관계 확인 / 값 포함률 0.1%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")

-- FK 후보 [UNVERIFIED/100] "I1290"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "C001"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 100.0% (1000/1000, row 1000)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "수입식품등영업신고대장" → "식품등수입판매업정보" 부모-자식 관계 확인 / 값 포함률 100.0%, 매칭 고유값 1000개, 매칭 row 1000건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0250"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 2.5% (1/40, row 1)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 2.5%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I2847"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/989, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1250"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 100.0% (2/2, row 1000)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 100.0%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I1250"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/2, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "C002"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 1.1% (3/266, row 5)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.1%, 매칭 고유값 3개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [HIGH/100] "C002"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 6.4% (17/266, row 73)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 6.4%, 매칭 고유값 17개, 매칭 row 73건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [SUGGESTED/100] "C002"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.2% (2/1000, row 2)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +30 / 업무 명칭 규칙: "식품(첨가물)품목제조보고(원재료)" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 0.2%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1250" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I0300"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 5.6% (3/54, row 385)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품.식품첨가물 생산실적 보고 현황" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 5.6%, 매칭 고유값 3개, 매칭 row 385건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0300"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/988, row 0)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품.식품첨가물 생산실적 보고 현황" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1590"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.2% (2/807, row 2)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 0.2%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [SUGGESTED/100] "I2859"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.3% (1/343, row 2)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품업소 인허가 변경 정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.3%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2859"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 100.0% (343/343, row 1000)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품업소 인허가 변경 정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 100.0%, 매칭 고유값 343개, 매칭 row 1000건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I1560"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품위생교육내역" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1560"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/1, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품위생교육내역" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "I1540"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.3% (2/758, row 2)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품위생등급평가관리내역" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 0.3%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I1540"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/758, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품위생등급평가관리내역" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I1230"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 1.2% (12/1000, row 12)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.2%, 매칭 고유값 12개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/100] "I1230"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "C004"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.3% (3/1000, row 3)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품접객업소 위생등급 지정현황" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 0.3%, 매칭 고유값 3개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1200" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2861"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/157, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "음식점업소 인허가 변경 정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/100] "I2861"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 100.0% (157/157, row 1000)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "음식점업소 인허가 변경 정보" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 100.0%, 매칭 고유값 157개, 매칭 row 1000건
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1200" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0060"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "I0680"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.3% (2/758, row 2)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "위생관리등급별 업소 현황" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 0.3%, 매칭 고유값 2개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I0680"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/758, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "위생관리등급별 업소 현황" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2827"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식육즉석판매가공업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2827"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2821"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "수입식품업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2821"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "수입식품업 폐업정보" → "식품등수입판매업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2817"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/600, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품보존업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2817"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/600, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품보존업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2822"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "건강기능식품 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2815"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품소분업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2815"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품소분업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2814"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품운반업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2814"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품운반업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2813"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품첨가물제조업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2813"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품첨가물제조업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [SUGGESTED/100] "I2811"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.1% (1/1000, row 1)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품제조가공업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.1%, 매칭 고유값 1개 — 확정 기준(3.0%, 3개) 미달
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [UNVERIFIED/100] "I2811"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품제조가공업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2818"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "용기.포장류제조업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2823"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "위생용품 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2823"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "위생용품 폐업정보" → "위생용품영업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2816"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품판매업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2816"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품판매업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2820"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "집단급식소 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2820"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "집단급식소 폐업정보" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2824"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 가공업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2824"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물 가공업 폐업정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2819"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품접객업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2819"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1200의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "식품접객업 폐업정보" → "식품접객업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2812"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "즉석판매제조가공업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2812"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "즉석판매제조가공업 폐업정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2825"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 식육포장처리업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2825"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물 식육포장처리업 폐업정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2828"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2828"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2826"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "축산물 판매업 폐업정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/100] "I2826"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 가산점 +20 / 업무 명칭 규칙: "축산물 판매업 폐업정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/93] "I0960"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/329, row 0)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/93] "I0940"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/56, row 0)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/93] "I0950"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/24, row 0)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/93] "I2854"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/382, row 0)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [HIGH/85] "I2640"."RTRVLDSUSE_SEQ" -> "I0490"."RTRVLDSUSE_SEQ"
-- 값 포함률: 5.2% (12/232, row 14)
-- 사유: 대상 테이블 I0490의 PK 후보(HIGH)와 동일 필드 / 값 포함률 5.2%, 매칭 고유값 12개, 매칭 row 14건
-- FOREIGN KEY ("RTRVLDSUSE_SEQ") REFERENCES "I0490" ("RTRVLDSUSE_SEQ")

-- FK 후보 [HIGH/85] "I2620"."RTRVLDSUSE_SEQ" -> "I0490"."RTRVLDSUSE_SEQ"
-- 값 포함률: 12.9% (44/340, row 52)
-- 사유: 대상 테이블 I0490의 PK 후보(HIGH)와 동일 필드 / 값 포함률 12.9%, 매칭 고유값 44개, 매칭 row 52건
-- FOREIGN KEY ("RTRVLDSUSE_SEQ") REFERENCES "I0490" ("RTRVLDSUSE_SEQ")

-- FK 후보 [UNVERIFIED/83] "I2570"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464, row 0)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2570"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464, row 0)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2640"."BRCDNO" -> "I2570"."BRCD_NO"
-- 값 포함률: 0.0% (0/16, row 0)
-- 사유: 필드명 유사 매칭 유사도 100% (정규화 기준, -0점) / 대상 테이블 I2570의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2620"."BRCDNO" -> "I2570"."BRCD_NO"
-- 값 포함률: 0.0% (0/59, row 0)
-- 사유: 필드명 유사 매칭 유사도 100% (정규화 기준, -0점) / 대상 테이블 I2570의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2620"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52, row 0)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0490"."BRCDNO" -> "I2570"."BRCD_NO"
-- 값 포함률: 0.0% (0/163, row 0)
-- 사유: 필드명 유사 매칭 유사도 100% (정규화 기준, -0점) / 대상 테이블 I2570의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0490"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/154, row 0)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2852"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I-0010"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/3, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2856"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2711"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/43, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2851"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/171, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1420"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/33, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1340"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1350"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "C006"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/115, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0310"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/18, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2712"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/161, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I-0020"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/552, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0030"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/141, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "C003"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/30, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1290"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "C001"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1240"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0250"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/40, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I2847"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/989, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0300"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/54, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I1590"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/807, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "C004"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/83] "I0060"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/78] "I2610"."CMMN_SPEC_CD" -> "I2590"."CMMN_SPEC_CD"
-- 값 포함률: 0.0% (0/6, row 0)
-- 사유: 대상 테이블 I2590의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- FK 후보 [UNVERIFIED/72] "I1790"."HIST_TRACE_REG_NO" -> "I1800"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.8% (8/1000, row 8)
-- 사유: 대상 테이블 I1800의 PK 후보(HIGH)와 동일 필드 / 값 포함률 0.8%, 매칭 고유값 8개 — 확정 기준(3.0%, 3개) 미달

-- FK 후보 [UNVERIFIED/68] "I0990"."LIMIT_STDR_STND_RCOGN_NO" -> "I1010"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/14, row 0)
-- 사유: 대상 테이블 I1010의 PK 후보(HIGH)와 동일 필드 / 데이터셋명 도메인 유사성 가산점 +20 / 값 포함률 낮음 0.0% — UNVERIFIED 분류

-- =============================================================================
-- 제외된 FK 후보 목록 (검토용 주석)
-- =============================================================================

-- 제외 FK 후보 "I0990"."LIMIT_STDR_STND_RCOGN_NO" -> "I0980"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/14, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 42점으로 기준 미달

-- 제외 FK 후보 "I0990"."LIMIT_STDR_STND_RCOGN_NO" -> "I1000"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1010"."LIMIT_STDR_STND_RCOGN_NO" -> "I0980"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/2, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 42점으로 기준 미달

-- 제외 FK 후보 "I1010"."LIMIT_STDR_STND_RCOGN_NO" -> "I1000"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0980"."LIMIT_STDR_STND_RCOGN_NO" -> "I0990"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/82, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I0980"."LIMIT_STDR_STND_RCOGN_NO" -> "I1010"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/82, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 48점으로 기준 미달

-- 제외 FK 후보 "I0980"."LIMIT_STDR_STND_RCOGN_NO" -> "I1000"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/82, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1000"."LIMIT_STDR_STND_RCOGN_NO" -> "I0990"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1000"."LIMIT_STDR_STND_RCOGN_NO" -> "I1010"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1000"."LIMIT_STDR_STND_RCOGN_NO" -> "I0980"."LIMIT_STDR_STND_RCOGN_NO"
-- 값 포함률: 0.0% (0/61, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 42점으로 기준 미달

-- 제외 FK 후보 "I0910"."PRSEC_INSTT_RCOGN_NO" -> "I0890"."PRSEC_INSTT_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 국외기관 ↔ 국내기관 번호 체계 교차 방지 (spurious match 가능성)

-- 제외 FK 후보 "I0890"."PRSEC_INSTT_RCOGN_NO" -> "I0910"."PRSEC_INSTT_RCOGN_NO"
-- 값 포함률: 미검증
-- 제외 사유: 국외기관 ↔ 국내기관 번호 체계 교차 방지 (spurious match 가능성)

-- 제외 FK 후보 "I2640"."RTRVLDSUSE_SEQ" -> "I2620"."RTRVLDSUSE_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2620"."RTRVLDSUSE_SEQ" -> "I2640"."RTRVLDSUSE_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0470"."DSPSDTLS_SEQ" -> "I2630"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0470"."DSPSDTLS_SEQ" -> "I0482"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0470"."DSPSDTLS_SEQ" -> "I0480"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0470"."DSPSDTLS_SEQ" -> "I0481"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."DSPSDTLS_SEQ" -> "I0470"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."DSPSDTLS_SEQ" -> "I0482"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."DSPSDTLS_SEQ" -> "I0480"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2630"."DSPSDTLS_SEQ" -> "I0481"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."DSPSDTLS_SEQ" -> "I0470"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."DSPSDTLS_SEQ" -> "I2630"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."DSPSDTLS_SEQ" -> "I0480"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0482"."DSPSDTLS_SEQ" -> "I0481"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."DSPSDTLS_SEQ" -> "I0470"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."DSPSDTLS_SEQ" -> "I2630"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."DSPSDTLS_SEQ" -> "I0482"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0480"."DSPSDTLS_SEQ" -> "I0481"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."DSPSDTLS_SEQ" -> "I0470"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."DSPSDTLS_SEQ" -> "I2630"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."DSPSDTLS_SEQ" -> "I0482"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0481"."DSPSDTLS_SEQ" -> "I0480"."DSPSDTLS_SEQ"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1830"."ENTTY_IDNTFC_NO" -> "I1810"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/939, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1830"."ENTTY_IDNTFC_NO" -> "I1820"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/939, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1810"."ENTTY_IDNTFC_NO" -> "I1830"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1810"."ENTTY_IDNTFC_NO" -> "I1820"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/1000, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1920"."HIST_TRACE_REG_NO" -> "I1790"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/263, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1920"."HIST_TRACE_REG_NO" -> "I1800"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/263, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 47점으로 기준 미달

-- 제외 FK 후보 "I1930"."HIST_TRACE_REG_NO" -> "I1790"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/5, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1930"."HIST_TRACE_REG_NO" -> "I1800"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/5, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 47점으로 기준 미달

-- 제외 FK 후보 "I1940"."HIST_TRACE_REG_NO" -> "I1790"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/91, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1940"."HIST_TRACE_REG_NO" -> "I1800"."HIST_TRACE_REG_NO"
-- 값 포함률: 0.0% (0/91, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 47점으로 기준 미달

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0580"."HACCP_APPN_NO" -> "I0610"."HACCP_APPN_NO"
-- 값 포함률: 0.0% (0/916, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0610"."HACCP_APPN_NO" -> "I0580"."HACCP_APPN_NO"
-- 값 포함률: 0.0% (0/974, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1820"."ENTTY_IDNTFC_NO" -> "I1830"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/990, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1820"."ENTTY_IDNTFC_NO" -> "I1810"."ENTTY_IDNTFC_NO"
-- 값 포함률: 0.0% (0/990, row 0)
-- 제외 사유: UNVERIFIED 후보 점수 50점으로 기준 미달

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1200"."LCNS_NO"
-- 값 포함률: 미검증
-- 제외 사유: 이기종 도메인 교차 연결 제한 (Root Domain 불일치)
