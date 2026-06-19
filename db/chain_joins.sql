-- =============================================================================
--   N차 체인 조인 자동 탐색 결과
--   기준: 실제 매칭 레코드가 존재하는 체인 조인만 포함
--   총 검증된 체인 조인: 201개
--   생성일시: 2026-06-19T11:31:15.164+09:00
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [4차 체인 JOIN] C003 <-> I0490 <-> I0960 <-> I0950
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 55,198건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2. [4차 체인 JOIN] C003 <-> I0490 <-> I0960 <-> I2580
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 38,695건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 3. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 4. [4차 체인 JOIN] C003 <-> I-0020 <-> I2860 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 5. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 6. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [4차 체인 JOIN] C003 <-> I0310 <-> I2860 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [4차 체인 JOIN] C003 <-> I0310 <-> I2860 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [4차 체인 JOIN] C003 <-> I0630 <-> I2860 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,072건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [4차 체인 JOIN] C003 <-> I0030 <-> I2860 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 33,072건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0310" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,072건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [4차 체인 JOIN] C003 <-> I0310 <-> I2860 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 33,072건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [4차 체인 JOIN] C003 <-> I-0020 <-> I2860 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [4차 체인 JOIN] C003 <-> I0030 <-> I2860 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [4차 체인 JOIN] C003 <-> I0030 <-> I2860 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [4차 체인 JOIN] C003 <-> I0630 <-> I2860 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [4차 체인 JOIN] C003 <-> I0490 <-> I0960 <-> I0940
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960 --(TESTITM_CD)-->I0940
--   실제 매칭 레코드: 22,022건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0940" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [4차 체인 JOIN] C003 <-> I0490 <-> I2580 <-> I0960
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 15,981건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [4차 체인 JOIN] C003 <-> I0490 <-> I0960 <-> I2600
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 15,444건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 26. [4차 체인 JOIN] C003 <-> I0030 <-> I0490 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 9,666건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 27. [4차 체인 JOIN] C003 <-> I0030 <-> I2860 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 9,666건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 28. [4차 체인 JOIN] C003 <-> I0490 <-> I0030 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 9,666건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 29. [4차 체인 JOIN] C003 <-> I0490 <-> I2860 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 9,666건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 30. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 31. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 32. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 33. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 34. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 35. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 36. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 37. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 38. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 39. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 40. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 41. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 42. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 43. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 44. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 45. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 46. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 47. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 48. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 49. [4차 체인 JOIN] C003 <-> I-0020 <-> I2860 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 50. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 51. [4차 체인 JOIN] C003 <-> I0630 <-> I2860 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 52. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 53. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 54. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 55. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 56. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 57. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 58. [4차 체인 JOIN] C003 <-> I0490 <-> I2580 <-> I0950
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 4,053건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 59. [4차 체인 JOIN] C003 <-> I-0020 <-> I0490 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 60. [4차 체인 JOIN] C003 <-> I-0020 <-> I2860 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 61. [4차 체인 JOIN] C003 <-> I0490 <-> I-0020 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 62. [4차 체인 JOIN] C003 <-> I0490 <-> I0630 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 63. [4차 체인 JOIN] C003 <-> I0490 <-> I2860 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 64. [4차 체인 JOIN] C003 <-> I0490 <-> I2860 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 65. [4차 체인 JOIN] C003 <-> I0630 <-> I0490 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."BSSH_NM" AS "업소명",
    D."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2860" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 66. [4차 체인 JOIN] C003 <-> I0630 <-> I2860 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 67. [4차 체인 JOIN] C003 <-> I0030 <-> I0490 <-> I0960
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960
--   실제 매칭 레코드: 2,204건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0960" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 68. [4차 체인 JOIN] C003 <-> I0490 <-> I2580 <-> I0940
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0940
--   실제 매칭 레코드: 2,100건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0940" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 69. [4차 체인 JOIN] C003 <-> I0490 <-> I2580 <-> I2600
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 1,932건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 70. [4차 체인 JOIN] C001 <-> I0490 <-> I0940 <-> I0960
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 1,374건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 71. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 72. [4차 체인 JOIN] C003 <-> I-0020 <-> I0490 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 73. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 74. [4차 체인 JOIN] C003 <-> I0030 <-> I0490 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 75. [4차 체인 JOIN] C003 <-> I0030 <-> I0490 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 76. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 77. [4차 체인 JOIN] C003 <-> I0490 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 78. [4차 체인 JOIN] C003 <-> I0490 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 79. [4차 체인 JOIN] C003 <-> I0490 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 80. [4차 체인 JOIN] C003 <-> I0490 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 81. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 82. [4차 체인 JOIN] C003 <-> I0630 <-> I0490 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0030" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 83. [4차 체인 JOIN] C002 <-> I1250 <-> I2500 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 84. [4차 체인 JOIN] C002 <-> I1250 <-> I2560 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 85. [4차 체인 JOIN] C002 <-> I2500 <-> I1250 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 86. [4차 체인 JOIN] C002 <-> I2500 <-> I2560 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 87. [4차 체인 JOIN] C002 <-> I2560 <-> I1250 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 88. [4차 체인 JOIN] C002 <-> I2560 <-> I2500 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 89. [4차 체인 JOIN] C001 <-> I0490 <-> I0940 <-> I0950
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 579건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 90. [4차 체인 JOIN] C003 <-> I-0020 <-> I0490 <-> I0960
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960
--   실제 매칭 레코드: 572건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0960" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 91. [4차 체인 JOIN] C003 <-> I0630 <-> I0490 <-> I0960
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960
--   실제 매칭 레코드: 572건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0960" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 92. [4차 체인 JOIN] C001 <-> I0490 <-> I0940 <-> I2580
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 533건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 93. [4차 체인 JOIN] C001 <-> I0490 <-> I2580 <-> I0960
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 458건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 94. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I0960
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0960
--   실제 매칭 레코드: 458건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0960" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 95. [4차 체인 JOIN] C003 <-> I-0020 <-> I0490 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 96. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 97. [4차 체인 JOIN] C003 <-> I0490 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0630" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 98. [4차 체인 JOIN] C003 <-> I0490 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 99. [4차 체인 JOIN] C003 <-> I0490 <-> I0960 <-> I2530
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 100. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDTNM" AS "제품명",
    D."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0490" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 101. [4차 체인 JOIN] C003 <-> I0630 <-> I0490 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I-0020" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 102. [4차 체인 JOIN] C003 <-> I0030 <-> I0490 <-> I2580
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 252건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2580" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 103. [4차 체인 JOIN] C001 <-> I0490 <-> I2580 <-> I0940
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0940
--   실제 매칭 레코드: 238건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0940" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 104. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I2580
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 200건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2580" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 105. [4차 체인 JOIN] C001 <-> I0490 <-> I2580 <-> I0950
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 193건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 106. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I0950
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0950
--   실제 매칭 레코드: 193건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0950" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 107. [4차 체인 JOIN] C001 <-> I0490 <-> I0940 <-> I2600
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 166건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 108. [4차 체인 JOIN] C003 <-> I-0020 <-> I0490 <-> I2580
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 126건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2580" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 109. [4차 체인 JOIN] C003 <-> I0630 <-> I0490 <-> I2580
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 126건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2580" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 110. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I0940
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0940
--   실제 매칭 레코드: 105건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I0940" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 111. [4차 체인 JOIN] C003 <-> I0490 <-> I2580 <-> I2530
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 105건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 112. [4차 체인 JOIN] C001 <-> I0490 <-> I2580 <-> I2600
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 54건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2600" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 113. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 114. [4차 체인 JOIN] C003 <-> I-0020 <-> I2852 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 115. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 116. [4차 체인 JOIN] C003 <-> I0630 <-> I2852 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 117. [4차 체인 JOIN] C003 <-> I2852 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 118. [4차 체인 JOIN] C001 <-> I1260 <-> I0490 <-> I0940
--   조인 관계: C001 --(LCNS_NO)-->I1260 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940
--   실제 매칭 레코드: 19건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."PRDLST_CD" AS "품목코드",
    D."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0940" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 119. [4차 체인 JOIN] C001 <-> I0490 <-> I0940 <-> I2530
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 120. [4차 체인 JOIN] C002 <-> I0080 <-> I2500 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0080" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 121. [4차 체인 JOIN] C002 <-> I0080 <-> I2560 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I0080" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 122. [4차 체인 JOIN] C002 <-> I2500 <-> I0080 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0080" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2560" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 123. [4차 체인 JOIN] C002 <-> I2500 <-> I2560 <-> I0080
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I0080
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0080" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 124. [4차 체인 JOIN] C002 <-> I2560 <-> I0080 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0080" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2500" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 125. [4차 체인 JOIN] C002 <-> I2560 <-> I2500 <-> I0080
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I0080
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0080" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 126. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I2590
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2590" D
  ON C."CMMN_SPEC_CD" = D."CMMN_SPEC_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 127. [4차 체인 JOIN] C001 <-> I1260 <-> I0490 <-> I2580
