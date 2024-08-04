import { defaultPlanet1 } from '../testData';
import { renderWithProviders } from '../customRender';
import PlanetData from '../../src/components/PlanetData';
vi.mock('next/router', () => require('next-router-mock'));

describe('PlanetData', () => {
  it('should renders without errors', () => {
    renderWithProviders(
      <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
    );
  });

  // it('should render correct planet details after response received', async () => {
  //   renderWithProviders(
  //     <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
  //   );

  //   await waitFor(() => {
  //     expect(screen.queryByText('LOADING...')).not.toBeInTheDocument();
  //   });

  //   detailsMockResponseValues.forEach((value) => {
  //     expect(screen.getByText(value)).toBeInTheDocument();
  //   });
  // });

  // it('close button should redirect correctly', async () => {
  //   renderWithProviders(
  //     <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
  //   );

  //   const button = screen.getByRole('button');
  //   await user.click(button);
  //    expect(mockRouter).toMatchObject({
  //      asPath: '/?search=&page=1',
  //      pathname: '/',
  //      query: { page: '1', search: '' },
  //    });
  // });

  // it('should have correct class name when theme is light', () => {
  //   const { container } = renderWithProviders(
  //     <PlanetData details={defaultPlanet1} search="" page="1" theme="light" />
  //   );
  //   expect(container.firstChild).toHaveClass('planet-data');
  // })

  //   it('should have correct class name when theme is dark', () => {
  //     const { container } = renderWithProviders(
  //       <PlanetData details={defaultPlanet1} search="" page="1" theme="dark" />
  //     );
  //     expect(container.firstChild).toHaveClass('planet-data planet-data-dark');
  //   });
});
