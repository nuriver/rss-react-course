import React from 'react';
import SearchItem, { SearchItemProps } from './searchItem';
import { SearchItemsSectionProps } from '.';

export interface Props {}

class SearchItemsWrapper extends React.Component<SearchItemsSectionProps> {
  render(): React.ReactNode {
    const items = this.props.itemProps.map((itemProps: SearchItemProps) => {
      return (
        <SearchItem
          key={itemProps.name}
          name={itemProps.name}
          diameter={itemProps.diameter}
          climate={itemProps.climate}
          terrain={itemProps.terrain}
          population={itemProps.population}
        />
      );
    });
    return <div className="search-items-wrapper">{items}</div>;
  }
}

export default SearchItemsWrapper;
