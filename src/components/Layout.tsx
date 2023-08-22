import Logout from './modals/Logout';
import Cookies from './modals/Cookies';
import { FC, ReactNode, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import HeadWithMeta, { TProps as HeadProps } from './Head';
import Header from './Header';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

interface IProps {
  children: ReactNode;
  renderHeader?: boolean;
  metadata: HeadProps | undefined;
}

const Layout: FC<IProps> = ({ children, metadata, renderHeader }) => {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      if (router.asPath.includes('tabs') && !state.auth.id) {
        router.push('/auth/sign-in');
      }
    }, 500);
    return (): void => clearTimeout(debounceTimer);
  }, [state.auth]);

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        <>
          {renderHeader ? <Header /> : null}
          <HeadWithMeta {...metadata} />
          <Cookies />
          <Logout />
          {children}
        </>
      </LazyMotion>
    </MotionConfig>
  );
};

export default Layout;
