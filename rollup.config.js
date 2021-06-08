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
const minify = production
const sourcemap = !production
const format = 'iife'

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
        output: 'spellbook.css'
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

export default [
    {
        input: 'src/popup/popup.scss',
        output: {
            dir: outputDir('popup'),
            name: 'popup.scss',
            format,
        },
        plugins: [
            sass({
                output: outputDir('popup/popup.css'),
            })
        ],
    },
    {
        input: 'src/directory/directory.scss',
        output: {
            dir: outputDir('directory'),
            name: 'directory.scss',
            format,
        },
        plugins: [
            sass({
                output: outputDir('directory/directory.css'),
            })
        ],
    },
    {
        input: { popup: 'src/popup/popup.js' },
        output: {
            dir: outputDir('popup'),
            format,
            sourcemap,
        },
        plugins,
    },
    {
        input: { directory: 'src/directory/directory.js' },
        output: {
            dir: outputDir('directory'),
            name: 'directory',
            format,
            sourcemap,
        },
        plugins
    },
    {
        input: { background: 'src/background/background.js' },
        output: {
            dir: outputDir('background'),
            format,
            sourcemap,
        },
        plugins: plugins.concat([
            copy({
                targets: [{
                    src: [
                        'src/**/*.html',
                        'src/_locales/**/*.json',
                        'src/asset/spellbook-bg.jpg',
                        'src/asset/spellbook_icon*.png',
                        'src/manifest.json',
                    ],
                    dest: outputDir(),
                }],
                flatten: false,
                verbose: production,
            }),
            copy({
                targets: [{
                    src: [
                        'node_modules/spectre.css/dist/spectre-icons.css',
                        'node_modules/spectre.css/dist/spectre.css',
                    ],
                    dest: outputDir('ext'),
                }],
                flatten: true,
                verbose: production,
            }),
        ]),
        watch: {
            chokidar: true,
            clearScreen: true,
            exclude: ['node_modules/**'],
            include: ['src/**/*'],
        },
    },
]
