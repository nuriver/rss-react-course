import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet, SelectionState } from '../../types/types';

const initialState: SelectionState = {
  selectedItems: [],
  showFlyout: false,
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Planet>) => {
      state.selectedItems.push(action.payload);
      state.showFlyout = true;
    },
    unselectItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload
      );
      if (state.selectedItems.length === 0) {
        state.showFlyout = false;
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
      state.showFlyout = false;
    },
  },
});

export default selectionSlice.reducer;
export const { selectItem, unselectItem, unselectAllItems } =
  selectionSlice.actions;
