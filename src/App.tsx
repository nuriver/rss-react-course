import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SearchItemsWrapper from './components/SearchItemsWrapper';
import { apiSlice } from './features/api/apiSlice';
import LoadingIndicator from './components/LoadingIndicator';

const { useGetPlanetQuery } = apiSlice;

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const { pageId } = useParams() as {
    pageId: string;
    planetId: string;
  };
  const { isFetching } = useGetPlanetQuery(pageId);

  function onClickHandler(target: HTMLElement): void {
    if (target.className === 'sidebar') {
      navigate(`/search/${pageId}`);
    }
  }

  return (
    <ErrorBoundary>
      <div className="app star-wars-theme">
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
      </div>
    </ErrorBoundary>
  );
}
