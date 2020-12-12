// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Kefir } from 'kefir'
import { sortBy } from 'fkit'
import { choice, propertyCompare } from '../lib/pure'
import { notImplemented$ } from '../lib/reactive'
import * as chromeBookmarks from './chrome/bookmarks'
import * as firefoxBookmarks from './firefox/bookmarks'
import { isCategory, platform } from './helpers'

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
  const bookmarks = await bookmarkSearch(query)
  let categories = bookmarks.filter(isCategory)

  console.log('[bookmarks api] categorySearch:', query)
  categories = sortBy(propertyCompare('title', true), categories)

  return categories
}

export function searchWithBookmark (bookmark) {
  if (!(bookmark && bookmark.url)) {
    return []
  }
  return Kefir.fromPromise(bookmarkSearch({ url: bookmark.url }))
}

export function createBookmark (params, callback) {
  chrome.bookmarks.create(params, callback)
}
