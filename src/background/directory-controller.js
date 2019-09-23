// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Kefir from 'kefir'
import {
  getTree,
} from '../platform/common/bookmarks'
import { choice } from '../lib/pure'

var bookmarks = []

const allBookmarksTree$ = Kefir.fromPromise(getTree())

const onBookmarksUpdated = function (updatedBookmarks) {
  bookmarks = updatedBookmarks
}

export const directoryController = {
  action: function (message, port) {
    const action = choice(message.type, {
      getAllBookmarks: (_, port) => {
        port.postMessage({ type: 'allBookmarksTree', data: bookmarks })
      },
      default: (message, port) => {
        console.error('Unhandled message:', message)
        port.disconnect()
      }
    })

    action(message, port)
  }
}

allBookmarksTree$
  .spy('allBookmarksTree$')
  .observe(onBookmarksUpdated, console.error)
