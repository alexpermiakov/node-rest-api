import { Client } from 'pg';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const dbClient = new Client({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

dbClient.on('error', (err: Error) => {
  logger.info({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  });

  process.exit(1);
});

const init = async () => {
  await dbClient.connect();
  logger.info({
    message: `Postgres client connected`,
  });
};

export { init, dbClient };
