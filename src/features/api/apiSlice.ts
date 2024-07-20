import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Planet, PlanetsQuery, PlanetsResponse } from '../../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<PlanetsResponse, PlanetsQuery>({
      query: ({ pageId, query }) => `/planets/?search=${query}&page=${pageId}`,
    }),
    getPlanet: builder.query<Planet, string>({
      query: (planetId) => `/planets/${planetId}`,
    }),
  }),
});
