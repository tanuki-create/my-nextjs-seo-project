import { AppProps } from 'next/app';
import '../styles/global.css';
import '../components/MainComponents.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;