// api/helpers.js

// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { prop } from 'rambda'

import { fromEventPattern } from '../lib/rxjs'

export const url = prop('url')

export function isBookmark (bookmark) {
    return !!url(bookmark) && !isTag(bookmark)
}

export function isCategory (bookmark) {
    return !url(bookmark) && !isTag(bookmark)
}

export function isTag (bookmark) {
    return bookmark.id === 'tags________'
}

export const browserEvent$ = (eventType) => {
    return fromEventPattern(
        eventType.addListener.bind(eventType),
        eventType.removeListener.bind(eventType)
    )
}
