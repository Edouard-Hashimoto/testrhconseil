// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    tursoUrl: process.env.TURSO_DATABASE_URL,
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  nitro: {
    preset: 'netlify',
    rollupConfig: {
      external: ['@prisma/client', '.prisma/client']
    }
  },

  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': path.resolve('./node_modules/.prisma/client/index-browser.js')
      }
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'RH Conseil 71',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/sigle.png' }
      ]
    }
  }
})
