import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './app';
import UncontrolledForm from './components/uncontrolledForm';
import ControlledForm from './components/controlledForm';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<App />}></Route>
          <Route
            path="/uncontrolled-form"
            element={<UncontrolledForm />}
          ></Route>
          <Route path="/controlled-form" element={<ControlledForm />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
