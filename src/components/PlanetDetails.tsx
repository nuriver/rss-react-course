import { Planet } from '../types/types';

export default function PlanetDetails({
  planet,
}: {
  planet: Planet;
}): JSX.Element {
  // const navigate = useNavigate();
  const theme = 'light';

  // function closeButtonHandler(pageId: string): void {
  //   navigate(`/search/${pageId}`);
  // }

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
        // onClick={() => {
        //   closeButtonHandler(pageId);
        // }}
      >
        &#10010;
      </button>
    </div>
  );
}
