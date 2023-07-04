// lib/pure.js

// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Pure utility functions

import {
    compose,
    head,
    isEmpty,
    prop,
    sortBy,
    toLower
} from 'rambda'

export const hasItems = array => {
    return array && !isEmpty(array)
}

export const isFunction = fn => {
    return typeof fn === 'function'
}

export function safeHead (list) {
    return (
        list && !isEmpty(list)
            ? head(list)
            : null
    )
}

export const sortByTitleCaseInsensitive = sortBy(compose(toLower, prop('title')))
