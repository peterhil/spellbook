// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import { getCurrentTab } from '../api/tabs'
import { browserAction } from '../lib/compat'
import { searchWithUrl } from '../api/bookmarks'

async function updateIcon (tabId, bookmarkCount) {
    const icon = bookmarkCount > 0
        ? '../img/spellbook_icon_bookmarked.png'
        : '../img/spellbook_icon.png'
    const badgeText = bookmarkCount > 0
        ? bookmarkCount.toString()
        : ''

    return Promise.all([
        browserAction.setIcon({ path: icon, tabId }),
        browserAction.setBadgeText({ text: badgeText, tabId }),
    ])
}

export async function updateActiveTab () {
    const tab = await getCurrentTab()
    const bookmarks = await searchWithUrl(tab.url)

    return updateIcon(tab.id, bookmarks.length)
}
