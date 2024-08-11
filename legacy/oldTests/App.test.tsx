import { BrowserRouter, useParams } from 'react-router-dom';
import App from '../../src/App';
import { renderWithProviders } from '../../tests/helpers/customRender';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

const mockedUseNavigate = vi.fn();
const mockedUseParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useParams: () => mockedUseParams,
  };
});
const user = userEvent.setup();

describe('App', () => {
  const mockNavigate = vi.fn();
  const params = { planetId: '1', pageId: '1' };

  beforeEach(() => {
    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockedUseParams.mockReturnValue(params);
  });

  it('should have correct class when theme changes', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(container.firstChild).toHaveClass('app');

    const darkThemeToggle = screen.getByRole('button', { name: 'DARK THEME' });
    expect(darkThemeToggle).toBeInTheDocument();

    await user.click(darkThemeToggle);

    const lightThemeToggle = screen.getByRole('button', {
      name: 'LIGHT THEME',
    });
    expect(lightThemeToggle).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('app app-dark');
  });

  it('click on sidebar should redirect to /search/1', async () => {
    const { pageId } = useParams();

    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole('sidebar');

    await user.click(sidebar);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`/search/${pageId}`);
  });
});
