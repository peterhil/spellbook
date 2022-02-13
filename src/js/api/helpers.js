// api/helpers.js

// Copyright (c) 2018-2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import zd from 'zepto-detect'
import { compose, curry, prop, init, last, test } from 'rambda'

import { callbackToPromise } from '../lib/reactive'
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

export function toPromise (fn) {
    return compose(callbackToPromise, withErrorChecking, curry)(fn)
}

export const withErrorChecking = (chromeAsyncFn) => {
    return function wrappedAsyncChromeFn (...args) {
        const originalCallback = last(args)
        const fnArgs = init(args)

        function callbackWithErrorCheck (...resultArgs) {
            const error = chrome.runtime.lastError
            const isTabMessage = test(/^Tabs cannot be \w+ right now \(user may be dragging a tab\)\.$/)

            if (error) {
                // Workaround for bug in Chrome v91:
                // https://bugs.chromium.org/p/chromium/issues/detail?id=1213925
                if (isTabMessage(error.message)) {
                    // console.warn('[withErrorChecking] avoiding:', error.message)
                    setTimeout(() => {
                        originalCallback(...resultArgs)
                    }, 500)
                    return
                }
                else {
                    throw new Error(error.message)
                }
            }

            originalCallback(...resultArgs)
        }

        chromeAsyncFn(...fnArgs, callbackWithErrorCheck)
    }
}
