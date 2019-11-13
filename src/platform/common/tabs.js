// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Chrome tabs

/* global chrome */

import { difference, empty, get, head, pick, values } from 'fkit'
import Kefir from 'kefir'
import { callbackToPromise } from '../../lib/reactive'
import { browserEvent$, withErrorChecking } from './helpers'

var currentWindowId = -1

const currentTabQuery = {
  active: true,
  currentWindow: true,
}

export const isComplete = function (info) {
  return get('status', info.change) === 'complete'
}

const is = get
const isActive = is('active')
const isSelected = is('selected')

const isCurrentWindow = (tab) => {
  return tab.windowId === currentWindowId
}

const isCurrent = (tab) => {
  return isActive(tab) && isSelected(tab) && isCurrentWindow(tab)
}

const tabsAreEqual = (a, b) => {
  return empty(difference(values(a), values(b)))
}

const getTab = (id) => {
  return Kefir.fromPromise(callbackToPromise(withErrorChecking(chrome.tabs.get), id))
}

const getActiveTabOnWindow = (windowId) => {
  return Kefir.fromPromise(
    callbackToPromise(
      withErrorChecking(chrome.tabs.query),
      { windowId, active: true }
    )
  )
    .map(head)
    .filter()
}

export const getCurrentTab = () => {
  return callbackToPromise(withErrorChecking(chrome.tabs.query), currentTabQuery)
}

const onActivated$ = browserEvent$(chrome.tabs.onActivated)

const onFocusChanged$ = browserEvent$(chrome.windows.onFocusChanged)

const onRemoved$ = browserEvent$(chrome.tabs.onRemoved)
  .map((event) => {
    return {
      id: event[0],
      windowId: event[1].windowId,
      isWindowClosing: event[1].isWindowClosing,
    }
  })

const onUpdated$ = browserEvent$(chrome.tabs.onUpdated)
  .map((event) => {
    return {
      id: event[0],
      change: event[1],
      tab: event[2]
    }
  })

export const tabUpdate$ = onUpdated$
  .spy('tabUpdate$')
  .filter(event => isCurrent(event.tab))
  .spy('tabUpdate is current')
  .map(get('tab'))

export const tabActivation$ = onActivated$
  .spy('tabActivation$')
  .map(get('tabId'))
  .flatMapLatest(getTab)

export const tabFocusChanged$ = onFocusChanged$
  .spy('tabFocusChanged$')
  .filter(id => id >= 0)
  .onValue(id => { currentWindowId = id; return id })
  .flatMapLatest(getActiveTabOnWindow)

export const activeTab$ = Kefir.merge([tabActivation$, tabFocusChanged$])

export const currentTab$ = Kefir.merge([tabUpdate$, activeTab$])
  .filter(isActive)
  .spy('currentTab$')
  .map(pick([
    // 'active',
    'id',
    'favIconUrl',
    // 'selected',
    // 'status',
    'title',
    'url',
    'windowId',
  ]))
  .skipDuplicates(tabsAreEqual)

export const closedTab$ = onRemoved$

export const closedWindow$ = onRemoved$
  .filter(get('isWindowClosing'))
  .map(get('windowId'))
  .skipDuplicates()
