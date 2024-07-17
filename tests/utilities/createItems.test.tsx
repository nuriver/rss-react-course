import { render, screen } from '@testing-library/react';
import createItems from '../../src/utilities/createItems';
import { planets as testPlanets } from '../testData';
import { BrowserRouter } from 'react-router-dom';

describe('createItems function', () => {
  it('should render items correctly when planets are provided', () => {
    const planets = createItems(testPlanets);

    render(
      <BrowserRouter>
        <div>{planets}</div>
      </BrowserRouter>
    );

    expect(planets).toHaveLength(testPlanets.length);

    testPlanets.forEach((testPlanet) => {
      const planetNumberRegex = testPlanet.url.match(
        /planets\/(\d+)/
      ) as RegExpMatchArray;
      const planetNumber = planetNumberRegex[1];
      const link = screen.getByRole('link', {
        name: `${testPlanet.name} Population: ${testPlanet.population}`,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/planets/${planetNumber}`);
    });
  });

  it('should render no results if there are no planets', () => {
    const noPlanets = createItems(null);

    render(<div>{noPlanets}</div>);

    expect(screen.getByText('no results...')).toBeInTheDocument();
  });
});
