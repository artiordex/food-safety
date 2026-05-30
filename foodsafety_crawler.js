/**
 * Render.com Fallback Entrypoint
 * 
 * Render's dashboard has cached 'node foodsafety_crawler.js' as the start command.
 * This file forwards execution to server.js to launch the web portal automatically.
 */
console.log('[Render System] 🚀 Forwarding entrypoint to server.js...');
require('./server.js');
