// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import Directory from './components/Directory.svelte'
import events from './lib/events'
import { disconnectionHandler, messageBridge } from './lib/messaging'

function onLoad (event) {
    const port = browser.runtime.connect({ name: 'directory' })

    // Receive messages and handle disconnect
    port.onMessage.addListener(messageBridge)
    port.onDisconnect.addListener(disconnectionHandler)

    // Send a message
    // port.postMessage({ type: 'getAllBookmarks' })

    new Directory({ // eslint-disable-line no-new
        target: document.getElementById('directory'),
        props: {},
    })
}

events.add(document, 'DOMContentLoaded', onLoad)
