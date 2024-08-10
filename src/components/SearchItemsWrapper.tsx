import Pagination from './Pagination';
import SearchItems from './SearchItems';
import Flyout from './Flyout';
import { PlanetsResponse } from '../types/types';
import { useState } from 'react';

export default function SearchItemsWrapper({
  planets,
  theme,
}: {
  planets: PlanetsResponse;
  theme: string;
}): JSX.Element {
  const [selectedItems, setSelectedItems] = useState([] as string[]);

  return (
    <div
      className={
        theme === 'light'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      <SearchItems
        planets={planets.results}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <Pagination count={planets?.count} theme={theme} />
      <Flyout theme={theme} setSelectedItems={setSelectedItems} />
    </div>
  );
}
