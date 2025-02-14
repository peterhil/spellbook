// Copyright (c) 2023 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { categorySearch, deleteBookmark, searchWithUrl } from '../api/bookmarks'
import { getRecentCategories } from '../api/categories'
import { tabsChanged$ } from '../api/tabs'
import { bookmarkCountChanged$ } from '../api/streams'

import { updateActiveTab } from './status'

// In case there are problems with Chrome using an async listener, see:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_a_promise
export async function onMessage (request, sender) {
    console.debug(
        '[background] Message:', request.action, request,
        // { source, sender }
    )

    switch (request.action) {
    case 'categorySearch':
        return await categorySearch(request.query)
    case 'deleteBookmark':
        return await deleteBookmark(request.bookmark)
    case 'recentCategories':
        return await getRecentCategories(5)
    case 'savedBookmarks':
        return await searchWithUrl(request.tab.url)
    default:
        throw new Error(`Action '${request.action}'not found!`, request)
    }
}

// listen for bookmarks being created or removed
bookmarkCountChanged$
    // .spy('[background] bookmark count changed:')
    .observe(updateActiveTab)

// listen to tab URL changes, tab switching and window switching
tabsChanged$
    // .spy('[background] tabs changed:')
    .observe(updateActiveTab)

// update when the extension loads initially
updateActiveTab()
