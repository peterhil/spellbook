// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { closedTab$, closedWindow$, currentTab$ } from './lib/chrome/tabs'
import { disconnectionHandler } from './lib/messaging'

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

    switch (response.type) {
    case 'popupOpen':
      port.postMessage({ type: 'currentTabInfo', data: currentPage })
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
