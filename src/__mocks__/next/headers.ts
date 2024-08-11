export const cookies = vi.fn(() => ({
  get: vi.fn(() => ({ value: 'dark' })),
  set: vi.fn(),
}));

export const headers = vi.fn(() => ({
  get: vi.fn(() => 'http://localhost:3000/'),
}));
