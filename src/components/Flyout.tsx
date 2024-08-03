import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { unselectAllItems } from '../features/selection/selectionSlice';
import { useContext } from 'react';
import { Planet } from '../types/types';
import { ThemeContext } from '../context/ThemeContext';

export default function Flyout({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const itemsInStore = useAppSelector(
    (state: RootState) => state.selection.selectedItems
  );
  const showFlyout = useSelector(
    (state: RootState) => state.selection.showFlyout
  );
  const theme = useContext(ThemeContext);
  const currentClassName =
    theme === 'light' ? 'flyout-wrapper' : 'flyout-wrapper flyout-wrapper-dark';

  const convertToCSV = (array: Planet[]): string => {
    if (array.length === 0) return '';

    const headers = Object.keys(array[0]) as Array<keyof Planet>;

    const replacer = (_key: string, value: string | number | string[]) =>
      value === null ? '' : value;

    const rows = array.map((row) =>
      headers
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );

    return [headers.join(','), ...rows].join('\r\n');
  };

  const csvData = convertToCSV(itemsInStore);
  const csvBlob = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;

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
          onClick={() => {
            dispatch(unselectAllItems());
            setSelectedItems([]);
          }}
        >
          UNSELECT ALL
        </button>
        <a
          className="button flyout-download-button"
          href={csvBlob}
          download={`${selectedItems.length}_planets.csv`}
        >
          DOWNLOAD
        </a>
      </div>
    </div>
  );
}
