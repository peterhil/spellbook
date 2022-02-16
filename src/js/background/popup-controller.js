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

// TODO Use Svelte store?
const savedBookmarks = new Map()

export const popupController = {
    getRecentCategories: (message, port) => {
        getRecentCategories(5) // TODO Move hardcoded value into options
            .then(result => {
                sendMessage(port, 'recentCategories', result)
            })
    },
    bookmarkStatus: (message, port) => {
        const result = savedBookmarks.get(message.tab.id) || []
        sendMessage(port, 'bookmarkStatus', result)
        // console.debug(
        //     '[popup controller] bookmarkStatus:', message, result, savedBookmarks
        // )
    },
    categorySearch: async (message, port) => {
        console.debug('[popup controller] categorySearch:', port.name, message, message.query)
        const result = await categorySearch(message.query)
        console.debug('[popup controller] categorySearch result:', result.length)

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

    chrome.browserAction.setIcon({ path: icon, tabId })
    chrome.browserAction.setBadgeText({ text: badgeText, tabId })
}

async function checkBookmarkStatus (activeTab) {
    const bookmarks = await searchWithBookmark(activeTab)
    // console.debug('[popup controller] Bookmarks found:', bookmarks)

    setBookmarkStatus(bookmarks, activeTab.id)
    savedBookmarks.set(activeTab.id, bookmarks || [])

    return bookmarks
}

async function checkTabs () {
    const activeTabs = await getActiveTabs()
    // console.debug('[popup controller] active tabs:', activeTabs)

    // Clear saved bookmarks cache when bookmarks are modified
    savedBookmarks.clear()

    return await map(checkBookmarkStatus, activeTabs)
}

currentTab$
    // .spy('[popup controller] current tab changed:')
    .observe(checkBookmarkStatus)

bookmarksModified$
    // .spy('[popup controller] bookmarks modified:')
    .observe(checkTabs)
