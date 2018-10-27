// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome, document, window */

import riot from 'riot'
import Kefir from 'kefir'

import './popup.sass'
import './sp-popup.tag'
import { choice } from '../lib/pure'
import { disconnectionHandler, unhandledMessage } from '../lib/messaging'

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')
var messages = riot.observable()

const messageHandler = function (response) {
  console.debug('Popup got message:', response.type, response.data, response)

  const action = choice(response.type, {
    currentTabInfo: () => {
      console.debug('messageHandler: Current tab changed', response.data)
      messages.trigger(response.type, response.data)
    },
    default: unhandledMessage,
  })

  action(response)
}

function onPopup (event) {
  riot.mount('sp-popup', { messages })

  const port = chrome.runtime.connect({ name: 'popup' })
  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'popupOpen' })

  // Receive messages
  port.onMessage.addListener(messageHandler)

  return true
}

domStream.onValue(onPopup)
  .log()

// Cleanup

function onUnload (event) {
  domStream.offValue(onPopup)
  window.removeEventListener('beforeunload', onUnload)
}

// Note! This prevents browsers from using in-memory page navigation caches,
// see: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener('beforeunload', onUnload)
