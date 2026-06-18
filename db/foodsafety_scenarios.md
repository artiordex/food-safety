# 데이터셋 사용 시나리오 분석 결과
> 생성일시: 2026-06-18T17:41:09.208+09:00

- 전체 시나리오: **13개** (Star: 8개, Chain: 5개)
- 전체 관계: **114개**
- HIGH 신뢰도 시나리오: **0개**
- SQL 검증 오류 시나리오: **0개**
- 통합 테마 후보: **8개**
- 통합 연결 경로: **30개**
- Louvain 데이터 세트 후보: **17개** (modularity 0.8447)

---

## Louvain 기반 테마별 데이터 세트 후보

| 세트ID | 테마명 | 데이터셋 수 | 관계 수 | 대표 키워드 | 주요 조인키 | 주요 카테고리 |
|---|---|---:|---:|---|---|---|
| LOUVAIN_01 | 시험검사 기준규격 연계 데이터 세트 | 9 | 24 | 기준규격정보, testitm_cd, kor_nm, use_yn, pc_kor_nm, t_kor_nm | TESTITM_CD(13), PRDLST_CD(6), VALDMANLI(1), CHOICIMPROPT(1), CHOICFIT(1), LV(1), CMMNSPECCD(1) | 기준규격정보(7), 코드정보(2) |
| LOUVAIN_12 | 건강기능식품 GMP 품목 연계 데이터 세트 | 7 | 19 | 건강기능식품, gmp, 현황, induty_cd_nm, prdlst_nm, pog_daycnt | LCNS_NO(18), PRDLST_REPORT_NO(1) | 건강기능식품(6), 업체인허가현황(1) |
| LOUVAIN_05 | HACCP 및 업체 인허가 연계 데이터 세트 | 12 | 18 | 축산물, haccp, prdlst_nm, induty_cd_nm, prdlst_dcnm, 식품 | LCNS_NO(17), RAWMTRLORDNO(1) | 축산물(5), 식품 등(3), 코드정보(1), 어린이식품안전관리(1), HACCP지정현황(1), 업체인허가현황(1) |
| LOUVAIN_09 | 식품위해 행정처분 연계 데이터 세트 | 7 | 15 | 식품위해관리, 행정처분결과, prcscitypoint_bsshnm, induty_cd_nm, dsps_dcsndt, dsps_bgndt | LCNS_NO(6), DSPSDTLSSEQ(3), BRCD_NO(2), TESTANALSRSLT(1), RTRVLDSUSESEQ(1), DISTBTMLMT(1), PRDLST_REPORT_NO(1) | 식품위해관리(7) |
| LOUVAIN_13 | 위생용품 인허가 연계 데이터 세트 | 5 | 6 | 위생용품, prdlst_nm, induty_nm, locp_addr, instt_nm, prdlst_dcnm | LCNS_NO(6) | 위생용품(4), 폐업정보(1) |
| LOUVAIN_02 | 식품위해 행정처분 연계 데이터 세트 | 3 | 3 | 기준규격정보, dsps_stdr_cd_nm, basis_laword, lv_no, vald_bgn_dt, vald_end_dt | BASISLAWORD(2), DSPSSTDRCD(1) | 기준규격정보(2), 코드정보(1) |
| LOUVAIN_11 | 이력추적관리 연계 데이터 세트 | 3 | 3 | 이력추적관리, 수산물이력정보, hist_trace_reg_no, prdlst_group_dvs_nm, goods_nm, lotno_wrhousng | HISTTRACEREGNO(3) | 이력추적관리(3) |
| LOUVAIN_16 | 식품 등 연계 데이터 세트 | 3 | 3 | 식품, 현황, evl_dt, 식품위생등급평가관리내역, 주류제조.면허자, 식품제조.가공영업 | LCNS_NO(3) | 식품 등(3) |
| LOUVAIN_06 | 수질환경 정보 연계 데이터 세트 | 2 | 3 | 수질환경정보, 지하수수질측정망, 측정결과, 토양지하수, 토양실태조사정보, cdmm | ORGNICPH(1), PCE(1), PHNL(1) | 수질환경정보(2) |
| LOUVAIN_07 | 수질환경 정보 연계 데이터 세트 | 2 | 3 | 수질정보, 수질환경정보, 하수도, 식품안전관리, 물환경, eec_qty | BOD(1), SS(1), COD(1) | 수질환경정보(1), 식품안전관리(1) |
| LOUVAIN_08 | 시험검사 기준규격 연계 데이터 세트 | 3 | 2 | 검사기관정보, 현황, 지정, appn_bgn_dt, prsec_instt_rcogn_no, appn_end_dt | WORKSCOPE(1), PRSECINSTTRCOGNNO(1) | 검사기관정보(3) |
| LOUVAIN_15 | 식품 등 연계 데이터 세트 | 3 | 2 | 식품, site_addr, 식품.식품첨가물, 생산실적, 보고, 현황 | LCNS_NO(2) | 식품 등(3) |
| LOUVAIN_03 | 시험검사 기준규격 연계 데이터 세트 | 2 | 1 | 기준규격정보, 동물용의약품, 현황, 동물의약품별, 잔류허용, 기준 | ANIMALONLYMDCINNMKOR(1) | 기준규격정보(2) |
| LOUVAIN_04 | 시험검사 기준규격 연계 데이터 세트 | 2 | 1 | 현황, lmo, 기준규격정보, 식품원료의, 한시적, 기준 | PRPOS(1) | 기준규격정보(1), 수입식품 등(1) |
| LOUVAIN_10 | 이력추적관리 연계 데이터 세트 | 2 | 1 | 이력추적관리, 쇠고기, 국내, 이력추적, 생산정보, 정보 | VACINLASTINOCLOPNO(1) | 이력추적관리(2) |
| LOUVAIN_14 | 수입식품 업체 연계 데이터 세트 | 2 | 1 | 수입식품, 식품등수입판매업정보, 수입식품등영업신고대장, induty_nm, locp_addr, instt_nm | LCNS_NO(1) | 수입식품 등(2) |
| LOUVAIN_17 | 식품 등 연계 데이터 세트 | 2 | 1 | 식품, 식품접객업정보, 음식점업소, 인허가, 변경, 정보 | LCNS_NO(1) | 식품 등(2) |

## PK/FK 그래프 기반 테마 데이터 세트 후보

| 테마ID | 테마명 | 테이블 수 | 관계 수 | 허브 테이블 | 대표 조인키 |
|---|---|---:|---:|---|---|
| THEME_01 | 인허가·검사부적합 데이터 세트 | 24 | 39 | I2530 시험항목코드 / I1310 축산물 품목제조정보 | LCNS_NO(14), PRDLST_CD(7), PRDLST_REPORT_NO(7), TESTITM_CD(6), BRCDNO(3) |
| THEME_03 | 위생용품품목제조보고·위생용품영업정보 데이터 세트 | 4 | 5 | I2713 위생용품영업정보 / I2711 위생용품품목제조보고 | LCNS_NO(3), PRDLST_REPORT_NO(2) |
| THEME_02 | 행정처분결과·식품제조가공업 데이터 세트 | 7 | 3 | I0470 행정처분결과 / I1220 식품제조가공업정보 | LCNS_NO(3) |
| THEME_04 | 건강기능식품·생산실적 데이터 세트 | 3 | 2 | I0310 건강기능식품 생산실적 보고 품목 현황 / I0030 건강기능식품 품목제조 신고사항 현황 | PRDLST_REPORT_NO(2) |
| THEME_05 | 식품등수입판매업정보·수입식품등영업신고대장 데이터 세트 | 3 | 2 | I1260 식품등수입판매업정보 / C001 수입식품등영업신고대장 | LCNS_NO(2) |
| THEME_06 | 식품접객업정보·식품접객업소 데이터 세트 | 3 | 2 | I1200 식품접객업정보 / C004 식품접객업소 위생등급 지정현황 | LCNS_NO(2) |
| THEME_07 | 과태료부과기준·처분기준코드 데이터 세트 | 2 | 2 | I1670 과태료부과기준 / I2550 처분기준코드 | DSPS_STDR_CD(2) |
| THEME_08 | 국외검사기관·인정 데이터 세트 | 2 | 1 | I0890 식품위생검사기관 지정 현황 / I0910 국외검사기관 인정 현황 | PRSEC_INSTT_RCOGN_NO(1) |

