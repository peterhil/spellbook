import { isDev, outputDir, rel, urlPath } from './utils.config'

const format = 'es'
const sourcemap = (isDev ? 'inline' : false)
const verbose = true

export default {
    input: {
        background: urlPath('./src/views/background.html'),
        directory: urlPath('./src/views/directory.html'),
        popup: urlPath('./src/views/popup.html'),
        serviceWorker: urlPath('./src/js/background/worker.js'),
    },
    output: {
        dir: outputDir(),
        entryFileNames: '[name].js',
        format,
        manualChunks: {
            api: ['./src/js/api/categories.js', './src/js/api/tabs.js'],
            icons: ['./src/js/lib/icons.js'],
            rosegarden: ['rosegarden'],
            'ext/events': ['events'],
            'ext/kefir': ['kefir'],
            'ext/rambda': ['rambda'],
            'ext/svelte': ['svelte', 'svelte/store'],
            'ext/zepto-detect': ['zepto-detect'],
        },
        sourcemap,
    },
}
