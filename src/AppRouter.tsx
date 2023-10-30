import { Route, Routes } from 'react-router-dom';
import PasswordRecovery from './routes/auth/password-recovery';
import ResetPasswordSuccess from './routes/auth/password-recovery-success';
import Home from './routes/index';
import SignIn from './routes/auth/signin';
import SignUp from './routes/auth/signup';
import UpdatePassword from './routes/auth/update-password';
import SignupSuccess from './routes/auth/signup-success';
import Workspace from './routes/workspace';
import Settings from './routes/workspace/settings';
import NoteEditor from './routes/workspace/note-editor';
import PrivacyPolicy from './routes/docs/privacy-policy';
import NotFoundError from './routes/404';
import { JSX } from 'react';

type RouteType = { path: string; element: JSX.ElementType };

const routes: RouteType[] = [
  { path: '/', element: Home },
  { path: '/workspace', element: Workspace },
  { path: '/workspace/settings', element: Settings },
  { path: '/workspace/note-editor/:id', element: NoteEditor },
  { path: '/auth/password-recovery', element: PasswordRecovery },
  { path: '/auth/password-recovery-success', element: ResetPasswordSuccess },
  { path: '/auth/signin', element: SignIn },
  { path: '/auth/signup', element: SignUp },
  { path: '/auth/update-password', element: UpdatePassword },
  { path: '/auth/signup-success', element: SignupSuccess },
  { path: '/docs/privacy-policy', element: PrivacyPolicy },
  { path: '*', element: NotFoundError }
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
