// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome bookmarks

/* global browser, chrome */

import $ from 'zepto'
import F from 'fkit'
import Kefir from 'kefir'
import { callbackToPromise } from '../../lib/reactive'
import { withErrorChecking } from './helpers'

const parentIdProperty = $.browser.firefox
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

export function bookmarkSearch (query) {
  if ($.browser.chrome) {
    return Kefir.fromPromise(callbackToPromise(
      withErrorChecking(chrome.bookmarks.search),
      { query: query }
    ))
  } else if ($.browser.firefox) {
    return Kefir.fromPromise(browser.bookmarks.search({ query: query }))
  } else {
    Kefir.constantError(new Error('Bookmark search not implemented for this browser: ' + navigator.userAgent))
  }
}

export function createBookmark (params, callback) {
  chrome.bookmarks.create(params, callback)
}

export const getBookmark = (...args) => {
  if ($.browser.chrome) {
    return callbackToPromise(chrome.bookmarks.get, ...args)
  } else if ($.browser.firefox) {
    return browser.bookmarks.get(...args)
  } else {
    Kefir.constantError(new Error('Not implemented'))
  }
}

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
    return pathToString(parents)
  } catch (err) {
    console.error(err)
  }
}
