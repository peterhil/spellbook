// Setup browser environment
require('raf').polyfill()
require('browser-env')()
const hooks = require('require-extension-hooks')
const svelte = require('svelte/compiler')

// Setup Svelte files to be processed by `require-extension-hooks-svelte`
hooks('svelte').push(({ content, filename }) => {
    const result = svelte.compile(content, {
        filename,
        dev: true,
        css: false,
    })
    return {
        filename,
        content: result.js.code,
        sourceMap: result.js.map,
    }
})

// Setup Svelte and js files to be processed by `require-extension-hooks-babel`
hooks(['svelte', 'js']).exclude(({ filename }) => filename.match(/\/node_modules\//)).plugin('babel').push()
