import { FC } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: FC = (): JSX.Element => (
  <Html lang='en'>
    <Head>
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/favicon-192x192.png' />
      <meta name='theme-color' content='#000' />
      {/* ---------fonts----------- */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin={''}
      />

      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap'
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
