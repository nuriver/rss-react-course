import {
  Params,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Planet } from '../searchItemsSection/searchItemsWrapper';

async function getPlanet({
  params,
}: {
  params: Params;
}): Promise<Planet | null> {
  const url = `https://swapi.dev/api/planets/${params.planetId}`;
  const response = await fetch(url);
  const planet = await response.json();
  if (response.status !== 200) throw new Error('Not found');
  return planet;
}

export async function planetDataLoader({ params }: { params: Params }) {
  const planet: Planet | null = await getPlanet({ params });
  return planet;
}

export default function PlanetData(): JSX.Element | null {
  const navigate = useNavigate();
  const planet = useLoaderData() as Planet | null;
  const { pageId } = useParams();

  function closeButtonHandler(): void {
    navigate(`/search/${pageId}`);
  }

  if (!planet) {
    return null;
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
      {/* <div className={navigation.state === 'loading' ? 'loading-indicator' : 'hidden'}>
        <p>LOADING...</p>
      </div> */}
    </div>
  );
}
