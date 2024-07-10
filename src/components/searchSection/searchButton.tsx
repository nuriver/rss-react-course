import React from 'react';

interface SearchButtonProps {
  clickHandler: () => void;
}

class SearchButton extends React.Component<SearchButtonProps> {
  render(): React.ReactNode {
    return (
      <button
        className="button search-button"
        onClick={this.props.clickHandler}
      >
        SEARCH
      </button>
    );
  }
}

export default SearchButton;
