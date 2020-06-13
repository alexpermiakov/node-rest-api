import { Router } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import Sentry from 'winston-transport-sentry-node';
import dotenv from 'dotenv';

dotenv.config();

const handleLogging = (router: Router) =>
  router.use(
    expressWinston.logger({
      msg: 'HTTP {{req.method}} {{req.url}}',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({ handleExceptions: true }),
        new Sentry({
          sentry: {
            dsn: process.env.SENTRY_DSN,
          },
          handleExceptions: true,
        }),
      ],
    }),
  );

export { handleLogging };
