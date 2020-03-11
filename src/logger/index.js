const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, splat } = format;
require('winston-daily-rotate-file');

const { logPath } = require('../utils/paths');
const { DailyRotateFile } = transports;

const logFormat = [
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  errors({ stack: true }),
  splat(),
  printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`),
];

const dailyRotateConfig = {
  dirname: logPath,
  maxSize: '5m',
  maxFiles: '14d',
};

const logger = createLogger({
  level: 'info',
  format: combine(...logFormat),
  defaultMeta: { service: 'wechat-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `all.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    new DailyRotateFile({ filename: 'error-%DATE%.log', level: 'error', ...dailyRotateConfig }),
    new DailyRotateFile({ filename: 'all-%DATE%.log', ...dailyRotateConfig }),
  ],
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: combine(
      format.colorize(),
      ...logFormat,
    ),
  }));
}

module.exports = logger;
