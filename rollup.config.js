// Rollup config

import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-cpy'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import riot from 'rollup-plugin-riot'
import { eslint } from 'rollup-plugin-eslint'

const outputFormat = 'iife'
const plugins = [
  riot({
    compact: true,
    esm: true,
    style: 'css',
    parsers: {
      css: { postcss }
    },
  }),
  resolve({
    browser: true,  // default: false
    modulesOnly: true,  // default: false
    customResolveOptions: {
        moduleDirectory: './node_modules/',
    },
  }),
  eslint({
    exclude: [
      'src/**/*.{css,sass}',
    ]
  }),
  postcss({
    extensions: ['css', 'sass'],
  }),
  commonjs(),
  buble({
    target: {
      chrome: 52,
      firefox: 56,
    },
    transforms: {
      asyncAwait: false,
      modules: true,
    },
    objectAssign: 'Object.assign',
  }),
]

const copyOptions = {
  cwd: 'src',
  parents: true,
  verbose: true,
}

const pluginsWithcopy = plugins.concat([
  copy([
    { files: 'node_modules/fkit/dist/fkit.min.js', dest: 'dist/external' },
    { files: 'node_modules/kefir/dist/kefir.js', dest: 'dist/external' },
    { files: 'node_modules/riot/riot+compiler.js', dest: 'dist/external' },
    { files: 'node_modules/spectre.css/dist/spectre-icons.css', dest: 'dist/external/spectre' },
    { files: 'node_modules/spectre.css/dist/spectre.css', dest: 'dist/external/spectre' },
    { files: 'node_modules/zepto/dist/zepto.js', dest: 'dist/external' },
    { files: 'node_modules/zepto/src/detect.js', dest: 'dist/external/zepto' },
  ], copyOptions),
  copy({
    files: [
      '_locales/**/*.json',
      'asset/spellbook_icon*.png',
      'asset/spellbook-bg.jpg',
      'background/background.html',
      'bookmarks/directory.html',
      'manifest.json',
      'popup/popup.html',
    ],
    dest: '../dist',
    options: copyOptions,
  }),
])


export default [
  {
    input: { popup: 'src/popup/popup.js' },
    output: {
      dir: 'dist/popup',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'kefir': 'Kefir',
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
      'kefir',
      'riot',
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: { directory: 'src/bookmarks/directory.js' },
    output: {
      dir: 'dist/bookmarks',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'kefir': 'Kefir',
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
      'kefir',
      'riot',
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: { background: 'src/background/background.js' },
    output: {
      dir: 'dist/background',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'fkit': 'F',
        'kefir': 'Kefir',
        'zepto': '$',
      },
    },
    external: [
      'fkit',
      'kefir',
      'zepto',
    ],
    plugins: pluginsWithcopy
  }
]
