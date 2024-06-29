import React from 'react';

export interface SearchItemProps {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
}

class SearchItem extends React.Component<SearchItemProps> {
  render(): React.ReactNode {
    return (
      <div className="search-item">
        <div className="search-item-image"></div>
        <p className="search-item-name">
          <span>Name: </span>
          {this.props.name}
        </p>
        <p className="search-item-descriptor">
          <span>Diameter: </span>
          {this.props.diameter}
        </p>
        <p className="search-item-descriptor">
          <span>Climate: </span>
          {this.props.climate}
        </p>
        <p className="search-item-descriptor">
          <span>Terrain: </span>
          {this.props.terrain}
        </p>
        <p className="search-item-descriptor">
          <span>Population: </span>
          {this.props.population}
        </p>
      </div>
    );
  }
}
export default SearchItem;
