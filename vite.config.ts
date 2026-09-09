import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so GitHub project Pages and local preview both resolve assets.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        natgas: resolve(__dirname, 'natgas/index.html'),
        gold: resolve(__dirname, 'gold/index.html'),
        copper: resolve(__dirname, 'copper/index.html'),
        wti: resolve(__dirname, 'wti/index.html'),
        brent: resolve(__dirname, 'brent/index.html'),
      },
    },
  },
})
