import got from 'got';
import { getPlaces } from './OpenCageDataProvider';

jest.mock('got');

describe('OpenCageDataProvider', () => {
  test('an empty query string', async () => {
    (got as any).mockResolvedValue({ body: '{"features": []}' });
    const result = await getPlaces('Paris');
    expect(result).toEqual({ features: [] });
  });

  test('an invalid non-json response', async () => {
    (got as any).mockResolvedValue('Service Unavailable.');
    await expect(getPlaces('Chamonix')).rejects.toThrow(SyntaxError);
  });
});
