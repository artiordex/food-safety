# 식품안전나라 데이터 플랫폼

식품의약품안전처 OpenAPI 데이터를 수집·적재하고, 데이터셋 탐색·조인·시각화 기능을 제공하는 웹 서비스입니다.  
화면 시안 및 데이터 활용사례 시연을 목적으로 구성되었습니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **데이터 탐색** | 172개 테이블 목록 조회, 컬럼 검색, 키워드 필터 |
| **데이터맵** | 테이블 간 JOIN 관계를 시각화한 그래프 |
| **조인 시나리오** | 공통 키 기반 스타 JOIN · 체인 JOIN 시나리오 자동 생성 |
| **SQL 플레이그라운드** | 브라우저에서 직접 SELECT 쿼리 실행 |
| **실시간 스트리밍** | SSE 기반 두 테이블 라이브 JOIN 및 위생 현황 스트리밍 |
| **OpenAPI 에뮬레이터** | 식약처 API 규격 호환 엔드포인트 (로컬 DB Fallback 포함) |
| **융합 뷰(v_)** | 복수 테이블을 미리 조인한 SQLite 뷰 제공 |

---

## 기술 스택

- **Runtime**: Node.js 20.x
- **Framework**: Express 5
- **DB**: SQLite (`better-sqlite3` + `sqlite3`)
- **Frontend**: Vanilla JS + 공공디자인 템플릿 (jQuery 기반)
- **배포**: Render.com (`render.yaml`)
- **로깅**: Pino + Pino-pretty

---

## 프로젝트 구조

```
food-safety/
├── server.js                  # 서버 진입점, 미들웨어·라우터 등록
├── render.yaml                # Render.com 배포 설정
├── .env.example               # 환경변수 템플릿
│
├── routes/                    # API 라우터
│   ├── tables.js              # GET /api/tables/* — 테이블 목록·스키마·데이터
│   ├── datasets.js            # GET /api/datasets, /api/db-schema, /api/db-relationships
│   ├── query.js               # POST /api/query, GET /api/join-scenarios 등
│   ├── search.js              # GET /api/search — 키워드 통합 검색
│   ├── stream.js              # SSE: /api/live-join-stream, /api/live-hygiene-stream 등
│   └── openapi.js             # GET /api/:keyId/:serviceId/... — OpenAPI 에뮬레이터
│
├── crawler/                   # 식약처 API 크롤러
│   ├── crawler_api.js         # API 전체 목록 수집
│   ├── crawler_and_report.js  # 수집 + Excel 보고서 생성
│   ├── crawl_cache.json       # 수집된 메타데이터 캐시 (서버 기동 시 로드)
│   └── samples/               # 각 테이블 샘플 데이터 (JSON/XML)
│
├── db/                        # DB 관련 스크립트 및 분석 결과
│   ├── import_to_sqlite.js    # crawl_cache → SQLite 적재
│   ├── analyze_scenario.js    # JOIN 시나리오 자동 생성 (스타·체인)
│   ├── analyze_pk_fk.js       # PK/FK 후보 분석
│   ├── foodsafety_scenarios.md/.json   # 생성된 JOIN 시나리오 (32개)
│   ├── foodsafety_key_candidates.md/.json  # 키 후보 분석 결과
│   ├── 데이터활용사례.sql      # 8가지 활용사례 SQL 쿼리
│   └── foodsafety.db          # SQLite DB (gitignore — 별도 배포 필요)
│
├── pages/                     # 화면 HTML (`.do` URL로 서빙)
│   ├── data/
│   │   ├── dataset.html       # 데이터셋 목록
│   │   ├── datamap.html       # 데이터맵
│   │   ├── analysis.html      # 분석 도구
│   │   └── scenario.html      # 조인 시나리오
│   └── service/
│       ├── serviceIntro.html  # 서비스 소개
│       └── serviceUse.html    # 활용방법
│
├── view/                      # 프론트엔드 컴포넌트 (JS 모듈)
│   ├── app.js                 # 앱 진입점
│   ├── datasetStore.js        # 데이터셋 상태 관리
│   ├── uiComponents.js        # 공통 UI 컴포넌트
│   └── components/
│       ├── dataMap.js         # 데이터맵 시각화
│       ├── datasetExplorer.js # 데이터셋 탐색기
│       ├── sqlPlayground.js   # SQL 실행 패널
│       ├── apiExplorer.js     # API 탐색기
│       ├── apiLiveJoin.js     # 실시간 JOIN 스트리밍 UI
│       ├── keywordGraph.js    # 키워드 그래프
│       └── wordCloud.js       # 워드클라우드
│
├── public/                    # 정적 리소스 (CSS, JS 라이브러리, 이미지)
│   ├── assets/                # 공공디자인 공통 자산
│   └── includes/              # 서버에서 주입되는 HTML 조각 (헤더·푸터 등)
│
└── utils/
    └── logger.js              # Pino 로거 설정
```

