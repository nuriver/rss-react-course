'use client';

import SearchSection from '../components/SearchSection';
import { Planet, PlanetsResponse } from '../types/types';
import SearchItemsWrapper from '../components/SearchItemsWrapper';
import PlanetData from '../components/PlanetData';

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
  // const loading = useLoading();
  // const router = useRouter();

  // function themeToggleHandler(): void {
  //   const expires = new Date(Date.now() + 1 * 864e5).toUTCString();
  //   if (theme === 'light') {
  //     document.cookie = `theme=dark; expires=${expires}; path=/`;
  //   } else {
  //     document.cookie = `theme=light; expires=${expires}; path=/`;
  //   }
  //   router.replace(router.asPath);
  // }

  return (
    <div className={theme !== 'dark' ? 'app' : 'app app-dark'}>
      {/* {loading && <LoadingIndicator />} */}
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
      <button className="button theme-toggle">
        {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
      </button>
    </div>
  );
}
