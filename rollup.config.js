// import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
// import css from 'rollup-plugin-css-only'
// import eslint from '@rollup/plugin-eslint'
// import resolve from '@rollup/plugin-node-resolve'
// import preprocess from 'svelte-preprocess'
// import sass from 'rollup-plugin-sass'
// import svelte from 'rollup-plugin-svelte'
// import { terser } from 'rollup-plugin-terser'

import { isDev, outputDir, rel, urlPath } from './utils.config'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const verbose = true

const copyAssets = [
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
]

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
}
