import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

const rootElement = document.getElementById('app');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}