--   조인 관계: C001 --(LCNS_NO)-->I1260 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2580" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 128. [4차 체인 JOIN] C001 <-> I1260 <-> I0490 <-> I2600
--   조인 관계: C001 --(LCNS_NO)-->I1260 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I2600" D
  ON C."PRDLST_CD" = D."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 129. [4차 체인 JOIN] C001 <-> I0490 <-> I2580 <-> I2530
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 4건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 130. [4차 체인 JOIN] C002 <-> I0060 <-> I0680 <-> I1540
--   조인 관계: C002 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."EVL_SEQ" AS "평가일련번호",
    D."EVL_PLAN_DT" AS "평가계획일자"
FROM "C002" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0680" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1540" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 131. [4차 체인 JOIN] C002 <-> I0060 <-> I1540 <-> I0680
--   조인 관계: C002 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0680
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0680" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 132. [4차 체인 JOIN] C002 <-> I0680 <-> I0060 <-> I1540
--   조인 관계: C002 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRSDNT_NM" AS "대표자명",
    D."EVL_SEQ" AS "평가일련번호",
    D."EVL_PLAN_DT" AS "평가계획일자"
FROM "C002" A
INNER JOIN "I0680" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0060" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I1540" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 133. [4차 체인 JOIN] C002 <-> I0680 <-> I1540 <-> I0060
--   조인 관계: C002 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0060
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자",
    D."BSSH_NM" AS "업소명",
    D."PRSDNT_NM" AS "대표자명"
