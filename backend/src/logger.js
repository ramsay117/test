import winston from 'winston';

const serializeErrors = winston.format((info) => {
  if (info.error instanceof Error) {
    info.error = { message: info.error.message, stack: info.error.stack };
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    serializeErrors(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export { logger };
