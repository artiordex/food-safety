-- =============================================================================
-- 식품안전나라 Open API PK/FK 후보 ERD DDL (전체 후보 무제한 연결 버전)
-- 목적: CONFIRMED 및 SUGGESTED를 포함한 모든 PK/FK 후보를 무제한 실선 연결
-- 정책: 모든 PK 후보를 PRIMARY KEY로 지정, 모든 FK 후보를 FOREIGN KEY 제약조건으로 주석 없이 실선 연결
-- =============================================================================

PRAGMA foreign_keys = ON;

-- -----------------------------------------------------------------------------
-- 1471000 / 식품영양성분 DB정보
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "1471000" (
  "NUM" VARCHAR(100), -- NUM / NUM
  "FOOD_CD" VARCHAR(100), -- FOOD_CD / FOOD_CD / PK 후보(HIGH)
  "FOOD_NM_KR" VARCHAR(100), -- FOOD_NM_KR / FOOD_NM_KR
  "DB_GRP_CM" VARCHAR(100), -- DB_GRP_CM / DB_GRP_CM
  "DB_GRP_NM" VARCHAR(100), -- DB_GRP_NM / DB_GRP_NM
  "DB_CLASS_CM" VARCHAR(100), -- DB_CLASS_CM / DB_CLASS_CM
  "DB_CLASS_NM" VARCHAR(100), -- DB_CLASS_NM / DB_CLASS_NM
  "FOOD_OR_CD" VARCHAR(100), -- FOOD_OR_CD / FOOD_OR_CD
  "FOOD_OR_NM" VARCHAR(100), -- FOOD_OR_NM / FOOD_OR_NM
  "FOOD_CAT1_CD" VARCHAR(100), -- FOOD_CAT1_CD / FOOD_CAT1_CD
  "FOOD_CAT1_NM" VARCHAR(100), -- FOOD_CAT1_NM / FOOD_CAT1_NM
  "FOOD_REF_CD" VARCHAR(100), -- FOOD_REF_CD / FOOD_REF_CD
  "FOOD_REF_NM" VARCHAR(100), -- FOOD_REF_NM / FOOD_REF_NM
  "FOOD_CAT2_CD" VARCHAR(100), -- FOOD_CAT2_CD / FOOD_CAT2_CD
  "FOOD_CAT2_NM" VARCHAR(100), -- FOOD_CAT2_NM / FOOD_CAT2_NM
  "FOOD_CAT3_CD" VARCHAR(100), -- FOOD_CAT3_CD / FOOD_CAT3_CD
  "FOOD_CAT3_NM" VARCHAR(100), -- FOOD_CAT3_NM / FOOD_CAT3_NM
  "FOOD_CAT4_CD" VARCHAR(100), -- FOOD_CAT4_CD / FOOD_CAT4_CD
  "FOOD_CAT4_NM" VARCHAR(100), -- FOOD_CAT4_NM / FOOD_CAT4_NM
  "SERVING_SIZE" VARCHAR(100), -- SERVING_SIZE / SERVING_SIZE
  "AMT_NUM1" VARCHAR(100), -- AMT_NUM1 / AMT_NUM1
  "AMT_NUM2" VARCHAR(100), -- AMT_NUM2 / AMT_NUM2
  "AMT_NUM3" VARCHAR(100), -- AMT_NUM3 / AMT_NUM3
  "AMT_NUM4" VARCHAR(100), -- AMT_NUM4 / AMT_NUM4
  "AMT_NUM5" VARCHAR(100), -- AMT_NUM5 / AMT_NUM5
  "AMT_NUM6" VARCHAR(100), -- AMT_NUM6 / AMT_NUM6
  "AMT_NUM7" VARCHAR(100), -- AMT_NUM7 / AMT_NUM7
  "AMT_NUM8" VARCHAR(100), -- AMT_NUM8 / AMT_NUM8
  "AMT_NUM9" VARCHAR(100), -- AMT_NUM9 / AMT_NUM9
  "AMT_NUM10" VARCHAR(100), -- AMT_NUM10 / AMT_NUM10
  "AMT_NUM11" VARCHAR(100), -- AMT_NUM11 / AMT_NUM11
  "AMT_NUM12" VARCHAR(100), -- AMT_NUM12 / AMT_NUM12
  "AMT_NUM13" VARCHAR(100), -- AMT_NUM13 / AMT_NUM13
  "AMT_NUM14" VARCHAR(100), -- AMT_NUM14 / AMT_NUM14
  "AMT_NUM15" VARCHAR(100), -- AMT_NUM15 / AMT_NUM15
  "AMT_NUM16" VARCHAR(100), -- AMT_NUM16 / AMT_NUM16
  "AMT_NUM17" VARCHAR(100), -- AMT_NUM17 / AMT_NUM17
  "AMT_NUM18" VARCHAR(100), -- AMT_NUM18 / AMT_NUM18
  "AMT_NUM19" VARCHAR(100), -- AMT_NUM19 / AMT_NUM19
  "AMT_NUM20" VARCHAR(100), -- AMT_NUM20 / AMT_NUM20
  "AMT_NUM21" VARCHAR(100), -- AMT_NUM21 / AMT_NUM21
  "AMT_NUM22" VARCHAR(100), -- AMT_NUM22 / AMT_NUM22
  "AMT_NUM23" VARCHAR(100), -- AMT_NUM23 / AMT_NUM23
  "AMT_NUM24" VARCHAR(100), -- AMT_NUM24 / AMT_NUM24
  "AMT_NUM25" VARCHAR(100), -- AMT_NUM25 / AMT_NUM25
  "AMT_NUM26" VARCHAR(100), -- AMT_NUM26 / AMT_NUM26
  "AMT_NUM27" VARCHAR(100), -- AMT_NUM27 / AMT_NUM27
  "AMT_NUM28" VARCHAR(100), -- AMT_NUM28 / AMT_NUM28
  "AMT_NUM29" VARCHAR(100), -- AMT_NUM29 / AMT_NUM29
  "AMT_NUM30" VARCHAR(100), -- AMT_NUM30 / AMT_NUM30
  "AMT_NUM31" VARCHAR(100), -- AMT_NUM31 / AMT_NUM31
  "AMT_NUM32" VARCHAR(100), -- AMT_NUM32 / AMT_NUM32
  "AMT_NUM33" VARCHAR(100), -- AMT_NUM33 / AMT_NUM33
  "AMT_NUM34" VARCHAR(100), -- AMT_NUM34 / AMT_NUM34
  "AMT_NUM35" VARCHAR(100), -- AMT_NUM35 / AMT_NUM35
  "AMT_NUM36" VARCHAR(100), -- AMT_NUM36 / AMT_NUM36
  "AMT_NUM37" VARCHAR(100), -- AMT_NUM37 / AMT_NUM37
  "AMT_NUM38" VARCHAR(100), -- AMT_NUM38 / AMT_NUM38
  "AMT_NUM39" VARCHAR(100), -- AMT_NUM39 / AMT_NUM39
  "AMT_NUM40" VARCHAR(100), -- AMT_NUM40 / AMT_NUM40
  "AMT_NUM41" VARCHAR(100), -- AMT_NUM41 / AMT_NUM41
  "AMT_NUM42" VARCHAR(100), -- AMT_NUM42 / AMT_NUM42
  "AMT_NUM43" VARCHAR(100), -- AMT_NUM43 / AMT_NUM43
  "AMT_NUM44" VARCHAR(100), -- AMT_NUM44 / AMT_NUM44
  "AMT_NUM45" VARCHAR(100), -- AMT_NUM45 / AMT_NUM45
  "AMT_NUM46" VARCHAR(100), -- AMT_NUM46 / AMT_NUM46
  "AMT_NUM47" VARCHAR(100), -- AMT_NUM47 / AMT_NUM47
  "AMT_NUM48" VARCHAR(100), -- AMT_NUM48 / AMT_NUM48
  "AMT_NUM49" VARCHAR(100), -- AMT_NUM49 / AMT_NUM49
  "AMT_NUM50" VARCHAR(100), -- AMT_NUM50 / AMT_NUM50
  "AMT_NUM51" VARCHAR(100), -- AMT_NUM51 / AMT_NUM51
  "AMT_NUM52" VARCHAR(100), -- AMT_NUM52 / AMT_NUM52
  "AMT_NUM53" VARCHAR(100), -- AMT_NUM53 / AMT_NUM53
  "AMT_NUM54" VARCHAR(100), -- AMT_NUM54 / AMT_NUM54
  "AMT_NUM55" VARCHAR(100), -- AMT_NUM55 / AMT_NUM55
  "AMT_NUM56" VARCHAR(100), -- AMT_NUM56 / AMT_NUM56
  "AMT_NUM57" VARCHAR(100), -- AMT_NUM57 / AMT_NUM57
  "AMT_NUM58" VARCHAR(100), -- AMT_NUM58 / AMT_NUM58
  "AMT_NUM59" VARCHAR(100), -- AMT_NUM59 / AMT_NUM59
  "AMT_NUM60" VARCHAR(100), -- AMT_NUM60 / AMT_NUM60
  "AMT_NUM61" VARCHAR(100), -- AMT_NUM61 / AMT_NUM61
  "AMT_NUM62" VARCHAR(100), -- AMT_NUM62 / AMT_NUM62
  "AMT_NUM63" VARCHAR(100), -- AMT_NUM63 / AMT_NUM63
  "AMT_NUM64" VARCHAR(100), -- AMT_NUM64 / AMT_NUM64
  "AMT_NUM65" VARCHAR(100), -- AMT_NUM65 / AMT_NUM65
  "AMT_NUM66" VARCHAR(100), -- AMT_NUM66 / AMT_NUM66
  "AMT_NUM67" VARCHAR(100), -- AMT_NUM67 / AMT_NUM67
  "AMT_NUM68" VARCHAR(100), -- AMT_NUM68 / AMT_NUM68
  "AMT_NUM69" VARCHAR(100), -- AMT_NUM69 / AMT_NUM69
  "AMT_NUM70" VARCHAR(100), -- AMT_NUM70 / AMT_NUM70
  "AMT_NUM71" VARCHAR(100), -- AMT_NUM71 / AMT_NUM71
  "AMT_NUM72" VARCHAR(100), -- AMT_NUM72 / AMT_NUM72
  "AMT_NUM73" VARCHAR(100), -- AMT_NUM73 / AMT_NUM73
  "AMT_NUM74" VARCHAR(100), -- AMT_NUM74 / AMT_NUM74
  "AMT_NUM75" VARCHAR(100), -- AMT_NUM75 / AMT_NUM75
  "AMT_NUM76" VARCHAR(100), -- AMT_NUM76 / AMT_NUM76
  "AMT_NUM77" VARCHAR(100), -- AMT_NUM77 / AMT_NUM77
  "AMT_NUM78" VARCHAR(100), -- AMT_NUM78 / AMT_NUM78
  "AMT_NUM79" VARCHAR(100), -- AMT_NUM79 / AMT_NUM79
  "AMT_NUM80" VARCHAR(100), -- AMT_NUM80 / AMT_NUM80
  "AMT_NUM81" VARCHAR(100), -- AMT_NUM81 / AMT_NUM81
  "AMT_NUM82" VARCHAR(100), -- AMT_NUM82 / AMT_NUM82
  "AMT_NUM83" VARCHAR(100), -- AMT_NUM83 / AMT_NUM83
  "AMT_NUM84" VARCHAR(100), -- AMT_NUM84 / AMT_NUM84
  "AMT_NUM85" VARCHAR(100), -- AMT_NUM85 / AMT_NUM85
  "AMT_NUM86" VARCHAR(100), -- AMT_NUM86 / AMT_NUM86
  "AMT_NUM87" VARCHAR(100), -- AMT_NUM87 / AMT_NUM87
  "AMT_NUM88" VARCHAR(100), -- AMT_NUM88 / AMT_NUM88
  "AMT_NUM89" VARCHAR(100), -- AMT_NUM89 / AMT_NUM89
  "AMT_NUM90" VARCHAR(100), -- AMT_NUM90 / AMT_NUM90
  "AMT_NUM91" VARCHAR(100), -- AMT_NUM91 / AMT_NUM91
  "AMT_NUM92" VARCHAR(100), -- AMT_NUM92 / AMT_NUM92
  "AMT_NUM93" VARCHAR(100), -- AMT_NUM93 / AMT_NUM93
  "AMT_NUM94" VARCHAR(100), -- AMT_NUM94 / AMT_NUM94
  "AMT_NUM95" VARCHAR(100), -- AMT_NUM95 / AMT_NUM95
  "AMT_NUM96" VARCHAR(100), -- AMT_NUM96 / AMT_NUM96
  "AMT_NUM97" VARCHAR(100), -- AMT_NUM97 / AMT_NUM97
  "AMT_NUM98" VARCHAR(100), -- AMT_NUM98 / AMT_NUM98
  "AMT_NUM99" VARCHAR(100), -- AMT_NUM99 / AMT_NUM99
  "AMT_NUM100" VARCHAR(100), -- AMT_NUM100 / AMT_NUM100
  "AMT_NUM101" VARCHAR(100), -- AMT_NUM101 / AMT_NUM101
  "AMT_NUM102" VARCHAR(100), -- AMT_NUM102 / AMT_NUM102
  "AMT_NUM103" VARCHAR(100), -- AMT_NUM103 / AMT_NUM103
  "AMT_NUM104" VARCHAR(100), -- AMT_NUM104 / AMT_NUM104
  "AMT_NUM105" VARCHAR(100), -- AMT_NUM105 / AMT_NUM105
  "AMT_NUM106" VARCHAR(100), -- AMT_NUM106 / AMT_NUM106
  "AMT_NUM107" VARCHAR(100), -- AMT_NUM107 / AMT_NUM107
  "AMT_NUM108" VARCHAR(100), -- AMT_NUM108 / AMT_NUM108
  "AMT_NUM109" VARCHAR(100), -- AMT_NUM109 / AMT_NUM109
  "AMT_NUM110" VARCHAR(100), -- AMT_NUM110 / AMT_NUM110
  "AMT_NUM111" VARCHAR(100), -- AMT_NUM111 / AMT_NUM111
  "AMT_NUM112" VARCHAR(100), -- AMT_NUM112 / AMT_NUM112
  "AMT_NUM113" VARCHAR(100), -- AMT_NUM113 / AMT_NUM113
  "AMT_NUM114" VARCHAR(100), -- AMT_NUM114 / AMT_NUM114
  "AMT_NUM115" VARCHAR(100), -- AMT_NUM115 / AMT_NUM115
  "AMT_NUM116" VARCHAR(100), -- AMT_NUM116 / AMT_NUM116
  "AMT_NUM117" VARCHAR(100), -- AMT_NUM117 / AMT_NUM117
  "AMT_NUM118" VARCHAR(100), -- AMT_NUM118 / AMT_NUM118
  "AMT_NUM119" VARCHAR(100), -- AMT_NUM119 / AMT_NUM119
  "AMT_NUM120" VARCHAR(100), -- AMT_NUM120 / AMT_NUM120
  "AMT_NUM121" VARCHAR(100), -- AMT_NUM121 / AMT_NUM121
  "AMT_NUM122" VARCHAR(100), -- AMT_NUM122 / AMT_NUM122
  "AMT_NUM123" VARCHAR(100), -- AMT_NUM123 / AMT_NUM123
  "AMT_NUM124" VARCHAR(100), -- AMT_NUM124 / AMT_NUM124
  "AMT_NUM125" VARCHAR(100), -- AMT_NUM125 / AMT_NUM125
  "AMT_NUM126" VARCHAR(100), -- AMT_NUM126 / AMT_NUM126
  "AMT_NUM127" VARCHAR(100), -- AMT_NUM127 / AMT_NUM127
  "AMT_NUM128" VARCHAR(100), -- AMT_NUM128 / AMT_NUM128
  "AMT_NUM129" VARCHAR(100), -- AMT_NUM129 / AMT_NUM129
  "AMT_NUM130" VARCHAR(100), -- AMT_NUM130 / AMT_NUM130
  "AMT_NUM131" VARCHAR(100), -- AMT_NUM131 / AMT_NUM131
  "AMT_NUM132" VARCHAR(100), -- AMT_NUM132 / AMT_NUM132
  "AMT_NUM133" VARCHAR(100), -- AMT_NUM133 / AMT_NUM133
  "AMT_NUM134" VARCHAR(100), -- AMT_NUM134 / AMT_NUM134
  "AMT_NUM135" VARCHAR(100), -- AMT_NUM135 / AMT_NUM135
  "AMT_NUM136" VARCHAR(100), -- AMT_NUM136 / AMT_NUM136
  "AMT_NUM137" VARCHAR(100), -- AMT_NUM137 / AMT_NUM137
  "AMT_NUM138" VARCHAR(100), -- AMT_NUM138 / AMT_NUM138
  "AMT_NUM139" VARCHAR(100), -- AMT_NUM139 / AMT_NUM139
  "AMT_NUM140" VARCHAR(100), -- AMT_NUM140 / AMT_NUM140
  "AMT_NUM141" VARCHAR(100), -- AMT_NUM141 / AMT_NUM141
  "AMT_NUM142" VARCHAR(100), -- AMT_NUM142 / AMT_NUM142
  "AMT_NUM143" VARCHAR(100), -- AMT_NUM143 / AMT_NUM143
  "AMT_NUM144" VARCHAR(100), -- AMT_NUM144 / AMT_NUM144
  "AMT_NUM145" VARCHAR(100), -- AMT_NUM145 / AMT_NUM145
  "AMT_NUM146" VARCHAR(100), -- AMT_NUM146 / AMT_NUM146
  "AMT_NUM147" VARCHAR(100), -- AMT_NUM147 / AMT_NUM147
  "AMT_NUM148" VARCHAR(100), -- AMT_NUM148 / AMT_NUM148
  "AMT_NUM149" VARCHAR(100), -- AMT_NUM149 / AMT_NUM149
  "AMT_NUM150" VARCHAR(100), -- AMT_NUM150 / AMT_NUM150
  "AMT_NUM151" VARCHAR(100), -- AMT_NUM151 / AMT_NUM151
  "AMT_NUM152" VARCHAR(100), -- AMT_NUM152 / AMT_NUM152
  "AMT_NUM153" VARCHAR(100), -- AMT_NUM153 / AMT_NUM153
  "AMT_NUM154" VARCHAR(100), -- AMT_NUM154 / AMT_NUM154
  "AMT_NUM155" VARCHAR(100), -- AMT_NUM155 / AMT_NUM155
  "AMT_NUM156" VARCHAR(100), -- AMT_NUM156 / AMT_NUM156
  "AMT_NUM157" VARCHAR(100), -- AMT_NUM157 / AMT_NUM157
  "SUB_REF_CM" VARCHAR(100), -- SUB_REF_CM / SUB_REF_CM
  "SUB_REF_NAME" VARCHAR(100), -- SUB_REF_NAME / SUB_REF_NAME
  "NUTRI_AMOUNT_SERVING" VARCHAR(100), -- NUTRI_AMOUNT_SERVING / NUTRI_AMOUNT_SERVING
  "Z10500" VARCHAR(100), -- Z10500 / Z10500
  "DISH_ONE_SERVING" VARCHAR(100), -- DISH_ONE_SERVING / DISH_ONE_SERVING
  "ITEM_REPORT_NO" VARCHAR(100), -- ITEM_REPORT_NO / ITEM_REPORT_NO
  "MAKER_NM" VARCHAR(100), -- MAKER_NM / MAKER_NM
  "IMP_MANUFAC_NM" VARCHAR(100), -- IMP_MANUFAC_NM / IMP_MANUFAC_NM
  "SELLER_MANUFAC_NM" VARCHAR(100), -- SELLER_MANUFAC_NM / SELLER_MANUFAC_NM
  "IMP_YN" VARCHAR(100), -- IMP_YN / IMP_YN
  "NATION_CM" VARCHAR(100), -- NATION_CM / NATION_CM
  "NATION_NM" VARCHAR(100), -- NATION_NM / NATION_NM
  "CRT_MTH_CD" VARCHAR(100), -- CRT_MTH_CD / CRT_MTH_CD
  "CRT_MTH_NM" VARCHAR(100), -- CRT_MTH_NM / CRT_MTH_NM
  "RESEARCH_YMD" VARCHAR(100), -- RESEARCH_YMD / RESEARCH_YMD
  "UPDATE_DATE" VARCHAR(100), -- UPDATE_DATE / UPDATE_DATE
  PRIMARY KEY ("FOOD_CD")
);

