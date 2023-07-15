// api/categories.js

// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import zd from 'zepto-detect'
import { map, pick, prop, take, uniq } from 'rambda'
import browser from 'webextension-polyfill'

import { isCategory } from './helpers'

export const parentIdProperty = (zd.browser.firefox && zd.browser.version < 64)
    ? 'parentGuid'
    : 'parentId'

export const rootCategoryId = zd.browser.firefox
    ? 'root________'
    : '0'

export const bookmarksBarCategoryId = zd.browser.firefox
    ? 'toolbar_____'
    : '1'

export const otherCategoryId = zd.browser.firefox
    ? 'unfiled_____'
    : '2'

export const menuCategoryId = zd.browser.firefox
    ? 'menu________'
    : null

export function isBookmarkNode (bookmark) {
    return !!prop(parentIdProperty, bookmark)
}

export function isTopLevelCategory (bookmark) {
    return getParentId(bookmark) === rootCategoryId
}

export function flattenTree (tree) {
    const bookmarks = []

    tree.each((bookmark) => {
        const children = isCategory(bookmark)
            ? flattenTree(bookmark.children)
            : []

        bookmarks.push(...[bookmark].concat(children))
    })

    return bookmarks
}

export function getParentId (bookmark) {
    return prop(parentIdProperty, bookmark)
}

export async function getParents (bookmark) {
    const parentPathProperties = ['id', parentIdProperty, 'title']
    let current = pick(parentPathProperties, bookmark)
    const parents = []

    while (isBookmarkNode(current) && !isTopLevelCategory(current)) {
        try {
            const result = await browser.bookmarks.get(getParentId(current))
            current = pick(parentPathProperties, result[0])
            parents.push(current)
        }
        catch (err) {
            console.error(err)
        }
    }

    return parents
}

export async function getParentPath (bookmark) {
    const parents = await getParents(bookmark)
    const titles = map(prop('title'), parents).join(' < ')

    return titles
}

export const getRecentCategories = async (maxCount) => {
    const bookmarks = await browser.bookmarks.getRecent(maxCount * 4) // Latest bookmarks might all be to the same category
    const ids = take(maxCount, uniq(map(getParentId, bookmarks)))

    if (ids.length > 0) {
        const categories = await browser.bookmarks.get(ids)
        return categories
    }
    else {
        return []
    }
}
