import {
  IoClose,
  IoAppsOutline,
  IoLogInOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { navigationAnchors } from '../data/app-data';
import { BiUser } from 'react-icons/bi';
import { useState, useEffect, FC } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { m as motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/favicon-192x192.png';
import { _header as Container } from '../styles/modules/_header';

const Header: FC = (): JSX.Element => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const { asPath, push }: NextRouter = useRouter();
  const { state } = useAppContext();

  const toggleMenu = (): void => setIsMenu(!isMenu);

  const changeWidth = (): void =>
    window.innerWidth > 770 ? setIsMenu(true) : setIsMenu(false);

  useEffect((): (() => void) => {
    changeWidth();
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <Container>
      <div className='wrapper'>
        <div className='logo'>
          <Link href={'/'}>
            <Image alt='Choco NoteyLogo' src={logo} width={600} height={134} />{' '}
          </Link>
        </div>
        <AnimatePresence>
          {isMenu && (
            <motion.nav
              initial={{ translateY: -70 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.25 }}
              exit={{
                opacity: 0,
                translateY: -70,
                transition: { duration: 0.25 },
              }}
              style={{ display: isMenu ? 'flex' : 'none' }}>
              <section>
                {navigationAnchors.map((item, index) => (
                  <Link
                    key={index.toString()}
                    href={item.url}
                    className={asPath.includes(item.alias) ? 'active' : ''}>
                    <motion.span whileHover={{ scale: 1.1 }}>
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
              </section>

              <div className='left-corner-container'>
                {!state.auth.id || !state.auth.token ? (
                  <>
                    <Link href={'/auth/signin'} className='login-btn'>
                      <IoLogInOutline />
                      <span>Login</span>
                    </Link>
                    <Link href={'/auth/signup'} className='sign-in-btn'>
                      <IoStorefrontOutline />
                      <span>Sign Up</span>
                    </Link>
                  </>
                ) : null}

                {!asPath.includes('tabs') ? (
                  <button
                    title='Painel de Controle e Conta'
                    className='user-account'
                    onClick={() => push(`/tabs/notes`)}>
                    {state.auth.profile_image ? (
                      <img
                        loading='lazy'
                        decoding='async'
                        src={state.auth.profile_image}
                        alt='User profile image'
                      />
                    ) : (
                      <BiUser />
                    )}
                    <span>Account</span>
                  </button>
                ) : null}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.8 }}
          title='Toogle menu'
          aria-label='Toogle menu'
          className='toggle-btn'
          onClick={toggleMenu}>
          {!isMenu ? <IoAppsOutline /> : <IoClose />}
        </motion.button>
      </div>
    </Container>
  );
};

export default Header;
