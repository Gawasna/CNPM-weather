import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import { HashRouter } from 'react-router-dom'; 
import './i18n'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      {/* App will use the i18n instance initialized in ./i18n.js */}
      <App />
    </HashRouter>
  </React.StrictMode>,
);