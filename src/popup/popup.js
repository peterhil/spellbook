// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome, window */

import Popup from '../components/Popup.svelte'
import { domLoaded$ } from '../lib/events'
import { choice } from '../lib/pure'
import { disconnectionHandler, messages, unhandledMessage } from '../lib/messaging'

const messageHandler = function (message) {
  const action = choice(message.type, {
    bookmarkStatus: () => {
      console.log('[popup] Bookmark status:', message.data)
      messages.emit(message.type, message.data)
    },
    currentTabInfo: () => {
      console.log('[popup] Current tab info:', message.data)
      messages.emit(message.type, message.data)
    },
    recentCategories: () => {
      console.log('[popup] Recent categories:', message.data)
      messages.emit(message.type, message.data)
    },
    default: unhandledMessage,
  })

  action(message)
}

function onLoad (event) {
  const port = chrome.runtime.connect({ name: 'popup' })

  new Popup({ // eslint-disable-line no-new
    target: document.getElementById('popup'),
    props: {},
  })

  chrome.browserAction.setBadgeBackgroundColor({ color: '#5755d9' })

  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'getCurrentTab' })
  port.postMessage({ type: 'getRecentCategories' })
  port.postMessage({ type: 'getBookmarkStatus' })

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
