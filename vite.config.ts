import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', '@radix-ui/react-slot'],
    exclude: [],
    esbuildOptions: {
      target: 'esnext',
    }
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      timeout: 30000,
      overlay: true,
      protocol: 'ws',
      clientPort: 5173
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  }
});