-- -----------------------------------------------------------------------------
-- I2580 / 개별기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2580" (
  "INDV_SPEC_SEQ" NUMERIC(18,0), -- INDV_SPEC_SEQ / 개별기준규격일련번호 / PK 후보(HIGH)
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목분류코드
  "PRDLST_CD_NM" VARCHAR(200), -- PRDLST_CD_NM / 품목명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 53.4%)
  "TESTITM_NM" VARCHAR(200), -- TESTITM_NM / 시험항목명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "ATTRB_SEQ" NUMERIC(18,0), -- ATTRB_SEQ / 단서조항일련번호
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 단서조항명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격
  "SPEC_VAL_SUMUP" VARCHAR(2000), -- SPEC_VAL_SUMUP / 기준규격요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일
  "SORC" VARCHAR(1000), -- SORC / 출처
  "VALD_MANLI" NUMERIC(18,4), -- VALD_MANLI / 유효자리
  "JDGMNT_FOM_CD" VARCHAR(30), -- JDGMNT_FOM_CD / 판정형식코드
  "A079_FNPRT_CD_NM" VARCHAR(200), -- A079_FNPRT_CD_NM / 판정형식명
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MXMM_VAL_DVS_CD" VARCHAR(30), -- MXMM_VAL_DVS_CD / 최대값구분코드
  "A081_FNPRT_CD_NM" VARCHAR(200), -- A081_FNPRT_CD_NM / 최대값구분명
  "MIMM_VAL" NUMERIC(18,4), -- MIMM_VAL / 최소값
  "MIMM_VAL_DVS_CD" VARCHAR(30), -- MIMM_VAL_DVS_CD / 최소값구분코드
  "A080_FNPRT_CD_NM" VARCHAR(200), -- A080_FNPRT_CD_NM / 최소값구분명
  "CHOIC_FIT" VARCHAR(30), -- CHOIC_FIT / 선택형적합코드
  "A082_CF_FNPRT_CD_NM" VARCHAR(200), -- A082_CF_FNPRT_CD_NM / 선택형적합명
  "CHOIC_IMPROPT" VARCHAR(30), -- CHOIC_IMPROPT / 선택형부적합코드
  "A082_CI_FNPRT_CD_NM" VARCHAR(200), -- A082_CI_FNPRT_CD_NM / 선택형부적합명
  "MCRRGNSM_2N" VARCHAR(500), -- MCRRGNSM_2N / 미생물2N
  "MCRRGNSM_2C" VARCHAR(500), -- MCRRGNSM_2C / 미생물2C
  "MCRRGNSM_2M" VARCHAR(500), -- MCRRGNSM_2M / 미생물2M
  "MCRRGNSM_3M" VARCHAR(500), -- MCRRGNSM_3M / 미생물3M
  "FNPRT_ITM_INCLS_YN" VARCHAR(1), -- FNPRT_ITM_INCLS_YN / 세부항목포함여부
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "EMPHS_PRSEC_TESTITM_YN" VARCHAR(1), -- EMPHS_PRSEC_TESTITM_YN / 중점검사시험항목여부
  "MONTRNG_TESTITM_YN" VARCHAR(1), -- MONTRNG_TESTITM_YN / 감시시험항목여부
  "RVLV_ELSE_TESTITM_YN" VARCHAR(1), -- RVLV_ELSE_TESTITM_YN / 공전외시험항목여부
  "NTR_PRSEC_ITM_YN" VARCHAR(1), -- NTR_PRSEC_ITM_YN / 자품검사시험항목여부
  "UNIT_CD" VARCHAR(30), -- UNIT_CD / 단위코드
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(1000), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("INDV_SPEC_SEQ"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I0960 / 건강기능식품공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0960" (
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 60.9%)
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,4), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2600 / 공통기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2600" (
  "CMMN_SPEC_SEQ" NUMERIC(18,0), -- CMMN_SPEC_SEQ / 공통기준종류코드일련번호 / PK 후보(HIGH)
  "CMMN_SPEC_CD" VARCHAR(30), -- CMMN_SPEC_CD / 공통기준종류코드 / FK 후보: I2590.CMMN_SPEC_CD(HIGH, 100.0%)
  "SPEC_NM" VARCHAR(200), -- SPEC_NM / 공통기준종류명
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목분류코드 / FK 후보: I2510.PRDLST_CD(HIGH, 31.7%)
  "PRDLST_CD_NM" VARCHAR(200), -- PRDLST_CD_NM / 품목명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 5.4%)
  "TESTITM_NM" VARCHAR(200), -- TESTITM_NM / 시험항목명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "ATTRB_SEQ" NUMERIC(18,0), -- ATTRB_SEQ / 단서조항일련번호
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 단서조항명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격
  "SPEC_VAL_SUMUP" VARCHAR(300), -- SPEC_VAL_SUMUP / 기준규격요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일
  "SORC" VARCHAR(1000), -- SORC / 출처
  "VALD_MANLI" NUMERIC(18,4), -- VALD_MANLI / 유효자리
  "JDGMNT_FOM_CD" VARCHAR(30), -- JDGMNT_FOM_CD / 판정형식코드
  "A079_FNPRT_CD_NM" VARCHAR(200), -- A079_FNPRT_CD_NM / 판정형식명
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MXMM_VAL_DVS_CD" VARCHAR(30), -- MXMM_VAL_DVS_CD / 최대값구분코드
  "A081_FNPRT_CD_NM" VARCHAR(200), -- A081_FNPRT_CD_NM / 최대값구분명
  "MIMM_VAL" NUMERIC(18,0), -- MIMM_VAL / 최소값
  "MIMM_VAL_DVS_CD" VARCHAR(30), -- MIMM_VAL_DVS_CD / 최소값구분코드
  "A080_FNPRT_CD_NM" NUMERIC(18,4), -- A080_FNPRT_CD_NM / 최소값구분명
  "CHOIC_FIT" VARCHAR(30), -- CHOIC_FIT / 선택형적합코드
  "A082_CF_FNPRT_CD_NM" VARCHAR(200), -- A082_CF_FNPRT_CD_NM / 선택형적합명
  "CHOIC_IMPROPT" VARCHAR(30), -- CHOIC_IMPROPT / 선택형부적합코드
  "A082_CI_FNPRT_CD_NM" VARCHAR(200), -- A082_CI_FNPRT_CD_NM / 선택형부적합명
  "MCRRGNSM_2N" NUMERIC(18,0), -- MCRRGNSM_2N / 미생물2N
  "MCRRGNSM_2C" NUMERIC(18,0), -- MCRRGNSM_2C / 미생물2C
  "MCRRGNSM_2M" VARCHAR(100), -- MCRRGNSM_2M / 미생물2M
  "MCRRGNSM_3M" NUMERIC(18,0), -- MCRRGNSM_3M / 미생물3M
  "FNPRT_ITM_INCLS_YN" VARCHAR(1), -- FNPRT_ITM_INCLS_YN / 세부항목포함여부
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "EMPHS_PRSEC_TESTITM_YN" VARCHAR(1), -- EMPHS_PRSEC_TESTITM_YN / 중점검사시험항목여부
  "MONTRNG_TESTITM_YN" VARCHAR(1), -- MONTRNG_TESTITM_YN / 감시시험항목여부
  "RVLV_ELSE_TESTITM_YN" VARCHAR(1), -- RVLV_ELSE_TESTITM_YN / 공전외시험항목여부
  "NTR_PRSEC_ITM_YN" VARCHAR(1), -- NTR_PRSEC_ITM_YN / 자품검사시험항목여부
  "UNIT_CD" VARCHAR(30), -- UNIT_CD / 단위코드
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(1000), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("CMMN_SPEC_SEQ"),
  FOREIGN KEY ("CMMN_SPEC_CD") REFERENCES "I2590" ("CMMN_SPEC_CD"),
  FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2610 / 공통기준제외
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2610" (
  "CMMN_SPEC_CD" VARCHAR(30), -- CMMN_SPEC_CD / 공통기준규격코드
  "SPEC_NM" VARCHAR(200), -- SPEC_NM / 기준규격명
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드 / FK 후보: I2510.PRDLST_CD(HIGH, 12.5%)
  "KOR_NM" VARCHAR(200), -- KOR_NM / 한글명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 57.1%)
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD"),
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2590 / 공통기준종류
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2590" (
  "CMMN_SPEC_CD" VARCHAR(30), -- CMMN_SPEC_CD / 공통기준규격코드 / PK 후보(HIGH)
  "SPEC_NM" VARCHAR(200), -- SPEC_NM / 기준규격명
  "HRNK_CMMN_SPEC_CD" VARCHAR(30), -- HRNK_CMMN_SPEC_CD / 상위공통기준규격코드
  "LV" NUMERIC(18,0), -- LV / 레벨
  "DFN" VARCHAR(2000), -- DFN / 정의
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("CMMN_SPEC_CD")
);

-- -----------------------------------------------------------------------------
-- I1660 / 과징금부과기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1660" (
  "DSPS_STDR_CD_NM" VARCHAR(300), -- DSPS_STDR_CD_NM / 처분기준명
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 식품법령
  "BASIS_LAWORD" VARCHAR(100), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_NM" VARCHAR(30), -- VILT_TYPE_NM / 위반유형
  "LV_NO" NUMERIC(18,0), -- LV_NO / 레벨
  "VALD_BGN_DT" DATE, -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" DATE -- VALD_END_DT / 유효종료일자
);

-- -----------------------------------------------------------------------------
-- I1670 / 과태료부과기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1670" (
  "DSPS_STDR_CD" VARCHAR(30), -- DSPS_STDR_CD / 처분기준코드 / PK 후보(HIGH) / FK 후보: I2550.DSPS_STDR_CD(HIGH, 13.4%)
  "DSPS_STDR_CD_NM" VARCHAR(500), -- DSPS_STDR_CD_NM / 처분기준명
  "LV_NO" NUMERIC(18,0), -- LV_NO / 레벨
  "BASIS_LAWORD" VARCHAR(100), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_NM" VARCHAR(30), -- VILT_TYPE_NM / 위반유형
  "VALD_BGN_DT" DATE, -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  PRIMARY KEY ("DSPS_STDR_CD"),
  FOREIGN KEY ("DSPS_STDR_CD") REFERENCES "I2550" ("DSPS_STDR_CD")
);

-- -----------------------------------------------------------------------------
-- I0990 / 기구 및 용기.포장의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0990" (
  "LIMIT_STDR_STND_RCOGN_NO" VARCHAR(50), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" DATE, -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "MC_NM" VARCHAR(200), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  "MC_NATN_CD_NM" VARCHAR(200), -- MC_NATN_CD_NM / 제조회사 국가
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1100 / 기구등의 살균소독제 기준규격
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1100" (
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" NUMERIC(18,0), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,0), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,0), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(1000), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" DATE -- LAST_UPDT_DTM / 수정일자
);

-- -----------------------------------------------------------------------------
-- I1010 / 기구등의 살균소독제 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1010" (
  "LIMIT_STDR_STND_RCOGN_NO" NUMERIC(18,0), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" DATE, -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "MC_NM" VARCHAR(200), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  "MC_NATN_CD_NM" VARCHAR(200), -- MC_NATN_CD_NM / 제조회사 국가
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1040 / 농약잔류허용기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1040" (
  "AGCHM_KOR_NM" VARCHAR(200), -- AGCHM_KOR_NM / 농약명
  "FOOD_KOR_NM" VARCHAR(200), -- FOOD_KOR_NM / 식품명
  "OPERTN_CITYPOINT" VARCHAR(100), -- OPERTN_CITYPOINT / 시행 시점
  "STEP" NUMERIC(18,0), -- STEP / 단계
  "MRL_VAL" VARCHAR(50), -- MRL_VAL / MRL 값
  "DSUSE_YN" VARCHAR(1) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I1070 / 동물용의약품 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1070" (
  "ANIMAL_ONLY_MDCIN_NM_KOR" VARCHAR(200), -- ANIMAL_ONLY_MDCIN_NM_KOR / 의약품 한글명
  "ANIMAL_ONLY_MDCIN_NM_ENG" VARCHAR(200), -- ANIMAL_ONLY_MDCIN_NM_ENG / 의약품 영문명
  "APPLC_OBJ_ANIMAL" VARCHAR(100), -- APPLC_OBJ_ANIMAL / 적용 대상 동물
  "MCFRL" VARCHAR(200), -- MCFRL / 분자식
  "MCWGH" VARCHAR(100), -- MCWGH / 분자량
  "SYSTM_NM" VARCHAR(200), -- SYSTM_NM / 계통명
  "IUPAC_NM" VARCHAR(1000), -- IUPAC_NM / IUPAC 명
  "CAS_NM" VARCHAR(300), -- CAS_NM / CAS 명
  "SHAP_NM" VARCHAR(200), -- SHAP_NM / 형태
  "POIOF" VARCHAR(100), -- POIOF / 녹는점
  "BOILPNT" VARCHAR(500), -- BOILPNT / 끓는점
  "STEPR" VARCHAR(100), -- STEPR / 증기압
  "LOGPOW" VARCHAR(100), -- LOGPOW / LOGPOW
  "DENS_UNIT" VARCHAR(500), -- DENS_UNIT / 밀도단위
  "PKA" VARCHAR(100), -- PKA / PKA
  "SOLUB" VARCHAR(300), -- SOLUB / 용해도
  "STBLY" VARCHAR(100) -- STBLY / 안정성
);

-- -----------------------------------------------------------------------------
-- I1080 / 동물의약품별 잔류허용 기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1080" (
  "CDX_KOREA_DVS_CD" VARCHAR(30), -- CDX_KOREA_DVS_CD / 구분
  "ANIMAL_ONLY_MDCIN_NM_KOR" VARCHAR(200), -- ANIMAL_ONLY_MDCIN_NM_KOR / 동물 전용 의약품 한글명
  "OPERTN_CITYPOINT" VARCHAR(100), -- OPERTN_CITYPOINT / 시행 시점
  "STEP" NUMERIC(18,0), -- STEP / 단계
  "MRL" VARCHAR(100), -- MRL / MRL
  "FOOD_KOR_NM" VARCHAR(200), -- FOOD_KOR_NM / 식품 한글명
  "FOOD_ENG_NM" VARCHAR(200), -- FOOD_ENG_NM / 식품 영문명
  "ETC_YN" VARCHAR(1), -- ETC_YN / 기타 여부
  "TMPR_STDR_APPLC_YN" VARCHAR(1), -- TMPR_STDR_APPLC_YN / 임시기준적용여부
  "DSUSE_YN" VARCHAR(1) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I1030 / 방사선조사식품 품목 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1030" (
  "SPEC_NM" VARCHAR(200), -- SPEC_NM / 기준규격명
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(100), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,0), -- MIMM_VAL / 최소값
  "UNIT_NM" VARCHAR(200) -- UNIT_NM / 단위명
);

-- -----------------------------------------------------------------------------
-- I1060 / 시약정보
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1060" (
  "CITYMEDI_NM_CD" VARCHAR(50), -- CITYMEDI_NM_CD / 시약 명
  "CMPNY_NO" VARCHAR(50), -- CMPNY_NO / 회사 명
  "CTPRVNACCTO_INTD_NO" VARCHAR(50), -- CTPRVNACCTO_INTD_NO / 시도별 지방청
  "STATS_NO" VARCHAR(30), -- STATS_NO / 상태
  "PUREDO" VARCHAR(100), -- PUREDO / 순도
  "VALD_TERM" NUMERIC(18,0) -- VALD_TERM / 유효기간
);

-- -----------------------------------------------------------------------------
-- I0930 / 식품공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0930" (
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 품목항목속성
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격값
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SPEC_VAL_SUMUP" VARCHAR(200), -- SPEC_VAL_SUMUP / 규격값요약
  "JDGMNT_FNPRT_CD_NM" VARCHAR(200), -- JDGMNT_FNPRT_CD_NM / 판정형식
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MXMM_VAL_FNPRT_CD_NM" VARCHAR(200), -- MXMM_VAL_FNPRT_CD_NM / 이하/미만
  "MIMM_VAL" NUMERIC(18,4), -- MIMM_VAL / 최소값
  "MIMM_VAL_FNPRT_CD_NM" VARCHAR(200), -- MIMM_VAL_FNPRT_CD_NM / 이상/초과
  "CHOIC_FIT_FNPRT_CD_NM" VARCHAR(200), -- CHOIC_FIT_FNPRT_CD_NM / 세부적합
  "CHOIC_IMPROPT_FNPRT_CD_NM" VARCHAR(200), -- CHOIC_IMPROPT_FNPRT_CD_NM / 부적합
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200) -- UNIT_NM / 단위명
);

-- -----------------------------------------------------------------------------
-- I1050 / 식품별 농약잔류허용기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1050" (
  "FOOD_KOR_NM" VARCHAR(200), -- FOOD_KOR_NM / 식품한글명
  "FOOD_ENG_NM" VARCHAR(200), -- FOOD_ENG_NM / 식품영문명
  "AGCHM_KOR_NM" VARCHAR(200), -- AGCHM_KOR_NM / 농약명
  "DEDE_NTK_QTY" NUMERIC(18,4), -- DEDE_NTK_QTY / 일일섭취량
  "TMPR_STDR_APPLC_YN" VARCHAR(1), -- TMPR_STDR_APPLC_YN / 잠정기준적용여부
  "LCLAS_NM" VARCHAR(30), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(30), -- MLSFC_NM / 중분류
  "SCLAS_NM" VARCHAR(50), -- SCLAS_NM / 소분류
  "OPERTN_CITYPOINT" VARCHAR(100), -- OPERTN_CITYPOINT / 시행시점
  "STEP" NUMERIC(18,0), -- STEP / 단계
  "MRL_VAL" VARCHAR(50), -- MRL_VAL / MRL 값
  "ETC_YN" VARCHAR(1), -- ETC_YN / 기타여부
  "DSUSE_YN" VARCHAR(1) -- DSUSE_YN / 폐기 여부
);

-- -----------------------------------------------------------------------------
-- I0940 / 식품용 기구 및 용기.포장 공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0940" (
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 16.9%)
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(200), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,0), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I0980 / 식품원료의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0980" (
  "LIMIT_STDR_STND_RCOGN_NO" NUMERIC(18,0), -- LIMIT_STDR_STND_RCOGN_NO / 한시적 기준 규격 인정 번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "BSSH_ADDR" VARCHAR(500), -- BSSH_ADDR / 주소
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "RCOGN_DT" DATE, -- RCOGN_DT / 인정일자
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  "RAWMTRL_NM" VARCHAR(200), -- RAWMTRL_NM / 원재료명
  "PRPOS" VARCHAR(100), -- PRPOS / 용도
  "USED" NUMERIC(18,0), -- USED / 사용량
  "USING_UNIT" VARCHAR(100) -- USING_UNIT / 사용량단위
);

