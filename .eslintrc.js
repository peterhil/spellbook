module.exports = {
  'extends': 'standard',

  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      impliedstrict: true,
    }
  },

  env: {
    es6: true,
    browser: true,
  },

  plugins: [
    'riot',
  ],

  overrides: [
    {
      files: ['**/*.tag'],
      excludedFiles: [],
      rules: {
        indent: ['off', 'always'],
      }
    }
  ],

  rules: {
    'comma-dangle': ['off', 'always'],
    'no-console': ['off', 'always'],
  },
}
