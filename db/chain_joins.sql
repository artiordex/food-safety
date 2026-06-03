-- =============================================================================
--   N차 체인 조인 자동 탐색 결과
--   총 검증된 체인 조인: 1개
--   생성일시: 2026-06-03T09:34:48.305Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [5차 JOIN] I2530 ↔ I0940 ↔ I0490 ↔ C001 ↔ I1260
--   조인키: TESTITM_CD, PRDLST_CD, LCNS_NO, LCNS_NO
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "A_TESTITM_CD",
    A."KOR_NM" AS "A_KOR_NM",
    B."PRDLST_CD" AS "B_PRDLST_CD",
    B."PC_KOR_NM" AS "B_PC_KOR_NM",
    C."PRDTNM" AS "C_PRDTNM",
    C."RTRVLPRVNS" AS "C_RTRVLPRVNS",
    D."LCNS_NO" AS "D_LCNS_NO",
    D."BSSH_NM" AS "D_BSSH_NM",
    E."LCNS_NO" AS "E_LCNS_NO",
    E."BSSH_NM" AS "E_BSSH_NM"
FROM "I2530" A
INNER JOIN "I0940" B ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I0490" C ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "C001" D ON C."LCNS_NO" = D."LCNS_NO"
INNER JOIN "I1260" E ON D."LCNS_NO" = E."LCNS_NO"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

