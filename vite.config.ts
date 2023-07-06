import path from 'path'

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import eslint from 'vite-plugin-eslint'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

import rollupOptions from './rollup.config'
import { isDev, outputDir, rel, urlPath } from './utils.config'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const target = process.env.TARGET || 'chrome'

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
        webExtension({
            browser: target,
            manifest: () => {
                // Use `readJsonFile` instead of import/require to avoid caching during rebuild.
                const pkg = readJsonFile(rel('package.json'));
                const template = readJsonFile(rel('src/manifest.json'));
                return {
                    ...template,
                    version: pkg.version,
                };
            },
        }),
    ],
    build: {
        outDir: outputDir(),
        emptyOutDir: false,
        // https://developer.chrome.com/docs/webstore/program-policies/code-readability/
        minify: false,
        rollupOptions,
        sourcemap: isDev ? 'inline' : false,
        watch: isDev ? {} : false,
    },
    resolve: {
        alias: {
            '~': urlPath('./src'),
        },
    },
})
