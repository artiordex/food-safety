-- =============================================================================
--   N차 체인 조인 자동 탐색 결과
--   기준: 실제 매칭 레코드가 존재하는 체인 조인만 포함
--   총 검증된 체인 조인: 294개
--   생성일시: 2026-06-17T18:46:56.691+09:00
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 2. [4차 체인 JOIN] I2580 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 3. [4차 체인 JOIN] I0940 <-> I2530 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 4. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 5. [4차 체인 JOIN] I0940 <-> I2580 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 6. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
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
-- 7. [4차 체인 JOIN] I0940 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 8. [4차 체인 JOIN] I0940 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
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
-- 9. [4차 체인 JOIN] I2530 <-> I0940 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 10. [4차 체인 JOIN] I2530 <-> I0940 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 11. [4차 체인 JOIN] I2530 <-> I2580 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 12. [4차 체인 JOIN] I2530 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 13. [4차 체인 JOIN] I2580 <-> I0940 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 14. [4차 체인 JOIN] I2580 <-> I2530 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,338건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 15. [4차 체인 JOIN] I0940 <-> I2580 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 81,701건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."LV" AS "레벨",
    D."PRDLST_CD" AS "품목코드"
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
-- 16. [4차 체인 JOIN] I2510 <-> I2600 <-> I0940 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 81,701건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 17. [4차 체인 JOIN] I2530 <-> I2580 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 18. [4차 체인 JOIN] I2580 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 19. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0630
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
-- 20. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0310
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
-- 21. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0630
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
-- 22. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I-0020
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
-- 23. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0310
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
-- 24. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I-0020
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
-- 25. [4차 체인 JOIN] I-0020 <-> C003 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 26. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 27. [4차 체인 JOIN] I-0020 <-> I0310 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 28. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 29. [4차 체인 JOIN] I0310 <-> C003 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 30. [4차 체인 JOIN] I0310 <-> I-0020 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 31. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0310
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
-- 32. [4차 체인 JOIN] C003 <-> I-0020 <-> I0310 <-> I0030
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
-- 33. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0310
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
-- 34. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I-0020
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
-- 35. [4차 체인 JOIN] C003 <-> I0030 <-> I0310 <-> I0630
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
-- 36. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I0310
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
-- 37. [4차 체인 JOIN] C003 <-> I0310 <-> I-0020 <-> I0030
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
-- 38. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I-0020
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
-- 39. [4차 체인 JOIN] C003 <-> I0310 <-> I0030 <-> I0630
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
-- 40. [4차 체인 JOIN] C003 <-> I0310 <-> I0630 <-> I0030
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
-- 41. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I0310
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
-- 42. [4차 체인 JOIN] C003 <-> I0630 <-> I0310 <-> I0030
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
-- 43. [4차 체인 JOIN] I-0020 <-> C003 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 44. [4차 체인 JOIN] I-0020 <-> C003 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 45. [4차 체인 JOIN] I-0020 <-> I0030 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 46. [4차 체인 JOIN] I-0020 <-> I0310 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 47. [4차 체인 JOIN] I0030 <-> C003 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 48. [4차 체인 JOIN] I0030 <-> C003 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 49. [4차 체인 JOIN] I0030 <-> C003 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 50. [4차 체인 JOIN] I0030 <-> I-0020 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 51. [4차 체인 JOIN] I0030 <-> I0310 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 52. [4차 체인 JOIN] I0030 <-> I0630 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 53. [4차 체인 JOIN] I0310 <-> C003 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 54. [4차 체인 JOIN] I0310 <-> I0030 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 55. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 56. [4차 체인 JOIN] I2530 <-> I0940 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 57. [4차 체인 JOIN] C003 <-> I-0020 <-> I0030 <-> I0630
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
-- 58. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I0030
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
-- 59. [4차 체인 JOIN] C003 <-> I0030 <-> I-0020 <-> I0630
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
-- 60. [4차 체인 JOIN] C003 <-> I0030 <-> I0630 <-> I-0020
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
-- 61. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I0030
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
-- 62. [4차 체인 JOIN] C003 <-> I0630 <-> I0030 <-> I-0020
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
-- 63. [4차 체인 JOIN] I-0020 <-> C003 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 64. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 65. [4차 체인 JOIN] I-0020 <-> I0030 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 66. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 67. [4차 체인 JOIN] I0030 <-> C003 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 68. [4차 체인 JOIN] I0030 <-> I-0020 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 69. [4차 체인 JOIN] I2510 <-> I2600 <-> I2530 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 70. [4차 체인 JOIN] I2510 <-> I2600 <-> I2580 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
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
-- 71. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 72. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 73. [4차 체인 JOIN] I-0020 <-> I0310 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 74. [4차 체인 JOIN] I-0020 <-> I0310 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 75. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 76. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 77. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 78. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 79. [4차 체인 JOIN] I0030 <-> I0310 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 80. [4차 체인 JOIN] I0030 <-> I0630 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."BSSH_NM" AS "업소명",
    D."PRDLST_NM" AS "품목명"
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
-- 81. [4차 체인 JOIN] I0310 <-> I-0020 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 82. [4차 체인 JOIN] I0310 <-> I0030 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 89. [4차 체인 JOIN] I1250 <-> C002 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
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
-- 90. [4차 체인 JOIN] I1250 <-> C002 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
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
-- 91. [4차 체인 JOIN] I1250 <-> I2500 <-> C002 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
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
-- 92. [4차 체인 JOIN] I1250 <-> I2560 <-> C002 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500
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
-- 93. [4차 체인 JOIN] I2500 <-> C002 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 94. [4차 체인 JOIN] I2500 <-> I1250 <-> C002 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 95. [4차 체인 JOIN] I0940 <-> I2530 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 723건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."LV" AS "레벨",
    D."PRDLST_CD" AS "품목코드"
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
-- 96. [4차 체인 JOIN] I2510 <-> I2600 <-> I0940 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 723건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."PRDLST_CD" AS "품목코드",
    C."PC_KOR_NM" AS "품목한글명",
    D."TESTITM_CD" AS "시험항목코드",
    D."KOR_NM" AS "한글명"
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
-- 97. [4차 체인 JOIN] I1230 <-> I1250 <-> I2500 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 98. [4차 체인 JOIN] I1230 <-> I1250 <-> I2560 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 99. [4차 체인 JOIN] I1230 <-> I2500 <-> I1250 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 100. [4차 체인 JOIN] I1230 <-> I2500 <-> I2560 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 101. [4차 체인 JOIN] I1230 <-> I2560 <-> I1250 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 102. [4차 체인 JOIN] I1230 <-> I2560 <-> I2500 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 103. [4차 체인 JOIN] I1250 <-> I1230 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 104. [4차 체인 JOIN] I1250 <-> I1230 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 105. [4차 체인 JOIN] I1250 <-> I2500 <-> I1230 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 106. [4차 체인 JOIN] I1250 <-> I2560 <-> I1230 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    D."INDUTY_CD_NM" AS "업종"
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
-- 107. [4차 체인 JOIN] I2500 <-> I1230 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 108. [4차 체인 JOIN] I2500 <-> I1250 <-> I1230 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 109. [4차 체인 JOIN] I-0020 <-> I0030 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 110. [4차 체인 JOIN] I-0020 <-> I0030 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 111. [4차 체인 JOIN] I-0020 <-> I0630 <-> I0030 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 112. [4차 체인 JOIN] I-0020 <-> I0630 <-> I2852 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 113. [4차 체인 JOIN] I-0020 <-> I2852 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 114. [4차 체인 JOIN] I-0020 <-> I2852 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소_명"
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
-- 115. [4차 체인 JOIN] I0030 <-> I-0020 <-> I0630 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 116. [4차 체인 JOIN] I0030 <-> I-0020 <-> I2852 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 117. [4차 체인 JOIN] I0030 <-> I0630 <-> I-0020 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 118. [4차 체인 JOIN] I0030 <-> I2852 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 119. [4차 체인 JOIN] I0630 <-> I-0020 <-> I0030 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 120. [4차 체인 JOIN] I0630 <-> I0030 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 121. [4차 체인 JOIN] I1300 <-> I1310 <-> I2500 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
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
-- 122. [4차 체인 JOIN] I1300 <-> I1310 <-> I2560 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
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
-- 123. [4차 체인 JOIN] I1300 <-> I2500 <-> I1310 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
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
-- 124. [4차 체인 JOIN] I1300 <-> I2500 <-> I2560 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
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
-- 125. [4차 체인 JOIN] I1300 <-> I2560 <-> I1310 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
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
-- 126. [4차 체인 JOIN] I1300 <-> I2560 <-> I2500 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
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
-- 127. [4차 체인 JOIN] I1310 <-> I1300 <-> I2500 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
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
-- 128. [4차 체인 JOIN] I1310 <-> I1300 <-> I2560 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
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
-- 129. [4차 체인 JOIN] I1310 <-> I2500 <-> I1300 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
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
-- 130. [4차 체인 JOIN] I1310 <-> I2560 <-> I1300 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
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
-- 131. [4차 체인 JOIN] I2500 <-> I1300 <-> I1310 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 132. [4차 체인 JOIN] I2500 <-> I1310 <-> I1300 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."LCNS_NO" AS "인허가번호",
    D."BSSH_NM" AS "업소명"
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
-- 133. [4차 체인 JOIN] I2580 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 134. [4차 체인 JOIN] I2590 <-> I2600 <-> I2580 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 135. [4차 체인 JOIN] I2530 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 136. [4차 체인 JOIN] I2590 <-> I2600 <-> I2530 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 137. [4차 체인 JOIN] I2530 <-> I2580 <-> I2600 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 138. [4차 체인 JOIN] I2530 <-> I2580 <-> I2610 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 139. [4차 체인 JOIN] I2530 <-> I2600 <-> I2580 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 140. [4차 체인 JOIN] I2530 <-> I2600 <-> I2610 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 141. [4차 체인 JOIN] I2530 <-> I2610 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 142. [4차 체인 JOIN] I2530 <-> I2610 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 143. [4차 체인 JOIN] I2580 <-> I2530 <-> I2600 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 144. [4차 체인 JOIN] I2580 <-> I2530 <-> I2610 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 145. [4차 체인 JOIN] I2580 <-> I2600 <-> I2530 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 146. [4차 체인 JOIN] I2580 <-> I2610 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 147. [4차 체인 JOIN] I2600 <-> I2530 <-> I2580 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 148. [4차 체인 JOIN] I2600 <-> I2580 <-> I2530 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 36건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 149. [4차 체인 JOIN] C003 <-> I-0020 <-> I0630 <-> I2852
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
-- 150. [4차 체인 JOIN] C003 <-> I-0020 <-> I2852 <-> I0630
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
-- 151. [4차 체인 JOIN] C003 <-> I0630 <-> I-0020 <-> I2852
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
-- 152. [4차 체인 JOIN] C003 <-> I0630 <-> I2852 <-> I-0020
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
-- 153. [4차 체인 JOIN] C003 <-> I2852 <-> I-0020 <-> I0630
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
-- 154. [4차 체인 JOIN] C003 <-> I2852 <-> I0630 <-> I-0020
--   조인 관계: C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I-0020
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."LCNS_NO" AS "인허가 번호",
    D."BSSH_NM" AS "업소명"
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
-- 155. [4차 체인 JOIN] I-0020 <-> C003 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 156. [4차 체인 JOIN] I-0020 <-> C003 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 157. [4차 체인 JOIN] I-0020 <-> I0630 <-> C003 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 158. [4차 체인 JOIN] I-0020 <-> I2852 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."GMP_APPN_NO" AS "GMP지정번호",
    D."APPN_DT" AS "지정일자"
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
-- 159. [4차 체인 JOIN] I0630 <-> C003 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가 번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 160. [4차 체인 JOIN] I0630 <-> I-0020 <-> C003 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명",
    D."PRDLST_REPORT_NO" AS "품목제조보고번호",
    D."PRMS_DT" AS "품목보고일자"
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
-- 161. [4차 체인 JOIN] I2510 <-> I2610 <-> I2580 <-> I2600
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 21건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 162. [4차 체인 JOIN] I2510 <-> I2610 <-> I2600 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 21건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    D."PRDLST_CD" AS "품목분류코드"
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
-- 163. [4차 체인 JOIN] I2580 <-> I2610 <-> I2510 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2600
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."LV" AS "레벨",
    C."PRDLST_CD" AS "품목코드",
    D."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    D."CMMN_SPEC_CD" AS "공통기준종류코드"
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
-- 164. [4차 체인 JOIN] I2510 <-> I2610 <-> I2600 <-> I2590
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 165. [4차 체인 JOIN] I0940 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."LV" AS "레벨",
    C."PRDLST_CD" AS "품목코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 166. [4차 체인 JOIN] I2590 <-> I2600 <-> I2510 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."LV" AS "레벨",
    C."PRDLST_CD" AS "품목코드",
    D."CMMN_SPEC_CD" AS "공통기준규격코드",
    D."SPEC_NM" AS "기준규격명"
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
-- 167. [3차 체인 JOIN] I0940 <-> I2580 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 168. [3차 체인 JOIN] I0940 <-> I2600 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 169. [3차 체인 JOIN] I2580 <-> I0940 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 589,340건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2580" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 170. [3차 체인 JOIN] I1920 <-> I1930 <-> I1940
--   조인 관계: I1920 --(HIST_TRACE_REG_NO)-->I1930 --(HIST_TRACE_REG_NO)-->I1940
--   실제 매칭 레코드: 40,084건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    A."GOODS_NM" AS "상품명",
    B."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    B."LOTNO_WRHOUSNG" AS "로트번호입고",
    C."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    C."LOTNO_RELES" AS "로트번호출고"
