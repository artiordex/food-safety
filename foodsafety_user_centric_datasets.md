# 📊 식품안전 OpenAPI 기반 사용자 중심 융합 데이터 세트 설계 명세서 (User-Centric Integrated Datasets)

단일 API의 파편화된 테이블 구조를 극복하고, 서비스 기획자, 앱 개발자, 비즈니스 분석가가 실무나 서비스 배포 시 즉각 활용할 수 있는 **8대 핵심 사용자 중심 융합 데이터 세트** 명세를 제공합니다. 

본 데이터 세트들은 현재 구축된 `foodsafety.db` 데이터베이스의 관계형 구조를 기반으로 **실시간 SQLite 뷰(View) 생성 및 교차 검증 SQL 쿼리**까지 완벽히 최적화되어 수록되어 있습니다.

---

## 📂 목차
1. 🥗 안심 소비자를 위한 **[알레르기·유해성분 회피 바코드 제품 데이터 세트]**
2. 🛡️ 유통사 식자재 바이어를 위한 **[전국 제조업체 통합 식품 안전 위험성 등급 (Risk-Score) 데이터 세트]**
3. 🏢 요식업/맛집 플랫폼 개발사를 위한 **[행정동별 '클린 위생' 안심 요식업소 데이터 세트]**
4. 🚢 수입식품 수입상 및 관세법인을 위한 **[수입식품 영업자 안전성 진단 및 행정처분 분석 데이터 세트]**
5. 👶 어린이·고령자 보호를 위한 **[어린이 · 고령자 안심 영양/안전 식품 데이터 세트]**
6. 🗺️ 전국 지자체 위생과 및 정책 연구원을 위한 **[지역별 식품안전 및 위해 모니터링 데이터 세트]**
7. 🏢 프랜차이즈 본사 및 ESG 품질관리자를 위한 **[식품기업 공급망 ESG · 안전경영 지원 데이터 세트]**
8. 💻 백엔드 및 앱 서비스 개발자를 위한 **[개발자용 대규모 통합 표준 마스터 데이터 세트]**

---

## 1. 🥗 알레르기·유해성분 회피 바코드 제품 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 헬스케어 및 다이어트/영양 분석 모바일 앱 개발사
* 식단 관리 서비스 기획자
* 아토피, 당뇨, 특정 성분 알레르기를 가진 스마트 안심 소비자

### 💡 비즈니스 목적 및 활용 가치
소비자가 대형마트나 편의점에서 식품의 **유통 바코드(880...)**를 모바일 카메라로 스캔하는 즉시, 식약처 품목제조 성분 데이터와 위해 제품 회수 정보를 실시간 교차 조회하여 **"내가 회피하고자 하는 알레르기 성분(예: 밀, 우유, 땅콩) 포함 여부"** 및 **"현재 위해 식품 회수 대상 여부"**를 0.1초 만에 판별해 주는 데이터 서비스 마트의 기반이 됩니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `C005` (바코드연계 제품정보 - 바코드 매핑 마스터)
* `I1250` (식품 품목제조보고 - 제품명, 품목유형, 보관방법 마스터)
* `C002` (품목제조보고 원재료 - 원재료 성분 배합 정보)
* `I0490` (회수 판매중지 정보 - 위해 물질 검출 및 회수 조치 대장)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **BAR_CD** | 유통 바코드 번호 | VARCHAR PK | 제품 유통 식별 번호 (880...) |
| **PRDLST_REPORT_NO** | 품목제조보고번호 | VARCHAR FK | 식약처 정식 제품 등록 번호 |
| **PRDLST_NM** | 제품 명칭 | VARCHAR | 소비자용 최종 상품 판매명 |
| **PRDLST_DCNM** | 품목분류명 | VARCHAR | 식품 유형 구분 (과자, 소스, 면류 등) |
| **ALL_INGREDIENTS** | 전체 배합 원재료명세 | TEXT | 쉼표(,)로 구분된 제조 성분 목록 |
| **IS_RECALLED** | 위해제품 회수 여부 | INTEGER | 1 = 회수대상 위해식품, 0 = 안전 제품 |
| **RECALL_PRVNS** | 회수/판매중지 사유 | VARCHAR | 위해 성분 검출 사유 (세균 기준치 초과 등) |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_user_barcode_allergy_dataset AS
SELECT 
    A.BAR_CD AS BAR_CD,
    A.PRDLST_REPORT_NO AS PRDLST_REPORT_NO,
    COALESCE(B.PRDLST_NM, A.PRDLST_NM) AS PRDLST_NM,
    COALESCE(B.PRDLST_DCNM, A.PRDLST_DCNM) AS PRDLST_DCNM,
    GROUP_CONCAT(DISTINCT C.RAWMTRL_NM) AS ALL_INGREDIENTS,
    CASE 
        WHEN D.PRDLST_REPORT_NO IS NOT NULL THEN 1 
        ELSE 0 
    END AS IS_RECALLED,
    COALESCE(D.RTRVLPRVNS, '안전 제품(회수 이력 없음)') AS RECALL_PRVNS
