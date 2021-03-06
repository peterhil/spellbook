// api/bookmarks.js

// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { test } from 'rambda'

import { choice, sortByTitleCaseInsensitive } from '../lib/pure'
import { notImplemented$ } from '../lib/reactive'
import * as chromeBookmarks from './chrome/bookmarks'
import * as firefoxBookmarks from './firefox/bookmarks'
import { isCategory, platform } from './helpers'

export const createBookmark = choice(platform, {
    chrome: chromeBookmarks.create,
    firefox: firefoxBookmarks.create,
    default: notImplemented$,
})

export const getBookmark = choice(platform, {
    chrome: chromeBookmarks.get,
    firefox: firefoxBookmarks.get,
    default: notImplemented$,
})

export const getRecent = choice(platform, {
    chrome: chromeBookmarks.getRecent,
    firefox: firefoxBookmarks.getRecent,
    default: notImplemented$,
})

export const bookmarkSearch = choice(platform, {
    chrome: chromeBookmarks.bookmarkSearch,
    firefox: firefoxBookmarks.bookmarkSearch,
    default: notImplemented$,
})

export const categorySearch = async (query) => {
    // console.debug('[bookmarks api] categorySearch: doing bookmarkSearch', query)

    return new Promise((resolve, reject) => {
        return bookmarkSearch(query).then(bookmarks => {
            // console.debug('[bookmarks api] categorySearch: done bookmarks count:', bookmarks.length)
            let categories = bookmarks.filter(isCategory)

            categories = sortByTitleCaseInsensitive(categories)
            // console.debug('[bookmarks api] categorySearch: categories filtered and sorted', categories.length)

            resolve(categories)
        })
    })
}

export function searchWithBookmark (bookmark) {
    let query

    if (!(bookmark && bookmark.url)) {
        return []
    }

    if (platform === 'firefox' && test(/^about:/, bookmark.url)) {
        // Query object with 'about:' url scheme will throw a
        // SecurityError and a TypeError, so query with string even if
        // it might return partial matches.
        query = bookmark.url
    }
    else {
        // String query on Chrome replaces special characters with spaces,
        // so for example 'chrome://extensions' would return all bookmarks
        // with chrome and extensions... so query object it is:
        query = { url: bookmark.url }
    }

    return bookmarkSearch(query)
}
