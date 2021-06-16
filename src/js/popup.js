// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Popup from './components/Popup.svelte'
import { disconnectionHandler, messageBridge, messages } from './lib/messaging'

function onLoad (event) {
    const port = chrome.runtime.connect({ name: 'popup' })

    chrome.browserAction.setBadgeBackgroundColor({ color: '#5755d9' })

    port.onDisconnect.addListener(disconnectionHandler)

    // Send a message
    port.postMessage({ type: 'getRecentCategories' })

    messages.on('api', (request) => {
        // console.debug('[popup] API request:', request)
        port.postMessage(request)
    })

    // Receive messages
    port.onMessage.addListener(messageBridge)

    new Popup({ // eslint-disable-line no-new
        target: document.getElementById('popup'),
        props: {},
    })
}

document.addEventListener('DOMContentLoaded', onLoad)
