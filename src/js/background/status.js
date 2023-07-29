// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import { activeTabQuery } from '../api/tabs'
import { browserAction } from '../lib/compat'
import { searchWithBookmark } from '../api/bookmarks'

function updateIcon (bookmarks, tabId) {
    // console.debug('[background] updateIcon:', tabId, bookmarks.length)
    const icon = bookmarks.length > 0
        ? '../img/spellbook_icon_bookmarked.png'
        : '../img/spellbook_icon.png'
    const badgeText = bookmarks.length > 1
        ? bookmarks.length.toString()
        : ''

    browserAction.setIcon({ path: icon, tabId })
    browserAction.setBadgeText({ text: badgeText, tabId })
}

async function updateTab (tabs) {
    if (tabs[0]) {
        const currentTab = tabs[0]
        const bookmarks = await searchWithBookmark(currentTab)

        updateIcon(bookmarks, currentTab.id)
    }
}

export async function updateActiveTab () {
    const tabs = await browser.tabs.query(activeTabQuery)
    updateTab(tabs)
}
