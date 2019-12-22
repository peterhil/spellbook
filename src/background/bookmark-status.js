// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { get } from 'fkit'
import {
  bookmarkChanged$,
  bookmarkCreated$,
  bookmarkMoved$,
  bookmarkRemoved$,
  bookmarkSearch,
} from '../platform/common/bookmarks'
import { sendMessage, unhandledMessage } from '../lib/messaging'
import { choice } from '../lib/pure'
import { currentTab$ } from '../platform/common/tabs'

var bookmarked = []

export const bookmarkStatus = {
  action: function (message, port) {
    const action = choice(message.type, {
      getBookmarkStatus: () => sendMessage(port, 'bookmarkStatus', bookmarked),
      default: unhandledMessage,
    })

    action(message)
  }
}

function searchWithBookmark (bookmark) {
  return bookmarkSearch({ url: bookmark.url })
}

function onCheckBookmarkStatus (bookmarked) {
  var badgeText = bookmarked.length > 1
    ? bookmarked.length.toString()
    : ''
  var icon = bookmarked.length > 0
    ? '../asset/spellbook_icon_bookmarked.png'
    : '../asset/spellbook_icon.png'

  chrome.browserAction.setIcon({ path: icon })
  chrome.browserAction.setBadgeBackgroundColor({ color: '#5755d9' })
  chrome.browserAction.setBadgeText({ text: badgeText })
}

currentTab$
  .flatMapLatest(searchWithBookmark)
  .spy('Bookmarks found:')
  .observe(onCheckBookmarkStatus, console.error)

bookmarkCreated$
  .spy('Bookmark created:')
  .flatMapLatest(searchWithBookmark)
  .observe(onCheckBookmarkStatus, console.error)

bookmarkChanged$
  .spy('Bookmark changed:')
  .flatMapLatest(searchWithBookmark)
  .observe(onCheckBookmarkStatus, console.error)

bookmarkMoved$
  .spy('Bookmark moved:')
  .flatMapLatest(searchWithBookmark)
  .observe(onCheckBookmarkStatus, console.error)

bookmarkRemoved$
  .spy('Bookmark removed:')
  .map(get('node'))
  .flatMapLatest(searchWithBookmark)
  .observe(onCheckBookmarkStatus, console.error)
