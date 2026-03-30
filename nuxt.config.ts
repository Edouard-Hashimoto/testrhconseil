// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  runtimeConfig: {
    tursoUrl: process.env.TURSO_DATABASE_URL,
    tursoToken: process.env.TURSO_AUTH_TOKEN,
    databaseUrl: process.env.DATABASE_URL,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    public: {}
  },

  nitro: {
    // Force le bundler à utiliser la version web (sans binaires natifs) de @libsql/client
    // Indispensable pour le déploiement sur Netlify/Lambdas
    alias: {
      '@libsql/client': '@libsql/client/web',
    },
    rollupConfig: {
      // Exclure les modules natifs qui ne peuvent pas être bundlisés
      external: ['libsql']
    }
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
