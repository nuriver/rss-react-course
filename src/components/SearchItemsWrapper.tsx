import Pagination from './Pagination';
import SearchItems from './SearchItems';
import { useContext, useState } from 'react';
import { PlanetsResponse } from '../types/types';
import { ThemeContext } from '../context/ThemeContext';
import Flyout from './Flyout';

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
      <Pagination count={planets?.count} search={search} />
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
