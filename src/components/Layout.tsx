import Header from './Header';
import Footer from './Footer';
import Toast from './modals/Toast';
import Cookies from './modals/Cookies';
import PromptModal from './modals/Prompt';
import type { THeadProps } from '../types';
import { FC, ReactNode, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  renderHeader?: boolean;
  renderFooter?: boolean;
  metadata: THeadProps | undefined;
}

const Layout: FC<IProps> = ({
  children,
  metadata,
  renderHeader,
  renderFooter,
}) => {
  const { state } = useAppContext();
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      if (location.pathname.includes('workspace') && !state.auth.id) {
        navigate('/auth/signin', { replace: true });
      }
    }, 500);
    return (): void => clearTimeout(debounceTimer);
  }, [state.auth]);

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        {renderHeader ? <Header /> : null}
        <Cookies />
        <Toast key={state.toast.title.split(' ').join('') || undefined} />
        <PromptModal
          key={state.prompt.title.split(' ').join('') || undefined}
        />
        {children}
        {renderFooter ? <Footer /> : null}
      </LazyMotion>
    </MotionConfig>
  );
};

export default Layout;
