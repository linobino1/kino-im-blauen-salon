/* eslint-env node */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
      alias: {
        // as defined in vite.config.js
        map: [
          ['@', './ui/src'],
        ],
      },
    },
  },
};
