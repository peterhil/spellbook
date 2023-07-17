// Copyright (c) 2023 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { getRecentCategories } from '../api/categories'
import { categorySearch } from '../api/bookmarks'
import { currentTab$ } from '../api/tabs'
import { bookmarksModified$ } from '../api/streams'
import { savedBookmarks } from '../stores/savedBookmarks'

import { checkBookmarkStatus, checkTabs } from './status'

export async function onMessage (request, sender) {
    console.debug(
        '[background] Message:', request.action, request,
        // { source, sender }
    )

    switch (request.action) {
    case 'recentCategories':
        return await getRecentCategories(5)
    case 'bookmarkStatus':
        return await savedBookmarks.getBookmark(request.tab.id)
    case 'categorySearch':
        return await categorySearch(request.query)
    default:
        throw new Error(`Action '${request.action}'not found!`, request)
    }
}

currentTab$
    // .spy('[background] current tab changed:')
    .observe(checkBookmarkStatus)

bookmarksModified$
    // .spy('[background] bookmarks modified:')
    .debounce(1000, { immediate: true })
    .observe(checkTabs)
