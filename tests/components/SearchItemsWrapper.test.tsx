import { screen } from '@testing-library/react';
import { defaultPlanet1 } from '../testData';
import { renderWithProviders } from '../customRender';
import SearchItemsWrapper from '../../src/components/SearchItemsWrapper';

vi.mock('next/router', () => require('next-router-mock'));

describe('SearchItemsWrapper', () => {
  const mockPlanets = {
    count: 1,
    previous: '',
    next: '',
    results: [defaultPlanet1],
  };
  const mockPage = '1';
  const mockSearch = '';

  it('should render loading indicator with initial request', () => {
    renderWithProviders(
      <SearchItemsWrapper
        planets={mockPlanets}
        page={mockPage}
        search={mockSearch}
        theme="light"
      />
    );

    const planet = screen.getByText(defaultPlanet1.name);
    expect(planet).toBeInTheDocument();
  });

  it('should have correct class name when theme is light', () => {
    const { container } = renderWithProviders(
      <SearchItemsWrapper
        planets={mockPlanets}
        page={mockPage}
        search={mockSearch}
        theme="light"
      />
    );

    expect(container.firstChild).toHaveClass('search-items-wrapper');
  });

  it('should have correct class name when theme is dark', () => {
    const { container } = renderWithProviders(
      <SearchItemsWrapper
        planets={mockPlanets}
        page={mockPage}
        search={mockSearch}
        theme="dark"
      />
    );

    expect(container.firstChild).toHaveClass(
      'search-items-wrapper search-items-wrapper-dark'
    );
  });
});
