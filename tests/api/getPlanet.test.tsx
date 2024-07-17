import { badMockResponse, defaultPlanet1, goodMockResponse } from '../testData';
import { getPlanet } from '../../src/api/api';

describe('getPlanet', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('should return planet if status 200', async () => {
    vitest.spyOn(global, 'fetch').mockResolvedValue(goodMockResponse);

    const params = { planetId: '1' };
    const result = await getPlanet({ params: params });

    expect(result).toEqual(defaultPlanet1);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://swapi.dev/api/planets/${params.planetId}`
    );
  });

  it('should throw error if status is not 200', async () => {
    const mockBadResponse = badMockResponse.clone();
    mockBadResponse.json = badMockResponse.json;
    vitest.spyOn(global, 'fetch').mockResolvedValueOnce(mockBadResponse);

    const params = { planetId: '555' };

    await expect(() => getPlanet({ params: params })).rejects.toThrowError(
      'Not found'
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `https://swapi.dev/api/planets/${params.planetId}`
    );
  });
});
