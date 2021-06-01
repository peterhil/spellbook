// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import zd from 'zepto-detect'
import { map, pick, prop, take, uniq } from 'rambda'

import { getBookmark, getRecent } from './bookmarks'
import { choice } from '../lib/pure'
import { notImplemented$ } from '../lib/reactive'
import * as chromeBookmarks from './chrome/bookmarks'
import * as firefoxBookmarks from './firefox/bookmarks'
import { isCategory, platform } from './helpers'

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

export const getTree = choice(platform, {
  chrome: chromeBookmarks.getTree,
  firefox: firefoxBookmarks.getTree,
  default: notImplemented$,
})

export const getSubTree = choice(platform, {
  chrome: chromeBookmarks.getSubTree,
  firefox: firefoxBookmarks.getSubTree,
  default: notImplemented$,
})

export const getChildren = choice(platform, {
  chrome: chromeBookmarks.getChildren,
  firefox: firefoxBookmarks.getChildren,
  default: notImplemented$,
})

export function flattenTree (tree) {
  var bookmarks = []

  tree.map((bookmark) => {
    var children = isCategory(bookmark)
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
  var parents = []

  while (isBookmarkNode(current) && !isTopLevelCategory(current)) {
    try {
      var result = await getBookmark(getParentId(current))
      current = pick(parentPathProperties, result[0])
      parents.push(current)
    } catch (err) {
      console.error(err)
    }
  }

  return parents
}

export async function getParentPath (bookmark) {
  let parents = []

  try {
    parents = await getParents(bookmark)
  } catch (err) {
    console.error(err)
  }

  return parents.map(parent => parent.title).join(' < ')
}

export const getRecentCategories = async (maxCount) => {
  const bookmarks = await getRecent(maxCount * 4) // Latest bookmarks might all be to the same category
  const ids = take(maxCount, uniq(map(getParentId, bookmarks)))
  const categories = await getBookmark(ids)

  return categories
}
