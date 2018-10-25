// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { fromEventPattern } from '../../lib/rxjs'
import F from 'fkit'

export const chromeEvent$ = (eventType) => {
  return fromEventPattern(
    eventType.addListener.bind(eventType),
    eventType.removeListener.bind(eventType),
  )
}

export const withErrorChecking = (chromeAsyncFn) => {
  return function wrappedAsyncChromeFn (...args) {
    const callback = F.last(args)
    const fnArgs = F.init(args)
    const callbackWithErrorCheck = (...resultArgs) => {
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError.message)
      }
      callback(...resultArgs)
    }

    chromeAsyncFn(...fnArgs, callbackWithErrorCheck)
  }
}
