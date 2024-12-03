import { render, screen } from '@testing-library/react';
import Pagination from '../../src/components/Pagination';
import { renderWithProviders } from '../customRender';

describe('Pagination', () => {
  it('should return null if count undefined or <=10', () => {
    const count = [0, 1, 10, undefined];

    count.forEach((value) => {
      const { container } = render(
        <Pagination count={value} search="" theme="light" />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  it('should render pagination items', () => {
    renderWithProviders(<Pagination count={31} search="" theme="light" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should have correct class name when theme is light', () => {
    const { container } = renderWithProviders(
      <Pagination count={31} search="" theme="light" />
    );

    expect(container.firstChild).toHaveClass('pagination-wrapper');
  });

  it('should have correct class name when theme is dark', () => {
    const { container } = renderWithProviders(
      <Pagination count={31} search="" theme="dark" />
    );

    expect(container.firstChild).toHaveClass(
      'pagination-wrapper pagination-wrapper-dark'
    );
  });
});
