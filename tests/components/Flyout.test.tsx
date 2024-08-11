import Flyout from '../../src/components/Flyout';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/customRender';
import { createRemixStub } from '@remix-run/testing';
import { defaultPlanet1, defaultPlanet2 } from '../helpers/testData';

const user = userEvent.setup();

describe('group', () => {
  const initialSelected = [defaultPlanet1, defaultPlanet2];
  const mockSetSelectedItems = vi.fn();

  it('should should initially has 0 selected items', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Flyout setSelectedItems={mockSetSelectedItems} theme="light" />
        ),
      },
    ]);

    renderWithProviders(<RemixStub />);

    await waitFor(() => screen.findByText('SELECTED ITEMS: 0'));
    expect(screen.getByRole('link', { name: 'DOWNLOAD' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'UNSELECT ALL' })
    ).toBeInTheDocument();
  });

  it('should have correct items showing', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Flyout setSelectedItems={mockSetSelectedItems} theme="light" />
        ),
      },
    ]);

    renderWithProviders(<RemixStub />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: true,
        },
      },
    });
    expect(screen.getByText(/SELECTED ITEMS: 2/i)).toBeInTheDocument();
  });

  it('unselect button should remove items from storage', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Flyout setSelectedItems={mockSetSelectedItems} theme="light" />
        ),
      },
    ]);

    const { store } = renderWithProviders(<RemixStub />, {
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

  it('should have correct class name when theme is light', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Flyout setSelectedItems={mockSetSelectedItems} theme="light" />
        ),
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: true,
        },
      },
    });
    expect(container.firstChild).toHaveClass('flyout-wrapper');
  });
  it('should have correct class name when theme is light', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Flyout setSelectedItems={mockSetSelectedItems} theme="dark" />
        ),
      },
    ]);

    const { container } = renderWithProviders(<RemixStub />, {
      preloadedState: {
        selection: {
          selectedItems: initialSelected,
          showFlyout: true,
        },
      },
    });
    expect(container.firstChild).toHaveClass(
      'flyout-wrapper flyout-wrapper-dark'
    );
  });
});
