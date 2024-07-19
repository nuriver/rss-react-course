import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPlanets: builder.query({
      query: () => '/planets',
    }),
    getPlanet: builder.query({
      query: (planetId) => `/planets/${planetId}`,
    }),
  }),
});
