import React from 'react';
import SearchSection from './components/searchSection';
import SearchItemsSection from './components/searchItemsSection';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <SearchSection />
        <SearchItemsSection />
      </div>
    );
  }
}

export default App;
