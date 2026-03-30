// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    public: {}
  },

  nitro: {
    preset: 'netlify',
  },

  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'RH CONSEIL 71',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
