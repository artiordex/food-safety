# 데이터셋 사용 시나리오 분석 결과
> 생성일시: 2026. 6. 9. 오후 9:29:11

- 전체 시나리오: **16개**
- 전체 관계: **163개**
- HIGH 신뢰도 시나리오: **5개**

---

## SCN_002 — `INJRY_YN` 기반 (HIGH, 100점)

**참여 데이터셋** (5개): I0930, I0940, I0950, I2580, I2600

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품공전 | 식품용 기구 및 용기.포장 공전 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `N` |
| 식품공전 | 식품첨가물공전 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `N` |
| 식품공전 | 개별기준규격 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `N` |

```sql
SELECT A."INJRY_YN", B."INJRY_YN", C."INJRY_YN", A.*, B.*
FROM "I0930" A
INNER JOIN "I0940" B
  ON A."INJRY_YN" = B."INJRY_YN"
INNER JOIN "I0950" C
  ON A."INJRY_YN" = C."INJRY_YN"
INNER JOIN "I2580" D
  ON A."INJRY_YN" = D."INJRY_YN"
WHERE A."INJRY_YN" IS NOT NULL AND A."INJRY_YN" != ''
LIMIT 100;
```

## SCN_003 — `STEP` 기반 (HIGH, 100점)

**참여 데이터셋** (3개): I1040, I1050, I1080

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 농약잔류허용기준 | 식품별 농약잔류허용기준 | INNER JOIN | 1:N | 1 | 100% | 100% | HIGH | `1` |
| 농약잔류허용기준 | 동물의약품별 잔류허용 기준 | INNER JOIN | 1:N | 1 | 100% | 100% | HIGH | `1` |
| 식품별 농약잔류허용기준 | 동물의약품별 잔류허용 기준 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `1` |

```sql
SELECT A."STEP", B."STEP", C."STEP", A.*, B.*
FROM "I1040" A
INNER JOIN "I1050" B
  ON A."STEP" = B."STEP"
INNER JOIN "I1080" C
  ON A."STEP" = C."STEP"
WHERE A."STEP" IS NOT NULL AND A."STEP" != ''
LIMIT 100;
```

## SCN_004 — `USE_YN` 기반 (HIGH, 93점)

**참여 데이터셋** (6개): I2510, I2520, I2530, I2540, I2550, I2590

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 품목유형코드 | 식품원재료코드 | INNER JOIN | N:M | 2 | 100% | 100% | HIGH | `Y, N` |
| 품목유형코드 | 시험항목코드 | INNER JOIN | N:M | 2 | 100% | 100% | HIGH | `Y, N` |
| 품목유형코드 | 법령코드 | INNER JOIN | N:M | 2 | 100% | 100% | HIGH | `Y, N` |

```sql
SELECT A."USE_YN", B."USE_YN", C."USE_YN", A.*, B.*
FROM "I2510" A
INNER JOIN "I2520" B
  ON A."USE_YN" = B."USE_YN"
INNER JOIN "I2530" C
  ON A."USE_YN" = C."USE_YN"
INNER JOIN "I2540" D
  ON A."USE_YN" = D."USE_YN"
WHERE A."USE_YN" IS NOT NULL AND A."USE_YN" != ''
LIMIT 100;
```

## SCN_005 — `OCCRNC_CNT` 기반 (HIGH, 78점)

**참여 데이터셋** (3개): I2849, I2850, I2848

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식중독 원인시설별 현황 | 식중독 원인물질별 현황 | INNER JOIN | N:M | 26 | 74% | 90% | HIGH | `14, 24` |
| 식중독 지역별 현황 | 식중독 원인물질별 현황 | INNER JOIN | N:M | 17 | 100% | 59% | HIGH | `23, 1` |
| 식중독 지역별 현황 | 식중독 원인시설별 현황 | LEFT JOIN (A→B) | N:M | 17 | 100% | 49% | HIGH | `23, 1` |

```sql
SELECT A."OCCRNC_CNT", B."OCCRNC_CNT", C."OCCRNC_CNT", A.*, B.*
FROM "I2849" A
INNER JOIN "I2850" B
  ON A."OCCRNC_CNT" = B."OCCRNC_CNT"
INNER JOIN "I2848" C
  ON B."OCCRNC_CNT" = C."OCCRNC_CNT"
WHERE A."OCCRNC_CNT" IS NOT NULL AND A."OCCRNC_CNT" != ''
LIMIT 100;
```

