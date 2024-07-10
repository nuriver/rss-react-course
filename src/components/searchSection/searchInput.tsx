import React, {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react';

interface SearchInputProps {
  fixInput: (event?: ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends React.Component<
  SearchInputProps,
  {
    defaultValue: string;
    value: string;
  }
> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      defaultValue: '',
      value: '',
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

  onFocusHandler: FocusEventHandler<HTMLInputElement> = (event): void => {
    const input = event.target as HTMLInputElement;
    this.setState({ value: input.value });
  };

  backspaceHandler: KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if (event.key === 'Backspace' && this.state.value.length < 2) {
      localStorage.clear();
      this.props.fixInput();
    }
  };

  render(): React.ReactNode {
    return (
      <input
        type="text"
        className="search-input"
        onChange={this.props.fixInput}
        onFocus={this.onFocusHandler}
        onKeyDown={this.backspaceHandler}
        defaultValue={this.state.defaultValue}
      />
    );
  }
}

export default SearchInput;
