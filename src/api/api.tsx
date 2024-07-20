import { Params } from 'react-router-dom';
import { LoaderItemsReturn, Planet } from '../types/types';

export async function getPlanet({
  params,
}: {
  params: Params;
}): Promise<Planet> {
  const url = `https://swapi.dev/api/planets/${params.planetId}`;
  const response = await fetch(url);
  const planet = await response.json();
  if (response.status !== 200) throw new Error('Not found');
  return planet;
}

// TODO: delete
export async function loadItems({
  params,
}: {
  params: Params;
}): Promise<LoaderItemsReturn> {
  const query = localStorage.getItem('searchQuery');
  const baseUrl = 'https://swapi.dev/api/planets/?search=';
  const page = params.pageId;

  const url = {
    value: `${baseUrl}&page=${page}`,
  };
  if (query) url.value = `${baseUrl}${query}&page=${page}`;

  const fetchedData = await fetch(url.value);
  if (fetchedData.status !== 200) throw new Error('Not found');
  const results = await fetchedData.json();
  const planets: Planet[] = results.results;
  const count: number = results.count;

  return { planets, count };
}
