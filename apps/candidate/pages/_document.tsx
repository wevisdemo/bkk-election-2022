import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <link rel="icon" href="/static/favicon.png" />
        <link rel="stylesheet" href="/static/fonts/typography.css" />
        <link rel="stylesheet" href="/ui/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
