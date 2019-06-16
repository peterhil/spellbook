// Copyright (c) 2019 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { closedTab$, closedWindow$, currentTab$ } from '../platform/common/tabs'

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

export const popupController = function (message, port) {
  switch (message.type) {
  case 'getCurrentTab':
    port.postMessage({ type: 'currentTabInfo', data: currentTab })
    break
  default:
    console.error('Unhandled message:', message)
    port.disconnect()
  }
}

closedWindow$.log('closedWindow$')
closedTab$.log('closedTab$')
currentTab$
  .spy('currentTab$')
  .observe(onCurrentTab, console.error)
