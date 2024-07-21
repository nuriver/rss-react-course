import { MouseEventHandler } from 'react';
import { Planet } from '../types/types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, unselectItem } from '../features/selection/selectionSlice';
import { RootState } from '../store/store';

export default function SearchItems({
  planets,
}: {
  planets: Planet[] | undefined;
}): JSX.Element | JSX.Element[] {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );

  console.log(selectedItems);
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
      }
      if (!checkbox.checked) {
        dispatch(unselectItem(targetName));
      }
    };

    const items = planets.map((planet: Planet) => {
      const planetUrl = planet.url;
      const planetNumber = planetUrl.match(/planets\/(\d+)/);
      if (!planetNumber) throw new Error('No planet number');
      const isSelected = selectedItems.includes(planet);

      return (
        <Link
          key={planetNumber[1]}
          to={`planets/${planetNumber[1]}`}
          className="search-item"
          data-name={planet.name}
        >
          <div className="search-item-image"></div>
          <h2>{planet.name}</h2>
          <input
            type="checkbox"
            className="search-item-checkbox"
            onClick={handleCheckboxClick}
            checked={isSelected ? true : false}
          />
        </Link>
      );
    });
    return items;
  } else {
    return <div className="no-results-indicator">no results...</div>;
  }
}