FROM C005 A
LEFT JOIN I1250 B ON A.PRDLST_REPORT_NO = B.PRDLST_REPORT_NO
LEFT JOIN C002 C ON A.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO
LEFT JOIN I0490 D ON A.PRDLST_REPORT_NO = D.PRDLST_REPORT_NO
GROUP BY A.BAR_CD;
```

---

## 2. 🛡️ 전국 제조업체 통합 식품 안전 위험성 등급 (Risk-Score) 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 대형 유통사(이마트, 쿠팡 등) 및 케이터링/급식 전문 기업 식자재 바이어
* 식품 안전 인증 컨설턴트 및 연구원
* B2B 원료 의약품/식품 원자재 조달 플랫폼 개발사

### 💡 비즈니스 목적 및 활용 가치
새로운 식품 제조사와 OEM 계약을 체결하거나 식자재 대량 매입을 결정하기 전, 해당 제조업체의 **1) 정상 영업 상태, 2) HACCP 위생 등급 인증 여부, 3) 최근 3개년 행정처분 건수, 4) 정기 수거검사 부적합 적발 건수**를 정교하게 종합하여 제조업체의 **"위해도 점수(Risk-Score)" 및 "식품 안전 등급(A~D)"**을 자동으로 평정해 주는 B2B 거래 신용 등급 데이터 마트입니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I2500` (인허가 업소 정보 - 전체 업소 인적사항 및 영업 상태 마스터)
* `I0580` (HACCP 적용 업소 - HACCP 등급 및 인증 지정 유무)
* `I0470` (행정처분 결과 - 법령 위반 내역 및 영업 정지 이력)
* `I2620` (검사부적합 국내 - 수거검사 결과 부적합 이력)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **LCNS_NO** | 인허가 고유번호 | VARCHAR PK | 전국 업소 고유 매핑 키 |
| **BSSH_NM** | 제조 업소명 | VARCHAR | 사업자등록증상 상호명 |
| **ADDR** | 소재지 주소 | VARCHAR | 공장 또는 제조 시설 도로명 주소 |
| **IS_HACCP_CERTIFIED** | HACCP 지정 여부 | INTEGER | 1 = HACCP 획득 업소, 0 = 미획득 |
| **VIOLATION_COUNT** | 행정처분 적발 건수 | INTEGER | 최근 누적 행정 법령 위반 처분 수 |
| **NON_COMPLIANT_COUNT**| 수거검사 부적합 건수 | INTEGER | 수거검사 시 성분/위생 부적합 판정 횟수 |
| **SAFETY_GRADE** | 식품 안전 종합 등급 | VARCHAR | 융합 위험도 계산 결과 등급 (**Grade A, B, C, D**) |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_supplier_risk_score_dataset AS
SELECT 
    A.LCNS_NO AS LCNS_NO,
    A.BSSH_NM AS BSSH_NM,
    A.ADDR AS ADDR,
    CASE 
        WHEN H.LCNS_NO IS NOT NULL THEN 1 
        ELSE 0 
    END AS IS_HACCP_CERTIFIED,
    COALESCE(D.violation_cnt, 0) AS VIOLATION_COUNT,
    COALESCE(NC.fail_cnt, 0) AS NON_COMPLIANT_COUNT,
    CASE 
        WHEN COALESCE(D.violation_cnt, 0) = 0 AND COALESCE(NC.fail_cnt, 0) = 0 AND H.LCNS_NO IS NOT NULL THEN 'Grade A (최우수 안심)'
        WHEN COALESCE(D.violation_cnt, 0) <= 1 AND COALESCE(NC.fail_cnt, 0) <= 1 THEN 'Grade B (안전 양호)'
        WHEN COALESCE(D.violation_cnt, 0) <= 3 OR COALESCE(NC.fail_cnt, 0) <= 3 THEN 'Grade C (주의 요망)'
        ELSE 'Grade D (위험/집중관리 대상)'
    END AS SAFETY_GRADE
