export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'socialtrend',
    htmlAttrs: {
      lang: 'th',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.png' },
      { rel: 'stylesheet', href: '/static/fonts/typography.css' },
      { rel: 'stylesheet', href: '/ui/style.css' },
    ],
    script: [
      { src: '/ui/ui.es.js', type: 'module', async: 'true', body: true },
    ],
  },

  mq: {
    defaultBreakpoint: 'desktop',
    breakpoints: {
      mobile: 768,
      tablet: 1100,
      desktop: 1400,
      // desktopWide: 2000,
      // desktopUltraWide: Infinity,
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/index.scss',
    '../../static/fonts/typography.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/element-ui', '~/plugins/axios', '~/plugins/moment'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'nuxt-mq'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  router: {
    base: '/socialtrend/',
  },

  server: {
    port: 3002,
  },

  tailwindcss: {
    cssPath: '../../packages/tailwind/style.css',
    viewer: false,
  },
}
