/**
 * view/uiComponents.js
 * 프로젝트 전반에서 공통으로 사용되는 UI 요소들을 생성하는 헬퍼 함수 모음입니다.
 */

/**
 * 데이터 로딩 중임을 나타내는 스피너 컴포넌트를 반환합니다.
 * @param {string} title - 주 제목 (예: '데이터를 불러오는 중입니다...')
 * @param {string} subtitle - 부 제목 (예: '대량 데이터 연산을 수행하고 있습니다.')
 * @param {string} iconClass - 사용할 Remix Icon 클래스 (기본값: 'ri-loader-4-line')
 * @returns {string} HTML 문자열
 */
export function renderLoadingSpinner(title = '데이터를 불러오는 중입니다...', subtitle = '', iconClass = 'ri-loader-4-line') {
  return `
    <div class="flex flex-col items-center justify-center py-20 text-slate-500">
      <i class="${iconClass} text-4xl animate-spin text-gov-600 mb-3"></i>
      <p class="text-sm font-medium">${title}</p>
      ${subtitle ? `<p class="text-xs text-slate-400 mt-1">${subtitle}</p>` : ''}
    </div>
  `;
}

/**
 * 조회된 데이터가 없을 때 표시하는 빈 화면(Empty State) 컴포넌트를 반환합니다.
 * @param {string} title - 주 제목 (예: '일치하는 데이터가 없습니다.')
 * @param {string} subtitle - 부 제목 (예: '다른 검색어나 필터 조건을 사용해 보세요.')
 * @param {string} iconClass - 사용할 Remix Icon 클래스 (기본값: 'ri-inbox-line')
 * @returns {string} HTML 문자열
 */
export function renderEmptyState(title = '일치하는 데이터가 없습니다.', subtitle = '', iconClass = 'ri-inbox-line') {
  return `
    <div class="p-8 text-center text-slate-500 border border-slate-200 bg-white rounded-xl shadow-sm">
      <i class="${iconClass} text-3xl text-slate-300 mb-2"></i>
      <p class="text-sm font-semibold">${title}</p>
      ${subtitle ? `<p class="text-xs text-slate-400 mt-1 font-mono">${subtitle}</p>` : ''}
    </div>
  `;
}
