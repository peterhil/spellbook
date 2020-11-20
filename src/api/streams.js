// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  compose, get, map, nub, reverse, sortBy, take
} from 'fkit'
import Kefir from 'kefir'
import { domLoaded$ } from '../lib/events'
import { filterBy, propertyCompare } from '../lib/pure'
import { getBookmark } from './bookmarks'
import {
  flattenTree,
  getParentId,
  getTree,
} from './categories'
import { browserEvent$, isBookmark } from './helpers'

export const getTree$ = () => {
  return Kefir.fromPromise(getTree())
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
  .map(filterBy(isBookmark))
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
