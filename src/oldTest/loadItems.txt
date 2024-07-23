import { loadItems } from '../../src/api/api';
import { badMockResponse, goodPlanetsResponse, mockData } from '../testData';

describe('loadItems function', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should return planets and count if status is 200', async () => {
    const mockResponse = goodPlanetsResponse.clone();
    vitest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const params = { pageId: '1' };

    const { planets, count } = await loadItems({ params: params });

    expect(planets).toEqual(mockData.results);
    expect(count).toEqual(mockData.count);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://swapi.dev/api/planets/?search=&page=${params.pageId}`
    );
  });

  it('should add search query to url if there is query in local storage', async () => {
    const mockQuery = 'fb';
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockQuery);

    const mockResponse = goodPlanetsResponse.clone();
    vitest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const params = { pageId: '2' };
    await loadItems({ params: params });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://swapi.dev/api/planets/?search=${mockQuery}&page=${params.pageId}`
    );
  });

  it('should throw error if status is not 200', async () => {
    const mockBadResponse = badMockResponse.clone();
    mockBadResponse.json = badMockResponse.json;
    vitest.spyOn(global, 'fetch').mockResolvedValueOnce(mockBadResponse);

    const params = { pageId: '2' };

    await expect(() => loadItems({ params: params })).rejects.toThrowError(
      'Not found'
    );
  });
});
