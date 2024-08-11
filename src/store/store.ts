import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../features/selection/selectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  selection: selectionReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
