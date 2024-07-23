import { useContext } from 'react';
import createPagination from '../utilities/createPagination';
import { ThemeContext } from '../App';

export default function Pagination({
  count,
}: {
  count: number | undefined;
}): JSX.Element | null {
  const theme = useContext(ThemeContext);

  if (!count || count <= 10) return null;

  const paginationItems = createPagination(count);

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
