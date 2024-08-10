import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchSection(): JSX.Element {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const theme = 'light';

  const searchClickHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ): void => {
    event.preventDefault();
    localStorage.setItem('searchQuery', query);
    navigate('/search/1');
  };

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    setQuery(inputValue);
  };

  return (
    <div
      className={
        theme === 'light'
          ? 'search-section'
          : 'search-section search-section-dark'
      }
      role="search"
    >
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          onChange={inputHandler}
          value={query}
        />
        <button className="button search-button" onClick={searchClickHandler}>
          SEARCH
        </button>
      </div>
    </div>
  );
}
