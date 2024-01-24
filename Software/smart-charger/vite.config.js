import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.js', 'src/**/*.jsx'],
    }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: '',
    minify: 'terser',
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})
