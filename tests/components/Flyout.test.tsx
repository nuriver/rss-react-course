import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { renderWithProviders } from '../customRender';
import Flyout from '../../src/components/Flyout';
import { defaultPlanet1, defaultPlanet2 } from '../testData';

vi.mock('next/router', () => require('next-router-mock'));

describe('Flyout', () => {
  const user = userEvent.setup();

  it('should renders with 0 selected items when there are not any selected items', () => {
    const selectedItems = [] as string[];
    const mockSetSelectedItems = vi.fn();

    renderWithProviders(
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={mockSetSelectedItems}
        theme="light"
      />
    );

    expect(screen.getByText(/SELECTED ITEMS: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'DOWNLOAD' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'UNSELECT ALL' })
    ).toBeInTheDocument();
  });

  it('should render correct number of selected items', () => {
    const mockSelectedItems = [defaultPlanet1.name] as string[];
    const mockSetSelectedItems = vi.fn();
    const initialSelected = [defaultPlanet1];
    renderWithProviders(
      <Flyout
        selectedItems={mockSelectedItems}
        setSelectedItems={mockSetSelectedItems}
        theme="light"
      />,
      {
        preloadedState: {
          selection: {
            selectedItems: initialSelected,
            showFlyout: true,
          },
        },
      }
    );
    expect(screen.getByText(/SELECTED ITEMS: 1/i)).toBeInTheDocument();
  });

  it('unselect all button should empty selected items storage state', async () => {
    const mockSelectedItems = [
      defaultPlanet1.name,
      defaultPlanet2.name,
    ] as string[];
    const mockSetSelectedItems = vi.fn();
    const initialSelected = [defaultPlanet1, defaultPlanet2];
    const { store } = renderWithProviders(
      <Flyout
        selectedItems={mockSelectedItems}
        setSelectedItems={mockSetSelectedItems}
        theme="light"
      />,
      {
        preloadedState: {
          selection: {
            selectedItems: initialSelected,
            showFlyout: true,
          },
        },
      }
    );

    const unselectAllButton = screen.getByText('UNSELECT ALL');

    await user.click(unselectAllButton);

    const state = store.getState();

    expect(state.selection.selectedItems.length).toBe(0);
    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
      query: {},
    });
  });

  it('should have correct class name', () => {
    const selectedItems = [] as string[];
    const mockSetSelectedItems = vi.fn();

    const { container } = renderWithProviders(
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={mockSetSelectedItems}
        theme="light"
      />
    );
    expect(container.firstChild).toHaveClass('flyout-wrapper');
  });

  it('should have correct class name', () => {
    const selectedItems = [] as string[];
    const mockSetSelectedItems = vi.fn();

    const { container } = renderWithProviders(
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={mockSetSelectedItems}
        theme="dark"
      />
    );
    expect(container.firstChild).toHaveClass(
      'flyout-wrapper flyout-wrapper-dark'
    );
  });
});
