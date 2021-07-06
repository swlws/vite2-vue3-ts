# vite2+vue3+ts

# 一、工程创建

命令行：

> yarn create @vite/app

选择 vue-ts 模板

# 二、支持的浏览器版本

```json
// .browserslistsrc

> 0.25%
not dead
not IE 11
```

# 三、浏览器兼容

vite 默认只支持原生支持 ESM 的现代浏览器，可以通过官方的 [@vitejs/plugin-legacy](https://link.zhihu.com/?target=https%3A//github.com/vitejs/vite/tree/main/packages/plugin-legacy) 来支持旧浏览器。

## 3.1、babel-env

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

## 3.2、legacy

[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

命令行：

> yarn add @vitejs/plugin-legacy -D

```ts
import legacy from '@vitejs/plugin-legacy';

export default {
  // legacy默认兼容.browserslistsrc的配置
  plugins: [legacy()],
};
```

# 四、代码风格

参考： [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)

使用 eslint、prettier 对代码进行约束依赖包：

- `eslint`：代码质量检测
  - no-unused-vars
  - no-extra-bind
  - no-implicit-globals
  - prefer-promise-reject-errors
- `prettier`：代码风格检测，代码格式的校验、代码格式化。
  - max-len
  - no-mixed-spaces-and-tabs
  - keyword-spacing
  - comma-style
- `vue-eslint-parser`: 解析`<template>`标签和`.vue`文件
- `eslint-plugin-vue`：ESLint 的插件，增加 Vue 的检测能力
- `eslint-plugin-prettier`：ESLint 的插件，集成 Prettier 的功能
- `eslint-config-prettier`：解决 ESLint 与 Prettier 的风格冲突

安装依赖

> yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue -D

**添加`.eslint.js`配置文件**

```js
module.exports = {
  // https://github.com/vuejs/vue-eslint-parser
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/vue3-recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { vueIndentScriptAndStyle: false }],
  },
};
```

eslint 默认的解析器为`[espree](https://github.com/eslint/espree)`，这里修改为`vue-eslint-parser`。`eslint-plugin-vue`依赖`vue-eslint-parser`，这里无需重复安装。

**添加`.prettierrc.js`**

[配置指南](https://www.prettier.cn/docs/options.html)

```js
// .prettierrc.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true, // 末尾分号
  vueIndentScriptAndStyle: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all', // 尾随逗号
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
};
```

# 五、GIT 提交规范

## 5.1、扩展 git 命令

参考：[commitizen Introduction](https://commitizen-tools.github.io/commitizen/)

扩展命令`git cz`，按照规范提交变更。依赖：

- `commitizen`：使用规范化的`message`提交
- `cz-conventional-changelog`：适配器。提供`conventional-changelog`标准（约定式提交标准）。基于不同需求，也可以使用不同适配器（比如: `cz-customizable`）。

安装依赖：

> yarn add commitizen cz-conventional-changelog -D

修改`package.json`

```json
"scripts": {
  "cz": "git cz"
},
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```

此时执行`yarn cz`即可使用 git 的规范提交流程。`commitizen`也可以全局安装，安装完成后可以直接使用`git cz`命令。

## 5.2、检测提交

如果未使用`yarn cz`提交变更，则提交的信息可能不符合规范。此时，使用`commitlint`检测提交的信息。

参考：[commitlint Guide: Local setup](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)

- `commitlint`: 检查`message`是否符合规范
- `lint-staged`：检测文件，只对暂存区中**有改动的文件**进行检测，可以在提交前进行 Lint 操作
- `husky`：触发 Git Hooks,执行脚本

安装依赖：

> yarn add husky lint-staged @commitlint/config-conventional @commitlint/cli -D

创建配置文件`.commitlintrc.js`

```js
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

使用`husky`设置[Git Hooks](https://www.prettier.cn/docs/install.html#git-hooks)

```bash
yarn add husky -D
yarn husky install

npx husky add .husky/pre-commit "yarn lint-staged"
npx husky add .husky/commit-msg "yarn commitlint"
```

修改`package.json`

```json
"scripts": {
    "lint-staged": "lint-staged",
    "commitlint": "commitlint -e -V",
  },
"lint-staged": {
    "src/**/*.{ts,vue,md,json}": [
      "eslint --fix",
      "prettier --write --ignore-unknown"
    ]
  }
```

现在使用 GIT 时，便会前置使用提交规范

# vite preview

vite 打包后的文件，默认使用的`import`，直接在浏览器打开`index.html`，浏览器会将 import 解析为 http 请求，控制台一堆报错。

vite 通过`vite preview`启动一个 web 服务，可以在浏览器中预览打包后的页面。
