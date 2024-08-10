import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  useLoaderData,
} from '@remix-run/react';
import '../src/styles/main.css';
import SearchSection from '../src/components/SearchSection';
import SearchItemsWrapper from '../src/components/SearchItemsWrapper';
import getPlanets from '../src/data/getPlanets';
import { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { PlanetsResponse } from '../src/types/types';
import { setupStore } from '../src/store/store';
import { Provider } from 'react-redux';

interface AppLoaderReturnType {
  planets: PlanetsResponse;
  search: string;
  page: string;
}
const store = setupStore();

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<AppLoaderReturnType | TypedResponse<never>> => {
  const url = new URL(request.url);
  const isDefaultPath = url.pathname === '/' && url.search === '';

  if (isDefaultPath) {
    return redirect('/?search=&page=1');
  }

  const search = url.searchParams.get('search') as string;
  const page = url.searchParams.get('page') as string;

  const planets: PlanetsResponse = await getPlanets(search, page);
  //TODO 404
  return { planets, search, page };
};

export default function App() {
  const { planets, search, page } = useLoaderData() as AppLoaderReturnType;

  const theme = 'light';

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
              // onClick={(e) => {
              //   const target = e.target as HTMLElement;
              //   onClickHandler(target);
              // }}
            >
              <SearchSection />
              <section className="search-items-section">
                <SearchItemsWrapper
                  planets={planets}
                  search={search}
                  page={page}
                />
              </section>
            </div>
            <section className="details">
              <Outlet />
            </section>
            <button className="button theme-toggle">
              {theme === 'light' ? 'DARK' : 'LIGHT'} THEME
            </button>
          </div>

          <Scripts />
        </Provider>
      </body>
    </html>
  );
}
