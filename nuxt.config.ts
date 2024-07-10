// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt-snackbar"],
  snackbar: {
    top: true,
    right: true,
    duration: 2000,
  },

  runtimeConfig: {
    dburl: process.env.MONGO_DB_URL,
    token: process.env.JWT_SECRET,

    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
});
