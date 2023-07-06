import manifest from './manifest.json'
import pkg from '../package.json'

const action = {
    default_icon: 'img/spellbook_icon.png',
    default_popup: 'views/popup.html',
}

const firefox = {
    manifest_version: 2,
    browser_action: action,
    background: {
        persistent: true,
        page: 'views/background.html',
    },
}

const chrome = {
    manifest_version: 3,
    action,
    background: {
        service_worker: 'serviceWorker.js',
        type: 'module',
    },
}

export function getManifest (target) {
    const platform = (target === 'firefox' ? firefox : chrome)
    return {
        ...manifest,
        author: pkg.author,
        version: pkg.version,
        ...platform,
    }
}
