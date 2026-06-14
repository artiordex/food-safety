// 모듈 버전 쿼리스트링(예: ?v=100)이 달라도 하나의 fetch만 발생하도록
// window 전역에 promise/cache를 공유
if (!window.__datasetStore) {
  window.__datasetStore = { cache: null, promise: null };
}
const _store = window.__datasetStore;

/**
 * 데이터셋 목록을 반환한다.
 * 첫 호출 시 /api/datasets 를 fetch 하고, 이후에는 캐시를 반환한다.
 * @returns {Promise<Array>}
 */
export async function getDatasets() {
  if (_store.cache) return _store.cache;
  if (!_store.promise) {
    _store.promise = fetch('/api/datasets')
      .then(r => {
        if (!r.ok) throw new Error(`/api/datasets 응답 오류: ${r.status}`);
        return r.json();
      })
      .then(data => {
        _store.cache = Array.isArray(data) ? data : [];
        _store.promise = null;
        return _store.cache;
      })
      .catch(err => {
        _store.promise = null;
        console.error('[datasetStore] fetch 실패:', err);
        return [];
      });
  }
  return _store.promise;
}

/**
 * 캐시된 데이터를 동기적으로 반환한다.
 * getDatasets() 가 한 번 이상 완료된 후에만 데이터가 있다.
 * 아직 로드 전이면 빈 배열을 반환한다.
 */
export function getDatasetsSync() {
  return _store.cache || [];
}

// 모듈 로드 시 즉시 pre-warm (컴포넌트 렌더 전에 fetch 시작)
getDatasets();
