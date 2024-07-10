import React from 'react';
import { Props } from '../components/searchItemsSection/searchItemsWrapper';

class ErrorButton extends React.Component<Props, { counter: number }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  buttonComponentClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render(): React.ReactNode {
    const error = new Error('This is a test error');
    error.name = 'TestError';
    if (this.state.counter > 0) {
      throw error;
    }
    return (
      <button
        className="button error-button"
        onClick={this.buttonComponentClick}
      >
        ERROR SIMULATOR
      </button>
    );
  }
}

export default ErrorButton;