FROM "I1920" A
INNER JOIN "I1930" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1940" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 171. [3차 체인 JOIN] I1920 <-> I1940 <-> I1930
--   조인 관계: I1920 --(HIST_TRACE_REG_NO)-->I1940 --(HIST_TRACE_REG_NO)-->I1930
--   실제 매칭 레코드: 40,084건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    A."GOODS_NM" AS "상품명",
    B."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    B."LOTNO_RELES" AS "로트번호출고",
    C."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    C."LOTNO_WRHOUSNG" AS "로트번호입고"
FROM "I1920" A
INNER JOIN "I1940" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1930" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 172. [3차 체인 JOIN] I1930 <-> I1920 <-> I1940
--   조인 관계: I1930 --(HIST_TRACE_REG_NO)-->I1920 --(HIST_TRACE_REG_NO)-->I1940
--   실제 매칭 레코드: 40,084건
-- -----------------------------------------------------------------------------
SELECT
    A."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    A."LOTNO_WRHOUSNG" AS "로트번호입고",
    B."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    B."GOODS_NM" AS "상품명",
    C."HIST_TRACE_REG_NO" AS "이력추적등록번호",
    C."LOTNO_RELES" AS "로트번호출고"
FROM "I1930" A
INNER JOIN "I1920" B
  ON A."HIST_TRACE_REG_NO" = B."HIST_TRACE_REG_NO"
