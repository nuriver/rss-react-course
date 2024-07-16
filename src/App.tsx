import SearchSection from './components/SearchSection';
import ErrorBoundary from './components/ErrorBoundary';
import {
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import SearchItemsWrapper from './components/SearchItemsWrapper';

export default function App(): JSX.Element {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { pageId } = useParams();

  function onClickHandler(target: HTMLElement): void {
    const searchItem = target.closest('.search-item');
    if (
      !searchItem &&
      target.tagName.toLocaleLowerCase() !== 'button' &&
      target.className !== 'pagination-item'
    ) {
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
        <div
          className={
            navigation.state === 'loading' ? 'loading-indicator' : 'hidden'
          }
        >
          <p>LOADING...</p>
        </div>
      </div>
    </ErrorBoundary>
  );
}
