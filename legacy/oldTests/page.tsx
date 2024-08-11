import Page from '../../app/page';
import { CustomURLSearchParams } from '../../src/types/types';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { render } from '@testing-library/react';
import { getPlanets } from '../../src/api/api';
import { mockResp } from '../../tests/testData';

vi.mock('next/headers');
vi.mock('next/navigation');

vi.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => ({
    get: () => {},
  }),
  redirect: () => vi.fn(),
  notFound: () => vi.fn(),
}));

vi.mock('/src/api/api.tsx', () => ({
  getPlanets: vi.fn(),
  getDetails: vi.fn(),
}));

vi.mock('next/headers', async () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'dark' })),
  }),
  headers: vi.fn(() => ({
    get: vi.fn(() => 'http://localhost:3000/'),
  })),
}));
vi.mock('server-only');

describe('group', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSearchParams: CustomURLSearchParams = {
    get: vi.fn().mockReturnValue({ search: '', page: '2' }),
    search: 'testSearch',
    page: '1',
    append: vi.fn(),
    delete: vi.fn(),
    entries: vi.fn(),
    forEach: vi.fn(),
    has: vi.fn(),
    keys: vi.fn(),
    set: vi.fn(),
    sort: vi.fn(),
    values: vi.fn(),
    toString: vi.fn(),
    size: 0,
    getAll: vi.fn().mockReturnValue([]),
    [Symbol.iterator]: vi.fn(),
  };
  it('should', async () => {
    vi.mocked(getPlanets).mockResolvedValue(mockResp);
    render(await Page({ searchParams: mockSearchParams }));

    const cookieStore = cookies();
    const themeCookie = cookieStore.get('theme');

    expect(themeCookie).toEqual({ value: 'dark' });

    const headersList = headers();
    const header_url = headersList.get('x-url') || '';

    expect(header_url).toEqual('http://localhost:3000/');
  });
  it('should', async () => {
    vi.mocked(getPlanets).mockResolvedValue(mockResp);
    render(await Page({ searchParams: mockSearchParams }));
  });
});
