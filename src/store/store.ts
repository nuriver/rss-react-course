import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import selectionReducer from '../features/selection/selectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  selection: selectionReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
};

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     selection: selectionReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
