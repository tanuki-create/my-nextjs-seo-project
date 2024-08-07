import { AppProps } from 'next/app';
import '../styles/global.css';
import '../components/MainComponents.module.css';
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;