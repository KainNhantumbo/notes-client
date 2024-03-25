import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';

const ResetPasswordSuccess = React.lazy(
  () => import('./routes/auth/password-recovery-success')
);
const PasswordRecovery = React.lazy(() => import('./routes/auth/password-recovery'));
const Home = React.lazy(() => import('./routes/index'));
const SignIn = React.lazy(() => import('./routes/auth/signin'));
const SignUp = React.lazy(() => import('./routes/auth/signup'));
const UpdatePassword = React.lazy(() => import('./routes/auth/update-password'));
const SignupSuccess = React.lazy(() => import('./routes/auth/signup-success'));
const Settings = React.lazy(() => import('./routes/workspace/settings'));
const NoteEditor = React.lazy(() => import('./routes/workspace/note-editor'));
const PrivacyPolicy = React.lazy(() => import('./routes/docs/privacy-policy'));
const NotFoundError = React.lazy(() => import('./routes/404'));
const Workspace = React.lazy(() => import('./routes/workspace'));

type RouteType = { path: string; element: React.JSX.ElementType };

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
        <Route
          key={index}
          path={route.path}
          element={
            <React.Suspense fallback={<Loader />}>
              <route.element />
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
}
