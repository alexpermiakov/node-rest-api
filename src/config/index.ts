import { init as initRedis } from './redis';

const initDependencies = async () => {
  await initRedis();
};

export { initDependencies };
