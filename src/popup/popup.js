// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome, window */

import riot from 'riot'
import './popup.sass'
import './sp-popup.tag'
import { domLoaded$ } from '../lib/events'
import { choice } from '../lib/pure'
import { disconnectionHandler, unhandledMessage } from '../lib/messaging'

var messages = riot.observable()

const messageHandler = function (message) {
  console.debug('[popup] Got message:', message.type, message)

  const action = choice(message.type, {
    currentTabInfo: () => {
      console.log('[popup] Current tab info:', message.data)
      messages.trigger(message.type, message.data)
    },
    default: unhandledMessage,
  })

  action(message)
}

function onLoad (event) {
  riot.mount('sp-popup', { messages })

  const port = chrome.runtime.connect({ name: 'popup' })
  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'getCurrentTab' })

  // Receive messages
  port.onMessage.addListener(messageHandler)

  return true
}

function onUnload (event) {
  domLoaded$.offValue(onLoad)
  window.removeEventListener('beforeunload', onUnload)
}

domLoaded$.onValue(onLoad)

// Cleanup
//
// Note! This prevents browsers from using in-memory page navigation caches,
// see: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener('beforeunload', onUnload)
