import pino from 'pino';

const logger = pino({
  name: 'api',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
