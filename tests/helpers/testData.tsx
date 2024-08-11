import { Link } from 'react-router-dom';
import { Planet } from '../../src/types/types';

export const defaultPlanet1: Planet = {
  name: 'Alderaan',
  rotation_period: '24',
  orbital_period: '364',
  diameter: '12500',
  climate: 'temperate',
  gravity: '1 standard',
  terrain: 'grasslands, mountains',
  surface_water: '40',
  population: '2000000000',
  residents: [
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/68/',
    'https://swapi.dev/api/people/81/',
  ],
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  created: '2014-12-10T11:35:48.479000Z',
  edited: '2014-12-20T20:58:18.420000Z',
  url: 'https://swapi.dev/api/planets/1/',
};

export const defaultPlanet2: Planet = {
  name: 'Alderaan2',
  rotation_period: '24',
  orbital_period: '364',
  diameter: '12500',
  climate: 'temperate',
  gravity: '1 standard',
  terrain: 'grasslands, mountains',
  surface_water: '40',
  population: '2000000000',
  residents: [
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/68/',
    'https://swapi.dev/api/people/81/',
  ],
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  created: '2014-12-10T11:35:48.479000Z',
  edited: '2014-12-20T20:58:18.420000Z',
  url: 'https://swapi.dev/api/planets/2/',
};

export const defaultPlanet3: Planet = {
  name: 'Alderaan3',
  rotation_period: '24',
  orbital_period: '364',
  diameter: '12500',
  climate: 'temperate',
  gravity: '1 standard',
  terrain: 'grasslands, mountains',
  surface_water: '40',
  population: '2000000000',
  residents: [
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/68/',
    'https://swapi.dev/api/people/81/',
  ],
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  created: '2014-12-10T11:35:48.479000Z',
  edited: '2014-12-20T20:58:18.420000Z',
  url: 'https://swapi.dev/api/planets/3/',
};

export const detailsMockResponseValues = [
  'Alderaan',
  '24',
  '364',
  '12500',
  'temperate',
  '1 standard',
  'grasslands, mountains',
  '40',
  '2000000000',
];

export const planets = [defaultPlanet1, defaultPlanet2, defaultPlanet3];

export const goodMockResponse = new Response(JSON.stringify(defaultPlanet1), {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});

export const badMockResponse = new Response(null, {
  status: 404,
  statusText: 'Not Found',
  headers: new Headers(),
});

badMockResponse.json = vi.fn().mockResolvedValue({ details: 'Not found' });

export const mockData = {
  count: 3,
  results: [defaultPlanet1, defaultPlanet2, defaultPlanet3],
};

export const planetResponseTrue = {
  count: 1,
  next: '',
  previous: '',
  results: [defaultPlanet1],
};

export const mockDataPaginationTrue = {
  count: 26,
  results: [
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
    defaultPlanet1,
    defaultPlanet2,
    defaultPlanet3,
  ],
};

export const goodPlanetsResponse = new Response(JSON.stringify(mockData), {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});

export const planetLinks = [
  <a key={defaultPlanet1.name}>
    <h2>{defaultPlanet1.name}</h2>
    <p>
      {' '}
      <span>Population: </span>
      {defaultPlanet1.population}
    </p>
  </a>,
  <a key={defaultPlanet2.name}>
    <h2>{defaultPlanet2.name}</h2>
    <p>
      {' '}
      <span>Population: </span>
      {defaultPlanet2.population}
    </p>
  </a>,
  <a key={defaultPlanet3.name}>
    <h2>{defaultPlanet3.name}</h2>
    <p>
      {' '}
      <span>Population: </span>
      {defaultPlanet3.population}
    </p>
  </a>,
] as JSX.Element[];

export const mockPages = [
  <Link className="pagination-item" key={1} to={`/search/1`}>
    {1}
  </Link>,
];

export const pagination = [
  <Link className="pagination-item" key={1} to="/search/1">
    1
  </Link>,
  <Link className="pagination-item" key={2} to="/search/2">
    2
  </Link>,
  <Link className="pagination-item" key={3} to="/search/3">
    3
  </Link>,
];
