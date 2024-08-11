import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';
import { ExtendedRenderOptions } from '../../src/types/types';
import { render } from '@testing-library/react';

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper: React.FC<PropsWithChildren<{}>> = ({
    children,
  }: PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
