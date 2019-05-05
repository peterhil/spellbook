// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { closedTab$, closedWindow$, currentTab$ } from '../platform/common/tabs'
import { disconnectionHandler } from '../lib/messaging'

var currentTab = {
  title: '',
  url: '',
  favIconUrl: '',
  category: '',
}

function onCurrentTab (tab) {
  currentTab = {
    ...tab
  }
}

const popupController = function (message, port) {
  switch (message.type) {
  case 'getCurrentTab':
    port.postMessage({ type: 'currentTabInfo', data: currentTab })
    break
  default:
    console.error('Unhandled message:', message)
    port.disconnect()
  }
}

const messageServer = function (message, port) {
  console.debug('[background] Message from', port.name + ':', message.type, message)

  switch (port.name) {
  case 'popup':
    popupController(message, port)
    break
  default:
    console.error('Unknown port:', port.name)
    port.disconnect()
  }
}

chrome.runtime.onConnect.addListener(function(port) {
  console.debug('[background] Connected with:', port.name, port.sender)
  port.onMessage.addListener(messageServer)
  port.onDisconnect.addListener(disconnectionHandler)
})

closedWindow$.log('closedWindow$')
closedTab$.log('closedTab$')
currentTab$
  .spy('currentTab$')
  .observe(onCurrentTab, console.error)
