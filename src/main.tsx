import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/main.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import PlanetData, {
  planetDataLoader,
} from './components/planetData/planetData';
import { loadItems } from './components/searchItemsSection/searchItemsWrapper';
import ErrorPage from './errorBoundary/errorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<Navigate to="/search/1" />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/search/:pageId"
        element={<App />}
        errorElement={<ErrorPage />}
        loader={({ params }) => loadItems({ params })}
      >
        <Route
          path="planets/:planetId"
          element={<PlanetData />}
          errorElement={<ErrorPage />}
          loader={({ params }) => planetDataLoader({ params })}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
