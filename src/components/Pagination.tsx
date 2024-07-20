import createPagination from '../utilities/createPagination';

export default function Pagination({
  count,
}: {
  count: number | undefined;
}): JSX.Element | null {
  if (!count || count <= 10) return null;

  const paginationItems = createPagination(count);

  return <div className="pagination-wrapper">{paginationItems}</div>;
}
