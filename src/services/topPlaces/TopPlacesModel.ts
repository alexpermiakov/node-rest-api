import { dbClient } from '../../config/db';
import { subscribe } from '../../config/messenger';
import format from 'pg-format';

subscribe(({ features }: { features: Feature[] }) => {
  let featuresWithHighConfidence = features.filter(
    (feature: Feature) => feature.properties.confidence >= 8,
  );

  addPlaces(featuresWithHighConfidence);
});

const addPlaces = async (features: Feature[]) => {
  let res = features.map((feature: Feature) => [JSON.stringify(feature)]);

  await dbClient.query(
    format('INSERT INTO "TopPlaces" (feature) VALUES %L', res),
  );
};

export const getPlaces = async (offset = 0, limit = 20) => {
  const res = await dbClient.query(
    'SELECT * FROM "TopPlaces" LIMIT $1 OFFSET $2;',
    [limit, offset],
  );
  return res.rows;
};
