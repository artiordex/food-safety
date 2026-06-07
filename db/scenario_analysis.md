# 데이터셋 사용 시나리오 분석 결과
> 생성일시: 2026. 6. 8. 오전 12:57:30

- 전체 시나리오: **46개**
- 전체 관계: **260개**
- HIGH 신뢰도 시나리오: **20개**

---

## SCN_004 — `INJRY_YN` 기반 (HIGH, 100점)

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
  ON B."INJRY_YN" = C."INJRY_YN"
INNER JOIN "I2580" D
  ON C."INJRY_YN" = D."INJRY_YN"
WHERE A."INJRY_YN" IS NOT NULL AND A."INJRY_YN" != ''
LIMIT 100;
```

## SCN_005 — `STEP` 기반 (HIGH, 100점)

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
  ON B."STEP" = C."STEP"
WHERE A."STEP" IS NOT NULL AND A."STEP" != ''
LIMIT 100;
```

## SCN_011 — `OCCRNC_MM` 기반 (HIGH, 100점)

**참여 데이터셋** (3개): I2848, I2849, I2850

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식중독 지역별 현황 | 식중독 원인시설별 현황 | INNER JOIN | N:M | 12 | 100% | 100% | HIGH | `04, 03` |
| 식중독 지역별 현황 | 식중독 원인물질별 현황 | INNER JOIN | N:M | 12 | 100% | 100% | HIGH | `04, 03` |
| 식중독 원인시설별 현황 | 식중독 원인물질별 현황 | INNER JOIN | N:M | 12 | 100% | 100% | HIGH | `04, 03` |

```sql
SELECT A."OCCRNC_MM", B."OCCRNC_MM", C."OCCRNC_MM", A.*, B.*
FROM "I2848" A
INNER JOIN "I2849" B
  ON A."OCCRNC_MM" = B."OCCRNC_MM"
INNER JOIN "I2850" C
  ON B."OCCRNC_MM" = C."OCCRNC_MM"
WHERE A."OCCRNC_MM" IS NOT NULL AND A."OCCRNC_MM" != ''
LIMIT 100;
```

## SCN_002 — `ETQTY_XPORT_PRDLST_YN` 기반 (HIGH, 100점)

**참여 데이터셋** (2개): C002, I1250

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 식품(첨가물)품목제조보고 | INNER JOIN | N:M | 2 | 100% | 100% | HIGH | `N, O` |

```sql
SELECT A."ETQTY_XPORT_PRDLST_YN", B."ETQTY_XPORT_PRDLST_YN", A.*, B.*
FROM "C002" A
INNER JOIN "I1250" B
  ON A."ETQTY_XPORT_PRDLST_YN" = B."ETQTY_XPORT_PRDLST_YN"
WHERE A."ETQTY_XPORT_PRDLST_YN" IS NOT NULL AND A."ETQTY_XPORT_PRDLST_YN" != ''
LIMIT 100;
```

## SCN_003 — `EVL_YR` 기반 (HIGH, 100점)

**참여 데이터셋** (2개): I0300, I1420

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품.식품첨가물 생산실적 보고 현황 | 축산물 생산실적정보 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `2016` |

```sql
SELECT A."EVL_YR", B."EVL_YR", A.*, B.*
FROM "I0300" A
INNER JOIN "I1420" B
  ON A."EVL_YR" = B."EVL_YR"
WHERE A."EVL_YR" IS NOT NULL AND A."EVL_YR" != ''
LIMIT 100;
```

## SCN_007 — `VILT_DTLS` 기반 (HIGH, 100점)

**참여 데이터셋** (2개): I1850, I1860

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 농축산물유통관리 허위표시공표정보 | 농축산물유통관리 허위표시품목정보 | INNER JOIN | N:M | 2 | 100% | 100% | HIGH | `원산지 거짓표시, 원산지 미표시` |

```sql
SELECT A."VILT_DTLS", B."VILT_DTLS", A.*, B.*
FROM "I1850" A
INNER JOIN "I1860" B
  ON A."VILT_DTLS" = B."VILT_DTLS"
WHERE A."VILT_DTLS" IS NOT NULL AND A."VILT_DTLS" != ''
LIMIT 100;
```

## SCN_010 — `VALD_MANLI` 기반 (HIGH, 100점)

**참여 데이터셋** (2개): I2580, I2600

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 개별기준규격 | 공통기준규격 | INNER JOIN | N:M | 4 | 100% | 100% | HIGH | `1, 2` |

```sql
SELECT A."VALD_MANLI", B."VALD_MANLI", A.*, B.*
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."VALD_MANLI" = B."VALD_MANLI"
WHERE A."VALD_MANLI" IS NOT NULL AND A."VALD_MANLI" != ''
LIMIT 100;
```

## SCN_012 — `VACIN_LAST_INOCL_OPNO` 기반 (HIGH, 93점)

**참여 데이터셋** (2개): I1810, I1820

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 쇠고기(국내)이력추적 생산정보 | 쇠고기(국내)이력추적 정보 | INNER JOIN | N:M | 26 | 93% | 93% | HIGH | `8, 9` |

