import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Gewünschter Port
    host: true, // Optional: Zugriff von anderen Geräten im Netzwerk
    allowedHosts: ['https://focus-researcher-conditioning-brook.trycloudflare.com']
  },
})
