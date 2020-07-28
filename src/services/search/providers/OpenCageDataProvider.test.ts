import axios from 'axios';
import { getPlaces } from './OpenCageDataProvider';

jest.mock('axios');
const mockedAxios = axios as any;

describe('OpenCageDataProvider', () => {
  test('an empty query string', async () => {
    mockedAxios.get.mockResolvedValue({ data: { features: [] } });
    const result = await getPlaces('Paris');
    expect(result).toEqual({ features: [] });
  });

  test('an invalid non-json response', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Service Unavailable.'));
    await expect(getPlaces('Chamonix')).rejects.toThrow('Service Unavailable.');
  });
});
