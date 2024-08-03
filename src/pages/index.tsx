import SearchSection from '../components/SearchSection';
import { ThemeContext } from '../context/ThemeContext';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { PlanetsResponse } from '../types/types';
import SearchItemsWrapper from '../components/SearchItemsWrapper';
import PlanetData from '../components/PlanetData';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const search = query.search as string;
  const page = query.page as string;
  const detailsQuery = query.details;

  let details;

  if (!page) {
    return {
      redirect: {
        destination: `/?search=&page=1`,
        permanent: false,
      },
    };
  } else {
    const res = await fetch(
      `https://swapi.dev/api/planets/?search=${search}&page=${page}`
    );
    const planets: PlanetsResponse = await res.json();

    if (detailsQuery) {
      const res = await fetch(`https://swapi.dev/api/planets/${detailsQuery}`);
      details = await res.json();
      return { props: { planets, search, page, details } };
    } else {
      return { props: { planets, search, page, details: null } };
    }
  }
};

export default function App({
  planets,
  search,
  page,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [theme] = useState('light');

  return (
    <ThemeContext.Provider value={'theme'}>
      <div className={theme === 'light' ? 'app' : 'app app-dark'}>
        <div className="sidebar">
          <SearchSection search={search} />
          <section className="search-items-section">
            <SearchItemsWrapper planets={planets} page={page} search={search} />
          </section>
        </div>
        <section className="details">
          {details && (
            <PlanetData details={details} page={page} search={search} />
          )}
        </section>
      </div>
    </ThemeContext.Provider>
  );
}
