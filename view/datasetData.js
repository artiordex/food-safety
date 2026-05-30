export const datasets = [
  {
    "id": "v_user_barcode_allergy_dataset",
    "name": "알레르기·유해성분 바코드 데이터 세트 (v_user_barcode_allergy_dataset)",
    "description": "바코드 제품 정보(C005)를 기반으로 제조원재료 명세(C002)와 위해식품 회수 내역(I0490)을 1초 만에 매핑하는 초경량 실시간 안심 소비 데이터 세트입니다.",
    "users": ["일반사용자", "개발자", "식단분석가"],
    "dataCount": 969,
    "formats": ["SQLite View", "JSON API"],
    "difficulty": "easy",
    "subject": "융합 데이터 세트",
    "process": "소비자안심",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": ["BAR_CD", "PRDLST_REPORT_NO", "PRDLST_NM", "PRDLST_DCNM", "ALL_INGREDIENTS", "IS_RECALLED", "RECALL_PRVNS"],
    "keys": ["BAR_CD"],
    "usageExample": "SELECT * FROM v_user_barcode_allergy_dataset WHERE BAR_CD = '8801007026732';",
    "detail": {
      "overview": "C005(바코드), I1250(품목마스터), C002(원재료), I0490(회수이력)을 결합하여 구축된 차세대 소비자 맞춤형 융합 뷰입니다.",
      "includedList": ["BAR_CD (바코드)", "PRDLST_REPORT_NO (보고번호)", "PRDLST_NM (제품명)", "PRDLST_DCNM (품목분류명)", "ALL_INGREDIENTS (원재료명세)", "IS_RECALLED (위해회수여부)", "RECALL_PRVNS (회수사유)"],
      "joinKeys": ["PK: BAR_CD", "FK: PRDLST_REPORT_NO"],
      "scenarios": ["알레르기 성분 자동 필터링", "모바일 영양 진단 및 회수 제품 경고"],
      "recommendedUsers": ["개인 맞춤형 헬스케어 앱 개발사", "영양 식단 서비스 기획자"],
      "guideLinks": [
        {
          "label": "Open API 포털 안내",
          "url": "https://www.foodsafetykorea.go.kr"
        }
      ],
      "examples": [
        "SELECT * FROM v_user_barcode_allergy_dataset WHERE BAR_CD = '8801007026732';"
      ]
    }
  },
  {
    "id": "v_supplier_risk_score_dataset",
    "name": "전국 제조업체 식품 안전 위험 등급 (v_supplier_risk_score_dataset)",
    "description": "전국 식품 공장 마스터(I2500), HACCP 지정 상태(I0580), 과거 행정처분 위반(I0470), 수거검사 부적합 이력(I2620)을 입체 결합한 기업 검증용 신용 등급 데이터 세트입니다.",
    "users": ["기업바이어", "대형유통사", "안전점검원"],
    "dataCount": 181,
    "formats": ["SQLite View", "CSV"],
    "difficulty": "intermediate",
    "subject": "융합 데이터 세트",
    "process": "위험관리",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": ["LCNS_NO", "BSSH_NM", "ADDR", "IS_HACCP_CERTIFIED", "VIOLATION_COUNT", "NON_COMPLIANT_COUNT", "SAFETY_GRADE"],
    "keys": ["LCNS_NO"],
    "usageExample": "SELECT * FROM v_supplier_risk_score_dataset WHERE SAFETY_GRADE LIKE 'Grade D%';",
    "detail": {
      "overview": "영업 중인 제조 업체들의 위생등급, 행정처분 횟수, 수거검사 실패 빈도를 종합 지표 연산하여 공장 안전성 등급(Grade A~D)을 평정합니다.",
      "includedList": ["LCNS_NO (인허가번호)", "BSSH_NM (업체명)", "ADDR (공장주소)", "IS_HACCP_CERTIFIED (HACCP지정여부)", "VIOLATION_COUNT (행정처분수)", "NON_COMPLIANT_COUNT (부적합검사수)", "SAFETY_GRADE (종합위험등급)"],
      "joinKeys": ["PK: LCNS_NO"],
      "scenarios": ["신규 OEM 공장 조달 리스크 평가", "식자재 벌크 매입처 위생 등급 필터링"],
      "recommendedUsers": ["대형 유통사 MD 및 바이어", "급식 원가/안전관리 책임자"],
      "guideLinks": [
        {
          "label": "Open API 포털 안내",
          "url": "https://www.foodsafetykorea.go.kr"
        }
      ],
      "examples": [
        "SELECT * FROM v_supplier_risk_score_dataset WHERE SAFETY_GRADE LIKE 'Grade D%';"
      ]
    }
  },
  {
    "id": "v_local_restaurant_hygiene_dataset",
    "name": "행정동별 안심 클린식당 뱃지 (v_local_restaurant_hygiene_dataset)",
    "description": "일반음식점/제과점 등 요식 업소의 인허가 정보(I2500)와 최근 발생한 행정처분 위반 내역(I0470)을 위치 주소 기반으로 매핑한 지역 위생 지도망입니다.",
    "users": ["배달앱개발사", "맛집기획자", "소비자"],
    "dataCount": 684,
    "formats": ["SQLite View", "GeoJSON API"],
    "difficulty": "easy",
    "subject": "융합 데이터 세트",
    "process": "매장관리",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": ["LCNS_NO", "BSSH_NM", "INDUTY_CD_NM", "FULL_ADDRESS", "SIDO", "RECENT_DISPOSAL", "RECENT_VIOLATION", "HYGIENE_STATUS"],
    "keys": ["LCNS_NO"],
    "usageExample": "SELECT * FROM v_local_restaurant_hygiene_dataset WHERE SIDO = '서울특별시' AND HYGIENE_STATUS LIKE '%Clean%';",
    "detail": {
      "overview": "요식 업소들의 영업 신고 소재지 주소와 최근 처분 결정 내역을 결합해 요식업 위생 상태를 안심(Clean), 경고(Warning) 뱃지로 판별합니다.",
      "includedList": ["LCNS_NO (인허가번호)", "BSSH_NM (식당명)", "INDUTY_CD_NM (업종구분)", "FULL_ADDRESS (상세주소)", "SIDO (행정구역)", "RECENT_DISPOSAL (처분내역)", "RECENT_VIOLATION (위반내용)", "HYGIENE_STATUS (위생안전등급)"],
      "joinKeys": ["PK: LCNS_NO"],
      "scenarios": ["배달의민족/쿠팡이츠 클린 뱃지 부여", "로컬 맛집 지도 위생 등급 연동"],
      "recommendedUsers": ["O2O 배달 플랫폼 백엔드 아키텍트", "지역 요식 정보망 설계 기획자"],
      "guideLinks": [
        {
          "label": "Open API 포털 안내",
          "url": "https://www.foodsafetykorea.go.kr"
        }
      ],
      "examples": [
        "SELECT * FROM v_local_restaurant_hygiene_dataset WHERE SIDO = '서울특별시' AND HYGIENE_STATUS LIKE '%Clean%';"
      ]
    }
  },
  {
    "id": "v_imported_food_risk_analysis_dataset",
    "name": "수입식품영업자 통관 위해진단 (v_imported_food_risk_analysis_dataset)",
    "description": "국내 정식 수입 영업소 대장(C001)과 수입 규정 위반으로 인한 행정처분(I0482) 데이터를 영업소 단위로 융합하여 통관 신뢰도와 위해 위험률을 진단하는 명세입니다.",
    "users": ["수입무역바이어", "관세사", "플랫폼기획자"],
    "dataCount": 71989,
    "formats": ["SQLite View", "JSON"],
    "difficulty": "hard",
    "subject": "융합 데이터 세트",
    "process": "수입통관",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": ["LCNS_NO", "BSSH_NM", "INDUTY_NM", "FULL_ADDRESS", "VIOLATION_COUNT", "RISK_LEVEL"],
    "keys": ["LCNS_NO"],
    "usageExample": "SELECT * FROM v_imported_food_risk_analysis_dataset WHERE VIOLATION_COUNT > 0;",
    "detail": {
      "overview": "7만 여 건의 수입 식품 업소의 영업 인허가 현황과 수입 규제법 위반 행정처분 이력을 융합해 수입 업자별 위해도를 계량화합니다.",
      "includedList": ["LCNS_NO (인허가번호)", "BSSH_NM (수입업체명)", "INDUTY_NM (수입업종구분)", "FULL_ADDRESS (영업소주소)", "VIOLATION_COUNT (처분적발건수)", "RISK_LEVEL (위해위험등급)"],
      "joinKeys": ["PK: LCNS_NO"],
      "scenarios": ["해외 수입 시 협력 관세 리스크 모의 사전 진단", "직구 대행 협력 업체 위법 행위 필터링"],
      "recommendedUsers": ["글로벌 무역 바이어 및 통관 담당자", "관세법인 정보 관리 솔루션 기획자"],
      "guideLinks": [
        {
          "label": "Open API 포털 안내",
          "url": "https://www.foodsafetykorea.go.kr"
        }
      ],
      "examples": [
        "SELECT * FROM v_imported_food_risk_analysis_dataset WHERE VIOLATION_COUNT > 0;"
      ]
    }
  },
  {
    "id": "api_tables",
    "name": "api_tables (api_tables)",
    "description": "식약처 OpenAPI api_tables 데이터베이스 테이블입니다. 총 169건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 169,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "svc_no",
      "svc_nm",
      "cat",
      "detail_url",
      "type_cd",
      "description",
      "sample_url",
      "sample_data_length"
    ],
    "keys": [
      "svc_no"
    ],
    "usageExample": "SELECT * FROM api_tables LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 api_tables 테이블의 메타데이터입니다.",
      "includedList": [
        "svc_no",
        "svc_nm",
        "cat",
        "detail_url",
        "type_cd",
        "description",
        "sample_url",
        "sample_data_length",
        "field_count",
        "view_name"
      ],
      "joinKeys": [
        "PK: svc_no"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT svc_no, svc_nm, cat FROM api_tables"
      ]
    }
  },
  {
    "id": "api_columns",
    "name": "api_columns (api_columns)",
    "description": "식약처 OpenAPI api_columns 데이터베이스 테이블입니다. 총 1867건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 1867,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "svc_no",
      "field",
      "kor_nm",
      "sql_type",
      "data_type",
      "length",
      "orig_type",
      "orig_length"
    ],
    "keys": [
      "svc_no",
      "field"
    ],
    "usageExample": "SELECT * FROM api_columns LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 api_columns 테이블의 메타데이터입니다.",
      "includedList": [
        "svc_no",
        "field",
        "kor_nm",
        "sql_type",
        "data_type",
        "length",
        "orig_type",
        "orig_length",
        "description",
        "sample",
        "infer_reason"
      ],
      "joinKeys": [
        "PK: svc_no",
        "PK: field"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT svc_no, field, kor_nm FROM api_columns"
      ]
    }
  },
  {
    "id": "I0600",
    "name": "HACCP 교육훈련기관 지정 현황 (I0600)",
    "description": "식약처 OpenAPI I0600 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "EDC_INSTT_APPN_NO",
      "BSSH_NM",
      "BSSH_ADDR",
      "PRSDNT_NM",
      "PRMS_DT"
    ],
    "keys": [
      "EDC_INSTT_APPN_NO"
    ],
    "usageExample": "SELECT * FROM I0600 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 HACCP 교육훈련기관 지정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "EDC_INSTT_APPN_NO",
        "BSSH_NM",
        "BSSH_ADDR",
        "PRSDNT_NM",
        "PRMS_DT"
      ],
      "joinKeys": [
        "PK: EDC_INSTT_APPN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT EDC_INSTT_APPN_NO, BSSH_NM, BSSH_ADDR FROM I0600"
      ]
    }
  },
  {
    "id": "I0580",
    "name": "HACCP 적용업소 지정 현황 (I0580)",
    "description": "식약처 OpenAPI I0580 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "LCNS_NO",
      "INDUTY_CD_NM",
      "BSSH_NM",
      "PRSDNT_NM",
      "SITE_ADDR",
      "HACCP_APPN_DT",
      "HACCP_APPN_NO",
      "PRDLST_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0580 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 HACCP 적용업소 지정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "INDUTY_CD_NM",
        "BSSH_NM",
        "PRSDNT_NM",
        "SITE_ADDR",
        "HACCP_APPN_DT",
        "HACCP_APPN_NO",
        "PRDLST_NM",
        "CLSBIZ_DVS_CD_NM",
        "CLSBIZ_DT",
        "ASGN_CANCL_DT",
        "CRTFC_ENDDT",
        "CRTFC_RETN_DT"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, INDUTY_CD_NM, BSSH_NM FROM I0580"
      ]
    }
  },
  {
    "id": "I0130",
    "name": "LMO 수입 승인 현황 (I0130)",
    "description": "식약처 OpenAPI I0130 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LMO_CONFM_NO",
      "CONFM_DT",
      "BSSH_NM",
      "ADDR",
      "COMMON_NM",
      "SYSTM_NM",
      "BNE_NM",
      "PRPOS"
    ],
    "keys": [
      "LMO_CONFM_NO"
    ],
    "usageExample": "SELECT * FROM I0130 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 LMO 수입 승인 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LMO_CONFM_NO",
        "CONFM_DT",
        "BSSH_NM",
        "ADDR",
        "COMMON_NM",
        "SYSTM_NM",
        "BNE_NM",
        "PRPOS",
        "NATN_CD_NM"
      ],
      "joinKeys": [
        "PK: LMO_CONFM_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LMO_CONFM_NO, CONFM_DT, BSSH_NM FROM I0130"
      ]
    }
  },
  {
    "id": "I2580",
    "name": "개별기준규격 (I2580)",
    "description": "식약처 OpenAPI I2580 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "INDV_SPEC_SEQ",
      "PRDLST_CD",
      "PRDLST_CD_NM",
      "TESTITM_CD",
      "TESTITM_NM",
      "FNPRT_ITM_NM",
      "ATTRB_SEQ",
      "PIAM_KOR_NM"
    ],
    "keys": [
      "INDV_SPEC_SEQ"
    ],
    "usageExample": "SELECT * FROM I2580 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 개별기준규격 테이블의 메타데이터입니다.",
      "includedList": [
        "INDV_SPEC_SEQ",
        "PRDLST_CD",
        "PRDLST_CD_NM",
        "TESTITM_CD",
        "TESTITM_NM",
        "FNPRT_ITM_NM",
        "ATTRB_SEQ",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "VALD_MANLI",
        "JDGMNT_FOM_CD",
        "A079_FNPRT_CD_NM",
        "MXMM_VAL",
        "MXMM_VAL_DVS_CD",
        "A081_FNPRT_CD_NM",
        "MIMM_VAL",
        "MIMM_VAL_DVS_CD",
        "A080_FNPRT_CD_NM",
        "CHOIC_FIT",
        "A082_CF_FNPRT_CD_NM",
        "CHOIC_IMPROPT",
        "A082_CI_FNPRT_CD_NM",
        "MCRRGNSM_2N",
        "MCRRGNSM_2C",
        "MCRRGNSM_2M",
        "MCRRGNSM_3M",
        "FNPRT_ITM_INCLS_YN",
        "INJRY_YN",
        "EMPHS_PRSEC_TESTITM_YN",
        "MONTRNG_TESTITM_YN",
        "RVLV_ELSE_TESTITM_YN",
        "NTR_PRSEC_ITM_YN",
        "UNIT_CD",
        "UNIT_NM",
        "UPDT_PRVNS",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: INDV_SPEC_SEQ",
        "FK: TESTITM_CD -> I2530.TESTITM_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT INDV_SPEC_SEQ, PRDLST_CD, PRDLST_CD_NM FROM I2580"
      ]
    }
  },
  {
    "id": "I-0050",
    "name": "건강기능식품 개별인정형 정보 (I-0050)",
    "description": "식약처 OpenAPI I-0050 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HF_FNCLTY_MTRAL_RCOGN_NO",
      "DAY_INTK_HIGHLIMIT",
      "DAY_INTK_LOWLIMIT",
      "WT_UNIT",
      "RAWMTRL_NM",
      "IFTKN_ATNT_MATR_CN",
      "PRIMARY_FNCLTY"
    ],
    "keys": [
      "HF_FNCLTY_MTRAL_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I-0050 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 개별인정형 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HF_FNCLTY_MTRAL_RCOGN_NO",
        "DAY_INTK_HIGHLIMIT",
        "DAY_INTK_LOWLIMIT",
        "WT_UNIT",
        "RAWMTRL_NM",
        "IFTKN_ATNT_MATR_CN",
        "PRIMARY_FNCLTY"
      ],
      "joinKeys": [
        "PK: HF_FNCLTY_MTRAL_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HF_FNCLTY_MTRAL_RCOGN_NO, DAY_INTK_HIGHLIMIT, DAY_INTK_LOWLIMIT FROM I-0050"
      ]
    }
  },
  {
    "id": "I-0040",
    "name": "건강기능식품 기능성 원료인정현황 (I-0040)",
    "description": "식약처 OpenAPI I-0040 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "영양·건강",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HF_FNCLTY_MTRAL_RCOGN_NO",
      "PRMS_DT",
      "BSSH_NM",
      "INDUTY_NM",
      "ADDR",
      "APLC_RAWMTRL_NM",
      "FNCLTY_CN",
      "DAY_INTK_CN"
    ],
    "keys": [
      "HF_FNCLTY_MTRAL_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I-0040 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 기능성 원료인정현황 테이블의 메타데이터입니다.",
      "includedList": [
        "HF_FNCLTY_MTRAL_RCOGN_NO",
        "PRMS_DT",
        "BSSH_NM",
        "INDUTY_NM",
        "ADDR",
        "APLC_RAWMTRL_NM",
        "FNCLTY_CN",
        "DAY_INTK_CN",
        "IFTKN_ATNT_MATR_CN"
      ],
      "joinKeys": [
        "PK: HF_FNCLTY_MTRAL_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HF_FNCLTY_MTRAL_RCOGN_NO, PRMS_DT, BSSH_NM FROM I-0040"
      ]
    }
  },
  {
    "id": "I0310",
    "name": "건강기능식품 생산실적 보고 품목 현황 (I0310)",
    "description": "식약처 OpenAPI I0310 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "PRDLST_NM",
      "GUBUN",
      "H_ITEM_NM",
      "LCNS_NO",
      "EVL_YR",
      "PRDLST_REPORT_NO",
      "FYER_PRDCTN_ABRT_QY"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I0310 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 생산실적 보고 품목 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRDLST_NM",
        "GUBUN",
        "H_ITEM_NM",
        "LCNS_NO",
        "EVL_YR",
        "PRDLST_REPORT_NO",
        "FYER_PRDCTN_ABRT_QY",
        "PRDCTN_QY"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I0310"
      ]
    }
  },
  {
    "id": "I0760",
    "name": "건강기능식품 영양DB (I0760)",
    "description": "식약처 OpenAPI I0760 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "영양·건강",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "헬스케어 앱 개발용",
    "includedData": [
      "HELT_ITM_GRP_CD",
      "HELT_ITM_GRP_NM",
      "LCLAS_CD",
      "LCLAS_NM",
      "MLSFC_CD",
      "MLSFC_NM",
      "SCLAS_CD",
      "SCLAS_NM"
    ],
    "keys": [
      "HELT_ITM_GRP_CD"
    ],
    "usageExample": "SELECT * FROM I0760 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 영양DB 테이블의 메타데이터입니다.",
      "includedList": [
        "HELT_ITM_GRP_CD",
        "HELT_ITM_GRP_NM",
        "LCLAS_CD",
        "LCLAS_NM",
        "MLSFC_CD",
        "MLSFC_NM",
        "SCLAS_CD",
        "SCLAS_NM"
      ],
      "joinKeys": [
        "PK: HELT_ITM_GRP_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HELT_ITM_GRP_CD, HELT_ITM_GRP_NM, LCLAS_CD FROM I0760"
      ]
    }
  },
  {
    "id": "I-0020",
    "name": "건강기능식품 전문.벤처제조업인허가 현황 (I-0020)",
    "description": "식약처 OpenAPI I-0020 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I-0020 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 전문.벤처제조업인허가 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I-0020"
      ]
    }
  },
  {
    "id": "I2822",
    "name": "건강기능식품 폐업정보 (I2822)",
    "description": "식약처 OpenAPI I2822 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2822 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2822"
      ]
    }
  },
  {
    "id": "I2710",
    "name": "건강기능식품 품목분류정보 (I2710)",
    "description": "식약처 OpenAPI I2710 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDCT_NM",
      "IFTKN_ATNT_MATR_CN",
      "PRIMARY_FNCLTY",
      "DAY_INTK_LOWLIMIT",
      "DAY_INTK_HIGHLIMIT",
      "INTK_UNIT",
      "INTK_MEMO",
      "SKLL_IX_IRDNT_RAWMTRL"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2710 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 품목분류정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDCT_NM",
        "IFTKN_ATNT_MATR_CN",
        "PRIMARY_FNCLTY",
        "DAY_INTK_LOWLIMIT",
        "DAY_INTK_HIGHLIMIT",
        "INTK_UNIT",
        "INTK_MEMO",
        "SKLL_IX_IRDNT_RAWMTRL",
        "CRET_DTM",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDCT_NM, IFTKN_ATNT_MATR_CN, PRIMARY_FNCLTY FROM I2710"
      ]
    }
  },
  {
    "id": "I0030",
    "name": "건강기능식품 품목제조 신고사항 현황 (I0030)",
    "description": "식약처 OpenAPI I0030 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRDLST_NM",
      "PRMS_DT",
      "POG_DAYCNT",
      "DISPOS",
      "NTK_MTHD"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0030 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 품목제조 신고사항 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRDLST_NM",
        "PRMS_DT",
        "POG_DAYCNT",
        "DISPOS",
        "NTK_MTHD",
        "PRIMARY_FNCLTY",
        "IFTKN_ATNT_MATR_CN",
        "CSTDY_MTHD",
        "PRDLST_CDNM",
        "STDR_STND",
        "HIENG_LNTRT_DVS_NM",
        "PRODUCTION",
        "CHILD_CRTFC_YN",
        "PRDT_SHAP_CD_NM",
        "FRMLC_MTRQLT",
        "RAWMTRL_NM",
        "INDUTY_CD_NM",
        "LAST_UPDT_DTM",
        "INDIV_RAWMTRL_NM",
        "ETC_RAWMTRL_NM",
        "CAP_RAWMTRL_NM",
        "FRMLC_MTHD"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I0030"
      ]
    }
  },
  {
    "id": "C003",
    "name": "건강기능식품 품목제조신고(원재료) (C003)",
    "description": "식약처 OpenAPI C003 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRDLST_NM",
      "PRMS_DT",
      "POG_DAYCNT",
      "DISPOS",
      "NTK_MTHD"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM C003 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품 품목제조신고(원재료) 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRDLST_NM",
        "PRMS_DT",
        "POG_DAYCNT",
        "DISPOS",
        "NTK_MTHD",
        "PRIMARY_FNCLTY",
        "IFTKN_ATNT_MATR_CN",
        "CSTDY_MTHD",
        "SHAP",
        "STDR_STND",
        "RAWMTRL_NM",
        "CRET_DTM",
        "LAST_UPDT_DTM",
        "PRDT_SHAP_CD_NM"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM C003"
      ]
    }
  },
  {
    "id": "I0630",
    "name": "건강기능식품GMP 지정 현황 (I0630)",
    "description": "식약처 OpenAPI I0630 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "GMP_APPN_NO",
      "APPN_DT",
      "BSSH_NM",
      "LCNS_NO",
      "APPN_CANCL_DT",
      "INDUTY_CD_NM",
      "PRSDNT_NM"
    ],
    "keys": [
      "GMP_APPN_NO"
    ],
    "usageExample": "SELECT * FROM I0630 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품GMP 지정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "GMP_APPN_NO",
        "APPN_DT",
        "BSSH_NM",
        "LCNS_NO",
        "APPN_CANCL_DT",
        "INDUTY_CD_NM",
        "PRSDNT_NM"
      ],
      "joinKeys": [
        "PK: GMP_APPN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT GMP_APPN_NO, APPN_DT, BSSH_NM FROM I0630"
      ]
    }
  },
  {
    "id": "I0960",
    "name": "건강기능식품공전 (I0960)",
    "description": "식약처 OpenAPI I0960 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_CD",
      "PC_KOR_NM",
      "TESTITM_CD",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT"
    ],
    "keys": [
      "TESTITM_CD"
    ],
    "usageExample": "SELECT * FROM I0960 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품공전 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_CD",
        "PC_KOR_NM",
        "TESTITM_CD",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "INJRY_YN",
        "UNIT_NM"
      ],
      "joinKeys": [
        "PK: TESTITM_CD",
        "FK: TESTITM_CD -> I2530.TESTITM_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0960"
      ]
    }
  },
  {
    "id": "I2860",
    "name": "건강기능식품업소 인허가 변경 정보 (I2860)",
    "description": "식약처 OpenAPI I2860 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "TELNO",
      "SITE_ADDR",
      "CHNG_DT",
      "CHNG_BF_CN",
      "CHNG_AF_CN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2860 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품업소 인허가 변경 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "TELNO",
        "SITE_ADDR",
        "CHNG_DT",
        "CHNG_BF_CN",
        "CHNG_AF_CN",
        "CHNG_PRVNS"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2860"
      ]
    }
  },
  {
    "id": "I2839",
    "name": "건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황 (I2839)",
    "description": "식약처 OpenAPI I2839 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PLAN_CLCD",
      "CHCK_BGNDT",
      "CHCK_ENDDT",
      "EXC_INSTTCD",
      "BSSH_NM",
      "GIDCHCK_DT",
      "BLDINSCTR_NAME",
      "GIDCHCK_RSLTCD"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2839 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PLAN_CLCD",
        "CHCK_BGNDT",
        "CHCK_ENDDT",
        "EXC_INSTTCD",
        "BSSH_NM",
        "GIDCHCK_DT",
        "BLDINSCTR_NAME",
        "GIDCHCK_RSLTCD",
        "PLAN_TITL"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PLAN_CLCD, CHCK_BGNDT, CHCK_ENDDT FROM I2839"
      ]
    }
  },
  {
    "id": "I1290",
    "name": "건강기능식품판매업 (I1290)",
    "description": "식약처 OpenAPI I1290 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1290 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 건강기능식품판매업 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1290"
      ]
    }
  },
  {
    "id": "I2640",
    "name": "검사부적합 현황(농산물) (I2640)",
    "description": "식약처 OpenAPI I2640 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDTNM",
      "BSSHNM",
      "MNFDT",
      "DISTBTMLMT",
      "ADDR",
      "INSTT_NM",
      "REGSTR_TELNO",
      "BRCDNO"
    ],
    "keys": [
      "RTRVLDSUSE_SEQ"
    ],
    "usageExample": "SELECT * FROM I2640 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 검사부적합 현황(농산물) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDTNM",
        "BSSHNM",
        "MNFDT",
        "DISTBTMLMT",
        "ADDR",
        "INSTT_NM",
        "REGSTR_TELNO",
        "BRCDNO",
        "FRMLCUNIT",
        "TEST_ITMNM",
        "STDR_STND",
        "TESTANALS_RSLT",
        "CRET_DTM",
        "RTRVLDSUSE_SEQ",
        "LCNS_NO",
        "REPORTR_TELNO"
      ],
      "joinKeys": [
        "PK: RTRVLDSUSE_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDTNM, BSSHNM, MNFDT FROM I2640"
      ]
    }
  },
  {
    "id": "I2620",
    "name": "검사부적합(국내) (I2620)",
    "description": "식약처 OpenAPI I2620 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDTNM",
      "BSSHNM",
      "MNFDT",
      "DISTBTMLMT",
      "ADDR",
      "INSTT_NM",
      "REGSTR_TELNO",
      "BRCDNO"
    ],
    "keys": [
      "RTRVLDSUSE_SEQ"
    ],
    "usageExample": "SELECT * FROM I2620 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 검사부적합(국내) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDTNM",
        "BSSHNM",
        "MNFDT",
        "DISTBTMLMT",
        "ADDR",
        "INSTT_NM",
        "REGSTR_TELNO",
        "BRCDNO",
        "FRMLCUNIT",
        "TEST_ITMNM",
        "STDR_STND",
        "TESTANALS_RSLT",
        "CRET_DTM",
        "RTRVLDSUSE_SEQ",
        "PRDLST_REPORT_NO",
        "LCNS_NO",
        "REPORTR_TELNO",
        "PRDLST_CD_NM"
      ],
      "joinKeys": [
        "PK: RTRVLDSUSE_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDTNM, BSSHNM, MNFDT FROM I2620"
      ]
    }
  },
  {
    "id": "I2857",
    "name": "공유주방운영업 인허가 대장 (I2857)",
    "description": "식약처 OpenAPI I2857 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "TELNO",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2857 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 공유주방운영업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "TELNO",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2857"
      ]
    }
  },
  {
    "id": "I2600",
    "name": "공통기준규격 (I2600)",
    "description": "식약처 OpenAPI I2600 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CMMN_SPEC_SEQ",
      "CMMN_SPEC_CD",
      "SPEC_NM",
      "PRDLST_CD",
      "PRDLST_CD_NM",
      "TESTITM_CD",
      "TESTITM_NM",
      "FNPRT_ITM_NM"
    ],
    "keys": [
      "CMMN_SPEC_SEQ"
    ],
    "usageExample": "SELECT * FROM I2600 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 공통기준규격 테이블의 메타데이터입니다.",
      "includedList": [
        "CMMN_SPEC_SEQ",
        "CMMN_SPEC_CD",
        "SPEC_NM",
        "PRDLST_CD",
        "PRDLST_CD_NM",
        "TESTITM_CD",
        "TESTITM_NM",
        "FNPRT_ITM_NM",
        "ATTRB_SEQ",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "VALD_MANLI",
        "JDGMNT_FOM_CD",
        "A079_FNPRT_CD_NM",
        "MXMM_VAL",
        "MXMM_VAL_DVS_CD",
        "A081_FNPRT_CD_NM",
        "MIMM_VAL",
        "MIMM_VAL_DVS_CD",
        "A080_FNPRT_CD_NM",
        "CHOIC_FIT",
        "A082_CF_FNPRT_CD_NM",
        "CHOIC_IMPROPT",
        "A082_CI_FNPRT_CD_NM",
        "MCRRGNSM_2N",
        "MCRRGNSM_2C",
        "MCRRGNSM_2M",
        "MCRRGNSM_3M",
        "FNPRT_ITM_INCLS_YN",
        "INJRY_YN",
        "EMPHS_PRSEC_TESTITM_YN",
        "MONTRNG_TESTITM_YN",
        "RVLV_ELSE_TESTITM_YN",
        "NTR_PRSEC_ITM_YN",
        "UNIT_CD",
        "UNIT_NM",
        "UPDT_PRVNS",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: CMMN_SPEC_SEQ",
        "FK: TESTITM_CD -> I2530.TESTITM_CD",
        "FK: PRDLST_CD -> I2510.PRDLST_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CMMN_SPEC_SEQ, CMMN_SPEC_CD, SPEC_NM FROM I2600"
      ]
    }
  },
  {
    "id": "I2610",
    "name": "공통기준제외 (I2610)",
    "description": "식약처 OpenAPI I2610 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CMMN_SPEC_CD",
      "SPEC_NM",
      "PRDLST_CD",
      "KOR_NM",
      "TESTITM_CD",
      "LAST_UPDT_DTM"
    ],
    "keys": [
      "PRDLST_CD",
      "TESTITM_CD"
    ],
    "usageExample": "SELECT * FROM I2610 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 공통기준제외 테이블의 메타데이터입니다.",
      "includedList": [
        "CMMN_SPEC_CD",
        "SPEC_NM",
        "PRDLST_CD",
        "KOR_NM",
        "TESTITM_CD",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: PRDLST_CD",
        "PK: TESTITM_CD",
        "FK: TESTITM_CD -> I2530.TESTITM_CD",
        "FK: PRDLST_CD -> I2510.PRDLST_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CMMN_SPEC_CD, SPEC_NM, PRDLST_CD FROM I2610"
      ]
    }
  },
  {
    "id": "I2590",
    "name": "공통기준종류 (I2590)",
    "description": "식약처 OpenAPI I2590 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CMMN_SPEC_CD",
      "SPEC_NM",
      "HRNK_CMMN_SPEC_CD",
      "LV",
      "DFN",
      "USE_YN",
      "LAST_UPDT_DTM"
    ],
    "keys": [
      "CMMN_SPEC_CD"
    ],
    "usageExample": "SELECT * FROM I2590 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 공통기준종류 테이블의 메타데이터입니다.",
      "includedList": [
        "CMMN_SPEC_CD",
        "SPEC_NM",
        "HRNK_CMMN_SPEC_CD",
        "LV",
        "DFN",
        "USE_YN",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: CMMN_SPEC_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CMMN_SPEC_CD, SPEC_NM, HRNK_CMMN_SPEC_CD FROM I2590"
      ]
    }
  },
  {
    "id": "I1660",
    "name": "과징금부과기준 (I1660)",
    "description": "식약처 OpenAPI I1660 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "DSPS_STDR_CD_NM",
      "LAWORD_CD_NM",
      "BASIS_LAWORD",
      "VILT_TYPE_NM",
      "LV_NO",
      "VALD_BGN_DT",
      "VALD_END_DT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1660 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 과징금부과기준 테이블의 메타데이터입니다.",
      "includedList": [
        "DSPS_STDR_CD_NM",
        "LAWORD_CD_NM",
        "BASIS_LAWORD",
        "VILT_TYPE_NM",
        "LV_NO",
        "VALD_BGN_DT",
        "VALD_END_DT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT DSPS_STDR_CD_NM, LAWORD_CD_NM, BASIS_LAWORD FROM I1660"
      ]
    }
  },
  {
    "id": "I1670",
    "name": "과태료부과기준 (I1670)",
    "description": "식약처 OpenAPI I1670 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "DSPS_STDR_CD",
      "DSPS_STDR_CD_NM",
      "LV_NO",
      "BASIS_LAWORD",
      "VILT_TYPE_NM",
      "VALD_BGN_DT",
      "VALD_END_DT"
    ],
    "keys": [
      "DSPS_STDR_CD"
    ],
    "usageExample": "SELECT * FROM I1670 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 과태료부과기준 테이블의 메타데이터입니다.",
      "includedList": [
        "DSPS_STDR_CD",
        "DSPS_STDR_CD_NM",
        "LV_NO",
        "BASIS_LAWORD",
        "VILT_TYPE_NM",
        "VALD_BGN_DT",
        "VALD_END_DT"
      ],
      "joinKeys": [
        "PK: DSPS_STDR_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT DSPS_STDR_CD, DSPS_STDR_CD_NM, LV_NO FROM I1670"
      ]
    }
  },
  {
    "id": "I0910",
    "name": "국외검사기관 인정 현황 (I0910)",
    "description": "식약처 OpenAPI I0910 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRSEC_INSTT_RCOGN_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "APPN_BGN_DT",
      "PRSEC_ITM_CD_NM",
      "TELNO",
      "BSSH_ADDR"
    ],
    "keys": [
      "PRSEC_INSTT_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I0910 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 국외검사기관 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PRSEC_INSTT_RCOGN_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "APPN_BGN_DT",
        "PRSEC_ITM_CD_NM",
        "TELNO",
        "BSSH_ADDR"
      ],
      "joinKeys": [
        "PK: PRSEC_INSTT_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRSEC_INSTT_RCOGN_NO, BSSH_NM, PRSDNT_NM FROM I0910"
      ]
    }
  },
  {
    "id": "I0990",
    "name": "기구 및 용기.포장의 한시적 기준 및 규격 인정 현황 (I0990)",
    "description": "식약처 OpenAPI I0990 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LIMIT_STDR_STND_RCOGN_NO",
      "RCOGN_DT",
      "BSSH_NM",
      "PRSDNT_NM",
      "TELNO",
      "MC_NM",
      "PRDT_NM",
      "MC_NATN_CD_NM"
    ],
    "keys": [
      "LIMIT_STDR_STND_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I0990 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 기구 및 용기.포장의 한시적 기준 및 규격 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LIMIT_STDR_STND_RCOGN_NO",
        "RCOGN_DT",
        "BSSH_NM",
        "PRSDNT_NM",
        "TELNO",
        "MC_NM",
        "PRDT_NM",
        "MC_NATN_CD_NM"
      ],
      "joinKeys": [
        "PK: LIMIT_STDR_STND_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I0990"
      ]
    }
  },
  {
    "id": "I1240",
    "name": "기구.용기포장제조업 (I1240)",
    "description": "식약처 OpenAPI I1240 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1240 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 기구.용기포장제조업 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1240"
      ]
    }
  },
  {
    "id": "I1100",
    "name": "기구등의 살균소독제 기준규격 (I1100)",
    "description": "식약처 OpenAPI I1100 데이터베이스 테이블입니다. 총 0건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 0,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PC_KOR_NM",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "PIAM_KOR_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT",
      "VALD_END_DT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1100 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 기구등의 살균소독제 기준규격 테이블의 메타데이터입니다.",
      "includedList": [
        "PC_KOR_NM",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "INJRY_YN",
        "UNIT_NM",
        "UPDT_PRVNS",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PC_KOR_NM, T_KOR_NM, FNPRT_ITM_NM FROM I1100"
      ]
    }
  },
  {
    "id": "I1010",
    "name": "기구등의 살균소독제 한시적 기준 및 규격 인정 현황 (I1010)",
    "description": "식약처 OpenAPI I1010 데이터베이스 테이블입니다. 총 2건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 2,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LIMIT_STDR_STND_RCOGN_NO",
      "RCOGN_DT",
      "BSSH_NM",
      "PRSDNT_NM",
      "TELNO",
      "MC_NM",
      "PRDT_NM",
      "MC_NATN_CD_NM"
    ],
    "keys": [
      "LIMIT_STDR_STND_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I1010 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 기구등의 살균소독제 한시적 기준 및 규격 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LIMIT_STDR_STND_RCOGN_NO",
        "RCOGN_DT",
        "BSSH_NM",
        "PRSDNT_NM",
        "TELNO",
        "MC_NM",
        "PRDT_NM",
        "MC_NATN_CD_NM"
      ],
      "joinKeys": [
        "PK: LIMIT_STDR_STND_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I1010"
      ]
    }
  },
  {
    "id": "I2847",
    "name": "나트륨 줄이기 실천음식점 지정업체 대장 (I2847)",
    "description": "식약처 OpenAPI I2847 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "INDUTY_CD_NM",
      "SITE_ADDR",
      "APPT_YMD",
      "ETC_INFO",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2847 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 나트륨 줄이기 실천음식점 지정업체 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "INDUTY_CD_NM",
        "SITE_ADDR",
        "APPT_YMD",
        "ETC_INFO",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, INDUTY_CD_NM FROM I2847"
      ]
    }
  },
  {
    "id": "I1870",
    "name": "농산물 안전성검사기관 정보 (I1870)",
    "description": "식약처 OpenAPI I1870 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "APPN_NO",
      "APPN_DT",
      "APPN_INSTT_NM",
      "PRSEC_INSTT_LOCPLC",
      "PRSEC_WORK_SCOPE",
      "HRMF_MTTR_ITM",
      "TELNO"
    ],
    "keys": [
      "APPN_NO"
    ],
    "usageExample": "SELECT * FROM I1870 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농산물 안전성검사기관 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "APPN_NO",
        "APPN_DT",
        "APPN_INSTT_NM",
        "PRSEC_INSTT_LOCPLC",
        "PRSEC_WORK_SCOPE",
        "HRMF_MTTR_ITM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: APPN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT APPN_NO, APPN_DT, APPN_INSTT_NM FROM I1870"
      ]
    }
  },
  {
    "id": "I1790",
    "name": "농산물이력추적 생산정보 (I1790)",
    "description": "식약처 OpenAPI I1790 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HIST_TRACE_REG_NO",
      "REG_INSTT_NM",
      "RPRSNT_PRDLST_NM",
      "PRSDNT_NM",
      "ORGN_NM",
      "VALD_PRICE_BGN_DT",
      "VALD_PRICE_END_DT"
    ],
    "keys": [
      "HIST_TRACE_REG_NO"
    ],
    "usageExample": "SELECT * FROM I1790 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농산물이력추적 생산정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HIST_TRACE_REG_NO",
        "REG_INSTT_NM",
        "RPRSNT_PRDLST_NM",
        "PRSDNT_NM",
        "ORGN_NM",
        "VALD_PRICE_BGN_DT",
        "VALD_PRICE_END_DT"
      ],
      "joinKeys": [
        "PK: HIST_TRACE_REG_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HIST_TRACE_REG_NO, REG_INSTT_NM, RPRSNT_PRDLST_NM FROM I1790"
      ]
    }
  },
  {
    "id": "I1800",
    "name": "농산물이력추적 유통정보 (I1800)",
    "description": "식약처 OpenAPI I1800 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HIST_TRACE_REG_NO",
      "GRP_NM",
      "PRSDNT_NM",
      "TELNO"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1800 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농산물이력추적 유통정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HIST_TRACE_REG_NO",
        "GRP_NM",
        "PRSDNT_NM",
        "TELNO"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HIST_TRACE_REG_NO, GRP_NM, PRSDNT_NM FROM I1800"
      ]
    }
  },
  {
    "id": "I1910",
    "name": "농약 등록정보 (I1910)",
    "description": "식약처 OpenAPI I1910 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "유해물질 검출",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_KOR_NM",
      "PRDLST_ENG_NM",
      "BRND_NM",
      "AGCHM_PRDLST_NO",
      "PRDLST_REG_NO",
      "MDC_SHAP_NM",
      "AGCHM_DVS_NM",
      "PRPOS_DVS_CD_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1910 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농약 등록정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_KOR_NM",
        "PRDLST_ENG_NM",
        "BRND_NM",
        "AGCHM_PRDLST_NO",
        "PRDLST_REG_NO",
        "MDC_SHAP_NM",
        "AGCHM_DVS_NM",
        "PRPOS_DVS_CD_NM",
        "SICKNS_HLSCT_NM_WEEDS_NM",
        "CROPS_NM",
        "AGCHM_USE_MTHD",
        "USE_PPRTM",
        "DILU_DRNG",
        "USE_QTY",
        "USE_UNIT",
        "USE_TMNO",
        "BUSS_REG_NO",
        "BUSS_REG_EVNT_NM",
        "CPR_NM",
        "PRSDNT_NM",
        "ADDR",
        "MNF_INCM_DVS_NM",
        "PRDLST_REG_VALD_DT",
        "PRDLST_REG_DT",
        "TEST_DRGS_NM",
        "PRDLST_REG_STND",
        "REG_YN_NM",
        "PERSN_LVSTCK_TOXCTY",
        "ECLGY_TOXCTY"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_KOR_NM, PRDLST_ENG_NM, BRND_NM FROM I1910"
      ]
    }
  },
  {
    "id": "I1040",
    "name": "농약잔류허용기준 (I1040)",
    "description": "식약처 OpenAPI I1040 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "유해물질 검출",
    "theme": "일반 조회용",
    "includedData": [
      "AGCHM_KOR_NM",
      "FOOD_KOR_NM",
      "OPERTN_CITYPOINT",
      "STEP",
      "MRL_VAL",
      "DSUSE_YN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1040 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농약잔류허용기준 테이블의 메타데이터입니다.",
      "includedList": [
        "AGCHM_KOR_NM",
        "FOOD_KOR_NM",
        "OPERTN_CITYPOINT",
        "STEP",
        "MRL_VAL",
        "DSUSE_YN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT AGCHM_KOR_NM, FOOD_KOR_NM, OPERTN_CITYPOINT FROM I1040"
      ]
    }
  },
  {
    "id": "I1850",
    "name": "농축산물유통관리 허위표시공표정보 (I1850)",
    "description": "식약처 OpenAPI I1850 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSN_KND_NM",
      "ENTRPS_NM",
      "ENTRPS_BASS_ADDR",
      "VILT_DTLS",
      "PUBLC_BGN_DT",
      "PUBLC_END_DT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1850 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농축산물유통관리 허위표시공표정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSN_KND_NM",
        "ENTRPS_NM",
        "ENTRPS_BASS_ADDR",
        "VILT_DTLS",
        "PUBLC_BGN_DT",
        "PUBLC_END_DT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSN_KND_NM, ENTRPS_NM, ENTRPS_BASS_ADDR FROM I1850"
      ]
    }
  },
  {
    "id": "I1860",
    "name": "농축산물유통관리 허위표시품목정보 (I1860)",
    "description": "식약처 OpenAPI I1860 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSN_KND_NM",
      "ENTRPS_NM",
      "ENTRPS_BASS_ADDR",
      "VILT_DTLS",
      "PUBLC_BGN_DT",
      "PUBLC_END_DT",
      "VILT_CN",
      "DSPS_CN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1860 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 농축산물유통관리 허위표시품목정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSN_KND_NM",
        "ENTRPS_NM",
        "ENTRPS_BASS_ADDR",
        "VILT_DTLS",
        "PUBLC_BGN_DT",
        "PUBLC_END_DT",
        "VILT_CN",
        "DSPS_CN",
        "PRDLST_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSN_KND_NM, ENTRPS_NM, ENTRPS_BASS_ADDR FROM I1860"
      ]
    }
  },
  {
    "id": "I2858",
    "name": "도축업 인허가 대장 (I2858)",
    "description": "식약처 OpenAPI I2858 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2858 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 도축업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2858"
      ]
    }
  },
  {
    "id": "I1070",
    "name": "동물용의약품 현황 (I1070)",
    "description": "식약처 OpenAPI I1070 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "ANIMAL_ONLY_MDCIN_NM_KOR",
      "ANIMAL_ONLY_MDCIN_NM_ENG",
      "APPLC_OBJ_ANIMAL",
      "MCFRL",
      "MCWGH",
      "SYSTM_NM",
      "IUPAC_NM",
      "CAS_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1070 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 동물용의약품 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "ANIMAL_ONLY_MDCIN_NM_KOR",
        "ANIMAL_ONLY_MDCIN_NM_ENG",
        "APPLC_OBJ_ANIMAL",
        "MCFRL",
        "MCWGH",
        "SYSTM_NM",
        "IUPAC_NM",
        "CAS_NM",
        "SHAP_NM",
        "POIOF",
        "BOILPNT",
        "STEPR",
        "LOGPOW",
        "DENS_UNIT",
        "PKA",
        "SOLUB",
        "STBLY"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT ANIMAL_ONLY_MDCIN_NM_KOR, ANIMAL_ONLY_MDCIN_NM_ENG, APPLC_OBJ_ANIMAL FROM I1070"
      ]
    }
  },
  {
    "id": "I1080",
    "name": "동물의약품별 잔류허용 기준 (I1080)",
    "description": "식약처 OpenAPI I1080 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CDX_KOREA_DVS_CD",
      "ANIMAL_ONLY_MDCIN_NM_KOR",
      "OPERTN_CITYPOINT",
      "STEP",
      "MRL",
      "FOOD_KOR_NM",
      "FOOD_ENG_NM",
      "ETC_YN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1080 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 동물의약품별 잔류허용 기준 테이블의 메타데이터입니다.",
      "includedList": [
        "CDX_KOREA_DVS_CD",
        "ANIMAL_ONLY_MDCIN_NM_KOR",
        "OPERTN_CITYPOINT",
        "STEP",
        "MRL",
        "FOOD_KOR_NM",
        "FOOD_ENG_NM",
        "ETC_YN",
        "TMPR_STDR_APPLC_YN",
        "DSUSE_YN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CDX_KOREA_DVS_CD, ANIMAL_ONLY_MDCIN_NM_KOR, OPERTN_CITYPOINT FROM I1080"
      ]
    }
  },
  {
    "id": "I2410",
    "name": "물환경 수질정보 (I2410)",
    "description": "식약처 OpenAPI I2410 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "EXAM_ARA_NM",
      "ABL_YN",
      "PRSEC_DT",
      "WATSA_DT",
      "WATSA_TM",
      "MESURE_DP",
      "TEMOD",
      "FLUX"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2410 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 물환경 수질정보 테이블의 메타데이터입니다.",
      "includedList": [
        "EXAM_ARA_NM",
        "ABL_YN",
        "PRSEC_DT",
        "WATSA_DT",
        "WATSA_TM",
        "MESURE_DP",
        "TEMOD",
        "FLUX",
        "PH",
        "BOD",
        "COD",
        "SS",
        "EEC_QTY",
        "TN",
        "TP",
        "DOC",
        "EC",
        "TOC"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT EXAM_ARA_NM, ABL_YN, PRSEC_DT FROM I2410"
      ]
    }
  },
  {
    "id": "C005",
    "name": "바코드연계제품정보 (C005)",
    "description": "식약처 OpenAPI C005 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "END_DT",
      "PRDLST_NM",
      "POG_DAYCNT",
      "PRDLST_DCNM",
      "BSSH_NM",
      "INDUTY_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM C005 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 바코드연계제품정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "END_DT",
        "PRDLST_NM",
        "POG_DAYCNT",
        "PRDLST_DCNM",
        "BSSH_NM",
        "INDUTY_NM",
        "SITE_ADDR",
        "CLSBIZ_DT",
        "BAR_CD"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_REPORT_NO, PRMS_DT, END_DT FROM C005"
      ]
    }
  },
  {
    "id": "I1030",
    "name": "방사선조사식품 품목 인정 현황 (I1030)",
    "description": "식약처 OpenAPI I1030 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "SPEC_NM",
      "PC_KOR_NM",
      "T_KOR_NM",
      "PIAM_KOR_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT",
      "VALD_END_DT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1030 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 방사선조사식품 품목 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "SPEC_NM",
        "PC_KOR_NM",
        "T_KOR_NM",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "UNIT_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT SPEC_NM, PC_KOR_NM, T_KOR_NM FROM I1030"
      ]
    }
  },
  {
    "id": "I2540",
    "name": "법령코드 (I2540)",
    "description": "식약처 OpenAPI I2540 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "FOOD_LAWORD_CD",
      "HRNK_LAWORD_CD",
      "WORK_REALM_CD_NM",
      "LAWORD_CD_NM",
      "ALL_LAWORD_CD_NM",
      "LV_NO",
      "USE_YN",
      "VALD_BGN_DT"
    ],
    "keys": [
      "FOOD_LAWORD_CD"
    ],
    "usageExample": "SELECT * FROM I2540 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 법령코드 테이블의 메타데이터입니다.",
      "includedList": [
        "FOOD_LAWORD_CD",
        "HRNK_LAWORD_CD",
        "WORK_REALM_CD_NM",
        "LAWORD_CD_NM",
        "ALL_LAWORD_CD_NM",
        "LV_NO",
        "USE_YN",
        "VALD_BGN_DT",
        "VALD_END_DT",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: FOOD_LAWORD_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT FOOD_LAWORD_CD, HRNK_LAWORD_CD, WORK_REALM_CD_NM FROM I2540"
      ]
    }
  },
  {
    "id": "I2381",
    "name": "상수도 수질정보 (I2381)",
    "description": "식약처 OpenAPI I2381 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "FCLTY_NM",
      "FCLTY_LOC",
      "PRSEC_YR",
      "PRSEC_MM",
      "PICK_DT",
      "PRSEC_ITM_NM",
      "MESURE_VAL",
      "UNIT_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2381 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 상수도 수질정보 테이블의 메타데이터입니다.",
      "includedList": [
        "FCLTY_NM",
        "FCLTY_LOC",
        "PRSEC_YR",
        "PRSEC_MM",
        "PICK_DT",
        "PRSEC_ITM_NM",
        "MESURE_VAL",
        "UNIT_NM",
        "DCMLPOINT",
        "EXCS_YN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT FCLTY_NM, FCLTY_LOC, PRSEC_YR FROM I2381"
      ]
    }
  },
  {
    "id": "I2852",
    "name": "생산중단제품정보 (I2852)",
    "description": "식약처 OpenAPI I2852 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "END_DT",
      "PRDLST_DCNM",
      "LCNS_NO",
      "BSSH_NM",
      "FOOD_HF_LS_CL_CD_NM"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I2852 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 생산중단제품정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "END_DT",
        "PRDLST_DCNM",
        "LCNS_NO",
        "BSSH_NM",
        "FOOD_HF_LS_CL_CD_NM",
        "ARTCL_END_WHY"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_REPORT_NO, PRMS_DT, PRDLST_NM FROM I2852"
      ]
    }
  },
  {
    "id": "I1830",
    "name": "쇠고기(국내)이력추적 가공관리 (I1830)",
    "description": "식약처 OpenAPI I1830 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "ENTTY_IDNTFC_NO",
      "PRCSS_PLC_CD",
      "PRCSS_DT",
      "PRCSS_PLC_NM"
    ],
    "keys": [
      "ENTTY_IDNTFC_NO"
    ],
    "usageExample": "SELECT * FROM I1830 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 쇠고기(국내)이력추적 가공관리 테이블의 메타데이터입니다.",
      "includedList": [
        "ENTTY_IDNTFC_NO",
        "PRCSS_PLC_CD",
        "PRCSS_DT",
        "PRCSS_PLC_NM"
      ],
      "joinKeys": [
        "PK: ENTTY_IDNTFC_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT ENTTY_IDNTFC_NO, PRCSS_PLC_CD, PRCSS_DT FROM I1830"
      ]
    }
  },
  {
    "id": "I1810",
    "name": "쇠고기(국내)이력추적 생산정보 (I1810)",
    "description": "식약처 OpenAPI I1810 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "ENTTY_IDNTFC_NO",
      "BRTH_DT",
      "ENTTY_STATS_NM",
      "COW_KND_NM",
      "GND_NM",
      "FMH_NM",
      "VACIN_LAST_INOCL_DT",
      "VACIN_LAST_INOCL_OPNO"
    ],
    "keys": [
      "ENTTY_IDNTFC_NO"
    ],
    "usageExample": "SELECT * FROM I1810 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 쇠고기(국내)이력추적 생산정보 테이블의 메타데이터입니다.",
      "includedList": [
        "ENTTY_IDNTFC_NO",
        "BRTH_DT",
        "ENTTY_STATS_NM",
        "COW_KND_NM",
        "GND_NM",
        "FMH_NM",
        "VACIN_LAST_INOCL_DT",
        "VACIN_LAST_INOCL_OPNO"
      ],
      "joinKeys": [
        "PK: ENTTY_IDNTFC_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT ENTTY_IDNTFC_NO, BRTH_DT, ENTTY_STATS_NM FROM I1810"
      ]
    }
  },
  {
    "id": "I1820",
    "name": "쇠고기(국내)이력추적 정보 (I1820)",
    "description": "식약처 OpenAPI I1820 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "ENTTY_IDNTFC_NO",
      "SLAU_PLC_NM",
      "SNTT_PRSEC_NM",
      "SLAU_YMD",
      "ADDR",
      "SNTT_PRSEC_PASS_ENNC",
      "PRCSS_DT",
      "PRCSS_PLC_NM"
    ],
    "keys": [
      "ENTTY_IDNTFC_NO"
    ],
    "usageExample": "SELECT * FROM I1820 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 쇠고기(국내)이력추적 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "ENTTY_IDNTFC_NO",
        "SLAU_PLC_NM",
        "SNTT_PRSEC_NM",
        "SLAU_YMD",
        "ADDR",
        "SNTT_PRSEC_PASS_ENNC",
        "PRCSS_DT",
        "PRCSS_PLC_NM",
        "BRTH_DT",
        "ENTTY_STATS_NM",
        "COW_KND_NM",
        "GND_NM",
        "FMH_NM",
        "VACIN_LAST_INOCL_DT",
        "VACIN_LAST_INOCL_OPNO"
      ],
      "joinKeys": [
        "PK: ENTTY_IDNTFC_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT ENTTY_IDNTFC_NO, SLAU_PLC_NM, SNTT_PRSEC_NM FROM I1820"
      ]
    }
  },
  {
    "id": "I0460",
    "name": "수거검사 계획 및 실적 관련 현황 (I0460)",
    "description": "식약처 OpenAPI I0460 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRCSCITYPOINT_INDUTYCD_NM",
      "BSSH_NM",
      "SITE_ADDR",
      "PRDTNM",
      "TKAWYDTM",
      "JDGMNT_CD_NM",
      "EXC_INSTT_NM",
      "TKAWYSPCI_TYPECD_NM"
    ],
    "keys": [
      "TKAWYPRNO"
    ],
    "usageExample": "SELECT * FROM I0460 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수거검사 계획 및 실적 관련 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_INDUTYCD_NM",
        "BSSH_NM",
        "SITE_ADDR",
        "PRDTNM",
        "TKAWYDTM",
        "JDGMNT_CD_NM",
        "EXC_INSTT_NM",
        "TKAWYSPCI_TYPECD_NM",
        "PRDLST_REPORT_NO",
        "LAST_UPDT_DTM",
        "TKAWYPRNO",
        "PLAN_TITL"
      ],
      "joinKeys": [
        "PK: TKAWYPRNO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_INDUTYCD_NM, BSSH_NM, SITE_ADDR FROM I0460"
      ]
    }
  },
  {
    "id": "I1380",
    "name": "수산물 수입업체 현황 정보 (I1380)",
    "description": "식약처 OpenAPI I1380 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "INDUTY_CD_NM",
      "BSN_PRMS_NO_1",
      "ENTRPS_KOR_NM",
      "ADDR",
      "RM",
      "PRSDNT_KOR_NM"
    ],
    "keys": [
      "BSN_PRMS_NO_1"
    ],
    "usageExample": "SELECT * FROM I1380 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물 수입업체 현황 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "INDUTY_CD_NM",
        "BSN_PRMS_NO_1",
        "ENTRPS_KOR_NM",
        "ADDR",
        "RM",
        "PRSDNT_KOR_NM"
      ],
      "joinKeys": [
        "PK: BSN_PRMS_NO_1"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT INDUTY_CD_NM, BSN_PRMS_NO_1, ENTRPS_KOR_NM FROM I1380"
      ]
    }
  },
  {
    "id": "I2020",
    "name": "수산물 표시단속정보 (I2020)",
    "description": "식약처 OpenAPI I2020 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "ENTRPS_NM",
      "BIZCND_DVS_NM",
      "CTPRVN_NM",
      "VILT_ENTRPS_RELS_YN",
      "VILT_ENTRPS_RELS_DT",
      "DISCL_DTM",
      "INSTT_NM",
      "ORGNP_DVS_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2020 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물 표시단속정보 테이블의 메타데이터입니다.",
      "includedList": [
        "ENTRPS_NM",
        "BIZCND_DVS_NM",
        "CTPRVN_NM",
        "VILT_ENTRPS_RELS_YN",
        "VILT_ENTRPS_RELS_DT",
        "DISCL_DTM",
        "INSTT_NM",
        "ORGNP_DVS_NM",
        "VILT_MATR_DVS_NM",
        "MPRC_DVS_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT ENTRPS_NM, BIZCND_DVS_NM, CTPRVN_NM FROM I2020"
      ]
    }
  },
  {
    "id": "I2050",
    "name": "수산물 해외등록시설정보 (I2050)",
    "description": "식약처 OpenAPI I2050 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "인허가·신고",
    "issue": "해외직구 안전성",
    "theme": "일반 조회용",
    "includedData": [
      "REG_NO",
      "ENTRPS_NM",
      "KND_CD_NM",
      "NLTY_NM",
      "ENTRPS_ADDR",
      "ADDR_PRDT",
      "APPLC_DT",
      "STATS_DVS"
    ],
    "keys": [
      "REG_NO"
    ],
    "usageExample": "SELECT * FROM I2050 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물 해외등록시설정보 테이블의 메타데이터입니다.",
      "includedList": [
        "REG_NO",
        "ENTRPS_NM",
        "KND_CD_NM",
        "NLTY_NM",
        "ENTRPS_ADDR",
        "ADDR_PRDT",
        "APPLC_DT",
        "STATS_DVS",
        "POSTPNE_BGN_DT",
        "POSTPNE_END_DT",
        "POSTPNE_RELS_DT",
        "CANCL_DT",
        "RM"
      ],
      "joinKeys": [
        "PK: REG_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT REG_NO, ENTRPS_NM, KND_CD_NM FROM I2050"
      ]
    }
  },
  {
    "id": "I1920",
    "name": "수산물이력정보-기본정보 (I1920)",
    "description": "식약처 OpenAPI I1920 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HIST_TRACE_REG_NO",
      "GOODS_NM",
      "PRDLST_GROUP_DVS_NM",
      "ENTRPS_NM",
      "TELNO",
      "ADDR"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1920 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물이력정보-기본정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HIST_TRACE_REG_NO",
        "GOODS_NM",
        "PRDLST_GROUP_DVS_NM",
        "ENTRPS_NM",
        "TELNO",
        "ADDR"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HIST_TRACE_REG_NO, GOODS_NM, PRDLST_GROUP_DVS_NM FROM I1920"
      ]
    }
  },
  {
    "id": "I1930",
    "name": "수산물이력정보-생산정보 (I1930)",
    "description": "식약처 OpenAPI I1930 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HIST_TRACE_REG_NO",
      "LOTNO_WRHOUSNG",
      "GOODS_NM",
      "PRDLST_GROUP_DVS_NM",
      "SETT_QTY",
      "WRHOUSNG_DT",
      "WRHOUSNG_QTY",
      "PHHGH_UNIT_CD_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1930 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물이력정보-생산정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HIST_TRACE_REG_NO",
        "LOTNO_WRHOUSNG",
        "GOODS_NM",
        "PRDLST_GROUP_DVS_NM",
        "SETT_QTY",
        "WRHOUSNG_DT",
        "WRHOUSNG_QTY",
        "PHHGH_UNIT_CD_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HIST_TRACE_REG_NO, LOTNO_WRHOUSNG, GOODS_NM FROM I1930"
      ]
    }
  },
  {
    "id": "I1940",
    "name": "수산물이력정보-출하정보 (I1940)",
    "description": "식약처 OpenAPI I1940 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "HIST_TRACE_REG_NO",
      "LOTNO_RELES",
      "LOTNO_WRHOUSNG",
      "PRDLST_GROUP_DVS_NM",
      "RELES_DVS_NM",
      "PRDCTN_DT",
      "PRDCTN_QTY",
      "RELES_DT"
    ],
    "keys": [
      "HIST_TRACE_REG_NO"
    ],
    "usageExample": "SELECT * FROM I1940 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수산물이력정보-출하정보 테이블의 메타데이터입니다.",
      "includedList": [
        "HIST_TRACE_REG_NO",
        "LOTNO_RELES",
        "LOTNO_WRHOUSNG",
        "PRDLST_GROUP_DVS_NM",
        "RELES_DVS_NM",
        "PRDCTN_DT",
        "PRDCTN_QTY",
        "RELES_DT",
        "RELES_QTY",
        "RELES_UNIT_NM"
      ],
      "joinKeys": [
        "PK: HIST_TRACE_REG_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HIST_TRACE_REG_NO, LOTNO_RELES, LOTNO_WRHOUSNG FROM I1940"
      ]
    }
  },
  {
    "id": "I2780",
    "name": "수입쇠고기 냉동전환 정보 (I2780)",
    "description": "식약처 OpenAPI I2780 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "MEATWATCH_NO",
      "HIST_NO",
      "ORGNP_NM",
      "BSSH_NM",
      "APLC_DTM",
      "PRDLST_NM",
      "FREEZING_CNVRS_QTY",
      "FREEZING_CNVRS_WT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2780 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수입쇠고기 냉동전환 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "MEATWATCH_NO",
        "HIST_NO",
        "ORGNP_NM",
        "BSSH_NM",
        "APLC_DTM",
        "PRDLST_NM",
        "FREEZING_CNVRS_QTY",
        "FREEZING_CNVRS_WT",
        "FRESH_DISTB_TMLMT_BGN_DT",
        "FRESH_DISTB_TMLMT_DT",
        "FREEZING_CNVRS_OPRTN_DT",
        "FREEZING_CNVRS_PREARNGE_DT",
        "FREEZING_DISTB_TMLMT_DT",
        "ACCEPT_NO"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT MEATWATCH_NO, HIST_NO, ORGNP_NM FROM I2780"
      ]
    }
  },
  {
    "id": "I1720",
    "name": "수입쇠고기 유통이력정보 (I1720)",
    "description": "식약처 OpenAPI I1720 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BL_NO",
      "INCM_BEEF_PRDLST_NM",
      "ORGNP_NATN_NM",
      "EXCOURY_SLAU_PLC_NM",
      "EXCOURY_SLAU_BGN_DT",
      "EXCOURY_SLAU_END_DT",
      "EXCOURY_PRCSS_PLC_NM",
      "EXCOURY_PRCSS_BGN_DT"
    ],
    "keys": [
      "BL_NO"
    ],
    "usageExample": "SELECT * FROM I1720 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수입쇠고기 유통이력정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BL_NO",
        "INCM_BEEF_PRDLST_NM",
        "ORGNP_NATN_NM",
        "EXCOURY_SLAU_PLC_NM",
        "EXCOURY_SLAU_BGN_DT",
        "EXCOURY_SLAU_END_DT",
        "EXCOURY_PRCSS_PLC_NM",
        "EXCOURY_PRCSS_BGN_DT",
        "EXCOURY_PRCSS_END_DT",
        "XPORT_ENTRPS_NM",
        "INCM_ENTRPS_NM",
        "INCM_DT",
        "REGN_NM"
      ],
      "joinKeys": [
        "PK: BL_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BL_NO, INCM_BEEF_PRDLST_NM, ORGNP_NATN_NM FROM I1720"
      ]
    }
  },
  {
    "id": "C001",
    "name": "수입식품등영업신고대장 (C001)",
    "description": "식약처 OpenAPI C001 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM",
      "TELNO"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM C001 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수입식품등영업신고대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM C001"
      ]
    }
  },
  {
    "id": "I2821",
    "name": "수입식품업 폐업정보 (I2821)",
    "description": "식약처 OpenAPI I2821 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2821 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수입식품업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2821"
      ]
    }
  },
  {
    "id": "I2781",
    "name": "수입축산물 냉동전환 정보 (I2781)",
    "description": "식약처 OpenAPI I2781 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "MEATWATCH_NO",
      "ACCEPT_NO",
      "HIST_NO",
      "ORGNP_NM",
      "BSSH_NM",
      "APLC_DTM",
      "PRDLST_NM",
      "FREEZING_CNVRS_QTY"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2781 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 수입축산물 냉동전환 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "MEATWATCH_NO",
        "ACCEPT_NO",
        "HIST_NO",
        "ORGNP_NM",
        "BSSH_NM",
        "APLC_DTM",
        "PRDLST_NM",
        "FREEZING_CNVRS_QTY",
        "FREEZING_CNVRS_WT",
        "FRESH_DISTB_TMLMT_BGN_DT",
        "FRESH_DISTB_TMLMT_DT",
        "FREEZING_CNVRS_OPRTN_DT",
        "FREEZING_CNVRS_PREARNGE_DT",
        "FREEZING_DISTB_TMLMT_DT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT MEATWATCH_NO, ACCEPT_NO, HIST_NO FROM I2781"
      ]
    }
  },
  {
    "id": "I1060",
    "name": "시약정보 (I1060)",
    "description": "식약처 OpenAPI I1060 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CITYMEDI_NM_CD",
      "CMPNY_NO",
      "CTPRVNACCTO_INTD_NO",
      "STATS_NO",
      "PUREDO",
      "VALD_TERM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1060 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 시약정보 테이블의 메타데이터입니다.",
      "includedList": [
        "CITYMEDI_NM_CD",
        "CMPNY_NO",
        "CTPRVNACCTO_INTD_NO",
        "STATS_NO",
        "PUREDO",
        "VALD_TERM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CITYMEDI_NM_CD, CMPNY_NO, CTPRVNACCTO_INTD_NO FROM I1060"
      ]
    }
  },
  {
    "id": "I2530",
    "name": "시험항목코드 (I2530)",
    "description": "식약처 OpenAPI I2530 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "TESTITM_CD",
      "KOR_NM",
      "ENG_NM",
      "ABRV",
      "NCKNM",
      "TESTITM_NM",
      "TESTITM_LCLAS_CD",
      "L_ATTRB_CD"
    ],
    "keys": [
      "TESTITM_CD"
    ],
    "usageExample": "SELECT * FROM I2530 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 시험항목코드 테이블의 메타데이터입니다.",
      "includedList": [
        "TESTITM_CD",
        "KOR_NM",
        "ENG_NM",
        "ABRV",
        "NCKNM",
        "TESTITM_NM",
        "TESTITM_LCLAS_CD",
        "L_ATTRB_CD",
        "L_KOR_NM",
        "TESTITM_MLSFC_CD",
        "M_ATTRB_CD",
        "M_KOR_NM",
        "REMN_MTTR_DFN",
        "USE_YN",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: TESTITM_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT TESTITM_CD, KOR_NM, ENG_NM FROM I2530"
      ]
    }
  },
  {
    "id": "I2836",
    "name": "식용란선별포장업 인허가 대장 (I2836)",
    "description": "식약처 OpenAPI I2836 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2836 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식용란선별포장업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2836"
      ]
    }
  },
  {
    "id": "I2835",
    "name": "식육즉석판매가공업 인허가 대장 (I2835)",
    "description": "식약처 OpenAPI I2835 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2835 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식육즉석판매가공업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2835"
      ]
    }
  },
  {
    "id": "I2827",
    "name": "식육즉석판매가공업 폐업정보 (I2827)",
    "description": "식약처 OpenAPI I2827 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2827 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식육즉석판매가공업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2827"
      ]
    }
  },
  {
    "id": "I2850",
    "name": "식중독 원인물질별 현황 (I2850)",
    "description": "식약처 OpenAPI I2850 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "식중독·감염병",
    "theme": "일반 조회용",
    "includedData": [
      "OCCRNC_YEAR",
      "OCCRNC_MM",
      "OCCRNC_VIRS",
      "OCCRNC_CNT",
      "PATNT_CNT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2850 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식중독 원인물질별 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "OCCRNC_YEAR",
        "OCCRNC_MM",
        "OCCRNC_VIRS",
        "OCCRNC_CNT",
        "PATNT_CNT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_VIRS FROM I2850"
      ]
    }
  },
  {
    "id": "I2849",
    "name": "식중독 원인시설별 현황 (I2849)",
    "description": "식약처 OpenAPI I2849 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "식중독·감염병",
    "theme": "일반 조회용",
    "includedData": [
      "OCCRNC_YEAR",
      "OCCRNC_MM",
      "OCCRNC_PLC",
      "OCCRNC_CNT",
      "PATNT_CNT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2849 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식중독 원인시설별 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "OCCRNC_YEAR",
        "OCCRNC_MM",
        "OCCRNC_PLC",
        "OCCRNC_CNT",
        "PATNT_CNT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_PLC FROM I2849"
      ]
    }
  },
  {
    "id": "I2848",
    "name": "식중독 지역별 현황 (I2848)",
    "description": "식약처 OpenAPI I2848 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "식중독·감염병",
    "theme": "일반 조회용",
    "includedData": [
      "OCCRNC_YEAR",
      "OCCRNC_MM",
      "OCCRNC_AREA",
      "OCCRNC_CNT",
      "PATNT_CNT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2848 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식중독 지역별 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "OCCRNC_YEAR",
        "OCCRNC_MM",
        "OCCRNC_AREA",
        "OCCRNC_CNT",
        "PATNT_CNT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_AREA FROM I2848"
      ]
    }
  },
  {
    "id": "I1250",
    "name": "식품(첨가물)품목제조보고 (I1250)",
    "description": "식약처 OpenAPI I1250 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "PRODUCTION",
      "HIENG_LNTRT_DVS_NM"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I1250 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품(첨가물)품목제조보고 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "PRODUCTION",
        "HIENG_LNTRT_DVS_NM",
        "CHILD_CRTFC_YN",
        "POG_DAYCNT",
        "LAST_UPDT_DTM",
        "INDUTY_CD_NM",
        "QLITY_MNTNC_TMLMT_DAYCNT",
        "USAGE",
        "PRPOS",
        "DISPOS",
        "FRMLC_MTRQLT",
        "ETQTY_XPORT_PRDLST_YN"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I1250"
      ]
    }
  },
  {
    "id": "C002",
    "name": "식품(첨가물)품목제조보고(원재료) (C002)",
    "description": "식약처 OpenAPI C002 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "RAWMTRL_NM",
      "RAWMTRL_ORDNO"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM C002 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품(첨가물)품목제조보고(원재료) 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "RAWMTRL_NM",
        "RAWMTRL_ORDNO",
        "CHNG_DT",
        "ETQTY_XPORT_PRDLST_YN"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM C002"
      ]
    }
  },
  {
    "id": "I0300",
    "name": "식품.식품첨가물 생산실적 보고 현황 (I0300)",
    "description": "식약처 OpenAPI I0300 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "원재료·첨가물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "SITE_ADDR",
      "EVL_YR",
      "PRDLST_REPORT_NO",
      "H_ITEM_NM",
      "PRDLST_NM",
      "FYER_PRDCTN_ABRT_QY"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I0300 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품.식품첨가물 생산실적 보고 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "SITE_ADDR",
        "EVL_YR",
        "PRDLST_REPORT_NO",
        "H_ITEM_NM",
        "PRDLST_NM",
        "FYER_PRDCTN_ABRT_QY",
        "PRDCTN_QY"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, SITE_ADDR FROM I0300"
      ]
    }
  },
  {
    "id": "I0920",
    "name": "식품검사기관별 시험항목정보조회 (I0920)",
    "description": "식약처 OpenAPI I0920 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "REALM_NM",
      "CMPTNC_INSTT_NM",
      "INSTT_NM",
      "ADDR",
      "MSK_TELNO",
      "TESTITM_LCLAS_NM",
      "TESTITM_MLSFC_NM",
      "TESTITM_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0920 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품검사기관별 시험항목정보조회 테이블의 메타데이터입니다.",
      "includedList": [
        "REALM_NM",
        "CMPTNC_INSTT_NM",
        "INSTT_NM",
        "ADDR",
        "MSK_TELNO",
        "TESTITM_LCLAS_NM",
        "TESTITM_MLSFC_NM",
        "TESTITM_NM",
        "RM",
        "CHNG_DT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT REALM_NM, CMPTNC_INSTT_NM, INSTT_NM FROM I0920"
      ]
    }
  },
  {
    "id": "I0930",
    "name": "식품공전 (I0930)",
    "description": "식약처 OpenAPI I0930 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_NM",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "PIAM_KOR_NM",
      "SPEC_VAL",
      "VALD_BEGN_DT",
      "VALD_END_DT",
      "SPEC_VAL_SUMUP"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0930 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품공전 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_NM",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SPEC_VAL_SUMUP",
        "JDGMNT_FNPRT_CD_NM",
        "MXMM_VAL",
        "MXMM_VAL_FNPRT_CD_NM",
        "MIMM_VAL",
        "MIMM_VAL_FNPRT_CD_NM",
        "CHOIC_FIT_FNPRT_CD_NM",
        "CHOIC_IMPROPT_FNPRT_CD_NM",
        "INJRY_YN",
        "UNIT_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_NM, T_KOR_NM, FNPRT_ITM_NM FROM I0930"
      ]
    }
  },
  {
    "id": "I2833",
    "name": "식품냉동.냉장업 인허가 대장 (I2833)",
    "description": "식약처 OpenAPI I2833 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2833 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품냉동.냉장업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2833"
      ]
    }
  },
  {
    "id": "I1260",
    "name": "식품등수입판매업정보 (I1260)",
    "description": "식약처 OpenAPI I1260 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1260 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품등수입판매업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1260"
      ]
    }
  },
  {
    "id": "I1590",
    "name": "식품모범음식점 (I1590)",
    "description": "식약처 OpenAPI I1590 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "SIGNGU_NM",
      "YEAR",
      "APLC_DT",
      "PNCPL_FOOD_NM",
      "APPN_DT",
      "OPERT_DT"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1590 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품모범음식점 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "SIGNGU_NM",
        "YEAR",
        "APLC_DT",
        "PNCPL_FOOD_NM",
        "APPN_DT",
        "OPERT_DT"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, SIGNGU_NM FROM I1590"
      ]
    }
  },
  {
    "id": "I1050",
    "name": "식품별 농약잔류허용기준 (I1050)",
    "description": "식약처 OpenAPI I1050 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "유해물질 검출",
    "theme": "일반 조회용",
    "includedData": [
      "FOOD_KOR_NM",
      "FOOD_ENG_NM",
      "AGCHM_KOR_NM",
      "DEDE_NTK_QTY",
      "TMPR_STDR_APPLC_YN",
      "LCLAS_NM",
      "MLSFC_NM",
      "SCLAS_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1050 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품별 농약잔류허용기준 테이블의 메타데이터입니다.",
      "includedList": [
        "FOOD_KOR_NM",
        "FOOD_ENG_NM",
        "AGCHM_KOR_NM",
        "DEDE_NTK_QTY",
        "TMPR_STDR_APPLC_YN",
        "LCLAS_NM",
        "MLSFC_NM",
        "SCLAS_NM",
        "OPERTN_CITYPOINT",
        "STEP",
        "MRL_VAL",
        "ETC_YN",
        "DSUSE_YN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT FOOD_KOR_NM, FOOD_ENG_NM, AGCHM_KOR_NM FROM I1050"
      ]
    }
  },
  {
    "id": "I2854",
    "name": "식품별 유해오염물질 검출량 (I2854)",
    "description": "식약처 OpenAPI I2854 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "SNT_GBN",
      "PRDLST_CD",
      "PRDLST_NM",
      "ANALS_YEAR",
      "COL_A_RESULT",
      "COL_B_RESULT",
      "COL_C_RESULT",
      "COL_D_RESULT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2854 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품별 유해오염물질 검출량 테이블의 메타데이터입니다.",
      "includedList": [
        "SNT_GBN",
        "PRDLST_CD",
        "PRDLST_NM",
        "ANALS_YEAR",
        "COL_A_RESULT",
        "COL_B_RESULT",
        "COL_C_RESULT",
        "COL_D_RESULT",
        "COL_E_RESULT",
        "COL_F_RESULT",
        "COL_G_RESULT",
        "COL_H_RESULT",
        "COL_I_RESULT",
        "COL_J_RESULT",
        "COL_K_RESULT",
        "COL_L_RESULT",
        "COL_M_RESULT",
        "COL_N_RESULT",
        "COL_O_RESULT",
        "COL_P_RESULT",
        "COL_Q_RESULT",
        "COL_R_RESULT",
        "COL_S_RESULT",
        "CRET_DTM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT SNT_GBN, PRDLST_CD, PRDLST_NM FROM I2854"
      ]
    }
  },
  {
    "id": "I2817",
    "name": "식품보존업 폐업정보 (I2817)",
    "description": "식약처 OpenAPI I2817 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2817 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품보존업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2817"
      ]
    }
  },
  {
    "id": "I2831",
    "name": "식품소분업 인허가 대장 (I2831)",
    "description": "식약처 OpenAPI I2831 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2831 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품소분업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2831"
      ]
    }
  },
  {
    "id": "I2815",
    "name": "식품소분업 폐업정보 (I2815)",
    "description": "식약처 OpenAPI I2815 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2815 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품소분업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2815"
      ]
    }
  },
  {
    "id": "I2859",
    "name": "식품업소 인허가 변경 정보 (I2859)",
    "description": "식약처 OpenAPI I2859 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "TELNO",
      "SITE_ADDR",
      "CHNG_DT",
      "CHNG_BF_CN",
      "CHNG_AF_CN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2859 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품업소 인허가 변경 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "TELNO",
        "SITE_ADDR",
        "CHNG_DT",
        "CHNG_BF_CN",
        "CHNG_AF_CN",
        "CHNG_PRVNS"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2859"
      ]
    }
  },
  {
    "id": "I0940",
    "name": "식품용 기구 및 용기.포장 공전 (I0940)",
    "description": "식약처 OpenAPI I0940 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_CD",
      "PC_KOR_NM",
      "TESTITM_CD",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT"
    ],
    "keys": [
      "TESTITM_CD"
    ],
    "usageExample": "SELECT * FROM I0940 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품용 기구 및 용기.포장 공전 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_CD",
        "PC_KOR_NM",
        "TESTITM_CD",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "INJRY_YN",
        "UNIT_NM"
      ],
      "joinKeys": [
        "PK: TESTITM_CD",
        "FK: TESTITM_CD -> I2530.TESTITM_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0940"
      ]
    }
  },
  {
    "id": "I2830",
    "name": "식품운반업 인허가 대장 (I2830)",
    "description": "식약처 OpenAPI I2830 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2830 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품운반업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2830"
      ]
    }
  },
  {
    "id": "I2814",
    "name": "식품운반업 폐업정보 (I2814)",
    "description": "식약처 OpenAPI I2814 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2814 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품운반업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2814"
      ]
    }
  },
  {
    "id": "I0980",
    "name": "식품원료의 한시적 기준 및 규격 인정 현황 (I0980)",
    "description": "식약처 OpenAPI I0980 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LIMIT_STDR_STND_RCOGN_NO",
      "BSSH_NM",
      "BSSH_ADDR",
      "PRSDNT_NM",
      "RCOGN_DT",
      "PRDT_NM",
      "RAWMTRL_NM",
      "PRPOS"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0980 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품원료의 한시적 기준 및 규격 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LIMIT_STDR_STND_RCOGN_NO",
        "BSSH_NM",
        "BSSH_ADDR",
        "PRSDNT_NM",
        "RCOGN_DT",
        "PRDT_NM",
        "RAWMTRL_NM",
        "PRPOS",
        "USED",
        "USING_UNIT"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LIMIT_STDR_STND_RCOGN_NO, BSSH_NM, BSSH_ADDR FROM I0980"
      ]
    }
  },
  {
    "id": "I1020",
    "name": "식품원재료(식물,동물,미생물,수산물) 정보 (I1020)",
    "description": "식약처 OpenAPI I1020 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "원재료·첨가물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCLAS_NM",
      "MLSFC_NM",
      "RPRSNT_RAWMTRL_NM",
      "RAWMTRL_NCKNM",
      "ENG_NM",
      "SCNM",
      "REGN_CD_NM",
      "RAWMTRL_STATS_CD_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1020 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품원재료(식물,동물,미생물,수산물) 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCLAS_NM",
        "MLSFC_NM",
        "RPRSNT_RAWMTRL_NM",
        "RAWMTRL_NCKNM",
        "ENG_NM",
        "SCNM",
        "REGN_CD_NM",
        "RAWMTRL_STATS_CD_NM",
        "USE_CND_NM",
        "USE_CND_STDR_CN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCLAS_NM, MLSFC_NM, RPRSNT_RAWMTRL_NM FROM I1020"
      ]
    }
  },
  {
    "id": "I2520",
    "name": "식품원재료코드 (I2520)",
    "description": "식약처 OpenAPI I2520 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "원재료·첨가물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "RAWMTRL_CD",
      "RAWMTRL_LCLAS_NM",
      "RAWMTRL_MLSFC_NM",
      "RPRSNT_RAWMTRL_NM",
      "RAWMTRL_NCKNM",
      "ENG_NM",
      "SCNM",
      "REGN_CD"
    ],
    "keys": [
      "RAWMTRL_CD"
    ],
    "usageExample": "SELECT * FROM I2520 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품원재료코드 테이블의 메타데이터입니다.",
      "includedList": [
        "RAWMTRL_CD",
        "RAWMTRL_LCLAS_NM",
        "RAWMTRL_MLSFC_NM",
        "RPRSNT_RAWMTRL_NM",
        "RAWMTRL_NCKNM",
        "ENG_NM",
        "SCNM",
        "REGN_CD",
        "REGN_CD_NM",
        "PRCSS_PROCS_CD",
        "PRCSS_PROCS_CD_NM",
        "RAWMTRL_STATS_CD",
        "RAWMTRL_STATS_CD_NM",
        "VALD_BGN_DT",
        "VALD_END_DT",
        "USE_YN",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: RAWMTRL_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT RAWMTRL_CD, RAWMTRL_LCLAS_NM, RAWMTRL_MLSFC_NM FROM I2520"
      ]
    }
  },
  {
    "id": "I0890",
    "name": "식품위생검사기관 지정 현황 (I0890)",
    "description": "식약처 OpenAPI I0890 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "PRSEC_INSTT_RCOGN_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "APPN_BGN_DT",
      "APPN_END_DT",
      "WORK_SCOPE"
    ],
    "keys": [
      "PRSEC_INSTT_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I0890 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품위생검사기관 지정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PRSEC_INSTT_RCOGN_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "APPN_BGN_DT",
        "APPN_END_DT",
        "WORK_SCOPE"
      ],
      "joinKeys": [
        "PK: PRSEC_INSTT_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRSEC_INSTT_RCOGN_NO, BSSH_NM, PRSDNT_NM FROM I0890"
      ]
    }
  },
  {
    "id": "I1560",
    "name": "식품위생교육내역 (I1560)",
    "description": "식약처 OpenAPI I1560 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "EDC_TYPE_NM",
      "EDC_DVS_NM",
      "LCNS_NO",
      "BSSH_NM",
      "INDUTY_NM",
      "EDC_OBJ_NM",
      "CMPLTR_NAME",
      "CTFHV_NO"
    ],
    "keys": [
      "CTFHV_NO"
    ],
    "usageExample": "SELECT * FROM I1560 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품위생교육내역 테이블의 메타데이터입니다.",
      "includedList": [
        "EDC_TYPE_NM",
        "EDC_DVS_NM",
        "LCNS_NO",
        "BSSH_NM",
        "INDUTY_NM",
        "EDC_OBJ_NM",
        "CMPLTR_NAME",
        "CTFHV_NO",
        "COMPL_DTM",
        "EDC_MEDIA",
        "EDC_COMPL_NMPR",
        "INSTT_CD_NM",
        "EDC_PROCES_NM",
        "EDC_PLC",
        "ADDR"
      ],
      "joinKeys": [
        "PK: CTFHV_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT EDC_TYPE_NM, EDC_DVS_NM, LCNS_NO FROM I1560"
      ]
    }
  },
  {
    "id": "I1540",
    "name": "식품위생등급평가관리내역 (I1540)",
    "description": "식약처 OpenAPI I1540 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "EVL_SEQ",
      "EVL_PLAN_DT",
      "EVL_TYPE_DVS_CD_NM",
      "EVL_DT",
      "EVL_SCORE",
      "EVL_GRD_CD_NM",
      "BSSH_LOC_CD_NM",
      "LCNS_NO"
    ],
    "keys": [
      "EVL_SEQ"
    ],
    "usageExample": "SELECT * FROM I1540 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품위생등급평가관리내역 테이블의 메타데이터입니다.",
      "includedList": [
        "EVL_SEQ",
        "EVL_PLAN_DT",
        "EVL_TYPE_DVS_CD_NM",
        "EVL_DT",
        "EVL_SCORE",
        "EVL_GRD_CD_NM",
        "BSSH_LOC_CD_NM",
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "ADDR",
        "EVL_INCPCTY_YN"
      ],
      "joinKeys": [
        "PK: EVL_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT EVL_SEQ, EVL_PLAN_DT, EVL_TYPE_DVS_CD_NM FROM I1540"
      ]
    }
  },
  {
    "id": "I0320",
    "name": "식품이력추적관리 등록 현황 (I0320)",
    "description": "식약처 OpenAPI I0320 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "REG_NUM",
      "PDT_NM",
      "PDT_BARCD",
      "PDT_TYPE",
      "MAKE_TYPE",
      "ADDR",
      "BRNCH_NM",
      "BTYPE"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I0320 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품이력추적관리 등록 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "REG_NUM",
        "PDT_NM",
        "PDT_BARCD",
        "PDT_TYPE",
        "MAKE_TYPE",
        "ADDR",
        "BRNCH_NM",
        "BTYPE",
        "FOOD_TYPE",
        "PRDLST_REPORT_NO",
        "MNFT_DAY",
        "FOOD_HISTRACE_NUM",
        "CRCL_PRD",
        "MOD_DT"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT REG_NUM, PDT_NM, PDT_BARCD FROM I0320"
      ]
    }
  },
  {
    "id": "I2819",
    "name": "식품접객업 폐업정보 (I2819)",
    "description": "식약처 OpenAPI I2819 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2819 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품접객업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2819"
      ]
    }
  },
  {
    "id": "C004",
    "name": "식품접객업소 위생등급 지정현황 (C004)",
    "description": "식약처 OpenAPI C004 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "HG_ASGN_NM",
      "HG_ASGN_LV",
      "HG_ASGN_NO",
      "HG_ASGN_YMD",
      "INDUTY_NM",
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM"
    ],
    "keys": [
      "HG_ASGN_NO"
    ],
    "usageExample": "SELECT * FROM C004 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품접객업소 위생등급 지정현황 테이블의 메타데이터입니다.",
      "includedList": [
        "HG_ASGN_NM",
        "HG_ASGN_LV",
        "HG_ASGN_NO",
        "HG_ASGN_YMD",
        "INDUTY_NM",
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "ADDR",
        "ASGN_FROM",
        "ASGN_TO",
        "TELNO",
        "WRKR_REG_NO",
        "ASGN_CANCEL_YMD",
        "CLSBIZ_DVS_CD_NM",
        "CLSBIZ_DT",
        "CHNG_DT",
        "INSTT_CD_NM"
      ],
      "joinKeys": [
        "PK: HG_ASGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HG_ASGN_NM, HG_ASGN_LV, HG_ASGN_NO FROM C004"
      ]
    }
  },
  {
    "id": "I1200",
    "name": "식품접객업정보 (I1200)",
    "description": "식약처 OpenAPI I1200 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "TELNO",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1200 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품접객업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "TELNO",
        "INSTT_NM",
        "HG_LV",
        "ASGN_GIGAN_FROM",
        "ASGN_GIGAN_TO",
        "PART_GBN",
        "JOIN_YMD",
        "APPT_YMD",
        "CALC_YMD",
        "CLSBIZ_DT",
        "SITE_X",
        "SITE_Y",
        "LAST_UPDT_DTM",
        "CRET_DTM",
        "BSN_LCNS_LEDG_NO",
        "PET_OUTIN_YN"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1200"
      ]
    }
  },
  {
    "id": "I2811",
    "name": "식품제조가공업 폐업정보 (I2811)",
    "description": "식약처 OpenAPI I2811 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2811 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품제조가공업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2811"
      ]
    }
  },
  {
    "id": "I1220",
    "name": "식품제조가공업정보 (I1220)",
    "description": "식약처 OpenAPI I1220 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1220 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품제조가공업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1220"
      ]
    }
  },
  {
    "id": "I-0010",
    "name": "식품조사처리업 인허가 현황 (I-0010)",
    "description": "식약처 OpenAPI I-0010 데이터베이스 테이블입니다. 총 3건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 3,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "FOOD_HF_LS_CL_CD_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I-0010 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품조사처리업 인허가 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "FOOD_HF_LS_CL_CD_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I-0010"
      ]
    }
  },
  {
    "id": "I0950",
    "name": "식품첨가물공전 (I0950)",
    "description": "식약처 OpenAPI I0950 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "원재료·첨가물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_CD",
      "PC_KOR_NM",
      "TESTITM_CD",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT"
    ],
    "keys": [
      "PRDLST_CD"
    ],
    "usageExample": "SELECT * FROM I0950 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품첨가물공전 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_CD",
        "PC_KOR_NM",
        "TESTITM_CD",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "INJRY_YN",
        "UNIT_NM"
      ],
      "joinKeys": [
        "PK: PRDLST_CD",
        "FK: TESTITM_CD -> I2530.TESTITM_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0950"
      ]
    }
  },
  {
    "id": "I1101",
    "name": "식품첨가물의 기준 및 규격 현황 (I1101)",
    "description": "식약처 OpenAPI I1101 데이터베이스 테이블입니다. 총 0건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 0,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PC_KOR_NM",
      "PRDLST_CD",
      "T_KOR_NM",
      "FNPRT_ITM_NM",
      "PIAM_KOR_NM",
      "SPEC_VAL",
      "SPEC_VAL_SUMUP",
      "VALD_BEGN_DT"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1101 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품첨가물의 기준 및 규격 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PC_KOR_NM",
        "PRDLST_CD",
        "T_KOR_NM",
        "FNPRT_ITM_NM",
        "PIAM_KOR_NM",
        "SPEC_VAL",
        "SPEC_VAL_SUMUP",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "SORC",
        "MXMM_VAL",
        "MIMM_VAL",
        "INJRY_YN",
        "UNIT_NM",
        "UPDT_PRVNS",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PC_KOR_NM, PRDLST_CD, T_KOR_NM FROM I1101"
      ]
    }
  },
  {
    "id": "I1000",
    "name": "식품첨가물의 한시적 기준 및 규격 인정 현황 (I1000)",
    "description": "식약처 OpenAPI I1000 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LIMIT_STDR_STND_RCOGN_NO",
      "RCOGN_DT",
      "BSSH_NM",
      "PRSDNT_NM",
      "TELNO",
      "MC_NM",
      "PRDT_NM"
    ],
    "keys": [
      "LIMIT_STDR_STND_RCOGN_NO"
    ],
    "usageExample": "SELECT * FROM I1000 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품첨가물의 한시적 기준 및 규격 인정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LIMIT_STDR_STND_RCOGN_NO",
        "RCOGN_DT",
        "BSSH_NM",
        "PRSDNT_NM",
        "TELNO",
        "MC_NM",
        "PRDT_NM"
      ],
      "joinKeys": [
        "PK: LIMIT_STDR_STND_RCOGN_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I1000"
      ]
    }
  },
  {
    "id": "I1230",
    "name": "식품첨가물제조업 (I1230)",
    "description": "식약처 OpenAPI I1230 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1230 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품첨가물제조업 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1230"
      ]
    }
  },
  {
    "id": "I2813",
    "name": "식품첨가물제조업 폐업정보 (I2813)",
    "description": "식약처 OpenAPI I2813 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2813 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품첨가물제조업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2813"
      ]
    }
  },
  {
    "id": "I2832",
    "name": "식품판매업 인허가 대장 (I2832)",
    "description": "식약처 OpenAPI I2832 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2832 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품판매업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2832"
      ]
    }
  },
  {
    "id": "I2816",
    "name": "식품판매업 폐업정보 (I2816)",
    "description": "식약처 OpenAPI I2816 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2816 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 식품판매업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2816"
      ]
    }
  },
  {
    "id": "I1650",
    "name": "신고대상분류기준 (I1650)",
    "description": "식약처 OpenAPI I1650 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CMMN_CD_NM",
      "FNPRT_CD_NM",
      "USER_DFN_CLMN_1",
      "USER_DFN_CLMN_2"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1650 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 신고대상분류기준 테이블의 메타데이터입니다.",
      "includedList": [
        "CMMN_CD_NM",
        "FNPRT_CD_NM",
        "USER_DFN_CLMN_1",
        "USER_DFN_CLMN_2"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CMMN_CD_NM, FNPRT_CD_NM, USER_DFN_CLMN_1 FROM I1650"
      ]
    }
  },
  {
    "id": "I1980",
    "name": "어류질병정보 (I1980)",
    "description": "식약처 OpenAPI I1980 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "DISS_NM",
      "DISS_CL_DVS_NM",
      "ARA_DVS_NM",
      "FISHSPCS_NM",
      "SYMPTMS_CAUS_CN",
      "CURE_PREVNT_MESUR_CN",
      "DGNS_MTHD_CN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1980 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 어류질병정보 테이블의 메타데이터입니다.",
      "includedList": [
        "DISS_NM",
        "DISS_CL_DVS_NM",
        "ARA_DVS_NM",
        "FISHSPCS_NM",
        "SYMPTMS_CAUS_CN",
        "CURE_PREVNT_MESUR_CN",
        "DGNS_MTHD_CN"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT DISS_NM, DISS_CL_DVS_NM, ARA_DVS_NM FROM I1980"
      ]
    }
  },
  {
    "id": "I2846",
    "name": "어린이 급식센터 지원현황 (I2846)",
    "description": "식약처 OpenAPI I2846 데이터베이스 테이블입니다. 총 2건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 2,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "취약계층 먹거리",
    "theme": "일반 조회용",
    "includedData": [
      "INSTT_NM",
      "CNTER_NM",
      "REPORT_YR",
      "REPORT_QU",
      "KNDRGR_REG_CO",
      "KNDRGR_NMPR_CO",
      "DCCNTR_REG_CO",
      "DCCNTR_NMPR_CO"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2846 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 어린이 급식센터 지원현황 테이블의 메타데이터입니다.",
      "includedList": [
        "INSTT_NM",
        "CNTER_NM",
        "REPORT_YR",
        "REPORT_QU",
        "KNDRGR_REG_CO",
        "KNDRGR_NMPR_CO",
        "DCCNTR_REG_CO",
        "DCCNTR_NMPR_CO",
        "ETC_REG_CO",
        "ETC_NMPR_CO"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT INSTT_NM, CNTER_NM, REPORT_YR FROM I2846"
      ]
    }
  },
  {
    "id": "I0080",
    "name": "어린이 기호식품 품질인증 현황 및 재심사 현황 (I0080)",
    "description": "식약처 OpenAPI I0080 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "취약계층 먹거리",
    "theme": "일반 조회용",
    "includedData": [
      "CHILD_FFQ_CRTFC_NO",
      "BSSH_NM",
      "LCNS_NO",
      "PRDLST_CD_NM",
      "PRDLST_NM",
      "CN_WT",
      "APPN_BGN_DT",
      "APPN_END_DT"
    ],
    "keys": [
      "CHILD_FFQ_CRTFC_NO"
    ],
    "usageExample": "SELECT * FROM I0080 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 어린이 기호식품 품질인증 현황 및 재심사 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "CHILD_FFQ_CRTFC_NO",
        "BSSH_NM",
        "LCNS_NO",
        "PRDLST_CD_NM",
        "PRDLST_NM",
        "CN_WT",
        "APPN_BGN_DT",
        "APPN_END_DT",
        "CHILD_FAVOR_FOOD_TYPE_NM",
        "PRDLST_REPORT_NO"
      ],
      "joinKeys": [
        "PK: CHILD_FFQ_CRTFC_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CHILD_FFQ_CRTFC_NO, BSSH_NM, LCNS_NO FROM I0080"
      ]
    }
  },
  {
    "id": "I0340",
    "name": "어린이 식품안전보호구역 관리 현황 (I0340)",
    "description": "식약처 OpenAPI I0340 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "취약계층 먹거리",
    "theme": "일반 조회용",
    "includedData": [
      "HOLD_INSTT_NM",
      "SCHL_NM",
      "FOOD_SAFE_PRTC_ZONE_NM",
      "ADDR",
      "APPN_DT",
      "BSSH_NO",
      "UPSO_NM",
      "UPJONG"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0340 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 어린이 식품안전보호구역 관리 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "HOLD_INSTT_NM",
        "SCHL_NM",
        "FOOD_SAFE_PRTC_ZONE_NM",
        "ADDR",
        "APPN_DT",
        "BSSH_NO",
        "UPSO_NM",
        "UPJONG"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT HOLD_INSTT_NM, SCHL_NM, FOOD_SAFE_PRTC_ZONE_NM FROM I0340"
      ]
    }
  },
  {
    "id": "I2840",
    "name": "어린이 우수판매업소 지정현황 (I2840)",
    "description": "식약처 OpenAPI I2840 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "심사·평가",
    "issue": "취약계층 먹거리",
    "theme": "학술·정책 연구용",
    "includedData": [
      "GNT_NO",
      "UPSO_NM",
      "UPJONG",
      "ADDR",
      "APLC_DT",
      "HOLD_INSTT_CD"
    ],
    "keys": [
      "GNT_NO"
    ],
    "usageExample": "SELECT * FROM I2840 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 어린이 우수판매업소 지정현황 테이블의 메타데이터입니다.",
      "includedList": [
        "GNT_NO",
        "UPSO_NM",
        "UPJONG",
        "ADDR",
        "APLC_DT",
        "HOLD_INSTT_CD"
      ],
      "joinKeys": [
        "PK: GNT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT GNT_NO, UPSO_NM, UPJONG FROM I2840"
      ]
    }
  },
  {
    "id": "I2560",
    "name": "영업소재지 GIS 코드 (I2560)",
    "description": "식약처 OpenAPI I2560 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "LOCPLC",
      "SAN",
      "LNBR",
      "ISSNO",
      "TONG",
      "BAN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2560 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 영업소재지 GIS 코드 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "LOCPLC",
        "SAN",
        "LNBR",
        "ISSNO",
        "TONG",
        "BAN",
        "SPCLADDR",
        "SPCPPDONG",
        "SPCPPISSNO",
        "ROADNMSIGNGUCD",
        "ROADNMADDREMDDVS",
        "ROADNMADDREMDCD",
        "ROADNMADDRBDFLRDVS",
        "ROADNMADDRBDORIGNO",
        "ROADNMADDRBDSUBNO",
        "ROADNMADDRSPCLADDR",
        "PNU_CD",
        "BDMERGEMANAGENO",
        "UFID_CD"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, LOCPLC FROM I2560"
      ]
    }
  },
  {
    "id": "I2818",
    "name": "용기.포장류제조업 폐업정보 (I2818)",
    "description": "식약처 OpenAPI I2818 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2818 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 용기.포장류제조업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2818"
      ]
    }
  },
  {
    "id": "I2837",
    "name": "용어사전(기구용기포장∙식의약품용어집) (I2837)",
    "description": "식약처 OpenAPI I2837 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "WORD",
      "FRNTNFISH",
      "DTL_DESC",
      "KEYWORD",
      "SAUS",
      "LAST_UPDT_DTM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2837 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 용어사전(기구용기포장∙식의약품용어집) 테이블의 메타데이터입니다.",
      "includedList": [
        "WORD",
        "FRNTNFISH",
        "DTL_DESC",
        "KEYWORD",
        "SAUS",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT WORD, FRNTNFISH, DTL_DESC FROM I2837"
      ]
    }
  },
  {
    "id": "I0250",
    "name": "우수수입업소 등록 현황 (I0250)",
    "description": "식약처 OpenAPI I0250 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "EXCLNC_INCM_BSSH_REGNO",
      "PRMS_DT",
      "BSSH_NM",
      "ADDR",
      "EXCOURY_NATN_CD_NM",
      "INCM_PRDT_XPORT_MC_NM",
      "PRDLST_CNT",
      "PRDLST_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0250 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 우수수입업소 등록 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "EXCLNC_INCM_BSSH_REGNO",
        "PRMS_DT",
        "BSSH_NM",
        "ADDR",
        "EXCOURY_NATN_CD_NM",
        "INCM_PRDT_XPORT_MC_NM",
        "PRDLST_CNT",
        "PRDLST_NM",
        "LCNS_NO"
      ],
      "joinKeys": [
        "FK: LCNS_NO -> I1260.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT EXCLNC_INCM_BSSH_REGNO, PRMS_DT, BSSH_NM FROM I0250"
      ]
    }
  },
  {
    "id": "I1550",
    "name": "위생공통교육기관내역 (I1550)",
    "description": "식약처 OpenAPI I1550 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "안전관리·점검",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "ZIPNO",
      "LOCP_ADDR",
      "LOCP_ADDR_DTL",
      "TELNO",
      "PRMS_DT"
    ],
    "keys": [
      "ZIPNO"
    ],
    "usageExample": "SELECT * FROM I1550 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생공통교육기관내역 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "ZIPNO",
        "LOCP_ADDR",
        "LOCP_ADDR_DTL",
        "TELNO",
        "PRMS_DT"
      ],
      "joinKeys": [
        "PK: ZIPNO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, ZIPNO, LOCP_ADDR FROM I1550"
      ]
    }
  },
  {
    "id": "I0680",
    "name": "위생관리등급별 업소 현황 (I0680)",
    "description": "식약처 OpenAPI I0680 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "EVL_TYPE_DVS_NM",
      "EVL_GRD_NM",
      "EVL_DT"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0680 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생관리등급별 업소 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "EVL_TYPE_DVS_NM",
        "EVL_GRD_NM",
        "EVL_DT"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, EVL_TYPE_DVS_NM FROM I0680"
      ]
    }
  },
  {
    "id": "I2823",
    "name": "위생용품 폐업정보 (I2823)",
    "description": "식약처 OpenAPI I2823 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2823 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2823"
      ]
    }
  },
  {
    "id": "I2714",
    "name": "위생용품수입업영업신고대장 (I2714)",
    "description": "식약처 OpenAPI I2714 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM",
      "TELNO"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2714 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품수입업영업신고대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2714"
      ]
    }
  },
  {
    "id": "I2851",
    "name": "위생용품영업 생산실적보고 (I2851)",
    "description": "식약처 OpenAPI I2851 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "PRDLST_NM",
      "GUBUN",
      "H_ITEM_NM",
      "LCNS_NO",
      "EVL_YR",
      "PRDLST_REPORT_NO",
      "PRDCTN_QY"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I2851 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품영업 생산실적보고 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRDLST_NM",
        "GUBUN",
        "H_ITEM_NM",
        "LCNS_NO",
        "EVL_YR",
        "PRDLST_REPORT_NO",
        "PRDCTN_QY"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I2851"
      ]
    }
  },
  {
    "id": "I2713",
    "name": "위생용품영업정보 (I2713)",
    "description": "식약처 OpenAPI I2713 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "TELNO",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2713 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품영업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "TELNO",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2713"
      ]
    }
  },
  {
    "id": "I2711",
    "name": "위생용품품목제조보고 (I2711)",
    "description": "식약처 OpenAPI I2711 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "PRODUCTION",
      "POG_DAYCNT"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I2711 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품품목제조보고 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "PRODUCTION",
        "POG_DAYCNT",
        "INDUTY_CD_NM",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I2711"
      ]
    }
  },
  {
    "id": "I2712",
    "name": "위생용품품목제조보고(원재료) (I2712)",
    "description": "식약처 OpenAPI I2712 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "RAWMTRL_NM"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I2712 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 위생용품품목제조보고(원재료) 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "RAWMTRL_NM"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I2712"
      ]
    }
  },
  {
    "id": "I0140",
    "name": "유전자변형식품등의 안전성 평가 심사 결과 현황 (I0140)",
    "description": "식약처 OpenAPI I0140 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "PRDLST_NM",
      "GOODS_NM",
      "INJECTION_GENE_CN",
      "BSSH_NM",
      "PRSDNT_NM",
      "PRMS_DT",
      "ENDOW_CHARTR_CN",
      "GMO_SAFTY_NO"
    ],
    "keys": [
      "GMO_SAFTY_NO"
    ],
    "usageExample": "SELECT * FROM I0140 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 유전자변형식품등의 안전성 평가 심사 결과 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_NM",
        "GOODS_NM",
        "INJECTION_GENE_CN",
        "BSSH_NM",
        "PRSDNT_NM",
        "PRMS_DT",
        "ENDOW_CHARTR_CN",
        "GMO_SAFTY_NO",
        "GMO_PRDT_KND_CL_NM"
      ],
      "joinKeys": [
        "PK: GMO_SAFTY_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_NM, GOODS_NM, INJECTION_GENE_CN FROM I0140"
      ]
    }
  },
  {
    "id": "I2570",
    "name": "유통바코드 (I2570)",
    "description": "식약처 OpenAPI I2570 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "유통·이력추적",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BRCD_NO",
      "PRDLST_REPORT_NO",
      "CMPNY_NM",
      "PRDT_NM",
      "LAST_UPDT_DTM",
      "PRDLST_NM",
      "HRNK_PRDLST_NM",
      "HTRK_PRDLST_NM"
    ],
    "keys": [
      "BRCD_NO"
    ],
    "usageExample": "SELECT * FROM I2570 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 유통바코드 테이블의 메타데이터입니다.",
      "includedList": [
        "BRCD_NO",
        "PRDLST_REPORT_NO",
        "CMPNY_NM",
        "PRDT_NM",
        "LAST_UPDT_DTM",
        "PRDLST_NM",
        "HRNK_PRDLST_NM",
        "HTRK_PRDLST_NM"
      ],
      "joinKeys": [
        "PK: BRCD_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BRCD_NO, PRDLST_REPORT_NO, CMPNY_NM FROM I2570"
      ]
    }
  },
  {
    "id": "I2861",
    "name": "음식점업소 인허가 변경 정보 (I2861)",
    "description": "식약처 OpenAPI I2861 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "창업 상권 분석용",
    "includedData": [
      "BSSH_NM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "TELNO",
      "SITE_ADDR",
      "CHNG_DT",
      "CHNG_BF_CN",
      "CHNG_AF_CN"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2861 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 음식점업소 인허가 변경 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "TELNO",
        "SITE_ADDR",
        "CHNG_DT",
        "CHNG_BF_CN",
        "CHNG_AF_CN",
        "CHNG_PRVNS"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2861"
      ]
    }
  },
  {
    "id": "I2500",
    "name": "인허가 업소 정보 (I2500)",
    "description": "식약처 OpenAPI I2500 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "INDUTY_CD_NM",
      "BSSH_NM",
      "PRSDNT_NM",
      "TELNO",
      "PRMS_DT",
      "ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2500 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 인허가 업소 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "INDUTY_CD_NM",
        "BSSH_NM",
        "PRSDNT_NM",
        "TELNO",
        "PRMS_DT",
        "ADDR"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, INDUTY_CD_NM, BSSH_NM FROM I2500"
      ]
    }
  },
  {
    "id": "I1090",
    "name": "잔류동물의약품 식품별 잔류허용 기준 (I1090)",
    "description": "식약처 OpenAPI I1090 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "FOOD_KOR_NM",
      "FOOD_ENG_NM",
      "DEDE_NTK_QTY",
      "TMPR_STDR_APPLC_YN",
      "LCLAS_NM",
      "MLSFC_NM",
      "SCLAS_NM"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I1090 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 잔류동물의약품 식품별 잔류허용 기준 테이블의 메타데이터입니다.",
      "includedList": [
        "FOOD_KOR_NM",
        "FOOD_ENG_NM",
        "DEDE_NTK_QTY",
        "TMPR_STDR_APPLC_YN",
        "LCLAS_NM",
        "MLSFC_NM",
        "SCLAS_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT FOOD_KOR_NM, FOOD_ENG_NM, DEDE_NTK_QTY FROM I1090"
      ]
    }
  },
  {
    "id": "COOKRCP01",
    "name": "조리식품의 레시피 DB (COOKRCP01)",
    "description": "식약처 OpenAPI COOKRCP01 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "RCP_SEQ",
      "RCP_NM",
      "RCP_WAY2",
      "RCP_PAT2",
      "INFO_WGT",
      "INFO_ENG",
      "INFO_CAR",
      "INFO_PRO"
    ],
    "keys": [
      "RCP_SEQ"
    ],
    "usageExample": "SELECT * FROM COOKRCP01 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 조리식품의 레시피 DB 테이블의 메타데이터입니다.",
      "includedList": [
        "RCP_SEQ",
        "RCP_NM",
        "RCP_WAY2",
        "RCP_PAT2",
        "INFO_WGT",
        "INFO_ENG",
        "INFO_CAR",
        "INFO_PRO",
        "INFO_FAT",
        "INFO_NA",
        "HASH_TAG",
        "ATT_FILE_NO_MAIN",
        "ATT_FILE_NO_MK",
        "RCP_PARTS_DTLS",
        "MANUAL01",
        "MANUAL_IMG01",
        "MANUAL02",
        "MANUAL_IMG02",
        "MANUAL03",
        "MANUAL_IMG03",
        "MANUAL04",
        "MANUAL_IMG04",
        "MANUAL05",
        "MANUAL_IMG05",
        "MANUAL06",
        "MANUAL_IMG06",
        "MANUAL07",
        "MANUAL_IMG07",
        "MANUAL08",
        "MANUAL_IMG08",
        "MANUAL09",
        "MANUAL_IMG09",
        "MANUAL10",
        "MANUAL_IMG10",
        "MANUAL11",
        "MANUAL_IMG11",
        "MANUAL12",
        "MANUAL_IMG12",
        "MANUAL13",
        "MANUAL_IMG13",
        "MANUAL14",
        "MANUAL_IMG14",
        "MANUAL15",
        "MANUAL_IMG15",
        "MANUAL16",
        "MANUAL_IMG16",
        "MANUAL17",
        "MANUAL_IMG17",
        "MANUAL18",
        "MANUAL_IMG18",
        "MANUAL19",
        "MANUAL_IMG19",
        "MANUAL20",
        "MANUAL_IMG20",
        "RCP_NA_TIP"
      ],
      "joinKeys": [
        "PK: RCP_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT RCP_SEQ, RCP_NM, RCP_WAY2 FROM COOKRCP01"
      ]
    }
  },
  {
    "id": "I0060",
    "name": "주류제조.면허자 식품제조.가공영업 등록 현황 (I0060)",
    "description": "식약처 OpenAPI I0060 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "PRSDNT_NM",
      "ADDR",
      "LCNS_NO",
      "INDUTY_NM",
      "PRMS_DT",
      "INSTT_NM",
      "TELNO"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0060 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 주류제조.면허자 식품제조.가공영업 등록 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRSDNT_NM",
        "ADDR",
        "LCNS_NO",
        "INDUTY_NM",
        "PRMS_DT",
        "INSTT_NM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRSDNT_NM, ADDR FROM I0060"
      ]
    }
  },
  {
    "id": "I2829",
    "name": "즉석판매제조가공업 인허가 대장 (I2829)",
    "description": "식약처 OpenAPI I2829 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2829 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 즉석판매제조가공업 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2829"
      ]
    }
  },
  {
    "id": "I2812",
    "name": "즉석판매제조가공업 폐업정보 (I2812)",
    "description": "식약처 OpenAPI I2812 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2812 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 즉석판매제조가공업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2812"
      ]
    }
  },
  {
    "id": "I2400",
    "name": "지하수수질측정망 측정결과 (I2400)",
    "description": "식약처 OpenAPI I2400 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "YR",
      "QU",
      "SPOT_NO",
      "SIGNGU_NM",
      "ADDR",
      "PRPOS_NM",
      "DKPS_YN_NM",
      "HYDRIONDNSTY"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2400 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 지하수수질측정망 측정결과 테이블의 메타데이터입니다.",
      "includedList": [
        "YR",
        "QU",
        "SPOT_NO",
        "SIGNGU_NM",
        "ADDR",
        "PRPOS_NM",
        "DKPS_YN_NM",
        "HYDRIONDNSTY",
        "TOTEEC",
        "NO3N",
        "CI",
        "CDMM",
        "AS_",
        "CYN",
        "MRC",
        "ORGNICPH",
        "PHNL",
        "PB",
        "CR6",
        "TCE",
        "PCE",
        "TCE111",
        "BENZ",
        "TOLUE",
        "ETBEN",
        "XYLEN",
        "EC",
        "ARA_YN",
        "ARA"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT YR, QU, SPOT_NO FROM I2400"
      ]
    }
  },
  {
    "id": "I1210",
    "name": "집단급식소 설치 현황 (I1210)",
    "description": "식약처 OpenAPI I1210 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "CNCTR_MANAGE_BSSH_NO",
      "SIGNGU_CD_NM",
      "INDUTY_CL_CD_NM",
      "CNCTR_MANAGE_YN",
      "MLSV_MTHD_CD_NM",
      "FCPRV_NM",
      "FCPRV_PRSDNT_NM",
      "FCPRV_ADDR"
    ],
    "keys": [
      "CNCTR_MANAGE_BSSH_NO"
    ],
    "usageExample": "SELECT * FROM I1210 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 집단급식소 설치 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "CNCTR_MANAGE_BSSH_NO",
        "SIGNGU_CD_NM",
        "INDUTY_CL_CD_NM",
        "CNCTR_MANAGE_YN",
        "MLSV_MTHD_CD_NM",
        "FCPRV_NM",
        "FCPRV_PRSDNT_NM",
        "FCPRV_ADDR",
        "CNSGN_BSSH_NM",
        "ORGN_MLSV_YN",
        "CNSGN_PRSDNT_NM",
        "CNSGN_BSSH_ADDR",
        "RM"
      ],
      "joinKeys": [
        "PK: CNCTR_MANAGE_BSSH_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT CNCTR_MANAGE_BSSH_NO, SIGNGU_CD_NM, INDUTY_CL_CD_NM FROM I1210"
      ]
    }
  },
  {
    "id": "I2834",
    "name": "집단급식소 인허가 대장 (I2834)",
    "description": "식약처 OpenAPI I2834 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2834 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 집단급식소 인허가 대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO",
        "FK: LCNS_NO -> I2500.LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2834"
      ]
    }
  },
  {
    "id": "I2820",
    "name": "집단급식소 폐업정보 (I2820)",
    "description": "식약처 OpenAPI I2820 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2820 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 집단급식소 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2820"
      ]
    }
  },
  {
    "id": "I2550",
    "name": "처분기준코드 (I2550)",
    "description": "식약처 OpenAPI I2550 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "DSPS_STDR_CD",
      "HRNK_DSPS_STDR_CD",
      "LV_NO",
      "DSPS_STDR_CD_NM",
      "BASIS_LAWORD",
      "VILT_TYPE_CD",
      "VILT_TYPE_CD_NM",
      "USE_YN"
    ],
    "keys": [
      "DSPS_STDR_CD"
    ],
    "usageExample": "SELECT * FROM I2550 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 처분기준코드 테이블의 메타데이터입니다.",
      "includedList": [
        "DSPS_STDR_CD",
        "HRNK_DSPS_STDR_CD",
        "LV_NO",
        "DSPS_STDR_CD_NM",
        "BASIS_LAWORD",
        "VILT_TYPE_CD",
        "VILT_TYPE_CD_NM",
        "USE_YN",
        "VALD_BGN_DT",
        "VALD_END_DT",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: DSPS_STDR_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT DSPS_STDR_CD, HRNK_DSPS_STDR_CD, LV_NO FROM I2550"
      ]
    }
  },
  {
    "id": "I2824",
    "name": "축산물 가공업 폐업정보 (I2824)",
    "description": "식약처 OpenAPI I2824 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2824 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 가공업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2824"
      ]
    }
  },
  {
    "id": "I1300",
    "name": "축산물 가공업허가정보 (I1300)",
    "description": "식약처 OpenAPI I1300 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM",
      "TELNO"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1300 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 가공업허가정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1300"
      ]
    }
  },
  {
    "id": "I1330",
    "name": "축산물 보관업영업허가대장 (I1330)",
    "description": "식약처 OpenAPI I1330 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1330 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 보관업영업허가대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1330"
      ]
    }
  },
  {
    "id": "I1420",
    "name": "축산물 생산실적정보 (I1420)",
    "description": "식약처 OpenAPI I1420 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "PRDLST_NM",
      "GUBUN",
      "H_ITEM_NM",
      "LCNS_NO",
      "EVL_YR",
      "PRDLST_REPORT_NO",
      "FYER_PRDCTN_ABRT_QY"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I1420 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 생산실적정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRDLST_NM",
        "GUBUN",
        "H_ITEM_NM",
        "LCNS_NO",
        "EVL_YR",
        "PRDLST_REPORT_NO",
        "FYER_PRDCTN_ABRT_QY",
        "PRDCTN_QY"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I1420"
      ]
    }
  },
  {
    "id": "I2825",
    "name": "축산물 식육포장처리업 폐업정보 (I2825)",
    "description": "식약처 OpenAPI I2825 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2825 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 식육포장처리업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2825"
      ]
    }
  },
  {
    "id": "I1320",
    "name": "축산물 식육포장처리업영업허가대장 (I1320)",
    "description": "식약처 OpenAPI I1320 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "CLSBIZ_DVS_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1320 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 식육포장처리업영업허가대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "CLSBIZ_DVS_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM",
        "TELNO"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1320"
      ]
    }
  },
  {
    "id": "I1340",
    "name": "축산물 운반업영업신고대장 (I1340)",
    "description": "식약처 OpenAPI I1340 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1340 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 운반업영업신고대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1340"
      ]
    }
  },
  {
    "id": "I1370",
    "name": "축산물 집유업영업허가대장 (I1370)",
    "description": "식약처 OpenAPI I1370 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "CLSBIZ_DVS_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSTMP_BGN_DT"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1370 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 집유업영업허가대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "CLSBIZ_DVS_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSTMP_BGN_DT",
        "CLSTMP_END_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1370"
      ]
    }
  },
  {
    "id": "I2826",
    "name": "축산물 판매업 폐업정보 (I2826)",
    "description": "식약처 OpenAPI I2826 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2826 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 판매업 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2826"
      ]
    }
  },
  {
    "id": "I1350",
    "name": "축산물 판매업영업신고대장 (I1350)",
    "description": "식약처 OpenAPI I1350 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "업체·영업자",
    "process": "인허가·신고",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "LOCP_ADDR",
      "INSTT_NM"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I1350 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 판매업영업신고대장 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1350"
      ]
    }
  },
  {
    "id": "I1310",
    "name": "축산물 품목제조정보 (I1310)",
    "description": "식약처 OpenAPI I1310 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "PRODUCTION",
      "HIENG_LNTRT_DVS_NM"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM I1310 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물 품목제조정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "PRODUCTION",
        "HIENG_LNTRT_DVS_NM",
        "CHILD_CRTFC_YN",
        "POG_DAYCNT",
        "INDUTY_CD_NM",
        "LAST_UPDT_DTM"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I1310"
      ]
    }
  },
  {
    "id": "I2828",
    "name": "축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보 (I2828)",
    "description": "식약처 OpenAPI I2828 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "PRSDNT_NM",
      "INDUTY_NM",
      "PRMS_DT",
      "CLSBIZ_DT",
      "CLSBIZ_DVS_CD_NM",
      "LOCP_ADDR"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2828 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "PRSDNT_NM",
        "INDUTY_NM",
        "PRMS_DT",
        "CLSBIZ_DT",
        "CLSBIZ_DVS_CD_NM",
        "LOCP_ADDR",
        "INSTT_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2828"
      ]
    }
  },
  {
    "id": "I0610",
    "name": "축산물HACCP 지정정보 (I0610)",
    "description": "식약처 OpenAPI I0610 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "LCNS_NO",
      "BSSH_NM",
      "INDUTY_CD_NM",
      "PRSDNT_NM",
      "CLSBIZ_DVS_CD_NM",
      "CLSBIZ_DT",
      "SITE_ADDR",
      "HACCP_APPN_DT"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0610 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물HACCP 지정정보 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "BSSH_NM",
        "INDUTY_CD_NM",
        "PRSDNT_NM",
        "CLSBIZ_DVS_CD_NM",
        "CLSBIZ_DT",
        "SITE_ADDR",
        "HACCP_APPN_DT",
        "HACCP_APPN_NO",
        "ASGN_CANCL_DT",
        "CRTFC_ENDDT",
        "CRTFC_RETN_DT"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, BSSH_NM, INDUTY_CD_NM FROM I0610"
      ]
    }
  },
  {
    "id": "I0900",
    "name": "축산물위생검사기관 지정 현황 (I0900)",
    "description": "식약처 OpenAPI I0900 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "농·축·수산물",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "BSSH_NM",
      "PRSDNT_NM",
      "ADDR",
      "APPN_BGN_DT",
      "APPN_END_DT",
      "WORK_SCOPE"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0900 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물위생검사기관 지정 현황 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRSDNT_NM",
        "ADDR",
        "APPN_BGN_DT",
        "APPN_END_DT",
        "WORK_SCOPE"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRSDNT_NM, ADDR FROM I0900"
      ]
    }
  },
  {
    "id": "C006",
    "name": "축산물품목제조보고(원재료) (C006)",
    "description": "식약처 OpenAPI C006 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "BSSH_NM",
      "PRDLST_REPORT_NO",
      "PRMS_DT",
      "PRDLST_NM",
      "PRDLST_DCNM",
      "RAWMTRL_NM",
      "LCNS_NO",
      "CHNG_DT"
    ],
    "keys": [
      "PRDLST_REPORT_NO"
    ],
    "usageExample": "SELECT * FROM C006 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 축산물품목제조보고(원재료) 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRDLST_REPORT_NO",
        "PRMS_DT",
        "PRDLST_NM",
        "PRDLST_DCNM",
        "RAWMTRL_NM",
        "LCNS_NO",
        "CHNG_DT",
        "RAWMTRL_ORDNO"
      ],
      "joinKeys": [
        "PK: PRDLST_REPORT_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRDLST_REPORT_NO, PRMS_DT FROM C006"
      ]
    }
  },
  {
    "id": "I2390",
    "name": "토양지하수 토양실태조사정보 (I2390)",
    "description": "식약처 OpenAPI I2390 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "SOIL_SEQ",
      "EXAM_YR",
      "CHARTR_CL_NM",
      "ADDR",
      "LNDCGR_NM",
      "AREA",
      "CDMM",
      "COPPR"
    ],
    "keys": [
      "SOIL_SEQ"
    ],
    "usageExample": "SELECT * FROM I2390 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 토양지하수 토양실태조사정보 테이블의 메타데이터입니다.",
      "includedList": [
        "SOIL_SEQ",
        "EXAM_YR",
        "CHARTR_CL_NM",
        "ADDR",
        "LNDCGR_NM",
        "AREA",
        "CDMM",
        "COPPR",
        "AS_",
        "MRC",
        "PB",
        "CR6",
        "ZINC",
        "NICKEL",
        "IMCOW",
        "ORGNICPH",
        "PCT",
        "CYN",
        "PHNL",
        "BENZ",
        "TOLUE",
        "ETBEN",
        "XYLEN",
        "TPH",
        "TCE",
        "PCE",
        "HYDRIONDNSTY",
        "RM"
      ],
      "joinKeys": [
        "PK: SOIL_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT SOIL_SEQ, EXAM_YR, CHARTR_CL_NM FROM I2390"
      ]
    }
  },
  {
    "id": "I1960",
    "name": "패류독소정보 (I1960)",
    "description": "식약처 OpenAPI I1960 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "PRDLST_NM",
      "EXAM_SPOT_NM",
      "EXAM_SEAR_NM",
      "SPLORE_NO",
      "INSTT_NM",
      "PICK_DT",
      "WTNESSMAN_NM",
      "ORGNP_NM"
    ],
    "keys": [
      "SPLORE_NO"
    ],
    "usageExample": "SELECT * FROM I1960 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 패류독소정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDLST_NM",
        "EXAM_SPOT_NM",
        "EXAM_SEAR_NM",
        "SPLORE_NO",
        "INSTT_NM",
        "PICK_DT",
        "WTNESSMAN_NM",
        "ORGNP_NM",
        "SALT",
        "TEMOD",
        "SPLORE_DSUSE_DT",
        "FIT_YN"
      ],
      "joinKeys": [
        "PK: SPLORE_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDLST_NM, EXAM_SPOT_NM, EXAM_SEAR_NM FROM I1960"
      ]
    }
  },
  {
    "id": "I2856",
    "name": "푸드트럭지정현황조회 (I2856)",
    "description": "식약처 OpenAPI I2856 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "LCNS_NO",
      "PRMS_DT",
      "INSTT_CDNM",
      "INDUTY_CDNM",
      "BSSH_NM",
      "LOCP_ADDR",
      "PRSDNT_NM",
      "TELNO"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2856 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 푸드트럭지정현황조회 테이블의 메타데이터입니다.",
      "includedList": [
        "LCNS_NO",
        "PRMS_DT",
        "INSTT_CDNM",
        "INDUTY_CDNM",
        "BSSH_NM",
        "LOCP_ADDR",
        "PRSDNT_NM",
        "TELNO",
        "CHNG_DT"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LCNS_NO, PRMS_DT, INSTT_CDNM FROM I2856"
      ]
    }
  },
  {
    "id": "I2510",
    "name": "품목유형코드 (I2510)",
    "description": "식약처 OpenAPI I2510 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "LV",
      "PRDLST_CD",
      "KOR_NM",
      "ENG_NM",
      "DFN",
      "VALD_BEGN_DT",
      "VALD_END_DT",
      "HRNK_PRDLST_CD"
    ],
    "keys": [
      "PRDLST_CD"
    ],
    "usageExample": "SELECT * FROM I2510 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 품목유형코드 테이블의 메타데이터입니다.",
      "includedList": [
        "LV",
        "PRDLST_CD",
        "KOR_NM",
        "ENG_NM",
        "DFN",
        "VALD_BEGN_DT",
        "VALD_END_DT",
        "HRNK_PRDLST_CD",
        "HTRK_PRDLST_CD",
        "MXTR_PRDLST_YN",
        "ATTRB_SEQ",
        "PIAM_KOR_NM",
        "PRDLST_YN",
        "UPDT_PRVNS",
        "USE_YN",
        "RM",
        "FDGRP_YN",
        "LAST_UPDT_DTM",
        "CHD_SMBL_FD_YN"
      ],
      "joinKeys": [
        "PK: PRDLST_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT LV, PRDLST_CD, KOR_NM FROM I2510"
      ]
    }
  },
  {
    "id": "I2380",
    "name": "하수도 수질정보 (I2380)",
    "description": "식약처 OpenAPI I2380 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "해당없음",
    "theme": "일반 조회용",
    "includedData": [
      "FCLTY_NM",
      "CTPRVN_NM",
      "SIGNGU_NM",
      "ZIPNO",
      "BASS_ADDR",
      "DTL_ADDR",
      "ROADNM_BASS_ADDR",
      "ROADNM_DTL_ADDR"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2380 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 하수도 수질정보 테이블의 메타데이터입니다.",
      "includedList": [
        "FCLTY_NM",
        "CTPRVN_NM",
        "SIGNGU_NM",
        "ZIPNO",
        "BASS_ADDR",
        "DTL_ADDR",
        "ROADNM_BASS_ADDR",
        "ROADNM_DTL_ADDR",
        "MESURE_DT",
        "FCLTY_CD",
        "PAPRONSLF_NM",
        "RIVR_NM",
        "BASE_FCLTY_DVS_NM",
        "BOD",
        "COD",
        "SS",
        "TP",
        "TN",
        "EEC_QTY",
        "TEMOD",
        "ECLGY_TOXCTY"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT FCLTY_NM, CTPRVN_NM, SIGNGU_NM FROM I2380"
      ]
    }
  },
  {
    "id": "I2810",
    "name": "해외 위해식품 회수정보 (I2810)",
    "description": "식약처 OpenAPI I2810 데이터베이스 테이블입니다. 총 1건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 1,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "위해·회수 정보",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "TITL",
      "DETECT_TITL",
      "CRET_DTM",
      "BDT",
      "DOWNLOAD_URL",
      "NTCTXT_NO"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I2810 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 해외 위해식품 회수정보 테이블의 메타데이터입니다.",
      "includedList": [
        "TITL",
        "DETECT_TITL",
        "CRET_DTM",
        "BDT",
        "DOWNLOAD_URL",
        "NTCTXT_NO"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT TITL, DETECT_TITL, CRET_DTM FROM I2810"
      ]
    }
  },
  {
    "id": "I2715",
    "name": "해외직구 위해식품 차단정보 (I2715)",
    "description": "식약처 OpenAPI I2715 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "위해·회수 정보",
    "theme": "일반 조회용",
    "includedData": [
      "PRDT_NM",
      "MUFC_NM",
      "MUFC_CNTRY_NM",
      "INGR_NM_LST",
      "STT_YMD",
      "END_YMD",
      "CRET_DTM",
      "LAST_UPDT_DTM"
    ],
    "keys": [
      "SELF_IMPORT_SEQ"
    ],
    "usageExample": "SELECT * FROM I2715 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 해외직구 위해식품 차단정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDT_NM",
        "MUFC_NM",
        "MUFC_CNTRY_NM",
        "INGR_NM_LST",
        "STT_YMD",
        "END_YMD",
        "CRET_DTM",
        "LAST_UPDT_DTM",
        "IMAGE_URL",
        "SELF_IMPORT_SEQ",
        "BARCD_CTN"
      ],
      "joinKeys": [
        "PK: SELF_IMPORT_SEQ"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDT_NM, MUFC_NM, MUFC_CNTRY_NM FROM I2715"
      ]
    }
  },
  {
    "id": "I0470",
    "name": "행정처분결과 (I0470)",
    "description": "식약처 OpenAPI I0470 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRCSCITYPOINT_BSSHNM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "DSPS_DCSNDT",
      "DSPS_BGNDT",
      "DSPS_ENDDT",
      "DSPS_TYPECD_NM",
      "VILTCN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0470 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 행정처분결과 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_BSSHNM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "DSPS_DCSNDT",
        "DSPS_BGNDT",
        "DSPS_ENDDT",
        "DSPS_TYPECD_NM",
        "VILTCN",
        "ADDR",
        "TELNO",
        "PRSDNT_NM",
        "DSPSCN",
        "LAWORD_CD_NM",
        "PUBLIC_DT",
        "LAST_UPDT_DTM",
        "DSPS_INSTTCD_NM",
        "DSPSDTLS_SEQ"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0470"
      ]
    }
  },
  {
    "id": "I0482",
    "name": "행정처분결과(수입식품업) (I0482)",
    "description": "식약처 OpenAPI I0482 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "수입식품",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRCSCITYPOINT_BSSHNM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "DSPS_DCSNDT",
      "DSPS_BGNDT",
      "DSPS_ENDDT",
      "DSPS_TYPECD_NM",
      "VILTCN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0482 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 행정처분결과(수입식품업) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_BSSHNM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "DSPS_DCSNDT",
        "DSPS_BGNDT",
        "DSPS_ENDDT",
        "DSPS_TYPECD_NM",
        "VILTCN",
        "ADDR",
        "TELNO",
        "PRSDNT_NM",
        "LAWORD_CD_NM",
        "DSPSCN",
        "PUBLIC_DT",
        "LAST_UPDT_DTM",
        "DSPSDTLS_SEQ",
        "DSPS_INSTTCD_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0482"
      ]
    }
  },
  {
    "id": "I2630",
    "name": "행정처분결과(식품접객업) (I2630)",
    "description": "식약처 OpenAPI I2630 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRCSCITYPOINT_BSSHNM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "DSPS_DCSNDT",
      "DSPS_BGNDT",
      "DSPS_ENDDT",
      "DSPS_TYPECD_NM",
      "VILTCN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I2630 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 행정처분결과(식품접객업) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_BSSHNM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "DSPS_DCSNDT",
        "DSPS_BGNDT",
        "DSPS_ENDDT",
        "DSPS_TYPECD_NM",
        "VILTCN",
        "ADDR",
        "TEL_NO",
        "PRSDNT_NM",
        "DSPSCN",
        "LAWORD_CD_NM",
        "PUBLIC_DT",
        "LAST_UPDT_DTM",
        "DSPS_INSTTCD_NM",
        "DSPSDTLS_SEQ"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I2630"
      ]
    }
  },
  {
    "id": "I0480",
    "name": "행정처분결과(식품제조가공업) (I0480)",
    "description": "식약처 OpenAPI I0480 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "식품·제품",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRCSCITYPOINT_BSSHNM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "DSPS_DCSNDT",
      "DSPS_BGNDT",
      "DSPS_ENDDT",
      "DSPS_TYPECD_NM",
      "VILTCN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0480 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 행정처분결과(식품제조가공업) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_BSSHNM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "DSPS_DCSNDT",
        "DSPS_BGNDT",
        "DSPS_ENDDT",
        "DSPS_TYPECD_NM",
        "VILTCN",
        "ADDR",
        "TELNO",
        "PRSDNT_NM",
        "LAWORD_CD_NM",
        "DSPSCN",
        "PUBLIC_DT",
        "LAST_UPDT_DTM",
        "DSPSDTLS_SEQ",
        "DSPS_INSTTCD_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0480"
      ]
    }
  },
  {
    "id": "I0481",
    "name": "행정처분결과(식품판매업) (I0481)",
    "description": "식약처 OpenAPI I0481 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "행정처분·제재",
    "issue": "해당없음",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRCSCITYPOINT_BSSHNM",
      "INDUTY_CD_NM",
      "LCNS_NO",
      "DSPS_DCSNDT",
      "DSPS_BGNDT",
      "DSPS_ENDDT",
      "DSPS_TYPECD_NM",
      "VILTCN"
    ],
    "keys": [
      "LCNS_NO"
    ],
    "usageExample": "SELECT * FROM I0481 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 행정처분결과(식품판매업) 테이블의 메타데이터입니다.",
      "includedList": [
        "PRCSCITYPOINT_BSSHNM",
        "INDUTY_CD_NM",
        "LCNS_NO",
        "DSPS_DCSNDT",
        "DSPS_BGNDT",
        "DSPS_ENDDT",
        "DSPS_TYPECD_NM",
        "VILTCN",
        "ADDR",
        "TELNO",
        "PRSDNT_NM",
        "LAWORD_CD_NM",
        "DSPSCN",
        "PUBLIC_DT",
        "LAST_UPDT_DTM",
        "DSPSDTLS_SEQ",
        "DSPS_INSTTCD_NM"
      ],
      "joinKeys": [
        "PK: LCNS_NO"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0481"
      ]
    }
  },
  {
    "id": "I0490",
    "name": "회수.판매중지 정보 (I0490)",
    "description": "식약처 OpenAPI I0490 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "일반정보",
    "issue": "위해·회수 정보",
    "theme": "오픈마켓 판매자 검증",
    "includedData": [
      "PRDTNM",
      "RTRVLPRVNS",
      "BSSHNM",
      "ADDR",
      "TELNO",
      "BRCDNO",
      "FRMLCUNIT",
      "MNFDT"
    ],
    "keys": [
      "PRDLST_CD"
    ],
    "usageExample": "SELECT * FROM I0490 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 회수.판매중지 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "PRDTNM",
        "RTRVLPRVNS",
        "BSSHNM",
        "ADDR",
        "TELNO",
        "BRCDNO",
        "FRMLCUNIT",
        "MNFDT",
        "RTRVLPLANDOC_RTRVLMTHD",
        "DISTBTMLMT",
        "PRDLST_TYPE",
        "IMG_FILE_PATH",
        "PRDLST_CD",
        "CRET_DTM",
        "RTRVLDSUSE_SEQ",
        "PRDLST_REPORT_NO",
        "RTRVL_GRDCD_NM",
        "PRDLST_CD_NM",
        "LCNS_NO"
      ],
      "joinKeys": [
        "PK: PRDLST_CD"
      ],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT PRDTNM, RTRVLPRVNS, BSSHNM FROM I0490"
      ]
    }
  },
  {
    "id": "I0150",
    "name": "후대교배종의 안전성 평가 신청 및 검토 정보 (I0150)",
    "description": "식약처 OpenAPI I0150 데이터베이스 테이블입니다. 총 5건의 데이터가 포함되어 있습니다.",
    "users": [
      "개발자",
      "데이터분석가"
    ],
    "dataCount": 5,
    "formats": [
      "SQLite",
      "Open API"
    ],
    "difficulty": "intermediate",
    "subject": "기타",
    "process": "심사·평가",
    "issue": "해당없음",
    "theme": "학술·정책 연구용",
    "includedData": [
      "BSSH_NM",
      "PRSDNT_NM",
      "PRMS_DT",
      "PRDLST_NM",
      "LMOCHILD_BTHTR_CRSS_YN",
      "LMOCHILD_DFFPNT_YN",
      "LMOCHILD_CHARTR_CHNGE_YN",
      "GMO_PRDT_KND"
    ],
    "keys": [
      "PK 없음"
    ],
    "usageExample": "SELECT * FROM I0150 LIMIT 10;",
    "detail": {
      "overview": "식약처 OpenAPI 파싱을 통해 RDBMS로 구축된 후대교배종의 안전성 평가 신청 및 검토 정보 테이블의 메타데이터입니다.",
      "includedList": [
        "BSSH_NM",
        "PRSDNT_NM",
        "PRMS_DT",
        "PRDLST_NM",
        "LMOCHILD_BTHTR_CRSS_YN",
        "LMOCHILD_DFFPNT_YN",
        "LMOCHILD_CHARTR_CHNGE_YN",
        "GMO_PRDT_KND",
        "GOODS_NM"
      ],
      "joinKeys": [],
      "scenarios": [
        "데이터 통합 쿼리 작성",
        "관계형 데이터 분석"
      ],
      "recommendedUsers": [
        "백엔드 개발자",
        "데이터 엔지니어"
      ],
      "guideLinks": [
        {
          "label": "테이블 구조 확인",
          "url": "#"
        }
      ],
      "examples": [
        "SELECT BSSH_NM, PRSDNT_NM, PRMS_DT FROM I0150"
      ]
    }
  }
];

