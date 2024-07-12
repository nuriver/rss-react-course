import SearchSection from './components/searchSection';
import SearchItemsSection from './components/searchItemsSection';
import ErrorBoundary from './errorBoundary/errorBoundary';
import ErrorButton from './errorBoundary/errorButton';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div className="app">
        <ErrorButton />
          <SearchSection />
          <SearchItemsSection />
        </div>
    </ErrorBoundary>
  );
}
