import { useNavigate, useParams } from 'react-router-dom';
import { apiSlice } from '../features/api/apiSlice';
import Pagination from './Pagination';
import LoadingIndicator from './LoadingIndicator';
import SearchItems from './SearchItems';
import Flyout from './Flyout';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const { useGetPlanetsQuery } = apiSlice;

export default function SearchItemsWrapper(): JSX.Element {
  const { pageId } = useParams() as { pageId: string };
  const searchQuery = localStorage.getItem('searchQuery');
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  let query = '';

  if (searchQuery) {
    query = searchQuery;
  }

  const {
    data: planets,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetPlanetsQuery({ pageId, query });

  let content;

  if (isFetching || isLoading) {
    content = <LoadingIndicator />;
  }

  if (isSuccess) {
    content = <SearchItems planets={planets.results} />;
  }

  if (isError) {
    navigate('/404');
  }

  return (
    <div
      className={
        theme === 'light'
          ? 'search-items-wrapper'
          : 'search-items-wrapper search-items-wrapper-dark'
      }
    >
      {content}
      <Pagination count={planets?.count} />
      <Flyout />
    </div>
  );
}