export const subjectFilters = [
  { value: 'all', label: '전체' },
  { value: '업체·영업자', label: '업체·영업자' },
  { value: '식품·제품', label: '식품·제품' },
  { value: '원재료·첨가물', label: '원재료·첨가물' },
  { value: '영양·건강', label: '영양·건강' },
  { value: '수입식품', label: '수입식품' },
  { value: '농·축·수산물', label: '농·축·수산물' },
  { value: '기타', label: '기타' }
];

export const processFilters = [
  { value: 'all', label: '전체' },
  { value: '인허가·신고', label: '인허가·신고' },
  { value: '심사·평가', label: '심사·평가' },
  { value: '안전관리·점검', label: '안전관리·점검' },
  { value: '행정처분·제재', label: '행정처분·제재' },
  { value: '유통·이력추적', label: '유통·이력추적' },
  { value: '일반정보', label: '일반정보' }
];

export const issueFilters = [
  { value: 'all', label: '전체' },
  { value: '위해·회수 정보', label: '위해·회수 정보' },
  { value: '식중독·감염병', label: '식중독·감염병' },
  { value: '유해물질 검출', label: '유해물질 검출' },
  { value: '취약계층 먹거리', label: '취약계층 먹거리' },
  { value: '해외직구 안전성', label: '해외직구 안전성' },
  { value: '해당없음', label: '해당없음' }
];

