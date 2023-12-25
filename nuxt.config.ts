export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Blurro",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#F8F7F4" },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@bootstrap-vue-next/nuxt",
  ],
  googleFonts: {
    families: {
      Roboto: [400, 700],
    },
  },
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Blurro",
      description: "Apply gaussian blur to any image",
      theme_color: "#F8F7F4",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
});
