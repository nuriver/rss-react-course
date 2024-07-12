import SearchSection from './components/searchSection/searchSection';
import ErrorBoundary from './errorBoundary/errorBoundary';
import { Outlet } from 'react-router-dom';
import SearchItemsWrapper from './components/searchItemsSection/searchItemsWrapper';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div className="app">
        <div className="sidebar">
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
