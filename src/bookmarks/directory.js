// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import riot from 'riot'

import './directory.sass'
import './sp-directory.tag'
import { disconnectionHandler, messages, unhandledMessage } from '../lib/messaging'
import { choice } from '../lib/pure'

const messageHandler = function (message) {
  console.debug('[directory] Got message:', message.type, message)

  const action = choice(message.type, {
    allBookmarksTree: () => {
      console.log('[directory] All bookmarks tree:', message.data)
      messages.trigger(message.type, message.data)
    },
    default: unhandledMessage,
  })

  action(message)
}

function onLoad (event) {
  const port = chrome.runtime.connect({ name: 'directory' })

  port.onDisconnect.addListener(disconnectionHandler)

  // Send a message
  port.postMessage({ type: 'getAllBookmarks' })

  // Receive messages
  port.onMessage.addListener(messageHandler)
}

riot.mount('sp-directory')

document.addEventListener('DOMContentLoaded', onLoad)
