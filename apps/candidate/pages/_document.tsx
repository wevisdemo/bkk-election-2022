import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <link rel="icon" href="/static/favicon.png" />
        <link rel="stylesheet" href="/static/fonts/typography.css" />
        <link rel="stylesheet" href="/ui/style.css" />
        <script
          async
          defer
          data-domain="bkkelection2022.wevis.info"
          src="https://analytics.punchup.world/js/plausible.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
