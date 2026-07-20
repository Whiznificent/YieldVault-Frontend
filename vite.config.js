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
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: ['test/lib/**', 'node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
