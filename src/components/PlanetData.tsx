import { Planet } from '../types/types';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from '../context/ThemeContext';

export default function PlanetData({
  details,
  page,
  search,
}: {
  details: Planet;
  page: string;
  search: string;
}): JSX.Element {
  return <PlanetDetails details={details} page={page} search={search} />;
}

export function PlanetDetails({
  details,
  page,
  search,
}: {
  details: Planet;
  page: string;
  search: string;
}): JSX.Element {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  function closeButtonHandler(): void {
    router.push(`/?search=${search}&page=${page}`);
  }

  return (
    <div
      className={
        theme === 'light' ? 'planet-data' : 'planet-data planet-data-dark'
      }
    >
      <h1>{details.name}</h1>
      <p className="planet-data-descriptor">
        <span>rotation_period:</span> {details.rotation_period}
      </p>
      <p className="planet-data-descriptor">
        <span>orbital_period:</span> {details.orbital_period}
      </p>
      <p className="planet-data-descriptor">
        <span>diameter:</span> {details.diameter}
      </p>
      <p className="planet-data-descriptor">
        <span>climate:</span> {details.climate}
      </p>
      <p className="planet-data-descriptor">
        <span>gravity:</span> {details.gravity}
      </p>
      <p className="planet-data-descriptor">
        <span>terrain:</span> {details.terrain}
      </p>
      <p className="planet-data-descriptor">
        <span>surface_water:</span> {details.surface_water}
      </p>
      <p className="planet-data-descriptor">
        <span>population:</span> {details.population}
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
