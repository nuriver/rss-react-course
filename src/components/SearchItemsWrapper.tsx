import Pagination from './Pagination';
import SearchItems from './SearchItems';
import Flyout from './Flyout';
import { PlanetsResponse } from '../types/types';

export default function SearchItemsWrapper({
  planets,
}: {
  planets: PlanetsResponse;
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
      <SearchItems planets={planets.results} />
      <Pagination count={planets?.count} />
      <Flyout />
    </div>
  );
}
