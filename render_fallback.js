/**
 * Render.com 폴백 진입점
 *
 * Render 대시보드의 Start Command가 아직 다음 명령어로 남아 있을 수 있음:
 *   node render_fallback.js
 *
 * 이 파일은 기존 실행 명령어와의 호환성을 유지하기 위한 폴백 파일임
 * 실제 웹 포털 서버 실행은 server.js로 위임함
 */

console.log('[Render System] server.js로 실행을 전달합니다...');

try {
    require('./server.js');
} catch (error) {
    console.error('[Render System] server.js 실행 중 오류가 발생했습니다.');
    console.error(error);
    process.exit(1);
}