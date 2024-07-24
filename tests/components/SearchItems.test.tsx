import SearchItems from '../../src/components/SearchItems';
import { Planet } from '../../src/types/types';
import { renderWithProviders } from '../customRender';
import { screen } from '@testing-library/react';
import { planets } from '../testData';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('SearchItems', () => {
  it('should render "no results" with no planets provided', () => {
    const mockPlanets: Planet[] = [];

    renderWithProviders(<SearchItems planets={mockPlanets} />);

    expect(screen.getByText('no results...')).toBeInTheDocument();
  });

  it('should render items when planets are provided', () => {
    const mockPlanets: Planet[] = planets;

    renderWithProviders(
      <BrowserRouter>
        <SearchItems planets={mockPlanets} />
      </BrowserRouter>
    );

    mockPlanets.forEach((planet) => {
      const planetNumberRegex = planet.url.match(
        /planets\/(\d+)/
      ) as RegExpMatchArray;
      const planetNumber = planetNumberRegex[1];
      const link = screen.getByRole('link', {
        name: planet.name,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/planets/${planetNumber}`);
    });
  });

  it('checkbox should add item to the store when checked and reverse action when unchecked', async () => {
    const mockPlanets: Planet[] = planets;
    const initialSelected: Planet[] = [];

    const { store } = renderWithProviders(
      <BrowserRouter>
        <SearchItems planets={mockPlanets} />
      </BrowserRouter>,
      {
        preloadedState: {
          selection: {
            selectedItems: initialSelected,
            showFlyout: false,
          },
        },
      }
    );

    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);

    let state = store.getState();
    let selectedItems = state.selection.selectedItems;

    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBe(mockPlanets[0]);

    await user.click(checkboxes[0]);

    state = store.getState();
    selectedItems = state.selection.selectedItems;
    expect(selectedItems.length).toBe(0);
    expect(selectedItems).toEqual([]);
  });
});
