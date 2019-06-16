// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import riot from 'riot'

import './directory.sass'
import './sp-directory.tag'
import { disconnectionHandler } from '../lib/messaging'

var messages = riot.observable()

const messageHandler = function (message) {
  console.debug('[directory] Got message:', message.type, message)

  switch (message.type) {
  case 'allBookmarksTree':
    console.log('[directory] All bookmarks tree:', message.data)
    messages.trigger(message.type, message.data)
    break
  default:
    console.warn('Unhandled message type:', message.type)
  }
}

function onLoad (event) {
  const port = chrome.runtime.connect({ name: 'directory' })

  port.onMessage.addListener(messageHandler)
  port.onDisconnect.addListener(disconnectionHandler)
  port.postMessage({ type: 'getAllBookmarks' })
}

riot.mount('sp-directory', { messages })

document.addEventListener('DOMContentLoaded', onLoad)
