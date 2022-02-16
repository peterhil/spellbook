// lib/messaging.js

// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import EventEmitter from 'events'
import { curry, omit, path } from 'rambda'

export const messages = new EventEmitter()

export const messageBridge = function (message) {
    // console.debug('[message] %s', message.type)
    messages.emit(message.type, message.data)
}

export function disconnectionHandler (port) {
    if (chrome.runtime.lastError) {
        console.error('Connection error:', chrome.runtime.lastError)
        return
    }

    if (port) {
        console.info('Disconnected:', port.name)
    }
    else {
        console.info('Other end disconnected - wonder why?')
    }
}

export const sendMessage = curry((port, type, data) => {
    port.postMessage({ type, data })
})

export function messageServer (controllers) {
    return function messageDispatcher (message, port) {
        const action = path([port.name, message.type], controllers)

        if (action) {
            action(omit(['type'], message), port)
        }
        else {
            notFound(port)
        }
    }
}

function notFound (port) {
    console.error('Unknown port:', port.name)
    port.disconnect()
}
