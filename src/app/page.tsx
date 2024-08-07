import { notFound, redirect } from 'next/navigation';
import { CustomURLSearchParams } from '../types/types';
import Main from './main';
import StoreProvider from './StoreProvider';
import { getDetails, getPlanets } from '../api/api';
import { cookies, headers } from 'next/headers';

export default async function Page({
  searchParams,
}: {
  searchParams: CustomURLSearchParams;
}) {
  const headersList = headers();
  const header_url = headersList.get('x-url') || '';
  const portPattern = /^http:\/\/localhost:(\d{4})\/$/;
  const match = header_url.match(portPattern);

  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  let theme: string;
  if (!themeCookie) {
    theme = 'light';
  } else {
    theme = themeCookie.value;
  }

  const search = searchParams.search;
  const page = searchParams.page;
  const detailsQuery = searchParams.details;

  const planets = await getPlanets(search, page);
  const details = await getDetails(detailsQuery);

  if (match) {
    redirect('/?search=&page=1');
  }

  if ('not found' in planets) {
    return notFound();
  }

  if (!page) {
    return notFound();
  }

  if (detailsQuery && !details) {
    return notFound();
  }

  return (
    <StoreProvider>
      <Main
        planets={planets}
        search={search}
        page={page}
        theme={theme}
        details={details}
      />
    </StoreProvider>
  );
}
