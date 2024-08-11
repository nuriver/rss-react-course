import { screen } from '@testing-library/react';
import SearchSection from '../../src/components/SearchSection';
import userEvent from '@testing-library/user-event';
import { createRemixStub } from '@remix-run/testing';
import { renderWithProviders } from '../helpers/customRender';

const mockNavigate = vi.fn();

vi.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('search=test&page=1')],
}));
const user = userEvent.setup();

describe('SearchSection', () => {
  it('should renders correctly initially', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchSection theme="light" />,
      },
    ]);

    renderWithProviders(<RemixStub />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should renders correctly initially', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchSection theme="light" />,
      },
    ]);

    renderWithProviders(<RemixStub />);

    const searchButton = screen.getByRole('button', { name: 'SEARCH' });

    await user.click(searchButton);

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should change input value', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchSection theme="light" />,
      },
    ]);

    renderWithProviders(<RemixStub />);

    const input = screen.getByDisplayValue('test');

    await user.clear(input);
    await user.type(input, 'newValue');
    expect(screen.getByDisplayValue('newValue')).toBeInTheDocument();
  });

  it('should have correct class when theme is light', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchSection theme="light" />,
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />);

    expect(container.firstChild).toHaveClass('search-section');
  });
  it('should have correct class when theme is light', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <SearchSection theme="dark" />,
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />);

    expect(container.firstChild).toHaveClass(
      'search-section search-section-dark'
    );
  });
});
