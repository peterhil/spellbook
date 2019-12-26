// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { compose, get, map, nub, pick, reverse, sortBy, take } from 'fkit'
import Kefir from 'kefir'
import zd from 'zepto-detect'
import { domLoaded$ } from '../../lib/events'
import { choice, propertyCompare } from '../../lib/pure'
import { notImplemented$ } from '../../lib/reactive'
import * as chromeBookmarks from '../chrome/bookmarks'
import * as firefoxBookmarks from '../firefox/bookmarks'
import { browserEvent$ } from './helpers'

const platform = (
  zd.browser.firefox ? 'firefox' : (zd.browser.chrome ? 'chrome' : null)
)

const parentIdProperty = (zd.browser.firefox && zd.browser.version < 64)
  ? 'parentGuid'
  : 'parentId'

const rootCategoryId = zd.browser.firefox
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

export function searchWithBookmark (bookmark) {
  if (!(bookmark && bookmark.url)) {
    return []
  }
  return bookmarkSearch({ url: bookmark.url })
}

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

export const getTree$ = () => {
  return Kefir.fromPromise(getTree())
}

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

const parentPathProperties = ['id', parentIdProperty, 'title']

const pathToString = (parents) => {
  return parents.map(parent => parent.title).join(' < ')
}

export function getParentId (bookmark) {
  return get(parentIdProperty, bookmark)
}

export async function getParents (bookmark) {
  var parents = []
  let current = pick(parentPathProperties, bookmark)

  while (isBookmarkNode(current) && getParentId(current) !== rootCategoryId) {
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

  return pathToString(parents)
}

export const bookmarkCreated$ = browserEvent$(chrome.bookmarks.onCreated)
  .map(get(1))
  .spy('Bookmark created:')
export const bookmarkRemoved$ = browserEvent$(chrome.bookmarks.onRemoved)
  .map(get(1))
  .spy('Bookmark removed:')

export const bookmarkChanged$ = browserEvent$(chrome.bookmarks.onChanged)
  .map(get(1))
  .spy('Bookmark changed:')

export const bookmarkMoved$ = browserEvent$(chrome.bookmarks.onMoved)
  .map(get(1))
  .spy('Bookmark moved:')

export const bookmarksModified$ = Kefir.merge([
  bookmarkChanged$,
  bookmarkCreated$,
  bookmarkMoved$,
  bookmarkRemoved$.map(get('node')),
])

export const recentCategories$ = Kefir.merge([
  bookmarksModified$,
  domLoaded$,
])
  .flatMapLatest(getTree$)
  .map(flattenTree)
  .map(filterBookmarks)
  .map(compose(reverse([
    sortBy(propertyCompare('dateAdded')),
    reverse,
    take(20), // TODO Move hardcoded value into options
    map(getParentId),
    nub,
    take(5)
  ])))
  .flatMap(id => Kefir.fromPromise(getBookmark(id)))
  .spy('Recent categories')
