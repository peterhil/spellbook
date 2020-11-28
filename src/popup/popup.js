// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Popup from '../components/Popup.svelte'
import { domLoaded$ } from '../lib/events'
import { disconnectionHandler, messageBridge } from '../lib/messaging'

function onLoad (event) {
  const port = chrome.runtime.connect({ name: 'popup' })

  chrome.browserAction.setBadgeBackgroundColor({ color: '#5755d9' })

  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'getCurrentTab' })
  port.postMessage({ type: 'getRecentCategories' })
  port.postMessage({ type: 'getBookmarkStatus' })

  // Receive messages
  port.onMessage.addListener(messageBridge)

  new Popup({ // eslint-disable-line no-new
    target: document.getElementById('popup'),
    props: {},
  })
}

domLoaded$.onValue(onLoad)
