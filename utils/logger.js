// 한국 시간 강제 적용 (KST)
process.env.TZ = 'Asia/Seoul';

const pino = require('pino');
const path = require('path');

const logFilePath = path.join(__dirname, '../pipeline.log');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname'
        }
      },
      {
        target: 'pino/file',
        options: {
          destination: logFilePath,
          mkdir: true
        }
      }
    ]
  }
});

module.exports = logger;