---

## 시작하기

### 1. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일에서 API 키를 설정합니다.

```env
FOOD_API_KEY=your_api_key_here   # 식약처 OpenAPI 인증키
PORT=8000
LOG_LEVEL=info
```

> API 키 발급: https://www.foodsafetykorea.go.kr/api/openApiInfo.do

### 2. 의존성 설치 및 서버 실행

```bash
npm install
npm start
```

서버가 실행되면 http://localhost:8000 에서 접속할 수 있습니다.

---

## DB 구성 (초기 데이터 적재)

`foodsafety.db`는 gitignore 처리되어 있어 별도로 생성해야 합니다.

```bash
# 1. 식약처 API 메타데이터 수집
npm run crawl

# 2. SQLite DB에 적재
npm run db:import

# 3. PK/FK 후보 분석
npm run db:analyze

# 4. JOIN 시나리오 생성
node db/analyze_scenario.js
```

적재 완료 후 `db/foodsafety.db` (172개 테이블, 170개 뷰) 파일이 생성됩니다.

---

## 주요 npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm start` | 서버 실행 |
| `npm run crawl` | 식약처 API 전체 메타데이터 수집 |
| `npm run report` | 수집 + Excel 보고서 생성 |
| `npm run db:import` | 수집 데이터 → SQLite 적재 |
| `npm run db:analyze` | PK/FK 후보 분석 |

---

## 주요 API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/datasets` | 데이터셋 목록 (메타데이터 포함) |
| GET | `/api/tables` | 테이블 목록 |
| GET | `/api/tables/:name/data` | 테이블 데이터 조회 |
| GET | `/api/tables/:name/schema` | 테이블 스키마 |
| POST | `/api/query` | SELECT 쿼리 직접 실행 |
| GET | `/api/join-scenarios` | JOIN 시나리오 목록 |
| GET | `/api/db-relationships` | 테이블 간 관계 정보 |
| GET | `/api/live-join-stream` | SSE 실시간 JOIN 스트리밍 |
| GET | `/api/:keyId/:serviceId/json/:start/:end` | 식약처 OpenAPI 에뮬레이터 |

---

## 화면 구성

| URL | 화면 |
|-----|------|
| `/` | 메인 |
| `/service/serviceIntro.do` | 서비스 소개 |
| `/service/serviceUse.do` | 활용방법 |
| `/data/dataset.do` | 데이터셋 탐색 |
| `/data/datamap.do` | 데이터맵 |
| `/data/analysis.do` | 분석 도구 |
| `/data/scenario.do` | 조인 시나리오 |

---

## 배포 (Render.com)

`render.yaml`에 배포 설정이 포함되어 있습니다.  
`FOOD_API_KEY`는 Render 대시보드 > Environment에서 직접 입력해야 합니다.
---

## 데이터 출처

- **식품의약품안전처 식품안전나라 OpenAPI**
  - https://www.foodsafetykorea.go.kr/api/openApiInfo.do
  - 170개 오픈 데이터셋 (건강기능식품, 식품접객업, 이력추적, 기준규격 등)