export const themeFilters = [
  { value: 'all', label: '전체' },
  { value: '오픈마켓 판매자 검증', label: '오픈마켓 판매자 검증' },
  { value: '헬스케어 앱 개발용', label: '헬스케어 앱 개발용' },
  { value: '창업 상권 분석용', label: '창업 상권 분석용' },
  { value: '학술·정책 연구용', label: '학술·정책 연구용' },
  { value: '일반 조회용', label: '일반 조회용' }
];

export const purposes = [
  {
    id: 'purpose-00',
    title: '실무형 4대 통합 융합 데이터 세트 활용',
    icon: 'ri-vip-crown-line',
    description: '여러 테이블의 결합 한계를 해결한 4대 핵심 뷰(View)를 활용하여, 완성형 서비스(바코드 안심 진단, 공장 등급 등)를 즉각 기획/구축합니다.',
    recommendedDatasets: ['v_user_barcode_allergy_dataset', 'v_supplier_risk_score_dataset', 'v_local_restaurant_hygiene_dataset', 'v_imported_food_risk_analysis_dataset'],
    reason: '오픈API의 데이터 분산 및 로컬 데이터 샘플 유실 문제를 결합식 뷰(View)로 원천 극복하여 비즈니스 가치가 가장 높은 융합형 데이터를 즉시 선사합니다.',
    steps: ['DB에 반영 완료된 실시간 가상 뷰(v_...) 확인', 'SQL Playground에서 단일 테이블처럼 자유롭게 쿼리', '모바일/웹 프로덕션 백엔드에 다이렉트 뷰 API 바인딩'],
    relatedApis: ['바코드연계제품정보', '인허가업소정보', '행정처분결과'],
    requiredLevel: '초급 ~ 고급 프리미엄',
    beginnerTip: '가장 강력하고 실용적인 융합 마트입니다! 추천 데이터세트를 클릭하여 각 스키마의 융합 구조와 샘플 데이터를 즉시 만끽해 보세요.',
    devTip: '다중 JOIN의 연산 복잡도와 인덱스 부담을 데이터베이스 가상 뷰로 완전 추상화하였으므로, 프론트엔드는 일반 SELECT문 하나만으로도 N-way 조인과 동일한 출력을 0.01초 만에 받아낼 수 있습니다.'
  },
  {
    id: 'purpose-01',
    title: '오픈마켓 판매자 검증 시스템 구축',
    icon: 'ri-store-2-line',
    description: '이커머스 입점 시 판매자의 인허가 여부와 과거 위반 이력을 대조하여 안전한 입점 환경을 구축합니다.',
    recommendedDatasets: ['I1220', 'I2500', 'I0680'],
    reason: '정상 영업 여부 및 과거 행정처분(위반) 이력을 확인하여 불량 판매자의 입점을 사전에 차단할 수 있습니다.',
    steps: ['입점 업체의 인허가번호(LCNS_NO) 조회', '식품제조/접객업 허가 유효성 검증', '과거 행정처분 이력 대조'],
    relatedApis: ['식품제조가공업', '휴게음식점', '행정처분내역'],
    requiredLevel: '중급',
    beginnerTip: '추천 데이터세트를 클릭하여 [인허가번호]를 기준으로 어떻게 데이터를 조합할지 확인해 보세요.',
    devTip: '판매자가 입력한 사업자등록번호와 식약처 인허가번호를 매핑하는 중간 테이블 구조가 필요합니다.'
  },
  {
    id: 'purpose-02',
    title: '맞춤형 헬스케어·식단 관리 앱 개발',
    icon: 'ri-heart-pulse-line',
    description: '다이어트 및 질환 관리를 위한 칼로리, 영양소 API를 연동하는 방법을 안내합니다.',
    recommendedDatasets: ['I2510', 'I1030', 'I0950'],
    reason: '건강기능식품 제품 정보와 개별 규격을 연결하여 사용자 맞춤형 영양제 및 식단을 추천할 수 있습니다.',
    steps: ['제품명 또는 품목코드(PRDLST_CD) 검색', '제품별 영양성분 및 기능성 원료 추출', '사용자 건강 데이터와 매칭 알고리즘 적용'],
    relatedApis: ['건강기능식품제품', '기능성원료', '공통기준규격'],
    requiredLevel: '초급',
    beginnerTip: '앱의 핵심인 [품목코드]를 기준으로 여러 영양 정보가 어떻게 연결되는지 스키마를 확인하세요.',
    devTip: '성분 데이터는 문자열 형태가 많으므로, 파싱하여 숫자형(수치) 데이터로 정제하는 전처리 과정이 필수적입니다.'
  },
  {
    id: 'purpose-03',
    title: '외식업 창업 지역 상권 및 트렌드 분석',
    icon: 'ri-map-pin-line',
    description: '지역별 음식점 인허가 동향 및 폐업률을 분석하여 창업 리스크를 줄입니다.',
    recommendedDatasets: ['I2500', 'I2400', 'I2560'],
    reason: '시군구 단위의 최신 영업 허가 데이터와 폐업 일자가 분석해 해당 상권의 경쟁 심화 정도를 파악할 수 있습니다.',
    steps: ['원하는 지역코드 또는 주소 필터링', '업종별 신규 인허가 건수 및 폐업 건수 집계', '기간별 트렌드 분석 및 시각화'],
    relatedApis: ['휴게음식점', '일반음식점', '수입식품판매업'],
    requiredLevel: '중급',
    beginnerTip: '주소(소재지) 컬럼을 활용하여 데이터를 지역별로 묶어보는 연습을 해보세요.',
    devTip: '공간 데이터(GIS) 분석 툴이나 시각화 라이브러리와 연동하여 히트맵(Heatmap)을 구현해 볼 수 있습니다.'
  },
  {
    id: 'purpose-04',
    title: '식품안전 정책 연구 및 통계 분석',
    icon: 'ri-bar-chart-box-line',
    description: '식중독 발생, 위반 빈도 등 거시적인 정책 연구를 위한 통계 데이터 활용법을 제공합니다.',
    recommendedDatasets: ['I1540', 'I2580', 'I2590'],
    reason: '수십 년간 누적된 위생 점검 이력과 부적합 판정 내역을 통해 안전관리 정책의 실효성을 분석할 수 있습니다.',
    steps: ['연도별 수거검사 부적합 건수 추출', '위해물질별 발생 빈도 및 원인 분석', '식품 안전 정책 개선안 도출'],
    relatedApis: ['위생평가내역', '개별기준규격', '공통기준규격'],
    requiredLevel: '고급',
    beginnerTip: '데이터 용량이 방대하므로 원하는 연도나 특정 위반 항목만 먼저 필터링하여 확인해 보세요.',
    devTip: '데이터 통합 과정에서 누락된 값(결측치)이나 형식 오류를 처리하는 데이터 클렌징(Data Cleansing) 로직 설계가 중요합니다.'
  }
];

