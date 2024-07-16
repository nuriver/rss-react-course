import { useRouteError } from 'react-router-dom';
import { RouterError } from '../types/types';

export default function ErrorPage() {
  const error = useRouteError() as RouterError;

  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message || error.statusText}</i>
      </p>
    </div>
  );
}
