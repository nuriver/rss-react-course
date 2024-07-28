import { Link } from 'react-router-dom';

export default function createPagination(count: number): JSX.Element[] {
  const numberOfPages = Math.ceil(count / 10);
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    const paginationItem = (
      <Link className="pagination-item" key={i} to={`/search/${i}`}>
        {i}
      </Link>
    );
    paginationItems.push(paginationItem);
  }

  return paginationItems;
}
