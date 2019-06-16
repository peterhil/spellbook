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
import { disconnectionHandler } from '../lib/messaging'

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')
var messages = riot.observable()

const messageHandler = function (message) {
  console.debug('[popup] Got message:', message.type, message)

  switch (message.type) {
  case 'currentTabInfo':
    console.log('[popup] Current tab info:', message.data)
    messages.trigger(message.type, message.data)
    break
  default:
    console.warn('Unhandled message type:', message.type)
  }
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
  domStream.offValue(onLoad)
  window.removeEventListener('beforeunload', onUnload)
}

domStream.onValue(onLoad)

// Cleanup
//
// Note! This prevents browsers from using in-memory page navigation caches,
// see: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener('beforeunload', onUnload)
