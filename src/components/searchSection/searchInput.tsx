import React, { ChangeEvent, FocusEventHandler } from 'react';

interface SearchInputProps {
  fixInput: (event?: ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends React.Component<
  SearchInputProps,
  { defaultValue: string }
> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      defaultValue: '',
    };
  }

  componentDidMount(): void {
    const searchInputValue = localStorage.getItem('searchInput');
    if (searchInputValue) {
      this.setState({ defaultValue: searchInputValue });
      this.props.fixInput();
    } else {
      this.setState({ defaultValue: '' });
    }
  }

  clearInput: FocusEventHandler<HTMLInputElement> = (event): void => {
    const input = event.target as HTMLInputElement;
    input.value = '';
    localStorage.clear();
    this.setState({ defaultValue: '' });
    this.props.fixInput();
  };

  render(): React.ReactNode {
    return (
      <input
        type="text"
        className="search-input"
        onChange={this.props.fixInput}
        onFocus={this.clearInput}
        defaultValue={this.state.defaultValue}
      />
    );
  }
}

export default SearchInput;
