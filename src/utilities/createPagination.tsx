import { Link } from '@remix-run/react';

export default function createPagination(
  count: number,
  search: string
): JSX.Element[] {
  const numberOfPages = Math.ceil(count / 10);
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    const paginationItem = (
      <Link
        className="pagination-item"
        key={i}
        to={`/?search=${search}&page=${i}`}
      >
        {i}
      </Link>
    );
    paginationItems.push(paginationItem);
  }

  return paginationItems;
}
