// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Kefir from 'kefir'
import { prop } from 'rambda'
import { getTree } from './categories'
import { browserEvent$ } from './helpers'

export const getTree$ = () => {
  return Kefir.fromPromise(getTree())
}

export const bookmarkCreated$ = browserEvent$(chrome.bookmarks.onCreated)
  .map(prop(1))
  .spy('Bookmark created:')

export const bookmarkRemoved$ = browserEvent$(chrome.bookmarks.onRemoved)
  .map(prop(1))
  .spy('Bookmark removed:')

export const bookmarkChanged$ = browserEvent$(chrome.bookmarks.onChanged)
  .map(prop(1))
  .spy('Bookmark changed:')

export const bookmarkMoved$ = browserEvent$(chrome.bookmarks.onMoved)
  .map(prop(1))
  .spy('Bookmark moved:')

export const bookmarksModified$ = Kefir.merge([
  bookmarkChanged$,
  bookmarkCreated$,
  bookmarkMoved$,
  bookmarkRemoved$.map(prop('node')),
])
