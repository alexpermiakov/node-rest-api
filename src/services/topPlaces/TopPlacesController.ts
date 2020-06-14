import { getPlaces } from './TopPlacesModel';
import { redisClient } from '../../config/cache';

export const getTopPlaces = async (offset: number, limit: number) => {
  let result = await getPlaces(offset, limit);
  let key = `key-${offset}-${limit};`;
  redisClient.set(key, JSON.stringify(result));
  return result;
};
