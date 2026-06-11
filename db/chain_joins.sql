-- =============================================================================
--   N차 체인 조인 자동 탐색 결과
--   기준: 실제 매칭 레코드가 존재하는 체인 조인만 포함
--   총 검증된 체인 조인: 618개
--   생성일시: 2026-06-11T13:29:11.223Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [4차 체인 JOIN] I0940 <-> I0960 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2. [4차 체인 JOIN] I0940 <-> I0960 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 3. [4차 체인 JOIN] I0940 <-> I2580 <-> I0960 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 4. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 5. [4차 체인 JOIN] I0940 <-> I2600 <-> I0960 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 6. [4차 체인 JOIN] I0940 <-> I2600 <-> I2580 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [4차 체인 JOIN] I0960 <-> I0940 <-> I2580 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [4차 체인 JOIN] I0960 <-> I0940 <-> I2600 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [4차 체인 JOIN] I0960 <-> I2580 <-> I0940 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [4차 체인 JOIN] I0960 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [4차 체인 JOIN] I2580 <-> I0940 <-> I0960 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [4차 체인 JOIN] I2580 <-> I0960 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 144,162,018건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [4차 체인 JOIN] I0940 <-> I0950 <-> I0960 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [4차 체인 JOIN] I0940 <-> I0950 <-> I2580 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [4차 체인 JOIN] I0940 <-> I0960 <-> I0950 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [4차 체인 JOIN] I0940 <-> I0960 <-> I2580 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [4차 체인 JOIN] I0940 <-> I2580 <-> I0950 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [4차 체인 JOIN] I0940 <-> I2580 <-> I0960 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [4차 체인 JOIN] I0950 <-> I0940 <-> I0960 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [4차 체인 JOIN] I0950 <-> I0940 <-> I2580 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [4차 체인 JOIN] I0950 <-> I0960 <-> I0940 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [4차 체인 JOIN] I0950 <-> I2580 <-> I0940 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [4차 체인 JOIN] I0960 <-> I0940 <-> I0950 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [4차 체인 JOIN] I0960 <-> I0950 <-> I0940 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 37,437,546건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [4차 체인 JOIN] I0950 <-> I0960 <-> I2580 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 26. [4차 체인 JOIN] I0950 <-> I0960 <-> I2600 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 27. [4차 체인 JOIN] I0950 <-> I2580 <-> I0960 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 28. [4차 체인 JOIN] I0950 <-> I2580 <-> I2600 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 29. [4차 체인 JOIN] I0950 <-> I2600 <-> I0960 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 30. [4차 체인 JOIN] I0950 <-> I2600 <-> I2580 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 31. [4차 체인 JOIN] I0960 <-> I0950 <-> I2580 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 32. [4차 체인 JOIN] I0960 <-> I0950 <-> I2600 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 33. [4차 체인 JOIN] I0960 <-> I2580 <-> I0950 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 34. [4차 체인 JOIN] I0960 <-> I2600 <-> I0950 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 35. [4차 체인 JOIN] I2580 <-> I0950 <-> I0960 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 36. [4차 체인 JOIN] I2580 <-> I0960 <-> I0950 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 26,456,115건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 37. [4차 체인 JOIN] I0940 <-> I0950 <-> I0960 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 38. [4차 체인 JOIN] I0940 <-> I0950 <-> I2600 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 39. [4차 체인 JOIN] I0940 <-> I0960 <-> I0950 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 40. [4차 체인 JOIN] I0940 <-> I0960 <-> I2600 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 41. [4차 체인 JOIN] I0940 <-> I2600 <-> I0950 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 42. [4차 체인 JOIN] I0940 <-> I2600 <-> I0960 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 43. [4차 체인 JOIN] I0950 <-> I0940 <-> I0960 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 44. [4차 체인 JOIN] I0950 <-> I0940 <-> I2600 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 45. [4차 체인 JOIN] I0950 <-> I0960 <-> I0940 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 46. [4차 체인 JOIN] I0950 <-> I2600 <-> I0940 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 47. [4차 체인 JOIN] I0960 <-> I0940 <-> I0950 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 48. [4차 체인 JOIN] I0960 <-> I0950 <-> I0940 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,891,892건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 49. [4차 체인 JOIN] I0940 <-> I0950 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 50. [4차 체인 JOIN] I0940 <-> I0950 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 51. [4차 체인 JOIN] I0940 <-> I2580 <-> I0950 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 52. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 53. [4차 체인 JOIN] I0940 <-> I2600 <-> I0950 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 54. [4차 체인 JOIN] I0940 <-> I2600 <-> I2580 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 55. [4차 체인 JOIN] I0950 <-> I0940 <-> I2580 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 56. [4차 체인 JOIN] I0950 <-> I0940 <-> I2600 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 57. [4차 체인 JOIN] I0950 <-> I2580 <-> I0940 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 58. [4차 체인 JOIN] I0950 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 59. [4차 체인 JOIN] I2580 <-> I0940 <-> I0950 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 60. [4차 체인 JOIN] I2580 <-> I0950 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 7,392,924건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 61. [4차 체인 JOIN] I0940 <-> I0960 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 62. [4차 체인 JOIN] I0940 <-> I0960 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 63. [4차 체인 JOIN] I0940 <-> I2530 <-> I0960 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 64. [4차 체인 JOIN] I0940 <-> I2530 <-> I2580 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 65. [4차 체인 JOIN] I0940 <-> I2580 <-> I0960 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 66. [4차 체인 JOIN] I0940 <-> I2580 <-> I2530 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 67. [4차 체인 JOIN] I0960 <-> I0940 <-> I2530 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 68. [4차 체인 JOIN] I0960 <-> I0940 <-> I2580 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 69. [4차 체인 JOIN] I0960 <-> I2530 <-> I0940 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 70. [4차 체인 JOIN] I0960 <-> I2580 <-> I0940 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 71. [4차 체인 JOIN] I2530 <-> I0940 <-> I0960 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 72. [4차 체인 JOIN] I2530 <-> I0960 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 73. [4차 체인 JOIN] I0960 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 1,883,923건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 74. [4차 체인 JOIN] I2580 <-> I0960 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 1,883,923건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 75. [4차 체인 JOIN] I0960 <-> I2530 <-> I2580 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 76. [4차 체인 JOIN] I0960 <-> I2530 <-> I2600 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 77. [4차 체인 JOIN] I0960 <-> I2580 <-> I2530 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 78. [4차 체인 JOIN] I0960 <-> I2580 <-> I2600 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 79. [4차 체인 JOIN] I0960 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 80. [4차 체인 JOIN] I0960 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 81. [4차 체인 JOIN] I2530 <-> I0960 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 82. [4차 체인 JOIN] I2530 <-> I0960 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 83. [4차 체인 JOIN] I2530 <-> I2580 <-> I0960 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 84. [4차 체인 JOIN] I2530 <-> I2600 <-> I0960 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 85. [4차 체인 JOIN] I2580 <-> I0960 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 86. [4차 체인 JOIN] I2580 <-> I2530 <-> I0960 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,893건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 87. [4차 체인 JOIN] I0940 <-> I0960 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 1,135,142건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 88. [4차 체인 JOIN] I0960 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 1,135,142건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 89. [4차 체인 JOIN] I0940 <-> I0960 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 90. [4차 체인 JOIN] I0940 <-> I0960 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 91. [4차 체인 JOIN] I0940 <-> I2530 <-> I0960 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 92. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 93. [4차 체인 JOIN] I0940 <-> I2600 <-> I0960 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 94. [4차 체인 JOIN] I0940 <-> I2600 <-> I2530 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 95. [4차 체인 JOIN] I0960 <-> I0940 <-> I2530 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 96. [4차 체인 JOIN] I0960 <-> I0940 <-> I2600 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 97. [4차 체인 JOIN] I0960 <-> I2530 <-> I0940 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 98. [4차 체인 JOIN] I0960 <-> I2600 <-> I0940 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 99. [4차 체인 JOIN] I2530 <-> I0940 <-> I0960 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 100. [4차 체인 JOIN] I2530 <-> I0960 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,134건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 101. [4차 체인 JOIN] I0950 <-> I0960 <-> I2530 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 102. [4차 체인 JOIN] I0950 <-> I0960 <-> I2580 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 103. [4차 체인 JOIN] I0950 <-> I2530 <-> I0960 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 104. [4차 체인 JOIN] I0950 <-> I2530 <-> I2580 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 105. [4차 체인 JOIN] I0950 <-> I2580 <-> I0960 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 106. [4차 체인 JOIN] I0950 <-> I2580 <-> I2530 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 107. [4차 체인 JOIN] I0960 <-> I0950 <-> I2530 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 108. [4차 체인 JOIN] I0960 <-> I0950 <-> I2580 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 109. [4차 체인 JOIN] I0960 <-> I2530 <-> I0950 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 110. [4차 체인 JOIN] I0960 <-> I2580 <-> I0950 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 111. [4차 체인 JOIN] I2530 <-> I0950 <-> I0960 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 112. [4차 체인 JOIN] I2530 <-> I0960 <-> I0950 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,157건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 113. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 114. [4차 체인 JOIN] I2580 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 115. [4차 체인 JOIN] I0940 <-> I2530 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 116. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 117. [4차 체인 JOIN] I0940 <-> I2580 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 118. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 119. [4차 체인 JOIN] I0940 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 120. [4차 체인 JOIN] I0940 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 121. [4차 체인 JOIN] I2530 <-> I0940 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 122. [4차 체인 JOIN] I2530 <-> I0940 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 123. [4차 체인 JOIN] I2530 <-> I2580 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 124. [4차 체인 JOIN] I2530 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 125. [4차 체인 JOIN] I2580 <-> I0940 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 126. [4차 체인 JOIN] I2580 <-> I2530 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 127. [4차 체인 JOIN] I0940 <-> I0950 <-> I0960 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 128. [4차 체인 JOIN] I0940 <-> I0950 <-> I2530 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 129. [4차 체인 JOIN] I0940 <-> I0960 <-> I0950 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 130. [4차 체인 JOIN] I0940 <-> I0960 <-> I2530 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 131. [4차 체인 JOIN] I0940 <-> I2530 <-> I0950 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 132. [4차 체인 JOIN] I0940 <-> I2530 <-> I0960 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 133. [4차 체인 JOIN] I0950 <-> I0940 <-> I0960 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 134. [4차 체인 JOIN] I0950 <-> I0940 <-> I2530 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 135. [4차 체인 JOIN] I0950 <-> I0960 <-> I0940 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 136. [4차 체인 JOIN] I0950 <-> I2530 <-> I0940 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 137. [4차 체인 JOIN] I0960 <-> I0940 <-> I0950 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 138. [4차 체인 JOIN] I0960 <-> I0950 <-> I0940 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 298,182건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 139. [4차 체인 JOIN] I0960 <-> I2580 <-> I2600 <-> I2510
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 242,697건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 140. [4차 체인 JOIN] I2510 <-> I2600 <-> I0960 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 242,697건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 141. [4차 체인 JOIN] I0950 <-> I0960 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 208,273건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 142. [4차 체인 JOIN] I0960 <-> I0950 <-> I2600 <-> I2590
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 208,273건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 143. [4차 체인 JOIN] I0950 <-> I0960 <-> I2530 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 144. [4차 체인 JOIN] I0950 <-> I0960 <-> I2600 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 145. [4차 체인 JOIN] I0950 <-> I2530 <-> I0960 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 146. [4차 체인 JOIN] I0950 <-> I2530 <-> I2600 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 147. [4차 체인 JOIN] I0950 <-> I2600 <-> I0960 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 148. [4차 체인 JOIN] I0950 <-> I2600 <-> I2530 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 149. [4차 체인 JOIN] I0960 <-> I0950 <-> I2530 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 150. [4차 체인 JOIN] I0960 <-> I0950 <-> I2600 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 151. [4차 체인 JOIN] I0960 <-> I2530 <-> I0950 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 152. [4차 체인 JOIN] I0960 <-> I2600 <-> I0950 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 153. [4차 체인 JOIN] I2530 <-> I0950 <-> I0960 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 154. [4차 체인 JOIN] I2530 <-> I0960 <-> I0950 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,257건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 155. [4차 체인 JOIN] I0940 <-> I0960 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 147,148건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 156. [4차 체인 JOIN] I0960 <-> I0940 <-> I2600 <-> I2510
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 147,148건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 157. [4차 체인 JOIN] I0940 <-> I0950 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 158. [4차 체인 JOIN] I0940 <-> I0950 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 159. [4차 체인 JOIN] I0940 <-> I2530 <-> I0950 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 160. [4차 체인 JOIN] I0940 <-> I2530 <-> I2580 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 161. [4차 체인 JOIN] I0940 <-> I2580 <-> I0950 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 162. [4차 체인 JOIN] I0940 <-> I2580 <-> I2530 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 163. [4차 체인 JOIN] I0950 <-> I0940 <-> I2530 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 164. [4차 체인 JOIN] I0950 <-> I0940 <-> I2580 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 165. [4차 체인 JOIN] I0950 <-> I2530 <-> I0940 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 166. [4차 체인 JOIN] I0950 <-> I2580 <-> I0940 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 167. [4차 체인 JOIN] I2530 <-> I0940 <-> I0950 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 168. [4차 체인 JOIN] I2530 <-> I0950 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 169. [4차 체인 JOIN] I0950 <-> I2530 <-> I2580 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 170. [4차 체인 JOIN] I0950 <-> I2530 <-> I2600 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 171. [4차 체인 JOIN] I0950 <-> I2580 <-> I2530 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 172. [4차 체인 JOIN] I0950 <-> I2580 <-> I2600 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 173. [4차 체인 JOIN] I0950 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 174. [4차 체인 JOIN] I0950 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 175. [4차 체인 JOIN] I0950 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 176. [4차 체인 JOIN] I2530 <-> I0950 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 177. [4차 체인 JOIN] I2530 <-> I0950 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 178. [4차 체인 JOIN] I2530 <-> I2580 <-> I0950 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 179. [4차 체인 JOIN] I2530 <-> I2600 <-> I0950 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 180. [4차 체인 JOIN] I2580 <-> I0950 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 181. [4차 체인 JOIN] I2580 <-> I0950 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 182. [4차 체인 JOIN] I2580 <-> I2530 <-> I0950 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 183. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 81,701건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 184. [4차 체인 JOIN] I2510 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 81,701건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 185. [4차 체인 JOIN] I0940 <-> I0950 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 58,228건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 186. [4차 체인 JOIN] I0950 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 58,228건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 187. [4차 체인 JOIN] I0940 <-> I0950 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 188. [4차 체인 JOIN] I0940 <-> I0950 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 189. [4차 체인 JOIN] I0940 <-> I2530 <-> I0950 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 190. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 191. [4차 체인 JOIN] I0940 <-> I2600 <-> I0950 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 192. [4차 체인 JOIN] I0940 <-> I2600 <-> I2530 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."PRDLST_CD" AS "D_PRDLST_CD",
    D."PC_KOR_NM" AS "D_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 193. [4차 체인 JOIN] I0950 <-> I0940 <-> I2530 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 194. [4차 체인 JOIN] I0950 <-> I0940 <-> I2600 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 195. [4차 체인 JOIN] I0950 <-> I2530 <-> I0940 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 196. [4차 체인 JOIN] I0950 <-> I2600 <-> I0940 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 197. [4차 체인 JOIN] I2530 <-> I0940 <-> I0950 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 198. [4차 체인 JOIN] I2530 <-> I0950 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,212건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 199. [4차 체인 JOIN] I0950 <-> I0960 <-> I2600 <-> I2510
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 26,756건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 200. [4차 체인 JOIN] I0960 <-> I0950 <-> I2600 <-> I2510
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 26,756건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 201. [4차 체인 JOIN] I0960 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 14,907건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 202. [4차 체인 JOIN] I2530 <-> I0960 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 14,907건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 203. [4차 체인 JOIN] I0950 <-> I2580 <-> I2600 <-> I2510
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 12,446건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 204. [4차 체인 JOIN] I2510 <-> I2600 <-> I0950 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 12,446건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 205. [4차 체인 JOIN] I2530 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 206. [4차 체인 JOIN] I2580 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 207. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 208. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 209. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 210. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 211. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 212. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 213. [4차 체인 JOIN] I-0020 <-> C003 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 214. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 215. [4차 체인 JOIN] I-0020 <-> I0310 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 216. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 217. [4차 체인 JOIN] I0310 <-> C003 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 218. [4차 체인 JOIN] I0310 <-> I-0020 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 219. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 220. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 221. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 222. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 223. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 224. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 225. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 226. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 227. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 228. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 229. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 230. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 231. [4차 체인 JOIN] I-0020 <-> C003 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 232. [4차 체인 JOIN] I-0020 <-> C003 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 233. [4차 체인 JOIN] I-0020 <-> I0030 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 234. [4차 체인 JOIN] I-0020 <-> I0310 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 235. [4차 체인 JOIN] I0030 <-> C003 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 236. [4차 체인 JOIN] I0030 <-> C003 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 237. [4차 체인 JOIN] I0030 <-> C003 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 238. [4차 체인 JOIN] I0030 <-> I-0020 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 239. [4차 체인 JOIN] I0030 <-> I0310 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 240. [4차 체인 JOIN] I0030 <-> I0630 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 241. [4차 체인 JOIN] I0310 <-> C003 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 242. [4차 체인 JOIN] I0310 <-> I0030 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 243. [4차 체인 JOIN] I0940 <-> I0950 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 7,548건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 244. [4차 체인 JOIN] I0950 <-> I0940 <-> I2600 <-> I2510
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 7,548건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 245. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 246. [4차 체인 JOIN] I2530 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 247. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 248. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 249. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 250. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 251. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 252. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 253. [4차 체인 JOIN] I-0020 <-> C003 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 254. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 255. [4차 체인 JOIN] I-0020 <-> I0030 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 256. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 257. [4차 체인 JOIN] I0030 <-> C003 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 258. [4차 체인 JOIN] I0030 <-> I-0020 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 259. [4차 체인 JOIN] I0960 <-> I2530 <-> I2600 <-> I2510
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 1,923건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 260. [4차 체인 JOIN] I2510 <-> I2600 <-> I0960 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,923건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 261. [4차 체인 JOIN] I2510 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 262. [4차 체인 JOIN] I2510 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 263. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 264. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 265. [4차 체인 JOIN] I-0020 <-> I0310 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 266. [4차 체인 JOIN] I-0020 <-> I0310 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 267. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 268. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 269. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 270. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 271. [4차 체인 JOIN] I0030 <-> I0310 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 272. [4차 체인 JOIN] I0030 <-> I0630 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."BSSH_NM" AS "D_BSSH_NM",
    D."PRDLST_NM" AS "D_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 273. [4차 체인 JOIN] I0310 <-> I-0020 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 274. [4차 체인 JOIN] I0310 <-> I0030 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 275. [4차 체인 JOIN] C002 <-> I1250 <-> I2500 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 276. [4차 체인 JOIN] C002 <-> I1250 <-> I2560 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 277. [4차 체인 JOIN] C002 <-> I2500 <-> I1250 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 278. [4차 체인 JOIN] C002 <-> I2500 <-> I2560 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1250" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 279. [4차 체인 JOIN] C002 <-> I2560 <-> I1250 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 280. [4차 체인 JOIN] C002 <-> I2560 <-> I2500 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1250" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 281. [4차 체인 JOIN] I1250 <-> C002 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 282. [4차 체인 JOIN] I1250 <-> C002 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 283. [4차 체인 JOIN] I1250 <-> I2500 <-> C002 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1250" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C002" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 284. [4차 체인 JOIN] I1250 <-> I2560 <-> C002 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C002" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 285. [4차 체인 JOIN] I2500 <-> C002 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 286. [4차 체인 JOIN] I2500 <-> I1250 <-> C002 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C002" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 287. [4차 체인 JOIN] I0950 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 789건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 288. [4차 체인 JOIN] I2530 <-> I0950 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 789건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 289. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 723건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 290. [4차 체인 JOIN] I2510 <-> I2600 <-> I0940 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 723건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0940" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 291. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 292. [4차 체인 JOIN] C003 <-> I-0020 <-> I2852 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 293. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 294. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 295. [4차 체인 JOIN] C003 <-> I0030 <-> I2852 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 296. [4차 체인 JOIN] C003 <-> I0030 <-> I2852 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 297. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 298. [4차 체인 JOIN] C003 <-> I0630 <-> I2852 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 299. [4차 체인 JOIN] C003 <-> I2852 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 300. [4차 체인 JOIN] C003 <-> I2852 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 301. [4차 체인 JOIN] C003 <-> I2852 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 302. [4차 체인 JOIN] C003 <-> I2852 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 303. [4차 체인 JOIN] I-0020 <-> C003 <-> I0030 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 304. [4차 체인 JOIN] I-0020 <-> C003 <-> I2852 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 305. [4차 체인 JOIN] I-0020 <-> I0030 <-> C003 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 306. [4차 체인 JOIN] I-0020 <-> I2852 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 307. [4차 체인 JOIN] I0030 <-> C003 <-> I-0020 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 308. [4차 체인 JOIN] I0030 <-> C003 <-> I0630 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 309. [4차 체인 JOIN] I0030 <-> C003 <-> I2852 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 310. [4차 체인 JOIN] I0030 <-> I-0020 <-> C003 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 311. [4차 체인 JOIN] I0030 <-> I0630 <-> C003 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 312. [4차 체인 JOIN] I0030 <-> I2852 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 313. [4차 체인 JOIN] I0630 <-> C003 <-> I0030 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 314. [4차 체인 JOIN] I0630 <-> I0030 <-> C003 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 315. [4차 체인 JOIN] I1230 <-> I1250 <-> I2500 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 316. [4차 체인 JOIN] I1230 <-> I1250 <-> I2560 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 317. [4차 체인 JOIN] I1230 <-> I2500 <-> I1250 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 318. [4차 체인 JOIN] I1230 <-> I2500 <-> I2560 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1250" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 319. [4차 체인 JOIN] I1230 <-> I2560 <-> I1250 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 320. [4차 체인 JOIN] I1230 <-> I2560 <-> I2500 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1250" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 321. [4차 체인 JOIN] I1250 <-> I1230 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 322. [4차 체인 JOIN] I1250 <-> I1230 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 323. [4차 체인 JOIN] I1250 <-> I2500 <-> I1230 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1250" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1230" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 324. [4차 체인 JOIN] I1250 <-> I2560 <-> I1230 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1230" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 325. [4차 체인 JOIN] I2500 <-> I1230 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 326. [4차 체인 JOIN] I2500 <-> I1250 <-> I1230 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1230" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 327. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 328. [4차 체인 JOIN] I-0020 <-> I0030 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 329. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0030 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 330. [4차 체인 JOIN] I-0020 <-> I0630 <-> I2852 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 331. [4차 체인 JOIN] I-0020 <-> I2852 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 332. [4차 체인 JOIN] I-0020 <-> I2852 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 333. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0630 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 334. [4차 체인 JOIN] I0030 <-> I-0020 <-> I2852 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 335. [4차 체인 JOIN] I0030 <-> I0630 <-> I-0020 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 336. [4차 체인 JOIN] I0030 <-> I2852 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I0030" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 337. [4차 체인 JOIN] I0630 <-> I-0020 <-> I0030 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 338. [4차 체인 JOIN] I0630 <-> I0030 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 339. [4차 체인 JOIN] I1300 <-> I1310 <-> I2500 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 340. [4차 체인 JOIN] I1300 <-> I1310 <-> I2560 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 341. [4차 체인 JOIN] I1300 <-> I2500 <-> I1310 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 342. [4차 체인 JOIN] I1300 <-> I2500 <-> I2560 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 343. [4차 체인 JOIN] I1300 <-> I2560 <-> I1310 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 344. [4차 체인 JOIN] I1300 <-> I2560 <-> I2500 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 345. [4차 체인 JOIN] I1310 <-> I1300 <-> I2500 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 346. [4차 체인 JOIN] I1310 <-> I1300 <-> I2560 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 347. [4차 체인 JOIN] I1310 <-> I2500 <-> I1300 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I1310" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1300" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 348. [4차 체인 JOIN] I1310 <-> I2560 <-> I1300 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."INDUTY_CD_NM" AS "D_INDUTY_CD_NM"
