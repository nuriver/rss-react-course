import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import SearchItemsWrapper from '../../src/components/SearchItemsWrapper';
import { renderWithProviders } from '../customRender';
import { screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import createHandlers from '../createHandlers';
import { mockDataPaginationTrue } from '../testData';
import { ThemeContext } from '../../src/App';

vi.mock('react-router-dom');

const mockResponse = mockDataPaginationTrue;
const handlers = createHandlers('/planets/?search=testQ&page=1/', mockResponse);
const server = setupServer(...handlers);

describe('SearchItemsWrapper', () => {
  const mockNavigate = vi.fn();
  const params = { planetId: '1', pageId: '1' };

  beforeEach(() => {
    localStorage.setItem('searchQuery', 'testQ');
    vi.mocked(useParams).mockReturnValue(params);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });
  afterAll(() => server.close());

  it('should render loading indicator with initial request', () => {
    renderWithProviders(
      <BrowserRouter>
        <SearchItemsWrapper />
      </BrowserRouter>
    );
    expect(screen.getByText('LOADING...')).toBeInTheDocument();
  });

  it('should render content after response is received and have "search-items-wrapper" class', async () => {
    const { container } = renderWithProviders(
      <ThemeContext.Provider value="light">
        <BrowserRouter>
          <SearchItemsWrapper />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      expect(container.firstChild).toHaveClass('search-items-wrapper');
    });
  });

  it('should change its class when theme is dark', async () => {
    const { container } = renderWithProviders(
      <ThemeContext.Provider value="dark">
        <BrowserRouter>
          <SearchItemsWrapper />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      expect(container.firstChild).toHaveClass(
        'search-items-wrapper search-items-wrapper-dark'
      );
    });
  });

  it('should render pagination', async () => {
    const { getByText } = renderWithProviders(
      <ThemeContext.Provider value="dark">
        <BrowserRouter>
          <SearchItemsWrapper />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      for (let i = 1; i < 4; i += 1) {
        expect(getByText(i)).toBeInTheDocument();
      }
    });
  });
});
