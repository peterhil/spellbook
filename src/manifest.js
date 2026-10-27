const action = {
    default_icon: 'img/spellbook_icon.png',
    default_popup: 'views/popup.html',
}

function executeAction (target = 'firefox') {
    const defaultKey = target == 'firefox' ? 'Ctrl+Alt+S' : 'Alt+S'
    return {
        suggested_key: {
            default: defaultKey,
            mac: 'Ctrl+B',
        },
        description: '__MSG_execute_browser_action__',
    }
}

export const firefox = {
    manifest_version: 2,
    browser_action: action,
    background: {
        page: 'views/background.html',
    },
    commands: {
        _execute_browser_action: executeAction('firefox'),
    },
    'browser_specific_settings': {
        'gecko': {
            'id': '{95013b88-3657-4199-b8ae-179f4a92f727}',
            'strict_min_version': '101.0'
        },
    },
}

export const firefoxV3 = {
    manifest_version: 3,
    action,
    background: {
        page: 'views/background.html',
    },
    commands: {
        _execute_action: executeAction('firefox'),
    },
    'browser_specific_settings': {
        'gecko': {
            'id': '{95013b88-3657-4199-b8ae-179f4a92f727}',
            'strict_min_version': '109.0'
        },
    },
}

export const chrome = {
    manifest_version: 3,
    action,
    background: {
        service_worker: 'js/serviceWorker.js',
        type: 'module',
    },
    commands: {
        _execute_action: executeAction('chrome'),
    },
}