FROM "C002" A
INNER JOIN "I0680" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0060" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 134. [4차 체인 JOIN] C002 <-> I1540 <-> I0060 <-> I0680
--   조인 관계: C002 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I0680
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."EVL_SEQ" AS "평가일련번호",
    B."EVL_PLAN_DT" AS "평가계획일자",
    C."BSSH_NM" AS "업소명",
    C."PRSDNT_NM" AS "대표자명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0060" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0680" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 135. [4차 체인 JOIN] C002 <-> I1540 <-> I0680 <-> I0060
--   조인 관계: C002 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I0060
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."EVL_SEQ" AS "평가일련번호",
    B."EVL_PLAN_DT" AS "평가계획일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRSDNT_NM" AS "대표자명"
FROM "C002" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0680" C
  ON B."LCNS_NO" = C."LCNS_NO"
INNER JOIN "I0060" D
  ON C."LCNS_NO" = D."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 136. [4차 체인 JOIN] C001 <-> I0490 <-> I2600 <-> I2530
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
INNER JOIN "I2530" D
  ON C."TESTITM_CD" = D."TESTITM_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 137. [3차 체인 JOIN] C003 <-> I0310 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 138. [3차 체인 JOIN] C003 <-> I2860 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 33,657건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I2860" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 139. [3차 체인 JOIN] C003 <-> I0030 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 140. [3차 체인 JOIN] C003 <-> I2860 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 23,115건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I2860" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 141. [3차 체인 JOIN] C003 <-> I-0020 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 142. [3차 체인 JOIN] C003 <-> I0310 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 143. [3차 체인 JOIN] C003 <-> I0310 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 144. [3차 체인 JOIN] C003 <-> I0630 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 145. [3차 체인 JOIN] C003 <-> I0030 <-> I0310
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 146. [3차 체인 JOIN] C003 <-> I0310 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 147. [3차 체인 JOIN] C003 <-> I-0020 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 148. [3차 체인 JOIN] C003 <-> I0630 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 149. [3차 체인 JOIN] C003 <-> I2860 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I2860" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 150. [3차 체인 JOIN] C003 <-> I2860 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,672건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I2860" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 151. [3차 체인 JOIN] C003 <-> I-0020 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 152. [3차 체인 JOIN] C003 <-> I0030 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 153. [3차 체인 JOIN] C003 <-> I0030 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 154. [3차 체인 JOIN] C003 <-> I0630 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 155. [3차 체인 JOIN] C003 <-> I0490 <-> I2860
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I2860
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2860" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 156. [3차 체인 JOIN] C003 <-> I2860 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I2860 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 2,448건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I2860" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 157. [3차 체인 JOIN] C002 <-> I0300 <-> I1220
--   조인 관계: C002 --(LCNS_NO)-->I0300 --(LCNS_NO)-->I1220
--   실제 매칭 레코드: 1,488건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1220" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 158. [3차 체인 JOIN] C002 <-> I1220 <-> I0300
--   조인 관계: C002 --(LCNS_NO)-->I1220 --(LCNS_NO)-->I0300
--   실제 매칭 레코드: 1,488건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0300" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 159. [3차 체인 JOIN] C003 <-> I0030 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 160. [3차 체인 JOIN] C003 <-> I0490 <-> I0030
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,102건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 161. [3차 체인 JOIN] C003 <-> I-0020 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 162. [3차 체인 JOIN] C003 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 163. [3차 체인 JOIN] C002 <-> I1250 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 164. [3차 체인 JOIN] C002 <-> I1250 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 165. [3차 체인 JOIN] C002 <-> I2500 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 166. [3차 체인 JOIN] C002 <-> I2560 <-> I1250
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 167. [3차 체인 JOIN] C003 <-> I0490 <-> I0960
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0960
--   실제 매칭 레코드: 572건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0960" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 168. [3차 체인 JOIN] C003 <-> I-0020 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 169. [3차 체인 JOIN] C003 <-> I0490 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 170. [3차 체인 JOIN] C003 <-> I0490 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 171. [3차 체인 JOIN] C003 <-> I0630 <-> I0490
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 286건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 172. [3차 체인 JOIN] C003 <-> I0490 <-> I2580
--   조인 관계: C003 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 126건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "C003" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 173. [3차 체인 JOIN] C002 <-> I1220 <-> I2859
--   조인 관계: C002 --(LCNS_NO)-->I1220 --(LCNS_NO)-->I2859
--   실제 매칭 레코드: 82건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2859" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 174. [3차 체인 JOIN] C002 <-> I2859 <-> I1220
--   조인 관계: C002 --(LCNS_NO)-->I2859 --(LCNS_NO)-->I1220
--   실제 매칭 레코드: 82건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2859" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1220" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 175. [3차 체인 JOIN] C002 <-> I0580 <-> I2852
--   조인 관계: C002 --(LCNS_NO)-->I0580 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 46건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."INDUTY_CD_NM" AS "업종",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "C002" A
INNER JOIN "I0580" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 176. [3차 체인 JOIN] C002 <-> I2852 <-> I0580
--   조인 관계: C002 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0580
--   실제 매칭 레코드: 46건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가번호",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0580" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 177. [3차 체인 JOIN] C003 <-> I-0020 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "C003" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 178. [3차 체인 JOIN] C003 <-> I0630 <-> I2852
--   조인 관계: C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "C003" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 179. [3차 체인 JOIN] C003 <-> I2852 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I-0020" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 180. [3차 체인 JOIN] C003 <-> I2852 <-> I0630
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "C003" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 181. [3차 체인 JOIN] C001 <-> I0490 <-> I0940
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I0940
--   실제 매칭 레코드: 19건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0940" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 182. [3차 체인 JOIN] C002 <-> I0080 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I0080" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 183. [3차 체인 JOIN] C002 <-> I0080 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I0080 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0080" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 184. [3차 체인 JOIN] C002 <-> I2500 <-> I0080
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I0080
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0080" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 185. [3차 체인 JOIN] C002 <-> I2560 <-> I0080
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I0080
--   실제 매칭 레코드: 8건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."CHILD_FFQ_CRTFC_NO" AS "인증번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0080" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 186. [3차 체인 JOIN] C001 <-> I0490 <-> I2580
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2580
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2580" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 187. [3차 체인 JOIN] C001 <-> I0490 <-> I2600
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(PRDLST_CD)-->I2600
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2600" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 188. [3차 체인 JOIN] C002 <-> I0580 <-> I1220
--   조인 관계: C002 --(LCNS_NO)-->I0580 --(LCNS_NO)-->I1220
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0580" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1220" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 189. [3차 체인 JOIN] C002 <-> I1220 <-> I0580
--   조인 관계: C002 --(LCNS_NO)-->I1220 --(LCNS_NO)-->I0580
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0580" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 190. [3차 체인 JOIN] C002 <-> I2500 <-> I2560
--   조인 관계: C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 191. [3차 체인 JOIN] C002 <-> I2560 <-> I2500
--   조인 관계: C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "C002" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 192. [3차 체인 JOIN] C002 <-> I0680 <-> I1540
--   조인 관계: C002 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 4건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자"
FROM "C002" A
INNER JOIN "I0680" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 193. [3차 체인 JOIN] C002 <-> I1540 <-> I0680
--   조인 관계: C002 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0680
--   실제 매칭 레코드: 4건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."EVL_SEQ" AS "평가일련번호",
    B."EVL_PLAN_DT" AS "평가계획일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0680" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 194. [3차 체인 JOIN] C001 <-> I0490 <-> I1260
