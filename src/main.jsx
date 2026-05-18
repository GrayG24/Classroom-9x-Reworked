import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress benign sandbox-specific WebSocket errors that do not affect the app's functionality
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || String(event.reason || '');
  if (
    message.includes('WebSocket') || 
    message.includes('websocket') ||
    message.includes('WebSocket closed without opened') ||
    message.includes('failed to connect to websocket')
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

window.addEventListener('error', (event) => {
  const message = event.message || '';
  if (
    message.includes('WebSocket') || 
    message.includes('websocket') ||
    message.includes('WebSocket closed without opened') ||
    message.includes('failed to connect to websocket')
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
