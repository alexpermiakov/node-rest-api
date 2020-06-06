import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csurf from 'csurf';

export const handleRateLimit = (router: Router) => {
  const limit = rateLimit({
    max: 100, // limit each IP to 100 requests per windowMs
    windowMs: 30 * 60 * 1000, // 30 mins, the timeframe for which requests are checked/remembered.
    message: 'Too many requests',
  });

  router.use(limit);
};

export const handleJSONBodyLimit = (router: Router) =>
  router.use(express.json({ limit: '10kb' })); // limit body to 10kb

export const handleHTTPHeaders = (router: Router) => router.use(helmet());

export const handleCSRF = (router: Router) =>
  router.use(
    csurf({
      cookie: true,
    }),
  );
