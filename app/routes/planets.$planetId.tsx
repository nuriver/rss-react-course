import { LoaderFunctionArgs } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { Planet } from '../../src/types/types';
import getDetails from '../../src/data/getDetails';
import PlanetDetails from '../../src/components/PlanetDetails';

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
