import { defaultPlanet1 } from '../testData';
import { renderWithProviders } from '../customRender';
import PlanetData from '../../src/components/PlanetData';

vi.mock('next/router', () => require('next-router-mock'));

describe('PlanetData', () => {
  it('should renders without errors', () => {
    renderWithProviders(
      <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
    );
  });
});
