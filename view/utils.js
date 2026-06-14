/**
 * view/utils.js
 * (캐시 호환성을 위해 복구된 유틸리티 파일)
 */

export function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeAttr(value) {
  return escapeHtml(value);
}

// 숫자 포맷팅 (숫자가 아닌 값이 들어올 경우 방어 처리 포함)
export function formatNumber(num) {
  if (num == null || num === '') return '0'; // 빈 값 방어
  const parsed = Number(num);
  if (isNaN(parsed)) return '0'; // 문자열 등 변환 불가 값 방어
  return parsed.toLocaleString();
}
