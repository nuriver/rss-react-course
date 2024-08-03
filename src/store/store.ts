import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../features/selection/selectionSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  selection: selectionReducer,
});

// export const setupStore = (preloadedState?: Partial<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(apiSlice.middleware),
//     preloadedState,
//   });
// };

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type AppState = ReturnType<AppStore['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const wrapper = createWrapper<AppStore>(makeStore);
