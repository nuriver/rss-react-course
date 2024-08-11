import { createRemixStub } from '@remix-run/testing';
import PlanetData from '../../app/routes/planets.$planetId';
import { json } from '@remix-run/react';
import { defaultPlanet1, defaultPlanet2 } from '../helpers/testData';
import { renderWithProviders } from '../helpers/customRender';
import { screen, waitFor } from '@testing-library/react';
import { Planet } from '../../src/types/types';

const mockNavigate = vi.fn();
vi.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('search=k&page=1')],
  redirect: vi.fn(),
  json: (data: Planet) => ({
    json: () => Promise.resolve(data),
  }),
  useLoaderData: () => defaultPlanet1,
}));

describe('group', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('should render details', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <PlanetData />,
        loader() {
          return json({
            details: defaultPlanet1,
          });
        },
      },
    ]);

    renderWithProviders(<RemixStub />);
    await waitFor(() => {
      expect(screen.getByText(defaultPlanet1.name)).toBeInTheDocument();
    });
  });
});