FROM I2500 A
LEFT JOIN (SELECT DISTINCT LCNS_NO FROM I0580 WHERE LCNS_NO IS NOT NULL AND LCNS_NO != '') H 
    ON A.LCNS_NO = H.LCNS_NO
LEFT JOIN (
    SELECT LCNS_NO, COUNT(*) as violation_cnt 
    FROM I0470 
    GROUP BY LCNS_NO
) D ON A.LCNS_NO = D.LCNS_NO
LEFT JOIN (
    SELECT LCNS_NO, COUNT(*) as fail_cnt 
    FROM I2620 
    GROUP BY LCNS_NO
) NC ON A.LCNS_NO = NC.LCNS_NO
WHERE A.INDUTY_CD_NM LIKE '%제조%';
```

---

## 3. 🏢 행정동별 '클린 위생' 안심 요식업소 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 배달의민족, 요기요, 쿠팡이츠 등 국내 배달 플랫폼 서비스 기맹 품질 제어 부서
* 네이버 플레이스, 카카오맵 등 맛집 정보 플랫폼 기획자
* 지역별 안심 요식업소 지리정보(GIS)를 제공하고자 하는 로컬 지자체 개발자

### 💡 비즈니스 목적 및 활용 가치
소비자들이 요식업체를 이용할 때 가장 우려하는 청결 위생 리스크를 직관적인 지도 핀 형태로 시각화합니다. 행정구역(시도/시군구/행정동) 단위로 식당 및 일반 음식점들의 **1) 인허가 영업 정보, 2) 최근 누적 위반 법령 및 처분 강도**를 지도 주소 정보와 융합하여 요식업소의 **"클린 위생 등급"**을 배달/지도 플랫폼 상에 실시간 표출해 줍니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I2500` (인허가 업소 정보 - 요식업종, 도로명 상세 주소, 전화번호 마스터)
* `I0470` (행정처분 결과 - 영업정지, 과태료, 시정명령 등 행정 처분 대장)

### 📊 물리 스키마 정의 (Unified Schema)

