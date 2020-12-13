// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Kefir from 'kefir'
import { sendMessage, unhandledMessage } from '../lib/messaging'
import { choice } from '../lib/pure'
import { emptyBookmark } from '../lib/stores'
import { categorySearch, searchWithBookmark } from '../api/bookmarks'
import { getRecentCategories } from '../api/categories'
import { bookmarksModified$ } from '../api/streams'
import { currentTab$ } from '../api/tabs'

var bookmarked = []
var currentTab = emptyBookmark

export const popupController = {
  action: function (message, port) {
    const action = choice(message.type, {
      getBookmarkStatus: () => sendMessage(port, 'bookmarkStatus', bookmarked),
      getCurrentTab: () => sendMessage(port, 'currentTabInfo', currentTab),
      getRecentCategories: (request) => {
        getRecentCategories(5) // TODO Move hardcoded value into options
          .then(result => {
            sendMessage(port, 'recentCategories', result)
          })
      },
      categorySearch: (request) => {
        categorySearch(request.query)
          .then(result => sendMessage(port, 'searchResults', result))
      },
      default: unhandledMessage,
    })

    action(message)
  }
}

function onCheckBookmarkStatus (bookmarks) {
  var badgeText = bookmarks.length > 1
    ? bookmarks.length.toString()
    : ''
  var icon = bookmarks.length > 0
    ? '../asset/spellbook_icon_bookmarked.png'
    : '../asset/spellbook_icon.png'

  chrome.browserAction.setIcon({ path: icon })
  chrome.browserAction.setBadgeText({ text: badgeText })

  bookmarked = bookmarks
}

function onCurrentTab (tab) {
  currentTab = { ...tab }
}

Kefir.merge([bookmarksModified$, currentTab$])
  .flatMapLatest(searchWithBookmark)
  .spy('Bookmarks found:')
  .observe(onCheckBookmarkStatus, console.error)

currentTab$
  .observe(onCurrentTab, console.error)
