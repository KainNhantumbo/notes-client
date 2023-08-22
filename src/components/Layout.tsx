import { FC, ReactNode, useEffect } from 'react';
import HeadWithMeta, { TProps as HeadProps } from './Head';
// import LogoutPrompt from './modals/LogoutPrompt';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import Cookies from './modals/Cookies';

interface IProps {
  children: ReactNode;
  metadata: HeadProps | undefined;
}

const Layout: FC<IProps> = ({ children, metadata }) => {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (router.asPath.includes('notes') && !state.auth.id) {
        router.push('/auth/sign-in');
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [state.auth]);

  return (
    <>
      <HeadWithMeta {...metadata} />
      <Cookies />
      {children}
    </>
  );
};

export default Layout;
