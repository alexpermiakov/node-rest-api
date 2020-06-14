import { init as initCache } from './cache';
import { init as initDb } from './db';

const initDependencies = async () => {
  await initCache();
  await initDb();
};

export { initDependencies };
