// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { disconnectionHandler } from '../lib/messaging'
import { popupController } from './popup-controller'

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