```sql
SELECT A."VACIN_LAST_INOCL_OPNO", B."VACIN_LAST_INOCL_OPNO", A.*, B.*
FROM "I1810" A
INNER JOIN "I1820" B
  ON A."VACIN_LAST_INOCL_OPNO" = B."VACIN_LAST_INOCL_OPNO"
WHERE A."VACIN_LAST_INOCL_OPNO" IS NOT NULL AND A."VACIN_LAST_INOCL_OPNO" != ''
LIMIT 100;
```

## SCN_008 — `USE_YN` 기반 (HIGH, 92점)

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
  ON B."USE_YN" = C."USE_YN"
INNER JOIN "I2540" D
  ON C."USE_YN" = D."USE_YN"
WHERE A."USE_YN" IS NOT NULL AND A."USE_YN" != ''
LIMIT 100;
```

## SCN_013 — `MNFDT` 기반 (HIGH, 92점)

**참여 데이터셋** (2개): I2620, I2640

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 검사부적합(국내) | 검사부적합 현황(농산물) | INNER JOIN | N:M | 92 | 84% | 100% | HIGH | `20251208, 데이터없음` |

```sql
SELECT A."MNFDT", B."MNFDT", A.*, B.*
FROM "I2620" A
INNER JOIN "I2640" B
  ON A."MNFDT" = B."MNFDT"
WHERE A."MNFDT" IS NOT NULL AND A."MNFDT" != ''
LIMIT 100;
```

## SCN_014 — `CHNG_PRVNS` 기반 (HIGH, 90점)

**참여 데이터셋** (2개): I2859, I2861

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품업소 인허가 변경 정보 | 음식점업소 인허가 변경 정보 | INNER JOIN | N:M | 4 | 80% | 100% | HIGH | `초기자료등록, 변경민원(지위승계 : 양도.양수)` |

```sql
SELECT A."CHNG_PRVNS", B."CHNG_PRVNS", A.*, B.*
FROM "I2859" A
INNER JOIN "I2861" B
  ON A."CHNG_PRVNS" = B."CHNG_PRVNS"
WHERE A."CHNG_PRVNS" IS NOT NULL AND A."CHNG_PRVNS" != ''
LIMIT 100;
```

## SCN_006 — `PRODUCTION` 기반 (HIGH, 88점)

**참여 데이터셋** (4개): I1250, I1310, I2711, I0030

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고 | 축산물 품목제조정보 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `아니오` |
| 식품(첨가물)품목제조보고 | 위생용품품목제조보고 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `아니오` |
| 축산물 품목제조정보 | 위생용품품목제조보고 | INNER JOIN | N:M | 1 | 100% | 100% | HIGH | `아니오` |

```sql
SELECT A."PRODUCTION", B."PRODUCTION", C."PRODUCTION", A.*, B.*
FROM "I1250" A
INNER JOIN "I1310" B
  ON A."PRODUCTION" = B."PRODUCTION"
INNER JOIN "I2711" C
  ON B."PRODUCTION" = C."PRODUCTION"
WHERE A."PRODUCTION" IS NOT NULL AND A."PRODUCTION" != ''
LIMIT 100;
```

## SCN_009 — `LV_NO` 기반 (HIGH, 81점)

**참여 데이터셋** (4개): I2540, I2550, I1660, I1670

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 법령코드 | 처분기준코드 | INNER JOIN | N:M | 7 | 100% | 100% | HIGH | `1, 2` |
| 과징금부과기준 | 과태료부과기준 | INNER JOIN | N:M | 3 | 100% | 75% | HIGH | `3, 4` |
| 과태료부과기준 | 법령코드 | INNER JOIN | N:M | 4 | 100% | 57% | HIGH | `2, 3` |

```sql
SELECT A."LV_NO", B."LV_NO", C."LV_NO", A.*, B.*
FROM "I2540" A
INNER JOIN "I2550" B
  ON A."LV_NO" = B."LV_NO"
INNER JOIN "I1660" C
  ON B."LV_NO" = C."LV_NO"
INNER JOIN "I1670" D
  ON C."LV_NO" = D."LV_NO"
WHERE A."LV_NO" IS NOT NULL AND A."LV_NO" != ''
LIMIT 100;
```

## SCN_015 — `LV` 기반 (HIGH, 81점)

**참여 데이터셋** (2개): I2510, I2590

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 품목유형코드 | 공통기준종류 | INNER JOIN | N:M | 5 | 100% | 63% | HIGH | `1, 2` |

```sql
SELECT A."LV", B."LV", A.*, B.*
FROM "I2510" A
INNER JOIN "I2590" B
  ON A."LV" = B."LV"
WHERE A."LV" IS NOT NULL AND A."LV" != ''
LIMIT 100;
```

## SCN_017 — `ANIMAL_ONLY_MDCIN_NM_KOR` 기반 (HIGH, 77점)

**참여 데이터셋** (2개): I1070, I1080

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 동물용의약품 현황 | 동물의약품별 잔류허용 기준 | INNER JOIN | 1:N | 136 | 54% | 100% | HIGH | `옥시벤다졸, 오비플록사신` |

```sql
SELECT A."ANIMAL_ONLY_MDCIN_NM_KOR", B."ANIMAL_ONLY_MDCIN_NM_KOR", A.*, B.*
FROM "I1070" A
INNER JOIN "I1080" B
  ON A."ANIMAL_ONLY_MDCIN_NM_KOR" = B."ANIMAL_ONLY_MDCIN_NM_KOR"
