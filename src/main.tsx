import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanetData from './components/planetData/planetData';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'planets/:planetId',
        element: <PlanetData />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
