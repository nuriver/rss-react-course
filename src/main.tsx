import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './app';
import UncontrolledForm from './components/uncontrolledForm';
import ControlledForm from './components/controlledForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<App />}></Route>
      <Route path="/uncontrolled-form" element={<UncontrolledForm />}></Route>
      <Route path="/controlled-form" element={<ControlledForm />}></Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