WHERE A."ANIMAL_ONLY_MDCIN_NM_KOR" IS NOT NULL AND A."ANIMAL_ONLY_MDCIN_NM_KOR" != ''
LIMIT 100;
```

## SCN_018 — `BOD` 기반 (HIGH, 75점)

**참여 데이터셋** (2개): I2380, I2410

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 하수도 수질정보 | 물환경 수질정보 | INNER JOIN | N:M | 54 | 61% | 89% | HIGH | `5.6, 3.1` |

```sql
SELECT A."BOD", B."BOD", A.*, B.*
FROM "I2380" A
INNER JOIN "I2410" B
  ON A."BOD" = B."BOD"
WHERE A."BOD" IS NOT NULL AND A."BOD" != ''
LIMIT 100;
```

## SCN_019 — `RAWMTRL_NCKNM` 기반 (HIGH, 73점)

**참여 데이터셋** (2개): I1020, I2520

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품원재료(식물,동물,미생물,수산물) 정보 | 식품원재료코드 | INNER JOIN | N:M | 103 | 72% | 74% | HIGH | `新疆党参(신강당삼), 아광나무, 뫼산사나무, 산산사나무, 야광나무` |

```sql
SELECT A."RAWMTRL_NCKNM", B."RAWMTRL_NCKNM", A.*, B.*
FROM "I1020" A
INNER JOIN "I2520" B
  ON A."RAWMTRL_NCKNM" = B."RAWMTRL_NCKNM"
WHERE A."RAWMTRL_NCKNM" IS NOT NULL AND A."RAWMTRL_NCKNM" != ''
LIMIT 100;
```

## SCN_020 — `CRTFC_ENDDT` 기반 (HIGH, 70점)

**참여 데이터셋** (2개): I0580, I0610

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| HACCP 적용업소 지정 현황 | 축산물HACCP 지정정보 | INNER JOIN | N:M | 110 | 86% | 54% | HIGH | `20290604, 20290603` |

```sql
SELECT A."CRTFC_ENDDT", B."CRTFC_ENDDT", A.*, B.*
FROM "I0580" A
INNER JOIN "I0610" B
  ON A."CRTFC_ENDDT" = B."CRTFC_ENDDT"
WHERE A."CRTFC_ENDDT" IS NOT NULL AND A."CRTFC_ENDDT" != ''
LIMIT 100;
```

## SCN_021 — `CMMN_SPEC_CD` 기반 (MEDIUM, 64점)

**참여 데이터셋** (2개): I2590, I2600

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 공통기준종류 | 공통기준규격 | LEFT JOIN (B→A) | 1:N | 26 | 29% | 100% | MEDIUM | `000080, 000081` |

```sql
SELECT A."CMMN_SPEC_CD", B."CMMN_SPEC_CD", A.*, B.*
FROM "I2590" A
LEFT JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 100;
```

## SCN_022 — `ORGNICPH` 기반 (MEDIUM, 63점)

**참여 데이터셋** (2개): I2390, I2400

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 토양지하수 토양실태조사정보 | 지하수수질측정망 측정결과 | LEFT JOIN (A→B) | N:M | 1 | 100% | 25% | MEDIUM | `0.0` |

```sql
SELECT A."ORGNICPH", B."ORGNICPH", A.*, B.*
FROM "I2390" A
LEFT JOIN "I2400" B
  ON A."ORGNICPH" = B."ORGNICPH"
WHERE A."ORGNICPH" IS NOT NULL AND A."ORGNICPH" != ''
LIMIT 100;
```

## SCN_026 — `FREEZING_CNVRS_QTY` 기반 (MEDIUM, 56점)

**참여 데이터셋** (2개): I2780, I2781

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수입쇠고기 냉동전환 정보 | 수입축산물 냉동전환 정보 | LEFT JOIN (A→B) | N:M | 42 | 91% | 20% | MEDIUM | `20, 0` |

```sql
SELECT A."FREEZING_CNVRS_QTY", B."FREEZING_CNVRS_QTY", A.*, B.*
FROM "I2780" A
LEFT JOIN "I2781" B
  ON A."FREEZING_CNVRS_QTY" = B."FREEZING_CNVRS_QTY"
WHERE A."FREEZING_CNVRS_QTY" IS NOT NULL AND A."FREEZING_CNVRS_QTY" != ''
LIMIT 100;
```

## SCN_024 — `DSPS_ENDDT` 기반 (MEDIUM, 53점)

**참여 데이터셋** (4개): I0480, I2630, I0482, I0481

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 21 | 96% | 23% | MEDIUM | `20260714, 20260707` |
| 행정처분결과(수입식품업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 10 | 91% | 11% | MEDIUM | `20260606, 20260724` |
| 행정처분결과(식품판매업) | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | 1:N | 12 | 86% | 13% | MEDIUM | `20260614, 20260622` |

```sql
SELECT A."DSPS_ENDDT", B."DSPS_ENDDT", C."DSPS_ENDDT", A.*, B.*
FROM "I0480" A
LEFT JOIN "I2630" B
  ON A."DSPS_ENDDT" = B."DSPS_ENDDT"
