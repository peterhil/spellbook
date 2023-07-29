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

export function searchWithUrl (url) {
    // console.debug('searchWithUrl:', url)
    if (!url) return []

    if (zd.browser.firefox && test(/^about:/, url)) {
        // Query object with 'about:' url scheme will throw a
        // SecurityError and a TypeError, so query with string even if
        // it might return partial matches.

        // A string query on Chrome replaces special characters with spaces,
        // so for example 'chrome://extensions' would return all bookmarks
        // with chrome and extensions...

        return browser.bookmarks.search(url)
    }

    return browser.bookmarks.search({ url })
}
