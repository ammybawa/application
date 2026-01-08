import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Listen on all network interfaces
    allowedHosts: [
      'application.com',
      'www.application.com',
      'localhost',
      '127.0.0.1',
      '.application.com' // Allow all subdomains
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'application.com',
      'www.application.com',
      'localhost',
      '127.0.0.1',
      '.application.com'
    ]
  }
})
