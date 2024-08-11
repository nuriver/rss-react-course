import { renderWithProviders } from '../../tests/helpers/customRender';
import {
  defaultPlanet1,
  detailsMockResponseValues,
} from '../../tests/helpers/testData';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRemixStub } from '@remix-run/testing';
import PlanetDetails from '../../src/components/PlanetDetails';

const user = userEvent.setup();
const mockNavigate = vi.fn();

vi.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('search=test&page=1')],
}));

describe('PlanetDetails', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render correct planet data', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <PlanetDetails planet={defaultPlanet1} />,
      },
    ]);
    renderWithProviders(<RemixStub />);

    detailsMockResponseValues.forEach((value: string) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('close button should navigate', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <PlanetDetails planet={defaultPlanet1} />,
      },
    ]);
    renderWithProviders(<RemixStub />);

    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(mockNavigate).toBeCalled();
  });
});
