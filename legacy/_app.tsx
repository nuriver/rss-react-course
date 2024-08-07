import type { AppProps } from 'next/app';
import '../styles/main.css';
import { wrapper } from '../src/store/store';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { Provider } from 'react-redux';

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />;
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
