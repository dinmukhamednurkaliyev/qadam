import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      // Keep this mapping aligned with paths in tsconfig.app.json for builds and editor tooling.
      '@': fileURLToPath(new URL('./source', import.meta.url)),
    },
  },
})