-- -----------------------------------------------------------------------------
-- I1020 / 식품원재료(식물,동물,미생물,수산물) 정보
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1020" (
  "LCLAS_NM" VARCHAR(30), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(30), -- MLSFC_NM / 중분류
  "RPRSNT_RAWMTRL_NM" VARCHAR(200), -- RPRSNT_RAWMTRL_NM / 원재료명
  "RAWMTRL_NCKNM" VARCHAR(200), -- RAWMTRL_NCKNM / 이명
  "ENG_NM" VARCHAR(300), -- ENG_NM / 영문명
  "SCNM" VARCHAR(200), -- SCNM / 학명
  "REGN_CD_NM" VARCHAR(200), -- REGN_CD_NM / 부위명
  "RAWMTRL_STATS_CD_NM" VARCHAR(200), -- RAWMTRL_STATS_CD_NM / 상태명
  "USE_CND_NM" VARCHAR(200), -- USE_CND_NM / 사용조건
  "USE_CND_STDR_CN" VARCHAR(1000) -- USE_CND_STDR_CN / 사용조건기준내용
);

-- -----------------------------------------------------------------------------
-- I0950 / 식품첨가물공전
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0950" (
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / FK 후보: I2530.TESTITM_CD(HIGH, 50.0%)
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "SPEC_VAL" VARCHAR(50), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(2000), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,4), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,4), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I1101 / 식품첨가물의 기준 및 규격 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1101" (
  "PC_KOR_NM" VARCHAR(200), -- PC_KOR_NM / 품목한글명
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목분류코드 / PK 후보(LOW)
  "T_KOR_NM" VARCHAR(200), -- T_KOR_NM / 시험항목 한글명
  "FNPRT_ITM_NM" VARCHAR(200), -- FNPRT_ITM_NM / 세부항목명
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 품목항목속성 한글명
  "SPEC_VAL" NUMERIC(18,0), -- SPEC_VAL / 기준규격값
  "SPEC_VAL_SUMUP" VARCHAR(500), -- SPEC_VAL_SUMUP / 기준규격값 요약
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "SORC" VARCHAR(1000), -- SORC / 출처
  "MXMM_VAL" NUMERIC(18,0), -- MXMM_VAL / 최대값
  "MIMM_VAL" NUMERIC(18,0), -- MIMM_VAL / 최소값
  "INJRY_YN" VARCHAR(1), -- INJRY_YN / 위해여부
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  "UPDT_PRVNS" VARCHAR(1000), -- UPDT_PRVNS / 수정사유
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 수정일자
  PRIMARY KEY ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I1000 / 식품첨가물의 한시적 기준 및 규격 인정 현황
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1000" (
  "LIMIT_STDR_STND_RCOGN_NO" NUMERIC(18,0), -- LIMIT_STDR_STND_RCOGN_NO / 인정번호 / PK 후보(HIGH)
  "RCOGN_DT" DATE, -- RCOGN_DT / 인정일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "MC_NM" VARCHAR(200), -- MC_NM / 제조회사
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  PRIMARY KEY ("LIMIT_STDR_STND_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1650 / 신고대상분류기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1650" (
  "CMMN_CD_NM" VARCHAR(30), -- CMMN_CD_NM / 분류
  "FNPRT_CD_NM" VARCHAR(100), -- FNPRT_CD_NM / 신고분류
  "USER_DFN_CLMN_1" VARCHAR(100), -- USER_DFN_CLMN_1 / 분류1
  "USER_DFN_CLMN_2" VARCHAR(100) -- USER_DFN_CLMN_2 / 분류2
);

-- -----------------------------------------------------------------------------
-- I1090 / 잔류동물의약품 식품별 잔류허용 기준
-- 카테고리: 기준규격정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1090" (
  "FOOD_KOR_NM" VARCHAR(200), -- FOOD_KOR_NM / 식품한글명
  "FOOD_ENG_NM" VARCHAR(200), -- FOOD_ENG_NM / 식품영문명
  "DEDE_NTK_QTY" NUMERIC(18,0), -- DEDE_NTK_QTY / 일일섭취량
  "TMPR_STDR_APPLC_YN" VARCHAR(1), -- TMPR_STDR_APPLC_YN / 잠정기준적용여부
  "LCLAS_NM" VARCHAR(30), -- LCLAS_NM / 대분류
  "MLSFC_NM" VARCHAR(30), -- MLSFC_NM / 중분류
  "SCLAS_NM" VARCHAR(30) -- SCLAS_NM / 소분류
);

-- -----------------------------------------------------------------------------
-- C005 / 바코드연계제품정보
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C005" (
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목보고(신고)번호 / FK 후보: I1310.PRDLST_REPORT_NO(HIGH, 0.1%)
  "PRMS_DT" DATE, -- PRMS_DT / 보고(신고일)
  "END_DT" DATE, -- END_DT / 생산중단일
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 소비기한
  "PRDLST_DCNM" VARCHAR(30), -- PRDLST_DCNM / 식품 유형
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 제조사명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "BAR_CD" VARCHAR(30), -- BAR_CD / 유통바코드
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2540 / 법령코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2540" (
  "FOOD_LAWORD_CD" VARCHAR(30), -- FOOD_LAWORD_CD / 법령코드 / PK 후보(HIGH)
  "HRNK_LAWORD_CD" VARCHAR(30), -- HRNK_LAWORD_CD / 상위법령코드
  "WORK_REALM_CD_NM" VARCHAR(200), -- WORK_REALM_CD_NM / 업무분야
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 법령명
  "ALL_LAWORD_CD_NM" VARCHAR(200), -- ALL_LAWORD_CD_NM / 전체법령명
  "LV_NO" NUMERIC(18,0), -- LV_NO / 레벨
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "VALD_BGN_DT" DATE, -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("FOOD_LAWORD_CD")
);

-- -----------------------------------------------------------------------------
-- I2530 / 시험항목코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2530" (
  "TESTITM_CD" VARCHAR(30), -- TESTITM_CD / 시험항목코드 / PK 후보(HIGH)
  "KOR_NM" VARCHAR(200), -- KOR_NM / 한글명
  "ENG_NM" VARCHAR(300), -- ENG_NM / 영문명
  "ABRV" VARCHAR(100), -- ABRV / 약어
  "NCKNM" VARCHAR(200), -- NCKNM / 이명
  "TESTITM_NM" VARCHAR(200), -- TESTITM_NM / 시험항목명
  "TESTITM_LCLAS_CD" VARCHAR(30), -- TESTITM_LCLAS_CD / 시험항목대분류시퀀스
  "L_ATTRB_CD" VARCHAR(30), -- L_ATTRB_CD / 시험항목대분류코드
  "L_KOR_NM" VARCHAR(200), -- L_KOR_NM / 대분류한글명
  "TESTITM_MLSFC_CD" VARCHAR(30), -- TESTITM_MLSFC_CD / 시험항목중분류시퀀스
  "M_ATTRB_CD" VARCHAR(30), -- M_ATTRB_CD / 시험항목중분류코드
  "M_KOR_NM" VARCHAR(200), -- M_KOR_NM / 중분류한글명
  "REMN_MTTR_DFN" VARCHAR(100), -- REMN_MTTR_DFN / 잔류물질정의
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("TESTITM_CD")
);

-- -----------------------------------------------------------------------------
-- I2520 / 식품원재료코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2520" (
  "RAWMTRL_CD" VARCHAR(30), -- RAWMTRL_CD / 원재료코드 / PK 후보(HIGH)
  "RAWMTRL_LCLAS_NM" VARCHAR(30), -- RAWMTRL_LCLAS_NM / 대분류
  "RAWMTRL_MLSFC_NM" VARCHAR(30), -- RAWMTRL_MLSFC_NM / 중분류
  "RPRSNT_RAWMTRL_NM" VARCHAR(200), -- RPRSNT_RAWMTRL_NM / 원재료명
  "RAWMTRL_NCKNM" VARCHAR(200), -- RAWMTRL_NCKNM / 원재료이명
  "ENG_NM" VARCHAR(300), -- ENG_NM / 영문명
  "SCNM" VARCHAR(200), -- SCNM / 학명
  "REGN_CD" VARCHAR(30), -- REGN_CD / 부위코드
  "REGN_CD_NM" VARCHAR(200), -- REGN_CD_NM / 부위코드명
  "PRCSS_PROCS_CD" VARCHAR(30), -- PRCSS_PROCS_CD / 가공공정코드
  "PRCSS_PROCS_CD_NM" VARCHAR(200), -- PRCSS_PROCS_CD_NM / 가공공정코드명
  "RAWMTRL_STATS_CD" VARCHAR(30), -- RAWMTRL_STATS_CD / 원재료코드
  "RAWMTRL_STATS_CD_NM" VARCHAR(200), -- RAWMTRL_STATS_CD_NM / 원재료코드명
  "VALD_BGN_DT" DATE, -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("RAWMTRL_CD")
);

-- -----------------------------------------------------------------------------
-- I2560 / 영업소재지 GIS 코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2560" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I1300.LCNS_NO(HIGH, 0.3%), I1220.LCNS_NO(HIGH, 0.2%), I2500.LCNS_NO(HIGH, 99.9%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "LOCPLC" VARCHAR(500), -- LOCPLC / 소재지
  "SAN" NUMERIC(18,0), -- SAN / 산
  "LNBR" VARCHAR(100), -- LNBR / 번지
  "ISSNO" NUMERIC(18,0), -- ISSNO / 호
  "TONG" VARCHAR(100), -- TONG / 통
  "BAN" VARCHAR(100), -- BAN / 반
  "SPCLADDR" VARCHAR(500), -- SPCLADDR / 특수주소
  "SPCPPDONG" VARCHAR(100), -- SPCPPDONG / 특수지동
  "SPCPPISSNO" VARCHAR(50), -- SPCPPISSNO / 특수지호
  "ROADNMSIGNGUCD" VARCHAR(30), -- ROADNMSIGNGUCD / 도로명시군구코드
  "ROADNMADDREMDDVS" VARCHAR(30), -- ROADNMADDREMDDVS / 도로명주소읍면동구분
  "ROADNMADDREMDCD" VARCHAR(30), -- ROADNMADDREMDCD / 도로명주소읍면동코드
  "ROADNMADDRBDFLRDVS" VARCHAR(30), -- ROADNMADDRBDFLRDVS / 도로명주소건물층구분
  "ROADNMADDRBDORIGNO" NUMERIC(18,0), -- ROADNMADDRBDORIGNO / 도로명주소건물본번호
  "ROADNMADDRBDSUBNO" NUMERIC(18,0), -- ROADNMADDRBDSUBNO / 도로명주소건물부번호
  "ROADNMADDRSPCLADDR" VARCHAR(500), -- ROADNMADDRSPCLADDR / 도로명주소특수주소
  "PNU_CD" VARCHAR(30), -- PNU_CD / PNU코드
  "BDMERGEMANAGENO" NUMERIC(18,0), -- BDMERGEMANAGENO / 건물통합관리번호
  "UFID_CD" VARCHAR(30), -- UFID_CD / UFID코드
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2570 / 유통바코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2570" (
  "BRCD_NO" VARCHAR(50), -- BRCD_NO / 바코드번호
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목보고번호
  "CMPNY_NM" VARCHAR(200), -- CMPNY_NM / 회사명
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  "PRDLST_NM" VARCHAR(30), -- PRDLST_NM / 품목분류_소분류
  "HRNK_PRDLST_NM" VARCHAR(30), -- HRNK_PRDLST_NM / 품목분류_중분류
  "HTRK_PRDLST_NM" VARCHAR(30) -- HTRK_PRDLST_NM / 품목분류_대분류
);

-- -----------------------------------------------------------------------------
-- I2550 / 처분기준코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2550" (
  "DSPS_STDR_CD" VARCHAR(30), -- DSPS_STDR_CD / 처분기준코드 / PK 후보(HIGH)
  "HRNK_DSPS_STDR_CD" VARCHAR(30), -- HRNK_DSPS_STDR_CD / 상위처분기준코드
  "LV_NO" NUMERIC(18,0), -- LV_NO / 레벨
  "DSPS_STDR_CD_NM" VARCHAR(200), -- DSPS_STDR_CD_NM / 처분기준코드명
  "BASIS_LAWORD" VARCHAR(100), -- BASIS_LAWORD / 근거법령
  "VILT_TYPE_CD" VARCHAR(30), -- VILT_TYPE_CD / 위반유형코드
  "VILT_TYPE_CD_NM" VARCHAR(200), -- VILT_TYPE_CD_NM / 위반유형명
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "VALD_BGN_DT" DATE, -- VALD_BGN_DT / 유효시작일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  PRIMARY KEY ("DSPS_STDR_CD")
);

-- -----------------------------------------------------------------------------
-- I2510 / 품목유형코드
-- 카테고리: 코드정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2510" (
  "LV" NUMERIC(18,0), -- LV / 레벨
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드 / PK 후보(HIGH)
  "KOR_NM" VARCHAR(200), -- KOR_NM / 한글명
  "ENG_NM" VARCHAR(200), -- ENG_NM / 영문명
  "DFN" VARCHAR(100), -- DFN / 정의
  "VALD_BEGN_DT" DATE, -- VALD_BEGN_DT / 유효개시일자
  "VALD_END_DT" DATE, -- VALD_END_DT / 유효종료일자
  "HRNK_PRDLST_CD" VARCHAR(30), -- HRNK_PRDLST_CD / 상위품목코드
  "HTRK_PRDLST_CD" VARCHAR(30), -- HTRK_PRDLST_CD / 최상위품목코드
  "MXTR_PRDLST_YN" VARCHAR(1), -- MXTR_PRDLST_YN / 조합품목여부
  "ATTRB_SEQ" NUMERIC(18,0), -- ATTRB_SEQ / 속성일련번호
  "PIAM_KOR_NM" VARCHAR(200), -- PIAM_KOR_NM / 속성한글명
  "PRDLST_YN" VARCHAR(1), -- PRDLST_YN / 품목여부
  "UPDT_PRVNS" VARCHAR(1000), -- UPDT_PRVNS / 수정사유
  "USE_YN" VARCHAR(1), -- USE_YN / 사용여부
  "RM" VARCHAR(100), -- RM / 비고
  "FDGRP_YN" VARCHAR(1), -- FDGRP_YN / 식품군여부
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "CHD_SMBL_FD_YN" VARCHAR(1), -- CHD_SMBL_FD_YN / 어린이기호식품 여부
  PRIMARY KEY ("PRDLST_CD")
);

-- -----------------------------------------------------------------------------
-- I0760 / 건강기능식품 영양DB
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0760" (
  "HELT_ITM_GRP_CD" VARCHAR(30), -- HELT_ITM_GRP_CD / 건강 항목 그룹 코드 / PK 후보(HIGH)
  "HELT_ITM_GRP_NM" VARCHAR(200), -- HELT_ITM_GRP_NM / 건강 항목 그룹 명
  "LCLAS_CD" VARCHAR(30), -- LCLAS_CD / 대분류 코드
  "LCLAS_NM" VARCHAR(200), -- LCLAS_NM / 대분류 명
  "MLSFC_CD" VARCHAR(30), -- MLSFC_CD / 중분류 코드
  "MLSFC_NM" VARCHAR(200), -- MLSFC_NM / 중분류 명
  "SCLAS_CD" VARCHAR(30), -- SCLAS_CD / 소분류 코드
  "SCLAS_NM" VARCHAR(200), -- SCLAS_NM / 소분류 명
  PRIMARY KEY ("HELT_ITM_GRP_CD")
);

-- -----------------------------------------------------------------------------
-- COOKRCP01 / 조리식품의 레시피 DB
-- 카테고리: 식품영양정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "COOKRCP01" (
  "RCP_SEQ" NUMERIC(18,0), -- RCP_SEQ / 일련번호 / PK 후보(HIGH)
  "RCP_NM" VARCHAR(200), -- RCP_NM / 메뉴명
  "RCP_WAY2" VARCHAR(1000), -- RCP_WAY2 / 조리방법
  "RCP_PAT2" VARCHAR(100), -- RCP_PAT2 / 요리종류
  "INFO_WGT" NUMERIC(18,4), -- INFO_WGT / 중량(1인분)
  "INFO_ENG" NUMERIC(18,4), -- INFO_ENG / 열량
  "INFO_CAR" NUMERIC(18,4), -- INFO_CAR / 탄수화물
  "INFO_PRO" NUMERIC(18,4), -- INFO_PRO / 단백질
  "INFO_FAT" NUMERIC(18,4), -- INFO_FAT / 지방
  "INFO_NA" NUMERIC(18,4), -- INFO_NA / 나트륨
  "HASH_TAG" VARCHAR(100), -- HASH_TAG / 해쉬태그
  "ATT_FILE_NO_MAIN" VARCHAR(100), -- ATT_FILE_NO_MAIN / 이미지경로(소)
  "ATT_FILE_NO_MK" VARCHAR(100), -- ATT_FILE_NO_MK / 이미지경로(대)
  "RCP_PARTS_DTLS" VARCHAR(300), -- RCP_PARTS_DTLS / 재료정보
  "MANUAL01" VARCHAR(200), -- MANUAL01 / 만드는법_01
  "MANUAL_IMG01" VARCHAR(100), -- MANUAL_IMG01 / 만드는법_이미지_01
  "MANUAL02" VARCHAR(200), -- MANUAL02 / 만드는법_02
  "MANUAL_IMG02" VARCHAR(100), -- MANUAL_IMG02 / 만드는법_이미지_02
  "MANUAL03" VARCHAR(200), -- MANUAL03 / 만드는법_03
  "MANUAL_IMG03" VARCHAR(100), -- MANUAL_IMG03 / 만드는법_이미지_03
  "MANUAL04" VARCHAR(200), -- MANUAL04 / 만드는법_04
  "MANUAL_IMG04" VARCHAR(100), -- MANUAL_IMG04 / 만드는법_이미지_04
  "MANUAL05" VARCHAR(200), -- MANUAL05 / 만드는법_05
  "MANUAL_IMG05" VARCHAR(100), -- MANUAL_IMG05 / 만드는법_이미지_05
  "MANUAL06" VARCHAR(200), -- MANUAL06 / 만드는법_06
  "MANUAL_IMG06" VARCHAR(100), -- MANUAL_IMG06 / 만드는법_이미지_06
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
  "RCP_NA_TIP" VARCHAR(300), -- RCP_NA_TIP / 저감 조리법 TIP
  PRIMARY KEY ("RCP_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2381 / 상수도 수질정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2381" (
  "FCLTY_NM" VARCHAR(200), -- FCLTY_NM / 시설명
  "FCLTY_LOC" VARCHAR(100), -- FCLTY_LOC / 시설위치
  "PRSEC_YR" NUMERIC(18,0), -- PRSEC_YR / 검사년도
  "PRSEC_MM" NUMERIC(18,0), -- PRSEC_MM / 검사월
  "PICK_DT" DATE, -- PICK_DT / 채취일자
  "PRSEC_ITM_NM" VARCHAR(200), -- PRSEC_ITM_NM / 검사항목명
  "MESURE_VAL" NUMERIC(18,4), -- MESURE_VAL / 측정값
  "UNIT_NM" VARCHAR(200), -- UNIT_NM / 단위명
  "DCMLPOINT" NUMERIC(18,0), -- DCMLPOINT / 소수점
  "EXCS_YN" VARCHAR(1) -- EXCS_YN / 초과여부
);

-- -----------------------------------------------------------------------------
-- I2400 / 지하수수질측정망 측정결과
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2400" (
  "YR" NUMERIC(18,0), -- YR / 년도
  "QU" VARCHAR(100), -- QU / 분기
  "SPOT_NO" VARCHAR(50), -- SPOT_NO / 지점 번호
  "SIGNGU_NM" VARCHAR(200), -- SIGNGU_NM / 시군구
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "PRPOS_NM" VARCHAR(200), -- PRPOS_NM / 용도
  "DKPS_YN_NM" VARCHAR(1), -- DKPS_YN_NM / 음용 여부
  "HYDRIONDNSTY" NUMERIC(18,4), -- HYDRIONDNSTY / 수소이온농도
  "TOTEEC" VARCHAR(100), -- TOTEEC / 총대장균군
  "NO3N" VARCHAR(100), -- NO3N / 질산성질소
  "CI" VARCHAR(100), -- CI / 염소이온
  "CDMM" VARCHAR(100), -- CDMM / 카드뮴
  "AS_" VARCHAR(100), -- AS_ / 비소
  "CYN" VARCHAR(100), -- CYN / 시안
  "MRC" VARCHAR(100), -- MRC / 수은
  "ORGNICPH" VARCHAR(100), -- ORGNICPH / 유기인
  "PHNL" VARCHAR(100), -- PHNL / 페놀
  "PB" VARCHAR(100), -- PB / 납
  "CR6" VARCHAR(100), -- CR6 / 6가크롬
  "TCE" VARCHAR(100), -- TCE / 트리클로로에틸렌
  "PCE" VARCHAR(100), -- PCE / 테트라클로로에틸렌
  "TCE111" VARCHAR(100), -- TCE111 / 111트리클로로에탄
  "BENZ" VARCHAR(100), -- BENZ / 벤젠
  "TOLUE" VARCHAR(100), -- TOLUE / 톨루엔
  "ETBEN" VARCHAR(100), -- ETBEN / 에틸벤젠
  "XYLEN" VARCHAR(100), -- XYLEN / 크실렌
  "EC" VARCHAR(500), -- EC / 전기전도도
  "ARA_YN" VARCHAR(1), -- ARA_YN / 오염지역 여부
  "ARA" VARCHAR(30) -- ARA / 오염구분
);

-- -----------------------------------------------------------------------------
-- I2390 / 토양지하수 토양실태조사정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2390" (
  "SOIL_SEQ" NUMERIC(18,0), -- SOIL_SEQ / 토양 일련번호 / PK 후보(HIGH)
  "EXAM_YR" NUMERIC(18,0), -- EXAM_YR / 조사 년도
  "CHARTR_CL_NM" VARCHAR(200), -- CHARTR_CL_NM / 특성 분류 명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "LNDCGR_NM" VARCHAR(200), -- LNDCGR_NM / 지목 명
  "AREA" NUMERIC(18,4), -- AREA / 면적
  "CDMM" NUMERIC(18,4), -- CDMM / 카드뮴
  "COPPR" NUMERIC(18,4), -- COPPR / 구리
  "AS_" NUMERIC(18,4), -- AS_ / 비소
  "MRC" NUMERIC(18,4), -- MRC / 수은
  "PB" NUMERIC(18,4), -- PB / 납
  "CR6" VARCHAR(100), -- CR6 / 6가크롬
  "ZINC" NUMERIC(18,4), -- ZINC / 아연
  "NICKEL" VARCHAR(100), -- NICKEL / 니켈
  "IMCOW" VARCHAR(100), -- IMCOW / 불소
  "ORGNICPH" VARCHAR(100), -- ORGNICPH / 유기인
  "PCT" VARCHAR(100), -- PCT / 폴리클로리네이트페닐
  "CYN" VARCHAR(100), -- CYN / 시안
  "PHNL" VARCHAR(100), -- PHNL / 페놀
  "BENZ" VARCHAR(100), -- BENZ / 벤젠
  "TOLUE" VARCHAR(100), -- TOLUE / 톨루엔
  "ETBEN" VARCHAR(100), -- ETBEN / 에틸벤젠
  "XYLEN" VARCHAR(100), -- XYLEN / 크실렌
  "TPH" VARCHAR(100), -- TPH / 석유계총탄화수소
  "TCE" VARCHAR(100), -- TCE / 트리클로로에틸렌
  "PCE" VARCHAR(100), -- PCE / 테트라클로로에틸렌
  "HYDRIONDNSTY" VARCHAR(100), -- HYDRIONDNSTY / 수소이온농도
  "RM" VARCHAR(500), -- RM / 비고
  PRIMARY KEY ("SOIL_SEQ")
);

