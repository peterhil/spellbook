// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Kefir from 'kefir'
import {
  bookmarkChanged$,
  bookmarkCreated$,
  bookmarkMoved$,
  bookmarkRemoved$,
  bookmarkSearch,
} from '../platform/common/bookmarks'
import { currentTab$ } from '../platform/common/tabs'

var bookmarked = []

function onBookmarkSearch (bookmarks) {
  // Search with tab URL and put results to bookarked array
  console.log('Bookmarks found:', bookmarks)
  bookmarked = bookmarks
}

export const bookmarksController = {
  action: function (message, port) {
    const action = choice(message.type, {
      getBookmarkStatus: () => sendMessage(port, 'bookmarkStatus', bookmarked),
      default: unhandledMessage,
    })

    action(message)
  }
}

currentTab$
  .flatMapLatest(tab => bookmarkSearch({ url: tab.url }))
  .spy('Bookmarks found:')
  .observe(onBookmarkSearch, console.error)

Kefir.merge([
  bookmarkCreated$,
  bookmarkRemoved$,
  bookmarkChanged$,
  bookmarkMoved$,
])
  .log('Bookmarks changed:')
