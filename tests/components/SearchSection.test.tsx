import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SearchSection from '../../src/components/SearchSection';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../src/App';

vi.mock('react-router-dom');

describe('SearchSection', () => {
  const user = userEvent.setup();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    localStorage.setItem('searchQuery', 'test');
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });
  it('should renders correctly initially', () => {
    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchSection />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('searchClickHandler should save query to LS and redirect', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchSection />} />
        </Routes>
      </MemoryRouter>
    );

    const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
    const searchButton = screen.getByRole('button', { name: 'SEARCH' });

    await user.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'test');
  });

  it('search button should save to local storage value from input', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchSection />} />
        </Routes>
      </MemoryRouter>
    );

    const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
    const searchButton = screen.getByRole('button', { name: 'SEARCH' });
    const input = screen.getByDisplayValue('test');

    await user.clear(input);
    await user.type(input, 'newValue');
    expect(screen.getByDisplayValue('newValue')).toBeInTheDocument();

    await user.click(searchButton);
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'newValue');
  });

  it('should have correct class when theme is light', () => {
    const { container } = render(
      <ThemeContext.Provider value="light">
        <MemoryRouter initialEntries={['/', '/search/1']}>
          <Routes>
            <Route path="/search/:pageId" element={<SearchSection />} />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('search-section');
  });

  it('should have correct class when theme is dark', () => {
    const { container } = render(
      <ThemeContext.Provider value="dark">
        <MemoryRouter initialEntries={['/', '/search/1']}>
          <Routes>
            <Route path="/search/:pageId" element={<SearchSection />} />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass(
      'search-section search-section-dark'
    );
  });
});
