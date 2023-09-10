import './styles/global.css';
import React from 'react';
import { AppRouter } from './AppRouter';
import ReactDOM from 'react-dom/client';
import { AppContext } from './context/AppContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppContext>
        <AppRouter />
      </AppContext>
    </Router>
  </React.StrictMode>
);
