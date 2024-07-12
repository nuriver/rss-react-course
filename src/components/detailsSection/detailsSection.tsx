export default function DetailsSection(): JSX.Element {
  return (
    <section className="details">
      <div className="planet-data">
        <h1>Tatooine</h1>
        <p className="planet-data-descriptor">
          <span>rotation_period:</span> 23
        </p>
        <p className="planet-data-descriptor">
          <span>orbital_period:</span> 304
        </p>
        <p className="planet-data-descriptor">
          <span>diameter:</span> 10465
        </p>
        <p className="planet-data-descriptor">
          <span>climate:</span> arid
        </p>
        <p className="planet-data-descriptor">
          <span>gravity:</span> 1 standard
        </p>
        <p className="planet-data-descriptor">
          <span>terrain:</span> desert
        </p>
        <p className="planet-data-descriptor">
          <span>surface_water:</span> 1
        </p>
        <p className="planet-data-descriptor">
          <span>population:</span> 200000
        </p>
        <button className="details-close-button">X</button>
      </div>
    </section>
  );
}