## PK/FK 그래프 기반 대표 연결 경로

| From | To | 홉 수 | 경로 |
|---|---|---:|---|
| C003 건강기능식품 품목제조신고(원재료) | I0310 건강기능식품 생산실적 보고 품목 현황 | 1 | C003 -> I0310 |
| C003 건강기능식품 품목제조신고(원재료) | I0030 건강기능식품 품목제조 신고사항 현황 | 1 | C003 -> I0030 |
| I0480 행정처분결과(식품제조가공업) | I0470 행정처분결과 | 1 | I0480 -> I0470 |
| I0480 행정처분결과(식품제조가공업) | I1220 식품제조가공업정보 | 1 | I0480 -> I1220 |
| I0490 회수.판매중지 정보 | I1300 축산물 가공업허가정보 | 1 | I0490 -> I1300 |
| I0490 회수.판매중지 정보 | I2510 품목유형코드 | 1 | I0490 -> I2510 |
| I0940 식품용 기구 및 용기.포장 공전 | I2530 시험항목코드 | 1 | I0940 -> I2530 |
| I0960 건강기능식품공전 | I2530 시험항목코드 | 1 | I0960 -> I2530 |
| I1310 축산물 품목제조정보 | I1300 축산물 가공업허가정보 | 1 | I1310 -> I1300 |
| I1310 축산물 품목제조정보 | I2500 인허가 업소 정보 | 1 | I1310 -> I2500 |
| I1670 과태료부과기준 | I2550 처분기준코드 | 1 | I1670 -> I2550 |
| I2550 처분기준코드 | I1670 과태료부과기준 | 1 | I2550 -> I1670 |
| I2580 개별기준규격 | I2530 시험항목코드 | 1 | I2580 -> I2530 |
| I2600 공통기준규격 | I2530 시험항목코드 | 1 | I2600 -> I2530 |
| I2600 공통기준규격 | I2510 품목유형코드 | 1 | I2600 -> I2510 |
| I2600 공통기준규격 | I2590 공통기준종류 | 1 | I2600 -> I2590 |
| I2610 공통기준제외 | I2530 시험항목코드 | 1 | I2610 -> I2530 |
| I2610 공통기준제외 | I2510 품목유형코드 | 1 | I2610 -> I2510 |
| I2620 검사부적합(국내) | I0490 회수.판매중지 정보 | 1 | I2620 -> I0490 |
| I2640 검사부적합 현황(농산물) | I0490 회수.판매중지 정보 | 1 | I2640 -> I0490 |

## SCN_CHAIN_004 — `CHAIN:TESTITM_CD+PRDLST_CD` 기반 (MEDIUM, 42점) 🔗 브릿지: `I2610`

**참여 데이터셋** (3개): I2610, I2580, I2600

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 개별기준규격 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | N:M | 6 | 3% | 86% | MEDIUM | `B20016, B10004` |
| 공통기준규격 | 품목분류코드(PRDLST_CD) | 공통기준제외 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 6 | 4% | 75% | MEDIUM | `C0000000000000, B0203010000000` |

```sql
SELECT
  A."CMMN_SPEC_CD" AS "A_공통기준규격코드",
  A."SPEC_NM" AS "A_기준규격명",
  A."PRDLST_CD" AS "A_품목코드",
  A."KOR_NM" AS "A_한글명",
  A."TESTITM_CD" AS "A_시험항목코드",
  A."LAST_UPDT_DTM" AS "A_최종수정일시",
  B."INDV_SPEC_SEQ" AS "B_개별기준규격일련번호",
  B."PRDLST_CD" AS "B_품목분류코드",
  B."PRDLST_CD_NM" AS "B_품목명",
  B."TESTITM_CD" AS "B_시험항목코드",
  B."TESTITM_NM" AS "B_시험항목명",
  B."FNPRT_ITM_NM" AS "B_세부항목명",
  B."ATTRB_SEQ" AS "B_단서조항일련번호",
  B."PIAM_KOR_NM" AS "B_단서조항명",
  B."SPEC_VAL" AS "B_기준규격",
  B."SPEC_VAL_SUMUP" AS "B_기준규격요약",
  B."VALD_BEGN_DT" AS "B_유효개시일",
  B."VALD_END_DT" AS "B_유효종료일",
  B."SORC" AS "B_출처",
  B."VALD_MANLI" AS "B_유효자리",
  B."JDGMNT_FOM_CD" AS "B_판정형식코드",
  B."A079_FNPRT_CD_NM" AS "B_판정형식명",
  B."MXMM_VAL" AS "B_최대값",
  B."MXMM_VAL_DVS_CD" AS "B_최대값구분코드",
  B."A081_FNPRT_CD_NM" AS "B_최대값구분명",
  B."MIMM_VAL" AS "B_최소값",
  B."MIMM_VAL_DVS_CD" AS "B_최소값구분코드",
  B."A080_FNPRT_CD_NM" AS "B_최소값구분명",
  B."CHOIC_FIT" AS "B_선택형적합코드",
  B."A082_CF_FNPRT_CD_NM" AS "B_선택형적합명",
  B."CHOIC_IMPROPT" AS "B_선택형부적합코드",
  B."A082_CI_FNPRT_CD_NM" AS "B_선택형부적합명",
  B."MCRRGNSM_2N" AS "B_미생물2N",
  B."MCRRGNSM_2C" AS "B_미생물2C",
  B."MCRRGNSM_2M" AS "B_미생물2M",
  B."MCRRGNSM_3M" AS "B_미생물3M",
  B."FNPRT_ITM_INCLS_YN" AS "B_세부항목포함여부",
  B."INJRY_YN" AS "B_위해여부",
  B."EMPHS_PRSEC_TESTITM_YN" AS "B_중점검사시험항목여부",
  B."MONTRNG_TESTITM_YN" AS "B_감시시험항목여부",
  B."RVLV_ELSE_TESTITM_YN" AS "B_공전외시험항목여부",
  B."NTR_PRSEC_ITM_YN" AS "B_자품검사시험항목여부",
  B."UNIT_CD" AS "B_단위코드",
  B."UNIT_NM" AS "B_단위명",
  B."UPDT_PRVNS" AS "B_수정사유",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."CMMN_SPEC_SEQ" AS "C_공통기준종류코드일련번호",
  C."CMMN_SPEC_CD" AS "C_공통기준종류코드",
  C."SPEC_NM" AS "C_공통기준종류명",
  C."PRDLST_CD" AS "C_품목분류코드",
  C."PRDLST_CD_NM" AS "C_품목명",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."TESTITM_NM" AS "C_시험항목명",
  C."FNPRT_ITM_NM" AS "C_세부항목명",
  C."ATTRB_SEQ" AS "C_단서조항일련번호",
  C."PIAM_KOR_NM" AS "C_단서조항명",
  C."SPEC_VAL" AS "C_기준규격",
  C."SPEC_VAL_SUMUP" AS "C_기준규격요약",
  C."VALD_BEGN_DT" AS "C_유효개시일",
  C."VALD_END_DT" AS "C_유효종료일",
  C."SORC" AS "C_출처",
  C."VALD_MANLI" AS "C_유효자리",
  C."JDGMNT_FOM_CD" AS "C_판정형식코드",
  C."A079_FNPRT_CD_NM" AS "C_판정형식명",
  C."MXMM_VAL" AS "C_최대값",
  C."MXMM_VAL_DVS_CD" AS "C_최대값구분코드",
  C."A081_FNPRT_CD_NM" AS "C_최대값구분명",
  C."MIMM_VAL" AS "C_최소값",
  C."MIMM_VAL_DVS_CD" AS "C_최소값구분코드",
  C."A080_FNPRT_CD_NM" AS "C_최소값구분명",
  C."CHOIC_FIT" AS "C_선택형적합코드",
  C."A082_CF_FNPRT_CD_NM" AS "C_선택형적합명",
  C."CHOIC_IMPROPT" AS "C_선택형부적합코드",
  C."A082_CI_FNPRT_CD_NM" AS "C_선택형부적합명",
  C."MCRRGNSM_2N" AS "C_미생물2N",
  C."MCRRGNSM_2C" AS "C_미생물2C",
  C."MCRRGNSM_2M" AS "C_미생물2M",
  C."MCRRGNSM_3M" AS "C_미생물3M",
  C."FNPRT_ITM_INCLS_YN" AS "C_세부항목포함여부",
  C."INJRY_YN" AS "C_위해여부",
  C."EMPHS_PRSEC_TESTITM_YN" AS "C_중점검사시험항목여부",
  C."MONTRNG_TESTITM_YN" AS "C_감시시험항목여부",
  C."RVLV_ELSE_TESTITM_YN" AS "C_공전외시험항목여부",
  C."NTR_PRSEC_ITM_YN" AS "C_자품검사시험항목여부",
  C."UNIT_CD" AS "C_단위코드",
  C."UNIT_NM" AS "C_단위명",
  C."UPDT_PRVNS" AS "C_수정사유",
  C."LAST_UPDT_DTM" AS "C_최종수정일시"
FROM "I2610" A
LEFT JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LEFT JOIN "I2600" C
  ON A."PRDLST_CD" = C."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 100;
```

