import 'tailwind/style.css';
import type { AppProps } from 'next/app';
import { Fragment, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    window.registerUICustomElements();
  });
  return (
    <Fragment>
      <ui-navbar />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
