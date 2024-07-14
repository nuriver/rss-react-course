import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PlanetData from './planetData';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the PlanetData page', () => {
  render(<PlanetData />);
  expect(true).toBeTruthy();
});
