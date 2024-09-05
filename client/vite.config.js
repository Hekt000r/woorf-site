import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5172,
    proxy: {
      '/api': {
        target: 'http://localhost:5172', // This should match your backend port
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  }
})
