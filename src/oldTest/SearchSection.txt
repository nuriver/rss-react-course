import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SearchSection from '../../src/components/SearchSection';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

describe('SearchSection', () => {
  const user = userEvent.setup();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    localStorage.setItem('searchQuery', 'test');
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter initialEntries={['/', '/search/1']}>
        <Routes>
          <Route path="/search/:pageId" element={<SearchSection />} />
        </Routes>
      </MemoryRouter>
    );
  });
  it('should renders correctly initially', () => {
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('searchClickHandler should save query to LS and redirect', async () => {
    const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
    const searchButton = screen.getByRole('button', { name: 'SEARCH' });

    await user.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'test');
  });

  it('search button should save to local storage value from input', async () => {
    const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
    const searchButton = screen.getByRole('button', { name: 'SEARCH' });
    const input = screen.getByDisplayValue('test');

    await user.clear(input);
    await user.type(input, 'newValue');
    expect(screen.getByDisplayValue('newValue')).toBeInTheDocument();

    await user.click(searchButton);
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'newValue');
  });
});
