import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Add these settings to prevent timeout issues
    hmr: {
      timeout: 5000
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  }
});