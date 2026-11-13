import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/pwa-guia-peconhentost/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "PeçoMed: Guia de Animais Peçonhentos e Venenosos",
        short_name: "PeçoMed",
        description:
          "Identifique animais peçonhentos e venenosos, veja os primeiros socorros e dicas de prevenção, mesmo sem internet.",
        theme_color: "#edf8ee",
        background_color: "#f4faf6",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        lang: "pt-BR",
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
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg,webp,woff2,json}"],
      },
    }),
  ],
});
