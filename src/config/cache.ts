import redis from 'redis';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const { REDIS_URL = 'redis://localhost:6379' } = process.env;

const redisClient = redis.createClient({
  url: REDIS_URL,
});

const init = async () =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
      logger.info({
        message: `Redis client connected`,
      });
      resolve(redisClient);
    });

    redisClient.on('error', (error) => {
      reject(error);
    });
  });

export { init, redisClient };
