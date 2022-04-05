import 'tailwind/style.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../store';
import { Fragment, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    window.registerUICustomElements(); // TODO: should in server side ?
  });
  return (
    <AppWrapper>
      <Fragment>
        <ui-navbar />
        <Component {...pageProps} />
      </Fragment>
    </AppWrapper>
  );
}

export default MyApp;
