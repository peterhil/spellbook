const action = {
    default_icon: 'img/spellbook_icon.png',
    default_popup: 'views/popup.html',
}

const executeAction = {
    suggested_key: {
        default: "Ctrl+E",
        mac: "MacCtrl+E",
    },
    description: "__MSG_execute_browser_action__",
}

export const firefox = {
    manifest_version: 3,
    action,
    background: {
        page: 'views/background.html',
    },
    commands: {
        _execute_action: executeAction,
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
        _execute_action: executeAction,
    },
}