## SCN_CHAIN_005 — `CHAIN:PRDLST_CD+TESTITM_CD` 기반 (MEDIUM, 40점) 🔗 브릿지: `I0960`

**참여 데이터셋** (3개): I0960, I2580, I2530

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 건강기능식품공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 112 | 22% | 61% | MEDIUM | `E0301700000000, E0317300000000` |
| 건강기능식품공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 97 | 66% | 10% | LOW | `A40151, A40128` |

```sql
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
  B."INDV_SPEC_SEQ" AS "B_개별기준규격일련번호",
  B."PRDLST_CD" AS "B_품목분류코드",
  B."PRDLST_CD_NM" AS "B_품목명",
  B."TESTITM_CD" AS "B_시험항목코드",
  B."TESTITM_NM" AS "B_시험항목명",
  B."FNPRT_ITM_NM" AS "B_세부항목명",
  B."ATTRB_SEQ" AS "B_단서조항일련번호",
  B."PIAM_KOR_NM" AS "B_단서조항명",
  B."SPEC_VAL" AS "B_기준규격",
  B."SPEC_VAL_SUMUP" AS "B_기준규격요약",
  B."VALD_BEGN_DT" AS "B_유효개시일",
  B."VALD_END_DT" AS "B_유효종료일",
  B."SORC" AS "B_출처",
  B."VALD_MANLI" AS "B_유효자리",
  B."JDGMNT_FOM_CD" AS "B_판정형식코드",
  B."A079_FNPRT_CD_NM" AS "B_판정형식명",
  B."MXMM_VAL" AS "B_최대값",
  B."MXMM_VAL_DVS_CD" AS "B_최대값구분코드",
  B."A081_FNPRT_CD_NM" AS "B_최대값구분명",
  B."MIMM_VAL" AS "B_최소값",
  B."MIMM_VAL_DVS_CD" AS "B_최소값구분코드",
  B."A080_FNPRT_CD_NM" AS "B_최소값구분명",
  B."CHOIC_FIT" AS "B_선택형적합코드",
  B."A082_CF_FNPRT_CD_NM" AS "B_선택형적합명",
  B."CHOIC_IMPROPT" AS "B_선택형부적합코드",
  B."A082_CI_FNPRT_CD_NM" AS "B_선택형부적합명",
  B."MCRRGNSM_2N" AS "B_미생물2N",
  B."MCRRGNSM_2C" AS "B_미생물2C",
  B."MCRRGNSM_2M" AS "B_미생물2M",
  B."MCRRGNSM_3M" AS "B_미생물3M",
  B."FNPRT_ITM_INCLS_YN" AS "B_세부항목포함여부",
  B."INJRY_YN" AS "B_위해여부",
  B."EMPHS_PRSEC_TESTITM_YN" AS "B_중점검사시험항목여부",
  B."MONTRNG_TESTITM_YN" AS "B_감시시험항목여부",
  B."RVLV_ELSE_TESTITM_YN" AS "B_공전외시험항목여부",
  B."NTR_PRSEC_ITM_YN" AS "B_자품검사시험항목여부",
  B."UNIT_CD" AS "B_단위코드",
  B."UNIT_NM" AS "B_단위명",
  B."UPDT_PRVNS" AS "B_수정사유",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."KOR_NM" AS "C_한글명",
  C."ENG_NM" AS "C_영문명",
  C."ABRV" AS "C_약어",
  C."NCKNM" AS "C_이명",
  C."TESTITM_NM" AS "C_시험항목명",
  C."TESTITM_LCLAS_CD" AS "C_시험항목대분류시퀀스",
  C."L_ATTRB_CD" AS "C_시험항목대분류코드",
  C."L_KOR_NM" AS "C_대분류한글명",
  C."TESTITM_MLSFC_CD" AS "C_시험항목중분류시퀀스",
  C."M_ATTRB_CD" AS "C_시험항목중분류코드",
  C."M_KOR_NM" AS "C_중분류한글명",
  C."REMN_MTTR_DFN" AS "C_잔류물질정의",
  C."USE_YN" AS "C_사용여부",
  C."LAST_UPDT_DTM" AS "C_최종수정일시"
FROM "I0960" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I2530" C
  ON A."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_001 — `LCNS_NO` 기반 (LOW, 31점)

**참여 데이터셋** (41개): C001, I1260, I2500, I2560, I0680, I1540, I-0020, I0630, I2860, I1220, I2859, I0030, I1200, I2861, C003, I1300, I1310, I1250, I0060, I0310, I2711, I2713, I2712, I0490, I2620, C002, I1230, I2851, I2640, I2823, I0470, I0480, I0481, I0080, I0610, C006, I1320, I0482, I2852, I0300, I1420

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 수입식품등영업신고대장 | 인허가번호(LCNS_NO) | 식품등수입판매업정보 | 인허가 번호(LCNS_NO) | INNER JOIN | 1:1 | 1000 | 100% | 100% | HIGH | `20200009171, 20220020542` |
| 인허가 업소 정보 | 영업고유구분번호(인허가번호)(LCNS_NO) | 영업소재지 GIS 코드 | 인허가번호(LCNS_NO) | INNER JOIN | 1:1 | 999 | 100% | 100% | HIGH | `18820308001, 18830478001` |
| 위생관리등급별 업소 현황 | 인허가번호(LCNS_NO) | 식품위생등급평가관리내역 | 인허가번호(LCNS_NO) | INNER JOIN | N:M | 759 | 100% | 100% | HIGH | `20250024175, 20250028835` |
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | INNER JOIN | 1:1 | 478 | 86% | 79% | HIGH | `20140020025, 20230001042` |
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | INNER JOIN | 1:N | 315 | 57% | 100% | HIGH | `20140020025, 20080018016` |
| 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 293 | 49% | 93% | HIGH | `20250024573, 20250017868` |
| 식품제조가공업정보 | 인허가 번호(LCNS_NO) | 식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 343 | 34% | 100% | MEDIUM | `20060169056, 20200502025` |
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 141 | 26% | 100% | MEDIUM | `20040019002, 20040017030` |
| 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 139 | 99% | 23% | MEDIUM | `20140017002, 20110020001` |
| 식품접객업정보 | 인허가 번호(LCNS_NO) | 음식점업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 157 | 16% | 100% | MEDIUM | `20180222214, 20060056349` |
| 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 107 | 76% | 34% | MEDIUM | `20140017002, 20110020001` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 30 | 100% | 5% | MEDIUM | `20040015039, 20040015070` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 30 | 100% | 5% | MEDIUM | `20040015039, 20040015070` |
| 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | 축산물 품목제조정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 10 | 1% | 100% | MEDIUM | `20140502008, 19790257016` |
| 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | 인허가 업소 정보 | 영업고유구분번호(인허가번호)(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 2 | 100% | 0% | MEDIUM | `19550509001, 19630364001` |
| 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | 영업소재지 GIS 코드 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 2 | 100% | 0% | MEDIUM | `19550509001, 19630364001` |
| 주류제조.면허자 식품제조.가공영업 등록 현황 | 인허가번호(LCNS_NO) | 위생관리등급별 업소 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 372 | 37% | 49% | MEDIUM | `20190012114, 20172860142` |
| 주류제조.면허자 식품제조.가공영업 등록 현황 | 인허가번호(LCNS_NO) | 식품위생등급평가관리내역 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 372 | 37% | 49% | MEDIUM | `20190012114, 20172860142` |
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 15 | 3% | 83% | MEDIUM | `20150010002, 20250004967` |
| 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 15 | 83% | 3% | MEDIUM | `20220020472, 20220016693` |
| 위생용품품목제조보고 | 인허가번호(LCNS_NO) | 위생용품영업정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 35 | 81% | 4% | MEDIUM | `19879368002, 19879415001` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 23 | 77% | 7% | MEDIUM | `20040015070, 20040015100` |
| 위생용품품목제조보고(원재료) | 인허가번호(LCNS_NO) | 위생용품영업정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 115 | 71% | 12% | MEDIUM | `20259370002, 20249492001` |
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합(국내) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 35 | 16% | 42% | LOW | `20210016021, 20200574235` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 14 | 47% | 10% | LOW | `20040015039, 20040015070` |
| 식품(첨가물)품목제조보고(원재료) | 인허가번호(LCNS_NO) | 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 1 | 0% | 50% | LOW | `19550509001` |
| 식품첨가물제조업 | 인허가 번호(LCNS_NO) | 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 1 | 0% | 50% | LOW | `19630364001` |
| 위생용품영업정보 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 71 | 7% | 42% | LOW | `20189380002, 20059355002` |
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 5 | 2% | 46% | LOW | `20160333083, 20000320226` |
| 위생용품품목제조보고 | 인허가번호(LCNS_NO) | 위생용품품목제조보고(원재료) | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 12 | 28% | 8% | LOW | `19879415001, 19909073001` |
| 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 6 | 33% | 2% | LOW | `20220016693, 20040016020` |
| 위생용품 폐업정보 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 45 | 5% | 26% | LOW | `19859273001, 19859447001` |
| 축산물 품목제조정보 | 인허가번호(LCNS_NO) | 인허가 업소 정보 | 영업고유구분번호(인허가번호)(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 3 | 30% | 0% | LOW | `19640448001, 19670230001` |
| 축산물 품목제조정보 | 인허가번호(LCNS_NO) | 영업소재지 GIS 코드 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 3 | 30% | 0% | LOW | `19640448001, 19670230001` |
| 행정처분결과 | 인허가번호(LCNS_NO) | 행정처분결과(식품제조가공업) | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:1 | 50 | 5% | 19% | LOW | `20220803181, 20170202581` |
| 행정처분결과 | 인허가번호(LCNS_NO) | 행정처분결과(식품판매업) | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:1 | 79 | 8% | 12% | LOW | `20190073611, 20140154100` |
| 위생용품품목제조보고 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 7 | 16% | 4% | LOW | `19899221002, 20079445004` |
| 어린이 기호식품 품질인증 현황 및 재심사 현황 | 인허가번호(LCNS_NO) | 축산물 품목제조정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 2 | 1% | 20% | LOW | `19770262001, 19790532001` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:1 | 93 | 10% | 9% | LOW | `20260261007, 20230904005` |
| 축산물품목제조보고(원재료) | 인허가번호(LCNS_NO) | 축산물 식육포장처리업영업허가대장 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 19 | 17% | 2% | LOW | `20040484772, 20050368569` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 2 | 7% | 11% | LOW | `20040015191, 20040015119` |
| 어린이 기호식품 품질인증 현황 및 재심사 현황 | 인허가번호(LCNS_NO) | 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 24 | 11% | 2% | LOW | `19930448001, 20120379026` |
| 행정처분결과 | 인허가번호(LCNS_NO) | 행정처분결과(수입식품업) | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:1 | 5 | 1% | 11% | LOW | `20190004146, 20172820404` |
| 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 2 | 1% | 11% | LOW | `20040016020, 20040015191` |
| 행정처분결과(수입식품업) | 인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 1 | 2% | 9% | LOW | `20250017312` |
| 축산물품목제조보고(원재료) | 인허가번호(LCNS_NO) | 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 11 | 10% | 1% | LOW | `20230881186, 20180455015` |
| 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | 생산중단제품정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 8 | 6% | 4% | LOW | `20040020002, 20100019004` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 축산물 품목제조정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 1 | 0% | 10% | LOW | `19790532001` |
| 식품(첨가물)품목제조보고(원재료) | 인허가번호(LCNS_NO) | 식품제조가공업정보 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 17 | 6% | 2% | LOW | `19950433026, 20080449004` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 2 | 7% | 1% | LOW | `20040015104, 20040015107` |
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 생산중단제품정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 9 | 2% | 5% | LOW | `20100019004, 20190009483` |
| 건강기능식품GMP 지정 현황 | 업고고유번호(LCNS_NO) | 생산중단제품정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 9 | 2% | 5% | LOW | `20190004553, 20190009483` |
| 축산물품목제조보고(원재료) | 인허가번호(LCNS_NO) | 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 6 | 5% | 1% | LOW | `20120405030, 19930405001` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 검사부적합(국내) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 5 | 1% | 6% | LOW | `20250371008, 20250681018` |
| 식품.식품첨가물 생산실적 보고 현황 | 인허가번호(LCNS_NO) | 식품제조가공업정보 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 3 | 6% | 0% | LOW | `20080236134, 20030467180` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 축산물 생산실적정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 2 | 0% | 6% | LOW | `20150036608, 20160333045` |
| 축산물 식육포장처리업영업허가대장 | 인허가 번호(LCNS_NO) | 축산물 생산실적정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 2 | 0% | 6% | LOW | `20150356019, 20160333045` |

```sql
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
LIMIT 100;
```

## SCN_CHAIN_002 — `CHAIN:LCNS_NO+PRDLST_REPORT_NO` 기반 (LOW, 30점) 🔗 브릿지: `C003`

**참여 데이터셋** (3개): C003, I-0020, I0310

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 30 | 100% | 5% | MEDIUM | `20040015039, 20040015070` |
| 건강기능식품 품목제조신고(원재료) | 품목제조번호(PRDLST_REPORT_NO) | 건강기능식품 생산실적 보고 품목 현황 | 품목제조보고번호(PRDLST_REPORT_NO) | LEFT JOIN (A→B) | 1:1 | 62 | 6% | 6% | LOW | `2004001519110, 2004001511929` |

```sql
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
  B."LCNS_NO" AS "B_인허가 번호",
  B."BSSH_NM" AS "B_업소명",
  B."PRSDNT_NM" AS "B_대표자",
  B."INDUTY_NM" AS "B_업종",
  B."PRMS_DT" AS "B_허가일자",
  B."TELNO" AS "B_전화번호",
  B."LOCP_ADDR" AS "B_주소",
  C."BSSH_NM" AS "C_업소명",
  C."PRDLST_NM" AS "C_품목명",
  C."GUBUN" AS "C_품목구분",
  C."H_ITEM_NM" AS "C_품목유형",
  C."LCNS_NO" AS "C_인허가번호",
  C."EVL_YR" AS "C_보고년도",
  C."PRDLST_REPORT_NO" AS "C_품목제조보고번호",
  C."FYER_PRDCTN_ABRT_QY" AS "C_연간생산능력(KG)",
  C."PRDCTN_QY" AS "C_생산량(KG)"
