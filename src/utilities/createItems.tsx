import { Planet } from '../types/types';
import { Link } from 'react-router-dom';

export default function createItems(
  planets: Planet[] | null
): JSX.Element | JSX.Element[] {
  if (planets && planets.length > 0) {
    const items = planets.map((planet: Planet) => {
      const planetUrl = planet.url;
      const planetNumber = planetUrl.match(/planets\/(\d+)/);
      if (!planetNumber) throw new Error('No planet number');
      return (
        <Link
          key={planetNumber[1]}
          to={`planets/${planetNumber[1]}`}
          className="search-item"
        >
          <h2>{planet.name}</h2>
          <p className="search-item-descriptor">
            <span>Population: </span>
            {planet.population}
          </p>
        </Link>
      );
    });
    return items;
  } else {
    return <div className="no-results-indicator">no results...</div>;
  }
}
