import { Link } from 'react-router-dom';
// import { useAppSelector } from './store/store';
// import { selectFormData } from './features/formDataSlice';

export default function App() {
  // const formData = useAppSelector(selectFormData);
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
    </div>
  );
}
