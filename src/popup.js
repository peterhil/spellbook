// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome, document, window */

import riot from 'riot'
import Kefir from 'kefir'

import './popup.sass'
import './tags/app.tag'
import { disconnectionHandler } from './lib/messaging'

const domStream = Kefir.fromEvents(document, 'DOMContentLoaded')

const messageHandler = function (response) {
  console.log('Got message:', response)

  switch (response.type) {
  case 'current-tab-info':
    // Update the form
    console.log('Message: Current tab changed')
    break
  case 'bookmark-exists':
    // Update the icon showing the status for current url
    console.log('Message: Bookmark exists')
    break
  default:
    console.warn('Unhandled message:', response)
  }
}

function onPopup (event) {
  riot.mount('app')

  const port = chrome.runtime.connect({ name: 'popup' })
  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'popup-opened' })

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