FROM "I1310" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1300" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 349. [4차 체인 JOIN] I2500 <-> I1300 <-> I1310 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 350. [4차 체인 JOIN] I2500 <-> I1310 <-> I1300 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1300" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 351. [4차 체인 JOIN] I2580 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 352. [4차 체인 JOIN] I2590 <-> I2600 <-> I2580 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    A."SPEC_NM" AS "A_SPEC_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 353. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 354. [4차 체인 JOIN] C003 <-> I-0020 <-> I2852 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 355. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 356. [4차 체인 JOIN] C003 <-> I0630 <-> I2852 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 357. [4차 체인 JOIN] C003 <-> I2852 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 358. [4차 체인 JOIN] C003 <-> I2852 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 359. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 360. [4차 체인 JOIN] I-0020 <-> C003 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 361. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 362. [4차 체인 JOIN] I-0020 <-> I2852 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."GMP_APPN_NO" AS "D_GMP_APPN_NO",
    D."APPN_DT" AS "D_APPN_DT"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 363. [4차 체인 JOIN] I0630 <-> C003 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 364. [4차 체인 JOIN] I0630 <-> I-0020 <-> C003 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM",
    D."PRDLST_REPORT_NO" AS "D_PRDLST_REPORT_NO",
    D."PRMS_DT" AS "D_PRMS_DT"
