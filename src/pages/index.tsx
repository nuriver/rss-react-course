import SearchSection from '../components/SearchSection';
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { Planet, PlanetsResponse } from '../types/types';
import SearchItemsWrapper from '../components/SearchItemsWrapper';
import PlanetData from '../components/PlanetData';
import { useLoading } from '../hooks/useLoading';
import LoadingIndicator from '../components/LoadingIndicator';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, req, res } = context;

  const search = query.search as string | undefined;
  const page = query.page as string | undefined;
  const detailsQuery = query.details as string | undefined;
  const themeValue = context.req.cookies.theme;

  let theme;

  if (!themeValue) {
    const expires = new Date(Date.now() + 1 * 864e5).toUTCString();
    res.setHeader('Set-Cookie', `theme=light; expires=${expires}; path=/`);
    theme = 'light';
  } else {
    theme = themeValue;
  }

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
      theme,
    },
  };
};

export default function App({
  planets,
  search,
  page,
  details,
  theme,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const loading = useLoading();
  const router = useRouter();

  function themeToggleHandler(): void {
    const expires = new Date(Date.now() + 1 * 864e5).toUTCString();
    if (theme === 'light') {
      document.cookie = `theme=dark; expires=${expires}; path=/`;
    } else {
      document.cookie = `theme=light; expires=${expires}; path=/`;
    }
    router.replace(router.asPath);
  }

  return (
    <div className={theme !== 'dark' ? 'app' : 'app app-dark'}>
      {loading && <LoadingIndicator />}
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
