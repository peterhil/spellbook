// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Kefir from 'kefir'
import {
  getTree,
} from '../platform/common/bookmarks'

var bookmarks = []

const allBookmarksTree$ = Kefir
  .fromPromise(getTree())

const onBookmarksUpdated = function (updatedBookmarks) {
  bookmarks = updatedBookmarks
}

export const directoryController = {
  action: function (message, port) {
    switch (message.type) {
    case 'getAllBookmarks':
      port.postMessage({ type: 'allBookmarksTree', data: bookmarks })
      break
    default:
      console.error('Unhandled message:', message)
      port.disconnect()
    }
  }
}

allBookmarksTree$
  .spy('allBookmarksTree$')
  .observe(onBookmarksUpdated, console.error)
