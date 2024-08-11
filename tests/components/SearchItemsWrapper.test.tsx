import SearchItemsWrapper from '../../src/components/SearchItemsWrapper';
import { screen, waitFor } from '@testing-library/react';
import { planetResponseTrue } from '../helpers/testData';
import { createRemixStub } from '@remix-run/testing';
import { renderWithProviders } from '../helpers/customRender';

describe('SearchItemsWrapper', () => {
  it('should render loading indicator with initial request', async () => {
    const mockPlanets = planetResponseTrue;
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItemsWrapper theme="light" planets={mockPlanets} />
        ),
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />);

    screen.debug();
    await waitFor(() => {
      expect(container.firstChild).toHaveClass('search-items-wrapper');
    });
  });

  it('should change its class when theme is dark', async () => {
    const mockPlanets = planetResponseTrue;
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItemsWrapper theme="dark" planets={mockPlanets} />
        ),
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />);
    expect(container.firstChild).toHaveClass(
      'search-items-wrapper search-items-wrapper-dark'
    );
  });
});
