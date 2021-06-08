// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import zd from 'zepto-detect'
import { prop, init, last } from 'rambda'
import { fromEventPattern } from '../lib/rxjs'

export const platform = (
    zd.browser.firefox ? 'firefox' : (zd.browser.chrome ? 'chrome' : null)
)

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

export const withErrorChecking = (chromeAsyncFn) => {
    return function wrappedAsyncChromeFn (...args) {
        const originalCallback = last(args)
        const fnArgs = init(args)
        const callbackWithErrorCheck = (...resultArgs) => {
            if (chrome.runtime.lastError) {
                throw new Error(chrome.runtime.lastError.message)
            }
            originalCallback(...resultArgs)
        }

        chromeAsyncFn(...fnArgs, callbackWithErrorCheck)
    }
}