LEFT JOIN "I0482" C
  ON B."DSPS_ENDDT" = C."DSPS_ENDDT"
LEFT JOIN "I0481" D
  ON C."DSPS_ENDDT" = D."DSPS_ENDDT"
WHERE A."DSPS_ENDDT" IS NOT NULL AND A."DSPS_ENDDT" != ''
LIMIT 100;
```

## SCN_027 — `UPDT_PRVNS` 기반 (MEDIUM, 51점)

**참여 데이터셋** (2개): I2510, I2580

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 품목유형코드 | 개별기준규격 | LEFT JOIN (B→A) | N:M | 1 | 2% | 100% | MEDIUM | `최초등록` |

```sql
SELECT A."UPDT_PRVNS", B."UPDT_PRVNS", A.*, B.*
FROM "I2510" A
LEFT JOIN "I2580" B
  ON A."UPDT_PRVNS" = B."UPDT_PRVNS"
WHERE A."UPDT_PRVNS" IS NOT NULL AND A."UPDT_PRVNS" != ''
LIMIT 100;
```

## SCN_028 — `WORK_SCOPE` 기반 (MEDIUM, 50점)

**참여 데이터셋** (2개): I0890, I0900

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품위생검사기관 지정 현황 | 축산물위생검사기관 지정 현황 | INNER JOIN | N:M | 2 | 50% | 50% | MEDIUM | `자가품질위탁검사, 자가품질위탁검사 수입검사` |

```sql
SELECT A."WORK_SCOPE", B."WORK_SCOPE", A.*, B.*
FROM "I0890" A
INNER JOIN "I0900" B
  ON A."WORK_SCOPE" = B."WORK_SCOPE"
WHERE A."WORK_SCOPE" IS NOT NULL AND A."WORK_SCOPE" != ''
LIMIT 100;
```

## SCN_033 — `FRMLCUNIT` 기반 (LOW, 36점)

**참여 데이터셋** (2개): I0490, I2620

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 검사부적합(국내) | LEFT JOIN (B→A) | N:M | 22 | 14% | 58% | LOW | `500g, 400g` |

```sql
SELECT A."FRMLCUNIT", B."FRMLCUNIT", A.*, B.*
FROM "I0490" A
LEFT JOIN "I2620" B
  ON A."FRMLCUNIT" = B."FRMLCUNIT"
WHERE A."FRMLCUNIT" IS NOT NULL AND A."FRMLCUNIT" != ''
LIMIT 100;
```

## SCN_023 — `PRDLST_DCNM` 기반 (MEDIUM, 35점)

**참여 데이터셋** (8개): C002, C005, I2711, I2712, I2852, C006, I1250, I1310

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 바코드연계제품정보 | LEFT JOIN (A→B) | N:M | 59 | 75% | 45% | MEDIUM | `어묵, 조미김` |
| 위생용품품목제조보고 | 위생용품품목제조보고(원재료) | LEFT JOIN (A→B) | N:M | 5 | 71% | 39% | MEDIUM | `식품접객업소용 물티슈, 과일.채소용 세척제` |
| 바코드연계제품정보 | 생산중단제품정보 | LEFT JOIN (B→A) | N:M | 44 | 33% | 69% | MEDIUM | `기타가공품, 액상차` |

```sql
SELECT A."PRDLST_DCNM", B."PRDLST_DCNM", C."PRDLST_DCNM", A.*, B.*
FROM "C002" A
LEFT JOIN "C005" B
  ON A."PRDLST_DCNM" = B."PRDLST_DCNM"
LEFT JOIN "I2711" C
  ON B."PRDLST_DCNM" = C."PRDLST_DCNM"
LEFT JOIN "I2712" D
  ON C."PRDLST_DCNM" = D."PRDLST_DCNM"
WHERE A."PRDLST_DCNM" IS NOT NULL AND A."PRDLST_DCNM" != ''
LIMIT 100;
```

## SCN_029 — `MXMM_VAL` 기반 (MEDIUM, 34점)

**참여 데이터셋** (7개): I0930, I1030, I0960, I0940, I2600, I2580, I0950

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품공전 | 방사선조사식품 품목 인정 현황 | LEFT JOIN (B→A) | N:M | 5 | 12% | 83% | MEDIUM | `10, 5` |
| 식품공전 | 건강기능식품공전 | LEFT JOIN (A→B) | N:M | 22 | 52% | 25% | LOW | `30, 1.0` |
| 식품용 기구 및 용기.포장 공전 | 방사선조사식품 품목 인정 현황 | LEFT JOIN (B→A) | N:M | 4 | 8% | 67% | LOW | `1, 10` |

```sql
SELECT A."MXMM_VAL", B."MXMM_VAL", C."MXMM_VAL", A.*, B.*
FROM "I0930" A
LEFT JOIN "I1030" B
  ON A."MXMM_VAL" = B."MXMM_VAL"
