// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import zd from 'zepto-detect'
import { test } from 'rambda'
import browser from 'webextension-polyfill'

import { sortByTitleCaseInsensitive } from '../lib/pure'
import { isCategory } from './helpers'

export const categorySearch = async (query) => {
    return new Promise((resolve, reject) => {
        return browser.bookmarks.search(query).then(bookmarks => {
            const categories = bookmarks.filter(isCategory)
            const sorted = sortByTitleCaseInsensitive(categories)

            resolve(sorted)
        })
    })
}

export function searchWithBookmark (bookmark) {
    let query

    // console.debug('searchWithBookmark:', bookmark)
    if (!bookmark?.url) return []
    if (zd.browser.firefox && test(/^about:/, bookmark.url)) {
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

    return browser.bookmarks.search(query)
}
