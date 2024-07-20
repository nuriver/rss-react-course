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

export interface LoaderItemsReturn {
  planets: Planet[];
  count: number;
}

export type RouterError = {
  statusText?: string;
  message?: string;
};

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface PlanetsQuery {
  pageId: string;
  query: string;
}
