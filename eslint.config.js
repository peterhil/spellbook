import globals from 'globals'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'
import svelte from 'eslint-plugin-svelte'

import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
    includeIgnoreFile(gitignorePath),
    // importPlugin.flatConfigs.recommended,
    js.configs.recommended,
    pluginPromise.configs['flat/recommended'],
    ...svelte.configs['flat/recommended'],
    {
        languageOptions: {
	        globals: {
	            ...globals.browser,
	            ...globals.node
	        }
	    },
        rules: {
            'brace-style': ['error', 'stroustrup', {
                allowSingleLine: true,
            }],
            'comma-dangle': ['off', 'always'],
        },
    }
]
