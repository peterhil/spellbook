// api/helpers.js

// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { prop } from 'rambda'

import { fromEventPattern } from '../lib/rxjs'

export function isBookmark (bookmark) {
    return !!prop('url', bookmark) && bookmark.id !== 'tags________'
}

export function isCategory (bookmark) {
    return !prop('url', bookmark) && bookmark.id !== 'tags________'
}

export const browserEvent$ = (eventType) => {
    return fromEventPattern(
        eventType.addListener.bind(eventType),
        eventType.removeListener.bind(eventType)
    )
}
