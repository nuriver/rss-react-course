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

interface LoaderItemsReturn {
  planets: Planet[];
  count: number;
}

export async function loadItems({
  params,
}: {
  params: Params;
}): Promise<LoaderItemsReturn> {
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
  const count: number = results.count;

  return { planets, count };
}

function createPagination(count: number): JSX.Element[] {
  const numberOfPages = Math.ceil(count / 10);
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    const paginationItem = (
      <Link className="pagination-item" key={i} to={`/search/${i}`}>
        {i}
      </Link>
    );
    paginationItems.push(paginationItem);
  }

  return paginationItems;
}

function createItems(planets: Planet[] | null): JSX.Element | JSX.Element[] {
  if (planets) {
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
    return items;
  } else {
    return <div className="no-results-indicator">no results...</div>;
  }
}

export default function SearchItemsWrapper(): JSX.Element {
  const { planets, count } = useLoaderData() as LoaderItemsReturn;
  const paginationItems = createPagination(count);
  const items = createItems(planets);

  return (
    <div className="search-items-wrapper">
      {items}
      <div className="pagination-wrapper">{paginationItems}</div>
    </div>
  );
}
