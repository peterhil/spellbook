import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-cpy'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import svelte from 'rollup-plugin-svelte';
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH;
const outputDir = (dir = '') => { return (production ? 'dist/' : 'dev/') + dir }
const outputFormat = 'iife'
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
      css.write(outputDir('spellbook.css'));
    }
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
      dir: outputDir('popup'),
      format: outputFormat,
      sourcemap: !production,
      globals: {
        'zepto': '$',
      },
    },
    external: [
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: { directory: 'src/directory/directory.js' },
    output: {
      dir: outputDir('directory'),
      name: 'directory',
      format: outputFormat,
      sourcemap: !production,
      globals: {
        'zepto': '$',
      },
    },
    external: [
      'zepto',
    ],
    plugins: plugins
  },
  {
    input: { background: 'src/background/background.js' },
    output: {
      dir: outputDir('background'),
      format: outputFormat,
      sourcemap: !production,
      globals: {
        'zepto': '$',
      },
    },
    external: [
      'zepto',
    ],
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
        dest: '../' + outputDir(),
        options: {
          cwd: 'src',
          parents: true,
          verbose: true,
        },
      }),
      copy({
        files: [
          'node_modules/spectre.css/dist/spectre-icons.css',
          'node_modules/spectre.css/dist/spectre.css',
          'node_modules/zepto/dist/zepto.js',
          'node_modules/zepto/src/detect.js',
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
      chokidar: false,
      clearScreen: true,
      exclude: ['node_modules/**'],
      include: ['src/**/*'],
    },
  },
]
