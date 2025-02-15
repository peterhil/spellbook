// Copyright (c) 2019-2023 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import browser from 'webextension-polyfill'

import { onMessage } from './common'

browser.action.setBadgeBackgroundColor({ color: '#5755d9' })

browser.runtime.onInstalled.addListener(() => {
     
    console.log('Extension installed')
})

browser.runtime.onMessage.addListener(onMessage)
