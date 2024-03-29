import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import veauryVitePlugins from 'veaury/vite/index.js'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [veauryVitePlugins({
    type: 'vue',
  })],
});