INNER JOIN "I1940" C
  ON B."HIST_TRACE_REG_NO" = C."HIST_TRACE_REG_NO"
WHERE A."HIST_TRACE_REG_NO" IS NOT NULL AND A."HIST_TRACE_REG_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 173. [3차 체인 JOIN] I0940 <-> I2530 <-> I2580
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 174. [3차 체인 JOIN] I0940 <-> I2580 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명"
FROM "I0940" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 175. [3차 체인 JOIN] I2530 <-> I0940 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 16,054건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 176. [3차 체인 JOIN] I2580 <-> I2600 <-> I2590
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 9,758건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 177. [3차 체인 JOIN] I2530 <-> I2580 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 178. [3차 체인 JOIN] I2530 <-> I2600 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 179. [3차 체인 JOIN] I2580 <-> I2530 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 9,677건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 180. [3차 체인 JOIN] C003 <-> I-0020 <-> I0310
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
-- 181. [3차 체인 JOIN] C003 <-> I0310 <-> I-0020
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
-- 182. [3차 체인 JOIN] C003 <-> I0310 <-> I0630
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
-- 183. [3차 체인 JOIN] C003 <-> I0630 <-> I0310
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
-- 184. [3차 체인 JOIN] I-0020 <-> C003 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 185. [3차 체인 JOIN] I0310 <-> C003 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 8,385건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0310" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 186. [3차 체인 JOIN] C003 <-> I0030 <-> I0310
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
-- 187. [3차 체인 JOIN] C003 <-> I0310 <-> I0030
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
-- 188. [3차 체인 JOIN] I0030 <-> C003 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 8,268건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 189. [3차 체인 JOIN] I0940 <-> I2600 <-> I2590
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 5,036건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 190. [3차 체인 JOIN] I0940 <-> I2530 <-> I2600
--   조인 관계: I0940 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I0940" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 191. [3차 체인 JOIN] I0940 <-> I2600 <-> I2530
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 192. [3차 체인 JOIN] I2530 <-> I0940 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I0940 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 5,021건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."PRDLST_CD" AS "품목코드",
    B."PC_KOR_NM" AS "품목한글명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2530" A
