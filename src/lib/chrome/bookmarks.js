// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome bookmarks

/* global chrome */

import F from 'fkit'
import Kefir from 'kefir'
import { callbackToPromise } from '../util'
import { withErrorChecking } from './apiHelpers'

export function isCategory (bookmark) {
  return !bookmark.hasOwnProperty('url')
}

export function isBookmarkNode (bookmark) {
  return bookmark && bookmark.hasOwnProperty('parentId')
}

export function filterCategories (bookmarks) {
  return bookmarks.filter(isCategory)
}

export function bookmarkSearch (query) {
  return Kefir.fromPromise(callbackToPromise(
    withErrorChecking(chrome.bookmarks.search),
    { query: query }
  ))
}
