import PlanetData from '../../src/components/PlanetData';
import { renderWithProviders } from '../customRender';
import { defaultPlanet1 } from '../testData';

vi.mock('next/navigation', () => require('next-router-mock'));

describe('PlanetData', () => {
  it('should renders without errors', () => {
    renderWithProviders(
      <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
    );
  });
});
