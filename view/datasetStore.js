let _cache = null;
let _promise = null;

/**
 * 데이터셋 목록을 반환한다.
 * 첫 호출 시 /api/datasets 를 fetch 하고, 이후에는 캐시를 반환한다.
 * @returns {Promise<Array>}
 */
export async function getDatasets() {
  if (_cache) return _cache;
  if (!_promise) {
    _promise = fetch('/api/datasets?_t=' + Date.now())
      .then(r => {
        if (!r.ok) throw new Error(`/api/datasets 응답 오류: ${r.status}`);
        return r.json();
      })
      .then(data => {
        _cache = Array.isArray(data) ? data : [];
        _promise = null;
        return _cache;
      })
      .catch(err => {
        _promise = null;
        console.error('[datasetStore] fetch 실패:', err);
        return [];
      });
  }
  return _promise;
}

/**
 * 캐시된 데이터를 동기적으로 반환한다.
 * getDatasets() 가 한 번 이상 완료된 후에만 데이터가 있다.
 * 아직 로드 전이면 빈 배열을 반환한다.
 */
export function getDatasetsSync() {
  return _cache || [];
}

// 모듈 로드 시 즉시 pre-warm (컴포넌트 렌더 전에 fetch 시작)
getDatasets();
