// background/popup-controller.js

// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { map } from 'rambda'

import { sendMessage } from '../lib/messaging'
import { categorySearch, searchWithBookmark } from '../api/bookmarks'
import { getRecentCategories } from '../api/categories'
import { bookmarksModified$ } from '../api/streams'
import { currentTab$, getActiveTabs } from '../api/tabs'
import { savedBookmarks } from '../stores/savedBookmarks'

export const popupController = {
    recentCategories: async (message, port) => {
        const result = getRecentCategories(5)
        sendMessage(port, 'recentCategories', result)
    },
    bookmarkStatus: (message, port) => {
        const result = savedBookmarks.getBookmark(message.tab.id) || []
        sendMessage(port, 'bookmarkStatus', result)
    },
    categorySearch: async (message, port) => {
        const result = await categorySearch(message.query)
        sendMessage(port, 'searchResults', result)
    },
}

function setBookmarkStatus (bookmarks, tabId) {
    // console.debug('[popup controller] setBookmarkStatus:', tabId, bookmarks.length)
    const badgeText = bookmarks.length > 1
        ? bookmarks.length.toString()
        : ''
    const icon = bookmarks.length > 0
        ? '../img/spellbook_icon_bookmarked.png'
        : '../img/spellbook_icon.png'

    chrome.action.setIcon({ path: icon, tabId })
    chrome.action.setBadgeText({ text: badgeText, tabId })
}

async function checkBookmarkStatus (activeTab) {
    const bookmarks = await searchWithBookmark(activeTab)
    // console.debug('[popup controller] Bookmarks found:', { activeTab, bookmarks })

    setBookmarkStatus(bookmarks, activeTab.id)
    savedBookmarks.setBookmark(activeTab.id, bookmarks || [])

    return bookmarks
}

async function checkTabs () {
    const activeTabs = await getActiveTabs()
    // console.debug('[popup controller] checking active tabs:', activeTabs)

    // Clear saved bookmarks cache when bookmarks are modified
    savedBookmarks.reset()

    return await map(checkBookmarkStatus, activeTabs)
}

currentTab$
    // .spy('[popup controller] current tab changed:')
    .observe(checkBookmarkStatus)

bookmarksModified$
    // .spy('[popup controller] bookmarks modified:')
    .debounce(1000, { immediate: true })
    .observe(checkTabs)