FROM "C003" A
LEFT JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "I0310" C
  ON A."PRDLST_REPORT_NO" = C."PRDLST_REPORT_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_005 — `BRCD_NO` 기반 (LOW, 25점)

**참여 데이터셋** (3개): I0490, I2620, I2640

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 바코드번호(BRCDNO) | 검사부적합(국내) | 바코드번호(BRCDNO) | LEFT JOIN (B→A) | N:M | 24 | 15% | 41% | LOW | `8809045620752, 8809458913335` |
| 회수.판매중지 정보 | 바코드번호(BRCDNO) | 검사부적합 현황(농산물) | 바코드번호(BRCDNO) | LEFT JOIN (B→A) | N:M | 6 | 4% | 40% | LOW | `8809052505004, 1100001247554` |

```sql
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
  A."DISTBTMLMT" AS "A_유통/소비기한",
  A."PRDLST_TYPE" AS "A_식품분류",
  A."IMG_FILE_PATH" AS "A_제품사진 URL",
  A."PRDLST_CD" AS "A_품목코드",
  A."CRET_DTM" AS "A_등록일",
  A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
  A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
  A."RTRVL_GRDCD_NM" AS "A_회수등급",
  A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
  A."LCNS_NO" AS "A_업체인허가번호",
  B."PRDTNM" AS "B_제품명",
  B."BSSHNM" AS "B_업소명",
  B."MNFDT" AS "B_제조일자",
  B."DISTBTMLMT" AS "B_유통/소비기한",
  B."ADDR" AS "B_영업자주소",
  B."INSTT_NM" AS "B_검사기관",
  B."REGSTR_TELNO" AS "B_전화번호",
  B."BRCDNO" AS "B_바코드번호",
  B."FRMLCUNIT" AS "B_포장단위",
  B."TEST_ITMNM" AS "B_부적합항목",
  B."STDR_STND" AS "B_기준규격",
  B."TESTANALS_RSLT" AS "B_검사결과",
  B."CRET_DTM" AS "B_등록일",
  B."RTRVLDSUSE_SEQ" AS "B_회수폐기일련번호",
  B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
  B."LCNS_NO" AS "B_업체인허가번호",
  B."REPORTR_TELNO" AS "B_보고자전화번호",
  B."PRDLST_CD_NM" AS "B_식품유형",
  C."PRDTNM" AS "C_제품명",
  C."BSSHNM" AS "C_업소명",
  C."MNFDT" AS "C_제조일자",
  C."DISTBTMLMT" AS "C_유통/소비기한",
  C."ADDR" AS "C_영업자주소",
  C."INSTT_NM" AS "C_검사기관",
  C."REGSTR_TELNO" AS "C_전화번호",
  C."BRCDNO" AS "C_바코드번호",
  C."FRMLCUNIT" AS "C_포장단위",
  C."TEST_ITMNM" AS "C_부적합항목",
  C."STDR_STND" AS "C_기준규격",
  C."TESTANALS_RSLT" AS "C_검사결과",
  C."CRET_DTM" AS "C_등록일",
  C."RTRVLDSUSE_SEQ" AS "C_회수폐기일련번호",
  C."LCNS_NO" AS "C_업체인허가번호",
  C."REPORTR_TELNO" AS "C_보고자전화번호"
FROM "I0490" A
LEFT JOIN "I2620" B
  ON A."BRCDNO" = B."BRCDNO"
LEFT JOIN "I2640" C
  ON A."BRCDNO" = C."BRCDNO"
WHERE A."BRCDNO" IS NOT NULL AND A."BRCDNO" != ''
LIMIT 100;
```

