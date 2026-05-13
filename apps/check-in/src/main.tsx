import React from 'react';
import ReactDOM from 'react-dom/client';
import '@va/ui-tokens/styles.css';
import '@va/ui-library/theme.scss';
import '@va/ui-library/styles.css';
import { App } from './App';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
