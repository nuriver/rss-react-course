import { Link } from 'react-router-dom';
import createPagination from '../../src/utilities/createPagination';

test('createPagination should return correct number of pages', () => {
  const mockCount = 60;
  const numberOfPages = Math.ceil(mockCount / 10);
  const paginationItems = createPagination(mockCount);

  expect(paginationItems.length).toBe(numberOfPages);
  paginationItems.forEach((item, index) => {
    expect(item.type).toBe(Link);
    expect(item.props.to).toBe(`/search/${index + 1}`);
    expect(item.props.children).toBe(index + 1);
  });
});
