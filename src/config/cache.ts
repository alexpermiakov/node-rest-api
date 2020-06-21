import redis from 'redis';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
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
