import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    hmr: false, // Explicitly disable HMR to prevent WebSocket connection attempts in the sandbox
    watch: {
      usePolling: true
    }
  }
});
