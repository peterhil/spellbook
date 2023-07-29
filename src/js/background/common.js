// Copyright (c) 2023 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { categorySearch, searchWithBookmark } from '../api/bookmarks'
import { getRecentCategories } from '../api/categories'
import { tabsChanged$ } from '../api/tabs'
import { bookmarkCountChanged$ } from '../api/streams'

import { updateActiveTab } from './status'

export async function onMessage (request, sender) {
    console.debug(
        '[background] Message:', request.action, request,
        // { source, sender }
    )

    switch (request.action) {
    case 'recentCategories':
        return await getRecentCategories(5)
    case 'savedBookmarks':
        return await searchWithBookmark(request.tab)
    case 'categorySearch':
        return await categorySearch(request.query)
    default:
        throw new Error(`Action '${request.action}'not found!`, request)
    }
}

// listen for bookmarks being created or removed
bookmarkCountChanged$
    .debounce(250, { immediate: false })
    // .spy('[background] bookmark count changed:')
    .observe(updateActiveTab)

// listen to tab URL changes, tab switching and window switching
tabsChanged$
    .debounce(125, { immediate: false })
    // .spy('[background] tabs changed:')
    .observe(updateActiveTab)

// update when the extension loads initially
updateActiveTab()
