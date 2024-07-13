import {
  Params,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Planet } from '../searchItemsSection/searchItemsWrapper';

async function getPlanet({ params }: { params: Params }): Promise<Planet> {
  const url = `https://swapi.dev/api/planets/${params.planetId}`;
  const response = await fetch(url);
  const planet: Planet = await response.json();
  return planet;
}

export async function planetDataLoader({ params }: { params: Params }) {
  const planet: Planet = await getPlanet({ params });
  return planet;
}

export default function PlanetData(): JSX.Element | null {
  const navigate = useNavigate();
  const planet = useLoaderData() as Planet;
  const { pageId } = useParams();

  function closeButtonHandler(): void {
    navigate(`/search/${pageId}`);
  }

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
