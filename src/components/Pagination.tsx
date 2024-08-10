import createPagination from '../utilities/createPagination';

export default function Pagination({
  count,
}: {
  count: number | undefined;
}): JSX.Element | null {
  const theme = 'light';

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