FROM "I0630" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "C003" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2852" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 365. [4차 체인 JOIN] I0950 <-> I2530 <-> I2600 <-> I2510
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."LV" AS "D_LV",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2510" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 366. [4차 체인 JOIN] I2510 <-> I2600 <-> I0950 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 367. [4차 체인 JOIN] I0950 <-> I2580 <-> I2600 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 368. [4차 체인 JOIN] I0950 <-> I2580 <-> I2610 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 369. [4차 체인 JOIN] I0950 <-> I2600 <-> I2580 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 370. [4차 체인 JOIN] I0950 <-> I2600 <-> I2610 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 371. [4차 체인 JOIN] I0950 <-> I2610 <-> I2580 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 372. [4차 체인 JOIN] I0950 <-> I2610 <-> I2600 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 373. [4차 체인 JOIN] I2530 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 374. [4차 체인 JOIN] I2580 <-> I0950 <-> I2600 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 375. [4차 체인 JOIN] I2580 <-> I0950 <-> I2610 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 376. [4차 체인 JOIN] I2580 <-> I2600 <-> I0950 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 377. [4차 체인 JOIN] I2580 <-> I2610 <-> I0950 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 378. [4차 체인 JOIN] I2590 <-> I2600 <-> I2530 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    A."SPEC_NM" AS "A_SPEC_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 379. [4차 체인 JOIN] I2600 <-> I0950 <-> I2580 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 380. [4차 체인 JOIN] I2600 <-> I2580 <-> I0950 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 381. [4차 체인 JOIN] I0950 <-> I2530 <-> I2600 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 382. [4차 체인 JOIN] I0950 <-> I2530 <-> I2610 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 383. [4차 체인 JOIN] I0950 <-> I2600 <-> I2530 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 384. [4차 체인 JOIN] I0950 <-> I2600 <-> I2610 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 385. [4차 체인 JOIN] I0950 <-> I2610 <-> I2530 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 386. [4차 체인 JOIN] I0950 <-> I2610 <-> I2600 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 387. [4차 체인 JOIN] I0950 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 388. [4차 체인 JOIN] I2530 <-> I0950 <-> I2600 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 389. [4차 체인 JOIN] I2530 <-> I0950 <-> I2610 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 390. [4차 체인 JOIN] I2530 <-> I2580 <-> I2600 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 391. [4차 체인 JOIN] I2530 <-> I2580 <-> I2610 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 392. [4차 체인 JOIN] I2530 <-> I2600 <-> I0950 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 393. [4차 체인 JOIN] I2530 <-> I2600 <-> I2580 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 394. [4차 체인 JOIN] I2530 <-> I2600 <-> I2610 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 395. [4차 체인 JOIN] I2530 <-> I2610 <-> I0950 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 396. [4차 체인 JOIN] I2530 <-> I2610 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 397. [4차 체인 JOIN] I2530 <-> I2610 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 398. [4차 체인 JOIN] I2580 <-> I2530 <-> I2600 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 399. [4차 체인 JOIN] I2580 <-> I2530 <-> I2610 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 400. [4차 체인 JOIN] I2580 <-> I2600 <-> I2530 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 401. [4차 체인 JOIN] I2580 <-> I2610 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 402. [4차 체인 JOIN] I2590 <-> I2600 <-> I0950 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    A."SPEC_NM" AS "A_SPEC_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 403. [4차 체인 JOIN] I2600 <-> I0950 <-> I2530 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 404. [4차 체인 JOIN] I2600 <-> I2530 <-> I0950 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 405. [4차 체인 JOIN] I2600 <-> I2530 <-> I2580 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 406. [4차 체인 JOIN] I2600 <-> I2580 <-> I2530 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 407. [4차 체인 JOIN] I2510 <-> I2610 <-> I2580 <-> I2600
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 21건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 408. [4차 체인 JOIN] I2510 <-> I2610 <-> I2600 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 21건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 409. [4차 체인 JOIN] I0950 <-> I2530 <-> I2580 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 410. [4차 체인 JOIN] I0950 <-> I2530 <-> I2610 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 411. [4차 체인 JOIN] I0950 <-> I2580 <-> I2530 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 412. [4차 체인 JOIN] I0950 <-> I2580 <-> I2610 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 413. [4차 체인 JOIN] I0950 <-> I2610 <-> I2530 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 414. [4차 체인 JOIN] I0950 <-> I2610 <-> I2580 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."TESTITM_CD" AS "D_TESTITM_CD",
    D."KOR_NM" AS "D_KOR_NM"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 415. [4차 체인 JOIN] I2530 <-> I0950 <-> I2580 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 416. [4차 체인 JOIN] I2530 <-> I0950 <-> I2610 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 417. [4차 체인 JOIN] I2530 <-> I2580 <-> I0950 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 418. [4차 체인 JOIN] I2530 <-> I2610 <-> I0950 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."INDV_SPEC_SEQ" AS "D_INDV_SPEC_SEQ",
    D."PRDLST_CD" AS "D_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 419. [4차 체인 JOIN] I2580 <-> I0950 <-> I2530 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 420. [4차 체인 JOIN] I2580 <-> I2530 <-> I0950 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2610" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 421. [4차 체인 JOIN] I2580 <-> I2610 <-> I2510 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2600
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_SEQ" AS "D_CMMN_SPEC_SEQ",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2600" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 422. [4차 체인 JOIN] I2510 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 423. [4차 체인 JOIN] I0950 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2610" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 424. [4차 체인 JOIN] I0940 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2610" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 425. [4차 체인 JOIN] I0960 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2610" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 426. [4차 체인 JOIN] I2590 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    A."SPEC_NM" AS "A_SPEC_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    D."CMMN_SPEC_CD" AS "D_CMMN_SPEC_CD",
    D."SPEC_NM" AS "D_SPEC_NM"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2610" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 427. [3차 체인 JOIN] I0940 <-> I0960 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 428. [3차 체인 JOIN] I0940 <-> I2580 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 429. [3차 체인 JOIN] I0960 <-> I0940 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 2,674,853건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 430. [3차 체인 JOIN] I0960 <-> I2580 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,923건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 431. [3차 체인 JOIN] I0960 <-> I2600 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,883,923건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 432. [3차 체인 JOIN] I2580 <-> I0960 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,883,923건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 433. [3차 체인 JOIN] I0940 <-> I0960 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,142건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 434. [3차 체인 JOIN] I0940 <-> I2600 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 1,135,142건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 435. [3차 체인 JOIN] I0960 <-> I0940 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,135,142건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 436. [3차 체인 JOIN] I0950 <-> I0960 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,160건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 437. [3차 체인 JOIN] I0950 <-> I2580 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 737,160건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 438. [3차 체인 JOIN] I0960 <-> I0950 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 737,160건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 439. [3차 체인 JOIN] I0940 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 440. [3차 체인 JOIN] I0940 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 441. [3차 체인 JOIN] I2580 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 442. [3차 체인 JOIN] I0940 <-> I0950 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,184건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 443. [3차 체인 JOIN] I0940 <-> I0960 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 298,184건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 444. [3차 체인 JOIN] I0950 <-> I0940 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 298,184건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 445. [3차 체인 JOIN] I0950 <-> I0960 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,273건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 446. [3차 체인 JOIN] I0950 <-> I2600 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 208,273건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 447. [3차 체인 JOIN] I0960 <-> I0950 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 208,273건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 448. [3차 체인 JOIN] I0940 <-> I0950 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 449. [3차 체인 JOIN] I0940 <-> I2580 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 450. [3차 체인 JOIN] I0950 <-> I0940 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 138,634건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 451. [3차 체인 JOIN] I0950 <-> I2580 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 452. [3차 체인 JOIN] I0950 <-> I2600 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 453. [3차 체인 JOIN] I2580 <-> I0950 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 98,787건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 454. [3차 체인 JOIN] I0940 <-> I0950 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,228건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 455. [3차 체인 JOIN] I0940 <-> I2600 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 58,228건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 456. [3차 체인 JOIN] I0950 <-> I0940 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 58,228건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 457. [3차 체인 JOIN] I0960 <-> I2530 <-> I2580
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 47,072건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 458. [3차 체인 JOIN] I0960 <-> I2580 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 47,072건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0960" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 459. [3차 체인 JOIN] I2530 <-> I0960 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 47,072건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 460. [3차 체인 JOIN] I1920 <-> I1930 <-> I1940
--   조인 관계: I1920 --(HIST_TRACE_REG_NO)-->I1930 --(HIST_TRACE_REG_NO)-->I1940
--   실제 매칭 레코드: 40,116건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "A_HIST_TRACE_REG_NO",
    A."GOODS_NM" AS "A_GOODS_NM",
    B."HIST_TRACE_REG_NO" AS "B_HIST_TRACE_REG_NO",
    B."LOTNO_WRHOUSNG" AS "B_LOTNO_WRHOUSNG",
    C."HIST_TRACE_REG_NO" AS "C_HIST_TRACE_REG_NO",
    C."LOTNO_RELES" AS "C_LOTNO_RELES"
