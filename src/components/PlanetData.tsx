import { useNavigate, useParams } from 'react-router-dom';
import { apiSlice } from '../features/api/apiSlice';
import { Planet } from '../types/types';
import LoadingIndicator from './LoadingIndicator';

const { useGetPlanetQuery } = apiSlice;

export default function PlanetData(): JSX.Element | null {
  const { pageId, planetId } = useParams() as {
    pageId: string;
    planetId: string;
  };
  const navigate = useNavigate();

  const {
    data: planet,
    isFetching,
    isSuccess,
    isError,
  } = useGetPlanetQuery(planetId, { skip: false });

  if (isFetching) {
    return <LoadingIndicator />;
  }

  if (isSuccess) {
    return <PlanetDetails planet={planet} pageId={pageId} />;
  }

  if (isError) {
    navigate(`/search/${pageId}/404`);
  }

  return null;
}

function PlanetDetails({
  planet,
  pageId,
}: {
  planet: Planet;
  pageId: string;
}): JSX.Element {
  const navigate = useNavigate();

  function closeButtonHandler(pageId: string): void {
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
          closeButtonHandler(pageId);
        }}
      >
        &#10010;
      </button>
    </div>
  );
}
