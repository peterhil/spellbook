// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Popup from './components/Popup.svelte'
import { browser } from 'rosegarden'

import './lib/icons'
import events from './lib/events'
import { disconnectionHandler, messageBridge, messages } from './lib/messaging'

function onLoad (event) {
    const port = browser.runtime.connect({ name: 'popup' })

    // Receive messages and handle disconnect
    port.onMessage.addListener(messageBridge)
    port.onDisconnect.addListener(disconnectionHandler)

    // Send a message
    port.postMessage({ type: 'getRecentCategories' })

    messages.on('api', (request) => {
        // console.debug('[popup] API request:', request)
        port.postMessage(request)
    })

    new Popup({ // eslint-disable-line no-new
        target: document.getElementById('popup'),
        props: {},
    })
}

events.add(document, 'DOMContentLoaded', onLoad)