## SCN_CHAIN_003 — `CHAIN:LCNS_NO+PRDLST_REPORT_NO` 기반 (LOW, 25점) 🔗 브릿지: `I0310`

**참여 데이터셋** (3개): I0310, I-0020, C003

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 건강기능식품 전문.벤처제조업인허가 현황 | 인허가 번호(LCNS_NO) | 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 15 | 3% | 83% | MEDIUM | `20150010002, 20250004967` |
| 건강기능식품 품목제조신고(원재료) | 품목제조번호(PRDLST_REPORT_NO) | 건강기능식품 생산실적 보고 품목 현황 | 품목제조보고번호(PRDLST_REPORT_NO) | LEFT JOIN (A→B) | 1:1 | 62 | 6% | 6% | LOW | `2004001519110, 2004001511929` |

```sql
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
  B."LCNS_NO" AS "B_인허가 번호",
  B."BSSH_NM" AS "B_업소명",
  B."PRSDNT_NM" AS "B_대표자",
  B."INDUTY_NM" AS "B_업종",
  B."PRMS_DT" AS "B_허가일자",
  B."TELNO" AS "B_전화번호",
  B."LOCP_ADDR" AS "B_주소",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRDLST_REPORT_NO" AS "C_품목제조번호",
  C."PRDLST_NM" AS "C_품목명",
  C."PRMS_DT" AS "C_보고일자",
  C."POG_DAYCNT" AS "C_소비기한",
  C."DISPOS" AS "C_성상",
  C."NTK_MTHD" AS "C_섭취방법",
  C."PRIMARY_FNCLTY" AS "C_주된기능성",
  C."IFTKN_ATNT_MATR_CN" AS "C_섭취시주의사항",
  C."CSTDY_MTHD" AS "C_보관방법",
  C."SHAP" AS "C_형태",
  C."STDR_STND" AS "C_기준규격",
  C."RAWMTRL_NM" AS "C_원재료",
  C."CRET_DTM" AS "C_최초생성일시",
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  C."PRDT_SHAP_CD_NM" AS "C_제품형태"
FROM "I0310" A
LEFT JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "C003" C
  ON A."PRDLST_REPORT_NO" = C."PRDLST_REPORT_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_003 — `TESTITM_CD` 기반 (LOW, 24점)

**참여 데이터셋** (7개): I0940, I2580, I2610, I0960, I2530, I2600, I0950

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품용 기구 및 용기.포장 공전 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 55 | 78% | 25% | MEDIUM | `B10001, B10003` |
| 개별기준규격 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | N:M | 6 | 3% | 86% | MEDIUM | `B20016, B10004` |
| 건강기능식품공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 97 | 66% | 10% | LOW | `A40151, A40128` |
| 공통기준규격 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | N:M | 5 | 2% | 71% | LOW | `C10002, C20004` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 117 | 12% | 53% | LOW | `A10008, A10018` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 4 | 0% | 57% | LOW | `B10002, B10004` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 27 | 46% | 3% | LOW | `A30003, A10088` |
| 건강기능식품공전 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 31 | 21% | 14% | LOW | `B90438, B90435` |
| 식품용 기구 및 용기.포장 공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 12 | 17% | 1% | LOW | `B20048, B10001` |
| 식품용 기구 및 용기.포장 공전 | 시험항목코드(TESTITM_CD) | 공통기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 9 | 13% | 3% | LOW | `B20048, B10001` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 6 | 10% | 3% | LOW | `B20003, A40005` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 건강기능식품공전 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 5 | 9% | 3% | LOW | `A30010, B20003` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 공통기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 16 | 2% | 5% | LOW | `A10029, A30023` |

```sql
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
  B."INDV_SPEC_SEQ" AS "B_개별기준규격일련번호",
  B."PRDLST_CD" AS "B_품목분류코드",
  B."PRDLST_CD_NM" AS "B_품목명",
  B."TESTITM_CD" AS "B_시험항목코드",
  B."TESTITM_NM" AS "B_시험항목명",
  B."FNPRT_ITM_NM" AS "B_세부항목명",
  B."ATTRB_SEQ" AS "B_단서조항일련번호",
  B."PIAM_KOR_NM" AS "B_단서조항명",
  B."SPEC_VAL" AS "B_기준규격",
  B."SPEC_VAL_SUMUP" AS "B_기준규격요약",
  B."VALD_BEGN_DT" AS "B_유효개시일",
  B."VALD_END_DT" AS "B_유효종료일",
  B."SORC" AS "B_출처",
  B."VALD_MANLI" AS "B_유효자리",
  B."JDGMNT_FOM_CD" AS "B_판정형식코드",
  B."A079_FNPRT_CD_NM" AS "B_판정형식명",
  B."MXMM_VAL" AS "B_최대값",
  B."MXMM_VAL_DVS_CD" AS "B_최대값구분코드",
  B."A081_FNPRT_CD_NM" AS "B_최대값구분명",
  B."MIMM_VAL" AS "B_최소값",
  B."MIMM_VAL_DVS_CD" AS "B_최소값구분코드",
  B."A080_FNPRT_CD_NM" AS "B_최소값구분명",
  B."CHOIC_FIT" AS "B_선택형적합코드",
  B."A082_CF_FNPRT_CD_NM" AS "B_선택형적합명",
  B."CHOIC_IMPROPT" AS "B_선택형부적합코드",
  B."A082_CI_FNPRT_CD_NM" AS "B_선택형부적합명",
  B."MCRRGNSM_2N" AS "B_미생물2N",
  B."MCRRGNSM_2C" AS "B_미생물2C",
  B."MCRRGNSM_2M" AS "B_미생물2M",
  B."MCRRGNSM_3M" AS "B_미생물3M",
  B."FNPRT_ITM_INCLS_YN" AS "B_세부항목포함여부",
  B."INJRY_YN" AS "B_위해여부",
  B."EMPHS_PRSEC_TESTITM_YN" AS "B_중점검사시험항목여부",
  B."MONTRNG_TESTITM_YN" AS "B_감시시험항목여부",
  B."RVLV_ELSE_TESTITM_YN" AS "B_공전외시험항목여부",
  B."NTR_PRSEC_ITM_YN" AS "B_자품검사시험항목여부",
  B."UNIT_CD" AS "B_단위코드",
  B."UNIT_NM" AS "B_단위명",
  B."UPDT_PRVNS" AS "B_수정사유",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."CMMN_SPEC_CD" AS "C_공통기준규격코드",
  C."SPEC_NM" AS "C_기준규격명",
  C."PRDLST_CD" AS "C_품목코드",
  C."KOR_NM" AS "C_한글명",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  D."CMMN_SPEC_SEQ" AS "D_공통기준종류코드일련번호",
  D."CMMN_SPEC_CD" AS "D_공통기준종류코드",
  D."SPEC_NM" AS "D_공통기준종류명",
  D."PRDLST_CD" AS "D_품목분류코드",
  D."PRDLST_CD_NM" AS "D_품목명",
  D."TESTITM_CD" AS "D_시험항목코드",
  D."TESTITM_NM" AS "D_시험항목명",
  D."FNPRT_ITM_NM" AS "D_세부항목명",
  D."ATTRB_SEQ" AS "D_단서조항일련번호",
  D."PIAM_KOR_NM" AS "D_단서조항명",
  D."SPEC_VAL" AS "D_기준규격",
  D."SPEC_VAL_SUMUP" AS "D_기준규격요약",
  D."VALD_BEGN_DT" AS "D_유효개시일",
  D."VALD_END_DT" AS "D_유효종료일",
  D."SORC" AS "D_출처",
  D."VALD_MANLI" AS "D_유효자리",
  D."JDGMNT_FOM_CD" AS "D_판정형식코드",
  D."A079_FNPRT_CD_NM" AS "D_판정형식명",
  D."MXMM_VAL" AS "D_최대값",
  D."MXMM_VAL_DVS_CD" AS "D_최대값구분코드",
  D."A081_FNPRT_CD_NM" AS "D_최대값구분명",
  D."MIMM_VAL" AS "D_최소값",
  D."MIMM_VAL_DVS_CD" AS "D_최소값구분코드",
  D."A080_FNPRT_CD_NM" AS "D_최소값구분명",
  D."CHOIC_FIT" AS "D_선택형적합코드",
  D."A082_CF_FNPRT_CD_NM" AS "D_선택형적합명",
  D."CHOIC_IMPROPT" AS "D_선택형부적합코드",
  D."A082_CI_FNPRT_CD_NM" AS "D_선택형부적합명",
  D."MCRRGNSM_2N" AS "D_미생물2N",
  D."MCRRGNSM_2C" AS "D_미생물2C",
  D."MCRRGNSM_2M" AS "D_미생물2M",
  D."MCRRGNSM_3M" AS "D_미생물3M",
  D."FNPRT_ITM_INCLS_YN" AS "D_세부항목포함여부",
  D."INJRY_YN" AS "D_위해여부",
  D."EMPHS_PRSEC_TESTITM_YN" AS "D_중점검사시험항목여부",
  D."MONTRNG_TESTITM_YN" AS "D_감시시험항목여부",
  D."RVLV_ELSE_TESTITM_YN" AS "D_공전외시험항목여부",
  D."NTR_PRSEC_ITM_YN" AS "D_자품검사시험항목여부",
  D."UNIT_CD" AS "D_단위코드",
  D."UNIT_NM" AS "D_단위명",
  D."UPDT_PRVNS" AS "D_수정사유",
  D."LAST_UPDT_DTM" AS "D_최종수정일시"
