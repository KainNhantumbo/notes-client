import { FC } from 'react';
import Link from 'next/link';
import { useThemeContext } from '../context/ThemeContext';
import { app_metadata, footerAnchors } from '../data/app-data';
import { _footer as Container } from '../styles/modules/_footer';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

const Footer: FC = (): JSX.Element => {
  const { setDarkMode, darkmode, setLightMode, matchMediaTheme } =
    useThemeContext();

  return (
    <Container>
      <nav>
        {footerAnchors.map((item, index) => (
          <Link key={index.toString()} href={item.anchor}>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className='base-container'>
        <p className='copyright-sentence'>{app_metadata.copyright}</p>

        <div className='theme-fluent-buttons'>
          <button
            title='Light mode'
            className={!darkmode ? 'active' : ''}
            onClick={setLightMode}>
            <SunIcon />
          </button>
          <button title='Automatic' onClick={matchMediaTheme}>
            <DesktopIcon />
          </button>
          <button
            title='Dark mode'
            className={darkmode ? 'active' : ''}
            onClick={setDarkMode}>
            <MoonIcon />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
