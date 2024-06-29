import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  fixInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends React.Component<SearchInputProps> {
  render(): React.ReactNode {
    return (
      <input
        type="text"
        className="search-input"
        onChange={this.props.fixInput}
      />
    );
  }
}

export default SearchInput;
