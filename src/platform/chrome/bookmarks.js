// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import Kefir from 'kefir'
import { callbackToPromise } from '../../lib/reactive'
import { withErrorChecking } from '../common/helpers'

export function bookmarkSearch (queryObject) {
  return Kefir.fromPromise(callbackToPromise(
    withErrorChecking(chrome.bookmarks.search),
    queryObject
  ))
}

export const get = (...args) => {
  return callbackToPromise(chrome.bookmarks.get, ...args)
}

export const getTree = () => {
  return callbackToPromise(chrome.bookmarks.getTree)
}

export const getSubTree = (id) => {
  return callbackToPromise(chrome.bookmarks.getSubTree, id)
}

export const getChildren = (id) => {
  return callbackToPromise(withErrorChecking(chrome.bookmarks.getChildren), id)
}
