# vite2+vue3+ts

# 工程创建

命令行：

> yarn create @vite/app

选择 vue-ts 模板

# 支持的浏览器版本

```json
// .browserslistsrc

> 0.25%
not dead
not IE 11
```

# 浏览器兼容

vite 默认只支持原生支持 ESM 的现代浏览器，可以通过官方的 [@vitejs/plugin-legacy](https://link.zhihu.com/?target=https%3A//github.com/vitejs/vite/tree/main/packages/plugin-legacy) 来支持旧浏览器。

## 安装 babel-env

命令行：

> yarn add @babel/preset-env --dev

新建 babel 的配置文件`babel.config.json`

```json
// babel.config.json

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

```ts
import legacy from '@vitejs/plugin-legacy'

export default {
  // legacy默认兼容.browserslistsrc的配置
  plugins: [legacy()]
}
```

# vite preview

vite 打包后的文件，默认使用的`import`，直接在浏览器打开`index.html`，浏览器会将 import 解析为 http 请求，控制台一对报错。

vite 通过`vite preview`启动一个 web 服务，可以在浏览器中预览打包后的页面。

# 代码风格

使用 eslint、prettier 对代码进行约束依赖包：

- `eslint`：代码质量检测（用`var`还是`let`，用`==`还是`===`...）
- `prettier`：代码风格检测（加不加尾逗号，单引号还是双引号...）
- `eslint-config-prettier`：解决 ESLint 与 Prettier 的风格冲突
- `eslint-plugin-prettier`：ESLint 的插件，集成 Prettier 的功能
- `eslint-plugin-vue`：ESLint 的插件，增加 Vue 的检测能力

> yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue -D