LEFT JOIN "I0960" C
  ON B."MXMM_VAL" = C."MXMM_VAL"
LEFT JOIN "I0940" D
  ON C."MXMM_VAL" = D."MXMM_VAL"
WHERE A."MXMM_VAL" IS NOT NULL AND A."MXMM_VAL" != ''
LIMIT 100;
```

## SCN_031 — `DSPS_BGNDT` 기반 (MEDIUM, 32점)

**참여 데이터셋** (4개): I0480, I0481, I0470, I0482

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 행정처분결과(식품판매업) | LEFT JOIN (A→B) | N:M | 80 | 53% | 39% | MEDIUM | `20260608, 20260602` |
| 행정처분결과 | 행정처분결과(식품판매업) | LEFT JOIN (A→B) | N:M | 44 | 38% | 21% | LOW | `20240612, 20240613` |
| 행정처분결과(식품판매업) | 행정처분결과(수입식품업) | LEFT JOIN (B→A) | N:M | 16 | 8% | 44% | LOW | `20260529, 20260526` |

```sql
SELECT A."DSPS_BGNDT", B."DSPS_BGNDT", C."DSPS_BGNDT", A.*, B.*
FROM "I0480" A
LEFT JOIN "I0481" B
  ON A."DSPS_BGNDT" = B."DSPS_BGNDT"
LEFT JOIN "I0470" C
  ON B."DSPS_BGNDT" = C."DSPS_BGNDT"
LEFT JOIN "I0482" D
  ON C."DSPS_BGNDT" = D."DSPS_BGNDT"
WHERE A."DSPS_BGNDT" IS NOT NULL AND A."DSPS_BGNDT" != ''
LIMIT 100;
```

## SCN_036 — `DSPS_DCSNDT` 기반 (LOW, 28점)

**참여 데이터셋** (2개): I0480, I0482

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과(식품제조가공업) | 행정처분결과(수입식품업) | LEFT JOIN (B→A) | N:M | 16 | 11% | 44% | LOW | `20260602, 20260529` |

```sql
SELECT A."DSPS_DCSNDT", B."DSPS_DCSNDT", A.*, B.*
FROM "I0480" A
LEFT JOIN "I0482" B
  ON A."DSPS_DCSNDT" = B."DSPS_DCSNDT"
WHERE A."DSPS_DCSNDT" IS NOT NULL AND A."DSPS_DCSNDT" != ''
LIMIT 100;
```

## SCN_037 — `BRCDNO` 기반 (LOW, 27점)

**참여 데이터셋** (2개): I0490, I2640

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 회수.판매중지 정보 | 검사부적합 현황(농산물) | LEFT JOIN (B→A) | N:M | 8 | 5% | 50% | LOW | `8809052505004, 1100001247554` |

```sql
SELECT A."BRCDNO", B."BRCDNO", A.*, B.*
FROM "I0490" A
LEFT JOIN "I2640" B
  ON A."BRCDNO" = B."BRCDNO"
WHERE A."BRCDNO" IS NOT NULL AND A."BRCDNO" != ''
LIMIT 100;
```

## SCN_025 — `POG_DAYCNT` 기반 (MEDIUM, 26점)

**참여 데이터셋** (6개): C003, I0030, C005, I1250, I2711, I1310

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품 품목제조신고(원재료) | 건강기능식품 품목제조 신고사항 현황 | INNER JOIN | N:M | 29 | 52% | 64% | MEDIUM | `제조일로부터 2년, 제조일로부터 3년` |
| 바코드연계제품정보 | 건강기능식품 품목제조 신고사항 현황 | LEFT JOIN (B→A) | N:M | 24 | 6% | 53% | LOW | `제조일로부터 12개월까지, 제조일로부터 12개월` |
| 건강기능식품 품목제조신고(원재료) | 식품(첨가물)품목제조보고 | LEFT JOIN (B→A) | N:M | 13 | 23% | 28% | LOW | `제조일로부터 2년, 제조일로부터 24개월` |

```sql
SELECT A."POG_DAYCNT", B."POG_DAYCNT", C."POG_DAYCNT", A.*, B.*
FROM "C003" A
INNER JOIN "I0030" B
  ON A."POG_DAYCNT" = B."POG_DAYCNT"
LEFT JOIN "C005" C
  ON B."POG_DAYCNT" = C."POG_DAYCNT"
LEFT JOIN "I1250" D
  ON C."POG_DAYCNT" = D."POG_DAYCNT"
WHERE A."POG_DAYCNT" IS NOT NULL AND A."POG_DAYCNT" != ''
LIMIT 100;
```

## SCN_032 — `TESTITM_CD` 기반 (MEDIUM, 25점)

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
LEFT JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
LEFT JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 100;
```

## SCN_039 — `RAWMTRL_ORDNO` 기반 (LOW, 21점)

**참여 데이터셋** (2개): C002, C006

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품(첨가물)품목제조보고(원재료) | 축산물품목제조보고(원재료) | LEFT JOIN (B→A) | N:M | 22 | 4% | 38% | LOW | `1,2,3,4,5,6,7,8, 7,8,9,10,11,12` |

