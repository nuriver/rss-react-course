import { createMemoryRouter } from 'react-router-dom';

export default function createTestRouter(
  component: JSX.Element,
  path: string,
  initialEntries: string[]
) {
  const FAKE_EVENT = { name: 'test event' };
  const routes = [
    {
      path: `${path}`,
      element: component,
      loader: () => FAKE_EVENT,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries,
    initialIndex: 1,
  });

  return router;
}
