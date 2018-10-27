// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { choice } from '../lib/pure'
import { closedTab$, closedWindow$, currentTab$ } from '../platform/chrome/tabs'
import { disconnectionHandler, sendMessage, unhandledMessage } from '../lib/messaging'

var currentPage = {
  title: '',
  url: '',
  favIconUrl: '',
  category: '',
}

const messageHandler = function(port) {
  return function messageHandlerWithPort (response) {
    console.assert(port.name === 'popup')  // Handle differently?
    console.log('Connected with:', port.name)
    console.debug('Background got message:', response.type, response.data, response)

    const action = choice(response.type, {
      popupOpen: () => sendMessage(port, 'currentTabInfo', currentPage),
      default: unhandledMessage,
    })

    action(response)
  }
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(messageHandler(port))
  port.onDisconnect.addListener(disconnectionHandler)
})

function onValue (tab) {
  currentPage = {
    ...tab
  }
}

closedWindow$.log('closedWindow$')
closedTab$.log('closedTab$')
currentTab$
  .spy('currentTab$')
  .observe(onValue, console.error)
