import path from 'path'

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import eslint from 'vite-plugin-eslint'
import generateFile from 'vite-plugin-generate-file'

import rollupOptions from './rollup.config'
import { isDev, outputDir, rel, urlPath } from './utils.config'

import { getManifest } from './src/manifest'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const target = process.env.TARGET || 'firefox'

export default defineConfig({
    root: rel('src'),
    plugins: [
        eslint({
            exclude: [
                'src/**/*.{css,sass}',
            ]
        }),
        svelte({
            configFile: rel('svelte.config.js'),
        }),
        generateFile([{
            type: 'json',
            contentType: 'application/json',
            output: './manifest.json',
            data: getManifest(target),
        }]),
    ],
    build: {
        outDir: outputDir(),
        emptyOutDir: false,
        // https://developer.chrome.com/docs/webstore/program-policies/code-readability/
        minify: false,
        rollupOptions,
        sourcemap: isDev ? 'inline' : false,
        // watch: isDev ? {} : false,
    },
    resolve: {
        alias: {
            '~': urlPath('./src'),
        },
    },
})
