module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    node: true,
    'jest/globals': true
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['README.md'],
  rules: {
    'space-before-function-paren': ['error', 'never']
  }
}
