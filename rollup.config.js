// Rollup config

import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-cpy'
import sass from 'rollup-plugin-sass'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import riot from 'rollup-plugin-riot'
import svelte from 'rollup-plugin-svelte';
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH;

// Transform new CSS specs into more compatible CSS
function cssnext (tagName, css) {
  // A small hack: it passes :scope as :root to PostCSS.
  // This make it easy to use css variables inside tags.
  css = css.replace(/:scope/g, ':root')
  css = postcss([postcssPresetEnv]).process(css).css
  css = css.replace(/:root/g, ':scope')
  return css
}

const outputFormat = 'iife'
const plugins = [
  riot({
    compact: true,
    esm: true,
    style: 'css',
    parsers: {
      css: { cssnext },
    },
  }),

  svelte({
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file — better for performance
    css: css => {
      css.write('dist/spellbook.css');
    }
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

  // Convert CommonJS libraries to ES6
  resolve({
    browser: true,  // default: false
    modulesOnly: false,  // default: false
    dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    customResolveOptions: {
        moduleDirectory: './node_modules/',
    },
  }),
  commonjs(),

  // Minify on production
  production && terser(),
]

export default [
  {
    input: { popup: 'src/popup/popup.js' },
    output: {
      dir: 'dist/popup',
      format: outputFormat,
      sourcemap: true,
      globals: {
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
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
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
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
        'riot': 'riot',
        'zepto': '$',
      },
    },
    external: [
      'riot',
      'zepto',
    ],
    plugins: plugins.concat([
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
        options: {
          cwd: 'src',
          parents: true,
          verbose: true,
        },
      }),
      copy({
        files: [
          'node_modules/riot/riot+compiler.js',
          'node_modules/spectre.css/dist/spectre-icons.css',
          'node_modules/spectre.css/dist/spectre.css',
          'node_modules/zepto/dist/zepto.js',
          'node_modules/zepto/src/detect.js',
        ],
        dest: 'dist/ext',
        options: {
          cwd: '.',
          parents: false,
          verbose: true,
        },
      }),
    ]),
    watch: {
      clearScreen: false
    },
  },
]
