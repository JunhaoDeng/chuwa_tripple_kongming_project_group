import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import WebLayout from './components/layout';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WebLayout />
    {/* <App /> */}
  </React.StrictMode>,
)
