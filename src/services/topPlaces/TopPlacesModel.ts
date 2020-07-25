import { dbClient } from '../../config/db';
import { subscribe } from '../../config/messenger';
import format from 'pg-format';

subscribe((data: any) => {
  let featuresWithHighConfidence = data.features.filter(
    (feature: any) => feature.properties.confidence >= 8,
  );
  addPlaces(featuresWithHighConfidence);
});

const addPlaces = async (features: any) => {
  let res = features.map((feature: any) => [JSON.stringify(feature)]);

  await dbClient.query(
    format('INSERT INTO "topplaces" (feature) VALUES %L', res),
  );
};

export const getPlaces = async (offset = 0, limit = 20) => {
  const res = await dbClient.query(
    'SELECT * FROM "topplaces" LIMIT $1 OFFSET $2;',
    [limit, offset],
  );
  return res.rows;
};
