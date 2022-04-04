import 'tailwind/style.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../store';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    window.registerUICustomElements();
  });
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
