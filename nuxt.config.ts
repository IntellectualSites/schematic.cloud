export default defineNuxtConfig({
  css: ['~/assets/style/global.scss'],
  build: {
    analyze: true,
  },
  ssr: true,
  router: {
    options: {
      hashMode: false,
    },
  },
  vite: {
    // silence bootstrap deprecation warnings on build (https://github.com/twbs/bootstrap/issues/40962)
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['color-functions', 'global-builtin', 'import', "if-function"]
        }
      }
    }
  }
})
