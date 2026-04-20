import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    // Copy _redirects to dist folder during build
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Ensure public folder assets are copied
  publicDir: 'public'
})