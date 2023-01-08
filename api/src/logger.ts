import pino from 'pino';

const logger = pino({
  name: 'api',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
});

logger.info(`loglevel: ${logger.level}`);

export default logger;
