import { init as initCache } from './cache';
import { init as initDb } from './db';
import { init as initMessaging } from './messenger';

const initDependencies = async () => {
  await initCache();
  await initDb();
  await initMessaging(); // <-- this line
};

export { initDependencies };
