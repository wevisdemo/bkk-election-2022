import 'tailwind/style.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    window.registerUICustomElements();
  });

  return <Component {...pageProps} />;
}

export default MyApp;