```sql
SELECT A."RAWMTRL_ORDNO", B."RAWMTRL_ORDNO", A.*, B.*
FROM "C002" A
LEFT JOIN "C006" B
  ON A."RAWMTRL_ORDNO" = B."RAWMTRL_ORDNO"
WHERE A."RAWMTRL_ORDNO" IS NOT NULL AND A."RAWMTRL_ORDNO" != ''
LIMIT 100;
```

## SCN_040 — `FYER_PRDCTN_ABRT_QY` 기반 (LOW, 20점)

**참여 데이터셋** (3개): I0300, I0310, I1420

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품.식품첨가물 생산실적 보고 현황 | 건강기능식품 생산실적 보고 품목 현황 | LEFT JOIN (B→A) | N:M | 20 | 14% | 29% | LOW | `1000, 3000` |
| 건강기능식품 생산실적 보고 품목 현황 | 축산물 생산실적정보 | LEFT JOIN (A→B) | N:M | 21 | 30% | 7% | LOW | `70000, 200000` |

```sql
SELECT A."FYER_PRDCTN_ABRT_QY", B."FYER_PRDCTN_ABRT_QY", C."FYER_PRDCTN_ABRT_QY", A.*, B.*
FROM "I0300" A
LEFT JOIN "I0310" B
  ON A."FYER_PRDCTN_ABRT_QY" = B."FYER_PRDCTN_ABRT_QY"
LEFT JOIN "I1420" C
  ON B."FYER_PRDCTN_ABRT_QY" = C."FYER_PRDCTN_ABRT_QY"
WHERE A."FYER_PRDCTN_ABRT_QY" IS NOT NULL AND A."FYER_PRDCTN_ABRT_QY" != ''
LIMIT 100;
```

## SCN_038 — `DSPSCN` 기반 (LOW, 18점)

**참여 데이터셋** (3개): I0470, I2630, I0482

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 행정처분결과 | 행정처분결과(식품접객업) | LEFT JOIN (A→B) | N:M | 9 | 31% | 13% | LOW | `영업소폐쇄, 식품위생법 위반에 따른 영업소 폐쇄` |
| 행정처분결과 | 행정처분결과(수입식품업) | LEFT JOIN (B→A) | N:M | 3 | 10% | 16% | LOW | `영업허가·등록취소, 영업등록 취소(2024. 7. 24.자)` |

```sql
SELECT A."DSPSCN", B."DSPSCN", C."DSPSCN", A.*, B.*
FROM "I0470" A
LEFT JOIN "I2630" B
  ON A."DSPSCN" = B."DSPSCN"
LEFT JOIN "I0482" C
  ON B."DSPSCN" = C."DSPSCN"
WHERE A."DSPSCN" IS NOT NULL AND A."DSPSCN" != ''
LIMIT 100;
```

## SCN_030 — `PRDLST_CD` 기반 (MEDIUM, 17점)

**참여 데이터셋** (7개): I0960, I2580, I2600, I2610, I2510, I0490, I0940

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품공전 | 개별기준규격 | LEFT JOIN (B→A) | N:M | 112 | 34% | 61% | MEDIUM | `E0301700000000, E0317300000000` |
| 공통기준규격 | 공통기준제외 | LEFT JOIN (B→A) | N:M | 6 | 4% | 75% | MEDIUM | `C0000000000000, B0203010000000` |
| 품목유형코드 | 공통기준규격 | LEFT JOIN (B→A) | 1:N | 44 | 4% | 32% | LOW | `A0000000000000, A0100000000000` |

```sql
SELECT A."PRDLST_CD", B."PRDLST_CD", C."PRDLST_CD", A.*, B.*
FROM "I0960" A
LEFT JOIN "I2580" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
LEFT JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
LEFT JOIN "I2610" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 100;
```

## SCN_001 — `LCNS_NO` 기반 (HIGH, 16점)

**참여 데이터셋** (44개): C001, I1260, I0680, I1540, I2500, I2560, I-0020, I0630, I2860, I1220, I2859, I0030, C003, I1300, I1310, I1250, I0310, I0060, I2711, I2713, I2712, I1230, I2851, I2823, I0080, C006, I1320, I0610, I2852, I0482, I2640, C002, I0490, I0580, I0300, I0480, I1420, I2620, I2836, I2822, I2825, I0250, I1240, I2831

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수입식품등영업신고대장 | 식품등수입판매업정보 | INNER JOIN | 1:1 | 1000 | 100% | 100% | HIGH | `20200009171, 20220020542` |
| 인허가 업소 정보 | 영업소재지 GIS 코드 | INNER JOIN | 1:1 | 999 | 100% | 100% | HIGH | `18820308001, 18830478001` |
| 위생관리등급별 업소 현황 | 식품위생등급평가관리내역 | INNER JOIN | N:M | 756 | 100% | 100% | HIGH | `20250005563, 20250002799` |

```sql
SELECT A."LCNS_NO", B."LCNS_NO", C."LCNS_NO", A.*, B.*
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 100;
```

## SCN_035 — `HIST_TRACE_REG_NO` 기반 (LOW, 16점)

