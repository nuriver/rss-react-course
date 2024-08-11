import SearchItems from '../../src/components/SearchItems';
import { Planet } from '../../src/types/types';
import { renderWithProviders } from '../helpers/customRender';
import { screen } from '@testing-library/react';
import { defaultPlanet1, planets } from '../../tests/helpers/testData';
import { createRemixStub } from '@remix-run/testing';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('SearchItems', () => {
  const mockSetSelectedItems = vi.fn();

  it('should render "no results" with no planets provided', () => {
    const mockPlanets: Planet[] = [];
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItems
            planets={mockPlanets}
            selectedItems={[defaultPlanet1.name]}
            setSelectedItems={mockSetSelectedItems}
          />
        ),
      },
    ]);

    renderWithProviders(<RemixStub />);

    expect(screen.getByText('no results...')).toBeInTheDocument();
  });

  it('should render items when planets are provided', () => {
    const mockPlanets: Planet[] = planets;
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItems
            planets={mockPlanets}
            selectedItems={[defaultPlanet1.name]}
            setSelectedItems={mockSetSelectedItems}
          />
        ),
      },
    ]);

    renderWithProviders(<RemixStub />);

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
        `/planets/${planetNumber}?search=null&page=null`
      );
    });
  });

  it('checkbox should add item to the store when checked and reverse action when unchecked', async () => {
    const mockPlanets: Planet[] = [defaultPlanet1];
    const initialSelected: Planet[] = [];

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItems
            planets={mockPlanets}
            selectedItems={[]}
            setSelectedItems={mockSetSelectedItems}
          />
        ),
      },
    ]);

    const { store } = renderWithProviders(<RemixStub />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: false,
        },
      },
    });
    const checkboxes = screen.getByRole('checkbox') as HTMLInputElement;

    await user.click(checkboxes);

    let state = store.getState();
    let itemsInStore = state.selection.selectedItems;

    expect(itemsInStore.length).toBe(1);
    expect(itemsInStore[0]).toBe(mockPlanets[0]);
    checkboxes.checked = true;
    expect(checkboxes).toBeChecked();

    await user.click(checkboxes);
    checkboxes.checked = false;
    state = store.getState();
    itemsInStore = state.selection.selectedItems;
    expect(itemsInStore.length).toBe(0);
    expect(itemsInStore).toEqual([]);
    expect(checkboxes).not.toBeChecked();
  });

  it('setSelectedItems should be called when checkbox is clicked', async () => {
    const mockPlanets: Planet[] = [defaultPlanet1];
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <SearchItems
            planets={mockPlanets}
            selectedItems={[]}
            setSelectedItems={mockSetSelectedItems}
          />
        ),
      },
    ]);

    renderWithProviders(<RemixStub />);

    const checkboxes = screen.getByRole('checkbox') as HTMLInputElement;

    await user.click(checkboxes);
    checkboxes.checked = true;
    expect(mockSetSelectedItems).toHaveBeenCalled();
  });
});
