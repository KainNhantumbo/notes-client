import { Html, Head, Main, NextScript } from 'next/document';
import { useThemeContext } from '../context/ThemeContext';

export default function Document(): JSX.Element {
  const { darkmode } = useThemeContext();

  return (
    <Html lang='en' data-color-mode={darkmode ? 'dark' : 'light'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
