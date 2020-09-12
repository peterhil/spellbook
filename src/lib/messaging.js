// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import EventEmitter from 'events'
import { curry } from 'fkit'

export const messages = new EventEmitter()

export function disconnectionHandler (port) {
  if (chrome.runtime.lastError) {
    console.error('Connection error:', chrome.runtime.lastError)
    return
  }

  if (port) {
    console.log('Disconnected:', port.name)
  } else {
    console.log('Other end disconnected - wonder why?')
  }
}

export const sendMessage = curry((port, type, data) => {
  port.postMessage({ type, data })
})

export const unhandledMessage = (message) => {
  console.warn('Unhandled message:', message)
}

export function messageServer (controllers) {
  return function messageDispatcher (message, port) {
    console.debug('[background] Message from', port.name + ':', message.type, message)
    const controller = controllers[port.name]

    if (controller) {
      controller.action(message, port)
    } else {
      notFound(port)
    }
  }
}

function notFound (port) {
  console.error('Unknown port:', port.name)
  port.disconnect()
}