INNER JOIN "I0940" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 193. [3차 체인 JOIN] C003 <-> I-0020 <-> I0030
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
-- 194. [3차 체인 JOIN] C003 <-> I0030 <-> I-0020
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
-- 195. [3차 체인 JOIN] C003 <-> I0030 <-> I0630
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
-- 196. [3차 체인 JOIN] C003 <-> I0630 <-> I0030
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
-- 197. [3차 체인 JOIN] I-0020 <-> C003 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 198. [3차 체인 JOIN] I0030 <-> C003 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 4,180건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0030" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 199. [3차 체인 JOIN] I2711 <-> I2712 <-> I2713
--   조인 관계: I2711 --(LCNS_NO)-->I2712 --(LCNS_NO)-->I2713
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2711" A
INNER JOIN "I2712" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2713" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 200. [3차 체인 JOIN] I2711 <-> I2713 <-> I2712
--   조인 관계: I2711 --(LCNS_NO)-->I2713 --(LCNS_NO)-->I2712
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2711" A
INNER JOIN "I2713" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2712" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 201. [3차 체인 JOIN] I2712 <-> I2711 <-> I2713
--   조인 관계: I2712 --(LCNS_NO)-->I2711 --(LCNS_NO)-->I2713
--   실제 매칭 레코드: 4,007건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2712" A
INNER JOIN "I2711" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2713" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 202. [3차 체인 JOIN] I2510 <-> I2600 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 1,469건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 203. [3차 체인 JOIN] I-0020 <-> I0030 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 204. [3차 체인 JOIN] I-0020 <-> I0310 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 205. [3차 체인 JOIN] I0030 <-> I-0020 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 206. [3차 체인 JOIN] I0030 <-> I0310 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0030" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 207. [3차 체인 JOIN] I0030 <-> I0630 <-> I0310
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 208. [3차 체인 JOIN] I0310 <-> I0030 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,288건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0310" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 209. [3차 체인 JOIN] C003 <-> I-0020 <-> I0630
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
-- 210. [3차 체인 JOIN] C003 <-> I0630 <-> I-0020
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
-- 211. [3차 체인 JOIN] I-0020 <-> C003 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 212. [3차 체인 JOIN] I1250 <-> I2500 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1250" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 213. [3차 체인 JOIN] I1250 <-> I2560 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1250" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 214. [3차 체인 JOIN] I2500 <-> I1250 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 1,000건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 215. [3차 체인 JOIN] I-0020 <-> I0030 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 216. [3차 체인 JOIN] I-0020 <-> I0630 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 217. [3차 체인 JOIN] I0030 <-> I-0020 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 994건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 218. [3차 체인 JOIN] I-0020 <-> I0310 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I0310 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."BSSH_NM" AS "업소명",
    B."PRDLST_NM" AS "품목명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I-0020" A
