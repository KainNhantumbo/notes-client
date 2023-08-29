import '../styles/global.css';
import '@mdxeditor/editor/style.css';

import type { FC } from 'react';
import type { AppProps } from 'next/app';
import AppContext from '../context/AppContext';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
);

export default App;
