// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { choice } from '../lib/pure'
import { notImplemented$ } from '../lib/reactive'
import * as chromeBookmarks from './chrome/bookmarks'
import * as firefoxBookmarks from './firefox/bookmarks'
import { platform } from './helpers'

export const getBookmark = choice(platform, {
  chrome: chromeBookmarks.get,
  firefox: firefoxBookmarks.get,
  default: notImplemented$,
})

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
