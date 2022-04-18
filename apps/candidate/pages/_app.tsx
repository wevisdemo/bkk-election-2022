import 'tailwind/style.css';
import '../custom.css';
import type { AppProps } from 'next/app';
import { Fragment, useEffect } from 'react';
import { loadUIComponents } from 'ui';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadUIComponents();
  });
  return (
    <Fragment>
      <ui-navbar />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