| EMP 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **LCNS_NO** | 인허가번호 | VARCHAR PK | 개별 식당 고유 식별 번호 |
| **BSSH_NM** | 업소 상호명 | VARCHAR | 식당 간판/사업자 명칭 |
| **INDUTY_CD_NM** | 업종 구분 | VARCHAR | 일반음식점, 휴게음식점, 제과점 등 |
| **FULL_ADDRESS** | 도로명 주소 | VARCHAR | 지자체 맵 매핑용 도로명 전체 주소 |
| **SIDO** | 시도 행정 구역 | VARCHAR | 매핑 필터링 속도 향상용 세그먼트 |
| **RECENT_VIOLATION** | 최근 위반 법령 사유 | VARCHAR | 유통기한 경과 보관, 위생 불량 등 |
| **RECENT_DISPOSAL** | 행정처분 내용 | VARCHAR | 시정명령, 과태료, 영업정지 X일 등 |
| **HYGIENE_STATUS** | 종합 위생 안전 등급 | VARCHAR | **안심업소(Clean)** / **일반업소** / **위생경고(Warning)** |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_local_restaurant_hygiene_dataset AS
SELECT 
    A.LCNS_NO AS LCNS_NO,
    A.BSSH_NM AS BSSH_NM,
    A.INDUTY_CD_NM AS INDUTY_CD_NM,
    A.ADDR AS FULL_ADDRESS,
    SUBSTR(A.ADDR, 1, INSTR(A.ADDR, ' ') - 1) AS SIDO,
    COALESCE(D.DSPS_TYPECD_NM, '적발 내역 없음') AS RECENT_DISPOSAL,
    COALESCE(D.VILTCN, '깨끗함 (위반 없음)') AS RECENT_VIOLATION,
    CASE 
        WHEN D.LCNS_NO IS NULL THEN '안심 클린 위생 업소 (Clean)'
        WHEN D.DSPS_TYPECD_NM LIKE '%정지%' OR D.DSPS_TYPECD_NM LIKE '%취소%' THEN '위생 경고 업소 (Warning)'
        ELSE '일반 영업 업소'
    END AS HYGIENE_STATUS
FROM I2500 A
LEFT JOIN (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY LCNS_NO ORDER BY DSPS_DCSNDT DESC) as rn
    FROM I0470
) D ON A.LCNS_NO = D.LCNS_NO AND D.rn = 1
WHERE A.INDUTY_CD_NM LIKE '%음식%' 
   OR A.INDUTY_CD_NM LIKE '%식음%' 
   OR A.INDUTY_CD_NM LIKE '%카페%' 
   OR A.INDUTY_CD_NM LIKE '%제과%';
```

---

## 4. 🚢 수입식품 영업자 안전성 진단 및 행정처분 분석 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 전문 식품 수입 유통 무역 상사 바이어
* 수입 관세법인 관세사 및 보세 창고 물류 분석가
* 해외직구/수입 대행 전문 쇼핑몰 플랫폼 백엔드 개발자

### 💡 비즈니스 목적 및 활용 가치
해외 식품이나 축산물, 기구용기를 전문 수입하는 수입 영업소 대장(`C001`)과 영업 규정 위반 적발 대장(`I0482`)을 연쇄 조인하여, 통관 전 수입 유통 협력업체의 **"통관 위험 등급(Risk-Level)"**을 사전에 자동 산출하고 불량 무역 거래선을 걸러내는 지능형 스크리닝 필터를 가동합니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `C001` (수입식품등영업신고대장 - 정식 등록 수입 영업소 정보 마스터)
* `I0482` (행정처분결과 수입식품업 - 수입업 대상 행정 법령 위반 적발 대장)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **LCNS_NO** | 인허가 고유번호 | VARCHAR PK | 전국 업소 고유 매핑 키 |
| **BSSH_NM** | 수입 업소명 | VARCHAR | 사업자등록증상 상호명 |
| **INDUTY_NM** | 수입업종 구분 | VARCHAR | 수입식품등 수입판매업, 인터넷구매대행업 등 |
| **FULL_ADDRESS** | 영업소 소재지 주소 | VARCHAR | 지자체 맵 맵핑용 도로명 전체 주소 |
| **VIOLATION_COUNT** | 행정처분 적발 건수 | INTEGER | 수입 규정 위반으로 인한 적발 횟수 |
| **RISK_LEVEL** | 영업소 위해 위험 등급 | VARCHAR | **우수 안전 수입상(Safe)** / **관리 대상** / **고위험 수입상(High Risk)** |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_imported_food_risk_analysis_dataset AS
SELECT 
    A.LCNS_NO AS LCNS_NO,
    A.BSSH_NM AS BSSH_NM,
    A.INDUTY_NM AS INDUTY_NM,
    A.LOCP_ADDR AS FULL_ADDRESS,
    COALESCE(D.violation_cnt, 0) AS VIOLATION_COUNT,
    CASE 
        WHEN COALESCE(D.violation_cnt, 0) = 0 THEN '우수 안전 수입상 (Safe)'
        WHEN COALESCE(D.violation_cnt, 0) <= 2 THEN '관리 대상 수입상 (Normal)'
        ELSE '행정처분 고위험 수입상 (High Risk)'
    END AS RISK_LEVEL
FROM C001 A
LEFT JOIN (
    SELECT LCNS_NO, COUNT(*) as violation_cnt 
    FROM I0482 
    GROUP BY LCNS_NO
) D ON A.LCNS_NO = D.LCNS_NO;
```

