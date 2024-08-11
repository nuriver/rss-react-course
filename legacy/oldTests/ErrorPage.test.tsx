import { render, screen } from '@testing-library/react';
import ErrorPage from '../../src/components/ErrorPage';

test('ErrorPage should renders correctly', () => {
  render(<ErrorPage />);

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(
    screen.getByText('Sorry, an unexpected error has occurred.')
  ).toBeInTheDocument();
  expect(screen.getByText('Not found')).toBeInTheDocument();
});
