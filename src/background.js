// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { closedTab$, currentTab$ } from './lib/chrome/tabs'
import { disconnectionHandler } from './lib/messaging'

closedTab$.log('closedTab$')
currentTab$.log('currentTab$')

const messageHandler = function(port) {
  return function messageHandlerWithPort (response) {
    console.assert(port.name === 'popup')  // Handle differently?
    console.log('Connected with:', port.name)
    console.debug('Got message:', response)

    switch (response.type) {
    case 'popup-opened':
      // Get current tab info and send it:
      port.postMessage({ type: 'current-tab-info', data: {} })
    case 'popup-opened':
      // Query bookmarks with the tab info
      port.postMessage({ type: 'bookmark-exists', data: {} })
      break
    default:
      console.warn('Unhandled message:', response)
    }
  }
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(messageHandler(port))
  port.onDisconnect.addListener(disconnectionHandler)
})
