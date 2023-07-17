import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import eslint from '@rollup/plugin-eslint'
import execute from 'rollup-plugin-execute'
import resolve from '@rollup/plugin-node-resolve'
import preprocess from 'svelte-preprocess'
import sass from 'rollup-plugin-sass'
import svelte from 'rollup-plugin-svelte'

import { isDev, outputDir, rel, target, urlPath } from './utils.config.mjs'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const verbose = true

const plugins = [
    eslint({
        exclude: [
            'src/**/*.{css,sass}',
        ]
    }),

    svelte({
        emitCss: true,
        compilerOptions: {
            // enable run-time checks when not in production
            dev: isDev,
        },
        preprocess: preprocess({
            style: sass(),
        }),
    }),

    sass(),

    // Convert CommonJS libraries to ES6
    resolve({
        browser: true, // default: false
        modulesOnly: false, // default: false
        dedupe: ['svelte'],
        modulePaths: [
            './node_modules/'
        ],
        preferBuiltins: false,
    }),
    commonjs(),
]

const copyAssets = [
    execute([
        `TARGET=${target} ./bin/generateManifest.js`,
    ]),
    copy({
        targets: [{
            src: [
                'src/**/*.html',
            ],
            dest: outputDir('views'),
        }],
        flatten: true,
        verbose,
    }),
    copy({
        targets: [{
            src: [
                'src/_locales/**/*.json',
                'src/img/spellbook-bg.jpg',
                'src/img/spellbook_icon*.png',
            ],
            dest: outputDir(),
        }],
        flatten: false,
        verbose,
    }),
    copy({
        targets: [{
            src: [
                'node_modules/spectre.css/dist/spectre-icons.css',
                'node_modules/spectre.css/dist/spectre.css',
            ],
            dest: outputDir('style'),
        }],
        flatten: true,
        verbose,
    }),
]

const watch = {
    chokidar: true,
    clearScreen: true,
    exclude: ['node_modules/**'],
    include: ['src/**/*'],
}

export default [
    {
        input: 'src/style/popup.scss',
        output: {
            dir: outputDir('style'),
            name: 'popup.scss',
            format,
        },
        plugins: [
            sass({
                output: outputDir('style/popup.css'),
            })
        ],
        watch,
    },
    {
        input: {
            background: 'src/js/background/index.js',
            popup: 'src/js/popup.js',
            serviceWorker: 'src/js/background/worker.js',
        },
        output: {
            dir: outputDir('js'),
            entryFileNames: '[name].js',
            format,
            manualChunks: {
                api: ['./src/js/api/categories.js', './src/js/api/tabs.js'],
                icons: ['./src/js/lib/icons.js'],
                'ext/events': ['events'],
                'ext/kefir': ['kefir'],
                'ext/rambda': ['rambda'],
                'ext/svelte': ['svelte', 'svelte/store'],
                'ext/webextension-polyfill': ['webextension-polyfill'],
                'ext/zepto-detect': ['zepto-detect'],
            },
            sourcemap,
        },
        plugins: plugins.concat(copyAssets),
        watch,
    }
]
