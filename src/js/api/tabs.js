// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { merge } from 'kefir'
import browser from 'webextension-polyfill'

import { browserEvent$ } from './helpers'

export const activeTabQuery = {
    active: true,
    currentWindow: true,
}

const onActivated$ = browserEvent$(browser.tabs.onActivated)
const onFocusChanged$ = browserEvent$(browser.windows.onFocusChanged)
const onUpdated$ = browserEvent$(browser.tabs.onUpdated)

export const tabsChanged$ = merge([
    onUpdated$,
    onActivated$,
    onFocusChanged$,
])
