module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./api/tsconfig.json'],
  },
};
