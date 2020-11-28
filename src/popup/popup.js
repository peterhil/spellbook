// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global window */

import Popup from '../components/Popup.svelte'
import { domLoaded$ } from '../lib/events'
import { disconnectionHandler, messageBridge } from '../lib/messaging'

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
  port.onMessage.addListener(messageBridge)

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
