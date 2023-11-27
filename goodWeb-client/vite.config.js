import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [react()],
  // server: {
  //   port: 3000, // Adjust the port as needed
  // },
})
