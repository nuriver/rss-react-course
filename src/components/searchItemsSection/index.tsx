import React from 'react';
import SearchItemsWrapper from './searchItemsWrapper';

class SearchItemsSection extends React.Component {
  render(): React.ReactNode {
    return (
      <section className="search-items-section">
        <SearchItemsWrapper />
      </section>
    );
  }
}

export default SearchItemsSection;