-- -----------------------------------------------------------------------------
-- I2380 / 하수도 수질정보
-- 카테고리: 수질환경정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2380" (
  "FCLTY_NM" VARCHAR(200), -- FCLTY_NM / 시설명
  "CTPRVN_NM" VARCHAR(200), -- CTPRVN_NM / 시도명
  "SIGNGU_NM" VARCHAR(200), -- SIGNGU_NM / 시군구명
  "ZIPNO" VARCHAR(50), -- ZIPNO / 우편번호
  "BASS_ADDR" VARCHAR(500), -- BASS_ADDR / 기본주소
  "DTL_ADDR" VARCHAR(500), -- DTL_ADDR / 상세주소
  "ROADNM_BASS_ADDR" VARCHAR(500), -- ROADNM_BASS_ADDR / 도로명기본주소
  "ROADNM_DTL_ADDR" VARCHAR(500), -- ROADNM_DTL_ADDR / 도로명상세주소
  "MESURE_DT" DATE, -- MESURE_DT / 측정일자
  "FCLTY_CD" VARCHAR(30), -- FCLTY_CD / 시설코드
  "PAPRONSLF_NM" VARCHAR(200), -- PAPRONSLF_NM / 지자체명
  "RIVR_NM" VARCHAR(200), -- RIVR_NM / 하천명
  "BASE_FCLTY_DVS_NM" VARCHAR(200), -- BASE_FCLTY_DVS_NM / 기초시설구분명
  "BOD" NUMERIC(18,4), -- BOD / BOD
  "COD" NUMERIC(18,4), -- COD / COD
  "SS" NUMERIC(18,4), -- SS / SS
  "TP" NUMERIC(18,4), -- TP / TP
  "TN" NUMERIC(18,4), -- TN / TN
  "EEC_QTY" NUMERIC(18,0), -- EEC_QTY / 대장균군수량
  "TEMOD" VARCHAR(500), -- TEMOD / 수온
  "ECLGY_TOXCTY" NUMERIC(18,0) -- ECLGY_TOXCTY / 상태독성
);

-- -----------------------------------------------------------------------------
-- I0910 / 국외검사기관 인정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0910" (
  "PRSEC_INSTT_RCOGN_NO" VARCHAR(50), -- PRSEC_INSTT_RCOGN_NO / 인정번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 기관명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "APPN_BGN_DT" DATE, -- APPN_BGN_DT / 지정일자
  "PRSEC_ITM_CD_NM" VARCHAR(200), -- PRSEC_ITM_CD_NM / 검사항목
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "BSSH_ADDR" VARCHAR(500) -- BSSH_ADDR / 주소
);

-- -----------------------------------------------------------------------------
-- I1870 / 농산물 안전성검사기관 정보
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1870" (
  "APPN_NO" NUMERIC(18,0), -- APPN_NO / 지정번호
  "APPN_DT" DATE, -- APPN_DT / 지정일자
  "APPN_INSTT_NM" VARCHAR(200), -- APPN_INSTT_NM / 지정기관
  "PRSEC_INSTT_LOCPLC" VARCHAR(500), -- PRSEC_INSTT_LOCPLC / 검사기관소재지
  "PRSEC_WORK_SCOPE" VARCHAR(100), -- PRSEC_WORK_SCOPE / 검사업무범위
  "HRMF_MTTR_ITM" VARCHAR(100), -- HRMF_MTTR_ITM / 유해물질항목
  "TELNO" VARCHAR(30) -- TELNO / 전화번호
);

-- -----------------------------------------------------------------------------
-- I0920 / 식품검사기관별 시험항목정보조회
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0920" (
  "REALM_NM" VARCHAR(200), -- REALM_NM / 분야
  "CMPTNC_INSTT_NM" VARCHAR(200), -- CMPTNC_INSTT_NM / 관할기관
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 검사기관
  "ADDR" VARCHAR(500), -- ADDR / 소재지
  "MSK_TELNO" VARCHAR(30), -- MSK_TELNO / 전화번호
  "TESTITM_LCLAS_NM" VARCHAR(30), -- TESTITM_LCLAS_NM / 대분류
  "TESTITM_MLSFC_NM" VARCHAR(30), -- TESTITM_MLSFC_NM / 중분류
  "TESTITM_NM" VARCHAR(200), -- TESTITM_NM / 시험항목명
  "RM" VARCHAR(200), -- RM / 비고
  "CHNG_DT" DATE -- CHNG_DT / 변경일자(YYYYMMDD)
);

-- -----------------------------------------------------------------------------
-- I0890 / 식품위생검사기관 지정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0890" (
  "PRSEC_INSTT_RCOGN_NO" VARCHAR(50), -- PRSEC_INSTT_RCOGN_NO / 지정번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 기관명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "APPN_BGN_DT" DATE, -- APPN_BGN_DT / 지정일자
  "APPN_END_DT" DATE, -- APPN_END_DT / 지정종료일자
  "WORK_SCOPE" VARCHAR(100), -- WORK_SCOPE / 업무범위
  PRIMARY KEY ("PRSEC_INSTT_RCOGN_NO")
);

-- -----------------------------------------------------------------------------
-- I0900 / 축산물위생검사기관 지정 현황
-- 카테고리: 검사기관정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0900" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 검사기관명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APPN_BGN_DT" DATE, -- APPN_BGN_DT / 지정시작일자
  "APPN_END_DT" DATE, -- APPN_END_DT / 지정종료일자
  "WORK_SCOPE" VARCHAR(100) -- WORK_SCOPE / 업무범위
);

-- -----------------------------------------------------------------------------
-- I2640 / 검사부적합 현황(농산물)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2640" (
  "PRDTNM" VARCHAR(200), -- PRDTNM / 제품명
  "BSSHNM" VARCHAR(200), -- BSSHNM / 업소명
  "MNFDT" DATE, -- MNFDT / 제조일자
  "DISTBTMLMT" VARCHAR(100), -- DISTBTMLMT / 유통/소비기한
  "ADDR" VARCHAR(500), -- ADDR / 영업자주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 검사기관
  "REGSTR_TELNO" VARCHAR(30), -- REGSTR_TELNO / 전화번호
  "BRCDNO" VARCHAR(50), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(100), -- FRMLCUNIT / 포장단위
  "TEST_ITMNM" VARCHAR(100), -- TEST_ITMNM / 부적합항목
  "STDR_STND" VARCHAR(1000), -- STDR_STND / 기준규격
  "TESTANALS_RSLT" VARCHAR(100), -- TESTANALS_RSLT / 검사결과
  "CRET_DTM" DATE, -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" NUMERIC(18,0), -- RTRVLDSUSE_SEQ / 회수폐기일련번호
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 업체인허가번호
  "REPORTR_TELNO" VARCHAR(30) -- REPORTR_TELNO / 보고자전화번호
);

-- -----------------------------------------------------------------------------
-- I2620 / 검사부적합(국내)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2620" (
  "PRDTNM" VARCHAR(200), -- PRDTNM / 제품명
  "BSSHNM" VARCHAR(200), -- BSSHNM / 업소명
  "MNFDT" DATE, -- MNFDT / 제조일자
  "DISTBTMLMT" VARCHAR(100), -- DISTBTMLMT / 유통/소비기한
  "ADDR" VARCHAR(500), -- ADDR / 영업자주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 검사기관
  "REGSTR_TELNO" VARCHAR(30), -- REGSTR_TELNO / 전화번호
  "BRCDNO" VARCHAR(50), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(100), -- FRMLCUNIT / 포장단위
  "TEST_ITMNM" VARCHAR(100), -- TEST_ITMNM / 부적합항목
  "STDR_STND" VARCHAR(1000), -- STDR_STND / 기준규격
  "TESTANALS_RSLT" VARCHAR(100), -- TESTANALS_RSLT / 검사결과
  "CRET_DTM" DATE, -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" NUMERIC(18,0), -- RTRVLDSUSE_SEQ / 회수폐기일련번호
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 업체인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 3.5%)
  "REPORTR_TELNO" VARCHAR(30), -- REPORTR_TELNO / 보고자전화번호
  "PRDLST_CD_NM" VARCHAR(30), -- PRDLST_CD_NM / 식품유형
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1850 / 농축산물유통관리 허위표시공표정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1850" (
  "BSN_KND_NM" VARCHAR(200), -- BSN_KND_NM / 업종
  "ENTRPS_NM" VARCHAR(200), -- ENTRPS_NM / 업체명
  "ENTRPS_BASS_ADDR" VARCHAR(500), -- ENTRPS_BASS_ADDR / 주소
  "VILT_DTLS" VARCHAR(100), -- VILT_DTLS / 위반내역
  "PUBLC_BGN_DT" DATE, -- PUBLC_BGN_DT / 공표시작일
  "PUBLC_END_DT" DATE -- PUBLC_END_DT / 공표종료일
);

-- -----------------------------------------------------------------------------
-- I1860 / 농축산물유통관리 허위표시품목정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1860" (
  "BSN_KND_NM" VARCHAR(200), -- BSN_KND_NM / 업종
  "ENTRPS_NM" VARCHAR(200), -- ENTRPS_NM / 업소명
  "ENTRPS_BASS_ADDR" VARCHAR(500), -- ENTRPS_BASS_ADDR / 주소
  "VILT_DTLS" VARCHAR(100), -- VILT_DTLS / 위반내역
  "PUBLC_BGN_DT" DATE, -- PUBLC_BGN_DT / 공표시작일자
  "PUBLC_END_DT" DATE, -- PUBLC_END_DT / 공표종료일자
  "VILT_CN" VARCHAR(1000), -- VILT_CN / 위반내용
  "DSPS_CN" VARCHAR(1000), -- DSPS_CN / 처분내용
  "PRDLST_NM" VARCHAR(200) -- PRDLST_NM / 품목명
);

-- -----------------------------------------------------------------------------
-- I2020 / 수산물 표시단속정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2020" (
  "ENTRPS_NM" VARCHAR(200), -- ENTRPS_NM / 업체명
  "BIZCND_DVS_NM" VARCHAR(200), -- BIZCND_DVS_NM / 업태
  "CTPRVN_NM" VARCHAR(200), -- CTPRVN_NM / 주소
  "VILT_ENTRPS_RELS_YN" VARCHAR(1), -- VILT_ENTRPS_RELS_YN / 위반업체해제여부
  "VILT_ENTRPS_RELS_DT" DATE, -- VILT_ENTRPS_RELS_DT / 위반업체해제일자
  "DISCL_DTM" DATE, -- DISCL_DTM / 단속일자
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 단속기관명
  "ORGNP_DVS_NM" VARCHAR(30), -- ORGNP_DVS_NM / 원산지구분
  "VILT_MATR_DVS_NM" VARCHAR(30), -- VILT_MATR_DVS_NM / 위반사항구분
  "MPRC_DVS_NM" VARCHAR(30) -- MPRC_DVS_NM / 수산물구분
);

-- -----------------------------------------------------------------------------
-- I2850 / 식중독 원인물질별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2850" (
  "OCCRNC_YEAR" NUMERIC(18,0), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" NUMERIC(18,0), -- OCCRNC_MM / 발생월
  "OCCRNC_VIRS" VARCHAR(100), -- OCCRNC_VIRS / 발생물질
  "OCCRNC_CNT" NUMERIC(18,0), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" NUMERIC(18,0) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I2849 / 식중독 원인시설별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2849" (
  "OCCRNC_YEAR" NUMERIC(18,0), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" NUMERIC(18,0), -- OCCRNC_MM / 발생월
  "OCCRNC_PLC" VARCHAR(100), -- OCCRNC_PLC / 발생장소
  "OCCRNC_CNT" NUMERIC(18,0), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" NUMERIC(18,0) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I2848 / 식중독 지역별 현황
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2848" (
  "OCCRNC_YEAR" NUMERIC(18,0), -- OCCRNC_YEAR / 발생년
  "OCCRNC_MM" NUMERIC(18,0), -- OCCRNC_MM / 발생월
  "OCCRNC_AREA" VARCHAR(100), -- OCCRNC_AREA / 발생지역
  "OCCRNC_CNT" NUMERIC(18,0), -- OCCRNC_CNT / 발생건수
  "PATNT_CNT" NUMERIC(18,0) -- PATNT_CNT / 환자수
);

-- -----------------------------------------------------------------------------
-- I2854 / 식품별 유해오염물질 검출량
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2854" (
  "SNT_GBN" VARCHAR(30), -- SNT_GBN / 구분
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 식품유형
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 식품명
  "ANALS_YEAR" NUMERIC(18,0), -- ANALS_YEAR / 분석연도
  "COL_A_RESULT" VARCHAR(100), -- COL_A_RESULT / 다이옥신
  "COL_B_RESULT" VARCHAR(100), -- COL_B_RESULT / PCBs
  "COL_C_RESULT" VARCHAR(100), -- COL_C_RESULT / 벤조피렌
  "COL_D_RESULT" VARCHAR(100), -- COL_D_RESULT / 3-MCPD
  "COL_E_RESULT" VARCHAR(100), -- COL_E_RESULT / 총 아플라톡신
  "COL_F_RESULT" VARCHAR(100), -- COL_F_RESULT / 아플라톡신B1
  "COL_G_RESULT" VARCHAR(100), -- COL_G_RESULT / 오크라톡신
  "COL_H_RESULT" VARCHAR(100), -- COL_H_RESULT / 푸모니신
  "COL_I_RESULT" VARCHAR(100), -- COL_I_RESULT / 제랄레논
  "COL_J_RESULT" VARCHAR(100), -- COL_J_RESULT / 데옥시니발레놀
  "COL_K_RESULT" VARCHAR(100), -- COL_K_RESULT / 파튤린
  "COL_L_RESULT" VARCHAR(100), -- COL_L_RESULT / 아플라톡신M1
  "COL_M_RESULT" VARCHAR(100), -- COL_M_RESULT / 납
  "COL_N_RESULT" VARCHAR(100), -- COL_N_RESULT / 카드뮴
  "COL_O_RESULT" VARCHAR(100), -- COL_O_RESULT / 비소
  "COL_P_RESULT" VARCHAR(100), -- COL_P_RESULT / 무기비소
  "COL_Q_RESULT" VARCHAR(100), -- COL_Q_RESULT / 수은
  "COL_R_RESULT" VARCHAR(100), -- COL_R_RESULT / 메틸수은
  "COL_S_RESULT" VARCHAR(100), -- COL_S_RESULT / 주석
  "CRET_DTM" DATE -- CRET_DTM / 생성일자
);

-- -----------------------------------------------------------------------------
-- I2810 / 해외 위해식품 회수정보
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2810" (
  "TITL" VARCHAR(200), -- TITL / 제품명
  "DETECT_TITL" VARCHAR(200), -- DETECT_TITL / 유해물질
  "CRET_DTM" DATE, -- CRET_DTM / 생성일자
  "BDT" TEXT, -- BDT / 본문내용
  "DOWNLOAD_URL" VARCHAR(2000), -- DOWNLOAD_URL / 이미지 다운로드 URL
  "NTCTXT_NO" NUMERIC(18,0), -- NTCTXT_NO / 게시글번호 / PK 후보(HIGH)
  PRIMARY KEY ("NTCTXT_NO")
);