---

## 5. 👶 어린이 · 고령자 안심 영양/안전 식품 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 학부모 대상 유아/어린이 웰니스 식단 앱 기획자
* 어린이집, 유치원, 초등학교 단체 급식소 영양사
* 요양병원 및 실버타운 케이터링 식자재 바이어

### 💡 비즈니스 목적 및 활용 가치
면역력과 섭취 기준이 까다로운 **어린이와 고령자**를 보호하기 위해, 특정 영양 정보와 제품 제조 정보 및 위해 성분 적발 이력을 실시간 교차 조회합니다. 영양소 결핍 및 칼로리 과다, 그리고 위해 우려가 있는 부적합 이력 제품을 0.1초 만에 스크리닝하여 안심 급식과 올바른 가정 식단을 구축하도록 돕습니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I1250` (식품 품목제조보고 - 제품 마스터)
* `C002` (품목제조보고 원재료 - 상세 배합 성분 명세)
* `I0760` (건강기능식품 영양DB - 어린이/성인 건강 기준 항목 코드)
* `I0490` (회수 판매중지 정보 - 위해 물질 검출 조치 대장)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **PRDLST_REPORT_NO** | 품목제조보고번호 | VARCHAR PK | 식약처 정식 제품 등록 번호 |
| **PRDLST_NM** | 제품 명칭 | VARCHAR | 소비자용 최종 상품 판매명 |
| **PRDLST_DCNM** | 품목분류명 | VARCHAR | 식품 유형 구분 (과자, 기타가공품 등) |
| **ALL_INGREDIENTS** | 전체 배합 원재료명세 | TEXT | 쉼표(,)로 구분된 제조 성분 목록 |
| **NUTRITION_GRP** | 건강 기여 분류군 | VARCHAR | 고령자/어린이/수유부 기여 영양 분류군 |
| **IS_RECALLED** | 위해제품 회수 여부 | INTEGER | 1 = 회수대상 위해식품, 0 = 안전 제품 |
| **RECALL_PRVNS** | 회수/판매중지 사유 | VARCHAR | 위해 성분 검출 사유 (세균 기준치 초과 등) |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_child_senior_safety_dataset AS
SELECT 
    P.PRDLST_REPORT_NO AS PRDLST_REPORT_NO,
    P.PRDLST_NM AS PRDLST_NM,
    P.PRDLST_DCNM AS PRDLST_DCNM,
    GROUP_CONCAT(DISTINCT R.RAWMTRL_NM) AS ALL_INGREDIENTS,
    COALESCE(N.HELT_ITM_GRP_NM, '일반 권장 식품군') AS NUTRITION_GRP,
    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN 1 
        ELSE 0 
    END AS IS_RECALLED,
    COALESCE(C.RTRVLPRVNS, '안전 제품(회수 이력 없음)') AS RECALL_PRVNS
FROM I1250 P
LEFT JOIN C002 R ON P.PRDLST_REPORT_NO = R.PRDLST_REPORT_NO
LEFT JOIN I0760 N ON P.PRDLST_DCNM LIKE '%' || N.MLSFC_NM || '%'
LEFT JOIN I0490 C ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO
GROUP BY P.PRDLST_REPORT_NO;
```

---

## 6. 🗺️ 지역별 식품안전 및 위해 모니터링 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 전국 시·도 및 시·군·구 보건행정 위생점검 기획과 담당자
* 식품 위생 안전 실무 정책 분석가 및 역학 연구원
* 지리정보(GIS) 기반 식중독·위해 위험 클러스터를 감지하려는 연구원

