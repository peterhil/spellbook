module.exports = {
    extends: 'standard',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2019,
        requireConfigFile: false,
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
                'import/first': ['off', 'always'],
                'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 0 }],
            },
        },
    ],
    globals: {
        browser: 'readonly',
        chrome: 'readonly',
    },
    rules: {
        'brace-style': ['warn', 'stroustrup', { allowSingleLine: true }],
        'comma-dangle': ['off', 'always'],
        indent: ['error', 4],
        'no-console': ['off', 'always'],
        // 'no-console': ['warn', {}],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    },
}
