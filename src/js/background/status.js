// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { map } from 'rambda'

import { searchWithBookmark } from '../api/bookmarks'
import { getActiveTabs } from '../api/tabs'
import { savedBookmarks } from '../stores/savedBookmarks'

function setBookmarkStatus (bookmarks, tabId) {
    // console.debug('[background] setBookmarkStatus:', tabId, bookmarks.length)
    const badgeText = bookmarks.length > 1
        ? bookmarks.length.toString()
        : ''
    const icon = bookmarks.length > 0
        ? '../img/spellbook_icon_bookmarked.png'
        : '../img/spellbook_icon.png'

    chrome.action.setIcon({ path: icon, tabId })
    chrome.action.setBadgeText({ text: badgeText, tabId })
}

export async function checkBookmarkStatus (activeTab) {
    const bookmarks = await searchWithBookmark(activeTab)
    // console.debug('[background] Bookmarks found:', { activeTab, bookmarks })

    setBookmarkStatus(bookmarks, activeTab.id)
    savedBookmarks.setBookmark(activeTab.id, bookmarks || [])

    return bookmarks
}

export async function checkTabs () {
    const activeTabs = await getActiveTabs()
    // console.debug('[background] checking active tabs:', activeTabs)

    // Clear saved bookmarks cache when bookmarks are modified
    savedBookmarks.reset()

    return await map(checkBookmarkStatus, activeTabs)
}
