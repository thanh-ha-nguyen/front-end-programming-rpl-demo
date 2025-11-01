import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/front-end-programming-rpl-demo/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
