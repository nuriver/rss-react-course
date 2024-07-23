import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { unselectAllItems } from '../features/selection/selectionSlice';
import { useContext } from 'react';
import { ThemeContext } from '../App';

export default function Flyout(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state: RootState) => state.selection.selectedItems
  );
  const showFlyout = useSelector(
    (state: RootState) => state.selection.showFlyout
  );
  const theme = useContext(ThemeContext);
  const currentClassName =
    theme === 'light' ? 'flyout-wrapper' : 'flyout-wrapper flyout-wrapper-dark';

  return (
    <div
      className={
        showFlyout ? currentClassName : `${currentClassName} flyout-hidden`
      }
    >
      <p className="flyout-count">SELECTED ITEMS: {selectedItems.length}</p>
      <div className="flyout-buttons-container">
        <button
          className="button flyout-unselect-all-button"
          onClick={() => dispatch(unselectAllItems())}
        >
          UNSELECT ALL
        </button>
        <CSVLink
          className="button flyout-download-button"
          data={selectedItems}
          filename={`${selectedItems.length}_planets.csv`}
          target="_blank"
        >
          DOWNLOAD
        </CSVLink>
      </div>
    </div>
  );
}
