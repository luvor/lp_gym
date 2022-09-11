import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@vueuse/nuxt'],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: []
  },
  css: ['~~/assets/css/style.css'],
  typescript: {
    strict: true
  },
  vite: {
    plugins: [eslintPlugin()]
  }
})
