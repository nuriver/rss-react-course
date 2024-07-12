import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanetData, {
  planetDataLoader,
} from './components/planetData/planetData';
import { loadItems } from './components/searchItemsSection/searchItemsWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: loadItems,
    children: [
      {
        path: 'planets/:planetId',
        element: <PlanetData />,
        loader: planetDataLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
