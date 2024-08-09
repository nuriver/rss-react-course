import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Planet } from '../../src/types/types';
import { renderWithProviders } from '../customRender';
import SearchItems from '../../src/components/SearchItems';
import { defaultPlanet1, planets } from '../testData';

const user = userEvent.setup();

describe('SearchItems', () => {
  it('should render "no results" with no planets provided', () => {
    const mockPlanets: Planet[] = [];
    const mockSetSelectedItems = vi.fn();

    renderWithProviders(
      <SearchItems
        planets={mockPlanets}
        page="1"
        search=""
        selectedItems={[]}
        setSelectedItems={mockSetSelectedItems}
      />
    );

    expect(screen.getByText('no results...')).toBeInTheDocument();
  });

  it('should render items when planets are provided', () => {
    const mockPlanets: Planet[] = planets;
    const mockSetSelectedItems = vi.fn();
    renderWithProviders(
      <SearchItems
        planets={mockPlanets}
        page="1"
        search=""
        selectedItems={[]}
        setSelectedItems={mockSetSelectedItems}
      />
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
      expect(link).toHaveAttribute(
        'href',
        `/?search=&page=1&details=${planetNumber}`
      );
    });
  });

  it('checkbox should add item to the store when checked', async () => {
    const mockPlanets: Planet[] = [defaultPlanet1];
    const initialSelected: Planet[] = [];
    const mockSetSelectedItems = vi.fn();

    const { store } = renderWithProviders(
      <SearchItems
        planets={mockPlanets}
        page="1"
        search=""
        selectedItems={[]}
        setSelectedItems={mockSetSelectedItems}
      />,
      {
        preloadedState: {
          selection: {
            selectedItems: initialSelected,
            showFlyout: false,
          },
        },
      }
    );

    const checkboxes = screen.getByRole('checkbox') as HTMLInputElement;

    await user.click(checkboxes);

    let state = store.getState();
    let itemsInStore = state.selection.selectedItems;

    expect(itemsInStore.length).toBe(1);
    expect(itemsInStore[0]).toBe(mockPlanets[0]);
    checkboxes.checked = true;
    expect(checkboxes).toBeChecked();

    await user.click(checkboxes);
    state = store.getState();
    itemsInStore = state.selection.selectedItems;
    expect(itemsInStore.length).toBe(0);
    expect(checkboxes).not.toBeChecked();
  });

  it('setSelectedItems should be called when checkbox is clicked', async () => {
    const mockPlanets: Planet[] = [defaultPlanet1];
    const mockSetSelectedItems = vi.fn();

    renderWithProviders(
      <SearchItems
        planets={mockPlanets}
        page="1"
        search=""
        selectedItems={[]}
        setSelectedItems={mockSetSelectedItems}
      />
    );

    const checkboxes = screen.getByRole('checkbox');

    await user.click(checkboxes);
    expect(mockSetSelectedItems).toBeCalled();
  });
});
