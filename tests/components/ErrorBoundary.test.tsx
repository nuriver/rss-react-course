import { render } from '@testing-library/react';
import ErrorBoundary from '../../ErrorBoundary';

const Child = () => {
  throw new Error();
};

const renderProviders = (ui: React.ReactElement) => render(ui, {});

describe('ErrorBoundary', () => {
  it('should render error boundary component when there is an error', () => {
    const { getByText } = renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const errorMessage = getByText(
      'Something went wrong. Please refresh the page.'
    );
    expect(errorMessage).toBeDefined();
  });
});
