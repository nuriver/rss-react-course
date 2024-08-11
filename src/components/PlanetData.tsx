import { Planet } from '../types/types';
import { PlanetDetails } from './PlanetDetails';

export default function PlanetData({
  details,
  page,
  search,
  theme,
}: {
  details: Planet;
  page: string;
  search: string;
  theme: string;
}): JSX.Element {
  return (
    <PlanetDetails
      details={details}
      page={page}
      search={search}
      theme={theme}
    />
  );
}
