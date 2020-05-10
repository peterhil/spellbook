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
      },
      files: ['*spec.js'],
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],

  rules: {
    'comma-dangle': ['off', 'always'],
    'no-console': ['off', 'always'],
  },
}
