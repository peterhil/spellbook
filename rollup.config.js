import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import preprocess from 'svelte-preprocess'
import sass from 'rollup-plugin-sass'
import svelte from 'rollup-plugin-svelte'
// import { terser } from 'rollup-plugin-terser'

import { isDev, outputDir, rel, urlPath } from './utils.config'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const verbose = true

const plugins = [
    eslint({
        exclude: [
            'src/**/*.{css,sass}',
        ]
    }),

    // svelte({
    //     emitCss: true,
    //     compilerOptions: {
    //         // enable run-time checks when not in production
    //         dev: isDev,
    //     },
    //     preprocess: preprocess({
    //         style: sass(),
    //     }),
    // }),

    sass(),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    // css({
    //     output: 'component.css',
    // }),

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
    // copy({
    //     targets: [{
    //         src: [
    //             'src/**/*.html',
    //         ],
    //         dest: outputDir('views'),
    //     }],
    //     flatten: true,
    //     verbose,
    // }),
    copy({
        targets: [{
            src: [
                'src/_locales/**/*.json',
                'src/img/spellbook-bg.jpg',
                'src/img/spellbook_icon*.png',
                // 'src/manifest.json',
            ],
            dest: outputDir(),
        }],
        flatten: false,
        verbose,
    }),
    // copy({
    //     targets: [{
    //         src: [
    //             'node_modules/spectre.css/dist/spectre-icons.css',
    //             'node_modules/spectre.css/dist/spectre.css',
    //         ],
    //         dest: outputDir('style'),
    //     }],
    //     flatten: true,
    //     verbose,
    // }),
]

// const watch = {
//     chokidar: true,
//     clearScreen: true,
//     exclude: ['node_modules/**'],
//     include: ['src/**/*'],
// }

export default {
    input: {
        background: urlPath('./src/views/background.html'),
        directory: urlPath('./src/views/directory.html'),
        popup: urlPath('./src/views/popup.html'),
    },
    output: {
        dir: outputDir(),
        entryFileNames: '[name].js',
        format,
        manualChunks: {
            api: ['./src/js/api/categories.js', './src/js/api/tabs.js'],
            icons: ['./src/js/lib/icons.js'],
            'ext/events': ['events'],
            'ext/kefir': ['kefir'],
            'ext/rambda': ['rambda'],
            'ext/svelte': ['svelte', 'svelte/store'],
            'ext/zepto-detect': ['zepto-detect'],
        },
        sourcemap,
    },
    plugins: copyAssets,
    // plugins: plugins.concat(copyAssets),
    // watch,
}
