import { http, HttpResponse, delay, HttpHandler } from 'msw';
import { Planet } from '../src/types/types';

export default function createHandlers(
  endpoint: string,
  response: Planet | Planet[] | { count: number; results: Planet[] }
): HttpHandler[] {
  const baseUrl = 'https://swapi.dev/api';
  const requestUrl = `${baseUrl}${endpoint}`;

  const handlers = [
    http.get(requestUrl, async () => {
      await delay(150);
      return HttpResponse.json(response);
    }),
  ];

  return handlers;
}
