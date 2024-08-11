import userEvent from '@testing-library/user-event';
import Main from '../../app/main';
import { renderWithProviders } from '../../tests/helpers/customRender';
import { defaultPlanet1 } from '../../tests/testData';
import { screen, waitFor } from '@testing-library/react';

const mockResp = {
  count: 1,
  next: null,
  previous: null,
  results: [defaultPlanet1],
};
const user = userEvent.setup();

vi.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => ({
    get: () => {},
  }),
}));

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
  }),
}));

describe('group', () => {
  it('theme toggle button should change theme', async () => {
    renderWithProviders(
      <Main
        search=""
        page="1"
        details={null}
        theme="light"
        planets={mockResp}
      />
    );

    const themeButton = screen.getByText('DARK THEME');

    expect(themeButton).toBeInTheDocument();

    await user.click(themeButton);

    renderWithProviders(
      <Main search="" page="1" details={null} theme="dark" planets={mockResp} />
    );

    await waitFor(() => {
      expect(screen.getByText('LIGHT THEME')).toBeInTheDocument();
    });
  });

  it('should render details if details provided', () => {
    renderWithProviders(
      <Main
        search=""
        page="1"
        details={defaultPlanet1}
        theme="dark"
        planets={mockResp}
      />
    );

    expect(screen.getByText(defaultPlanet1.population)).toBeInTheDocument();
    expect(screen.getByText(defaultPlanet1.climate)).toBeInTheDocument();
    expect(screen.getByText(defaultPlanet1.diameter)).toBeInTheDocument();
  });
});
