import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContext from './context/AppContext';
import AppRouter from './AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContext>
      <AppRouter />
    </AppContext>
  </React.StrictMode>
);
