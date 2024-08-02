import Pagination from './Pagination';
import SearchItems from './SearchItems';
import { useContext } from 'react';
import { PlanetsResponse } from '../types/types';
import { ThemeContext } from '../context/ThemeContext';

export default function SearchItemsWrapper({
  planets,
  page,
  search,
}: {
  planets: PlanetsResponse;
  page: string;
  search: string;
}): JSX.Element {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={
        theme !== 'dark'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      <SearchItems planets={planets.results} page={page} search={search} />
      <Pagination count={planets?.count} search={search} />

      {/* <Flyout /> */}
    </div>
  );
}
