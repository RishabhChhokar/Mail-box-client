import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  test: {
    setupFiles: ["vitest-localstorage-mock"],
    mockReset: false,
    environment: "jsdom",
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
