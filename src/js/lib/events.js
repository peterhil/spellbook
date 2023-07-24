// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global document */

import { fromEvents } from 'kefir'

const add = (element, event, fn, useCapture = false) => {
    console.assert(
        element,
        '[events] Trying to attach event listener to an element that does not exist!'
    )
    console.assert(
        typeof fn === 'function',
        '[events] Trying to add nonexisting event handler on:\n', element, fn
    )

    element.addEventListener(event, fn, useCapture)
}

const remove = (element, event, fn, useCapture = false) => {
    element.removeEventListener(event, fn, useCapture)
}

export const domLoaded$ = fromEvents(document, 'DOMContentLoaded')

export const events = {
    add,
    remove,
}

export default events
