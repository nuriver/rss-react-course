import { render, screen } from '@testing-library/react';
import Pagination from '../../src/components/Pagination';
import { ThemeContext } from '../../src/App';
import { BrowserRouter } from 'react-router-dom';
import { pagination } from '../testData';

vi.mock('/src/utilities/createPagination.tsx', () => ({
  default: vi.fn(() => pagination),
}));

describe('Pagination', () => {
  it('should return null if count undefined or <=10', () => {
    const count = [0, 1, 10, undefined];

    count.forEach((value) => {
      const { container } = render(<Pagination count={value} />);

      expect(container.firstChild).toBeNull();
    });
  });

  it('should have correct class name when theme is light', () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeContext.Provider value="light">
          <Pagination count={20} />
        </ThemeContext.Provider>
      </BrowserRouter>
    );
    expect(container.firstChild).toHaveClass('pagination-wrapper');
  });

  it('should have correct class name when theme is dark', () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeContext.Provider value="dark">
          <Pagination count={31} />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    expect(container.firstChild).toHaveClass(
      'pagination-wrapper pagination-wrapper-dark'
    );
  });

  it('should render pagination items', () => {
    render(
      <BrowserRouter>
        <ThemeContext.Provider value="dark">
          <Pagination count={31} />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
