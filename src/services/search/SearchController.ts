import { getPlaces } from './providers/OpenCageDataProvider';
import { redisClient } from '../../config/redis';

export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }

  let result = await getPlaces(q);
  redisClient.set(q, JSON.stringify(result));

  return result;
};
