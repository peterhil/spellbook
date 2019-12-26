// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { getTree$, bookmarksModified$ } from '../platform/bookmarks'
import { domLoaded$ } from '../lib/events'
import { choice } from '../lib/pure'

var bookmarks = []

const updateBookmarks = function (updatedBookmarks) {
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

domLoaded$
  .flatMapLatest(getTree$)
  .spy('All bookmarks as tree')
  .observe(updateBookmarks, console.error)

bookmarksModified$
  .flatMapLatest(getTree$)
  .spy('Bookmarks modified')
  .observe(updateBookmarks, console.error)
