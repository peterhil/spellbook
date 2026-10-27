// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import { sortByTitleCaseInsensitive } from '../lib/pure'
import { isCategory } from './helpers'

export async function categorySearch (query) {
    const bookmarks = await browser.bookmarks.search(query)
    const categories = bookmarks.filter(isCategory)
    const sorted = sortByTitleCaseInsensitive(categories)

    return sorted
}

export async function deleteBookmark (bookmark) {
    // console.debug('Deleting bookmark:', bookmark)
    console.time('bookmark deletion')
    return browser.bookmarks.remove(bookmark.id)
        .then(() => console.timeEnd('bookmark deletion'))
        .catch(console.error)
}

export async function searchWithUrl (url) {
    let bookmarks = []

    // console.debug('searchWithUrl:', url)
    if (!url) return []

    try {
        bookmarks = await browser.bookmarks.search({ url })
    }
    catch {
        console.warn('[api/bookmarks] Unsupported URL:', url)
    }

    return bookmarks
}
