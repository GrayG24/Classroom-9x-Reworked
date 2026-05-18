import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress benign sandbox-specific WebSocket errors that do not affect the app's functionality
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const message = (reason?.message || String(reason || '')).toLowerCase();
  if (
    message.includes('websocket') || 
    message.includes('closed without opened') ||
    message.includes('failed to connect') ||
    message.includes('sockjs-node')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

window.addEventListener('error', (event) => {
  const message = (event.message || '').toLowerCase();
  if (
    message.includes('websocket') || 
    message.includes('closed without opened') ||
    message.includes('failed to connect') ||
    message.includes('sockjs-node')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
