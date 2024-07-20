import { useParams } from 'react-router-dom';
import createItems from '../utilities/createItems';
import { apiSlice } from '../features/api/apiSlice';
import Pagination from './Pagination';
import LoadingIndicator from './LoadingIndicator';

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

  const items = createItems(planets?.results);

  let content;

  if (isLoading) {
    console.log('load');
    content = <LoadingIndicator />;
  }
  if (isSuccess) {
    content = items;
  }

  return (
    <div className="search-items-wrapper">
      {content}
      <Pagination count={planets?.count} />
    </div>
  );
}
