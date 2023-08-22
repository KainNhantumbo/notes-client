import { FC } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: FC = (): JSX.Element => (
  <Html lang='pt-br'>
    <Head>
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/favicon-192x192.png' />
      <meta name='theme-color' content='#fff' />
      {/* ---------fonts----------- */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={''} />

      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap'
        rel='stylesheet'
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
