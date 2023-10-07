import './styles/global.css';
import 'rc-dropdown/assets/index.css';
import { Suspense } from 'react';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import AppContext from './context/AppContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/Loader';

const AppRouter = lazy(() => import('./AppRouter'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </AppContext>
    </Router>
  </React.StrictMode>
);
