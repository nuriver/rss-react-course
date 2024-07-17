import { render, screen } from '@testing-library/react';
import SearchItemsWrapper from '../../src/components/SearchItemsWrapper';
import { MemoryRouter, Route, Routes, useLoaderData } from 'react-router-dom';
import { mockData, mockPages, planetLinks } from '../testData';
import createItems from '../../src/utilities/createItems';
import createPagination from '../../src/utilities/createPagination';
import { LoaderItemsReturn } from '../../src/types/types';

vi.mock('react-router-dom');
vi.mock('/src/utilities/createItems.tsx');
vi.mock('/src/utilities/createPagination.tsx');

describe('SearchItemsWrapper', () => {
  it('should renders correctly', () => {
    vi.mocked(useLoaderData).mockReturnValue(mockData);
    vi.mocked(createItems).mockReturnValue(planetLinks);
    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchItemsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    mockData.results.forEach((result) => {
      expect(screen.getByText(`${result.name}`)).toBeInTheDocument();
    });
  });

  it('should render certain number of pages', () => {
    vi.mocked(useLoaderData).mockReturnValue(mockData);
    vi.mocked(createPagination).mockReturnValue(mockPages);

    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchItemsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    const { count } = useLoaderData() as LoaderItemsReturn;
    const pages = createPagination(count);

    const link = screen.getByRole('link', { name: '1' });
    const links = screen.getAllByRole('link');

    expect(count).toBe(mockData.count);
    expect(pages.length).toBe(1);
    expect(link).toBeInTheDocument();
    expect(links.length).toBe(1);
  });
});
