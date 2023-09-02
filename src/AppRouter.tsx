import { FC, JSX } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PasswordRecovery from './routes/auth/password-recovery';
import ResetPasswordSuccess from './routes/auth/password-recovery-success';
import SignIn from './routes/auth/signin';
import SignUp from './routes/auth/signup';
import UpdatePassword from './routes/auth/update-password';
import SignupSuccess from './routes/auth/signup-success';

import Workspace from './routes/workspace';
import Settings from './routes/workspace/settings';

import About from './routes/docs/about';
import PrivacyPolicy from './routes/docs/privacy-policy';

import NotFoundError from './routes/404';
import InternalServerError from './routes/500';

import Home from './routes/index';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/workspace', element: <Workspace /> },
  { path: '/workspace/settings', element: <Settings /> },
  { path: '/auth/password-recovery', element: <PasswordRecovery/> },
  { path: '/auth/password-recovery-success', element: <ResetPasswordSuccess/> },
  { path: '/auth/signin', element: <SignIn/> },
  { path: '/auth/signup', element: <SignUp/> },
  { path: '/auth/update-password', element: <UpdatePassword/> },
  { path: '/auth/signup-success', element: <SignupSuccess/> },
  { path: '/docs/about', element: <About/> },
  { path: '/docs/privacy-policy', element: <PrivacyPolicy/> },
  { path: '*', element: <NotFoundError /> },
]);

const AppRouter: FC = (): JSX.Element => <RouterProvider router={routes} />;

export default AppRouter;
