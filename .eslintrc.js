module.exports = {
  'extends': 'standard',

  parserOptions: {
    ecmaVersion: 2019,
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
    'svelte3',
  ],

  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        "import/first": ['off', 'always'],
        'no-multiple-empty-lines': ['error', {'max': 2}],
      },
    },
  ],

  rules: {
    'comma-dangle': ['off', 'always'],
    'no-console': ['off', 'always'],
    // 'no-console': ['warn', {}],
    'no-multiple-empty-lines': ['error', {'max': 1, 'maxBOF': 0, 'maxEOF': 0}],
  },
}
