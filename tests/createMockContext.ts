import { GetServerSidePropsContext } from 'next';
import { createMocks } from 'node-mocks-http';

const createMockContext = (
  cookies: { theme: string } | {},
  query: { search: string; page: string; details?: string } | {},
  url?: string
): GetServerSidePropsContext => {
  const { req, res } = createMocks({
    method: 'GET',
    cookies,
    query,
    url,
  });

  return {
    req,
    res,
    query,
    resolvedUrl: url ? url : '/',
    params: {},
    locale: 'en',
    locales: ['en'],
    defaultLocale: 'en',
  };
};

export default createMockContext;
