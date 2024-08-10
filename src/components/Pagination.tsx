import createPagination from '../utilities/createPagination';
import { useSearchParams } from '@remix-run/react';

export default function Pagination({
  count,
}: {
  count: number | undefined;
}): JSX.Element | null {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') as string;
  const theme = 'light';

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
