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
    'riot',
    'svelte3',
  ],

  overrides: [
    {
      files: ['**/*.tag'],
      excludedFiles: [],
      rules: {
        indent: ['off', 'always'],
      },
    },
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        "import/first": ['off', 'always'],
      },
    },
  ],

  rules: {
    'comma-dangle': ['off', 'always'],
    'no-console': ['off', 'always'],
  },
}