INNER JOIN "I0310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 219. [3차 체인 JOIN] I-0020 <-> I0630 <-> I0310
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I0310
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."BSSH_NM" AS "업소명",
    C."PRDLST_NM" AS "품목명"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 220. [3차 체인 JOIN] I0310 <-> I-0020 <-> I0630
--   조인 관계: I0310 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 979건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRDLST_NM" AS "품목명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0310" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 221. [3차 체인 JOIN] C002 <-> I1250 <-> I2500
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
-- 222. [3차 체인 JOIN] C002 <-> I1250 <-> I2560
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
-- 223. [3차 체인 JOIN] C002 <-> I2500 <-> I1250
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
-- 224. [3차 체인 JOIN] C002 <-> I2560 <-> I1250
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
-- 225. [3차 체인 JOIN] I1250 <-> C002 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 226. [3차 체인 JOIN] I1250 <-> C002 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 862건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1250" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 227. [3차 체인 JOIN] I2510 <-> I2600 <-> I2590
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 788건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 228. [3차 체인 JOIN] I0940 <-> I2600 <-> I2510
--   조인 관계: I0940 --(TESTITM_CD)-->I2600 --(PRDLST_CD)-->I2510
--   실제 매칭 레코드: 724건
-- -----------------------------------------------------------------------------
SELECT
    A."PRDLST_CD" AS "품목코드",
    A."PC_KOR_NM" AS "품목한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."LV" AS "레벨",
    C."PRDLST_CD" AS "품목코드"
