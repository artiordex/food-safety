# 데이터셋 사용 시나리오 분석 결과
> 생성일시: 2026-06-17T19:17:10.346+09:00

- 전체 시나리오: **32개** (Star: 12개, Chain: 20개)
- 전체 관계: **124개**
- HIGH 신뢰도 시나리오: **1개**

---

## SCN_002 — `STEP` 기반 (HIGH, 100점)

**참여 데이터셋** (3개): I1040, I1050, I1080

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 농약잔류허용기준 | 단계(STEP) | 식품별 농약잔류허용기준 | 단계(STEP) | INNER JOIN | 1:N | 1 | 100% | 100% | HIGH | `1` |
| 농약잔류허용기준 | 단계(STEP) | 동물의약품별 잔류허용 기준 | 단계(STEP) | INNER JOIN | 1:N | 1 | 100% | 100% | HIGH | `1` |
| 식품별 농약잔류허용기준 | 단계(STEP) | 동물의약품별 잔류허용 기준 | 단계(STEP) | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `1` |

```sql
SELECT
  A."AGCHM_KOR_NM" AS "A_농약명",
  A."FOOD_KOR_NM" AS "A_식품명",
  A."OPERTN_CITYPOINT" AS "A_시행 시점",
  A."STEP" AS "A_단계",
  A."MRL_VAL" AS "A_MRL 값",
  A."DSUSE_YN" AS "A_폐기 여부",
  B."FOOD_KOR_NM" AS "B_식품한글명",
  B."FOOD_ENG_NM" AS "B_식품영문명",
  B."AGCHM_KOR_NM" AS "B_농약명",
  B."DEDE_NTK_QTY" AS "B_일일섭취량",
  B."TMPR_STDR_APPLC_YN" AS "B_잠정기준적용여부",
  B."LCLAS_NM" AS "B_대분류",
  B."MLSFC_NM" AS "B_중분류",
  B."SCLAS_NM" AS "B_소분류",
  B."OPERTN_CITYPOINT" AS "B_시행시점",
  B."STEP" AS "B_단계",
  B."MRL_VAL" AS "B_MRL 값",
  B."ETC_YN" AS "B_기타여부",
  B."DSUSE_YN" AS "B_폐기 여부",
  C."CDX_KOREA_DVS_CD" AS "C_구분",
  C."ANIMAL_ONLY_MDCIN_NM_KOR" AS "C_동물 전용 의약품 한글명",
  C."OPERTN_CITYPOINT" AS "C_시행 시점",
  C."STEP" AS "C_단계",
  C."MRL",
  C."FOOD_KOR_NM" AS "C_식품 한글명",
  C."FOOD_ENG_NM" AS "C_식품 영문명",
  C."ETC_YN" AS "C_기타 여부",
  C."TMPR_STDR_APPLC_YN" AS "C_임시기준적용여부",
  C."DSUSE_YN" AS "C_폐기 여부"
FROM "I1040" A
INNER JOIN "I1050" B
  ON A."STEP" = B."STEP"
INNER JOIN "I1080" C
  ON A."STEP" = C."STEP"
WHERE A."STEP" IS NOT NULL AND A."STEP" != ''
LIMIT 100;
```

## SCN_CHAIN_006 — `CHAIN:DSPS_ENDDT+DSPS_BGNDT` 기반 (MEDIUM, 53점) 🔗 브릿지: `I0480`