### 💡 비즈니스 목적 및 활용 가치
행정 구역(시도/시군구) 단위별로 업소 수 대비 최근 행정처분 건수, 검사 부적합 건수, 위해회수 제품 생산 빈도를 통계적으로 종합 산출합니다. 이를 통해 지리학적으로 어느 권역에 위해 식자재 리스크가 집중되어 있는지 동향을 한눈에 파악하여, **선제적 위생점검 행정 계획 수립** 및 **지역 안전 대시보드 시각화**에 즉각 반영합니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I2500` (인허가 업소 정보 - 시도 주소지 분류 및 정식 영업소 마스터)
* `I0470` (행정처분 결과 - 지자체 처벌 이력 대장)
* `I2620` (검사부적합 국내 - 정기 수거 검격 부적합 이력)
* `I0490` (회수 판매중지 정보 - 위해 물질 긴급 회수 명령서)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **LCNS_NO** | 인허가 고유번호 | VARCHAR PK | 전국 업소 고유 매핑 키 |
| **BSSH_NM** | 제조/판매 업소명 | VARCHAR | 사업자등록증상 상호명 |
| **INDUTY_CD_NM** | 업태 구분 | VARCHAR | 식품제조가공업, 휴게음식점 등 |
| **FULL_ADDRESS** | 도로명 주소 | VARCHAR | 지자체 맵 맵핑용 도로명 전체 주소 |
| **SIDO** | 시도 광역 구역 | VARCHAR | 서울특별시, 경기도, 전라남도 등 |
| **TOTAL_DISPOSALS** | 누적 행정처분 건수 | INTEGER | 해당 업소의 처분 적발 누계 건수 |
| **TOTAL_NON_COMPLIANCES**| 누적 성분 부적합 건수| INTEGER | 수거검사 시 부적합 적발 누계 건수 |
| **TOTAL_RECALLS** | 누적 위해회수 제품수 | INTEGER | 해당 공장에서 생산된 긴급 회수 제품수 |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_regional_food_safety_dataset AS
SELECT 
    E.LCNS_NO AS LCNS_NO,
    E.BSSH_NM AS BSSH_NM,
    E.INDUTY_CD_NM AS INDUTY_CD_NM,
    E.ADDR AS FULL_ADDRESS,
    SUBSTR(E.ADDR, 1, INSTR(E.ADDR, ' ') - 1) AS SIDO,
    COUNT(DISTINCT D.DSPSDTLS_SEQ) AS TOTAL_DISPOSALS,
    COUNT(DISTINCT NC.PRDLST_REPORT_NO) AS TOTAL_NON_COMPLIANCES,
    COUNT(DISTINCT C.RTRVLDSUSE_SEQ) AS TOTAL_RECALLS
FROM I2500 E
LEFT JOIN I0470 D ON E.LCNS_NO = D.LCNS_NO
LEFT JOIN I2620 NC ON E.LCNS_NO = NC.LCNS_NO
LEFT JOIN I0490 C ON E.LCNS_NO = C.LCNS_NO
GROUP BY E.LCNS_NO;
```

---

## 7. 🏢 식품기업 공급망 ESG · 안전경영 지원 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 대형 식품 프랜차이즈 및 식품 제조업체 품질관리(QA)팀장
* 대기업 공급망 동반성장 및 지속가능(ESG) 경영 사무국
* 중견 제조사 협력사 위해도 사전 평가 모니터링 기획자

