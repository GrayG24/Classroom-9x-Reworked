import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress benign sandbox-specific WebSocket errors that do not affect the app's functionality
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const message = (reason?.message || String(reason || '')).toLowerCase();
  
  const isWebsocketError = 
    message.includes('websocket') || 
    message.includes('closed without opened') ||
    message.includes('failed to connect') ||
    message.includes('sockjs-node') ||
    message.includes('connection refused') ||
    message.includes('connection closed') ||
    message.includes('ws://') ||
    message.includes('wss://');

  if (isWebsocketError) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.warn('Suppressed benign WebSocket rejection:', message);
  }
}, true);

window.addEventListener('error', (event) => {
  const message = (event.message || '').toLowerCase();
  
  const isWebsocketError = 
    message.includes('websocket') || 
    message.includes('closed without opened') ||
    message.includes('failed to connect') ||
    message.includes('sockjs-node') ||
    message.includes('connection refused') ||
    message.includes('connection closed') ||
    message.includes('ws://') ||
    message.includes('wss://');

  if (isWebsocketError) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.warn('Suppressed benign WebSocket error:', message);
  }
}, true);

// Pre-emptively handle potential sockjs and vite hmr errors
window.addEventListener('rejectionhandled', (event) => {
  const reason = event.reason;
  const message = (reason?.message || String(reason || '')).toLowerCase();
  if (message.includes('websocket') || message.includes('failed to connect')) {
    event.preventDefault();
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
