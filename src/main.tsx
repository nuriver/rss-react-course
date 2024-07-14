import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/main.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import PlanetData, {
  planetDataLoader,
} from './components/planetData/planetData';
import { loadItems } from './components/searchItemsSection/searchItemsWrapper';
import ErrorPage from './errorBoundary/errorPage';

const routes = [
  {
    path: '/',
    element: <Navigate to="/search/1" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search/:pageId',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loadItems,
    children: [
      {
        path: 'planets/:planetId',
        element: <PlanetData />,
        errorElement: <ErrorPage />,
        loader: planetDataLoader,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
