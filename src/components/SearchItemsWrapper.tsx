import { useParams } from 'react-router-dom';
import { apiSlice } from '../features/api/apiSlice';
import Pagination from './Pagination';
import LoadingIndicator from './LoadingIndicator';
import SearchItems from './SearchItems';
import Flyout from './Flyout';

const { useGetPlanetsQuery } = apiSlice;

export default function SearchItemsWrapper(): JSX.Element {
  const { pageId } = useParams() as { pageId: string };
  const searchQuery = localStorage.getItem('searchQuery');

  let query = '';

  if (searchQuery) {
    query = searchQuery;
  }

  const {
    data: planets,
    isLoading,
    isSuccess,
    // isError,
    // error,
  } = useGetPlanetsQuery({ pageId, query });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isSuccess) {
    content = <SearchItems planets={planets.results} />;
  }

  return (
    <div className="search-items-wrapper">
      {content}
      <Pagination count={planets?.count} />
      <Flyout />
    </div>
  );
}