**참여 데이터셋** (5개): I1920, I1930, I1940, I1790, I1800

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수산물이력정보-기본정보 | 수산물이력정보-생산정보 | LEFT JOIN (B→A) | N:M | 3 | 1% | 60% | LOW | `0633, 0600` |
| 수산물이력정보-생산정보 | 수산물이력정보-출하정보 | LEFT JOIN (A→B) | N:M | 2 | 40% | 2% | LOW | `0600, 0633` |
| 수산물이력정보-기본정보 | 수산물이력정보-출하정보 | LEFT JOIN (B→A) | N:M | 13 | 5% | 13% | LOW | `0633, 1508` |

```sql
SELECT A."HIST_TRACE_REG_NO", B."HIST_TRACE_REG_NO", C."HIST_TRACE_REG_NO", A.*, B.*
FROM "I1920" A
LEFT JOIN "I1930" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
LEFT JOIN "I1940" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 100;
```

## SCN_034 — `PRIMARY_FNCLTY` 기반 (LOW, 12점)

**참여 데이터셋** (4개): I-0050, I2710, I0030, C003

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품 개별인정형 정보 | 건강기능식품 품목분류정보 | LEFT JOIN (A→B) | N:M | 107 | 37% | 29% | LOW | `(국문) 갱년기 남성의 건강에 도움을 줄 수 있음 (영문) May help to maintain male health in menopause, (국문) 충치발생 위험 감소에 도움을 줌(치아건강) (영문) Can help to reduce risk of caries occurrence(dental health)` |
| 건강기능식품 품목제조 신고사항 현황 | 건강기능식품 품목분류정보 | LEFT JOIN (A→B) | N:M | 8 | 3% | 2% | LOW | `유산균 증식 및 유해균 억제･배변활동 원활･장 건강에 도움을 줄 수 있음, (1) 결합조직 형성과 기능유지에 필요 (2) 철의 흡수에 필요 (3) 항산화 작용을 하여 유해산소로부터 세포를 보호하는데 필요` |
| 건강기능식품 품목제조신고(원재료) | 건강기능식품 품목분류정보 | LEFT JOIN (B→A) | N:M | 5 | 1% | 1% | LOW | `유산균 증식 및 유해균 억제･배변활동 원활･장 건강에 도움을 줄 수 있음, 관절 및 연골 건강에 도움을 줄 수 있음(생리활성기능 2등급)` |

```sql
SELECT A."PRIMARY_FNCLTY", B."PRIMARY_FNCLTY", C."PRIMARY_FNCLTY", A.*, B.*
FROM "I-0050" A
LEFT JOIN "I2710" B
  ON A."PRIMARY_FNCLTY" = B."PRIMARY_FNCLTY"
LEFT JOIN "I0030" C
  ON B."PRIMARY_FNCLTY" = C."PRIMARY_FNCLTY"
LEFT JOIN "C003" D
  ON C."PRIMARY_FNCLTY" = D."PRIMARY_FNCLTY"
WHERE A."PRIMARY_FNCLTY" IS NOT NULL AND A."PRIMARY_FNCLTY" != ''
LIMIT 100;
```

## SCN_042 — `PRSEC_INSTT_RCOGN_NO` 기반 (LOW, 9점)

**참여 데이터셋** (2개): I0890, I0910

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품위생검사기관 지정 현황 | 국외검사기관 인정 현황 | LEFT JOIN (B→A) | 1:N | 20 | 5% | 12% | LOW | `0000090, 0000091` |

```sql
SELECT A."PRSEC_INSTT_RCOGN_NO", B."PRSEC_INSTT_RCOGN_NO", A.*, B.*
FROM "I0890" A
LEFT JOIN "I0910" B
  ON A."PRSEC_INSTT_RCOGN_NO" = B."PRSEC_INSTT_RCOGN_NO"
WHERE A."PRSEC_INSTT_RCOGN_NO" IS NOT NULL AND A."PRSEC_INSTT_RCOGN_NO" != ''
LIMIT 100;
```

## SCN_041 — `PRDTNM` 기반 (LOW, 8점)

**참여 데이터셋** (3개): I0460, I2640, I2620

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수거검사 계획 및 실적 관련 현황 | 검사부적합 현황(농산물) | LEFT JOIN (B→A) | N:M | 18 | 2% | 16% | LOW | `가지, 감자` |
| 수거검사 계획 및 실적 관련 현황 | 검사부적합(국내) | LEFT JOIN (B→A) | N:M | 20 | 2% | 10% | LOW | `가지, 감자` |

```sql
SELECT A."PRDTNM", B."PRDTNM", C."PRDTNM", A.*, B.*
FROM "I0460" A
LEFT JOIN "I2640" B
  ON A."PRDTNM" = B."PRDTNM"
LEFT JOIN "I2620" C
  ON B."PRDTNM" = C."PRDTNM"
WHERE A."PRDTNM" IS NOT NULL AND A."PRDTNM" != ''
LIMIT 100;
```

## SCN_016 — `TELNO` 기반 (HIGH, 7점)

