import { FC } from 'react';
import Link from 'next/link';
import { app_metadata, footerAnchors } from '../data/app-data';
import { BsMoon, BsSun, BsDisplay } from 'react-icons/bs';
import { useThemeContext } from '../context/ThemeContext';
import { _footer as Container } from '../styles/modules/_footer';

const Footer: FC = (): JSX.Element => {
  const { setDarkMode, darkmode, setLightMode, matchMediaTheme } =
    useThemeContext();

  return (
    <Container>
      <section className='navigation'>
        <nav>
          {footerAnchors.map((item, index) => (
            <Link key={index.toString()} href={item.anchor}>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </section>

      <div className='base-container'>
        <div className='base-container_presentation'>
          <div className='logo'>
            <p>{app_metadata.copyright}</p>
          </div>
        </div>

        <div className='theme-fluent-buttons'>
          <button
            title='Light mode'
            className={!darkmode ? 'active' : ''}
            onClick={setLightMode}>
            <BsSun />
          </button>
          <button title='Automatic' onClick={matchMediaTheme}>
            <BsDisplay />
          </button>
          <button
            title='Dark mode'
            className={darkmode ? 'active' : ''}
            onClick={setDarkMode}>
            <BsMoon />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
