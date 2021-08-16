import { BuildOptions, CSSOptions, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
// import checker from 'vite-plugin-checker';
import legacy from 'vite-plugin-legacy';
import styleImport from 'vite-plugin-style-import';
import viteCompression from 'vite-plugin-compression';

/**
 * 基础配置
 *
 * @returns
 */
export function useBasic(): UserConfigExport {
  return {
    root: process.cwd(), // default
    base: './',
    publicDir: 'public', // default
    cacheDir: 'node_modules/.vite', // default
    // 定义全局常量替换方式
    define: {},
    envDir: './env', // 环境变量的存储路径
    logLevel: 'info', // default
    clearScreen: false, // 默认值为true。调试时设置为false，可以看到更多信息
  };
}

/**
 * CSS
 *
 * @returns
 */
export function useCss(): CSSOptions {
  return {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/style/index.scss";`,
      },
    },
  };
}

/**
 * 插件列表
 *
 * @returns
 */
export function usePlugins() {
  return [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
    legacy(),
    // TODO build.ourDir使用绝对路径时有问题，待持续关注修复状态
    // https://github.com/anncwb/vite-plugin-compression/issues/6
    // https://www.npmjs.com/package/vite-plugin-compression
    viteCompression(),
    // checker({ typescript: true }),
  ];
}

/**
 * 构建配置
 *
 * @param floder
 * @returns
 */
export function useBuild(floder: string): BuildOptions {
  return {
    // TODO  配置为绝对路径时，vite-plugin-compression插件存在问题
    // https://github.com/anncwb/vite-plugin-compression/issues/6
    // outDir: path.resolve(__dirname, '..', 'dist', floder), // default
    outDir: `./../../dist/${floder}`,
    assetsDir: 'static',
    emptyOutDir: false,
    target: 'esnext', // default
    cssCodeSplit: true, // default
    sourcemap: false, // default
    // 最小化混淆。terser速度慢、文件体积小；esbuild速度快、文件体积大
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        // 去除打印
        drop_console: true,
      },
    },
    // 设置为false，提高构建性能
    brotliSize: false,
    // chunk 大小警告的限制（以 kbs 为单位）。
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          libs: ['weblibext'],
          axios: ['axios', 'axios-business'],
          'element-plus': ['element-plus'],
        },
      },
    },
  };
}
