'use client';

import SearchSection from '../components/SearchSection';
import { Planet, PlanetsResponse } from '../types/types';
import SearchItemsWrapper from '../components/SearchItemsWrapper';
import PlanetData from '../components/PlanetData';
import setCookie from './actions';

export default function Main({
  planets,
  search,
  page,
  details,
  theme,
}: {
  planets: PlanetsResponse;
  search: string;
  page: string;
  details: Planet | null;
  theme: string;
}): JSX.Element {
  function themeToggleHandler(): void {
    if (theme === 'light') {
      setCookie('dark');
    } else {
      setCookie('light');
    }
  }

  return (
    <div className={theme !== 'dark' ? 'app' : 'app app-dark'}>
      <div className="sidebar">
        <SearchSection theme={theme} />
        <section className="search-items-section">
          <SearchItemsWrapper
            planets={planets}
            page={page}
            search={search}
            theme={theme}
          />
        </section>
      </div>
      <section className="details">
        {details && (
          <PlanetData
            details={details}
            page={page}
            search={search}
            theme={theme}
          />
        )}
      </section>
      <button className="button theme-toggle" onClick={themeToggleHandler}>
        {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
      </button>
    </div>
  );
}
