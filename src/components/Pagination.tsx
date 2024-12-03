import createPagination from '../utilities/createPagination';

export default function Pagination({
  count,
  search,
  theme,
}: {
  count: number | undefined;
  search: string;
  theme: string;
}): JSX.Element | null {
  if (!count || count <= 10) return null;

  const paginationItems = createPagination(count, search);

  return (
    <div
      className={
        theme !== 'dark'
          ? 'pagination-wrapper'
          : 'pagination-wrapper pagination-wrapper-dark'
      }
    >
      {paginationItems}
    </div>
  );
}
