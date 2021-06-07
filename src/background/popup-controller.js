// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { map } from 'rambda'

import { sendMessage, unhandledMessage } from '../lib/messaging'
import { choice } from '../lib/pure'
import { categorySearch, searchWithBookmark } from '../api/bookmarks'
import { getRecentCategories } from '../api/categories'
import { bookmarksModified$ } from '../api/streams'
import { currentTab$, getActiveTabs } from '../api/tabs'

export const popupController = {
  action: function (message, port) {
    const action = choice(message.type, {
      getRecentCategories: (message) => {
        getRecentCategories(5) // TODO Move hardcoded value into options
          .then(result => {
            sendMessage(port, 'recentCategories', result)
          })
      },
      categorySearch: (message) => {
        categorySearch(message.query)
          .then(result => sendMessage(port, 'searchResults', result))
      },
      default: unhandledMessage,
    })

    action(message)
  }
}

function setBookmarkStatus (bookmarks, tabId) {
  // console.debug('[popup controller] setBookmarkStatus:', tabId, bookmarks.length)
  const badgeText = bookmarks.length > 1
    ? bookmarks.length.toString()
    : ''
  const icon = bookmarks.length > 0
    ? '../asset/spellbook_icon_bookmarked.png'
    : '../asset/spellbook_icon.png'

  chrome.browserAction.setIcon({ path: icon, tabId })
  chrome.browserAction.setBadgeText({ text: badgeText, tabId })
}

async function checkBookmarkStatus (activeTab) {
  const bookmarks = await searchWithBookmark(activeTab)
  // console.debug('[popup controller] Bookmarks found:', bookmarks)

  setBookmarkStatus(bookmarks, activeTab.id)

  return bookmarks
}

async function checkTabs () {
  const activeTabs = await getActiveTabs()
  console.debug('[popup controller] active tabs:', activeTabs)

  return await map(checkBookmarkStatus, activeTabs)
}

currentTab$
  .spy('[popup controller] current tab changed:')
  .observe(checkBookmarkStatus)

bookmarksModified$
  .spy('[popup controller] bookmarks modified:')
  .observe(checkTabs)
