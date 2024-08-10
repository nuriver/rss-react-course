import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SearchItemsWrapper from './components/SearchItemsWrapper';
import { apiSlice } from './features/api/apiSlice';
import LoadingIndicator from './components/LoadingIndicator';
import { createContext, useState } from 'react';

const { useGetPlanetQuery } = apiSlice;
export const ThemeContext = createContext('light');

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const { pageId } = useParams() as {
    pageId: string;
    planetId: string;
  };
  const { isFetching } = useGetPlanetQuery(pageId);
  const [theme, setTheme] = useState('light');

  function onClickHandler(target: HTMLElement): void {
    if (target.className === 'sidebar') {
      navigate(`/search/${pageId}`);
    }
  }

  function themeToggleHandler(): void {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={theme}>
        <div className={theme === 'light' ? 'app' : 'app app-dark'}>
          <div
            className="sidebar"
            role="sidebar"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              onClickHandler(target);
            }}
          >
            <SearchSection />
            <section className="search-items-section">
              {isFetching ? <LoadingIndicator /> : <SearchItemsWrapper />}
            </section>
          </div>
          <section className="details">
            <Outlet />
          </section>
          <button className="button theme-toggle" onClick={themeToggleHandler}>
            {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
          </button>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