FROM "I1920" A
INNER JOIN "I1930" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1940" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 461. [3차 체인 JOIN] I1920 <-> I1940 <-> I1930
--   조인 관계: I1920 --(HIST_TRACE_REG_NO)-->I1940 --(HIST_TRACE_REG_NO)-->I1930
--   실제 매칭 레코드: 40,116건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "A_HIST_TRACE_REG_NO",
    A."GOODS_NM" AS "A_GOODS_NM",
    B."HIST_TRACE_REG_NO" AS "B_HIST_TRACE_REG_NO",
    B."LOTNO_RELES" AS "B_LOTNO_RELES",
    C."HIST_TRACE_REG_NO" AS "C_HIST_TRACE_REG_NO",
    C."LOTNO_WRHOUSNG" AS "C_LOTNO_WRHOUSNG"
FROM "I1920" A
INNER JOIN "I1940" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1930" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 462. [3차 체인 JOIN] I1930 <-> I1920 <-> I1940
--   조인 관계: I1930 --(HIST_TRACE_REG_NO)-->I1920 --(HIST_TRACE_REG_NO)-->I1940
--   실제 매칭 레코드: 40,116건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "A_HIST_TRACE_REG_NO",
    A."LOTNO_WRHOUSNG" AS "A_LOTNO_WRHOUSNG",
    B."HIST_TRACE_REG_NO" AS "B_HIST_TRACE_REG_NO",
    B."GOODS_NM" AS "B_GOODS_NM",
    C."HIST_TRACE_REG_NO" AS "C_HIST_TRACE_REG_NO",
    C."LOTNO_RELES" AS "C_LOTNO_RELES"
