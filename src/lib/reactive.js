// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Reactive streams and utility functions

import Kefir from 'kefir'

export function callbackToPromise (fn, ...args) {
    return new Promise((resolve, reject) => {
        try {
            fn(...args, resolve)
        } catch (err) {
            reject(err)
        }
    })
}

export function inputEvent$ (element, { minLength = 2, debounceTime = 250 } = { minLength: 2, debounceTime: 250 }) {
    return Kefir
        .fromEvents(element, 'input', event => event.target.value)
        .filter(query => query.length >= minLength)
        .debounce(debounceTime)
        .skipDuplicates()
}

export const notImplemented$ = () => {
    Kefir.constantError(new Error('Not implemented'))
}
