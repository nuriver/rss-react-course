import SearchSection from './components/searchSection/searchSection';
import ErrorBoundary from './errorBoundary/errorBoundary';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SearchItemsWrapper from './components/searchItemsSection/searchItemsWrapper';

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const { pageId } = useParams();

  console.log('app', pageId);

  function onClickHandler(target: HTMLElement): void {
    const searchItem = target.closest('.search-item');
    if (!searchItem) {
      navigate(`/search/${pageId}`);
    }
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <div
          className="sidebar"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            onClickHandler(target);
          }}
        >
          <SearchSection />
          <section className="search-items-section">
            <SearchItemsWrapper />
          </section>
        </div>
        <section className="details">
          <Outlet />
        </section>
      </div>
    </ErrorBoundary>
  );
}
