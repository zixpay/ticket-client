import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), pluginRewriteAll(), tsconfigPaths()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app'),
      '@views': resolve(__dirname, './src/views'),
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: false,
  },
})
