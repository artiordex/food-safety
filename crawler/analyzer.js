// ─────────────────────────────────────────────
// 로그 유틸리티
// ─────────────────────────────────────────────
const log = {
  info: (msg) => console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toLocaleTimeString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${msg}`),
};

// ═════════════════════════════════════════════════════════════
// STEP 3: 공통키 식별
// ═════════════════════════════════════════════════════════════

/**
 * 전체 데이터셋을 순회하여 필드 출현 빈도를 집계하고,
 * 설정한 임계값 이상 등장한 필드를 공통키로 분류한다.
 *
 * @param {Array} datasets - 크롤링된 데이터셋 목록
 * @returns {Object} 공통키 분석 결과 객체
 */
function identifyCommonKeys(datasets) {
  log.info("STEP 3: 공통키 식별");

  const fieldFreq = {};  // 필드별 출현 횟수 (전체 데이터셋 기준)
  const fieldMeta = {};  // 필드별 메타 정보 (한글명, 타입, 설명 등)
  const dsKeyMap = {};  // 데이터셋별 보유 필드 목록 { svc_no: [field, ...] }
  const keyDsMap = {};  // 필드별 사용 데이터셋 목록 { field: [svc_no, ...] }

  for (const ds of datasets) {
    const svc_no = ds.svc_no;

    // 해당 데이터셋의 영문 필드명 목록 추출
    const fList = (ds.fields || []).map(f => f.field).filter(Boolean);
    dsKeyMap[svc_no] = fList;

    for (const fdict of (ds.fields || [])) {
      const field = (fdict.field || '').trim();

      // 영문 대문자로 시작하고 2자 이상인 필드만 집계 (예: LCNS_NO, PRDLST_CD)
      if (!/^[A-Z][A-Z0-9_]{1,}$/.test(field)) continue;

      fieldFreq[field] = (fieldFreq[field] || 0) + 1;

      if (!keyDsMap[field]) keyDsMap[field] = [];
      keyDsMap[field].push(svc_no);

      // 메타 정보는 처음 등장한 값을 기본으로 저장하고,
      // 이후 데이터셋에서 빠진 항목이 있으면 보완한다.
      if (!fieldMeta[field]) {
        fieldMeta[field] = {
          kor_nm: fdict.kor_nm || "",
          type: fdict.type || "",
          length: fdict.length || "",
          desc: fdict.desc || "",
          sample: fdict.sample || "",
        };
      } else {
        for (const k of ["kor_nm", "type", "length", "desc", "sample"]) {
          if (!fieldMeta[field][k] && fdict[k]) {
            fieldMeta[field][k] = fdict[k];
          }
        }
      }
    }
  }

  // 전체 데이터셋 수의 5% 또는 최소 3건 중 큰 값을 공통키 임계값으로 사용
  const total = Math.max(datasets.length, 1);
  const threshold = Math.max(3, Math.floor(total * 0.05));

  // 임계값 이상 등장한 필드를 빈도 내림차순으로 정렬
  const commonKeys = Object.entries(fieldFreq)
    .filter(([_, cnt]) => cnt >= threshold)
    .sort((a, b) => b[1] - a[1])
    .map(([f]) => f);

  log.info(`  고유 필드 수: ${Object.keys(fieldFreq).length}`);
  log.info(`  공통키 (임계=${threshold}건): ${commonKeys.length}개`);

  return {
    field_freq: fieldFreq,
    field_meta: fieldMeta,
    common_keys: commonKeys,
    ds_key_map: dsKeyMap,
    key_ds_map: keyDsMap,
    threshold,
    total_ds: total,
  };
}

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 보조 데이터
// ─────────────────────────────────────────────

// 공통키별 신뢰도 가중치 (높을수록 결합 시 신뢰성 높음)
const KEY_WEIGHT = {
  "LCNS_NO": 10,  // 허가번호
  "BSSH_NO": 10,  // 업소번호
  "BARCODE_NO": 9,  // 바코드
  "PRDLST_REPORT_NO": 9,  // 품목제조보고번호
  "HACCP_NO": 9,  // HACCP 번호
  "HCCP_NO": 9,  // HACCP 번호 오타 필드 방어용
  "CRTFC_NO": 9,  // 인증번호
  "PRDLST_CD": 7,  // 품목유형코드
  "PRDT_SHH_DVS_CD": 7,  // 제품 세부 구분 코드
  "FOOD_CD": 7,  // 식품 코드
  "PRDT_NM": 5,  // 제품명 — 단독 조인키로는 제외됨
  "BSSH_NM": 5,  // 업소명 — 단독 조인키로는 제외됨
  "MNFTR_NM": 4,  // 제조사명 — 단독 조인키로는 제외됨
  "DISPOS": 3,  // 처분 결과
  "INSP_RSLT": 3,  // 검사 결과
  "LAST_UPDT_DTM": 2,  // 최종 수정 일시
};
const DEFAULT_W = 4; // 가중치 테이블에 없는 키의 기본 가중치

// 특정 키를 포함하는 시나리오에 자동 적용할 JOIN 유형 규칙
const JOIN_TYPE_RULE = {
  "LCNS_NO": "INNER JOIN",
  "BSSH_NO": "INNER JOIN",
  "BARCODE_NO": "INNER JOIN",
  "PRDLST_REPORT_NO": "INNER JOIN",
  "HACCP_NO": "INNER JOIN",
  "HCCP_NO": "INNER JOIN",
};

// 공통키별 활용 시나리오 템플릿
// {k}: 공통키, [{A}]: 데이터셋 A명, [{B}]: 데이터셋 B명
const USE_CASE_TMPL = {
  "LCNS_NO": "허가번호({k})로 [{A}]의 인허가 현황과 [{B}] 연계 -> 허가-실적 통합 분석",
  "BARCODE_NO": "바코드({k})로 [{A}] 제품정보와 [{B}] 이력·성분 결합 -> 제품 추적 대시보드",
  "BSSH_NO": "업소번호({k})로 [{A}] 업소현황과 [{B}] 처분·위생 이력 통합 -> 업소 리스크 분석",
  "PRDLST_REPORT_NO": "품목제조보고번호({k})로 [{A}]와 [{B}] 연계 -> 제조-영양-회수 통합 추적",
  "HACCP_NO": "HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석",
  "HCCP_NO": "HACCP 번호({k})로 [{A}]와 [{B}] 연계 -> 인증·관리 이력 통합 분석",
  "PRDLST_CD": "품목유형코드({k})로 [{A}]와 [{B}] 분류 기반 집계 -> 품목별 현황 비교",
  "PRDT_NM": "제품명({k}) 매칭으로 [{A}]와 [{B}] 연계 -> 제품 정보 통합 조회",
  "BSSH_NM": "업체명({k}) 매칭으로 [{A}]와 [{B}] 연계 -> 업체별 종합 현황",
};

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 헬퍼 함수
// ─────────────────────────────────────────────

/**
 * 명칭/주소/전화/일자/내용 계열은 단독 조인키로 쓰기 위험하므로 제외한다.
 */
function isWeakJoinKey(k) {
  return /_NM$/i.test(k) ||
    /_NAME$/i.test(k) ||
    /_CD_NM$/i.test(k) ||
    /ADDR$/i.test(k) ||
    /_ADDR$/i.test(k) ||
    /TEL/i.test(k) ||
    /FAX/i.test(k) ||
    /_DT$/i.test(k) ||
    /DTM$/i.test(k) ||
    /DATE$/i.test(k) ||
    /_CN$/i.test(k) ||
    /_DESC$/i.test(k) ||
    /_CONT$/i.test(k) ||
    /_CONTENT$/i.test(k) ||
    /_MEMO$/i.test(k);
}

/**
 * 공유 키 목록을 기반으로 결합 점수(0~100)를 산출한다.
 * 가중치 합산 후 공유 키 수에 따른 보너스 배율을 적용한다.
 */
function scorePair(shared) {
  const raw = shared.reduce((acc, k) => acc + (KEY_WEIGHT[k] || DEFAULT_W), 0);
  // 공유 키가 많을수록 보너스 배율 증가 (3개 이상: 1.3배, 2개: 1.15배, 1개: 배율 없음)
  const bonus = shared.length >= 3 ? 1.3 : (shared.length === 2 ? 1.15 : 1.0);
  return Math.min(parseFloat((raw * bonus).toFixed(1)), 100.0);
}

/**
 * 공유 키 중 JOIN_TYPE_RULE에 해당하는 키가 있으면 해당 JOIN 유형을 반환하고,
 * 없으면 기본값 LEFT JOIN을 반환한다.
 */
function getJoinType(shared) {
  for (const k of shared) {
    if (JOIN_TYPE_RULE[k]) return JOIN_TYPE_RULE[k];
  }
  return "LEFT JOIN";
}

/**
 * 공유 키에 맞는 활용 시나리오 문자열을 반환한다.
 * USE_CASE_TMPL에 없는 키면 범용 설명 문장을 생성한다.
 */
function getUseCase(nm_a, nm_b, shared) {
  for (const k of shared) {
    if (USE_CASE_TMPL[k]) {
      return USE_CASE_TMPL[k]
        .replace("{k}", k)
        .replace("[{A}]", `[${nm_a.substring(0, 16)}]`)
        .replace("[{B}]", `[${nm_b.substring(0, 16)}]`);
    }
  }
  // 템플릿 미매칭 시 공통키 앞 2개를 이용한 범용 설명 반환
  return `공통키(${shared.slice(0, 2).join(', ')})로 [${nm_a.substring(0, 16)}]와 [${nm_b.substring(0, 16)}] 결합 분석`;
}

/**
 * 두 데이터셋 결합을 위한 SQL 힌트 문자열을 생성한다.
 * 공유 키 최대 3개를 ON 조건으로 사용한다.
 */
function getSqlHint(svc_a, nm_a, svc_b, nm_b, shared, jtype) {
  const on = shared.slice(0, 3).map(k => `A.${k} = B.${k}`).join(" AND ");
  const cols_a = shared.slice(0, 3).map(k => `A.${k}`).join(", ");
  return `SELECT ${cols_a}, A.*, B.* \nFROM   [${svc_a}] A  -- ${nm_a}\n${jtype} [${svc_b}] B  -- ${nm_b}\n  ON   ${on};`;
}

// ─────────────────────────────────────────────
// STEP 4: 결합 시나리오 도출 - 메인 함수
// ─────────────────────────────────────────────

/**
 * 공통키를 보유한 데이터셋 쌍을 모두 탐색하여 결합 시나리오를 도출하고,
 * 점수 내림차순으로 정렬 후 상위 topN건을 반환한다.
 *
 * @param {Array}  datasets    - 전체 데이터셋 목록
 * @param {Object} keyAnalysis - identifyCommonKeys() 반환값
 * @param {number} topN        - 최대 반환 시나리오 수 (기본 80)
 * @returns {Array} 결합 시나리오 목록
 */
function deriveScenarios(datasets, keyAnalysis, topN = 80) {
  log.info("STEP 4: 결합 시나리오 도출");

  const ck = new Set(keyAnalysis.common_keys); // 공통키 Set (O(1) 조회용)
  const dkmap = keyAnalysis.ds_key_map;

  // 데이터셋 정보를 svc_no 기준으로 빠르게 접근하기 위한 맵
  const dsinfo = datasets.reduce((acc, d) => {
    acc[d.svc_no] = d;
    return acc;
  }, {});

  // 필드가 하나라도 있는 데이터셋만 대상으로 함
  const svc_nos = datasets.map(d => d.svc_no).filter(sn => dkmap[sn] && dkmap[sn].length > 0);
  const results = [];

  // 모든 데이터셋 쌍(i, j)을 탐색하여 공유 공통키가 있으면 시나리오 생성
  for (let i = 0; i < svc_nos.length; i++) {
    for (let j = i + 1; j < svc_nos.length; j++) {
      const a = svc_nos[i];
      const b = svc_nos[j];
      const setA = new Set(dkmap[a]);
      const setB = new Set(dkmap[b]);

      // 두 데이터셋이 공유하면서 공통키 목록에도 포함된 필드 추출
      const shared = Array.from(setA).filter(k => setB.has(k) && ck.has(k));
      if (shared.length === 0) continue;

      // 명칭/주소/일자 등 약한 키만 공유하는 경우 결합 시나리오에서 제외한다.
      const strongShared = shared.filter(k => !isWeakJoinKey(k));
      if (strongShared.length === 0) continue;

      const sc = scorePair(strongShared);
      if (sc < 5) continue; // 최소 점수 미달 시나리오 제외

      const nm_a = dsinfo[a].svc_nm || a;
      const nm_b = dsinfo[b].svc_nm || b;
      const jt = getJoinType(strongShared);

      results.push({
        ds_a: a,
        nm_a,
        cat_a: dsinfo[a].cat || "",
        ds_b: b,
        nm_b,
        cat_b: dsinfo[b].cat || "",
        shared_keys: strongShared,
        key_count: strongShared.length,
        score: sc,
        join_type: jt,
        use_case: getUseCase(nm_a, nm_b, strongShared),
        sql_hint: getSqlHint(a, nm_a, b, nm_b, strongShared, jt),
      });
    }
  }

  // 점수 내림차순 정렬 후 상위 topN건만 반환
  results.sort((a, b) => b.score - a.score);
  const out = results.slice(0, topN);
  log.info(`STEP 4 완료: 후보 ${results.length}건 -> 상위 ${out.length}건`);
  return out;
}

module.exports = {
  identifyCommonKeys,
  deriveScenarios,
};