FROM "I1930" A
INNER JOIN "I1920" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1940" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 463. [3차 체인 JOIN] I0940 <-> I0960 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 21,346건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0940" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 464. [3차 체인 JOIN] I0940 <-> I2530 <-> I0960
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 21,346건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 465. [3차 체인 JOIN] I0960 <-> I0940 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 21,346건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0960" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 466. [3차 체인 JOIN] I0940 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 467. [3차 체인 JOIN] I0940 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 468. [3차 체인 JOIN] I2530 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 469. [3차 체인 JOIN] I0960 <-> I2600 <-> I2590
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 14,921건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 470. [3차 체인 JOIN] I0960 <-> I2530 <-> I2600
--   조인 관계: I0960 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 14,907건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0960" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 471. [3차 체인 JOIN] I0960 <-> I2600 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 14,907건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 472. [3차 체인 JOIN] I2530 <-> I0960 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 14,907건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 473. [3차 체인 JOIN] I2580 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,758건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 474. [3차 체인 JOIN] I2530 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 475. [3차 체인 JOIN] I2530 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 476. [3차 체인 JOIN] I2580 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 477. [3차 체인 JOIN] C003 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 478. [3차 체인 JOIN] C003 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 479. [3차 체인 JOIN] C003 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 480. [3차 체인 JOIN] C003 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 481. [3차 체인 JOIN] I-0020 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 482. [3차 체인 JOIN] I0310 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0310" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 483. [3차 체인 JOIN] C003 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 484. [3차 체인 JOIN] C003 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 485. [3차 체인 JOIN] I0030 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 486. [3차 체인 JOIN] I0950 <-> I0960 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 6,127건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0950" A
INNER JOIN "I0960" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 487. [3차 체인 JOIN] I0950 <-> I2530 <-> I0960
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 6,127건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0960" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 488. [3차 체인 JOIN] I0960 <-> I0950 <-> I2530
--   조인 관계: I0960 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 6,127건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0960" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 489. [3차 체인 JOIN] I0950 <-> I2530 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 5,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 490. [3차 체인 JOIN] I0950 <-> I2580 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 5,134건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 491. [3차 체인 JOIN] I2530 <-> I0950 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 5,134건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 492. [3차 체인 JOIN] I0940 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,036건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 493. [3차 체인 JOIN] I0940 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 494. [3차 체인 JOIN] I0940 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 495. [3차 체인 JOIN] I2530 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 496. [3차 체인 JOIN] C003 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 497. [3차 체인 JOIN] C003 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 498. [3차 체인 JOIN] C003 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 499. [3차 체인 JOIN] C003 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 500. [3차 체인 JOIN] I-0020 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 501. [3차 체인 JOIN] I0030 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 502. [3차 체인 JOIN] I2711 <-> I2712 <-> I2713
--   조인 관계: I2711 --(LCNS_NO)-->I2712 --(LCNS_NO)-->I2713
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2711" A
INNER JOIN "I2712" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2713" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 503. [3차 체인 JOIN] I2711 <-> I2713 <-> I2712
--   조인 관계: I2711 --(LCNS_NO)-->I2713 --(LCNS_NO)-->I2712
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2711" A
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2712" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 504. [3차 체인 JOIN] I2712 <-> I2711 <-> I2713
--   조인 관계: I2712 --(LCNS_NO)-->I2711 --(LCNS_NO)-->I2713
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2712" A
INNER JOIN "I2711" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2713" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 505. [3차 체인 JOIN] I0960 <-> I2600 <-> I2510
--   조인 관계: I0960 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 1,924건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0960" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 506. [3차 체인 JOIN] I2510 <-> I2600 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 507. [3차 체인 JOIN] I-0020 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 508. [3차 체인 JOIN] I-0020 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 509. [3차 체인 JOIN] I0030 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 510. [3차 체인 JOIN] I0030 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0030" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 511. [3차 체인 JOIN] I0030 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 512. [3차 체인 JOIN] I0310 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 513. [3차 체인 JOIN] I0940 <-> I0950 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,186건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0940" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 514. [3차 체인 JOIN] I0940 <-> I2530 <-> I0950
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 1,186건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."PRDLST_CD" AS "C_PRDLST_CD",
    C."PC_KOR_NM" AS "C_PC_KOR_NM"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0950" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 515. [3차 체인 JOIN] I0950 <-> I0940 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,186건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0950" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 516. [3차 체인 JOIN] C003 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 517. [3차 체인 JOIN] C003 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 518. [3차 체인 JOIN] I-0020 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 519. [3차 체인 JOIN] I1250 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1250" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 520. [3차 체인 JOIN] I1250 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 521. [3차 체인 JOIN] I2500 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 522. [3차 체인 JOIN] I-0020 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 523. [3차 체인 JOIN] I-0020 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 524. [3차 체인 JOIN] I0030 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 525. [3차 체인 JOIN] I-0020 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRDLST_NM" AS "B_PRDLST_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 526. [3차 체인 JOIN] I-0020 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRDLST_NM" AS "C_PRDLST_NM"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 527. [3차 체인 JOIN] I0310 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRDLST_NM" AS "A_PRDLST_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0310" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 528. [3차 체인 JOIN] C002 <-> I1250 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 529. [3차 체인 JOIN] C002 <-> I1250 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 530. [3차 체인 JOIN] C002 <-> I2500 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 531. [3차 체인 JOIN] C002 <-> I2560 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 532. [3차 체인 JOIN] I1250 <-> C002 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 533. [3차 체인 JOIN] I1250 <-> C002 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 534. [3차 체인 JOIN] I0950 <-> I2600 <-> I2590
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 805건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 535. [3차 체인 JOIN] I0950 <-> I2530 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 789건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 536. [3차 체인 JOIN] I0950 <-> I2600 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 789건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 537. [3차 체인 JOIN] I2530 <-> I0950 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 789건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 538. [3차 체인 JOIN] I2510 <-> I2600 <-> I2590
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 788건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 539. [3차 체인 JOIN] I0940 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 724건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 540. [3차 체인 JOIN] C003 <-> I0030 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 541. [3차 체인 JOIN] C003 <-> I2852 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 542. [3차 체인 JOIN] I0030 <-> C003 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 686건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 543. [3차 체인 JOIN] I1230 <-> I1250 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 544. [3차 체인 JOIN] I1230 <-> I1250 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 545. [3차 체인 JOIN] I1230 <-> I2500 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 546. [3차 체인 JOIN] I1230 <-> I2560 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 547. [3차 체인 JOIN] I1250 <-> I1230 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 548. [3차 체인 JOIN] I1250 <-> I1230 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 549. [3차 체인 JOIN] I-0020 <-> I0030 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 550. [3차 체인 JOIN] I-0020 <-> I2852 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 551. [3차 체인 JOIN] I0030 <-> I-0020 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 552. [3차 체인 JOIN] I0030 <-> I0630 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 553. [3차 체인 JOIN] I0030 <-> I2852 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I0030" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 554. [3차 체인 JOIN] I0630 <-> I0030 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0630" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 555. [3차 체인 JOIN] I1300 <-> I1310 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 556. [3차 체인 JOIN] I1300 <-> I1310 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 557. [3차 체인 JOIN] I1300 <-> I2500 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 558. [3차 체인 JOIN] I1300 <-> I2560 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 559. [3차 체인 JOIN] I1310 <-> I1300 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 560. [3차 체인 JOIN] I1310 <-> I1300 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 561. [3차 체인 JOIN] I1310 <-> I2500 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1310" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 562. [3차 체인 JOIN] I1310 <-> I2560 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1310" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 563. [3차 체인 JOIN] I2500 <-> I1310 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 564. [3차 체인 JOIN] I2530 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 171건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 565. [3차 체인 JOIN] I2530 <-> I2580 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 566. [3차 체인 JOIN] I2530 <-> I2610 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 567. [3차 체인 JOIN] I2580 <-> I2530 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 568. [3차 체인 JOIN] I2580 <-> I2600 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 569. [3차 체인 JOIN] I2580 <-> I2610 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 570. [3차 체인 JOIN] I2600 <-> I2580 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 571. [3차 체인 JOIN] I0950 <-> I2600 <-> I2510
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 100건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."LV" AS "C_LV",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 572. [3차 체인 JOIN] I2590 <-> I2600 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 100건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    A."SPEC_NM" AS "A_SPEC_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 573. [3차 체인 JOIN] C003 <-> I-0020 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 574. [3차 체인 JOIN] C003 <-> I0630 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 575. [3차 체인 JOIN] C003 <-> I2852 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 576. [3차 체인 JOIN] C003 <-> I2852 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 577. [3차 체인 JOIN] I-0020 <-> C003 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 578. [3차 체인 JOIN] I0630 <-> C003 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 98건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0630" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 579. [3차 체인 JOIN] I2530 <-> I2600 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 580. [3차 체인 JOIN] I2530 <-> I2610 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 581. [3차 체인 JOIN] I2600 <-> I2530 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 582. [3차 체인 JOIN] I0950 <-> I2600 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 583. [3차 체인 JOIN] I0950 <-> I2610 <-> I2600
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 584. [3차 체인 JOIN] I2600 <-> I0950 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2600" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 585. [3차 체인 JOIN] I-0020 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."GMP_APPN_NO" AS "B_GMP_APPN_NO",
    B."APPN_DT" AS "B_APPN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 586. [3차 체인 JOIN] I-0020 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."GMP_APPN_NO" AS "C_GMP_APPN_NO",
    C."APPN_DT" AS "C_APPN_DT"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 587. [3차 체인 JOIN] I0630 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "A_GMP_APPN_NO",
    A."APPN_DT" AS "A_APPN_DT",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0630" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 588. [3차 체인 JOIN] I2510 <-> I2600 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 25건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_SEQ" AS "B_CMMN_SPEC_SEQ",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 589. [3차 체인 JOIN] I0950 <-> I2580 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."INDV_SPEC_SEQ" AS "B_INDV_SPEC_SEQ",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 590. [3차 체인 JOIN] I0950 <-> I2610 <-> I2580
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 591. [3차 체인 JOIN] I2580 <-> I0950 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 13건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "A_INDV_SPEC_SEQ",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2580" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 592. [3차 체인 JOIN] I1230 <-> I2500 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 593. [3차 체인 JOIN] I1230 <-> I2560 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 594. [3차 체인 JOIN] I2500 <-> I1230 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 595. [3차 체인 JOIN] I0950 <-> I2530 <-> I2610
--   조인 관계: I0950 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."TESTITM_CD" AS "B_TESTITM_CD",
    B."KOR_NM" AS "B_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I0950" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 596. [3차 체인 JOIN] I0950 <-> I2610 <-> I2530
