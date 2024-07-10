// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["shadcn-nuxt","@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxt/icon", "@pinia/nuxt"],

  tailwindcss: {
    // cssPath: "~/assets/css/tailwind.css",
    viewer: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});