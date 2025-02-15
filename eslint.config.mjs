import svelte3 from 'eslint-plugin-svelte3'
import globals from 'globals'
import babelParser from '@babel/eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [...compat.extends('standard'), {
    plugins: {
        svelte3,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            chrome: 'readonly',
        },

        parser: babelParser,
        ecmaVersion: 2019,
        sourceType: 'module',

        parserOptions: {
            requireConfigFile: false,

            ecmaFeatures: {
                impliedstrict: true,
            },
        },
    },

    rules: {
        'brace-style': ['error', 'stroustrup', {
            allowSingleLine: true,
        }],

        'comma-dangle': ['off', 'always'],
        indent: ['error', 4],
        'no-console': ['off', 'always'],

        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxBOF: 0,
            maxEOF: 0,
        }],
    },
}, {
    files: ['**/*.svelte'],

    rules: {
        'import/first': ['off', 'always'],

        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxBOF: 2,
            maxEOF: 0,
        }],
    },

    processor: 'svelte3/svelte3',
}]
