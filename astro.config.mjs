import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react(), mdx(), image()],
  vite: {
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [`@use "src/styles/variables.scss" as *; \
            @use "src/styles/common.scss" as *;`]
        }
      }
    }
  }
});