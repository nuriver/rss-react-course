import { BrowserRouter, useNavigate } from 'react-router-dom';
import { PlanetDetails } from '../../legacy/PlanetData';
import { renderWithProviders } from '../customRender';
import { defaultPlanet1, detailsMockResponseValues } from '../testData';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../src/App';

const user = userEvent.setup();

vi.mock('react-router-dom');

describe('PlanetDetails', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should render correct planet data', () => {
    renderWithProviders(
      <BrowserRouter>
        <PlanetDetails planet={defaultPlanet1} pageId="1" />
      </BrowserRouter>
    );

    detailsMockResponseValues.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('close button should redirect to /search/pageId', async () => {
    renderWithProviders(
      <BrowserRouter>
        <PlanetDetails planet={defaultPlanet1} pageId="1" />
      </BrowserRouter>
    );

    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
  });

  it('should have correct class name when theme is "light"', () => {
    const { container } = renderWithProviders(
      <ThemeContext.Provider value="light">
        <BrowserRouter>
          <PlanetDetails planet={defaultPlanet1} pageId="1" />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('planet-data');
  });

  it('should have correct class name when theme is "dark"', () => {
    const { container } = renderWithProviders(
      <ThemeContext.Provider value="dark">
        <BrowserRouter>
          <PlanetDetails planet={defaultPlanet1} pageId="1" />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('planet-data planet-data-dark');
  });
});
