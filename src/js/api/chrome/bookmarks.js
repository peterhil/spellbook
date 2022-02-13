// chrome/bookmarks.js

// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { toPromise } from '../helpers'

export function bookmarkSearch (queryObject) {
    return toPromise(chrome.bookmarks.search)(queryObject)
}

export const create = (bookmark) => {
    return toPromise(chrome.bookmarks.create)(bookmark)
}

export const get = (...args) => {
    return toPromise(chrome.bookmarks.get)(...args)
}

export const getTree = () => {
    return toPromise(chrome.bookmarks.getTree)
}

export const getSubTree = (id) => {
    return toPromise(chrome.bookmarks.getSubTree)(id)
}

export const getChildren = (id) => {
    return toPromise(chrome.bookmarks.getChildren)(id)
}

export const getRecent = (count) => {
    return toPromise(chrome.bookmarks.getRecent)(count)
}
