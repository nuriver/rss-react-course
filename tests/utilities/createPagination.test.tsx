import Link from 'next/link';
import createPagination from '../../src/utilities/createPagination';

test('createPagination should return correct number of pages', () => {
  const mockCount = 60;
  const mockSearch = 'test';
  const numberOfPages = Math.ceil(mockCount / 10);
  const paginationItems = createPagination(mockCount, mockSearch);

  expect(paginationItems.length).toBe(numberOfPages);
  paginationItems.forEach((item, index) => {
    expect(item.type).toBe(Link);
    expect(item.props.href).toBe(`/?search=${mockSearch}&page=${index + 1}`);
    expect(item.props.children).toBe(index + 1);
  });
});
