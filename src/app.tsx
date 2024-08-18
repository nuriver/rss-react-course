import { Link } from 'react-router-dom';
import FormDataItems from './components/FormDataItems';

export default function App() {
  return (
    <div className="app">
      <header className="main-header">
        <div className="header-links-container">
          <Link className="button button-bright" to={'/controlled-form'}>
            CONTROLLED FORM
          </Link>
          <Link className="button button-dark" to={'/uncontrolled-form'}>
            UNCONTROLLED FORM
          </Link>
        </div>
      </header>
      <FormDataItems />
    </div>
  );
}
