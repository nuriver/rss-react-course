import Flyout from '../../src/components/Flyout';
import { selectItem } from '../../src/features/selection/selectionSlice';
import { renderWithProviders } from '../customRender';
import { screen } from '@testing-library/react';
import { defaultPlanet1, defaultPlanet2 } from '../testData';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../src/App';

describe('Flyout', () => {
  const user = userEvent.setup();

  it('should renders with 0 selected items when there are not any selected items', () => {
    renderWithProviders(<Flyout />);

    expect(screen.getByText(/SELECTED ITEMS: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'DOWNLOAD' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'UNSELECT ALL' })
    ).toBeInTheDocument();
  });

  it('should render correct number of selected items', () => {
    const initialSelected = [defaultPlanet1];
    const { store } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: true,
        },
      },
    });
    expect(screen.getByText(/SELECTED ITEMS: 1/i)).toBeInTheDocument();

    act(() => {
      store.dispatch(selectItem(defaultPlanet2));
    });

    expect(screen.getByText(/SELECTED ITEMS: 2/i)).toBeInTheDocument();
  });

  it('unselect all button should empty selected items storage state', async () => {
    const initialSelected = [defaultPlanet1, defaultPlanet2];
    const { store } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: true,
        },
      },
    });

    const unselectAllButton = screen.getByText('UNSELECT ALL');

    await user.click(unselectAllButton);

    const state = store.getState();

    expect(state.selection.selectedItems.length).toBe(0);
  });

  it('should have correct class name with light theme', () => {
    renderWithProviders(
      <ThemeContext.Provider value="light">
        <Flyout />
      </ThemeContext.Provider>
    );
    const lightThemeClassName = 'flyout-wrapper flyout-hidden';

    expect(screen.getByText(/SELECTED ITEMS: 0/i).closest('div')).toHaveClass(
      lightThemeClassName
    );
  });

  it('should have correct class name with dark theme', () => {
    renderWithProviders(
      <ThemeContext.Provider value="dark">
        <Flyout />
      </ThemeContext.Provider>
    );

    const darkThemeClassName =
      'flyout-wrapper flyout-wrapper-dark flyout-hidden';
    expect(screen.getByText(/SELECTED ITEMS: 0/i).closest('div')).toHaveClass(
      darkThemeClassName
    );
  });
});
