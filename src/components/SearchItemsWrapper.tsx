import Pagination from './Pagination';
import SearchItems from './SearchItems';
import Flyout from './Flyout';
import { PlanetsResponse } from '../types/types';

export default function SearchItemsWrapper({
  planets,
  search,
  page,
}: {
  planets: PlanetsResponse;
  search: string;
  page: string;
}): JSX.Element {
  const theme = 'light';

  return (
    <div
      className={
        theme === 'light'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      <SearchItems planets={planets.results} search={search} page={page} />;
      <Pagination count={planets?.count} />
      <Flyout />
    </div>
  );
}
