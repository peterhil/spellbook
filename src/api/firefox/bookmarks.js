// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global browser */

export function bookmarkSearch (queryObject) {
  return browser.bookmarks.search(queryObject)
}

export const create = (bookmark) => {
  return browser.bookmarks.create(bookmark)
}

export const get = (...args) => {
  return browser.bookmarks.get(...args)
}

export const getTree = () => {
  return browser.bookmarks.getTree()
}

export const getSubTree = (id) => {
  return browser.bookmarks.getSubTree(id)
}

export const getChildren = (id) => {
  return browser.bookmarks.getChildren(id)
}

export const getRecent = (count) => {
  return browser.bookmarks.getRecent(count)
}
