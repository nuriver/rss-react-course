import { screen, waitFor } from '@testing-library/react';
import App, { getServerSideProps } from '../../legacy';
import { GetServerSideProps } from 'next';
import createMockContext from '../createMockContext';
import { Planet, PlanetsResponse } from '../../src/types/types';
import { defaultPlanet1 } from '../testData';
import { renderWithProviders } from '../customRender';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { RouterProvider } from 'react-router-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from 'next-router-mock';

interface CustomProps extends GetServerSideProps {
  planets: PlanetsResponse;
  search: string;
  page: string;
  details: Planet | null;
  theme: string;
}
vi.mock('next/navigation', () => {
  return {
    __esModule: true,
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});
vi.mock('next/router', () => require('next-router-mock'));

const user = userEvent.setup();
const mockPlanetsResponse = {
  count: 1,
  previous: '',
  next: '',
  results: [defaultPlanet1],
};
const mockPage = '1';
const mockSearch = 'test';
const mockDetails = defaultPlanet1;

describe('App', () => {
  it('should set cookie theme to light if it is undefined', async () => {
    const context = createMockContext({}, { search: 'k', page: '1' });
    const { res } = context;

    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result).toHaveProperty('props');
    expect(result.props.theme).toBe('light');
    expect(res.getHeaders()['set-cookie']).toContain('theme=light');
  });

  it('should have theme prop provided with cookie', async () => {
    const context = createMockContext(
      { theme: 'dark' },
      { search: 'k', page: '1' }
    );
    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result.props.theme).toBe('dark');
  });

  it('should redirect when path is /', async () => {
    const context = createMockContext({}, {}, '/');
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      redirect: {
        destination: `/?search=&page=1`,
        permanent: false,
      },
    });
  });

  it('should return not found if !page', async () => {
    const context = createMockContext({}, { search: 'k', page: undefined });

    const result = await getServerSideProps(context);

    expect(result).toEqual({ notFound: true });
  });

  it('should get results if fetch responses with ok', async () => {
    const context = createMockContext({}, { search: 'k', page: '1' });

    vi.stubGlobal('fetch', async () => ({
      ok: true,
      json: async () => ({
        results: [defaultPlanet1],
      }),
    }));

    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result.props.planets).toEqual({
      results: [defaultPlanet1],
    });
  });

  it('should get not found if fetch responses with not ok', async () => {
    const context = createMockContext({}, { search: 'k', page: '1' });

    vi.stubGlobal('fetch', async () => ({
      ok: false,
      status: 404,
      json: async () => ({
        error: 'Not found',
      }),
    }));

    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result).toEqual({ notFound: true });
  });

  it('should get not found if fetch responses with error', async () => {
    const context = createMockContext({}, { search: 'k', page: '1' });

    vi.stubGlobal('fetch', async () => {
      throw new Error('Network error');
    });

    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result).toEqual({ notFound: true });
  });

  it('should have details in result', async () => {
    const mockDetails = defaultPlanet1;
    vi.stubGlobal('fetch', async (url: string) => {
      if (url.includes('planets/')) {
        return {
          ok: true,
          json: async () => mockDetails,
        } as Response;
      }
      return {
        ok: false,
        json: async () => ({ error: 'Not found' }),
      } as Response;
    });

    const context = createMockContext(
      {},
      { search: 'k', page: '1', details: '2' }
    );

    const result = (await getServerSideProps(context)) as {
      props: CustomProps;
    };

    expect(result.props).toHaveProperty('details');
    expect(result.props.details).toEqual(mockDetails);
  });

  it('theme button should change its text on click', async () => {
    const mockPlanetsResponse = {
      count: 1,
      previous: '',
      next: '',
      results: [defaultPlanet1],
    };
    const mockPage = '1';
    const mockSearch = 'test';

    renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        <App
          planets={mockPlanetsResponse}
          page={mockPage}
          search={mockSearch}
          theme={'light'}
        />
      </RouterContext.Provider>
    );
    const themeButton = screen.getByText('DARK THEME');
    expect(themeButton).toBeInTheDocument();
  });

  it('should have correct class name', async () => {
    const mockPlanetsResponse = {
      count: 1,
      previous: '',
      next: '',
      results: [defaultPlanet1],
    };
    const mockPage = '1';
    const mockSearch = 'test';

    const { container } = renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        <App
          planets={mockPlanetsResponse}
          page={mockPage}
          search={mockSearch}
          theme={'light'}
        />
      </RouterContext.Provider>
    );

    expect(container.firstChild).toHaveClass('app');
  });

  it('should have correct class name', async () => {
    const { container } = renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        <App
          planets={mockPlanetsResponse}
          page={mockPage}
          search={mockSearch}
          theme={'dark'}
        />
      </RouterContext.Provider>
    );

    expect(container.firstChild).toHaveClass('app app-dark');
  });

  it('should render details if details props is provided', () => {
    renderWithProviders(
      <App
        planets={mockPlanetsResponse}
        page={mockPage}
        search={mockSearch}
        theme={'dark'}
        details={mockDetails}
      />
    );

    expect(screen.getByText(defaultPlanet1.population)).toBeInTheDocument();
    expect(screen.getByText(defaultPlanet1.climate)).toBeInTheDocument();
    expect(screen.getByText(defaultPlanet1.diameter)).toBeInTheDocument();
  });

  it('should set cookie', async () => {
    const originalCookie = document.cookie;
    const setCookie = vi.fn();
    Object.defineProperty(document, 'cookie', {
      get: () => originalCookie,
      set: setCookie,
    });

    renderWithProviders(
      <App
        planets={mockPlanetsResponse}
        page={mockPage}
        search={mockSearch}
        theme={'dark'}
        details={mockDetails}
      />
    );
    await user.click(screen.getByText('LIGHT THEME'));

    await waitFor(() => {
      const expires = new Date(Date.now() + 1 * 864e5).toUTCString();
      expect(setCookie).toHaveBeenCalledWith(
        `theme=light; expires=${expires}; path=/`
      );
    });

    renderWithProviders(
      <App
        planets={mockPlanetsResponse}
        page={mockPage}
        search={mockSearch}
        theme={'light'}
        details={mockDetails}
      />
    );

    await user.click(screen.getByText('DARK THEME'));

    await waitFor(() => {
      const expires = new Date(Date.now() + 1 * 864e5).toUTCString();
      expect(setCookie).toHaveBeenCalledWith(
        `theme=dark; expires=${expires}; path=/`
      );
    });
  });
});
