import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <header className="main-header">
        <div className="header-links-container">
          <Link
            className="button bright-button header-link"
            to={'/controlled-form'}
          >
            GO TO CONTROLLED FORM
          </Link>
          <Link
            className="button dark-button header-link"
            to={'/uncontrolled-form'}
          >
            GO TO UNCONTROLLED FORM
          </Link>
        </div>
      </header>
    </div>
  );
}
