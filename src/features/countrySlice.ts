import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryState } from '../types/interfaces';

const initialState: CountryState = {
  countryStorage: [],
};

export const formDataSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countryStorage = action.payload;
    },
  },
});

export default formDataSlice.reducer;
export const { setCountries } = formDataSlice.actions;
