// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'
import { fromPromise, merge } from 'kefir'
import { path, prop } from 'rambda'

import { browserEvent$ } from './helpers'

export const getTree$ = () => {
    return fromPromise(browser.bookmarks.getTree())
}

export const bookmarkCreated$ = browserEvent$(browser.bookmarks.onCreated)
    .spy('[api/streams] Bookmark created:')

export const bookmarkRemoved$ = browserEvent$(browser.bookmarks.onRemoved)
    .spy('[api/streams] Bookmark removed:')

export const bookmarkChanged$ = browserEvent$(browser.bookmarks.onChanged)
    .spy('[api/streams] Bookmark changed:')

export const bookmarkMoved$ = browserEvent$(browser.bookmarks.onMoved)
    .spy('[api/streams] Bookmark moved:')

export const bookmarksModified$ = merge([
    bookmarkChanged$.map(prop(1)),
    bookmarkCreated$.map(prop(1)),
    bookmarkMoved$.map(prop(1)),
    bookmarkRemoved$.map(path([1, 'node'])),
])
