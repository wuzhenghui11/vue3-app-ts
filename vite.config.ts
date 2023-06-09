import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18nResources from 'vite-plugin-i18n-resources'
// console.log(resolve(__dirname, 'src/i18n/locales'))

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [
    vue(),
    vueJsx(),
    i18nResources({
      path: resolve(__dirname, 'src/i18n/locales')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    manifest: true,
    minify: false
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
