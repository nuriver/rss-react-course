import PlanetDetails from './PlanetDetails';
import { LoaderFunctionArgs } from '@remix-run/node';
import getDetails from '../data/getDetails';
import { Planet } from '../types/types';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const planetId = params.planetId as string;

  const details: Planet = await getDetails(planetId);
  //TODO 404
  return details;
};

export default function PlanetData(): JSX.Element | null {
  // const navigate = useNavigate();
  const planet = useLoaderData() as Planet;

  return <PlanetDetails planet={planet} />;

  // if (isError) {
  //   navigate(`/search/${pageId}/404`);
  // }

  return null;
}
