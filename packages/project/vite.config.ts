import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

const resolvePath = (dir: string) => path.resolve(__dirname, dir);

export default defineConfig({
  root: process.cwd(), // default
  base: './',
  publicDir: 'public', // default
  cacheDir: 'node_modules/.vite', // default
  // 定义全局常量替换方式
  define: {},
  envDir: './env', // 环境变量的存储路径
  logLevel: 'info', // default
  clearScreen: false, // 默认值为true。调试时设置为false，可以看到更多信息
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '..', '..', 'shared'),
      '@': resolvePath('src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/style/index.scss";`,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    cors: true,
    proxy: {
      '/api': {
        target: '192.168.1.2:9999',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, '..', '..', 'dist', 'project'), // default
    assetsDir: 'static',
    target: 'esnext', // default
    cssCodeSplit: true, // default
    sourcemap: false, // default
    // 最小化混淆。terser速度慢、文件体积小；esbuild速度快、文件体积大
    minify: 'terser',
    terserOptions: {},
    // 设置为false，提高构建性能
    brotliSize: false,
    // chunk 大小警告的限制（以 kbs 为单位）。
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {},
});
