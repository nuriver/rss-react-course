import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Planet } from '../../src/types/types';
import getDetails from '../../src/data/getDetails';
import PlanetDetails from '../../src/components/PlanetDetails';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const planetId = params.planetId as string;
  const details: Planet = await getDetails(planetId);

  if ('detail' in details) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return details;
};

export default function PlanetData(): JSX.Element | null {
  const planet = useLoaderData() as Planet;

  return <PlanetDetails planet={planet} />;
}
