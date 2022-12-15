module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb',
    'standard-with-typescript',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./api/tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': 1,
    indent: ['error', 2],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
