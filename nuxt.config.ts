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
})