FROM "I0940" A
LEFT JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LEFT JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
LEFT JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 100;
```

## SCN_004 — `HISTTRACEREGNO` 기반 (LOW, 24점)

**참여 데이터셋** (3개): I1930, I1940, I1920

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 수산물이력정보-생산정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | 수산물이력정보-출하정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | LEFT JOIN (A→B) | N:M | 3 | 60% | 4% | LOW | `1020, 0600` |
| 수산물이력정보-기본정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | 수산물이력정보-생산정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | LEFT JOIN (B→A) | N:M | 3 | 1% | 60% | LOW | `0633, 0600` |
| 수산물이력정보-기본정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | 수산물이력정보-출하정보 | 이력추적등록번호(HIST_TRACE_REG_NO) | LEFT JOIN (B→A) | N:M | 12 | 5% | 16% | LOW | `0633, 1129` |

```sql
SELECT
  A."HIST_TRACE_REG_NO" AS "A_이력추적등록번호",
  A."LOTNO_WRHOUSNG" AS "A_로트번호입고",
  A."GOODS_NM" AS "A_상품명",
  A."PRDLST_GROUP_DVS_NM" AS "A_품목",
  A."SETT_QTY" AS "A_입식수량",
  A."WRHOUSNG_DT" AS "A_입고일자",
  A."WRHOUSNG_QTY" AS "A_입고수량",
  A."PHHGH_UNIT_CD_NM" AS "A_입고단위",
  B."HIST_TRACE_REG_NO" AS "B_이력추적등록번호",
  B."LOTNO_RELES" AS "B_로트번호출고",
  B."LOTNO_WRHOUSNG" AS "B_로트번호입고",
  B."PRDLST_GROUP_DVS_NM" AS "B_품목",
  B."RELES_DVS_NM" AS "B_출고구분",
  B."PRDCTN_DT" AS "B_생산일자",
  B."PRDCTN_QTY" AS "B_생산수량",
  B."RELES_DT" AS "B_출고일자",
  B."RELES_QTY" AS "B_출고수량",
  B."RELES_UNIT_NM" AS "B_출고단위",
  C."HIST_TRACE_REG_NO" AS "C_이력추적등록번호",
  C."GOODS_NM" AS "C_상품명",
  C."PRDLST_GROUP_DVS_NM" AS "C_품목",
  C."ENTRPS_NM" AS "C_업소명",
  C."TELNO" AS "C_전화번호",
  C."ADDR" AS "C_주소"
FROM "I1930" A
LEFT JOIN "I1940" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
LEFT JOIN "I1920" C
  ON A."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 100;
