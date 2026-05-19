import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress benign sandbox-specific WebSocket and HMR errors
const SUPPRESS_PATTERNS = [
  'websocket',
  'failed to connect',
  'closed without opened',
  'sockjs-node',
  'connection closed',
  'connection refused',
  'vite-hmr'
];

const shouldSuppress = (msg) => {
  if (!msg) return false;
  const lowerMsg = String(msg).toLowerCase();
  return SUPPRESS_PATTERNS.some(pattern => lowerMsg.includes(pattern));
};

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const message = reason?.message || String(reason || '');
  if (shouldSuppress(message)) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

window.addEventListener('error', (event) => {
  if (shouldSuppress(event.message) || shouldSuppress(event.error?.message)) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

// Patch console to hide these warnings/errors from the user's view
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && shouldSuppress(args[0])) return;
  originalWarn.apply(console, args);
};

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && shouldSuppress(args[0])) return;
  originalError.apply(console, args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
