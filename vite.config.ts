import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://doc-api-buhwasc4ergabwab.southafricanorth-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
// https://doc-api-buhwasc4ergabwab.southafricanorth-01.azurewebsites.net
// http://localhost:5196