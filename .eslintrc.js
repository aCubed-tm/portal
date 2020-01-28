module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'template-curly-spacing': 'off',
    indent: 'off',
    'linebreak-style': 0,
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
