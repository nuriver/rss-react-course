import Pagination from './Pagination';
import SearchItems from './SearchItems';
import { useState } from 'react';
import { PlanetsResponse } from '../types/types';
import Flyout from './Flyout';

export default function SearchItemsWrapper({
  planets,
  page,
  search,
  theme,
}: {
  planets: PlanetsResponse;
  page: string;
  search: string;
  theme: string;
}): JSX.Element {
  const [selectedItems, setSelectedItems] = useState([] as string[]);

  return (
    <div
      className={
        theme !== 'dark'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      <SearchItems
        planets={planets.results}
        page={page}
        search={search}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />
      <Pagination count={planets?.count} search={search} theme={theme} />
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        theme={theme}
      />
    </div>
  );
}
