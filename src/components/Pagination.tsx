import { useContext } from 'react';
import createPagination from '../utilities/createPagination';
import { ThemeContext } from '../App';

export default function Pagination({
  count,
  search,
}: {
  count: number | undefined;
  search: string;
}): JSX.Element | null {
  const theme = useContext(ThemeContext);

  if (!count || count <= 10) return null;

  const paginationItems = createPagination(count, search);

  return (
    <div
      className={
        theme === 'light'
          ? 'pagination-wrapper'
          : 'pagination-wrapper pagination-wrapper-dark'
      }
    >
      {paginationItems}
    </div>
  );
}
