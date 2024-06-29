import React, { ChangeEvent } from 'react';
import SearchInput from './searchInput';
import SearchButton from './searchButton';

interface SearchSectionProps {
  updateAction: () => Promise<void>;
}

class SearchSection extends React.Component<
  SearchSectionProps,
  { inputValue: string }
> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  fixInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.trim();
    this.setState({ inputValue });
  };

  clickHandler = (): void => {
    if (this.state.inputValue.length > 0) {
      const searchInput = this.state.inputValue;
      localStorage.setItem('searchInput', searchInput);
      this.props.updateAction();
    } else {
      localStorage.clear();
      this.props.updateAction();
    }
  };

  render(): React.ReactNode {
    return (
      <section className="search-section">
        <div className="search-wrapper">
          <SearchInput fixInput={this.fixInput} />
          <SearchButton clickHandler={this.clickHandler} />
        </div>
      </section>
    );
  }
}

export default SearchSection;
