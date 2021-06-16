import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import preprocess from 'svelte-preprocess'
import sass from 'rollup-plugin-sass'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH
const verbose = true
const minify = false
const sourcemap = (production ? false : 'inline')
const format = 'es'

const outputDir = (dir = '') => {
    return path.join(__dirname, (production ? 'dist/' : 'dev/'), dir)
}

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
            dev: !production,
        },
        preprocess: preprocess({
            style: sass(),
        }),
    }),

    sass(),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({
        output: 'component.css',
    }),

    // Convert CommonJS libraries to ES6
    resolve({
        browser: true, // default: false
        modulesOnly: false, // default: false
        dedupe: ['svelte'],
        moduleDirectories: [
            './node_modules/'
        ],
        preferBuiltins: false,
    }),
    commonjs(),

    // Minify on production
    minify && terser(),
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
        input: 'src/style/directory.scss',
        output: {
            dir: outputDir('style'),
            name: 'directory.scss',
            format,
        },
        plugins: [
            sass({
                output: outputDir('style/directory.css'),
            })
        ],
        watch,
    },
    {
        input: {
            background: 'src/js/background/index.js',
            directory: 'src/js/directory.js',
            popup: 'src/js/popup.js',
        },
        output: {
            dir: outputDir('js'),
            entryFileNames: '[name].js',
            format,
            manualChunks: {
                api: ['./src/js/api/categories.js', './src/js/api/tabs.js'],
                'ext/events': ['events'],
                'ext/kefir': ['kefir'],
                'ext/rambda': ['rambda'],
                'ext/svelte': ['svelte', 'svelte/store'],
                'ext/zepto-detect': ['zepto-detect'],
            },
            sourcemap,
        },
        plugins: plugins.concat([
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
                        'src/manifest.json',
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
        ]),
        watch,
    },
]
