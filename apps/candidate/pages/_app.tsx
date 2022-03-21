import 'tailwind/style.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
