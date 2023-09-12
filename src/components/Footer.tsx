import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import { app_metadata, footerAnchors } from '../shared/data';
import { _footer as Container } from '../styles/modules/_footer';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function Footer() {
  const { changeColorScheme, colorScheme } = useThemeContext();

  return (
    <Container>
      <nav>
        {footerAnchors.map((item, index) => (
          <Link key={index.toString()} to={item.anchor}>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className='base-container'>
        <p className='copyright-sentence'>{app_metadata.copyright}</p>

        <div className='theme-fluent-buttons'>
          <button
            title='Light mode'
            className={
              colorScheme.mode === 'manual' && colorScheme.scheme === 'light'
                ? 'active'
                : ''
            }
            onClick={(): void =>
              changeColorScheme({ mode: 'manual', scheme: 'light' })
            }>
            <SunIcon />
          </button>
          <button
            title='Automatic'
            className={colorScheme.mode === 'auto' ? 'active' : ''}
            onClick={() => changeColorScheme({ mode: 'auto', scheme: 'dark' })}>
            <DesktopIcon />
          </button>
          <button
            title='Dark mode'
            className={
              colorScheme.mode === 'manual' && colorScheme.scheme === 'dark'
                ? 'active'
                : ''
            }
            onClick={(): void =>
              changeColorScheme({ mode: 'manual', scheme: 'dark' })
            }>
            <MoonIcon />
          </button>
        </div>
      </div>
    </Container>
  );
}
