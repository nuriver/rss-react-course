import { Link } from 'react-router-dom';

export default function SearchItem(): JSX.Element {
  return (
    <Link to={'planets/1'} className="search-item">
      <h2>Tatooine</h2>
      <p className="search-item-descriptor">
        <span>Population: </span>200000
      </p>
    </Link>
  );
}
