import Pagination from './Pagination';
import SearchItems from './SearchItems';
import Flyout from './Flyout';
import { PlanetsResponse } from '../types/types';

export default function SearchItemsWrapper({
  planets,
  theme,
}: {
  planets: PlanetsResponse;
  theme: string;
}): JSX.Element {
  return (
    <div
      className={
        theme === 'light'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      <SearchItems planets={planets.results} />
      <Pagination count={planets?.count} theme={theme} />
      <Flyout theme={theme} />
    </div>
  );
}
