import 'tailwind/style.css';
import '../custom.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { loadUIComponents } from 'ui';
import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadUIComponents();
  });
  return (
    <PlausibleProvider
      enabled={process.env.BUILD_ENV === 'PRODUCTION'}
      domain="bkkelection2022.wevis.info"
      customDomain="https://analytics.punchup.world/js/plausible.js?origin="
    >
      <ui-navbar />
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default MyApp;
