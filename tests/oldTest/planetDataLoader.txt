import { getPlanet } from '../../src/api/api';
import { planetDataLoader } from '../../src/utilities/planetDataLoader';
import { defaultPlanet1 } from '../testData';

vi.mock('/src/api/api.tsx', () => {
  return {
    getPlanet: vi.fn(),
  };
});

test('planetDataLoader function should return planet', async () => {
  vi.mocked(getPlanet).mockResolvedValue(defaultPlanet1);

  const params = { planetId: '1' };
  await getPlanet({ params });

  const returnValue = await planetDataLoader({ params });
  expect(returnValue).toEqual(defaultPlanet1);
});
