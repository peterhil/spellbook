// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

'use strict'

import browser from 'webextension-polyfill'

import './lib/icons'
import events from './lib/events'
import { messages } from './lib/messaging'

import Popup from './components/Popup.svelte'
import { mount } from "svelte";

function onLoad () {
    messages.on('api', async (request) => {
        const { action } = request
        // console.group(action)
        // console.debug('[popup] API request:', action, request)
        // console.time('[popup] API')

        try {
            const response = await browser.runtime.sendMessage(request)
            // console.debug('[popup] API response:', action, response)
            // console.timeEnd('[popup] API')
            // console.groupEnd(action)

            messages.emit(action, response)
        }
        catch (err) {
            console.error(err)
        }
    })

    mount(Popup, {
            target: document.getElementById('popup'),
            props: {},
        })
}

events.add(document, 'DOMContentLoaded', onLoad)
