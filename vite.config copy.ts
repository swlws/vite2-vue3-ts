import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // root: process.cwd(),
  base: "./",
  // publicDir: "public",
  // cacheDir: "node_modules/.vite",
  define: {},
  plugins: [vue()],
  resolve: {
    alias: {
      "~/**": "./**",
      "@/**": "./src/**",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    cors: true,
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // outDir: "dist",
    // assetsDir: "assets",
    // target: "esnext",
  },
  optimizeDeps: {},
});
