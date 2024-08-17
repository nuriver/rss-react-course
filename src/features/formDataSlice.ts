import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, FormDataState } from '../types/interfaces';

const initialState: FormDataState = {
  formDataStorage: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormData>) => {
      state.formDataStorage.push(action.payload);
    },
  },
});

export default formDataSlice.reducer;
export const { addData } = formDataSlice.actions;
