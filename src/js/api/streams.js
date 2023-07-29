// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'
import { fromPromise, merge } from 'kefir'

import { browserEvent$ } from './helpers'

export const getTree$ = () => {
    return fromPromise(browser.bookmarks.getTree())
}

export const bookmarkCreated$ = browserEvent$(browser.bookmarks.onCreated)
export const bookmarkRemoved$ = browserEvent$(browser.bookmarks.onRemoved)
// export const bookmarkChanged$ = browserEvent$(browser.bookmarks.onChanged)
// export const bookmarkMoved$ = browserEvent$(browser.bookmarks.onMoved)

export const bookmarkCountChanged$ = merge([
    bookmarkCreated$,
    bookmarkRemoved$,
])
