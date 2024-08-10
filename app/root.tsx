import {
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import '../src/styles/main.css';
import SearchSection from '../src/components/SearchSection';
import SearchItemsWrapper from '../src/components/SearchItemsWrapper';
import getPlanets from '../src/data/getPlanets';
import { LoaderFunctionArgs } from '@remix-run/node';
import { AppLoaderReturnType, PlanetsResponse } from '../src/types/types';
import { setupStore } from '../src/store/store';
import { Provider } from 'react-redux';
import { useNavigate } from '@remix-run/react';
import getCookie from '../src/utilities/getCookie';
import { useRouteError } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-page">
          <h1>404</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>Not found</i>
          </p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

const store = setupStore();

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<ReturnType<typeof json>> => {
  const cookieHeader = request.headers.get('Cookie');
  const theme = getCookie('theme', cookieHeader) || 'light';
  const url = new URL(request.url);
  const isDefaultPath = url.pathname === '/' && url.search === '';

  if (isDefaultPath) {
    return redirect('/?search=&page=1');
  }

  const search = url.searchParams.get('search') as string;
  const page = url.searchParams.get('page') as string;
  const planets: PlanetsResponse | { detail: string } = await getPlanets(
    search,
    page
  );

  if (!page || 'detail' in planets) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({ planets, search, page, theme });
};

export default function App() {
  const { planets, search, page, theme } =
    useLoaderData() as AppLoaderReturnType;
  const navigate = useNavigate();
  const navigation = useNavigation();

  function onClickHandler(target: HTMLElement): void {
    if (
      target.className.includes('sidebar') ||
      target.className.includes('search-items-wrapper')
    ) {
      navigate(`/?search=${search}&page=${page}`);
    }
  }

  const themeToggleHandler = () => {
    if (theme === 'light' || !theme) {
      document.cookie = `theme=dark; path=/; max-age=86400`;
    } else {
      document.cookie = `theme=light; path=/; max-age=86400`;
    }
    navigate(location.pathname + location.search);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <div className={theme === 'light' ? 'app' : 'app app-dark'}>
            <div
              className="sidebar"
              role="sidebar"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                onClickHandler(target);
              }}
            >
              <SearchSection theme={theme} />
              <section className="search-items-section">
                <SearchItemsWrapper planets={planets} theme={theme} />
              </section>
            </div>
            <section
              className={theme === 'light' ? 'details' : 'details details-dark'}
            >
              <Outlet />
            </section>
            <button
              className="button theme-toggle"
              onClick={themeToggleHandler}
            >
              {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
            </button>
            <div
              className={
                navigation.state === 'loading' ? 'loading-indicator' : 'hidden'
              }
            >
              <p>LOADING...</p>
            </div>
          </div>
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}
