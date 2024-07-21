import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { unselectAllItems } from '../features/selection/selectionSlice';

export default function Flyout(): JSX.Element {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );
  const showFlyout = useSelector(
    (state: RootState) => state.selection.showFlyout
  );

  return (
    <div
      className={showFlyout ? 'flyout-wrapper' : 'flyout-wrapper flyout-hidden'}
    >
      <p className="flyout-count">SELECTED ITEMS: {selectedItems.length}</p>
      <div className="flyout-buttons-container">
        <button
          className="button flyout-unselect-all-button"
          onClick={() => dispatch(unselectAllItems())}
        >
          UNSELECT ALL
        </button>
        <button className="button flyout-download-button">DOWNLOAD</button>
      </div>
    </div>
  );
}
