import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import sveltePreprocess from 'svelte-preprocess'
import styles from 'rollup-plugin-styles'
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
        // enable run-time checks when not in production
        dev: !production,
        preprocess: sveltePreprocess(),
        // we'll extract any component CSS out into
        // a separate file — better for performance
        css: css => {
            css.write('spellbook.css')
        },
    }),

    styles({
        mode: 'extract',
    }),

    // Convert CommonJS libraries to ES6
    resolve({
        browser: true, // default: false
        modulesOnly: false, // default: false
        dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
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
        input: { popup: 'src/popup/popup.js' },
        output: {
            assetFileNames: '[name][extname]',
            dir: outputDir('popup'),
            format,
            sourcemap,
        },
        plugins,
    },
    {
        input: { directory: 'src/directory/directory.js' },
        output: {
            assetFileNames: '[name][extname]',
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
            assetFileNames: '[name][extname]',
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
