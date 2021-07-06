module.exports = {
  // https://github.com/vuejs/vue-eslint-parser
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/vue3-recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', { vueIndentScriptAndStyle: false }]
  }
}
