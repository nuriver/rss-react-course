import { Params } from 'react-router-dom';
import { getPlanet } from '../api/api';
import { Planet } from '../types/types';

export async function planetDataLoader({ params }: { params: Params }) {
  const planet: Planet = await getPlanet({ params });
  return planet;
}