```

## SCN_CHAIN_001 — `CHAIN:LCNS_NO+PRDLST_CD` 기반 (LOW, 21점) 🔗 브릿지: `I0490`

**참여 데이터셋** (3개): I0490, I2620, I0940

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합(국내) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 35 | 16% | 42% | LOW | `20210016021, 20200574235` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 9 | 8% | 16% | LOW | `F0000000000000, F1100000100000` |

```sql
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
  A."DISTBTMLMT" AS "A_유통/소비기한",
  A."PRDLST_TYPE" AS "A_식품분류",
  A."IMG_FILE_PATH" AS "A_제품사진 URL",
  A."PRDLST_CD" AS "A_품목코드",
  A."CRET_DTM" AS "A_등록일",
  A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
  A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
  A."RTRVL_GRDCD_NM" AS "A_회수등급",
  A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
  A."LCNS_NO" AS "A_업체인허가번호",
  B."PRDTNM" AS "B_제품명",
  B."BSSHNM" AS "B_업소명",
  B."MNFDT" AS "B_제조일자",
  B."DISTBTMLMT" AS "B_유통/소비기한",
  B."ADDR" AS "B_영업자주소",
  B."INSTT_NM" AS "B_검사기관",
  B."REGSTR_TELNO" AS "B_전화번호",
  B."BRCDNO" AS "B_바코드번호",
  B."FRMLCUNIT" AS "B_포장단위",
  B."TEST_ITMNM" AS "B_부적합항목",
  B."STDR_STND" AS "B_기준규격",
  B."TESTANALS_RSLT" AS "B_검사결과",
  B."CRET_DTM" AS "B_등록일",
  B."RTRVLDSUSE_SEQ" AS "B_회수폐기일련번호",
  B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
  B."LCNS_NO" AS "B_업체인허가번호",
  B."REPORTR_TELNO" AS "B_보고자전화번호",
  B."PRDLST_CD_NM" AS "B_식품유형",
  C."PRDLST_CD" AS "C_품목코드",
  C."PC_KOR_NM" AS "C_품목한글명",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."T_KOR_NM" AS "C_시험항목 한글명",
  C."FNPRT_ITM_NM" AS "C_세부항목명",
  C."SPEC_VAL" AS "C_기준규격값",
  C."SPEC_VAL_SUMUP" AS "C_기준규격값 요약",
  C."VALD_BEGN_DT" AS "C_유효개시일자",
  C."VALD_END_DT" AS "C_유효종료일자",
  C."SORC" AS "C_출처",
  C."MXMM_VAL" AS "C_최대값",
  C."MIMM_VAL" AS "C_최소값",
  C."INJRY_YN" AS "C_위해여부",
  C."UNIT_NM" AS "C_단위명"
FROM "I0490" A
LEFT JOIN "I2620" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "I0940" C
  ON A."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_002 — `PRDLST_CD` 기반 (LOW, 19점)

**참여 데이터셋** (7개): I0940, I2580, I0960, I2600, I2610, I2510, I0490

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 46 | 82% | 25% | MEDIUM | `F0100004000000, F0300000100000` |
| 건강기능식품공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 112 | 22% | 61% | MEDIUM | `E0301700000000, E0317300000000` |
| 공통기준규격 | 품목분류코드(PRDLST_CD) | 공통기준제외 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 6 | 4% | 75% | MEDIUM | `C0000000000000, B0203010000000` |
| 품목유형코드 | 품목코드(PRDLST_CD) | 공통기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (B→A) | 1:N | 44 | 4% | 32% | LOW | `A0000000000000, A0100000000000` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 9 | 8% | 16% | LOW | `F0000000000000, F1100000100000` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 15 | 13% | 8% | LOW | `E0201400000000, E0205100000000` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 공통기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 13 | 11% | 9% | LOW | `F0000000000000, C0309030200000` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 건강기능식품공전 | 품목코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 12 | 10% | 2% | LOW | `E0201400000000, E0000000000000` |
| 품목유형코드 | 품목코드(PRDLST_CD) | 공통기준제외 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | 1:N | 1 | 0% | 13% | LOW | `A0000000000000` |
| 회수.판매중지 정보 | 품목코드(PRDLST_CD) | 품목유형코드 | 품목코드(PRDLST_CD) | LEFT JOIN (A→B) | 1:N | 11 | 9% | 1% | LOW | `A0500401304000, A0500501000000` |
| 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | 공통기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 4 | 7% | 3% | LOW | `F0000000000000, F0800000100000` |

```sql
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
  B."INDV_SPEC_SEQ" AS "B_개별기준규격일련번호",
  B."PRDLST_CD" AS "B_품목분류코드",
  B."PRDLST_CD_NM" AS "B_품목명",
  B."TESTITM_CD" AS "B_시험항목코드",
  B."TESTITM_NM" AS "B_시험항목명",
  B."FNPRT_ITM_NM" AS "B_세부항목명",
  B."ATTRB_SEQ" AS "B_단서조항일련번호",
  B."PIAM_KOR_NM" AS "B_단서조항명",
  B."SPEC_VAL" AS "B_기준규격",
  B."SPEC_VAL_SUMUP" AS "B_기준규격요약",
  B."VALD_BEGN_DT" AS "B_유효개시일",
  B."VALD_END_DT" AS "B_유효종료일",
  B."SORC" AS "B_출처",
  B."VALD_MANLI" AS "B_유효자리",
  B."JDGMNT_FOM_CD" AS "B_판정형식코드",
  B."A079_FNPRT_CD_NM" AS "B_판정형식명",
  B."MXMM_VAL" AS "B_최대값",
  B."MXMM_VAL_DVS_CD" AS "B_최대값구분코드",
  B."A081_FNPRT_CD_NM" AS "B_최대값구분명",
  B."MIMM_VAL" AS "B_최소값",
  B."MIMM_VAL_DVS_CD" AS "B_최소값구분코드",
  B."A080_FNPRT_CD_NM" AS "B_최소값구분명",
  B."CHOIC_FIT" AS "B_선택형적합코드",
  B."A082_CF_FNPRT_CD_NM" AS "B_선택형적합명",
  B."CHOIC_IMPROPT" AS "B_선택형부적합코드",
  B."A082_CI_FNPRT_CD_NM" AS "B_선택형부적합명",
  B."MCRRGNSM_2N" AS "B_미생물2N",
  B."MCRRGNSM_2C" AS "B_미생물2C",
  B."MCRRGNSM_2M" AS "B_미생물2M",
  B."MCRRGNSM_3M" AS "B_미생물3M",
  B."FNPRT_ITM_INCLS_YN" AS "B_세부항목포함여부",
  B."INJRY_YN" AS "B_위해여부",
  B."EMPHS_PRSEC_TESTITM_YN" AS "B_중점검사시험항목여부",
  B."MONTRNG_TESTITM_YN" AS "B_감시시험항목여부",
  B."RVLV_ELSE_TESTITM_YN" AS "B_공전외시험항목여부",
  B."NTR_PRSEC_ITM_YN" AS "B_자품검사시험항목여부",
  B."UNIT_CD" AS "B_단위코드",
  B."UNIT_NM" AS "B_단위명",
  B."UPDT_PRVNS" AS "B_수정사유",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."PRDLST_CD" AS "C_품목코드",
  C."PC_KOR_NM" AS "C_품목한글명",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."T_KOR_NM" AS "C_시험항목 한글명",
  C."FNPRT_ITM_NM" AS "C_세부항목명",
  C."SPEC_VAL" AS "C_기준규격값",
  C."SPEC_VAL_SUMUP" AS "C_기준규격값 요약",
  C."VALD_BEGN_DT" AS "C_유효개시일자",
  C."VALD_END_DT" AS "C_유효종료일자",
  C."SORC" AS "C_출처",
  C."MXMM_VAL" AS "C_최대값",
  C."MIMM_VAL" AS "C_최소값",
  C."INJRY_YN" AS "C_위해여부",
  C."UNIT_NM" AS "C_단위명"
FROM "I0940" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_006 — `PRDLST_REPORT_NO` 기반 (LOW, 16점)

**참여 데이터셋** (4개): I0490, I2620, C003, I0310

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 품목제조보고번호(PRDLST_REPORT_NO) | 검사부적합(국내) | 품목제조보고번호(PRDLST_REPORT_NO) | LEFT JOIN (B→A) | 1:N | 20 | 13% | 38% | LOW | `202100160214, 2021001602110` |
| 건강기능식품 품목제조신고(원재료) | 품목제조번호(PRDLST_REPORT_NO) | 건강기능식품 생산실적 보고 품목 현황 | 품목제조보고번호(PRDLST_REPORT_NO) | LEFT JOIN (A→B) | 1:1 | 62 | 6% | 6% | LOW | `2004001519110, 2004001511929` |

```sql
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
  A."DISTBTMLMT" AS "A_유통/소비기한",
  A."PRDLST_TYPE" AS "A_식품분류",
  A."IMG_FILE_PATH" AS "A_제품사진 URL",
  A."PRDLST_CD" AS "A_품목코드",
  A."CRET_DTM" AS "A_등록일",
  A."RTRVLDSUSE_SEQ" AS "A_회수.판매중지 일련번호",
  A."PRDLST_REPORT_NO" AS "A_품목제조보고번호",
  A."RTRVL_GRDCD_NM" AS "A_회수등급",
  A."PRDLST_CD_NM" AS "A_품목유형(품목코드명)",
  A."LCNS_NO" AS "A_업체인허가번호",
  B."PRDTNM" AS "B_제품명",
  B."BSSHNM" AS "B_업소명",
  B."MNFDT" AS "B_제조일자",
  B."DISTBTMLMT" AS "B_유통/소비기한",
  B."ADDR" AS "B_영업자주소",
  B."INSTT_NM" AS "B_검사기관",
  B."REGSTR_TELNO" AS "B_전화번호",
  B."BRCDNO" AS "B_바코드번호",
  B."FRMLCUNIT" AS "B_포장단위",
  B."TEST_ITMNM" AS "B_부적합항목",
  B."STDR_STND" AS "B_기준규격",
  B."TESTANALS_RSLT" AS "B_검사결과",
  B."CRET_DTM" AS "B_등록일",
  B."RTRVLDSUSE_SEQ" AS "B_회수폐기일련번호",
  B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
  B."LCNS_NO" AS "B_업체인허가번호",
  B."REPORTR_TELNO" AS "B_보고자전화번호",
  B."PRDLST_CD_NM" AS "B_식품유형"
