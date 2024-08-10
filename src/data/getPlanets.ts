import { PlanetsResponse } from '../types/types';

export default async function getPlanets(
  query: string,
  pageId: string
): Promise<PlanetsResponse> {
  const res = await fetch(
    `https://swapi.dev/api/planets/?search=${query}&page=${pageId}`
  );
  const planets = await res.json();

  return planets;
}
