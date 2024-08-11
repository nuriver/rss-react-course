import { createRemixStub } from '@remix-run/testing';
import App, { loader } from '../../app/root';
import { planetResponseTrue } from '../helpers/testData';
import { json, redirect } from '@remix-run/react';
import { renderWithProviders } from '../helpers/customRender';

const mockNavigate = vi.fn();

vi.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('search=test&page=1')],
  redirect: vi.fn(),
  json: vi.fn(),
}));

describe('root', () => {
  it('should', async () => {
    const mockPlanets = planetResponseTrue;

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <App />,
        loader() {
          return json({
            planets: mockPlanets,
            search: '',
            page: '1',
            theme: 'light',
          });
        },
      },
    ]);

    renderWithProviders(<RemixStub />);
  });

  it('loader should redirect to /?search=&page=1 for default path', async () => {
    const request = new Request('http://localhost:3000/');
    const args = {
      request,
      params: {},
      context: {},
    };

    const response = await loader(args);
    expect(response).toEqual(redirect('/?search=&page=1'));
  });
});
