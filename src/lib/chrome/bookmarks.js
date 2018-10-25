// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome bookmarks

/* global chrome */

import Kefir from 'kefir'
import { callbackToPromise } from '../reactive'
import { withErrorChecking } from './helpers'

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

export function createBookmark (params, callback) {
  chrome.bookmarks.create(params, callback)
}

export const getBookmark = (...args) => {
  return callbackToPromise(chrome.bookmarks.get, ...args)
}

const pathToString = (parents) => {
  return parents.map(parent => parent.title).join(' < ')
}

export async function getParents (bookmark) {
  let parents = []
  let current = bookmark

  while (isBookmarkNode(current) && current.parentId !== '0') {
    try {
      let result = await getBookmark(current.parentId)
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
