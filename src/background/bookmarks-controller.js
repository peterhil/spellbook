// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

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
  var icon;

  bookmarked = bookmarks
  icon = (
    (bookmarked.length > 0)
      ? '../asset/spellbook_icon_bookmarked.png'
      : '../asset/spellbook_icon.png'
  )

  chrome.browserAction.setIcon({path: icon})
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

bookmarkCreated$
  .map(F.get(1))
  .spy('Bookmark created:')
  .flatMapLatest(bookmark => bookmarkSearch({ url: bookmark.url }))
  .observe(onBookmarkSearch, console.error)

bookmarkRemoved$
  .map(F.get(1))
  .spy('Bookmark removed:')
  .map(F.get('node'))
  .flatMapLatest(bookmark => bookmarkSearch({ url: bookmark.url }))
  .observe(onBookmarkSearch, console.error)
