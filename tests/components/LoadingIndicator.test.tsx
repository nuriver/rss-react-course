import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../src/components/LoadingIndicator';

test('LoadingIndicator should render correctly', () => {
  render(<LoadingIndicator />);

  expect(screen.getByText('LOADING...')).toBeInTheDocument();
});
