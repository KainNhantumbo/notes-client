import 'rc-dropdown/assets/index.css';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/Loader';
import AppContext from './context/AppContext';
import './styles/global.css';

const AppRouter = React.lazy(() => import('./AppRouter'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <React.Suspense fallback={<Loader />}>
          <AppRouter />
        </React.Suspense>
      </AppContext>
    </Router>
  </React.StrictMode>
);
