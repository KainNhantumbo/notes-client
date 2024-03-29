import logo from '@/assets/logo-19x192.png';
import { useWindowInnerSize } from '@/hooks/useWindowInnerSize';
import { ArrowRightIcon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { app_metadata, navigationAnchors } from '../shared/data';
import { _header as Container } from '../styles/modules/_header';

export default function Header() {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAppContext();
  const windowInnerSize = useWindowInnerSize();

  const toggleMenu = (): void => setIsMenu((current) => !current);

  useEffect((): void => {
    windowInnerSize.width > 770 ? setIsMenu(true) : setIsMenu(false);
  }, [windowInnerSize]);

  return (
    <Container>
      <div className='wrapper'>
        <div className='logo'>
          <Link to={'/'}>
            <img
              loading='lazy'
              decoding='async'
              alt={`${app_metadata.appName} Logo`}
              src={logo}
            />
          </Link>
          <h3 onClick={() => navigate('/')}>
            <span>{app_metadata.appName}</span>
          </h3>
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
                transition: { duration: 0.25 }
              }}
              style={{ display: isMenu ? 'flex' : 'none' }}>
              <section className='navigation-anchors-container'>
                {navigationAnchors.map((item, index) => (
                  <a
                    key={index.toString()}
                    href={item.url}
                    className={location.pathname.includes(item.alias) ? 'active' : ''}>
                    <motion.span whileHover={{ scale: 1.1 }}>{item.name}</motion.span>
                  </a>
                ))}
              </section>

              <div className='left-corner-container'>
                {!state.auth.id ? (
                  <>
                    <Link to={'/auth/signin'} className='login-btn'>
                      <span>Login</span>
                    </Link>
                    <Link to={'/auth/signup'} className='sign-in-btn'>
                      <ArrowRightIcon />
                      <span>Sign up</span>
                    </Link>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    title='Go to workspace'
                    className='user-account'
                    onClick={() => navigate(`/workspace?tab=all-notes&folder=none`)}>
                    <span>Go to Workspace</span>
                    <ArrowRightIcon />
                  </motion.button>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.8 }}
          title={`${isMenu ? 'Close menu drawer' : 'Open menu drawer'}`}
          aria-placeholder={`${isMenu ? 'Close menu drawer' : 'Open menu drawer'}`}
          aria-label={`${isMenu ? 'Close menu drawer' : 'Open menu drawer'}`}
          className={`toggle-btn ${isMenu ? 'toggle-btn_active' : ''}`}
          onClick={toggleMenu}>
          {!isMenu ? <HamburgerMenuIcon /> : <Cross2Icon />}
        </motion.button>
      </div>
    </Container>
  );
}
