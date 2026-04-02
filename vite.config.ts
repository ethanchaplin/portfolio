import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import veauryVitePlugins from 'veaury/vite/index.js'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [veauryVitePlugins({
    type: 'vue',
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
