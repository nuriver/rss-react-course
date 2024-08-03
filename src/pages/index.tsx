import SearchSection from '../components/SearchSection';
import { ThemeContext } from '../context/ThemeContext';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Planet, PlanetsResponse } from '../types/types';
import SearchItemsWrapper from '../components/SearchItemsWrapper';
import PlanetData from '../components/PlanetData';
import { useState } from 'react';
import { useLoading } from '../hooks/useLoading';
import LoadingIndicator from '../components/LoadingIndicator';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req } = context;
  const search = query.search as string | undefined;
  const page = query.page as string | undefined;
  const detailsQuery = query.details as string | undefined;

  if (req.url === '/') {
    return {
      redirect: {
        destination: `/?search=&page=1`,
        permanent: false,
      },
    };
  }

  if (typeof search !== 'string' || typeof page !== 'string' || !page) {
    return {
      notFound: true,
    };
  }

  let planets: PlanetsResponse | null = null;
  try {
    const res = await fetch(
      `https://swapi.dev/api/planets/?search=${search}&page=${page}`
    );
    if (!res.ok) {
      return { notFound: true };
    }
    planets = await res.json();
  } catch {
    return { notFound: true };
  }

  let details: Planet | null = null;
  if (detailsQuery) {
    try {
      const res = await fetch(`https://swapi.dev/api/planets/${detailsQuery}`);
      if (!res.ok) {
        return { notFound: true };
      }
      details = await res.json();
    } catch {
      return { notFound: true };
    }
  }

  return {
    props: {
      planets,
      search,
      page,
      details: details || null,
    },
  };
};

export default function App({
  planets,
  search,
  page,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [theme, setTheme] = useState('light');
  const loading = useLoading();

  function themeToggleHandler(): void {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme !== 'dark' ? 'app' : 'app app-dark'}>
        {loading && <LoadingIndicator />}
        <div className="sidebar">
          <SearchSection />
          <section className="search-items-section">
            <SearchItemsWrapper planets={planets} page={page} search={search} />
          </section>
        </div>
        <section className="details">
          {details && (
            <PlanetData details={details} page={page} search={search} />
          )}
        </section>
        <button className="button theme-toggle" onClick={themeToggleHandler}>
          {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
        </button>
      </div>
    </ThemeContext.Provider>
  );
}
