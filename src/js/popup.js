// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import './lib/icons'
import events from './lib/events'
import { messages } from './lib/messaging'

import Popup from './components/Popup.svelte'

function onLoad () {
    messages.on('api', async (request) => {
        const { action } = request
        // console.debug('[popup] API request:', action, request)

        try {
            const response = await browser.runtime.sendMessage(request)
            // console.debug('[popup] API response:', action, response)

            messages.emit(action, response)
        }
        catch (err) {
            console.error(err)
        }
    })

    new Popup({
        target: document.getElementById('popup'),
        props: {},
    })
}

events.add(document, 'DOMContentLoaded', onLoad)
