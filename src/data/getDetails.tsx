import { Planet } from '../types/types';

export default async function getDetails(id: string): Promise<Planet> {
  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const details = await res.json();

  return details;
}
