import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'app'),
  resolve: {
    alias: {
      '@': resolve(__dirname, './app/src'),
      '~content': resolve(__dirname, './content'),
    },
  },
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
})

