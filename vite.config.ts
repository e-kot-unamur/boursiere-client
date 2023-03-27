import { resolve } from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        order: resolve(__dirname, 'order.html'),
        admin: resolve(__dirname, 'admin.html'),
        entries: resolve(__dirname, 'entries.html'),
      },
    },
  },
})
