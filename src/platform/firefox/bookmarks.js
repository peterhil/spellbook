// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global browser */

import F from 'fkit'
import Kefir from 'kefir'

export function search (query) {
  return Kefir.fromPromise(browser.bookmarks.search({ query: query }))
}

export const get = (...args) => {
  return browser.bookmarks.get(...args)
}

export const getTree = () => {
  return browser.bookmarks.getTree()
}