### 💡 비즈니스 목적 및 활용 가치
자사의 프랜차이즈 가맹점이나 식품 원자재 납품 협력사들의 위생 인증(HACCP) 획득 여부를 추적하고, 과거 행정처분 이력과 성분 부적합 기록을 교차 분석하여 자사 공급망의 **"식품 ESG 안전 등급"** 지표를 산정합니다. 공급업체의 누적 벌점 및 유해 물질 검출 리스크를 감지하여 자사 브랜드의 평판 손실(Reputational Risk)을 철저히 사전에 방지합니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I0580` (HACCP 적용업소 - 위생 안전 규격 인증 지정 마스터)
* `I0470` (행정처분 결과 - 공급망 협력사 법령 위반 내역)
* `I2620` (검사부적합 국내 - 협력사 제조식품 부적합 이력)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **LCNS_NO** | 인허가번호 | VARCHAR PK | 개별 업장 식별 번호 |
| **BSSH_NM** | 업소 상호명 | VARCHAR | 사업자등록증상 상호명 |
| **HACCP_APPN_NO** | HACCP 지정 번호 | VARCHAR | 정부 지정 공식 안전관리인증 고유 번호 |
| **ACCUMULATED_DISPOSALS**| 누적 처분 위반 건수 | INTEGER | 해당 영업장의 행정처분 누계 수 |
| **ACCUMULATED_NON_COMPLIANCES**| 누적 검사 부적합 건수| INTEGER | 제조품 수거검사 부적합 누계 수 |
| **ESG_SAFETY_GRADE** | 공급망 ESG 안전 등급 | VARCHAR | **ESG 최우수(AAA)** / **ESG 양호(AA)** / **위험 관리 대상(B)** |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_enterprise_esg_safety_dataset AS
SELECT 
    H.LCNS_NO AS LCNS_NO,
    H.BSSH_NM AS BSSH_NM,
    H.HACCP_APPN_NO AS HACCP_APPN_NO,
    COUNT(DISTINCT D.DSPSDTLS_SEQ) AS ACCUMULATED_DISPOSALS,
    COUNT(DISTINCT NC.PRDLST_REPORT_NO) AS ACCUMULATED_NON_COMPLIANCES,
    CASE 
        WHEN COUNT(DISTINCT D.DSPSDTLS_SEQ) = 0 AND COUNT(DISTINCT NC.PRDLST_REPORT_NO) = 0 THEN 'ESG 최우수 (AAA)'
        WHEN COUNT(DISTINCT D.DSPSDTLS_SEQ) <= 1 AND COUNT(DISTINCT NC.PRDLST_REPORT_NO) <= 1 THEN 'ESG 양호 (AA)'
        ELSE 'ESG 중점 리스크 관리 대상 (B)'
    END AS ESG_SAFETY_GRADE
FROM I0580 H
LEFT JOIN I0470 D ON H.LCNS_NO = D.LCNS_NO
LEFT JOIN I2620 NC ON H.LCNS_NO = NC.LCNS_NO
GROUP BY H.LCNS_NO;
```

---

## 8. 💻 백엔드 및 앱 서비스 개발자를 위한 대규모 통합 표준 마스터 데이터 세트

### 🎯 타깃 세그먼트 (Target Audience)
* 식품/이커머스/헬스케어 스타트업 백엔드 개발자 및 시스템 아키텍트
* 대량 데이터 분석을 수행하는 데이터 사이언티스트 및 엔지니어
* 공공데이터와 자사 커머스 연계를 일괄 처리하려는 테크 조직

### 💡 비즈니스 목적 및 활용 가치
식약처의 개별적이고 고립된 31대 OpenAPI 테이블을 매번 애플리케이션 레벨에서 복잡하게 조인하여 실시간 질의를 던지는 것은 데이터베이스 부하와 지연을 유발합니다. 이 융합 데이터 세트는 **품목제조보고(I1250)와 업소마스터(I2500)라는 양대 척추 테이블을 정합성을 보장하며 일체형으로 통합**하고, 바코드, 위반처분, 실시간 회수 상태를 교차 조인하여 단 하나의 유니파이드 데이터 마트 뷰를 제공합니다.

### 🔗 융합 대상 원천 테이블 (Source Tables)
* `I1250` (식품 품목제조보고 - 제품 마스터)
* `I2500` (인허가 업소 정보 - 제조사 영업 마스터)
* `C005` (바코드연계 제품정보 - 바코드 매핑 테이블)
* `I0470` (행정처분 결과 - 법령 위반 처분 이력)
* `I0490` (회수 판매중지 정보 - 위해식품 긴급 회수 현황)

