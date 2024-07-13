import { useLoaderData, Link, Params } from 'react-router-dom';

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export async function loadItems({
  params,
}: {
  params: Params;
}): Promise<Planet[]> {
  const query = localStorage.getItem('searchQuery');
  const baseUrl = 'https://swapi.dev/api/planets/?search=';
  const page = params.pageId;

  const url = {
    value: `${baseUrl}&page=${page}`,
  };
  if (query) url.value = `${baseUrl}${query}&page=${page}`;

  const fetchedData = await fetch(url.value);
  const results = await fetchedData.json();
  const planets: Planet[] = results.results;
  return planets;
}

export default function SearchItemsWrapper(): JSX.Element {
  const planets = useLoaderData() as Planet[];
  const items = planets.map((planet: Planet) => {
    const planetUrl = planet.url;
    const planetNumber = planetUrl.match(/planets\/(\d+)/);
    if (!planetNumber) throw new Error('No planet number');
    return (
      <Link
        key={planetNumber[1]}
        to={`planets/${planetNumber[1]}`}
        className="search-item"
      >
        <h2>{planet.name}</h2>
        <p className="search-item-descriptor">
          <span>Population: </span>
          {planet.population}
        </p>
      </Link>
    );
  });
  return <div className="search-items-wrapper">{items}</div>;
}