**참여 데이터셋** (3개): I0480, I2630, I0481

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(식품접객업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (A→B) | N:M | 19 | 95% | 22% | MEDIUM | `20260616, 20260714` |
| 행정처분결과(식품제조가공업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(식품판매업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (A→B) | N:M | 80 | 53% | 39% | MEDIUM | `20260610, 20260608` |

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
  A."LAWORD_CD_NM" AS "A_위반법령",
  A."DSPSCN" AS "A_처분내용",
  A."PUBLIC_DT" AS "A_공개기한",
  A."LAST_UPDT_DTM" AS "A_최종수정일",
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  A."DSPS_INSTTCD_NM" AS "A_처분기관명",
  B."PRCSCITYPOINT_BSSHNM" AS "B_업소명",
  B."INDUTY_CD_NM" AS "B_업종",
  B."LCNS_NO" AS "B_인허가번호",
  B."DSPS_DCSNDT" AS "B_처분확정일자",
  B."DSPS_BGNDT" AS "B_처분시작일(영업정지의경우)",
  B."DSPS_ENDDT" AS "B_처분종료일(영업정지의경우)",
  B."DSPS_TYPECD_NM" AS "B_처분유형",
  B."VILTCN" AS "B_위반일자및위반내용",
  B."ADDR" AS "B_주소",
  B."TEL_NO" AS "B_전화번호",
  B."PRSDNT_NM" AS "B_대표자명",
  B."DSPSCN" AS "B_처분내용",
  B."LAWORD_CD_NM" AS "B_위반법령",
  B."PUBLIC_DT" AS "B_공개기한",
  B."LAST_UPDT_DTM" AS "B_최종수정일",
  B."DSPS_INSTTCD_NM" AS "B_처분기관명",
  B."DSPSDTLS_SEQ" AS "B_행정처분전산키",
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
  C."DSPS_INSTTCD_NM" AS "C_처분기관명"
FROM "I0480" A
LEFT JOIN "I2630" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0481" C
  ON A."DSPS_BGNDT" = C."DSPS_BGNDT"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_CHAIN_009 — `CHAIN:PRDLST_DCNM+LCNS_NO` 기반 (MEDIUM, 49점) 🔗 브릿지: `I2711`

**참여 데이터셋** (3개): I2711, I2712, I2713

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 위생용품품목제조보고 | 유형(PRDLST_DCNM) | 위생용품품목제조보고(원재료) | 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 5 | 71% | 39% | MEDIUM | `식품접객업소용 물티슈, 과일.채소용 세척제` |
| 위생용품품목제조보고 | 인허가번호(LCNS_NO) | 위생용품영업정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 35 | 81% | 4% | MEDIUM | `19879368002, 19879415001` |

```sql
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
  B."PRDLST_REPORT_NO" AS "B_품목제조번호",
  B."PRMS_DT" AS "B_보고일자",
  B."PRDLST_NM" AS "B_품목명",
  B."PRDLST_DCNM" AS "B_유형",
  B."RAWMTRL_NM" AS "B_원재료",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRSDNT_NM" AS "C_대표자명",
  C."INDUTY_NM" AS "C_업종",
  C."PRMS_DT" AS "C_허가일자",
  C."TELNO" AS "C_전화번호",
  C."LOCP_ADDR" AS "C_주소",
  C."INSTT_NM" AS "C_기관명"
FROM "I2711" A
LEFT JOIN "I2712" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I2713" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_004 — `DSPS_ENDDT` 기반 (MEDIUM, 48점)

**참여 데이터셋** (3개): I0480, I2630, I0482

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(식품접객업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (A→B) | N:M | 19 | 95% | 22% | MEDIUM | `20260616, 20260714` |
| 행정처분결과(수입식품업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(식품접객업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (A→B) | 1:N | 11 | 92% | 13% | MEDIUM | `20260624, 20260606` |
| 행정처분결과(식품제조가공업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(수입식품업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (B→A) | 1:N | 5 | 25% | 42% | LOW | `20260616, 20260624` |

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
  A."LAWORD_CD_NM" AS "A_위반법령",
  A."DSPSCN" AS "A_처분내용",
  A."PUBLIC_DT" AS "A_공개기한",
  A."LAST_UPDT_DTM" AS "A_최종수정일",
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  A."DSPS_INSTTCD_NM" AS "A_처분기관명",
  B."PRCSCITYPOINT_BSSHNM" AS "B_업소명",
  B."INDUTY_CD_NM" AS "B_업종",
  B."LCNS_NO" AS "B_인허가번호",
  B."DSPS_DCSNDT" AS "B_처분확정일자",
  B."DSPS_BGNDT" AS "B_처분시작일(영업정지의경우)",
  B."DSPS_ENDDT" AS "B_처분종료일(영업정지의경우)",
  B."DSPS_TYPECD_NM" AS "B_처분유형",
  B."VILTCN" AS "B_위반일자및위반내용",
  B."ADDR" AS "B_주소",
  B."TEL_NO" AS "B_전화번호",
  B."PRSDNT_NM" AS "B_대표자명",
  B."DSPSCN" AS "B_처분내용",
  B."LAWORD_CD_NM" AS "B_위반법령",
  B."PUBLIC_DT" AS "B_공개기한",
  B."LAST_UPDT_DTM" AS "B_최종수정일",
  B."DSPS_INSTTCD_NM" AS "B_처분기관명",
  B."DSPSDTLS_SEQ" AS "B_행정처분전산키",
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
  C."DSPS_INSTTCD_NM" AS "C_처분기관명"
FROM "I0480" A
LEFT JOIN "I2630" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0482" C
  ON B."DSPS_ENDDT" = C."DSPS_ENDDT"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_CHAIN_010 — `CHAIN:PRDLST_DCNM+LCNS_NO` 기반 (MEDIUM, 48점) 🔗 브릿지: `I2712`

**참여 데이터셋** (3개): I2712, I2711, I2713

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 위생용품품목제조보고 | 유형(PRDLST_DCNM) | 위생용품품목제조보고(원재료) | 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 5 | 71% | 39% | MEDIUM | `식품접객업소용 물티슈, 과일.채소용 세척제` |
| 위생용품품목제조보고(원재료) | 인허가번호(LCNS_NO) | 위생용품영업정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 115 | 71% | 12% | MEDIUM | `20259370002, 20249492001` |

```sql
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
  B."LAST_UPDT_DTM" AS "B_최종수정일자",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRSDNT_NM" AS "C_대표자명",
  C."INDUTY_NM" AS "C_업종",
  C."PRMS_DT" AS "C_허가일자",
  C."TELNO" AS "C_전화번호",
  C."LOCP_ADDR" AS "C_주소",
  C."INSTT_NM" AS "C_기관명"
FROM "I2712" A
LEFT JOIN "I2711" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I2713" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_CHAIN_013 — `CHAIN:LCNS_NO+PRDLST_DCNM` 기반 (MEDIUM, 43점) 🔗 브릿지: `I1250`

**참여 데이터셋** (3개): I1250, I2500, C002

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | 인허가 업소 정보 | 영업고유구분번호(인허가번호)(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 2 | 100% | 0% | MEDIUM | `19550509001, 19630364001` |
| 식품(첨가물)품목제조보고(원재료) | 품목유형명(PRDLST_DCNM) | 식품(첨가물)품목제조보고 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 13 | 17% | 54% | LOW | `두류가공품, 복합조미식품` |

```sql
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
  B."ADDR" AS "B_주소",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRDLST_REPORT_NO" AS "C_품목제조번호",
  C."PRMS_DT" AS "C_보고일자",
  C."PRDLST_NM" AS "C_품목명",
  C."PRDLST_DCNM" AS "C_품목유형명",
  C."RAWMTRL_NM" AS "C_원재료명",
  C."RAWMTRL_ORDNO" AS "C_원재료표시순서",
  C."CHNG_DT" AS "C_변경일자(YYYYMMDD)",
  C."ETQTY_XPORT_PRDLST_YN" AS "C_내수/겸용구분(N:내수, O:겸용)"
FROM "I1250" A
LEFT JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "C002" C
  ON A."PRDLST_DCNM" = C."PRDLST_DCNM"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_CHAIN_014 — `CHAIN:LCNS_NO+PRDLST_DCNM` 기반 (MEDIUM, 42점) 🔗 브릿지: `I1310`

**참여 데이터셋** (3개): I1310, I1300, C005

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | 축산물 품목제조정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 10 | 1% | 100% | MEDIUM | `20140502008, 19790257016` |
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 축산물 품목제조정보 | 유형(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 15 | 11% | 54% | LOW | `가공유, 아이스밀크` |

```sql
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
  B."TELNO" AS "B_전화번호",
  C."PRDLST_REPORT_NO" AS "C_품목보고(신고)번호",
  C."PRMS_DT" AS "C_보고(신고일)",
  C."END_DT" AS "C_생산중단일",
  C."PRDLST_NM" AS "C_제품명",
  C."POG_DAYCNT" AS "C_소비기한",
  C."PRDLST_DCNM" AS "C_식품 유형",
  C."BSSH_NM" AS "C_제조사명",
  C."INDUTY_NM" AS "C_업종",
  C."SITE_ADDR" AS "C_주소",
  C."CLSBIZ_DT" AS "C_폐업일자",
  C."BAR_CD" AS "C_유통바코드"
FROM "I1310" A
LEFT JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "C005" C
  ON A."PRDLST_DCNM" = C."PRDLST_DCNM"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_CHAIN_020 — `CHAIN:TESTITM_CD+PRDLST_CD` 기반 (MEDIUM, 42점) 🔗 브릿지: `I2610`

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

## SCN_CHAIN_007 — `CHAIN:DSPS_ENDDT+DSPSCN` 기반 (MEDIUM, 41점) 🔗 브릿지: `I2630`

**참여 데이터셋** (3개): I2630, I0480, I0470

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(식품접객업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (A→B) | N:M | 19 | 95% | 22% | MEDIUM | `20260616, 20260714` |
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(식품접객업) | 처분내용(DSPSCN) | LEFT JOIN (A→B) | N:M | 9 | 31% | 13% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |

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
  A."TEL_NO" AS "A_전화번호",
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
  C."VILTCN" AS "C_위반일자및위반내용",
  C."ADDR" AS "C_주소",
  C."TELNO" AS "C_전화번호",
  C."PRSDNT_NM" AS "C_대표자명",
  C."DSPSCN" AS "C_처분내용",
  C."LAWORD_CD_NM" AS "C_위반법령",
  C."PUBLIC_DT" AS "C_공개기한",
  C."LAST_UPDT_DTM" AS "C_최종수정일",
  C."DSPS_INSTTCD_NM" AS "C_처분기관명",
  C."DSPSDTLS_SEQ" AS "C_행정처분전산키"
FROM "I2630" A
LEFT JOIN "I0480" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0470" C
  ON A."DSPSCN" = C."DSPSCN"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_CHAIN_018 — `CHAIN:DSPS_BGNDT+DSPSCN` 기반 (MEDIUM, 40점) 🔗 브릿지: `I0481`

**참여 데이터셋** (3개): I0481, I0480, I0470

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(식품판매업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (A→B) | N:M | 80 | 53% | 39% | MEDIUM | `20260610, 20260608` |
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(식품판매업) | 처분내용(DSPSCN) | LEFT JOIN (B→A) | N:M | 6 | 21% | 46% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |

```sql
SELECT
  A."PRCSCITYPOINT_BSSHNM" AS "A_업소명",
  A."INDUTY_CD_NM" AS "A_업종",
  A."LCNS_NO" AS "A_인허가번호",
  A."DSPS_DCSNDT" AS "A_처분확정일자",
  A."DSPS_BGNDT" AS "A_처분시작일(영업정지의경우)",
  A."DSPS_ENDDT" AS "A_처분종료일(영업정지의경우)",
  A."DSPS_TYPECD_NM" AS "A_처분유형",
  A."VILTCN" AS "A_위반일자 및 위반내용",
  A."ADDR" AS "A_주소",
  A."TELNO" AS "A_전화번호",
  A."PRSDNT_NM" AS "A_대표자명",
  A."LAWORD_CD_NM" AS "A_위반법령",
  A."DSPSCN" AS "A_처분내용",
  A."PUBLIC_DT" AS "A_공개기한",
  A."LAST_UPDT_DTM" AS "A_최종수정일",
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  A."DSPS_INSTTCD_NM" AS "A_처분기관명",
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
  C."VILTCN" AS "C_위반일자및위반내용",
  C."ADDR" AS "C_주소",
  C."TELNO" AS "C_전화번호",
  C."PRSDNT_NM" AS "C_대표자명",
  C."DSPSCN" AS "C_처분내용",
  C."LAWORD_CD_NM" AS "C_위반법령",
  C."PUBLIC_DT" AS "C_공개기한",
  C."LAST_UPDT_DTM" AS "C_최종수정일",
  C."DSPS_INSTTCD_NM" AS "C_처분기관명",
  C."DSPSDTLS_SEQ" AS "C_행정처분전산키"
FROM "I0481" A
LEFT JOIN "I0480" B
  ON A."DSPS_BGNDT" = B."DSPS_BGNDT"
LEFT JOIN "I0470" C
  ON A."DSPSCN" = C."DSPSCN"
WHERE A."DSPS_BGNDT" IS NOT NULL AND A."DSPS_BGNDT" != ''
LIMIT 100;
```

## SCN_CHAIN_002 — `CHAIN:PRDLST_CD+TESTITM_CD+SPEC_VAL_SUMUP` 기반 (LOW, 38점) 🔗 브릿지: `I2580`

**참여 데이터셋** (4개): I2580, I0940, I2610, I0930

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 46 | 82% | 25% | MEDIUM | `F0100004000000, F0300000100000` |
| 개별기준규격 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | N:M | 6 | 3% | 86% | MEDIUM | `B20016, B10004` |
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 개별기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 18 | 24% | 6% | LOW | `0.05이하, 5.0이하` |

```sql
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
  B."UNIT_NM" AS "B_단위명",
  C."CMMN_SPEC_CD" AS "C_공통기준규격코드",
  C."SPEC_NM" AS "C_기준규격명",
  C."PRDLST_CD" AS "C_품목코드",
  C."KOR_NM" AS "C_한글명",
  C."TESTITM_CD" AS "C_시험항목코드",
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  D."PRDLST_NM" AS "D_품목명",
  D."T_KOR_NM" AS "D_시험항목",
  D."FNPRT_ITM_NM" AS "D_세부항목",
  D."PIAM_KOR_NM" AS "D_품목항목속성",
  D."SPEC_VAL" AS "D_기준규격값",
  D."VALD_BEGN_DT" AS "D_유효개시일자",
  D."VALD_END_DT" AS "D_유효종료일자",
  D."SPEC_VAL_SUMUP" AS "D_규격값요약",
  D."JDGMNT_FNPRT_CD_NM" AS "D_판정형식",
  D."MXMM_VAL" AS "D_최대값",
  D."MXMM_VAL_FNPRT_CD_NM" AS "D_이하/미만",
  D."MIMM_VAL" AS "D_최소값",
  D."MIMM_VAL_FNPRT_CD_NM" AS "D_이상/초과",
  D."CHOIC_FIT_FNPRT_CD_NM" AS "D_세부적합",
  D."CHOIC_IMPROPT_FNPRT_CD_NM" AS "D_부적합",
  D."INJRY_YN" AS "D_위해여부",
  D."UNIT_NM" AS "D_단위명"
FROM "I2580" A
LEFT JOIN "I0940" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I2610" C
  ON A."TESTITM_CD" = C."TESTITM_CD"
LEFT JOIN "I0930" D
  ON A."SPEC_VAL_SUMUP" = D."SPEC_VAL_SUMUP"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_003 — `PRDLST_DCNM` 기반 (LOW, 37점)

**참여 데이터셋** (8개): C002, C005, I2711, I2712, I2852, C006, I1250, I1310

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 품목유형명(PRDLST_DCNM) | 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 59 | 75% | 45% | MEDIUM | `어묵, 숙면` |
| 위생용품품목제조보고 | 유형(PRDLST_DCNM) | 위생용품품목제조보고(원재료) | 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 5 | 71% | 39% | MEDIUM | `식품접객업소용 물티슈, 과일.채소용 세척제` |
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 60 | 46% | 61% | MEDIUM | `기타가공품, 캔디류` |
| 식품(첨가물)품목제조보고(원재료) | 품목유형명(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 41 | 52% | 42% | MEDIUM | `어묵, 두류가공품` |
| 축산물품목제조보고(원재료) | 유형(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 6 | 75% | 6% | MEDIUM | `포장육, 분쇄가공육제품` |
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 축산물품목제조보고(원재료) | 유형(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 6 | 5% | 75% | MEDIUM | `아이스밀크, 분쇄가공육제품` |
| 식품(첨가물)품목제조보고(원재료) | 품목유형명(PRDLST_DCNM) | 식품(첨가물)품목제조보고 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 13 | 17% | 54% | LOW | `두류가공품, 복합조미식품` |
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 축산물 품목제조정보 | 유형(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 15 | 11% | 54% | LOW | `가공유, 아이스밀크` |
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 식품(첨가물)품목제조보고 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 13 | 10% | 54% | LOW | `기타가공품, 고추장` |
| 식품(첨가물)품목제조보고 | 품목유형명(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 8 | 33% | 8% | LOW | `소스, 복합조미식품` |
| 축산물품목제조보고(원재료) | 유형(PRDLST_DCNM) | 축산물 품목제조정보 | 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 2 | 25% | 7% | LOW | `아이스밀크, 햄` |
| 축산물 품목제조정보 | 유형(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 4 | 14% | 4% | LOW | `아이스밀크, 햄` |

```sql
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
  B."PRDLST_REPORT_NO" AS "B_품목보고(신고)번호",
  B."PRMS_DT" AS "B_보고(신고일)",
  B."END_DT" AS "B_생산중단일",
  B."PRDLST_NM" AS "B_제품명",
  B."POG_DAYCNT" AS "B_소비기한",
  B."PRDLST_DCNM" AS "B_식품 유형",
  B."BSSH_NM" AS "B_제조사명",
  B."INDUTY_NM" AS "B_업종",
  B."SITE_ADDR" AS "B_주소",
  B."CLSBIZ_DT" AS "B_폐업일자",
  B."BAR_CD" AS "B_유통바코드",
  C."PRDLST_REPORT_NO" AS "C_품목제조보고번호",
  C."PRMS_DT" AS "C_품목보고일자",
  C."PRDLST_NM" AS "C_제품명",
  C."END_DT" AS "C_생산중단일자",
  C."PRDLST_DCNM" AS "C_품목유형명",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."FOOD_HF_LS_CL_CD_NM" AS "C_구분",
  C."ARTCL_END_WHY" AS "C_생산중단사유"
FROM "C002" A
LEFT JOIN "C005" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I2852" C
  ON B."PRDLST_DCNM" = C."PRDLST_DCNM"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_001 — `LCNS_NO` 기반 (LOW, 33점)

**참여 데이터셋** (38개): C001, I1260, I0680, I1540, I2500, I2560, I-0020, I0630, I2860, I1220, I2859, I0030, I1200, I2861, C003, I1300, I1310, I1250, I0310, I0060, I2711, I2713, I2712, I1230, I0490, I2640, I2851, I2823, I0080, C006, I1320, I0610, I0482, I2852, C002, I0300, I1420, I2620

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
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 14 | 47% | 10% | LOW | `20040015039, 20040015070` |
| 식품첨가물제조업 | 인허가 번호(LCNS_NO) | 식품(첨가물)품목제조보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 1 | 0% | 50% | LOW | `19630364001` |
| 위생용품영업정보 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 71 | 7% | 42% | LOW | `20189380002, 20059355002` |
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 5 | 2% | 46% | LOW | `20160333083, 20000320226` |
| 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | 건강기능식품업소 인허가 변경 정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 6 | 33% | 2% | LOW | `20220016693, 20040016020` |
| 위생용품 폐업정보 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 45 | 5% | 26% | LOW | `19859273001, 19859447001` |
| 축산물 품목제조정보 | 인허가번호(LCNS_NO) | 인허가 업소 정보 | 영업고유구분번호(인허가번호)(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 3 | 30% | 0% | LOW | `19640448001, 19670230001` |
| 축산물 품목제조정보 | 인허가번호(LCNS_NO) | 영업소재지 GIS 코드 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 3 | 30% | 0% | LOW | `19640448001, 19670230001` |
| 위생용품품목제조보고 | 인허가번호(LCNS_NO) | 위생용품영업 생산실적보고 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 7 | 16% | 4% | LOW | `19899221002, 20079445004` |
| 어린이 기호식품 품질인증 현황 및 재심사 현황 | 인허가번호(LCNS_NO) | 축산물 품목제조정보 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 2 | 1% | 20% | LOW | `19770262001, 19790532001` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:1 | 93 | 10% | 9% | LOW | `20260261007, 20230904005` |
| 축산물품목제조보고(원재료) | 인허가번호(LCNS_NO) | 축산물 식육포장처리업영업허가대장 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 19 | 17% | 2% | LOW | `20040484772, 20050368569` |
| 건강기능식품 품목제조신고(원재료) | 인허가번호(LCNS_NO) | 건강기능식품 생산실적 보고 품목 현황 | 인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 2 | 7% | 11% | LOW | `20040015191, 20040015119` |
| 어린이 기호식품 품질인증 현황 및 재심사 현황 | 인허가번호(LCNS_NO) | 축산물 가공업허가정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 24 | 11% | 2% | LOW | `19930448001, 20120379026` |
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

## SCN_006 — `DSPS_BGNDT` 기반 (LOW, 32점)

**참여 데이터셋** (4개): I0480, I0481, I0482, I0470

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(식품판매업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (A→B) | N:M | 80 | 53% | 39% | MEDIUM | `20260610, 20260608` |
| 행정처분결과(식품판매업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(수입식품업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (B→A) | N:M | 16 | 8% | 44% | LOW | `20260529, 20260526` |
| 행정처분결과 | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(식품제조가공업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (A→B) | N:M | 31 | 27% | 21% | LOW | `20240613, 20240614` |

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
  A."LAWORD_CD_NM" AS "A_위반법령",
  A."DSPSCN" AS "A_처분내용",
  A."PUBLIC_DT" AS "A_공개기한",
  A."LAST_UPDT_DTM" AS "A_최종수정일",
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  A."DSPS_INSTTCD_NM" AS "A_처분기관명",
  B."PRCSCITYPOINT_BSSHNM" AS "B_업소명",
  B."INDUTY_CD_NM" AS "B_업종",
  B."LCNS_NO" AS "B_인허가번호",
  B."DSPS_DCSNDT" AS "B_처분확정일자",
  B."DSPS_BGNDT" AS "B_처분시작일(영업정지의경우)",
  B."DSPS_ENDDT" AS "B_처분종료일(영업정지의경우)",
  B."DSPS_TYPECD_NM" AS "B_처분유형",
  B."VILTCN" AS "B_위반일자 및 위반내용",
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
  D."VILTCN" AS "D_위반일자및위반내용",
  D."ADDR" AS "D_주소",
  D."TELNO" AS "D_전화번호",
  D."PRSDNT_NM" AS "D_대표자명",
  D."DSPSCN" AS "D_처분내용",
  D."LAWORD_CD_NM" AS "D_위반법령",
  D."PUBLIC_DT" AS "D_공개기한",
  D."LAST_UPDT_DTM" AS "D_최종수정일",
  D."DSPS_INSTTCD_NM" AS "D_처분기관명",
  D."DSPSDTLS_SEQ" AS "D_행정처분전산키"
FROM "I0480" A
LEFT JOIN "I0481" B
  ON A."DSPS_BGNDT" = B."DSPS_BGNDT"
LEFT JOIN "I0482" C
  ON B."DSPS_BGNDT" = C."DSPS_BGNDT"
LEFT JOIN "I0470" D
  ON A."DSPS_BGNDT" = D."DSPS_BGNDT"
WHERE A."DSPS_BGNDT" IS NOT NULL AND A."DSPS_BGNDT" != ''
LIMIT 100;
```

## SCN_CHAIN_008 — `CHAIN:PRDLST_DCNM+LCNS_NO` 기반 (LOW, 32점) 🔗 브릿지: `C002`

**참여 데이터셋** (3개): C002, C005, I1220

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 품목유형명(PRDLST_DCNM) | 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 59 | 75% | 45% | MEDIUM | `어묵, 숙면` |
| 식품(첨가물)품목제조보고(원재료) | 인허가번호(LCNS_NO) | 식품제조가공업정보 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 17 | 6% | 2% | LOW | `19950433026, 20080449004` |

```sql
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
  B."PRDLST_REPORT_NO" AS "B_품목보고(신고)번호",
  B."PRMS_DT" AS "B_보고(신고일)",
  B."END_DT" AS "B_생산중단일",
  B."PRDLST_NM" AS "B_제품명",
  B."POG_DAYCNT" AS "B_소비기한",
  B."PRDLST_DCNM" AS "B_식품 유형",
  B."BSSH_NM" AS "B_제조사명",
  B."INDUTY_NM" AS "B_업종",
  B."SITE_ADDR" AS "B_주소",
  B."CLSBIZ_DT" AS "B_폐업일자",
  B."BAR_CD" AS "B_유통바코드",
  C."LCNS_NO" AS "C_인허가 번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRSDNT_NM" AS "C_대표자명",
  C."INDUTY_NM" AS "C_업종",
  C."PRMS_DT" AS "C_허가일자",
  C."TELNO" AS "C_전화번호",
  C."LOCP_ADDR" AS "C_주소",
  C."INSTT_NM" AS "C_기관명"
FROM "C002" A
LEFT JOIN "C005" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I1220" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_CHAIN_003 — `CHAIN:PRDLST_CD+TESTITM_CD+SPEC_VAL_SUMUP` 기반 (LOW, 30점) 🔗 브릿지: `I0960`

**참여 데이터셋** (4개): I0960, I2580, I2530, I0930

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 건강기능식품공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 112 | 22% | 61% | MEDIUM | `E0301700000000, E0317300000000` |
| 건강기능식품공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 97 | 66% | 10% | LOW | `A40151, A40128` |
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 건강기능식품공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 11 | 14% | 5% | LOW | `0.05이하, 5.0이하` |

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
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  D."PRDLST_NM" AS "D_품목명",
  D."T_KOR_NM" AS "D_시험항목",
  D."FNPRT_ITM_NM" AS "D_세부항목",
  D."PIAM_KOR_NM" AS "D_품목항목속성",
  D."SPEC_VAL" AS "D_기준규격값",
  D."VALD_BEGN_DT" AS "D_유효개시일자",
  D."VALD_END_DT" AS "D_유효종료일자",
  D."SPEC_VAL_SUMUP" AS "D_규격값요약",
  D."JDGMNT_FNPRT_CD_NM" AS "D_판정형식",
  D."MXMM_VAL" AS "D_최대값",
  D."MXMM_VAL_FNPRT_CD_NM" AS "D_이하/미만",
  D."MIMM_VAL" AS "D_최소값",
  D."MIMM_VAL_FNPRT_CD_NM" AS "D_이상/초과",
  D."CHOIC_FIT_FNPRT_CD_NM" AS "D_세부적합",
  D."CHOIC_IMPROPT_FNPRT_CD_NM" AS "D_부적합",
  D."INJRY_YN" AS "D_위해여부",
  D."UNIT_NM" AS "D_단위명"
FROM "I0960" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I2530" C
  ON A."TESTITM_CD" = C."TESTITM_CD"
LEFT JOIN "I0930" D
  ON A."SPEC_VAL_SUMUP" = D."SPEC_VAL_SUMUP"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_CHAIN_011 — `CHAIN:PRDLST_DCNM+LCNS_NO` 기반 (LOW, 29점) 🔗 브릿지: `I2852`

**참여 데이터셋** (3개): I2852, C005, I0030

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 바코드연계제품정보 | 식품 유형(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (B→A) | N:M | 60 | 46% | 61% | MEDIUM | `기타가공품, 캔디류` |
| 건강기능식품 품목제조 신고사항 현황 | 인허가번호(LCNS_NO) | 생산중단제품정보 | 인허가번호(LCNS_NO) | LEFT JOIN (A→B) | N:M | 8 | 6% | 4% | LOW | `20040020002, 20100019004` |

```sql
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
  B."PRDLST_REPORT_NO" AS "B_품목보고(신고)번호",
  B."PRMS_DT" AS "B_보고(신고일)",
  B."END_DT" AS "B_생산중단일",
  B."PRDLST_NM" AS "B_제품명",
  B."POG_DAYCNT" AS "B_소비기한",
  B."PRDLST_DCNM" AS "B_식품 유형",
  B."BSSH_NM" AS "B_제조사명",
  B."INDUTY_NM" AS "B_업종",
  B."SITE_ADDR" AS "B_주소",
  B."CLSBIZ_DT" AS "B_폐업일자",
  B."BAR_CD" AS "B_유통바코드",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소_명",
  C."PRDLST_REPORT_NO" AS "C_품목제조번호",
  C."PRDLST_NM" AS "C_품목_명",
  C."PRMS_DT" AS "C_허가_일자",
  C."POG_DAYCNT" AS "C_소비기한_일수",
  C."DISPOS" AS "C_제품형태",
  C."NTK_MTHD" AS "C_섭취방법",
  C."PRIMARY_FNCLTY" AS "C_주된기능성",
  C."IFTKN_ATNT_MATR_CN" AS "C_섭취시주의사항",
  C."CSTDY_MTHD" AS "C_보관방법",
  C."PRDLST_CDNM" AS "C_유형",
  C."STDR_STND" AS "C_기준규격",
  C."HIENG_LNTRT_DVS_NM" AS "C_고열량저영양여부",
  C."PRODUCTION" AS "C_생산종료여부",
  C."CHILD_CRTFC_YN" AS "C_어린이기호식품품질인증여부",
  C."PRDT_SHAP_CD_NM" AS "C_제품_형태_코드_명",
  C."FRMLC_MTRQLT" AS "C_포장재질",
  C."RAWMTRL_NM" AS "C_품목유형(기능지표성분)",
  C."INDUTY_CD_NM" AS "C_업종",
  C."LAST_UPDT_DTM" AS "C_최종수정일자",
  C."INDIV_RAWMTRL_NM" AS "C_기능성 원재료",
  C."ETC_RAWMTRL_NM" AS "C_기타 원재료",
  C."CAP_RAWMTRL_NM" AS "C_캡슐 원재료",
  C."FRMLC_MTHD" AS "C_포장방법",
  C."FRMLC_MTRQLT" AS "C_포장재질"
FROM "I2852" A
LEFT JOIN "C005" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I0030" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_CHAIN_019 — `CHAIN:DSPSCN+DSPS_BGNDT` 기반 (LOW, 29점) 🔗 브릿지: `I0470`

**참여 데이터셋** (3개): I0470, I0481, I0480

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(식품판매업) | 처분내용(DSPSCN) | LEFT JOIN (B→A) | N:M | 6 | 21% | 46% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(식품제조가공업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (A→B) | N:M | 31 | 27% | 21% | LOW | `20240613, 20240614` |

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
  B."VILTCN" AS "B_위반일자 및 위반내용",
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
  C."VILTCN" AS "C_위반일자및위반내용",
  C."ADDR" AS "C_주소",
  C."TELNO" AS "C_전화번호",
  C."PRSDNT_NM" AS "C_대표자명",
  C."LAWORD_CD_NM" AS "C_위반법령",
  C."DSPSCN" AS "C_처분내용",
  C."PUBLIC_DT" AS "C_공개기한",
  C."LAST_UPDT_DTM" AS "C_최종수정일",
  C."DSPSDTLS_SEQ" AS "C_행정처분전산키",
  C."DSPS_INSTTCD_NM" AS "C_처분기관명"
FROM "I0470" A
LEFT JOIN "I0481" B
  ON A."DSPSCN" = B."DSPSCN"
LEFT JOIN "I0480" C
  ON A."DSPS_BGNDT" = C."DSPS_BGNDT"
WHERE A."DSPSCN" IS NOT NULL AND A."DSPSCN" != ''
LIMIT 100;
```

## SCN_CHAIN_005 — `CHAIN:PRDLST_CD+SPEC_VAL_SUMUP+TESTITM_CD` 기반 (LOW, 25점) 🔗 브릿지: `I2600`

**참여 데이터셋** (4개): I2600, I2610, I0930, I2530

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 공통기준규격 | 품목분류코드(PRDLST_CD) | 공통기준제외 | 품목코드(PRDLST_CD) | LEFT JOIN (B→A) | N:M | 6 | 4% | 75% | MEDIUM | `C0000000000000, B0203010000000` |
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 공통기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 30 | 40% | 26% | LOW | `50이하, 1.0 이하 (건조물 기준으로서)` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 공통기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 16 | 2% | 5% | LOW | `A10029, A30023` |

```sql
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
  B."PRDLST_CD" AS "B_품목코드",
  B."KOR_NM" AS "B_한글명",
  B."TESTITM_CD" AS "B_시험항목코드",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  C."PRDLST_NM" AS "C_품목명",
  C."T_KOR_NM" AS "C_시험항목",
  C."FNPRT_ITM_NM" AS "C_세부항목",
  C."PIAM_KOR_NM" AS "C_품목항목속성",
  C."SPEC_VAL" AS "C_기준규격값",
  C."VALD_BEGN_DT" AS "C_유효개시일자",
  C."VALD_END_DT" AS "C_유효종료일자",
  C."SPEC_VAL_SUMUP" AS "C_규격값요약",
  C."JDGMNT_FNPRT_CD_NM" AS "C_판정형식",
  C."MXMM_VAL" AS "C_최대값",
  C."MXMM_VAL_FNPRT_CD_NM" AS "C_이하/미만",
  C."MIMM_VAL" AS "C_최소값",
  C."MIMM_VAL_FNPRT_CD_NM" AS "C_이상/초과",
  C."CHOIC_FIT_FNPRT_CD_NM" AS "C_세부적합",
  C."CHOIC_IMPROPT_FNPRT_CD_NM" AS "C_부적합",
  C."INJRY_YN" AS "C_위해여부",
  C."UNIT_NM" AS "C_단위명",
  D."TESTITM_CD" AS "D_시험항목코드",
  D."KOR_NM" AS "D_한글명",
  D."ENG_NM" AS "D_영문명",
  D."ABRV" AS "D_약어",
  D."NCKNM" AS "D_이명",
  D."TESTITM_NM" AS "D_시험항목명",
  D."TESTITM_LCLAS_CD" AS "D_시험항목대분류시퀀스",
  D."L_ATTRB_CD" AS "D_시험항목대분류코드",
  D."L_KOR_NM" AS "D_대분류한글명",
  D."TESTITM_MLSFC_CD" AS "D_시험항목중분류시퀀스",
  D."M_ATTRB_CD" AS "D_시험항목중분류코드",
  D."M_KOR_NM" AS "D_중분류한글명",
  D."REMN_MTTR_DFN" AS "D_잔류물질정의",
  D."USE_YN" AS "D_사용여부",
  D."LAST_UPDT_DTM" AS "D_최종수정일시"
FROM "I2600" A
LEFT JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I0930" C
  ON A."SPEC_VAL_SUMUP" = C."SPEC_VAL_SUMUP"
LEFT JOIN "I2530" D
  ON A."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_CHAIN_012 — `CHAIN:PRDLST_DCNM+LCNS_NO` 기반 (LOW, 25점) 🔗 브릿지: `C006`

**참여 데이터셋** (3개): C006, I2852, I1320

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 축산물품목제조보고(원재료) | 유형(PRDLST_DCNM) | 생산중단제품정보 | 품목유형명(PRDLST_DCNM) | LEFT JOIN (A→B) | N:M | 6 | 75% | 6% | MEDIUM | `포장육, 분쇄가공육제품` |
| 축산물품목제조보고(원재료) | 인허가번호(LCNS_NO) | 축산물 식육포장처리업영업허가대장 | 인허가 번호(LCNS_NO) | LEFT JOIN (A→B) | 1:N | 19 | 17% | 2% | LOW | `20040484772, 20050368569` |

```sql
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
  B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
  B."PRMS_DT" AS "B_품목보고일자",
  B."PRDLST_NM" AS "B_제품명",
  B."END_DT" AS "B_생산중단일자",
  B."PRDLST_DCNM" AS "B_품목유형명",
  B."LCNS_NO" AS "B_인허가번호",
  B."BSSH_NM" AS "B_업소명",
  B."FOOD_HF_LS_CL_CD_NM" AS "B_구분",
  B."ARTCL_END_WHY" AS "B_생산중단사유",
  C."LCNS_NO" AS "C_인허가 번호",
  C."BSSH_NM" AS "C_업소명",
  C."PRSDNT_NM" AS "C_대표자명",
  C."INDUTY_NM" AS "C_업종",
  C."CLSBIZ_DVS_NM" AS "C_영업상태",
  C."PRMS_DT" AS "C_허가일자",
  C."LOCP_ADDR" AS "C_주소",
  C."INSTT_NM" AS "C_기관명",
  C."TELNO" AS "C_전화번호"
FROM "C006" A
LEFT JOIN "I2852" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I1320" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_CHAIN_001 — `CHAIN:DSPS_ENDDT+DSPS_BGNDT+DSPSCN+LCNS_NO` 기반 (LOW, 24점) 🔗 브릿지: `I0482`

**참여 데이터셋** (5개): I0482, I2630, I0481, I0470, I2640

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과(수입식품업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | 행정처분결과(식품접객업) | 처분종료일(영업정지의경우)(DSPS_ENDDT) | LEFT JOIN (A→B) | 1:N | 11 | 92% | 13% | MEDIUM | `20260624, 20260606` |
| 행정처분결과(식품판매업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | 행정처분결과(수입식품업) | 처분시작일(영업정지의경우)(DSPS_BGNDT) | LEFT JOIN (B→A) | N:M | 16 | 8% | 44% | LOW | `20260529, 20260526` |
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(수입식품업) | 처분내용(DSPSCN) | LEFT JOIN (B→A) | N:M | 3 | 10% | 16% | LOW | `영업허가·등록취소, 영업등록 취소(2024. 7. 24.자)` |
| 행정처분결과(수입식품업) | 인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 1 | 2% | 9% | LOW | `20250017312` |

```sql
SELECT
  A."PRCSCITYPOINT_BSSHNM" AS "A_업소명",
  A."INDUTY_CD_NM" AS "A_업종",
  A."LCNS_NO" AS "A_인허가번호",
  A."DSPS_DCSNDT" AS "A_처분확정일자",
  A."DSPS_BGNDT" AS "A_처분시작일(영업정지의경우)",
  A."DSPS_ENDDT" AS "A_처분종료일(영업정지의경우)",
  A."DSPS_TYPECD_NM" AS "A_처분유형",
  A."VILTCN" AS "A_위반일자 및 위반내용",
  A."ADDR" AS "A_주소",
  A."TELNO" AS "A_전화번호",
  A."PRSDNT_NM" AS "A_대표자명",
  A."LAWORD_CD_NM" AS "A_위반법령",
  A."DSPSCN" AS "A_처분내용",
  A."PUBLIC_DT" AS "A_공개기한",
  A."LAST_UPDT_DTM" AS "A_최종수정일",
  A."DSPSDTLS_SEQ" AS "A_행정처분전산키",
  A."DSPS_INSTTCD_NM" AS "A_처분기관명",
  B."PRCSCITYPOINT_BSSHNM" AS "B_업소명",
  B."INDUTY_CD_NM" AS "B_업종",
  B."LCNS_NO" AS "B_인허가번호",
  B."DSPS_DCSNDT" AS "B_처분확정일자",
  B."DSPS_BGNDT" AS "B_처분시작일(영업정지의경우)",
  B."DSPS_ENDDT" AS "B_처분종료일(영업정지의경우)",
  B."DSPS_TYPECD_NM" AS "B_처분유형",
  B."VILTCN" AS "B_위반일자및위반내용",
  B."ADDR" AS "B_주소",
  B."TEL_NO" AS "B_전화번호",
  B."PRSDNT_NM" AS "B_대표자명",
  B."DSPSCN" AS "B_처분내용",
  B."LAWORD_CD_NM" AS "B_위반법령",
  B."PUBLIC_DT" AS "B_공개기한",
  B."LAST_UPDT_DTM" AS "B_최종수정일",
  B."DSPS_INSTTCD_NM" AS "B_처분기관명",
  B."DSPSDTLS_SEQ" AS "B_행정처분전산키",
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
  D."VILTCN" AS "D_위반일자및위반내용",
  D."ADDR" AS "D_주소",
  D."TELNO" AS "D_전화번호",
  D."PRSDNT_NM" AS "D_대표자명",
  D."DSPSCN" AS "D_처분내용",
  D."LAWORD_CD_NM" AS "D_위반법령",
  D."PUBLIC_DT" AS "D_공개기한",
  D."LAST_UPDT_DTM" AS "D_최종수정일",
  D."DSPS_INSTTCD_NM" AS "D_처분기관명",
  D."DSPSDTLS_SEQ" AS "D_행정처분전산키",
  E."PRDTNM" AS "E_제품명",
  E."BSSHNM" AS "E_업소명",
  E."MNFDT" AS "E_제조일자",
  E."DISTBTMLMT" AS "E_유통/소비기한",
  E."ADDR" AS "E_영업자주소",
  E."INSTT_NM" AS "E_검사기관",
  E."REGSTR_TELNO" AS "E_전화번호",
  E."BRCDNO" AS "E_바코드번호",
  E."FRMLCUNIT" AS "E_포장단위",
  E."TEST_ITMNM" AS "E_부적합항목",
  E."STDR_STND" AS "E_기준규격",
  E."TESTANALS_RSLT" AS "E_검사결과",
  E."CRET_DTM" AS "E_등록일",
  E."RTRVLDSUSE_SEQ" AS "E_회수폐기일련번호",
  E."LCNS_NO" AS "E_업체인허가번호",
  E."REPORTR_TELNO" AS "E_보고자전화번호"
FROM "I0482" A
LEFT JOIN "I2630" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0481" C
  ON A."DSPS_BGNDT" = C."DSPS_BGNDT"
LEFT JOIN "I0470" D
  ON A."DSPSCN" = D."DSPSCN"
LEFT JOIN "I2640" E
  ON A."LCNS_NO" = E."LCNS_NO"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_CHAIN_004 — `CHAIN:PRDLST_CD+SPEC_VAL_SUMUP+TESTITM_CD` 기반 (LOW, 24점) 🔗 브릿지: `I0940`

**참여 데이터셋** (4개): I0940, I2580, I2600, I2530

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품용 기구 및 용기.포장 공전 | 품목코드(PRDLST_CD) | 개별기준규격 | 품목분류코드(PRDLST_CD) | LEFT JOIN (A→B) | N:M | 46 | 82% | 25% | MEDIUM | `F0100004000000, F0300000100000` |
| 식품용 기구 및 용기.포장 공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | 공통기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 11 | 10% | 9% | LOW | `합성수지제, 가공셀룰로스제, 종이제, 전분제 기구 및 용기·포장에 사용되는 재질은 납, 카드뮴, 수은 및 6가크롬의 합이 100 mg/kg 이하이어야 하며, 시험법은 Ⅳ. 2. 2-1 납 시험법 가. 잔류시험, 2-2 카드뮴 시험법 가. 잔류시험, 2-3 수은시험법, 2-4 6가크롬 시험법 가. 잔류시험에 따른다., 0.1 이하` |
| 식품용 기구 및 용기.포장 공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 12 | 17% | 1% | LOW | `B20048, B10001` |

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
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  D."TESTITM_CD" AS "D_시험항목코드",
  D."KOR_NM" AS "D_한글명",
  D."ENG_NM" AS "D_영문명",
  D."ABRV" AS "D_약어",
  D."NCKNM" AS "D_이명",
  D."TESTITM_NM" AS "D_시험항목명",
  D."TESTITM_LCLAS_CD" AS "D_시험항목대분류시퀀스",
  D."L_ATTRB_CD" AS "D_시험항목대분류코드",
  D."L_KOR_NM" AS "D_대분류한글명",
  D."TESTITM_MLSFC_CD" AS "D_시험항목중분류시퀀스",
  D."M_ATTRB_CD" AS "D_시험항목중분류코드",
  D."M_KOR_NM" AS "D_중분류한글명",
  D."REMN_MTTR_DFN" AS "D_잔류물질정의",
  D."USE_YN" AS "D_사용여부",
  D."LAST_UPDT_DTM" AS "D_최종수정일시"
FROM "I0940" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I2600" C
  ON A."SPEC_VAL_SUMUP" = C."SPEC_VAL_SUMUP"
LEFT JOIN "I2530" D
  ON A."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_010 — `HIST_TRACE_REG_NO` 기반 (LOW, 24점)

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

## SCN_008 — `DSPSCN` 기반 (LOW, 23점)

**참여 데이터셋** (4개): I0470, I0481, I2630, I0482

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(식품판매업) | 처분내용(DSPSCN) | LEFT JOIN (B→A) | N:M | 6 | 21% | 46% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(식품접객업) | 처분내용(DSPSCN) | LEFT JOIN (A→B) | N:M | 9 | 31% | 13% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 처분내용(DSPSCN) | 행정처분결과(수입식품업) | 처분내용(DSPSCN) | LEFT JOIN (B→A) | N:M | 3 | 10% | 16% | LOW | `영업허가·등록취소, 영업등록 취소(2024. 7. 24.자)` |

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
  B."VILTCN" AS "B_위반일자 및 위반내용",
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
  C."VILTCN" AS "C_위반일자및위반내용",
  C."ADDR" AS "C_주소",
  C."TEL_NO" AS "C_전화번호",
  C."PRSDNT_NM" AS "C_대표자명",
  C."DSPSCN" AS "C_처분내용",
  C."LAWORD_CD_NM" AS "C_위반법령",
  C."PUBLIC_DT" AS "C_공개기한",
  C."LAST_UPDT_DTM" AS "C_최종수정일",
  C."DSPS_INSTTCD_NM" AS "C_처분기관명",
  C."DSPSDTLS_SEQ" AS "C_행정처분전산키",
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
LEFT JOIN "I0481" B
  ON A."DSPSCN" = B."DSPSCN"
LEFT JOIN "I2630" C
  ON A."DSPSCN" = C."DSPSCN"
LEFT JOIN "I0482" D
  ON A."DSPSCN" = D."DSPSCN"
WHERE A."DSPSCN" IS NOT NULL AND A."DSPSCN" != ''
LIMIT 100;
```

## SCN_007 — `TESTITM_CD` 기반 (LOW, 21점)

**참여 데이터셋** (7개): I2580, I2610, I0960, I2530, I0950, I0940, I2600

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 개별기준규격 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | N:M | 6 | 3% | 86% | MEDIUM | `B20016, B10004` |
| 건강기능식품공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 97 | 66% | 10% | LOW | `A40151, A40128` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 117 | 12% | 53% | LOW | `A10008, A10018` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 공통기준제외 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 4 | 0% | 57% | LOW | `B10002, B10004` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 27 | 46% | 3% | LOW | `A30003, A10088` |
| 식품용 기구 및 용기.포장 공전 | 시험항목코드(TESTITM_CD) | 시험항목코드 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | 1:N | 12 | 17% | 1% | LOW | `B20048, B10001` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 개별기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 6 | 10% | 3% | LOW | `B20003, A40005` |
| 식품첨가물공전 | 시험항목코드(TESTITM_CD) | 건강기능식품공전 | 시험항목코드(TESTITM_CD) | LEFT JOIN (A→B) | N:M | 5 | 9% | 3% | LOW | `A30010, B20003` |
| 시험항목코드 | 시험항목코드(TESTITM_CD) | 공통기준규격 | 시험항목코드(TESTITM_CD) | LEFT JOIN (B→A) | 1:N | 16 | 2% | 5% | LOW | `A10029, A30023` |

```sql
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
  B."CMMN_SPEC_CD" AS "B_공통기준규격코드",
  B."SPEC_NM" AS "B_기준규격명",
  B."PRDLST_CD" AS "B_품목코드",
  B."KOR_NM" AS "B_한글명",
  B."TESTITM_CD" AS "B_시험항목코드",
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
FROM "I2580" A
LEFT JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LEFT JOIN "I2530" C
  ON A."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 100;
```

## SCN_005 — `PRDLST_CD` 기반 (LOW, 20점)

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

## SCN_CHAIN_015 — `CHAIN:LCNS_NO+PRDLST_CD` 기반 (LOW, 18점) 🔗 브릿지: `I0490`

**참여 데이터셋** (3개): I0490, I2640, I0940

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 5 | 2% | 46% | LOW | `20160333083, 20000320226` |
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
  B."LCNS_NO" AS "B_업체인허가번호",
  B."REPORTR_TELNO" AS "B_보고자전화번호",
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
LEFT JOIN "I2640" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "I0940" C
  ON A."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_011 — `BASIS_LAWORD` 기반 (LOW, 16점)

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

## SCN_009 — `SPEC_VAL_SUMUP` 기반 (LOW, 14점)

**참여 데이터셋** (5개): I0930, I2600, I2580, I0960, I0940

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 공통기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 30 | 40% | 26% | LOW | `50이하, 1.0 이하 (건조물 기준으로서)` |
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 개별기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 18 | 24% | 6% | LOW | `0.05이하, 5.0이하` |
| 식품공전 | 규격값요약(SPEC_VAL_SUMUP) | 건강기능식품공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 11 | 14% | 5% | LOW | `0.05이하, 5.0이하` |
| 식품용 기구 및 용기.포장 공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | 공통기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 11 | 10% | 9% | LOW | `합성수지제, 가공셀룰로스제, 종이제, 전분제 기구 및 용기·포장에 사용되는 재질은 납, 카드뮴, 수은 및 6가크롬의 합이 100 mg/kg 이하이어야 하며, 시험법은 Ⅳ. 2. 2-1 납 시험법 가. 잔류시험, 2-2 카드뮴 시험법 가. 잔류시험, 2-3 수은시험법, 2-4 6가크롬 시험법 가. 잔류시험에 따른다., 0.1 이하` |
| 건강기능식품공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | 공통기준규격 | 기준규격요약(SPEC_VAL_SUMUP) | LEFT JOIN (B→A) | N:M | 13 | 5% | 11% | LOW | `불검출, 1.0이하` |
| 식품용 기구 및 용기.포장 공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | 건강기능식품공전 | 기준규격값 요약(SPEC_VAL_SUMUP) | LEFT JOIN (A→B) | N:M | 8 | 8% | 3% | LOW | `0.1 이하, 0.5 이하` |

```sql
SELECT
  A."PRDLST_NM" AS "A_품목명",
  A."T_KOR_NM" AS "A_시험항목",
  A."FNPRT_ITM_NM" AS "A_세부항목",
  A."PIAM_KOR_NM" AS "A_품목항목속성",
  A."SPEC_VAL" AS "A_기준규격값",
  A."VALD_BEGN_DT" AS "A_유효개시일자",
  A."VALD_END_DT" AS "A_유효종료일자",
  A."SPEC_VAL_SUMUP" AS "A_규격값요약",
  A."JDGMNT_FNPRT_CD_NM" AS "A_판정형식",
  A."MXMM_VAL" AS "A_최대값",
  A."MXMM_VAL_FNPRT_CD_NM" AS "A_이하/미만",
  A."MIMM_VAL" AS "A_최소값",
  A."MIMM_VAL_FNPRT_CD_NM" AS "A_이상/초과",
  A."CHOIC_FIT_FNPRT_CD_NM" AS "A_세부적합",
  A."CHOIC_IMPROPT_FNPRT_CD_NM" AS "A_부적합",
  A."INJRY_YN" AS "A_위해여부",
  A."UNIT_NM" AS "A_단위명",
  B."CMMN_SPEC_SEQ" AS "B_공통기준종류코드일련번호",
  B."CMMN_SPEC_CD" AS "B_공통기준종류코드",
  B."SPEC_NM" AS "B_공통기준종류명",
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
  C."INDV_SPEC_SEQ" AS "C_개별기준규격일련번호",
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
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  D."PRDLST_CD" AS "D_품목코드",
  D."PC_KOR_NM" AS "D_품목한글명",
  D."TESTITM_CD" AS "D_시험항목코드",
  D."T_KOR_NM" AS "D_시험항목 한글명",
  D."FNPRT_ITM_NM" AS "D_세부항목명",
  D."SPEC_VAL" AS "D_기준규격값",
  D."SPEC_VAL_SUMUP" AS "D_기준규격값 요약",
  D."VALD_BEGN_DT" AS "D_유효개시일자",
  D."VALD_END_DT" AS "D_유효종료일자",
  D."SORC" AS "D_출처",
  D."MXMM_VAL" AS "D_최대값",
  D."MIMM_VAL" AS "D_최소값",
  D."INJRY_YN" AS "D_위해여부",
  D."UNIT_NM" AS "D_단위명",
  E."PRDLST_CD" AS "E_품목코드",
  E."PC_KOR_NM" AS "E_품목한글명",
  E."TESTITM_CD" AS "E_시험항목코드",
  E."T_KOR_NM" AS "E_시험항목 한글명",
  E."FNPRT_ITM_NM" AS "E_세부항목명",
  E."SPEC_VAL" AS "E_기준규격값",
  E."SPEC_VAL_SUMUP" AS "E_기준규격값 요약",
  E."VALD_BEGN_DT" AS "E_유효개시일자",
  E."VALD_END_DT" AS "E_유효종료일자",
  E."SORC" AS "E_출처",
  E."MXMM_VAL" AS "E_최대값",
  E."MIMM_VAL" AS "E_최소값",
  E."INJRY_YN" AS "E_위해여부",
  E."UNIT_NM" AS "E_단위명"
FROM "I0930" A
LEFT JOIN "I2600" B
  ON A."SPEC_VAL_SUMUP" = B."SPEC_VAL_SUMUP"
LEFT JOIN "I2580" C
  ON A."SPEC_VAL_SUMUP" = C."SPEC_VAL_SUMUP"
LEFT JOIN "I0960" D
  ON A."SPEC_VAL_SUMUP" = D."SPEC_VAL_SUMUP"
LEFT JOIN "I0940" E
  ON B."SPEC_VAL_SUMUP" = E."SPEC_VAL_SUMUP"
WHERE A."SPEC_VAL_SUMUP" IS NOT NULL AND A."SPEC_VAL_SUMUP" != ''
LIMIT 100;
```

## SCN_CHAIN_016 — `CHAIN:LCNS_NO+PRDTNM` 기반 (LOW, 14점) 🔗 브릿지: `I2640`

**참여 데이터셋** (3개): I2640, I0490, I0460

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 업체인허가번호(LCNS_NO) | 검사부적합 현황(농산물) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | N:M | 5 | 2% | 46% | LOW | `20160333083, 20000320226` |
| 수거검사 계획 및 실적 관련 현황 | 제품명(PRDTNM) | 검사부적합 현황(농산물) | 제품명(PRDTNM) | LEFT JOIN (B→A) | 1:N | 9 | 1% | 8% | LOW | `양파, 감자` |

```sql
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
  A."LCNS_NO" AS "A_업체인허가번호",
  A."REPORTR_TELNO" AS "A_보고자전화번호",
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
  B."LCNS_NO" AS "B_업체인허가번호",
  C."PRCSCITYPOINT_INDUTYCD_NM" AS "C_업종",
  C."BSSH_NM" AS "C_업소명",
  C."SITE_ADDR" AS "C_소재지",
  C."PRDTNM" AS "C_제품명",
  C."TKAWYDTM" AS "C_수거일자",
  C."JDGMNT_CD_NM" AS "C_판정결과",
  C."EXC_INSTT_NM" AS "C_수행기관명",
  C."TKAWYSPCI_TYPECD_NM" AS "C_검체구분",
  C."PRDLST_REPORT_NO" AS "C_품목제조보고번호",
  C."LAST_UPDT_DTM" AS "C_최종수정일시",
  C."TKAWYPRNO" AS "C_수거증번호",
  C."PLAN_TITL" AS "C_수거계획명"
FROM "I2640" A
LEFT JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
LEFT JOIN "I0460" C
  ON A."PRDTNM" = C."PRDTNM"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_012 — `PRDTNM` 기반 (LOW, 4점)

**참여 데이터셋** (3개): I0460, I2620, I2640

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 수거검사 계획 및 실적 관련 현황 | 제품명(PRDTNM) | 검사부적합(국내) | 제품명(PRDTNM) | LEFT JOIN (B→A) | 1:N | 12 | 1% | 6% | LOW | `양파, 감자` |
| 수거검사 계획 및 실적 관련 현황 | 제품명(PRDTNM) | 검사부적합 현황(농산물) | 제품명(PRDTNM) | LEFT JOIN (B→A) | 1:N | 9 | 1% | 8% | LOW | `양파, 감자` |

```sql
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
FROM "I0460" A
LEFT JOIN "I2620" B
  ON A."PRDTNM" = B."PRDTNM"
LEFT JOIN "I2640" C
  ON A."PRDTNM" = C."PRDTNM"
WHERE A."PRDTNM" IS NOT NULL AND A."PRDTNM" != ''
LIMIT 100;
```

## SCN_CHAIN_017 — `CHAIN:PRDTNM+LCNS_NO` 기반 (LOW, 4점) 🔗 브릿지: `I2620`

**참여 데이터셋** (3개): I2620, I0460, I0610

| From | 컬럼명 | To | 컬럼명 | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|---|---|
| 수거검사 계획 및 실적 관련 현황 | 제품명(PRDTNM) | 검사부적합(국내) | 제품명(PRDTNM) | LEFT JOIN (B→A) | 1:N | 12 | 1% | 6% | LOW | `양파, 감자` |
| 축산물HACCP 지정정보 | 인허가번호(LCNS_NO) | 검사부적합(국내) | 업체인허가번호(LCNS_NO) | LEFT JOIN (B→A) | 1:N | 5 | 1% | 6% | LOW | `20250371008, 20250681018` |

```sql
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
  B."PRCSCITYPOINT_INDUTYCD_NM" AS "B_업종",
  B."BSSH_NM" AS "B_업소명",
  B."SITE_ADDR" AS "B_소재지",
  B."PRDTNM" AS "B_제품명",
  B."TKAWYDTM" AS "B_수거일자",
  B."JDGMNT_CD_NM" AS "B_판정결과",
  B."EXC_INSTT_NM" AS "B_수행기관명",
  B."TKAWYSPCI_TYPECD_NM" AS "B_검체구분",
  B."PRDLST_REPORT_NO" AS "B_품목제조보고번호",
  B."LAST_UPDT_DTM" AS "B_최종수정일시",
  B."TKAWYPRNO" AS "B_수거증번호",
  B."PLAN_TITL" AS "B_수거계획명",
  C."LCNS_NO" AS "C_인허가번호",
  C."BSSH_NM" AS "C_업소명",
  C."INDUTY_CD_NM" AS "C_업종명",
  C."PRSDNT_NM" AS "C_대표자명",
  C."CLSBIZ_DVS_CD_NM" AS "C_영업상태",
  C."CLSBIZ_DT" AS "C_폐업일자",
  C."SITE_ADDR" AS "C_업소주소",
  C."HACCP_APPN_DT" AS "C_HACCP 지정일자",
  C."HACCP_APPN_NO" AS "C_HACCP 지정번호",
  C."ASGN_CANCL_DT" AS "C_지정취소일자",
  C."CRTFC_ENDDT" AS "C_인증종료일자",
  C."CRTFC_RETN_DT" AS "C_인증반납일자"
FROM "I2620" A
LEFT JOIN "I0460" B
  ON A."PRDTNM" = B."PRDTNM"
LEFT JOIN "I0610" C
  ON A."LCNS_NO" = C."LCNS_NO"
WHERE A."PRDTNM" IS NOT NULL AND A."PRDTNM" != ''
LIMIT 100;
```
