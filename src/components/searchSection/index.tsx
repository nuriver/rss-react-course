import React from 'react';
import SearchInput from './searchInput';
import SearchButton from './searchButton';

class SearchSection extends React.Component {
  render(): React.ReactNode {
    return (
      <section className="search-section">
        <div className="search-wrapper">
          <SearchInput />
          <SearchButton />
        </div>
      </section>
    );
  }
}

export default SearchSection;