## SCN_008 — `DSPS_ENDDT` 기반 (MEDIUM, 45점)

**참여 데이터셋** (4개): I0480, I2630, I0482, I0481

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 18 | 90% | 20% | MEDIUM | `20260714, 20260630` |
| 행정처분결과(수입식품업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 10 | 91% | 11% | MEDIUM | `20260606, 20260724` |
| 행정처분결과(식품판매업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | 1:N | 10 | 77% | 11% | MEDIUM | `20260614, 20260622` |

```sql
SELECT A."DSPS_ENDDT", B."DSPS_ENDDT", C."DSPS_ENDDT", A.*, B.*
FROM "I0480" A
LEFT JOIN "I2630" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0482" C
  ON B."DSPS_ENDDT" = C."DSPS_ENDDT"
LEFT JOIN "I0481" D
  ON B."DSPS_ENDDT" = D."DSPS_ENDDT"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_006 — `PRDLST_DCNM` 기반 (MEDIUM, 37점)

**참여 데이터셋** (8개): C002, C005, I2711, I2712, I2852, C006, I1250, I1310

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 바코드연계제품정보 | LEFT JOIN (A→B) | N:M | 59 | 75% | 45% | MEDIUM | `어묵, 조미김` |
| 위생용품품목제조보고 | 위생용품품목제조보고(원재료) | LEFT JOIN (A→B) | N:M | 5 | 71% | 39% | MEDIUM | `식품접객업소용 물티슈, 과일.채소용 세척제` |
| 바코드연계제품정보 | 생산중단제품정보 | LEFT JOIN (B→A) | N:M | 51 | 39% | 65% | MEDIUM | `기타가공품, 액상차` |

```sql
SELECT A."PRDLST_DCNM", B."PRDLST_DCNM", C."PRDLST_DCNM", A.*, B.*
FROM "C002" A
LEFT JOIN "C005" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I2852" C
  ON B."PRDLST_DCNM" = C."PRDLST_DCNM"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_010 — `DSPS_BGNDT` 기반 (MEDIUM, 32점)

**참여 데이터셋** (4개): I0480, I0481, I0482, I0470

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 행정처분결과(식품판매업) | LEFT JOIN (A→B) | N:M | 80 | 53% | 39% | MEDIUM | `20260608, 20260601` |
| 행정처분결과(식품판매업) | 행정처분결과(수입식품업) | LEFT JOIN (B→A) | N:M | 16 | 8% | 44% | LOW | `20260529, 20260526` |
| 행정처분결과 | 행정처분결과(식품제조가공업) | LEFT JOIN (A→B) | N:M | 31 | 27% | 21% | LOW | `20240614, 20240613` |

```sql
SELECT A."DSPS_BGNDT", B."DSPS_BGNDT", C."DSPS_BGNDT", A.*, B.*
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

## SCN_001 — `LCNS_NO` 기반 (HIGH, 31점)

**참여 데이터셋** (39개): C001, I1260, I0680, I1540, I2500, I2560, I-0020, I0630, I2860, I1220, I2859, I0030, I1200, I2861, C003, I1300, I1310, I1250, I0310, I0060, I2711, I2713, I2712, I1230, I2851, I2823, I0080, C006, I1320, I0610, I2852, I0482, I2640, C002, I0490, I0580, I0300, I1420, I2620

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수입식품등영업신고대장 | 식품등수입판매업정보 | INNER JOIN | 1:1 | 1000 | 100% | 100% | HIGH | `20200009171, 20220020542` |
| 인허가 업소 정보 | 영업소재지 GIS 코드 | INNER JOIN | 1:1 | 998 | 100% | 100% | HIGH | `18820308001, 18830478001` |
| 위생관리등급별 업소 현황 | 식품위생등급평가관리내역 | INNER JOIN | N:M | 758 | 100% | 100% | HIGH | `20250019495, 20250016500` |

```sql
SELECT A."LCNS_NO", B."LCNS_NO", A.*, B.*
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_013 — `HIST_TRACE_REG_NO` 기반 (LOW, 24점)

**참여 데이터셋** (3개): I1930, I1940, I1920

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수산물이력정보-생산정보 | 수산물이력정보-출하정보 | LEFT JOIN (A→B) | N:M | 3 | 60% | 3% | LOW | `1020, 0600` |
| 수산물이력정보-기본정보 | 수산물이력정보-생산정보 | LEFT JOIN (B→A) | N:M | 3 | 1% | 60% | LOW | `0633, 0600` |
| 수산물이력정보-기본정보 | 수산물이력정보-출하정보 | LEFT JOIN (B→A) | N:M | 11 | 4% | 12% | LOW | `0633, 1508` |

```sql
SELECT A."HIST_TRACE_REG_NO", B."HIST_TRACE_REG_NO", C."HIST_TRACE_REG_NO", A.*, B.*
FROM "I1930" A
LEFT JOIN "I1940" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
LEFT JOIN "I1920" C
  ON A."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 100;
```

## SCN_011 — `TESTITM_CD` 기반 (MEDIUM, 23점)

**참여 데이터셋** (7개): I2580, I2610, I0960, I2530, I0950, I0940, I2600

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 개별기준규격 | 공통기준제외 | LEFT JOIN (B→A) | N:M | 6 | 3% | 86% | MEDIUM | `B20016, B10004` |
| 건강기능식품공전 | 시험항목코드 | LEFT JOIN (A→B) | 1:N | 103 | 61% | 10% | LOW | `A40128, A40155` |
| 시험항목코드 | 개별기준규격 | LEFT JOIN (B→A) | 1:N | 117 | 12% | 53% | LOW | `A10008, A10018` |

```sql
SELECT A."TESTITM_CD", B."TESTITM_CD", C."TESTITM_CD", A.*, B.*
FROM "I2580" A
LEFT JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
LEFT JOIN "I2530" C
  ON A."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 100;
```

## SCN_012 — `DSPSCN` 기반 (LOW, 22점)

**참여 데이터셋** (4개): I0470, I0481, I2630, I0482

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과 | 행정처분결과(식품판매업) | LEFT JOIN (B→A) | N:M | 6 | 21% | 43% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 9 | 31% | 13% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 행정처분결과(수입식품업) | LEFT JOIN (B→A) | N:M | 3 | 10% | 16% | LOW | `영업허가·등록취소, 영업등록 취소(2024. 7. 24.자)` |

```sql
SELECT A."DSPSCN", B."DSPSCN", C."DSPSCN", A.*, B.*
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

## SCN_007 — `POG_DAYCNT` 기반 (MEDIUM, 21점)

**참여 데이터셋** (6개): C003, I0030, I1250, C005, I2711, I1310

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품 품목제조신고(원재료) | 건강기능식품 품목제조 신고사항 현황 | INNER JOIN | N:M | 29 | 52% | 64% | MEDIUM | `제조일로부터 2년, 제조일로부터 3년` |
| 건강기능식품 품목제조 신고사항 현황 | 식품(첨가물)품목제조보고 | LEFT JOIN (A→B) | N:M | 15 | 33% | 33% | LOW | `제조일로부터 24개월까지, 제조일로부터 24개월` |
| 바코드연계제품정보 | 건강기능식품 품목제조 신고사항 현황 | LEFT JOIN (B→A) | N:M | 24 | 6% | 53% | LOW | `제조일로부터 12개월까지, 제조일로부터 12개월` |

```sql
SELECT A."POG_DAYCNT", B."POG_DAYCNT", C."POG_DAYCNT", A.*, B.*
FROM "C003" A
INNER JOIN "I0030" B
  ON A."POG_DAYCNT" = B."POG_DAYCNT"
LEFT JOIN "I1250" C
  ON B."POG_DAYCNT" = C."POG_DAYCNT"
LEFT JOIN "C005" D
  ON B."POG_DAYCNT" = D."POG_DAYCNT"
WHERE A."POG_DAYCNT" IS NOT NULL AND A."POG_DAYCNT" != ''
LIMIT 100;
```

## SCN_009 — `PRDLST_CD` 기반 (MEDIUM, 17점)

**참여 데이터셋** (7개): I0960, I2580, I2600, I2610, I2510, I0490, I0940

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품공전 | 개별기준규격 | LEFT JOIN (B→A) | N:M | 112 | 34% | 61% | MEDIUM | `E0301700000000, E0317300000000` |
| 공통기준규격 | 공통기준제외 | LEFT JOIN (B→A) | N:M | 6 | 4% | 75% | MEDIUM | `C0000000000000, B0203010000000` |
| 품목유형코드 | 공통기준규격 | LEFT JOIN (B→A) | 1:N | 44 | 4% | 32% | LOW | `A0000000000000, A0100000000000` |

```sql
SELECT A."PRDLST_CD", B."PRDLST_CD", A.*, B.*
FROM "I0960" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_014 — `BASIS_LAWORD` 기반 (LOW, 16점)

**참여 데이터셋** (3개): I1670, I2550, I1660

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 과태료부과기준 | 처분기준코드 | LEFT JOIN (B→A) | N:M | 29 | 12% | 36% | LOW | `제67조, 법 제101조제2항제1호` |
| 과징금부과기준 | 처분기준코드 | LEFT JOIN (A→B) | N:M | 2 | 13% | 3% | LOW | `법 제82조1항, 법 제53조` |

```sql
SELECT A."BASIS_LAWORD", B."BASIS_LAWORD", C."BASIS_LAWORD", A.*, B.*
FROM "I1670" A
LEFT JOIN "I2550" B
  ON A."BASIS_LAWORD" = B."BASIS_LAWORD"
LEFT JOIN "I1660" C
  ON B."BASIS_LAWORD" = C."BASIS_LAWORD"
WHERE A."BASIS_LAWORD" IS NOT NULL AND A."BASIS_LAWORD" != ''
LIMIT 100;
```

## SCN_015 — `SPEC_VAL_SUMUP` 기반 (LOW, 9점)

**참여 데이터셋** (4개): I0930, I0960, I2600, I0940

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품공전 | 건강기능식품공전 | LEFT JOIN (A→B) | N:M | 15 | 20% | 6% | LOW | `0.05이하, 5.0이하` |
| 건강기능식품공전 | 공통기준규격 | LEFT JOIN (B→A) | N:M | 17 | 6% | 14% | LOW | `불검출, 1.0이하` |
| 식품용 기구 및 용기.포장 공전 | 건강기능식품공전 | LEFT JOIN (A→B) | N:M | 8 | 8% | 3% | LOW | `0.1 이하, 0.5 이하` |

```sql
SELECT A."SPEC_VAL_SUMUP", B."SPEC_VAL_SUMUP", C."SPEC_VAL_SUMUP", A.*, B.*
FROM "I0930" A
LEFT JOIN "I0960" B
  ON A."SPEC_VAL_SUMUP" = B."SPEC_VAL_SUMUP"
LEFT JOIN "I2600" C
  ON B."SPEC_VAL_SUMUP" = C."SPEC_VAL_SUMUP"
LEFT JOIN "I0940" D
  ON B."SPEC_VAL_SUMUP" = D."SPEC_VAL_SUMUP"
WHERE A."SPEC_VAL_SUMUP" IS NOT NULL AND A."SPEC_VAL_SUMUP" != ''
LIMIT 100;
```

## SCN_016 — `PRDTNM` 기반 (LOW, 5점)

**참여 데이터셋** (3개): I0460, I2640, I2620

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수거검사 계획 및 실적 관련 현황 | 검사부적합 현황(농산물) | LEFT JOIN (B→A) | 1:N | 12 | 1% | 10% | LOW | `부추, 상추` |
| 수거검사 계획 및 실적 관련 현황 | 검사부적합(국내) | LEFT JOIN (B→A) | 1:N | 13 | 1% | 7% | LOW | `한우육회, 부추` |

```sql
SELECT A."PRDTNM", B."PRDTNM", C."PRDTNM", A.*, B.*
FROM "I0460" A
LEFT JOIN "I2640" B
  ON A."PRDTNM" = B."PRDTNM"
LEFT JOIN "I2620" C
  ON A."PRDTNM" = C."PRDTNM"
WHERE A."PRDTNM" IS NOT NULL AND A."PRDTNM" != ''
LIMIT 100;
```
