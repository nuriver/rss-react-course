import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FormData,
  FormDataState,
  FormDataWithConvertedImage,
} from '../types/interfaces';
import { RootState } from '../store/store';

const initialState: FormDataState = {
  formDataStorage: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormDataWithConvertedImage>) => {
      state.formDataStorage.push(action.payload);
    },
  },
});

export default formDataSlice.reducer;
export const { addData } = formDataSlice.actions;
export const selectFormData = (state: RootState) =>
  state.formData.formDataStorage;
