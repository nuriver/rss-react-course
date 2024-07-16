import { useLoaderData } from 'react-router-dom';
import { LoaderItemsReturn } from '../../types/types';
import createPagination from '../../utilities/createPagination';
import createItems from '../../utilities/createItems';

export default function SearchItemsWrapper(): JSX.Element {
  const { planets, count } = useLoaderData() as LoaderItemsReturn;
  const paginationItems = createPagination(count);
  const items = createItems(planets);

  return (
    <div className="search-items-wrapper">
      {items}
      <div className="pagination-wrapper">{paginationItems}</div>
    </div>
  );
}
