import { Planet } from '../types/types';
import { useNavigate, useSearchParams } from '@remix-run/react';

export default function PlanetDetails({
  planet,
}: {
  planet: Planet;
}): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const theme = 'light';

  function closeButtonHandler(): void {
    navigate(`/?search=${search}&page=${page}`);
  }

  return (
    <div
      className={
        theme === 'light' ? 'planet-data' : 'planet-data planet-data-dark'
      }
    >
      <h1>{planet.name}</h1>
      <p className="planet-data-descriptor">
        <span>rotation_period:</span> {planet.rotation_period}
      </p>
      <p className="planet-data-descriptor">
        <span>orbital_period:</span> {planet.orbital_period}
      </p>
      <p className="planet-data-descriptor">
        <span>diameter:</span> {planet.diameter}
      </p>
      <p className="planet-data-descriptor">
        <span>climate:</span> {planet.climate}
      </p>
      <p className="planet-data-descriptor">
        <span>gravity:</span> {planet.gravity}
      </p>
      <p className="planet-data-descriptor">
        <span>terrain:</span> {planet.terrain}
      </p>
      <p className="planet-data-descriptor">
        <span>surface_water:</span> {planet.surface_water}
      </p>
      <p className="planet-data-descriptor">
        <span>population:</span> {planet.population}
      </p>
      <button
        className="details-close-button"
        onClick={() => {
          closeButtonHandler();
        }}
      >
        &#10010;
      </button>
    </div>
  );
}
