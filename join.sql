-- =============================================================================
--   데이터 연동 검증 보고서: 실제 SQL INNER JOIN 성공 케이스 쿼리 목록
--   총 검증된 조인 성공 관계: 470개
--   생성일시: 2026-05-31T11:40:02.052Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. [HIGH] I2600.CMMN_SPEC_CD ↔ I2590.CMMN_SPEC_CD
--   - 값 일치율 (Inclusion): 100.0% (26개 / Unique 26개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["000080","000081","000084"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2600" A
INNER JOIN "I2590" B ON A."CMMN_SPEC_CD" = B."CMMN_SPEC_CD"
WHERE A."CMMN_SPEC_CD" IS NOT NULL AND A."CMMN_SPEC_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 2. [HIGH] C001.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (1000개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19880066159","19910355053","19910358063"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 3. [HIGH] I1250.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (2개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1250" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 4. [HIGH] I2859.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (345개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19670154002","19720154001","19720275004"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2859" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 5. [HIGH] I1310.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 100.0% (10개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 1,000건 매칭됨
--   - 매칭된 샘플 데이터   : ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1310" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 6. [HIGH] I2711.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 78.4% (29개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 985건 매칭됨
--   - 매칭된 샘플 데이터   : ["19879368002","19879415001","19889294002"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2711" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 7. [HIGH] I2600.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 31.7% (44개 / Unique 139개)
--   - 실제 JOIN 레코드 수 : 788건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0000000000000","A0100000000000","A0100100000000"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2600" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 8. [HIGH] I2712.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 70.6% (113개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 784건 매칭됨
--   - 매칭된 샘플 데이터   : ["11111111123","19879415001","19909614003"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 9. [HIGH] I2851.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 42.1% (72개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 721건 매칭됨
--   - 매칭된 샘플 데이터   : ["19859046001","19899221002","19909601001"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 10. [HIGH] I0960.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 60.9% (103개 / Unique 169개)
--   - 실제 JOIN 레코드 수 : 567건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10018","A10019","A10020"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0960" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 11. [SUGGESTED] I0300.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 5.6% (3개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 385건 매칭됨
--   - 매칭된 샘플 데이터   : ["20030467180","20080236134","20100530033"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 12. [HIGH] I0940.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 16.9% (12개 / Unique 71개)
--   - 실제 JOIN 레코드 수 : 230건 매칭됨
--   - 매칭된 샘플 데이터   : ["A20024","A20025","A30009"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0940" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 13. [HIGH] I1310.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 30.0% (3개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 212건 매칭됨
--   - 매칭된 샘플 데이터   : ["19640448001","19670230001","19690086016"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1310" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 14. [HIGH] I2600.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 5.4% (16개 / Unique 299개)
--   - 실제 JOIN 레코드 수 : 171건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10029","A30023","B10001"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2600" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 15. [HIGH] I0610.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 9.7% (94개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 95건 매칭됨
--   - 매칭된 샘플 데이터   : ["19760262002","19790532001","19850262004"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0610" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 16. [HIGH] I0950.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 50.0% (17개 / Unique 34개)
--   - 실제 JOIN 레코드 수 : 94건 매칭됨
--   - 매칭된 샘플 데이터   : ["A10008","A10029","A10098"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0950" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 17. [SUGGESTED] C002.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 6.3% (17개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 73건 매칭됨
--   - 매칭된 샘플 데이터   : ["19940506240","19950433026","19990461386"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 18. [HIGH] I1670.DSPS_STDR_CD ↔ I2550.DSPS_STDR_CD
--   - 값 일치율 (Inclusion): 13.4% (66개 / Unique 493개)
--   - 실제 JOIN 레코드 수 : 66건 매칭됨
--   - 매칭된 샘플 데이터   : ["00180502745000","00180527000000","00409702000000"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1670" A
INNER JOIN "I2550" B ON A."DSPS_STDR_CD" = B."DSPS_STDR_CD"
WHERE A."DSPS_STDR_CD" IS NOT NULL AND A."DSPS_STDR_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 19. [HIGH] I0080.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 11.1% (24개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 64건 매칭됨
--   - 매칭된 샘플 데이터   : ["19760262001","19760262002","19770262001"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 20. [HIGH] I2851.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 6.4% (48개 / Unique 755개)
--   - 실제 JOIN 레코드 수 : 48건 매칭됨
--   - 매칭된 샘플 데이터   : ["198992210021","199593080012","199593080013"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 21. [HIGH] I2712.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 4.8% (48개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 48건 매칭됨
--   - 매칭된 샘플 데이터   : ["19879415001133","19879415001134","19879415001135"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 22. [SUGGESTED] I0580.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 5.0% (33개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 45건 매칭됨
--   - 매칭된 샘플 데이터   : ["19930355035","19950364019","20020445130"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0580" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 23. [SUGGESTED] C006.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 9.6% (11개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 25건 매칭됨
--   - 매칭된 샘플 데이터   : ["19930405001","19960262002","20030262013"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 24. [SUGGESTED] I0080.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (5개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 25건 매칭됨
--   - 매칭된 샘플 데이터   : ["19720275004","19910461101","20040275047"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 25. [HIGH] I2610.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 57.1% (4개 / Unique 7개)
--   - 실제 JOIN 레코드 수 : 16건 매칭됨
--   - 매칭된 샘플 데이터   : ["B10002","B10004","B10006"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2610" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 26. [SUGGESTED] I0490.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 9.2% (11개 / Unique 119개)
--   - 실제 JOIN 레코드 수 : 16건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0101000004000","A0200400004000","A0300000000000"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 27. [SUGGESTED] I2852.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (2개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 13건 매칭됨
--   - 매칭된 샘플 데이터   : ["20030149214","20160263104"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 28. [SUGGESTED] I1230.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 1.2% (12개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 12건 매칭됨
--   - 매칭된 샘플 데이터   : ["19630255002","19630355001","19630364001"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1230" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 29. [HIGH] I0080.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.7% (5개 / Unique 742개)
--   - 실제 JOIN 레코드 수 : 7건 매칭됨
--   - 매칭된 샘플 데이터   : ["1977026200119","1977026200126","1977026200157"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 30. [HIGH] I0490.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 2.3% (5개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 7건 매칭됨
--   - 매칭된 샘플 데이터   : ["19910262003","19960379001","19980262029"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 31. [HIGH] I2832.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.6% (6개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 6건 매칭됨
--   - 매칭된 샘플 데이터   : ["18820308001","19680134001","19700129010"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2832" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 32. [SUGGESTED] I0310.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.5% (5개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 5건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040015191104","20040016020168","20040016020196"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 33. [SUGGESTED] C002.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 1.1% (3개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 5건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001","19660202002","19690086003"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 34. [SUGGESTED] I0080.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.5% (1개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 4건 매칭됨
--   - 매칭된 샘플 데이터   : ["19690086003"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 35. [HIGH] I2620.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 3.4% (3개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040379002","20110262008","20250371008"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 36. [HIGH] I0460.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.8% (3개 / Unique 366개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["19790257016213","19790257016801","19790257016802"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0460" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 37. [HIGH] I0480.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.8% (2개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20200363209","20250875056"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0480" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 38. [SUGGESTED] I0490.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 1.4% (3개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 3건 매칭됨
--   - 매칭된 샘플 데이터   : ["20010114979","20130036663","20190014192"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 39. [HIGH] I0580.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.2% (1개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19690364004"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0580" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 40. [HIGH] C002.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.2% (2개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19550509001438","19550509001587"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 41. [HIGH] I2859.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (1개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["19670154002"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2859" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 42. [SUGGESTED] I1540.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (2개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["20140522061","20190533136"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1540" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 43. [SUGGESTED] I0680.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.3% (2개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 2건 매칭됨
--   - 매칭된 샘플 데이터   : ["20140522061","20190533136"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0680" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 44. [HIGH] C003.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.1% (1개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["2004001510459"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 45. [HIGH] I2610.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 12.5% (1개 / Unique 8개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["A0000000000000"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2610" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 46. [HIGH] C005.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.1% (1개 / Unique 949개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["1969008601620"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C005" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 47. [HIGH] I0250.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 2.5% (1개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["20060345032"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0250" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 48. [SUGGESTED] I0320.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.2% (1개 / Unique 533개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["20040020031142"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0320" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 49. [SUGGESTED] I0490.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.5% (1개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 1건 매칭됨
--   - 매칭된 샘플 데이터   : ["19950310007"]
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 50. [HIGH] I0580.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0580" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 51. [HIGH] I0580.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0580" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 52. [HIGH] I2580.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2580" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 53. [HIGH] I2580.TESTITM_CD ↔ I2530.TESTITM_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2580" A
INNER JOIN "I2530" B ON A."TESTITM_CD" = B."TESTITM_CD"
WHERE A."TESTITM_CD" IS NOT NULL AND A."TESTITM_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 54. [HIGH] I0310.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 18개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 55. [HIGH] I0310.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 18개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 56. [HIGH] I0310.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 57. [HIGH] I0310.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 58. [HIGH] I0310.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 59. [HIGH] I2822.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2822" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 60. [HIGH] I2822.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2822" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 61. [HIGH] I2822.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2822" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 62. [HIGH] I2822.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2822" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 63. [HIGH] C003.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 64. [HIGH] C003.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 65. [HIGH] C003.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 66. [HIGH] I0630.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 601개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0630" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 67. [HIGH] I0630.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 601개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0630" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 68. [HIGH] I0630.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 601개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0630" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 69. [HIGH] I2860.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 316개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2860" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 70. [HIGH] I2860.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 316개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2860" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 71. [HIGH] I2860.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 316개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2860" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 72. [HIGH] I2860.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 316개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2860" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 73. [HIGH] I2640.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 13개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2640" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 74. [HIGH] I2640.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 13개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2640" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 75. [HIGH] I2640.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 13개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2640" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 76. [HIGH] I2620.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 53개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 77. [HIGH] I2620.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 53개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 78. [HIGH] I2620.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 53개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 79. [HIGH] I2620.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 80. [HIGH] I2620.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 81. [HIGH] I2857.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2857" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 82. [HIGH] I2858.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 134개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2858" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 83. [HIGH] C005.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 949개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C005" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 84. [HIGH] C005.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 949개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C005" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 85. [HIGH] I2852.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 86. [HIGH] I2852.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 87. [HIGH] I2852.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 88. [HIGH] I2852.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 89. [HIGH] I2852.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 90. [HIGH] I0460.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 366개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0460" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 91. [HIGH] I0460.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 366개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0460" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 92. [HIGH] C001.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 93. [HIGH] I2821.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2821" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 94. [HIGH] I2821.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2821" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 95. [HIGH] I2821.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2821" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 96. [HIGH] I2821.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2821" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 97. [HIGH] I2836.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 574개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2836" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 98. [HIGH] I2835.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2835" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 99. [HIGH] I2827.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2827" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 100. [HIGH] I2827.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2827" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 101. [HIGH] I2827.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2827" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 102. [HIGH] I2827.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2827" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 103. [HIGH] C002.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 104. [HIGH] C002.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 105. [HIGH] C002.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 106. [HIGH] I0300.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 107. [HIGH] I0300.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 108. [HIGH] I0300.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 988개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 109. [HIGH] I0300.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 988개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 110. [HIGH] I0300.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 988개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 111. [HIGH] I2833.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 888개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2833" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 112. [HIGH] I2817.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 599개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2817" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 113. [HIGH] I2817.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 599개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2817" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 114. [HIGH] I2817.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 599개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2817" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 115. [HIGH] I2817.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 599개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2817" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 116. [HIGH] I2831.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2831" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 117. [HIGH] I2815.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2815" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 118. [HIGH] I2815.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2815" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 119. [HIGH] I2815.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2815" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 120. [HIGH] I2815.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2815" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 121. [HIGH] I2859.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2859" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 122. [HIGH] I2859.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2859" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 123. [HIGH] I2830.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2830" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 124. [HIGH] I2814.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2814" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 125. [HIGH] I2814.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2814" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 126. [HIGH] I2814.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2814" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 127. [HIGH] I2814.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2814" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 128. [HIGH] I1560.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1560" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 129. [HIGH] I1560.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1560" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 130. [HIGH] I1540.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1540" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 131. [HIGH] I1540.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1540" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 132. [HIGH] I0320.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 533개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0320" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 133. [HIGH] I0320.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 533개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0320" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 134. [HIGH] I0320.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 533개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0320" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 135. [HIGH] I2819.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2819" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 136. [HIGH] I2819.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2819" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 137. [HIGH] I2819.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2819" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 138. [HIGH] I2819.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2819" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 139. [HIGH] C004.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C004" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 140. [HIGH] I2811.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2811" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 141. [HIGH] I2811.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2811" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 142. [HIGH] I2811.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2811" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 143. [HIGH] I2811.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2811" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 144. [SUGGESTED] I1101.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1101" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 145. [HIGH] I2813.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2813" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 146. [HIGH] I2813.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2813" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 147. [HIGH] I2813.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2813" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 148. [HIGH] I2813.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2813" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 149. [HIGH] I2816.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2816" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 150. [HIGH] I2816.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2816" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 151. [HIGH] I2816.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2816" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 152. [HIGH] I2816.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2816" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 153. [HIGH] I0080.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 154. [HIGH] I0080.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 742개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 155. [HIGH] I0080.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 742개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 156. [HIGH] I2560.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2560" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 157. [HIGH] I2560.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2560" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 158. [HIGH] I2560.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2560" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 159. [HIGH] I2818.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2818" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 160. [HIGH] I2818.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2818" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 161. [HIGH] I2818.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2818" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 162. [HIGH] I2818.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2818" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 163. [HIGH] I0680.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0680" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 164. [HIGH] I2823.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2823" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 165. [HIGH] I2823.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2823" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 166. [HIGH] I2823.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2823" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 167. [HIGH] I2823.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2823" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 168. [HIGH] I2714.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2714" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 169. [HIGH] I2714.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2714" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 170. [HIGH] I2851.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 171. [HIGH] I2851.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 755개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 172. [HIGH] I2851.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 755개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 173. [HIGH] I2712.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 174. [HIGH] I2712.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 175. [HIGH] I2712.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 176. [HIGH] I2861.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 156개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2861" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 177. [HIGH] I2861.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 156개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2861" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 178. [HIGH] I2861.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 156개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2861" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 179. [HIGH] I2861.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 156개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2861" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 180. [HIGH] I2829.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2829" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 181. [HIGH] I2812.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2812" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 182. [HIGH] I2812.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2812" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 183. [HIGH] I2812.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2812" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 184. [HIGH] I2812.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2812" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 185. [HIGH] I2834.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2834" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 186. [HIGH] I2820.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2820" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 187. [HIGH] I2820.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2820" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 188. [HIGH] I2820.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2820" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 189. [HIGH] I2820.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2820" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 190. [HIGH] I2824.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2824" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 191. [HIGH] I2824.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2824" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 192. [HIGH] I2824.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2824" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 193. [HIGH] I2824.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2824" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 194. [HIGH] I1420.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 33개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 195. [HIGH] I1420.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 33개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 196. [HIGH] I1420.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 197. [HIGH] I1420.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 198. [HIGH] I1420.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 199. [HIGH] I2825.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2825" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 200. [HIGH] I2825.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2825" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 201. [HIGH] I2825.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2825" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 202. [HIGH] I2825.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2825" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 203. [HIGH] I2826.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2826" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 204. [HIGH] I2826.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2826" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 205. [HIGH] I2826.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2826" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 206. [HIGH] I2826.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2826" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 207. [HIGH] I2828.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2828" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 208. [HIGH] I2828.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2828" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 209. [HIGH] I2828.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2828" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 210. [HIGH] I2828.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2828" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 211. [HIGH] I0610.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0610" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 212. [HIGH] I0610.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0610" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 213. [HIGH] C006.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 214. [HIGH] C006.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 215. [HIGH] C006.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 216. [HIGH] C006.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 217. [HIGH] I0470.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0470" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 218. [HIGH] I0470.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0470" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 219. [HIGH] I0470.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0470" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 220. [HIGH] I0470.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0470" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 221. [HIGH] I0470.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0470" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 222. [HIGH] I0482.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 49개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0482" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 223. [HIGH] I0482.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 49개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0482" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 224. [HIGH] I0482.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 49개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0482" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 225. [HIGH] I0482.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 49개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0482" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 226. [HIGH] I0482.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 49개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0482" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 227. [HIGH] I2630.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 990개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2630" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 228. [HIGH] I2630.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 990개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2630" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 229. [HIGH] I2630.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 990개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2630" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 230. [HIGH] I2630.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 990개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2630" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 231. [HIGH] I2630.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 990개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2630" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 232. [HIGH] I0480.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0480" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 233. [HIGH] I0480.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0480" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 234. [HIGH] I0480.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0480" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 235. [HIGH] I0480.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 259개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0480" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 236. [HIGH] I0481.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 646개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0481" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 237. [HIGH] I0481.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 646개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0481" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 238. [HIGH] I0481.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 646개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0481" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 239. [HIGH] I0481.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 646개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0481" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 240. [HIGH] I0481.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 646개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0481" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 241. [HIGH] I0490.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 158개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 242. [HIGH] I0490.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 158개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 243. [HIGH] I0490.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 158개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 244. [HIGH] I0490.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 245. [SUGGESTED] I0030.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 141개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0030" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 246. [SUGGESTED] C003.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 30개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 247. [SUGGESTED] I0960.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 329개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0960" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 248. [SUGGESTED] I2857.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2857" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 249. [SUGGESTED] I2857.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2857" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 250. [SUGGESTED] I2857.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2857" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 251. [SUGGESTED] I2857.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2857" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 252. [SUGGESTED] I1250.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1250" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 253. [SUGGESTED] I0300.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 988개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 254. [SUGGESTED] I2854.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 382개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2854" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 255. [SUGGESTED] I0940.PRDLST_CD ↔ I2510.PRDLST_CD
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 56개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0940" A
INNER JOIN "I2510" B ON A."PRDLST_CD" = B."PRDLST_CD"
WHERE A."PRDLST_CD" IS NOT NULL AND A."PRDLST_CD" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 256. [SUGGESTED] I1230.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1230" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 257. [SUGGESTED] I2560.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2560" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 258. [SUGGESTED] I2560.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 0개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2560" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 259. [SUGGESTED] I2711.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2711" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 260. [SUGGESTED] I2712.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 261. [SUGGESTED] I0060.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0060" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 262. [SUGGESTED] I2829.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2829" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 263. [SUGGESTED] I1330.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1330" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 264. [SUGGESTED] I1320.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1320" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 265. [SUGGESTED] I1340.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1340" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 266. [SUGGESTED] I1370.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1370" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 267. [SUGGESTED] I1350.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1350" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 268. [SUGGESTED] I1310.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1310" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 269. [SUGGESTED] C006.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 270. [SUGGESTED] I0580.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 665개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0580" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 271. [SUGGESTED] I0310.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 18개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 272. [SUGGESTED] I0310.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 18개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 273. [SUGGESTED] I0310.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 18개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0310" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 274. [SUGGESTED] I-0020.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 552개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0020" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 275. [SUGGESTED] I-0020.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 552개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0020" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 276. [SUGGESTED] I-0020.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 552개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0020" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 277. [SUGGESTED] I-0020.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 552개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0020" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 278. [SUGGESTED] I-0020.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 552개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0020" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 279. [SUGGESTED] I2822.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2822" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 280. [SUGGESTED] I0030.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 141개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0030" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 281. [SUGGESTED] I0030.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 141개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0030" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 282. [SUGGESTED] I0030.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 141개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0030" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 283. [SUGGESTED] I0030.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 141개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0030" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 284. [SUGGESTED] C003.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 30개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 285. [SUGGESTED] C003.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 30개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 286. [SUGGESTED] C003.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 30개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 287. [SUGGESTED] C003.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 30개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C003" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 288. [SUGGESTED] I0630.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 601개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0630" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 289. [SUGGESTED] I0630.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 601개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0630" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 290. [SUGGESTED] I2860.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 316개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2860" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 291. [SUGGESTED] I1290.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1290" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 292. [SUGGESTED] I1290.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1290" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 293. [SUGGESTED] I1290.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1290" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 294. [SUGGESTED] I1290.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1290" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 295. [SUGGESTED] I1290.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1290" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 296. [SUGGESTED] I2640.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 13개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2640" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 297. [SUGGESTED] I2640.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 13개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2640" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 298. [SUGGESTED] I2620.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 53개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 299. [SUGGESTED] I2620.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 300. [SUGGESTED] I2620.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 88개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2620" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 301. [SUGGESTED] I1240.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1240" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 302. [SUGGESTED] I1240.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1240" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 303. [SUGGESTED] I1240.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1240" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 304. [SUGGESTED] I1240.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1240" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 305. [SUGGESTED] I1240.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1240" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 306. [SUGGESTED] I2847.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2847" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 307. [SUGGESTED] I2847.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2847" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 308. [SUGGESTED] I2847.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2847" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 309. [SUGGESTED] I2847.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2847" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 310. [SUGGESTED] I2847.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 989개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2847" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 311. [SUGGESTED] I2858.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 134개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2858" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 312. [SUGGESTED] I2858.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 134개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2858" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 313. [SUGGESTED] I2858.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 134개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2858" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 314. [SUGGESTED] I2858.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 134개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2858" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 315. [SUGGESTED] C005.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 949개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C005" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 316. [SUGGESTED] I2852.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 317. [SUGGESTED] I2852.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 318. [SUGGESTED] I2852.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 86개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2852" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 319. [SUGGESTED] I0460.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 366개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0460" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 320. [SUGGESTED] C001.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 321. [SUGGESTED] C001.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 322. [SUGGESTED] C001.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C001" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 323. [SUGGESTED] I2821.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2821" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 324. [SUGGESTED] I2836.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 574개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2836" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 325. [SUGGESTED] I2836.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 574개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2836" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 326. [SUGGESTED] I2836.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 574개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2836" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 327. [SUGGESTED] I2836.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 574개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2836" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 328. [SUGGESTED] I2835.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2835" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 329. [SUGGESTED] I2835.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2835" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 330. [SUGGESTED] I2835.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2835" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 331. [SUGGESTED] I2835.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2835" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 332. [SUGGESTED] I2827.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2827" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 333. [SUGGESTED] I1250.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1250" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 334. [SUGGESTED] I1250.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1250" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 335. [SUGGESTED] I1250.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 2개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1250" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 336. [SUGGESTED] C002.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 337. [SUGGESTED] C002.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 338. [SUGGESTED] C002.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 268개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C002" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 339. [SUGGESTED] I0300.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 340. [SUGGESTED] I0300.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0300" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 341. [SUGGESTED] I2833.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 888개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2833" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 342. [SUGGESTED] I2833.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 888개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2833" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 343. [SUGGESTED] I2833.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 888개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2833" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 344. [SUGGESTED] I2833.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 888개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2833" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 345. [SUGGESTED] I1590.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 807개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1590" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 346. [SUGGESTED] I1590.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 807개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1590" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 347. [SUGGESTED] I1590.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 807개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1590" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 348. [SUGGESTED] I1590.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 807개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1590" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 349. [SUGGESTED] I1590.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 807개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1590" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 350. [SUGGESTED] I2817.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 599개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2817" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 351. [SUGGESTED] I2831.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2831" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 352. [SUGGESTED] I2831.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2831" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 353. [SUGGESTED] I2831.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2831" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 354. [SUGGESTED] I2831.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2831" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 355. [SUGGESTED] I2815.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2815" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 356. [SUGGESTED] I2859.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 345개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2859" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 357. [SUGGESTED] I2830.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2830" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 358. [SUGGESTED] I2830.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2830" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 359. [SUGGESTED] I2830.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2830" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 360. [SUGGESTED] I2830.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2830" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 361. [SUGGESTED] I2814.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2814" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 362. [SUGGESTED] I1560.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1560" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 363. [SUGGESTED] I1560.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1560" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 364. [SUGGESTED] I1560.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1560" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 365. [SUGGESTED] I1540.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1540" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 366. [SUGGESTED] I1540.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1540" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 367. [SUGGESTED] I2819.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2819" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 368. [SUGGESTED] C004.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C004" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 369. [SUGGESTED] C004.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C004" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 370. [SUGGESTED] C004.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C004" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 371. [SUGGESTED] C004.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C004" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 372. [SUGGESTED] I2811.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2811" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 373. [SUGGESTED] I-0010.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 3개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0010" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 374. [SUGGESTED] I-0010.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 3개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0010" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 375. [SUGGESTED] I-0010.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 3개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0010" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 376. [SUGGESTED] I-0010.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 3개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0010" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 377. [SUGGESTED] I-0010.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 3개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I-0010" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 378. [SUGGESTED] I1230.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1230" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 379. [SUGGESTED] I1230.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1230" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 380. [SUGGESTED] I1230.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1230" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 381. [SUGGESTED] I2813.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2813" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 382. [SUGGESTED] I2832.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2832" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 383. [SUGGESTED] I2832.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2832" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 384. [SUGGESTED] I2832.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2832" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 385. [SUGGESTED] I2832.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2832" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 386. [SUGGESTED] I2816.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2816" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 387. [SUGGESTED] I0080.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 217개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 388. [SUGGESTED] I0080.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 742개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0080" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 389. [SUGGESTED] I2818.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2818" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 390. [SUGGESTED] I0250.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0250" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 391. [SUGGESTED] I0250.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0250" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 392. [SUGGESTED] I0250.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0250" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 393. [SUGGESTED] I0250.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 40개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0250" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 394. [SUGGESTED] I0680.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0680" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 395. [SUGGESTED] I0680.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0680" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 396. [SUGGESTED] I0680.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 747개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0680" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 397. [SUGGESTED] I2823.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2823" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 398. [SUGGESTED] I2714.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2714" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 399. [SUGGESTED] I2714.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2714" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 400. [SUGGESTED] I2714.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2714" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 401. [SUGGESTED] I2851.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 402. [SUGGESTED] I2851.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 403. [SUGGESTED] I2851.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 171개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 404. [SUGGESTED] I2851.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 755개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2851" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 405. [SUGGESTED] I2711.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2711" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 406. [SUGGESTED] I2711.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2711" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 407. [SUGGESTED] I2711.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 37개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2711" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 408. [SUGGESTED] I2712.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 409. [SUGGESTED] I2712.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 410. [SUGGESTED] I2712.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 160개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2712" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 411. [SUGGESTED] I2570.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 464개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2570" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 412. [SUGGESTED] I2570.PRDLST_REPORT_NO ↔ I1250.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 464개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2570" A
INNER JOIN "I1250" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 413. [SUGGESTED] I2570.PRDLST_REPORT_NO ↔ I2711.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 464개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2570" A
INNER JOIN "I2711" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 414. [SUGGESTED] I2570.PRDLST_REPORT_NO ↔ I1310.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 464개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2570" A
INNER JOIN "I1310" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 415. [SUGGESTED] I2861.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 156개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2861" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 416. [SUGGESTED] I0060.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0060" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 417. [SUGGESTED] I0060.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0060" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 418. [SUGGESTED] I0060.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0060" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 419. [SUGGESTED] I0060.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0060" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 420. [SUGGESTED] I2829.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2829" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 421. [SUGGESTED] I2829.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2829" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 422. [SUGGESTED] I2829.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2829" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 423. [SUGGESTED] I2812.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2812" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 424. [SUGGESTED] I2834.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2834" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 425. [SUGGESTED] I2834.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2834" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 426. [SUGGESTED] I2834.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2834" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 427. [SUGGESTED] I2834.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2834" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 428. [SUGGESTED] I2820.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2820" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 429. [SUGGESTED] I2824.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2824" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 430. [SUGGESTED] I1330.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1330" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 431. [SUGGESTED] I1330.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1330" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 432. [SUGGESTED] I1330.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1330" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 433. [SUGGESTED] I1330.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1330" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 434. [SUGGESTED] I1420.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 33개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 435. [SUGGESTED] I1420.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 33개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 436. [SUGGESTED] I1420.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 33개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 437. [SUGGESTED] I1420.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1420" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 438. [SUGGESTED] I2825.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2825" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 439. [SUGGESTED] I1320.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1320" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 440. [SUGGESTED] I1320.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1320" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 441. [SUGGESTED] I1320.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1320" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 442. [SUGGESTED] I1320.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1320" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 443. [SUGGESTED] I1340.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1340" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 444. [SUGGESTED] I1340.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1340" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 445. [SUGGESTED] I1340.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1340" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 446. [SUGGESTED] I1340.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1340" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 447. [SUGGESTED] I1370.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1370" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 448. [SUGGESTED] I1370.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1370" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 449. [SUGGESTED] I1370.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1370" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 450. [SUGGESTED] I1370.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 54개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1370" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 451. [SUGGESTED] I2826.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2826" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 452. [SUGGESTED] I1350.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1350" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 453. [SUGGESTED] I1350.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1350" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 454. [SUGGESTED] I1350.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1350" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 455. [SUGGESTED] I1350.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1350" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 456. [SUGGESTED] I1310.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1310" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 457. [SUGGESTED] I1310.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 10개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I1310" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 458. [SUGGESTED] I2828.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2828" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 459. [SUGGESTED] I0610.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0610" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 460. [SUGGESTED] I0610.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 974개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0610" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 461. [SUGGESTED] C006.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 462. [SUGGESTED] C006.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 463. [SUGGESTED] C006.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 115개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "C006" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 464. [SUGGESTED] I2856.LCNS_NO ↔ I1260.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2856" A
INNER JOIN "I1260" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 465. [SUGGESTED] I2856.LCNS_NO ↔ I1220.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2856" A
INNER JOIN "I1220" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 466. [SUGGESTED] I2856.LCNS_NO ↔ I2713.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2856" A
INNER JOIN "I2713" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 467. [SUGGESTED] I2856.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2856" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 468. [SUGGESTED] I2856.LCNS_NO ↔ I1300.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 1000개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I2856" A
INNER JOIN "I1300" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 469. [SUGGESTED] I0490.PRDLST_REPORT_NO ↔ I0030.PRDLST_REPORT_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 158개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I0030" B ON A."PRDLST_REPORT_NO" = B."PRDLST_REPORT_NO"
WHERE A."PRDLST_REPORT_NO" IS NOT NULL AND A."PRDLST_REPORT_NO" != ''
LIMIT 10;

-- -----------------------------------------------------------------------------
-- 470. [SUGGESTED] I0490.LCNS_NO ↔ I2500.LCNS_NO
--   - 값 일치율 (Inclusion): 0.0% (0개 / Unique 222개)
--   - 실제 JOIN 레코드 수 : 0건 매칭됨
--   - 매칭된 샘플 데이터   : []
-- -----------------------------------------------------------------------------
SELECT A.*, B.*
FROM "I0490" A
INNER JOIN "I2500" B ON A."LCNS_NO" = B."LCNS_NO"
WHERE A."LCNS_NO" IS NOT NULL AND A."LCNS_NO" != ''
LIMIT 10;