-- -----------------------------------------------------------------------------
-- I2715 / 해외직구 위해식품 차단정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2715" (
  "PRDT_NM" VARCHAR(200), -- PRDT_NM / 제품명
  "MUFC_NM" VARCHAR(200), -- MUFC_NM / 제조사명
  "MUFC_CNTRY_NM" VARCHAR(200), -- MUFC_CNTRY_NM / 제조국가명
  "INGR_NM_LST" VARCHAR(200), -- INGR_NM_LST / 위해성분명
  "STT_YMD" DATE, -- STT_YMD / 적용시작일
  "END_YMD" DATE, -- END_YMD / 적용종료일
  "CRET_DTM" DATE, -- CRET_DTM / 등록일
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "IMAGE_URL" VARCHAR(1000), -- IMAGE_URL / 이미지URL
  "SELF_IMPORT_SEQ" DATE, -- SELF_IMPORT_SEQ / 일련번호(고유키값) / PK 후보(HIGH)
  "BARCD_CTN" VARCHAR(50), -- BARCD_CTN / 바코드번호
  PRIMARY KEY ("SELF_IMPORT_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0470 / 행정처분결과
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0470" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(200), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "DSPS_DCSNDT" DATE, -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" DATE, -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" DATE, -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(30), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(1000), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "DSPSCN" VARCHAR(1000), -- DSPSCN / 처분내용
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 위반법령
  "PUBLIC_DT" DATE, -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "DSPS_INSTTCD_NM" VARCHAR(200), -- DSPS_INSTTCD_NM / 처분기관명
  "DSPSDTLS_SEQ" NUMERIC(18,0), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  PRIMARY KEY ("DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0482 / 행정처분결과(수입식품업)
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0482" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(200), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "DSPS_DCSNDT" DATE, -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" DATE, -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" DATE, -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(30), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" TEXT, -- VILTCN / 위반일자 및 위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(1000), -- DSPSCN / 처분내용
  "PUBLIC_DT" DATE, -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" NUMERIC(18,0), -- DSPSDTLS_SEQ / 행정처분전산키
  "DSPS_INSTTCD_NM" VARCHAR(200), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2630 / 행정처분결과(식품접객업)
-- 카테고리: 식품위해관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2630" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(200), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "DSPS_DCSNDT" DATE, -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" DATE, -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" DATE, -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(30), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(1000), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TEL_NO" VARCHAR(30), -- TEL_NO / 전화번호
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "DSPSCN" VARCHAR(1000), -- DSPSCN / 처분내용
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 위반법령
  "PUBLIC_DT" DATE, -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "DSPS_INSTTCD_NM" VARCHAR(200), -- DSPS_INSTTCD_NM / 처분기관명
  "DSPSDTLS_SEQ" NUMERIC(18,0), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  PRIMARY KEY ("DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0480 / 행정처분결과(식품제조가공업)
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0480" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(200), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 0.8%)
  "DSPS_DCSNDT" DATE, -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" DATE, -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" DATE, -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(30), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(1000), -- VILTCN / 위반일자및위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(1000), -- DSPSCN / 처분내용
  "PUBLIC_DT" DATE, -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" NUMERIC(18,0), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  "DSPS_INSTTCD_NM" VARCHAR(200), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("DSPSDTLS_SEQ"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0481 / 행정처분결과(식품판매업)
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0481" (
  "PRCSCITYPOINT_BSSHNM" VARCHAR(200), -- PRCSCITYPOINT_BSSHNM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "DSPS_DCSNDT" DATE, -- DSPS_DCSNDT / 처분확정일자
  "DSPS_BGNDT" DATE, -- DSPS_BGNDT / 처분시작일(영업정지의경우)
  "DSPS_ENDDT" DATE, -- DSPS_ENDDT / 처분종료일(영업정지의경우)
  "DSPS_TYPECD_NM" VARCHAR(30), -- DSPS_TYPECD_NM / 처분유형
  "VILTCN" VARCHAR(1000), -- VILTCN / 위반일자 및 위반내용
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "LAWORD_CD_NM" VARCHAR(200), -- LAWORD_CD_NM / 위반법령
  "DSPSCN" VARCHAR(1000), -- DSPSCN / 처분내용
  "PUBLIC_DT" DATE, -- PUBLIC_DT / 공개기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  "DSPSDTLS_SEQ" NUMERIC(18,0), -- DSPSDTLS_SEQ / 행정처분전산키 / PK 후보(HIGH)
  "DSPS_INSTTCD_NM" VARCHAR(200), -- DSPS_INSTTCD_NM / 처분기관명
  PRIMARY KEY ("DSPSDTLS_SEQ")
);

-- -----------------------------------------------------------------------------
-- I0490 / 회수.판매중지 정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0490" (
  "PRDTNM" VARCHAR(200), -- PRDTNM / 제품명
  "RTRVLPRVNS" VARCHAR(1000), -- RTRVLPRVNS / 회수사유
  "BSSHNM" VARCHAR(200), -- BSSHNM / 제조업체명
  "ADDR" VARCHAR(500), -- ADDR / 업체주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "BRCDNO" VARCHAR(50), -- BRCDNO / 바코드번호
  "FRMLCUNIT" VARCHAR(100), -- FRMLCUNIT / 포장단위
  "MNFDT" DATE, -- MNFDT / 제조일자
  "RTRVLPLANDOC_RTRVLMTHD" VARCHAR(1000), -- RTRVLPLANDOC_RTRVLMTHD / 회수방법
  "DISTBTMLMT" VARCHAR(200), -- DISTBTMLMT / 유통/소비기한
  "PRDLST_TYPE" VARCHAR(30), -- PRDLST_TYPE / 식품분류
  "IMG_FILE_PATH" VARCHAR(1000), -- IMG_FILE_PATH / 제품사진 URL
  "PRDLST_CD" VARCHAR(30), -- PRDLST_CD / 품목코드 / FK 후보: I2510.PRDLST_CD(HIGH, 9.2%)
  "CRET_DTM" DATE, -- CRET_DTM / 등록일
  "RTRVLDSUSE_SEQ" NUMERIC(18,0), -- RTRVLDSUSE_SEQ / 회수.판매중지 일련번호 / PK 후보(HIGH)
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호
  "RTRVL_GRDCD_NM" VARCHAR(200), -- RTRVL_GRDCD_NM / 회수등급
  "PRDLST_CD_NM" VARCHAR(200), -- PRDLST_CD_NM / 품목유형(품목코드명)
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 업체인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 2.2%), I1260.LCNS_NO(HIGH, 1.3%), I1220.LCNS_NO(HIGH, 0.4%)
  PRIMARY KEY ("RTRVLDSUSE_SEQ"),
  FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1790 / 농산물이력추적 생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1790" (
  "HIST_TRACE_REG_NO" VARCHAR(50), -- HIST_TRACE_REG_NO / 이력추적등록번호 / PK 후보(HIGH)
  "REG_INSTT_NM" VARCHAR(200), -- REG_INSTT_NM / 등록기관
  "RPRSNT_PRDLST_NM" VARCHAR(200), -- RPRSNT_PRDLST_NM / 대표품목
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "ORGN_NM" VARCHAR(200), -- ORGN_NM / 단체명
  "VALD_PRICE_BGN_DT" DATE, -- VALD_PRICE_BGN_DT / 유효기간시작일자
  "VALD_PRICE_END_DT" DATE, -- VALD_PRICE_END_DT / 유효기간종료일자
  PRIMARY KEY ("HIST_TRACE_REG_NO")
);

-- -----------------------------------------------------------------------------
-- I1800 / 농산물이력추적 유통정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1800" (
  "HIST_TRACE_REG_NO" VARCHAR(50), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "GRP_NM" VARCHAR(200), -- GRP_NM / 거래처명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(30) -- TELNO / 전화번호
);

-- -----------------------------------------------------------------------------
-- I1830 / 쇠고기(국내)이력추적 가공관리
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1830" (
  "ENTTY_IDNTFC_NO" NUMERIC(18,0), -- ENTTY_IDNTFC_NO / 개체식별번호
  "PRCSS_PLC_CD" VARCHAR(30), -- PRCSS_PLC_CD / 가공장소코드
  "PRCSS_DT" DATE, -- PRCSS_DT / 가공일자
  "PRCSS_PLC_NM" VARCHAR(200) -- PRCSS_PLC_NM / 가공장소명
);

-- -----------------------------------------------------------------------------
-- I1810 / 쇠고기(국내)이력추적 생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1810" (
  "ENTTY_IDNTFC_NO" NUMERIC(18,0), -- ENTTY_IDNTFC_NO / 개체식별번호 / PK 후보(HIGH)
  "BRTH_DT" DATE, -- BRTH_DT / 출생일자
  "ENTTY_STATS_NM" VARCHAR(200), -- ENTTY_STATS_NM / 개체상태명
  "COW_KND_NM" VARCHAR(200), -- COW_KND_NM / 소종류명
  "GND_NM" VARCHAR(200), -- GND_NM / 성별
  "FMH_NM" VARCHAR(200), -- FMH_NM / 농가명
  "VACIN_LAST_INOCL_DT" DATE, -- VACIN_LAST_INOCL_DT / 백신최종접종일자
  "VACIN_LAST_INOCL_OPNO" NUMERIC(18,0), -- VACIN_LAST_INOCL_OPNO / 백신최종접종차수
  PRIMARY KEY ("ENTTY_IDNTFC_NO")
);

-- -----------------------------------------------------------------------------
-- I1820 / 쇠고기(국내)이력추적 정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1820" (
  "ENTTY_IDNTFC_NO" NUMERIC(18,0), -- ENTTY_IDNTFC_NO / 개체식별번호
  "SLAU_PLC_NM" VARCHAR(200), -- SLAU_PLC_NM / 도축장소
  "SNTT_PRSEC_NM" VARCHAR(200), -- SNTT_PRSEC_NM / 위생검사
  "SLAU_YMD" DATE, -- SLAU_YMD / 도축년월일
  "ADDR" VARCHAR(500), -- ADDR / 도축장소주소
  "SNTT_PRSEC_PASS_ENNC" VARCHAR(1), -- SNTT_PRSEC_PASS_ENNC / 위생검사합격유무
  "PRCSS_DT" DATE, -- PRCSS_DT / 가공일자
  "PRCSS_PLC_NM" VARCHAR(200), -- PRCSS_PLC_NM / 가공장소명
  "BRTH_DT" DATE, -- BRTH_DT / 출생일자
  "ENTTY_STATS_NM" VARCHAR(200), -- ENTTY_STATS_NM / 개체상태명
  "COW_KND_NM" VARCHAR(200), -- COW_KND_NM / 소종류명
  "GND_NM" VARCHAR(200), -- GND_NM / 성별
  "FMH_NM" VARCHAR(200), -- FMH_NM / 농가명
  "VACIN_LAST_INOCL_DT" DATE, -- VACIN_LAST_INOCL_DT / 백신최종접종일자
  "VACIN_LAST_INOCL_OPNO" NUMERIC(18,0) -- VACIN_LAST_INOCL_OPNO / 백신최종접종차수
);

-- -----------------------------------------------------------------------------
-- I1920 / 수산물이력정보-기본정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1920" (
  "HIST_TRACE_REG_NO" VARCHAR(50), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "GOODS_NM" VARCHAR(200), -- GOODS_NM / 상품명
  "PRDLST_GROUP_DVS_NM" VARCHAR(200), -- PRDLST_GROUP_DVS_NM / 품목
  "ENTRPS_NM" VARCHAR(200), -- ENTRPS_NM / 업소명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "ADDR" VARCHAR(500) -- ADDR / 주소
);

-- -----------------------------------------------------------------------------
-- I1930 / 수산물이력정보-생산정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1930" (
  "HIST_TRACE_REG_NO" VARCHAR(50), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "LOTNO_WRHOUSNG" NUMERIC(18,0), -- LOTNO_WRHOUSNG / 로트번호입고
  "GOODS_NM" VARCHAR(200), -- GOODS_NM / 상품명
  "PRDLST_GROUP_DVS_NM" VARCHAR(200), -- PRDLST_GROUP_DVS_NM / 품목
  "SETT_QTY" NUMERIC(18,0), -- SETT_QTY / 입식수량
  "WRHOUSNG_DT" DATE, -- WRHOUSNG_DT / 입고일자
  "WRHOUSNG_QTY" NUMERIC(18,0), -- WRHOUSNG_QTY / 입고수량
  "PHHGH_UNIT_CD_NM" VARCHAR(200) -- PHHGH_UNIT_CD_NM / 입고단위
);

-- -----------------------------------------------------------------------------
-- I1940 / 수산물이력정보-출하정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1940" (
  "HIST_TRACE_REG_NO" VARCHAR(50), -- HIST_TRACE_REG_NO / 이력추적등록번호
  "LOTNO_RELES" NUMERIC(18,0), -- LOTNO_RELES / 로트번호출고
  "LOTNO_WRHOUSNG" NUMERIC(18,0), -- LOTNO_WRHOUSNG / 로트번호입고
  "PRDLST_GROUP_DVS_NM" VARCHAR(200), -- PRDLST_GROUP_DVS_NM / 품목
  "RELES_DVS_NM" VARCHAR(30), -- RELES_DVS_NM / 출고구분
  "PRDCTN_DT" DATE, -- PRDCTN_DT / 생산일자
  "PRDCTN_QTY" NUMERIC(18,0), -- PRDCTN_QTY / 생산수량
  "RELES_DT" DATE, -- RELES_DT / 출고일자
  "RELES_QTY" NUMERIC(18,0), -- RELES_QTY / 출고수량
  "RELES_UNIT_NM" VARCHAR(200) -- RELES_UNIT_NM / 출고단위
);

-- -----------------------------------------------------------------------------
-- I1720 / 수입쇠고기 유통이력정보
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1720" (
  "BL_NO" VARCHAR(50), -- BL_NO / 선하증권번호
  "INCM_BEEF_PRDLST_NM" VARCHAR(200), -- INCM_BEEF_PRDLST_NM / 수입쇠고기품목명
  "ORGNP_NATN_NM" VARCHAR(200), -- ORGNP_NATN_NM / 원산지국가명
  "EXCOURY_SLAU_PLC_NM" VARCHAR(200), -- EXCOURY_SLAU_PLC_NM / 수출국도축장소명
  "EXCOURY_SLAU_BGN_DT" DATE, -- EXCOURY_SLAU_BGN_DT / 수출국도축시작일자
  "EXCOURY_SLAU_END_DT" DATE, -- EXCOURY_SLAU_END_DT / 수출국도축종료일자
  "EXCOURY_PRCSS_PLC_NM" VARCHAR(300), -- EXCOURY_PRCSS_PLC_NM / 수출국가공장소명
  "EXCOURY_PRCSS_BGN_DT" DATE, -- EXCOURY_PRCSS_BGN_DT / 수출국가공시작일자
  "EXCOURY_PRCSS_END_DT" DATE, -- EXCOURY_PRCSS_END_DT / 수출국가공종료일자
  "XPORT_ENTRPS_NM" VARCHAR(200), -- XPORT_ENTRPS_NM / 수출업체명
  "INCM_ENTRPS_NM" VARCHAR(200), -- INCM_ENTRPS_NM / 수입업체명
  "INCM_DT" DATE, -- INCM_DT / 수입일자
  "REGN_NM" VARCHAR(200) -- REGN_NM / 부위명
);

-- -----------------------------------------------------------------------------
-- I0320 / 식품이력추적관리 등록 현황
-- 카테고리: 이력추적관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0320" (
  "REG_NUM" VARCHAR(50), -- REG_NUM / 등록번호
  "PDT_NM" VARCHAR(200), -- PDT_NM / 제품명
  "PDT_BARCD" VARCHAR(30), -- PDT_BARCD / 바코드
  "PDT_TYPE" VARCHAR(50), -- PDT_TYPE / 식품유형
  "MAKE_TYPE" VARCHAR(30), -- MAKE_TYPE / 제조구분
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "BRNCH_NM" VARCHAR(200), -- BRNCH_NM / 업체명
  "BTYPE" VARCHAR(100), -- BTYPE / 업종
  "FOOD_TYPE" VARCHAR(30), -- FOOD_TYPE / 식품구분
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목보고번호 / FK 후보: I0030.PRDLST_REPORT_NO(HIGH, 0.2%)
  "MNFT_DAY" DATE, -- MNFT_DAY / 제조일자
  "FOOD_HISTRACE_NUM" VARCHAR(50), -- FOOD_HISTRACE_NUM / 식품이력추적관리번호 / PK 후보(HIGH)
  "CRCL_PRD" DATE, -- CRCL_PRD / 소비기한
  "MOD_DT" DATE, -- MOD_DT / 최종수정일(YYYYMMDD)
  PRIMARY KEY ("FOOD_HISTRACE_NUM"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2846 / 어린이 급식센터 지원현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2846" (
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 관할기관
  "CNTER_NM" VARCHAR(200), -- CNTER_NM / 센터명
  "REPORT_YR" NUMERIC(18,0), -- REPORT_YR / 년도 / PK 후보(LOW)
  "REPORT_QU" NUMERIC(18,0), -- REPORT_QU / 분기
  "KNDRGR_REG_CO" NUMERIC(18,0), -- KNDRGR_REG_CO / 유치원 수
  "KNDRGR_NMPR_CO" NUMERIC(18,0), -- KNDRGR_NMPR_CO / 유치원 인원수
  "DCCNTR_REG_CO" NUMERIC(18,0), -- DCCNTR_REG_CO / 어린이집 수
  "DCCNTR_NMPR_CO" NUMERIC(18,0), -- DCCNTR_NMPR_CO / 어린이집 인원수
  "ETC_REG_CO" NUMERIC(18,0), -- ETC_REG_CO / 기타 수
  "ETC_NMPR_CO" NUMERIC(18,0), -- ETC_NMPR_CO / 기타 인원수
  PRIMARY KEY ("REPORT_YR")
);

-- -----------------------------------------------------------------------------
-- I0080 / 어린이 기호식품 품질인증 현황 및 재심사 현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0080" (
  "CHILD_FFQ_CRTFC_NO" DATE, -- CHILD_FFQ_CRTFC_NO / 인증번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 11.1%), I1220.LCNS_NO(HIGH, 2.3%), I2500.LCNS_NO(HIGH, 0.5%)
  "PRDLST_CD_NM" VARCHAR(30), -- PRDLST_CD_NM / 식품유형
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "CN_WT" VARCHAR(100), -- CN_WT / 제품용량
  "APPN_BGN_DT" DATE, -- APPN_BGN_DT / 인증일자
  "APPN_END_DT" DATE, -- APPN_END_DT / 만료일자
  "CHILD_FAVOR_FOOD_TYPE_NM" VARCHAR(200), -- CHILD_FAVOR_FOOD_TYPE_NM / 제품형태
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목보고번호 / FK 후보: I1310.PRDLST_REPORT_NO(HIGH, 0.7%)
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I0340 / 어린이 식품안전보호구역 관리 현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0340" (
  "HOLD_INSTT_NM" VARCHAR(200), -- HOLD_INSTT_NM / 관할기관
  "SCHL_NM" VARCHAR(200), -- SCHL_NM / 학교명
  "FOOD_SAFE_PRTC_ZONE_NM" VARCHAR(200), -- FOOD_SAFE_PRTC_ZONE_NM / 식품안전보호구역지정명
  "ADDR" VARCHAR(500), -- ADDR / 위치
  "APPN_DT" DATE, -- APPN_DT / 지정일자
  "BSSH_NO" NUMERIC(18,0), -- BSSH_NO / 업소고유번호(미사용)
  "UPSO_NM" VARCHAR(200), -- UPSO_NM / 업소명(미사용)
  "UPJONG" VARCHAR(500) -- UPJONG / 업종(미사용)
);

-- -----------------------------------------------------------------------------
-- I2840 / 어린이 우수판매업소 지정현황
-- 카테고리: 어린이식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2840" (
  "GNT_NO" VARCHAR(50), -- GNT_NO / 인허가번호 / PK 후보(HIGH)
  "UPSO_NM" VARCHAR(200), -- UPSO_NM / 업소명
  "UPJONG" VARCHAR(100), -- UPJONG / 업종
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APLC_DT" DATE, -- APLC_DT / 지정_일자
  "HOLD_INSTT_CD" VARCHAR(30), -- HOLD_INSTT_CD / 관할기관
  PRIMARY KEY ("GNT_NO")
);

