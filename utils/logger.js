import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message,service, timestamp }) => {
  return `${timestamp} ${level}: ${message} [${service}]`;
});

export const logger = winston.createLogger({
    level: 'info', // error || warn || info
    format: combine(
      timestamp(),
      colorize(),
      customFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({ filename: 'combined.log' }),
    ],
  });


  