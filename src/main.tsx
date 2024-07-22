import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import PlanetData from './components/PlanetData';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route path="/search/:pageId" element={<App />}>
            <Route path="planets/:planetId" element={<PlanetData />} />
            <Route path="*" element={<ErrorPage />}></Route>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
