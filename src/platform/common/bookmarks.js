// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import $ from 'zepto'
import * as chromeBookmarks from '../chrome/bookmarks'
import * as firefoxBookmarks from '../firefox/bookmarks'
import { get, pick } from 'fkit'
import { browserEvent$ } from './helpers'
import { choice } from '../../lib/pure'
import { notImplemented$ } from '../../lib/reactive'

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
  return !get('url', bookmark) && bookmark.id !== 'tags________'
}

export function isBookmark (bookmark) {
  return !!get('url', bookmark) && bookmark.id !== 'tags________'
}

export function isBookmarkNode (bookmark) {
  return !!get(parentIdProperty, bookmark)
}

export function filterCategories (bookmarks) {
  return bookmarks.filter(isCategory)
}

export function filterBookmarks (bookmarks) {
  return bookmarks.filter(isBookmark)
}

export const bookmarkSearch = choice(platform, {
  chrome: chromeBookmarks.bookmarkSearch,
  firefox: firefoxBookmarks.bookmarkSearch,
  default: notImplemented$,
})

export function createBookmark (params, callback) {
  chrome.bookmarks.create(params, callback)
}

export const getBookmark = choice(platform, {
  chrome: chromeBookmarks.get,
  firefox: firefoxBookmarks.get,
  default: notImplemented$,
})

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

export function flattenTree (tree) {
  let bookmarks = []

  tree.map((bookmark) => {
    let children = isCategory(bookmark)
      ? flattenTree(bookmark.children)
      : []

    bookmarks.push(...[bookmark].concat(children))
  })

  return bookmarks
}

const parentPathProperties = ['id', parentIdProperty, 'title']

const pathToString = (parents) => {
  return parents.map(parent => parent.title).join(' < ')
}

export function getParentId (bookmark) {
  return get(parentIdProperty, bookmark)
}

export async function getParents (bookmark) {
  let parents = []
  let current = pick(parentPathProperties, bookmark)

  while (isBookmarkNode(current) && getParentId(current) !== rootCategoryId) {
    try {
      let result = await getBookmark(getParentId(current))
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

  return pathToString(parents)
}

export const bookmarkCreated$ = browserEvent$(chrome.bookmarks.onCreated).map(get(1))
export const bookmarkRemoved$ = browserEvent$(chrome.bookmarks.onRemoved).map(get(1))
export const bookmarkChanged$ = browserEvent$(chrome.bookmarks.onChanged).map(get(1))
export const bookmarkMoved$ = browserEvent$(chrome.bookmarks.onMoved).map(get(1))
