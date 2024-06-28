import React from 'react';
import SearchItem from './searchItem';

interface ItemProps {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
}
interface MyProps {};

class SearchItemsWrapper extends React.Component<MyProps, { planets: ItemProps[] }> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      planets: [],
    };
  }
  url = 'https://swapi.dev/api/planets';
  async componentDidMount() {
    const searchInput = localStorage.getItem('searchInput');
    if (!searchInput) {
      await this.fetchData(this.url);
    } else {
      const url = `https://swapi.dev/api/planets/?search=${searchInput}&page=1`;
      await this.fetchData(url);
    }
  }

  async fetchData(url: string): Promise<void> {
    const response = await fetch(url);
    const result = await response.json();
    this.setState({ planets: result.results });
  }

  render(): React.ReactNode {
    const items = this.state.planets.map((itemProps: ItemProps) => {
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