**참여 데이터셋** (22개): I-0020, I2860, I1200, I2861, I1230, I2713, I1220, I1300, C001, I1260, C004, I2857, I2859, I1290, I0490, I1000, I2500, I1240, I1320, I1920, I2856, I2714

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 건강기능식품 전문.벤처제조업인허가 현황 | 건강기능식품업소 인허가 변경 정보 | INNER JOIN | 1:N | 219 | 59% | 100% | HIGH | `061-339-1213, 063-210-6543` |
| 식품접객업정보 | 음식점업소 인허가 변경 정보 | LEFT JOIN (B→A) | 1:N | 97 | 20% | 100% | MEDIUM | `029054300, 0264062337` |
| 식품첨가물제조업 | 위생용품영업정보 | LEFT JOIN (B→A) | 1:1 | 49 | 6% | 7% | LOW | `0317985211, 0518322280` |

```sql
SELECT A."TELNO", B."TELNO", C."TELNO", A.*, B.*
FROM "I-0020" A
INNER JOIN "I2860" B
  ON A."TELNO" = B."TELNO"
LEFT JOIN "I1200" C
  ON B."TELNO" = C."TELNO"
LEFT JOIN "I2861" D
  ON C."TELNO" = D."TELNO"
WHERE A."TELNO" IS NOT NULL AND A."TELNO" != ''
LIMIT 100;
```

## SCN_043 — `PRPOS` 기반 (LOW, 7점)

**참여 데이터셋** (2개): I0130, I0980

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| LMO 수입 승인 현황 | 식품원료의 한시적 기준 및 규격 인정 현황 | LEFT JOIN (A→B) | N:M | 1 | 13% | 2% | LOW | `식품` |

```sql
SELECT A."PRPOS", B."PRPOS", A.*, B.*
FROM "I0130" A
LEFT JOIN "I0980" B
  ON A."PRPOS" = B."PRPOS"
WHERE A."PRPOS" IS NOT NULL AND A."PRPOS" != ''
LIMIT 100;
```

## SCN_044 — `PRDCTN_QY` 기반 (LOW, 4점)

**참여 데이터셋** (4개): I0300, I2851, I1420, I0310

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 식품.식품첨가물 생산실적 보고 현황 | 위생용품영업 생산실적보고 | LEFT JOIN (A→B) | N:M | 31 | 8% | 4% | LOW | `0, 2000` |
| 축산물 생산실적정보 | 위생용품영업 생산실적보고 | LEFT JOIN (A→B) | N:M | 19 | 3% | 3% | LOW | `0, 200` |
| 건강기능식품 생산실적 보고 품목 현황 | 위생용품영업 생산실적보고 | LEFT JOIN (A→B) | N:M | 9 | 4% | 1% | LOW | `0, 500` |

```sql
SELECT A."PRDCTN_QY", B."PRDCTN_QY", C."PRDCTN_QY", A.*, B.*
FROM "I0300" A
LEFT JOIN "I2851" B
  ON A."PRDCTN_QY" = B."PRDCTN_QY"
LEFT JOIN "I1420" C
  ON B."PRDCTN_QY" = C."PRDCTN_QY"
LEFT JOIN "I0310" D
  ON C."PRDCTN_QY" = D."PRDCTN_QY"
WHERE A."PRDCTN_QY" IS NOT NULL AND A."PRDCTN_QY" != ''
LIMIT 100;
```

## SCN_045 — `PRDLST_REPORT_NO` 기반 (LOW, 3점)

**참여 데이터셋** (4개): C005, I2570, I0460, I2711

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 바코드연계제품정보 | 유통바코드 | LEFT JOIN (B→A) | 1:N | 16 | 2% | 3% | LOW | `199405330509, 1991014403853` |
| 수거검사 계획 및 실적 관련 현황 | 위생용품품목제조보고 | LEFT JOIN (A→B) | 1:1 | 7 | 2% | 1% | LOW | `1991919000137, 1994947200147` |

```sql
SELECT A."PRDLST_REPORT_NO", B."PRDLST_REPORT_NO", C."PRDLST_REPORT_NO", A.*, B.*
FROM "C005" A
LEFT JOIN "I2570" B
  ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
LEFT JOIN "I0460" C
  ON B."PRDLST_REPORT_NO" = C."PRDLST_REPORT_NO"
LEFT JOIN "I2711" D
  ON C."PRDLST_REPORT_NO" = D."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 100;
```

## SCN_046 — `PLAN_TITL` 기반 (LOW, 1점)

**참여 데이터셋** (2개): I0460, I2839

| From | To | JOIN 유형 | 카디널리티 | 매칭 | A비율 | B비율 | 신뢰도 | 샘플값 |
|---|---|---|---|---|---|---|---|---|
| 수거검사 계획 및 실적 관련 현황 | 건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황 | LEFT JOIN (A→B) | N:M | 1 | 2% | 1% | LOW | `식품위생업소 지도점검 등(시설조사 포함)` |

```sql
SELECT A."PLAN_TITL", B."PLAN_TITL", A.*, B.*
FROM "I0460" A
LEFT JOIN "I2839" B
  ON A."PLAN_TITL" = B."PLAN_TITL"
WHERE A."PLAN_TITL" IS NOT NULL AND A."PLAN_TITL" != ''
LIMIT 100;
```