FROM "I0940" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2510" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 229. [3차 체인 JOIN] I1230 <-> I1250 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 230. [3차 체인 JOIN] I1230 <-> I1250 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I1250 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1230" A
INNER JOIN "I1250" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 231. [3차 체인 JOIN] I1230 <-> I2500 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 232. [3차 체인 JOIN] I1230 <-> I2560 <-> I1250
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1250
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1250" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 233. [3차 체인 JOIN] I1250 <-> I1230 <-> I2500
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 234. [3차 체인 JOIN] I1250 <-> I1230 <-> I2560
--   조인 관계: I1250 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 569건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1250" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 235. [3차 체인 JOIN] I-0020 <-> I0030 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I-0020" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 236. [3차 체인 JOIN] I-0020 <-> I2852 <-> I0030
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0030
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소_명"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0030" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 237. [3차 체인 JOIN] I0030 <-> I-0020 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0030" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 238. [3차 체인 JOIN] I0030 <-> I0630 <-> I2852
--   조인 관계: I0030 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0030" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 239. [3차 체인 JOIN] I0030 <-> I2852 <-> I0630
--   조인 관계: I0030 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소_명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I0030" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 240. [3차 체인 JOIN] I0630 <-> I0030 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I0030 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 243건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소_명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0630" A
INNER JOIN "I0030" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 241. [3차 체인 JOIN] I1300 <-> I1310 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 242. [3차 체인 JOIN] I1300 <-> I1310 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1300" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 243. [3차 체인 JOIN] I1300 <-> I2500 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 244. [3차 체인 JOIN] I1300 <-> I2560 <-> I1310
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I1310
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1310" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 245. [3차 체인 JOIN] I1310 <-> I1300 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 246. [3차 체인 JOIN] I1310 <-> I1300 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1310" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 247. [3차 체인 JOIN] I1310 <-> I2500 <-> I2560
--   조인 관계: I1310 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1310" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 248. [3차 체인 JOIN] I1310 <-> I2560 <-> I2500
--   조인 관계: I1310 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1310" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 249. [3차 체인 JOIN] I2500 <-> I1310 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1310 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 212건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I1310" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 250. [3차 체인 JOIN] I2530 <-> I2600 <-> I2590
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(CMMN_SPEC_CD)-->I2590
--   실제 매칭 레코드: 171건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2590" C
  ON B."CMMN_SPEC_CD" = C."CMMN_SPEC_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 251. [3차 체인 JOIN] I2530 <-> I2580 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2530" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 252. [3차 체인 JOIN] I2530 <-> I2610 <-> I2580
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 253. [3차 체인 JOIN] I2580 <-> I2530 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 163건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2580" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 254. [3차 체인 JOIN] I2580 <-> I2600 <-> I2610
--   조인 관계: I2580 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2580" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 255. [3차 체인 JOIN] I2580 <-> I2610 <-> I2600
--   조인 관계: I2580 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    A."PRDLST_CD" AS "품목분류코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2580" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 256. [3차 체인 JOIN] I2600 <-> I2580 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2580 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 118건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    B."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    B."PRDLST_CD" AS "품목분류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2600" A
INNER JOIN "I2580" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 257. [3차 체인 JOIN] I2590 <-> I2600 <-> I2610
--   조인 관계: I2590 --(CMMN_SPEC_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 100건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_CD" AS "공통기준규격코드",
    A."SPEC_NM" AS "기준규격명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2590" A
INNER JOIN "I2600" B
  ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 258. [3차 체인 JOIN] I2530 <-> I2600 <-> I2610
--   조인 관계: I2530 --(TESTITM_CD)-->I2600 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2530" A
INNER JOIN "I2600" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 259. [3차 체인 JOIN] I2530 <-> I2610 <-> I2600
--   조인 관계: I2530 --(TESTITM_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."TESTITM_CD" AS "시험항목코드",
    A."KOR_NM" AS "한글명",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2530" A
INNER JOIN "I2610" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 260. [3차 체인 JOIN] I2600 <-> I2530 <-> I2610
--   조인 관계: I2600 --(TESTITM_CD)-->I2530 --(TESTITM_CD)-->I2610
--   실제 매칭 레코드: 72건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    B."TESTITM_CD" AS "시험항목코드",
    B."KOR_NM" AS "한글명",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2600" A
INNER JOIN "I2530" B
  ON A."TESTITM_CD" = B."TESTITM_CD"
INNER JOIN "I2610" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 261. [3차 체인 JOIN] I-0020 <-> I0630 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->I0630 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 42건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."GMP_APPN_NO" AS "GMP지정번호",
    B."APPN_DT" AS "지정일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I-0020" A
INNER JOIN "I0630" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 262. [3차 체인 JOIN] I-0020 <-> I2852 <-> I0630
--   조인 관계: I-0020 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I0630
--   실제 매칭 레코드: 42건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."GMP_APPN_NO" AS "GMP지정번호",
    C."APPN_DT" AS "지정일자"
FROM "I-0020" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I0630" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 263. [3차 체인 JOIN] I0630 <-> I-0020 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->I-0020 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 42건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0630" A
INNER JOIN "I-0020" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 264. [3차 체인 JOIN] C003 <-> I-0020 <-> I2852
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
-- 265. [3차 체인 JOIN] C003 <-> I0630 <-> I2852
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
-- 266. [3차 체인 JOIN] C003 <-> I2852 <-> I-0020
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
-- 267. [3차 체인 JOIN] C003 <-> I2852 <-> I0630
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
-- 268. [3차 체인 JOIN] I-0020 <-> C003 <-> I2852
--   조인 관계: I-0020 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I-0020" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 269. [3차 체인 JOIN] I0630 <-> C003 <-> I2852
--   조인 관계: I0630 --(LCNS_NO)-->C003 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 28건
-- -----------------------------------------------------------------------------
SELECT
    A."GMP_APPN_NO" AS "GMP지정번호",
    A."APPN_DT" AS "지정일자",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0630" A
INNER JOIN "C003" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 270. [3차 체인 JOIN] I2510 <-> I2600 <-> I2530
--   조인 관계: I2510 --(PRDLST_CD)-->I2600 --(TESTITM_CD)-->I2530
--   실제 매칭 레코드: 25건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    B."CMMN_SPEC_CD" AS "공통기준종류코드",
    C."TESTITM_CD" AS "시험항목코드",
    C."KOR_NM" AS "한글명"
FROM "I2510" A
INNER JOIN "I2600" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2530" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 271. [3차 체인 JOIN] I1230 <-> I2500 <-> I2560
--   조인 관계: I1230 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1230" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 272. [3차 체인 JOIN] I1230 <-> I2560 <-> I2500
--   조인 관계: I1230 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1230" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 273. [3차 체인 JOIN] I2500 <-> I1230 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1230 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 12건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I1230" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 274. [3차 체인 JOIN] I2510 <-> I2610 <-> I2580
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2580
--   실제 매칭 레코드: 7건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."INDV_SPEC_SEQ" AS "개별기준규격일련번호",
    C."PRDLST_CD" AS "품목분류코드"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2580" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 275. [3차 체인 JOIN] I2500 <-> I2560 <-> I2832
--   조인 관계: I2500 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2832
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2832" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 276. [3차 체인 JOIN] I2500 <-> I2832 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I2832 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I2832" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 277. [3차 체인 JOIN] I2560 <-> I2500 <-> I2832
--   조인 관계: I2560 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2832
--   실제 매칭 레코드: 6건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2560" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2832" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 278. [3차 체인 JOIN] C002 <-> I2500 <-> I2560
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
-- 279. [3차 체인 JOIN] C002 <-> I2560 <-> I2500
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
-- 280. [3차 체인 JOIN] I2500 <-> C002 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->C002 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 5건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 281. [3차 체인 JOIN] C002 <-> I0060 <-> I1540
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
-- 282. [3차 체인 JOIN] C002 <-> I1540 <-> I0060
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
-- 283. [3차 체인 JOIN] I0060 <-> C002 <-> I1540
--   조인 관계: I0060 --(LCNS_NO)-->C002 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자"
FROM "I0060" A
INNER JOIN "C002" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 284. [3차 체인 JOIN] I1300 <-> I2500 <-> I2560
--   조인 관계: I1300 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1300" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 285. [3차 체인 JOIN] I1300 <-> I2560 <-> I2500
--   조인 관계: I1300 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1300" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 286. [3차 체인 JOIN] I2500 <-> I1300 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1300 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I1300" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 287. [3차 체인 JOIN] I2510 <-> I2610 <-> I2600
--   조인 관계: I2510 --(PRDLST_CD)-->I2610 --(TESTITM_CD)-->I2600
--   실제 매칭 레코드: 3건
-- -----------------------------------------------------------------------------
SELECT
    A."LV" AS "레벨",
    A."PRDLST_CD" AS "품목코드",
    B."CMMN_SPEC_CD" AS "공통기준규격코드",
    B."SPEC_NM" AS "기준규격명",
    C."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    C."CMMN_SPEC_CD" AS "공통기준종류코드"
FROM "I2510" A
INNER JOIN "I2610" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2600" C
  ON B."TESTITM_CD" = C."TESTITM_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 288. [3차 체인 JOIN] I1220 <-> I2500 <-> I2560
--   조인 관계: I1220 --(LCNS_NO)-->I2500 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    B."INDUTY_CD_NM" AS "업종",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I1220" A
INNER JOIN "I2500" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 289. [3차 체인 JOIN] I1220 <-> I2560 <-> I2500
--   조인 관계: I1220 --(LCNS_NO)-->I2560 --(LCNS_NO)-->I2500
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "인허가 번호",
    A."BSSH_NM" AS "업소명",
    B."LCNS_NO" AS "인허가번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    C."INDUTY_CD_NM" AS "업종"
FROM "I1220" A
INNER JOIN "I2560" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2500" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 290. [3차 체인 JOIN] I2500 <-> I1220 <-> I2560
--   조인 관계: I2500 --(LCNS_NO)-->I1220 --(LCNS_NO)-->I2560
--   실제 매칭 레코드: 2건
-- -----------------------------------------------------------------------------
SELECT
    A."LCNS_NO" AS "영업고유구분번호(인허가번호)",
    A."INDUTY_CD_NM" AS "업종",
    B."LCNS_NO" AS "인허가 번호",
    B."BSSH_NM" AS "업소명",
    C."LCNS_NO" AS "인허가번호",
    C."BSSH_NM" AS "업소명"
FROM "I2500" A
INNER JOIN "I1220" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2560" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 291. [3차 체인 JOIN] I0060 <-> I1540 <-> I2852
--   조인 관계: I0060 --(LCNS_NO)-->I1540 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    B."EVL_SEQ" AS "평가일련번호",
    B."EVL_PLAN_DT" AS "평가계획일자",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I0060" A
INNER JOIN "I1540" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 292. [3차 체인 JOIN] I0060 <-> I2852 <-> I1540
--   조인 관계: I0060 --(LCNS_NO)-->I2852 --(LCNS_NO)-->I1540
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."BSSH_NM" AS "업소명",
    A."PRSDNT_NM" AS "대표자명",
    B."PRDLST_REPORT_NO" AS "품목제조보고번호",
    B."PRMS_DT" AS "품목보고일자",
    C."EVL_SEQ" AS "평가일련번호",
    C."EVL_PLAN_DT" AS "평가계획일자"
FROM "I0060" A
INNER JOIN "I2852" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I1540" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 293. [3차 체인 JOIN] I1540 <-> I0060 <-> I2852
--   조인 관계: I1540 --(LCNS_NO)-->I0060 --(LCNS_NO)-->I2852
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."EVL_SEQ" AS "평가일련번호",
    A."EVL_PLAN_DT" AS "평가계획일자",
    B."BSSH_NM" AS "업소명",
    B."PRSDNT_NM" AS "대표자명",
    C."PRDLST_REPORT_NO" AS "품목제조보고번호",
    C."PRMS_DT" AS "품목보고일자"
FROM "I1540" A
INNER JOIN "I0060" B
  ON A."LCNS_NO" = B."LCNS_NO"
INNER JOIN "I2852" C
  ON B."LCNS_NO" = C."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 294. [3차 체인 JOIN] I2600 <-> I2510 <-> I2610
--   조인 관계: I2600 --(PRDLST_CD)-->I2510 --(PRDLST_CD)-->I2610
--   실제 매칭 레코드: 1건
-- -----------------------------------------------------------------------------
SELECT
    A."CMMN_SPEC_SEQ" AS "공통기준종류코드일련번호",
    A."CMMN_SPEC_CD" AS "공통기준종류코드",
    B."LV" AS "레벨",
    B."PRDLST_CD" AS "품목코드",
    C."CMMN_SPEC_CD" AS "공통기준규격코드",
    C."SPEC_NM" AS "기준규격명"
FROM "I2600" A
INNER JOIN "I2510" B
  ON A."PRDLST_CD" = B."PRDLST_CD"
INNER JOIN "I2610" C
  ON B."PRDLST_CD" = C."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

