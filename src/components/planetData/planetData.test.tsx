import { describe, expect, it, test } from 'vitest';
import PlanetData from './planetData';
import { render } from '@testing-library/react';

test('demo', () => {
  expect(true).toBe(true);
});

describe('PlanetData', () => {
  it('renders PlanetData component', () => {
    render(<PlanetData />);
  });
});
