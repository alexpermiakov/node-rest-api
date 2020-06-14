import { Client } from 'pg';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const dbClient = new Client(process.env.DB_CONNECTION);

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
