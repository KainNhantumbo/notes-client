import Loader from './components/Loader';
import { JSX, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ResetPasswordSuccess = lazy(
  () => import('./routes/auth/password-recovery-success')
);
const PasswordRecovery = lazy(() => import('./routes/auth/password-recovery'));
const Home = lazy(() => import('./routes/index'));
const SignIn = lazy(() => import('./routes/auth/signin'));
const SignUp = lazy(() => import('./routes/auth/signup'));
const UpdatePassword = lazy(() => import('./routes/auth/update-password'));
const SignupSuccess = lazy(() => import('./routes/auth/signup-success'));
const Settings = lazy(() => import('./routes/workspace/settings'));
const NoteEditor = lazy(() => import('./routes/workspace/note-editor'));
const PrivacyPolicy = lazy(() => import('./routes/docs/privacy-policy'));
const NotFoundError = lazy(() => import('./routes/404'));
const Workspace = lazy(() => import('./routes/workspace'));

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
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<Loader />}>
              <route.element />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
}
