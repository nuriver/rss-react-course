import { MouseEventHandler } from 'react';
import { Planet } from '../types/types';
import { useDispatch } from 'react-redux';
import { selectItem, unselectItem } from '../features/selection/selectionSlice';
import { Link, useSearchParams } from '@remix-run/react';

export default function SearchItems({
  planets,
  selectedItems,
  setSelectedItems,
}: {
  planets: Planet[] | undefined;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element | JSX.Element[] {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  if (planets && planets.length > 0) {
    const handleCheckboxClick: MouseEventHandler<HTMLInputElement> = (
      event
    ) => {
      event.stopPropagation();

      const checkbox = event.target as HTMLInputElement;
      const searchItem = checkbox.closest('.search-item') as HTMLElement;
      const targetName = searchItem.dataset.name as string;

      const targetPlanet = planets.find(
        (planet) => planet.name === targetName
      ) as Planet;

      if (checkbox.checked) {
        dispatch(selectItem(targetPlanet));
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          targetName,
        ]);
      }

      if (!checkbox.checked) {
        dispatch(unselectItem(targetName));
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item) => item !== targetName)
        );
      }
    };

    const items = planets.map((planet: Planet) => {
      const planetUrl = planet.url;
      const planetNumber = planetUrl.match(/planets\/(\d+)/);
      if (!planetNumber) throw new Error('No planet number');

      return (
        <Link
          key={planetNumber[1]}
          to={`/planets/${planetNumber[1]}?search=${search}&page=${page}`}
          className="search-item"
          data-name={planet.name}
        >
          <div className="search-item-image"></div>
          <h2>{planet.name}</h2>
          <input
            type="checkbox"
            className="search-item-checkbox"
            onClick={handleCheckboxClick}
            checked={selectedItems.includes(planet.name)}
            onChange={() => {}}
          />
        </Link>
      );
    });
    return items;
  } else {
    return <div className="no-results-indicator">no results...</div>;
  }
}
