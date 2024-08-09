import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../app/loading';

test('LoadingIndicator should render correctly', () => {
  render(<LoadingIndicator />);

  expect(screen.getByText('LOADING...')).toBeInTheDocument();
});
