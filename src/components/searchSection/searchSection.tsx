export default function SearchSection(): JSX.Element {
  return (
    <form className="search-section">
      <div className="search-wrapper">
        <input type="text" className="search-input" />
        <button className="button search-button">SEARCH</button>
      </div>
    </form>
  );
}
