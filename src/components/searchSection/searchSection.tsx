import { Form } from 'react-router-dom';

export default function SearchSection(): JSX.Element {
  return (
    <Form className="search-section" role="search">
      <div className="search-wrapper">
        <input type="text" className="search-input" name="search" />
        <button className="button search-button">SEARCH</button>
      </div>
    </Form>
  );
}
