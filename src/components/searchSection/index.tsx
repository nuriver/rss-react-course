import SearchInput from './searchInput';
import SearchButton from './searchButton';

export default function SearchSection(): JSX.Element {
  return (
    <section className="search-section">
      <div className="search-wrapper">
        <SearchInput />
        <SearchButton />
      </div>
    </section>
  );
}
