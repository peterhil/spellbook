// Rollup config

import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-cpy'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'postcss'
import postcssCssnext from 'postcss-cssnext'
import riot from 'rollup-plugin-riot'
import sass from 'rollup-plugin-sass'
import { eslint } from 'rollup-plugin-eslint'

/**
 * Transforms new CSS specs into more compatible CSS
 */
function cssnext (tagName, css) {
  // A small hack: it passes :scope as :root to PostCSS.
  // This make it easy to use css variables inside tags.
  css = css.replace(/:scope/g, ':root')
  css = postcss([postcssCssnext]).process(css).css
  css = css.replace(/:root/g, ':scope')
  return css
}

const outputFormat = 'iife'
const plugins = [
  riot({
    compact: true,
    esm: true,
    style: 'cssnext',
    parsers: {
      css: { cssnext }
    }
  }),
  resolve({
    module: true,  // default: true
    jsnext: true,  // default: false
    main: true,  // default: true
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
  sass({
    // output: true,
    // output: 'popup.css',
    insert: true
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

export default [
  {
    input: 'src/popup/popup.js',
    output: {
      file: 'dist/popup/popup.js',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'fkit': 'F',
        'kefir': 'Kefir',
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
      'fkit',
      'kefir',
      'riot',
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: 'src/bookmarks/directory.js',
    output: {
      file: 'dist/bookmarks/directory.js',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'fkit': 'F',
        'kefir': 'Kefir',
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
      'fkit',
      'kefir',
      'riot',
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: 'src/background/background.js',
    output: {
      file: 'dist/background/background.js',
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
    plugins: plugins.push(
      copy([
        { files: 'node_modules/fkit/dist/fkit.js', dest: 'dist/external' },
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
    )
  }
]
