import { Planet, PlanetsResponse } from '../types/types';

export async function getPlanets(
  search: string,
  page: string
): Promise<PlanetsResponse> {
  const res = await fetch(
    `https://swapi.dev/api/planets/?search=${search}&page=${page}`
  );

  const planets: PlanetsResponse = await res.json();

  return planets;
}

export async function getDetails(
  detailsQuery?: string
): Promise<Planet | null> {
  if (!detailsQuery) {
    return null;
  }
  const res = await fetch(`https://swapi.dev/api/planets/${detailsQuery}`);

  if (!res.ok) return null;
  const details: Planet = await res.json();

  return details;
}
