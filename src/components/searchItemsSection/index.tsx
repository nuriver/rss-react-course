import React from 'react';
import SearchItemsWrapper from './searchItemsWrapper';
import { SearchItemProps } from './searchItem';

export interface SearchItemsSectionProps {
  itemProps: SearchItemProps[];
}

class SearchItemsSection extends React.Component<SearchItemsSectionProps> {
  itemProps = this.props.itemProps;

  render(): React.ReactNode {
    return (
      <section className="search-items-section">
        <SearchItemsWrapper itemProps={this.itemProps} />
      </section>
    );
  }
}

export default SearchItemsSection;
