// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { choice } from '../lib/pure'
import { closedTab$, closedWindow$, currentTab$ } from '../platform/common/tabs'
import { sendMessage, unhandledMessage } from '../lib/messaging'

var currentTab = {
  title: '',
  url: '',
  favIconUrl: '',
  category: '',
}

function onCurrentTab (tab) {
  currentTab = {
    ...tab
  }
}

export const popupController = {
  action: function (message, port) {
    const action = choice(message.type, {
      getCurrentTab: () => sendMessage(port, 'currentTabInfo', currentTab),
      default: unhandledMessage,
    })

    action(message)
  }
}

closedWindow$.log('closedWindow$')
closedTab$.log('closedTab$')
currentTab$
  .spy('currentTab$')
  .observe(onCurrentTab, console.error)