### 📊 물리 스키마 정의 (Unified Schema)

| 컬럼 물리명 (field) | 컬럼 논리명 (kor_nm) | 데이터 타입 | 설명 / 제약 조건 |
| :--- | :--- | :--- | :--- |
| **PRDLST_REPORT_NO** | 품목제조보고번호 | VARCHAR PK | 식약처 정식 등록 제품 식별 번호 |
| **PRODUCT_NAME** | 제품 명칭 | VARCHAR | 소비자 판매용 완제품명 |
| **CATEGORY_NAME** | 식품 유형명 | VARCHAR | 소스, 과자, 기타가공품 등 식품 분류 |
| **LICENSE_NUMBER** | 제조업체 인허가번호 | VARCHAR FK | 생산 공장 구청 등록 인허가 고유 식별 번호 |
| **MANUFACTURER_NAME** | 제조 회사명 | VARCHAR | 생산 담당 정식 사업자 상호명 |
| **FACTORY_ADDRESS** | 공장 소재지 도로명 주소 | VARCHAR | 물리 제조 시설 주소지 |
| **BARCODE** | 유통 바코드번호 | VARCHAR | 상품 바코드 번호 (바코드 없는 경우 "미연계") |
| **ADM_VIOLATION** | 제조사 행정법 위반 내역 | VARCHAR | 위생 기준 위반, 유통기한 경과 등 (적발 없을 시 "없음") |
| **IS_RECALLED** | 현재 긴급 회수 상태 여부 | INTEGER | 1 = 회수대상 위해 위해제품, 0 = 정상 유통 가능 |

### 🛠️ 데이터 세트 생성 실전 SQL (SQLite View)
```sql
CREATE VIEW IF NOT EXISTS v_developer_unified_standard_dataset AS
SELECT 
    P.PRDLST_REPORT_NO AS PRDLST_REPORT_NO,
    P.PRDLST_NM AS PRODUCT_NAME,
    P.PRDLST_DCNM AS CATEGORY_NAME,
    E.LCNS_NO AS LICENSE_NUMBER,
    E.BSSH_NM AS MANUFACTURER_NAME,
    E.ADDR AS FACTORY_ADDRESS,
    COALESCE(B.BAR_CD, '바코드 미연계') AS BARCODE,
    COALESCE(D.VILTCN, '위반내용 없음') AS ADM_VIOLATION,
    CASE 
        WHEN C.PRDLST_REPORT_NO IS NOT NULL THEN 1 
        ELSE 0 
    END AS IS_RECALLED
FROM I1250 P
INNER JOIN I2500 E 
    ON P.LCNS_NO = E.LCNS_NO
LEFT JOIN C005 B 
    ON P.PRDLST_REPORT_NO = B.PRDLST_REPORT_NO
LEFT JOIN I0470 D 
    ON E.LCNS_NO = D.LCNS_NO
LEFT JOIN I0490 C 
    ON P.PRDLST_REPORT_NO = C.PRDLST_REPORT_NO;
```

---

## 💡 종합 팁 및 활용 가이드

1. **로컬 플레이그라운드 테스트**: 
   현재 가동 중인 개발 환경인 **SQL Playground 탭**에서 위 `CREATE VIEW...` SQL 중 원하시는 데이터 세트의 스크립트를 그대로 복사하여 실행하시면 실시간으로 가상 데이터 마트 뷰가 구축됩니다.
2. **REST API 서비스 즉시 연동**:
   이후 모바일 앱이나 웹 프론트엔드를 구축하실 때 아래와 같이 백엔드에 쿼리를 날려 **완벽한 대화형 식품안전 융합 서비스**를 사용자들에게 직접 시연 및 배포하실 수 있습니다.
   ```javascript
   // 예: 바코드로 알레르기 및 회수 물질 즉각 판별하는 프론트엔드 연동
   const res = await fetch('/api/query', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ query: "SELECT * FROM v_user_barcode_allergy_dataset WHERE BAR_CD = '...';" })
   });
   const data = await res.json();
   ```
