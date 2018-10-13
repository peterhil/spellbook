// Rollup config

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/popup.js',
  output: {
    file: 'dist/popup.js',
    format: 'esm'
  },
  // experimentalCodeSplitting: true,
  external: [
    'kefir',
  ],
  plugins: [
    babel({
      exclude: [
        'node_modules/**',
        'src/vendor/**',
      ],
      // babelrc: false,
      // presets: [
      //   ['env', { modules: false }]
      // ],
      runtimeHelpers: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/**/*.{css,sass}',
        'src/vendor/**',
      ]
    }),
    resolve({
      module: true,  // default: true
      // jsnext: true,  // default: false
      main: true,  // default: true
      browser: true,  // default: false
      modulesOnly: true,  // default: false
      customResolveOptions: {
        moduleDirectory: 'src/vendor'
      }
    }),
    sass({
      output: true,
      // output: 'popup.css',
      // insert: true
    }),
  ]
}