--   조인 관계: C001 --(LCNS_NO)-->I0490 --(LCNS_NO)-->I1260
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDTNM" AS "제품명",
    B."RTRVLPRVNS" AS "회수사유",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C001" A
INNER JOIN "I0490" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1260" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 195. [3차 체인 JOIN] C001 <-> I1260 <-> I0490
--   조인 관계: C001 --(LCNS_NO)-->I1260 --(LCNS_NO)-->I0490
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDTNM" AS "제품명",
    C."RTRVLPRVNS" AS "회수사유"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0490" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 196. [3차 체인 JOIN] C002 <-> I0060 <-> I0680
--   조인 관계: C002 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I0680
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "C002" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0680" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 197. [3차 체인 JOIN] C002 <-> I0060 <-> I1540
--   조인 관계: C002 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자"
FROM "C002" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 198. [3차 체인 JOIN] C002 <-> I0680 <-> I0060
--   조인 관계: C002 --(LCNS_NO)-->I0680 --(LCNS_NO)-->I0060
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRSDNT_NM" AS "대표자명"
FROM "C002" A
INNER JOIN "I0680" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0060" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 199. [3차 체인 JOIN] C002 <-> I1540 <-> I0060
--   조인 관계: C002 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I0060
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."EVL_SEQ" AS "평가일련번호",
    B."EVL_PLAN_DT" AS "평가계획일자",
    C."BSSH_NM" AS "업소명",
    C."PRSDNT_NM" AS "대표자명"
FROM "C002" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0060" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 200. [3차 체인 JOIN] C001 <-> I0250 <-> I1260
--   조인 관계: C001 --(LCNS_NO)-->I0250 --(LCNS_NO)-->I1260
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."EXCLNC_INCM_BSSH_REGNO" AS "우수수입업소등록번호",
    B."PRMS_DT" AS "허가일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명"
FROM "C001" A
INNER JOIN "I0250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1260" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 201. [3차 체인 JOIN] C001 <-> I1260 <-> I0250
--   조인 관계: C001 --(LCNS_NO)-->I1260 --(LCNS_NO)-->I0250
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."EXCLNC_INCM_BSSH_REGNO" AS "우수수입업소등록번호",
    C."PRMS_DT" AS "허가일자"
FROM "C001" A
INNER JOIN "I1260" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