export const dataMapNodes = [
  {
    "id": "v_user_barcode_allergy_dataset",
    "label": "바코드 안심소비 융합",
    "type": "center",
    "x": -100,
    "y": -100,
    "datasets": [
      "v_user_barcode_allergy_dataset"
    ]
  },
  {
    "id": "v_supplier_risk_score_dataset",
    "label": "제조업체 식품안전 위해등급",
    "type": "center",
    "x": -100,
    "y": 600,
    "datasets": [
      "v_supplier_risk_score_dataset"
    ]
  },
  {
    "id": "v_local_restaurant_hygiene_dataset",
    "label": "행정동별 안심 클린식당",
    "type": "center",
    "x": 900,
    "y": -100,
    "datasets": [
      "v_local_restaurant_hygiene_dataset"
    ]
  },
  {
    "id": "v_imported_food_risk_analysis_dataset",
    "label": "수입식품영업자 안전성진단",
    "type": "center",
    "x": 900,
    "y": 700,
    "datasets": [
      "v_imported_food_risk_analysis_dataset"
    ]
  },
  {
    "id": "I2500",
    "label": "인허가 업소 정보",
    "type": "center",
    "x": 400,
    "y": 300,
    "datasets": [
      "I2500"
    ]
  },
  {
    "id": "I1250",
    "label": "식품 품목제조보고",
    "type": "center",
    "x": 150,
    "y": 200,
    "datasets": [
      "I1250"
    ]
  },
  {
    "id": "C005",
    "label": "바코드 연계 제품 정보",
    "type": "center",
    "x": 50,
    "y": 50,
    "datasets": [
      "C005"
    ]
  },
  {
    "id": "C002",
    "label": "원재료 정보",
    "type": "data",
    "x": -50,
    "y": 250,
    "datasets": [
      "C002"
    ]
  },
  {
    "id": "I0580",
    "label": "HACCP 지정 상태",
    "type": "data",
    "x": 200,
    "y": 450,
    "datasets": [
      "I0580"
    ]
  },
  {
    "id": "I0470",
    "label": "식품 행정처분 결과",
    "type": "data",
    "x": 350,
    "y": 600,
    "datasets": [
      "I0470"
    ]
  },
  {
    "id": "I2620",
    "label": "수거검사 부적합 이력",
    "type": "data",
    "x": 550,
    "y": 550,
    "datasets": [
      "I2620"
    ]
  },
  {
    "id": "I0490",
    "label": "위해식품 회수 정보",
    "type": "data",
    "x": 250,
    "y": 50,
    "datasets": [
      "I0490"
    ]
  },
  {
    "id": "I1220",
    "label": "식품제조가공업 정보",
    "type": "data",
    "x": 600,
    "y": 200,
    "datasets": [
      "I1220"
    ]
  },
  {
    "id": "I0630",
    "label": "HACCP 지정 현황",
    "type": "data",
    "x": 100,
    "y": 550,
    "datasets": [
      "I0630"
    ]
  },
  {
    "id": "I0600",
    "label": "HACCP 미지정 현황",
    "type": "data",
    "x": 250,
    "y": 580,
    "datasets": [
      "I0600"
    ]
  },
  {
    "id": "C001",
    "label": "수입식품 영업신고 대장",
    "type": "center",
    "x": 750,
    "y": 450,
    "datasets": [
      "C001"
    ]
  },
  {
    "id": "C003",
    "label": "수입식품 신고검사 대장",
    "type": "data",
    "x": 800,
    "y": 300,
    "datasets": [
      "C003"
    ]
  },
  {
    "id": "I0482",
    "label": "수입식품 행정처분",
    "type": "data",
    "x": 700,
    "y": 600,
    "datasets": [
      "I0482"
    ]
  },
  {
    "id": "I2780",
    "label": "식품 영양성분 정보",
    "type": "data",
    "x": 50,
    "y": 350,
    "datasets": [
      "I2780"
    ]
  },
  {
    "id": "I2819",
    "label": "건강기능식품 영양성분",
    "type": "data",
    "x": -100,
    "y": 400,
    "datasets": [
      "I2819"
    ]
  },
  {
    "id": "I2530",
    "label": "시험항목코드",
    "type": "data",
    "x": 535,
    "y": 468,
    "datasets": [
      "I2530"
    ]
  },
  {
    "id": "I2600",
    "label": "공통기준규격",
    "type": "data",
    "x": 295,
    "y": 481,
    "datasets": [
      "I2600"
    ]
  },
  {
    "id": "I2510",
    "label": "품목유형코드",
    "type": "data",
    "x": 152,
    "y": 328,
    "datasets": [
      "I2510"
    ]
  },
  {
    "id": "I2610",
    "label": "공통기준제외",
    "type": "data",
    "x": 236,
    "y": 148,
    "datasets": [
      "I2610"
    ]
  },
  {
    "id": "I2580",
    "label": "개별기준규격",
    "type": "data",
    "x": 470,
    "y": 108,
    "datasets": [
      "I2580"
    ]
  },
  {
    "id": "I0960",
    "label": "건강기능식품공전",
    "type": "data",
    "x": 640,
    "y": 244,
    "datasets": [
      "I0960"
    ]
  },
  {
    "id": "I2857",
    "label": "공유주방운영업 인허가 대장",
    "type": "data",
    "x": 588,
    "y": 431,
    "datasets": [
      "I2857"
    ]
  },
  {
    "id": "I2858",
    "label": "도축업 인허가 대장",
    "type": "data",
    "x": 363,
    "y": 497,
    "datasets": [
      "I2858"
    ]
  },
  {
    "id": "I2836",
    "label": "식용란선별포장업 인허가 대장",
    "type": "data",
    "x": 172,
    "y": 382,
    "datasets": [
      "I2836"
    ]
  },
  {
    "id": "I2835",
    "label": "식육즉석판매가공업 인허가 대장",
    "type": "data",
    "x": 190,
    "y": 191,
    "datasets": [
      "I2835"
    ]
  },
  {
    "id": "I2833",
    "label": "식품냉동.냉장업 인허가 대장",
    "type": "data",
    "x": 401,
    "y": 100,
    "datasets": [
      "I2833"
    ]
  },
  {
    "id": "I2831",
    "label": "식품소분업 인허가 대장",
    "type": "data",
    "x": 610,
    "y": 192,
    "datasets": [
      "I2831"
    ]
  },
  {
    "id": "I0940",
    "label": "식품용 기구 및 용기.포장 공전",
    "type": "data",
    "x": 626,
    "y": 384,
    "datasets": [
      "I0940"
    ]
  },
  {
    "id": "I2830",
    "label": "식품운반업 인허가 대장",
    "type": "data",
    "x": 434,
    "y": 498,
    "datasets": [
      "I2830"
    ]
  },
  {
    "id": "I2821",
    "label": "수입식품업 폐업대장",
    "type": "data",
    "x": 850,
    "y": 500,
    "datasets": [
      "I2821"
    ]
  },
  {
    "id": "I2822",
    "label": "건강기능식품 폐업대장",
    "type": "data",
    "x": 450,
    "y": 700,
    "datasets": [
      "I2822"
    ]
  },
  {
    "id": "I2852",
    "label": "생산중단제품정보",
    "type": "data",
    "x": 100,
    "y": 150,
    "datasets": [
      "I2852"
    ]
  },
  {
    "id": "I2832",
    "label": "식품판매업 인허가 대장",
    "type": "data",
    "x": 500,
    "y": 120,
    "datasets": [
      "I2832"
    ]
  },
  {
    "id": "I2834",
    "label": "집단급식소 인허가 대장",
    "type": "data",
    "x": 300,
    "y": 180,
    "datasets": [
      "I2834"
    ]
  },
  {
    "id": "I2829",
    "label": "즉석판매제조가공업 인허가 대장",
    "type": "data",
    "x": 480,
    "y": 280,
    "datasets": [
      "I2829"
    ]
  },
  {
    "id": "I2856",
    "label": "푸드트럭지정현황조회",
    "type": "data",
    "x": 320,
    "y": 420,
    "datasets": [
      "I2856"
    ]
  },
  {
    "id": "I2859",
    "label": "식품업소 인허가 변경 정보",
    "type": "data",
    "x": 220,
    "y": 320,
    "datasets": [
      "I2859"
    ]
  },
  {
    "id": "I2861",
    "label": "음식점업소 인허가 변경 정보",
    "type": "data",
    "x": 580,
    "y": 490,
    "datasets": [
      "I2861"
    ]
  },
  {
    "id": "I2810",
    "label": "해외 위해식품 회수정보",
    "type": "data",
    "x": 310,
    "y": -50,
    "datasets": [
      "I2810"
    ]
  },
  {
    "id": "I2590",
    "label": "공통기준규격코드",
    "type": "data",
    "x": 200,
    "y": 510,
    "datasets": [
      "I2590"
    ]
  },
  {
    "id": "I2560",
    "label": "식품위생점검결과",
    "type": "data",
    "x": 480,
    "y": 620,
    "datasets": [
      "I2560"
    ]
  },
  {
    "id": "api_tables",
    "label": "api_tables",
    "type": "data",
    "x": -720,
    "y": -800,
    "datasets": [
      "api_tables"
    ]
  },
  {
    "id": "api_columns",
    "label": "api_columns",
    "type": "data",
    "x": -728,
    "y": -765,
    "datasets": [
      "api_columns"
    ]
  },
  {
    "id": "I0130",
    "label": "LMO 수입 승인 현황",
    "type": "data",
    "x": 880,
    "y": 400,
    "datasets": [
      "I0130"
    ]
  },
  {
    "id": "I-0050",
    "label": "건강기능식품 개별인정형 정보",
    "type": "data",
    "x": -750,
    "y": -737,
    "datasets": [
      "I-0050"
    ]
  },
  {
    "id": "I-0040",
    "label": "건강기능식품 기능성 원료인정현황",
    "type": "data",
    "x": -520,
    "y": 600,
    "datasets": [
      "I-0040"
    ]
  },
  {
    "id": "I0310",
    "label": "건강기능식품 생산실적 보고 품목 현황",
    "type": "data",
    "x": -782,
    "y": -722,
    "datasets": [
      "I0310"
    ]
  },
  {
    "id": "I0760",
    "label": "건강기능식품 영양DB",
    "type": "data",
    "x": -528,
    "y": 635,
    "datasets": [
      "I0760"
    ]
  },
  {
    "id": "I-0020",
    "label": "건강기능식품 전문.벤처제조업인허가 현황",
    "type": "data",
    "x": -120,
    "y": -600,
    "datasets": [
      "I-0020"
    ]
  },
  {
    "id": "I2710",
    "label": "건강기능식품 품목분류정보",
    "type": "data",
    "x": -818,
    "y": -722,
    "datasets": [
      "I2710"
    ]
  },
  {
    "id": "I0030",
    "label": "건강기능식품 품목제조 신고사항 현황",
    "type": "data",
    "x": -128,
    "y": -565,
    "datasets": [
      "I0030"
    ]
  },
  {
    "id": "I2860",
    "label": "건강기능식품업소 인허가 변경 정보",
    "type": "data",
    "x": 680,
    "y": -600,
    "datasets": [
      "I2860"
    ]
  },
  {
    "id": "I2839",
    "label": "건강기능식품제조업, 건강기능식품판매업 지도단속계획 및 실적현황",
    "type": "data",
    "x": -150,
    "y": -537,
    "datasets": [
      "I2839"
    ]
  },
  {
    "id": "I1290",
    "label": "건강기능식품판매업",
    "type": "data",
    "x": -879,
    "y": -703,
    "datasets": [
      "I1290"
    ]
  },
  {
    "id": "I2640",
    "label": "검사부적합 현황(농산물)",
    "type": "data",
    "x": -720,
    "y": 200,
    "datasets": [
      "I2640"
    ]
  },
  {
    "id": "I1660",
    "label": "과징금부과기준",
    "type": "data",
    "x": -913,
    "y": -747,
    "datasets": [
      "I1660"
    ]
  },
  {
    "id": "I1670",
    "label": "과태료부과기준",
    "type": "data",
    "x": -925,
    "y": -801,
    "datasets": [
      "I1670"
    ]
  },
  {
    "id": "I0910",
    "label": "국외검사기관 인정 현황",
    "type": "data",
    "x": -912,
    "y": -855,
    "datasets": [
      "I0910"
    ]
  },
  {
    "id": "I0990",
    "label": "기구 및 용기.포장의 한시적 기준 및 규격 인정 현황",
    "type": "data",
    "x": -182,
    "y": -522,
    "datasets": [
      "I0990"
    ]
  },
  {
    "id": "I1240",
    "label": "기구.용기포장제조업",
    "type": "data",
    "x": -218,
    "y": -522,
    "datasets": [
      "I1240"
    ]
  },
  {
    "id": "I1100",
    "label": "기구등의 살균소독제 기준규격",
    "type": "data",
    "x": -279,
    "y": -503,
    "datasets": [
      "I1100"
    ]
  },
  {
    "id": "I1010",
    "label": "기구등의 살균소독제 한시적 기준 및 규격 인정 현황",
    "type": "data",
    "x": -313,
    "y": -547,
    "datasets": [
      "I1010"
    ]
  },
  {
    "id": "I2847",
    "label": "나트륨 줄이기 실천음식점 지정업체 대장",
    "type": "data",
    "x": 672,
    "y": -565,
    "datasets": [
      "I2847"
    ]
  },
  {
    "id": "I1870",
    "label": "농산물 안전성검사기관 정보",
    "type": "data",
    "x": -728,
    "y": 235,
    "datasets": [
      "I1870"
    ]
  },
  {
    "id": "I1790",
    "label": "농산물이력추적 생산정보",
    "type": "data",
    "x": -750,
    "y": 263,
    "datasets": [
      "I1790"
    ]
  },
  {
    "id": "I1800",
    "label": "농산물이력추적 유통정보",
    "type": "data",
    "x": -782,
    "y": 278,
    "datasets": [
      "I1800"
    ]
  },
  {
    "id": "I1910",
    "label": "농약 등록정보",
    "type": "data",
    "x": -877,
    "y": -899,
    "datasets": [
      "I1910"
    ]
  },
  {
    "id": "I1040",
    "label": "농약잔류허용기준",
    "type": "data",
    "x": -836,
    "y": -966,
    "datasets": [
      "I1040"
    ]
  },
  {
    "id": "I1850",
    "label": "농축산물유통관리 허위표시공표정보",
    "type": "data",
    "x": -818,
    "y": 278,
    "datasets": [
      "I1850"
    ]
  },
  {
    "id": "I1860",
    "label": "농축산물유통관리 허위표시품목정보",
    "type": "data",
    "x": -879,
    "y": 297,
    "datasets": [
      "I1860"
    ]
  },
  {
    "id": "I1070",
    "label": "동물용의약품 현황",
    "type": "data",
    "x": -760,
    "y": -965,
    "datasets": [
      "I1070"
    ]
  },
  {
    "id": "I1080",
    "label": "동물의약품별 잔류허용 기준",
    "type": "data",
    "x": -692,
    "y": -931,
    "datasets": [
      "I1080"
    ]
  },
  {
    "id": "I2410",
    "label": "물환경 수질정보",
    "type": "data",
    "x": -646,
    "y": -871,
    "datasets": [
      "I2410"
    ]
  },
  {
    "id": "I1030",
    "label": "방사선조사식품 품목 인정 현황",
    "type": "data",
    "x": -630,
    "y": -797,
    "datasets": [
      "I1030"
    ]
  },
  {
    "id": "I2540",
    "label": "법령코드",
    "type": "data",
    "x": -608,
    "y": -703,
    "datasets": [
      "I2540"
    ]
  },
  {
    "id": "I2381",
    "label": "상수도 수질정보",
    "type": "data",
    "x": -669,
    "y": -629,
    "datasets": [
      "I2381"
    ]
  },
  {
    "id": "I1830",
    "label": "쇠고기(국내)이력추적 가공관리",
    "type": "data",
    "x": -756,
    "y": -589,
    "datasets": [
      "I1830"
    ]
  },
  {
    "id": "I1810",
    "label": "쇠고기(국내)이력추적 생산정보",
    "type": "data",
    "x": -852,
    "y": -591,
    "datasets": [
      "I1810"
    ]
  },
  {
    "id": "I1820",
    "label": "쇠고기(국내)이력추적 정보",
    "type": "data",
    "x": -938,
    "y": -635,
    "datasets": [
      "I1820"
    ]
  },
  {
    "id": "I0460",
    "label": "수거검사 계획 및 실적 관련 현황",
    "type": "data",
    "x": -1037,
    "y": -693,
    "datasets": [
      "I0460"
    ]
  },
  {
    "id": "I1380",
    "label": "수산물 수입업체 현황 정보",
    "type": "data",
    "x": 650,
    "y": -537,
    "datasets": [
      "I1380"
    ]
  },
  {
    "id": "I2020",
    "label": "수산물 표시단속정보",
    "type": "data",
    "x": -913,
    "y": 253,
    "datasets": [
      "I2020"
    ]
  },
  {
    "id": "I2050",
    "label": "수산물 해외등록시설정보",
    "type": "data",
    "x": -925,
    "y": 199,
    "datasets": [
      "I2050"
    ]
  },
  {
    "id": "I1920",
    "label": "수산물이력정보-기본정보",
    "type": "data",
    "x": -912,
    "y": 145,
    "datasets": [
      "I1920"
    ]
  },
  {
    "id": "I1930",
    "label": "수산물이력정보-생산정보",
    "type": "data",
    "x": -877,
    "y": 101,
    "datasets": [
      "I1930"
    ]
  },
  {
    "id": "I1940",
    "label": "수산물이력정보-출하정보",
    "type": "data",
    "x": -836,
    "y": 34,
    "datasets": [
      "I1940"
    ]
  },
  {
    "id": "I1720",
    "label": "수입쇠고기 유통이력정보",
    "type": "data",
    "x": 872,
    "y": 435,
    "datasets": [
      "I1720"
    ]
  },
  {
    "id": "I2781",
    "label": "수입축산물 냉동전환 정보",
    "type": "data",
    "x": 850,
    "y": 463,
    "datasets": [
      "I2781"
    ]
  },
  {
    "id": "I1060",
    "label": "시약정보",
    "type": "data",
    "x": -1060,
    "y": -807,
    "datasets": [
      "I1060"
    ]
  },
  {
    "id": "I2827",
    "label": "식육즉석판매가공업 폐업정보",
    "type": "data",
    "x": -1031,
    "y": -919,
    "datasets": [
      "I2827"
    ]
  },
  {
    "id": "I2850",
    "label": "식중독 원인물질별 현황",
    "type": "data",
    "x": -956,
    "y": -1008,
    "datasets": [
      "I2850"
    ]
  },
  {
    "id": "I2849",
    "label": "식중독 원인시설별 현황",
    "type": "data",
    "x": -851,
    "y": -1055,
    "datasets": [
      "I2849"
    ]
  },
  {
    "id": "I2848",
    "label": "식중독 지역별 현황",
    "type": "data",
    "x": -723,
    "y": -1095,
    "datasets": [
      "I2848"
    ]
  },
  {
    "id": "I0300",
    "label": "식품.식품첨가물 생산실적 보고 현황",
    "type": "data",
    "x": 280,
    "y": 800,
    "datasets": [
      "I0300"
    ]
  },
  {
    "id": "I0920",
    "label": "식품검사기관별 시험항목정보조회",
    "type": "data",
    "x": -602,
    "y": -1032,
    "datasets": [
      "I0920"
    ]
  },
  {
    "id": "I0930",
    "label": "식품공전",
    "type": "data",
    "x": -521,
    "y": -923,
    "datasets": [
      "I0930"
    ]
  },
  {
    "id": "I1260",
    "label": "식품등수입판매업정보",
    "type": "data",
    "x": 818,
    "y": 478,
    "datasets": [
      "I1260"
    ]
  },
  {
    "id": "I1590",
    "label": "식품모범음식점",
    "type": "data",
    "x": -495,
    "y": -790,
    "datasets": [
      "I1590"
    ]
  },
  {
    "id": "I1050",
    "label": "식품별 농약잔류허용기준",
    "type": "data",
    "x": -530,
    "y": -658,
    "datasets": [
      "I1050"
    ]
  },
  {
    "id": "I2854",
    "label": "식품별 유해오염물질 검출량",
    "type": "data",
    "x": -592,
    "y": -519,
    "datasets": [
      "I2854"
    ]
  },
  {
    "id": "I2817",
    "label": "식품보존업 폐업정보",
    "type": "data",
    "x": -735,
    "y": -456,
    "datasets": [
      "I2817"
    ]
  },
  {
    "id": "I2815",
    "label": "식품소분업 폐업정보",
    "type": "data",
    "x": -891,
    "y": -462,
    "datasets": [
      "I2815"
    ]
  },
  {
    "id": "I2814",
    "label": "식품운반업 폐업정보",
    "type": "data",
    "x": -1029,
    "y": -535,
    "datasets": [
      "I2814"
    ]
  },
  {
    "id": "I0980",
    "label": "식품원료의 한시적 기준 및 규격 인정 현황",
    "type": "data",
    "x": -325,
    "y": -601,
    "datasets": [
      "I0980"
    ]
  },
  {
    "id": "I1020",
    "label": "식품원재료(식물,동물,미생물,수산물) 정보",
    "type": "data",
    "x": 272,
    "y": 835,
    "datasets": [
      "I1020"
    ]
  },
  {
    "id": "I2520",
    "label": "식품원재료코드",
    "type": "data",
    "x": 250,
    "y": 863,
    "datasets": [
      "I2520"
    ]
  },
  {
    "id": "I0890",
    "label": "식품위생검사기관 지정 현황",
    "type": "data",
    "x": -1121,
    "y": -661,
    "datasets": [
      "I0890"
    ]
  },
  {
    "id": "I1560",
    "label": "식품위생교육내역",
    "type": "data",
    "x": -1195,
    "y": -817,
    "datasets": [
      "I1560"
    ]
  },
  {
    "id": "I1540",
    "label": "식품위생등급평가관리내역",
    "type": "data",
    "x": -1148,
    "y": -987,
    "datasets": [
      "I1540"
    ]
  },
  {
    "id": "I0320",
    "label": "식품이력추적관리 등록 현황",
    "type": "data",
    "x": -1032,
    "y": -1119,
    "datasets": [
      "I0320"
    ]
  },
  {
    "id": "C004",
    "label": "식품접객업소 위생등급 지정현황",
    "type": "data",
    "x": 618,
    "y": -522,
    "datasets": [
      "C004"
    ]
  },
  {
    "id": "I1200",
    "label": "식품접객업정보",
    "type": "data",
    "x": -870,
    "y": -1189,
    "datasets": [
      "I1200"
    ]
  },
  {
    "id": "I2811",
    "label": "식품제조가공업 폐업정보",
    "type": "data",
    "x": -312,
    "y": -655,
    "datasets": [
      "I2811"
    ]
  },
  {
    "id": "I-0010",
    "label": "식품조사처리업 인허가 현황",
    "type": "data",
    "x": -694,
    "y": -1181,
    "datasets": [
      "I-0010"
    ]
  },
  {
    "id": "I0950",
    "label": "식품첨가물공전",
    "type": "data",
    "x": 218,
    "y": 878,
    "datasets": [
      "I0950"
    ]
  },
  {
    "id": "I1101",
    "label": "식품첨가물의 기준 및 규격 현황",
    "type": "data",
    "x": -277,
    "y": -699,
    "datasets": [
      "I1101"
    ]
  },
  {
    "id": "I1000",
    "label": "식품첨가물의 한시적 기준 및 규격 인정 현황",
    "type": "data",
    "x": -236,
    "y": -766,
    "datasets": [
      "I1000"
    ]
  },
  {
    "id": "I1230",
    "label": "식품첨가물제조업",
    "type": "data",
    "x": -160,
    "y": -765,
    "datasets": [
      "I1230"
    ]
  },
  {
    "id": "I2813",
    "label": "식품첨가물제조업 폐업정보",
    "type": "data",
    "x": -92,
    "y": -731,
    "datasets": [
      "I2813"
    ]
  },
  {
    "id": "I2816",
    "label": "식품판매업 폐업정보",
    "type": "data",
    "x": -509,
    "y": -1130,
    "datasets": [
      "I2816"
    ]
  },
  {
    "id": "I1650",
    "label": "신고대상분류기준",
    "type": "data",
    "x": -395,
    "y": -971,
    "datasets": [
      "I1650"
    ]
  },
  {
    "id": "I1980",
    "label": "어류질병정보",
    "type": "data",
    "x": -361,
    "y": -778,
    "datasets": [
      "I1980"
    ]
  },
  {
    "id": "I2846",
    "label": "어린이 급식센터 지원현황",
    "type": "data",
    "x": -414,
    "y": -589,
    "datasets": [
      "I2846"
    ]
  },
  {
    "id": "I0080",
    "label": "어린이 기호식품 품질인증 현황 및 재심사 현황",
    "type": "data",
    "x": -544,
    "y": -442,
    "datasets": [
      "I0080"
    ]
  },
  {
    "id": "I0340",
    "label": "어린이 식품안전보호구역 관리 현황",
    "type": "data",
    "x": -718,
    "y": -322,
    "datasets": [
      "I0340"
    ]
  },
  {
    "id": "I2840",
    "label": "어린이 우수판매업소 지정현황",
    "type": "data",
    "x": 582,
    "y": -522,
    "datasets": [
      "I2840"
    ]
  },
  {
    "id": "I2818",
    "label": "용기.포장류제조업 폐업정보",
    "type": "data",
    "x": -46,
    "y": -671,
    "datasets": [
      "I2818"
    ]
  },
  {
    "id": "I2837",
    "label": "용어사전(기구용기포장∙식의약품용어집)",
    "type": "data",
    "x": -934,
    "y": -334,
    "datasets": [
      "I2837"
    ]
  },
  {
    "id": "I0250",
    "label": "우수수입업소 등록 현황",
    "type": "data",
    "x": 521,
    "y": -503,
    "datasets": [
      "I0250"
    ]
  },
  {
    "id": "I1550",
    "label": "위생공통교육기관내역",
    "type": "data",
    "x": -1123,
    "y": -438,
    "datasets": [
      "I1550"
    ]
  },
  {
    "id": "I0680",
    "label": "위생관리등급별 업소 현황",
    "type": "data",
    "x": 487,
    "y": -547,
    "datasets": [
      "I0680"
    ]
  },
  {
    "id": "I2823",
    "label": "위생용품 폐업정보",
    "type": "data",
    "x": -1248,
    "y": -615,
    "datasets": [
      "I2823"
    ]
  },
  {
    "id": "I2714",
    "label": "위생용품수입업영업신고대장",
    "type": "data",
    "x": 475,
    "y": -601,
    "datasets": [
      "I2714"
    ]
  },
  {
    "id": "I2851",
    "label": "위생용품영업 생산실적보고",
    "type": "data",
    "x": 488,
    "y": -655,
    "datasets": [
      "I2851"
    ]
  },
  {
    "id": "I2713",
    "label": "위생용품영업정보",
    "type": "data",
    "x": 523,
    "y": -699,
    "datasets": [
      "I2713"
    ]
  },
  {
    "id": "I2711",
    "label": "위생용품품목제조보고",
    "type": "data",
    "x": -30,
    "y": -597,
    "datasets": [
      "I2711"
    ]
  },
  {
    "id": "I2712",
    "label": "위생용품품목제조보고(원재료)",
    "type": "data",
    "x": -8,
    "y": -503,
    "datasets": [
      "I2712"
    ]
  },
  {
    "id": "I0140",
    "label": "유전자변형식품등의 안전성 평가 심사 결과 현황",
    "type": "data",
    "x": -1284,
    "y": -829,
    "datasets": [
      "I0140"
    ]
  },
  {
    "id": "I2570",
    "label": "유통바코드",
    "type": "data",
    "x": -1263,
    "y": -1058,
    "datasets": [
      "I2570"
    ]
  },
  {
    "id": "I1090",
    "label": "잔류동물의약품 식품별 잔류허용 기준",
    "type": "data",
    "x": -1104,
    "y": -1234,
    "datasets": [
      "I1090"
    ]
  },
  {
    "id": "COOKRCP01",
    "label": "조리식품의 레시피 DB",
    "type": "data",
    "x": -885,
    "y": -1323,
    "datasets": [
      "COOKRCP01"
    ]
  },
  {
    "id": "I0060",
    "label": "주류제조.면허자 식품제조.가공영업 등록 현황",
    "type": "data",
    "x": -69,
    "y": -429,
    "datasets": [
      "I0060"
    ]
  },
  {
    "id": "I2812",
    "label": "즉석판매제조가공업 폐업정보",
    "type": "data",
    "x": -156,
    "y": -389,
    "datasets": [
      "I2812"
    ]
  },
  {
    "id": "I2400",
    "label": "지하수수질측정망 측정결과",
    "type": "data",
    "x": -649,
    "y": -1308,
    "datasets": [
      "I2400"
    ]
  },
  {
    "id": "I1210",
    "label": "집단급식소 설치 현황",
    "type": "data",
    "x": -443,
    "y": -1192,
    "datasets": [
      "I1210"
    ]
  },
  {
    "id": "I2820",
    "label": "집단급식소 폐업정보",
    "type": "data",
    "x": -267,
    "y": -1015,
    "datasets": [
      "I2820"
    ]
  },
  {
    "id": "I2550",
    "label": "처분기준코드",
    "type": "data",
    "x": -226,
    "y": -761,
    "datasets": [
      "I2550"
    ]
  },
  {
    "id": "I2824",
    "label": "축산물 가공업 폐업정보",
    "type": "data",
    "x": -760,
    "y": 35,
    "datasets": [
      "I2824"
    ]
  },
  {
    "id": "I1300",
    "label": "축산물 가공업허가정보",
    "type": "data",
    "x": -692,
    "y": 69,
    "datasets": [
      "I1300"
    ]
  },
  {
    "id": "I1330",
    "label": "축산물 보관업영업허가대장",
    "type": "data",
    "x": 564,
    "y": -766,
    "datasets": [
      "I1330"
    ]
  },
  {
    "id": "I1420",
    "label": "축산물 생산실적정보",
    "type": "data",
    "x": -646,
    "y": 129,
    "datasets": [
      "I1420"
    ]
  },
  {
    "id": "I2825",
    "label": "축산물 식육포장처리업 폐업정보",
    "type": "data",
    "x": -630,
    "y": 203,
    "datasets": [
      "I2825"
    ]
  },
  {
    "id": "I1320",
    "label": "축산물 식육포장처리업영업허가대장",
    "type": "data",
    "x": 640,
    "y": -765,
    "datasets": [
      "I1320"
    ]
  },
  {
    "id": "I1340",
    "label": "축산물 운반업영업신고대장",
    "type": "data",
    "x": 708,
    "y": -731,
    "datasets": [
      "I1340"
    ]
  },
  {
    "id": "I1370",
    "label": "축산물 집유업영업허가대장",
    "type": "data",
    "x": 754,
    "y": -671,
    "datasets": [
      "I1370"
    ]
  },
  {
    "id": "I2826",
    "label": "축산물 판매업 폐업정보",
    "type": "data",
    "x": -608,
    "y": 297,
    "datasets": [
      "I2826"
    ]
  },
  {
    "id": "I1350",
    "label": "축산물 판매업영업신고대장",
    "type": "data",
    "x": 770,
    "y": -597,
    "datasets": [
      "I1350"
    ]
  },
  {
    "id": "I1310",
    "label": "축산물 품목제조정보",
    "type": "data",
    "x": -252,
    "y": -391,
    "datasets": [
      "I1310"
    ]
  },
  {
    "id": "I2828",
    "label": "축산물(도축업,보관업,운반업,집유업,식용란선별포장업) 폐업정보",
    "type": "data",
    "x": -669,
    "y": 371,
    "datasets": [
      "I2828"
    ]
  },
  {
    "id": "I0610",
    "label": "축산물HACCP 지정정보",
    "type": "data",
    "x": -756,
    "y": 411,
    "datasets": [
      "I0610"
    ]
  },
  {
    "id": "I0900",
    "label": "축산물위생검사기관 지정 현황",
    "type": "data",
    "x": -852,
    "y": 409,
    "datasets": [
      "I0900"
    ]
  },
  {
    "id": "C006",
    "label": "축산물품목제조보고(원재료)",
    "type": "data",
    "x": -338,
    "y": -435,
    "datasets": [
      "C006"
    ]
  },
  {
    "id": "I2390",
    "label": "토양지하수 토양실태조사정보",
    "type": "data",
    "x": -300,
    "y": -516,
    "datasets": [
      "I2390"
    ]
  },
  {
    "id": "I1960",
    "label": "패류독소정보",
    "type": "data",
    "x": -474,
    "y": -327,
    "datasets": [
      "I1960"
    ]
  },
  {
    "id": "I2380",
    "label": "하수도 수질정보",
    "type": "data",
    "x": -712,
    "y": -232,
    "datasets": [
      "I2380"
    ]
  },
  {
    "id": "I2715",
    "label": "해외직구 위해식품 차단정보",
    "type": "data",
    "x": -981,
    "y": -207,
    "datasets": [
      "I2715"
    ]
  },
  {
    "id": "I2630",
    "label": "행정처분결과(식품접객업)",
    "type": "data",
    "x": -1221,
    "y": -345,
    "datasets": [
      "I2630"
    ]
  },
  {
    "id": "I0480",
    "label": "행정처분결과(식품제조가공업)",
    "type": "data",
    "x": -437,
    "y": -493,
    "datasets": [
      "I0480"
    ]
  },
  {
    "id": "I0481",
    "label": "행정처분결과(식품판매업)",
    "type": "data",
    "x": -1377,
    "y": -573,
    "datasets": [
      "I0481"
    ]
  },
  {
    "id": "I0150",
    "label": "후대교배종의 안전성 평가 신청 및 검토 정보",
    "type": "data",
    "x": -1418,
    "y": -847,
    "datasets": [
      "I0150"
    ]
  }
];

