import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-cpy'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
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
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file — better for performance
    css: css => {
      css.write('spellbook.css')
    }
  }),

  sass({
    output: true,
  }),

  // Convert CommonJS libraries to ES6
  resolve({
    browser: true, // default: false
    modulesOnly: false, // default: false
    dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    customResolveOptions: {
      moduleDirectory: './node_modules/',
    },
    preferBuiltins: false,
  }),
  commonjs(),

  // Minify on production
  minify && terser(),
]

export default [
  {
    input: 'src/popup/popup.sass',
    output: {
      dir: outputDir('popup'),
      name: 'popup.sass',
      format,
    },
    plugins: [
      sass({
        output: outputDir('popup/popup.css'),
      })
    ],
  },
  {
    input: 'src/directory/directory.sass',
    output: {
      dir: outputDir('directory'),
      name: 'directory.sass',
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
        files: [
          '_locales/**/*.json',
          'asset/spellbook_icon*.png',
          'asset/spellbook-bg.jpg',
          'background/background.html',
          'directory/directory.html',
          'manifest.json',
          'popup/popup.html',
        ],
        dest: outputDir(),
        options: {
          cwd: path.join(__dirname, 'src'),
          parents: true,
          verbose: true,
        },
      }),
      copy({
        files: [
          'node_modules/spectre.css/dist/spectre-icons.css',
          'node_modules/spectre.css/dist/spectre.css',
        ],
        dest: outputDir('ext'),
        options: {
          cwd: '.',
          parents: false,
          verbose: true,
        },
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
