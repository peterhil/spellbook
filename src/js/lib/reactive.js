// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Reactive streams and utility functions

import { constantError, fromEvents } from 'kefir'

const defaults = { minLength: 2, debounceTime: 250 }

export function inputEvent$ (element, { minLength = 2, debounceTime = 250 } = defaults) {
    return fromEvents(element, 'input', event => event.target.value)
        .filter(query => query.length >= minLength)
        // .spy('Query before throttle/debounce:')
        .debounce(debounceTime)
        // .spy('Debounced:')
        .skipDuplicates()
}

export const notImplemented$ = () => {
    constantError(new Error('Not implemented'))
}
