import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import PlanetData from './components/PlanetData';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
      >
        <Route
          path="planets/:planetId"
          element={<PlanetData />}
          errorElement={<ErrorPage />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