-- -----------------------------------------------------------------------------
-- I0600 / HACCP 교육훈련기관 지정 현황
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0600" (
  "EDC_INSTT_APPN_NO" NUMERIC(18,0), -- EDC_INSTT_APPN_NO / 지정번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 교육훈련기관명
  "BSSH_ADDR" VARCHAR(500), -- BSSH_ADDR / 주소
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  PRIMARY KEY ("EDC_INSTT_APPN_NO")
);

-- -----------------------------------------------------------------------------
-- I0580 / HACCP 적용업소 지정 현황
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0580" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 5.0%), I2500.LCNS_NO(HIGH, 0.2%)
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "HACCP_APPN_DT" DATE, -- HACCP_APPN_DT / HACCP 지정일자
  "HACCP_APPN_NO" VARCHAR(50), -- HACCP_APPN_NO / HACCP 지정번호
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "ASGN_CANCL_DT" DATE, -- ASGN_CANCL_DT / 지정취소일자
  "CRTFC_ENDDT" DATE, -- CRTFC_ENDDT / 인증종료일자
  "CRTFC_RETN_DT" DATE, -- CRTFC_RETN_DT / 인증반납일자
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0610 / 축산물HACCP 지정정보
-- 카테고리: HACCP지정현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0610" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 9.8%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 업소주소
  "HACCP_APPN_DT" DATE, -- HACCP_APPN_DT / HACCP 지정일자
  "HACCP_APPN_NO" VARCHAR(50), -- HACCP_APPN_NO / HACCP 지정번호
  "ASGN_CANCL_DT" DATE, -- ASGN_CANCL_DT / 지정취소일자
  "CRTFC_ENDDT" DATE, -- CRTFC_ENDDT / 인증종료일자
  "CRTFC_RETN_DT" DATE, -- CRTFC_RETN_DT / 인증반납일자
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2857 / 공유주방운영업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2857" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2858 / 도축업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2858" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2852 / 생산중단제품정보
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2852" (
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 품목보고일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "END_DT" DATE, -- END_DT / 생산중단일자
  "PRDLST_DCNM" VARCHAR(200), -- PRDLST_DCNM / 품목유형명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 0.9%), I1220.LCNS_NO(HIGH, 1.7%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "FOOD_HF_LS_CL_CD_NM" VARCHAR(30), -- FOOD_HF_LS_CL_CD_NM / 구분
  "ARTCL_END_WHY" VARCHAR(1000), -- ARTCL_END_WHY / 생산중단사유
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2836 / 식용란선별포장업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2836" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2835 / 식육즉석판매가공업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2835" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2833 / 식품냉동.냉장업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2833" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2831 / 식품소분업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2831" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2830 / 식품운반업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2830" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I-0010 / 식품조사처리업 인허가 현황
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0010" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "FOOD_HF_LS_CL_CD_NM" VARCHAR(30), -- FOOD_HF_LS_CL_CD_NM / 식품건기축산분류
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2832 / 식품판매업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2832" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I2500.LCNS_NO(HIGH, 0.6%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2714 / 위생용품수입업영업신고대장
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2714" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2851 / 위생용품영업 생산실적보고
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2851" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(30), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(30), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 42.1%)
  "EVL_YR" NUMERIC(18,0), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호 / FK 후보: I2711.PRDLST_REPORT_NO(HIGH, 6.4%)
  "PRDCTN_QY" NUMERIC(18,4), -- PRDCTN_QY / 생산량(KG/위생물수건:매)
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I2713 / 위생용품영업정보
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2713" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2711 / 위생용품품목제조보고
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2711" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 78.4%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(30), -- PRDLST_DCNM / 유형
  "PRODUCTION" VARCHAR(1), -- PRODUCTION / 생산종료여부
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 유통/소비기한
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일자
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2712 / 위생용품품목제조보고(원재료)
-- 카테고리: 위생용품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2712" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I2713.LCNS_NO(HIGH, 70.6%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH) / FK 후보: I2711.PRDLST_REPORT_NO(HIGH, 4.8%)
  "PRMS_DT" DATE, -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(30), -- PRDLST_DCNM / 유형
  "RAWMTRL_NM" VARCHAR(300), -- RAWMTRL_NM / 원재료
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1300 / 축산물 가공업허가정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1300" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1330 / 축산물 보관업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1330" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1420 / 축산물 생산실적정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1420" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(30), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(30), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "EVL_YR" NUMERIC(18,0), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH)
  "FYER_PRDCTN_ABRT_QY" NUMERIC(18,4), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG)
  "PRDCTN_QY" NUMERIC(18,4), -- PRDCTN_QY / 생산량(KG)
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1320 / 축산물 식육포장처리업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1320" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "CLSBIZ_DVS_NM" VARCHAR(30), -- CLSBIZ_DVS_NM / 영업상태
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1340 / 축산물 운반업영업신고대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1340" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1370 / 축산물 집유업영업허가대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1370" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "CLSBIZ_DVS_NM" VARCHAR(30), -- CLSBIZ_DVS_NM / 영업상태
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업 일자
  "CLSTMP_BGN_DT" DATE, -- CLSTMP_BGN_DT / 휴업시작일자
  "CLSTMP_END_DT" DATE, -- CLSTMP_END_DT / 휴업종료일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1350 / 축산물 판매업영업신고대장
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1350" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1310 / 축산물 품목제조정보
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1310" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 100.0%), I2500.LCNS_NO(HIGH, 30.0%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(30), -- PRDLST_DCNM / 유형
  "PRODUCTION" VARCHAR(1), -- PRODUCTION / 생산종료여부
  "HIENG_LNTRT_DVS_NM" VARCHAR(1), -- HIENG_LNTRT_DVS_NM / 고열량저영양식품여부
  "CHILD_CRTFC_YN" VARCHAR(1), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 소비기한
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일자
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C006 / 축산물품목제조보고(원재료)
-- 카테고리: 축산물
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C006" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(30), -- PRDLST_DCNM / 유형
  "RAWMTRL_NM" VARCHAR(200), -- RAWMTRL_NM / 원재료
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1300.LCNS_NO(HIGH, 9.6%)
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자
  "RAWMTRL_ORDNO" NUMERIC(18,0), -- RAWMTRL_ORDNO / 원재료표시순서
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I-0050 / 건강기능식품 개별인정형 정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0050" (
  "HF_FNCLTY_MTRAL_RCOGN_NO" VARCHAR(50), -- HF_FNCLTY_MTRAL_RCOGN_NO / 원료인정번호
  "DAY_INTK_HIGHLIMIT" VARCHAR(100), -- DAY_INTK_HIGHLIMIT / 1일 섭취량 상한선
  "DAY_INTK_LOWLIMIT" VARCHAR(100), -- DAY_INTK_LOWLIMIT / 1일 섭취량 하한선
  "WT_UNIT" VARCHAR(100), -- WT_UNIT / 중량 단위
  "RAWMTRL_NM" VARCHAR(200), -- RAWMTRL_NM / 원재료 명
  "IFTKN_ATNT_MATR_CN" VARCHAR(1000), -- IFTKN_ATNT_MATR_CN / 섭취시 주의 사항 내용
  "PRIMARY_FNCLTY" VARCHAR(1000) -- PRIMARY_FNCLTY / 주된 기능성
);

-- -----------------------------------------------------------------------------
-- I-0040 / 건강기능식품 기능성 원료인정현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0040" (
  "HF_FNCLTY_MTRAL_RCOGN_NO" VARCHAR(50), -- HF_FNCLTY_MTRAL_RCOGN_NO / 인정번호
  "PRMS_DT" DATE, -- PRMS_DT / 인정일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업체명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "APLC_RAWMTRL_NM" VARCHAR(200), -- APLC_RAWMTRL_NM / 신청원료명
  "FNCLTY_CN" VARCHAR(1000), -- FNCLTY_CN / 기능성 내용
  "DAY_INTK_CN" VARCHAR(1000), -- DAY_INTK_CN / 1일 섭취량
  "IFTKN_ATNT_MATR_CN" VARCHAR(1000) -- IFTKN_ATNT_MATR_CN / 섭취시 주의사항
);

-- -----------------------------------------------------------------------------
-- I0310 / 건강기능식품 생산실적 보고 품목 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0310" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "GUBUN" VARCHAR(30), -- GUBUN / 품목구분
  "H_ITEM_NM" VARCHAR(50), -- H_ITEM_NM / 품목유형
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "EVL_YR" NUMERIC(18,0), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호 / PK 후보(HIGH) / FK 후보: I0030.PRDLST_REPORT_NO(HIGH, 0.5%)
  "FYER_PRDCTN_ABRT_QY" NUMERIC(18,4), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG)
  "PRDCTN_QY" NUMERIC(18,4), -- PRDCTN_QY / 생산량(KG)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I-0020 / 건강기능식품 전문.벤처제조업인허가 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I-0020" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2710 / 건강기능식품 품목분류정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2710" (
  "PRDCT_NM" VARCHAR(200), -- PRDCT_NM / 품목명
  "IFTKN_ATNT_MATR_CN" VARCHAR(1000), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "PRIMARY_FNCLTY" VARCHAR(1000), -- PRIMARY_FNCLTY / 주된기능성
  "DAY_INTK_LOWLIMIT" NUMERIC(18,4), -- DAY_INTK_LOWLIMIT / 일일섭취량 하한
  "DAY_INTK_HIGHLIMIT" NUMERIC(18,4), -- DAY_INTK_HIGHLIMIT / 일일섭취량 상한
  "INTK_UNIT" VARCHAR(100), -- INTK_UNIT / 단위
  "INTK_MEMO" VARCHAR(1000), -- INTK_MEMO / REMARK
  "SKLL_IX_IRDNT_RAWMTRL" VARCHAR(300), -- SKLL_IX_IRDNT_RAWMTRL / 성분명
  "CRET_DTM" DATE, -- CRET_DTM / 최초등록일
  "LAST_UPDT_DTM" DATE -- LAST_UPDT_DTM / 최종수정일
);

-- -----------------------------------------------------------------------------
-- I0030 / 건강기능식품 품목제조 신고사항 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0030" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소_명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목_명
  "PRMS_DT" DATE, -- PRMS_DT / 허가_일자
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 소비기한_일수
  "DISPOS" VARCHAR(500), -- DISPOS / 제품형태
  "NTK_MTHD" VARCHAR(1000), -- NTK_MTHD / 섭취방법
  "PRIMARY_FNCLTY" TEXT, -- PRIMARY_FNCLTY / 주된기능성
  "IFTKN_ATNT_MATR_CN" VARCHAR(1000), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "CSTDY_MTHD" VARCHAR(1000), -- CSTDY_MTHD / 보관방법
  "PRDLST_CDNM" VARCHAR(30), -- PRDLST_CDNM / 유형
  "STDR_STND" TEXT, -- STDR_STND / 기준규격
  "HIENG_LNTRT_DVS_NM" VARCHAR(1), -- HIENG_LNTRT_DVS_NM / 고열량저영양여부
  "PRODUCTION" VARCHAR(1), -- PRODUCTION / 생산종료여부
  "CHILD_CRTFC_YN" VARCHAR(1), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "PRDT_SHAP_CD_NM" VARCHAR(200), -- PRDT_SHAP_CD_NM / 제품_형태_코드_명
  "FRMLC_MTRQLT" VARCHAR(300), -- FRMLC_MTRQLT / 포장재질
  "RAWMTRL_NM" VARCHAR(200), -- RAWMTRL_NM / 품목유형(기능지표성분)
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일자
  "INDIV_RAWMTRL_NM" VARCHAR(1000), -- INDIV_RAWMTRL_NM / 기능성 원재료
  "ETC_RAWMTRL_NM" VARCHAR(1000), -- ETC_RAWMTRL_NM / 기타 원재료
  "CAP_RAWMTRL_NM" VARCHAR(200), -- CAP_RAWMTRL_NM / 캡슐 원재료
  "FRMLC_MTHD" VARCHAR(1000), -- FRMLC_MTHD / 포장방법
  PRIMARY KEY ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- C003 / 건강기능식품 품목제조신고(원재료)
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C003" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH) / FK 후보: I0030.PRDLST_REPORT_NO(HIGH, 0.1%)
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "PRMS_DT" DATE, -- PRMS_DT / 보고일자
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 소비기한
  "DISPOS" VARCHAR(1000), -- DISPOS / 성상
  "NTK_MTHD" VARCHAR(1000), -- NTK_MTHD / 섭취방법
  "PRIMARY_FNCLTY" TEXT, -- PRIMARY_FNCLTY / 주된기능성
  "IFTKN_ATNT_MATR_CN" VARCHAR(1000), -- IFTKN_ATNT_MATR_CN / 섭취시주의사항
  "CSTDY_MTHD" VARCHAR(1000), -- CSTDY_MTHD / 보관방법
  "SHAP" VARCHAR(500), -- SHAP / 형태
  "STDR_STND" TEXT, -- STDR_STND / 기준규격
  "RAWMTRL_NM" VARCHAR(2000), -- RAWMTRL_NM / 원재료
  "CRET_DTM" DATE, -- CRET_DTM / 최초생성일시
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  "PRDT_SHAP_CD_NM" VARCHAR(200), -- PRDT_SHAP_CD_NM / 제품형태
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I0630 / 건강기능식품GMP 지정 현황
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0630" (
  "GMP_APPN_NO" DATE, -- GMP_APPN_NO / GMP지정번호 / PK 후보(HIGH)
  "APPN_DT" DATE, -- APPN_DT / 지정일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 업고고유번호
  "APPN_CANCL_DT" DATE, -- APPN_CANCL_DT / GMP취소일자
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  PRIMARY KEY ("GMP_APPN_NO")
);

-- -----------------------------------------------------------------------------
-- I2860 / 건강기능식품업소 인허가 변경 정보
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2860" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(1000), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(1000), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(1000) -- CHNG_PRVNS / 변경사유
);

-- -----------------------------------------------------------------------------
-- I1290 / 건강기능식품판매업
-- 카테고리: 건강기능식품
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1290" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0130 / LMO 수입 승인 현황
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0130" (
  "LMO_CONFM_NO" VARCHAR(50), -- LMO_CONFM_NO / 유전자 변형 생물체 승인번호
  "CONFM_DT" DATE, -- CONFM_DT / 승인일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "COMMON_NM" VARCHAR(200), -- COMMON_NM / 보통명
  "SYSTM_NM" VARCHAR(200), -- SYSTM_NM / 계통명
  "BNE_NM" VARCHAR(200), -- BNE_NM / 학명
  "PRPOS" VARCHAR(100), -- PRPOS / 용도
  "NATN_CD_NM" VARCHAR(200) -- NATN_CD_NM / 수입국
);

-- -----------------------------------------------------------------------------
-- I2050 / 수산물 해외등록시설정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2050" (
  "REG_NO" VARCHAR(50), -- REG_NO / 등록번호 / PK 후보(HIGH)
  "ENTRPS_NM" VARCHAR(200), -- ENTRPS_NM / 업체명
  "KND_CD_NM" VARCHAR(200), -- KND_CD_NM / 종류코드명
  "NLTY_NM" VARCHAR(200), -- NLTY_NM / 국적명
  "ENTRPS_ADDR" VARCHAR(500), -- ENTRPS_ADDR / 업체주소
  "ADDR_PRDT" VARCHAR(100), -- ADDR_PRDT / 주소제품
  "APPLC_DT" DATE, -- APPLC_DT / 적용일자
  "STATS_DVS" VARCHAR(30), -- STATS_DVS / 상태구분
  "POSTPNE_BGN_DT" DATE, -- POSTPNE_BGN_DT / 유예시작일자
  "POSTPNE_END_DT" DATE, -- POSTPNE_END_DT / 유예종료일자
  "POSTPNE_RELS_DT" DATE, -- POSTPNE_RELS_DT / 유예해제일자
  "CANCL_DT" DATE, -- CANCL_DT / 취소일자
  "RM" VARCHAR(100), -- RM / 비고
  PRIMARY KEY ("REG_NO")
);

-- -----------------------------------------------------------------------------
-- I2780 / 수입쇠고기 냉동전환 정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2780" (
  "MEATWATCH_NO" NUMERIC(18,0), -- MEATWATCH_NO / 이력번호
  "HIST_NO" NUMERIC(18,0), -- HIST_NO / 수입신고확인증번호
  "ORGNP_NM" VARCHAR(200), -- ORGNP_NM / 원산지
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 수입업체명
  "APLC_DTM" DATE, -- APLC_DTM / 신고일
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품명(한글)
  "FREEZING_CNVRS_QTY" NUMERIC(18,0), -- FREEZING_CNVRS_QTY / 전환수량(BOX)
  "FREEZING_CNVRS_WT" NUMERIC(18,4), -- FREEZING_CNVRS_WT / 전환중량(KG)
  "FRESH_DISTB_TMLMT_BGN_DT" DATE, -- FRESH_DISTB_TMLMT_BGN_DT / 냉장유통/소비기한 시작일자
  "FRESH_DISTB_TMLMT_DT" DATE, -- FRESH_DISTB_TMLMT_DT / 냉장유통/소비기한 만료일자
  "FREEZING_CNVRS_OPRTN_DT" DATE, -- FREEZING_CNVRS_OPRTN_DT / 냉동전환 실시일
  "FREEZING_CNVRS_PREARNGE_DT" DATE, -- FREEZING_CNVRS_PREARNGE_DT / 냉동전환 완료일
  "FREEZING_DISTB_TMLMT_DT" DATE, -- FREEZING_DISTB_TMLMT_DT / 냉동전환 후 유통/소비기한
  "ACCEPT_NO" VARCHAR(50) -- ACCEPT_NO / 축산물수입신고필증번호
);

-- -----------------------------------------------------------------------------
-- C001 / 수입식품등영업신고대장
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C001" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH) / FK 후보: I1260.LCNS_NO(HIGH, 100.0%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2781 / 수입축산물 냉동전환 정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2781" (
  "MEATWATCH_NO" NUMERIC(18,0), -- MEATWATCH_NO / 이력번호
  "ACCEPT_NO" VARCHAR(50), -- ACCEPT_NO / 축산물수입신고필증번호
  "HIST_NO" VARCHAR(50), -- HIST_NO / 수입신고확인증번호
  "ORGNP_NM" VARCHAR(200), -- ORGNP_NM / 원산지
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 수입업체명
  "APLC_DTM" DATE, -- APLC_DTM / 신고일
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품명(한글)
  "FREEZING_CNVRS_QTY" NUMERIC(18,0), -- FREEZING_CNVRS_QTY / 전환수량(BOX)
  "FREEZING_CNVRS_WT" NUMERIC(18,4), -- FREEZING_CNVRS_WT / 전환중량(KG)
  "FRESH_DISTB_TMLMT_BGN_DT" DATE, -- FRESH_DISTB_TMLMT_BGN_DT / 냉장유통/소비기한 시작일자
  "FRESH_DISTB_TMLMT_DT" DATE, -- FRESH_DISTB_TMLMT_DT / 냉장유통/소비기한 만료일자
  "FREEZING_CNVRS_OPRTN_DT" DATE, -- FREEZING_CNVRS_OPRTN_DT / 냉동전환 실시일
  "FREEZING_CNVRS_PREARNGE_DT" DATE, -- FREEZING_CNVRS_PREARNGE_DT / 냉동전환 완료일
  "FREEZING_DISTB_TMLMT_DT" DATE -- FREEZING_DISTB_TMLMT_DT / 냉동전환 후 유통/소비기한
);

