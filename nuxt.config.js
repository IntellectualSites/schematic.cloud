export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'SchematicWeb - Upload and Store Schematics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Easily store your NBT Minecraft schematics in the cloud for later use',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [ '~/assets/style/global.scss' ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-clipboard'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],  
  /*
  ** Style Resources
  */
 styleResources: {
   scss: [
     '~/assets/style/colors.scss'
   ]
 },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        }
      ]
    }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Bootstrap Vue configuration
   ** We disable automatic injection so that we
   ** can inject it in our global SCSS file. This
   ** allows us to create our own color scheme vars.
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
       config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
     }

     if (ctx.isDev && ctx.isClient) {
       config.module.rules.push({
         enforce: 'pre',
         test: /\.(js|vue)$/,
         loader: 'eslint-loader',
         exclude: /(node_modules)/,
         options: {
           fix: true
         }
       })
     }
   }
  },
}
