import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress benign sandbox-specific WebSocket errors that do not affect the app's functionality
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && (
    event.reason.message?.includes('WebSocket') || 
    event.reason.message?.includes('websocket')
  )) {
    event.preventDefault();
  }
});

window.addEventListener('error', (event) => {
  if (event.message?.includes('WebSocket') || event.message?.includes('websocket')) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
