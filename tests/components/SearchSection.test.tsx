import { render, screen } from '@testing-library/react';
import SearchSection from '../../src/components/SearchSection';
import userEvent from '@testing-library/user-event';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

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

describe('SearchSection', () => {
  it('should renders correctly initially', () => {
    render(<SearchSection theme="light" />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
  });

  it('search button should redirect correctly', async () => {
    const params = new URLSearchParams({ search: 'k' });
    render(
      <SearchParamsContext.Provider value={params}>
        <SearchSection theme="light" />
      </SearchParamsContext.Provider>
    );

    const searchButton = screen.getByRole('button', { name: 'SEARCH' });
    await user.click(searchButton);
  });

  it('should have correct class when theme is light', () => {
    const { container } = render(<SearchSection theme="light" />);

    expect(container.firstChild).toHaveClass('search-section');
  });

  it('should have correct class when theme is dark', () => {
    const { container } = render(<SearchSection theme="dark" />);

    expect(container.firstChild).toHaveClass(
      'search-section search-section-dark'
    );
  });

  it('input should change value when typing', async () => {
    render(<SearchSection theme="dark" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');

    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});
