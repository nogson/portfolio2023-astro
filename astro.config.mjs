import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  // github pages hosting
  // site: 'https://nogson.github.io/',
  // base: '/portfolio2023-astro',
  integrations: [ 
    react(),
    mdx(),
    image(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            `@use "src/styles/variables.scss" as *; \
            @use "src/styles/common.scss" as *; \
            @use "src/styles/detailPageLayout.scss" as *;`,
          ],
        },
      },
    },
  },
});
