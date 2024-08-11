import { createRemixStub } from '@remix-run/testing';
import App, { ErrorBoundary, loader } from '../../app/root';
import { planetResponseTrue } from '../helpers/testData';
import {
  json,
  Link,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { renderWithProviders } from '../helpers/customRender';
import { screen, waitFor } from '@testing-library/react';
import { PlanetsResponse } from '../../src/types/types';
import userEvent from '@testing-library/user-event';
import getPlanets from '../../src/data/getPlanets';

vi.mock('/src/data/getPlanets.ts');

const mockNavigate = vi.fn();
const mockNavigation = { state: 'idle' };

vi.mock('@remix-run/react', () => ({
  useNavigation: () => mockNavigation,
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('search=test&page=1')],
  redirect: vi.fn(),
  Meta: vi.fn(),
  Links: vi.fn(),
  Outlet: vi.fn(),
  Scripts: vi.fn(),
  json: (data: {
    planets: PlanetsResponse;
    search: 'string';
    page: 'string';
    theme: 'string';
  }) => ({
    json: () => Promise.resolve(data),
  }),
  useLoaderData: () => ({
    planets: planetResponseTrue,
    search: '',
    page: '1',
    theme: 'light',
  }),
  Link: vi.fn(),
  useRouteError: () => {
    message: 'Page not found';
  },
}));

const user = userEvent.setup();

describe('root', () => {
  it('should', async () => {
    const mockPlanets = planetResponseTrue;

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <App />,
        loader() {
          return json({
            planets: mockPlanets,
            search: '',
            page: '1',
            theme: 'dark',
          });
        },
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText('LOADING...')).toBeInTheDocument();
    });
  });

  it('loader should redirect to /?search=&page=1 for default path', async () => {
    const request = new Request('http://localhost:3000/');
    const args = {
      request,
      params: {},
      context: {},
    };

    const response = await loader(args);
    expect(response).toEqual(redirect('/?search=&page=1'));
  });
  it('sidebar should navigate', async () => {
    const mockPlanets = planetResponseTrue;

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <App />,
        loader() {
          return json({
            planets: mockPlanets,
            search: '',
            page: '1',
            theme: 'dark',
          });
        },
      },
    ]);

    renderWithProviders(<RemixStub />);

    await waitFor(async () => {
      screen.debug();
      expect(screen.getByRole('sidebar')).toBeInTheDocument();

      await user.click(screen.getByRole('sidebar'));
      expect(mockNavigate).toBeCalledWith('/?search=&page=1');
    });
  });

  it('theme toggle should', async () => {
    renderWithProviders(<ErrorBoundary />);

    await waitFor(async () => {
      screen.debug();
      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });

  it('should get 404 for not page present', async () => {
    const url = new URL('http://localhost:3000/?search=earth');
    const request = new Request(url.toString());

    try {
      await loader({ request, context: {}, params: {} });
    } catch (error) {
      expect((error as Response).status).toEqual(404);
    }
  });

  it('should return correct value', async () => {
    const url = new URL('http://localhost:3000/?search=&page=1');
    const request = new Request(url.toString());
    const mockPlanets = planetResponseTrue;
    vi.mocked(getPlanets).mockResolvedValue(mockPlanets);

    const response = await loader({ request, context: {}, params: {} });
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      planets: mockPlanets,
      search: '',
      page: '1',
      theme: 'light',
    });
  });
  it('sidebar should navigate', async () => {
    const mockPlanets = planetResponseTrue;

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <App />,
        loader() {
          return json({
            planets: mockPlanets,
            search: '',
            page: '1',
            theme: 'dark',
          });
        },
      },
    ]);

    renderWithProviders(<RemixStub />);

    await waitFor(async () => {
      screen.debug();
      expect(screen.getByText('DARK THEME')).toBeInTheDocument();

      await user.click(screen.getByText('DARK THEME'));
      expect(mockNavigate).toBeCalledWith('/?search=&page=1');
    });
  });
});
