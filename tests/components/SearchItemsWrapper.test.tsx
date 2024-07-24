import { BrowserRouter } from 'react-router-dom';
import SearchItemsWrapper from '../../src/components/SearchItemsWrapper';
import { renderWithProviders } from '../customRender';
import { screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import createHandlers from '../createHandlers';
import { planets } from '../testData';
import { ThemeContext } from '../../src/App';

const mockResponse = planets;
const handlers = createHandlers('/planets/?search=w&page=1/', mockResponse);
const server = setupServer(...handlers);

describe('SearchItemsWrapper', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
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
});
