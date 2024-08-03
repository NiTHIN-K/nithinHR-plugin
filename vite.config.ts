import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: {
      origin: '*', // Allows any origin. Specify your allowed origin in production.
      methods: ['GET', 'POST'], // Specify allowed HTTP methods.
    },
  },
});