FROM "I0490" A
LEFT JOIN "I2620" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 100;
```

## SCN_007 — `BASISLAWORD` 기반 (LOW, 16점)

**참여 데이터셋** (3개): I1670, I2550, I1660

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 과태료부과기준 | 근거법령(BASIS_LAWORD) | 처분기준코드 | 근거법령(BASIS_LAWORD) | LEFT JOIN (B→A) | N:M | 29 | 12% | 36% | LOW | `제67조, 법 제101조제2항제1호` |
| 과징금부과기준 | 근거법령(BASIS_LAWORD) | 처분기준코드 | 근거법령(BASIS_LAWORD) | LEFT JOIN (A→B) | N:M | 2 | 13% | 3% | LOW | `법 제82조1항, 법 제53조` |

```sql
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
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."DSPS_STDR_CD_NM" AS "C_처분기준명",
  C."LAWORD_CD_NM" AS "C_식품법령",
  C."BASIS_LAWORD" AS "C_근거법령",
  C."VILT_TYPE_NM" AS "C_위반유형",
  C."LV_NO" AS "C_레벨",
  C."VALD_BGN_DT" AS "C_유효시작일자",
  C."VALD_END_DT" AS "C_유효종료일자"
FROM "I1670" A
LEFT JOIN "I2550" B
  ON A."BASIS_LAWORD" = B."BASIS_LAWORD"
LEFT JOIN "I1660" C
  ON B."BASIS_LAWORD" = C."BASIS_LAWORD"
WHERE A."BASIS_LAWORD" IS NOT NULL AND A."BASIS_LAWORD" != ''
LIMIT 100;
```

## SCN_008 — `DSPSDTLSSEQ` 기반 (LOW, 9점)

**참여 데이터셋** (4개): I0470, I0480, I0481, I0482

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과 | 행정처분전산키(DSPSDTLS_SEQ) | 행정처분결과(식품제조가공업) | 행정처분전산키(DSPSDTLS_SEQ) | LEFT JOIN (B→A) | 1:1 | 50 | 5% | 19% | LOW | `4605146, 4617344` |
| 행정처분결과 | 행정처분전산키(DSPSDTLS_SEQ) | 행정처분결과(식품판매업) | 행정처분전산키(DSPSDTLS_SEQ) | LEFT JOIN (B→A) | 1:1 | 79 | 8% | 12% | LOW | `4612784, 4613145` |
| 행정처분결과 | 행정처분전산키(DSPSDTLS_SEQ) | 행정처분결과(수입식품업) | 행정처분전산키(DSPSDTLS_SEQ) | LEFT JOIN (B→A) | 1:1 | 5 | 1% | 11% | LOW | `4610740, 4610741` |

```sql
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
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  B."PRCSCITYPOINT_BSSHNM" AS "B_업소명",
  B."INDUTY_CD_NM" AS "B_업종",
  B."LCNS_NO" AS "B_인허가번호",
  B."DSPS_DCSNDT" AS "B_처분확정일자",
  B."DSPS_BGNDT" AS "B_처분시작일(영업정지의경우)",
  B."DSPS_ENDDT" AS "B_처분종료일(영업정지의경우)",
  B."DSPS_TYPECD_NM" AS "B_처분유형",
  B."VILTCN" AS "B_위반일자및위반내용",
  B."ADDR" AS "B_주소",
  B."TELNO" AS "B_전화번호",
  B."PRSDNT_NM" AS "B_대표자명",
  B."LAWORD_CD_NM" AS "B_위반법령",
  B."DSPSCN" AS "B_처분내용",
  B."PUBLIC_DT" AS "B_공개기한",
  B."LAST_UPDT_DTM" AS "B_최종수정일",
  B."DSPSDTLS_SEQ" AS "B_행정처분전산키",
  B."DSPS_INSTTCD_NM" AS "B_처분기관명",
  C."PRCSCITYPOINT_BSSHNM" AS "C_업소명",
  C."INDUTY_CD_NM" AS "C_업종",
  C."LCNS_NO" AS "C_인허가번호",
  C."DSPS_DCSNDT" AS "C_처분확정일자",
  C."DSPS_BGNDT" AS "C_처분시작일(영업정지의경우)",
  C."DSPS_ENDDT" AS "C_처분종료일(영업정지의경우)",
  C."DSPS_TYPECD_NM" AS "C_처분유형",
  C."VILTCN" AS "C_위반일자 및 위반내용",
  C."ADDR" AS "C_주소",
  C."TELNO" AS "C_전화번호",
  C."PRSDNT_NM" AS "C_대표자명",
  C."LAWORD_CD_NM" AS "C_위반법령",
  C."DSPSCN" AS "C_처분내용",
  C."PUBLIC_DT" AS "C_공개기한",
  C."LAST_UPDT_DTM" AS "C_최종수정일",
  C."DSPSDTLS_SEQ" AS "C_행정처분전산키",
  C."DSPS_INSTTCD_NM" AS "C_처분기관명",
  D."PRCSCITYPOINT_BSSHNM" AS "D_업소명",
  D."INDUTY_CD_NM" AS "D_업종",
  D."LCNS_NO" AS "D_인허가번호",
  D."DSPS_DCSNDT" AS "D_처분확정일자",
  D."DSPS_BGNDT" AS "D_처분시작일(영업정지의경우)",
  D."DSPS_ENDDT" AS "D_처분종료일(영업정지의경우)",
  D."DSPS_TYPECD_NM" AS "D_처분유형",
  D."VILTCN" AS "D_위반일자 및 위반내용",
  D."ADDR" AS "D_주소",
  D."TELNO" AS "D_전화번호",
  D."PRSDNT_NM" AS "D_대표자명",
  D."LAWORD_CD_NM" AS "D_위반법령",
  D."DSPSCN" AS "D_처분내용",
  D."PUBLIC_DT" AS "D_공개기한",
  D."LAST_UPDT_DTM" AS "D_최종수정일",
  D."DSPSDTLS_SEQ" AS "D_행정처분전산키",
  D."DSPS_INSTTCD_NM" AS "D_처분기관명"
FROM "I0470" A
LEFT JOIN "I0480" B
  ON A."DSPSDTLS_SEQ" = B."DSPSDTLS_SEQ"
LEFT JOIN "I0481" C
  ON A."DSPSDTLS_SEQ" = C."DSPSDTLS_SEQ"
LEFT JOIN "I0482" D
  ON A."DSPSDTLS_SEQ" = D."DSPSDTLS_SEQ"
WHERE A."DSPSDTLS_SEQ" IS NOT NULL AND A."DSPSDTLS_SEQ" != ''
LIMIT 100;
```