--   조인 관계: I0950 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "A_PRDLST_CD",
    A."PC_KOR_NM" AS "A_PC_KOR_NM",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."TESTITM_CD" AS "C_TESTITM_CD",
    C."KOR_NM" AS "C_KOR_NM"
FROM "I0950" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 597. [3차 체인 JOIN] I2510 <-> I2610 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."INDV_SPEC_SEQ" AS "C_INDV_SPEC_SEQ",
    C."PRDLST_CD" AS "C_PRDLST_CD"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 598. [3차 체인 JOIN] I2530 <-> I0950 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I0950 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2530" A
INNER JOIN "I0950" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 599. [3차 체인 JOIN] I2500 <-> I2560 <-> I2832
--   조인 관계: I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2832
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2832" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 600. [3차 체인 JOIN] I2500 <-> I2832 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I2832 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I2832" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 601. [3차 체인 JOIN] I2560 <-> I2500 <-> I2832
--   조인 관계: I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2832
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2560" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2832" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 602. [3차 체인 JOIN] C002 <-> I2500 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 603. [3차 체인 JOIN] C002 <-> I2560 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 604. [3차 체인 JOIN] I2500 <-> C002 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 605. [3차 체인 JOIN] C002 <-> I0060 <-> I1540
--   조인 관계: C002 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRSDNT_NM" AS "B_PRSDNT_NM",
    C."EVL_SEQ" AS "C_EVL_SEQ",
    C."EVL_PLAN_DT" AS "C_EVL_PLAN_DT"
