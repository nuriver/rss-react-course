import SearchSection from './components/searchSection';
import SearchItemsSection from './components/searchItemsSection';
import ErrorBoundary from './errorBoundary/errorBoundary';
import ErrorButton from './errorBoundary/errorButton';
import DetailsSection from './components/detailsSection/detailsSection';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div className="app">
        <ErrorButton />
        <div className="sidebar">
          <SearchSection />
          <SearchItemsSection />
        </div>
        <DetailsSection />
      </div>
    </ErrorBoundary>
  );
}
