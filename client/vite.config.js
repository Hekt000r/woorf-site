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
        target: 'http://localhost:5173', // Dont forget to update this when switching from dev to prod (5172 = prod, 5173 = dev)
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  }
})