export const dataMapEdges = [
  // 1. Premium Fusion View Joins
  {
    "from": "C005",
    "to": "v_user_barcode_allergy_dataset",
    "label": "BAR_CD (바코드)"
  },
  {
    "from": "I1250",
    "to": "v_user_barcode_allergy_dataset",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "C002",
    "to": "v_user_barcode_allergy_dataset",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I0490",
    "to": "v_user_barcode_allergy_dataset",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I2500",
    "to": "v_supplier_risk_score_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0580",
    "to": "v_supplier_risk_score_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0470",
    "to": "v_supplier_risk_score_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2620",
    "to": "v_supplier_risk_score_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "v_local_restaurant_hygiene_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0470",
    "to": "v_local_restaurant_hygiene_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "C001",
    "to": "v_imported_food_risk_analysis_dataset",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0482",
    "to": "v_imported_food_risk_analysis_dataset",
    "label": "LCNS_NO (인허가)"
  },

  // 2. Core & License Joins
  {
    "from": "I2500",
    "to": "I1250",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I1220",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I0580",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I0630",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I0470",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I2620",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I2857",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2858",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2830",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2831",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2833",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2835",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2836",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2832",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2834",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2829",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2856",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2859",
    "label": "LCNS_NO"
  },
  {
    "from": "I2500",
    "to": "I2861",
    "label": "LCNS_NO"
  },

  // 3. HACCP Certification Joins
  {
    "from": "I0580",
    "to": "I0630",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0580",
    "to": "I0600",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0580",
    "to": "I1220",
    "label": "LCNS_NO (인허가)"
  },

  // 4. Product, Manufacture & Barcode Joins
  {
    "from": "I1250",
    "to": "C005",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I1250",
    "to": "C002",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I1250",
    "to": "I0490",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I1250",
    "to": "I2620",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I1250",
    "to": "I2510",
    "label": "PRDLST_CD"
  },
  {
    "from": "C005",
    "to": "I0490",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I2620",
    "to": "I0490",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },
  {
    "from": "I1220",
    "to": "I1250",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I2500",
    "to": "I2852",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I1250",
    "to": "I2852",
    "label": "PRDLST_REPORT_NO (보고번호)"
  },

  // 5. Import Joins
  {
    "from": "C001",
    "to": "C003",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "C001",
    "to": "I0482",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "C001",
    "to": "I2821",
    "label": "LCNS_NO (인허가)"
  },

  // 6. Nutrition Joins
  {
    "from": "I1250",
    "to": "I2780",
    "label": "PRDLST_NM (제품명)"
  },
  {
    "from": "I1250",
    "to": "I2819",
    "label": "PRDLST_NM (제품명)"
  },

  // 7. Standards & Codes Joins
  {
    "from": "I2580",
    "to": "I2530",
    "label": "TESTITM_CD"
  },
  {
    "from": "I0960",
    "to": "I2530",
    "label": "TESTITM_CD"
  },
  {
    "from": "I2600",
    "to": "I2530",
    "label": "TESTITM_CD"
  },
  {
    "from": "I2600",
    "to": "I2510",
    "label": "PRDLST_CD"
  },
  {
    "from": "I2610",
    "to": "I2530",
    "label": "TESTITM_CD"
  },
  {
    "from": "I2610",
    "to": "I2510",
    "label": "PRDLST_CD"
  },
  {
    "from": "I0940",
    "to": "I2530",
    "label": "TESTITM_CD"
  },
  {
    "from": "I2600",
    "to": "I2590",
    "label": "CMMN_SPEC_CD"
  },

  // 8. Closures & Administrative Dispositions
  {
    "from": "I0470",
    "to": "I1220",
    "label": "LCNS_NO (인허가)"
  },
  {
    "from": "I0470",
    "to": "I2822",
    "label": "LCNS_NO (인허가)"
  },

  // 9. Additional Safety Joins
  {
    "from": "I0490",
    "to": "I2810",
    "label": "PRDLST_NM (제품명)"
  },
  {
    "from": "I2500",
    "to": "I2560",
    "label": "LCNS_NO (인허가)"
  }
];

export const subjectColorMap = {
  '융합 데이터 세트': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  '식품·제품': 'bg-teal-50 text-teal-700 border-teal-200',
  '업체·영업자': 'bg-gov-50 text-gov-700 border-gov-200',
  '원재료·첨가물': 'bg-rose-50 text-rose-700 border-rose-200',
  '영양·건강': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '수입식품': 'bg-amber-50 text-amber-700 border-amber-200',
  '농·축·수산물': 'bg-violet-50 text-violet-700 border-violet-200',
  '기타': 'bg-slate-50 text-slate-700 border-slate-200'
};
