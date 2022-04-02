module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier', 'cypress'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  settings: {
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2018,
    },
  },
};
