module.exports = {
  'extends': 'standard',

  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      impliedstrict: false,
    }
  },

  plugins: [
    'riot',
  ],

  overrides: [
    {
      files: ['*.tag'],
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
