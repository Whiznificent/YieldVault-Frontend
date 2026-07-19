import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the YieldVault frontend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    globals: true,
    exclude: ['test/lib/**', 'node_modules/**'],
  },
});