-- -----------------------------------------------------------------------------
-- I1260 / 식품등수입판매업정보
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1260" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I0250 / 우수수입업소 등록 현황
-- 카테고리: 수입식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0250" (
  "EXCLNC_INCM_BSSH_REGNO" VARCHAR(50), -- EXCLNC_INCM_BSSH_REGNO / 우수수입업소등록번호
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "ADDR" VARCHAR(500), -- ADDR / 소재지
  "EXCOURY_NATN_CD_NM" VARCHAR(200), -- EXCOURY_NATN_CD_NM / 수출국가
  "INCM_PRDT_XPORT_MC_NM" VARCHAR(200), -- INCM_PRDT_XPORT_MC_NM / 수입제품제조회사명
  "PRDLST_CNT" NUMERIC(18,0), -- PRDLST_CNT / 품목수
  "PRDLST_NM" VARCHAR(2000), -- PRDLST_NM / 품목명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1260.LCNS_NO(HIGH, 2.5%)
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1240 / 기구.용기포장제조업
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1240" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2847 / 나트륨 줄이기 실천음식점 지정업체 대장
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2847" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업체명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 영업소재지
  "APPT_YMD" DATE, -- APPT_YMD / 지정일자
  "ETC_INFO" VARCHAR(500), -- ETC_INFO / 기타정보
  "INSTT_NM" VARCHAR(200) -- INSTT_NM / 관할기관
);

-- -----------------------------------------------------------------------------
-- I1380 / 수산물 수입업체 현황 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1380" (
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종코드명
  "BSN_PRMS_NO_1" VARCHAR(50), -- BSN_PRMS_NO_1 / 영업허가번호
  "ENTRPS_KOR_NM" VARCHAR(200), -- ENTRPS_KOR_NM / 업체한글명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "RM" VARCHAR(100), -- RM / 비고
  "PRSDNT_KOR_NM" VARCHAR(200) -- PRSDNT_KOR_NM / 대표자명
);

-- -----------------------------------------------------------------------------
-- I1250 / 식품(첨가물)품목제조보고
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1250" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I2500.LCNS_NO(HIGH, 100.0%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 제품명
  "PRDLST_DCNM" VARCHAR(200), -- PRDLST_DCNM / 품목유형명
  "PRODUCTION" VARCHAR(1), -- PRODUCTION / 생산종료여부
  "HIENG_LNTRT_DVS_NM" VARCHAR(1), -- HIENG_LNTRT_DVS_NM / 고열량저영양식품여부
  "CHILD_CRTFC_YN" VARCHAR(1), -- CHILD_CRTFC_YN / 어린이기호식품품질인증여부
  "POG_DAYCNT" VARCHAR(100), -- POG_DAYCNT / 소비기한
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일자
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "QLITY_MNTNC_TMLMT_DAYCNT" VARCHAR(100), -- QLITY_MNTNC_TMLMT_DAYCNT / 품질유지기한일수
  "USAGE" VARCHAR(2000), -- USAGE / 용법
  "PRPOS" VARCHAR(500), -- PRPOS / 용도
  "DISPOS" VARCHAR(100), -- DISPOS / 제품형태
  "FRMLC_MTRQLT" VARCHAR(100), -- FRMLC_MTRQLT / 포장재질
  "ETQTY_XPORT_PRDLST_YN" VARCHAR(1), -- ETQTY_XPORT_PRDLST_YN / 내수/겸용구분(N:내수, O:겸용)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C002 / 식품(첨가물)품목제조보고(원재료)
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C002" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 6.3%), I2500.LCNS_NO(HIGH, 1.1%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조번호 / PK 후보(HIGH) / FK 후보: I1250.PRDLST_REPORT_NO(HIGH, 0.2%)
  "PRMS_DT" DATE, -- PRMS_DT / 보고일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "PRDLST_DCNM" VARCHAR(200), -- PRDLST_DCNM / 품목유형명
  "RAWMTRL_NM" VARCHAR(300), -- RAWMTRL_NM / 원재료명
  "RAWMTRL_ORDNO" NUMERIC(18,0), -- RAWMTRL_ORDNO / 원재료표시순서
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자(YYYYMMDD)
  "ETQTY_XPORT_PRDLST_YN" VARCHAR(1), -- ETQTY_XPORT_PRDLST_YN / 내수/겸용구분(N:내수, O:겸용)
  PRIMARY KEY ("PRDLST_REPORT_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO"),
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1250" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I0300 / 식품.식품첨가물 생산실적 보고 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0300" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 5.6%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "EVL_YR" NUMERIC(18,0), -- EVL_YR / 보고년도
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호
  "H_ITEM_NM" VARCHAR(30), -- H_ITEM_NM / 품목유형
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "FYER_PRDCTN_ABRT_QY" NUMERIC(18,4), -- FYER_PRDCTN_ABRT_QY / 연간생산능력(KG/옹기류:개)
  "PRDCTN_QY" NUMERIC(18,4), -- PRDCTN_QY / 생산량(KG/옹기류:개)
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1590 / 식품모범음식점
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1590" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "SIGNGU_NM" VARCHAR(200), -- SIGNGU_NM / 시군구
  "YEAR" VARCHAR(100), -- YEAR / 인허가연도
  "APLC_DT" DATE, -- APLC_DT / 신청일자
  "PNCPL_FOOD_NM" VARCHAR(200), -- PNCPL_FOOD_NM / 주된 음식명
  "APPN_DT" DATE, -- APPN_DT / 지정일자
  "OPERT_DT" DATE -- OPERT_DT / 작업일
);

-- -----------------------------------------------------------------------------
-- I2859 / 식품업소 인허가 변경 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2859" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 100.0%), I2500.LCNS_NO(HIGH, 0.3%)
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(1000), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(1000), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(1000), -- CHNG_PRVNS / 변경사유
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1560 / 식품위생교육내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1560" (
  "EDC_TYPE_NM" VARCHAR(30), -- EDC_TYPE_NM / 교육유형
  "EDC_DVS_NM" VARCHAR(30), -- EDC_DVS_NM / 교육구분
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "EDC_OBJ_NM" VARCHAR(200), -- EDC_OBJ_NM / 교육대상
  "CMPLTR_NAME" VARCHAR(200), -- CMPLTR_NAME / 성명
  "CTFHV_NO" VARCHAR(50), -- CTFHV_NO / 수료증번호 / PK 후보(HIGH)
  "COMPL_DTM" DATE, -- COMPL_DTM / 수료일자
  "EDC_MEDIA" VARCHAR(100), -- EDC_MEDIA / 매체
  "EDC_COMPL_NMPR" NUMERIC(18,0), -- EDC_COMPL_NMPR / 교육수료인원
  "INSTT_CD_NM" VARCHAR(200), -- INSTT_CD_NM / 교육기관명
  "EDC_PROCES_NM" VARCHAR(200), -- EDC_PROCES_NM / 교육과정명
  "EDC_PLC" VARCHAR(200), -- EDC_PLC / 교육장소명
  "ADDR" VARCHAR(500), -- ADDR / 업소주소
  PRIMARY KEY ("CTFHV_NO")
);

-- -----------------------------------------------------------------------------
-- I1540 / 식품위생등급평가관리내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1540" (
  "EVL_SCORE" VARCHAR(500), -- EVL_SCORE / EVL_SCORE
  "EVL_SEQ" VARCHAR(500), -- EVL_SEQ / EVL_SEQ / PK 후보(HIGH)
  "PRSDNT_NM" VARCHAR(500), -- PRSDNT_NM / PRSDNT_NM
  "EVL_TYPE_DVS_CD_NM" VARCHAR(500), -- EVL_TYPE_DVS_CD_NM / EVL_TYPE_DVS_CD_NM
  "EVL_INCPCTY_YN" VARCHAR(500), -- EVL_INCPCTY_YN / EVL_INCPCTY_YN
  "BSSH_LOC_CD_NM" VARCHAR(500), -- BSSH_LOC_CD_NM / BSSH_LOC_CD_NM
  "LCNS_NO" VARCHAR(500), -- LCNS_NO / LCNS_NO / FK 후보: I1220.LCNS_NO(HIGH, 0.3%)
  "EVL_GRD_CD_NM" VARCHAR(500), -- EVL_GRD_CD_NM / EVL_GRD_CD_NM
  "BSSH_NM" VARCHAR(500), -- BSSH_NM / BSSH_NM
  "EVL_DT" VARCHAR(500), -- EVL_DT / EVL_DT
  "EVL_PLAN_DT" VARCHAR(500), -- EVL_PLAN_DT / EVL_PLAN_DT
  "ADDR" VARCHAR(500), -- ADDR / ADDR
  PRIMARY KEY ("EVL_SEQ"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- C004 / 식품접객업소 위생등급 지정현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "C004" (
  "HG_ASGN_NM" VARCHAR(200), -- HG_ASGN_NM / 지정기관
  "HG_ASGN_LV" VARCHAR(100), -- HG_ASGN_LV / 지정등급
  "HG_ASGN_NO" VARCHAR(50), -- HG_ASGN_NO / 지정번호 / PK 후보(HIGH)
  "HG_ASGN_YMD" DATE, -- HG_ASGN_YMD / 지정일자
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "ASGN_FROM" DATE, -- ASGN_FROM / 지정시작일자
  "ASGN_TO" DATE, -- ASGN_TO / 지정종료일자
  "TELNO" VARCHAR(30), -- TELNO / 업소전화번호
  "WRKR_REG_NO" VARCHAR(50), -- WRKR_REG_NO / 사업자등록번호
  "ASGN_CANCEL_YMD" DATE, -- ASGN_CANCEL_YMD / 지정취소일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 영업상태
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자(YYYYMMDD)
  "INSTT_CD_NM" VARCHAR(200), -- INSTT_CD_NM / 인허가관할기관
  PRIMARY KEY ("HG_ASGN_NO")
);

-- -----------------------------------------------------------------------------
-- I1200 / 식품접객업정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1200" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "HG_LV" VARCHAR(100), -- HG_LV / 위생등급
  "ASGN_GIGAN_FROM" DATE, -- ASGN_GIGAN_FROM / 위생등급지정시작일
  "ASGN_GIGAN_TO" DATE, -- ASGN_GIGAN_TO / 위생등급지정종료일
  "PART_GBN" VARCHAR(1), -- PART_GBN / 나트륨저감화업소여부
  "JOIN_YMD" DATE, -- JOIN_YMD / 나트륨저감화참여일
  "APPT_YMD" DATE, -- APPT_YMD / 나트륨저감화업소지정일
  "CALC_YMD" DATE, -- CALC_YMD / 나트륨저감화업소취소일
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "SITE_X" NUMERIC(18,4), -- SITE_X / 위도
  "SITE_Y" NUMERIC(18,4), -- SITE_Y / 경도
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  "CRET_DTM" DATE, -- CRET_DTM / 데이터생성일시
  "BSN_LCNS_LEDG_NO" NUMERIC(18,0), -- BSN_LCNS_LEDG_NO / 영업대장전산키(고유값) / PK 후보(HIGH)
  "PET_OUTIN_YN" VARCHAR(1), -- PET_OUTIN_YN / 반려동물출입여부
  PRIMARY KEY ("BSN_LCNS_LEDG_NO")
);

-- -----------------------------------------------------------------------------
-- I1220 / 식품제조가공업정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1220" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1230 / 식품첨가물제조업
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1230" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가 번호 / PK 후보(HIGH) / FK 후보: I2500.LCNS_NO(HIGH, 1.2%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO"),
  FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1550 / 위생공통교육기관내역
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1550" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "ZIPNO" VARCHAR(50), -- ZIPNO / 우편번호
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "LOCP_ADDR_DTL" VARCHAR(100), -- LOCP_ADDR_DTL / 주소상세
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRMS_DT" DATE -- PRMS_DT / 허가일자
);

-- -----------------------------------------------------------------------------
-- I0680 / 위생관리등급별 업소 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0680" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / FK 후보: I1220.LCNS_NO(HIGH, 0.3%)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "EVL_TYPE_DVS_NM" VARCHAR(30), -- EVL_TYPE_DVS_NM / 평가유형
  "EVL_GRD_NM" VARCHAR(200), -- EVL_GRD_NM / 평가등급
  "EVL_DT" DATE, -- EVL_DT / 평가일자
  FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2861 / 음식점업소 인허가 변경 정보
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2861" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종명
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 주소
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자
  "CHNG_BF_CN" VARCHAR(1000), -- CHNG_BF_CN / 변경전내용
  "CHNG_AF_CN" VARCHAR(1000), -- CHNG_AF_CN / 변경후내용
  "CHNG_PRVNS" VARCHAR(1000) -- CHNG_PRVNS / 변경사유
);

-- -----------------------------------------------------------------------------
-- I0060 / 주류제조.면허자 식품제조.가공영업 등록 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0060" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종명
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I1210 / 집단급식소 설치 현황
-- 카테고리: 식품 등
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1210" (
  "CNCTR_MANAGE_BSSH_NO" NUMERIC(18,0), -- CNCTR_MANAGE_BSSH_NO / 집중관리업소번호 / PK 후보(HIGH)
  "SIGNGU_CD_NM" VARCHAR(200), -- SIGNGU_CD_NM / 시군구명
  "INDUTY_CL_CD_NM" VARCHAR(200), -- INDUTY_CL_CD_NM / 업종분류명
  "CNCTR_MANAGE_YN" VARCHAR(1), -- CNCTR_MANAGE_YN / 집중관리여부
  "MLSV_MTHD_CD_NM" VARCHAR(200), -- MLSV_MTHD_CD_NM / 급식방법명
  "FCPRV_NM" VARCHAR(200), -- FCPRV_NM / 급식소명
  "FCPRV_PRSDNT_NM" VARCHAR(200), -- FCPRV_PRSDNT_NM / 급식소대표자명
  "FCPRV_ADDR" VARCHAR(500), -- FCPRV_ADDR / 급식소주소
  "CNSGN_BSSH_NM" VARCHAR(200), -- CNSGN_BSSH_NM / 위탁업소명
  "ORGN_MLSV_YN" VARCHAR(1), -- ORGN_MLSV_YN / 단체급식여부
  "CNSGN_PRSDNT_NM" VARCHAR(200), -- CNSGN_PRSDNT_NM / 위탁대표자명
  "CNSGN_BSSH_ADDR" VARCHAR(500), -- CNSGN_BSSH_ADDR / 위탁업소주소
  "RM" VARCHAR(100), -- RM / 비고
  PRIMARY KEY ("CNCTR_MANAGE_BSSH_NO")
);

-- -----------------------------------------------------------------------------
-- I2822 / 건강기능식품 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2822" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2821 / 수입식품업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2821" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2827 / 식육즉석판매가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2827" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2817 / 식품보존업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2817" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2815 / 식품소분업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2815" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2814 / 식품운반업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2814" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2819 / 식품접객업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2819" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2811 / 식품제조가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2811" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2813 / 식품첨가물제조업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2813" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2816 / 식품판매업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2816" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2837 / 용어사전(기구용기포장∙식의약품용어집)
-- 카테고리: 용어사전
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2837" (
  "WORD" VARCHAR(100), -- WORD / 단어 / PK 후보(LOW)
  "FRNTNFISH" VARCHAR(100), -- FRNTNFISH / 외국어
  "DTL_DESC" VARCHAR(1000), -- DTL_DESC / 설명
  "KEYWORD" VARCHAR(100), -- KEYWORD / 연관어
  "SAUS" VARCHAR(1000), -- SAUS / 출처
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일
  PRIMARY KEY ("WORD")
);

-- -----------------------------------------------------------------------------
-- I2839 / 건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2839" (
  "PLAN_CLCD" VARCHAR(30), -- PLAN_CLCD / 계획분류
  "CHCK_BGNDT" DATE, -- CHCK_BGNDT / 계획시작일자
  "CHCK_ENDDT" DATE, -- CHCK_ENDDT / 계획종료일자
  "EXC_INSTTCD" VARCHAR(30), -- EXC_INSTTCD / 점검기관
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "GIDCHCK_DT" DATE, -- GIDCHCK_DT / 지도점검일자
  "BLDINSCTR_NAME" VARCHAR(200), -- BLDINSCTR_NAME / 피점검자성명
  "GIDCHCK_RSLTCD" VARCHAR(100), -- GIDCHCK_RSLTCD / 점검결과
  "PLAN_TITL" VARCHAR(200) -- PLAN_TITL / 계획명
);

-- -----------------------------------------------------------------------------
-- I1910 / 농약 등록정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1910" (
  "PRDLST_KOR_NM" VARCHAR(200), -- PRDLST_KOR_NM / 농약명
  "PRDLST_ENG_NM" VARCHAR(200), -- PRDLST_ENG_NM / 농약영문명
  "BRND_NM" VARCHAR(200), -- BRND_NM / 상표명
  "AGCHM_PRDLST_NO" NUMERIC(18,0), -- AGCHM_PRDLST_NO / 품목번호
  "PRDLST_REG_NO" VARCHAR(50), -- PRDLST_REG_NO / 등록번호
  "MDC_SHAP_NM" VARCHAR(200), -- MDC_SHAP_NM / 제제형태
  "AGCHM_DVS_NM" VARCHAR(30), -- AGCHM_DVS_NM / 농약구분
  "PRPOS_DVS_CD_NM" VARCHAR(200), -- PRPOS_DVS_CD_NM / 용도
  "SICKNS_HLSCT_NM_WEEDS_NM" VARCHAR(200), -- SICKNS_HLSCT_NM_WEEDS_NM / 병해충/잡초명
  "CROPS_NM" VARCHAR(200), -- CROPS_NM / 작물명
  "AGCHM_USE_MTHD" VARCHAR(1000), -- AGCHM_USE_MTHD / 농약사용방법
  "USE_PPRTM" VARCHAR(100), -- USE_PPRTM / 사용적기
  "DILU_DRNG" VARCHAR(100), -- DILU_DRNG / 희석배수
  "USE_QTY" VARCHAR(50), -- USE_QTY / 사용수량
  "USE_UNIT" VARCHAR(100), -- USE_UNIT / 단위
  "USE_TMNO" VARCHAR(50), -- USE_TMNO / 사용횟수
  "BUSS_REG_NO" VARCHAR(50), -- BUSS_REG_NO / 업등록번호
  "BUSS_REG_EVNT_NM" VARCHAR(200), -- BUSS_REG_EVNT_NM / 업등록종목
  "CPR_NM" VARCHAR(200), -- CPR_NM / 법인명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  "MNF_INCM_DVS_NM" VARCHAR(30), -- MNF_INCM_DVS_NM / 제조/수입구분
  "PRDLST_REG_VALD_DT" DATE, -- PRDLST_REG_VALD_DT / 등록유효일자
  "PRDLST_REG_DT" DATE, -- PRDLST_REG_DT / 등록일자
  "TEST_DRGS_NM" VARCHAR(200), -- TEST_DRGS_NM / 시험약제명
  "PRDLST_REG_STND" VARCHAR(100), -- PRDLST_REG_STND / 등록규격
  "REG_YN_NM" VARCHAR(1), -- REG_YN_NM / 등록여부
  "PERSN_LVSTCK_TOXCTY" VARCHAR(100), -- PERSN_LVSTCK_TOXCTY / 사람/가축독성
  "ECLGY_TOXCTY" VARCHAR(100) -- ECLGY_TOXCTY / 생태독성
);

-- -----------------------------------------------------------------------------
-- I2410 / 물환경 수질정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2410" (
  "EXAM_ARA_NM" VARCHAR(200), -- EXAM_ARA_NM / 조사지역명
  "ABL_YN" VARCHAR(1), -- ABL_YN / 폐지여부
  "PRSEC_DT" DATE, -- PRSEC_DT / 검사일자
  "WATSA_DT" DATE, -- WATSA_DT / 채수일자
  "WATSA_TM" VARCHAR(100), -- WATSA_TM / 채수시간
  "MESURE_DP" NUMERIC(18,4), -- MESURE_DP / 측정깊이
  "TEMOD" NUMERIC(18,0), -- TEMOD / 수온
  "FLUX" NUMERIC(18,0), -- FLUX / 유량
  "PH" NUMERIC(18,4), -- PH / PH
  "BOD" NUMERIC(18,4), -- BOD / BOD
  "COD" NUMERIC(18,4), -- COD / COD
  "SS" NUMERIC(18,4), -- SS / SS
  "EEC_QTY" NUMERIC(18,0), -- EEC_QTY / 대장균군수량
  "TN" NUMERIC(18,4), -- TN / TN
  "TP" NUMERIC(18,4), -- TP / TP
  "DOC" NUMERIC(18,4), -- DOC / DOC
  "EC" NUMERIC(18,0), -- EC / EC
  "TOC" NUMERIC(18,4) -- TOC / TOC
);