FROM "C002" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 606. [3차 체인 JOIN] C002 <-> I1540 <-> I0060
--   조인 관계: C002 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0060
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."EVL_SEQ" AS "B_EVL_SEQ",
    B."EVL_PLAN_DT" AS "B_EVL_PLAN_DT",
    C."BSSH_NM" AS "C_BSSH_NM",
    C."PRSDNT_NM" AS "C_PRSDNT_NM"
FROM "C002" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0060" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 607. [3차 체인 JOIN] I0060 <-> C002 <-> I1540
--   조인 관계: I0060 --(LCNS_NO)-->C002 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRSDNT_NM" AS "A_PRSDNT_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."EVL_SEQ" AS "C_EVL_SEQ",
    C."EVL_PLAN_DT" AS "C_EVL_PLAN_DT"
FROM "I0060" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 608. [3차 체인 JOIN] I1300 <-> I2500 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 609. [3차 체인 JOIN] I1300 <-> I2560 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 610. [3차 체인 JOIN] I2500 <-> I1300 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 611. [3차 체인 JOIN] I2510 <-> I2610 <-> I2600
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "A_LV",
    A."PRDLST_CD" AS "A_PRDLST_CD",
    B."CMMN_SPEC_CD" AS "B_CMMN_SPEC_CD",
    B."SPEC_NM" AS "B_SPEC_NM",
    C."CMMN_SPEC_SEQ" AS "C_CMMN_SPEC_SEQ",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 612. [3차 체인 JOIN] I1220 <-> I2500 <-> I2560
