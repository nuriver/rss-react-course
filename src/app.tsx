import React from 'react';
import SearchSection from './components/searchSection';
import SearchItemsSection from './components/searchItemsSection';
import { Props } from './components/searchItemsSection/searchItemsWrapper';
import { SearchItemProps } from './components/searchItemsSection/searchItem';

interface AppProps {
  planets: SearchItemProps[];
  loading: boolean;
}

class App extends React.Component<Props, AppProps> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planets: [],
      loading: true,
    };
  }
  url = 'https://swapi.dev/api/planets';
  componentDidMount(): void {
    this.updateAppState();
  }

  updateAppState: () => Promise<void> = async (): Promise<void> => {
    this.setState({ loading: true });
    const searchInput = localStorage.getItem('searchInput');
    let url: string;

    if (!searchInput) {
      url = this.url;
    } else {
      url = `${this.url}/?search=${searchInput}&page=1`;
    }

    const response = await fetch(url);
    const result = await response.json();
    this.setState({ planets: result.results, loading: false });
  };

  render(): React.ReactNode {
    if (this.state.loading) {
      return <p className="loading-indicator">LOADING...</p>;
    }
    return (
      <div className="app">
        <SearchSection updateAction={this.updateAppState} />
        <SearchItemsSection itemProps={this.state.planets} />
      </div>
    );
  }
}

export default App;