-- -----------------------------------------------------------------------------
-- I0460 / 수거검사 계획 및 실적 관련 현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0460" (
  "PRCSCITYPOINT_INDUTYCD_NM" VARCHAR(200), -- PRCSCITYPOINT_INDUTYCD_NM / 업종
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "SITE_ADDR" VARCHAR(500), -- SITE_ADDR / 소재지
  "PRDTNM" VARCHAR(200), -- PRDTNM / 제품명
  "TKAWYDTM" DATE, -- TKAWYDTM / 수거일자
  "JDGMNT_CD_NM" VARCHAR(200), -- JDGMNT_CD_NM / 판정결과
  "EXC_INSTT_NM" VARCHAR(200), -- EXC_INSTT_NM / 수행기관명
  "TKAWYSPCI_TYPECD_NM" VARCHAR(30), -- TKAWYSPCI_TYPECD_NM / 검체구분
  "PRDLST_REPORT_NO" VARCHAR(50), -- PRDLST_REPORT_NO / 품목제조보고번호 / FK 후보: I1310.PRDLST_REPORT_NO(HIGH, 0.6%)
  "LAST_UPDT_DTM" DATE, -- LAST_UPDT_DTM / 최종수정일시
  "TKAWYPRNO" VARCHAR(50), -- TKAWYPRNO / 수거증번호
  "PLAN_TITL" VARCHAR(200), -- PLAN_TITL / 수거계획명
  FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")
);

-- -----------------------------------------------------------------------------
-- I1980 / 어류질병정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1980" (
  "DISS_NM" VARCHAR(200), -- DISS_NM / 질병명
  "DISS_CL_DVS_NM" VARCHAR(200), -- DISS_CL_DVS_NM / 질병분류구분명
  "ARA_DVS_NM" VARCHAR(200), -- ARA_DVS_NM / 지역구분명
  "FISHSPCS_NM" VARCHAR(200), -- FISHSPCS_NM / 어종명
  "SYMPTMS_CAUS_CN" VARCHAR(1000), -- SYMPTMS_CAUS_CN / 증상원인내용
  "CURE_PREVNT_MESUR_CN" VARCHAR(1000), -- CURE_PREVNT_MESUR_CN / 치료예방대책내용
  "DGNS_MTHD_CN" VARCHAR(1000) -- DGNS_MTHD_CN / 진단방법내용
);

-- -----------------------------------------------------------------------------
-- I0140 / 유전자변형식품등의 안전성 평가 심사 결과 현황
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0140" (
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목 명
  "GOODS_NM" VARCHAR(200), -- GOODS_NM / 상품 명
  "INJECTION_GENE_CN" VARCHAR(1000), -- INJECTION_GENE_CN / 삽입된 유전자 내용
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "PRMS_DT" DATE, -- PRMS_DT / 허가 일자
  "ENDOW_CHARTR_CN" VARCHAR(1000), -- ENDOW_CHARTR_CN / 부여된 특성 내용
  "GMO_SAFTY_NO" NUMERIC(18,0), -- GMO_SAFTY_NO / 통보 번호 / PK 후보(HIGH)
  "GMO_PRDT_KND_CL_NM" VARCHAR(200), -- GMO_PRDT_KND_CL_NM / 제품종류
  PRIMARY KEY ("GMO_SAFTY_NO")
);

-- -----------------------------------------------------------------------------
-- I1960 / 패류독소정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I1960" (
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "EXAM_SPOT_NM" VARCHAR(200), -- EXAM_SPOT_NM / 조사지점명
  "EXAM_SEAR_NM" VARCHAR(200), -- EXAM_SEAR_NM / 조사해역명
  "SPLORE_NO" NUMERIC(18,0), -- SPLORE_NO / 시료번호 / PK 후보(HIGH)
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  "PICK_DT" DATE, -- PICK_DT / 채취일자
  "WTNESSMAN_NM" VARCHAR(200), -- WTNESSMAN_NM / 입회자명
  "ORGNP_NM" VARCHAR(200), -- ORGNP_NM / 원산지명
  "SALT" VARCHAR(500), -- SALT / 염분
  "TEMOD" VARCHAR(500), -- TEMOD / 수온
  "SPLORE_DSUSE_DT" DATE, -- SPLORE_DSUSE_DT / 시료폐기일자
  "FIT_YN" VARCHAR(1), -- FIT_YN / 적합여부
  PRIMARY KEY ("SPLORE_NO")
);

-- -----------------------------------------------------------------------------
-- I0150 / 후대교배종의 안전성 평가 신청 및 검토 정보
-- 카테고리: 식품안전관리
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I0150" (
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "PRDLST_NM" VARCHAR(200), -- PRDLST_NM / 품목명
  "LMOCHILD_BTHTR_CRSS_YN" VARCHAR(1), -- LMOCHILD_BTHTR_CRSS_YN / 이종간교배여부
  "LMOCHILD_DFFPNT_YN" VARCHAR(1), -- LMOCHILD_DFFPNT_YN / 차이점여부
  "LMOCHILD_CHARTR_CHNGE_YN" VARCHAR(1), -- LMOCHILD_CHARTR_CHNGE_YN / 특성변화여부
  "GMO_PRDT_KND" VARCHAR(500), -- GMO_PRDT_KND / 제품종류
  "GOODS_NM" VARCHAR(200) -- GOODS_NM / 제품명
);

-- -----------------------------------------------------------------------------
-- I2500 / 인허가 업소 정보
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2500" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 영업고유구분번호(인허가번호) / PK 후보(HIGH)
  "INDUTY_CD_NM" VARCHAR(200), -- INDUTY_CD_NM / 업종
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "TELNO" VARCHAR(30), -- TELNO / 전화번호
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "ADDR" VARCHAR(500), -- ADDR / 주소
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2829 / 즉석판매제조가공업 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2829" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2834 / 집단급식소 인허가 대장
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2834" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2856 / 푸드트럭지정현황조회
-- 카테고리: 업체인허가현황
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2856" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "PRMS_DT" DATE, -- PRMS_DT / 인허가일자
  "INSTT_CDNM" VARCHAR(200), -- INSTT_CDNM / 인허가기관명
  "INDUTY_CDNM" VARCHAR(200), -- INDUTY_CDNM / 업종명
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 업소주소
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 업소대표자명
  "TELNO" VARCHAR(30), -- TELNO / 업소전화번호
  "CHNG_DT" DATE, -- CHNG_DT / 변경일자(YYYYMMDD)
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2818 / 용기.포장류제조업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2818" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2823 / 위생용품 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2823" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2812 / 즉석판매제조가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2812" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2820 / 집단급식소 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2820" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2824 / 축산물 가공업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2824" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2825 / 축산물 식육포장처리업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2825" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2826 / 축산물 판매업 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2826" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- -----------------------------------------------------------------------------
-- I2828 / 축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보
-- 카테고리: 폐업정보
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "I2828" (
  "LCNS_NO" VARCHAR(50), -- LCNS_NO / 인허가번호 / PK 후보(HIGH)
  "BSSH_NM" VARCHAR(200), -- BSSH_NM / 업소명
  "PRSDNT_NM" VARCHAR(200), -- PRSDNT_NM / 대표자명
  "INDUTY_NM" VARCHAR(200), -- INDUTY_NM / 업종
  "PRMS_DT" DATE, -- PRMS_DT / 허가일자
  "CLSBIZ_DT" DATE, -- CLSBIZ_DT / 폐업일자
  "CLSBIZ_DVS_CD_NM" VARCHAR(30), -- CLSBIZ_DVS_CD_NM / 페업상태
  "LOCP_ADDR" VARCHAR(500), -- LOCP_ADDR / 주소
  "INSTT_NM" VARCHAR(200), -- INSTT_NM / 기관명
  PRIMARY KEY ("LCNS_NO")
);

-- =============================================================================
-- FK 후보 전체 목록 (검토용 주석)
-- =============================================================================

-- FK 후보 [HIGH/100] "I2580"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 53.4% (117/219)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "개별기준규격" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 53.4%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I0960"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 60.9% (103/169)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "건강기능식품공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 60.9%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I2600"."CMMN_SPEC_CD" -> "I2590"."CMMN_SPEC_CD"
-- 값 포함률: 100.0% (26/26)
-- 사유: 대상 테이블 I2590의 PK 후보(HIGH)와 동일 필드 / 코드 계열 필드 / 값 포함률 100.0%
-- FOREIGN KEY ("CMMN_SPEC_CD") REFERENCES "I2590" ("CMMN_SPEC_CD")

-- FK 후보 [HIGH/100] "I2600"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 31.7% (44/139)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준규격" → "품목유형코드" 부모-자식 관계 확인 / 값 포함률 31.7%
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [HIGH/100] "I2600"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 5.4% (16/299)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준규격" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 5.4%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I2610"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 12.5% (1/8)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준제외" → "품목유형코드" 부모-자식 관계 확인 / 값 포함률 12.5%
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [HIGH/100] "I2610"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 57.1% (4/7)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "공통기준제외" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 57.1%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I1670"."DSPS_STDR_CD" -> "I2550"."DSPS_STDR_CD"
-- 값 포함률: 13.4% (66/493)
-- 사유: 대상 테이블 I2550의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 13.4%
-- FOREIGN KEY ("DSPS_STDR_CD") REFERENCES "I2550" ("DSPS_STDR_CD")

-- FK 후보 [HIGH/100] "I0940"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 16.9% (12/71)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품용 기구 및 용기.포장 공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 16.9%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "I0950"."TESTITM_CD" -> "I2530"."TESTITM_CD"
-- 값 포함률: 50.0% (17/34)
-- 사유: 대상 테이블 I2530의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품첨가물공전" → "시험항목코드" 부모-자식 관계 확인 / 값 포함률 50.0%
-- FOREIGN KEY ("TESTITM_CD") REFERENCES "I2530" ("TESTITM_CD")

-- FK 후보 [HIGH/100] "C005"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.1% (1/949)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "바코드연계제품정보" → "축산물 품목제조정보" 부모-자식 관계 확인 / 값 포함률 0.1%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I2560"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.3% (3/1000)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "영업소재지 GIS 코드" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 0.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2560"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.2% (2/1000)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.2%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2560"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 99.9% (999/1000)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "영업소재지 GIS 코드" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 99.9%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2620"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 3.5% (3/86)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "검사부적합(국내)" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 3.5%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0480"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.8% (2/260)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 업무 명칭 규칙: "행정처분결과(식품제조가공업)" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 0.8%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0490"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 9.2% (11/120)
-- 사유: 대상 테이블 I2510의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 코드 계열 필드 / 대표 마스터 테이블 규칙 적용 / 값 포함률 9.2%
-- FOREIGN KEY ("PRDLST_CD") REFERENCES "I2510" ("PRDLST_CD")

-- FK 후보 [HIGH/100] "I0490"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 2.2% (5/223)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "회수.판매중지 정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 2.2%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0490"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 1.3% (3/223)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0490"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.4% (1/223)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.4%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0320"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.2% (1/533)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.2%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I0080"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 11.1% (24/217)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "어린이 기호식품 품질인증 현황 및 재심사 현황" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 11.1%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0080"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 2.3% (5/217)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 2.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0080"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.5% (1/217)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.5%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0080"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.7% (5/742)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "어린이 기호식품 품질인증 현황 및 재심사 현황" → "축산물 품목제조정보" 부모-자식 관계 확인 / 값 포함률 0.7%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I0580"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 5.0% (33/660)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 5.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0580"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.2% (1/660)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "HACCP 적용업소 지정 현황" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.2%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0610"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 9.8% (95/974)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 업무 명칭 규칙: "축산물HACCP 지정정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 9.8%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2852"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.9% (1/115)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "생산중단제품정보" → "축산물 가공업허가정보" 부모-자식 관계 확인 / 값 포함률 0.9%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2852"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 1.7% (2/115)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.7%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2832"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.6% (6/1000)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품판매업 인허가 대장" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.6%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2851"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 42.1% (72/171)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 업무 명칭 규칙: "위생용품영업 생산실적보고" → "위생용품영업정보" 부모-자식 관계 확인 / 값 포함률 42.1%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2851"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 6.4% (48/755)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 업무 명칭 규칙: "위생용품영업 생산실적보고" → "위생용품품목제조보고" 부모-자식 관계 확인 / 값 포함률 6.4%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I2711"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 78.4% (29/37)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 78.4%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2712"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 70.6% (113/160)
-- 사유: 대상 테이블 I2713의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 70.6%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2713" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2712"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 4.8% (48/1000)
-- 사유: 대상 테이블 I2711의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +20 / 업무 명칭 규칙: "위생용품품목제조보고(원재료)" → "위생용품품목제조보고" 부모-자식 관계 확인 / 값 포함률 4.8%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I2711" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I1310"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 100.0% (10/10)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 100.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I1310"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 30.0% (3/10)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 30.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "C006"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 9.6% (11/115)
-- 사유: 대상 테이블 I1300의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 9.6%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1300" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0310"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.5% (5/1000)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 0.5%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "C003"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.1% (1/1000)
-- 사유: 대상 테이블 I0030의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +20 / 업무 명칭 규칙: "건강기능식품 품목제조신고(원재료)" → "건강기능식품 품목제조 신고사항 현황" 부모-자식 관계 확인 / 값 포함률 0.1%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I0030" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "C001"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 100.0% (1000/1000)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "수입식품등영업신고대장" → "식품등수입판매업정보" 부모-자식 관계 확인 / 값 포함률 100.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0250"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 2.5% (1/40)
-- 사유: 대상 테이블 I1260의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "우수수입업소 등록 현황" → "식품등수입판매업정보" 부모-자식 관계 확인 / 값 포함률 2.5%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1260" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I1250"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 100.0% (2/2)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 100.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "C002"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 6.3% (17/268)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 6.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "C002"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 1.1% (3/268)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.1%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "C002"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.2% (2/1000)
-- 사유: 대상 테이블 I1250의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 업무 명칭 규칙: "식품(첨가물)품목제조보고(원재료)" → "식품(첨가물)품목제조보고" 부모-자식 관계 확인 / 값 포함률 0.2%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1250" ("PRDLST_REPORT_NO")

-- FK 후보 [HIGH/100] "I0300"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 5.6% (3/54)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 데이터셋명 도메인 유사성 +10 / 값 포함률 5.6%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2859"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 100.0% (345/345)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품업소 인허가 변경 정보" → "식품제조가공업정보" 부모-자식 관계 확인 / 값 포함률 100.0%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I2859"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.3% (1/345)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "식품업소 인허가 변경 정보" → "인허가 업소 정보" 부모-자식 관계 확인 / 값 포함률 0.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I1540"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.3% (2/755)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I1230"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 1.2% (12/1000)
-- 사유: 대상 테이블 I2500의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 1.2%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I2500" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0680"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.3% (2/755)
-- 사유: 대상 테이블 I1220의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 값 포함률 0.3%
-- FOREIGN KEY ("LCNS_NO") REFERENCES "I1220" ("LCNS_NO")

-- FK 후보 [HIGH/100] "I0460"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.6% (2/338)
-- 사유: 대상 테이블 I1310의 PK 후보(HIGH)와 동일 필드 / 공통 관계키 목록에 포함 / 대표 마스터 테이블 규칙 적용 / 업무 명칭 규칙: "수거검사 계획 및 실적 관련 현황" → "축산물 품목제조정보" 부모-자식 관계 확인 / 값 포함률 0.6%
-- FOREIGN KEY ("PRDLST_REPORT_NO") REFERENCES "I1310" ("PRDLST_REPORT_NO")

-- =============================================================================
-- 제외된 FK 후보 목록 (검토용 주석)
-- =============================================================================

-- 제외 FK 후보 "I2580"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/185)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0960"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/329)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2610"."CMMN_SPEC_CD" -> "I2590"."CMMN_SPEC_CD"
-- 값 포함률: 0.0% (0/6)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0940"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/56)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1101"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 미검증
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C005"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/949)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C005"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/949)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C005"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/949)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2560"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2560"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2570"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2570"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2570"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2570"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/464)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2640"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/12)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2640"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/12)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2640"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/12)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2640"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/12)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2640"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/12)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/52)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/86)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/86)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/86)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2620"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/86)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2854"."PRDLST_CD" -> "I2510"."PRDLST_CD"
-- 값 포함률: 0.0% (0/382)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0470"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0470"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0470"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0470"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0470"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/46)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/46)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/46)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/46)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0482"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/46)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/991)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/991)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/991)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/991)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2630"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/991)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/260)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/260)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/260)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0480"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/260)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/645)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/645)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/645)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/645)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0481"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/645)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/159)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/159)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/159)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/159)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/223)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0490"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/223)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0320"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/533)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0320"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/533)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0320"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/533)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/217)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0080"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/217)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/742)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/742)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0080"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/742)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0580"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/660)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0580"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/660)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0580"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/660)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/974)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/974)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/974)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0610"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/974)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/78)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/78)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/78)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/78)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2857"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/78)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/135)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/135)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/135)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/135)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2858"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/135)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2852"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/575)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/575)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/575)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/575)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2836"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/575)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2835"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/889)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/889)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/889)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/889)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2833"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/889)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2831"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2830"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/3)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/3)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/3)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/3)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0010"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/3)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2832"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2714"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/171)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/171)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/171)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/171)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2851"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/37)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/37)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/37)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2711"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/37)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/160)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/160)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/160)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/160)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2712"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1330"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/33)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/33)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/33)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/33)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/33)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1420"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1320"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1340"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1370"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1350"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/10)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/10)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1310"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/10)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C006"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/115)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/18)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/18)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/18)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/18)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/18)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0310"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/552)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/552)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/552)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/552)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I-0020"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/552)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/141)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/141)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/141)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/141)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0030"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/141)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/30)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/30)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/30)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/30)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/30)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C003"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/601)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/601)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/601)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/601)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0630"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/601)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/316)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/316)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/316)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/316)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2860"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/316)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1290"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C001"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/40)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/40)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/40)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0250"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/40)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1240"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2847"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/989)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/2)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/2)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/2)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1250"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/2)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/268)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/268)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/268)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C002"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/54)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/988)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I1310"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/988)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/988)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0300"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/988)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/807)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/807)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/807)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/807)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1590"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/807)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2859"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/345)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2859"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/345)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2859"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/345)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1560"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1560"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1560"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1560"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1560"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1540"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1540"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1540"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1540"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "C004"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I1230"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0680"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0680"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0680"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0680"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/755)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/157)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/157)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/157)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/157)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2861"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/157)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0060"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2822"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2821"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2827"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2817"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/600)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2817"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/600)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2817"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/600)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2817"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/600)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2817"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/600)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2815"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2814"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2819"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2811"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2813"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2816"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0460"."PRDLST_REPORT_NO" -> "I2711"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/338)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0460"."PRDLST_REPORT_NO" -> "I0030"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/338)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I0460"."PRDLST_REPORT_NO" -> "I1250"."PRDLST_REPORT_NO"
-- 값 포함률: 0.0% (0/338)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2829"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2834"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2856"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2818"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2823"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2812"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2820"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2824"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2825"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2826"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I2713"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1300"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1260"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I1220"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음

-- 제외 FK 후보 "I2828"."LCNS_NO" -> "I2500"."LCNS_NO"
-- 값 포함률: 0.0% (0/1000)
-- 제외 사유: 데이터가 없거나 조인(교집합)되는 값이 없음
