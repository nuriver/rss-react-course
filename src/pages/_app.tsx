import type { AppProps } from 'next/app';
import '../styles/main.css';
import { wrapper } from '../store/store';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
