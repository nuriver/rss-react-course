import { render, screen } from '@testing-library/react';
import PlanetData from '../../src/components/PlanetData';
import {
  MemoryRouter,
  Routes,
  Route,
  useLoaderData,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { defaultPlanet1 } from '../testData';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

describe('PlanetData', () => {
  const testPlanet = defaultPlanet1;
  const params = { planetId: '1', pageId: '1' };
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue(testPlanet);
    vi.mocked(useParams).mockReturnValue(params);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={['/search/1', '/planet/1']}>
        <Routes>
          <Route path="/planet/:id" element={<PlanetData />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText(testPlanet.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${testPlanet.rotation_period}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${testPlanet.orbital_period}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.diameter}`)).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.climate}`)).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.gravity}`)).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.terrain}`)).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.surface_water}`)).toBeInTheDocument();
    expect(screen.getByText(`${testPlanet.population}`)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('close button should redirect to correct path', async () => {
    const { pageId } = useParams();

    const closeButton = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/search/${pageId}`);
  });
});
