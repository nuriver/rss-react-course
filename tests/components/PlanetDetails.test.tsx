import mockRouter from 'next-router-mock';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../customRender';
import { PlanetDetails } from '../../src/components/PlanetDetails';
import { defaultPlanet1, detailsMockResponseValues } from '../testData';

vi.mock('next/navigation', () => require('next-router-mock'));
const user = userEvent.setup();

describe('PlanetDetails', () => {
  it('should render correct planet details after response received', async () => {
    renderWithProviders(
      <PlanetDetails
        details={defaultPlanet1}
        search=""
        page="1"
        theme="light"
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('LOADING...')).not.toBeInTheDocument();
    });

    detailsMockResponseValues.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('close button should redirect correctly', async () => {
    renderWithProviders(
      <PlanetDetails
        details={defaultPlanet1}
        search=""
        page="1"
        theme="light"
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockRouter).toMatchObject({
      asPath: '/?search=&page=1',
      pathname: '/',
      query: { page: '1', search: '' },
    });
  });

  it('should have correct class name when theme is light', () => {
    const { container } = renderWithProviders(
      <PlanetDetails
        details={defaultPlanet1}
        search=""
        page="1"
        theme="light"
      />
    );
    expect(container.firstChild).toHaveClass('planet-data');
  });

  it('should have correct class name when theme is dark', () => {
    const { container } = renderWithProviders(
      <PlanetDetails details={defaultPlanet1} search="" page="1" theme="dark" />
    );
    expect(container.firstChild).toHaveClass('planet-data planet-data-dark');
  });
});
