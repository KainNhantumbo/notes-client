import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { HeadProps } from '../types';
import Footer from './Footer';
import Header from './Header';
import Cookies from './modals/Cookies';
import { PromptModal } from './modals/Prompt';
import Toast from './modals/Toast';

interface Props {
  children: ReactNode;
  renderHeader?: boolean;
  renderFooter?: boolean;
  metadata: HeadProps | undefined;
}

export default function Layout({
  children,
  renderHeader,
  renderFooter
}: Props) {
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
}
