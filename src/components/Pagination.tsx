import createPagination from '../utilities/createPagination';
import { useSearchParams } from '@remix-run/react';

export default function Pagination({
  count,
  theme,
}: {
  count: number | undefined;
  theme: string;
}): JSX.Element | null {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') as string;

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
