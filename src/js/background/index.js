// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { browser } from 'rosegarden'

import { disconnectionHandler, messageServer } from '../lib/messaging'
import { directoryController } from './directory-controller'
import { popupController } from './popup-controller'

const controllers = {
    directory: directoryController,
    popup: popupController,
}

function onConnect (port) {
    console.info('[background] Connected with:', port.name, port.sender)
    port.onMessage.addListener(messageServer(controllers))
    port.onDisconnect.addListener(disconnectionHandler)
}

browser.action.setBadgeBackgroundColor({ color: '#5755d9' })
browser.runtime.onConnect.addListener(onConnect)
