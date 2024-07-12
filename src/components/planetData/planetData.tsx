export default function PlanetData(): JSX.Element {
  const planet = {
    name: 'Tatooine',
    rotation_period: 23,
    orbital_period: 304,
    diameter: 10465,
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: 1,
    population: 200000,
  };

  return (
    <div className="planet-data">
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
      <button className="details-close-button">X</button>
    </div>
  );
}
