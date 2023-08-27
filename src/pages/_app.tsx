import '../styles/global.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import type { FC } from 'react';
import type { AppProps } from 'next/app';
import AppContext from '../context/AppContext';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
);

export default App;