--   조인 관계: I1220 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."INDUTY_CD_NM" AS "B_INDUTY_CD_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I1220" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 613. [3차 체인 JOIN] I1220 <-> I2560 <-> I2500
--   조인 관계: I1220 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."BSSH_NM" AS "A_BSSH_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."INDUTY_CD_NM" AS "C_INDUTY_CD_NM"
FROM "I1220" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 614. [3차 체인 JOIN] I2500 <-> I1220 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1220 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "A_LCNS_NO",
    A."INDUTY_CD_NM" AS "A_INDUTY_CD_NM",
    B."LCNS_NO" AS "B_LCNS_NO",
    B."BSSH_NM" AS "B_BSSH_NM",
    C."LCNS_NO" AS "C_LCNS_NO",
    C."BSSH_NM" AS "C_BSSH_NM"
FROM "I2500" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 615. [3차 체인 JOIN] I0060 <-> I1540 <-> I2852
--   조인 관계: I0060 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRSDNT_NM" AS "A_PRSDNT_NM",
    B."EVL_SEQ" AS "B_EVL_SEQ",
    B."EVL_PLAN_DT" AS "B_EVL_PLAN_DT",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I0060" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 616. [3차 체인 JOIN] I0060 <-> I2852 <-> I1540
--   조인 관계: I0060 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "A_BSSH_NM",
    A."PRSDNT_NM" AS "A_PRSDNT_NM",
    B."PRDLST_REPORT_NO" AS "B_PRDLST_REPORT_NO",
    B."PRMS_DT" AS "B_PRMS_DT",
    C."EVL_SEQ" AS "C_EVL_SEQ",
    C."EVL_PLAN_DT" AS "C_EVL_PLAN_DT"
FROM "I0060" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 617. [3차 체인 JOIN] I1540 <-> I0060 <-> I2852
--   조인 관계: I1540 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."EVL_SEQ" AS "A_EVL_SEQ",
    A."EVL_PLAN_DT" AS "A_EVL_PLAN_DT",
    B."BSSH_NM" AS "B_BSSH_NM",
    B."PRSDNT_NM" AS "B_PRSDNT_NM",
    C."PRDLST_REPORT_NO" AS "C_PRDLST_REPORT_NO",
    C."PRMS_DT" AS "C_PRMS_DT"
FROM "I1540" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 618. [3차 체인 JOIN] I2600 <-> I2510 <-> I2610
--   조인 관계: I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "A_CMMN_SPEC_SEQ",
    A."CMMN_SPEC_CD" AS "A_CMMN_SPEC_CD",
    B."LV" AS "B_LV",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    C."CMMN_SPEC_CD" AS "C_CMMN_SPEC_CD",
    C."SPEC_NM" AS "C_SPEC_NM"
FROM "I2600" A
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2610" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

