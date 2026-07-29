import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://oou-future-tech.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
