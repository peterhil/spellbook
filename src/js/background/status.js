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

export function updateActiveTab () {
    function updateTab (tabs) {
        if (tabs[0]) {
            const currentTab = tabs[0]

            try {
                const searching = searchWithBookmark(currentTab)

                searching.then((bookmarks) => {
                    updateIcon(bookmarks, currentTab.id)
                })
            }
            catch (err) {
                console.log(`Spellbook does not support the '${currentTab.url}' URL protocol.`)
                console.error(err)
            }
        }
    }

    const gettingActiveTab = browser.tabs.query(activeTabQuery)
    gettingActiveTab.then(updateTab)
}
