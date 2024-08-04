import { useNavigate, useParams } from 'react-router-dom';
import createHandlers from '../createHandlers';
import { defaultPlanet1, detailsMockResponseValues } from '../testData';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../customRender';
import PlanetData from '../../src/components/PlanetData';
import { screen, waitFor } from '@testing-library/react';
import { Planet } from '../../src/types/types';

const mockResponse = defaultPlanet1 as Planet;
const handlers = createHandlers('/planets/1', mockResponse);
const server = setupServer(...handlers);

vi.mock('react-router-dom');

describe('PlanetData', () => {
  const params = { planetId: '1', pageId: '1' };
  const mockNavigate = vi.fn();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue(params);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should initially render loading indicator', () => {
    renderWithProviders(<PlanetData />);
    expect(screen.getByText('LOADING...')).toBeInTheDocument();
  });

  it('should render correct planet details after response received', async () => {
    renderWithProviders(<PlanetData />);

    await waitFor(() => {
      expect(screen.queryByText('LOADING...')).not.toBeInTheDocument();
    });

    detailsMockResponseValues.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
