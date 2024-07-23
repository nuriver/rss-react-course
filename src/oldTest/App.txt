import { render, screen } from '@testing-library/react';
import {
  RouterProvider,
  useLoaderData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import App from '../../src/App';
import createTestRouter from '../createTestRouter';
import userEvent from '@testing-library/user-event';

const mockedUseNavigate = vi.fn();
const mockUseLoaderData = vi.fn();
const mockUseParams = vi.fn();
const mockUseNavigation = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useLoaderData: () => mockUseLoaderData,
    useParams: () => mockUseParams,
    useNavigation: () => mockUseNavigation,
  };
});

describe('App', () => {
  const router = createTestRouter(<App />, '/search/:pageId', ['/search/1']);
  const user = userEvent.setup();
  const params = { planetId: '1', pageId: '1' };
  const mockNavigate = vi.fn();

  beforeEach(() => {
    mockUseParams.mockReturnValue(params);
    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockUseNavigation.mockReturnValue({ state: 'loading' });
    render(<RouterProvider router={router} />);
    screen.debug();
  });

  it('click on sidebar should redirect to /search/:pageId', async () => {
    const { pageId } = useParams();
    const sidebar = screen.getByRole('sidebar');

    await user.click(sidebar);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`/search/${pageId}`);
  });
});
