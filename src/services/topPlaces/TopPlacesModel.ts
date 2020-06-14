import { dbClient } from '../../config/db';

export const getPlaces = async (offset = 0, limit = 20) => {
  const res = await dbClient.query(
    'SELECT * from "TopPlaces" LIMIT $1 OFFSET $2;',
    [limit, offset],
  );
  return res.rows;
};
