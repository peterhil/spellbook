// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import $ from 'zepto'
import * as chromeBookmarks from '../chrome/bookmarks'
import * as firefoxBookmarks from '../firefox/bookmarks'
import F from 'fkit'
import { notImplemented$ } from '../../lib/reactive'
import { strategy } from '../../lib/pure'

const platform = (
  $.browser.firefox ? 'firefox' : ($.browser.chrome ? 'chrome' : null)
)

const parentIdProperty = ($.browser.firefox && $.browser.version < 64)
      ? 'parentGuid'
      : 'parentId'

const rootCategoryId = $.browser.firefox
      ? 'root________'
      : '0'

export const bookmarksBarCategoryId = $.browser.firefox
      ? 'toolbar_____'
      : '1'

export const otherCategoryId = $.browser.firefox
      ? 'unfiled_____'
      : '2'

export const menuCategoryId = $.browser.firefox
      ? 'menu________'
      : null

export function isCategory (bookmark) {
  return !F.get('url', bookmark) && bookmark.id !== 'tags________'
}

export function isBookmarkNode (bookmark) {
  return !!F.get(parentIdProperty, bookmark)
}

export function filterCategories (bookmarks) {
  return bookmarks.filter(isCategory)
}

export const bookmarkSearch = strategy(platform, {
  chrome: chromeBookmarks.search,
  firefox: firefoxBookmarks.search,
  default: notImplemented$,
})

export function createBookmark (params, callback) {
  chrome.bookmarks.create(params, callback)
}

export const getBookmark = strategy(platform, {
  chrome: chromeBookmarks.get,
  firefox: firefoxBookmarks.get,
  default: notImplemented$,
})

export const getTree = strategy(platform, {
  chrome: chromeBookmarks.getTree,
  firefox: firefoxBookmarks.getTree,
  default: notImplemented$,
})

const pathToString = (parents) => {
  return parents.map(parent => parent.title).join(' < ')
}

export async function getParents (bookmark) {
  let parents = []
  let current = bookmark

  while (isBookmarkNode(current) && current[parentIdProperty] !== rootCategoryId) {
    try {
      let result = await getBookmark(current[parentIdProperty])
      parents.push(result[0])
      current = result[0]
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

  return pathToString(parents)
}
